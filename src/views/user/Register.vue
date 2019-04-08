<template>
    <a-col :span="12" :xs="{span: 12}" :md="{span: 12}" :lg="{span:8}">
        <LoginForm @registerSubmit='register' title='注册' />
    </a-col>
</template>
<script>
    import LoginForm from "@/components/LoginForm"
    import { mapActions } from 'vuex'
    export default {
        data() {
            return {}
        },
        methods: {
            ...mapActions('user', [
                'register'
            ])
        },
        components: {
            LoginForm,
        }
    }
</script>
<style scoped lang='less'>

</style>