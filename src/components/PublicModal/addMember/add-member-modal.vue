<template>
  <div class="addMemberContent">
    <el-form :model="addMemberForm" ref="addMemberForm" status-icon label-width="80px" class="demo-ruleForm">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item style="margin-left:10px;" label="类型：" prop="type">
            <el-select v-model="addMemberForm.type" filterable placeholder="请选择" style="width: 120px">
              <el-option
                v-for="item in memberType"
                :key="item.cardId"
                :label="item.memberCardName"
                :value="item.cardId">
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
            :rules="{required: true, message: '请输入姓名', trigger: 'blur'}"
            style="margin-left:10px;">
            <el-input v-model="addMemberForm.name" placeholder="请输入" style="min-width: 120px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item
            style="margin-left:10px;"
            label="联系手机："
            prop="telphone"
            :rules="{required: true, message: '请输入手机号', trigger: 'blur'}">
            <el-input v-model="addMemberForm.telphone" placeholder="请输入手机号" style="min-width: 120px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item
            style="margin-left:10px;"
            label="性别："
            prop="sex"
            :rules="{required: true}">
            <el-radio-group v-model="addMemberForm.sex">
              <el-radio label="M">男</el-radio>
              <el-radio label="F">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-form-item
            label="出生日期："
            prop="birthday"
            :rules="{required: true, message: '请选择出生日期', trigger: 'blur'}">
            <el-date-picker
              style="margin-left:10px;width: 120px"
              type="date"
              placeholder="选择日期"
              v-model="addMemberForm.birthday"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <!--<el-col :span="6">-->
        <!--<span class="addMemberInfo">如:19880901</span>-->
        <!--</el-col>-->
        <el-col :span="6">
          <el-form-item style="margin-left:10px;" label="职业：" prop="job">
            <el-select v-model="addMemberForm.job" placeholder="请选择">
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
            <template>
              <area-select style="margin-top: 5px;margin-bottom: -10px;" :level='2' type='text'
                           v-model='addMemberForm.adr'></area-select>
            </template>
          </el-form-item>
          <el-col :span="18">
            <el-form-item prop="adr.address">
              <el-input v-model="addMemberForm.address" placeholder="请填写具体地址" style="width:100%;"></el-input>
            </el-form-item>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-form-item label="备注：" prop="note">
          <el-col :span="18">
            <el-input v-model="addMemberForm.note" style="margin-left:10px;width: 100%"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-form-item label="会员来源：" prop="memberFrom">
            <el-select style="margin-left:10px;" v-model="addMemberForm.memberFrom" filterable placeholder="请选择">
              <el-option
                v-for="item in memberFrom"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item style="margin-left:10px;" label="会员状态：" prop="status">
            <el-select style="margin-left:10px;" v-model="addMemberForm.status" placeholder="请选择">
              <el-option
                v-for="item in memberStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item style="margin-left:10px;" label="会员属性：" prop="attributes">
            <el-select style="margin-left:10px;" v-model="addMemberForm.attributes" placeholder="请选择">
              <el-option
                v-for="item in memberAttributes"
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
          <el-form-item label="负责部门：" prop="orgName">
            <el-select style="margin-left:10px;" v-model="addMemberForm.orgName" placeholder="请选择">
              <el-option
                label="毛源昌杭州西湖店"
                value="0">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item style="margin-left:10px;" label="负责员工：" prop="resEmployees">
            <el-select style="margin-left:10px;" v-model="addMemberForm.resEmployees" placeholder="请选择">
              <el-option
                label="白小亭"
                value="0">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <input type="hidden" v-model="submit"/>
  </div>
</template>

<script>

  export default {
    name: 'AddMember',
    data() {
      return {
        isSubmit: '',
        memberType: [],//会员类型
        memberFrom: [ //会员来源
          {
            value: '0',
            label: '门店扫码'
          },
          {
            value: '1',
            label: '冲广告'
          },
          {
            value: '2',
            label: '冲品牌'
          },
          {
            value: '3',
            label: '冲服务'
          },
          {
            value: '4',
            label: '朋友介绍'
          },
          {
            value: '5',
            label: '偶然路过'
          },
          {
            value: '6',
            label: '宣传单'
          },
        ],
        memberStatus: [ //会员状态
          {
            value: '0',
            label: '正式客户'
          },
          {
            value: '1',
            label: '前期会员'
          },
          {
            value: '2',
            label: '预登记会员'
          },
        ],
        memberAttributes: [ //负责员工
          {
            value: '0',
            label: '个人'
          },
          {
            value: '1',
            label: '企业'
          }
        ],
        options: [{ //职业
          value: '0',
          label: 'IT'
        },
          {
            value: '1',
            label: '教师'
          },
          {
            value: '2',
            label: '自由职业'
          },
          {
            value: '3',
            label: '其他'
          }
        ],
        addMemberForm: {
          name: '',//姓名
          cardId: '',//类型id
          telphone: '',//电话
          birthday: '',//生日
          sex: 'M',//性别
          district: '',//区域
          job: '',//职业
          userId: '',
          orgId: '',
          adr: [],//省市区
          address: '',//详细地址
          note: '',//备注
          memberFrom: '',//会员来源
          status: '',//会员状态
          attributes: '',//会员属性
          orgName: '',//负责部门
          resEmployees: ''//负责员工
        }
      }
    },
    props: ['submit'],
    created: function () {
      this.getMemberCard();
    },
    beforeUpdate: function () {
      this.isSubmit = this.submit;
    },
    methods: {
      //向父组件传送的数据
      sendToParent() {
        this.$emit('listenToChild', this.addMemberForm)
      },
      //取会员类型
      getMemberCard(){
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/member-api/card/getCardList',
          method: 'post',
          params: {
            jsonObject: {},
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if(response.data.code != '1'){
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            }else {
              console.info(response.data.data)
              that.memberType = response.data.data.cardList;
            }

          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      }
    },
    watch: {
      isSubmit: function (val) {
        if (val == true) {
          this.sendToParent()
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../area-style";

  .addMember {
    .addMemberContent {
      padding-top: 20px;
      .addMemberRow {
        padding: 20px;
        padding-top: 0;
        width: 100%;
        overflow: hidden;
        .addMemberGroup {
          width: 100%;
          overflow: hidden;
          .addMemberItem {
            height: 28px;
            line-height: 28px;
            overflow: hidden;
            float: left;
            .addMemberLabel {
              min-width: 80px;
              float: left;
              text-align: right;
              margin-right: 6px;
              p {
                font-size: 12px;
                color: #666666;
                i {
                  vertical-align: middle;
                  margin-right: 3px;
                }
              }
            }
            .addMemberInput {
              float: left;
              font-size: 12px;
              color: #333333;
              span {
                color: #666666;
                font-weight: 400;
              }
            }
            .addMemberInfo {
              float: left;
              font-size: 12px;
              color: #AAAAAA;
              margin-left: 10px;
            }
            .cityInput {
              margin-right: 5px;
            }
          }
        }
      }
    }
  }

</style>
<style scoped>
  .el-form-item.el-form-item--feedback {
    margin-bottom: 10px !important;
  }
</style>
