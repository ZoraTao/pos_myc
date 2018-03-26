<template>
  <div class="content-out-wrapper stocks-content">
    <!--top-->
    <el-row class="inquiry-row mgt6">
      <el-form :inline="true" :model="formInline" class="demo-form-inline am-ft-left">
        <el-col :span="20">
          <el-form-item label="调拨单号：">
            <el-input placeholder="输入商品编码" v-model="formInline.input1" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="调拨部门：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调出仓库：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调入仓库：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="20">
          <el-form-item label="调拨日期：">
            <div class="fn-line-block">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1"
                              style="width: 125px;"></el-date-picker>
            </div>
            <div class="fn-line-block am-ft-center am-text-secondary">至</div>
            <div class="fn-line-block">
              <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date2"
                              style="width: 125px;"></el-date-picker>
            </div>
          </el-form-item>
          <el-form-item label="来源类型：">
            <el-select v-model="formInline.select1" placeholder="请选择" style="width: 130px">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" plain @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-col>
        <el-col :span="2" class="fn-right mgr20">
          <el-button type="primary" @click="goAdd">+&nbsp;新增调拨单</el-button>
        </el-col>
      </el-form>
    </el-row>
    <!--content-->
    <el-row class="mgt10">
      <el-col :span="24" class="pl10">
        <h2 class="am-ft-16 mgb15">查询结果 (23)</h2>
      </el-col>
      <!--tab-->
      <el-col :span="24">
        <el-tabs type="border-card">
          <el-tab-pane label="调拨待审核">
           <pending-review></pending-review>
          </el-tab-pane>
          <el-tab-pane label="待调出">
            <pending-tune-out></pending-tune-out>
          </el-tab-pane>
          <el-tab-pane label="待调入">
            <pending-tune-in></pending-tune-in>
          </el-tab-pane>
          <el-tab-pane label="已完成">
            <completed-lists></completed-lists>
          </el-tab-pane>
          <el-tab-pane label="全部">
            <all-lists></all-lists>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PendingReview from './pending-review'
  import PendingTuneOut from './pending-tune-out'
  import PendingTuneIn from './pending-tune-in'
  import CompletedLists from './completed-lists'
  import AllLists from './all-lists'

  export default {
    name: "transfer-order-index",
    components: {
      PendingReview,
      PendingTuneOut,
      PendingTuneIn,
      CompletedLists,
      AllLists
    },
    data() {
      return {
        formInline: {
          input1: '',
          select1: '',
          select2: '',
          date1: '',
          date2: '',
        },
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      //新增调拨单
      goAdd() {
        this.$router.push({
          path: '/commodity/transfer-order-add',
          name: 'transfer-order-add',
          params: {}
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";
  @import "../../MemberManage/MemberInquiry/tabs-css";

</style>
