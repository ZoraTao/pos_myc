<template>
<div id="packageGoods">
    <!--body-content-->
    <div class="clearfix modal-content-center">
        <div class="modal-content-left packageGoodsBody">
            <div class="packageGoodsTop">
                <div class="relative">
                    <el-input style="width:270px" v-model="mymodel" placeholder="输入套餐价/套餐名／套餐编码" v-on:change="ModelChange()"></el-input>
                    <div class="GoodsTopPosition" v-if="searchContent">
                        <p>圣诞狂欢套餐 TC1230001  499</p>
                        <p>圣诞狂欢套餐 TC1230001  499</p>
                        <p>圣诞狂欢套餐 TC1230001  499</p>
                        <p>圣诞狂欢套餐 TC1230001  499</p>
                        <p>圣诞狂欢套餐 TC1230001  499</p>
                        <p>圣诞狂欢套餐 TC1230001  499</p>
                    </div>
                </div>
                <el-button>查询</el-button>
            </div>
            <div class="packageGoodsContent">
                <div class="pgCbody">
                    <div class="defaultContent" v-if="mymodel==''">
                        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/image_quesheng.png"/>
                        <p>请选择您想要的套餐</p>
                    </div>
                    <div class="fullContent">
                        <div class="packageDetail">
                            <div class="packageList" v-if="mymodel!=''&&mymodel!='419'">
                                <div class="packageItem">
                                    <p><i>￥</i>499</p>
                                    <h4>圣诞狂欢套餐</h4>
                                    <h5>TC1230001</h5>
                                    <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_taocan.png">
                                </div>
                                <div class="packageItem">
                                    <p><i>￥</i>499</p>
                                    <h4>圣诞狂欢套餐</h4>
                                    <h5>TC1230001</h5>
                                    <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_taocan.png">
                                </div>
                                <div class="packageItem">
                                    <p><i>￥</i>499</p>
                                    <h4>圣诞狂欢套餐</h4>
                                    <h5>TC1230001</h5>
                                    <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_taocan.png">
                                </div>
                                <div class="packageItem">
                                    <p><i>￥</i>499</p>
                                    <h4>圣诞狂欢套餐</h4>
                                    <h5>TC1230001</h5>
                                    <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_taocan.png">
                                </div>
                                <div class="packageItem">
                                    <p><i>￥</i>499</p>
                                    <h4>圣诞狂欢套餐</h4>
                                    <h5>TC1230001</h5>
                                    <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_taocan.png">
                                </div>
                                <div class="packageItem">
                                    <p><i>￥</i>499</p>
                                    <h4>圣诞狂欢套餐</h4>
                                    <h5>TC1230001</h5>
                                    <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_taocan.png">
                                </div>
                            </div>
                            <div class="packageDetailInfo" v-if="mymodel=='419'">
                                <div class="packageDetailTitle">
                                    <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_fanhui.png"/>
                                    <p>TC12340001  圣诞狂欢套餐   ￥419</p>
                                </div>
                                <div class="packageDetailContent">
                                        <el-table
                                        size="small"
                                        :data="data"
                                        style="width: 100%">
                                            <el-table-column
                                                prop="category"
                                                label="品类">
                                            </el-table-column>
                                            <el-table-column
                                                prop="brand"
                                                label="品牌">
                                            </el-table-column>
                                            <el-table-column
                                                prop="sellingPrice"
                                                label="零售限价">
                                            </el-table-column>
                                            <el-table-column
                                                prop="packagePrice"
                                                label="套餐价">
                                            </el-table-column>
                                            <el-table-column
                                                prop="displacement"
                                                label="置换限价">
                                            </el-table-column>
                                            <el-table-column
                                                prop="variety"
                                                label="品种"
                                                width="180">
                                                <template slot-scope="scope">
                                                    <el-select v-model="value" placeholder="请选择">
                                                        <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="commodity"
                                                label="商品"
                                                width="180">
                                                <template slot-scope="scope">
                                                    <el-select v-model="value" placeholder="请选择">
                                                        <el-option
                                                        v-for="item in options"
                                                        :key="item.value"
                                                        :label="item.label"
                                                        :value="item.value">
                                                        </el-option>
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                </div>
                            </div>
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
  name: 'PackageGoodsModal',
  data () {
    return { 
        mymodel:"",
        searchContent:false,        
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        value: '',
        data:[{
            commodity:'毛源昌1.551非球面防辐射辐射远+1.50',
            variety:'1.55绿膜防辐射远',
            displacement:'10.00',
            packagePrice:'134.00',
            sellingPrice:'230.00',
            brand:'毛源昌',
            category:'镜架'
        }]
    }
  },
  methods:{
      ModelChange:function(){
        if(this.mymodel.length>1){
            this.searchContent=true;
            this.$emit('showBottom')
            }
        if(this.mymodel.length==0){
            this.searchContent=false;
            this.$emit('hideBottom')
        }
      }
  }
}
</script>

<style lang="scss">
.packageGoods{
    .el-dialog__body {
        padding-bottom: 0;
        background: #efefef;
    }
    .el-tabs--border-card{
        border:none !important;
    }
    .el-tabs--border-card>.el-tabs__header {
        background-color: #efefef;
        padding-left: 10px;
    }
    .el-tabs__item{
        font-size: 12px;
    }
    .el-tabs__item.is-active{
        color: #00AFE4 !important;
        background: #fff !important;
    }
    .el-table th {
        background: #fff !important;
    }
    #packageGoods{
        .packageGoodsBody{
            .packageGoodsTop{
                height: 84px;
                line-height: 84px;
                text-align: center;
                position: relative;
                background: #fff;
                button{
                    width: 96px;
                    height: 30px;
                    margin-left: 20px;
                    border: 1px solid #00AFE4;
                    border-radius: 4px;
                    color: #00AFE4;
                }
                .relative{
                    position: relative;
                    display: inline-block;
                }
                .GoodsTopPosition{
                    position: absolute;
                    top: 60px;
                    left: 0;
                    background: #FFFFFF;
                    border: 1px solid #E1E1E1;
                    box-shadow: 0 0 4px 0 rgba(204, 204, 204, 0.5);
                    min-width: 270px;
                    z-index: 999;
                    p{
                        height: 36px;
                        line-height: 36px;
                        font-size: 13px;
                        color: #333333;
                        &:hover{
                            background: #E8F6FC;
                        }
                    }
                }
            }
            .packageGoodsContent{
                padding: 6px;
                background: #EFEFEF;
                // min-height: 400px;
                .pgCbody{
                    .defaultContent{
                        background: #fff;
                        padding: 100px;
                        text-align: center;
                        p{
                            font-size: 14px;
                            color: #888888;
                            letter-spacing: 0.51px;
                            margin-left: -5px;
                            margin-top: 30px;
                        }
                    }
                    .packageList{
                        overflow: hidden;
                        .packageItem{
                            background: #FFF;
                            position: relative;
                            width: 24%;
                            padding: 8px;
                            text-align: center;
                            height: 111px;
                            margin: 1% 0.5%;
                            float: left;
                            p{
                                font-size: 36px;
                                color: #333333;
                                margin-top: 10px;
                                i{
                                    font-size: 20px;
                                    color: #888888;
                                    font-style: normal;
                                }
                            }
                            h4{
                                font-size: 16px;
                                color: #888888;
                                margin-top: 5px;
                                font-weight: 400;
                            }
                            h5{
                                font-size: 12px;
                                color: #888888;
                                font-weight: 400;
                            }
                            img{
                                max-width: 50px;
                                max-height: 50px;
                                width: 25%;
                                position: absolute;
                                left: 0;
                                bottom: 0;
                            }
                            &:nth-child(n+5){
                                margin-top: 2px;
                            }
                        }
                    }
                    .packageDetailInfo{
                        overflow: hidden;
                        background: #fff;
                        padding: 10px;
                        .packageDetailTitle{
                            overflow: hidden;
                            margin-bottom: 10px;
                            height: 25px;
                            line-height: 25px;
                            img{
                                float: left;
                                height: 13px;
                                display: inline-block;
                                margin-top: 6px;
                            }
                            p{
                                float: left;
                                font-size: 14px;
                                color: #333333;
                                font-weight: bold;
                                margin-left: 10px;
                            }
                        }
                    }
                    .packageDetailButtonGroup{
                        padding: 10px 15px;
                        height: 64px;
                        line-height: 44px;
                        font-size: 12px;
                        color: #666666;
                        button{
                            width: 90px;
                            height: 30px;
                            line-height: 30px;
                            margin-left: 10px;
                            margin-top:10px;
                        }
                    }
                }
            }
        }
    }
}
</style>
