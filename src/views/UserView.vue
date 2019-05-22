<template>
    <a-layout id="components-layout-demo-top" class="layout">
        <Header />
        <a-layout-content class='index-view-container'>
            <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
                <router-view></router-view>
            </div>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
            <CopyRight />
        </a-layout-footer>
        <ChatModel />
    </a-layout>
</template>
<script>
    import CopyRight from '@/components/Footer'
    import Header from '@/components/Header'
    import ChatModel from '@/components/ChatModel.vue'
    export default {
        data() {
            return {
                
            }
        },
        methods: {
            
        },
        components: {
            CopyRight,
            Header,
            ChatModel
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
