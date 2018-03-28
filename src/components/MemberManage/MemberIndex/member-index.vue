<template>
  <div class="inner-index-box">
    <!--banner-->
    <div class="member-banner">
      <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/huiyuan_banner.png"/>
    </div>
    <!--content-->
    <div class="member-menus">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="member-item" @click="addMember=true">
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
          <div class="member-item" @click="goComplaintsInquiry">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hytousu.png"/>
            <span>会员投诉</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="member-item" @click="goReturnVisit">
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
    <el-dialog class="addMember" title="新增会员" :visible.sync="addMember" width="800px">
      <AddMember></AddMember>
      <div class="packageDetailButtonGroup">
          <el-button @click="addMember = false">取消</el-button>
          <el-button type="primary" @click="addMember = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AddMember from '../../PublicModal/addMember/add-member-modal.vue'
  export default {
    name: "memberIndex",
    data() {
      return {
        addMember:false
      }
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
      },
      //会员投诉
      goComplaintsInquiry: function () {
        this.$router.push({
          path: '/member/memberComplaints',
          name: 'member-complaints',
          params: {}
        })
      },
      //会员回访
      goReturnVisit: function () {
        this.$router.push({
          path: '/member/memberReturnVisit',
          name: 'member-return-visit',
          params: {}
        })
      }
    },
    components:{
      AddMember
    }

  }
</script>

<style scoped lang="scss">

</style>
