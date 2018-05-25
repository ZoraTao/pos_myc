<template>
  <div class="content-out-wrapper">
    <!------part1 top------>
    <el-row class="inquiry-row" v-if="memberCount">
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
            @keyup.enter.native="getMemberList(1)"
            v-model="searchStr">
            <i slot="suffix" class="el-input__icon el-icon-search search-bt" @click="getMemberList(1)"></i>
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
              <el-select v-model="sreen.cardId" placeholder="请选择"  style="width: 100px">
                <el-option v-for="item in cardIdArr" :key="item.cardId" label="item.memberCardName" value="item.cardId"></el-option>
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
              <el-input
                placeholder="0"
                style="width: 60px"
                v-model="sreen.lastPrescriptionDays">
              </el-input>
              &nbsp;<strong class="am-ft-12 am-text-normal">天无验光记录</strong>
            </el-form-item>
            <el-form-item label="超过：">
              <el-input
                placeholder="0"
                style="width: 60px"
                v-model="sreen.lastShopDays">
              </el-input>
              &nbsp;<strong class="am-ft-12 am-text-normal">天无购买记录</strong>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" plain @click="getMemberList">查询</el-button>
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
              <a href="javascript:;" @click="memberModify(scope.row)" type="text" size="small" class="mgl10">编辑</a>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block">
          <el-pagination
            class="am-ft-right"
            background
            @current-change="getMemberList"
            :page-size="10"
            layout="total, prev, pager, next"
            :total="counts"
            :current-page.sync="sreen.nub">
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
      <AddMember :submit="isSubmit" ref="addMembers" @listenToChild="memberAddSubmit"></AddMember>
      <div class="packageDetailButtonGroup">
        <el-button @click="addMember = false">取消</el-button>
        <el-button type="primary" @click="memberAddSubmit">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog class="addMember" title="会员编辑" :visible.sync="memberModifys" width="800px">
      <MemberModify :modifyMessage="modifyMessage" ></MemberModify>
    </el-dialog>
  </div>
</template>

<script>
import MemberDetail from "./member-detail.vue";
import MemberModify from "./member-modify.vue";
import AddMember from "../../PublicModal/addMember/add-member-modal.vue";
import reg from "../../../utils/Reg";
import {removeAllSpace} from '../../../utils/other'
import store from '../../../vuex/store'
export default {
  name: "member-inquiry",
  components: {
    MemberDetail,
    AddMember,
    MemberModify
  },
  data() {
    return {
      counts: 0,//总条数
      addMember: false,
      memberModifys:false,
      isSubmit:false,
      searchStr: "",
      cardIdArr:[],
      normalsearch: true,
      moresearch: false,
      sreen: {
        cardId: "", //卡类型
        memberType: "", //会员类型
        lastPrescriptionDays: "", //没有验光记录
        lastShopDays:"",//隔无购物天数
        startTime: "", //开始时间
        endTime: "", //结束时间
        nub: 1,
        size: 10
      },
      modifyMessage:null,
      memberList: [], //会员列表
      memberCount: [], //会员汇总数量
      cardNumList: [] //会员卡汇总数量
    };
  },
  store,
  beforeMount: function() {
    // this.getMemberList();
    this.getMemberCount();
  },
  mounted(){
  },
  computed:{
  },
  methods: {
    memberModify(data){
      let _this = this;
      _this.modifyMessage = data;
      _this.memberModifys = true
    },
    
    memberModifySubmit(){
      this.memberModifys = false;
    },
    initData(){
      const _this = this;
      let user = JSON.parse(sessionStorage.getItem("userData"));
      _this.$myAjax({
        url:'member-api/card/getCardList',
        data:{},
        keyParams:{
          appKey:user.appKey,
          brandId:user.brandId,
          duid:user.duid,
          token:user.token,
          timestamp:user.timestamp
        },
        success:function(res){
          if(res.code == 1){
            _this.cardIdArr = res.data.cardList;
          }else{
            _this.$message({
              type:'warning',
              message:res.msg,
              showClose:true})
           }
        },error:function(err){
          _this.$message({
            type:'error',
            message:err,
            showClose:true})
          }
      });
      
    },
    //查询会员列表
    getMemberList(type) {
      const _this = this;
      var jsonObject={};
      if(type){
        _this.sreen.nub=1;
      }
      setTimeout(function(){
        if(_this.normalsearch){
          jsonObject.seachCode=_this.searchStr;
          jsonObject.nub=(_this.sreen.nub==1?0:(_this.sreen.nub-1)*_this.sreen.size);
          jsonObject.size=_this.sreen.size;
        }
        if(_this.moresearch){
          jsonObject=_this.sreen;
        }
        _this.$myAjax({
          url:'member-api/member/getMemberListByBoYang',
          data:jsonObject,
          success:function(res){
            if(res.code == 1){
               _this.memberList = res.data.memberList;
              _this.counts = parseInt(res.data.count);
            }else{
              _this.$message({
                type:'warning',
                message:res.msg,
                showClose:true})
             }
          },error:function(err){
             _this.$message({
              type:'error',
               message:err,
              showClose:true
            })
          }
        });
        
      },0)
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
      const _this = this;
      _this.$nextTick(() => {
        _this.$refs.addMembers.cleandata();
      });
    },
    //保存新增
    memberAddSubmit(formdata) {
      console.log(formdata)
      //data为从子组件取到的数据
      // console.log(formdata)
      // return false
          const _this = this;
        _this.isSubmit = !_this.isSubmit;
        if (formdata.name != '' && formdata.telphone != '' && formdata.birthday != '' && formdata.sex != '') {
          _this.$myAjax({
            url:'member-api/member/addMember',
            data:formdata,
            success:function(res){
              if(res.code == 1){
                  _this.addMember = false;
                // console.info(response.data.data)
                _this.$message({
                  showClose: true,
                  message: '新增会员成功',
                  type: 'success'
                });
              }else{
                _this.$message({
                  type:'warning',
                  message:res.msg,
                  showClose:true})
               }
            },error:function(err){
               _this.$message({
                type:'error',
                 message:err,
                showClose:true
              })
            }
          });
        } else {
          _this.$message({
            showClose: true,
            message: '请输入完整信息',
            type: 'error'
          })
        }
    },
    //查看详情
    checkDetail(data) {
      console.log(data.memberId,data.telphone);
      this.$router.push({
        // path: "/member/memberDetail",
        name: "member-detail",
        params: { memberId:data.memberId,tel:data.telphone }
      });
    },
    //查询会员汇总数量
    getMemberCount() {
      const _this = this;
      _this.$myAjax({
        url:'member-api/member/getMemberCount',
        data:{
        
        },
        success:function(res){
          if(res.code == 1){
             _this.memberCount = res.data;
            _this.cardNumList = res.data.cardNumList;
          }else{
            _this.$message({
              type:'warning',
              message:res.msg,
              showClose:true})
           }
        },error:function(err){
           _this.$message({
            type:'error',
             message:err,
            showClose:true
          })
        }
      });
    },
  },
  created(){
    this.initData();
  }
};
</script>

<style scoped lang="scss">
@import "member-public-css";
</style>
