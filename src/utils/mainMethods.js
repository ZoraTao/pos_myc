// export function install(Vue, options) {

// }
import Vue from 'vue'
Vue.prototype.$myAjax = function (opt) {
    let successCallback = Object.assign({}, opt).success;
    let errorCallback = Object.assign({}, opt).error;
    let type = opt.method || 'post';
    let keyParams = Object.assign({},{
      weChat: true,
      userId: JSON.parse(sessionStorage.getItem("userData")).userId||'',
      orgId: JSON.parse(sessionStorage.getItem("userData")).orgId||'',
      corporationId: JSON.parse(sessionStorage.getItem("userData")).corporationId||'',
    },opt.keyParams)
    let urlName = 'http://myc.qineasy.cn/';
    const defaults = Object.assign({}, opt.data||{}, {
        // access_token: window.sessionStorage.getItem('access_token') || "",
        // cli_create_time: parseInt(window.sessionStorage.getItem('cli_create_time')) || "",
        // expires_in: parseInt(window.sessionStorage.getItem('cli_create_time')) || "",
        // type:'online'
      })
    this.$axios({
      url: urlName + opt.url,
      method: type,
      params: {
        jsonObject: defaults,
        keyParams:keyParams
      }
    })
      .then(function (res) {
        successCallback(res.data);
      }).catch(function (err) {
        if(!errorCallback){
          console.log('请求失败，请写error失败回调')
        }else{
          errorCallback(err);
        }
      });
  };

