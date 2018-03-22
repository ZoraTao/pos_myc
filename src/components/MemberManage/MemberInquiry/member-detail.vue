<template>
  <div class="content-out-wrapper content-out-wrapper-md">
    <!--top-->
    <div class="member-info-base">
      <img class="member-logo" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_huiyuangl.png"/>
      <div class="info-det">
        <p>
          <span class="am-ft-16">李依依
            <img class="sex-icon" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_female.png"/>
            <!--性别为男时显示图片-->
            <!--<img class="sex-icon" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_male.png"/>-->
          </span>
          <span class="level-card mgr5">金卡</span>
          <span class="am-ft-yellow"><img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_jifen.png"/>1200积分</span>
        </p>
        <p>
          <span class="mgr30"><em class="am-text-secondary">卡号：</em>34545665655</span>
          <span class="am-text-placeholder am-ft-12">添加时间：2017-03-21  18:23:30</span>
        </p>
      </div>
    </div>
    <!--tab-->
    <el-tabs type="border-card">
      <el-tab-pane label="会员资料">
        <member-base-info></member-base-info>
      </el-tab-pane>
      <el-tab-pane label="验光记录(1)">
        <member-optometry-record></member-optometry-record>
      </el-tab-pane>
      <el-tab-pane label="订单记录(1)">
        <member-order-record></member-order-record>
      </el-tab-pane>
      <el-tab-pane label="投诉记录">
        <member-complaints-record></member-complaints-record>
      </el-tab-pane>
      <el-tab-pane label="回访记录">
        <member-return-visit></member-return-visit>
      </el-tab-pane>
      <el-tab-pane label="积分明细">
        <member-integral-details></member-integral-details>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import ElRow from "element-ui/packages/row/src/row";
  import MemberBaseInfo from "./member-base-info";
  import MemberOptometryRecord from "./member-optometry-record";
  import MemberOrderRecord from "./member-order-record";
  import MemberComplaintsRecord from "./member-complaints-record";
  import MemberReturnVisit from "./member-return-visit";
  import MemberIntegralDetails from "./member-integral-details";

  export default {
    components: {
      ElRow,
      MemberBaseInfo,
      MemberOptometryRecord,
      MemberOrderRecord,
      MemberComplaintsRecord,
      MemberReturnVisit,
      MemberIntegralDetails
    },
    name: "member-detail",
    data() {
      return {}
    }
  }
</script>
<style lang="scss">
  @import "../../../reset";

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
    .el-tabs--border-card {
      min-height: 500px;
      border: 1px solid #f3f4f5;
      -webkit-box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.05), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.05), 0 0 6px 0 rgba(0, 0, 0, 0.04);
    }

    .el-tabs--border-card>.el-tabs__header{
      border-bottom: 0 !important;
      background-color: #f3f3f4 !important;
    }

    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      border-right: 0;
      border-left: 0;
      font-weight: bold;
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item{
      color: #666666;
      border: 0;
    }

  }

</style>
