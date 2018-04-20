<template>
  <div id="newOptometry" class="newOptometry">
    <div class="textCenter newOptometryBody">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <!--top-->
        <div class="newOptometryPhone">
          <el-form-item label="投诉人联系手机号:" prop="name">
            <el-input v-model="ruleForm.name" style="width: 120px;"></el-input>
          </el-form-item>
          <el-form-item label="零售单号:" prop="name" class="fn-right">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="fn-right" label="会员手机号:" prop="name">
            <el-input v-model="ruleForm.name" style="width: 120px;"></el-input>
          </el-form-item>
        </div>
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
                    <el-select v-model="ruleForm.name" placeholder="请选择" style="width: 100px;">
                      <el-option label="服务投诉" value="1"></el-option>
                      <el-option label="质量投诉" value="2"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="投诉小类">
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
                  label="原因">
                  <template slot-scope="scope">
                    <el-select v-model="ruleForm.name" placeholder="请选择" style="width: 100px;">
                      <el-option label="原因内容1" value="1"></el-option>
                      <el-option label="原因内容2" value="2"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  label="处理意见"
                  width="280">
                  <template slot-scope="scope">
                    <el-input v-model="ruleForm.name" placeholder="请输入" style="width: 100%;"></el-input>
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
            <el-button type="primary" plain class="mgt10 mgb10 mgl10">+ 增行</el-button>
          </div>
        </div>
        <ul class="optometryMemo">
          <li class="fn-left">
            <div class="labelInput">
              <label class="mgr10">接待人员：</label>
              <el-select style="width:120px" v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="labelInput mgl30">
              <label class="mgr10">投诉日期 :</label>
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date"
                              style="width: 127px;"></el-date-picker>
            </div>
            <div class="labelInput mgl30">
              <label class="mgr10">投诉类型：</label>
              <el-select v-model="ruleForm.options" placeholder="请选择">
                <el-option label="0" value="0"></el-option>
                <el-option label="1" value="1"></el-option>
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
  </div>
</template>

<script>

  export default {
    name: 'NewComplaintsModal',
    data() {
      return {
        options: [],
        value: '',
        ruleForm: {
          name: '',
          date: '',
          options: [],
          memo: '',
        },
        rules: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'}
          ]
        },
        tabs: [
          {
            name: '1',
            label: '搜索结果'
          },
          {
            name: '2',
            label: '最近验光会员'
          }
        ],
        activeName: '1',
        data: [],
        tableData: [
          {},
          {}
        ],
      }
    },
    methods: {
      //删除回访信息
      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    }
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
            width: 100px;
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
