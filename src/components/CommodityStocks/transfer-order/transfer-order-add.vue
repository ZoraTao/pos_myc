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
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"
                              style="width: 120px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="调拨人：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调出仓库：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调入仓库：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调拨级别：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="承运类型：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 120px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="承运人：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运费：">
            <el-input v-model="formInline.input1" style="width: 120px"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input v-model="formInline.input1" style="width: 280px"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <!--content-->
    <el-row class="inquiry-row mgt10">
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline am-ft-left">
          <el-form-item label="编码选择过滤："></el-form-item>
          <el-form-item label="类别：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 100px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品种：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="度数：" class="input_num">
            <div class="fn-line-block">
              <el-input type="number" min="0" v-model="formInline.num1" style="width: 60px"></el-input>
            </div>
            <div class="fn-line-block am-ft-center am-text-secondary">-</div>
            <div class="fn-line-block">
              <el-input type="number" min="0" v-model="formInline.num2" style="width: 60px"></el-input>
            </div>
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
                <el-input v-model="formInline.input2" size="small"></el-input>
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
                <el-input type="number" v-model="formInline.input2" size="small"></el-input>
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
              v-model="input1">
            </el-input>
            <el-button type="primary"><img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_saoma.png"/>
            </el-button>
          </el-col>
        </el-col>
        <el-button class="mgt15" type="primary">提交</el-button>
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
        input1: '',
        num1: '',
        num2: '',
        formInline: {
          input2: '200',
          select1: '',
          _check: false,
          date1: '',
          date2: ''
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
    methods: {}
  }
</script>

<style lang="scss">
  @import "../../../reset";
  @import "../../MemberManage/MemberInquiry/member-public-css";

  .transfer-wrapper{
    .top-box{
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
  }

</style>
