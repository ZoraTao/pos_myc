<template>
<div class="flexH100">
  <div class="homeImg">
    <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/shouye_banner.png"/>
  </div>
  <div class="homeContent">
    <div class="homeLeft">
      <div class="hcTop">
        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_daiban.png"/>
        <h5>待办事项</h5>
      </div>
      <div class="hcBottom">
        <div class="hcNumItem" >
          <h3>{{todoInfo.toPickup}}</h3>
          <p>待取件(单)</p>
        </div>
        <div class="hcNumItem">
          <h3>{{todoInfo.todayPickup}}</h3>
          <p>今日待取件(单)</p>
        </div>
        <div class="hcNumItem" v-on:click="goBills(1)">
          <h3 class="am-ft-red">{{todoInfo.outPickup}}</h3>
          <p>超期单据(单)</p>
        </div>
        <div class="hcNumItem" v-on:click="goBills(2)">
          <h3>{{todoInfo.expiringLens}}</h3>
          <p>即将到期隐形镜(盒)</p>
        </div>
        <div class="hcNumItem">
          <h3>{{todoInfo.notSaleLens}}</h3>
          <p>将到期不可售隐形镜(盒)</p>
        </div>
        <div class="hcNumItem">
          <h3>{{todoInfo.toCustomer}}</h3>
          <p>待回访客户(个)</p>
        </div>
        <div class="hcNumItem" v-on:click="goBills(3)">
          <h3>{{todoInfo.prescriptionPlans}}</h3>
          <p>验光预约(人)</p>
        </div>
        <div class="hcNumItem" @click="dialogAptitudeDue = true">
          <h3>{{todoInfo.expirQualified}}</h3>
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
          <div class="hcGgItem" v-for="(i,index) in news" :key="i.names">
            <img v-if="index==0" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/logo1.png" class="fn-left"/>
            <div class="fn-left">
              <p @click="detailPanel(i,index)">{{i.title}}</p>
              <!--<p class="news-detail" v-if="openPanel">{{i.announceDescription}}</p>-->
              <p class="news-detail" ref="open">{{i.announceDescription}}</p>
              <span>{{i.createTime}}</span>
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
          <div class="hcCxItem" v-for="n in promotionList" :key="n.salesId">
            <div class="hcCxLeft">
              <img v-if="n.salesType=='1'" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_manjian.png" />
              <img v-if="n.salesType=='2'" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_te.png">
            </div>
            <div class="hcCxRight">
              <h4>{{n.title}}</h4>
              <p>{{n.description}}</p>
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
      todoInfo: {},
      userId: '',
      orgId: '',
      news: [],
      promotionList: [],
      openPanel: false,
    }
  },
  components: {
    AptitudeDue
  },
  created(){
    this.getTodoItems();
    this.getNewsList();
    this.getPromotionList();
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
    },
    //待办事项
    getTodoItems(){
      const that = this;
      const ueserInfo = JSON.parse(localStorage.getItem("userData"));
      this.orgId = ueserInfo.orgId;
      that.$axios({
        url: 'http://myc.qineasy.cn/pos-api/toDo/getToDoDetail',
        method: 'post',
        params: {
          jsonObject: {},
          keyParams: {
            weChat: true,
            orgId: that.orgId
          }
        }
      })
        .then(function (response) {
          if (response.data.code != '1') {
            that.$message({
              showClose: true,
              message: '请求数据出问题喽，请重试！',
              type: 'error'
            })
            return false;
          } else {
            // console.info(response.data.data);
            that.todoInfo = response.data.data.todo;
          }
        })
        .catch(function (error) {
          console.info(error);
          that.$message({
            showClose: true,
            message: '请求数据失败，请联系管理员',
            type: 'error'
          })
        })
    },
    //获取公告列表
    getNewsList(){
      const that = this;
      const ueserInfo = JSON.parse(localStorage.getItem("userData"));
      this.orgId = ueserInfo.orgId;
      that.$axios({
        url: 'http://myc.qineasy.cn/pos-api/announcement/getAnnouncementList',
        method: 'post',
        params: {
          jsonObject: {
            status: '1'
          },
          keyParams: {
            weChat: true,
            orgId: that.orgId
          }
        }
      })
        .then(function (response) {
          if (response.data.code != '1') {
            that.$message({
              showClose: true,
              message: '请求数据出问题喽，请重试！',
              type: 'error'
            })
            return false;
          } else {
            // console.info(response.data.data);
            that.news = response.data.data.list;
          }
        })
        .catch(function (error) {
          console.info(error);
          that.$message({
            showClose: true,
            message: '请求数据失败，请联系管理员',
            type: 'error'
          })
        })
    },
    //查看公告详情
    detailPanel(val,index){
      const block = this.$refs.open[index].style.display;
      if(block=='block'){
        this.$refs.open[index].style.display = 'none';
      }else{
        this.$refs.open[index].style.display = 'block';
      }
    },
    //获取促销活动列表
    getPromotionList(){
      const that = this;
      const ueserInfo = JSON.parse(localStorage.getItem("userData"));
      this.userId = ueserInfo.userId;
      this.orgId = ueserInfo.orgId;
      that.$axios({
        url: 'http://myc.qineasy.cn/pos-api/salesPromotion/getSalesPromotion',
        method: 'post',
        params: {
          jsonObject: {
            status: '1'
          },
          keyParams: {
            weChat: true,
            userId: that.userId,
            orgId: that.orgId
          }
        }
      })
        .then(function (response) {
          if (response.data.code != '1') {
            that.$message({
              showClose: true,
              message: '请求数据出问题喽，请重试！',
              type: 'error'
            })
            return false;
          } else {
            // console.info(response.data.data);
            that.promotionList = response.data.data.list;
          }
        })
        .catch(function (error) {
          console.info(error);
          that.$message({
            showClose: true,
            message: '请求数据失败，请联系管理员',
            type: 'error'
          })
        })
    }
  },
}
</script>

<style scoped lang="scss">
  .am-ft-red{
    color: #F58B8B !important;
  }
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
        height: 350px;
        overflow-y: auto;
        &::-webkit-scrollbar{
          width: 8px;
          height: 6px;
        }
        &::-webkit-scrollbar-track{
          background: #d4d2d2;
          border-radius: 4px;
        }
        &::-webkit-scrollbar-thumb{
          background: #999999;
          border-radius: 4px;
        }
        &::-webkit-scrollbar-corner{
          background: #E6E6E6;
        }
    }
    .homeMid {
        width: 43.5%;
        float: left;
        background: #fff;
        margin: 0 0.7%;
        height: 350px;
        .hcBottom {
            padding-top: 0;
            &::-webkit-scrollbar{
              width: 8px;
              height: 6px;
            }
            &::-webkit-scrollbar-track{
              background: #d4d2d2;
              border-radius: 4px;
            }
            &::-webkit-scrollbar-thumb{
              background: #999999;
              border-radius: 4px;
            }
            &::-webkit-scrollbar-corner{
              background: #E6E6E6;
            }
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
                    object-fit: contain;
                }
                div {
                    text-align: left;
                    line-height: 28px;
                    overflow: hidden;
                  cursor: pointer;
                    p {
                        font-size: 16px;
                        color: #333333;
                        letter-spacing: -0.69px;
                    }
                    p.news-detail{
                      font-weight: normal;
                      font-size: 12px;
                      color: #555555;
                      display: none;
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
          cursor: pointer;
            h3 {
                font-size: 32px;
                color: #00A2DE;
                font-weight: 500;
                min-height: 48px;
            }
            p {
                font-size: 13px;
                color: #666666;
                width: 80px;
                margin: 0 auto;
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
                vertical-align: middle;
                margin-left: 20px;
            }
        }
        .hcCxRight {
            float: left;
            h4 {
                font-size: 16px;
                color: #333333;
                margin-bottom: 5px;
                font-weight: 400;
            }
            p {
                font-size: 13px;
                color: #666666;
            }
        }
    }
}
</style>
