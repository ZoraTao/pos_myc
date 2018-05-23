<template>
<div id="endorsement" class="clearfix modal-content-center" v-loading="!list">
    <div class="modalContent endorsementContent">
        <div class="endorsementItem">
            <!-- <div class="endorsementItemLeft">
                <div class="">
                    <b>张丽丽</b>
                    <p>共3件商品 <span>合计:<b>1125.00</b></span></p>
                </div>
                <div class="">
                    <a>0006262626</a>
                    <p>创建人：张三 <span>2017-12-11 16:40</span></p>
                </div>
            </div>
            <div class="endorsementItemRight">
                <span class="am-ft-success">签批通过</span>
                <p>张三  2017-12-23 10:20:23 审批</p>
                <b>整单折扣: 8折</b>
            </div> -->
           <p v-show="list == null||list.length == 0" 
           style="text-align:center;color:#dcdcdc;padding-top:100px;">暂无数据</p> 
        </div>
    </div>
    <el-pagination
      background
      class="am-ft-right mgt10"
      layout=" prev, pager, next"
      :page-size="4"
      :total="Number(count)"
      @current-change="requestOrder"
      :current-page.sync="nub">
    </el-pagination>
</div>
</template>

<script>

export default {
  name: 'EndorsementModal',
  data () {
    return { 
        nub:1,
        size:4,
        count:0,
        list:null,
    }
  },
  methods:{
      requestOrder(){
          const _this = this;
          _this.$myAjax({
              url:'pos-api/orderTemp/getOrderTempList',
              data:{
                nub: (_this.nub - 1) * _this.size,
                  size:5,
                  status:'1,2',
                  salesId:JSON.parse(sessionStorage.getItem("userData")).userId
              },success:function(res){
                    _this.count = res.data.count;
                    _this.list = res.data.orderTempList;
              },error:function(err){
                  console.log(err)
              }
          })
      }
  },
  created(){

  }
}
</script>

<style lang="scss" scope>
.endorsement{
    .el-dialog__body {
        padding: 0;
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

    #endorsement{
        .modal-content{
            width: 550px;
            margin: 0 auto;
        }
        .endorsementContent{
            padding: 5px 30px;
            overflow: hidden;
        height: 413px !important;
            background: #fff;
            .endorsementItem{
                .am-ft-success{
                    color: #2FCC8F;
                }
                .am-ft-warn{
                    color: #FF9400;
                }
                .am-ft-error{
                    color: #F86161;
                }
                overflow: hidden;
                padding: 14px;
                line-height: 24px;
                .endorsementItemLeft{
                    min-width: 280px;
                    float: left;
                    div{
                        overflow: hidden;
                        b{
                            float: left;
                            font-size: 14px;
                            color: #333333;
                        }
                        a{
                            float: left;
                            color: #666;
                        }
                        p{
                            float: right;
                            font-size: 12px;
                            color: #666666;
                            b{
                                float: initial;
                                color: #000;
                                font-size: 13px;
                                margin-left: 1px;
                            }
                            span{
                                color: #999;
                                margin-left: 8px;
                            }
                        }
                    }
                }
                .endorsementItemRight{
                    float: right;
                    min-width: 160px;
                    span{

                    }
                    p{
                        color: #999999;
                    }
                    b{
                        font-weight: 400;
                        color: #333333;
                        display: inline-block;
                        width: 100%;
                    }
                }
                &:not(:last-child){
                    border-bottom: 1px solid #EFEFEF;
                }
            }
        }
    }
}
</style>
