<template>
  <section>
    <div v-if="mystore"></div>
    <h2>My Store</h2>
    <div class="products-wrapper" v-for="(itemSold , index) in mystore" :key="index">
      <ProductItem v-if="itemSold.product" :product="itemSold.product">
        <p class="seller">
          <span>Buyer:</span>{{ itemSold.buyer_id }}
        </p>
      </ProductItem>
      <div class="delivery">
        <h3>Delivery:</h3>
        <ul v-if="itemSold.address">
          <li v-for="(value, key) in itemSold.address" :key="key">{{key}}: {{value}}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script>

import ProductItem from '@/components/ProductItem.vue'
import { api } from "@/services/services.js"
import { mapState } from "vuex";

export default {
  components: {
    ProductItem
  },
  data() {
    return {
      mystore: null
    }
  },
  computed: {
    ...mapState(["user","login"])
  },
  methods: {
    checkItem() {
      api.get(`/transaction?type=seller_id`)
      .then(response => {
        this.mystore = response.data
      })
    }
  },
  watch: {
    login() {
      this.checkItem()
    }
  },
  created() {
    if (this.login) this.checkItem()
  },
}
</script>

<style scoped>
.product-wrapper {
  margin-bottom: 40px;
}

.seller span {
  color: #EE8800;
}

.delivery {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h2 {
  margin-bottom: 20px;
}

h3 {
  margin: 0px;
  justify-self: end;
}

@media screen and (max-width: 500px) {
  .delivery {
    grid-template-columns: 1fr;
    grid-gap: 10px;
  }
  h3 {
    justify-self: start;
  }
}
</style>
