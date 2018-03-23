<template>
  <div class="check-inventory">
    <!--top-->
    <div class="inquiry-row">
      <h2 class="titl">盘点单号：PD0031612060001</h2>
      <div class="titl-bot">
        <div class="fn-left am-ft-12">
          <span><em>类型：</em>大盘点</span>
          <span><em>盘点时间</em>：2017-12-22</span>
          <span><em>盘点仓库：</em>湖滨店</span>
          <span><em>盘点人：</em>白月初</span>
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
      <el-form :inline="true" :model="formInline" class="demo-form-inline am-ft-left">
        <el-row class="am-ft-12">
          <el-col :span="18">
            <el-form-item
              label="类别："
              :rules="[{required:true}]">
              <el-input v-model="formInline.input1" placeholder="请输入" style="width: 120px"></el-input>
            </el-form-item>
            <el-form-item
              label="品牌："
              :rules="[{required:true}]">
              <el-select v-model="formInline.select1" placeholder="请选择" style="width: 120px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="品种："
              :rules="[{required:true}]">
              <el-select v-model="formInline.select1" placeholder="请选择" style="width: 120px">
                <el-option label="1" value="1"></el-option>
                <el-option label="2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="formInline._check"><span class="am-ft-12">显示“0”库存</span></el-checkbox>
            </el-form-item>
            <el-form-item>
              <el-button plain @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="am-ft-right mgt5">
            <el-button type="primary" plain>导入盘点单</el-button>
            <el-button type="primary" class="mgl10">导出盘点表</el-button>
          </el-col>
        </el-row>
        <!--table-->
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
              <el-input v-model="formInline.input2" placeholder=" " style="width: 80px"></el-input>
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
        <el-pagination
          background
          class="am-ft-right mgt10"
          layout=" prev, pager, next"
          :total="100">
        </el-pagination>
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
        formInline: {
          select1: '',
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
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";

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
