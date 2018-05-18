<template>
<div class="content_box flexH100">
    <div class="optometry_list_top">
        <div class="fn-left">
            <p class="member">有<span class="am-ft-151515">4</span>个资质即将到期</p>
        </div>     
        <div class="fn-right ">
            <el-select class="blueSelect" size="mini" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </div>
    </div>
    <div id="getBills">
        <!--body-content-->
        <div class="clearfix">
            <div v-bind:class="{ getBillsContent: value==1, getBillsContent1: value==2 }">
                <div class="getBillsItem">
                    <div class="memberBillInfo">
                        <div class="tabImgLeft">
                            <img src="">
                        </div>
                        <div class="tabTextLeft">
                            <div>
                                <p>资质名称</p>
                                <h6><i>到期时间：</i>
                                    <span>2017-03-24</span>
                                    <span class="fn-right" v-show="value==2">还有<b class="am-ft-F58B8B">6</b>天</span>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="getBillButton" v-show="value==1">
                        <span>还有<b class="am-ft-F58B8B">6</b>天</span>
                    </div>
                </div>
                <div class="getBillsItem">
                    <div class="memberBillInfo">
                        <div class="tabImgLeft">
                            <img src="">
                        </div>
                        <div class="tabTextLeft">
                            <div>
                                <p>资质名称</p>
                                <h6><i>到期时间：</i>
                                    <span>2017-03-24</span>
                                    <span class="fn-right" v-show="value==2">还有<b class="am-ft-F58B8B">6</b>天</span>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="getBillButton" v-show="value==1">
                        <span>还有<b class="am-ft-F58B8B">6</b>天</span>
                    </div>
                </div>   
                <div class="getBillsItem">
                    <div class="memberBillInfo">
                        <div class="tabImgLeft">
                            <img src="">
                        </div>
                        <div class="tabTextLeft">
                            <div>
                                <p>资质名称</p>
                                <h6><i>到期时间：</i>
                                    <span>2017-03-24</span>
                                    <span class="fn-right" v-show="value==2">还有<b class="am-ft-F58B8B">6</b>天</span>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="getBillButton" v-show="value==1">
                        <span>还有<b class="am-ft-F58B8B">6</b>天</span>
                    </div>
                </div>   
                <div class="getBillsItem">
                    <div class="memberBillInfo">
                        <div class="tabImgLeft">
                            <img src="">
                        </div>
                        <div class="tabTextLeft">
                            <div>
                                <p>资质名称</p>
                                <h6><i>到期时间：</i>
                                    <span>2017-03-24</span>
                                    <span class="fn-right" v-show="value==2">还有<b class="am-ft-F58B8B">6</b>天</span>
                                </h6>
                            </div>
                        </div>
                    </div>
                    <div class="getBillButton" v-show="value==1">
                        <span>还有<b class="am-ft-F58B8B">6</b>天</span>
                    </div>
                </div>                
            </div>
        </div>
    </div>
</div>
</template>

<script>
    export default {
        name: "aptitudeDue",
        data() {
            return {
                options: [{
                    value: "1",
                    label: "小图模式"
                }, {
                    value: "2",
                    label: "大图模式"
                }],
                value: "1",
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../reset";
    .content_box{
        background: #fff;
    }
    .optometry_list_top {
        height: 42px;
        line-height: 42px;
        margin: 0 20px;
        border-bottom: 1px solid #EFEFEF;
        overflow: hidden;
    }
    
    .member {
        display: inline-block;
        font-size: 14px;
        line-height: 30px;
    }

    .am-ft-151515{
        color: #151515;
    }

    .blueSelect{
        width: 100px;
        color: #00afe4;
    }
    #getBills{
        .getBillsContent1{
            overflow: hidden;
            padding: 2px 20px;
            .getBillsItem{
                width: calc(100% / 3);
                min-width: 250px;
                float: left;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #EFEFEF;
                .memberBillInfo{
                    width: calc(100% - 40px);
                    min-width: 250px;
                    float: left;
                    padding: 15px 20px;
                    .tabImgLeft{
                        width: 100%;
                        float: left;
                        img{
                            height: 210px;
                            width: 210px;
                            object-fit: cover;
                        }
                    }
                    .tabTextLeft{
                        width: 100%;
                        text-align: left;
                        width: 210px;
                        margin: 0 auto;
                        div{
                            line-height: 24.5px;
                            p{
                                font-size: 16px;
                                color: #333333;
                            }
                            h6{
                                font-size: 12px;
                                color: #999999;
                                i{
                                    vertical-align: text-top;
                                }
                                span{
                                    vertical-align: text-top;
                                    color: #666666;
                                    b{
                                        font-size: 24px;
                                    }
                                }
                            }
                        }
                    }
                }
                &:hover{
                    background: #E8F6FC;
                }
            }
        }
        .getBillsContent{
            padding: 2px 20px;
            .getBillsItem{
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                border-bottom: 1px solid #EFEFEF;
                .memberBillInfo{
                    width: calc(100% - 80px);
                    float: left;
                    padding: 12px 0 12px 24px;
                    .tabImgLeft{
                        height: 85px;
                        float: left;
                        img{
                            width: 85px;
                            height: 85px;
                            object-fit: cover;
                        }
                    }
                    .tabTextLeft{
                        margin-left: 10px;
                        height: 85px;
                        float: left;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        div{
                            height: 42.5px;
                            line-height: 24.5px;
                            p{
                                font-size: 16px;
                                color: #333333;
                            }
                            h6{
                                font-size: 12px;
                                color: #999999;
                                span{
                                    color: #666666;
                                }
                            }
                        }
                    }
                }
                .getBillButton{
                    width: 80px;
                    float: left;
                    text-align: center;
                    font-size: 12px;
                    color: #666666;
                    b{
                        font-size: 24px;
                        color: #333;
                        font-weight: 400;
                    }
                }
                &:hover{
                    background: #E8F6FC;
                }
            }
        }
    }
    .am-ft-F58B8B {
        color: #f58b8b !important;
    }
</style>