<template>
  <div>
    <el-table
      :data="listData"
      size="small"
      align="left"
      style="width: 100%;margin-bottom:10px;">
      <el-table-column
        prop="memberName"
        label="会员姓名"
        width="130px">
      </el-table-column>
      <el-table-column
        prop="telphone"
        label="手机号"
        width="150px">
      </el-table-column>
      <el-table-column
        label="性别"
        width="60px">
        <template slot-scope="scope">{{scope.row.sex=='M'?'男':'女'}}</template>
      </el-table-column>
      <el-table-column
        prop="age"
        label="年龄"
        width="60px">
      </el-table-column>
      <el-table-column
        prop="orderId"
        label="零售单号"
        width="150px">
      </el-table-column>
      <el-table-column
        prop="typeName"
        label="应回访类型"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="styleName"
        label="应回访方式">
      </el-table-column>
      <el-table-column
        prop="visitTime"
        label="应回访日期">
      </el-table-column>
      <el-table-column
        label="状态"
        width="100px">
        <template slot-scope="scope">
          <span class="am-ft-orange">{{scope.row.statusName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <span class="am-ft-blue"><a href="javascript:;" @click="openEntryVisit(scope.row,scope.$index)">回访登记</a></span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block mgt10">
      <el-pagination
        class="am-ft-right"
        background
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="listCounts"
        :current-page.sync="nub">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: "already-visit",
      data() {
        return {
          nub: 0,//起始条数
          size: 10,//每页显示数据条数
          counts: this.listCounts,//总条数
        }
      },
      props: ['listData','listCounts', 'mypagination'],
      created() {

      },
      methods:{
        //分页
        handleCurrentChange(val) {
          this.nub = (`${val}`-1) * this.size;
          this.mypagination(this.nub);
        },
      }
    }
</script>

<style scoped lang="scss">
  @import "../../../reset";

</style>
