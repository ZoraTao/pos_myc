<template>
  <div class="preview" v-if="ready">
    <header>
      <div class="header_title">
          <span class="shop">{{users.orgName}}</span>
          <!-- <span>配镜日期：<i>{{orderTemp.singleSupTime}}</i></span> -->
          <!-- <span>取镜日期：<i>{{orderTemp.glassesTime}}</i></span> -->
      </div>
      <div class="header_message">
        <span>姓名：<i>{{member.name}}</i></span>
        <span>性别：<i>{{member.sex=="M"?'男':'女'}}</i></span>
        <span>生日：<i>{{member.birthday}}</i></span>
        <span>手机：<i>{{member.telphone}}</i></span>
        <span>地址：<i>{{member.address}}</i></span>
      </div>
      
    </header>
    <main>
        <div class="tableEyes" >
          <ul class="tableUl">
            <li>处方内容</li>
            <li>LR</li>
            <li>SPH</li>
            <li>CYL</li>
            <li>AX</li>
            <li>DPD</li>
            <li>NPD</li>
            <li>HPD</li>
            <li>ADD</li>
          </ul>
         <div v-for="list in eyes" :key="list.key" class="tableContent" v-show="optometryId">
            <ul>
              <li>
                <ul class="tableContent_ul">
                  <li class="w95 titles"><span>{{list.key=='0'?'近用':'远用'}}</span>&nbsp;</li>
                  <li class="w95">L</li>
                  <li class="w95">{{list.value[0].sph}}</li>
                  <li class="w95">{{list.value[0].cyl}}</li>
                  <li class="w95">{{list.value[0].ax}}</li>
                  <li class="w95">{{list.value[0].dpd}}</li>
                  <li class="w95">{{list.value[0].npd}}</li>
                  <li class="w95">{{list.value[0].hpd}}</li>
                  <!-- <li class="w95 ">{{list.value[0].add}}</li> -->
                </ul>
                <ul class="tableContent_ul">
                  <li class="w95">&nbsp;</li>
                  <li class="w95">R</li>
                  <li class="w95">{{list.value[1].sph}}</li>
                  <li class="w95">{{list.value[1].cyl}}</li>
                  <li class="w95">{{list.value[1].ax}}</li>
                  <li class="w95">{{list.value[1].dpd}}</li>
                  <li class="w95">{{list.value[1].npd}}</li>
                  <li class="w95">{{list.value[1].hpd}}</li>
                  <li class="w95 titles"><em>{{list.value[1].add}}</em></li>
                </ul>
              </li>
            </ul>
         </div>
         <div style="text-align:center;" v-show="!optometryId">暂无数据</div>
        </div>
        <div class="order">
            <span>手工单：<i></i></span>
            <span>验光单:<i>{{optometryId||''}}</i></span>
            <span>卡号：{{member.memberCardId}}<i></i></span>
        </div>
        <div class="tableShop">
          <div class="receiptsSalesTable">
            <el-table
            size="small"
            :data="shop"
            align="center"
            style="width: 100%">
                <el-table-column
                    prop="skuName2"
                    width="500px"
                    label="商品名称">
                </el-table-column>
                <el-table-column
                    prop="nums"
                    align="center"
                    label="数量">
                </el-table-column>
                <el-table-column
                    prop="price"
                    align="center"
                    label="原单价">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="折扣">
                    <template slot-scope="scope">{{(scope.row.discount*10).toFixed(2)}}</template>
                </el-table-column>
                <el-table-column
                    prop="realSale"
                    align="center"
                    label="实售单价">
                </el-table-column>
            </el-table>
        </div>
        </div>
        <div class="memo">销售备注：{{orderTemp.saleMemo||'--'}}</div>
        <div class="memo">验光备注：{{memo||'--'}}</div>
        <div class="memo">加工备注：{{publicSelcet.processMemo||'--'}}</div>
        <div class="money">
            <span class="otherMoney">其他费用：<i>{{otherMoney}}</i></span>
            <span class="otherMoney">配镜金额：<i></i></span>
            <span class="otherMoney">实收金额：<i>{{saleCount}}</i></span>
            <span class="otherMoney">欠款金额：<i>{{saleCount}}</i></span>
        </div>
        <div class="otherMessage">
          <span>验光：桃子</span>
          <span>顾问：湖滨测试账号</span>
          <span>签批：</span>
          <span>收银：</span>
          <span>检验：</span>
          <span>请在30日内开发票</span>
          <span>门店电话：5079334</span>
          <span>生产商：湖滨店</span>
        </div>
        <div class="address">
          <span>生产地址：杭州市上城区南山路新民村3号</span>
          <span>联系电话：0571-2888555</span>
        </div>
    </main>
  </div>
</template>

<script>
import {allDate} from '../../../utils/date.js'
  export default {
    name:'preview',
    data(){
      return{
        orderList:[],
        ready:false,
        eyes:null,
        shop:this.tableData,
        glassesTime:'',
        memo:''
        // singleSupTime:this.
        // glassesTime:this.orderTemp.glassesTime
      }
    },
    props:{
      users:{
        type:Object,
        default:null
      },
      memberInfo:{
        type:Object,
        validator:function(value){
          console.log(value)
        },
        default:{
          name:'匿名会员',
          sex:'',
          birthday:'',
          telphone:'',
          address:'',
          memberCardId:'',
          member:this.memberInfo
        },
      },
      tableData:{
        type:Array,
        default:[]
      },
      saleCount:{
        type:[String,Number],
        default:'',
      },
      otherMoney:{
        type:[String,Number],
        default:'',
      },
      optometryId:{
        type:[String,Number],
        default:null
      },
      publicSelcet:{
        type:Object,
        default:null,
      },
      orderTemp:{
        type:Object,
        default:null,
      }
    },
    methods:{
      handleEyesFn(data){
        let eyes = [];
        for(var i=0;i<data.length;i++){
          if(data[i].key == '0' || data[i].key == '1'){
            if(data[i].value[0].sph != ''&&data[i].value[1].sph != ''){
              eyes.push(data[i]);
            }
          }
        }
        this.eyes = eyes;
      },
        handleEyes(data){
          if(!data){
            this.ready = true;
              return
          }
          console.log(data)
          const _this = this;
          _this.$myAjax({
            url:'pos-api/prescriptions/getPrescriptions',
            data:{
              prescriptionId: data
            },
            success:function(res){
              if(res.code == 1){
                _this.memo = res.data.prescriptions.memo;
                 _this.handleEyesFn(res.data.eyes);
                  _this.ready = true;
              }else{
                _this.$message({
                  type:'warning',
                  message:res.msg,
                  showClose:true})
               }
            },error:function(err){
               console.error(err);
               _this.$message({
                type:'error',
                 message:err,
                showClose:true
              })
            }
          });
          
        },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % 2 === 0) {
            return {
              rowspan: 2,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
    },
    created(){
      // console.log(this.includeOptometryData)
      this.handleEyes(this.optometryId)
      console.log(this.tableData)
      
      if(this.memberInfo == null){
        this.member={
          name:'匿名会员',
          sex:'',
          birthday:'',
          telphone:'',
          address:'',
          memberCardId:'',
        }
      }
    }
  }
</script>

<style scoped lang="scss">
@import '../../../reset.scss';
.preview{
  overflow: hidden;
}
header{
  overflow: hidden;
  width: 96%;
  margin: 20px auto 0 ;
  .header_title{
      overflow: hidden;
      .shop{
        float: left;
        width: 30%;
        text-align: left;
        font-size: 24px;
        color: #333;
        font-weight: 400;
      }
      span{
            width: 20%;
            float: left;
            text-align: center;
            line-height: 30px;
          font-size: 12px;
      }
  }
  .header_message{
    span{
      float: left;
      margin-right: 40px;
      text-align: center;
      line-height: 30px;
      font-size: 12px;
    }
  }
}
main{
  overflow: hidden;
  width: 96%;
  font-size: 12px;
  color: #606266;
  margin: 10px auto 0 ;
  .memo{
      height: 30px;
      line-height: 30px;
      border-bottom: 1px solid #aaa;
  }
  .money{
    padding-top: 5px;
    border-bottom: 1px solid #aaa;
    span{
      margin-right: 30px;
      i{
        font-size: 16px;
        color: #111;
        font-weight: 500;
      }
    }
  }
  .otherMessage,.address{
    span{
      margin-right: 20px;
    }
  }
  .order{
    span{
      margin-right: 40px;
    }
  }
  .tableEyeContent{
    .add{
      float:left;
    }
    .even{
      float:right;
    }
  }
  .tableUl{
    overflow: hidden;
    background-color: rgb(179, 227, 246) !important;
    height: 41px;
    line-height: 41px;
    li{
      width:95px;
      text-align:center;
      float:left;
    }
  }
  .tableContent{
    overflow: hidden;
    .tableContent_ul{
      height: 24px;
      padding:1px 0px;
      li{
        float:left;
        text-align: center;
        height: 24px;
      }
      .w95{
        width: 95px;
      }
      .mg95{
        margin-left:95px;
      }
      .titles{
        position: relative;
        span{
          position: absolute;
          top: 13px;
        }
        em{
          position: absolute;
          top: -13px;
        }
      }
    }
  }
  
}
</style>