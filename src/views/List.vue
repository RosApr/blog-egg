<template>
  <div>
    <a-list
      itemLayout="vertical"
      size="large"
      :pagination="pagination"
      :dataSource="listData"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-row>
            <a-col :span='16' style='text-align: left;'>
              <p>标题：{{item.title}}</p>
              <p>发布时间：{{item.date}}</p>
            </a-col>
            <a-col :span='8'>
              <router-link :to='{name: "detail", params: {id: item.id}}'>more</router-link>
            </a-col>
          </a-row>
        </a-list-item>
    </a-list>
    <a-button type="primary" @click='$router.push({name: "publish"})' size='large'>发布</a-button>
  </div>
</template>
<script>
    export default {
        data () {
          return {
            listData: [],
            pagination: {
                onChange: (page) => {
                    this.$set(this.pagination, 'current', page)
                    const { pageSize, current } = this.pagination
                    this.queryListData({size: pageSize, page: current})
                },
                pageSize: 5,
                total: 0,
                current: 1
            }
          }
        },
        created() {
          const { pageSize, current } = this.pagination
          this.queryListData({
            size: pageSize,
            page: current,
          })
        },
        methods: {
          async queryListData(pageConfig) {
            const { data: { data: { items, total } } } = await this.$axios.get('/api/list', {params: pageConfig})
            this.listData = items
            this.$set(this.pagination, 'total', total)
          }
        }
    }
</script>
<style scoped lang='less'>

</style>