c<template>
  <div class="content-out-wrapper">
    <!------part1 top------>
    <el-row class="inquiry-row">
      <el-col :span="4">
        <div class="inquiry-item">
          <span>昨日新增会员数</span>
          <strong class="am-ft-darkred" v-cloak>{{memberCount.addNewCount}}</strong>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="inquiry-item">
          <span>本月申领会员总数</span>
          <strong class="am-ft-yellow" v-cloak>{{memberCount.monthCount}}</strong>
        </div>
      </el-col>
      <el-col :span="8">
        <el-col :span="6">
          <div class="inquiry-item">
            <span>会员总数</span>
            <strong v-cloak>{{memberCount.memberCount}}</strong>
          </div>
        </el-col>
        <el-col :span="6" v-for="card in cardNumList" :key="card.cardName">
          <div class="inquiry-item">
            <span v-cloak>{{card.cardName}}</span>
            <strong v-cloak>{{card.cardCount}}</strong>
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
            v-model="searchStr">
            <i slot="suffix" class="el-input__icon el-icon-search search-bt" @click="searchMember"></i>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <a class="fn-left mgt8" href="javascript:;" @click="changeSearch('2')">高级搜索</a>
        </el-col>
      </el-col>
      <!--高级搜索-->
      <el-col :span="21" v-if="moresearch">
        <el-form :inline="true" :model="sreen" class="demo-form-inline am-ft-left">
          <el-col :span="24">
            <el-form-item label="卡类型：">
              <el-select v-model="sreen.cardType" placeholder="请选择"  style="width: 100px">
                <el-option label="普卡" value="1"></el-option>
                <el-option label="金卡" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="会员分类：" >
              <el-select v-model="sreen.memberType" placeholder="请选择" style="width: 180px">
                <el-option label="本店添加会员" value="1" />
                <el-option label="在本店消费会员" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="添加时间：">
              <div class="fn-line-block">
                <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="sreen.startTime"
                style="width: 120px;" />
              </div>
              <div class="fn-line-block am-ft-center am-text-secondary">-</div>
              <div class="fn-line-block">
                <el-date-picker type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="sreen.endTime"
                style="width: 120px;" />
              </div>
            </el-form-item>
            <el-form-item label="超过：">
              <el-select v-model="sreen.mangDayNotShine"  placeholder="0" style="width: 60px">
                <el-option label="0" value="1"></el-option>
                <el-option label="1" value="2"></el-option>
              </el-select>
              &nbsp;<strong class="am-ft-12 am-text-normal">天无验光记录</strong>
            </el-form-item>
            <el-form-item label="超过：">
              <el-select v-model="sreen.manyDayNotBuy" placeholder="0" style="width: 60px">
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
        <el-button type="primary" @click="memberAdd">+&nbsp;新增会员</el-button>
      </el-col>
    </el-row>

    <!------part3 content------>
    <!--无数据时缺省显示-->
    <el-row class="inquiry-row content-info-box" v-if="counts == 0">
      <el-col :span="24">
        <div class="default-show">
          <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/image_quesheng.png"/>
          <p class="mgt25">暂无会员信息</p>
        </div>
      </el-col>
    </el-row>
    <!--/无数据时缺省显示-->
    <!--有数据时显示-->
    <el-row class="inquiry-row content-info-box" v-if="counts > 0">
      <el-col :span="24" class="table-wrap">
        <!--多个数据时显示-->
        <el-col :span="24">
          <h2 class="am-ft-16 mgb15">查询结果 ({{counts}})</h2>
        </el-col>
        <el-table
          :data="memberList"
          stripe
          size="small"
          align="left"
          style="width: 100%;margin-bottom: 10px;">
          <el-table-column
            prop="name"
            label="姓名"
            width="120px">
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号"
            width="130px">
          </el-table-column>
          <el-table-column
            prop="memberCardNo"
            label="卡号">
          </el-table-column>
          <el-table-column
            prop="points"
            label="积分"
            width="100px">
          </el-table-column>
          <el-table-column
            label="性别"
            width="100px">
            <template slot-scope="scope">
              <span v-if="scope.row.sex=='M'">男</span>
              <span v-else>女</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="shoppingCount"
            label="消费次数"
            width="100px">
          </el-table-column>
          <el-table-column
            prop="totalConsumption"
            label="消费金额">
          </el-table-column>
          <el-table-column
            prop="lastShopTime"
            label="最近消费时间">
          </el-table-column>
          <el-table-column
            prop="orgName"
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
            @current-change="handleCurrentChange"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="counts"
            :current-page.sync="nub">
          </el-pagination>
        </div>
        <!--/多个数据时显示-->
        <!--单个数据时显示：会员资料-->
        <member-detail v-if="false"></member-detail>
        <!--/单个数据时显示：会员资料-->
      </el-col>

    </el-row>
    <!--/有数据时显示-->

    <!--新增会员弹窗-->
    <el-dialog class="addMember" title="添加会员" :visible.sync="addMember" width="800px">
      <AddMember :submit="isSubmit" v-on:listenToChild="memberAddSubmit"></AddMember>
      <div class="packageDetailButtonGroup">
        <el-button @click="addMember = false">取消</el-button>
        <el-button type="primary" @click="memberAddSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MemberDetail from "./member-detail.vue";
import AddMember from "../../PublicModal/addMember/add-member-modal.vue";
import reg from "../../../utils/Reg";
import {removeAllSpace} from '../../../utils/other'
import store from '../../../vuex/store'
import { mapState,mapMutations,mapGetters,mapActions } from 'vuex'
export default {
  name: "member-inquiry",
  components: {
    MemberDetail,
    AddMember
  },
  data() {
    return {
      nub: 0,//起始条数
      size: 10,//每页显示数据条数
      counts: 0,//总条数
      isSubmit: false,
      addMember: false,
      searchStr: "",
      normalsearch: true,
      moresearch: false,
      sreen: {
        cardId: "", //卡类型
        memberType: "", //会员类型
        cardId: 1, //没有购买记录
        lastPrescriptionDays: 1, //没有验光记录
        startTime: "", //开始时间
        endTime: "", //结束时间
        nub: "0",
        size: "10"
      },
      memberList: [], //会员列表
      memberCount: [], //会员汇总数量
      cardNumList: [] //会员卡汇总数量
    };
  },
  store,
  beforeMount: function() {
    this.getMemberList();
    this.getMemberCount();
  },
  mounted(){
    console.log(this)
  },
  computed:{
  },
  methods: {
    onSubmit() {
      //根据条件筛选会员信息
      console.log(this.sreen);
      let _this = this;
      this.$axios({
        url: "http://myc.qineasy.cn/member-api/member/getMemberListByBoYang",
        method: "post",
        params: {
          jsonObject: _this.sreen,
          keyParams: {
            weChat: true,
            userId: "8888",
            orgId: "11387"
          }
        }
      })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    //切换搜索模式
    changeSearch(v) {
      if (v == "1") {
        this.normalsearch = true;
        this.moresearch = false;
      } else if (v == "2") {
        this.normalsearch = false;
        this.moresearch = true;
      }
    },
    //新增会员
    memberAdd() {
      this.addMember = true;
    },
    //保存新增
    memberAddSubmit: function (formdata) {
      //data为从子组件取到的数据
        var that = this;
        that.isSubmit = !that.isSubmit;
        if (formdata.name != '' && formdata.telphone != '' && formdata.birthday != '' && formdata.sex != '') {
          that.$axios({
            url: 'http://myc.qineasy.cn/member-api/member/addMember',
            method: 'post',
            params: {
              jsonObject: formdata,
              keyParams: {
                weChat: true,
                userId: "8888",
                orgId: "11387"
              }
            }
          })
            .then(function (response) {
              if (response.data.code != '1') {
                that.$message({
                  showClose: true,
                  message: '请求数据出问题喽，请重试！',
                  type: 'error'
                })
                return false;
              } else {
                that.addMember = false;
                // console.info(response.data.data)
                that.$message({
                  showClose: true,
                  message: '新增会员成功',
                  type: 'success'
                });
              }
            })
            .catch(function (error) {
              console.info(error)
              that.$message({
                showClose: true,
                message: error,
                type: 'error'
              })
            })
        } else {
          that.$message({
            showClose: true,
            message: '请输入完整信息',
            type: 'error'
          })
        }
    },
    //查看详情
    checkDetail(data) {
      // console.log(data);
      this.$router.push({
        // path: "/member/memberDetail",
        name: "member-detail",
        params: { data }
      });
    },
    //分页
    handleCurrentChange(val) {
      this.nub = (`${val}`-1) * this.size;
      this.getMemberList();
    },
    //查询会员汇总数量
    getMemberCount() {
      var that = this;
      that
        .$axios({
          url: "http://myc.qineasy.cn/member-api/member/getMemberCount ",
          method: "post",
          params: {
            jsonObject: {},
            keyParams: {
              weChat: true,
              userId: "8888",
              orgId: "11387"
            }
          }
        })
        .then(function(response) {
          // console.info(response.data.data)
          that.memberCount = response.data.data;
          that.cardNumList = response.data.data.cardNumList;
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    searchMember() {
      //普通搜索
      var _this = this;
      let seaStr = _this.searchStr;
      this.searchStr = removeAllSpace( this.searchStr, 'g');//去空格
      this.$axios({
          url: "http://myc.qineasy.cn/member-api/member/getMemberListByBoYang ",
          method: "post",
          params: {
            jsonObject: {
              seachCode:_this.searchStr,
              nub:_this.nub,
              size:_this.size
            },
            keyParams: {
              weChat: true,
              userId: "8888",
              orgId: "11387"
            }
          }
        })
        .then(function(response) {
          // console.info(response.data.data)
          _this.memberCount = response.data.data;
          _this.cardNumList = response.data.data.cardNumList;
          console.log( response.data.memberList)
          _this.memberList = response.data.data.memberList;
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    //查询会员列表
    getMemberList() {
      var that = this;
      that.$axios({
          url: "http://myc.qineasy.cn/member-api/member/getMemberListByBoYang",
          method: "post",
          params: {
            jsonObject: {
              nub: that.nub,
              size: that.size
            },
            keyParams: {
              weChat: true
            }
          }
        })
        .then(function(response) {
          if(response.data.code != '1'){
            that.$message({
              showClose: true,
              message: '请求数据出问题喽，请重试！',
              type: 'error'
            })
            return false;
          }else {
            // console.info(response.data.data)
            that.memberList = response.data.data.memberList;
            that.counts = parseInt(response.data.data.count);
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import "member-public-css";
</style>
