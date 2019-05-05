<template>
    <div class='exception-container'>
        <p>401</p>
        <a-button @click='$router.push({name: "login"})'>去登录</a-button>
        <a-button @click='$router.push({name: "register"})'>去注册</a-button>
        <a-button @click='$router.push({name: "userBlogList"})'>暂不注册，继续浏览</a-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {}
        },
        
    }
</script>
<style lang='less' scoped>
    .exception-container {
        width: 100%;
        height: 100%;
    }
</style>
