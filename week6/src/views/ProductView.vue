<template>
  <h1>單一產品</h1>
  <div class="container">
    <img :src="product.imageUrl" class="card-img-top" alt="...">
    <div>
      {{product.category}}
    </div>
    <div>
      {{product.title}}
    </div>
    <div>
      {{product.description}}
    </div>
    <div>
      {{product.content}}
    </div>
    <div>
      {{product.price}}元
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {}
    }
  },
  methods: {
    getProduct () {
      const { id } = this.$route.params
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product
        })
    }
  },
  mounted () {
    this.getProduct()
  }
}
</script>
