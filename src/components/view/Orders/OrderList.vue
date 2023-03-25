<template>
  <div @click="$emit('makeCla')" class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="mb-5">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>   
 <!-- <el-alert
    title="您的身份不是超级管理员, 无法对页面进行修改"
    type="warning"
    show-icon :closable="false" v-if="loginUser.isOrder<2">
  </el-alert> -->
    <el-row>
        <el-col :span="6" :offset="15">
          <el-button icon="el-icon-plus" @click="allFormVisible = true" type="primary">
          添加订单</el-button></el-col>
        
    </el-row>
    <div class="mt-10">


      <el-table   class="text-center"  :data="dataList"  style="width: 100%">
          <el-table-column min-width="100px" prop="id" label="订单编号">
          </el-table-column>
          
          <el-table-column min-width="100px"  prop="gId" label="商品编号">
          </el-table-column>
          <el-table-column min-width="100px"  prop="uId" label="用户编号">
          </el-table-column>
          <el-table-column min-width="100px"  prop="orderTime" label="交易日期">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>

    </div>
<el-dialog
  title="提示"
  :visible.sync="deleteVisible"
  width="82%"
  :before-close="handleClose">
  <span>确认删除？</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="deleteVisible = false">取 消</el-button>
    <el-button type="danger" @click="deleteOrder">删 除</el-button>
  </span>
</el-dialog>
<el-dialog title="添加订单" :visible.sync="allFormVisible">
  <el-form :model="form" ref="loginFormRef" :rules="rules">
    <el-form-item  label="用户号" prop="tag" :label-width="formLabelWidth">
      <el-input v-model="form.uid"  autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item  label="商品号" prop="tag" :label-width="formLabelWidth">
      <el-input v-model="form.gid"  autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item  label="交易日期" prop="tag" :label-width="formLabelWidth">
        <el-date-picker
        v-model="form.orderTime"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="allFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addOrder()">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>

<script>

export default {
  
  data(){
    return {
      tempTag: '',
      tempClan: -1,
      tempRank: -1,
      dataList: [],
      form:{
        id:'',
        uid:'',
        gid:'',
        orderTime:''
      },
      rules: {

      },
      nowIndex:-1,
      loginUser:{},
      editUserVisible: false,
      deleteVisible: false,
      allFormVisible:false,
      formLabelWidth: '80px'
    }
  },
  components:{
  },
  created: async function(){
    const that = this
  
    that.loginUser = JSON.parse(localStorage.getItem('loginUser'))
    const {
        data: res
    } = await that.$http.get('/order')
    if (res.code == 200) {
      this.dataList = res.data.reverse()
      console.log(res);
    }

   

  },

  methods: {
    tableRowClassName({row, rowIndex}) {
        let loginUser = JSON.parse(localStorage.getItem('loginUser'))
        if (row.admin_tag === loginUser.tag) {
            return 'warning-row'
        }

    return '';
    },
    addOrder(){
      const that = this
        this.$refs.loginFormRef.validate(async valid=>{
            if (!valid) return
            
            that.allFormVisible = false
            let list = that.dataList
            this.$http.post('/order', {
              ...this.form
            }).then(res=>{
              if (res.data.code == 200) {
                that.$message.success('添加成功')
                that.reload()
                
              }else {
                that.$message.error('添加失败')
              }

              
            })
            
      })
    },
    async reload(){
      const that = this
  
      that.loginUser = JSON.parse(localStorage.getItem('loginUser'))
      const {
          data: res
      } = await that.$http.get('/order')

      if (res.code == 200) {
        console.log(res.data);
        this.dataList = res.data.reverse()
      }
    },
      handleDelete(index, row) {
         this.deleteVisible = true
         this.nowUser = row
        this.nowIndex = index

      },
       handleClose(done) {
    
            done();

      },

      deleteOrder() {
        const that = this
        that.deleteVisible = false
        let list = this.dataList
        console.log(list);
        that.$http.delete("/order/"+ that.nowUser.id).then(res=>{
          if(res.data.code == 200) {
            that.$message.success('删除成功')
            
            list = list.splice(that.nowIndex, 1)
          }else {
            that.$message.error('删除失败')
          }
        })


      }
  }
}
</script>

<style lang="less" src="./order_list.less">


</style>