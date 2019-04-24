<template>
    <div>
        <h3>标题：{{title}}</h3>
        <div>详情：{{detail}}</div>
        <div>发布时间：{{date}}</div>
        <div v-if='name'>发布人：{{name}}</div>
        <a-row type="flex" justify="center" align="middle">
            <a-col :span="24" style='text-align:center;'>
                <a-button @click='$router.push({name: "userBlogList"})'>返回首页</a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                title: '',
                detail: '',
                date: '',
                name: '',
            }
        },
        created() {
            const { id } = this.$route.params
            this.queryDetail(id)
        },
        methods: {
            async queryDetail(id) {
                const { data: { data: { title, detail, name, date }} } = await this.$axios.get(`/api/detail/${id}`)
                this.title = title
                this.detail = detail
                this.name = name
                this.date = date

            }
        }
    }
</script>
<style scoped lang='less'>

</style>

