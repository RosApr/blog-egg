<template>
  <div id="app">
    <router-view></router-view>
    <a-spin tip='loading...' :spinning='showLoading' class='loading-container'>
      <a-icon slot="indicator" type="loading" style="font-size: 24px" spin />
    </a-spin>
  </div>
</template>
<script>
  import bus from '@/assets/bus'
  import CopyRight from "@/components/Footer"
  export default {
    data() {
      return {
        showLoading: false,
        isLogin: false
      }
    },
    created() {
      this.isLogin = !!this.$cookie.get('nickname')
      bus.$on('toggleLoadingModal', (loadingStatus=true) => {
        this.showLoading = loadingStatus
      })
    },
    computed: {
      btnText() {
        return this.isLogin ? '退出' : '登录'
      }
    },
    methods: {
      async logout() {
        if(!this.isLogin) {
            this.$router.push({name: 'login'})
        }
        const { data: res } = await this.$axios.post('/api/logout')
        if(res.msg == '') {
            this.isLogin = false
            this.$cookie.delete('nickname')
        }
      }
    },
    components: {
      CopyRight
    },
  }
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  min-height: 100%;
}
.loading-container {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  margin-left: -24px;
  margin-top: -24px;
  z-index: 999;
}
</style>
