<template>
  <div class="check-inventory" v-if="data!=null">
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
          <span><em>盘前数合计：</em><strong>{{data.beforeCheckCount}}</strong></span>
          <span><em>实盘数合计：</em><strong>{{data.afterCheckCount}}</strong></span>
          <span><em>差异数合计：</em><strong>{{data.checkDiffCount}}</strong></span>
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
              <el-autocomplete
                popper-class="my-autocomplete"
                style="width: 100px"
                class="inline-input"
                v-model="select.className"
                :fetch-suggestions="querySearch"
                placeholder="请输入"
                @select="handleSelect"
              >
              <template slot-scope="{ item }">
                      <div class="name" >{{ item.className }}</div>
              </template>
              </el-autocomplete>
            </el-form-item>
            <el-form-item
              label="品牌："
              :rules="[{required:true}]">
              <el-select v-model="select.varieties" placeholder="请选择" clearable style="width: 100px" @change="changesSelect(2)">
                <el-option 
                v-for="item in select.varietiesArr"
                :key="item.productCategoryId"
                :label="item.className" 
                :value="item.productCategoryId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="品种："
              :rules="[{required:true}]">
              <el-select v-model="select.brand" placeholder="请选择" clearable style="width: 100px">
                <el-option 
                v-for="item in select.brandArr"
                :key="item.productCategoryId"
                :label="item.className" 
                :value="item.productCategoryId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="select._check"><span class="am-ft-12">显示“0”库存</span></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button plain @click="readDetail()">查询</el-button>
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
            <el-upload
            class="upload-demo"
            action="http://myc.qineasy.cn/pos-api/warehouseCheckDetail/inputWarehouseCheckDetailList"
            :on-success="handleSuccess"
            multiple
            :limit="3"
            :show-file-list='false'
            :data="uploadData">
            <el-button type="primary" plain>导入盘点单</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
            <el-button type="primary" class="mgl10" @click="putOutxslx()">导出盘点表</el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          stripe
          size="small"
          align="left"
          style="width: 100%">
          <el-table-column
            prop="itemNo"
            label="商品编码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="itemName"
            label="商品名称"
            width="230">
          </el-table-column>
          <el-table-column
            prop="className"
            label="类别">
          </el-table-column>
          <el-table-column
            prop="brandName"
            label="品牌">
          </el-table-column>
          <el-table-column
            prop="breedName"
            label="品种">
          </el-table-column>
          <el-table-column
            prop="listPrice"
            label="零售单价">
          </el-table-column>
          <el-table-column
            prop="beforeCheckCount"
            label="盘前数">
          </el-table-column>
          <el-table-column
            label="实盘数">
            <template slot-scope="scope">
              <el-input   v-model="tableData[scope.$index].afterCheckCount" style="width: 80px" @input="computed(scope.$index)" @blur="saveThis(scope.row)"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            sortable
            label="差异数">
            <template slot-scope="scope">
              <span :class="{'am-ft-red':scope.row.checkDiffCount < 0,'am-text-placeholder':(scope.row.checkDiffCount >= 0)}">{{scope.row.checkDiffCount}}</span>
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
        <el-button type="primary" @click="endCheckCount(1)">保存盘点</el-button>
        <el-button class="mgl10" @click="endCheckCount(2)">结束盘点并生成调整单</el-button>
      </el-col>
    </div>
    <el-pagination
      background
      class="am-ft-right mgt10"
      layout="prev, pager, next" 
      @current-change="readDetail"
      :page-size="10"
      :total="count"
      :current-page.sync="nub">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "check-inventory",
    data() {
      return {
        input1: '镜架',
        uploadData:{},
        input2: '',
        enterCode:'',
        count:0,
        data:null,
        nub:1,
        size:10,
        fileList:[],
        select:{
          class:'',
          classArr:[],
          className:'',
          varieties:'',
          varietiesArr:[],
          brand:'',
          brandArr:[],
          _check: false
        },
        tableData: []
      }
    },

    methods: {
      endCheckCount(id){
          const _this = this;
          _this.$myAjax({
            url:'pos-api/warehouseCheck/updateWarehouseCheck',
            data:{
              warehouseCheckId:_this.data.warehouseCheckCode,
              status:id
            },
            success:function(res){
              if(res.code == 1){
                _this.$message({
                  type:'success',
                  message:res.msg,
                  showClose:true
                })
              }
            },error:function(err){
              _this.$message({
                type:'error',
                message:err,
                showClose:true
              })
            }
          })
      },
      handleSuccess(response, file, fileList){
        console.log(response, file, fileList)
        const _this = this;
        _this.$message({
          type:'success',
          message:'上传'+file.name+response.msg,
          showClose:true
        })
      },
      computed(index){
        const _this = this;
        let before = 0;
        let real = 0;
        let diff = 0;
        this.tableData[index].checkDiffCount = parseInt(_this.tableData[index].afterCheckCount)-parseInt(_this.tableData[index].beforeCheckCount);
        for(var i=0;i<this.tableData.length;i++){
            before+=parseInt(this.tableData[i].beforeCheckCount);
            real+=parseInt(this.tableData[i].afterCheckCount);
            diff+=parseInt(this.tableData[i].checkDiffCount);
        }
        this.data.beforeCheckCount = before;
        this.data.afterCheckCount = real;
        this.data.checkDiffCount = diff;
      },
      saveThis(data){
        console.log(data)
        const _this = this;
        _this.$myAjax({
          url:'pos-api/warehouseCheckDetail/updateWarehouseCheckDetail',
          data:{
            itemNo:data.itemNo,
            afterCheckCount:data.afterCheckCount,
            warehouseCheckId:data.warehouseCheckId,
            warehouseCheckCode:data.warehouseCheckCode
          },success:function(res){
            if(res.code == 1){
              console.log(res)
              if(res.code == 1){
                _this.$message({
                  type:'success',
                  message:res.msg,
                  showClose:true
                })
              }
            }
          },error:function(err){
            _this.$message({
              type:'error',
              message:err,
              showClose:true
            })
          }
        })
      },
      querySearch(queryString, cb) {
        var restaurants = this.select.classArr;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.className.toLowerCase().indexOf(queryString.toLowerCase()) != -1);
        };
      },
      handleSelect(item) {
        this.select.class = item.productCategoryId;
        this.select.className = item.className;
        this.changesSelect(1);
      },
      putOutxslx(){
        const _this = this;
        _this.$myAjax({
          url:'pos-api/warehouseCheckDetail/exportWarehouseCheckDetailList',
          data:{
            classId:_this.select.class,
            brandId:_this.select.varieties,
            breedId:_this.select.brand,
            warehouseCheckCode:_this.$route.query.id,
            nub:_this.nub==1?'0':(_this.nub-1)*_this.size,
            size:_this.size
          },success:function(res){
            if(res.code == 1){
              window.open(res.data.path)
            }
          },error:function(err){
             _this.$message({
                type:'error',
                message:err,
                showClose:true
            })
          }
        })
      },
      changesSelect(type){
            let _this = this;
            let id = '';
            // console.log(this.selectBrand)
            switch ((type).toString()) {
              case '0':
                  _this.select.class= '';
                  _this.select.className= '';
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
                  if(id=="") return
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
                        case '0':
                          _this.select.classArr = res.data.productCategoryList;
                          break;
                        case '1':
                          _this.select.varietiesArr = res.data.productCategoryList;
                            break;
                        case '2':
                          _this.select.brandArr = res.data.productCategoryList;
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
      readDetail(id){
        if(!id){
          id=this.$route.query.id;
        }
        if(this.select.className == ''){
          this.select.class = '';
        }
        const _this = this;
        _this.$myAjax({
          url:'pos-api/warehouseCheckDetail/getWarehouseCheckDetailList',
          data:{
            classId:_this.select.class,
            brandId:_this.select.varieties,
            breedId:_this.select.brand,
            flag:_this.select._check?'1':'',
            warehouseCheckCode:id,
            nub:_this.nub==1?'0':(_this.nub-1)*_this.size,
            size:_this.size
          },
          success:function(res){
            if(res.code == 1){
              _this.count = res.data.count;
              _this.tableData= res.data.list ;
            }
          },error:function(err){

          }
        })
      }
    },
    created(){
      this.readDetail(this.$route.query.id);
      this.changesSelect(0);
      this.data = this.$route.params.data;
      let obj = {
        jsonObject:{
          warehouseCheckCode :this.data.warehouseCheckCode,
          warehouseCheckId :this.data.warehouseCheckId
        },
        keyParams:{
            weChat: true,
            userId: JSON.parse(localStorage.getItem("userData")).userId,
            orgId: JSON.parse(localStorage.getItem("userData")).orgId,
          }
    }
      this.uploadData = {
        jsonObject:JSON.stringify(obj.jsonObject),
        keyParams:JSON.stringify(obj.keyParams)
      }
    },
    watch:{
      
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
  .upload-demo{
      float:left;
  }
  .upload-demo+.el-button--primary{
    float:left;
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
