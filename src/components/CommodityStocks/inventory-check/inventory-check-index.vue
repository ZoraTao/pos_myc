<template>
  <div class="content-out-wrapper stocks-content">
    <!--top-->
    <el-row class="inquiry-row mgt6">
      <el-form :inline="true" :model="formInline" class="demo-form-inline am-ft-left">
        <el-col :span="21">
          <el-form-item label="仓库：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 160px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="formInline._check">只显示不平纪录</el-checkbox>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <!--/top-->

    <!--tab-->
    <el-tabs type="border-card" class="mgt15">
      <el-tab-pane label="未盘点">
        <!--无数据时缺省显示-->
        <el-row class="inquiry-row content-info-box" v-if="false">
          <el-col :span="24">
            <div class="default-show">
              <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/image_quesheng.png"/>
              <p class="mgt25">暂无盘点任务</p>
            </div>
          </el-col>
        </el-row>
        <!--/无数据时缺省显示-->

        <!--有数据时显示-->
        <not-check></not-check>
        <!--/有数据时显示-->
      </el-tab-pane>

      <el-tab-pane label="盘点中">
        <check-ing></check-ing>
      </el-tab-pane>

      <el-tab-pane label="已完成">
        <check-ed></check-ed>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  import NotCheck from './not-check'
  import CheckIng from './check-ing'
  import CheckEd from './check-ed'

  export default {
    name: "inventory-check-index",
    components: {
      NotCheck,
      CheckIng,
      CheckEd
    },
    data() {
      return {
        input1: '',
        formInline: {
          select1: '',
          _check: false
        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  }
</script>

<style lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";
  @import "../../MemberManage/MemberInquiry/tabs-css";

</style>
