<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <a-layout-header>
            <div style='float:right;'>
                <span style='color: #fff;margin-right: 12px;'>{{$cookie.get('nickname')}}</span>
                <a-button @click.native='logout'>{{ btnText }}</a-button>
            </div>
        </a-layout-header>
        <a-layout-content style="padding: 40px 50px 0" class='index-view-container'>
            <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
                <router-view></router-view>
            </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            <CopyRight />
        </a-layout-footer>
    </a-layout>
</template>
<script>
    import CopyRight from "@/components/Footer"
    export default {
        data() {
            return {
                isLogin: false
            }
        },
        computed: {
            btnText() {
                return this.isLogin ? '退出' : '登录'
            }
        },
        created() {
            this.isLogin = !!this.$cookie.get('nickname')
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
        }
    }
</script>
<style lang="less" scoped>
    #components-layout-demo-top {
        height: 100%;
    }
    .ant-list-vertical .ant-list-item-action > li:first-child {
        padding-left: 0;
    }
    .ant-list-vertical .ant-list-item-action li {
        padding: 0 16px;
    }
    .index-view-container {
        overflow-y: scroll;
    }
    .index-view-container::-webkit-scrollbar { width: 0 !important }
</style>
