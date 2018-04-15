<template>
  <div class="cuActions" v-if="cuActionsData!==null">
    <div class="showList">
      <ul >
          <li v-for="(i,index) in state" 
          :key="i.id">
          <p>
            <input type="radio" 
              name="yesyes" 
              :checked='i.checked' 
              @click="changes(i,index)" 
              :value=index+1>
              {{i.activityName}}
            </p>
          </li> 
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "cuActions-modal",
  data() {
    return {
      state: null,
      cuActionsData: null //促销活动
    };
  },
  methods: {
    changes(i, index) {
      let _this = this
          _this.$nextTick(()=>{
      
      var radios = document.getElementsByName("yesyes");
      for (var i = 0; i < radios.length; i++) {
        //判断那个单选按钮为选中状态
        if (radios[i].checked) {
          
        }
      }
          })
      // for(var i=0;i<this.state.length;i++){
      //   this.state[i].checked = false;
      // }
      // this.state[index].checked=true
    },
    initSearch() {
      let _this = this;
      _this
        .$axios({
          url: "http://myc.qineasy.cn/pos-api/fullActivity/getFullActivityList",
          method: "post",
          params: {
            jsonObject: {
              activityStatus: "1"
            },
            keyParams: {
              weChat: true
            }
          }
        })
        .then(res => {
          if (res.data.code == 1) {
            let item = {
              activityName: "不参加",
              checked: true
            };
            _this.cuActionsData = res.data;
            let stade = res.data.data.fullActivitieList;
            for (var i = 0; i < stade.length; i++) {
              stade[i].checked = false;
            }
            stade.unshift(item);
            _this.$nextTick(()=>{
              _this.state = stade;
            })
          } else {
            _this.$message({
              type: "error",
              showClose: true,
              message: "请求数据出错"
            });
          }
        })
        .catch(err => {
          _this.$message({
            type: "error",
            showClose: true,
            message: "网络出错，请联系管理员"
          });
        });
    }
  },
  created() {
    this.initSearch();
    // console.log(this.cuActionsData)
  }
};
</script>

<style scoped lang="scss">
.cuActions {
  min-height: 200px;
  background: #fff;
  padding-bottom: 100px;
  overflow: hidden;
  .showList {
    padding-left: 50px;
    padding-top: 40px;
    ul {
      overflow: hidden;
      li {
        font-family: MicrosoftYaHei;
        font-size: 13px;
        color: #333333;
        letter-spacing: 0;
        padding-top: 18px;
      }
    }
  }
}
</style>