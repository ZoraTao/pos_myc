<template>
<div class="content_box flexH100">
    <div class="optometry_list_top am-bg-white">

        <div class="fn-left mgt4">
            <span class="member">会员:</span>
            <el-input class="" v-model="searchModel" placeholder="卡号/姓名/手机号"></el-input>
        </div>

        <div class="fn-left mgt4 mgl30">
            <button class="col_blue_bg_white find_btn">
                查询
            </button>
        </div>

        <div class="fn-right ">
            <button class="add_btn bg_white_col_blue">
                + 新增验光单
            </button>
        </div>

    </div>
    <div class="optometry_content optometry_content">
        <!--查询之前-->
        <div v-show="searchModel==''">
            <ul class="find_before">
                <li class="optometry_qs_img">
                    <img src="http://myc-oms.oss-cn-hangzhou.aliyuncs.com/img%2Foptometry_qs.png" />
                </li>
                <li class="optometry_qs_text">
                    输入会员信息查询验光单
                </li>
                <li class="optometry_qs_text">
                    未查询到验光单
                </li>
                <li>
                    <button class="add_btn bg_white_col_blue">
                + 新增验光单
              </button>
                </li>
            </ul>
        </div>
        <!--验光列表-->
        <div v-show="showDiv==='2'&&searchModel!=''&&searchModel!='neikami'">
            <div class="list_name">验光列表(23)</div>
            <el-table
                :data="data"
                size="small"
                align="left"
                style="width: 100%;margin-bottom:10px;">
                <el-table-column
                prop="id"
                label="会员ID"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="telephone"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="time"
                label="验光时间">
                </el-table-column>
                <el-table-column
                prop="optometrist"
                label="验光师">
                </el-table-column>
                <el-table-column
                prop="origin"
                label="来源">
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <span class="am-ft-blue"><a>查看详情</a></span>
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
        <optometryOrderCu v-if="searchModel=='neikami'"></optometryOrderCu>
    </div>
</div>
</template>

<script>
import optometryOrderCu from '../optometryOrderCu/optometry-order-cu.vue'
    export default {
        name: "optometryOrderList",
        data() {
            return {
                showDiv:"2",
                searchModel:"",
                data : [{
                id    : '12341234',
                name   : '张三',
                telephone    : 15757179646,
                time: '2017-12-14 12:26:26',
                optometrist: '毛源昌湖滨店 张三',
                origin: '本店验光',
                }]
            };
        },
        components:{
            optometryOrderCu
        },
        created: function() {
            for (var i = 0; i < 10; i++) {
                    this.data.push({
                    id    : '12341234',
                    name   : '张三',
                    telephone    : 15757179646,
                    time: '2017-12-14 12:26:26',
                    optometrist: '毛源昌湖滨店 张三',
                    origin: '本店验光',
                });
            }
        }
    };
</script>

<style scoped lang="scss">
@import "../../../../reset";
.content_box{
    flex-direction: column;
}
.optometry_list_top {
    height: 70px;
    width: 100%;
    padding: 18px 20px;
}

.member {
    display: inline-block;
    width: 43px;
    font-weight: bold;
    font-size: 12px;
}

.mgt4 {
    margin-top: 4px;
}

.mgt2 {
    margin-top: 2px;
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
    color: #00AFE4;
    background: white;
    border: 1px solid #00AFE4;
    border-radius: 4px;
}

.bg_white_col_blue {
    color: #ffffff;
    background: #00AFE4;
    border: 1px solid #00AFE4;
    border-radius: 4px;
}

.optometry_input {
    background: #F8F8F8;
    border: 1px solid #E1E1E1;
    padding: 2px 10px;
    height: 26px;
}

.optometry_content {
    position: relative;
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 123px);
    background: white;
    padding: 11px;
    overflow-y: auto;
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
</style>