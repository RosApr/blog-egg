<template>
    <a-layout-header>
        <div style='float:right;'>
            <!-- <span style='color: #fff;margin-right: 12px;'></span> -->
            <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item>修改用户信息</a-menu-item>
                <a-menu-item>退出</a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px">
                {{nickname}} <a-icon type="down" />
                </a-button>
            </a-dropdown>
            <a-button @click.native='logout'>登录</a-button>
        </div>
    </a-layout-header>
</template>
<script>
    import { mapState, mapActions, mapGetters } from 'vuex'
    export default {
        data() {
            return {}
        },
        computed: {
            ...mapGetters('user', [
                'nickname'
            ])
        },
        methods: {
            handleMenuClick(e) {
                console.log(e)
            },
            async logout() {
                if(!this.isLogin) {
                    this.$router.push({name: 'login'})
                }
                const { data: res } = await this.$axios.post('/api/logout')
                if(res.msg == '') {
                    this.isLogin = false
                    this.$cookie.delete('nickname')
                }
            },
            ...mapActions('user', [
                'login',
                'logout'
            ])
        }
    }
</script>
<style lang='less' scoped>

</style>
