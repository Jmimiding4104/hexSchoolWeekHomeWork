<template>
  <h2>購物車</h2>
  <div class="container">
    <div class="mt-4">
      <!-- 產品Modal -->
      <CartModal ref="CartModal" :id="productId" @add-to-cart="addToCart"></CartModal>
      <!-- 產品Modal -->

      <table class="table align-middle">
        <thead>
          <tr>
            <th>圖片</th>
            <th>商品名稱</th>
            <th>價格</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td style="width: 200px">
              <div
                :style="{ backgroundImage: `url(${product.imageUrl})` }"
                style="
                  height: 100px;
                  background-size: cover;
                  background-position: center;
                "
              ></div>
            </td>
            <td>{{ product.title }}</td>
            <td>
              <div class="h5" v-if="product.price === product.origin_price">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.price }} 元</div>
              </div>
            </td>
            <td>
              <div class="btn-group btn-group-sm">
                <button
                  type="button"
                  class="btn btn-outline-secondary"
                  @click="openModal(product.id)"
                >
                  查看更多
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger"
                  @click="addToCart(product.id)"
                  :disabled="isLoading === product.id"
                >
                  <span
                    class="spinner-border spinner-border-sm"
                    v-show="isLoading === product.id"
                  ></span>
                  加到購物車
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- 購物車列表 -->
      <div class="text-end">
        <button
          class="btn btn-outline-danger"
          type="button"
          @click="delCarts()"
        >
          清空購物車
        </button>
      </div>

      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 150px">數量/單位</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cartData.carts">
            <tr v-for="item in cartData.carts" :key="item.id">
              <td>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="delCartItem(item.id)"
                  :disabled="isLoading === item.id"
                >
                  <!--<span
                          class="spinner-grow spinner-grow-sm"
                          v-show="isLoading ===item.id"
                        ></span>-->
                  x
                </button>
              </td>
              <td>{{ item.product.title }}</td>
              <td>
                <div class="input-group input-group-sm">
                  <div class="input-group mb-3">
                    <!--<input
                          min="1"
                          type="number"
                          class="form-control"
                          v-model.number="item.qty"
                        />-->
                    <select
                      id=""
                      class="form-select"
                      v-model="item.qty"
                      @change="updateCarts(item)"
                      :disabled="isLoading === item.id"
                    >
                      <option
                        :value="num"
                        v-for="num in 100"
                        :key="`${num}${item.id}`"
                      >
                        {{ num }}
                      </option>
                    </select>
                    <span class="input-group-text" id="basic-addon2">{{
                      item.product.unit
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="text-end">{{ item.final_total }}</td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ cartData.total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
<CartForm></CartForm>
  </div>
</template>

<script>
import CartModal from '@/components/CartModal'
import emitter from '@/libs/emitter'
import CartForm from '@/components/CartForm'

export default {
  data () {
    return {
      cartData: {},
      products: [],
      product: {},
      deleteAllCarts: {},
      cart: {},
      productId: '',
      isLoading: '',
      form: {
        user: {
          email: '',
          name: '',
          address: '',
          tel: ''
        },
        message: ''
      }
    }
  },
  components: {
    CartForm,
    CartModal
  },
  methods: {
    getProducts () {
      this.$http
        .get(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/products/all`
        )
        .then((res) => {
          this.products = res.data.products
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    getCarts () {
      this.$http
        .get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`)
        .then((res) => {
          this.cartData = res.data.data
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    // qty = 1 參數預設值
    addToCart (id, qty = 1) {
      const data = {
        product_id: id,
        qty
      }
      this.isLoading = id
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart`,
          { data }
        )
        .then((res) => {
          this.getCarts()
          // this.$refs.productsModal.closeModal()
          this.isLoading = ''
          emitter.emit('get-cart')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    delCartItem (id) {
      this.isLoading = id
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${id}`
        )
        .then((res) => {
          this.getCarts()
          this.isLoading = ''
          emitter.emit('get-cart')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    delCarts () {
      this.$http
        .delete(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/carts`
        )
        .then((res) => {
          alert('已成功清除購物車')
          this.getCarts()
          emitter.emit('get-cart')
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    updateCarts (item) {
      const data = {
        product_id: item.id,
        qty: item.qty
      }
      this.isLoading = item.id
      this.$http
        .put(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/cart/${item.id}`,
          { data }
        )
        .then((res) => {
          this.getCarts()

          this.isLoading = ''
          // console.log(item);
        })
        .catch((err) => {
          alert(err.data.message)
        })
    },
    openModal (id) {
      this.$refs.CartModal.openModal()
      this.productId = id
      this.$refs.CartModal.getProduct()
    }
  },
  mounted () {
    this.getProducts()
    this.getCarts()
  }
}
</script>
