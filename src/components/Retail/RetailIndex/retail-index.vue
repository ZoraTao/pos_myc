<template>
  <div class="inner-index-box">
    <!--banner-->
    <div class="member-banner">
      <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/banner.png"/>
    </div>
    <!--content-->
    <div class="member-menus">
      <el-row>
        <el-col class="member-menus-items"  v-for="(item, index) in icons" :key="item.text">
          <div class="member-item" @click="createTab(index,item)" >
            <img :src="item.src"/>
            <span>{{item.text}}</span>
          </div>
        </el-col>
      </el-row>
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
            'text':'验光单',
            'name': 'optometryOrderList'
            },
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_kaidan.png',
            'link':'/bills/billing',
            'line':true,
            'text':'开单',
            'name': 'billing'
            },
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_shouyin.png',
            'link':'/cashier/cashierList',
            'line':true,
            'text':'收银',
            'name': 'cashierList'
            },
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_mendianshoufa.png',
            'link':'/receive/receiveList',
            'line':true,
            'text':'门店收发',
            'name': 'receiveList'
            },
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_kehuqujian.png',
            'link':'/pickup/pickuplist',
            'line':true,
            'text':'客户取件',
            'name': 'pickuplist'
            },
            {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_shouhou.png',
            'link':'/serviceafter/serviceafterlist',
            'line':false,
            'text':'售后',
            'name': 'serviceafterlist'
            }
        ]
    }
  },
  methods:{
    //为追加tab传值
    createTab(key,label) {
      this.$router.push(label.link);
      this.$bus.$emit('createTab', label);
    }
  }
}
</script>

<style scoped lang="scss">
  .member-menus{
    .member-menus-items{
      width: calc(100% / 6);
    }
  }
</style>
