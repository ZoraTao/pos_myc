<template>
  <div class="content-out-wrapper stocks-content">
    <!--top-->
    <el-row class="inquiry-row mgt6">
      <el-col :span="24">
        <h3 class="titl">临时盘点单</h3>
      </el-col>
      <el-form :inline="true" :model="selectData" class="demo-form-inline am-ft-left">
        <el-col :span="24">
          <el-form-item
            label="盘点部门："
            :rules="{required: true}">
            <el-select v-model="selectData.department" placeholder="请选择" style="width: 130px">
              <el-option 
              v-for="item in orgList"
              :key="item.shopId"
              :label="item.shopName"
              :value="item.shopId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="盘点仓库："
            :rules="{required: true}">
            <el-select v-model="selectData.base" placeholder="请选择" style="width: 130px">
              <el-option 
              v-for="item in baseList"
              :key="item.warehouseId"
              :label="item.warehouseName"
              :value="item.warehouseId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="盘点人："
            :rules="{required: true}">
            <el-select v-model="selectData.checkoutUser" placeholder="请选择" style="width: 130px">
              <el-option 
              v-for="item in checkoutUserList"
              :key="item.userId"
              :label="item.trueName"
              :value="item.userId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="selectData.message" style="width: 280px"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!--content-->
    <el-row class="inquiry-row mgt10">
      <el-col :span="24">
        <el-form :inline="true" :model="select" class="demo-form-inline am-ft-left">
          <el-form-item label="编码选择过滤："></el-form-item>
          <el-form-item label="类别：">
            <el-select v-model="select.class" placeholder="请选择" style="width: 100px" @change="changesSelect(1)">
                <el-option 
                v-for="item in select.classArr"
                :key="item.productCategoryId"
                :label="item.className" 
                :value="item.productCategoryId"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="品牌：">
            <el-select v-model="select.varieties" placeholder="请选择" style="width: 100px" @change="changesSelect(2)">
                <el-option 
                v-for="item in select.varietiesArr"
                :key="item.productCategoryId"
                :label="item.className" 
                :value="item.productCategoryId"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="品种：">
            <el-select v-model="select.brand" placeholder="请选择" style="width: 100px">
                <el-option 
                v-for="item in select.brandArr"
                :key="item.productCategoryId"
                :label="item.className" 
                :value="item.productCategoryId"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="度数：" class="input_num">
            <div class="fn-line-block">
              <el-input type="number" min="0" placeholder="最大值" v-model="select.oCstart" style="width: 60px"></el-input>
            </div>
            <div class="fn-line-block am-ft-center am-text-secondary">-</div>
            <div class="fn-line-block">
              <el-input type="number" min="0" placeholder="最小值" v-model="select.oCend" style="width: 60px"></el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24">
        <el-col :span="24" class="table-box">
          <el-table
            :data="tableData"
            stripe
            size="small"
            align="left"
            max-height="400"
            style="width: 100%">
            <el-table-column
              prop="sku"
              label="商品编码"
              width="120">
            </el-table-column>
            <el-table-column
              prop="skuName"
              label="商品名称"
              width="180">
            </el-table-column>
            <el-table-column
              label="单位"
              width="60">
              <template slot-scope="scope">
                {{scope.row.unit||'副'}}
              </template>
            </el-table-column>
            <el-table-column
              prop="validity"
              label="有效期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="batchNo"
              label="批号">
            </el-table-column>
            <el-table-column
              prop="registerCode"
              label="注册证号"
              width="140">
            </el-table-column>
            <el-table-column
              prop="allotQuantity"
              label="盘前数">
            </el-table-column>
            <el-table-column
              label="实盘数">
              <template slot-scope="scope">
                <el-input size="small" v-model="tableData[scope.$index].realallotQuantity" @input="computedNum(scope.row,scope.$index)"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="差异数">
              <template slot-scope="scope">
                <p v-if="scope.row.diffallotQuantity == 0" class="am-text-placeholder">{{scope.row.diffallotQuantity}}</p>
                <p v-else class="am-ft-red">{{scope.row.diffallotQuantity}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="price"
              label="含税零售金额"
              width="100">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <a href="javascript:;" class="am-text-secondary" @click="removeThis(scope.$index)">移除</a>
              </template>
            </el-table-column>
          </el-table>
          <!--扫码-->
          <el-col :span="24">
            <el-input
              class="scan-btn"
              placeholder="商品编码/条形码/快速码"
              v-model="shopCode"
              @keyup.native.enter="addShop()">
            </el-input>
            <el-button @click="addShop()" type="primary"><img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_saoma.png"/>
            </el-button>
          </el-col>
        </el-col>
        <el-button class="mgt15" type="primary" @click="addOrder()">提交</el-button>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "add-temporary-inventory",
    data() {
      return {
        shopCode:'ABL1.523BHC-1.50-1.50',
        selectData: {
          department: '',
          base:'',
          message:'',
          checkoutUser:''
        },
        checkoutUserList:[],
        baseList:[],
        orgList:[],
        tableData: [],
        select:{
          oCstart:'',
          oCend:'',
          class:'',
          classArr:[],
          className:'',
          varieties:'',
          varietiesArr:[],
          brand:'',
          brandArr:[],
          _check: false
        },
      }
    },
    methods: {
      removeThis(index){
        this.tableData.splice([index],1)
      },
      computedNum(data,index){
        if(this.tableData[index].allotQuantity!==''){
          this.tableData[index].diffallotQuantity = parseInt(this.tableData[index].realallotQuantity||0)-parseInt(this.tableData[index].allotQuantity);
        }
      },
      addShop(){
        const _this = this;
        let arr = [];
        if(_this.select.class!=''){
          arr.push(_this.select.class)
        }
        if(_this.select.varieties!=''){
          arr.push(_this.select.varieties)
        }
        if(_this.select.brand!=''){
          arr.push(_this.select.brand)
        }
        _this.$myAjax({
          url:'pos-api/stock/getStockListBysku',
          data:{
            product:_this.shopCode,
            warehouseId:_this.selectData.base,
            categoryCodeList:arr,
            rangeMax:_this.select.oCstart,
            rangeMin:_this.select.oCend,
          },
          success:function(res){
            if(res.code == 1){
              if(res.data.list.length>0){
                let data = res.data.list[0];
                data.realallotQuantity = '';
                data.diffallotQuantity = '';
                if(_this.tableData.length>0){
                  for(var i=0;i<_this.tableData.length;i++){
                    if(_this.tableData[i].sku != data.sku){
                        _this.tableData.push(data)
                        _this.shopCode='';
                    }else{
                         _this.$message({
                          showClose: true,
                          message: '已存在该商品',
                          type: "warning"
                        })
                      }
                  }
                }else{
                      _this.tableData.push(data)
                }
              }else{
                  _this.$message({
                    showClose: true,
                    message: '条件下未查找到该类商品',
                    type: "warning"
                  })
              }
            }else{
                _this.$message({
                    showClose: true,
                    message: res.msg,
                    type: "warning"
                  })
              }
          },error:function(err){
            _this.$message({
              showClose: true,
              message: err,
              type: "error"
            })
          }
        })
      },
      onSubmit() {
        console.log('submit!');
      },
      addOrder(){
        const _this = this;
        let arr = [];
        for(var i=0;i<_this.tableData.length;i++){
          arr.push({
            itemNo:_this.tableData[i].sku,
            itemName:_this.tableData[i].skuName,
            beforeCheckCount:_this.tableData[i].allotQuantity,
            dw:_this.tableData[i].unit,
            yxq:_this.tableData[i].validity,
            ph:_this.tableData[i].batchNo,
            zczh:_this.tableData[i].registerCode,
            listPrice:_this.tableData[i].taxPrice,
          })
        }
        _this.$myAjax({
          url:'pos-api/warehouseCheck/addWarehouseChec',
          data:{
            warehouseId:_this.selectData.base,
            warehouseCheckType:'-1',
            checkUserId:_this.selectData.checkoutUser||'',
            orgId:_this.selectData.department,
            memo:_this.selectData.message,
            warehouseCheckId:'',
            status:'2',
            warehouseCheckDetailList:arr
          },
          success:function(res){
            if(res.code == 1){

            }else{
              _this.$message({
                type:'warning',
                message:res.msg,
                showClose:true})
              }
          },error:function(err){
          _this.$message({
            type:'error',
             message:err,
            showClose:true})
          }
        });
        
      },
      initList(){
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
        _this.$myAjax({
          url:'cas-api/user/getUserByOrg',
          data:{},
          success:function(res){
            if(res.code == 1){
                _this.checkoutUserList = res.data.list;
            }
          },error:function(err){
            _this.$message({
              showClose: true,
              message: err,
              type: "error"
            })
          }
        })
        _this.$myAjax({
          url:'pos-api/shopBy/getShopByList',
          data:{},
          success:function(res){
            if(res.code == 1){
              _this.orgList = res.data.shopByList;
            }
          },error:function(err){
            _this.$message({
              showClose: true,
              message: err,
              type: "error"
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
              console.log(_this.select.varieties)
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
    },
    created(){
      this.initList();
      this.changesSelect(0);
    }
  }
</script>

<style scoped lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";

  .titl {
    padding-bottom: 13px;
    border-bottom: 1px solid #E1E1E1;
    margin-bottom: 20px;
    font-size: 15px;
  }

  .el-form-item__label {
    font-weight: normal !important;
  }

  .table-box{
    height: 450px;
    border: 1px solid #ECEBEB;
    background-color: rgba(248,248,248,0.50);
    overflow: auto;
  }
  .scan-btn {
    margin: 10px 0 10px 10px;
    + .el-button {
      padding: 6px 10px;
      margin-left: -6px;
      position: relative;
      border-radius: 0 4px 4px 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      vertical-align: -2.5px;
      span {
        display: block;
        margin: 0 auto;
      }
    }
  }
</style>
