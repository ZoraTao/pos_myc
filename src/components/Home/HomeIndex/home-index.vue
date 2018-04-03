<template>
<div class="flexH100">
  <div class="homeImg">
    <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/banner.png"/>
  </div>
  <div class="homeContent">
    <div class="homeLeft">
      <div class="hcTop">
        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_daiban.png"/>
        <h5>待办事项</h5>
      </div>
      <div class="hcBottom">
        <div class="hcNumItem" >
          <h3>120</h3>
          <p>待取件(单)</p>
        </div>
        <div class="hcNumItem">
          <h3>120</h3>
          <p>今日待取件(单)</p>
        </div>
        <div class="hcNumItem" v-on:click="goBills(1)">
          <h3 class="am-ft-red">6</h3>
          <p>超期单据(单)</p>
        </div>
        <div class="hcNumItem" v-on:click="goBills(2)">
          <h3>12</h3>
          <p>即将到期隐形镜(盒)</p>
        </div>
        <div class="hcNumItem">
          <h3>9</h3>
          <p>将到期不可售隐形镜(盒)</p>
        </div>
        <div class="hcNumItem">
          <h3>21</h3>
          <p>待回访客户(个)</p>
        </div>
        <div class="hcNumItem" v-on:click="goBills(3)">
          <h3>9</h3>
          <p>验光预约(人)</p>
        </div>
        <div class="hcNumItem" @click="dialogAptitudeDue = true">
          <h3>120</h3>
          <p>资质即将到期</p>
        </div>
      </div>
    </div>
    <div class="homeMid">
      <div class="hcTop">
        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_gonggao.png"/>
        <h5>公告</h5>
      </div>
      <div class="hcBottom">
          <div class="hcGgItem">
            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/logo1.png" class="fn-left"/>
            <div class="fn-left">
              <p>毛源昌眼镜门店销售管理系统全面升级</p>
              <span>2017-12-08 09:09:12</span>
            </div>
          </div>
          <div class="hcGgItem">
            <div class="fn-left">
              <p>毛源昌眼镜门店销售管理系统全面升级</p>
              <span>2017-12-08 09:09:12</span>
            </div>
          </div>
          <div class="hcGgItem">
            <div class="fn-left">
              <p>毛源昌眼镜门店销售管理系统全面升级</p>
              <span>2017-12-08 09:09:12</span>
            </div>
          </div>
          <div class="hcGgItem">
            <div class="fn-left">
              <p>毛源昌眼镜门店销售管理系统全面升级</p>
              <span>2017-12-08 09:09:12</span>
            </div>
          </div>
      </div>
    </div>
    <div class="homeRight">
      <div class="hcTop">
        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_cuxiao.png"/>
        <h5>促销活动</h5>
      </div>
      <div class="hcBottom">
          <div class="hcCxItem">
            <div class="hcCxLeft">
              <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_manjian.png">
            </div>
            <div class="hcCxRight">
              <h4>满减活动</h4>
              <p>满200减20，满500减50，满1000减150</p>
            </div>
          </div>
          <div class="hcCxItem">
            <div class="hcCxLeft">
              <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_te.png">
            </div>
            <div class="hcCxRight">
              <h4>满减活动</h4>
              <p>满200减20，满500减50，满1000减150</p>
            </div>
          </div>
          <div class="hcCxItem">
            <div class="hcCxLeft">
              <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_cu.png">
            </div>
            <div class="hcCxRight">
              <h4>满减活动</h4>
              <p>满200减20，满500减50，满1000减150</p>
            </div>
          </div>
          <div class="hcCxItem">
            <div class="hcCxLeft">
              <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_manjian.png">
            </div>
            <div class="hcCxRight">
              <h4>满减活动</h4>
              <p>满200减20，满500减50，满1000减150</p>
            </div>
          </div>
      </div>
    </div>
  </div>
  <el-dialog title="资质即将到期" :visible.sync="dialogAptitudeDue">
    <aptitudeDue></aptitudeDue>
  </el-dialog>
</div>
</template>

<script>

import AptitudeDue from '../../Bills/aptitudeDue/aptitudeDue.vue'
export default {
  name: 'Home',
  data () {
    return {
      dialogAptitudeDue: false,
    }
  },
  components: {
    AptitudeDue
  },
  methods:{
    goBills(type){
      switch (type){
        case 1:
          this.$router.push('/bills/timeoutBill')
        break;
        case 2:
          this.$router.push('/bills/aboutExpireClBill')
        break;
        case 3:
          this.$router.push('/bills/optometryAppointmentBill')
        break;
      }
    }
  }
}
</script>

<style scoped lang="scss">
.homeImg {
    flex: 68;
    max-height: 279px;
    overflow: hidden;
    img {
        width: 100%;
        max-height: 279px;
    }
}

.homeContent {
    flex: 100;
    width: 100%;
    margin: 10px 0;
    font-size: 14px;
    overflow: hidden;
    .homeLeft,
    .homeRight {
        width: 27.5%;
        float: left;
        background: #fff;
        height: 100%;
    }
    .homeMid {
        width: 43.5%;
        float: left;
        background: #fff;
        margin: 0 0.7%;
        height: 100%;
        .hcBottom {
            padding-top: 0;
            .hcGgItem {
                height: 77px;
                box-sizing: border-box;
                padding: 10px 0;
                margin: 0 20px;
                overflow-x: hidden;
                overflow-y: auto;
                height: 100%;
                border-bottom: 1px dashed #ddd;
                img {
                    width: 56px;
                    height: 56px;
                    float: left;
                }
                div {
                    text-align: left;
                    line-height: 28px;
                    overflow: hidden;
                    p {
                        font-size: 16px;
                        color: #333333;
                        letter-spacing: -0.69px;
                    }
                    span {
                        font-size: 12px;
                        color: #999999;
                    }
                }
                &:first-child {
                    p {
                        font-weight: bold;
                    }
                    p,
                    span {
                        margin-left: 10px;
                    }
                }
                &:nth-of-type(2) {
                    p {
                        font-weight: bold;
                    }
                }
            }
        }
    }
    .hcTop {
        display: flex;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #E1E1E1;
        margin: 0 20px;
        img {
            width: 20px;
            height: 20px;
            float: left;
            margin-right: 10px;
        }
        h5 {
            float: left;
            color: #555555;
            line-height: 50px;
        }
    }
    .hcBottom {
        overflow: hidden;
        text-align: center;
        padding: 20px 0;
        overflow-x: hidden;
        overflow-y: auto;
        max-height: calc(100% - 50px);
        .hcNumItem {
            width: 33%;
            float: left;
            height: 60px;
            h3 {
                font-size: 32px;
                color: #00A2DE;
                font-weight: 500;
            }
            p {
                font-size: 13px;
                color: #666666;
            }
            &:nth-of-type(n+4) {
                margin-top: 30px;
            }
        }
    }
    .hcCxItem {
        text-align: left;
        overflow: hidden;
        margin-bottom: 22px;
        .hcCxLeft {
            overflow: hidden;
            float: left;
            img {
                margin: 0 10px;
                width: 18px;
                height: 18px;
                vertical-align: top;
            }
        }
        .hcCxRight {
            float: left;
            h4 {
                font-size: 16px;
                color: #333333;
                margin-bottom: 5px;
            }
            p {
                font-size: 13px;
                color: #666666;
            }
        }
    }
}
</style>
