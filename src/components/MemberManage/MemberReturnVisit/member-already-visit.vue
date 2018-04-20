<template>
  <div>
    <el-table
      :data="listData"
      size="small"
      align="left"
      style="width: 100%;margin-bottom:10px;">
      <el-table-column
        prop="a"
        label="会员姓名">
      </el-table-column>
      <el-table-column
        prop="b"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="c"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="d"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="e"
        label="零售单号">
      </el-table-column>
      <el-table-column
        prop="f"
        label="应回访类型">
      </el-table-column>
      <el-table-column
        prop="g"
        label="应回访方式">
      </el-table-column>
      <el-table-column
        prop="h"
        label="应回访日期">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span class="am-ft-gray9">{{scope.row.i}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <span class="am-ft-blue"><a href="javascript:;">查看</a></span>
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
