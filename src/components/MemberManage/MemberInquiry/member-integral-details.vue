<template>
  <div class="integral-det-box">
    <el-table
      :data="pointsList"
      stripe
      size="small"
      align="left"
      style="width: 100%;margin-bottom: 10px;">
      <el-table-column
        label="奖励积分"
        width="100px">
        <template slot-scope="scope">
          <p v-if="scope.row.pointAmount < 0 " class="am-ft-blue">{{scope.row.pointAmount}}</p>
          <p v-else class="am-ft-orange">+{{scope.row.pointAmount}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="奖励类型"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="奖励时间">
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      class="am-ft-right mgt10"
      layout=" prev, pager, next"
      :page-size="5"
      :total="count"
      @current-change="handleCurrentChange"
      :current-page.sync="nub">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "member-integral-details",
    data() {
      return {
        pointsList: [], //积分明细列表
        count: 0,
        nub: 1,
        size: 10
      }
    },
    created: function () {
      this.getMemberPoints()
    },
    methods: {
      //查询积分明细
      getMemberPoints(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/points-api/pointsFlow/getMemberPointLow',
          method: 'post',
          params: {
            jsonObject: {
              memberCardId: '2054440',
              memberId: '2222767',
              nub: (this.nub==0?0:(this.nub-1)*this.size),
              size: this.size
            },
            keyParams: {
              weChat: true,
              userId: '8888',
              orgId: '11387'
            }
          }
        })
          .then(function (response) {
            console.info(response.data.data)
            that.pointsList = response.data.data.pointList;
            that.count = parseInt(response.data.data.count);
          })
          .catch(function (error) {
            console.info(error)
          })
      },
      handleCurrentChange:function(){
        this.getMemberPoints();
      }
    }
  }
</script>

<style lang="scss">
.integral-det-box{
  .el-table thead {
    color: #555555;
  }
}
</style>
