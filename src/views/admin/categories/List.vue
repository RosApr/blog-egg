<template>
    <div>
        <a-row>
            <a-col :span='24' style='text-align: right;margin-bottom: 20px;'>
                <a-button type='primary' @click='goAddCategory'>添加</a-button>
            </a-col>
        </a-row>
        <a-table :columns="columns" :dataSource="list" @change='handlePaginationChange' :pagination='pagination' rowKey='id' bordered>
            <template slot="operation" slot-scope="text, record, index">
                <div class='editable-row-operations'>
                    <a-button @click='showCategoryDetail(record.id)'>查看</a-button>
                    <a-divider type="vertical" />
                    <a-button type='primary' @click='modifyCategoryDetail(record.id)'>修改</a-button>
                    <a-divider type="vertical" />
                    <a-popconfirm :title="`确认要删除《${record.name}》?`" @confirm="delCategory({id: record.id})" @cancel="() => {}" okText="确定" cancelText="取消">
                        <a-button type='danger'>删除</a-button>
                    </a-popconfirm>
                </div>
            </template>
        </a-table>
    </div>
</template>
<script>
    import { mapState, mapActions, mapMutations } from 'vuex'
    import { timeFormat } from '@/assets/config'
    export default {
        data() {
            const columns = [{
                title: 'id',
                dataIndex: 'id',
                width: '8%',
                scopedSlots: { customRender: 'id' }
            },{
                title: '名称',
                dataIndex: 'name',
                width: '15%',
                scopedSlots: { customRender: 'name' }
            }, {
                title: '发布日期',
                dataIndex: 'date',
                width: '25%',
                customRender: (text, record, index) => this.$moment(record.date).format(timeFormat)
            }, {
                title: '操作',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' }
            }]
            return {
                columns
            }
            return {

            }
        },
        created() {
            this.queryCategoryList()
        },
        computed: {
            ...mapState('categories', [
                'list', 'pagination'
            ])
        },
        methods: {
            ...mapMutations('categories', [
                'updatePagination'
            ]),
            ...mapActions('categories', [
                'queryCategoryList',
                'queryCategoryDetail',
                'delCategory'
            ]),
            goAddCategory() {
                return this.$router.push({name: 'adminCategoriesAdd'})
            },
            handlePaginationChange(pagination) {
                this.updatePagination(pagination)
                this.queryCategoryList()
            },
            showCategoryDetail(categoryId) {
                this.$router.push({name: 'adminCategoriesDetail', params: {id: categoryId}})
            },
            modifyCategoryDetail(categoryId) {
                return this.$router.push({name: 'adminCategoriesUpdate', params: {id: categoryId}})
            }
        }
    }
</script>
