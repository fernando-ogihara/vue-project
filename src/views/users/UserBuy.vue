<template>
  <section>
    <div v-if="shoppingCart"></div>
    <h2>Shooping Cart</h2>
    <div class="products-wrapper" v-for="(itemInCart,index) in shoppingCart" :key="index">
      <ProductItem v-if="itemInCart.product" :product="itemInCart.product">
        <p class="seller"><span>Seller: </span>{{ itemInCart.seller_id }}</p>
      </ProductItem>
    </div>
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue'
import { api } from "@/services/services.js"
import { mapState } from "vuex";

export default {
  components: {
    ProductItem,
  },
  data() {
    return {
      shoppingCart:null
    }
  },
  computed: {
    ...mapState(["user","login"]),
  },
  methods: {
    shoppingList(){
      api.get(`/transaction?type=buyer_id`)
      .then(response => {
        this.shoppingCart = response.data
      })
    }
  },
  watch: {
    login() {
      this.shoppingList()
    }
  },
  created() {
    if (this.login) this.shoppingList()
  },
}
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.seller span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
