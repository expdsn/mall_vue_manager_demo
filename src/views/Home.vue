<template>
<el-container class='h-full'>
    <el-header height="50px">
        <div class="controler" @click="changeCollapse"><i class="shadow-lg el-icon-s-unfold" v-bind:class="{'text-blue-500': !isCollapse, 'text-gray-500' : isCollapse
        , 'el-icon-s-fold': !isCollapse}"></i></div>
        <div>
            <el-dropdown trigger="click" @command="handleCommand">
                <el-button type="primary" circle icon="el-icon-more-outline"></el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">个人中心</el-dropdown-item>
                    <el-dropdown-item command="b" @click="logout">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-header>
    <el-container>
        <el-aside width="1px">
            <el-menu  unique-opened
             default-active="/Welcome" class="el-menu-vertical text-gray-400" v-bind:class="{extend: !isCollapse, hidden : isCollapse}" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
                <el-menu-item index="/Welcome" @click="hiden('/Home')">
                    <i class="el-icon-menu"></i>
                    <span slot="title">部落主页</span>
                    
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">
                        <i class="el-icon-s-data"></i>
                        <span slot="title">部落排行</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/Rank/ExpRank"  @click="hiden('/Rank/ExpRank')">等级排行</el-menu-item>
                        <el-menu-item index="/Rank/Don" @click="hiden('/Rank/Don')">捐兵排行</el-menu-item>
                        <el-menu-item index="/Rank/ReDon"  @click="hiden('/Rank/ReDon')">收兵排行</el-menu-item>

                    </el-menu-item-group>
                </el-submenu>
                 <el-submenu index="3">
                    <template slot="title">
                        <i class="el-icon-s-operation"></i>
                        <span slot="title">部落管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/Manager/DonationInfo" disabled  @click="hiden('/Manager/DonationInfo')">捐收情况</el-menu-item>
                        <el-menu-item index="/Manager/BlackList"  @click="hiden('/Manager/BlackList')">黑名单</el-menu-item>
                        <el-menu-item index="/Manager/adminList"  @click="hiden('/Manager/adminList')">副首名单</el-menu-item>
                        <el-menu-item index="/Manager/CheckMember" disabled @click="hiden('/Manager/CheckMember')">浏览部落</el-menu-item>

                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="5" disabled>
                    <i class="el-icon-s-flag"></i>
                    <span slot="title">部落战争</span>
                </el-menu-item>
                <el-menu-item index="4" disabled>
                    <i class="el-icon-guide"></i>
                    <span slot="title">联赛安排</span>
                </el-menu-item>

<!--     
                <el-menu-item index="/Alter/Anno" @click="hiden">
                    <i class="el-icon-circle-plus-outline"></i>
                    <span slot="title">修改公告</span>
                </el-menu-item> -->
                <el-menu-item index="6" @click="hiden('/ClanSetting')">
                    <i class="el-icon-setting"></i>
                    <span slot="title">部落设置</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <router-view @makeCla="makeCollapse"></router-view>
        </el-main>
    </el-container>
    <el-dialog
    title="提示"
    :visible.sync="logoutDialogVisible"
    width="82%"
    :before-close="handleClose">
    <span>确认退出登录？</span>
    <span slot="footer" class="dialog-footer">
        <el-button @click="logoutDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
    </span>
    </el-dialog>
</el-container>
</template>

<script>
export default {
    data() {
        return {
            isCollapse: true,
            dialogVisible: false,
            logoutDialogVisible:false,
            clansData: [],
            clanPeople: [0, 0, 0, 0],
            loginUser: {},
            donationsRank: [],
            receiveRank: [],
            clanPeople: ['--', '--', '--', '--'],
            clanName: ['九龙', '恶城', '异族', '凉城']
        }
    },
    created(){
    },
    computed: {

    },
    
    methods: {

        showErrorInfo() {
            this.$message.warning('该页面还在建设中')

        },
      
        handleCommand(command) {
            switch (command) {
                case 'a':
                    this.$message.warning('该页面还在建设中')
                    break

                case 'b':
                    this.logoutDialogVisible = true
                    break

            }
        },
 
        handleClick() {

        },
        hiden(e){
            this.$router.replace({path:e})
            this.isCollapse =true
        },
        changeCollapse() {
            this.isCollapse = !this.isCollapse

        },
        makeCollapse() {
            this.isCollapse = true
        },
        logout() {
            localStorage.clear()
            this.$router.push('/Login')
            this.$message.success('登出成功')

        },
        handleOpen() {

        }, 
        handleClose(){
            this.logoutDialogVisible = false
        }
    }
}
</script>

<style lang="less" scoped>
.clicked {
    --tw-text-opacity: 1;
    color: rgba(59, 130, 246, var(--tw-text-opacity)) !important;
}

.el-button {}
.el-button.is-circle{
    padding: 6px !important;
}
.controler {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 65px;

    i {
        // color: #909399;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0 !important;
        font-size: 24px;
    }
}

.el-header {
    box-shadow: 1px 2px 3px #dddddd;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;

    div {
        display: flex;
        align-items: center;
    }
}

.el-aside {
    overflow: visible !important;
}

.extend {
    z-index: 999;

    width: 120px;
}

.el-menu-vertical {
    height: 100vh;
}
.el-submenu .el-menu-item{
    min-width: 0 !important;
}
</style>
