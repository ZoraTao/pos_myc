<template>
  <div class="content-out-wrapper stocks-content">
    <!------top------>
    <el-row class="inquiry-row mgt6">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline am-ft-left">
      <!--普通搜索-->
      <el-col :span="21" v-if="normalsearch" v-cloak>
        <el-col :span="5">
          <el-form-item prop="sku">
          <el-input
            placeholder="输入商品编码"
            v-model="formInline.sku">
            <i slot="suffix" class="el-input__icon el-icon-search search-bt" @click="onSubmit"></i>
          </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset="1">
          <a class="fn-left mgt8" href="javascript:;" @click="changeSearch('2')">高级搜索</a>
        </el-col>
      </el-col>
      <!--高级搜索-->
      <el-col :span="22" v-if="moresearch" v-cloak>
          <el-col :span="24">
            <el-form-item label="商品编码：">
              <el-input placeholder="输入商品编码" clearable v-model="formInline.sku" style="width: 130px"></el-input>
            </el-form-item>
            <el-form-item label="类别：">
              <el-select v-model="categoryLevel.category1" filterable clearable placeholder="请选择" style="width: 130px" @change="selectBrands">
                <el-option v-for="(i,index) in categoryCode1" :key="i.className" :label="i.className" :value="i.productCategoryId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌：">
              <el-select v-model="categoryLevel.category2" filterable clearable placeholder="请选择" style="width: 120px" @change="selectVarietys">
                <el-option v-for="(i,index) in categoryCode2" :key="i.className" :label="i.className" :value="i.productCategoryId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品种：">
              <el-select v-model="categoryLevel.category3" filterable clearable placeholder="请选择" style="width: 130px">
                <el-option v-for="(i,index) in categoryCode3" :key="i.className" :label="i.className" :value="i.productCategoryId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="区域：">
              <el-select v-model="formInline.areaId" filterable clearable placeholder="请选择" style="width: 130px">
                <el-option
                v-for="a in areaList"
                :key="a.code"
                :label="a.name"
                :value="a.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库：">
              <el-select v-model="formInline.warehouseId" filterable clearable placeholder="请选择" style="width: 130px">
                <el-option
                  v-for="item in warehList"
                  :key="item.warehId"
                  :label="item.warehName"
                  :value="item.warehId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库大类：">
              <el-select v-model="formInline.warehouseClass" filterable clearable placeholder="请选择" style="width: 120px">
                <el-option
                  v-for="a in warehouseList"
                  :key="a.code"
                  :label="a.name"
                  :value="a.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库类型：">
              <el-select v-model="formInline.warehouseType" filterable clearable placeholder="请选择" style="width: 130px">
                <el-option
                  v-for="a in warehouseTypeList"
                  :key="a.code"
                  :label="a.name"
                  :value="a.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="onSubmit(formInline)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <a class="fn-left am-ft-12 mgl10" href="javascript:;" @click="changeSearch('1')">普通搜索</a>
              <a class="fn-left am-ft-12 mgl10 am-ft-gray9" href="javascript:;" @click="resetSearch">重置条件</a>
            </el-form-item>
          </el-col>
      </el-col>
      </el-form>
    </el-row>
    <!------/top------>

    <!--无数据时缺省显示-->
    <el-row class="inquiry-row content-info-box" v-if="stocksCount=='0'" v-cloak>
      <el-col :span="24">
        <div class="default-show">
          <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/image_quesheng.png"/>
          <p class="mgt25">暂无库存信息</p>
        </div>
      </el-col>
    </el-row>
    <!--/无数据时缺省显示-->

    <!--有数据时显示-->
    <!--tab-->
    <el-tabs type="border-card" class="mgt15" v-if="stocksCount!='0'" v-cloak>
      <el-tab-pane>
        <span slot="label" @click="getStocksList">总计库存</span>
        <total-inventory :totalStocksData="stocksData"></total-inventory>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" @click="getCategoryList">库存明细 (类别)</span>
       <category-inventory-det ref="category" :formInline="formInline"></category-inventory-det>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" @click="getVarietyList">库存明细 (品种)</span>
        <variety-inventory-det ref="variety" :formInline="formInline" :categoryLevelInfo="categoryLevel"></variety-inventory-det>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" @click="getCodeInventList">库存明细 (编码)</span>
        <code-inventory-det ref="codeInvent" :formInline="formInline" :categoryLevelInfo="categoryLevel"></code-inventory-det>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" @click="getMixInventList">库存明细  (仓库+编码+有效期批号)</span>
        <mix-inventory-det ref="mixInvent" :formInline="formInline" :categoryLevelInfo="categoryLevel"></mix-inventory-det>
      </el-tab-pane>
    </el-tabs>
    <!--/有数据时显示-->

  </div>
</template>

<script>
  import TotalInventory from './total-inventory'
  import CategoryInventoryDet from './category-inventory-det'
  import VarietyInventoryDet from './variety-inventory-det'
  import CodeInventoryDet from './code-inventory-det'
  import MixInventoryDet from './mix-inventory-det'
  import { Message } from 'element-ui';

  export default {
    name: "stocks-inquiry",
    components: {
      TotalInventory,
      CategoryInventoryDet,
      VarietyInventoryDet,
      CodeInventoryDet,
      MixInventoryDet
    },
    data() {
      return {
        warehList: [],//仓库列表
        stocksData: [],//总库存列表
        stocksCount: 0,//总库存数量
        codeStockData: [],//库存明细编码列表/（仓库+编码+有效期批号）
        codeStockCount: 0,//库存明细编码数量/（仓库+编码+有效期批号）
        normalsearch: true,
        moresearch: false,
        goCategoryInventory: false,
        categoryCode1: [],//类别
        categoryCode2: [],//品牌
        categoryCode3: [],//品种
        categoryLevel:{//类别+品牌+品种
          category1: '',
          category2: '',
          category3: '',
        },
        areaList: [],//区域列表
        warehouseList: [],//区域大类列表
        warehouseTypeList: [],//仓库类型列表
        formInline: {
          categoryCode: [],//类别+品牌+品种
          sku: '',//商品sku
          areaId: '',//区域id
          warehouseClass: '',//区域大类
          warehouseType: '',//仓库类型
          warehouseId: '',//仓库id
          nub: "0",
          size: "10"
        },
        loading: true
      }
    },
    created: function () {
      this.getWarehouses();
      this.getStocksList();
      this.getType();
      this.getAreas();
      this.getWarehouseList();
      this.getWarehouseType();
    },
    methods: {
      //重置查询条件
      resetSearch(){
        this.formInline={
          categoryCode: [],//类别+品牌+品种
            sku: '',//商品sku
            areaId: '',//区域id
            warehouseClass: '',//区域大类
            warehouseType: '',//仓库类型
            warehouseId: '',//仓库id
            nub: "0",
            size: "10"
        },
          this.categoryLevel={
          category1: '',
          category2: '',
          category3: '',
        }
      },
      //查询类别+品牌+品种
      getType(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/productCategory/list',
          method: 'post',
          params: {
            jsonObject: {
              productCategoryId: ''
            },
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if (response.data.code != '1') {
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            } else {
              // console.info(response.data.data)
              that.categoryCode1 = response.data.data.productCategoryList;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //根据类别选择品牌
      selectBrands(id){
        var that = this;
        that.categoryLevel.category2 = '';
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/productCategory/list',
          method: 'post',
          params: {
            jsonObject: {
              productCategoryId: id
            },
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if (response.data.code != '1') {
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            } else {
              console.info(response.data.data)
              that.categoryCode2 = response.data.data.productCategoryList;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //根据品牌选择品种
      selectVarietys(id){
        var that = this;
        that.categoryLevel.category3 = '';
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/productCategory/list',
          method: 'post',
          params: {
            jsonObject: {
              productCategoryId: id
            },
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if (response.data.code != '1') {
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            } else {
              console.info(response.data.data)
              that.categoryCode3 = response.data.data.productCategoryList;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //根据搜索条件查询
      onSubmit() {
        this.getStocksList();
        this.getCategoryList();
        this.getVarietyList();
        this.getCodeInventList();
        this.getMixInventList();
      },
      //切换搜索模式
      changeSearch(v) {
        if (v == '1') {
          this.normalsearch = true;
          this.moresearch = false;
        } else if (v == '2') {
          this.normalsearch = false;
          this.moresearch = true;
        }
      },
      //获取仓库列表
      getWarehouses(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/wareh/list',
          method: 'post',
          params: {
            jsonObject: {},
            keyParams: {
              weChat: true
            }
          }
        })
        .then(function (response) {
          that.warehList = response.data.data.warehList;
        })
        .catch(function (error) {
          console.info(error)
        })
      },
      //获取区域列表
      getAreas(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/cas-api/systemConfig/getSystemConfigList',
          method: 'post',
          params: {
            jsonObject: {
              type: 10
            },
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if(response.data.code != '1'){
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            }else {
              that.areaList = response.data.data.list;
            }
          })
          .catch(function (error) {
            console.info(error)
          })
      },
      //获取仓库大类列表
      getWarehouseList(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/cas-api/systemConfig/getSystemConfigList',
          method: 'post',
          params: {
            jsonObject: {
              type: 11
            },
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if(response.data.code != '1'){
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            }else {
              that.warehouseList = response.data.data.list;
            }
          })
          .catch(function (error) {
            console.info(error)
          })
      },
      //获取仓库类型列表
      getWarehouseType(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/cas-api/systemConfig/getSystemConfigList',
          method: 'post',
          params: {
            jsonObject: {
              type: 12
            },
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if(response.data.code != '1'){
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            }else {
              that.warehouseTypeList = response.data.data.list;
            }
          })
          .catch(function (error) {
            console.info(error)
          })
      },
      //获取总库存列表
      getStocksList(){
        var that = this;
        that.formInline.categoryCode = [that.categoryLevel.category1,that.categoryLevel.category2,that.categoryLevel.category3];
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/stock/getTotalStockList',
          method: 'post',
          params: {
            jsonObject: that.formInline,
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if(response.data.code != '1'){
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            }else {
             that.stocksData = response.data.data.list;
             that.stocksCount = parseInt(response.data.data.count);
             // console.info(response.data.data)
              setTimeout(() => {
                that.loading = false;
              }, 2000);
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //获取库存明细--类别列表
      getCategoryList(){
        var categoryMethod = this.$refs.category;
        categoryMethod.getCategoryInventory();
        categoryMethod.getSum();
      },
      //获取库存明细--品种列表
      getVarietyList(){
        var varietyMethod = this.$refs.variety;
        varietyMethod.getVarietyDetList();
      },
      //获取库存明细--编码列表
      getCodeInventList(){
        var codeInventMethod = this.$refs.codeInvent;
        codeInventMethod.getCodeStockList();
      },
      //获取库存明细--仓库+编码+有效期批号列表
      getMixInventList(){
        var mixInventMethod = this.$refs.mixInvent;
        mixInventMethod.getCodeStockList();
      },
    },
    computed: {

    }
  }
</script>

<style lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";
  @import "../../MemberManage/MemberInquiry/tabs-css";

  .stocks-content {
    .el-form-item__label {
      min-width: 60px !important;
    }
    .search-bt{
      margin-top: 6px !important;
    }
    .el-table__body-wrapper{
      &::-webkit-scrollbar{
        width: 17px;
        height: 12px;
      }
      &::-webkit-scrollbar-track{
        background: #d4d2d2;
        border-radius: 4px;
      }
      &::-webkit-scrollbar-thumb{
        background: #b4b3b3;
        border-radius: 4px;
      }
      &::-webkit-scrollbar-corner{
        background: #E6E6E6;
      }
    }
  }

</style>
