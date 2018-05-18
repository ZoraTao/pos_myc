<template>
  <div class="content-out-wrapper content-out-wrapper-md" v-if="memberInfo!=null" >
    <!--top-->
    <div class="member-info-base">
      <img v-if="memberInfo.headpicpath==''" class="member-logo" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_huiyuangl.png"/>
      <img v-else class="member-logo" :src="memberInfo.headpicpath" />
      <div class="info-det">
        <p>
          <span class="am-ft-16" v-cloak>{{memberInfo.name}}
            <!--性别为男时显示图片-->
            <img v-if="memberInfo.sex=='M'" class="sex-icon" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_male.png"/>
            <!--性别为女时显示图片-->
            <img v-else class="sex-icon" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_female.png"/>
          </span>
          <span class="level-card mgr5" v-cloak>{{memberInfo.cardName}}</span>
          <span class="am-ft-yellow" v-cloak><img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_jifen.png"/>{{memberInfo.points}}积分</span>
        </p>
        <p>
          <span class="mgr30" v-cloak><em class="am-text-secondary">卡号：</em>{{memberInfo.memberCardNo}}</span>
          <span class="am-text-placeholder am-ft-12" v-cloak>添加时间：{{memberInfo.createTime}}</span>
        </p>
      </div>
    </div>
    <!--tab-->
    <el-tabs type="border-card">
      <el-tab-pane label="会员资料">
        <member-base-info :memberBaseInfo="memberInfo"></member-base-info>
      </el-tab-pane>
      <el-tab-pane label="验光记录">
        <optometryOrderList :memberDet="'detail'" :memberInfos="memberInfo"></optometryOrderList>
        <!-- <member-optometry-record :memberBaseInfo="memberInfo"></member-optometry-record> -->
      </el-tab-pane>
      <el-tab-pane :label="'订单记录('+orderTempList.length+')'" v-if="orderTempList!=null">
        <member-order-record :orderTempList="orderTempList"></member-order-record>
      </el-tab-pane>
      <el-tab-pane label="投诉记录">
        <member-complaints-record></member-complaints-record>
      </el-tab-pane>
      <el-tab-pane label="回访记录">
        <member-return-visit></member-return-visit>
      </el-tab-pane>
      <el-tab-pane label="积分明细">
        <member-integral-details :memberInfo="memberInfo"></member-integral-details>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import MemberBaseInfo from "./member-base-info";
  // import MemberOptometryRecord from "./member-optometry-record";
  import MemberOrderRecord from "./member-order-record";
  import MemberComplaintsRecord from "./member-complaints-record";
  import MemberReturnVisit from "./member-return-visit";
  import MemberIntegralDetails from "./member-integral-details";
  import optometryOrderList from '../../Bills/optometryOrder/optometryOrderList/optometry-order-list'

  export default {
    components: {
      ElRow,
      MemberBaseInfo,
      // MemberOptometryRecord,
      MemberOrderRecord,
      MemberComplaintsRecord,
      MemberReturnVisit,
      MemberIntegralDetails,
      optometryOrderList
    },
    name: "member-detail",
    data() {
      return {
        memberInfo: null,
        orderTempList:null,
      }
    },
    methods:{
      initMemberOrder(tel){//根据手机号查订单
        let _this = this ;
        // _this.$myAjax({
        //   url:'member-api/member/getMemberListByTel',
        //   data:{
        //     telphone:_this.memberInfo.telphone
        //   }, success:function(res){
        //     console.log(res)
        //   },error:function(err){
        //     console.log(log)
        //   }
        // })
        _this.$myAjax({
          url:'pos-api/orderTemp/getOrderTempList',
          data:{
            searchCode:tel
          }, success:function(res){
            console.log(res)
            if(res.code == 1){
              _this.orderTempList = res.data.orderTempList;
            }else{
              _this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              })
            }
          },error:function(err){
            // console.log(log)
            _this.$message({
                showClose: true,
                message: err,
                type: 'error'
              })
          }
        })
      },
      searchMemberId(id){
        const _this = this;
        _this.$myAjax({
          url:'member-api/member/getMemberListByBoYang',
          data:{
            memberId:id
          },
          success:function(res){
            console.log(res)
            if(res.code == 1){
              _this.memberInfo = res.data.memberList[0];
            }else{
              _this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              })
            }
          },error:function(err){
            console.log(err)
            _this.$message({
                showClose: true,
                message: err,
                type: 'error'
              })
          }
        })
      }
    },
    created: function () {
      this.searchMemberId(this.$route.params.memberId)
      this.initMemberOrder(this.$route.params.tel);
    }
  }
</script>
<style lang="scss">
  @import "../../../reset";
  @import "tabs-css";

  .content-out-wrapper-md {
    margin: 0;
    .member-info-base {
      width: 100%;
      padding: 15px 30px;
      background-color: #ffffff;
      box-sizing: border-box;
      margin: 10px 0;
      text-align: left;
      font-size: 0;
      .member-logo{
        display: inline-block;
        width: 60px;
        height: 60px;
        border: 1px solid #E7E7E7;
        box-sizing: border-box;
        object-fit: cover;
      }
      .info-det{
        font-size: 14px;
        display: inline-block;
        vertical-align: 4px;
        margin-left: 11px;
        p{
          width: 100%;
          margin-bottom: 6px;
          overflow: hidden;
          img{
            margin: 0 3px;
            display: inline-block;
            vertical-align: -2px;
          }
          .sex-icon{
            margin: 0 10px 0 6px;
          }
          &:last-child{
            margin-bottom: 0;
          }
        }
        .level-card{
          font-size: 12px;
          color: #FF9400;
          border: 1px solid #FF9400;
          border-radius: 4px;
          padding: 2px 9px;
        }
      }
    }
  }

</style>
