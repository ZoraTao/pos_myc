<template>
  <div class="content-wrapper">
    <!--banner-->
    <div class="member-banner">
      <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/huiyuan_banner.png"/>
    </div>
    <!--content-->
    <div class="member-menus">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="member-item" @click="goMemberAdd">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_xzhuiyuan.png"/>
            <span>新增会员</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="member-item" @click="goMemberInquiry">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hychaxun.png"/>
            <span>会员查询</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="member-item">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hytousu.png"/>
            <span>会员投诉</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="member-item">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hyhuifang.png"/>
            <span>会员回访</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="member-item">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hyquanyi.png"/>
            <span>会员权益</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "memberIndex",
    data() {
      return {}
    },
    methods: {
      //新增会员
      goMemberAdd: function () {
        this.$router.push({
          path: '/member/memberAdd',
          name: 'member-add',
          params: {}
        })
      },
      //会员查询
      goMemberInquiry: function () {
        this.$router.push({
          path: '/member/memberInquiry',
          name: 'member-inquiry',
          params: {}
        })
      }
    }

  }
</script>

<style scoped lang="scss">
  .member-banner {
    width: 100%;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      object-fit: cover;
    }
  }

  .member-menus {
    width: 90%;
    margin: 80px auto 20px;
    overflow: hidden;
    .member-item {
      img {
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin: 0 auto;
      }
      span {
        width: 100%;
        font-size: 20px;
        color: #333333;
        text-align: center;
        margin-top: 14px;
        display: block;
      }
    }
  }
</style>
