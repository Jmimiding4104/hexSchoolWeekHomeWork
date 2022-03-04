<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
            蔬贏
            </router-link>
            <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/Products">
                        產品
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/Cart">
                        購物車
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/login">
                        登入
                        </router-link>
                    </li>
                </ul>
                <router-link
                to="/Cart"
                type="button"
                class="btn btn-primary position-relative"
                >
                    結帳
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {{cartData.carts?.length}}
                        </span>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import emitter from '@/libs/emitter'
export default {
  data () {
    return {
      cartData: {}
    }
  },
  methods: {
    getCart () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
        .catch((err) => {
          alert(err.data.message)
        })
    }
  },
  mounted () {
    this.getCart()
    emitter.on('get-cart', () => this.getCart())
  }
}
</script>
