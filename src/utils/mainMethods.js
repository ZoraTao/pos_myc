// export function install(Vue, options) {
  
// }
import Vue from 'vue'
Vue.prototype.$myAjax = function (opt) {
    let successCallback = Object.assign({}, opt).success;
    let errorCallback = Object.assign({}, opt).error;
    let type = opt.method || 'post';
    let urlName = 'http://myc.qineasy.cn/';
    const defaults = {
      data: Object.assign({}, opt.data, {
        // access_token: window.localStorage.getItem('access_token') || "",
        // cli_create_time: parseInt(window.localStorage.getItem('cli_create_time')) || "",
        // expires_in: parseInt(window.localStorage.getItem('cli_create_time')) || "",
        // type:'online'
      })
    };
    this.$axios({
      url: urlName + opt.url,
      method: type,
      params: {
        jsonObject: defaults,
        keyParams: {
          weChat: true,
          userId: '8888',
          orgId: '11387'
        }
      }
    })
      .then(function (res) {
        successCallback(res.data);
      }).catch(function (err) {
        errorCallback(err);
      });
  };