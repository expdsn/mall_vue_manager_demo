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
                    <span slot="title">主页</span>
                    
                </el-menu-item>
                <el-menu-item index="/Users" @click="hiden('/Users')">
                    <i class="el-icon-user"></i>
                    <span slot="title">用户管理</span>
                    
                </el-menu-item>               
                <el-menu-item index="/Goods" @click="hiden('/Goods')">
                    <i class="el-icon-goods"></i>
                    <span slot="title">商品管理</span>
                    
                </el-menu-item>
                <el-menu-item index="/Orders" @click="hiden('/Orders')">
                    <i class="el-icon-s-order"></i>
                    <span slot="title">订单管理</span>
                    
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
.el-aside {
    padding-top: 50px;
}
.el-main{
    display: flex;
    justify-content: center;
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
