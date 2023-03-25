<template>
<div @click="emitCla()" class="container">

    <el-row>
        <div><span class="text-3xl antialiased subpixel-antialiased pl-2">{{loginUser.uname}}, {{getTime}}</span> </div>
        <div class="mt-1 antialiased text-sm text-right text-gray-400">欢迎登录商城管理系统</div>
          <div class="text-red-100 text-center" >当前版本：内测版Beta0.1</div>
    </el-row>


    <el-divider></el-divider>



    <div class="text-gray-300 text-center mt-5">版本号：Beta0.1</div>

</div>
</template>

<script>
import { userInfo } from 'os'
import Vue from 'vue'

export default {
    data() {
        return {
            loginUser: {
                
            }
        }
    },
    created: async function () {
        //关闭测试信息

        
    },
    mounted: function () {
        const that = this

        let token = localStorage.getItem("token")
        if (!token) {
            that.$message.warning('登陆信息过期，请重新登陆')
                that.$router.replace('/Login')
                localStorage.clear()
            return
        }
        let json = localStorage.getItem("uuid")
        let uuid =JSON.parse(json)
        this.$http.get("/user/" +uuid).then(res=>{
            if (res.data.code == 200) {
                that.loginUser = res.data.data
                localStorage.setItem("loginUser", JSON.stringify(that.loginUser))
            }else {
                that.$message.warning('登陆信息过期，请重新登陆')
                that.$router.replace('/Login')
                localStorage.clear()
            }
        }).catch(e=> {
            console.log(e);
            that.$message.warning('服务器异常')
            that.$router.replace('/Login')


            localStorage.clear()
        })



    },
    methods: {
        emitCla(){
            this.$emit('makeCla')
        },
       getDateString() {
            let hour = (new Date()).getHours()
            if (hour <= 5) {
                return '凌晨'
            } else if (hour >= 6 && hour <= 13) {
                return '中午'
            } else if (hour > 13 && hour < 18) {
                return '下午'
            } else if (hour >= 18 && hour <= 19) {
                return '傍晚'
            } else {
                return '晚上'

            }
        },
    },
    computed:{
        getTime() {
            
            return this.getDateString() + '好'
        },
        getClanName(e) {
            return this.clanName[e]
        }
    }
}
</script>

<style lang="less" scoped>
    .container {
        padding-top: 50px;
    }
    .application {
        width: 100%;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .tips{
        border-left: 10px solid #409EFF;
    }
    .bg-download{
        background-image: linear-gradient(to bottom right, #f76692, #eb295e);
    }
     .bg-download span {

         text-shadow:-2px -2px 4px #ec3059;
     }
    .bg-shop{
        background-image: linear-gradient(to bottom right, #ffb023, #ffd038);
    }
       .bg-shop span {

         text-shadow:-2px -2px 2px #fa8f20;
     }
    .bg-query{
        background-image: linear-gradient(to bottom right, #ff999a, #ff999a);
    }
    .bg-sign{
        background-image: linear-gradient(to bottom right, #55cdd0, #64d9bd);
    }
     .bg-query span {

         text-shadow:-2px -2px 2px #f76c6c;
     }
        .bg-sign span{
        text-shadow:-2px -2px 2px #3da7a7;

    }
</style>
