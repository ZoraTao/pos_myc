<template>
  <div class="loginBody">
    <div class="login-content-wrap">
      <div class="loginTopLogo">
        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/logo.png"/>
      </div>
      <div class="loginFormContent">
        <h1>眼镜新零售综合业务管理平台</h1>
        <h5>V 1.0.0</h5>
        <div class="formGroup">
          <div class="formItem">
            <input type="text" value="" v-model="LoginData.user" placeholder="用户名" @blur="requestShopList()" />
          </div>
          <div class="formItem">
            <input type="password" value="" v-model="LoginData.pass" placeholder="密码"/>
          </div>
          <div class="formItem">
            <select class="form-control" v-model="LoginData.company" @change="department()">
              <option v-for="item in companyArr" :key="item.corporationId" :label="item.corporationName" :value="item.corporationId" @change="department()" ></option>
            </select>
          </div>
          <div class="formItem">
            <select class="form-control" v-model="LoginData.department">
              <option v-for="item in departmentArr" :key="item.shopId" :label="item.shopName" :value="item.shopId" ></option>
            </select>
          </div>
          <div class="formItem">
            <select class="form-control" v-model="LoginSystem">
              <option value="0">毛源昌登录系统</option>
              <option value="1">毛源昌管理系统</option>
            </select>
          </div>
          <div class="formItem">
            <input type="button" class="loginBtn" value="登  录" v-on:click="toLogin()"/>
          </div>
          <div class="formItem">
            <span class="forgotPwd">忘记密码?</span>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import store from "../vuex/store";
export default {
  name: "login",
  data() {
    return {
      LoginData: {
        user: "",
        pass: "",
        company: "",
        department: ""
      },
      departProperty:'',//1部门  2门店
      companyArr: [],
      departmentArr:[],
      LoginSystem: "0",
      dialogVisible: false
    };
  },
  computed: {},
  methods: {
    company() {
      //公司
      const _this = this;
      _this
        .$axios({
          url:
            "http://myc.qineasy.cn/pos-api/corporation/getCorporationChildList",
          method: "post",
          params: {
            jsonObject: {
              corporationId: 0,
              corporationType: 1
            },
            keyParams: {
              weChat: true
            }
          }
        })
        .then(function(res) {
          console.log(res.data.data);
          if (res.data.code == 1) {
            _this.companyArr = res.data.data.list;
          }
        });
    },
    department() {
      //部门
      const _this = this;
      _this
        .$axios({
          url: "http://myc.qineasy.cn/pos-api/corporation/getChildAll",
          method: "post",
          params: {
            jsonObject: {
              corporationId: _this.LoginData.company,
              shopProperty: 1
            },
            keyParams: {
              weChat: true
            }
          }
        })
        .then(function(res) {
          console.log(res.data.data);
          if (res.data.code == 1) {
            _this.departmentArr = res.data.data.shopList;
          }
        });
    },
    toLogin() {
      const _this = this;
      if (_this.LoginSystem == "1") {
        let user = _this.LoginData.user;
        let pass = _this.LoginData.pass;
        if (_this.LoginSystem == 1) {
          if (user == "" || pass == "") {
            _this.$message({
              type: "error",
              message: "请填写账号密码",
              showClose: true
            });
            return;
          }
          location.href = `http://myc.qineasy.cn/oms_myc/loginPos.jsp?userName=${user}&passWord=${pass}`;
        }
        return;
      }
      if(_this.departProperty=='1'){
        if(_this.LoginData.company==''||_this.LoginData.department == ''){
          _this.$message({
              type: "warning",
              message: "非门店用户，请选择公司及部门",
              showClose: true
            });
          return
        }
      }
      _this
        .$axios({
          url: "http://myc.qineasy.cn/cas-api/user/userlogin",
          method: "post",
          params: {
            jsonObject: {
              userName: _this.LoginData.user,
              passWord: _this.LoginData.pass
            },
            keyParams: {
              weChat: true
            }
          }
        })
        .then(res => {
          if (res.status == "200") {
            if (res.data.code == 1 && res.data.msg == "登录成功") {
              console.log(res.data.data);
              _this.$store.commit("LOGIN_LOCAL_STORAGE", res.data.data.user);
              _this.goHome();
            } else {
              _this.$message({
                showClose: true,
                message: res.data.msg,
                type: "warning"
              });
            }
          }
        })
        .catch(err => {
          console.log(err);
          _this.$message({
            showClose: true,
            message: err,
            type: "warning"
          });
        });
    },
    requestShopList() {
      const _this = this;
      let jsonObject = {
        userName: _this.LoginData.user
      };
      let keyParams = {
        weChat: true
      };
      _this
        .$axios({
          url: "http://myc.qineasy.cn/cas-api/user/getUserDept",
          method: "post",
          params: { jsonObject, keyParams }
        })
        .then(function(res) {
          console.log(res.data.data);
          if (res.data.code == 1) {
            _this.departProperty = res.data.data.shopBy.departProperty;
          }else{
            if(_this.LoginData.user == ''){
                  _this.$message({
                showClose: true,
                message: '请输入账号',
                type: "warning"
                });
            }else{
               _this.$message({
                showClose: true,
                message: '用户不存在',
                type: "warning"
                });
            }
          }
        });
    },
    goHome() {
      this.$router.push("/base/homeIndex");
    }
  },
  created() {
    this.company(); //公司
    this.department(); //部门
    console.warn('13777822654,123456')
  },
  beforemounted() {}
};
</script>

<style scoped lang="scss">
.loginBody {
  background: url("http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/image_loginbg.png");
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-size: cover;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  &::-webkit-scrollbar {
    width: 8px;
    height: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #d4d2d2;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #999999;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-corner {
    background: #e6e6e6;
  }

  .login-content-wrap {
    width: 503px;
    height: 450px;
    .loginTopLogo {
      width: 100%;
      height: 87px;
    }
  }
  img {
    margin: 0 auto;
  }
  .loginFormContent {
    margin: 0 auto;
    overflow: hidden;
    text-align: center;
    h1 {
      margin-top: 54px;
      font-size: 32px;
      font-weight: 400;
      color: #ffffff;
      text-align: center;
    }
    h5 {
      margin-top: 7px;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
    }
    .formGroup {
      margin-top: 31px;
      overflow: hidden;
      .formItem {
        margin: 4px;
        input,
        select {
          width: 300px;
          height: 34px;
          background: rgba(255, 255, 255, 0.8);
          padding: 5px 10px;
          border: none;
          font-size: 13px;
          color: #333333;
          :focus {
            outline: none;
            border-color: #409eff;
          }
        }
        select {
          margin: 0 auto;
          padding: 5px 5px;
        }
        .loginBtn {
          background: #001e3a;
          border-radius: 3px;
          color: #fff;
          margin-top: 15px;
        }
        .forgotPwd {
          font-size: 12px;
          color: #ffffff;
          letter-spacing: 0;
          line-height: 18px;
          text-align: right;
          width: 300px;
          display: inline-block;
          margin-top: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
