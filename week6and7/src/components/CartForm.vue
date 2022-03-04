<template>
        <div class="my-5 row justify-content-center">
          <VForm ref="form" class="col-md-6" v-slot="{ errors }">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <VField
                id="email"
                name="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': errors['email'] }"
                placeholder="請輸入 Email"
                rules="email|required"
                v-model="form.user.email"
              ></VField>
              <error-message
                name="email"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <VField
                id="name"
                name="姓名"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['姓名'] }"
                placeholder="請輸入姓名"
                rules="required"
                v-model="form.user.name"
              ></VField>
              <error-message
                name="姓名"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="phone" class="form-label">收件人手機</label>
              <VField
                id="phone"
                name="手機"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['手機'] }"
                placeholder="請輸入手機"
                :rules="isPhone"
                v-model="form.user.tel"
              ></VField>
              <error-message
                name="手機"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <VField
                id="address"
                name="地址"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': errors['地址'] }"
                placeholder="請輸入地址"
                rules="required"
                v-model="form.user.address"
              ></VField>
              <error-message
                name="地址"
                class="invalid-feedback"
              ></error-message>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea
                id="message"
                class="form-control"
                cols="30"
                rows="10"
                v-model="form.message"
              ></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-danger" @click.prevent="sendOrder()">
                送出訂單
              </button>
            </div>
          </VForm>
        </div>
</template>

<script>
export default {
  data () {
    return {
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
  methods: {
    isPhone (value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    sendOrder () {
      const data = {
        user: this.form.user
      }
      console.log(data)
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}/order`,
          { data }
        )
        .then((res) => {
          alert(res.data.message)
          this.$refs.form.resetForm()
        })
        .catch(() => {
          alert('請重新操作')
        })
    }
  }
}
</script>
