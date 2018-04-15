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
          <a href="javascript:;" class="mgl20" @click="checkIn">调入接收</a>
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

    <!--立即调入弹窗-->
    <el-dialog class="comen-dialog" title="调入接收" :visible.sync="openCheckIn" width="870px">
      <div class="dialog-body">
        <div class="dialog-top">
          <strong class="fn-left"><em>调拨单号：</em>ROV263212126536</strong>
        </div>
        <el-table
          :data="tableData"
          stripe
          max-height="360"
          style="width: 100%">
          <el-table-column
            prop="a"
            label="商品编码"
            width="180">
          </el-table-column>
          <el-table-column
            prop="b"
            label="商品名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="c"
            label="调入数量">
          </el-table-column>
          <el-table-column
            label="实物码">
            <template slot-scope="scope">
              <span>无实物码调拨</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openCheckIn = false">取 消</el-button>
        <el-button type="primary">确认调出</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "pending-tune-in",
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
          h: '待调入'
        }],
        openCheckIn: false,
        checked: true
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
          path: '/commodity/transfer-order-detail',
          name: 'transfer-order-detail',
          params: data
        })
      },
      //立即调出弹窗
      checkIn() {
          this.openCheckIn = true;
      },
    }
  }
</script>

<style lang="scss">
  @import "../../../reset";
  .comen-dialog{
    .el-table th{
      background-color: transparent !important;
    }
    .el-table td, .el-table th {
      padding: 6px 0 !important;
      font-size: 12px;
    }
    .dialog-body{
      padding: 10px 20px;
      .dialog-top{
        width: 100%;
        padding-bottom: 10px;
        border-bottom: 1px dashed #E1E1E1;
        font-size: 14px;
        color: #333333;
        overflow: hidden;
        em{
          font-size: 12px;
          color: #555555;
        }
      }
      .el-checkbox__label{
        font-size: 12px !important;
      }
    }
    .el-dialog__footer{
      background-color: #EEEEEE !important;
    }
  }
</style>
