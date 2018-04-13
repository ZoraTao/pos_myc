<template>
  <div class="content-out-wrapper transfer-wrapper">
    <!--top-->
    <el-row class="inquiry-row top-box mgt20">
      <el-col :span="24">
        <h3 class="titl">调拨单号：R00031612060001</h3>
      </el-col>
      <el-form :inline="true" :model="formInline" class="demo-form-inline am-ft-left">
        <el-col :span="24">
          <el-form-item
            label="制单日期：">
            <span>2017-11-06 11:26:19</span>
          </el-form-item>
          <el-form-item
            label="制单人：">
            <span>张三</span>
          </el-form-item>
          <el-form-item
            label="调拨部门：">
            <span>总仓库</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="经办日期：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formInline.handleTime"
              value-format="yyyy-MM-dd"
              style="width: 130px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="调拨人：">
            <el-select v-model="formInline.requisitionP" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调出仓库：">
            <el-select v-model="formInline.outWarehId" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调入仓库：">
            <el-select v-model="formInline.inWarehId" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调拨级别：">
            <el-select v-model="formInline.level" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="承运类型：">
            <el-select v-model="formInline.carrierType" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="承运人：">
            <el-select v-model="formInline.carrierP" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运费：">
            <el-input clearable v-model="formInline.freight" style="width: 120px"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input clearable v-model="formInline.memo" style="width: 280px"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <!--content-->
    <el-row class="inquiry-row mgt10">
      <el-col :span="24">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline am-ft-left">
          <el-form-item label="编码选择过滤："></el-form-item>
          <el-form-item label="类别：">
            <el-select v-model="categoryLevel.category1" filterable clearable placeholder="请选择" style="width: 130px"
                       @change="selectBrands">
              <el-option v-for="(i,index) in categoryCode1" :key="i.className" :label="i.className"
                         :value="i.productCategoryId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌：">
            <el-select v-model="categoryLevel.category2" filterable clearable placeholder="请选择" style="width: 130px"
                       @change="selectVarietys">
              <el-option v-for="(i,index) in categoryCode2" :key="i.className" :label="i.className"
                         :value="i.productCategoryId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品种：">
            <el-select v-model="categoryLevel.category3" filterable clearable placeholder="请选择" style="width: 130px">
              <el-option v-for="(i,index) in categoryCode3" :key="i.className" :label="i.className"
                         :value="i.productCategoryId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="度数：" class="input_num">
            <div class="fn-line-block">
              <el-input type="number" min="0" v-model="searchForm.degree1" style="width: 60px"></el-input>
            </div>
            <div class="fn-line-block am-ft-center am-text-secondary">-</div>
            <div class="fn-line-block">
              <el-input type="number" min="0" v-model="searchForm.degree2" style="width: 60px"></el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain>过滤</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--table-->
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
              label="商品编码"
              width="120">
              <template slot-scope="scope">
                <el-input v-model="formInline.dRequisitionDetailList.proNum" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="b"
              label="商品名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="c"
              label="单位"
              width="50">
            </el-table-column>
            <el-table-column
              prop="d"
              label="注册证号">
            </el-table-column>
            <el-table-column
              prop="e"
              label="批次号">
            </el-table-column>
            <el-table-column
              prop="f"
              label="制单时间"
              width="140">
            </el-table-column>
            <el-table-column
              prop="g"
              label="有效期">
            </el-table-column>
            <el-table-column
              label="调拨数量">
              <template slot-scope="scope" class="input_num">
                <el-input type="number" v-model="formInline.dRequisitionDetailList.count" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="调出库库存"
              prop="i">
            </el-table-column>
            <el-table-column
              label="调出库库存"
              prop="i">
            </el-table-column>
            <el-table-column
              label="调入库库存"
              prop="j">
            </el-table-column>
            <el-table-column
              label="公司库存"
              prop="k">
            </el-table-column>
            <el-table-column
              label="零售价"
              prop="l">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <a href="javascript:;" class="am-text-secondary">移除</a>
              </template>
            </el-table-column>
          </el-table>
          <!--扫码-->
          <el-col :span="24">
            <el-input
              class="scan-btn"
              placeholder="商品编码/条形码/快速码"
              v-model="searchForm.proNum"
              @keyup.native.enter="addOrder">
            </el-input>
            <el-button type="primary"><img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_saoma.png"/>
            </el-button>
          </el-col>
        </el-col>
        <el-button class="mgt15" type="primary" @click="addTransferOrder">提交</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "transfer-order-add",
    component: {},
    data() {
      return {
        fullDate: '',
        formInline: {
          handleTime: '',//经办日期
          requisitionP: '',//调拨人
          outWarehId: '',//调出仓库id
          outWarehName: '',//调出仓库名
          inWarehId: '',//调入仓库id
          level: '',//调拨级别
          carrierType: '',//承运类型
          carrierP: '',//承运人
          freight: '',//运费
          memo: '',//备注
          dRequisitionDetailList: [{
            proNum: '',//商品编码,
            barcode: '',//货品条码
            fastcode: '',//快速码
            count: '',//调拨数量
          }],
        },
        categoryCode1: [],//类别
        categoryCode2: [],//品牌
        categoryCode3: [],//品种
        categoryLevel: {//类别+品牌+品种
          category1: '',
          category2: '',
          category3: '',
        },
        degree1: '',//度数起始
        degree2: '',//度数截止
        searchForm: {
          degree: ['',''],//度数
          categoryCode: [],//类别+品牌+品种
          proNum: ''
        },
        tableData: [{
          a: 'BH00001',
          b: '湿乐光学架6670-6054',
          c: '副',
          d: ' ',
          e: ' ',
          f: '2017-11-06 11:26:19',
          g: '1',
          h: '1',
          i: '1',
          j: '1',
          k: '1',
          l: '618.00',
        }]
      }
    },
    created() {
      this.getType();
    },
    methods: {
      //获取当前时间
      getNowDate(){
        let that = this;
        let date = new Date();
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        that.fullDate = y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      },
      //查询类别+品牌+品种
      getType() {
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
      selectBrands(id) {
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
      selectVarietys(id) {
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
      //新增调拨单
      addTransferOrder(){
        let that = this;
        console.info(that.formInline)
      },

      //追加商品
      addOrder(){
        let that = this;
        that.getNowDate();
        let proNum = that.formInline.dRequisitionDetailList.proNum;

        that.tableData.push({
          proNum: that.searchForm.proNum,
          count: '',
          a: 'BH00001',
          b: '湿乐光学架6670-6054',
          c: '副',
          d: ' ',
          e: ' ',
          f: that.fullDate,
          g: '1',
          h: '1',
          i: '1',
          j: '1',
          k: '1',
          l: '618.00',
        });
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../reset";
  @import "../../MemberManage/MemberInquiry/member-public-css";

  .transfer-wrapper {
    .el-input__inner[type='number'] {
      padding-right: 0 !important;
    }
    .top-box {
      .el-form--inline .el-form-item__label {
        float: none;
        display: inline-block;
        min-width: 60px;
        line-height: 36px;
        font-weight: normal;
        color: #666666;
      }
      .titl {
        padding-bottom: 13px;
        border-bottom: 1px solid #E1E1E1;
        margin-bottom: 20px;
        font-size: 15px;
        overflow: hidden;
      }
    }
    .table-box {
      height: 450px;
      border: 1px solid #ECEBEB;
      background-color: rgba(248, 248, 248, 0.50);
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
  }

</style>
