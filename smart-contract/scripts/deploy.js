const main = async () => {

  const ContractFactory = await hre.ethers.getContractFactory("CoffeePortal");
  const CoffeePortalContract = await ContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await CoffeePortalContract.deployed();

  console.log("CoffeePortal address: ", CoffeePortalContract.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();