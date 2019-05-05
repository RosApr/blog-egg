<template>
  <div style='padding: 0 60px;'>
    <a-list
      itemLayout="vertical"
      size="large"
      :pagination="false"
      :dataSource="list"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-row>
            <a-col :span='16' style='text-align: left;'>
              <p>标题：{{item.title}}</p>
              <p>发布时间：{{item.date}}</p>
            </a-col>
            <a-col :span='8'>
              <router-link :to='{name: "blogDetail", params: {id: item.id}}'>more</router-link>
            </a-col>
          </a-row>
        </a-list-item>
        <a-pagination style='text-align:right;margin-top:20px;'  @change="handlePaginationChange" v-bind='pagination' />
    </a-list>
    <a-button class='publish-btn' type="primary" @click='goPulish' size='large'>发布</a-button>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {
      }
    },
    created() {
      this.queryBlogList()
    },
    computed: {
      ...mapState('blog', [
        'list', 'pagination'
      ]),
      ...mapGetters('user', [
        'isLogin'
      ])
    },
    methods: {
      goPulish() {
        this.$router.push({name: this.isLogin? 'blogPublish' : '401'})
      },
      handlePaginationChange(current) {
        this.updatePagination({current})
        this.queryBlogList()
      },
      ...mapMutations('blog', [
        'updatePagination'
      ]),
      ...mapActions('blog', [
        'queryBlogList',
      ]),
      
    }
  }
</script>
<style scoped lang='less'>
  .publish-btn {
    position: absolute;
    bottom: 10%;
    left: 50%;
    transform: translate3d(-50%, 0, 0)
  }
</style>