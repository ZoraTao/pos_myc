<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  html, body {
    min-width: 1270px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
    font-family: "MicrosoftYaHei","Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.65);
    background-color: #f4f4f5;
  }

  ul, li, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  a {
    color: #108ee9;
    background: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    transition: color .3s ease;
  }

  a:focus {
    text-decoration: none;
  }

  a:focus {
    outline: none;
  }

  a:focus, a:hover {
    color: #23527c;
    text-decoration: none;
  }

  #app {
    color: #2c3e50;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
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
      background: #E6E6E6;
    }
  }

  .content-wrapper {
    margin: 10px 15px;
    background: #ffffff;
  }

  .content-out-wrapper {
    margin: 10px 15px;
    min-height: 600px;
  }
  .el-input__inner{
    height: 30px !important;
    line-height: 30px !important;
    font-size: 12px;
    padding: 0 13px;
  }
  .el-input__icon{
    line-height: 28px !important;
  }
  .search-bt{
    background: #00AFE4;
    border-radius: 0 4px 4px 0;
    color: #ffffff;
    width: 34px;
    height: 29px;
    margin-top: 1px;
    margin-right: -30px;
    cursor: pointer;
    &:focus,&:hover{
      background: #009fcf;
      outline: none;
    }
  }
  .el-form-item__label{
    font-size: 12px;
    font-weight: 700;
    padding: 0;
  }
  .el-form--inline .el-form-item{
    margin-bottom: 12px;
    margin-right: 20px;
  }
  .el-table th {
    background: #B3E3F6 !important;
}
.el-dialog__header {
    background: url(http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/modal-top.2ccc913.png) no-repeat;
    padding: 0;
    padding-bottom: 7px !important;
    padding-top: 7px !important;
    border-bottom: none !important;
    background-size: 100%;
    color: #fff;
    text-align: left;
    .el-dialog__title{
      font-size: 16px;
      color: #FFFFFF;
      text-align: left;
      margin-left: 20px;
    }
    .el-dialog__headerbtn{
      top: 10px;
      right: 10px;
      font-size: 16px;
      i{
        color: #fff;
      }
    }
}
.el-dialog__body{
  padding: 15px 0;
}
.el-input{
  width: auto;
}
  /*公共首页*/
  .inner-index-box {
    .member-banner {
      width: 100%;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        object-fit: cover;
      }
    }

    .member-menus {
      width: 100%;
      margin: 10px auto;
      overflow: hidden;
      background: #fff;
      padding: 60px;
      .member-item {
        img {
          display: block;
          width: 100px;
          height: 100px;
          border-radius: 50%;
          margin: 0 auto;
        }
        span {
          width: 100%;
          font-size: 20px;
          color: #333333;
          text-align: center;
          margin-top: 14px;
          display: block;
        }
      }
    }
  }
  .el-table--scrollable-x .el-table__body-wrapper{
    &::-webkit-scrollbar{
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-track{
      background: #d4d2d2;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-thumb{
      background: #999999;
      border-radius: 2px;
    }
    &::-webkit-scrollbar-corner{
      background: #E6E6E6;
    }
  }
  .el-table thead {
    color: #555555;
  }
.noheader .el-dialog__header{
    height: 0;
    overflow: hidden;
    padding: 0 !important;
}
  .input_num{
    .el-input__inner{
      padding-right: 0 !important;
    }
  }
  .el-tabs--border-card>.el-tabs__header{
    background-color: #f4f4f5;
  }
</style>
