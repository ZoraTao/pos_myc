<template>
  <div id="newOptometry" class="newOptometry">
    <div class="textCenter newOptometryBody">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <!--top-->
        <div class="newOptometryPhone">
          <el-form-item label="投诉人联系手机号:" prop="complaintTelphone">
            <el-input v-model="ruleForm.complaintTelphone" style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="零售单号:" prop="name" class="fn-right">
            <el-select v-model="ruleForm.orderId" placeholder="请选择" @change="getOderPro">
              <el-option
                v-for="item in telList"
                :key="item.orderId"
                :label="item.orderId"
                :value="item.orderId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="fn-right" label="会员手机号:" prop="telphone">
            <el-input v-model="ruleForm.telphone" style="width: 120px;" @change="getOderList"></el-input>
          </el-form-item>
        </div>
        <!--商品信息-->
        <div class="grayTable">
          <el-table
            :data="proList"
            size="small"
            height="136"
            style="width: 100%">
            <el-table-column
              prop="itemName"
              label="商品名称"
              width="300">
            </el-table-column>
            <el-table-column
              prop="quantity"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="listPrice"
              label="原单价">
            </el-table-column>
            <el-table-column
              prop="discountRate"
              label="折扣">
            </el-table-column>
            <el-table-column
              prop="price"
              label="实售单价">
            </el-table-column>
          </el-table>
        </div>
        <!--投诉信息-->
        <div class="complaintsType">
          <h5>投诉信息：</h5>
          <div class="grayTable">
            <template>
              <el-table
                :data="tableData"
                height="265"
                style="width: 100%">
                <el-table-column
                  label="投诉大类"
                  align="left">
                  <template slot-scope="scope">
                    <el-select v-model="tableData[scope.$index].category" placeholder="请选择" style="width: 100px;">
                      <el-option
                        v-for="(n,index) in categoryList"
                        :label="n.name"
                        :key="n.key"
                        :value="n.key">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="投诉小类">
                  <template slot-scope="scope">
                    <el-select v-model="tableData[scope.$index].subCategory" placeholder="请选择" style="width: 100px;">
                      <template v-if="tableData[scope.$index].category=='0'">
                        <el-option
                          v-for="(n,index) in innerKey"
                          :label="n.name"
                          :key="n.key"
                          :value="n.key">
                        </el-option>
                      </template>
                      <template v-if="tableData[scope.$index].category=='1'">
                        <el-option
                          v-for="(n,index) in innerKey2"
                          :label="n.name"
                          :key="n.name"
                          :value="n.name">
                        </el-option>
                      </template>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="负责人">
                  <template slot-scope="scope">
                    <el-select v-model="tableData[scope.$index].liableNameId" filterable placeholder="请选择" style="width: 110px;">
                      <el-option
                        v-for="item in memberList"
                        :key="item.userId"
                        :label="item.userName"
                        :value="item.userId">
                      </el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="原因">
                  <template slot-scope="scope">
                    <el-select v-model="tableData[scope.$index].reason" placeholder="请选择" style="width: 100px;">
                      <template v-if="tableData[scope.$index].category=='0'">
                        <el-option
                          v-for="(n,index) in innerKey"
                          :label="n.name"
                          :key="n.key"
                          :value="n.key">
                        </el-option>
                      </template>
                      <template v-if="tableData[scope.$index].category=='1'">
                        <el-option
                          v-for="(n,index) in innerKey2"
                          :label="n.name"
                          :key="n.key"
                          :value="n.key">
                        </el-option>
                      </template>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="处理意见"
                  width="280">
                  <template slot-scope="scope">
                    <el-input v-model="tableData[scope.$index].opinion" placeholder="请输入" style="width: 100%;"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                    <a href="javascript:;" class="am-ft-gray9" @click.prevent="deleteRow(scope.$index, tableData)">删除</a>
                  </template>
                </el-table-column>
              </el-table>
            </template>
            <el-button type="primary" plain class="mgt10 mgb10 mgl10" @click="addRow()">+ 增行</el-button>
          </div>
        </div>
        <ul class="optometryMemo">
          <li class="fn-left">
            <div class="labelInput">
              <label class="mgr10">接待人员：</label>
              <el-select style="width:120px" filterable v-model="ruleForm.deskClerkId" placeholder="请选择">
                <el-option
                  v-for="item in memberList"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </div>
            <div class="labelInput mgl30">
              <label class="mgr10">投诉日期 :</label>
              <el-date-picker type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-model="ruleForm.complaintTime"
                              style="width: 127px;"></el-date-picker>
            </div>
            <div class="labelInput mgl30">
              <label class="mgr10">投诉类型：</label>
              <el-select v-model="ruleForm.type" placeholder="请选择">
                <el-option label="上门投诉" value="0"></el-option>
                <el-option label="电话投诉" value="1"></el-option>
              </el-select>
            </div>
          </li>
          <li class="fn-left">
            <div class="labelInput w100">
              <label class="mgr10">投诉说明：</label>
              <el-input
                type="textarea"
                :rows="2"
                v-model="ruleForm.memo">
              </el-input>
            </div>
          </li>
        </ul>
      </el-form>
    </div>
    <div class="packageDetailButtonGroup">
      <el-button @click="cancelDialog">取消</el-button>
      <el-button type="primary" @click="addComplain('ruleForm')">保存</el-button>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'NewComplaintsModal',
    data() {
      return {
        orgId: '',
        userId: '',
        telList: [],//零售单
        memberList: [],//接待人员
        dialogStatus: false,
        categoryList: [//投诉大类
          {
            key: '0',
            name: '服务投诉'
          },
          {
            key: '1',
            name: '质量问题投诉',
          },
        ],
        innerKey: [//投诉小类
          { key: '0',name: '本店环境'},
          { key: '1',name: '接待人员'},
          { key: '2', name: '验光人员' },
          { key: '3',name: '收银人员'},
          { key: '4',name: '佩戴人员'},
        ],
        innerKey2: [
          { key: '5',name: '顾客问题'},
          { key: '6',name: '装配问题'},
          { key: '7',name: '验光问题'},
          { key: '8',name: '产品质量'}
        ],
        ruleForm: {
          complaintTelphone: '',//投诉人手机号
          telphone: '',//会员手机号
          orderId: '',//零售单号
          deskClerkId: '',//接待人员id
          complaintTime: '',//投诉日期
          type: '',//投诉类型
          memo: '',//投诉说明
          complaintCategoryList: [
            {
              category: '',//投诉大类
              subCategory: '',//投诉小类
              liableNameId: '',//负责人id
              reason: '',//原因
              opinion: '',//处理意见
            }
          ],
        },
        rules: {
          complaintTelphone: [
            {required: true, message: '请输入正确手机号', trigger: 'blur'}
          ],
          telphone: [
            {required: true, message: '请输入正确手机号', trigger: 'blur'}
          ]
        },
        proList: [],//商品列表
        tableData: [{}],//投诉信息
      }
    },
    props:[''],
    created(){
      this.getReceptList();
    },
    methods: {
      //回访信息--增行
      addRow() {
        const that = this;
        const len = that.tableData.length;
        that.$set(that.tableData,len,{
          category: '',//投诉大类
          subCategory: '',//投诉小类
          liableNameId: '',//负责人id
          reason: '',//原因
          opinion: '',//处理意见
        })
      },
      //删除回访信息
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      //根据会员手机号查询零售单号
      getOderList(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/member-api/member/getMemberListByTel',
          method: 'post',
          params: {
            jsonObject: {
              telphone: that.ruleForm.telphone
            },
            keyParams: {
              weChat: true
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
              that.telList = response.data.data.list;
              if(that.telList.length > 0){
                that.ruleForm.orderId = that.telList[0].orderId;
                that.getOderPro();
              }
              // console.info(that.telList)
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
      //根据单号查商品信息
      getOderPro(){
        var that = this;
        // console.info(that.ruleForm.orderId)
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/orderItems/getOrderItemsList',
          method: 'post',
          params: {
            jsonObject: {
              orderId: that.ruleForm.orderId
            },
            keyParams: {
              weChat: true
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
              that.proList = response.data.data.orderItemsList;
              // console.info(response.data.data)
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
      //新增投诉
      addComplain(formName){
        const that = this;
        const ueserInfo = JSON.parse(sessionStorage.getItem("userData"));
        that.orgId = ueserInfo.orgId;
        that.userId = ueserInfo.userId;
        that.ruleForm.complaintCategoryList = that.tableData;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            // console.info(that.ruleForm)
            that.$axios({
              url: 'http://myc.qineasy.cn/member-api/memberComplaint/addMemberComplaint',
              method: 'post',
              params: {
                jsonObject: that.ruleForm,
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
                  console.info(response.data.data)
                  that.$message({
                    showClose: true,
                    message: '新增成功！',
                    type: 'success'
                  });
                  that.dialogStatus = false;
                  that.$emit('dialogNewComp',that.dialogStatus)
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
          }else {
            that.$message({
              showClose: true,
              message: '请完整填写信息！',
              type: 'error'
            })
            return false;
          }
        })
      },
      //关闭弹窗
      cancelDialog(){
        const that = this;
        that.dialogStatus = false;
        that.$emit('dialogNewComp',that.dialogStatus)
      },
      //获取负责人、接待人员列表
      getReceptList(){
        const that = this;
        const ueserInfo = JSON.parse(sessionStorage.getItem("userData"));
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
            if(response.data.code != '1'){
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            }else {
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
      padding: 10px 15px;
      overflow: hidden;
      line-height: 29px;
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
            min-width: 100px;
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
      padding: 14px 15px 10px;
      background: #f8f8f8;
      overflow: hidden;
      li {
        width: 100%;
      }
      li:first-child {
        font-size: 12px;
        color: #666666;
        margin-top: 2px;
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
  }

  .grayTable {
    margin: 0 20px;
    border: 1px solid #ddd;
    border-top: 0;
    border-bottom: 0;
    .el-table--small td, .el-table--small th {
      padding: 4px 0;
    }
    .el-table--small th {
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      background: transparent !important;
    }
    .el-table--small td {
      background: #F8F8F8 !important;
    }
  }

  .whiteTable {
    margin: 0 30px;
    border-top: 6px solid #F4F4F4;
    .el-table--small td, .el-table--small th {
      padding: 4px 0;
      background: #fff !important;
    }
    .el-table--small th {
      border-bottom: 1px solid #ccc;
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
      margin: 10px;
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
        }
      }
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
</style>
