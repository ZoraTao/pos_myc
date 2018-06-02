<template>
<!------ Header top ------>
  <div class="header-top">
    <div class="tab-box">
      <ul>
        <li
        class="tab-item"
        v-for="(i,index) in items"
        v-bind:class="{ active:i.isActive }"
        @click="changeTab(i);"
        @dblclick="closeTab(index)"
        :key="index">
          {{i.text}}
          <i v-if="i.text != '首页'" class="el-icon-close"  @click="closeTab(index)" ></i>
        </li>
        <li class="more" v-if="moreArr.length>0">
          <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            更多<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown" >
              <el-dropdown-item v-for="(item,ind) in moreArr" :command="item.url" :key="item.name">
                <p @click="changeTab(item,ind,'more')" class="topClass">{{item.text}}</p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
      <div class="header-top-right" >
        <a href="javascript:;" class="am-ft-FF2601">
          <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img%2Ficon_xiaoxi.png"/>
          您有一个折扣签批已审核
        </a>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{showUser.orgName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{showUser.orgName}}1</el-dropdown-item>
            <el-dropdown-item>{{showUser.orgName}}2</el-dropdown-item>
            <el-dropdown-item>{{showUser.orgName}}3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
          <span>
            {{showUser.trueName}}
          </span>
        <el-dropdown @command="getout">
            <a href="javascript:;" class="am-ft-white mgr15 el-dropdown-link">
              <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img%2Ficon_shezhi.png"/>
          <i class="el-icon-arrow-down el-icon--right"></i>
            </a>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="goout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>


      </div>
    </div>
  </div>
  <!------ /Header top ------>

</template>

<script>
import _ from 'lodash'
import { mapState } from "vuex";
import store from "../../vuex/store";
import { judgeCode } from "../../utils/other";

export default {
  name: "LayoutTop",
  data() {
    return {
      items: [],
      busData: "",
      showUser: {},
      toggle: true,
      moreArr:[],
      BeforeShow: [
        {
          text: "首页",
          name: "Home",
          url: "/base/homeIndex",
          isActive: "true"
        }
      ]
    };
  },
  beforeMount() {},
  created() {
    this.$store.commit("LOGIN_GET");
    this.showUser = JSON.parse(sessionStorage.getItem("userData"));
  },
  methods: {
    //退出
    getout(data) {
      if (data == "goout") {
        this.$store.commit("CLEAR_LOCAL_STORAGE");
        this.$router.push({ path: "/login" });
        if (window.hasOwnProperty("qineasyjsbridge")) {
          qineasyjsbridge.Close();
        }
      }
    },
    //切换tab
    changeTab(items,where,from) {
      let _this = this;
      if (_this.toggle == true) {
        _this.items.forEach(function(element) {
          element.isActive = false;
          if (element == items) {
            element.isActive = true;
          }
        });
        _this.moreArr.forEach(function(element) {
          element.isActive = false;
        });
      }
      if(from === 'more'){
          let itemsLast = _.clone(_this.items[_this.items.length-1]);//拿到最后一个
          let data = _.clone(items)
          _this.items.splice(_this.items.length-1,1)
          _this.moreArr.splice(where,1)
          _this.moreArr.push(itemsLast)
          data.isActive = true
          _this.items.push(data);
           sessionStorage.setItem("items2", JSON.stringify(_this.moreArr));
          sessionStorage.setItem("items", JSON.stringify(_this.items));
        }
        _this.$router.push({
          path: items.link,
          name: items.name,
          params: {}
        });
    },

    //关闭tab
    closeTab(index) {
      var _this = this;
      let arr = [];
      let nowGetLocal = JSON.parse(sessionStorage.getItem("items"));
      for (var key in nowGetLocal) {
        if (!nowGetLocal.hasOwnProperty(key)) {
          continue;
        }
        arr.push(nowGetLocal[key]);
      }
      let splitArrUrl = arr[index - 1].url;
      let splitArrName = arr[index - 1].name;
      arr[index - 1].isActive = true;
      arr.splice(index, 1);
      console.log(arr)
      if(_this.moreArr.length>0){
        let firstArr = _this.moreArr[0];
        _this.moreArr.splice(0,1);
        arr.push(firstArr)
      }
      _this.items = arr;
      sessionStorage.setItem("items2", JSON.stringify(_this.moreArr));
      sessionStorage.setItem("items", JSON.stringify(_this.items));
      _this.toggle = false;
      setTimeout(function() {
        _this.toggle = true;
      }, 200);
      _this.$router.push({
        path: splitArrUrl,
        name: splitArrName,
        params: {}
      });
    }
  },
  computed: {},
  watch: {
    items(newValue, oldValue) {},
    $route() {
      // console.log("触发Route", this.$route.path);
      this.items = JSON.parse(sessionStorage.getItem("items")); //每次跳转路由都将目前的缓存赋值给items
      let nowRoute = this.$route.path;
      let nowRouteName = this.$route.path;
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].isActive = false;
        if (judgeCode.str(nowRouteName.split("/")[1], this.items[0].url)) {
          this.items[0].isActive = true;
        } else if (judgeCode.str(nowRoute, this.items[i].url)) {
          this.items[i].isActive = true;
        }
      }
      sessionStorage.setItem("items", JSON.stringify(this.items));
    }
  },
  mounted() {
    if (sessionStorage.getItem("items") == null) {
      sessionStorage.setItem("items", JSON.stringify(this.BeforeShow));
    }
    if (sessionStorage.getItem("items2") != null) {
      this.moreArr = JSON.parse(sessionStorage.getItem("items2"));
    }
    this.items = JSON.parse(sessionStorage.getItem("items"));

    //追加tab
    var _this = this;
    _this.$bus.$on("createTab", function(data) {
       _this.items.forEach(function(element) {
        element.isActive = false;
      });
      let arr = [];
      for (var key in _this.items) {
        if (!_this.items.hasOwnProperty(key)) {
          continue;
        }
        arr.push(_this.items[key]);
      }
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].name == data.name) {
          arr[i].isActive = true;
          _this.$router.push({
            path: _this.items.link,
            name: _this.items.name,
            params: {}
          });
          return false;
        }
      }
        
      if(_this.items.length>5){
        let add = true;//true为新添加的
        for(var i=0;i<_this.moreArr.length;i++){
            _this.moreArr[i].isActive = false;
            if(_this.moreArr[i].text === data.text){
              add = false;
             return
            }
        }
        if(add){//新的，添加
          _this.moreArr.push({
            text: data.text,
            name: data.name,
            url: data.link,
            isActive: data.line
          })
        };
        sessionStorage.setItem("items2", JSON.stringify(_this.moreArr));
        return;
      }else{
        _this.items.push({
          text: data.text,
          name: data.name,
          url: data.link,
          isActive: data.line
        });
        sessionStorage.setItem("items", JSON.stringify(_this.items));
      }
    });
  }
};
</script>

<style scoped lang="scss">
.mgr15 {
  margin-right: 15px;
}
.am-ft-white {
  color: #fff;
}
.logo {
  width: 120px;
  height: 31px;
  background: #333;
  border-radius: 6px;
  margin: 16px 24px 16px 0;
  float: left;
}
.content-wrap {
  background: #fff;
  padding-top: 30px;
  min-height: 280px;
}
.tab-box {
  width: 100%;
  height: 30px;
  position: relative;
  background: #001e3a;
}
.am-ft-FF2601 {
  color: #ff2601;
}
.tab-box ul {
  height: 100%;
  float: left;
  position: relative;
  z-index: 99;
}
.tab-box ul .tab-item {
  min-width: 116px;
  position: relative;
  background: rgba(32, 202, 235, 0.5);
  color: #ffffff;
  text-align: center;
  float: left;
  cursor: default;
  box-sizing: border-box;
  margin-right: 2px;
  float: left;
  height: 100%;
  line-height: 30px;
}
.tab-box ul .tab-item.active {
  background: #20caeb !important;
}
.tab-box ul .tab-item i {
  position: absolute;
  right: 0;
  top: 0;
  color: #ccc;
  cursor: pointer;
}
.tab-box ul .tab-item:hover i {
  color: #ffffff;
}
.tab-box .header-top-right > a {
  display: inline-block;
  margin-right: 10px;
  line-height: 30px;
  vertical-align: top;
}
.header-top-right {
  z-index: 1;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  text-align: right;
  color: #fff;
}
.header-top-right img {
  height: 16px;
  line-height: 30px;
  vertical-align: text-bottom;
}
.el-dropdown {
  font-size: 12px;
  margin-right: 10px;
  vertical-align: middle;
  line-height: 30px;
}
.el-dropdown-link {
  color: #fff;
}
.el-dropdown-menu__item {
  line-height: 30px !important;
  font-size: 12px !important;
}
.more {
  float: left;
  line-height: 30px;
  color: #ffffff;
  text-align: center;
  // display: inline-block;
  width: 80px;
  background-color: rgba(32, 202, 235, 0.5);
}
.isActiveFont{
  color:#fff;
  background: linear-gradient(to right, #1c92d2, #f2fcfe)
}
.more{
  .el-dropdown-menu__item{
  padding:0 !important;
}
}

.topClass{
    width: 120px;
    text-align: center;
  }
.more{
  .el-dropdown{
    margin-right:0;
  }
  
}
</style>
