<template>
  <div>
      <el-form :model="shopdata" label-width="500px" class="shopFrom">
        <el-row>
          <el-col :span="2" :offset="2">镜片：</el-col>
           <el-col :span="8" >
             <el-select size="mini" v-model="shopdata.where" placeholder="请选择">
              <el-option
                v-for="item in where"
                :key="item.value"
                :label="item.value"
                :value="item.name">
              </el-option>
            </el-select>
           </el-col>
           <el-col :span="8" :offset="2">
               <el-radio v-model="shopdata.lens" label="left">左眼</el-radio>
                <el-radio v-model="shopdata.lens" label="right">右眼</el-radio>
           </el-col>
        </el-row>
        <el-row class="Shopbottom">
          <el-col :span="2" :offset="2">数量：</el-col>
          <el-col :span="4">
            <el-input v-model="shopdata.nums"></el-input>
          </el-col>
          <el-col :span="2" :offset="2">备注：</el-col>
          <el-col :span="10">
            <el-input size="medium" class="messageInput" v-model="shopdata.message" placeholder="请输入备注" :clearable="true"></el-input>
          </el-col>
        </el-row>
        <el-row class="commitShopMessage"> 
          <el-col :span="4" :offset="19">
            <el-button type="primary" @click="commitShopMessage"> 确定</el-button>
          </el-col>
        </el-row>
      </el-form>
  </div>
</template>

<script>
import _ from "lodash";
export default {
  name: "withShopModal",
  data() {
    return {
      shopdata: {
        where: "",
        lens: "left",
        nums: "",
        message: "",
        status:'2',
        price:'0',
        realSale:'0'
      },
      where: [
        {
          value: "镜片",
          name: "1"
        },
        {
          value: "镜架",
          name: "2"
        }
      ],
      rules:{
        eyes:[
          {required:true,message:'请选择种类',trigger:'change'}
        ],
        title:[
          {required:true,message:'请填写备注',trigger:'change'}
        ],
        nums:[
          {required:true,message:'请填写数量',trigger:'change'}
        ]
      }
    };
  },
  methods: {
    commitShopMessage() {
      let _this = this;
      // for (var key in _this.shopdata) {
      //   if (_this.shopdata[key] == "") {
      //     console.log(_this.shopdata[key])
      //     this.$message({
      //       type: "error",
      //       message: "请填写完整",
      //       showClose: true
      //     });
      //     return false;
      //   }
      // }
      let commitMessage = _.clone(_this.shopdata);
      // console.log(commitMessage)
      _this.$emit('commitMessage',commitMessage);
      setTimeout(() => {
        for (var key in _this.shopdata) {
          _this.shopdata[key] = "";
        }
        _this.shopdata.lens = "left";
        _this.shopdata.status = "2";
        _this.shopdata.price = "0";
      }, 1000);
    }
  },
  mounted() {
    // this.$myAjax({
    //   url:'pos-api/shopBy/getShopByList',
    //   success:function(res){
    //     //成功回调
    //   },error:function(err){
    //     //失败回调
    //   }
    // });
  }
};
</script>

<style scoped lang="scss">
.shopFrom {
  padding-top: 60px;
  padding-bottom: 30px;
  overflow: hidden;
}
.commitShopMessage {
  margin-top: 30px;
}
.Shopbottom {
  margin-top: 40px;
}
.messageInput {
  width: 100%;
  .el-input__inner {
    width: 100%;
  }
}
</style>