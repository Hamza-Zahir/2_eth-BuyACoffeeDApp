require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.STAGING_ALCHEMY_KEY}`,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
// 0x7E6b5232708b9a4fa5C0f5F70B2F4F7C78a047D1
