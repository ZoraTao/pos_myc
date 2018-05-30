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
            <input type="text" value="" v-model="LoginData.user" placeholder="用户名"/>
          </div>
          <div class="formItem">
            <input type="password" value="" v-model="LoginData.pass" placeholder="密码"/>
          </div>
          <div class="formItem">
            <select class="form-control" v-model="LoginData.company">
              <option>毛源昌西湖区分公司</option>
              <option>毛源昌余杭区分公司</option>
              <option>毛源昌萧山区分公司</option>
              <option>毛源昌滨江区分公司</option>
            </select>
          </div>
          <div class="formItem">
            <select class="form-control" v-model="LoginData.department">
              <option>销售部</option>
              <option>市场部</option>
              <option>运营部</option>
              <option>事业部</option>
            </select>
          </div>
          <div class="formItem">
            <select class="form-control" @change="replace()" v-model="LoginSystem">
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
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%">
          <span style="line-height:40px;">{{errorTitle}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button 
            type="primary" 
            plain 
            size="small" 
            @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../vuex/store'
export default {
  name: 'login',
  data () {
    return {
      LoginData:{
        user:'13777822654',
        pass:'123456',
        company:'毛源昌西湖区分公司',
        department:'销售部'
      },
      LoginSystem:'0',
      dialogVisible:false,
      errorTitle:'密码错误，登录失败！'
    }
  },
  computed:{
  },
  methods:{
    toLogin(){
      const _this = this;
      _this.$axios({
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
              _this.dialogVisible = true;
              console.log(res);
            }
          }
        })
        .catch(err => {
          console.log(err);
          _this.errorTitle = "通信错误，请重试";
          _this.dialogVisible = true;
        });
    },
    replace(){
      let user = this.LoginData.user;
      let pass = this.LoginData.pass;
      if(this.LoginSystem == 1){
        if(user ==''||pass==""){
           this.$message({
            type: "error",
            message: "请填写账号密码",
            showClose: true
          });
          return
        }
        location.href=`http://myc.qineasy.cn/oms_myc/?userName=${user}&passWord=${pass}`
      }
    },
    goHome(){
      this.$router.push('/base/homeIndex')
    }
  },
  beforemounted(){
  }
}
</script>

<style scoped lang="scss">
  .loginBody {
    background: url('http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/image_loginbg.png');
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-size: cover;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
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
        color: #FFFFFF;
        text-align: center;
      }
      h5 {
        margin-top: 7px;
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
      }
      .formGroup {
        margin-top: 31px;
        overflow: hidden;
        .formItem {
          margin: 4px;
          input,select {
            width: 300px;
            height: 34px;
            background: rgba(255, 255, 255, 0.80);
            padding: 5px 10px;
            border: none;
            font-size: 13px;
            color: #333333;
            :focus{
              outline: none;
              border-color: #409eff;
            }
          }
          select {
            margin: 0 auto;
            padding: 5px 5px;
          }
          .loginBtn {
            background: #001E3A;
            border-radius: 3px;
            color: #fff;
            margin-top: 15px;
          }
          .forgotPwd {
            font-size: 12px;
            color: #FFFFFF;
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
