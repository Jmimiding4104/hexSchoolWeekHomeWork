<template>
    <div class="container">
        <div class="text-end mt-4">
            <button class="btn btn-primary" @click="openModal('new')">
                建立新的產品
            </button>
        </div>
        <table class="table mt-4">
            <thead>
                <tr>
                    <th width="120">分類</th>
                    <th>產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="100">是否啟用</th>
                <th width="120">編輯</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in products" :key="item.id">
                    <td>{{item.category}}</td>
                    <td>{{item.title}}</td>
                    <td class="text-end">{{item.origin_price}}</td>
                    <td class="text-end">{{item.price}}</td>
                    <td>
                        <span
                        :class="{'text-success' : item.is_enabled , 'text-danger' : !item.is_enabled}"
                        >
                        {{item.is_enabled?'啟用':'未啟用'}}
                        </span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button
                                type="button"
                                class="btn btn-outline-primary btn-sm"
                                @click="openModal('edit', item)"
                            >
                                編輯
                            </button>
                            <button
                                type="button"
                                class="btn btn-outline-danger btn-sm"
                                @click="openModal('del', item)"
                            >
                                刪除
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
<TemplateProduct :isNew="isNew" :temp-product="tempProduct" :id="productId" @getData="getData" ref="TemplateProduct"></TemplateProduct>
<DelProduct :id="productId" :tempProduct="tempProduct" @getData="getData" ref="DelProduct"></DelProduct>
</template>

<style lang="scss">
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>

<script>
import TemplateProduct from '@/components/TemplateProduct'
import DelProduct from '@/components/DelProduct'
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {
        imagesUrl: []
      },
      isNew: false,
      productId: ''
    }
  },
  components: {
    TemplateProduct,
    DelProduct
  },
  methods: {
    getData (page = 1) {
      this.$http.get(`${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`)
        .then((res) => {
          this.products = res.data.products
          this.pagination = res.data.pagination
        })
        .catch(() => {
          alert('請重新登入')
          this.$router.push('/login')
        })
    },
    openModal (status, item) {
      if (status === 'new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        this.$refs.TemplateProduct.openModal()
      } else if (status === 'edit') {
        this.tempProduct = JSON.parse(JSON.stringify(item))
        this.tempProduct.imagesUrl = this.tempProduct.imagesUrl ? this.tempProduct.imagesUrl : []
        this.isNew = false
        this.$refs.TemplateProduct.openModal()
        this.productId = item.id
      } else if (status === 'del') {
        this.tempProduct = JSON.parse(JSON.stringify(item))
        this.$refs.DelProduct.openModal()
        this.productId = item.id
      }
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
