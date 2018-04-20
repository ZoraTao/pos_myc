<template>
  <div class="visitBox">
    <el-table
      :data="listData"
      size="small"
      align="left"
      style="width: 100%;margin-bottom:10px;">
      <el-table-column
        prop="a"
        label="会员姓名">
      </el-table-column>
      <el-table-column
        prop="b"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="c"
        label="性别">
      </el-table-column>
      <el-table-column
        prop="d"
        label="年龄">
      </el-table-column>
      <el-table-column
        prop="e"
        label="零售单号">
      </el-table-column>
      <el-table-column
        prop="f"
        label="应回访类型">
      </el-table-column>
      <el-table-column
        prop="g"
        label="应回访方式">
      </el-table-column>
      <el-table-column
        prop="h"
        label="应回访日期">
      </el-table-column>
      <el-table-column
        label="状态">
        <template slot-scope="scope">
          <span class="am-ft-orange">{{scope.row.i}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <span class="am-ft-blue"><a href="javascript:;" @click="openEntryVisit(scope.$index,scope.row)">回访登记</a></span>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class="block mgt10">
      <el-pagination
        class="am-ft-right"
        background
        @current-change="handleCurrentChange"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="listCounts"
        :current-page.sync="nub">
      </el-pagination>
    </div>
    <!--回访登记弹窗-->
    <el-dialog
      title="回访登记_待回访"
      :visible.sync="isShowNewComplaints"
      width="900px">
      <div id="newOptometry" class="newOptometry">
        <div class="textCenter newOptometryBody">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
            <!--top-->
            <div class="newOptometryPhone">
              <div class="complainsMemberInfo">
                <el-row>
                  <el-col :span="24">
                    <div class="cmInfoItem">
                      <label>会员姓名：</label>
                      <p>张三三</p>
                    </div>
                    <div class="cmInfoItem">
                      <label>手机：</label>
                      <p>16601010101</p>
                    </div>
                    <div class="cmInfoItem">
                      <label>性别：</label>
                      <p>男</p>
                    </div>
                    <div class="cmInfoItem">
                      <label>年龄：</label>
                      <p>30</p>
                    </div>
                  </el-col>
                  <el-col :span="24">
                    <div class="cmInfoItem">
                      <label>应回访类型：</label>
                      <p>生日回访</p>
                    </div>
                    <div class="cmInfoItem">
                      <label>应回访方式：</label>
                      <p>电话回访</p>
                    </div>
                    <div class="cmInfoItem">
                      <label>应回访日期：</label>
                      <p>2017-12-06</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>

            <h5 class="complainsNum">零售单号：LSD000000001</h5>
            <!--商品信息-->
            <div class="grayTable">
              <el-table
                :data="data"
                size="small"
                height="136"
                style="width: 100%">
                <el-table-column
                  prop="memberCard"
                  label="商品名称"
                  width="500">
                </el-table-column>
                <el-table-column
                  prop="memberName"
                  label="数量">
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="原单价">
                </el-table-column>
                <el-table-column
                  prop="age"
                  label="折扣">
                </el-table-column>
                <el-table-column
                  prop="sex"
                  label="实售单价">
                </el-table-column>
              </el-table>
            </div>
            <!--回访信息-->
            <div class="complaintsType">
              <h5>回访信息：</h5>
              <div class="grayTable">
                <template>
                  <el-table
                    :data="tableData"
                    height="265"
                    style="width: 100%">
                    <el-table-column
                      label="回访大类"
                      align="left">
                      <template slot-scope="scope">
                        <el-select v-model="ruleForm.name" placeholder="请选择" style="width: 100px;">
                          <el-option label="服务投诉" value="1"></el-option>
                          <el-option label="质量投诉" value="2"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="回访小类">
                      <template slot-scope="scope">
                        <el-select v-model="ruleForm.name" placeholder="请选择" style="width: 100px;">
                          <el-option label="本店环境" value="1"></el-option>
                          <el-option label="佩戴人员" value="2"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="负责人">
                      <template slot-scope="scope">
                        <el-select v-model="ruleForm.name" placeholder="请选择" style="width: 100px;">
                          <el-option label="王大锤" value="1"></el-option>
                          <el-option label="三藏" value="2"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="满意度">
                      <template slot-scope="scope">
                        <el-select v-model="ruleForm.name" placeholder="请选择" style="width: 100px;">
                          <el-option label="原因内容1" value="1"></el-option>
                          <el-option label="原因内容2" value="2"></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="操作">
                      <template slot-scope="scope">
                        <a href="javascript:;" class="am-ft-gray9" @click.prevent="deleteRow(scope.$index,tableData)">删除</a>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
                <el-button type="primary" plain class="mgt10 mgb10 mgl10">+ 增行</el-button>
              </div>
            </div>
            <ul class="optometryMemo">
              <li class="fn-left">
                <div class="labelInput">
                  <label class="mgr10">回访人员：</label>
                  <el-select style="width:120px" v-model="ruleForm.value" placeholder="请选择">
                    <el-option
                      v-for="item in data"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div class="labelInput mgl30">
                  <label class="mgr10">回访日期 :</label>
                  <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date"
                                  style="width: 127px;"></el-date-picker>
                </div>
                <div class="labelInput mgl30">
                  <label class="mgr10">回访方式：</label>
                  <el-select v-model="ruleForm.options" placeholder="请选择">
                    <el-option label="0" value="0"></el-option>
                    <el-option label="1" value="1"></el-option>
                  </el-select>
                </div>
              </li>
              <li class="fn-left">
                <div class="labelInput w100">
                  <label class="mgr10">回访备注：</label>
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
      </div>
      <div class="packageDetailButtonGroup">
        <el-button @click="isShowNewComplaints = false">取消</el-button>
        <el-button type="primary" @click="isShowNewComplaints = false">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "un-visit",
    data() {
      return {
        nub: 0,//起始条数
        size: 10,//每页显示数据条数
        counts: this.listCounts,//总条数
        isShowNewComplaints: false,
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'}
          ]
        },
        name: [],
        data: [],
        tableData: [
          {},
          {}
        ],

      }
    },
    props: ['listData', 'listCounts', 'mypagination'],
    created() {

    },
    methods: {
      //分页
      handleCurrentChange(val) {
        this.nub = (`${val}` - 1) * this.size;
        this.mypagination(this.nub);
      },
      //回访登记
      openEntryVisit(){
        this.isShowNewComplaints = true;
      },
      //删除回访信息
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../reset";

  .visitBox {
    .complainsNum {
      margin-left: 12px;
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
        padding: 10px 15px;
        overflow: hidden;
        line-height: 29px;
        border-bottom: 1px dashed #D6D6D6;
        margin-bottom: 10px;
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
            margin-right: 20px;
            label {
              float: left;
              margin-right: 10px;
              font-weight: normal;
              color: #666666;
            }
            p {
              float: left;
              color: #333333;
              font-weight: bold;
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
      margin: 0 20px;
      border: 1px solid #ddd;
      border-top: 0;
      border-bottom: 0;
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
