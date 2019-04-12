<template>
    <a-layout-header>
        <div style='float:right;'>
            <!-- <span style='color: #fff;margin-right: 12px;'></span> -->
            <a-dropdown v-if='nickname'>
                <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item @click='page("profile")'>修改用户信息</a-menu-item>
                <a-menu-item @click='logout'>退出</a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px">
                {{nickname}} <a-icon type="down" />
                </a-button>
            </a-dropdown>
            <a-button v-else @click='page("login")'>登录</a-button>
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
            // ...mapGetters('user', [
            //     'nickname'
            // ])
            ...mapState('user', {
                nickname: state => state.userConfig.nickname
            })
        },
        methods: {
            page(name ='index') {
                return this.$router.push({name})
            },
            handleMenuClick(e) {
                console.log(e)
            },
            ...mapActions('user', [
                'logout',
            ])
        }
    }
</script>
<style lang='less' scoped>

</style>
