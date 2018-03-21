<template>
  <div class="content-out-wrapper">
    <el-row class="inquiry-row">
      <el-col :span="4">
        <div class="inquiry-item">
          <span>昨日新增会员数</span>
          <strong class="am-ft-darkred">369</strong>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="inquiry-item">
          <span>本月申领会员总数</span>
          <strong class="am-ft-yellow">5000</strong>
        </div>
      </el-col>
      <el-col :span="8">
        <el-col :span="6">
          <div class="inquiry-item">
            <span>会员总数</span>
            <strong>123530</strong>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="inquiry-item">
            <span>金卡</span>
            <strong>530</strong>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="inquiry-item">
            <span>银卡</span>
            <strong>3530</strong>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="inquiry-item">
            <span>普卡</span>
            <strong>34530</strong>
          </div>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "member-inquiry",
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../reset";

  .inquiry-row {
    background: $white;
    padding: $h15 $h20;
    .inquiry-item{
      text-align: center;
      span{
        font-size: $h14;
        display: block;
      }
      strong{
        font-size: $h18;
        display: block;
        margin-top: $h8;
      }
    }
  }
</style>
