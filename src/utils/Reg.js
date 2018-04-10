const RegTest = {
  //用户名正则，4到16位（字母，数字，下划线，减号）
  user(arg) {
    let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    return uPattern.test(arg);
  },
  passStrength(arg) {
    //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
    let pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
    return pPattern.test(arg);;
  },
  posInt(arg) {
    //正整数正则
    let posPattern = /^\d+$/;
    return posPattern.test(arg);
  },
  negInt(arg) {
    //负整数正则
    let negPattern = /^-\d+$/;
    return negPattern.test(arg);
  },
  int(arg) {
    //整数正则
    let intPattern = /^-?\d+$/;
    return intPattern.test(arg);
  },
  // num(arg){
  //   if(/^\d*\.?\d+$/.test(arg);){
  //     //正数正则
  //     return true
  //   }else if(/^-\d*\.?\d+$/.test(arg);){
  //     //负数正则
  //     return ture
  //   }else if( /^-?\d*\.?\d+$/.test(arg);){
  //     //数字正则 
  //     return true
  //   }
  // },
  email(arg) {
    //Email正则
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(arg);
  },
  phone(arg) {//《(^(0\d{2,3}([-|+])?)?\d{7}$)|(^(\d{3,4}([-|+])?)?\d{7,8}$)|》也可以是号码 电话的号码可以是区号+号码 区号-号码 号码
  //电话号码可以输入：电话或者手机 其中手机号码可以是(+86)、(86)+号码，
    return /(^([+]?(86)?[+]?)1[3-9]\d{9}$)/.test(arg);
  },
  Pid(arg) {
    //身份证号（18位）正则
    // return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(arg);
    var size = arg.split("");
    if (size.length == 15) {
      reg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/; //15位身份证验证
    } else if (size.length == 18) {
      reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/; //18位身份证验证
    } 
    return reg.test(size);
  },
  url(arg) {
    //URL正则
    return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(arg);
  },
  ipv4(arg) {
    //ipv4地址正则
    return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(arg);
  },
  rgb(arg) {
    //RGB Hex颜色正则#b8b8b8
    return /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(arg);
  },
  date(arg) {
    //日期判定 2018-03-02
    return /^\d{4}(\-)\d{1,2}\1\d{1,2}$/.test(arg);
  },
  qqId(arg) {
    //QQ号正则，5至11位
    return /^[1-9][0-9]{4,10}$/.test(arg);
  },
  wx(arg) {
    //微信号正则，6至20位，以字母开头，字母，数字，减号，下划线
    return /^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$/.test(arg);
  },
  carId(arg) {
    //车牌号正则
    return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/.test(arg);
  },
  chcn(arg) {
    //验证输入的只能是中文
    return new RegExp("^[\u4e00-\u9fa5]$").test(arg);
  },
  zipcode(arg){
    //邮编
    return /[1-9]\d{5}(?!\d)/.test(arg);
  },
  isNum(arg){
    //纯数字
    return /^[0-9]*$/.test(arg)
  }
}
export default RegTest
