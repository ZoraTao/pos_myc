<template>
  <div class="inner-index-box">
    <!--banner-->
    <div class="member-banner">
      <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/huiyuan_banner.png"/>
    </div>
    <!--content-->
    <div class="member-menus">
      <el-row>
        <el-col class="member-menus-items" v-for="(item, index) in secMenu" :key="item.text">
          <div class="member-item" @click="createTab(index,item)">
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
    name: "stocks-index",
    components: {},
    data() {
      return {
        secMenu:[{
          'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_kcchaxun.png',
          'link':'/commodity/stocksInquiry',
          'line':true,
          'text':'库存查询',
          'name': 'stocks-inquiry'
        },
          {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_kcpandian.png',
            'link':'/commodity/inventory-check',
            'line':true,
            'text':'盘点',
            'name': 'inventory-check-index'
          },
          {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_linshipd.png',
            'link':'/commodity/inventory-temporary',
            'line':true,
            'text':'临时盘点',
            'name': 'inventory-check-temporary'
          },
          {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_diaobod.png',
            'link':'/commodity/transfer-order',
            'line':true,
            'text':'调拨单',
            'name': 'transfer-order-index'
          },
          {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_shendiaod.png',
            'link':'/commodity/application-order',
            'line':true,
            'text':'申调单',
            'name': 'application-order-index'
          }]
      }
    },
    methods: {
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
      width: 20%;
    }
  }
</style>
