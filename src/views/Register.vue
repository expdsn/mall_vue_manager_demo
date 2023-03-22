<template>
    <div class="register_container">
        <div class="register_box"  v-loading="checking">
            <el-form ref="form" :rules="rules" :model="form" label-width="80px">
                <el-form-item  label="账号" prop="userid">
                  <el-input placeholder="请创建账号" v-model="form.userid" :disabled="isCheck"></el-input>
                </el-form-item>
                <el-form-item label="个人标签" prop="tag">
                  <el-input placeholder="请输入标签（带#）" v-model="form.tag" :disabled="isCheck"></el-input>
                </el-form-item>
                 <div class="sub-title">为防止冒用他人村庄标签，需要进行api验证，api令牌在游戏设置-更多设置里面可以看见</div>
                <el-form-item label="API令牌" prop="token">
                  <el-input placeholder="请输入API令牌" v-model="form.token" :disabled="isCheck"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="passwd">
                  <el-input placeholder="创建你的密码"  v-model="form.passwd" :disabled="isCheck"></el-input>
                </el-form-item>
                <el-row>
                 <el-button :type="isCheck?'success':'warning'" plain 
                 @click="makeChecking" :disabled="isCheck">验证信息</el-button>

                </el-row>
                <div v-if="isCheck">
                <el-form-item label="游戏名">
                <el-input :disabled="true" v-model="form.name" ></el-input>
                </el-form-item>
               
                <el-form-item label="所在分部">
                <el-select v-model="form.clan" placeholder="未知" :disabled="true">
                <el-option label="九龙" value="九龙"></el-option>
                <el-option label="恶城" value="恶城"></el-option>
                <el-option label="异族" value="异族"></el-option>
                <el-option label="凉城" value="凉城"></el-option>
                </el-select>
                 </el-form-item>
                <el-form-item label="职位">
                <el-select v-model="form.role" placeholder="未知" :disabled="true">
                <el-option label="成员" value="成员"></el-option>
                <el-option label="长老" value="长老"></el-option>
                <el-option label="副首领" value="副首领"></el-option>
                <el-option label="首领" value="首领"></el-option>
                </el-select>
                 </el-form-item>
                 <el-row>

                 <el-button type="success" :disabled="!isCheck" @click="makeRegister">立即注册</el-button>
                 </el-row>
                 </div>
            </el-form>
        </div>
    </div>


</template>

<script>
export default {
    beforeCreate () {
    document.querySelector('body').setAttribute('style', 'padding-top:0;')
    console.log(123);
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
                userid:'',
                tag: '',
                passwd: '',
                role: '',
                clan: '',
                name:'未知',
                token: ''
            },
            checking: false,
            isCheck: false,
            clanName: ['九龙', '恶城', '异族', '凉城'],
            clan:-1,
            rules: {
                userid : [
                    { required: true, message: '账号不能为空', trigger: 'blur'}, 
                    { min: 6, max: 11, message: '请输入6到11位的账号', trigger: 'blur' }

                ],
                passwd : [
                    { required: true, message: '请输入密码', trigger: 'blur'},
                    { min: 5, max: 16, message: '请输入5到16位的密码', trigger: 'blur' }


                ],
                token:  [
                    { required: true, message: '请输入API令牌', trigger: 'blur'}

                ],
                tag : [
                    { required: true, message: '请输入标签', trigger: 'blur'},


                ]
            },
        }
    },
    methods : {
        makeRegister() {
            const that = this
            that.checking = true
            this.$http.post('/user/register',{
                tag : that.form.tag,
                passwd: that.form.passwd,
                username: that.form.name,
                role: that.form.role,
                userid: that.form.userid
            }).then(res=>{
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
                    that.$message.error('注册失败！未知的错误')
                    that.checking = false;
                    
                    }, 1000)
                    return

                }
            })
        },
        makeChecking() {
            const that = this
            let playerInfo = {}
            this.$refs.form.validate(async valid=>{
                if(!valid) return
                this.checking = true
                
                const { data : res} = await this.$http.post('/clan/queryMember', {
                    tag : that.form.tag
                })
                playerInfo = res.data
                that.clan = res.clan

                if (res.code !== 200) {
                    
                    setTimeout(()=>{

                        this.checking = false;
                        that.$message.error('未找到你的村庄信息！检查是否已经退出部落')
                    }, 1000)
                    return 
                }else {
                    const {data :result} = await this.$http.post('/user/isExist', {
                        userid : that.form.userid
                    })
                    if (result.code != 200) {
                        setTimeout(()=>{

                        that.checking = false;
                        that.$message.error('此账号已经存在！')
                        }, 1000)
                         return 
                    }
                    
                    const {data :res2} = await this.$http.post('/clan/isExist', {
                        tag : that.form.tag
                    })
                    if (res2.code == 200) {
                         setTimeout(()=>{

                        that.checking = false;
                        that.$message.error('该标签已被绑定，请联系管理员 感觉')
                        }, 1000)
                         return 
                    }
                    const { data : res } = await this.$http.post('/clan/verifyPlayer',{
                        tag : that.form.tag,
                        token: that.form.token
                    })
                    if (res.code === 200) {
                    setTimeout(()=>{
                            
                        that.checking = false;
                        that.$message.success('验证通过')
                        that.isCheck = true
                        that.$set(that.form, 'name', playerInfo.name)
                        that.$set(that.form, 'clan', that.clanName[that.clan])
                        let roleName = ""
                        if (playerInfo.role === 'leader')
                            roleName = '首领'
                        else if (playerInfo.role === 'coLeader') 
                            roleName = '副首领'
                        else if (playerInfo.role === 'admin')
                            roleName = '长老'
                        else 
                            roleName = '成员'
                        that.$set(that.form, 'role', roleName)

                        
                    }, 1000)
                    return
                    }else {
                        setTimeout(()=>{

                        that.checking = false;
                        that.$message.error('api验证失败！不匹配')
                        }, 1000)
                         return 
                    }
                    
                }
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
        background-image: url(https://coc.gameark.cn/images/index_03.jpg) !important;

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