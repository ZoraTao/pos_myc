<template>
  <div class="integral-det-box">
    <el-table
      :data="tableData"
      stripe
      size="small"
      align="left"
      style="width: 100%;margin-bottom: 10px;">
      <el-table-column
        prop="a"
        label="奖励积分"
        width="100px">
        <template slot-scope="scope">
          <p v-if="scope.row.a > 0" class="am-ft-orange">{{scope.row.a}}</p>
          <p v-if="scope.row.a < 0 " class="am-ft-blue">{{scope.row.a}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="b"
        label="奖励类型"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="c"
        label="奖励时间">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "member-integral-details",
    data() {
      return {
        tableData: [{
          a: `+100`,
          b: '购物奖励',
          c: '2017-09-21  18:21:00'
        },
        {
          a: `-500`,
          b: '注册奖励',
          c: '2017-09-21  18:21:00'
        }]
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
            jsonObject: {},
            keyParams: {
              weChat: true,
              memberCardId: '2213763',
              memberId: '2246600',
              nub: '0',
              size: '0',
            }
          }
        })
          .then(function (response) {
            console.info(response.data)
          })
          .catch(function (error) {
            console.info(error)
          })
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
