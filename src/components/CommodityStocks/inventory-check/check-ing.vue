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
        label="盘点单号"
        width="120">
      </el-table-column>
      <el-table-column
        prop="b"
        label="盘点单类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="c"
        label="计划盘点时间">
      </el-table-column>
      <el-table-column
        prop="d"
        label="盘点仓库">
      </el-table-column>
      <el-table-column
        prop="e"
        label="盘点人">
      </el-table-column>
      <el-table-column
        prop="f"
        label="制单时间">
      </el-table-column>
      <el-table-column
        prop="g"
        label="制单人">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <p class="am-ft-orange">盘点中</p>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <a href="javascript:;" @click="goCheck(scope.row)">继续盘点</a>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      background
      class="am-ft-right mgt10"
      layout=" prev, pager, next"
      :total="10">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "check-ing",
    component: {},
    data() {
      return {
        tableData: [{
          a: 'pd165412512',
          b: '大盘点',
          c: '2017-12-25 16:26:00',
          d: '大关店',
          e: '张三',
          f: '2017-12-25 16:26:00',
          g: '白月初',
        }]
      }
    },
    methods: {
      //继续盘点
      goCheck(){
        this.$router.push({
          path: '/commodity/checkInventory',
          name: 'check-inventory',
          params: {}
        })
      }
    }
  }
</script>

<style scoped>

</style>
