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
        <div class="fn-right ">
            <button class="col_blue_bg_white find_btn mgr10">
                导出
            </button>
            <button class="col_blue_bg_white find_btn">
                打印
            </button>
        </div>
    </div>
    <div class="optometry_content optometry_content">
        <!--验光列表-->
        <div class="h100">
            <div class="list_name">即将到期隐形镜列表 (23)</div>
                <el-table
                    :data="tableData3"
                    size="small"
                    align="left"
                    style="width: 100%;margin-bottom:10px;">
                    <el-table-column
                    prop="orderNum"
                    label="商品编码"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="orderName"
                    label="商品名称"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="brand"
                    label="品牌">
                    </el-table-column>
                    <el-table-column
                    prop="variety"
                    label="品种">
                    </el-table-column>
                    <el-table-column
                    prop="unit"
                    label="单位">
                    </el-table-column>
                    <el-table-column
                    prop="supplier"
                    label="供应商">
                    </el-table-column>
                    <el-table-column
                    prop="validity"
                    label="有效期">
                        <template slot-scope="scope">
                            <span class="am-ft-FF9400">{{scope.row.validity}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="batchNum"
                    label="批号">
                    </el-table-column>
                    <el-table-column
                    prop="inventory"
                    label="库存">
                    </el-table-column>
                    <el-table-column
                    prop="remainingTime"
                    label="剩余天数">
                        <template slot-scope="scope">
                            <span class="am-ft-FF9400">{{scope.row.remainingTime}}</span>
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
        <!--验光单一条数据详情-->
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
                    orderNum: "bslcsfgd-3",
                    orderName: "博士伦纯视2代散光3片装-3.75-1.25",
                    brand: "博士伦",
                    variety: "纯视2代散光3片装",
                    unit: "盒",
                    supplier: "北京博士伦眼睛护理产品有限公司",
                    validity: "2019-02-16",
                    batchNum: "12314325423",
                    inventory: "1",
                    remainingTime: "302"
                }]
            };
        },
        created: function() {
            for (var i = 0; i < 10; i++) {
                this.tableData3.push({
                    orderNum: "bslcsfgd-3",
                    orderName: "博士伦纯视2代散光3片装-3.75-1.25",
                    brand: "博士伦",
                    variety: "纯视2代散光3片装",
                    unit: "盒",
                    supplier: "北京博士伦眼睛护理产品有限公司",
                    validity: "2019-02-16",
                    batchNum: "12314325423",
                    inventory: "1",
                    remainingTime: "302"
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../reset";
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
        height: calc(100% - 110px);
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
    
    .am-ft-F58B8B {
        color: #f58b8b !important;
    }
    
    .am-ft-FF9400 {
        color: #ff9400 !important;
    }
</style>