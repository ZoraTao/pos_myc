<template>
  <div class="content-out-wrapper stocks-content">
    <!--top-->
    <el-row class="inquiry-row mgt6">
      <el-form :inline="true" :model="formInline" class="demo-form-inline am-ft-left">
        <el-col :span="20">
          <el-form-item label="盘点日期：">
            <div class="fn-line-block">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"
                              style="width: 125px;"></el-date-picker>
            </div>
            <div class="fn-line-block am-ft-center am-text-secondary">至</div>
            <div class="fn-line-block">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date2"
                              style="width: 125px;"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="盘点部门：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="盘点仓库：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="fn-right mgr20">
          <el-button type="primary" @click="goAdd">+&nbsp;添加盘点单</el-button>
        </el-col>
      </el-form>
    </el-row>
    <!--content-->
    <el-row class="inquiry-row mgt10">
      <el-col :span="24">
        <h2 class="am-ft-16 mgb15">查询结果 (23)</h2>
      </el-col>
      <el-col :span="24">
          <el-table
            :data="tableData"
            stripe
            size="small"
            align="left"
            style="width: 100%">
            <el-table-column
              prop="a"
              label="临时盘点单号"
              width="120">
            </el-table-column>
            <el-table-column
              prop="b"
              label="盘点仓库"
              width="120">
            </el-table-column>
            <el-table-column
              prop="c"
              label="盘点部门">
            </el-table-column>
            <el-table-column
              prop="d"
              label="盘点人">
            </el-table-column>
            <el-table-column
              prop="e"
              label="制单人">
            </el-table-column>
            <el-table-column
              prop="f"
              label="制单时间"
              width="140">
            </el-table-column>
            <el-table-column
              prop="g"
              label="盘前数">
            </el-table-column>
            <el-table-column
              prop="h"
              label="实盘数">
            </el-table-column>
            <el-table-column
              label="差异数">
              <template slot-scope="scope">
                <p v-if="scope.row.i !== 0" class="am-ft-red">{{scope.row.i}}</p>
                <p v-if="scope.row.i == 0" class="am-text-placeholder">{{scope.row.i}}</p>
              </template>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <a href="javascript:;">查看详情</a>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination
            background
            class="am-ft-right mgt10"
            layout="total, prev, pager, next"
            :total="10">
          </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "inventory-check-temporary",
    components: {},
    data() {
      return {
        input1: '',
        formInline: {
          select1: '',
          _check: false,
          date1: '',
          date2: ''
        },
        tableData: [{
          a: 'LPD1230001',
          b: '湖滨店',
          c: '湖滨店',
          d: '张三',
          e: '张三',
          f: '2017-12-25 16:26:00',
          g: '230',
          h: '229',
          i: '-1'
        }]
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      goAdd(){
        this.$router.push({
          path: '/commodity/add-temporary',
          name: 'add-temporary-inventory',
          params: {}
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";
</style>
