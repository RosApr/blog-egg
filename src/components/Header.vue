<template>
    <a-layout-header>
        <div style='float:right;'>
            <a-dropdown v-if='isLogin'>
                <a-menu slot="overlay" @click="handleMenuClick">
                <a-menu-item v-if='isLoginAndIsRoleUser' @click='page("userOwnList")'>我的发布</a-menu-item>
                <a-menu-item v-if='isLoginAndIsRoleUser' @click='page("userStarList")'>我的收藏</a-menu-item>
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
            ...mapState('user', {
                nickname: state => state.userConfig.nickname,
            }),
            ...mapGetters('user', [
                'isLoginAndIsRoleUser',
                'isLogin'
            ])
        },
        methods: {
            page(name ='index') {
                return this.$router.push({name})
            },
            handleMenuClick(e) {
            },
            ...mapActions('user', [
                'logout',
            ])
        }
    }
</script>
<style lang='less' scoped>
    .ant-layout-header {
        padding: 0 24px!important;
    }
</style>
