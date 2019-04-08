<template>
    <div class='exception-container'>
        <p>{{tip}}</p>
    </div>
</template>
<script>
    export default {
        data() {
            const errorMsg = {
                401: {
                    tip: 401,
                    img: ''
                },
                403: {
                    tip: 403,
                    img: ''
                },
                500: {
                    tip: 500,
                    img: ''
                }
            }
            return {
                type: '',
                errorMsg
            }
        },
        created() {
            this.type = this.$route.query.type || 403
        },
        computed: {
            tip() {
                return this.errorMsg[this.type]['tip']
            }
        }
    }
</script>
<style lang='less' scoped>
    .exception-container {
        width: 100%;
        height: 100%;
    }
</style>
