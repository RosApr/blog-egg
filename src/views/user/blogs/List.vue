<template>
  <div class='list-container'>
    <div class="category-container">
      <p>分类：</p>
      <a-tag :class='{active: item.id == activeCategoryId }' @click='filterListByCategory(item.id)' v-for="(item, index) in categoryList" :key='index'>{{item.name}}</a-tag>
    </div>
    <a-list
      itemLayout="vertical"
      size="large"
      :pagination="false"
      :dataSource="listFormatByStar"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-row class='item-container'>
            <a-col :span='16' style='text-align: left;'>
              <a-row>
                <p>标题：{{item.title}}</p>
                <p>发布时间：{{item.date | moment(timeFormat)}}</p>
                <p>发布人：{{item.nickname}}</p>
                <p>浏览量：{{item.pv}}</p>
                <p>收藏数：{{item.star}}</p>
                <p v-if='item.isStar'>
                  <a-icon type="star" class='star-svg' theme='filled' :style='{color: "#fadb14", fontSize: "30px"}' />
                </p>
              </a-row>
            </a-col>
            <a-col :span='8'>
              <div class="table-box">
                <div class="table-content">
                  <router-link :to='{name: "blogDetail", params: {id: item.id}}'>查看详情</router-link>
                </div>
              </div>
            </a-col>
          </a-row>
        </a-list-item>
        <a-pagination style='text-align:right;margin-top:20px;'  @change="handlePaginationChange" v-bind='pagination' />
    </a-list>
    <a-button class='publish-btn' type="primary" @click='goPulish' size='large'>发布</a-button>
  </div>
</template>
<script>
  import { timeFormat } from '@/assets/config'
  import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
  export default {
    data () {
      return {
        activeCategoryId: '',
        timeFormat
      }
    },
    created() {
      this.queryBlogList({categoryId: this.activeCategoryId})
    },
    computed: {
      ...mapState('blog', [
        'list', 'pagination'
      ]),
      ...mapState('user', [
        'starConfig'
      ]),
      ...mapGetters('user', [
        'isLogin', 'isLoginAndIsRoleUser'
      ]),
      ...mapState('categories', {
        categoryList: state => state.list
      }),
      listFormatByStar() {
        const _list = JSON.parse(JSON.stringify(this.list))
        if(this.isLoginAndIsRoleUser) {
          this.list.forEach((item, index) => {
            if(this.starConfig.items.includes(item.id)) {
              _list[index]['isStar'] = !!1
            } else {
              _list[index]['isStar'] = !!0
            }
          })
        }
        return _list
      }
    },
    methods: {
      filterListByCategory(categoryId) {
        if(categoryId == this.activeCategoryId) return
        let currCategoryId = ''
        if(categoryId != 0) {
          currCategoryId = categoryId
        }
        this.activeCategoryId = categoryId
        this.updatePagination({current: 1})
        this.queryBlogList({categoryId: currCategoryId})
      },
      goPulish() {
        this.$router.push({name: this.isLogin? 'blogPublish' : '401'})
      },
      handlePaginationChange(current) {
        this.updatePagination({current})
        this.queryBlogList({categoryId: this.activeCategoryId})
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
    position: fixed;
    bottom: 10%;
    left: 50%;
    transform: translate3d(-50%, 0, 0)
  }
  .list-container {
    padding-left: 200px;
    position: relative;
    .item-container {
      display: flex;
      & > div:last-child {
        flex: 1;
      }
      .table-box {
        width: 100%;
        height: 100%;
        display: table;
        .table-content {
          display: table-cell;
          vertical-align: middle;
        }
      }
      p {
        margin-bottom: 4px;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .category-container {
    position: absolute;
    top: 20px;
    left: 20px;
    width: 180px;
    text-align: left;
    .ant-tag {
      margin-bottom: 8px;
      &.active {
        background: #1890ff!important;
        color: #fff!important;
        border-color: transparent!important;
      }
    }
  }
</style>