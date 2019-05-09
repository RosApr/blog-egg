<template>
    <div>
        <h3>标题：{{detail.title}}</h3>
        <div>所属分类: {{detail.categoryId | formatCategory(categoryList)}}</div>
        <div>详情：{{detail.content}}</div>
        <div>发布时间：{{detail.date | moment(timeFormat)}}</div>
        <div>浏览量：{{detail.pv}}次</div>
        <div v-if='detail.nickname'>发布人：{{detail.nickname}}</div>
        <a-row v-if='isLoginAndIsRoleUser' type="flex" justify="center" align="middle">
            <a-col :span="24" style='text-align:center;'>
                <a-button @click='star({postId: detail.id, status: +!detail.star, flag: false})'>{{starText}}</a-button>
            </a-col>
        </a-row>
        <a-row type="flex" justify="center" align="middle">
            <a-col :span="24" style='text-align:center;'>
                <a-button @click='$router.go(-1)'>返回首页</a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    import { timeFormat } from '@/assets/config'
    import { mapState, mapActions, mapGetters } from 'vuex'
    export default {
        data() {
            return {
                timeFormat
            }
        },
        computed: {
            starText() {
                return this.detail.star ? '取消收藏' : '收藏'
            },
            ...mapGetters('user', [
                'isLoginAndIsRoleUser'
            ]),
            ...mapState('blog', [
                'detail'
            ]),
            ...mapState('categories', {
                categoryList: state => state.list
            })
        },
        created() {
            const { id } = this.$route.params
            this.queryBlogDetail({id})
            this.addBlogPv({id})
        },
        filters: {
            formatCategory(value, list) {
                const itemConfig = list.filter(item => item.id == value)[0]
                return itemConfig === undefined ? '' : itemConfig['name']
            }
        },
        methods: {
            ...mapActions('blog', [
                'queryBlogDetail',
                'addBlogPv',
            ]),
            ...mapActions('user', [
                'star',
            ])
        }
    }
</script>
<style scoped lang='less'>

</style>

