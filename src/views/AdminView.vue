<template>
  <a-layout class='admin-layout-container'>
    <Header />
    <a-layout class='admin-layout-content-container'>
      <a-layout-sider width="200" style="background: #fff">
        <a-menu
          mode="inline"
          :defaultSelectedKeys="[active]"
          :defaultOpenKeys="[]"
          :selectedKeys='[active]'
          :style="{ height: '100%', borderRight: 0, paddingTop: '24px' }"
          @click='handleMenuClick'
        >
          <a-menu-item key="adminBlogList">
            <span><a-icon type="table" />文章管理</span>
          </a-menu-item>
          <a-menu-item key="adminCategoriesList">
            <span><a-icon type="profile" />类目管理</span>
          </a-menu-item>
          <a-menu-item key="adminUserList">
            <span><a-icon type="user" />用户管理</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout style="padding:0">
        <a-layout-content ref='scrollDom'
            v-bar="{ preventParentScroll: true, scrollThrottle: 30}"
            class='admin-layout-router-container'
            :style="{ background: '#fff', margin: '24px 24px 0', minHeight: '280px' }"
        >
            <div>
                <router-view class='router-view'></router-view>
            </div>
        </a-layout-content>
        <a-layout-footer>
            <CopyRight />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
    import CopyRight from '@/components/Footer'
    import Header from '@/components/Header'
    export default {
        data() {
            return {
                collapsed: false,
                active: ''
            }
        },
        created() {
          this.active = this.$route.name
        },
        mounted() {
            this.$vuebar.refreshScrollbar(this.$refs.scrollDom, {
                scrollThrottle: 30,
                preventParentScroll: true
            })
        },
        watch: {
          '$route'(newval, oldval) {
            this.active = newval.name
          }
        },
        methods: {
            handleMenuClick({item, key, keyPath}) {
              this.$router.push({name: key})
            }
        },
        components: {
            CopyRight,
            Header
        }
    }
</script>
<style lang="less" scoped>
    .admin-layout-container {
        height: 100%;
        .admin-layout-content-container {
            height: calc( 100% - 64px);
            .router-view {
              padding: 20px;
            }
        }
    }
</style>