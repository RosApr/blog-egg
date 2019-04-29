<template>
    <div>
        <h3>标题：{{detail.title}}</h3>
        <div>详情：{{detail.content}}</div>
        <div>发布时间：{{detail.date | moment(timeFormat)}}</div>
        <div>浏览量：{{detail.pv}}次</div>
        <div v-if='detail.nickname'>发布人：{{detail.nickname}}</div>
        <a-row type="flex" justify="center" align="middle">
            <a-col :span="24" style='text-align:center;'>
                <a-button @click='$router.go(-1)'>返回首页</a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    import { timeFormat } from '@/assets/config'
    import { mapState, mapActions } from 'vuex'
    export default {
        data() {
            return {
                timeFormat
            }
        },
        computed: {
            ...mapState('blog', [
                'detail'
            ])
        },
        created() {
            const { id } = this.$route.params
            this.queryBlogDetail({id})
            this.addBlogPv({id})
        },
        methods: {
            ...mapActions('blog', [
                'queryBlogDetail',
                'addBlogPv'
            ])
        }
    }
</script>
<style scoped lang='less'>

</style>

