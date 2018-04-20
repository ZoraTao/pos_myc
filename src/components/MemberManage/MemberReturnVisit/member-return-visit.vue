<template>
  <div class="content_box flexH100">
    <!--查询条件-->
    <div class="optometry_list_top am-bg-white">
      <el-form :model="form" :rules="rules" ref="form" label-width="80px">
      <div class="fn-left mgt4">
        <span class="member">回访时间:</span>
        <el-date-picker type="date" placeholder="选择日期" style="width: 120px"></el-date-picker>
        -
        <el-date-picker type="date" placeholder="选择日期" style="width: 120px"></el-date-picker>
      </div>
      <div class="fn-left mgt4">
        <span class="member">回访类型：</span>
        <el-select style="width:120px" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="fn-left mgt4">
        <span class="member">回访方式：</span>
        <el-select style="width:120px" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="fn-left mgt4">
        <span class="member">状态：</span>
        <el-select style="width:120px" v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="fn-left mgt4 mgl30">
        <button class="col_blue_bg_white find_btn">
          查询
        </button>
      </div>
      </el-form>
    </div>
    <!--/查询条件-->

    <!--无数据时缺省显示-->
    <el-row class="inquiry-row content-info-box" v-if="data.count = 0" v-cloak>
      <el-col :span="24">
        <div class="default-show">
          <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/image_quesheng.png"/>
          <p class="mgt25">暂无回访信息</p>
        </div>
      </el-col>
    </el-row>
    <!--/无数据时缺省显示-->

    <!--有数据时显示-->
    <!--tab-->
    <el-tabs type="border-card" class="mgt15" v-model="activeName" @tab-click="handleClick" v-cloak>
      <el-tab-pane name="1">
        <span slot="label">待回访</span>
        <un-visit :listData="data" :listCounts="counts" :mypagination="pagination" :tabchange="handleClick"></un-visit>
      </el-tab-pane>
      <el-tab-pane name="2">
        <span slot="label">已回访</span>
        <already-visit :listData="data" :listCounts="counts" :mypagination="pagination" :tabchange="handleClick"></already-visit>
      </el-tab-pane>
    </el-tabs>
    <!--/有数据时显示-->

  </div>
</template>

<script>
  import UnVisit from './member-un-visit'
  import AlreadyVisit from './member-already-visit'

  export default {
    name: "member-return-visit",
    data() {
      return {
        form:{
            status: '1'
          },
        activeName: '1',
        showDiv: "2",
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        value: "",
        data: [],
        nub: 0,//起始条数
        size: 10,//每页显示数据条数
        counts: 0,//总条数
        rules: {}
      };
    },
    components: {
      UnVisit,
      AlreadyVisit
    },
    created: function () {
      for (var i = 0; i < 10; i++) {
        this.data.push({
          a: '张三',
          b: '15757179646',
          c: '男',
          d: '25',
          e: 'R0326632321',
          f: '生日回访',
          g: '电话回访',
          h: '2018-01-01',
          i: '待回访',
          count: 1
        });
      };
      // this.getVisitList();
    },
    methods: {
      //筛选调拨单列表
      onSubmit() {
        const that = this;
        console.log(that.formInline);
        // that.getInquireList();
      },
      //tab切换
      handleClick(tab, event) {
        console.info(tab.name)
        // this.getVisitList({status: tab.name});
      },
      //分页
      pagination(val) {
        console.info(val)
        // this.getVisitList({nub:val});
      },
      //获取回访记录列表
      getVisitList(){
        const that = this;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../reset";
  @import "../../MemberManage/MemberInquiry/member-public-css";
  @import "../../MemberManage/MemberInquiry/tabs-css";

  .optometry_list_top {
    height: 70px;
    width: 100%;
    padding: 18px 20px;
    span {
      margin-right: 5px;
    }
    .fn-left {
      margin-right: 10px;
    }
  }

  .member {
    display: inline-block;
    font-weight: bold;
    font-size: 12px;
  }

  .mgt4 {
    margin-top: 4px;
  }

  .mgt2 {
    margin-top: 2px;
  }

  .find_btn {
    width: 96px;
    height: 30px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    letter-spacing: 0;
  }

  .add_btn {
    width: 100px;
    height: 34px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    letter-spacing: 0;
  }

  .col_blue_bg_white {
    color: #00AFE4;
    background: white;
    border: 1px solid #00AFE4;
    border-radius: 4px;
  }

  .bg_white_col_blue {
    color: #ffffff;
    background: #00AFE4;
    border: 1px solid #00AFE4;
    border-radius: 4px;
  }

  .optometry_input {
    background: #F8F8F8;
    border: 1px solid #E1E1E1;
    padding: 2px 10px;
    height: 26px;
  }

  .find_before {
    width: 250px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 24%;
    margin-left: -125px;
    /*margin-top: -150px;*/
  }

  .find_before li {
    text-align: center;
    margin-top: 23px;
  }

  li.optometry_qs_img {
    margin-left: 25px;
  }

  li.optometry_qs_text {
    text-align: center;
    font-size: 14px;
    color: #888888;
    letter-spacing: 0.51px;
  }

  /*列表*/

  .list_name {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    line-height: 26px;
    color: #333333;
    letter-spacing: 0;
    padding-left: 20px;
    margin-bottom: 5px;
    text-align: left;
  }
</style>
