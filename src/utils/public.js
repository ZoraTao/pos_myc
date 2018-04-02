import allUrl from './allUrl.js';
import { Promise } from 'es6-promise';
import lazy from './lazyload/lazyload';
import { isArray } from 'util';
// localStorage的存储api
const Storage = {
    get:(value) => {
        let val = localStorage.getItem(value)
        try { return JSON.parse(val) }
        catch(e) { return val || undefined }
    },
    set:(key,value) => {
        if (value === undefined) { return }
        localStorage.setItem(key,JSON.stringify(value))
    },
    remove:(key) => {
        localStorage.removeItem(key)
    }
}
// 截取URL return {}
const getQueryString = function (url) {
    if (url) {
        url = url.substr(url.indexOf("?") + 1);
    }
    let result = {}, queryString = url || location.search.substring(1),
        re = /([^&=]+)=([^&]*)/g, m
  
//     while (m = re.exec(queryString)) {
//         result[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
//     }
  
    return result;
  }
// 截取URL return 字符串
  const getQueryStr = function (name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return '';
}
//   拼接url api
  const convertRequestURL = function(url,environment) {
    let converted_url
    let mode = getQueryString().mode
    // console.log(mode)
  
    if(mode == 'test'){
         if(environment == 'baodandai') converted_url = "http://api.didao-zx.com/shop/"+url
    }
    else{
        if(environment == 'baodandai') converted_url = "https://www.easy-mock.com/"+url
    }
  
    return converted_url
  }
// 登录验证
const checkLogin=()=>{
    let accessToken = store.get('access_token')||"";
    let create_time = parseInt(store.get('cli_create_time')||0);
    let nowTime = parseInt(Date.parse(new Date())/1000);
    // alert(accessToken)
    if (!(accessToken)) {
        //登陆去
        window.location.href = "http://m.didao-zx.com/shop/redirect.php?_from=179e4c969714422c&redirect_uri=" + encodeURIComponent(window.location.origin+window.location.pathname);
        return false;
    }
}
//   base64
const Base64=function(){
    // private property
    let _keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    this.encode=(input)=> {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                    _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                    _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    };
    // public method for decoding
    this.decode=(input)=> {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = _keyStr.indexOf(input.charAt(i++));
            enc2 = _keyStr.indexOf(input.charAt(i++));
            enc3 = _keyStr.indexOf(input.charAt(i++));
            enc4 = _keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = _utf8_decode(output);
        return output;
    };
    // private method for UTF-8 encoding
    let _utf8_encode=(string)=> {
        string = string.replace(/\r\n/g,"\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    };

    // private method for UTF-8 decoding
    let _utf8_decode=(utftext)=> {
        let string = "";
        let i = 0;
        let c = 0;
        let c1 = 0;
        let c2 = 0;
        let c3 = 0;
        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }
}
//   ajax接口
const Didao_api={
    // 接口
        _DDajax(params,post,url,environment){
        return new Promise( (resolve, reject) => {
            //解析qsctoken并存储
            // let str = getQueryString('qsctoken');
            // if (str) {
            //     let base = new Base64();
            //     console.log(base,this)
            //     let obj = JSON.parse(base.decode(decodeURIComponent(str)));
            //     for(let p in obj){
            //         store.set(p,obj[p]);
            //     }
            // }
            // checkLogin()
            // let defaultdata={
            //     access_token:store.get('access_token')||"",
            //     cli_create_time:parseInt(store.get('cli_create_time'))||"",
            //     expires_in:parseInt(store.get('cli_create_time'))||"",
            //     weapp:'h5didaozx'
            // };
            // params=$.extend({},params,defaultdata);
            $.ajax({
                type:post,
                url: convertRequestURL(url,environment),
                data:params,
                dataType:"json",
                success: (resp) => {
                    // console.log(resp)
                    let data = resp.data
                    // if(resp.status===101){
                    //     window.location.href = "http://m.didao-zx.com/shop/redirect.php?_from=179e4c969714422c&redirect_uri=" + encodeURIComponent(window.location.origin+window.location.pathname);
                    //     return
                    // }
                    resolve(data)
                },
                error(error){
                //   console.error(error)
                    let err=error
                    reject(err)
                }
            });
        })
    },
  }
//   图片懒加载方法
  const lazyLoad = (params) => {
    let lazyload = new lazy(params)
    lazyload.render()
}
// 17.数字（int或字符串都支持，输出int）加减乘除方法
const allFunction = {
    add(){
        var res = 0;
        for(var i=arguments.length - 1;i>=0;i--){
            res += Number(arguments[i]);
        }
        return res;
    },
    plus(){
        console.log(arguments)
        
    },
    Multiply(){
        var res = 1;
        for(var i=arguments.length - 1;i>=0;i--){
            res *= Number(arguments[i]);
        }
        console.log(res)
        return res;
    },
    division(){
       
    }
//     if(mode == 'test'){
//         if(environment == 'baodan') converted_url = "http://192.168.10.4:9067/"+url
//         else if(environment == 'open') converted_url = "http://192.168.10.4:9049/"+url
//         else if(environment == 'openApi') converted_url = "http://192.168.10.4:9049/"+url
//         else if(environment == 'baodandai') converted_url = "https://www.easy-mock.com/"+url
//         else converted_url = "http://192.168.10.4:19097/"+url
//     }
//     else{
//         if(environment == 'baodan') converted_url = "http://baodan.qichekb.com/"+url
//         else if(environment == 'open') converted_url = "http://210.32.124.25:9088/"+url
//         else if(environment == 'openApi') converted_url = "http://210.32.124.25:9088/"+url
//         else if(environment == 'baodandai') converted_url = "https://www.easy-mock.com/api/"+url
//         // else converted_url = "http://210.32.124.25:9088/"+url
//         else converted_url = "https://youjieadmin.kongapi.com/"+url
//     }
  
//     return converted_url
//   }

}
// 判断一个数组、对象中是否含有该对象方法
const isAO = {
    isFunction(a,b){
        if(typeof a =='object' && Array.isArray(a)==true){
            if(typeof b=='function'){
                return  typeof a.b =='function'?true :false
            }else if(typeof b=='object'){
                JSON.stringify(a).indexOf(JSON.stringify(b))!=-1? true :false;
            }
        }else if(typeof a =='object'){
            if(typeof b=='function'){
                 return  typeof a.b =='function'?true :false
            }else if(typeof b=='object'){
                 //in方法可以检测原型链中的方法 例如"toString"
                 //return target in source
                  return b.hasOwnProperty(a)?true :false
            }
        }else if((typeof a =='string') && (typeof b=='string')){
            let isTRUE
            if(a.indexOf(b)=="-1"){
                isTRUE= 0
            }else{
                isTRUE=1
            }
            return  isTRUE==0? true : false
        }
    
    },
    isCun(a,b){

    }
}


  export {
    Storage,
    Didao_api,
    lazyLoad,
    allFunction,
    isAO
  }

