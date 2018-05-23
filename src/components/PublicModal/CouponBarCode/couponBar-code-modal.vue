<template>
<div id="CouponBarCode" v-if="conponContent!==null">
    <!--body-content-->
    <div class="clearfix">
        <div class="CouponBarContent">
            <div class="CouponBarBox">
                <h4>优惠券条码</h4>
                <div class="CouponBarCode">
                    <el-button type="primary">
                        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_saoyisao.png">
                    </el-button>
                    <el-input placeholder="" v-model="searchConponId" @keyup.enter.native="searchConpon(searchConponId)" ></el-input>
                </div>
                <div class="CouponBarCard">
                    <p class="memberInfo"><span>会员</span>有{{conponContent.userCouponCount}}张优惠券可用：</p>
                    <div class="CouponBarItemBox" v-for="item in conponContent.canUserCoupon" :key="item.couponNo">
                        <div class="CouponBarItem blueStatus" :style="{'background-color':item.colorValue,'border-color':item.colorValue}">
                            <div class="cardConstBox">
                                <div class="cardConst">
                                    <p v-show="item.couponModality == '0'">{{parseFloat(item.discount)}}折</p>
                                    <p v-show="item.couponModality == '1'"><span>¥</span>{{parseFloat(item.amount)}}</p>
                                </div>
                                <div class="cardInfo">
                                    <div class="cardInfoBox">
                                        <p>{{item.couponName}}</p>
                                        <span v-if="item.fullAmount>0">满{{item.fullAmount}}使用</span>
                                        <span v-else>无门槛</span>
                                    </div>
                                </div>
                            </div>
                            <div class="CouponBarTime" style="background:rgba(0,0,0,0.1);">
                                <p>{{item.activeTime.substring(0,16)}} 至 {{item.lapsedTime.substring(0,16)}}</p>
                            </div>
                            <div class="whiteBox"></div>
                        </div>
                        <div class="userThisCard">
                            <span @click="receive(item)">使用</span>
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
        searchConponId:'',
        conponContent:null,
    }
  },
  props:{
      conponData:{
          type:Object,
          default:null
      },
      memberMessage:{
          type:Object,
          default:null
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
        },
        receive(value){
            // console.log(value);
            this.$emit('receiveconpon',value)
        },
        // 查找优惠券
            searchConpon(id){
                let _this = this;
                let memberCardNo=_this.memberMessage.memberCardNo;
                _this.$axios({
                    url:'http://myc.qineasy.cn/coupon-api/newCouponMsg/getMyAllCoupon',
                    method:'post',
                    params:{
                        jsonObject:{
                        memberCardNo:memberCardNo,//会员卡号
                        // orgScope:'',//适用门店编号
                        // couponMsgId:'',//优惠券信息Id
                        couponNo:id,//优惠券编号
                        // fullAmount:'',//满额条件 0没有门槛
                        // couponState:'',//卡券状态
                        // activeTime:'',//当天时间，是否当天可用
                        // nub:'',//分页起始位
                        // size:'',//每页条数
                        },
                    keyParams: {
                        weChat: true
                    }
                }
                })
                .then(function(res){
                    if(res.data.code == 1){
                        console.log(res.data.data)
                        _this.conponContent = res.data.data;
                    }else{
                         _this.$message({
                                showClose: true,
                                message: '请求数据出问题喽，请重试！',
                                type: 'error'
                            })
                    }

                }).catch(function(err){
                    _this.$message({
                                showClose: true,
                                message: '请求数据出问题喽，请重试！',
                                type: 'error'
                            })
                })
            },
  },
  mounted(){
      this.conponContent = this.conponData;
      console.log(this.conponData)
    //   console.log(1111,this.conponData)
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
                        width: 280px;
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
                        width: 290px;
                        overflow: hidden;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .CouponBarItem{
                            position: relative;
                            border-width: 1px;
                            border-style: solid;
                            color: #fff;
                            width: 280px;
                            float: left;
                            .cardConstBox{
                                height: 54px;
                                overflow: hidden;
                                display: flex;
                                align-items: center;
                                .cardConst{
                                    width: 83px;
                                    float: left;
                                    font-weight: 300;
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
                                        p{
                                        font-family: MicrosoftYaHei;
                                        font-size: 14px;
                                        color: #FFFFFF;
                                    }
                                        span{
                                            font-family: MicrosoftYaHei;
                                            font-size: 10px;
                                            color: #FFFFFF;
                                        }
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
                                white-space: nowrap;
                                p{
                                    font-family: MicrosoftYaHei;
                                    font-size: 12px;
                                    color: #FFFFFF;
                                }

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
