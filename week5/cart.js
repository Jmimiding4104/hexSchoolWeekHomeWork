const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "mimiluckying";

import modal from "./components/userProductModal.js";

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, max } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("max", max);

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);
//設定語言
configure({
  generateMessage: localize("zh_TW"),
  validateOnInput: true, // 立即進行驗證
});

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
      form: {
        user: {
          email: "",
          name: "",
          address: "",
          tel: "",
        },
        message: "",
      },
    };
  },
  components: {
    modal,
  },
  methods: {
    getProducts() {
      axios
        .get(`${apiUrl}/api/${apiPath}/products/all`)
        .then((res) => {
          this.products = res.data.products;
          //console.log(res);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    getCarts() {
      axios
        .get(`${apiUrl}/api/${apiPath}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
          //console.log(this.cartData);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    //qty = 1 參數預設值
    addToCart(id, qty = 1) {
      const data = {
        product_id: id,
        qty,
      };
      this.isLoading = id;
      axios
        .post(`${apiUrl}/api/${apiPath}/cart`, { data })
        .then((res) => {
          this.getCarts();
          this.$refs.productsModal.closeModal();
          this.isLoading = "";
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    delCartItem(id) {
      this.isLoading = id;
      axios
        .delete(`${apiUrl}/api/${apiPath}/cart/${id}`)
        .then((res) => {
          this.getCarts();
          this.isLoading = "";
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    delCarts() {
      axios
        .delete(`${apiUrl}/api/${apiPath}/carts`)
        .then((res) => {
          alert("已成功清除購物車");
          this.getCarts();
        })
        .catch((err) => {
          alert(err.data.message);
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
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    sendOrder() {
      axios
        .post(`${apiUrl}/api/${apiPath}/order`, { data: this.form })
        .then((res) => {
          alert(res.data.message);
          this.$refs.form.resetForm();
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
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
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);
app.mount("#app");
