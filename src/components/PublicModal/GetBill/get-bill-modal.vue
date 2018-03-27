<template>
<div class="getBillsContent">
    <div class="getBillsItem">
        <div class="memberBillInfo">
            <div><span class="am-ft-14"><b>张丽丽</b></span><h5>共3件商品 合计: <b class="am-ft-13">1125.00</b></h5></div>
            <div><span>0006262626</span><h5>创建人：张三 2017-11-19 16:40</h5></div>
        </div>
        <div class="getBillButton">
            <span>取单</span>
        </div>
    </div>
    <div class="getBillsItem">
        <div class="memberBillInfo">
            <div><span class="am-ft-14"><b>张丽丽</b></span><h5>共3件商品 合计: <b class="am-ft-13">1125.00</b></h5></div>
            <div><span>0006262626</span><h5>创建人：张三 2017-11-19 16:40</h5></div>
        </div>
        <div class="getBillButton">
            <span>取单</span>
        </div>
    </div>
    <div class="getBillsItem">
        <div class="memberBillInfo">
            <div><span class="am-ft-14"><b>张丽丽</b></span><h5>共3件商品 合计: <b class="am-ft-13">1125.00</b></h5></div>
            <div><span>0006262626</span><h5>创建人：张三 2017-11-19 16:40</h5></div>
        </div>
        <div class="getBillButton">
            <span>取单</span>
        </div>
    </div>
    <div class="getBillsItem">
        <div class="memberBillInfo">
            <div><span class="am-ft-14"><b>张丽丽</b></span><h5>共3件商品 合计: <b class="am-ft-13">1125.00</b></h5></div>
            <div><span>0006262626</span><h5>创建人：张三 2017-11-19 16:40</h5></div>
        </div>
        <div class="getBillButton">
            <span>取单</span>
        </div>
    </div>
    <div class="getBillsItem">
        <div class="memberBillInfo">
            <div><span class="am-ft-14"><b>张丽丽</b></span><h5>共3件商品 合计: <b class="am-ft-13">1125.00</b></h5></div>
            <div><span>0006262626</span><h5>创建人：张三 2017-11-19 16:40</h5></div>
        </div>
        <div class="getBillButton">
            <span>取单</span>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'GetBill',
  data () {
    return { 

    }
  },
  methods:{

  }
}
</script>

<style lang="scss">
.getBillsContent{
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
        }
        &:hover{
            background: #E8F6FC;
        }
    }
}
</style>
