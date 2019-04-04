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
    import * as userApi from '@/assets/api/user'
    export default {
        data() {
            return {}
        },
        created() {
            console.log(this.$cookie.get('nickname'))
        },
        methods: {
            async handleSubmit(loginConfig) {
                const { data: res } = await userApi.login(loginConfig)
                if(!res.msg) {
                    this.$cookie.set('nickname', res.data.nickname, { expires: '1h' })
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