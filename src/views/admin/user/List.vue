<template>
    <a-table :columns="columns" :dataSource="list" @change='handlePaginationChange' :pagination='pagination' rowKey='id' bordered>
        <template slot="operation" slot-scope="text, record, index">
            <div class='editable-row-operations'>
                <a-popconfirm :title="`确认要重置《${record.nickname}》的密码吗?`" @confirm="resetUserPwd({id: record.id})" @cancel="() => {}" okText="确定" cancelText="取消">
                    <a-button type='danger'>重置密码</a-button>
                </a-popconfirm>
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
                title: 'id',
                dataIndex: 'id',
                width: '10%',
                scopedSlots: { customRender: 'id' }
            }, {
                title: '账号',
                dataIndex: 'account',
                width: '20%',
                scopedSlots: { customRender: 'account' }
            }, {
                title: '昵称',
                dataIndex: 'nickname',
                width: '20%',
                scopedSlots: { customRender: 'nickname' }
            }, {
                title: '注册日期',
                dataIndex: 'date',
                width: '20%',
                customRender: (text, record, index) => this.$moment(record.date).format(timeFormat)
            }, {
                title: '发布博客数',
                dataIndex: 'count',
                width: '10%',
                scopedSlots: { customRender: 'count' }
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
            ...mapState('user', [
                'list', 'pagination',
            ]),
        },
        created() {
            this.queryUserList()
        },
        methods: {
            ...mapActions('user', [
                'queryUserList',
                'resetUserPwd'
            ]),
            ...mapMutations('user', [
                'updatePagination'
            ]),
            handlePaginationChange(pagination) {
                this.updatePagination(pagination)
                this.queryUserList()
            },
        },
    }
</script>
<style scoped lang='less'>
    .editable-row-operations a {
        margin-right: 8px;
    }
</style>