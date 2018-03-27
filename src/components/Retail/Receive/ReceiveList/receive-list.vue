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
                    <span class="member">零售时间&nbsp;:&nbsp;</span>
                    <el-date-picker
                    style="width:120px"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker
                    style="width:120px"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
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
                            <th width="">出货仓库</th>
                            <th width="">订单金额</th>
                            <th width="">订单状态</th>
                            <th width="">操作</th>
                        </tr>
                    </thead>

                    <tbody class="orders_tbody">
                        <tr class="order_header">
                            <td colspan="7">
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
                                <div class="am-ft-yellow am-ft-13">订单待发出</div>
                                <div class="look_d" @click="goDetail('1')">查看详情</div>
                            </td>
                            <td rowspan="5" class="rowspan_td">
                                <el-button type="primary" @click="showReceive=true">扫码装袋</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <div class="gekai"> </div>
                    </tbody>
                    <tbody class="orders_tbody">
                        <tr class="order_header">
                            <td colspan="7">
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
                                <div class="am-ft-yellow am-ft-13">订单待发出</div>
                                <div class="look_d" @click="goDetail('1')">查看详情</div>
                            </td>
                            <td rowspan="5" class="rowspan_td">
                                <el-button type="primary">扫码装袋</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <div class="gekai"> </div>
                    </tbody>

                </table>

            </div>
        </div>

        <!-- 代收件 -->
        <div class="content am-bg-white" v-if="srcNum==='2'">

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
                    <span class="member">零售时间&nbsp;:&nbsp;</span>
                    <el-date-picker
                    style="width:120px"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker
                    style="width:120px"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
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
                            <th width="">出货仓库</th>
                            <th width="">订单金额</th>
                            <th width="">订单状态</th>
                            <th width="">操作</th>
                        </tr>
                    </thead>

                    <tbody class="orders_tbody">
                        <tr class="order_header">
                            <td colspan="7">
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
                                <div class="am-ft-yellow am-ft-13">订单待收件</div>
                                <div class="look_d" @click="goDetail('1')">查看详情</div>
                            </td>
                            <td rowspan="5" class="rowspan_td">
                                <el-button type="primary">扫码装袋</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <div class="gekai"> </div>
                    </tbody>
                    <tbody class="orders_tbody">
                        <tr class="order_header">
                            <td colspan="7">
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
                                <div class="am-ft-yellow am-ft-13">订单待收件</div>
                                <div class="look_d" @click="goDetail('1')">查看详情</div>
                            </td>
                            <td rowspan="5" class="rowspan_td">
                                <el-button type="primary">扫码装袋</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <div class="gekai"> </div>
                    </tbody>

                </table>

            </div>
        </div>

        <!-- 全部 -->
        <div class="content am-bg-white" v-if="srcNum==='3'">
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
                    <span class="member">零售时间&nbsp;:&nbsp;</span>
                    <el-date-picker
                    style="width:120px"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                    <span>-</span>
                    <el-date-picker
                    style="width:120px"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
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
                            <th width="">出货仓库</th>
                            <th width="">订单金额</th>
                            <th width="">订单状态</th>
                            <th width="">操作</th>
                        </tr>
                    </thead>

                    <tbody class="orders_tbody">
                        <tr class="order_header">
                            <td colspan="7">
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
                                <div class="am-ft-yellow am-ft-13">订单待发出</div>
                                <div class="look_d" @click="goDetail('1')">查看详情</div>
                            </td>
                            <td rowspan="5" class="rowspan_td">
                                <el-button type="primary">扫码装袋</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <div class="gekai"> </div>
                    </tbody>
                    <tbody class="orders_tbody">
                        <tr class="order_header">
                            <td colspan="7">
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
                                <div class="am-ft-yellow am-ft-13">订单待收件</div>
                                <div class="look_d" @click="goDetail('1')">查看详情</div>
                            </td>
                            <td rowspan="5" class="rowspan_td">
                                <el-button type="primary">扫码装袋</el-button>
                            </td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <tr>
                            <td>BH00003</td>
                            <td>右镜片：毛源昌1.55非球面防辐射远+1.50</td>
                            <td>1</td>
                            <td>天一恒泰店</td>
                        </tr>
                        <div class="gekai"> </div>
                    </tbody>

                </table>
            </div>
        </div>
    </div>
    <el-dialog title="扫码装袋" :visible.sync="showReceive">
        <ReceiveModal></ReceiveModal>
    </el-dialog>
</section>
</template>

<script>
import ReceiveModal from '../ReceiveModal/receive-modal.vue'

export default {
  name: 'ReceiveList',
  data () {
    return { 
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        value: '',
        showReceive:false,
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
      ReceiveModal
  }
}
</script>

<style scoped lang="scss">
@import "../../../../reset";
.cashier_box {
    width: 100%;
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

.cashier_list_top {
    height: 70px;
    width: 100%;
    padding: 18px 20px;
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

:host ::ng-deep .ant-table-thead>tr>th {
    background: #f4f4f4;
}

.orderList_table tbody tr:nth-child(2n) {
    background: rgba(246, 246, 246, 0.50);
}


/* model */

.model-bottom {
    border-top: none;
    background: #F1F1F1;
    width: 100%;
    height: 60px;
    padding: 14px 17px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    /*border-bottom-left-radius: 5px;
	border-bottom-right-radius: 5px;*/
}

:host ::ng-deep .ant-modal-header {
    background: url("http://myc-oms.oss-cn-hangzhou.aliyuncs.com/img/modal-top.png") no-repeat;
    padding-bottom: 7px!important;
    padding-top: 7px!important;
    border-bottom: none!important;
    /* background-size: 100%; */
    margin-bottom: -5px;
    /*background: #DDDDDD;*/
}

:host ::ng-deep .ant-modal-close-x {
    color: #ffffff;
}

:host ::ng-deep .ant-modal-footer {
    padding: 0;
}

:host ::ng-deep .ant-modal-title {
    line-height: 26px;
    font-size: 16px;
    color: #FFFFFF;
}

:host ::ng-deep .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
}

.footerBtn {
    width: 90px;
    height: 30px;
    border: none;
    font-size: 12px;
    color: #FFFFFF;
    background: #00AFE4;
    border-radius: 4px;
}

.footerBtnNo {
    width: 90px;
    height: 30px;
    border: 1px solid #C7C7C7;
    font-size: 12px;
    color: #666666;
    letter-spacing: 0;
    border-radius: 4px;
}

:host ::ng-deep .ant-modal-body {
    padding: 20px 30px;
}

.saomaHead {
    height: 46px;
    line-height: 30px;
    width: 100%;
    border-bottom: 1px dashed #E1E1E1;
}

.saomaHead input,
.saomaMsgBt {
    width: 130px;
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
    background: #FFFFFF;
    border: 1px solid #E1E1E1;
}

.saomaHead .logistics_text {
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    font-weight: bold;
}

.saomaMsg {
    padding: 10px 0;
}

.saomaMsg>div {
    margin-top: 10px;
}

.checkoutBt {
    line-height: 30px;
}
</style>
