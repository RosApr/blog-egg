<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <a-layout-header>
            <div style='color: #fff;float:right;'>{{$cookie.get('username')}}</div>
            <a-button @click.native='logout'>退出</a-button>
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
            return {}
        },
        methods: {
            async logout() {
                const res = await this.$axios.post('/api/logout')
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
