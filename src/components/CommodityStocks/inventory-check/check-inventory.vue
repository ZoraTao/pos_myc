<template>
  <div class="check-inventory" v-if="data!==null">
    <!--top-->
    <div class="inquiry-row">
      <h2 class="titl">盘点单号：{{data.warehouseCheckCode}}</h2>
      <div class="titl-bot">
        <div class="fn-left am-ft-12">
          <span><em>类型：</em>{{data.warehouseCheckTypeName}}</span>
          <span><em>盘点时间</em>：{{data.initCheckTime}}</span>
          <span><em>盘点仓库：</em>{{data.warehouseName}}</span>
          <span><em>盘点人：</em>{{data.checkUserName}}</span>
        </div>
        <div class="fn-right am-ft-13">
          <span><em>盘前数合计：</em><strong>1000</strong></span>
          <span><em>实盘数合计：</em><strong>1010</strong></span>
          <span><em>差异数合计：</em><strong>10</strong></span>
        </div>
      </div>
    </div>

    <!--content-->
    <div class="inquiry-row mgt8" style="padding-bottom: 20px">
      <!--form-->
      <el-form :inline="true" :model="select" class="demo-form-inline am-ft-left">
        <el-row class="am-ft-12">
          <el-col :span="15">
            <el-form-item
              label="类别："
              :rules="[{required:true}]">
              <el-input v-model="select.class" placeholder="请输入" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item
              label="品牌："
              :rules="[{required:true}]">
              <el-select v-model="select.varieties" placeholder="请选择" style="width: 120px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="品种："
              :rules="[{required:true}]">
              <el-select v-model="select.brand" placeholder="请选择" style="width: 120px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="select._check"><span class="am-ft-12">显示“0”库存</span></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button plain @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-input
            class="scan-btn"
            placeholder="商品编码/条形码/快速码"
            v-model="enterCode">
            </el-input>
            <el-button class="scan-btn2" type="primary"><img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_saoma.png"/>
            </el-button>
          </el-col>
          <el-col :span="5" class="am-ft-right " style="margin-bottom:15px;">
            <el-button type="primary" plain>导入盘点单</el-button>
            <el-button type="primary" class="mgl10">导出盘点表</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          stripe
          size="small"
          align="left"
          style="width: 100%">
          <el-table-column
            prop="a"
            label="商品编码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="b"
            label="商品名称"
            width="230">
          </el-table-column>
          <el-table-column
            prop="c"
            label="类别">
          </el-table-column>
          <el-table-column
            prop="d"
            label="品牌">
          </el-table-column>
          <el-table-column
            prop="e"
            label="品种">
          </el-table-column>
          <el-table-column
            prop="f"
            label="零售单价">
          </el-table-column>
          <el-table-column
            prop="g"
            label="盘前数">
          </el-table-column>
          <el-table-column
            label="实盘数">
            <template slot-scope="scope">
              <el-input  placeholder=" " style="width: 80px"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="差异数">
            <template slot-scope="scope">
              <span v-if="scope.row.h !== 0" class="am-ft-red">{{scope.row.h}}</span>
              <span v-if="scope.row.h == 0" class="am-text-placeholder">{{scope.row.h}}</span>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <!-- <el-pagination
          background
          class="am-ft-right mgt10"
          layout=" prev, pager, next"
          :total="10">
        </el-pagination> -->
      </el-form>
      <div class="full-line-dashed"></div>
     
      <el-col :span="6">
        <el-button type="primary">保存盘点</el-button>
        <el-button class="mgl10">结束盘点并生成调整单</el-button>
      </el-col>
    </div>

  </div>
</template>

<script>
  export default {
    name: "check-inventory",
    data() {
      return {
        input1: '镜架',
        input2: '',
        enterCode:'',
        data:null,
        select:{
          class:'',
          classArr:[],
          varieties:'',
          varietiesArr:[],
          brand:'',
          brandArr:[],
          _check: false
        },
        tableData: [{
          a: 'PD1230001',
          b: '卡尔丹尼光学架（配镜盒）691-6062',
          c: '镜架',
          d: '卡尔丹尼',
          e: '光学架(配镜盒)',
          f: '149',
          g: '100',
          h: `-1`
        }]
      }
    },

    methods: {
      changesSelect(type){
            let _this = this;
            let id = '';
            // console.log(this.selectBrand)
            switch ((type).toString()) {
              case '0':
                  _this.select.class= '';
                  _this.select.classArr= [];
                  _this.select.brand = '';
                  _this.select.brandArr = [];
                  _this.select.varieties= '';
                  _this.select.varietiesArr= [];
                break;
              case '1':
                  id = _this.select.class;
                  _this.select.varieties= '';
                  _this.select.varietiesArr= [];
                  _this.select.brand = '';
                  _this.select.brandArr = [];
                break;
              case '2':
                  id=_this.select.varieties;
                  _this.select.brand='';
                  _this.select.brandArr = [];
                  if(id=="") return
                break;

          }
           _this.$myAjax({
                url: 'pos-api/productCategory/list',
                data: {
                        productCategoryId: id
                }
            ,success:function(res){
                  if (res.code != '1') {
                    _this.$message({
                      showClose: true,
                      message: '请求数据出问题喽，请重试！',
                      type: 'error'
                    })
                    return false;
                  } else {
                      switch ((type).toString()) {
                        case '1':
                              let list = [];
                              for(var i=0;i<res.data.productCategoryList.length;i++){
                                  if(res.data.productCategoryList[i].productCategoryId == "C001"||res.data.productCategoryList[i].productCategoryId == "C004"){
                                    list.push(res.data.productCategoryList[i]);
                                  }
                              }
                              _this.varietiesArr=list;
                              break
                          case '2':
                              _this.brandArr=res.data.productCategoryList;
                              break;
                          default:
                              break;
                      }
                  }
                },error:function(err){
                  console.info(err);
                  _this.$message({
                    showClose: true,
                    message: '请求数据失败，请联系管理员',
                    type: 'error'
                  })
                }
      })},
      onSubmit() {
        console.log('submit!');
      }
    },
    created(){
      console.log(this.$route.params.data)
      this.data = this.$route.params.data;
    }
  }
</script>

<style scoped lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";

  .scan-btn2{
      padding: 6px 10px !important;
      margin-left: -6px;
      position: relative;
      border-radius: 0 4px 4px 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      vertical-align: -2px;
  }
  .check-inventory {
    .inquiry-row{
      overflow: hidden;
    }
    .titl {
      width: 100%;
      font-size: 15px;
      color: #000000;
      padding-bottom: 15px;
      border-bottom: 1px solid #E1E1E1;
    }
    .titl-bot {
      padding-top: 13px;
      overflow: hidden;
      line-height: 20px;
      color: #333333;
      span:not(:last-child) {
        margin-right: 40px;
      }
      em {
        color: #888888 !important;
      }
      strong {
        font-size: 20px;
      }
    }
    .full-line-dashed {
      margin: 16px auto;
    }
  }
</style>
