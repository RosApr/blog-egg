<template>
    <a-table :columns="columns" :dataSource="list" @change='handlePaginationChange' :pagination='pagination' rowKey='id' bordered>
        <template slot="operation" slot-scope="text, record, index">
            <div class='editable-row-operations'>
                <a-button type='default' @click='showBlogDetail(record.id)'>查看</a-button>
                <a-divider type="vertical" />
                <a-button type='default' @click='star({postId: record.id, status: 0})'>取消收藏</a-button>
            </div>
        </template>
    </a-table>
</template>
<script>
    import { mapActions, mapState, mapMutations } from 'vuex'
    import { timeFormat } from '@/assets/config'
    export default {
        data () {
            const columns = [{
                title: '名称',
                dataIndex: 'title',
                width: '25%',
                scopedSlots: { customRender: 'title' }
            },{
                title: '博客分类',
                dataIndex: 'category',
                width: '10%',
                scopedSlots: { customRender: 'category' }
            }, {
                title: '发布人',
                dataIndex: 'nickname',
                width: '15%',
                scopedSlots: { customRender: 'nickname' }
            }, {
                title: '发布日期',
                dataIndex: 'date',
                width: '20%',
                customRender: (text, record, index) => this.$moment(record.date).format(timeFormat)
            }, {
                title: '浏览量',
                dataIndex: 'pv',
                width: '8%',
                scopedSlots: { customRender: 'pv' }
            }, {
                title: '收藏数',
                dataIndex: 'star',
                width: '8%',
                scopedSlots: { customRender: 'star' }
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }]
            return {
                columns
            }
        },
    computed: {
        ...mapState('blog', [
            'list', 'pagination'
        ]),
    },
    created() {
        this.queryBlogList({star: 1})
    },
    methods: {
        ...mapActions('blog', [
            'queryBlogList',
            'queryBlogDetail',
            'delBlog'
        ]),
        ...mapMutations('blog', [
            'updatePagination'
        ]),
        ...mapActions('user', [
            'star',
        ]),
        handlePaginationChange(pagination) {
            this.updatePagination(pagination)
            this.queryBlogList({star: 1})
        },
        showBlogDetail(blogId) {
            this.$router.push({name: 'blogDetail', params: {id: blogId}})
        }
    },
    }
</script>
<style scoped lang='less'>
    .editable-row-operations a {
        margin-right: 8px;
    }
</style>