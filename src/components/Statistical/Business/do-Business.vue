<template>
  <div class="content-out-wrapper stocks-content">
    <!--top-->
    <el-row class="inquiry-row mgt6" >
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
      <el-col :span="4" :offset="10">
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
          <el-table class="contentTable" :span="24"
            :data="tableData"
            stripe
            size="small"
            align="left"
            max-height="400"
            style="width: 100%">
            <el-table-column
              prop="num"
              label="零售单号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="sale"
              width="100"
              label="应收金额">
            </el-table-column>
            <el-table-column
              prop="Preferential"
              width="100"
              label="优惠金额">
            </el-table-column>
            <el-table-column
              prop="Realsale"
              width="100"
              label="实售金额">
            </el-table-column>
            <el-table-column
              prop="Collect"
              width="100"
              label="预收金额">
            </el-table-column>
            <el-table-column
              prop="Arrears"
              width="100"
              label="欠款金额">
            </el-table-column>
            <el-table-column
              prop="saleTitle"
              label="销售备注">
            </el-table-column>
            <el-table-column
              prop="salePeople"
              width="180"
              label="销售员工">
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
       startTime:"",
       endTime:"",
       tableData: [{
          num: 'R00032017124232',//零售单号
          sale: '44.5',//应收金额
          Preferential: '100',//优惠金额
          Realsale: '2523',//实售金额，
          Collect:'2312',//预收金额
          Arrears:'43',//欠款金额
          saleTitle:'备注内容备注内容备注内容',//销售备注
          salePeople:'P姥爷'//销售员工
        },
        {
          num: 'R00032017124232',//零售单号
          sale: '44.5',//应收金额
          Preferential: '100',//优惠金额
          Realsale: '2523',//实售金额，
          Collect:'2312',//预收金额
          Arrears:'43',//欠款金额
          saleTitle:'备注内容备注内容备注内容',//销售备注
          salePeople:'P姥爷'//销售员工
        }, ]
      }
    },
    methods: {
      costom(){
        return {height:'40px'}
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";
  
  .inquiry-row{
    height: 70px;
  }
  .el-button{
    margin-left: 10px;
    border: 1px solid #00AFE4;
    border-radius: 4px;
    font-family: MicrosoftYaHei;
    font-weight: 300;
    font-size: 12px;
    color: #00AFE4;
    letter-spacing: 0;
  }
  .el-main{
    background: $white;
    margin-top: 10px;
    h4{
      display: block;
      text-align: center;
      font-family: MicrosoftYaHei-Bold;
      font-size: 20px;
      margin-top: -6px;
      color: #555555;
      letter-spacing: 0;
    }
    .company{
      font-family: MicrosoftYaHei;
      font-size: 13px;
      color: #333333;
      letter-spacing: 0;
    }
    .setdate{
      font-family: MicrosoftYaHei;
      font-size: 13px;
      color: #333333;
      letter-spacing: 0;
    }
    .el-row{
      padding-bottom: 5px;
    }
  }
</style>
<style>
.el-input--suffix .el-input__inner{
 background-color:#F8F8F8;
 padding-right: 0;
 border-radius: 1px;
 border:1px solid #E1E1E1;
}
 .el-table__row{
      height: 40px;
    }
</style>
