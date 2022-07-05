import Web3 from "web3";
import contractABI from "../json/abiContract.json";
const state = {
  CurrentAccount: "",
  ChainId: "",
  AllCoffee: [],
};

const getters = {
  CurrentAccount: (state) => state.CurrentAccount,
  ChainId: (state) => state.ChainId,
  AllCoffee: (state) => state.AllCoffee,
};
const actions = {
  async connectMetamask({ commit }) {
    const ethereum = window.ethereum;
    if (!ethereum) {
      window.open("https://metamask.io", "blank");
    } else {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      commit("setCurrentAccount", accounts[0]);

      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${Number(4).toString(16)}` }],
        });
        await ethereum.request({ method: "eth_chainId" }).then((resalt) => {
          commit("setChainId", Number(resalt));
        });
      } catch (switchError) {
        console.log(switchError);
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${Number(4).toString(16)}`,
                  chainName: "Rinkeby",
                  nativeCurrency: {
                    name: "Rinkeby Ether",
                    symbol: "RIN",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rinkeby.infura.io/v3/"],
                  blockExplorerUrls: ["https://rinkeby.etherscan.io"],
                },
              ],
            });

            await ethereum.request({ method: "eth_chainId" }).then((resalt) => {
              commit("setChainId", Number(resalt));
            });
            ethereum.on("chainChanged", handleChainChanged);
            function handleChainChanged(_chainId) {
              window.location.reload();
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  },
  async checkWalletIsConnected({ commit }) {
    const ethereum = window.ethereum;
    let web3 = new Web3(Web3.givenProvider || ethereum);
    let accounts = await web3.eth.getAccounts();
    if (accounts.length) {
      commit("setCurrentAccount", accounts[0]);
      await ethereum.request({ method: "eth_chainId" }).then((resalt) => {
        commit("setChainId", Number(resalt));
      });
      ethereum.on("chainChanged", handleChainChanged);
      function handleChainChanged(_chainId) {
        window.location.reload();
      }
    }
  },
  //  ........................................
  async buyCoffee(state, name, message) {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const web3 = new Web3(Web3.givenProvider || ethereum);
        const coffeePortalContract = new web3.eth.Contract(
          contractABI,
          "0x7E6b5232708b9a4fa5C0f5F70B2F4F7C78a047D1"
        );
        await coffeePortalContract.methods
          .buyCoffee(
            message ? message : "Enjoy Your Coffee",
            name ? name : "Anonymous",
            web3.utils.toWei("0.001", "ether")
          )
          .send({ from: this.state.CurrentAccount, gasLimit: 300000 });
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  },

  // ................................................
  async getAllCoffee({ commit }) {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const web3 = new Web3(Web3.givenProvider || ethereum);
        const coffeePortalContract = new web3.eth.Contract(
          contractABI,
          "0x7E6b5232708b9a4fa5C0f5F70B2F4F7C78a047D1"
        );

        const coffees = await coffeePortalContract.methods
          .getAllCoffee()
          .call();

        console.log(coffees);
        const coffeeCleaned = coffees.map((coffee) => {
          return {
            address: coffee.giver,
            timestamp: new Date(coffee.timestamp * 1000),
            message: coffee.message,
            name: coffee.name,
          };
        });

        commit("setAllCoffee", coffeeCleaned);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  },
  // .......................................
};
const mutations = {
  setCurrentAccount: (state, addres) => (state.CurrentAccount = addres),
  setChainId: (state, chainId) => (state.ChainId = chainId),
  setAllCoffee: (state, allCoffee) => (state.AllCoffee = allCoffee),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
