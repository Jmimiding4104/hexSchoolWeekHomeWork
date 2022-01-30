// 產品資料格式

//導入Vue
import {createApp} from"https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";




 
//建立實體
const app = createApp({
  data(){
    return{
      products:[],
      temp:{},
      apiUrl:'https://vue3-course-api.hexschool.io/v2',
      apiPath:'dingding248'
    }
  },
  methods:{
    checkLogin(){
      
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
      axios.defaults.headers.common['Authorization'] = token;

      axios.post(`${this.apiUrl}/api/user/check`)
      .then((res)=>{
        this.getData();
        
      })
      .catch((err)=>{
        alert(err.data.message);
        window.location = 'login.html'
      })
    },
    getData(){
      
      axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products`)
      .then((res)=>{
        //這句省該為const { products } = res.data;
        //新增'res.data'.product
        this.products = res.data.products;
        
    })
      .catch((err)=>{
        alert(err.data.message);
    })
  }
  },
  mounted(){
     
    this.checkLogin();
  }
      

});

//掛載
app.mount('#app');