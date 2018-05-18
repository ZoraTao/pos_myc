<template>
  <div>
      <div class="ov option">
         <div class="options">
           <div><i class="red">*</i>零售单号:</div>
           <div><el-input placeholder="请输入需要退货的零售单号" v-model="orderId"></el-input></div>
         </div>
         <div class="options">
           <div><i class="red">*</i>退货原因:</div>
           <div>
             <el-select v-model="reason" placeholder="请选择原因">
                <el-option
                v-for="item in reasonArr"
                :key="item.id"
                :label="item.name"
                :value="item.name"
                ></el-option>
             </el-select>
             </div>
         </div>
         <div class="options">
           <div>退货说明:</div>
           <div>
            <el-input 
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 4}"
            placeholder="请输入内容"
            v-model="message"></el-input>
           </div>
         </div>
         <div class="options">
           <div>&nbsp;</div>
           <div>
             <el-button plain class="cancal" @click="toSearch(false)">取消</el-button>
             <el-button type="primary" class="enter" @click="toSearch(true)">确定</el-button>
             </div>
         </div>
      </div>
  </div>
</template>

<script>
export default {
  name:'backShopModel',
  data(){
    return{
      orderId:'',
      reason:'',
      message:'',
      nowPage:{
            'link':'/bills/backShop',
            'text':'退货单',
            'name': 'backShop'
          },
      reasonArr:[]
    }
  },
  methods: {
    searchReason(){
      let _this = this;
      _this.$myAjax({
        url:'cas-api/systemConfig/getSystemConfigList',
        data:{
            type:'17'
        },success:function(res){
          console.log(res)
          if(res.code == 1){
            _this.reasonArr = res.data.list;
          }else{
            _this.$message({
              type:'warning',
              message:'退货原因获取失败',
              showClose:true
            })
          }
        },error:function(err){
          _this.$message({
              type:'danger',
              message:'退货原因获取失败',
              showClose:true
            })
        }
      })
    },
      toSearch(bool){
        if(!bool){
          this.$emit('tohide');//关闭弹窗
        }else{
          //先请求再关闭弹窗进行跳转
          let _this = this;
          _this.$myAjax({
            url:'pos-api/orderTemp/getOrderTempList',
            data:{
              orderNo:_this.orderId,
            },
            success:function(res){
              if(res.code == 1){
                console.log(res.data.orderTempList[0])
                _this.$router.push({
                  name:_this.nowPage.name
                ,params:{datas:res.data.orderTempList[0],reason:_this.reason,desc:_this.message,order:res.data.orderTempList[0].orderId}});
                _this.$bus.$emit('createTab', _this.nowPage);
              }
            },
            error:function(err){
              console.log(err)
              _this.$message({
                showClose:true,
                type:"error",
                message:'网络请求失败'
              })
            }
          })
        }
      }
    }
};
</script>

<style scoped lang="scss">
@import "../../../reset";

.ov {
  overflow: hidden;
}

.el-input,.el-select{
  width: 209px;
}
.el-textarea{
  width: 300px;
}
.options{
  overflow: hidden;
  margin-bottom: 15px;
}
.option>div>div{
    float:left;
}
.option>div>div:nth-child(1){
    width: 80px;
    text-align: right;
    margin-right: 10px;
}
.option>div>div:nth-child(2){
        font-family: MicrosoftYaHei;
        letter-spacing: 0;
      .cancal{
        font-size: 12px;
        font-weight: 200;
        color: #666666;
      }
      .enter{
        font-size: 12px;
        font-weight: 200;
        color: #FFFFFF;
      }
}
.red{
  color: #FF6600;
}
</style>