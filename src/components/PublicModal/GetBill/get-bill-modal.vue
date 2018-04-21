<template>
<div class="getBillsContent">
    <div class="getBillsItem" v-for="(i,d) in orderTempList" @dblclick="openOrder(i,d)" :key="i.orderNo">
        <div class="memberBillInfo">
            <div><span class="am-ft-14"><b>{{i.name}}</b></span><h5>共{{i.orderItems.length}}件商品 合计: <b class="am-ft-13">{{i.moneyProduct}}</b></h5></div>
            <div><span>{{i.orderNo}}</span><h5>创建人：张三 {{i.orderTime}}</h5></div>
        </div>
        <div class="getBillButton">
            <span @click="openOrder(i,d)">取单</span>
        </div>
    </div>

    <el-pagination
    class="am-ft-right"
    background
    layout="prev, pager, next"
    :page-size="5"
    :current-page.sync="nub"
    @current-change="getOrderList('-1')"
    :total="count">
    </el-pagination>
</div>
</template>

<script>

export default {
  name: 'GetBill',
  data () {
    return {
        orderTempList:null,
        nub :1,
        size:5,
        count:0
    }
  },
  methods:{
      openOrder(data){
        //   console.log(data)
          this.$emit('openOrder',data);
      },
      getOrderList(types){
                let _this = this;
                _this.showGetBill=true;
                _this.$axios({
                    url: "http://myc.qineasy.cn/pos-api/orderTemp/getOrderTempList",
                    method: "post",
                    params: {
                    jsonObject: {
                        nub: _this.nub == 1 ? 0 : (_this.nub - 1) * _this.size,
                        size: _this.size,
                        status: types
                    },
                    keyParams: {
                        weChat: true
                    }
                    }
                })
                .then(function(res) {
                    // console.info(res.data.data)
                    if(res.data.code == 1){
                        _this.count = res.data.data.count;
                        _this.orderTempList = res.data.data.orderTempList;
                    }else{
                        _this.$message({
                            showClose: true,
                            message: '请求数据失败，请联系管理员',
                            type: 'error'
                        })
                    }

                })
                .catch(function(error) {
                    console.info(error);
                     _this.$message({
                        showClose: true,
                        message: '网络异常，请联系管理员',
                        type: 'error'
                    })
                });
            }
  }
}
</script>

<style lang="scss">
.getBillsContent{
    min-height:400px;
    padding: 2px 20px;
    .getBillsItem{
        height: 73px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        .memberBillInfo{
            width: calc(100% - 80px);
            float: left;
            padding: 12px 0 12px 24px;
            div{
                overflow: hidden;
                width: 100%;
                b{
                    color: #000;
                }
                span{
                    float: left;
                    color: #666666;
                }
                h5{
                    font-size: 12px;
                    float: right;
                    color: #666666;
                }
            }
        }
        .getBillButton{
            width: 80px;
            float: left;
            text-align: center;
            font-size: 12px;
            color: #00A2DE;
            cursor: pointer;
        }
        &:hover{
            background: #E8F6FC;
        }
    }
}
</style>
