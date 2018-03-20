<template>
<!------ Header top ------>
<div class="navContent">
    <div class="navTab">
        <ul>
            <li v-for="item in menu" :class="{'activeNav':item.isActived}" v-on:click="changeRoute(item)">
                <span><img class="tabImg" :src="item.isActived?item.imgSrc:item.wimgSrc"/></span>
                <p>{{item.name}}</p>
                <img class="lineImg" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/line.png">
            </li>
        </ul>
    </div>
    <div class="navLogo">
        <div class="logoText">
            <p>眼镜新零售综合业务管理平台</p>
            <span>-[     <i>测试版</i>      ]-</span>
        </div>
        <div class="logoImg">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/logo1.png" />
        </div>
    </div>
</div>
  <!------ /Header top ------>

</template>

<script>
export default {
  name: 'LayoutNav',
  data () {
    return { 
        menu:[{
    'name': '首页',
    'url': '/myc/home',
    'imgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_shouye.png',
    'wimgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_shouye1.png',
    'isActived': true
  }, {
    'name': '零售管理',
    'url': '/myc/retail',
    'imgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_lingshougl.png',
    'wimgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_lingshougl1.png',
    'isActived': false
  }, {
    'name': '会员管理',
    'url': '/myc/otherA',
    'imgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_huiyuangl.png',
    'wimgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_huiyuangl1.png',
    'isActived': false
  }, {
    'name': '商品库存',
    'url': '',
    'imgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_shangpinkc.png',
    'wimgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_shangpinkc1.png',
    'isActived': false
  }, {
    'name': '统计报表',
    'url': '',
    'imgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_tongjibb.png',
    'wimgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_tongjibb1.png',
    'isActived': false
  }, {
    'name': '文件管理',
    'url': '',
    'imgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_wenjiangl.png',
    'wimgSrc': 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_wenjiangl1.png',
    'isActived': false
  }]
    }
  }
}
</script>

<style scoped lang="scss">
.navContent{
    height: 127px;
    background: linear-gradient(-180deg, #00CFF1 0%, #00A2DE 100%);
    background-image: url('http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/head_bg.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    .navTab{
        flex:3;
        height: 78px;
        margin-top: 32px;
        ul{
            width: 100%;
            height: 100%;
            overflow: hidden;
            display: flex;
            align-items: center;
            text-align: center;
            margin-left: 36px;
            li{
                width: 95px;
                height: 78px;
                font-size: 14px;
                color: #FFFFFF;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                text-align: center;
                position: relative;
                margin-right: 60px;
                &:first-child{
                    background: none;
                }
                span{
                    display: inline-block;
                }
                .lineImg{
                    width: 2px;
                    height: 100%;
                    position: absolute;
                    right: -30px;
                    top: 0;
                }
            }
        }
    }
    .navLogo{
        flex:2;
        height: 78px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        align-self: center;
        .logoText{
            flex: 4;
            font-size: 26px;
            color: #385167;
            font-weight: 700;
            float: left;
            text-align: right;
            padding-right: 26px;
            p{
                white-space: nowrap;
            }
            i{
                font-weight: 400;
                font-size: 20px;
                color: #B2F2FF;
                font-style: normal;
            }
        }
        .logoImg{
            flex: 1;
            float: left;
            text-align: left;
        }
    }
}
.activeNav{
    background: #fff !important;
}
.activeNav li{
    max-width: 78px;
}
.activeNav p{
    color: #00A2DE;
}
@media only screen and (max-width: 1450px) {
    .navTab{
        ul{
            transition: .3s all;
            li{
                width: 95px;
                height: 78px;
                margin-right: 30px !important;
                transition: .3s all;
                .lineImg{
                    right: -15px !important;
                    transition: .3s all;
                }
            }
        }
    }				
}
</style>
