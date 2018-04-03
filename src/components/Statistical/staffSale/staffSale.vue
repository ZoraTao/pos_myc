<template>
  <div class="content-out-wrapper stocks-content">
    <!--top-->
    <el-row class="inquiry-row mgt6" >
      <el-col :span="4">
        经办公司:
           <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
      </el-col>
      <el-col :span="4">
        收银员:
          <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
      </el-col>
      <el-col :span="10">
        销售日期:
              <el-date-picker 
              type="date" 
              placeholder="选择日期" 
              v-model="startTime" 
              clear-icon="el-icon-circle-close"
              value-format="yyyy-MM-dd"
              style="width: 120px;"></el-date-picker>
            &nbsp;-&nbsp;
              <el-date-picker 
              type="date" 
              placeholder="选择日期" 
              v-model="endTime"
              value-format="yyyy-MM-dd"
              style="width: 120px;"></el-date-picker>
              <el-button plain>查询</el-button>
      </el-col>
      <el-col :span="4" :offset="2">
              <el-button plain>打印</el-button>
              <el-button plain>导出</el-button>
      </el-col>
      
    </el-row>

      <el-main>
          <h4>营业日报表</h4>
          <el-row>
              <el-col :span="4">
                <div class="grid-content bg-purple company">
                经办公司:湖宾店
                </div>
              </el-col>
              <el-col :offset="15" :span="5">
                <div class="grid-content bg-purple setdate" v-show="startTime != '' & endTime != ''">
                  销售日期：{{startTime}}至{{endTime}}
                </div>
              </el-col>
          </el-row>
              <el-table
                  :data="tableData3"
                  stripe
                  size="small"
                  class="table-hover"
                  align="left"
                  :border=false
                  :show-summary=true
                  max-height="400"
                  style="width: 100%">
                  <el-table-column
                    prop="date"
                    label="零售时间"
                    width="105">
                  </el-table-column>
                  <el-table-column label="销售统计">
                    <el-table-column
                      prop="name"
                      label="销售金额"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="实退金额"
                      width="90">
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="实售金额"
                      width="90">
                    </el-table-column>
                  </el-table-column>
                  <el-table-column label="欠还款统计">
                      <el-table-column
                        prop="province"
                        label="欠款金额"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="city"
                        label="实退金额"
                        width="90">
                      </el-table-column>
                    </el-table-column>
                     <el-table-column label="收银方式">
                      <el-table-column
                        prop="province"
                        label="商场支付"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="city"
                        label="市名卡"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="province"
                        label="现金"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="city"
                        label="会员卡"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="province"
                        label="信用卡"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="city"
                        label="支付宝"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="province"
                        label="微信"
                        width="90">
                      </el-table-column>
                      <el-table-column
                        prop="city"
                        label="银行卡"
                        width="90">
                      </el-table-column>
                       <el-table-column
                        prop="city"
                        label="代金券"
                        width="90">
                      </el-table-column>
                    </el-table-column>
                </el-table>
          
      </el-main>     
     <el-pagination
        background
        class="am-ft-right mgt10"
        layout="total, prev, pager, next"
        :total="10">
      </el-pagination>
  </div>
</template>

<script>
export default {
  name: "do-business",
  data() {
    return {
      startTime: "",
      endTime: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      tableData3: [
        {
          date: "2016-05-03",
          name: "188342.66",
          province: "48209.10",
          city: "23789.11",
          address: "48209.10",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "188342.66",
          province: "48209.10",
          city: "23789.11",
          address: "48209.10",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "188342.66",
          province: "48209.10",
          city: "23789.11",
          address: "48209.10",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "188342.66",
          province: "48209.10",
          city: "23789.11",
          address: "48209.10",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "188342.66",
          province: "48209.10",
          city: "23789.11",
          address: "48209.10",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "188342.66",
          province: "48209.10",
          city: "23789.11",
          address: "48209.10",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "188342.66",
          province: "48209.10",
          city: "23789.11",
          address: "48209.10",
          zip: 200333
        }
      ],
    };
  },
  methods: {
    costom() {
      return { height: "40px" };
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../MemberManage/MemberInquiry/member-public-css";

.inquiry-row {
  height: 70px;
}
.el-button {
  margin-left: 10px;
  border: 1px solid #00afe4;
  border-radius: 4px;
  font-family: MicrosoftYaHei;
  font-weight: 300;
  font-size: 12px;
  color: #00afe4;
  letter-spacing: 0;
}
.el-main {
  background: $white;
  margin-top: 10px;
  h4 {
    display: block;
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    font-size: 20px;
    margin-top: -6px;
    color: #555555;
    letter-spacing: 0;
  }
  .company {
    font-family: MicrosoftYaHei;
    font-size: 13px;
    color: #333333;
    letter-spacing: 0;
  }
  .setdate {
    font-family: MicrosoftYaHei;
    font-size: 13px;
    color: #333333;
    letter-spacing: 0;
  }
  .el-row {
    padding-bottom: 5px;
  }
}
</style>
<style>
.el-input--suffix .el-input__inner {
  background-color: #f8f8f8;
  padding-right: 0;
  border-radius: 1px;
  border: 1px solid #e1e1e1;
}
.el-table__row {
  height: 40px;
}
/* .el-table tr:hover {
  background-color: red !important;
} */
.cell{
  text-align: center;
}
</style>
