<template>
  <div>
    <el-container>
      <el-header >
         <transition name="el-zoom-in-top">
            <div v-show="showheader" ref="showheaderRef" class="headerContent transition-box">
              <el-row>
                <el-col :span="4" v-for="(item , index) in defaultsData" :key="item.name">
                  <div class="grid-content bg-purple">
                    <em><span v-if="index>=2">￥</span>{{item.value}}</em>
                    <i>{{item.name}}</i>
                  </div>
                </el-col>
              </el-row>
            </div>
         </transition>
        </el-header>
 <div class="toggleImg" ref="showImage"  @click="toggelHeader">
    <img src="https://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_ss.png" alt="">
  </div>
      <el-main style="height:432px;">
          <p class="title">统计报表</p>
          <div class="minDiv">
            <el-row type="flex" justify="space-between">
              <el-col :span="4" v-for="(items,index) in saleData" :key="items.name" >
                <!--<div class="grid-content bg-purple" @click=" toTargetrouter(items);createTab(index,items)">-->
                <div class="grid-content bg-purple">
                  <img :src="items.img" alt="">
                  <h5>{{items.text}}</h5>
                </div>
                <ul class="list" >
                  <li v-for="ite in items.contentList" :key="ite">{{ite}}</li>
                </ul>
              </el-col>
          </el-row>
          </div>
      </el-main>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultsData: [
        {
          name: "本月完成率",
          value: "6"
        },
        {
          name: "今日销售件数",
          value: "365"
        },
        {
          name: "今日销售总额",
          value: "10000"
        },
        {
          name: "今日收款金额",
          value: "8000"
        },
        {
          name: "欠款总额",
          value: "6313131"
        },
        {
          name: "本月销售总额",
          value: "8000000"
        }
      ],
      showheader:true,
      saleData: [
        {
          text: "商品报表",
          img:
            "https://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_bb_sp.png",
          contentList: ["每周日报", "商品报表"],
          link: "/doBusiness",
          name: "do-business"
        },
        {
          text: "员工报表",
          img:
            "https://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_bb_yg.png",
          contentList: ["每周日报", "商品报表"],
          link: "/staffSale",
          name: "staffSale"
        },
        {
          text: "库存报表",
          img:
            "https://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_bb_kc.png",
          contentList: ["每周日报", "商品报表"],
          link: "/baseTable",
          name: "baseTable"
        },
        {
          text: "销售报表",
          img:
            "https://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_bb_xs.png",
          contentList: ["每周日报", "商品报表"],
          link: "/saleTable",
          name: "saleTable"
        },
        {
          text: "GSP管理",
          img:
            "https://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_bb_gps.png",
          contentList: ["每周日报", "商品报表"],
          link: "/gspDev",
          name: "gspDev"
        }
      ]
    };
  },
  methods: {
    toggelHeader() {
        console.log(this.$refs.showImage.getBoundingClientRect().top);
      if(this.showheader){
        setTimeout(()=>{
          this.$refs.showImage.getBoundingClientRect().top = '0px'
          this.$refs.showheaderRef.parentNode.style.cssText = 'height:0px !important;'
        },300)
      }else{
        this.$refs.showheaderRef.parentNode.style.cssText = 'height:160px !important;'
      }
      this.showheader = !this.showheader;
    },
    toTargetrouter(target) {
      this.$router.push(target.link);
    },
    createTab(key, label) {
      this.$router.push(label.link);
      this.$bus.$emit("createTab", label);
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../reset";
.el-container {
  position: relative;
}
.el-header {
    height: 160px !important;
  background: #fff;
  text-align: center;
  font-family: MicrosoftYaHei;
  position: relative;
  em {
    font-size: 24px;
    display: block;
    line-height: 31px;
    color: #333;
  }

  p {
    line-height: 17px;
    font-size: 13px;
    color: #666666;
    font-weight: 200;
  }
  .el-col:nth-child(1) em,
  .el-col:nth-child(4) em {
    color: #ff9400;
  }
  .el-col:nth-child(5) em {
    color: #00c1eb;
  }
  .headerContent {
    min-width: 1270px;
    height: 160px;
    box-sizing: content-box;
    margin: 0 auto;
  }
  .el-row {
    margin-top: 55px;
    &:last-child {
      margin-bottom: 0;
    }
  }
}
.toggleImg {
    width: 80px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 26px;
    top:135px;
  }
.el-main {
  background: #fff;
  margin-top: 10px;
  position: relative;
  padding: 0;
  .minDiv {
    max-width: 100%;
    box-sizing: content-box;
    margin: 0 auto;
  }
  .title {
    font-size: 16px;
    color: #555;
    position: relative;
    display: inline-block;
    line-height: 1;
    top: 25px;
    left: 36px;
  }
  .el-row {
    top: 83px;
    left: 0;
    padding: 0 20px;
  }
  .el-col {
    box-sizing: content-box;
    border: 1px solid #cccccc;
    /*width: 198px;*/
    cursor: pointer;
    height: 270px;
    .grid-content {
      height: 110px;
      width: 100%;
      text-align: center;
      overflow: hidden;
    }
    h5 {
      font-size: 18px;
      color: #fff;
      line-height: 24px;
    }
    .list {
      margin-top: 18px;
      li {
        list-style-type: disc;
        margin-left: 32px;
        line-height: 17px;
        font-size: 13px;
      }
    }
  }
  .el-col:last-child {
    margin-right: 0;
  }
  .el-col:nth-child(1) .grid-content {
    background: #fac979;
    img {
      width: 51px;
      margin-top: 20px;
    }
  }
  .el-col:nth-child(2) .grid-content {
    background: #97cf74;
    img {
      width: 52px;
      margin-top: 15px;
    }
  }
  .el-col:nth-child(3) .grid-content {
    background: #8ec5da;
    img {
      width: 51px;
      margin-top: 19px;
    }
  }
  .el-col:nth-child(4) .grid-content {
    background: #00a2de;
    img {
      width: 50px;
      margin-top: 19px;
    }
  }
  .el-col:nth-child(5) .grid-content {
    background: #4e8ea6;
    img {
      width: 42px;
      margin-top: 22px;
    }
  }
}

</style>
