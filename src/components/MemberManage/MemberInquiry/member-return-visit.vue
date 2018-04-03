<template>
  <div class="return-visit-box">
    <el-table
      :data="tableData"
      stripe
      size="small"
      align="left"
      style="width: 100%;margin-bottom: 10px;">
      <el-table-column
        prop="a"
        label="会员姓名"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="b"
        label="零售单号">
      </el-table-column>
      <el-table-column
        prop="c"
        label="应回访类型">
      </el-table-column>
      <el-table-column
        prop="d"
        label="应回访方式">
      </el-table-column>
      <el-table-column
        label="应回访日期">
        <template slot-scope="scope">
          <p class="am-ft-red">{{scope.row.e}}</p>
        </template>
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <p v-if="scope.row.f == '待回访'" class="am-ft-yellow">待回访</p>
          <p v-if="scope.row.f == '已回访'" class="am-text-secondary">已回访</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template slot-scope="scope">
          <a href="javascript:;" @click="checkDet(scope.row)">查看</a>
          <a href="javascript:;" class="mgl20" v-if="scope.row.f == '待回访'">回访登记</a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "member-return-visit",
    data() {
      return {
        tableData: [{
          a: '玉素甫·哈斯',
          b: 'R0326632321',
          c: '生日回访',
          d: '电话回访',
          e: '2017-11-30',
          f: '待回访'
        },
        {
          a: '王大锤',
          b: 'R0326632321',
          c: '促销通知',
          d: 'Email回访',
          e: '2017-11-30',
          f: '已回访'
        }]
      }
    },
    methods: {
      checkDet() {
        console.log('回访记录详情');
      }
    }
  }
</script>

<style lang="scss">
  .return-visit-box {
    .el-table thead {
      color: #555555;
    }
  }
</style>
