<template>
    <a-form
        :form="form"
        @submit="handleSubmit"
    >
        <a-form-item
            label="分类"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
            class='category-container'
            >
            <a-radio-group v-decorator="['categoryId',
                {
                    initialValue: currCategory
                }
            ]" buttonStyle="solid">
                <a-radio-button v-for='(item, index) in categoryList' :key='index' :value="item.id">{{item.name}}</a-radio-button>
            </a-radio-group>
        </a-form-item>
        <a-form-item
            label="title"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
        >
        <a-input
            v-decorator="[
            'title',
            {
                rules: [{ required: true, message: 'Please input your title!' }],
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
            {
                rules: [{ required: true, message: 'Please input your content!' }],
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
    import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
    export default {
        data () {
            return {
                form: this.$form.createForm(this),
                id: this.$route.params.id,
                currCategory: undefined
            };
        },
        computed: {
            ...mapState('blog', [
                'detail'
            ]),
            ...mapState('categories', {
                categoryList(state) {
                    this.currCategory = state.list.length > 0 ? +state.list[0].id : ''
                    if(this.detail.categoryId) {
                        this.currCategory = +this.detail.categoryId
                    }
                    return state.list
                },
            })
        },
        created() {
            if(this.id) {
                this.queryBlogDetail({id: this.id})
            } else {
                this.updateDetail()
            }
        },
        methods: {
            ...mapMutations('blog', [
                'updateDetail'
            ]),
            ...mapActions('blog', [
                'queryBlogDetail',
                'modifyBlog',
                'createBlog'
            ]),
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields(async (err, values) => {
                    if (!err) {
                        if(this.id) {
                            this.modifyBlog({...values, ...{id: this.detail.id}})
                        } else {
                            this.createBlog({...values})
                        }
                        
                    }
                });
            },
        },
    };
</script>
<style scoped lang='less'>
    .category-container {
        .ant-form-item-control {
            text-align: left;
        }
    }
</style>