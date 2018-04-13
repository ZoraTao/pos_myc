<template>
  <div class="modalContent cashier-modal">
    <!--body-top-->
    <div class="clearfix modal-content-top">
      <div class="fn-left height30">零售单号: {{datas.orderId}}</div>
      <div class="fn-right fn-clear">
        <span class="fn-left height30">收银日期：</span>
        <div class="sale-date fn-left w120">{{(datas.createTime).substring(0,10)}}</div>
      </div>
    </div>
    <!--body-content-->
    <div class="clearfix modal-content-center">
      <div class="fn-left modal-content-left">
        <table  class="table table-hover w100">
          <tr>
            <th>&nbsp;</th>
            <th>结算方式</th>
            <th>金额</th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
          </tr>
          <tr v-for="(item,index) in itemSource" :key="item.use">
            <td>{{index+1}}</td>
            <td>{{item.type}}</td>
            <td>
              <el-input type="text"  v-model="item.money" @change="computedMoney();"   class="payType"  style="width: 100px;"></el-input>
            </td>
            <td v-if="item.type=='代价券'">
              <a v-if="acPrice=='0'" href="javascript:;">扫一扫</a>
              <div v-else>
                <span class="am-ft-gray9">DJQ12340001</span>
                <span class="am-ft-orange">（300元）</span>
              </div>
            </td>
            <td v-else-if="item.type=='积分抵现'">
              <span class="am-ft-gray9">(积分余额<i class="am-ft-orange">1000</i>)</span>
            </td>
            <td v-else>&nbsp;</td>
            <td>
              <a href="javascript:;" class="del-line am-ft-18" @click="closeBilling(item,index);computedMoney();"><i class="el-icon-close am-ft-gray9"></i></a>
            </td>
          </tr>
        </table>
      </div>
      <div class="fn-left modal-content-right">
        <el-button v-for="(item,index) in itemData" :key="item.id" @click="addBilling(item,index)">{{item.type}} <i class="el-icon-check mgl10"></i>
        </el-button>
      </div>
    </div>
    <div class="model-bottom mgt15">
      <div class="">
        <span class="am-ft-gray6">应收：</span>
        <span class="am-ft-20 am-ft-orange">{{parseFloat(datas.moneyAmount).toFixed(2)-parseFloat(datas.moneyPaid).toFixed(2)}}</span>
      </div>
      <div class="">
        <span class="am-ft-gray6">已收：</span>
        <span class="am-ft-20 am-ft-black ">{{received}}</span>
      </div>
      <div class="" v-show="(received-(parseFloat(datas.moneyAmount).toFixed(2)-parseFloat(datas.moneyPaid).toFixed(2)))>0">
        <span class="am-ft-gray6">找零：</span>
        <span class="am-ft-20 am-ft-green ">{{(received-(parseFloat(datas.moneyAmount)-parseFloat(datas.moneyPaid))).toFixed(2)}}</span>
      </div>
      <div class="" v-show="(received-(parseFloat(datas.moneyAmount).toFixed(2)-parseFloat(datas.moneyPaid).toFixed(2)))<0">
        <span class="am-ft-gray6">差额：</span>
        <span class="am-ft-20 am-ft-green "  >{{(parseFloat(datas.moneyAmount).toFixed(2)-parseFloat(datas.moneyPaid).toFixed(2)-parseFloat(received)).toFixed(2)}}</span>
      </div>
      <el-button type="primary" class="makeCashier" @click="payMoneyToServer">确定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CashierModal',
    data() {
      return {
        acPrice: '0',
        AmountOfMoney:[],//列表输入的金额
        received:0,//已收
        giveChangeMoney:0,//找零
        payContent:[],
        itemData: 
        [
          {
            id: '1',
            type: '现金',
            active: true,
            name:'cash',
            num:0,
            money:''
          },
          {
            id: '2',
            type: '会员卡',
            active: true,
            name:'member',
            num:0,
            money:''
          },
          {
            id: '3',
            type: '信用卡',
            active: true,
            name:'credit',
            num:0,
            money:''
          },
          {
            id: '4',
            type: '支付宝',
            active: true,
            name:'alipay',
            num:0,
            money:''
          },
          {
            id: '5',
            type: '微信',
            active: true,
            name:'weChatPay',
            num:0,
            money:''
          },
          {
            id: '6',
            type: '银行卡',
            active: true,
            name:'bank',
            num:0,
            money:''
          },
          {
            id: '7',
            type: '代价券',
            name:'conpon',
            num:0,
            money:''
          },
          {
            id: '8',
            type: '积分抵现',
            name:'integral',
            num:0,
            money:''
          }
        ],
        itemSource: [],
      }
    },
    props:{
      datas:{
        type:Object,
      },
      status:{
        type:Number
      }
    },
    methods:{
      //添加结算方式
      addBilling(i,index) {
        var that = this;
        // that.itemSource.forEach(function(element) {
        //   if(element.id != i.id){
            that.itemSource.push({
              money: i.money,
              id: i.id,
              type: i.type,
              name: i.name,
              num:i.num,
            });
        // };
      // })
    },
      //删除结算方式
      closeBilling(i,index) {
        this.itemSource.splice(index,1);
        this.AmountOfMoney.splice(index,1);
      },
      computedMoney(){
        let money = 0;
        let _this = this;
       for(let i=0;i<_this.itemSource.length;i++){
         if(typeof parseFloat(_this.itemSource[i].money) == 'number'){
           if(!isNaN(parseFloat(_this.itemSource[i].money))){
              money+=parseFloat(_this.itemSource[i].money);
           }
         }
       }
       _this.received = money;
      },
      //结算
      payMoneyToServer(){
        let _this = this;
        console.log(_this.itemSource)
        let payMessage = [];
        for(let i=0;i<_this.itemSource.length;i++){
          let obj = new Object();
          obj.orderTypeId = _this.itemSource[i].id;
          obj.name = _this.itemSource[i].type;
          obj.amount =  _this.itemSource[i].money;
          payMessage.push(obj)
        }
        console.log(payMessage);
        _this.$axios({
          url:'http://myc.qineasy.cn/pos-api/orderTemp/updateCashierStatus',
          method:'post',
          params:{
            jsonObject:{
              orderId:this.datas.orderId,
              paymentFlowList:payMessage
            },
            keyParams:{
              weChat: true,
              userId: '8888',
              orgId: '11387'
            }
          }
        })
        .then((res)=>{
          console.log(res)
          if(res.data.code==1){
                    _this.$message({
                        showClose: true,
                        message: '收款成功!',
                        type: 'success'
                    })   
                    _this.$emit('closePayMoney',)
          }else{
                    _this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'error'
                    })              
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    },
    watch:{
      AmountOfMoney(newValue,oldValue){
        // console.log(newValue,oldValue)
      }
    },
    mounted(){
  }
  }
</script>

<style scoped lang="scss">
  @import "../../../../reset";
  /*modal*/
  table td,
  table th {
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
  }

  .w100 {
    width: 100%;
  }

  .w120 {
    width: 120px;
  }

  .modalContent {
    padding: 0 20px;
  }

  .modal-dialog {
    margin-top: 60px !important;
  }

  .modal-content-top {
    padding: 5px;
  }

  .modal-content-center {
    background: #FBFBFB;
    border: 1px solid #E1E1E1;
    margin: 5px;
  }

  .modal-content-left {
    width: 74%;
    max-height: 320px;
    overflow-y: auto;
    padding-bottom: 10px;
    &::-webkit-scrollbar{
      width: 8px;
      height: 6px;
    }
    &::-webkit-scrollbar-track{
      background: #d4d2d2;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb{
      background: #999999;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-corner{
      background: #E6E6E6;
    }
  }

  .modal-content-right > .el-button {
    width: 120px;
    margin-bottom: 10px;
    margin-left: 10px;
    &:focus, &:active {
      background: #00AFE4;
      color: #ffffff;
      border-color: #00AFE4;
    }
  }

  .sale-date {
    background: #F8F8F8;
    border: 1px solid #E1E1E1;
    display: inline;
    padding: 3px 10px;
  }

  .modal-content-right {
    background: #FFFFFF;
    width: 26%;
    text-align: center;
    max-height: 346px;
    border-left: 1px solid #E1E1E1;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: auto;
    &::-webkit-scrollbar{
      width: 8px;
      height: 6px;
    }
    &::-webkit-scrollbar-track{
      background: #d4d2d2;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-thumb{
      background: #999999;
      border-radius: 4px;
    }
    &::-webkit-scrollbar-corner{
      background: #E6E6E6;
    }
  }

  .modal-content-left table tr th {
    text-align: center;
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: 12px;
    color: #666666;
    border: none;
  }

  .modal-content-left table tr {
    td {
      border: none;
      line-height: 30px;
      padding-bottom: 0;
      padding-top: 5px;
    }
    &:hover {
      td {
        background-color: #EDF6F9;
      }
    }
  }

  .modal-content-left table tr td input {
    background: #F8F8F8;
    border: 1px solid #E1E1E1;
    font-size: 20px;
    color: #333333;
    width: 100px;
    height: 28px;
    padding: 5px;
    text-align: right;
  }

  .modal-content-left table tr td input:focus {
    border: 1px solid #00AFE4;
  }

  .modal-content-left table tr td:nth-child(1) {
    font-size: 12px;
    color: #333333;
    padding-right: 0;
  }

  .modal-content-left table tr td:nth-child(2) {
    font-size: 13px;
    color: #333333;
  }

  .modal-content-left table tr td:nth-child(4) {
    text-align: left;
    padding-left: 0;
  }

  .modal-content-left table tr td:nth-child(5) {
    padding-left: 0;
  }

  .table-hover > tbody > tr:hover {
    background: #EDF6F9;
  }

  .model-bottom {
    border-top: none;
    background: #F1F1F1;
    width: 100%;
    height: 80px;
    line-height: 35px;
    padding: 20px 10px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    /*border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;*/
  }

  .model-bottom > div {
    float: left;
    width: 25%;
    text-align: center;
    font-weight: bolder;
    font-size: 14px;
  }

  .model-bottom > div:nth-child(4) {
    text-align: right;
  }

  .model-bottom > div:nth-child(4) button {
    font-size: 20px;
    color: #FFFFFF;
    background: #00AFE4;
    border-radius: 4px;
    border: none;
    padding: 5px 25px;
  }

  .height30 {
    line-height: 30px;
  }
</style>

<style lang="scss">
  .cashier-modal {
    padding: 0 !important;
    .modal-content-top {
      padding: 15px 20px;
    }
    .modal-content-center {
      margin: 0 20px;
    }
    .el-input__inner {
      font-size: 20px;
      color: #333333;
      text-align: right;
    }
    .del-line:hover {
      i {
        color: #EF6161 !important;
      }
    }
    .makeCashier{
      float: right;
      margin-right: 25px;
      width: 100px;
      height: 40px;
      font-size: 20px;
    }
  }
</style>
