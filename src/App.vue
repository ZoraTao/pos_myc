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

<style>
*{
  box-sizing: border-box;
}
html,body{
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
  font-family: "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: rgba(0, 0, 0, 0.65);
  background-color: #fff;
}
ul,li{
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
    text-decoration: underline;
    text-decoration-skip: ink;
}
a:focus {
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
}
a:focus, a:hover {
    color: #23527c;
    text-decoration: underline;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
