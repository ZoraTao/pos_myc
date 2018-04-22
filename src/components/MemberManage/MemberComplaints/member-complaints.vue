<template>
  <div class="content_box flexH100">
    <div class="optometry_list_top am-bg-white">
      <el-form ref="form" :model="form" :inline="true" label-width="60px">
        <el-form-item label="投诉日期：">
          <div class="fn-line-block">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="startDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 130px;"></el-date-picker>
          </div>
          <div class="fn-line-block am-ft-center">-</div>
          <div class="fn-line-block">
            <el-date-picker
              type="date"
              placeholder="选择时间"
              v-model="endDate"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              style="width: 130px;"></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="状态：">
          <el-select style="width:120px" v-model="form.status" placeholder="请选择">
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="零售单号：">
          <el-input clearable style="width:120px" v-model="form.orderId" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="会员：" >
          <el-input clearable style="width:120px" v-model="form.telphone" placeholder="卡号/姓名/手机号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="getComplainsList">查询</el-button>
        </el-form-item>
        <el-form-item class="fn-right">
          <el-button type="primary" @click="isShowNewComplaints=true"> + 新增投诉</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="optometry_content optometry_content">
      <!--查询之前-->
      <div v-show="false">
        <ul class="find_before">
          <li class="optometry_qs_img">
            <img src="http://myc-oms.oss-cn-hangzhou.aliyuncs.com/img%2Foptometry_qs.png"/>
          </li>
          <li class="optometry_qs_text">
            暂无投诉信息
          </li>
        </ul>
      </div>
      <!--列表-->
      <div>
        <el-table
          :data="complainsList"
          size="small"
          align="left"
          style="width: 100%;margin-bottom:10px;">
          <el-table-column
            prop="complaintTime"
            label="投诉日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="b"
            label="会员姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="telphone"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="d"
            label="性别">
          </el-table-column>
          <el-table-column
            prop="complaintCategoryList.category"
            label="投诉类别">
          </el-table-column>
          <el-table-column
            prop="memo"
            label="投诉说明">
          </el-table-column>
          <el-table-column
            prop="type"
            label="投诉类型">
          </el-table-column>
          <el-table-column
            prop="h"
            label="关联零售单号">
          </el-table-column>
          <el-table-column
            prop="deskClerkId"
            label="接待人员">
          </el-table-column>
          <el-table-column
            label="状态">
            <template slot-scope="scope">
              <span class="am-ft-red">{{scope.row.status}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <span class="am-ft-blue"><a href="javascript:;" @click="getDetail(scope.$index,scope.row)">查看</a></span>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <div class="block mgt10" v-if="counts>0">
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
      </div>
      <!--/列表-->
    </div>

    <!--新增投诉-->
    <el-dialog
      title="提示"
      :visible.sync="isShowNewComplaints"
      width="900px">
      <newComplaintsModal v-on:dialogNewComp="getDialogStatus"></newComplaintsModal>
    </el-dialog>
    <!--新增投诉-->
    <!--投诉单详情-->
    <el-dialog
      title="提示"
      class="ComplainsBill"
      :visible.sync="isShow"
      width="900px">
      <ComplainsBillModal v-on:dialogdetComp="getDetDialogStatus"></ComplainsBillModal>
    </el-dialog>
    <!--投诉单详情-->
  </div>
</template>

<script>
  import newComplaintsModal from '../../PublicModal/NewComplaints/new-complaints-modal.vue'
  import ComplainsBillModal from '../../PublicModal/ComplaintsBill/complains-bill-modal.vue'

  export default {
    name: "member-complaints",
    data() {
      return {
        complainsList: [],//投诉列表数据
        statusList: [{//状态列表数据
          id: 0,
          name: '未处理'
        },
        {
          id: 1,
          name: '已处理'
        }],
        searchModel: "",
        isShowNewComplaints: false,
        isShow: false,
        startDate: '',
        endDate: '',
        form: {
          complaintTime: '',
          status: '',
          orderId: '',
          name: '',
          telphone: '',
          memberCardId: '',
        },
        value: "",
        nub: 0,//起始条数
        size: 10,//每页显示数据条数
        counts: 0,//总条数
      };
    },
    props: [''],
    components: {
      newComplaintsModal,
      ComplainsBillModal
    },
    created: function () {
      this.getComplainsList();
    },
    methods: {
      //从子组件监听弹窗的状态
      getDialogStatus(val) {
        this.isShowNewComplaints = val;
      },
      getDetDialogStatus(val) {
        this.isShow = val;
      },
      //分页
      handleCurrentChange(val) {
        this.nub = (`${val}` - 1) * this.size;
        this.getComplainsList();
      },
      //获取投诉列表
      getComplainsList() {
        var that = this;
        const ueserInfo = JSON.parse(localStorage.getItem("userData"));
        that.orgId = ueserInfo.orgId;
        that.$set(that.form,'complaintTime',[that.startDate,that.endDate]);
        that.$set(that.form,'size',that.size);
        that.$set(that.form,'nub',that.nub);
        // console.info(that.form);
      that.$axios({
        url: 'http://myc.qineasy.cn/member-api/memberComplaint/getMemberComplaintList',
        method: 'post',
        params: {
          jsonObject: that.form,
          keyParams: {
            weChat: true,
            orgId: that.orgId
        }
        }
      })
        .then(function (response) {
          if(response.data.code != '1'){
            that.$message({
              showClose: true,
              message: '请求数据出问题喽，请重试！',
              type: 'error'
            })
            return false;
          }else {
            // console.info(response.data.data)
            that.complainsList = response.data.data.memberComplaintList;
            if(response.data.data.count){
              that.counts = response.data.data.count;
            }
          }
        })
        .catch(function (error) {
          console.info(error);
          that.$message({
            showClose: true,
            message: '请求数据失败，请联系管理员',
            type: 'error'
          })
        })
      },
      //查看详情
      getDetail(){
        var that = this;
        that.isShow = true;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../reset";

  .optometry_list_top {
    height: 70px;
    width: 100%;
    padding: 18px 20px;
    .el-form--inline .el-form-item{
      margin-right: 10px !important;
    }
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

  .optometry_content {
    position: relative;
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 123px);
    background: white;
    padding: 11px;
    overflow-y: auto;
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
