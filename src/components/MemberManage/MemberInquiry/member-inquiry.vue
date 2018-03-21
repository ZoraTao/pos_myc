<template>
  <div class="content-out-wrapper">
    <!------part1 top------>
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

    <!------part2 search ------>
    <el-row class="inquiry-row mgt6">
      <!--普通搜索-->
      <el-col :span="21" v-if="normalsearch">
        <el-col :span="5">
          <el-input
            placeholder="输入会员姓名/手机号／卡号"
            v-model="input1">
            <i slot="suffix" class="el-input__icon el-icon-search search-bt"></i>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <a class="fn-left mgt8" href="javascript:;" @click="changeSearch('2')">高级搜索</a>
        </el-col>
      </el-col>
      <!--高级搜索-->
      <el-col :span="21" v-if="moresearch">
        <el-form :inline="true" :model="formInline" class="demo-form-inline am-ft-left">
          <el-col :span="24">
            <el-form-item label="卡类型：">
              <el-select v-model="formInline.select1" placeholder="请选择" style="width: 100px">
                <el-option label="普卡" value="1"></el-option>
                <el-option label="金卡" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会员分类：">
              <el-select v-model="formInline.select2" placeholder="请选择" style="width: 180px">
                <el-option label="本店添加会员" value="1"></el-option>
                <el-option label="在本店消费会员" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="添加时间：">
              <div class="fn-line-block">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"
                                style="width: 120px;"></el-date-picker>
              </div>
              <div class="fn-line-block am-ft-center am-text-secondary">-</div>
              <div class="fn-line-block">
                <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date2"
                                style="width: 120px;"></el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="超过：">
              <el-select v-model="formInline.select1" placeholder="0" style="width: 60px">
                <el-option label="0" value="1"></el-option>
                <el-option label="1" value="2"></el-option>
              </el-select>
              &nbsp;<strong class="am-ft-12 am-text-normal">天无验光记录</strong>
            </el-form-item>
            <el-form-item label="超过：">
              <el-select v-model="formInline.select1" placeholder="0" style="width: 60px">
                <el-option label="0" value="1"></el-option>
                <el-option label="1" value="2"></el-option>
              </el-select>
              &nbsp;<strong class="am-ft-12 am-text-normal">天无购买记录</strong>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <a class="fn-left am-ft-12 mgl10" href="javascript:;" @click="changeSearch('1')">普通搜索</a>
            </el-form-item>
          </el-col>
        </el-form>
      </el-col>
      <el-col :span="2" class="fn-right mgr20">
        <el-button type="primary" @click="goMemberAdd">+&nbsp;新增会员</el-button>
      </el-col>
    </el-row>

    <!------part3 content------>
    <!--无数据时缺省显示-->
    <el-row class="inquiry-row content-info-box" v-if="false">
      <el-col :span="24">
        <div class="default-show">
          <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/image_quesheng.png"/>
          <p class="mgt25">暂无会员信息</p>
        </div>
      </el-col>
    </el-row>
    <!--/无数据时缺省显示-->
    <!--有数据时缺省显示-->
    <el-row class="content-info-box">
      <!--会员资料-->
      <el-col :span="24">
        <member-detail></member-detail>
      </el-col>
      <!--/会员资料-->
    </el-row>
    <!--/有数据时缺省显示-->
  </div>
</template>

<script>
  import MemberDetail from './member-detail.vue'

  export default {
    name: "member-inquiry",
    components: {
      MemberDetail
    },
    data() {
      return {
        input1: '',
        normalsearch: true,
        moresearch: false,
        formInline: {
          select1: '',
          select2: '',
          date1: '',
          date2: '',
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      //切换搜索模式
      changeSearch(v) {
        if (v == '1') {
          this.normalsearch = true;
          this.moresearch = false;
        } else if (v == '2') {
          this.normalsearch = false;
          this.moresearch = true;
        }
      },
      //新增会员
      goMemberAdd: function () {
        this.$router.push({
          path: '/member/memberAdd',
          name: 'member-add',
          params: {}
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../reset";

  .inquiry-row {
    background: $white;
    padding: $h15 $h20;
    .inquiry-item {
      text-align: center;
      position: relative;
      &:after {
        content: ' ';
        width: 1px;
        height: 24px;
        background: #dddddd;
        position: absolute;
        right: 0;
        top: 50%;
        margin-top: -12px;
      }
      span {
        font-size: $h14;
        display: block;
      }
      strong {
        font-size: $h18;
        display: block;
        margin-top: $h8;
      }
    }
  }

  .content-info-box {
    margin-top: 6px;
    min-height: 500px;
    .default-show {
      width: 100px;
      height: 100%;
      margin: 100px auto 0;
      img {
        display: block;
        margin: 0 auto;
      }
      p {
        font-size: 14px;
        color: #888888;
      }
    }

  }
</style>
