<template>
    <div class="form-container">
        <h2>{{title}}</h2>
        <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
        >
            <a-form-item>
                <a-input
                    v-decorator="[
                    'account',
                    { rules: [{ required: true, message: 'Please input your account!' }] }
                    ]"
                    placeholder="账号"
                >
                    <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0,0,0,.25)"
                    />
                </a-input>
            </a-form-item>
            <a-form-item v-if='!isLoginPage'>
                <a-input
                    v-decorator="[
                    'nickname',
                    { rules: [{ required: true, message: 'Please input your nickname!' }] }
                    ]"
                    placeholder="昵称"
                >
                    <a-icon
                    slot="prefix"
                    type="user"
                    style="color: rgba(0,0,0,.25)"
                    />
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input
                    v-decorator="[
                    'password',
                    { rules: [{ required: true, message: 'Please input your Password!' }] }
                    ]"
                    type="password"
                    placeholder="Password"
                >
                    <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                    />
                </a-input>
            </a-form-item>
            <a-form-item>
            <a-button
                type="primary"
                html-type="submit"
                class="login-form-button"
            >
                {{title}}
            </a-button>
            <a-button v-if='isLoginPage' class="login-form-button" @click='$router.push({name: "register"})'>注册</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        computed: {
            isLoginPage() {
                return this.title === '登录'
            },
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault();
                const that = this
                this.form.validateFields((err, values) => {
                    if (!err) {
                        that.$emit(this.title === '登录' ? 'loginSubmit' : 'registerSubmit', values)
                    }
                });
            },
        }
    };
</script>
<style scoped lang='less'>
    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }
    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>