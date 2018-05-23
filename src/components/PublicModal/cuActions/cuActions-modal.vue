<template>
  <div class="cuActions" v-if="cuActionsData!==null">
    <div class="showList">
      <!-- <ul >
          <li v-for="(i,index) in state"
          :key="i.id">
          <p>
            <input type="radio"
              name="yesyes"
              :checked='i.checked'
              @click="changes(i,index)"
              :value=index+1
              :label='i.activityName'>
            </p>
          </li>
      </ul>
       -->
       <ul>
         <li v-for="(v,index) in state" :key="v.fullActivityId">
            <el-radio v-model="radio" :label="v.checked"  @change="changes(v,index,v.checked)">{{v.activityName}}&nbsp;<span class="mount">{{v.activityFullDetailMemo}}</span>
              <span v-show="v.bool">
                <span v-show="flag.money">
                    (此种优惠方案-{{flag.money}}元)
                </span>
                <span v-show="flag.discount">
                    (此种优惠方案{{flag.discount}}折)
                </span>
              </span></el-radio>
         </li>
       </ul>
    </div>
    <div class="sendAction">
       <el-button  plain @click="closeShow">关闭</el-button>
      <el-button  type="primary" @click="requestAction">确定</el-button>
    </div>

  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: "cuActions-modal",
  data() {
    return {
      radio:0,
      state: null,
      cuActionsData: null, //促销活动
      nowAction:null,
      flag:{
        money:'',//优惠金额
        discount:'',//优惠打折
        actionId:'',//活动id
      }
    };
  },
  props:['numCount','saleCount'],
  methods: {
    //关闭
    closeShow(){
      this.$emit('closeShow')
    },
    //请求活动
    requestAction(data){
      let _this = this;
      // console.log(_this.nowAction)
      if(_this.nowAction == null || _this.nowAction.checked == 0){
        this.flag.money='',//优惠金额
        this.flag.discount='',//优惠打折
        this.flag.actionId='',//活动id
        _this.$emit('actionMessage',_this.flag)
        this.$emit('closeShow')
        return
      }
        this.flag.money='',//优惠金额
        this.flag.discount='',//优惠打折
        this.flag.actionId='',//活动id
      _this.$myAjax({
        url:'pos-api/fullActivity/getDetail',
        data:{
          fullActivityId:this.nowAction.fullActivityId,//满减活动id
          totalPrice:_this.saleCount,//总金额,
          totalCount:_this.numCount,//商品总数量
        },
        success:function(res){
          console.log(res)
            if(res.code == 1){
                if(res.data.join == false){
                  _this.$message({
                      type:'warning',
                      message:'当前订单不符合活动',
                      closeShow:true
                    })
                }else if(res.data.join == true){
                  _this.$message({
                      type:'success',
                      message:'成功参加活动',
                      closeShow:true
                    })
                    if(res.data.detail.cashFlag == 1){//优惠现金
                        _this.flag.money = res.data.detail.cashAmount;//优惠金额
                    }else if(res.data.detail.discountFlag ==1 ){//优惠打折
                        _this.flag.discount = res.data.detail.discountAmount;//优惠折数
                    }
                    _this.$emit('actionData',res.data.detail)
                    _this.flag.actionId = res.data.detail.fullActivityId;//优惠活动id
                    _this.$emit('actionMessage',_this.flag)
                    setTimeout(function(){
                      _this.$emit('closeShow')
                    },500)
                }
            }else{
              _this.$message({
                      type:'danger',
                      message:'请求失败',
                      closeShow:true
                    })
            }
        },error:function(err){
          _this.$message({
            type:'error',
            message:'服务端通信失败',
            closeShow:true
          })
        }
      })
    },
    changes(data,index,$index) {
      let _this = this;
      for(let i=0;i<_this.state.length;i++){
         _this.state[i].bool = false;
      }
      _this.state[index].bool = true;
      let newdata = _this.state[index];
      _this.state.splice(index,1,newdata)
      _this.nowAction = _this.state[index];
      this.flag.money='';//优惠金额
        this.flag.discount='';//优惠打折
        this.flag.actionId='';//活动id
      // console.log(_this.state)
      // console.log(data,index,$index)
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
            // fullType=2：满额  1： 满件
            let item = {
              activityName: "不参加",
              checked: 0,
              bool:true
            };
            _this.cuActionsData = res.data;
            let stade = res.data.data.fullActivitieList;
            for (var i = 0; i < stade.length; i++) {
              stade[i].checked = i+1;
              stade[i].bool =false;
            }
            stade.unshift(item);
            _this.state = stade;
            // console.log(_this.state);
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
  padding-bottom: 20px;
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
.sendAction{
  height: 40px;
  margin-top: 40px;
  width: 200px;
  float: right;
  .el-button{}
}
.mount{
  color:#999;
}
</style>
