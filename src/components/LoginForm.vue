<template>
    <div class="form-container">
        <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
        >
            <a-form-item>
                <a-input
                    v-decorator="[
                    'userName',
                    { rules: [{ required: true, message: 'Please input your username!' }] }
                    ]"
                    placeholder="Username"
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
                Log in
            </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault();
                const that = this
                this.form.validateFields(async (err, values) => {
                    if (!err) {
                    console.log('Received values of form: ', values);
                    const res = await that.$axios.post('/api/login', values)
                    console.log(res)
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