<template>
<div class="addMemberContent">
    <el-form label-width="80px" class="demo-ruleForm">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item style="margin-left:10px;" label="类型：" prop="name">
              <el-select v-model="value" placeholder="请选择" style="width: 100px">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item
                  label="姓名："
                  prop="name"
                  :rules="{required: true}"
                  style="margin-left:10px;">
                    <el-select style="width: 100px" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item
                  style="margin-left:10px;"
                  label="联系手机："
                  prop="name"
                  :rules="{required: true}">
                    <el-input placeholder="请输入手机号" style="width: 110px"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="7">
                <el-form-item
                  style="margin-left:10px;"
                  label="性别："
                  prop="name"
                  :rules="{required: true}">
                    <el-radio v-model="sex" label="1">男</el-radio>
                    <el-radio v-model="sex" label="2">女</el-radio>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-form-item
                  label="出生日期："
                  prop="name"
                  :rules="{required: true}">
                    <el-date-picker
                    style="margin-left:10px;width: 120px"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <!--<el-col :span="6">-->
                <!--<span class="addMemberInfo">如:19880901</span>-->
            <!--</el-col>-->
            <el-col :span="6">
                <el-form-item style="margin-left:10px;" label="职业：" prop="name">
                    <el-select v-model="value" placeholder="请选择" style="width: 120px">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="20">
                <el-form-item label="联系地址：">
                    <el-col :span="6">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="18">
                        <el-input  placeholder="请填写具体地址" style="width:100%;"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-form-item label="备注：" prop="name">
                 <el-col :span="18">
                    <el-input style="margin-left:10px;width: 100%"></el-input>
                </el-col>
            </el-form-item>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="7">
                <el-form-item label="会员来源：" prop="name">
                    <el-select style="margin-left:10px;" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item style="margin-left:10px;" label="会员状态：" prop="name">
                    <el-select style="margin-left:10px;" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item style="margin-left:10px;" label="会员属性：" prop="name">
                    <el-select style="margin-left:10px;" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="7">
                <el-form-item label="负责部门：" prop="name">
                    <el-select style="margin-left:10px;" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item style="margin-left:10px;" label="负责员工：" prop="name">
                    <el-select style="margin-left:10px;" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</div>
</template>

<script>

export default {
  name: 'AddMember',
  data () {
    return {
        sex:'1',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        value: ''
    }
  },
  methods:{

  }
}
</script>

<style lang="scss">
.addMember{
    .addMemberContent{
        padding-top: 20px;
        .addMemberRow{
            padding: 20px;
            padding-top: 0;
            width: 100%;
            overflow: hidden;
            .addMemberGroup{
                width: 100%;
                overflow: hidden;
                .addMemberItem{
                    height: 28px;
                    line-height: 28px;
                    overflow: hidden;
                    float: left;
                    .addMemberLabel{
                        min-width: 80px;
                        float: left;
                        text-align: right;
                        margin-right: 6px;
                        p{
                            font-size: 12px;
                            color: #666666;
                            i{
                                vertical-align: middle;
                                margin-right: 3px;
                            }
                        }
                    }
                    .addMemberInput{
                        float: left;
                        font-size: 12px;
                        color: #333333;
                        span{
                            color: #666666;
                            font-weight: 400;
                        }
                    }
                    .addMemberInfo{
                        float: left;
                        font-size: 12px;
                        color: #AAAAAA;
                        margin-left: 10px;
                    }
                    .cityInput{
                        margin-right: 5px;
                    }
                }
            }
        }
      .el-form-item {
        margin-bottom: 10px;
      }
    }
}
</style>
