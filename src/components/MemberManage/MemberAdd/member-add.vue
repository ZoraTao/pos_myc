<template>
  <div class="add-member-box">
    <AddMember :submit="isSubmit" v-on:listenToChild="showData"></AddMember>
    <el-button type="primary" size="small" class="mgt20 mgl20" @click="isSubmit=!isSubmit">保存并提交</el-button>
  </div>
</template>

<script>
  import AddMember from '../../PublicModal/addMember/add-member-modal.vue'
  import { Message } from 'element-ui';

  export default {
    name: "member-add",
    components: {
      AddMember
    },
    data() {
      return {
        isSubmit:false,
      }
    },
    methods: {
      //从子组件取到的数据
      showData(data){
        console.info(data)
        var that = this;

        if(data.name!='' && data.telphone!='' && data.birthday!='' && data.sex!=''){
          that.$axios({
            url: 'http://myc.qineasy.cn/member-api/member/addMember',
            method: 'post',
            params: {
              jsonObject: data,
              keyParams: {
                weChat: true,
                userId: "8888",
                orgId: "11387"
              }
            }
          })
            .then(function (response) {
              console.info(response.data.data)
              that.$message({
                showClose: true,
                message: '新增会员成功',
                type: 'success'
              });
            })
            .catch(function (error) {
              console.info(error)
              that.$message({
                showClose: true,
                message: error,
                type: 'error'
              })
            })
        }else {
          that.$message({
            showClose: true,
            message: '请输入完整信息',
            type: 'error'
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../reset";

.add-member-box{
  background-color: #ffffff;
  width: 98%;
  padding-bottom: 20px;
  margin: 10px auto;
}
</style>
