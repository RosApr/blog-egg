<template>
    <a-layout class='login-container'>
        <a-layout-content class='login-form-container'>
                <a-col :span="12">
                    <LoginForm />
                </a-col>
        </a-layout-content>
        <a-layout-footer>
            Footer
        </a-layout-footer>
    </a-layout>
</template>
<script>
    import LoginForm from "@/components/LoginForm"
    export default {
        data() {
            return {}
        },
        components: {
            LoginForm
        }
    }
</script>
<style scoped lang='less'>
    .login-container {
        height: 100%;
        .login-form-container {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>