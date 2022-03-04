<template>
  <DashboardNavbar />
  <router-view v-if="checksuccess"></router-view>
</template>

<script>
import DashboardNavbar from '@/components/DashboardNavbar'
export default {
  data () {
    return {
      checksuccess: false
    }
  },
  components: {
    DashboardNavbar
  },
  methods: {
    checkLogin () {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.$http.defaults.headers.common.Authorization = token
      this.$http
        .post(
          `${process.env.VUE_APP_API}/api/user/check`
        )
        .then((res) => {
          this.checksuccess = true
        })
        .catch(() => {
          alert('請重新登入')
          this.$router.push('/login')
        })
    }
  },
  mounted () {
    this.checkLogin()
  }
}
</script>
