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
    <!--有数据时显示-->
    <el-row class="inquiry-row content-info-box">
      <el-col :span="24" class="table-wrap">
        <!--多个数据时显示-->
        <el-table
          :data="tableData"
          stripe
          size="small"
          align="left"
          style="width: 100%;margin-bottom: 10px;">
          <el-table-column
            prop="a"
            label="姓名"
            width="60px">
          </el-table-column>
          <el-table-column
            prop="b"
            label="手机号"
            width="130px">
          </el-table-column>
          <el-table-column
            prop="d"
            label="卡号">
          </el-table-column>
          <el-table-column
            prop="e"
            label="积分"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="f"
            label="性别"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="g"
            label="消费次数"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="h"
            label="消费金额">
          </el-table-column>
          <el-table-column
            prop="i"
            label="最近消费时间">
          </el-table-column>
          <el-table-column
            prop="j"
            label="负责部门">
          </el-table-column>
          <el-table-column
            label="操作"
            width="150">
            <template slot-scope="scope">
              <a href="javascript:;" @click="checkDetail(scope.row)" type="text" size="small">查看</a>
              <a href="javascript:;" type="text" size="small" class="mgl10">编辑</a>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block">
          <el-pagination
            class="am-ft-right"
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="100"
            layout="total, prev, pager, next"
            :total="1000">
          </el-pagination>
        </div>
        <!--/多个数据时显示-->
        <!--单个数据时显示：会员资料-->
        <member-detail v-if="false"></member-detail>
        <!--/单个数据时显示：会员资料-->
      </el-col>

    </el-row>
    <!--/有数据时显示-->
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
        },
        tableData: [{
          a: '王大锤',
          b: '15383465768',
          c: '银卡',
          d: '银卡 562536256452',
          e: '123',
          f: '男',
          g: '1',
          h: '1599',
          i: '2017-12-14 12:26:26',
          j: '毛源昌杭州西湖店'
        },
        {
          a: '王大锤',
          b: '15383465768',
          c: '银卡',
          d: '银卡 562536256452',
          e: '123',
          f: '男',
          g: '1',
          h: '1599',
          i: '2017-12-14 12:26:26',
          j: '毛源昌杭州西湖店'
        }],
      }
    },
    created: function() {
      this.getMemberInfo()
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

      },
      //查看详情
      checkDetail(row) {
        console.log(row);
        this.$router.push({
          path: '/member/memberDetail',
          name: 'member-detail',
          params: {}
        })
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      //查询会员列表
      getMemberInfo(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/member-api/member/getMemberCount',
          method: 'post',
          params: {
            jsonObject: {}
          }
        })
        .then(function (response) {
          console.info(response.data)
        })
        .catch(function (error) {
          console.info(error)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "member-public-css";
</style>
