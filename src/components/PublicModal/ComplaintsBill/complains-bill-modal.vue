<template>
  <div class="newOptometry">
    <div class="textCenter newOptometryBody">
      <div class="newOptometryPhone">
        <div class="complainsMemberInfo">
          <el-row>
            <el-col :span="24">
              <div class="cmInfoItem">
                <label>会员：</label>
                <p>{{detAllData.name}}</p>
                <p class="mgr5" v-if="detAllData.sex=='M'">男</p>
                <p class="mgr5" v-if="detAllData.sex=='F'">女</p>
              </div>
              <div class="cmInfoItem">
                <label>手机 :</label>
                <p>{{detAllData.telphone}}</p>
              </div>
              <div class="cmInfoItem">
                <label>联系地址 :</label>
                <p>{{detAllData.address}}</p>
              </div>
              <div class="cmInfoItem fn-right">
                <label>投诉日期 :</label>
                <p>{{detAllData.complaintTime}}</p>
              </div>
              <div class="cmInfoItem fn-right">
                <label>投诉类型 :</label>
                <p class="mgr10" v-if="detAllData.type=='0'">上门投诉</p>
                <p class="mgr10" v-if="detAllData.type=='1'">电话投诉</p>
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24">
              <div class="cmInfoItem ">
                <label>投诉说明：</label>
                <p><b class="am-ft-black">{{detAllData.memo}}</b></p>
              </div>
              <div class="cmInfoItem fn-right">
                <label>接待人员：</label>
                <p>{{detAllData.deskClerkName}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <h5 class="complainsNum">零售单号：{{detAllData.orderId}}</h5>
      <!--商品信息-->
      <div class="complaintsType">
        <div class="grayTable">
          <el-table
            :data="proData"
            size="small"
            style="width: 100%">
            <el-table-column
              prop="itemName"
              align="left"
              label="商品名称"
              width="300">
            </el-table-column>
            <el-table-column
              prop="quantity"
              align="center"
              label="数量">
            </el-table-column>
            <el-table-column
              align="center"
              prop="listPrice"
              label="原单价">
            </el-table-column>
            <el-table-column
              align="center"
              prop="discountRate"
              label="折扣">
            </el-table-column>
            <el-table-column
              align="center"
              prop="price"
              label="实售单价">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--投诉信息-->
      <div class="complaintsType">
        <h5>投诉信息：</h5>
        <div class="grayTable">
          <template>
            <el-table
              :data="tableData"
              size="small"
              style="width: 100%">
              <el-table-column
                prop="category"
                align="left"
                label="投诉大类"
                width="120">
              </el-table-column>
              <el-table-column
                prop="subCategory"
                align="center"
                label="投诉小类"
                width="120">
              </el-table-column>
              <el-table-column
                prop="liableNameId"
                align="center"
                label="负责人"
                width="120">
              </el-table-column>
              <el-table-column
                prop="reason"
                align="left"
                label="原因"
                width="100">
              </el-table-column>
              <el-table-column
                align="center"
                label="处理意见">
                <template slot-scope="scope">
                  <el-form :model="tableData[scope.$index]">
                    <el-input class="w100" v-model="tableData[scope.$index].opinion" :disabled="editStatus" placeholder="请输入"></el-input>
                  </el-form>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </div>
      </div>
      <ul class="optometryMemo">
        <li class="fn-left">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" prop="name" label-width="100px" class="demo-ruleForm">
            <el-form-item class="labelInput mgb0" label="处理人员：" prop="name">
              <el-select style="width:120px"
                         v-model="detAllData.handleNameId"
                         :disabled="editStatus"
                         :placeholder="detAllData.handleName">
                <el-option
                  v-for="item in memberList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="labelInput mgb0" label="处理日期：">
              <el-date-picker type="date" :placeholder="detAllData.handleTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                              v-model="detAllData.handleTime"
                              :disabled="editStatus"
                              style="width: 127px;">
              </el-date-picker>
            </el-form-item>
          </el-form>
        </li>
      </ul>
    </div>
    <div class="packageDetailButtonGroup">
      <!--已完成-->
      <div v-if="editHandle== true">
        <el-button @click="cancelDialog">取消</el-button>
        <el-button type="primary" @click="cancelDialog">确定</el-button>
      </div>
      <!--待处理-->
      <div v-if="editStatus == false">
        <el-button @click="cancelEdit">取消</el-button>
        <el-button type="primary" @click="editComplaint('ruleForm')">确定</el-button>
      </div>
      <el-button type="primary" @click="goEdit" v-if="editHandle== false && editStatus == true">修改处理意见</el-button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'ComplainsBillModal',
    data() {
      return {
        orgId: '',
        userId: '',
        dialogDetStatus: false,
        editStatus: true,
        ruleForm: {
          memberComplaintId: '',//会员投诉id
          handleNameId: '',//处理人
          handleTime: '',//处理时间
          status: '0',//状态
          complaintCategoryList: [
            {
              complaintCategoryId: '',//原因
              opinion: '',//处理意见
            }
          ],
        },
        rules: {
          name: [
            // {required: true, message: '请输入', trigger: 'blur'}
          ]
        },
        memberList: [],//处理人员
      }
    },
    props: ['tableData','proData','detAllData','editHandle'],
    created() {
      const ueserInfo = JSON.parse(localStorage.getItem("userData"));
      this.orgId = ueserInfo.orgId;
      this.userId = ueserInfo.userId;
      this.getReceptList();
    },
    methods: {
      //关闭详情弹窗
      cancelDialog() {
        const that = this;
        that.dialogDetStatus = false;
        that.$emit('dialogdetComp', that.dialogDetStatus)
      },
      //修改
      goEdit(){
        this.editStatus = false;
      },
      //取消修改
      cancelEdit(){
        this.editStatus = true;
      },
      //修改投诉单
      editComplaint(formName) {
        const that = this;
        that.ruleForm.memberComplaintId = that.detAllData.memberComplaintId;
        that.ruleForm.handleTime = that.detAllData.handleTime;
        that.ruleForm.handleNameId = that.detAllData.handleNameId;
        that.ruleForm.complaintCategoryList = that.tableData;
          // console.info(that.ruleForm)
          that.$axios({
            url: 'http://myc.qineasy.cn/member-api/memberComplaint/updateMemberComplaintStatus',
            method: 'post',
            params: {
              jsonObject: {

              },
              keyParams: {
                weChat: true,
                orgId: that.orgId,
                userId: that.userId
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
                that.$message({
                  showClose: true,
                  message: '修改成功！',
                  type: 'success'
                });
                that.dialogDetStatus = false;
                that.$emit('dialogdetComp',that.dialogDetStatus)
                that.$refs[formName].resetFields();
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
      //获取负责人、接待人员列表
      getReceptList() {
        const that = this;
        const ueserInfo = JSON.parse(localStorage.getItem("userData"));
        that.orgId = ueserInfo.orgId;
        that.$axios({
          url: 'http://myc.qineasy.cn/cas-api/user/getUsersByOrgId',
          method: 'post',
          params: {
            jsonObject: {},
            keyParams: {
              weChat: true,
              orgId: that.orgId
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
              // console.info(response.data.data)
              that.memberList = response.data.data.userList;
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
    },
  }
</script>

<style lang="scss">
  @import "../../../reset";

  .ComplainsBill {
    .complainsNum {
      margin-left: 18px;
      margin-bottom: 5px;
    }
    .w100 {
      width: 100%;
    }
    .content_box {
      flex-direction: column;
    }
    .el-dialog__body {
      padding: 0;
    }
    .el-checkbox__label {
      font-size: 12px;
    }
    label {
      display: inline-block;
      max-width: 100%;
      margin-bottom: 5px;
      font-weight: 700;
    }
    .newOptometry {
      padding: 0;
      font-size: 12px;
      .newOptometryPhone {
        padding: 10px 10px;
        overflow: hidden;
        line-height: 29px;
        margin: 0 10px 12px 20px;
        border-bottom: 1px dashed #dddddd;
        .el-form-item {
          float: left;
          margin: 0;
          height: 40px;
          line-height: 40px;
          font-size: 12px;
          .el-form-item__label {
            margin-right: 10px;
            width: auto !important;
          }
          .el-form-item__content {
            margin-left: 0 !important;
            float: left;
            margin-right: 20px;
            .el-input {
              width: 100px;
            }
          }
        }
        .complainsMemberInfo {
          overflow: hidden;
          .cmInfoItem {
            float: left;
            font-size: 12px;
            color: #666666;
            margin-right: 10px;
            label {
              float: left;
              margin-right: 10px;
            }
            p {
              float: left;
              &:nth-of-type(2) {
                margin-left: 10px;
              }
            }
          }
        }
        label {
          margin-right: 10px;
        }
        span, label {
          float: left;
        }
        label {
          margin: 0;
          &:not(:nth-of-type(1)) {
            margin-left: 30px;
          }
        }
        .nopText {
          float: left;
          color: #333333;
          margin-left: 5px;
          font-size: 12px;
          line-height: 40px;
        }
      }
      .optometryMemo {
        padding: 15px;
        background: #fff;
        overflow: hidden;
        border-top: 1px solid #CCCCCC;
        li {
          width: 100%;
        }
        li:first-child {
          font-size: 12px;
          color: #666666;
          margin-top: 2px;
        }
      }
    }
    .grayTable {
      .el-table__body-wrapper {
        max-height: 120px;
        overflow-y: auto;
      }
      .el-table--small td, .el-table--small th {
        padding: 4px 0;
      }
      .el-table--small th {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        background: transparent !important;
        &:first-child {
          padding-left: 30px;
        }
      }
      .el-table--small td {
        background: #F8F8F8 !important;
        &:first-child {
          padding-left: 30px;
        }
      }
    }
    .whiteTable {
      margin: 0 30px;
      min-height: 300px;
      .el-table--small td, .el-table--small th {
        padding: 4px 0;
        background: #fff !important;
      }
      .el-table--small th {
        border-bottom: 1px solid #ccc;
      }
    }
    .labelInput {
      float: left;
      line-height: 32px;
      label {
        min-width: 50px;
        float: left;
      }
      .el-textarea {
        width: calc(100% - 100px);
        float: left;
      }
      .el-input {
        width: 110px;;
        padding: 0;
      }
    }
    .complaintsType {
      margin: 10px 20px;
      .grayTable {
        border: 1px solid #ddd;
        margin-left: 0 !important;
        tr th {
          background-color: transparent !important;
        }
      }
      h5 {
        font-size: 12px;
        color: #666666;
        margin: 10px 0;
        text-align: left;
      }
      .ctBox {
        overflow: hidden;
        .ctLeft {
          width: 120px;
          float: left;
          .ctGroup {
            text-align: center;
            width: 120px;
            height: 30px;
            line-height: 30px;
            margin-bottom: 10px;
            p {
              font-size: 14px;
              color: #999999;
              font-weight: bold;
            }
          }
        }
        .ctRight {
          width: calc(100% - 120px);
          float: left;
          .ctGroup {
            text-align: center;
            float: left;
            margin-right: 10px;
            margin-bottom: 10px;
            .ctButton {
              width: 120px;
              height: 30px;
              line-height: 30px;
              background: #FFFFFF;
              border: 1px solid #E1E1E1;
              border-radius: 4px;
            }
          }
        }
      }
      .labelInput {
        height: auto;
      }
    }

    .wid80 {
      width: 80px !important;
    }

    .over_scroll {
      overflow: auto;
    }

    .packageDetailButtonGroup {
      padding: 20px 10px;
      background: #EEEEEE;
      text-align: right;
      button {
        border-radius: 4px;
        width: 90px;
        &:first-child {

        }
        &:last-child {
          background: #00AFE4;
          border: none;
          margin-right: 20px;
        }
      }
    }
  }
</style>
