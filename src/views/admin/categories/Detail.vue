<template>
    <div class="form-container">
        <h2>{{title}}分类</h2>
        <a-form
            :form="form"
            class="category-form"
            @submit="handleSubmit"
        >
            <a-form-item>
                <a-input
                    v-decorator="[
                    'name',
                    { rules: [{ required: true, message: 'Please input your name!' }],
                        initialValue: (detail.name || '') }
                    ]"
                    placeholder="name"
                >
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button
                    type="primary"
                    html-type="submit"
                    class="login-form-button"
                >
                    确定
                </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                isAdd: !this.$route.params['id']
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        created() {
            const { id } = this.$route.params
            if(!this.isAdd) {
                this.queryCategoryDetail({id})
            }
        },
        computed: {
            ...mapState('categories', [
                'detail'
            ]),
            title() {
                return this.isAdd ? '添加' : '修改'
            }
        },
        methods: {
            ...mapActions('categories', [
                'createCategory',
                'modifyCategory',
                'queryCategoryDetail'
            ]),
            handleSubmit (e) {
                e.preventDefault();
                const that = this
                this.form.validateFields((err, values) => {
                    if (!err) {
                        if(this.isAdd) {
                            this.createCategory(values)
                        } else {
                            this.modifyCategory({...this.detail, ...values})
                        }
                    }
                });
            },
        }
    };
</script>
<style scoped lang='less'>
    .category-form {
        max-width: 300px;
        margin: 0 auto;
    }
</style>