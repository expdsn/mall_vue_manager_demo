<template>
    <div class="register_container">
        <div class="register_box"  v-loading="checking">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item  label="账号" prop="account">
                  <el-input placeholder="请创建账号" v-model="form.account" ></el-input>
                </el-form-item>
                <el-form-item label="个性昵称" prop="uname">
                  <el-input placeholder="请输入标签（带#）" v-model="form.uname" ></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                  <el-input placeholder="创建你的密码"  v-model="form.passwd" ></el-input>
                </el-form-item>
                <el-row>

                 <el-button type="success"  @click="makeRegister">立即注册</el-button>
                </el-row>

            </el-form>
        </div>
    </div>


</template>

<script>
export default {
    beforeCreate () {
    document.querySelector('body').setAttribute('style', 'padding-top:0;')

    },
    //销毁前清除
    mounted(){
    document.querySelector('body').setAttribute('style', 'padding-top:0;')

    },

    created(){
    },
    data() {
        return {
            form : {
                account:'',
                passwd:"",
                uname:""
            },
            checking: false,
            rules: {
                account : [
                    { required: true, message: '账号不能为空', trigger: 'blur'}, 
                    { min: 6, max: 11, message: '请输入6到11位的账号', trigger: 'blur' }

                ],
                passwd : [
                    { required: true, message: '请输入密码', trigger: 'blur'},
                    { min: 5, max: 16, message: '请输入5到16位的密码', trigger: 'blur' }
                ],
                uname : [
                    { required: true, message: '请输入昵称', trigger: 'blur'},
                    { min: 2, max: 15, message: '昵称长度太长或太短', trigger: 'blur' }


                ]
            },
        }
    },
    methods : {
        makeRegister() {
            const that = this
            this.$refs.form.validate(async valid=>{
                if (!valid) return

                that.checking = true
            console.log("register.." + JSON.stringify( that.form));

            this.$http.post('/user/register',{
                uname : that.form.uname,
                passwd: that.form.passwd,
                account: that.form.account,
            }).then(res=>{
                console.log('registed');
                console.log(res);
                if (res.data.code === 200) {
                    setTimeout(()=>{

                    that.checking = false;
                    that.$message.success('注册成功！')
                    that.$router.push('/Login')
                    
                    }, 1000)
                    return
                }else {
     
                     setTimeout(()=>{
                    that.$message.error('注册失败！账号重复！')
                    that.checking = false;
                    
                    }, 1000)
                    return

                }
            }).catch(e=>{
                console.log(e);
                
                setTimeout(()=>{
                    that.$message.error('注册失败！未知的错误')
                    that.checking = false;
                    
                    }, 1000)
                    return
            })
        })
        
        }
    
    }

}

</script>

<style lang="less" scoped>

    .register_container {
        width: 100%;
        height: 100%;
        background-size: auto 100%;
        background-repeat: no-repeat;
        background-position: center;
        // background-image: url(https://coc.gameark.cn/images/index_03.jpg) !important;
        background-color: #dddddd;
        .register_box{
            width: 100%;
            opacity: 0.9;
            background-color: #fff;
            padding: 0 15px;
            box-sizing: border-box;
            height: 100vh;

            .el-form {
                padding-top: 100px;
                width: 100%;
            }
            .el-row {
                display: flex;
                justify-content: center;
            }
            .el-button {
                margin-bottom: 10px;
            }
        }
    }
    .sub-title{
        color: #8492A6;
        display: flex;
        justify-content: center;
        font-size: 14px;
        box-sizing: border-box;
        text-indent: 10px;
        margin-bottom: 5px;
    }
</style>