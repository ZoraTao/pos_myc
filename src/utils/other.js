const removeAllSpace = function (str, is_global = '') {
  /* 去掉空格方法 
   * 参数 str:字符串 is_global:'g' 是否去掉所有空格
   * 第二个参数不填默认只去除前后
   */
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g, "");
  if (is_global.toLowerCase() == "g") {
    result = result.replace(/\s/g, "");
  }
  console.log(result)
  return result;
}
// 将Object的属性输出成Array
const objToPropertyToArr = function (object) {
  var arr = [];
  var i = 0;
  for (var item in object) {
      arr[i] = item;
      i++;
  }
  return arr;
}

// 将Object的属性值输出成Array
const objToValueToArr = function (object) {
  var arr = [];
  var i = 0;
  for (var item in object) {
      arr[i] = object[item];
      i++;
  }
  return arr;
}

//将Object 转化成 Array
const objToArr = function (object) {
  var arr = []; 
  for(var key in object){ 
      if(!object.hasOwnProperty(key)){
          continue;
      }
      var item = {}; 
      item[key] = object[key]; 
      arr.push(item); 
  } 
  return arr
}

const randomNum = function (maxNum, minNum) {
  /* 产生范围内随机整数 
   * 参数 maxNum:最大数  minNum:最小数  参数可不分前后 parseInt绝对值处理
   * 不适用于验证码 
   */
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
      break;
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
      break;
    default:
      return 0;
      break;
  }
}
const getQueryString = function (name) {
  //this.$route.query.参数名 能直接获取参数
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return '';
}
const agetQueryString = function (url) {
  //第二种截取字符串方法,Object
  if (url) {
    url = url.substr(url.indexOf("?") + 1);
  }
  let result = {},
    queryString = url || location.search.substring(1),
    re = /([^&=]+)=([^&]*)/g,
    m

  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
  }

  return result;
}
const calcu = {
  jia: function () {
    if (arguments.length < 2) {
        if(arguments.length == 0){
            console.log('无参数传入');
            return 0;
        }
      return parseFloat(arguments[0]);
    }
    let result = new Number(0);
    for (var i = 0; i < arguments.length; i++) {
        arguments[i] =(arguments[i])
      result +=  parseFloat(arguments[i]);
    }
    console.log(result)
    return result
  },

  jian: function () {
    if (arguments.length < 2) {
        if(arguments.length == 0){
            console.log('无参数传入');
            return 0;
        }
      return parseFloat(arguments[0]);
    }
    let result = parseFloat(arguments[0]);
    for (var i = 0; i < arguments.length - 1; i++) {
      result -= parseFloat(arguments[i + 1]);
    }
    console.log(result)
    return result
  },

  cheng: function () {
    if (arguments.length < 2) {
        if(arguments.length == 0){
            console.log('无参数传入');
            return 0;
        }
      return parseFloat(arguments[0]);
    }
    let result = parseFloat(arguments[0]);
    for (var i = 0; i < arguments.length - 1; i++) {
      result *= parseFloat(arguments[i + 1]);
    }
    console.log(result)
    return result
  },
  chu: function () {
      //调用toFixed(num)方法后保留小数点后Num位数字
    if (arguments.length < 2) {
        if(arguments.length == 0){
            console.log('无参数传入');
            return 0;
        }
      return parseFloat(arguments[0]);
    }
    let result = parseFloat(arguments[0]);
    for (var i = 0; i < arguments.length - 1; i++) {
      result /= parseFloat(arguments[i + 1]);
    }
    console.log(result)
    return result
  }
}
const judgeCode = {
      // target需要验证的子字符   source父字符串   不区分大小写
    str:(target,source)=>{
        return new RegExp(target,"i").test(source);
    },
    obj:(target,source)=>{
      //in方法可以检测原型链中的方法 例如"toString"
      //return target in source
      return source.hasOwnProperty(target);
    },
    arr:(target,source)=>{
      return JSON.stringify(target).indexOf(JSON.stringify(source))!=-1
    }
}
const bindEvent = function (elem, type, selector, fn) {
  // 事件代理
  // 这样处理，可接收两种调用方式 bindEvent(div1, 'click', 'a', function () {...}) 和 bindEvent(div1, 'click', function () {...}) 这两种
  if (fn == null) {
      fn = selector
      selector = null
  }
  // 绑定事件
  elem.addEventListener(type, function (e) {
      var target
      if (selector) {
          // 有 selector 说明需要做事件代理
          // 获取触发时间的元素，即 e.target
          target = e.target
          // 看是否符合 selector 这个条件
          if (target.matches(selector)) {
              fn.call(target, e)
          }
      } else {
          // 无 selector ，说明不需要事件代理
          fn(e)
      }
  })
}

export {
  randomNum,
  removeAllSpace,
  getQueryString,
  agetQueryString,
  calcu,
  judgeCode,
  objToPropertyToArr,
  objToValueToArr,
  objToArr
}
