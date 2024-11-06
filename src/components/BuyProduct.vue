<template>
  <section>
    <h2>Delivery address</h2>
    <ErrorComponent :errors="errors"/>
    <UserForm>
      <button class="btn" @click.prevent="finishTransaction">Buy Now</button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from "@/components/UserForm.vue";
import { api } from "@/services/services.js";
import { mapState } from "vuex";

export default {
  name: "FinalizarCompra",
  components: {
    UserForm
  },
  data() {
    return {
      errors: []
    }
  },
  props: ['product'],
  computed: {
    ...mapState(["user"]),
    buyProcess() {
      return {
        buyer_id: this.user.email,
        seller_id: this.product.user_id,
        product: this.product,
        address: {
          postcode: this.user.postcode,
          address: this.user.address,
          number: this.user.number,
          county: this.user.county,
          city: this.user.city,
        }
      }
    }
  },
  methods: {
    createSellingProcess(){
      return api.post("/transaction", this.buyProcess).then(() => {
        this.$router.push({name : "buy"})
      })
    },
    async createUser() {
      try {
        await this.$store.dispatch("createUser", this.$store.state.user)
        await this.$store.dispatch("loginUser", this.$store.state.user)
        await this.$store.dispatch("getUser")
        await this.createSellingProcess()
      } catch(e) {
        this.errors.push(e.response.data.message)
      }
    },
    finishTransaction() {
      this.errors = [];
      this.$store.state.login ? this.createSellingProcess() : this.createUser()
    }
  }
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}
.btn {
  background: #e80;
}
</style>