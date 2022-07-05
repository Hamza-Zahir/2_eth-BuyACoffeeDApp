<template>
  <div class="app d-flex justify-content-center align-items-center pt-3">
    <div class="content">
      <div class="text-center">
        <h1 class="text-primary">Buy Me A Coffee</h1>

        <div
          class="btn btn-primary"
          :class="CurrentAccount && ChainId != 4 ? 'btn-warning' : ''"
          @click="connectMetamask"
        >
          {{
            CurrentAccount && ChainId == 4
              ? `${CurrentAccount.slice(0, 5)}...${CurrentAccount.slice(
                  CurrentAccount.length - 4
                )}`
              : CurrentAccount && ChainId != 4
              ? "network erore"
              : " Conect Wallet"
          }}
        </div>
      </div>
      <div class="form mx-auto border mt-2" v-if="CurrentAccount">
        <form action="" class="">
          <div class="text-center">
            <label for="Name" class="w-100">Name</label>
            <input
              type="text"
              id="Name"
              placeholder="Name"
              class=""
              :value="name"
              @input="
                (e) => {
                  name = e.target.value;
                }
              "
            />
            <label for="Name" class="w-100">Send the Creator a Message</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="3"
              :aria-valuetext="message"
              placeholder="Message"
              @input="
                (e) => {
                  message = e.target.value;
                }
              "
            ></textarea>
          </div>
          <div class="btn btn-primary m-3" @click="BuyCoffee">Support $5</div>
        </form>
      </div>
      <div class="allCofee">
        <div
          class="text-center box my-4"
          v-for="(cofee, i) in AllCoffee"
          :key="i + 1"
        >
          <div class="content p-3 text-light">
            <div class="my-1">
              Supporter: {{ cofee.name ? cofee.name : "Anonymous" }}
            </div>
            <div class="my-1">Message: {{ cofee.message }}</div>
            <div class="my-1">Address: {{ cofee.address }}</div>
            <div class="my-1">Timestamp: {{ cofee.timestamp }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      name: "",
      message: "",
      // loding: false,
    };
  },
  computed: {
    ...mapGetters(["CurrentAccount"]),
    ...mapGetters(["ChainId"]),
    ...mapGetters(["AllCoffee"]),
  },
  mounted() {
    this.GetAllCoffee();
  },
  methods: {
    ...mapActions(["checkWalletIsConnected"]),
    ...mapActions(["connectMetamask"]),
    ...mapActions(["buyCoffee"]),
    ...mapActions(["getAllCoffee"]),
    // ...mapActions(["toggleCompleted"]),
    async GetAllCoffee() {
      await this.checkWalletIsConnected();
      this.lodeing = true;
      await this.getAllCoffee().then((this.lodeing = false));
    },

    async BuyCoffee() {
      if (this.ChainId == 4) {
        await this.buyCoffee(this.name, this.message).then(() => {
       window.location.reload();
        });
      }
    },
  },
};
</script>
<style scoped>
.app {
  width: 100%;
  min-height: 100vh;
  background: #e7e7e7;
}
.form {
  width: 300px;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 0px #adadad;
}
input,
textarea {
  width: 90%;
  outline: none;
  border: none;
  padding: 7px;
  border-radius: 10px;
  background: rgb(224, 212, 212);
}
label {
  font-weight: bold;
  margin: 10px 0;
}
h1 {
  font-weight: bold;
}
.btn {
  border-radius: 15px;
  box-shadow: 2px 2px 10px 0px #585858;
}
.box {
  border-left: 2px solid #25252558;
  padding-left: 25px;
}
.box .content {
  position: relative;
  background: rgb(113, 24, 197);
  border-radius: 15px;
}
.box .content::before {
  content: "";
  width: 25px;
  height: 0px;
  border: 1px solid #018f6458;
  position: absolute;
  left: -25px;
  top: 50%;
}
</style>
