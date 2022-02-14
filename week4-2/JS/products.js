//1.分頁元件
//2.產品、新增編輯元件
//3.刪除

//導入Vue
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

//匯入分頁元件
import pagination from "./pagination.js";

//import {templateProduct} from './templateProduct.js';
//import {templateDel} from './templateDel.js';

//建立modal容器
//新增與修改modal
let productModal = "";
//刪除
let delProductModal = "";

//產品modal元件化
const templateProduct = {
  props: ["temp-product", "is-new"],
  template: `      <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
  aria-hidden="true">
<div class="modal-dialog modal-xl">
 <div class="modal-content border-0">
   <div class="modal-header bg-dark text-white">
     <h5 id="productModalLabel" class="modal-title">
       <span>{{isNew?'新增產品':'編輯產品'}}</span>
     </h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
   </div>
   <div class="modal-body">
     <div class="row">
       <div class="col-sm-4">
         <div class="mb-2">
           <div class="mb-3">
             <label for="imageUrl" class="form-label">輸入主圖網址</label>
             <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
             <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
           </div>
           <div class="mb-3">
             <h6>輸入附圖網址</h6>
             <div v-if = "Array.isArray(tempProduct.imagesUrl)">
               <div v-for = "(img, key) in tempProduct.imagesUrl" :key = "key + 123456789">
                 <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imagesUrl[key]">
                 <img class="img-fluid" :src="img" alt="">
               </div>
             </div>
           </div>
         </div>
         <div>
           <button v-if = "!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length -1]"
           class="btn btn-outline-primary btn-sm d-block w-100" @click="createImg">
             新增圖片
           </button>                  
           <button v-else
           class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
             刪除圖片
           </button>
         </div>
       </div>
       <div class="col-sm-8">
         <div class="mb-3">
           <label for="title" class="form-label" >標題</label>
           <input id="title" 
           type="text" 
           class="form-control" 
           placeholder="請輸入標題" 
           v-model="tempProduct.title">
         </div>

         <div class="row">
           <div class="mb-3 col-md-6">
             <label for="category" class="form-label">分類</label>
             <input id="category" 
             type="text" 
             class="form-control"
             placeholder="請輸入分類" 
             v-model="tempProduct.category">
           </div>
           <div class="mb-3 col-md-6">
             <label for="price" class="form-label">單位</label>
             <input id="unit" 
             type="text" 
             class="form-control" 
             placeholder="請輸入單位" 
             v-model="tempProduct.unit">
           </div>
         </div>

         <div class="row">
           <div class="mb-3 col-md-6">
             <label for="origin_price" class="form-label">原價</label>
             <input id="origin_price" 
             type="number" 
             min="0" 
             class="form-control" 
             placeholder="請輸入原價" 
             v-model.number="tempProduct.origin_price">
           </div>
           <div class="mb-3 col-md-6">
             <label for="price" class="form-label">售價</label>
             <input id="price" 
             type="number" 
             min="0" 
             class="form-control"
             placeholder="請輸入售價"
             v-model.number="tempProduct.price">
           </div>
         </div>
         <hr>

         <div class="mb-3">
           <label for="description" class="form-label">產品描述</label>
           <textarea id="description" 
           type="text" 
           class="form-control"
           placeholder="請輸入產品描述"
           v-model="tempProduct.description">
           </textarea>
         </div>
         <div class="mb-3">
           <label for="content" class="form-label">說明內容</label>
           <textarea id="description" 
           type="text" 
           class="form-control"
           placeholder="請輸入說明內容"
           v-model="tempProduct.content">
           </textarea>
         </div>
         <div class="mb-3">
           <div class="form-check">
             <input id="is_enabled" class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0" v-model="tempProduct.is_enabled">
             <label class="form-check-label" for="is_enabled">是否啟用</label>
           </div>
         </div>
       </div>
     </div>
   </div>
   <div class="modal-footer">
     <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
       取消
     </button>
     <button type="button" class="btn btn-primary" @click="updateProduct">
       確認
     </button>
   </div>
 </div>
</div>
</div>`,
  data() {
    return {
      apiAdmin: "https://vue3-course-api.hexschool.io/v2/api/dingding248/admin",
    };
  },
  methods: {
    updateProduct() {
      let api = `${this.apiAdmin}/product`;
      let httpMethod = "post";

      //!反向 若isNew為false
      if (!this.isNew) {
        api = `${this.apiAdmin}/product/${this.tempProduct.id}`;
        httpMethod = "put";
      }
      //可.可[]
      axios[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          alert(res.data.message);
          this.$emit("get-data");
          productModal.hide();

          //this.getData();
        })
        .catch((err) => {
          alert(res.data.message);
        });
    },
    createImg() {
      (this.tempProduct.imagesUrl = []), this.tempProduct.imagesUrl.push("");
    },
  },
};

const templateDel = {
  props: ["tempProduct"],
  template: `
  <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
  aria-labelledby="delProductModalLabel" aria-hidden="true">
<div class="modal-dialog">
 <div class="modal-content border-0">
   <div class="modal-header bg-danger text-white">
     <h5 id="delProductModalLabel" class="modal-title">
       <span>刪除產品</span>
     </h5>
     <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div class="modal-body">
     是否刪除
     <strong class="text-danger"></strong> {{ tempProduct.title }}(刪除後將無法恢復)。
   </div>
   <div class="modal-footer">
     <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
       取消
     </button>
     <button type="button" class="btn btn-danger" @click="delProduct">
       確認刪除
     </button>
   </div>
 </div>
</div>
</div>
  `,
  data() {
    return {
      apiAdmin: "https://vue3-course-api.hexschool.io/v2/api/dingding248/admin",
    };
  },
  methods: {
    delProduct() {
      axios
        .delete(`${this.apiAdmin}/product/${this.tempProduct.id}`)
        .then((res) => {
          alert(res.data.message);
          delProductModal.hide();
          //this.getData();
          this.$emit("get-data");
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
  },
};

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
      apiPath: "dingding248",
      apiAdmin: "https://vue3-course-api.hexschool.io/v2/api/dingding248/admin",
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
          //console.log(this.products)
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
        productModal.show();
        //console.log("555");
      } else if (status === "edit") {
        //改為深層拷貝，避免第二層傳參考的問題JSON.parse(JSON.stringify(obj1))
        this.tempProduct = JSON.parse(JSON.stringify(item));
        this.isNew = false;
        productModal.show();
        //console.log(this.tempProduct)
      } else if (status === "del") {
        this.tempProduct = JSON.parse(JSON.stringify(item));
        delProductModal.show();
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

    //建立modal實體(初始化)
    productModal = new bootstrap.Modal(
      document.getElementById("productModal"),
      {
        //可透過esc關閉modal
        keyboard: false,
      }
    );
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal"),
      {
        keyboard: false,
      }
    );
  },
});

//掛載
app.mount("#app");
