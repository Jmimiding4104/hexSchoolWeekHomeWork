<template>
  <h1>產品列表</h1>
  <div class="container">
    <div class="row row-cols-1 row-cols-lg-3 g-5">
      <div class="col" v-for="item in products" :key="item.id">
        <div class="card h-100" style="width: 18rem;">
          <div class="card-header">
            <img :src="item.imageUrl" class="card-img-top" alt="...">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text">
              {{item.description}}
            </p>
          </div>
          <div class="card-footer">
            <router-link class="btn btn-primary" :to="`/product/${item.id}`">查看詳情</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: []
    }
  },
  methods: {
    getProducts () {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`)
        .then((res) => {
          this.products = res.data.products
        })
    }
  },
  mounted () {
    this.getProducts()
  }
}
</script>
