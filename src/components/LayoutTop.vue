<template>
<!------ Header top ------>
  <div class="header-top">
    <div class="tab-box">
      <ul>
        <li class="tab-item active">
          1111
        </li>
        <li class="tab-item">
          开单
          <i class="el-icon-close"></i>
        </li>
      </ul>
      <div class="header-top-right">
        <a href="javascript:;" class="am-ft-FF2601">
          <i class="anticon anticon-notification"></i>
          您有一个折扣签批已审核
        </a>
        <el-dropdown>
          <span class="el-dropdown-link">
            毛源昌眼镜店建国北路店
          <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown>
          <span class="el-dropdown-link">
            王大锤<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <a href="javascript:;" class="am-ft-white">
          <i class="anticon anticon-setting"></i>
        </a>
      </div>
    </div>
  </div>
  <!------ /Header top ------>

</template>

<script>

export default {
  name: 'LayoutTop',
  data () {
    return { }
  }
}
</script>

<style scoped lang="scss">
  .logo {
    width: 120px;
    height: 31px;
    background: #333;
    border-radius: 6px;
    margin: 16px 24px 16px 0;
    float: left;
  }
  .content-wrap{
    background:#fff;
    padding-top: 30px;
    min-height: 280px;
  }
  .tab-box{
    width: 100%;
    height: 30px;
    background: #001E3A;
  }
  .am-ft-FF2601{
  color: #FF2601;
  }
  .tab-box ul{
    height: 100%;
    float: left;
  }
  .tab-box ul .tab-item{
    min-width: 116px;
    position: relative;
    background: rgba(32,202,235,0.50);
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
  .tab-box ul .tab-item.active{
  background: #20CAEB !important;
  }
  .tab-box ul .tab-item i{
    position: absolute;
    right: 0;
    top: 0;
    color: #ccc;
    cursor: pointer;
  }
  .tab-box ul .tab-item:hover i{
  color: #ffffff;
  }
  .tab-box .header-top-right > a{
    display: inline-block;
    margin-right: 10px;
    line-height: 30px;
  }
  .header-top-right{
    overflow: hidden;
    height: 100%;
    text-align: right;
    color:#fff;
  }
  .el-dropdown-link{
    color:#fff;
  }
</style>
