<template>
  <el-row class="pane-part1">

    <el-col :span="11" class="vertical-line">
      <p class="part-titl">基本信息</p>
      <ul>
        <li>
          <el-col :span="4" class="li-label">姓名</el-col>
          {{memberBaseInfo.name}}
        </li>
        <li>
          <el-col :span="4" class="li-label">会员</el-col>
          {{memberBaseInfo.memberCardNo}}
        </li>
        <li>
          <el-col :span="4" class="li-label">性别</el-col>
          <span v-if="memberBaseInfo.sex=='M'">男</span>
          <span v-else>女</span>
        </li>
        <li>
          <el-col :span="4" class="li-label">电话</el-col>
          {{memberBaseInfo.telphone}}
        </li>
        <li>
          <el-col :span="4" class="li-label">生日</el-col>
          {{memberBaseInfo.birthday}}
        </li>
        <li>
          <el-col :span="4" class="li-label">联系地址</el-col>
          {{ memberBaseInfo.address}}
        </li>
        <li>
          <el-col :span="4" class="li-label">职业</el-col>
          {{ memberBaseInfo.job}}
        </li>
      </ul>
    </el-col>
    <el-col :span="9" :offset="1">
      <p class="part-titl">会员管理信息</p>
      <ul>
        <li>
          <el-col :span="4" class="li-label">会员来源</el-col>
          --
        </li>
        <li>
          <el-col :span="4" class="li-label">重要程度</el-col>
          --
        </li>
        <li>
          <el-col :span="4" class="li-label">负责部门</el-col>
          --
        </li>
        <li>
          <el-col :span="4" class="li-label">负责员工</el-col>
          --
        </li>
      </ul>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "member-base-info",
    data() {
      return { }
    },
    props: ['memberBaseInfo'],
    created: function () {

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
      overflow: hidden;
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
