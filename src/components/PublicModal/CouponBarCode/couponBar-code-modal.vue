<template>
<div id="CouponBarCode">
    <!--body-content-->
    <div class="clearfix">
        <div class="CouponBarContent">
            <div class="CouponBarBox">
                <h4>优惠券条码</h4>
                <div class="CouponBarCode">
                    <el-button type="primary">
                        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_saoyisao.png">
                    </el-button>
                    <el-input placeholder=""></el-input>
                </div>
                <div class="CouponBarCard">
                    <p class="memberInfo"><span>张丽丽</span>有3张优惠券可用：</p>
                    <div class="CouponBarItemBox">
                        <div class="CouponBarItem blueStatus">
                            <div class="cardConstBox">
                                <div class="cardConst">
                                    <p><span>¥</span>100</p>
                                </div>
                                <div class="cardInfo">
                                    <div class="cardInfoBox">
                                        <p>新品优惠券</p>
                                        <span>满1000使用</span>
                                    </div>
                                </div>
                            </div>
                            <div class="CouponBarTime">
                                <p>2016-07-10  00:00 至 2016-07-16  24:00</p>
                            </div>
                            <div class="whiteBox"></div>
                        </div>    
                        <div class="userThisCard">
                            <span>使用</span>
                        </div>                                    
                    </div>
                    <div class="CouponBarItemBox">
                        <div class="CouponBarItem greenStatus">
                            <div class="cardConstBox">
                                <div class="cardConst">
                                    <p><span>¥</span>100</p>
                                </div>
                                <div class="cardInfo">
                                    <div class="cardInfoBox">
                                        <p>新品优惠券</p>
                                        <span>满1000使用</span>
                                    </div>
                                </div>
                            </div>
                            <div class="CouponBarTime">
                                <p>2016-07-10  00:00 至 2016-07-16  24:00</p>
                            </div>
                            <div class="whiteBox"></div>
                        </div>   
                        <div class="userThisCard">
                            <span>使用</span>
                        </div>                                            
                    </div>    
                    <div class="CouponBarItemBox">
                        <div class="CouponBarItem yellowStatus">
                            <div class="cardConstBox">
                                <div class="cardConst">
                                    <p><span>¥</span>100</p>
                                </div>
                                <div class="cardInfo">
                                    <div class="cardInfoBox">
                                        <p>新品优惠券</p>
                                        <span>满1000使用</span>
                                    </div>
                                </div>
                            </div>
                            <div class="CouponBarTime">
                                <p>2016-07-10  00:00 至 2016-07-16  24:00</p>
                            </div>
                            <div class="whiteBox"></div>
                        </div>  
                        <div class="userThisCard">
                            <span>使用</span>
                        </div>                                              
                    </div>                                                                    
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'CouponBarCodeModal',
  data () {
    return { 

    }
  },
  methods:{
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 3 === 0) {
                    return {
                        rowspan: 3,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
  }
}
</script>

<style lang="scss">
.CouponBarCode{
    .el-dialog__header{
        background: #fff;
    }
    .el-dialog__header .el-dialog__headerbtn i {
        color: #909399; 
    }
    .el-dialog__body {
        padding: 0 10px !important;
    }
    .el-checkbox__label {
        font-size: 12px;
    }
    .el-table th {
        background: #fff !important;
    }
    label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: 700;
    }

    #CouponBarCode{
        .modal-dialog{
            width: 360px !important;
            min-width: auto !important;
            .modalContent{
                width: 360px;
                min-height: 180px;
                background: #fff;
                overflow: hidden;
            }
        }
        .CouponBarContent{
            text-align: center;
            button[aria-label='Close']{
                position: absolute;
                right: 5px;
                top: 0;
                overflow: hidden;
                z-index: 9999;
            }
            .CouponBarBox{
                display: flex;
                justify-content: center;
                align-self: center;
                flex-direction: column;
                width: 100%;
                min-height: 100%;
                .CouponBarCard{
                    .memberInfo{
                        height: auto;
                        font-size: 13px;
                        color: #666666;
                        width: 230px;
                        margin: 0 auto;
                        text-align: left;
                        margin-top: 24px;
                        margin-bottom: 10px;
                        span{
                            font-weight: bold;
                        }
                    }
                    .CouponBarItemBox{
                        margin: 0 auto;
                        margin-bottom: 8px;
                        overflow: hidden;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .CouponBarItem{
                            position: relative;
                            border-width: 1px;
                            border-style: solid;
                            color: #fff;
                            width: 220px;
                            float: left;
                            .cardConstBox{
                                height: 54px;
                                overflow: hidden;
                                display: flex;
                                align-items: center;
                                .cardConst{
                                    width: 83px;
                                    float: left;
                                    p{
                                        font-size: 30px;
                                        span{
                                            font-size: 12px;
                                        }
                                    }
                                }
                                .cardInfo{
                                    width: 164px;
                                    float: left;
                                    line-height: 20px;
                                    border-left: 1px solid #FFFFFF40;
                                    .cardInfoBox{
                                        text-align: left;
                                        margin-left: 5px;
                                        overflow: hidden;
                                    }
                                }
                            }
                        }
                        .userThisCard{
                            width: 30px;
                            float: left;
                            font-size: 10px;
                            color: #00AFE4;
                            margin-left: 10px;
                        }
                        .blueStatus{
                            border-color: #8EC5DA;
                            background: #8EC5DA;
                            .CouponBarTime{
                                background: #7DB6CB;
                                height: 24px;
                                line-height: 24px;
                            }
                        }
                        .greenStatus{
                            border-color: #97CF74;
                            background: #97CF74;
                            .CouponBarTime{
                                background: #88C065;
                                height: 24px;
                                line-height: 24px;
                            }
                        }
                        .yellowStatus{
                            border-color: #fac979;
                            background: #fac979;
                            .CouponBarTime{
                                background: #edbb69;
                                height: 24px;
                                line-height: 24px;
                            }
                        }
                        .whiteBox{
                            position: absolute;
                            right: 0;
                            top: 0;
                            width: 0;
                            height: 0;
                            border-top: 20px solid #fff;
                            border-left: 25px solid transparent;
                        }
                        &:last-child{
                            margin-bottom: 41px;
                        }
                    }
                }
            }
            h4{
                font-size: 16px;
                color: #666666;
                margin-bottom: 12px;
                font-weight: bold;
            }
            .CouponBarCode{
                width: 230px;
                margin: 0 auto;
                .el-input{
                    margin: 0 10px;
                }
                button{
                    margin: 0;
                    padding: 0 7px;
                    background: #00AFE4;
                    border: none;
                    border-radius: 2px;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    img{
                        width: 100%;
                        vertical-align: middle;
                    }
                }
            }
        }
    }
}
</style>
