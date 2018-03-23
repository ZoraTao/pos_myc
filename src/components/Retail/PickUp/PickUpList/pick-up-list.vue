<template>
<section class=" content_box">
    <div class="am-bg-white cashier_box">
        <ul class="cashier_tab">
            <li v-for="item in tabs" :key="item.value" :class="{'on':item.isActived}" @click="changeTab(item)">{{item.value}}</li>

        </ul>

        <!-- 代发货 -->
        <div class="content am-bg-white" v-if="srcNum==='1'">
            <ul class="clearfix cashier_top">
                <li class="fn-left">
                    <span class="member">零售单号&nbsp;:&nbsp;</span>
                    <input type="text" class="cashier_input" />
                </li>
                <li class="fn-left">
                    <span class="member">会员&nbsp;:&nbsp;</span>
                    <input type="text" class="cashier_input" />
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
                            <th width="">有效期</th>
                            <th width="">批号</th>
                            <th width="">批次码</th>
                            <th width="">出货仓库</th>
                            <th width="">库存</th>
                            <th width="">购买数量</th>
                            <th width="">已出库数量</th>
                            <th width="">本次取件数量</th>
                            <th width=""></th>
                        </tr>
                    </thead>

                    <tbody class="orders_tbody">
                        <tr class="order_header">
                            <td colspan="11">
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
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>天一恒泰店</td>
                            <td>2</td>
                            <td>1片</td>
                            <td>0</td>
                            <td>
                                <input class="pickInput" type="number" min="0" value="1" />&nbsp;&nbsp;&nbsp;
                                <el-checkbox></el-checkbox>
                            </td>

                            <td rowspan="6" class="rowspan_td">
                                <el-button type="primary" @click="showModal=true">取件</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>
                                <p>左镜片：毛源昌1.55非球面防辐射远+1.50</p>
                                <p> <span class=" am-ft-blue"><a>定做 DZ12340001</a></span> - 柱镜0.5 球镜0.5 下加光0.3 </p>
                                <p> 定做需求：需求内容需求内容 </p>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>天一恒泰店</td>
                            <td>2</td>
                            <td>1片</td>
                            <td>0</td>
                            <td> <input class="pickInput" type="number" value="1" />&nbsp;&nbsp;&nbsp;
                            <el-checkbox></el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>镜架：LEVIS光学镜架</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>天一恒泰店</td>
                            <td>2</td>
                            <td>1片</td>
                            <td>0</td>
                            <td> <input class="pickInput" type="number" value="1" />&nbsp;&nbsp;&nbsp;
                            <el-checkbox></el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>眼镜辅助产品：毛源昌镜布(普通)</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>天一恒泰店</td>
                            <td>2</td>
                            <td>1片</td>
                            <td>0</td>
                            <td>本次取件数量</td>
                        </tr>
                        <tr class="opacity50">
                            <td>BH00003</td>
                            <td>隐形眼镜</td>
                            <td>2018-04-20</td>
                            <td>20160421</td>
                            <td>*00150189*2018-04-20*2016</td>
                            <td>天一恒泰店</td>
                            <td>2</td>
                            <td>1片</td>
                            <td>0</td>
                            <td> <input class="pickInput" type="number" value="1" />&nbsp;&nbsp;&nbsp;
                            <el-checkbox></el-checkbox>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>医学费用：验光费</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>天一恒泰店</td>
                            <td>2</td>
                            <td>1片</td>
                            <td>0</td>
                            <td>2017-08-07 09:08:12 已取</td>
                        </tr>
                        <div class="gekai"> </div>
                    </tbody>


                </table>

            </div>
        </div>

        <!-- 全部 -->
        <div class="content am-bg-white" v-if="srcNum==='2'">
            全部
        </div>
    </div>
    <el-dialog custom-class="noheader" title="" :visible.sync="showModal">
        <div class="modal-content print-frame">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/print.png" />
            <span>该订单已完成收银，开始打印取货单...</span>
        </div>
    </el-dialog>
</section>
</template>

<script>

export default {
  name: 'PickUpList',
  data () {
    return { 
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        value: '',
        showModal:false,
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
        }],
        data : [
        {
            'id'    : '20170909000000001',
            'name'   : '张三',
            'telephone'    : 15757179646,
            'price':'860.60',
            'time': '2017-12-14 12:26:26',
            'salesStore':  '毛源昌建国北路店',
            'status': '代收银',
            "type":"1"
        }]
    }
  },
  methods:{
    changeTab:function(item){
        this.srcNum=item.srcNum;
        this.tabs.forEach(function(element){
            element.isActived=false;
            if(element==item){
                element.isActived=true;
            }
        })
    },
    showModalMiddle:function(){
        this.showCashier=true;
    }
  },
  components:{
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
    line-height: 40px;
    font-size: 15px;
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

.orders_table tr td:nth-child(6) {
    min-width: 90px;
}

.orders_table tr td:nth-child(8) {
    min-width: 55px;
}

.orders_table tr td:nth-child(9) {
    min-width: 65px;
}

.orders_table tr td:nth-child(10) {
    min-width: 190px;
}

.orders_tbody .order_header {
    background: #B3E3F6 !important;
    border-top: none;
    border-bottom: none;
    text-align: left;
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


/* 全部 */


.opacity50 {
    opacity: 0.5 !important;
}

.pickInput {
    background: #F8F8F8;
    border: 1px solid #00AFE4;
    width: 69px;
    height: 26px;
    margin-right: 15px;
    text-align: center;
    padding: 0 5px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
}

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
    vertical-align: middle;
}

.print-frame span {
    font-size: 14px;
    color: #666666;
}
</style>
