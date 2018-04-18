<template>
<div class="content_box flexH100">
    <div class="optometry_list_top am-bg-white">

        <div class="fn-left mgt4">
            <span class="member">回访时间:</span>
            <el-date-picker type="date" placeholder="选择日期" style="width: 120px"></el-date-picker>
            -
            <el-date-picker type="date" placeholder="选择日期" style="width: 120px"></el-date-picker>
        </div>
        <div class="fn-left mgt4">
            <span class="member">回访类型：</span>
            <el-select style="width:120px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="fn-left mgt4">
            <span class="member">回访方式：</span>
            <el-select style="width:120px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="fn-left mgt4">
            <span class="member">状态：</span>
            <el-select style="width:120px" v-model="value" placeholder="请选择">
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
    </div>
    <div class="optometry_content optometry_content">
        <!--验光列表-->
        <div>
            <el-table
                :data="data"
                size="small"
                align="left"
                style="width: 100%;margin-bottom:10px;">
                <el-table-column
                prop="a"
                label="会员姓名">
                </el-table-column>
                <el-table-column
                prop="b"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="c"
                label="性别">
                </el-table-column>
              <el-table-column
                prop="d"
                label="年龄">
              </el-table-column>
                <el-table-column
                prop="e"
                label="零售单号">
                </el-table-column>
                <el-table-column
                prop="f"
                label="应回访类型">
                </el-table-column>
                <el-table-column
                prop="g"
                label="应回访方式">
                </el-table-column>
                <el-table-column
                prop="h"
                label="应回访日期">
                </el-table-column>
                <el-table-column
                label="状态">
                  <template slot-scope="scope">
                    <span class="am-ft-orange">{{scope.row.i}}</span>
                    <span class="am-ft-gray9" v-if="scope.row.i=='已回访'">{{scope.row.i}}</span>
                  </template>
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <span class="am-ft-blue"><a href="javascript:;">查看</a></span>
                        <span class="am-ft-blue mgl20"><a href="javascript:;">回访登记</a></span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next"
            :total="10">
            </el-pagination>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "member-return-visit",
        data() {
            return {
                showDiv:"2",
                options:[{
                  value: '选项1',
                  label: '黄金糕'
                }],
                value:"",
                data : []
            };
        },
        components:{
        },
        created: function() {
            for (var i = 0; i < 10; i++) {
              this.data.push({
                a : '张三',
                b : '15757179646',
                c : '男',
                d: '25',
                e: 'R0326632321',
                f: '生日回访',
                g: '电话回访',
                h: '2018-01-01',
                i: '待回访'
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
    span{
      margin-right: 5px;
    }
    .fn-left{
      margin-right: 10px;
    }
}

.member {
    display: inline-block;
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
