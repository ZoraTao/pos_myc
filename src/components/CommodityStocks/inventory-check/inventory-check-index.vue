<template>
  <div class="content-out-wrapper stocks-content">
    <!--top-->
    <el-row class="inquiry-row mgt6">
      <el-col :span="21" v-if="normalsearch">
        <el-form-item label="仓库：">
          <el-select v-model="formInline.select1" placeholder="请选择" style="width: 100px">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" plain @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-col>
    </el-row>
    <!--/top-->


  </div>
</template>

<script>
  export default {
    name: "inventory-check-index",
    components: {},
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="scss">
  @import "../../MemberManage/MemberInquiry/member-public-css";
  @import "../../MemberManage/MemberInquiry/tabs-css";

</style>
