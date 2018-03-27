<template>
  <div class="content-out-wrapper stocks-content">
    <!------top------>
    <el-row class="inquiry-row mgt6">
      <!--普通搜索-->
      <el-col :span="21" v-if="normalsearch">
        <el-col :span="5">
          <el-input
            placeholder="输入商品编码"
            v-model="input1">
            <i slot="suffix" class="el-input__icon el-icon-search search-bt"></i>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <a class="fn-left mgt8" href="javascript:;" @click="changeSearch('2')">高级搜索</a>
        </el-col>
      </el-col>
      <!--高级搜索-->
      <el-col :span="21" v-if="moresearch">
        <el-form :inline="true" :model="formInline" class="demo-form-inline am-ft-left">
          <el-col :span="24">
            <el-form-item label="商品编码：">
              <el-input placeholder="输入商品编码" v-model="formInline.select1" style="width: 130px"></el-input>
            </el-form-item>
            <el-form-item label="类别：">
              <el-select v-model="formInline.select1" placeholder="请选择" style="width: 100px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌：">
              <el-select v-model="formInline.select2" placeholder="请选择" style="width: 140px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品种：">
              <el-select v-model="formInline.select2" placeholder="请选择" style="width: 140px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="区域：">
              <el-select v-model="formInline.select2" placeholder="请选择" style="width: 130px">
                <el-option label="华东区" value="1"></el-option>
                <el-option label="华北区" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库：">
              <el-select v-model="formInline.warehId" placeholder="请选择" style="width: 100px">
                <el-option
                  v-for="item in warehList"
                  :key="item.warehId"
                  :label="item.warehName"
                  :value="item.warehId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库大类：">
              <el-select v-model="formInline.select2" placeholder="请选择" style="width: 140px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="仓库类型：">
              <el-select v-model="formInline.select2" placeholder="请选择" style="width: 140px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <a class="fn-left am-ft-12 mgl10" href="javascript:;" @click="changeSearch('1')">普通搜索</a>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
    </el-row>
    <!------/top------>

    <!--无数据时缺省显示-->
    <el-row class="inquiry-row content-info-box" v-if="false">
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
    <el-tabs type="border-card" class="mgt15">
      <el-tab-pane label="总计库存">
        <total-inventory></total-inventory>
      </el-tab-pane>
      <el-tab-pane label="库存明细 (类别)">
       <category-inventory-det></category-inventory-det>
      </el-tab-pane>
      <el-tab-pane label="库存明细 (品种)">
        <variety-inventory-det></variety-inventory-det>
      </el-tab-pane>
      <el-tab-pane label="库存明细 (编码)">
        <code-inventory-det></code-inventory-det>
      </el-tab-pane>
      <el-tab-pane label="库存明细  (仓库+编码+有效期批号)">
        <mix-inventory-det></mix-inventory-det>
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
        input1: '',
        normalsearch: true,
        moresearch: false,
        formInline: {
          warehId: '',
          select1: '',
          select2: '',
          date1: '',
          date2: '',
        }
      }
    },
    created: function () {
      this.getWarehouses()
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
      }
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
  }

</style>
