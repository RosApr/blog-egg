<template>
    <a-form
        :form="form"
        @submit="handleSubmit"
    >
        <a-form-item
        label="title"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        >
        <a-input
            v-decorator="[
            'title',
            {rules: [{ required: true, message: 'Please input your title!' }],
            initialValue: detail.title || ''}
            ]"
        />
        </a-form-item>
        <a-form-item
        label="content"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        >
        <a-input
            v-decorator="[
            'content',
            {rules: [{ required: true, message: 'Please input your content!' }],
            initialValue: detail.content || ''}
            ]"
        />
        </a-form-item>
        <a-form-item
        :wrapper-col="{ span: 12, offset: 5 }"
        >
        <a-button
            type="primary"
            html-type="submit"
        >
            确定
        </a-button>
        </a-form-item>
    </a-form>
</template>
<script>
    import { mapState, mapActions } from 'vuex'
    export default {
        data () {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this),
            };
        },
        computed: {
            ...mapState('blog', [
                'detail'
            ])
        },
        created() {
            this.queryBlogDetail({id: this.$route.params.id})
        },
        methods: {
            ...mapActions('blog', [
                'queryBlogDetail',
                'modifyBlog'
            ]),
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields(async (err, values) => {
                    if (!err) {
                        this.modifyBlog({...values, ...{id: this.detail.id}})
                    }
                });
            },
        },
    };
</script>
<style scoped lang='less'>
    
</style>