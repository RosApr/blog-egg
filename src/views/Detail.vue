<template>
    <div>
        <h3>{{title}}</h3>
        <div>{{content}}</div>
        <a-row type="flex" justify="center" align="middle">
            <a-col :span="24" style='text-align:center;'>
                <a-button @click='$router.push({name: "list"})'>返回首页</a-button>
            </a-col>
        </a-row>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                title: '',
                content: ''
            }
        },
        created() {
            const { id } = this.$route.params
            this.queryDetail(id)
        },
        methods: {
            async queryDetail(id) {
                const { data: { title, content } } = await this.$axios.get('/api/detail', {params: { id }})
                this.title = title
                this.content = content

            }
        }
    }
</script>
<style scoped lang='less'>

</style>

