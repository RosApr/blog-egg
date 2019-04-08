<template>
    <a-layout class='common-container'>
        <a-layout-content class='login-form-container'>
                <router-view />
        </a-layout-content>
        <a-layout-footer>
            <CopyRight />
        </a-layout-footer>
    </a-layout>
</template>
<script>
    import CopyRight from '@/components/Footer'
    export default {
        data() {
            return {}
        },
        components: {
            CopyRight
        }
    }
</script>
<style lang='less' scoped>
    .common-container {
        height: 100%;
        .login-form-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
