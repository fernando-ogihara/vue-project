<template>
  <form class="add-product">
    <label for="name">Name</label>
    <input id="name" name="name" type="text" v-model="product.name">
    <label for="price">Price £</label>
    <input id="price" name="price" type="number" v-model="product.price">
    <label for="images">images</label>
    <input id="images" name="images" type="file" multiple ref="images">
    <label for="description">Description</label>
    <textarea id="description" name="description" v-model="product.description"></textarea>
    <input class="btn" type="button" value="Add new product" @click.prevent="addNewProduct">
  </form>
</template>
<script>
import { api } from '@/services/services';


export default  {
    name: "ProductAdd",
    data() {
      return {
        product: {
          name: "",
          price: "",
          description: "",
          sold: "false",
          images: null
        }
      }
    },
    methods: {
      productFormat() {
        const form = new FormData();

        const files = this.$refs.images.files
        for(let i = 0; i < files.length; i++) {
          form.append(files[i].name, files[i])
        }

        form.append("name", this.product.name)
        form.append("price", this.product.price)
        form.append("description", this.product.description)
        form.append("sold", this.product.description)
        form.append("user_id", this.$store.state.user_id)

        return form;
      },
      addNewProduct() {
        const product = this.productFormat();
        api.post("/product", product).then(() => {
          this.$store.dispatch("getUserProducts")
        })
      }
    }
  }
</script>
<style scoped>
.add-product {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>