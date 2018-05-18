<template>
  <div class="complaint-box">
    <el-table
      :data="tableData"
      stripe
      size="small"
      align="left"
      style="width: 100%;margin-bottom: 10px;">
      <el-table-column
        prop="a"
        label="投诉日期"
        width="100px">
      </el-table-column>
      <el-table-column
        prop="b"
        label="投诉类别">
      </el-table-column>
      <el-table-column
        prop="c"
        label="投诉内容"
        width="300px">
      </el-table-column>
      <el-table-column
        prop="d"
        label="投诉类型">
      </el-table-column>
      <el-table-column
        prop="e"
        label="关联零售单号">
      </el-table-column>
      <el-table-column
        prop="f"
        label="接待人员">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <p v-if="scope.row.g == '未处理'" class="am-ft-red">未处理</p>
          <p v-if="scope.row.g == '已处理'" class="am-text-secondary">已处理</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="checkDet(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "member-complaints-record",
    data() {
      return {
        tableData: [{
          a: '2017-12-07',
          b: '产品质量、店铺环境',
          c: '投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容',
          d: '上门投诉',
          e: 'R0326632321',
          f: '玉素甫·哈斯',
          g: '未处理'
        },
        {
          a: '2017-12-07',
          b: '验光问题',
          c: '投诉内容投诉内容投诉内容投诉内容投诉内容',
          d: '上门投诉',
          e: 'R0326632321',
          f: '玉素甫·哈斯',
          g: '已处理'
        }]
      }
    },
    methods: {
      checkDet() {
        console.log('投诉记录详情');
      }
    }
  }
</script>

<style lang="scss">
  .complaint-box{
    .el-table thead {
      color: #555555;
    }
  }
</style>
