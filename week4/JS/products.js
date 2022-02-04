//1.分頁元件
//2.產品、新增編輯元件
//3.刪除

//導入Vue
import {createApp} from"https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";

//匯入分頁元件
import pagination from './pagination.js';

//建立modal容器
//新增與修改modal
let productModal = ''
//刪除
let delProductModal = ''

//建立實體
const app = createApp({
  //區域註冊
  components: {
    pagination
  },
  data(){
    return{
      products:[],
      temp:{},
      tempProduct:{
        imagesUrl: [],
      },
      isNew:false,
      //分頁外層名稱
      pagination:{},
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath:'dingding248',
      apiAdmin:'https://vue3-course-api.hexschool.io/v2/api/dingding248/admin'
    }
  },
  methods:{
    checkLogin(){
      axios.post(`${this.apiUrl}/api/user/check`)
      .then((res)=>{
        this.getData();
        
      })

      //token無法使用時
      .catch((err)=>{
        alert(err.data.message);
        window.location = 'login.html'
      })
    },
    getData(page = 1){//從下面傳入page
      //all可一次看到所有產品 沒有all產品多會看不到後面的產品
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`)//query 
      .then((res)=>{
        //這句省該為const { products } = res.data;
        //新增'res.data'.product
        this.products = res.data.products;
        //console.log(this.products)
        this.pagination = res.data.pagination;
      })
      .catch((err)=>{
        alert(err.data.message);
        //path錯誤則導回登入畫面
        window.location = 'login.html'
      })
    },
    //item是v-for跑出的item
    openModal(status, item){
      if (status === 'new'){
        //清空 若無清空會造成再次開啟時 上次輸入的內容仍會在裡面
        this.tempProduct = {
          imagesUrl:[],
        };
        this.isNew = true;
        productModal.show();
        //console.log("555");
      }
      else if (status === 'edit'){
        this.tempProduct = { ...item };
        this.isNew = false;
        productModal.show();
        //console.log(this.tempProduct)
      }
      else if (status === 'del'){
        this.tempProduct = { ...item }
        delProductModal.show();
      }
    },
    updateProduct(){
      let api = `${this.apiAdmin}/product`
      let httpMethod = 'post'

      //!反向 若isNew為false
      if (!this.isNew){
        api = `${this.apiAdmin}/product/${this.tempProduct.id}`
        httpMethod = 'put';
      }
      //可.可[]
      axios[httpMethod](api,{data:this.tempProduct})
        .then((res)=>{
          alert(res.data.message);
          productModal.hide();
          this.getData();
        })
        .catch((err)=>{
          alert(res.data.message);
        })
    },
    delProduct(){
      axios.delete(`${this.apiAdmin}/product/${this.tempProduct.id}`)
        .then((res)=>{
          alert(res.data.message);
          delProductModal.hide();
          this.getData();
        })
        .catch((err)=>{
          alert(err.data.message);
        })
    },
    createImg(){
      this.tempProduct.imagesUrl=[],
      this.tempProduct.imagesUrl.push('')
    }
  },

  mounted(){
    //儲存token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    //每次發出請求時都自動帶入
    axios.defaults.headers.common['Authorization'] = token;

    this.checkLogin();

    //建立modal實體(初始化)
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      //可透過esc關閉modal
      keyboard: false    
    })
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false    
    })
  }
      
});

//掛載
app.mount('#app');