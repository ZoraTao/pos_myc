<template>
  <div class="content-out-wrapper stocks-content">
    <!------top------>
    <el-row class="inquiry-row mgt6">
      <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline am-ft-left">
      <!--普通搜索-->
      <el-col :span="21" v-if="normalsearch">
        <el-col :span="5">
          <el-form-item prop="sku">
          <el-input
            placeholder="输入商品编码"
            v-model="formInline.sku">
            <i slot="suffix" class="el-input__icon el-icon-search search-bt" @click="onSubmit(formInline)"></i>
          </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" :offset="1">
          <a class="fn-left mgt8" href="javascript:;" @click="changeSearch('2')">高级搜索</a>
        </el-col>
      </el-col>
      <!--高级搜索-->
      <el-col :span="21" v-if="moresearch">
          <el-col :span="24">
            <el-form-item label="商品编码：">
              <el-input placeholder="输入商品编码" v-model="formInline.sku" style="width: 130px"></el-input>
            </el-form-item>
            <el-form-item label="类别：">
              <el-select v-model="categoryCode1" placeholder="请选择" style="width: 130px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌：">
              <el-select v-model="categoryCode2" placeholder="请选择" style="width: 120px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品种：">
              <el-select v-model="categoryCode3" placeholder="请选择" style="width: 130px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="区域：">
              <el-select v-model="formInline.areaId" placeholder="请选择" style="width: 130px">
                <el-option label="华东区" value="1"></el-option>
                <el-option label="华北区" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库：">
              <el-select v-model="formInline.warehouseId" filterable placeholder="请选择" style="width: 130px">
                <el-option
                  v-for="item in warehList"
                  :key="item.warehId"
                  :label="item.warehName"
                  :value="item.warehId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库大类：">
              <el-select v-model="formInline.warehouseClass" placeholder="请选择" style="width: 120px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库类型：">
              <el-select v-model="formInline.warehouseType" placeholder="请选择" style="width: 130px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="onSubmit(formInline)">查询</el-button>
            </el-form-item>
            <el-form-item>
              <a class="fn-left am-ft-12 mgl10" href="javascript:;" @click="changeSearch('1')">普通搜索</a>
            </el-form-item>
          </el-col>
      </el-col>
      </el-form>
    </el-row>
    <!------/top------>

    <!--无数据时缺省显示-->
    <el-row class="inquiry-row content-info-box" v-if="stocksCount=='0'">
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
    <el-tabs type="border-card" class="mgt15" v-if="stocksCount!='0'">
      <el-tab-pane>
        <span slot="label" @click="getStocksList">总计库存</span>
        <total-inventory :totalStocksData="stocksData"></total-inventory>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label">库存明细 (类别)</span>
       <category-inventory-det :formInline="formInline"></category-inventory-det>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" @click="getVarietyDetList">库存明细 (品种)</span>
        <variety-inventory-det :varietyDetData="varietyDetData"></variety-inventory-det>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" @click="getCodeStockList">库存明细 (编码)</span>
        <code-inventory-det :codeStockData="codeStockData"></code-inventory-det>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label" @click="getCodeStockList">库存明细  (仓库+编码+有效期批号)</span>
        <mix-inventory-det :codeStockData="codeStockData"></mix-inventory-det>
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
        varietyDetData: [],//库存明细品种列表
        varietyDetCount: 0,//库存明细品种数量
        codeStockData: [],//库存明细编码列表/（仓库+编码+有效期批号）
        codeStockCount: 0,//库存明细编码数量/（仓库+编码+有效期批号）
        normalsearch: true,
        moresearch: false,
        goCategoryInventory: false,
        categoryCode1: '',
        categoryCode2: '',
        categoryCode3: '',
        formInline: {
          categoryCode: '',//类别+品牌+品种
          sku: '',//商品sku
          areaId: '',//区域id
          warehouseClass: '',//区域大类
          warehouseType: '',//仓库类型
          warehouseId: '',//仓库id
          nub: "0",
          size: "10"
        }
      }
    },
    created: function () {
      this.getWarehouses();
      this.getStocksList();
    },
    methods: {
      //查询
      onSubmit(formpramas) {
        this.getStocksList(formpramas);
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
      //获取总库存列表
      getStocksList(){
        var that = this;
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
             // console.info(that.stocksData)
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
      //查询库存明细--品种列表
      getVarietyDetList(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/stock/getVarietyStockList',
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
              // console.info(response.data)
              that.varietyDetData = response.data.data.list;
              that.varietyDetCount = parseInt(response.data.data.count);
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
      //查询库存明细--编码列表
      getCodeStockList(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/stock/getCodeStockList',
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
              // console.info(response.data.data)
              that.codeStockData = response.data.data.list;
              that.codeStockCount = parseInt(response.data.data.count);
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
