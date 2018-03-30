<template>
<div class="flexH100">
    <div class="homeImg">
        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/banner.png" />
    </div>
    <div class="retailContent">
        <ul class="small_icon">
            <li v-for="(item, index) of icons" :key="item.text"  @click="createTab(index,item)">
                <div class="fn_left w_50 linkSrc">
                    <img :src="item.src" />
                    <p class="icon_text">{{item.text}}</p>
                </div>
                <div class=" fn_left w_50  line_p" v-show="item.line">
                    <div class="line"></div>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
        icons:[
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_yanguangdan.png',
            'link':'/bills/optometryOrderList',
            'line':true,
            'text':'验光单'
            },
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_kaidan.png',
            'link':'/bills/billing',
            'line':true,
            'text':'开单'
            },
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_shouyin.png',
            'link':'/cashier/cashierList',
            'line':true,
            'text':'收银'
            },
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_mendianshoufa.png',
            'link':'/receive/receiveList',
            'line':true,
            'text':'门店收发'
            },
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_kehuqujian.png',
            'link':'/pickup/pickuplist',
            'line':true,
            'text':'客户取件'
            },
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_shouhou.png',
            'link':'/serviceafter/serviceafterlist',
            'line':false,
            'text':'售后'
            }
        ]
    }
  },
  methods:{
    createTab(key,label) {
      this.$router.push(label.link);
      this.$bus.$emit('createTab', label);
    }
  }
}
</script>

<style scoped lang="scss">
.homeImg {
    flex: 68;
    max-height: 279px;
    overflow: hidden;
}

.homeImg img {
    width: 100%;
    max-height: 279px;
}

.retailContent {
    flex: 100;
    width: 100%;
    margin: 10px 0;
    font-size: 14px;
    overflow: hidden;
    background: #fff;
}

.small_icon {
    width: 100%;
    height: 100%;
    padding: 80px 100px;
    margin-left: 33px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.small_icon li {
    flex: 1;
    position: relative;
}

.small_icon li img {
    width: 100%
}

.w_50 {
    width: 50%;
}

.min_w100{
    min-width: 100px;
}

.line_p {
    width: 50%;
    padding: 0 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
}

.icon_text {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #333333;
    line-height: 30px;
    text-align: center;
    margin-top: 10px;
}

.line {
    width: 100%;
    height: 30px;
    border-top: 2px solid #EFEFEF;
}

.linkSrc {
    cursor: pointer;
}
</style>
