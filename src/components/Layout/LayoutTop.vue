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
        :key="index">
          {{i.text}}
          <i v-if="i.text != '首页'" class="el-icon-close"  @click="closeTab(index)"></i>
        </li>
      </ul>
      <div class="header-top-right">
        <a href="javascript:;" class="am-ft-FF2601">
          <!-- <i class="el-icon-bell"></i> -->
          <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img%2Ficon_xiaoxi.png"/>
          您有一个折扣签批已审核
        </a>
        <el-dropdown>
          <span class="el-dropdown-link">
            {{this.$store.state.user.orgName}}
          <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{this.$store.state.user.orgName}}1</el-dropdown-item>
            <el-dropdown-item>{{this.$store.state.user.orgName}}2</el-dropdown-item>
            <el-dropdown-item>{{this.$store.state.user.orgName}}3</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
          <span>
            {{this.$store.state.user.LoginName}}
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
import store from '../../vuex/store'
import { judgeCode } from "../../utils/other";
export default {
  name: "LayoutTop",
  data() {
    return {
      items: [],
      busData: "",
      toggle: true,
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
  methods: {
  },
  computed: {
      LoginName(){
        return this.$store.state.LoginName;
      }
  },

  beforeMount() {},
  mounted() {
    let _this = this;
    if(_this.$store.state.user.orgName == '' || _this.$store.state.user.LoginName == ''|| _this.$store.state.user.token ==''){
      _this.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
            })
      _this.$router.push({path:'/login'})
    }
  },
  methods: {
    //退出
    getout(data){
      if(data == 'goout'){
        this.$store.commit('CLEAR_LOCAL_STORAGE');
        this.$router.push({path:'/login'});
      }
    },
    //切换tab
    changeTab(items) {
      let _this = this;
      if (_this.toggle == true) {
        _this.items.forEach(function(element) {
          element.isActive = false;
          if (element == items) {
            element.isActive = true;
          }
        });
        _this.$router.push({
          path: items.link,
          name: items.name,
          params: {}
        });
      }
    },
    //关闭tab
    closeTab(index) {
      var _this = this;
      let arr = [];
      let nowGetLocal = JSON.parse(localStorage.getItem("items"));
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
      _this.items = arr;
      localStorage.setItem("items", JSON.stringify(_this.items));
      _this.toggle = false;
      setTimeout(function(){
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
      this.items = JSON.parse(localStorage.getItem("items")); //每次跳转路由都将目前的缓存赋值给items
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
      localStorage.setItem("items", JSON.stringify(this.items));
    }
  },

  mounted() {
    if (localStorage.getItem("items") == null) {
      localStorage.setItem("items", JSON.stringify(this.BeforeShow));
    }
    this.items = JSON.parse(localStorage.getItem("items"));
    // console.log(this.items);
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
          // console.log("触发了已有Tab");
          _this.$router.push({
            path: _this.items.link,
            name: _this.items.name,
            params: {}
          });
          return false;
        }
      }
      // console.log("触发了添加函数");

      _this.items.push({
        text: data.text,
        name: data.name,
        url: data.link,
        isActive: data.line
      });
      localStorage.setItem("items", JSON.stringify(_this.items));
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
  background: #001e3a;
}
.am-ft-FF2601 {
  color: #ff2601;
}
.tab-box ul {
  height: 100%;
  float: left;
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
}
.header-top-right {
  overflow: hidden;
  height: 100%;
  text-align: right;
  color: #fff;
}
.header-top-right img{
    height: 16px;
    line-height: 30px;
    vertical-align: text-bottom;
}
.el-dropdown {
  font-size: 12px;
  margin-right: 10px;
}
.el-dropdown-link {
  color: #fff;
}
</style>
