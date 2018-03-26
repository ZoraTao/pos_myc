<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      size="small"
      align="left"
      style="width: 100%">
      <el-table-column
        prop="a"
        label="调拨单号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="b"
        label="来源类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="c"
        label="调拨部门">
      </el-table-column>
      <el-table-column
        prop="d"
        label="调出仓库">
      </el-table-column>
      <el-table-column
        prop="e"
        label="调入仓库">
      </el-table-column>
      <el-table-column
        prop="f"
        label="制单人">
      </el-table-column>
      <el-table-column
        prop="g"
        label="制单日期"
        width="140">
      </el-table-column>
      <el-table-column
        label="调拨单状态">
        <template slot-scope="scope">
          <p class="am-ft-orange">{{scope.row.h}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <a href="javascript:;" @click="goDetail">查看详情</a>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      class="am-ft-right mgt10"
      layout="prev, pager, next"
      :total="10">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "pending-tune-in",
    component: {},
    data() {
      return {
        tableData: [{
          a: '12340002',
          b: '手工添加',
          c: '总仓库',
          d: '总仓库',
          e: '湖滨店',
          f: '玉素甫',
          g: '2017-12-25 16:26:00',
          h: '待调入'
        }]
      }
    },
    methods: {
      goDetail() {
        this.$router.push({
          path: '/commodity/transfer-order-detail',
          name: 'transfer-order-detail',
          params: {}
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../reset";

</style>
