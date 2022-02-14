import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js";


const app = createApp ({
    data(){
        return{
            user:{
                username:'',
                password:''
            },
        }
    },
    methods:{
        login(){
            //console.log(this.user)

            const api = 'https://vue3-course-api.hexschool.io/v2/admin/signin';
            //登入
            axios.post(api,this.user)
                //登入成功
                .then((res)=>{
                    //console.log(res)
                    //將token與expired使用解構的方式取出
                    const { token, expired } = res.data;
                    //將token與expired放置到cookie
                    document.cookie = `hexToken=${ token }; expires=${ new Date(expired) };`;
                    //轉址
                    window.location = 'products.html';
                  
                   
                })
                //登入失敗
                .catch((err)=>{
                    console.dir(err);
                    alert("帳號或密碼輸入錯誤");
                });
        }
    },
});

app.mount('#app');