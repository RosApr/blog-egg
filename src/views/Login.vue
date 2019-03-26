<template>
    <a-layout class='login-container'>
        <a-layout-content class='login-form-container'>
                <a-col :span="12" :xs="{span: 12}" :md="{span: 12}" :lg="{span:8}">
                    <LoginForm @loginSubmit='handleSubmit' title='登录' />
                </a-col>
        </a-layout-content>
        <a-layout-footer>
            <CopyRight />
        </a-layout-footer>
    </a-layout>
</template>
<script>
    import LoginForm from "@/components/LoginForm"
    import CopyRight from "@/components/Footer"
    export default {
        data() {
            return {}
        },
        methods: {
            async handleSubmit(loginConfig) {
                const {data: res} = await this.$axios.post('/api/login', loginConfig)
                if(res) {
                    this.$cookie.set('username', res.data.name)
                    this.$router.push({name: 'list'})
                }
            }
        },
        components: {
            LoginForm,
            CopyRight
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