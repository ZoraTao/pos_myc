<template>
  <div class="content-out-wrapper stocks-content">
    <!--top-->
    <el-row class="inquiry-row mgt6">
      <el-col :span="24">
        <h3 class="titl">临时盘点单</h3>
      </el-col>
      <el-form :inline="true" :model="formInline" class="demo-form-inline am-ft-left">
        <el-col :span="24">
          <el-form-item
            label="盘点部门："
            :rules="{required: true}">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="盘点仓库："
            :rules="{required: true}">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="盘点人："
            :rules="{required: true}">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
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
              prop="a"
              label="商品编码"
              width="120">
            </el-table-column>
            <el-table-column
              prop="b"
              label="商品名称"
              width="180">
            </el-table-column>
            <el-table-column
              prop="c"
              label="单位"
              width="60">
            </el-table-column>
            <el-table-column
              prop="d"
              label="有效期"
              width="150">
            </el-table-column>
            <el-table-column
              prop="e"
              label="批号">
            </el-table-column>
            <el-table-column
              prop="f"
              label="注册证号"
              width="140">
            </el-table-column>
            <el-table-column
              prop="g"
              label="盘前数">
            </el-table-column>
            <el-table-column
              label="实盘数">
              <template slot-scope="scope">
                <el-input v-model="formInline.input2" size="small"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="差异数">
              <template slot-scope="scope">
                <p v-if="scope.row.h == 0" class="am-text-placeholder">{{scope.row.h}}</p>
                <p v-else class="am-ft-red">{{scope.row.h}}</p>
              </template>
            </el-table-column>
            <el-table-column
              prop="i"
              label="含税零售金额"
              width="100">
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
    name: "add-temporary-inventory",
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
          a: 'myc12345355',
          b: '毛源昌光学架2612-012',
          c: '副',
          d: '2017-12-25 16:26:00',
          e: ' ',
          f: ' ',
          g: '230',
          h: `2`,
          i: '229'
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
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
