const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "mimiluckying";

export default {
  props: ["id"],
  template: `      <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true" ref="productModal">
<div class="modal-dialog modal-xl" role="document">
 <div class="modal-content border-0">
   <div class="modal-header bg-dark text-white">
     <h5 class="modal-title" id="exampleModalLabel">
       <span>{{ product.title }}</span>
   </h5>
     <button type="button" class="btn-close"
             data-bs-dismiss="modal" aria-label="Close"></button>
   </div>
   <div class="modal-body">
     <div class="row">
       <div class="col-sm-6">
         <img class="img-fluid" :src="product.imageUrl" alt="">
   </div>
       <div class="col-sm-6">
         <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
         <p>商品描述：{{ product.description }}</p>
         <p>商品內容：{{ product.content }}</p>
         <div class="h5" v-if="product.price === product.origin_price">{{ product.price }} 元</div>
         <div v-else>
         <del class="h6">原價 {{ product.origin_price }} 元</del>
         <div class="h5">現在只要 {{ product.price }} 元</div>
         </div>
         <div>
           <div class="input-group">
             <input type="number" class="form-control"
                    min="1" v-model="qty">
             <button type="button" class="btn btn-primary" @click="addToCart">加入購物車</button>
   </div>
   </div>
   </div>
       <!-- col-sm-6 end -->
   </div>
   </div>
   </div>
   </div>
   </div>`,
  data() {
    return {
      productModal: "",
      product: {},
      qty: 1,
    };
  },
  watch: {
    id() {
      this.getProduct();
    },
  },
  methods: {
    openModal() {
      this.productModal.show();
    },
    closeModal() {
      this.productModal.hide();
    },
    getProduct() {
      //從外部的資料要this.才能取得
      axios
        .get(`${apiUrl}/api/${apiPath}/product/${this.id}`)
        .then((res) => {
          this.product = res.data.product;
          //console.log(res);
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    addToCart() {
      this.$emit("add-to-cart", this.product.id, this.qty);
      //this.productModal.hide();
    },
  },
  mounted() {
    this.productModal = new bootstrap.Modal(this.$refs.productModal);
  },
};
