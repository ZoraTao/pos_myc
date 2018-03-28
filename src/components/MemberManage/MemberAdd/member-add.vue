<template>
  <div class="add-member-box">
    <AddMember></AddMember>
    <el-button type="primary" size="small" class="mgt20 mgl20">保存并提交</el-button>
  </div>
</template>

<script>
  import AddMember from '../../PublicModal/addMember/add-member-modal.vue'

  export default {
    name: "member-add",
    components: {
      AddMember
    },
    data() {
      return {}
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
