<template>
  <div class="content-out-wrapper">
    <!--part1 top-->
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

    <!--part2 search -->
    <el-row class="inquiry-row mgt6">
      <!--普通搜索-->
      <el-col :span="24" v-if="false">
        <el-col :span="4">
          <el-input
            placeholder="输入会员姓名/手机号／卡号"
            v-model="input1">
            <i slot="suffix" class="el-input__icon el-icon-search search-bt"></i>
          </el-input>
        </el-col>
        <el-col :span="1" :offset="1">
          <a class="fn-left mgt8" href="javascript:;">高级搜索</a>
        </el-col>
        <el-col :span="2" class="fn-right">
          <el-button type="primary">+&nbsp;新增会员</el-button>
        </el-col>
      </el-col>
      <!--高级搜索-->
      <el-col :span="24" v-if="true">
        <el-col :span="24">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="卡类型：">
              <el-select v-model="formInline.select1" placeholder="请选择">
                <el-option label="普卡" value="1"></el-option>
                <el-option label="金卡" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会员分类：">
              <el-select v-model="formInline.select2" placeholder="请选择">
                <el-option label="本店添加会员" value="1"></el-option>
                <el-option label="在本店消费会员" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-col>
    </el-row>


    <!--part3 content-->
    <el-row class="inquiry-row content-info-box">
      <el-col :span="24">
        <!--无数据时缺省显示-->
        <div class="default-show">
          <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/image_quesheng.png"/>
          <p class="mgt25">暂无会员信息</p>
        </div>
        <!--无数据时缺省显示-->
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
        formInline: {
          select1: '',
          select2: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
  .content-info-box{
    margin-top: 6px;
    min-height: 500px;
    .default-show{
      width: 100px;
      height: 100%;
      margin: 100px auto 0;
      img{
        display: block;
        margin: 0 auto;
      }
      p{
        font-size: 14px;
        color: #888888;
      }
    }

  }
</style>
