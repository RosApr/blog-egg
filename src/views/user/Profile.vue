<template>
    <div class="form-container">
        <h2>修改用户信息</h2>
        <a-form
            id="components-form-demo-normal-login"
            :form="form"
            class="login-form"
            @submit="handleSubmit"
        >
            <a-form-item>
                <a-input
                    disabled
                    v-decorator="[
                    'account',
                    {
                        rules: [{ required: true, message: 'Please input your username!' }],
                        initialValue: userConfig.account
                    }
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
                    'nickname',
                    {
                        rules: [{ required: true, message: 'Please input your username!' }],
                        initialValue: userConfig.nickname
                    }
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
                    {
                        rules: [{ required: true, message: 'Please input your Password!' },
                        {validator: validateToNextPassword}],
                        
                    }
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
                <a-input
                    v-decorator="[
                    'passwordConfirm',
                    {
                        rules: [{ required: true, message: 'Please input your Password!' },
                            {validator: compareToFirstPassword}],
                    }
                    ]"
                    type="password"
                    @blur='handleConfirmBlur'
                    placeholder="再次输入Password"
                >
                    <a-icon
                    slot="prefix"
                    type="lock"
                    style="color: rgba(0,0,0,.25)"
                    />
                </a-input>
            </a-form-item>
            <a-form-item>
                <p>
                    <a-button
                        type="primary"
                        html-type="submit"
                        class="login-form-button"
                    >确定</a-button>
                </p>
                <p>
                    <a-button
                        type="default"
                        class="login-form-button"
                        @click='$router.go(-1)'
                    >返回</a-button>
                </p>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    export default {
        data() {
            return {
                confirmDirty: false
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        computed: {
            ...mapState('user', [
                'userConfig'
            ])
        },
        methods: {
            ...mapActions('user', [
                'modifyUserProfile'
            ]),
            handleConfirmBlur(e) {
                const value = e.target.value;
                this.confirmDirty = this.confirmDirty || !!value;
            },
            compareToFirstPassword(rule, value, callback) {
                const form = this.form;
                if (value && value !== form.getFieldValue('password')) {
                    callback('Two passwords that you enter is inconsistent!');
                } else {
                    callback();
                }
            },
            validateToNextPassword (rule, value, callback) {
                const form = this.form;
                if (value && this.confirmDirty) {
                    form.validateFields(['passwordConfirm'], { force: true });
                }
                callback();
            },
            handleSubmit (e) {
                e.preventDefault();
                const that = this
                this.form.validateFields((err, values) => {
                    if (!err) {
                        that.modifyUserProfile(values)
                    }
                });
            },
        }
    };
</script>
<style scoped lang='less'>
    .form-container {
        width: 300px;
    }
</style>