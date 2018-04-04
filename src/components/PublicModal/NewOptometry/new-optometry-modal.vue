<template>
<div class="newOptometry pb10">
    <div class="textCenter newOptometryBody">
        <div class="newOptometryPhone">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="手机号:" prop="telphone">
                    <el-input v-model="ruleForm.telphone" @input="searchUser"></el-input>
                </el-form-item>
                <el-form-item label="姓名:" v-show="ruleForm.telphone.length==11">
                    <el-input  v-if="!ruleForm.hasMember" v-model="ruleForm.name"></el-input>
                    <span class="nopText" v-else>{{ruleForm.name}}</span>
                </el-form-item>
                <el-form-item label="会员卡号:" v-show="ruleForm.telphone.length==11&&ruleForm.hasMember">
                    <span class="nopText">{{ruleForm.memberCardNo}}</span>
                </el-form-item>
                <el-form-item label="性别:" v-show="ruleForm.telphone.length==11">
                    <el-select  v-if="!ruleForm.hasMember" v-model="ruleForm.sex" placeholder="请选择">
                        <el-option label="男" value="F"></el-option>
                        <el-option label="女" value="M"></el-option>
                    </el-select>
                    <span class="nopText" v-else>{{ruleForm.sex=='M'?'女':'男'}}</span>
                </el-form-item>
                <el-form-item label="出生年月:" v-show="ruleForm.telphone.length==11">
                    <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    v-if="!ruleForm.hasMember" v-model="ruleForm.birthday"
                    placeholder="选择日期">
                    </el-date-picker>
                    <span class="nopText" v-else>{{ruleForm.birthday}}</span>
                </el-form-item>
            </el-form>
        </div>
        <div class="newOptometryOptician">
            <label class="mgr10">配镜处方：</label>
            <el-checkbox v-model="prescription.isDistance">远用</el-checkbox>
            <el-checkbox v-model="prescription.isNigh">近用</el-checkbox>
            <el-checkbox v-model="prescription.isContact">渐进</el-checkbox>
            <el-checkbox v-model="prescription.isGradually">隐形</el-checkbox>
        </div>
        <ul class="glass_combination_table">
            <li class="clearfix combination_table_list" v-if="prescription.isDistance">
                <ul class="glass_table_head">
                    <li class="wid80"> &nbsp;&nbsp;</li>
                    <li class="w10"> &nbsp;&nbsp;</li>
                    <li class="w90">SPH</li>
                    <li class="w90">CYL</li>
                    <li class="w90">AX</li>
                    <li class="w90">VA</li>
                    <li class="w90">DPD</li>
                    <li class="w90">NPD</li>
                    <li class="w90">HPD</li>
                    <li class="w90">ADD</li>
                </ul>
                <ul>
                    <li class="fn-left  msg_left">远用</li>
                    <li class="fn-left glass_table_770 pb10">
                        <table>
                            <tr class="">
                                <td class="w10 ft_bold">L</td>
                                <td class="w90"><el-input v-model="distanceData[0].sph"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[0].cyl"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[0].ax"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[0].va"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[0].dpd"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[0].npd"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[0].hpd"></el-input></td>
                                <td class="w90 glass_table_2x" rowspan="2"><el-input v-model="distanceData[0].add"></el-input></td>
                            </tr>
                            <tr class="">
                                <td class="w10 ft_bold">R</td>
                                <td class="w90"><el-input v-model="distanceData[1].sph"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[1].cyl"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[1].ax"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[1].va"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[1].dpd"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[1].npd"></el-input></td>
                                <td class="w90"><el-input v-model="distanceData[1].hpd"></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list" v-if="prescription.isNigh">
                <ul>
                    <li class="fn-left  msg_left">近用</li>
                    <li class="fn-left glass_table_770 pb10">
                        <table>
                            <tr class="">
                                <td class="w10 ft_bold">L</td>
                                <td class="w90"><el-input v-model="nighData[0].sph"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[0].cyl"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[0].ax"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[0].va"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[0].dpd"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[0].npd"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[0].hpd"></el-input></td>
                            </tr>
                            <tr class="">
                                <td class="w10 ft_bold">R</td>
                                <td class="w90"><el-input v-model="nighData[1].sph"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[1].cyl"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[1].ax"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[1].va"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[1].dpd"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[1].npd"></el-input></td>
                                <td class="w90"><el-input v-model="nighData[1].hpd"></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>           
            <li class="clearfix combination_table_list" v-if="prescription.isContact">
                <ul>
                    <li class="fn-left  msg_left">隐形</li>
                    <li class="fn-left glass_table_770">
                        <table>
                            <tr class="">
                                <td class="w10 ft_bold">L</td>
                                <td class="w90"><el-input v-model="contactData[0].sph"></el-input></td>
                                <td class="w90"><el-input v-model="contactData[0].cyl"></el-input></td>
                                <td class="w90"><el-input v-model="contactData[0].ax"></el-input></td>
                                <td class="w90"><el-input v-model="contactData[0].va"></el-input></td>
                            </tr>
                            <tr class="">
                                <td class="w10 ft_bold">R</td>
                                <td class="w90"><el-input v-model="contactData[1].sph"></el-input></td>
                                <td class="w90"><el-input v-model="contactData[1].cyl"></el-input></td>
                                <td class="w90"><el-input v-model="contactData[1].ax"></el-input></td>
                                <td class="w90"><el-input v-model="contactData[1].va"></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>         
            <li class="clearfix combination_table_list" v-if="prescription.isGradually">
                <ul>
                    <li class="fn-left  msg_left">渐进</li>
                    <li class="fn-left glass_table_770">
                        <table>
                            <tr class="">
                                <td class="w10 ft_bold">L</td>
                                <td class="w90"><el-input v-model="graduallyData[0].npd"></el-input></td>
                            </tr>
                            <tr class="">
                                <td class="w10 ft_bold">R</td>
                                <td class="w90"><el-input v-model="graduallyData[0].npd"></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>        
        </ul>

        <div class="newOptometryOptician">
                <label>检查数据：</label>
        </div>            
        <ul class="glass_combination_table">
            <li class="clearfix combination_table_list">
                <ul>
                    <li class="fn-left msg_left">旧镜</li>
                    <li class="fn-left glass_table_770">
                        <div class="labelInput">
                            <label class="w10">R</label><el-input style="width:80px" v-model="prescriptions.originalR"></el-input>
                        </div>
                        <div class="labelInput">
                            <label class="w10">L</label><el-input style="width:80px" v-model="prescriptions.originalL"></el-input>
                        </div>   
                        <div class="labelInput">
                            <label class="w10">PD</label><el-input style="width:80px" v-model="prescriptions.originalPd"></el-input>
                        </div>                            
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list">
                <ul>
                    <li class="fn-left msg_left breakMsg">眼部<br/>健康</li>
                    <li class="fn-left glass_table_770">
                        <div class="labelInput">
                            <label>上下眼睑：</label><el-input style="width:80px" v-model="health.k1"></el-input>
                        </div>
                        <div class="labelInput">
                            <label>角膜：</label><el-input style="width:80px" v-model="health.k2"></el-input>
                        </div>   
                        <div class="labelInput">
                            <label>结膜：</label><el-input style="width:80px" v-model="health.k3"></el-input>
                        </div>      
                        <div class="labelInput">
                            <label>泪液：</label><el-input style="width:80px" v-model="health.k4"></el-input>
                        </div>    
                        <div class="labelInput">
                            <label>其他：</label><el-input style="width:80px" v-model="health.k5"></el-input>
                        </div>                            
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list">
                <ul class="glass_table_head">
                    <li class="wid80"> &nbsp;&nbsp;</li>
                    <li class="w10"> &nbsp;&nbsp;</li>
                    <li class="w90">SPH</li>
                    <li class="w90">CYL</li>
                    <li class="w90">AX</li>
                    <li class="w90">VA</li>
                    <li class="w90">PD</li>
                    <li class="w90">ADD</li>
                </ul>
                <ul>
                    <li class="fn-left  msg_left">检影</li>
                    <li class="fn-left glass_table_770 pb10">
                        <table>
                            <tr class="">
                                <td class="w10 ft_bold">L</td>
                                <td class="w90"><el-input v-model="skiascopyData[0].sph"></el-input></td>
                                <td class="w90"><el-input v-model="skiascopyData[0].cyl"></el-input></td>
                                <td class="w90"><el-input v-model="skiascopyData[0].ax"></el-input></td>
                                <td class="w90"><el-input v-model="skiascopyData[0].va"></el-input></td>
                                <td class="w90"><el-input v-model="skiascopyData[0].pd"></el-input></td>
                                <td class="w90 glass_table_2x" rowspan="2"><el-input v-model="skiascopyData[0].add"></el-input></td>
                            </tr>
                            <tr class="">
                                <td class="w10 ft_bold">R</td>
                                <td class="w90"><el-input v-model="skiascopyData[1].sph"></el-input></td>
                                <td class="w90"><el-input v-model="skiascopyData[1].cyl"></el-input></td>
                                <td class="w90"><el-input v-model="skiascopyData[1].ax"></el-input></td>
                                <td class="w90"><el-input v-model="skiascopyData[1].va"></el-input></td>
                                <td class="w90"><el-input v-model="skiascopyData[1].pd"></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list pt10">
                <ul>
                    <li class="fn-left  msg_left">主观</li>
                    <li class="fn-left glass_table_770">
                        <table>
                            <tr class="">
                                <td class="w10 ft_bold">L</td>
                                <td class="w90"><el-input v-model="subjectivityData[0].sph"></el-input></td>
                                <td class="w90"><el-input v-model="subjectivityData[0].cyl"></el-input></td>
                                <td class="w90"><el-input v-model="subjectivityData[0].ax"></el-input></td>
                                <td class="w90"><el-input v-model="subjectivityData[0].va"></el-input></td>
                                <td class="w90"><el-input v-model="subjectivityData[0].pd"></el-input></td>
                                <td class="w90 glass_table_2x" rowspan="2"><el-input v-model="skiascopyData[0].add"></el-input></td>
                            </tr>
                            <tr class="">
                                <td class="w10 ft_bold">R</td>
                                <td class="w90"><el-input v-model="subjectivityData[1].sph"></el-input></td>
                                <td class="w90"><el-input v-model="subjectivityData[1].cyl"></el-input></td>
                                <td class="w90"><el-input v-model="subjectivityData[1].ax"></el-input></td>
                                <td class="w90"><el-input v-model="subjectivityData[1].va"></el-input></td>
                                <td class="w90"><el-input v-model="subjectivityData[1].pd"></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list">
                <ul>
                    <li class="fn-left glass_table_770">
                        <div class="labelInput mgl30">
                            <label>WORTH4：</label><el-input v-model="prescriptions.worth4"></el-input>
                        </div>
                        <div class="labelInput mgl30">
                            <label>立体视：</label><el-input v-model="prescriptions.stereopsis"></el-input>
                        </div>   
                        <div class="labelInput mgl30">
                            <label>NAR/PRA：</label><el-input v-model="prescriptions.narpra"></el-input>
                        </div>                            
                    </li>
                </ul>
            </li>
        </ul>    
        <ul class="optometryMemo">
            <li class="fn-left ft_bold mgr10">验光备注：</li>
            <li class="fn-left glass_table_770">
                <el-input
                v-model="prescriptions.memo"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"></el-input>
            </li>
        </ul>           
        <ul class="optometryMemo">
            <li class="fn-left glass_table_770">
                <div class="labelInput lineHeightAuto">
                    <label class="mgr10">验光来源：</label>
                    <el-select style="width:120px" v-model="prescriptions.source" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="labelInput lineHeightAuto mgl30">
                    <label class="mgr10">验光师：</label>
                    <el-select style="width:120px" v-model="prescriptions.optometrist" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>   
                <div class="labelInput lineHeightAuto mgl30">
                    <label class="mgr10">验光日期 :</label>
                    <el-date-picker
                    v-model="prescriptions.prescriptionTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>                           
            </li>
        </ul>   
    </div>
</div>
</template>

<script>
export default {
  name: "NewOptometryModal",
  props: ["submit"],
  data() {
    return {
      options: [],
      value: "",
      needReg: false,
      ruleForm: {
        name: "",
        hasMember: false,
        telphone: "",
        memberCardNo: "",
        sex: "",
        birthday: ""
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      prescription: {
        isDistance: true,
        isNigh: false,
        isContact: false,
        isGradually: false
      },
      distanceData: [
        {
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          dpd: "",
          npd: "",
          hpd: "",
          add: ""
        },
        {
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          dpd: "",
          npd: "",
          hpd: ""
        }
      ],
      nighData: [
        {
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          dpd: "",
          npd: "",
          hpd: ""
        },
        {
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          dpd: "",
          npd: "",
          hpd: ""
        }
      ],
      contactData: [
        {
          sph: "",
          cyl: "",
          ax: "",
          va: ""
        },
        {
          sph: "",
          cyl: "",
          ax: "",
          va: ""
        }
      ],
      graduallyData: [
        {
          npd: ""
        },
        {
          npd: ""
        }
      ],
      skiascopyData: [
        {
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          pd: "",
          add: ""
        },
        {
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          pd: ""
        }
      ],
      subjectivityData: [
        {
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          pd: "",
          add: ""
        },
        {
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          pd: ""
        }
      ],
      health: {
        k1: "",
        k2: "",
        k3: "",
        k4: "",
        k5: ""
      },
      prescriptions: {
        createEndTime: "",
        createStartTime: "",
        createTime: "",
        createUser: "",
        createUserName: "",
        customerName: "",
        memberId: "",
        memberName: "",
        memo: "",
        mobile: "",
        narpra: "",
        nub: "",
        optometrist: "",
        originalL: "",
        originalPd: "",
        originalR: "",
        prescribe: "",
        prescriptionEndTime: "",
        prescriptionId: "",
        prescriptionStartTime: "",
        prescriptionTime: "",
        retinoscopy: "",
        sex: "",
        shopId: "",
        shopName: "",
        size: "",
        source: "",
        status: "",
        stereopsis: "",
        subjective: "",
        worth4: ""
      }
    };
  },
  methods: {
    searchUser() {
      var that = this;
      if (this.ruleForm.telphone.length == 11) {
        that
          .$axios({
            url:
              "http://myc.qineasy.cn/member-api/member/getMemberListByBoYang",
            method: "post",
            params: {
              jsonObject: {
                telphone: this.ruleForm.telphone
              },
              keyParams: {
                weChat: true,
                userId: "8888",
                orgId: "11387"
              }
            }
          })
          .then(function(response) {
            if (response.data.code == "1") {
              Object.keys(that.ruleForm).forEach(function(trait) {
                if (trait != "telphone") {
                  that.ruleForm[trait] =
                    response.data.data.memberList[0][trait];
                }
              });
              that.ruleForm.hasMember = true;
              that.needReg = false;
            } else {
              Object.keys(that.ruleForm).forEach(function(trait) {
                if (trait != "telphone") {
                  that.ruleForm[trait] = "";
                }
              });
              that.needReg = true;
            }
          });
      }
    },
    submitThisModal() {
      var that = this;
      var memberId;
      if (that.needReg) {
        that
          .$axios({
            url: "http://myc.qineasy.cn/member-api/member/addMember",
            method: "post",
            params: {
              jsonObject: {
                name: that.ruleForm.name,
                telphone: that.ruleForm.telphone,
                birthday: that.ruleForm.birthday,
                sex: that.ruleForm.sex,
                district: "",
                address: "",
                email: ""
              },
              keyParams: {
                weChat: true,
                userId: "8888",
                orgId: "11387"
              }
            }
          })
          .then(function(response) {
            if (response.data.code == "1") {
              that.prescriptions.memberId = response.data.data.memberId;
            }
          });
      }
      var eyes = [];
      eyes.push({ key: 0, value: that.skiascopyData });
      eyes.push({ key: 1, value: that.subjectivityData });
      eyes.push({ key: 2, value: that.distanceData });
      eyes.push({ key: 3, value: that.nighData });
      eyes.push({ key: 4, value: that.contactData });
      eyes.push({ key: 5, value: that.graduallyData });
      that.prescriptions.memberName = that.ruleForm.name;
      that.prescriptions.customerName = that.ruleForm.name;
      that.prescriptions.sex = that.ruleForm.sex;
      //   that.prescriptions.nub=that.ruleForm.memberCardNo;
      var jsonObject = {
        eyes: eyes,
        prescriptions: that.prescriptions
      };
      setTimeout(() => {
        that
          .$axios({
            url: "http://myc.qineasy.cn/pos-api/prescriptions/addPrescriptions",
            method: "post",
            params: {
              jsonObject: jsonObject,
              keyParams: {
                weChat: true,
                userId: "8888",
                orgId: "11387"
              }
            }
          })
          .then(function(response) {
            if (response.data.code == 1) {
              that.$emit("getNewoptometry", jsonObject);
            }
          });
      }, 100);
    }
  },
  watch: {
    submit: function(value) {
      if (value == true) {
        this.submitThisModal();
      }
    }
  }
};
</script>

<style lang="scss">
.newOptometry {
  .el-dialog__body {
    padding: 0;
  }
  .el-checkbox__label {
    font-size: 12px;
  }
  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
    text-align: center;
  }
  .newOptometry {
    padding: 15px;
    font-size: 12px;
    .newOptometryPhone {
      .el-form-item {
        float: left;
        margin: 0;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        .el-form-item__label {
          margin-right: 10px;
          width: auto !important;
        }
        .el-form-item__content {
          margin-left: 0 !important;
          float: left;
          margin-right: 20px;
          .el-input {
            width: 80px;
          }
        }
      }
      overflow: hidden;
      padding: 10px 0;
      border-bottom: 1px dashed #d8d8d8;
      line-height: 29px;
      label {
        margin-right: 10px;
      }
      span,
      label {
        float: left;
      }
      label {
        margin: 0;
        &:not(:nth-of-type(1)) {
          margin-left: 30px;
        }
      }
      .nopText {
        float: left;
        color: #333333;
        margin-left: 5px;
        font-size: 12px;
        line-height: 40px;
      }
    }
    .newOptometryOptician {
      padding: 14px 10px;
      text-align: left;
      label {
        margin: 0;
      }
      .el-checkbox {
        margin-right: 10px;
      }
    }
    .optometryMemo {
      overflow: hidden;
      padding-top: 14px;
      background: #fff;
      li:first-child {
        font-size: 12px;
        color: #666666;
        margin-top: 2px;
      }
    }
  }
  .w10 {
    width: 10px !important;
  }
  .glass_combination_table {
    min-height: 100px;
    border: 1px solid #e1e1e1;
    overflow: hidden;
    li {
      float: left;
    }
  }

  .glass_table_head {
    // width: 850px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    text-align: center;
    font-size: 12px;
    color: #555555;
    letter-spacing: 0;
  }

  .glass_table_770 {
    // width: 770px;
    .el-input {
      width: 70px;
    }
  }

  .glass_table_head li {
    float: left;
  }

  .glass_table_770 td {
    text-align: center;
  }

  .glass_table_770 table tr {
    height: 40px;
    line-height: 40px;
  }

  .glass_table_770 tr.dis_bg td {
    background: rgba(246, 246, 246, 0.5);
  }

  .border_bottom {
    border-bottom: 1px solid #efefef;
  }

  .border_left {
    border-left: 1px solid #efefef;
    border-bottom: 1px solid #d2d2d2;
  }

  .msg_left {
    width: 80px !important;
    height: 82px;
    line-height: 82px;
    text-align: right;
    padding-right: 22px;
  }

  .combination_table_list {
    background: #fff;
    // margin-top: 13px;
    &:last-child {
      padding-bottom: 20px;
    }
  }

  .labelInput {
    float: left;
    line-height: 82px;
    height: 82px;
    label {
      min-width: 50px;
    }
    .el-input {
      width: 110px;
      padding: 0;
    }
  }
  .lineHeightAuto {
    line-height: 1 !important;
    height: auto !important;
  }

  .breakMsg {
    line-height: 20px;
    text-align: right;
    padding-right: 22px;
    margin-top: 20px;
    height: auto;
  }

  .wid80 {
    width: 80px !important;
  }

  .glass_old {
    height: 40px;
    margin-top: 24px;
  }

  .glass_old .data_li,
  .eye_healthy .data_li {
    float: left;
    padding: 0 20px;
    color: #333333;
  }

  .eye_healthy {
    height: 40px;
  }

  .glass_old .data_li span,
  .eye_healthy .data_li span {
    color: #666666;
    padding: 0 5px;
  }

  .over_scroll {
    overflow: auto;
  }

  .combination_footer {
    margin: 10px 0 10px 80px;
    height: 40px;
    line-height: 40px;
  }

  .combination_footer li {
    padding: 0 20px;
    font-size: 12px;
    color: #333333;
  }

  .combination_footer li span {
    color: #666666;
    padding: 0 5px;
  }

  .optometry_remarks {
    line-height: 20px;
  }

  .optometry_remarks_text {
    width: 670px;
    line-height: 20px;
    color: #333333;
    padding: 0 3px;
  }

  .optometry_origin,
  .optometrist {
    color: #666666;
    line-height: 20px;
    margin-right: 30px;
  }

  .optometry_origin span,
  .optometrist span {
    color: #333333;
    line-height: 20px;
    padding: 0 3px;
  }
  .glass_table_2x {
    input {
      padding: 35px 0;
      text-align: center;
    }
  }
}
</style>
