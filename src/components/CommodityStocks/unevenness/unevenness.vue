<template>
  <div class="unevenness">
      <div class="header">
          <label>仓库：</label>
          <el-select v-model="selectBase" placeholder="请选择" style="width: 130px">
              <el-option 
              v-for="item in baseList"
              :key="item.warehouseId"
              :label="item.warehouseName"
              :value="item.warehouseId"
              ></el-option>
              </el-select>
          <el-button @click="clickTab(tab)">查询</el-button>
      </div>
      <div class="main">
        <el-tabs v-model="tab" @tab-click="clickTab">
          <el-tab-pane label="未处理" name="notHandle">
            <div class="content">
              <div class="box98">
                <not-handle ref="notHandle" :baseId="selectBase"></not-handle>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="已处理" name="yesHandle">
            <div class="content">
              <div class="box98">
                 <already-handle ref="alreadyHandle" :baseId="selectBase"></already-handle>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script>
import notHandle from './notHandle.vue'
import alreadyHandle from './alreadyHandle.vue'

  export default {
      name:'unevenness-order-index',
      components:{
        alreadyHandle,notHandle
      },
      data() {
        return {
          data: 1,
          tab:'notHandle',
          selectBase:'',
          baseList:[]
        }
      },
      methods:{
        clickTab(){
          const _this = this;
          if(_this.tab == 'notHandle'){
              _this.$nextTick(()=>{
                _this.$refs.notHandle.requestOrder(0);
              })
          }else if(_this.tab == 'yesHandle'){
              _this.$nextTick(()=>{
                _this.$refs.alreadyHandle.requestOrder(2);
              })
          }
        },
        searchBase(){
          const _this = this;
          _this.$myAjax({
            url:'pos-api/warehouse/getWarehouseList',
            data:{},
            success:function(res){
              if(res.code == 1){
                  _this.baseList = res.data.list;
              }
            },error:function(err){
              _this.$message({
                showClose: true,
                message: err,
                type: "error"
              })
            }
          })
        }
        
    },
    created(){
      this.clickTab();
      this.searchBase();
    }
  }
</script>

<style scoped lang="scss">
@import '../../../reset.scss';

*{
  box-sizing:box-sizing;
}
.unevenness{
  overflow:hidden;
  .header{
    width:calc(100% - 15px);
    min-width:1240px;
    margin:0 auto;
    background:#fff;
    margin-top:10px;
    height:70px;
    padding-top:20px;
    padding-left:30px;
    .el-button{
        border: 1px solid #00AFE4;
        margin-left:30px;
        border-radius: 4px;
        font-size: 12px;
        color: #00AFE4;
    }
  }

  .main{
    width:calc(100% - 15px);
      min-width:1240px;
      margin:0 auto;
      margin-top:10px;
      min-height:400px;
      .content{
         min-height:400px;
         background:#fff;
         overflow:hidden;
      }
      .box98{
        width:98%;
        margin:0 auto;
        margin-top:15px;
        overflow:hidden;
      }
  }
}
</style>
<style>
.el-tabs__nav-scroll{

}
.el-tabs__item{
  text-align:center;
  width:160px !important; 
    height:40px !important;
    padding:0;
}
.el-tabs__content{
}
.el-tabs__header{
  margin:0;
}
.is-active{
      background:#fff;
      border-radius: 10px 10px 0 0;
  }
  .el-tabs__active-bar {
    background:none;

  }
  .el-tabs__nav-wrap::after{
    width:0 !important;
  }
</style>