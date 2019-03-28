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
            {rules: [{ required: true, message: 'Please input your title!' }]}
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
            {rules: [{ required: true, message: 'Please input your content!' }]}
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
            Submit
        </a-button>
        </a-form-item>
    </a-form>
</template>
<script>
    export default {
        data () {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this),
            };
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields(async (err, values) => {
                    if (!err) {
                        const { data: res } = await this.$axios.post('/api/publish', values)
                        if(res.msg != '') {
                            return this.$message.error(res.msg)
                        }
                        this.$router.push({name: 'list'})
                    }
                });
            },
        },
    };
</script>
<style scoped lang='less'>
    
</style>