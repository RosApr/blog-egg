<template>
    <a-table :columns="columns" :dataSource="list" @change='queryBlogList' :pagination='pagination' rowKey='id' bordered>
        <template slot="operation" slot-scope="text, record, index">
            <div class='editable-row-operations'>
                <a-button type='default' @click='showBlogDetail(record.id)'>查看</a-button>
                <a-divider type="vertical" />
                <a-button type='primary' @click='modifyBlogDetail(record.id)'>修改</a-button>
                <a-divider type="vertical" />
                <a-popconfirm :title="`确认要删除《${record.title}》?`" @confirm="delBlog(record.id)" @cancel="() => {}" okText="确定" cancelText="取消">
                    <a-button type='danger'>删除</a-button>
                </a-popconfirm>
            </div>
        </template>
    </a-table>
</template>
<script>
    import { mapActions, mapState } from 'vuex'
    import { paginationConfig } from '@/assets/config'
    const columns = [{
        title: '名称',
        dataIndex: 'title',
        width: '15%',
        scopedSlots: { customRender: 'title' }
    }, {
        title: '发布人',
        dataIndex: 'owner',
        width: '15%',
        scopedSlots: { customRender: 'owner' }
    }, {
        title: '发布日期',
        dataIndex: 'date',
        width: '35%',
        scopedSlots: { customRender: 'date' }
    }, {
        title: '浏览次数',
        dataIndex: 'pv',
        width: '8%',
        scopedSlots: { customRender: 'pv' }
    }, {
        title: '操作',
        dataIndex: 'operation',
        scopedSlots: { customRender: 'operation' }
    }]
export default {
    mixins: [ paginationConfig ],
    data () {
        return {
            columns
        }
    },
  computed: {
      ...mapState('blog', [
          'list'
      ])
  },
  created() {
      this.queryBlogList(this.pagination)
  },
  methods: {
      ...mapActions('blog', [
          'queryBlogList'
      ]),
      showBlogDetail(blogId) {
      },
      modifyBlogDetail(blogId) {
      },
      delBlog(blogId) {
      }
  },
}
</script>
<style scoped lang='less'>
    .editable-row-operations a {
        margin-right: 8px;
    }
</style>