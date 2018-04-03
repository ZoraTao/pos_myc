<template>
  <div>
    <el-container>
      <el-header>
        <div class="routerHeader">
          <router-link 
          to="/foo"   
          v-for='(item, index) in lists' 
          class="cloundLinks"
          :key="item.name" tag="span" >
          <i v-if="index>=1">></i>
          <em :class="[ index ==0&& lists.length>1? 'backFirst' : '']">{{item.name}}</em>
          </router-link>
        </div>
          
      </el-header>
      <el-main>
        <div class="routerContent">
          <el-row :gutter="90">
            <el-col :span="3" v-for="(items,index) in cloundDatas" :key="items.name">
                <div class="grid-content bg-purple">
                  <img :src="url" alt="" 
                  ref="enterThisCloud"
                   :data-url=items.urls
                   @dblclick="getcContent($event,index)"
                   >
                 <span>{{items.name}}</span> 
                </div>
            </el-col>
          </el-row>
        </div>
          
      </el-main>
    </el-container>
  </div>
</template>
<!--单页面应用  根据后台返回参数进行重新渲染-->
<script>
  export default {
      data() {
        return {
          url: 'https://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_folder.png',
          cloundDatas:[
            {
              name:'七夕言情',
              urls:'111'
            },
            {
              name:'大树下',
              urls:'222'
            },
            {
              name:'公园',
              urls:'333'
            }
          ],
          lists:[
            {
              name:'全部文件',
              url:'111'
            },{
              name:'我的私人',
              url:'222'
            },
          ]
        }
      },
      methods:{
        getcContent($event,index){
          console.log(this.$refs.enterThisCloud[index].dataset.url);//获取自带参数
        }
      }
  }
</script>

<style scoped lang="scss">
  @import "../../reset";

.el-header{
  background-color: $white;
  border: 1px solid #E1E1E1;
  height: 60px;
  line-height: 60px;
  box-shadow: 0px -1px 2px rgba($color: #000, $alpha: 0.1);
  font-family: MicrosoftYaHei;
  font-size: 13px;
  color: #555555;
  letter-spacing: 0;
  .backFirst{
    color:#00AFE4;
  }
  .cloundLinks{
    cursor: pointer;
  }
  .routerHeader{
    max-width: 1270px;
    box-sizing: content-box;
  }
}
.el-main{
  background-color: $white;
  border: 1px solid #E1E1E1;
  border-top: none;
  box-shadow: 0px 2px 2px rgba($color: #000, $alpha: 0.1);
  font-family: MicrosoftYaHei;
  min-height: 400px;
  font-size: 14px;
  color: #333333;
  text-align: center;
  .routerContent{
    max-width: 1270px;
    box-sizing: content-box;
  }
  img{
    display: block;
    margin: 0 auto;
    width:72px;
  }
  .grid-content{
    span{
      display: block;
      margin-top: 20px;
    }
  }
}

</style>
<style>
.el-main{
  padding: 40px;
}
</style>
