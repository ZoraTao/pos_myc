<template>
<div class="content_box flexH100">
    <div class="optometry_list_top am_bg_white">
        <div class="fn-left mgt4 mgr10">
            <span class="member">品牌:</span>
                <el-select size="mini" v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>
        <div class="fn-left mgt4">
            <span class="member">品种:</span>
            <el-select size="mini" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="fn-left mgt4 mgl30">
            <button class="col_blue_bg_white find_btn">
                查询
            </button>
        </div>
        <div class="fn-right mgt4">
            <button class="col_blue_bg_white find_btn mgr10">
                导出
            </button>
            <button class="col_blue_bg_white find_btn">
                导入
            </button>
        </div>
    </div>
    <div class="optometry_content optometry_content">
        <!--验光列表-->
        <div class="h100">
            <div class="list_name">超期单据列表 (23)</div>
                <el-table
                    :data="tableData3"
                    size="small"
                    align="left"
                    style="width: 100%;margin-bottom:10px;">
                    <el-table-column
                    prop="id"
                    label="订单编号"
                    width="180">
                        <template slot-scope="scope">
                            <span class="am-ft-00afe4">{{scope.row.id}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="name"
                    label="会员姓名"
                    width="180">
                        <template slot-scope="scope">
                            <span class="am-ft-00afe4">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="sex"
                    label="会员性别">
                    </el-table-column>
                    <el-table-column
                    prop="telephone"
                    label="手机">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="地址">
                    </el-table-column>
                    <el-table-column
                    prop="salesCount"
                    label="商品总数">
                    </el-table-column>
                    <el-table-column
                    prop="unGetCount"
                    label="未取数">
                    </el-table-column>
                    <el-table-column
                    prop="orderTime"
                    label="下单时间">
                    </el-table-column>
                    <el-table-column
                    prop="shouldTime"
                    label="应取镜时间">
                        <template slot-scope="scope">
                            <span class="am-ft-F58B8B">{{scope.row.shouldTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="exceedTime"
                    label="超期天数">
                        <template slot-scope="scope">
                            <span class="am-ft-F58B8B">{{scope.row.exceedTime}}</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                class="am-ft-right"
                background
                layout="prev, pager, next"
                :total="1000">
                </el-pagination>
        </div>
    </div>

</div>
</template>

<script>
    export default {
        name: "timeoutBill",
        data() {
            return {
                options: [{
                    value: "选项1",
                    label: "黄金糕"
                }, {
                    value: "选项2",
                    label: "双皮奶"
                }, {
                    value: "选项3",
                    label: "蚵仔煎"
                }, {
                    value: "选项4",
                    label: "龙须面"
                }, {
                    value: "选项5",
                    label: "北京烤鸭"
                }],
                value: "",
                tableData3: [{
                    id: "20170909000000001",
                    name: "张三",
                    sex: "男",
                    telephone: 15757179646,
                    address: "浙江省杭州市西湖区文二西路11111111号",
                    salesCount: "5",
                    unGetCount: "3",
                    orderTime: "2017-12-14 12:26:26",
                    shouldTime: "2017-12-14 12:26:26",
                    exceedTime: "302"
                }]
            };
        },
        created: function() {
            for (var i = 0; i < 10; i++) {
                this.tableData3.push({
                    id: "20170909000000001",
                    name: "张三",
                    sex: "男",
                    telephone: 15757179646,
                    address: "浙江省杭州市西湖区文二西路11111111号",
                    salesCount: "5",
                    unGetCount: "3",
                    orderTime: "2017-12-14 12:26:26",
                    shouldTime: "2017-12-14 12:26:26",
                    exceedTime: "302"
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../reset";
    .el-select {
        height: 30px;
        line-height: 30px;
        width: 100px;
        input {
            width: 100%;
            height: 100%;
        }
    }

    .optometry_list_top {
        height: 70px;
        width: 100%;
        padding: 18px 20px;
        background: #fff;
    }

    .member {
        display: inline-block;
        width: 43px;
        font-weight: bold;
        font-size: 12px;
    }

    .find_btn {
        width: 96px;
        height: 30px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        letter-spacing: 0;
    }

    .add_btn {
        width: 100px;
        height: 34px;
        font-family: MicrosoftYaHei;
        font-size: 12px;
        letter-spacing: 0;
    }

    .col_blue_bg_white {
        color: #00afe4;
        background: white;
        border: 1px solid #00afe4;
        border-radius: 4px;
    }

    .bg_white_col_blue {
        color: #ffffff;
        background: #00afe4;
        border: 1px solid #00afe4;
        border-radius: 4px;
    }

    .optometry_input {
        background: #f8f8f8;
        border: 1px solid #e1e1e1;
        padding: 2px 10px;
        height: 26px;
    }

    .optometry_content {
        position: relative;
        margin-top: 10px;
        width: 100%;
        background: white;
        padding: 11px;
    }

    .find_before {
        width: 250px;
        height: auto;
        position: absolute;
        left: 50%;
        top: 24%;
        margin-left: -125px;
        /*margin-top: -150px;*/
    }

    .find_before li {
        text-align: center;
        margin-top: 23px;
    }

    li.optometry_qs_img {
        margin-left: 25px;
    }

    li.optometry_qs_text {
        text-align: center;
        font-size: 14px;
        color: #888888;
        letter-spacing: 0.51px;
    }
    /*列表*/

    .list_name {
        font-family: MicrosoftYaHei;
        font-size: 16px;
        line-height: 26px;
        color: #333333;
        letter-spacing: 0;
        padding-left: 20px;
        margin-bottom: 5px;
        text-align: left;
    }

    .h100 {
        height: 100%;
    }
    .am-ft-00afe4 {
        color: #00afe4 !important;
    }
    .am-ft-F58B8B {
        color: #f58b8b !important;
    }
</style>
