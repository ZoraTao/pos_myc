<template>
  <div class="content-out-wrapper">
    <!--part1-->
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
          <div class="inquiry-item after-none">
            <span>普卡</span>
            <strong>34530</strong>
          </div>
        </el-col>
      </el-col>
    </el-row>
    <!--part2-->
    <el-row class="inquiry-row mgt6">
      <el-col :span="24">
        <el-col :span="4">
          <el-input
            placeholder="输入会员姓名/手机号／卡号"
            v-model="input1">
            <i slot="suffix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </el-col>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "member-inquiry",
    data() {
      return {
        input1: '',
      }
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
      position: relative;
      &:after{
        content: ' ';
        width: 1px;
        height: 24px;
        background: #dddddd;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -12px;
      }
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
