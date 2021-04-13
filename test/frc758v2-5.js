const { expect } = require("chai");
describe("safeTransferFrom", function () {
  it("transferFrom all", async function () {
    const [owner, other] = await ethers.getSigners();
    const FRC758 = await ethers.getContractFactory("ExampleToken");
    const frc758 = await FRC758.deploy("Hello", "HH", 18);

    await frc758.deployed();
    const now = Date.parse(new Date()) / 1000;
    const amount = 1000;
    await frc758.mint(owner.address, amount, now, now + 100);
    expect(await frc758.balanceOf(owner.address, now, now + 100)).to.equal(amount);

    await frc758.safeTransferFrom(owner.address, other.address, 1000, now, now + 100);

    expect(await frc758.balanceOf(owner.address, now, now + 100)).to.equal(0);
  });

  it("transferFrom ", async function () {
    const [owner, other] = await ethers.getSigners();
    const FRC758 = await ethers.getContractFactory("ExampleToken");
    const frc758 = await FRC758.deploy("Hello", "HH", 18);

    await frc758.deployed();
    const now = Date.parse(new Date()) / 1000;
    const amount = 1000;
    await frc758.mint(owner.address, amount, now, now + 100);
    expect(await frc758.balanceOf(owner.address, now, now + 100)).to.equal(amount);

    await frc758.safeTransferFrom(owner.address, other.address, amount, now, now + 50);

    expect(await frc758.balanceOf(owner.address, now, now + 50)).to.equal(0);
    expect(await frc758.balanceOf(owner.address, now + 99, now + 100)).to.equal(amount);
  });

});