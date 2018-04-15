<template>
  <div>
    <el-table
      :data="listData"
      stripe
      size="small"
      align="left"
      style="width: 100%">
      <el-table-column
        prop="requisitionNo"
        label="调拨单号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="sourceType"
        label="来源类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="requisitionOrgName"
        label="调拨部门">
      </el-table-column>
      <el-table-column
        prop="outWarehName"
        label="调出仓库">
      </el-table-column>
      <el-table-column
        prop="inWarehName"
        label="调入仓库">
      </el-table-column>
      <el-table-column
        prop="makingP"
        label="制单人">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="制单日期"
        width="140">
      </el-table-column>
      <el-table-column
        label="调拨单状态">
        <template slot-scope="scope">
          <p class="am-ft-orange">{{scope.row.statusName}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <a href="javascript:;" @click="goDetail(scope.$index,scope.row)">查看详情</a>
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
        :total="counts"
        :current-page.sync="nub">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "all-lists",
    component: {},
    data() {
      return {
        nub: 0,//起始条数
        size: 10,//每页显示数据条数
        counts: this.listCounts,//总条数
        tableData: [{
          a: '12340002',
          b: '手工添加',
          c: '总仓库',
          d: '总仓库',
          e: '湖滨店',
          f: '玉素甫',
          g: '2017-12-25 16:26:00',
          h: '调拨待审核'
        },
          {
            a: '12340002',
            b: '手工添加',
            c: '总仓库',
            d: '总仓库',
            e: '湖滨店',
            f: '玉素甫',
            g: '2017-12-25 16:26:00',
            h: '已完成'
          },
          {
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
    props: ['listData','listCounts', 'mypagination'],
    created() {

    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.nub = (`${val}`-1) * this.size;
        this.mypagination(this.nub);
      },

      //查看详情
      goDetail(data) {
        this.$router.push({
          path: '/commodity/transfer-order-edit',
          name: 'transfer-order-edit',
          params: data
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../reset";

</style>
