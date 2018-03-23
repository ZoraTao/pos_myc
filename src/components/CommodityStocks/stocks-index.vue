<template>
  <div class="inner-index-box">
    <!--banner-->
    <div class="member-banner">
      <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/huiyuan_banner.png"/>
    </div>
    <!--content-->
    <div class="member-menus">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="member-item" @click="goStocksInquiry">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_xzhuiyuan.png"/>
            <span>库存查询</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="member-item">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hychaxun.png"/>
            <span>盘点</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="member-item">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hytousu.png"/>
            <span>临时盘点</span>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="member-item">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hyhuifang.png"/>
            <span>调拨单</span>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="member-item">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hyquanyi.png"/>
            <span>申调单</span>
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
      return {}
    },
    methods: {
      //库存查询
      goStocksInquiry: function () {
        this.$router.push({
          path: '/commodity/stocksInquiry',
          name: 'stocks-inquiry',
          params: {}
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
