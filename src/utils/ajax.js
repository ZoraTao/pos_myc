/* ajax
* yzw
*/
import Vue from 'vue'
import axios from 'axios'
import allUrl from './allUrl.js'
import VueResource from 'vue-resource'
Vue.use(VueResource)
const ajax = function (opt) {
    let successCallback = Object.assign({}, opt).success;
    let errorCallback = Object.assign({}, opt).error;
    let way = opt.way || 'online' ; // 域名环境
    const defaults = {
        data: Object.assign({}, opt.data, {
            access_token: window.localStorage.getItem('access_token') || "",
            cli_create_time: parseInt(window.localStorage.getItem('cli_create_time')) || "",
            expires_in: parseInt(window.localStorage.getItem('cli_create_time')) || "",
            weapp: 'h5didaozx',
            type:'online'
        })
    }
    console.log(opt,defaults)
    // var url
    // if(/\bonline\b/.test(way)){
    //     url = allUrl   等待后期配置域名
    // }
    var types = opt.methods;
    if(/\bjsonp\b/.test(types)){
        Vue.http.jsonp(opt.url, {
            params:defaults.data
        }).then(
            response => {
                successCallback(response.data);
            }
            , error => {
                errorCallback(error.data);
            });
    }
    if (/\bpost\b/i.test(types)) {
        types = axios.post;
    } else if (/\bget\b/i.test(types)) {
        types = axios.get;
    } 
    types(opt.url, {
        params:defaults.data
    }).then(function (response) {
            if (response.status == 101) {
                // 需要手机号码登陆
                window.location.href = allUrl.PassPortUrl + "" + encodeURIComponent(window.location.href);
                return false;
            } else if (response.status == 201) {
                // 需要登陆（授权）
                window.location.href = allUrl.PassPortUrl + "" + encodeURIComponent(window.location.href);
                return false;
            }
            if (typeof successCallback == 'function') {
                successCallback(response.data);
            }
        })
        .catch(function (error) {
            if (typeof errorCallback == 'function') {
                errorCallback(error.data);
            }
        });
}
export {
    ajax
}
