<template>
<div class="optometry_list content_box flexH100">
    <div class="optometry_list_top am-bg-white" v-show="memberDet==''||memberDet==undefined">

        <div class="fn-left mgt4">
            <span class="member">会员:</span>
            <el-input class="" v-model="memberInfo" @keyup.enter.native="getOrderList" placeholder="卡号/姓名/手机号"></el-input>
        </div>
        <div class="fn-left mgt4 mgl20" v-show="Object.keys(detailData).length>0">
            <span class="member">验光师:</span>
            <el-select style="width:90px" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>

        <div class="fn-left mgt4 mgl30" @click="getOrderList">
            <button class="col_blue_bg_white find_btn" >
                查询
            </button>
        </div>

        <div class="fn-right ">
            <button class="add_btn bg_white_col_blue" @click="showNewOptometry=true">
                + 新增验光单
            </button>
        </div>

    </div>
    <div class="optometry_content optometry_content" style="min-height:500px;">
        <!--查询之前-->
        <div v-show="listData.length==0">
            <ul class="find_before">
                <li class="optometry_qs_img">
                    <img src="http://myc-oms.oss-cn-hangzhou.aliyuncs.com/img%2Foptometry_qs.png" />
                </li>
                <li class="optometry_qs_text">
                    {{noSearchText}}
                </li>
                <!-- <li class="optometry_qs_text">
                    未查询到验光单
                </li> -->
                <li>
                <button class="add_btn bg_white_col_blue" v-show="memberDet==''||memberDet==undefined" @click="showNewOptometry=true">
                + 新增验光单
              </button>
                </li>
            </ul>
        </div>
        <!--验光列表-->
        <div v-show="listData.length>1&&detailData.length==0">
            <div class="list_name">验光列表(23)</div>
            <el-table
                :data="listData"
                stripe
                size="small"
                align="left"
                style="width: 100%;margin-bottom:10px;">
                <el-table-column
                prop="memberId"
                label="会员ID"
                width="180">
                </el-table-column>
                <el-table-column
                prop="memberName"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="mobile"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="prescriptionTime"
                label="验光时间">
                </el-table-column>
                <el-table-column
                prop="optometrist"
                label="验光师">
                </el-table-column>
                <el-table-column
                prop="source"
                label="来源">
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <span class="am-ft-blue" @click="getMemberDetail(scope.row.prescriptionId,scope.row.memberId)"><a>查看详情</a></span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next"
            :page-size="15"
            :total="count"
            @current-change="getOrderList"
            :current-page.sync="nub">
            </el-pagination>
        </div>
        <!--验光单一条数据详情-->
        <optometryOrderCu :memberDet="memberDet" :memberInfo="detailData" :eyes="eyesData" v-if="Object.keys(detailData).length>0"></optometryOrderCu>
    </div>
    <el-dialog class="newOptometry" title="新增验光单" :visible.sync="showNewOptometry" width="950px">
        <NewOptometryModal :submit="submitNewOptometry" v-on:getNewoptometry="getNewoptometry"></NewOptometryModal>
        <div class="packageDetailButtonGroup">
            <el-button @click="showNewOptometry = false">取 消</el-button>
            <el-button type="primary" @click="submitNewOptometry=true">保 存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import RegTest from '../../../../utils/Reg'
import optometryOrderCu from '../optometryOrderCu/optometry-order-cu.vue'
import NewOptometryModal from '../../../PublicModal/NewOptometry/new-optometry-modal.vue'
    export default {
        name: "optometryOrderList",
        props: ['memberDet', 'memberInfos'],
        data() {
            return {
                submitNewOptometry:false,
                showDiv:"2",
                memberInfo:"",
                listData : [],
                showNewOptometry:false,
                noSearchText:"输入会员信息查询验光单",
                listUrl:"http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptionsList",
                deatilUrl:"http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptions",
                detailData:[],
                eyesData:[],
                options: [],
                value: '',
                count: 0,
                nub: 1,
                size: 15,

            };
        },
        components:{
            optometryOrderCu,
            NewOptometryModal
        },
        created: function() {
            // console.log(this.memberDet)
            if(this.memberDet=='detail'){
                this.memberInfo=this.memberInfos.telphone;
                const isFirst = true;
                this.getOrderList(isFirst);
            }
        },
        methods:{
            getOrderList(isFirst) {
                if(isFirst){
                    this.noSearchText="输入会员信息查询验光单"
                }else{
                    if(this.memberInfo!=""){
                        this.noSearchText="未查询到验光单"
                    }
                }
                    this.detailData=[];
                    var that = this;
                    setTimeout(function() {
                    that.$axios({
                        url: that.listUrl,
                        method: 'post',
                        params: {
                            jsonObject: {
                                seachKey:that.memberInfo,
                                nub: (that.nub==1?0:(that.nub-1)*that.size),
                                size: that.size
                            },
                            keyParams: {
                                weChat: true,
                                userId: JSON.parse(localStorage.getItem("userData")).userId,
                                orgId: JSON.parse(localStorage.getItem("userData")).orgId,
                            }
                        }
                    })
                    .then(function (response) {
                        if(response.data.data.list.length>1){
                            that.listData=response.data.data.list;
                            that.count=response.data.data.count;
                        }else if(response.data.data.list.length==1){
                            that.getMemberDetail(response.data.data.list[0].prescriptionId);
                        }else if(response.data.data.list.length==0){
                            that.listData=response.data.data.list;
                            that.count=response.data.data.count;
                            that.noSearchText="未查询到验光单"
                        }
                    })
                }, 0);
            },
            getMemberDetail(id,memberId) {
                var that = this;
                that.$axios({
                    url: this.deatilUrl,
                    method: 'post',
                    params: {
                        jsonObject: {
                            prescriptionId: id,
                        },
                        keyParams: {
                            weChat: true,
                            userId: JSON.parse(localStorage.getItem("userData")).userId,
                            orgId: JSON.parse(localStorage.getItem("userData")).orgId,
                        }
                    }
                })
                .then(function (response) {
                    that.detailData=response.data.data.prescriptions;
                    that.eyesData=response.data.data.eyes;
                    if(that.memberDet!='detail'){
                        that.$router.push({
                            path: '/bills/optometryOrderCu',
                            name: 'optometryOrderCu',
                            params: {
                                data:
                                {
                                    memberId:memberId,
                                }
                            }
                        });
                    }
                })
            },
            getNewoptometry(){
                this.showNewOptometry=false;
                this.getOrderList();
            }
        }
    };
</script>

<style lang="scss">
@import "../../../../reset";
.optometry_list{
    .content_box{
        flex-direction: column !important;
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
        height: 100%;
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
}
</style>
