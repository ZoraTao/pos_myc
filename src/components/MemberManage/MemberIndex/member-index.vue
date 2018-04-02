<template>
  <div class="inner-index-box">
    <!--banner-->
    <div class="member-banner">
      <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/huiyuan_banner.png"/>
    </div>
    <!--content-->
    <div class="member-menus">
      <el-row>
        <el-col class="member-menus-items"  v-for="(item, index) in secMenu" :key="item.text">
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
    name: "memberIndex",
    data() {
      return {
        secMenu:[{
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_xzhuiyuan.png',
            'link':'/member/memberAdd',
            'line':true,
            'text':'新增会员',
            'name': 'member-add'
          },
          {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hychaxun.png',
            'link':'/member/memberInquiry',
            'line':true,
            'text':'会员查询',
            'name': 'member-inquiry'
          },
          {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hytousu.png',
            'link':'/member/memberComplaints',
            'line':true,
            'text':'会员投诉',
            'name': 'member-complaints'
          },
          {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hyhuifang.png',
            'link':'/member/memberReturnVisit',
            'line':true,
            'text':'会员回访',
            'name': 'member-return-visit'
          },
          {
            'src':'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_hyquanyi.png',
            'link':'/',
            'line':true,
            'text':'会员权益',
            'name': ''
          }]
      }
    },
    methods: {
      //为追加tab传值
      createTab(key,label) {
        this.$router.push(label.link);
        this.$bus.$emit('createTab', label);
      }
    },
    components:{}

  }
</script>

<style scoped lang="scss">
  .member-menus{
    .member-menus-items{
      width: 20%;
    }
  }

</style>
