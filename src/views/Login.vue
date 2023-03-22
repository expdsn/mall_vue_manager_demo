<template>

    <div class="login_container"   v-loading="loading">
        <div class="header">
            <div>欢迎来到《九龍山庄》，请先登录</div>
        </div>
        <div class="login_box" >
            <div class="avatar_box">
               <img :src="logoUrl" class="logo">

            </div>
            <el-form ref="loginFormRef" :rules="rules" :model="ruleForm"
               label-width="0" class="login_form demo-ruleForm">
                <el-form-item  label="" prop="username">
                    <el-input prefix-icon="el-icon-user"
                        placeholder="请输入账号"
                        v-model="ruleForm.username"></el-input>
                </el-form-item>
                <el-form-item  label="" prop="passwd">
                    <el-input :type="isCheck?'text':'password'" prefix-icon="el-icon-lock"
                        placeholder="请输入密码"
                        v-model="ruleForm.passwd">
                        <i slot="suffix" @click="changeHide" class="el-icon-view"></i>
                    </el-input>
                </el-form-item>
                 <el-checkbox v-model="checked">14天内免登录</el-checkbox>
            </el-form>
            <div class="btns">
                 <el-button type="primary" @click="login">登录</el-button>
                  <el-button type="info" @click="toRegister">注册</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                username: "",
                passwd: ""
            },
            isCheck: false,
            loading: false,
            checked:true,
            rules: {
                username : [
                    { required: true, message: '账号不能为空', trigger: 'blur'}, 
                    { min: 5, max: 12, message: '请输入正确的账号', trigger: 'blur' }

                ],
                passwd : [
                    { required: true, message: '请输入密码', trigger: 'blur'},
                    { min: 5, max: 16, message: '请输入5到16位的密码', trigger: 'blur' }


                ]
            },
            logoUrl: 'https://pic.imgdb.cn/item/6193bdc22ab3f51d91b4506c.png'
        }

    },
    created(){
        let loginUser = JSON.parse(localStorage.getItem('loginUser'))
        if(loginUser) {
            this.$message.error('请勿重复登录')
            this.$router.replace({path:'/Home'})
            
        }
    },
     beforeDestroy () {
        document.querySelector('body').removeAttribute('style')
    },
    beforeCreate () {
    document.querySelector('body').setAttribute('style', 'padding-top:0;')
    console.log(123);
    },
    methods: {
        changeHide(){
            this.isCheck = !this.isCheck
        },
        toRegister() {
            this.$router.push('/Register')
        },
        login() {
            this.$refs.loginFormRef.validate(async valid=>{
                if (!valid) return
                this.loading = true
                const that = this
                const { data:res } = await this.$http.post('/user/login', {
                    userid : that.ruleForm.username,
                    passwd : that.ruleForm.passwd
                })
                if (res.code !==200) {
                    setTimeout(()=>{

                        that.loading = false;
                        that.$message.error('账号或者密码错误！')
                    }, 1000)
                    return 
                }
                else {
                    localStorage.clear()
                    localStorage.setItem('token', JSON.stringify(res.token))
                    localStorage.setItem('loginUser', JSON.stringify(res.userInfo))
                    
                    setTimeout(()=>{
                        that.$router.replace({path:'/Home'})

                        that.loading = false;
                        that.$message.success('登陆成功！')

                    }, 1000)
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
    body{
        padding-top: 0 ;
    }
    .circular{
        text-align: center;
    }

    .header {
        background-color: #fff;
        opacity: 0.7;
        
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
            font-size: 20px;
            color: #333;
        }
        box-shadow: 1px 2px 3px #666;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .login_box {
        background-color: #fff;
        width: 340px;
        height: 270px;
        position: absolute;
        left: 50%;
        opacity: 0.94;
        top: 50%;
        transform: translate(-50%, -50%);
        .avatar_box{
            box-shadow: 0 0 10px #ddd;
            height: 100px;
            width: 100px;
            position: absolute;
            left: 50%;
            background-color: #fff;
            border-radius: 50%;
            z-index: 9;
            transform: translate(-50%, -50%);
            padding: 10px;

            img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
 
                background-color: #eee;
            }
        }
        .login_form{
            padding: 0 20px;
            box-sizing: border-box;
            margin-top: 70px;
        }
        .btns {
            width: 100%;
            display: flex;
            justify-content: space-evenly;
        }

    }
    .login_container {
        height: 100%;
        background-image: url(https://coc.gameark.cn/images/index_03.jpg);
        background-size: auto 100%;
        background-repeat: no-repeat;
    }

</style>