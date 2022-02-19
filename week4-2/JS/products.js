//1.分頁元件
//2.產品、新增編輯元件
//3.刪除

//導入Vue
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

//匯入分頁元件
import pagination from "./components/pagination.js";
import templateProduct from "./components/templateProduct.js";
import templateDel from "./components/templateDel.js";

//建立實體
const app = createApp({
  //區域註冊
  components: {
    pagination,
    templateProduct,
    templateDel,
  },
  data() {
    return {
      products: [],
      temp: {},
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      //分頁外層名稱
      pagination: {},
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      apiPath: "mimiluckying",
      apiAdmin: "https://vue3-course-api.hexschool.io/v2/api/dingding248/admin",
      productId: "",
    };
  },
  methods: {
    checkLogin() {
      axios
        .post(`${this.apiUrl}/api/user/check`)
        .then((res) => {
          this.getData();
        })

        //token無法使用時
        .catch((err) => {
          alert(err.data.message);
          window.location = "login.html";
        });
    },
    getData(page = 1) {
      //從下面傳入page
      //all可一次看到所有產品 沒有all產品多會看不到後面的產品
      axios
        .get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`) //query
        .then((res) => {
          //這句省該為const { products } = res.data;
          //新增'res.data'.product
          this.products = res.data.products;
          //console.log(this.products);
          this.pagination = res.data.pagination;
        })
        .catch((err) => {
          alert(err.data.message);
          //path錯誤則導回登入畫面
          window.location = "login.html";
        });
    },
    //item是v-for跑出的item
    openModal(status, item) {
      if (status === "new") {
        //清空 若無清空會造成再次開啟時 上次輸入的內容仍會在裡面
        this.tempProduct = {
          imagesUrl: [],
        };
        this.isNew = true;
        this.$refs.productModal.openModal();
        //console.log("555");
      } else if (status === "edit") {
        //改為深層拷貝，避免第二層傳參考的問題JSON.parse(JSON.stringify(obj1))
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.isNew = false;
        this.$refs.productModal.openModal();
        //console.log(item);
        this.productId = item.id;
        //console.log(this.productId);
      } else if (status === "del") {
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.$refs.delModal.openModal();
        this.productId = item.id;
      }
    },
  },

  mounted() {
    //儲存token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    //每次發出請求時都自動帶入
    axios.defaults.headers.common["Authorization"] = token;

    this.checkLogin();
  },
});

//掛載
app.mount("#app");
