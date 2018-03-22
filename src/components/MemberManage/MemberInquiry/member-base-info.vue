<template>
  <el-row class="pane-part1">
    <el-col :span="11" class="vertical-line">
      <p class="part-titl">基本信息</p>
      <ul>
        <li>
          <el-col :span="4" class="li-label">姓名</el-col>
          李依依
        </li>
        <li>
          <el-col :span="4" class="li-label">会员</el-col>
          34545665655
        </li>
        <li>
          <el-col :span="4" class="li-label">性别</el-col>
          女
        </li>
        <li>
          <el-col :span="4" class="li-label">电话</el-col>
          13564756842
        </li>
        <li>
          <el-col :span="4" class="li-label">生日</el-col>
          1998-09-21
        </li>
        <li>
          <el-col :span="4" class="li-label">联系地址</el-col>
          浙江杭州西湖区文一西路98数娱大厦101室
        </li>
        <li>
          <el-col :span="4" class="li-label">职业</el-col>
          医生
        </li>
      </ul>
    </el-col>
    <el-col :span="9" :offset="1">
      <p class="part-titl">会员管理信息</p>
      <ul>
        <li>
          <el-col :span="4" class="li-label">会员来源</el-col>
          路过
        </li>
        <li>
          <el-col :span="4" class="li-label">重要程度</el-col>
          一般
        </li>
        <li>
          <el-col :span="4" class="li-label">负责部门</el-col>
          大关店
        </li>
        <li>
          <el-col :span="4" class="li-label">负责员工</el-col>
          王大锤
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "member-base-info",
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  .pane-part1{
    text-align: left;
    margin-top: 45px;
    font-size: 13px;
    color: #333333;
    .part-titl{
      padding-left: 20px;
      margin-bottom: 4px;
    }
    ul li{
      margin-top: 20px;
    }
    .li-label{
      color: #888888;
      text-align: right;
      margin-right: 32px;
    }
    .vertical-line{
     border-right: 1px solid #EFEFEF;
    }
  }
</style>
