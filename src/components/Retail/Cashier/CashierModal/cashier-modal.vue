<template>
<div class="modalContent">
    <!--body-top-->
    <div class="clearfix modal-content-top">
        <div class="fn-left height30">零售单号:DD2017080900001</div>
        <div class="fn-right fn-clear">
            <span class="fn-left height30">收银日期：</span>
            <div class="sale-date fn-left w120">20171130</div>
        </div>
    </div>
    <!--body-content-->
    <div class="clearfix modal-content-center">
        <div class="fn-left modal-content-left">
            <table class="table table-hover w100">
                <tr>
                    <th></th>
                    <th>结算方式</th>
                    <th>金额</th>
                    <th></th>
                    <th></th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>现金</td>
                    <td>
                        <input type="text" />
                    </td>
                    <td>

                    </td>
                    <td>
                        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_close1.png" />
                    </td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>微信</td>
                    <td>
                        <input type="text" />
                    </td>
                    <td>

                    </td>
                    <td>
                        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_close.png" />
                    </td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>代价券</td>
                    <td>
                        <input type="text" />
                    </td>
                    <td>
                        <span class="am-ft-gray9">DJQ12340001</span>
                        <span class="am-ft-orange">（300元）</span>
                    </td>
                    <td>
                        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_close.png" />
                    </td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>积分抵现</td>
                    <td>
                        <input type="text" />
                    </td>
                    <td>
                        <span class="am-ft-gray9">DJQ12340001</span>
                        <span class="am-ft-orange">（300元）</span>
                    </td>
                    <td>
                        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_close.png" />
                    </td>
                </tr>
            </table>
        </div>
        <div class="fn-left  modal-content-right">
            <div class="select-actived">现金
                <img src="assets/img/icon_select.png" />
            </div>
            <div>会员卡</div>
            <div>信用卡</div>
            <div>支付宝</div>
            <div>微信</div>
            <div>银行卡</div>
            <div>代价券</div>
            <div>积分抵现</div>
        </div>
    </div>
        <div class=" model-bottom">
            <div class="">
                <span class="am-ft-gray6">应收：</span>
                <span class="am-ft-20 am-ft-orange">1000.00</span>
            </div>
            <div class="">
                <span class="am-ft-gray6">已收：</span>
                <span class="am-ft-20 am-ft-black">1000.00</span>
            </div>
            <div class="">
                <span class="am-ft-gray6">找零：</span>
                <span class="am-ft-20 am-ft-green">1000.00</span>
            </div>
            <div class="">
                <!--<button type="button" class="btn btn-primary mgr10" data-toggle="modal" data-target=".bs-example-modal-sm">确定</button>-->
                <button type="button" class="btn btn-primary mgr10">确定</button>
            </div>
        </div>
</div>
</template>

<script>

export default {
  name: 'CashierModal',
  data () {
    return { 
    }
  },
  methods:{
  }
}
</script>

<style scoped lang="scss">
@import "../../../../reset";
/*modal*/
table td, 
table th{
    padding: 8px;
    line-height: 1.42857143;
    vertical-align: top;
    border-top: 1px solid #ddd;
}

.w100{
    width: 100%;
}

.w120{
    width: 120px;
}

.modalContent{
    padding: 0 20px;
}

.modal-dialog {
    margin-top: 60px!important;
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
}

.modal-content-right>div {
    background: #FFFFFF;
    border: 1px solid #E1E1E1;
    border-radius: 4px;
    width: 100px;
    height: 28px;
    line-height: 28px;
    position: relative;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 10px;
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
    height: 318px;
    border-left: 1px solid #E1E1E1;
    padding: 10px;
}

.modal-content-left table tr th {
    text-align: center;
    padding-bottom: 10px;
    padding-top: 10px;
    font-size: 12px;
    color: #666666;
    border: none;
}

.modal-content-left table tr td {
    border: none;
    line-height: 30px;
    padding-bottom: 0;
    padding-top: 5px;
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

.table-hover>tbody>tr:hover {
    background: #EDF6F9;
}

.select-actived {
    background: #00AFE4!important;
    font-size: 13px;
    color: #FFFFFF;
}

.select-actived img {
    position: absolute;
    right: 9px;
    top: 8px;
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

.model-bottom>div {
    float: left;
    width: 25%;
    text-align: center;
    font-weight: bolder;
    font-size: 14px;
}

.model-bottom>div:nth-child(4) {
    text-align: right;
}

.model-bottom>div:nth-child(4) button {
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
