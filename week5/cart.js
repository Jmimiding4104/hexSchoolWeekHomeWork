const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "mimiluckying";

import modal from "./components/userProductModal.js";

const app = Vue.createApp({
  data() {
    return {
      cartData: {},
      products: [],
      product: {},
      deleteAllCarts: {},
      cart: {},
      productId: "",
      isLoading: "",
    };
  },
  components: {
    modal,
  },
  methods: {
    getProducts() {
      axios.get(`${apiUrl}/api/${apiPath}/products/all`).then((res) => {
        this.products = res.data.products;
        //console.log(res);
      });
    },
    getCarts() {
      axios.get(`${apiUrl}/api/${apiPath}/cart`).then((res) => {
        this.cartData = res.data.data;
        //console.log(this.cartData);
      });
    },
    //qty = 1 參數預設值
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoading = id;
      axios.post(`${apiUrl}/api/${apiPath}/cart`, { data }).then((res) => {
        this.getCarts();
        this.$refs.productsModal.closeModal();
        this.isLoading = "";
      });
    },
    delCartItem(id) {
      this.isLoading = id;
      axios.delete(`${apiUrl}/api/${apiPath}/cart/${id}`).then((res) => {
        this.getCarts();
        this.isLoading = "";
      });
    },
    delCarts() {
      axios.delete(`${apiUrl}/api/${apiPath}/carts`).then((res) => {
        alert("已成功清除購物車");
        this.getCarts();
      });
    },
    updateCarts(item) {
      const data = {
        product_id: item.id,
        qty: item.qty,
      };
      this.isLoading = item.id;
      axios
        .put(`${apiUrl}/api/${apiPath}/cart/${item.id}`, { data })
        .then((res) => {
          this.getCarts();

          this.isLoading = "";
          //console.log(item);
        });
    },

    openModal(id) {
      this.$refs.productsModal.openModal();
      this.productId = id;

      //this.$refs.productsModal.getProduct();
    },
  },
  mounted() {
    this.getProducts();
    this.getCarts();
  },
});
app.mount("#app");
