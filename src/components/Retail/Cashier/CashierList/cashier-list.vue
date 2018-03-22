<template>
<section class=" content_box">
    <div class="am_bg_white cashier_box">
        <ul class="cashier_tab">
            <li v-for="item of tabs" :key="item.value" :class="{'on':item.isActived}" v-on:click="changeTab(item)">{{item.value}}</li>
        </ul>

        <!-- 代收银 -->
        <div class="content am_bg_white" v-if="srcNum==='1'">
            <ul class="clearfix cashier_top">
                <li class="fn-left mgt4">
                    <span class="member">零售单号&nbsp;:&nbsp;</span>
                    <input type="text" class="cashier_input" />
                </li>
                <li class="fn-left mgt4">
                    <span class="member">会员&nbsp;:&nbsp;</span>
                    <input type="text" class="cashier_input" />
                </li>
                <li class="fn-left mgt4">
                    <span class="member">订单类型&nbsp;:&nbsp;</span>
                    <!-- <nz-select style="width: 60px;" [(ngModel)]="single" [nzSize]="size">
                        <nz-option *ngFor="let option of options" [nzLabel]="option.label" [nzValue]="option.value" [nzDisabled]="option.disabled">
                        </nz-option>
                    </nz-select> -->
                </li>
                <li class="fn-left mgt4">
                    <span class="member">零售时间&nbsp;:&nbsp;</span>
                    <!-- <nz-datepicker [(ngModel)]="_date_start" [nzSize]="'large'" [nzPlaceHolder]="'2018-02-06'"></nz-datepicker> -->
                    <span>-</span>
                    <!-- <nz-datepicker [(ngModel)]="_date_end" [nzSize]="'large'" [nzPlaceHolder]="'2018-02-06'"></nz-datepicker> -->
                </li>

                <li class="fn-left">
                    <button class="find_btn">查询</button>
                </li>
            </ul>
            <div class="orders">
                <table class="orders_table">
                    <thead>
                        <tr>
                            <th width="">商品编码</th>
                            <th width="">商品名称</th>
                            <th width="">数量</th>
                            <th width="">原单价</th>
                            <th width="">实售单价</th>
                            <th width="">出货仓库</th>
                            <th width="">订单金额</th>
                            <th width="">订单状态</th>
                            <th width="">操作</th>
                        </tr>
                    </thead>

                    <tbody class="orders_tbody">
                        <tr class="order_header">
                            <td colspan="9">
                                <div class=" fn-left">
                                    <span class="am-bg-blue icon">定</span>
                                    <span class="order_id">20170909000000001</span>
                                    <span class="msg">&nbsp; &nbsp;会员： <strong>张三</strong>&nbsp;&nbsp;15757489764</span>
                                </div>
                                <div class=" fn-right">
                                    <span class="msg">销售&nbsp;&nbsp;</span>
                                    <span class="msg">王二：&nbsp;&nbsp;2017-12-22 22:10:09</span>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>
                            <td rowspan="5" class="rowspan_td order_price">
                                <div class="order_price_box">
                                    <div class="priceAll am-ft-22">1299.00</div>
                                    <div>商品合计：<strong>1389.00</strong></div>
                                    <div>卡券：<strong>-20</strong></div>
                                    <div>折扣：<strong>-50</strong></div>
                                    <div>活动：<strong>-20</strong></div>
                                </div>

                            </td>
                            <td rowspan="5" class="rowspan_td">
                                <div class="am-ft-orange">代收银</div>
                                <div class="look_d" v-on:click="goDetail('1')">查看详情</div>
                            </td>
                            <td rowspan="5" class="rowspan_td">
                                <div class="am-ft-orange priceAll am-ft-22 mgb10">1299.00</div>
                                <div class="button">
                                    <el-button type="primary" v-on:click="showModalMiddle()">收银</el-button>
                                </div>
                                <div class="am-ft-blue">重新开单</div>
                                <div class="am-ft-gray9">关闭订单</div>

                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>
                                <p class="td_msg">左镜片：<span class=" am-ft-blue">定做 DZ12340001</span> - 柱镜0.5 球镜0.5 下加光0.3 </p>
                                <p class="td_msg">定做需求：需求内容</p>
                            </td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>
                        </tr>
                        <div class="gekai"> </div>
                    </tbody>


                </table>

            </div>
        </div>

        <!-- 欠还款 -->
        <div class="content am_bg_white" v-if="srcNum==='2'">
            <ul class="clearfix cashier_top">
                <li class="fn-left mgt4">
                    <span class="member">零售单号&nbsp;:&nbsp;</span>
                    <input type="text" class="cashier_input" />
                </li>
                <li class="fn-left mgt4">
                    <span class="member">会员&nbsp;:&nbsp;</span>
                    <input type="text" class="cashier_input" />
                </li>
                <li class="fn-left mgt4">
                    <span class="member">零售时间&nbsp;:&nbsp;</span>
                    <!-- <nz-datepicker [(ngModel)]="_date_start" [nzSize]="'large'" [nzPlaceHolder]="'2018-02-06'"></nz-datepicker> -->
                    <span>-</span>
                    <!-- <nz-datepicker [(ngModel)]="_date_end" [nzSize]="'large'" [nzPlaceHolder]="'2018-02-06'"></nz-datepicker> -->
                </li>

                <li class="fn-left">
                    <button class="find_btn">查询</button>
                </li>
            </ul>
            <div class="orders">
                <table class="orders_table">
                    <thead>
                        <tr>
                            <th width="">商品编码</th>
                            <th width="">商品名称</th>
                            <th width="">数量</th>
                            <th width="">原单价</th>
                            <th width="">实售单价</th>
                            <th width="">出货仓库</th>
                            <th width="">订单金额</th>
                            <th width="">订单状态</th>
                            <th width="">操作</th>
                        </tr>
                    </thead>
                    <tbody class="orders_tbody">
                        <tr class="order_header">
                            <td colspan="9">
                                <div class=" fn-left">
                                    <span class=" am-bg-blue icon">定</span>
                                    <span class=" am-bg-orange icon">欠</span>
                                    <span class="order_id">20170909000000001</span>
                                    <span class="sign_orange">跨店签批</span>
                                    <span class="msg">&nbsp; &nbsp;会员： <strong>张三</strong>&nbsp;&nbsp;15757489764</span>
                                </div>
                                <div class=" fn-right">
                                    <span class="msg">销售&nbsp;&nbsp;</span>
                                    <span class="msg">王二：&nbsp;&nbsp;2017-12-22 22:10:09</span>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>
                            <td rowspan="3" class="rowspan_td order_price">
                                <div class="order_price_box">
                                    <div class="priceAll">1299.00</div>
                                    <div>商品合计 :<strong>1389.00</strong></div>
                                    <div>卡券：<strong>-20</strong></div>
                                    <div>折扣：<strong>-50</strong></div>
                                    <div>活动：<strong>-20</strong></div>
                                    <div class=" am-ft-16">已收:<strong>566.00</strong></div>
                                </div>

                            </td>
                            <td rowspan="3" class="rowspan_td">
                                <div class="am-ft-orange">欠还款</div>
                                <div class="look_d" v-on:click="goDetail('1')">查看详情</div>
                            </td>
                            <td rowspan="3" class="rowspan_td">
                                <div class="am-ft-orange priceAll">1299.00</div>
                                <div class="button">
                                    <el-button type="primary" v-on:click="showModalMiddle()">收银</el-button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>

                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>
                        </tr>
                        <div class="gekai"> </div>
                    </tbody>

                    <tbody class="orders_tbody">
                        <tr class="order_header">
                            <td colspan="9">
                                <div class=" fn-left">
                                    <span class="order_id">20170909000000001</span>
                                    <span class="sign_blue">本店签批</span>
                                    <span class="msg">&nbsp; &nbsp;会员： <strong>张三</strong>&nbsp;&nbsp;15757489764</span>
                                </div>
                                <div class=" fn-right">
                                    <span class="msg">销售&nbsp;&nbsp;</span>
                                    <span class="msg">王二：&nbsp;&nbsp;2017-12-22 22:10:09</span>
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>
                            <td rowspan="3" class="rowspan_td order_price">
                                <div class="order_price_box">
                                    <div class="priceAll">1299.00</div>
                                    <div>商品合计 :<strong>1389.00</strong></div>
                                    <div>卡券：<strong>-20</strong></div>
                                    <div>折扣：<strong>-50</strong></div>
                                    <div>活动：<strong>-20</strong></div>
                                    <div class=" am-ft-16">已收：<strong>566.00</strong></div>
                                </div>

                            </td>
                            <td rowspan="3" class="rowspan_td">
                                <div class="am-ft-orange">欠还款</div>
                                <div class="look_d" v-on:click="goDetail('1')">查看详情</div>
                            </td>
                            <td rowspan="3" class="rowspan_td">
                                <div class="am-ft-orange priceAll">1299.00</div>
                                <div class="button">
                                    <el-button type="primary" v-on:click="showModalMiddle()">收银</el-button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>

                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>230.00</td>
                            <td><strong>134.00</strong></td>
                            <td>天一恒泰店</td>
                        </tr>
                        <div class="gekai"> </div>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- 全部 -->
        <div class="content am_bg_white" v-if="srcNum==='3'">
            <ul class="clearfix cashier_top">
                <li class="fn-left mgt4">
                    <span class="member">零售单号&nbsp;:&nbsp;</span>
                    <input type="text" class="cashier_input" />
                </li>
                <li class="fn-left mgt4">
                    <span class="member">会员&nbsp;:&nbsp;</span>
                    <input type="text" class="cashier_input" />
                </li>
                <li class="fn-left mgt4">
                    <span class="member">订单类型&nbsp;:&nbsp;</span>
                    <!-- <nz-select style="width: 60px;" [(ngModel)]="single" [nzSize]="size">
                        <nz-option *ngFor="let option of options" [nzLabel]="option.label" [nzValue]="option.value" [nzDisabled]="option.disabled">
                        </nz-option>
                    </nz-select> -->
                </li>
                <li class="fn-left mgt4">
                    <span class="member">零售时间&nbsp;:&nbsp;</span>
                    <!-- <nz-datepicker [(ngModel)]="_date_start" [nzSize]="'large'" [nzPlaceHolder]="'2018-02-06'"></nz-datepicker> -->
                    <span>-</span>
                    <!-- <nz-datepicker [(ngModel)]="_date_end" [nzSize]="'large'" [nzPlaceHolder]="'2018-02-06'"></nz-datepicker> -->
                </li>

                <li class="fn-left">
                    <button class="find_btn">查询</button>
                </li>
            </ul>
            <div class="orders">
                <!-- <nz-table #nzTable [nzDataSource]="data" [nzPageSize]="20" [nzShowTotal]="200" class="orderList_table">
                    <thead nz-thead>
                        <tr>
                            <th nz-th><span>订单号</span></th>
                            <th nz-th><span>会员姓名</span></th>
                            <th nz-th><span>会员手机号</span></th>
                            <th nz-th><span>金额</span></th>
                            <th nz-th><span>下单时间</span></th>
                            <th nz-th><span>销售门店</span></th>
                            <th nz-th><span>状态</span></th>
                            <th nz-th><span>操作</span></th>
                        </tr>
                    </thead>
                    <tbody nz-tbody>
                        <tr nz-tbody-tr *ngFor="let item of nzTable.data">
                            <td nz-td>

                                <span class=" am_bg_blue icon">定</span>
                                <span class=" am_bg_orange icon">欠</span>
                                <span class=" am_bg_red icon">退</span>
                                <span class="order_id">  <a>{{item.id}}</a></span>
                                <span class="sign_orange">跨店签批</span>
                            </td>
                            <td nz-td>{{item.name}}</td>
                            <td nz-td>{{item.telephone}}</td>
                            <td nz-td><strong>￥{{item.price}}</strong></td>
                            <td nz-td>{{item.time}}</td>
                            <td nz-td>{{item.salesStore}}</td>
                            <td nz-td [ngClass]="{'am-ft-aa': item.type==='1','am-ft-orange':item.type==='2','am-ft-red': item.type==='3'}">{{item.status}}</td>
                            <td nz-td (click)="goDetail(item)">
                                <a>查看详情</a>
                            </td>
                        </tr>
                    </tbody>

                </nz-table> -->
            </div>
        </div>
    </div>
</section>
</template>

<script>

export default {
  name: 'CashierList',
  data () {
    return { 
        srcNum:'2',
        tabs:[{
            'value':'收银',
            'isActived':true,
            'srcNum':'1'
        },
        {
            'value':'欠还款',
            'isActived':false,
            'srcNum':'2'
        },
        {
            'value':'全部',
            'isActived':false,
            'srcNum':'3'
            
        }]
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../../../reset";
.cashier_box {
    height: 100%;
}

.cashier_tab {
    height: 40px;
    width: 100%;
    background: #f4f4f4;
}

.cashier_tab li {
    width: 95px;
    height: 40px;
    font-size: 15px;
    line-height: 40px;
    font-weight: bold;
    float: left;
    text-align: center;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    cursor: pointer;
    /* box-shadow: 0 -2px 10px 0 rgba(0, 0, 0, 0.05); */
}

.cashier_tab li.on {
    background: #fff;
    color: #00AFE4;
}

.content {
    width: 100%;
    height: calc(100% - 70px);
    min-width: 360px;
    overflow-x: hidden;
    overflow-y: scroll;
    background: #fff;
}

.cashier_input {
    background: #F8F8F8;
    border: 1px solid #E1E1E1;
    padding: 2px 10px;
    height: 30px;
}

.cashier_top {
    height: 70px;
    padding-top: 20px;
}

.cashier_top li {
    margin-left: 30px;
}

.find_btn {
    display: inline-block;
    width: 70px;
    height: 30px;
    line-height: 28px;
    border: 1px solid #00AFE4;
    border-radius: 4px;
    color: #00AFE4;
    text-align: center;
    background: #fff;
}

.orders {
    padding: 9px;
}

.orders_table {
    width: 100%;
}

.orders_table thead tr {
    height: 40px;
}

.orders_table thead tr th {
    background: #F4F4F4;
    font-weight: bold;
    color: #555555;
    text-align: center;
    font-size: 12px;
    padding: 0 2px;
    line-height: 40px;
    border-bottom: 10px solid #fff;
}

.orders_table tr td {
    padding: 11px;
    text-align: center;
    font-size: 13px;
    color: #333333;
    letter-spacing: 0;
}

.orders_table tr td:nth-child(2) {
    text-align: left;
}

.orders_table tr td:nth-child(2) .td_msg {
    max-width: 350px;
}

.orders_tbody .order_header {
    background: #FFF4E5 !important;
    text-align: left;
    border-top: none;
    border-bottom: none;
}

.orders_table .order_header .order_id {
    font-size: 16px;
    color: #555555;
    letter-spacing: 0;
    font-weight: bold;
}

.icon {
    padding: 2px 5px;
    color: #fff;
    font-size: 12px;
    border-radius: 5px;
}

.order_header .msg {
    font-size: 12px;
    color: #555555;
}

.orders_tbody tr {
    /* display: inline-block; */
    height: 40px;
    line-height: 18px;
    border: 1px solid #E1E1E1;
}

.orders_tbody tr:nth-child(2n-1) {
    background: rgba(246, 246, 246, 0.50);
}

.orders_tbody .rowspan_td {
    border: 1px solid #E1E1E1;
    font-size: 12px;
    line-height: 24px;
    &:not(:last-child){
        border-right: none;
    }
}

.orders_tbody .rowspan_td button {
    font-size: 14px;
    font-weight: bold;
}

.orders_tbody .rowspan_td div {
    color: #666666;
}

.orders_tbody .rowspan_td strong {
    color: #000;
}

.orders_tbody .rowspan_td .priceAll {
    font-weight: bold;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
}

.gekai {
    height: 15px;
    width: 100%;
}

.look_d {
    cursor: pointer;
}

.sign_orange {
    border: 1px solid #FF6600;
    border-radius: 0 10px 10px 0;
    padding: 0 15px 0 5px;
}

.sign_blue {
    border: 1px solid #00AFE4;
    border-radius: 0 10px 10px 0;
    padding: 0 15px 0 5px;
}

.order_price {
    max-width: 130px;
}

.order_price_box {
    margin: 0 auto;
    text-align: left;
    padding: 0 10px;
}


/* 全部 */

.orderList_table tbody tr:nth-child(2n) {
    background: rgba(246, 246, 246, 0.50);
}


/*modal*/

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


/*打印小票*/

.print-frame {
    padding: 40px 0;
    font-size: 14px;
    color: #666666;
    width: 400px;
    text-align: center;
    margin: 0 auto;
}

.print-frame img {
    margin-left: 20px;
    margin-right: 10px;
}

.print-frame span {
    font-size: 14px;
    color: #666666;
}

.modal-content {
    border: none;
    border-radius: 0;
    box-shadow: none;
}

.modal-body {
    padding: 0;
}

.height30 {
    line-height: 30px;
}
</style>
