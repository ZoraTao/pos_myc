<template>
<div class="newOptometry pb10">
    <div class="textCenter newOptometryBody">
        <div class="newOptometryPhone">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="手机号:" prop="telphone">
                    <el-input v-model.trim="ruleForm.telphone" @input="searchUser" style="width:110px"></el-input>
                </el-form-item>
                <el-form-item label="姓名:" v-show="ruleForm.telphone.length==11">
                    <el-input  v-if="!ruleForm.hasMember" v-model="ruleForm.name"></el-input>
                    <span class="nopText" v-else>{{ruleForm.name}}</span>
                </el-form-item>
                <el-form-item label="会员卡号:" v-show="ruleForm.telphone.length==11&&ruleForm.hasMember">
                    <span class="nopText">{{ruleForm.memberCardNo}}</span>
                </el-form-item>
                <el-form-item label="性别:" v-show="ruleForm.telphone.length==11">
                    <el-select v-if="!ruleForm.hasMember" v-model="ruleForm.sex" placeholder="请选择">
                        <el-option label="男" value="M"></el-option>
                        <el-option label="女" value="F"></el-option>
                    </el-select>
                    <span class="nopText" v-else>{{ruleForm.sex=='M'?'男':'女'}}</span>
                </el-form-item>
                <el-form-item label="出生年月:" v-show="ruleForm.telphone.length==11">
                    <el-date-picker
                    style="width:110px"
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
            <!-- <el-checkbox v-model="prescription.isDistance">远用</el-checkbox>
            <el-checkbox v-model="prescription.isNigh">近用</el-checkbox> -->
            <!-- <el-checkbox v-model="prescription.isGradually">渐进</el-checkbox>
            <el-checkbox v-model="prescription.isContact">隐形</el-checkbox> -->
        </div>
        <ul class="glass_combination_table pt20">
            <li class="clearfix combination_table_list">
                <ul class="glass_table_head">
                    <li class="wid80"> &nbsp;&nbsp;</li>
                    <li class="w10"> &nbsp;&nbsp;</li>
                    <li class="w74">球镜</li>
                    <li class="w74">柱镜</li>
                    <li class="w74">轴位</li>
                    <li class="w74">矫正视力</li>
                    <li class="w74">棱镜</li>
                    <li class="w74">基底</li>
                    <li class="w74">基弧</li>
                    <li class="w74">远瞳距</li>
                    <!-- <li class="w74">近瞳距</li> -->
                    <li class="w74">瞳高</li>
                    <li class="w74">总瞳距</li>
                    <li class="w74">ADD</li>
                </ul>
                <ul>
                    <li class="fn-left  msg_left"><el-button :class="{'el-button-Mini':true,'miniBtn':prescription.isDistance}" size="mini" @click="prescription.isDistance = true;prescription.isNigh = false">远用</el-button></li>
                    <li class="fn-left glass_table_770 pb10">
                        <table>
                            <tr class="" v-for="(item,index) in distanceData" :key="index">
                                <td class="w10 ft_bold"><span v-html="index==0?'R':'L'"></span></td>
                                <td class="w74">
                                <el-form :model="item" :rules="rules" ref="distanceData">
                                  <el-form-item prop="sph">
                                    <el-input v-model="item.sph"></el-input>
                                  </el-form-item>
                                </el-form>
                                </td>
                                <!-- <td class="w74">
                                  <el-form :model="item" :rules="rules" ref="distanceData">
                                    <el-form-item prop="sph">
                                      <el-input v-model="item.cyl"></el-input>
                                    </el-form-item>
                                  </el-form>
                                </td> -->
                                <td class="w74"><el-input v-model="item.cyl"></el-input></td>
                                <td class="w74"><el-input v-model="item.ax"></el-input></td>
                                <td class="w74"><el-input v-model="item.va"></el-input></td>
                                <td class="w74"><el-input v-model="item.lj"></el-input></td>
                                <td class="w74">
                                  <el-select v-model="item.jd" placeholder=''  class="selectOption">
                                    <el-option
                                      v-for="item in selectOpt"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.value">
                                    </el-option>
                                  </el-select>
                                </td>
                                <td class="w74"><el-input v-model="item.jh"></el-input></td>
                                <td class="w74"><el-input v-model="item.dpd"></el-input></td>
                                <!-- <td class="w74"><el-input v-model="item.npd"></el-input></td> -->
                                <td class="w74"><el-input v-model="item.hpd"></el-input></td>
                                <td class="w74 glass_table_2x" rowspan="2" v-if="index==0"><el-input v-model="item.pd"></el-input></td>
                                <td class="w74 glass_table_2x" rowspan="2" v-if="index==0"><el-input v-model="item.add"></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list">
              <ul class="glass_table_head">
                  <li class="wid80"> &nbsp;&nbsp;</li>
                  <li class="w10"> &nbsp;&nbsp;</li>
                  <li class="w74">球镜</li>
                  <li class="w74">柱镜</li>
                  <li class="w74">轴位</li>
                  <li class="w74">矫正视力</li>
                  <li class="w74">棱镜</li>
                  <li class="w74">基底</li>
                  <li class="w74">基弧</li>
                  <li class="w74">近瞳距</li>
                  <li class="w74">总瞳距</li>
              </ul>
              <li class="clearfix combination_table_list">
                <ul>
                      <li class="fn-left  msg_left"><el-button :class="{'el-button-Mini':true,'miniBtn':prescription.isNigh}" size="mini" @click="prescription.isDistance = false;prescription.isNigh = true">近用</el-button></li>
                      <li class="fn-left glass_table_770 pb10">
                          <table>
                              <tr class="" v-for="(item,index) in nighData" :key="index">
                                  <td class="w10 ft_bold"><span v-html="index==0?'R':'L'"></span></td>
                                  <td class="w74">
                                    <el-form :model="item" :rules="rules" ref="nighData">
                                      <el-form-item prop="sph">
                                        <el-input v-model="item.sph"></el-input>
                                      </el-form-item>
                                    </el-form>
                                  </td>
                                  <!-- <td class="w74">
                                    <el-form :model="item" :rules="rules" ref="nighData">
                                      <el-form-item prop="sph">
                                        <el-input v-model="item.cyl"></el-input>
                                      </el-form-item>
                                    </el-form>
                                  </td> -->
                                  <td class="w74"><el-input v-model="item.cyl"></el-input></td>
                                  <td class="w74"><el-input v-model="item.ax"></el-input></td>
                                  <td class="w74"><el-input v-model="item.va"></el-input></td>
                                  <td class="w74"><el-input v-model="item.lj"></el-input></td>
                                  <td class="w74">
                                    <el-select v-model="item.jd" placeholder='' class="selectOption">
                                    <el-option
                                      v-for="item in selectOpt"
                                      :key="item.value"
                                      :label="item.value"
                                      :value="item.value">
                                    </el-option>
                                  </el-select>
                                  </td>
                                  <td class="w74"><el-input v-model="item.jh"></el-input></td>
                                  <td class="w74"><el-input v-model="item.dpd"></el-input></td>
                                <td class="w74 glass_table_2x" rowspan="2" v-if="index==0"><el-input v-model="item.pd"></el-input></td>
                              </tr>
                          </table>
                      </li>
              </ul>
            </li>
            <!-- <li class="clearfix combination_table_list" v-if="prescription.isContact">
                <ul>
                    <li class="fn-left  msg_left">隐形</li>
                    <li class="fn-left glass_table_770">
                        <table>
                            <tr class="" v-for="(item,index) in contactData" :key="index">
                                <td class="w10 ft_bold"><span v-html="index==0?'L':'R'"></span></td>
                                <td class="w74">
                                <el-form :model="item" :rules="rules" ref="contactData">
                                  <el-form-item prop="sph">
                                    <el-input v-model="item.sph"></el-input>
                                  </el-form-item>
                                </el-form>
                                </td>
                                <td class="w74">
                                  <el-form :model="item" :rules="rules" ref="contactData">
                                    <el-form-item prop="sph">
                                      <el-input v-model="item.cyl"></el-input>
                                    </el-form-item>
                                  </el-form>
                                </td>
                                <td class="w74"><el-input v-model="item.ax"></el-input></td>
                                <td class="w74"><el-input v-model="item.va"></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li> -->
            <!-- <li class="clearfix combination_table_list" :class="{'mgl450':!prescription.isContact}" v-if="prescription.isGradually">
                <ul>
                    <li class="fn-left  msg_left">渐进</li>
                    <li class="fn-left glass_table_770">
                        <table>
                            <tr class="" v-for="(item,index) in graduallyData" :key="index">
                                <td class="w10 ft_bold"><span v-html="index==0?'L':'R'"></span></td>
                                <td class="w74">
                                  <el-form :model="item" :rules="rules" ref="graduallyData">
                                    <el-form-item prop="npd">
                                      <el-input v-model="item.npd"></el-input>
                                    </el-form-item>
                                  </el-form>
                                </td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li> -->
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
                <ul>
                    <li class="fn-left msg_left breakMsg" style="margin-top:15px;">矫正<br/>视力</li>
                    <li class="fn-left glass_table_770">
                        <div class="labelInput">
                            <label class="w10">R</label><el-input style="width:80px" v-model="prescriptions.jzR"></el-input>
                        </div>
                        <div class="labelInput">
                            <label class="w10">L</label><el-input style="width:80px" v-model="prescriptions.jzL"></el-input>
                        </div>
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list">
                <ul>
                    <li class="fn-left msg_left breakMsg" style="margin-top:15px;">眼部<br/>健康</li>
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
                    <li class="w74">球镜</li>
                    <li class="w74">柱镜</li>
                    <li class="w74">轴位</li>
                    <li class="w74">矫正视力</li>
                    <li class="w74">瞳距</li>
                    <li class="w74">ADD</li>
                </ul>
                <ul>
                    <li class="fn-left  msg_left">主观</li>
                    <li class="fn-left glass_table_770 pb10">
                        <table>
                            <tr class="">
                                <td class="w10 ft_bold">R</td>
                                <td class="w74"><el-input v-model="skiascopyData[0].sph"></el-input></td>
                                <td class="w74"><el-input v-model="skiascopyData[0].cyl"></el-input></td>
                                <td class="w74"><el-input v-model="skiascopyData[0].ax"></el-input></td>
                                <td class="w74"><el-input v-model="skiascopyData[0].va"></el-input></td>
                                <td class="w74"><el-input v-model="skiascopyData[0].pd"></el-input></td>
                                <td class="w74 glass_table_2x" rowspan="2"><el-input v-model="skiascopyData[0].add"></el-input></td>
                            </tr>
                            <tr class="">
                                <td class="w10 ft_bold">L</td>
                                <td class="w74"><el-input v-model="skiascopyData[1].sph"></el-input></td>
                                <td class="w74"><el-input v-model="skiascopyData[1].cyl"></el-input></td>
                                <td class="w74"><el-input v-model="skiascopyData[1].ax"></el-input></td>
                                <td class="w74"><el-input v-model="skiascopyData[1].va"></el-input></td>
                                <td class="w74"><el-input v-model="skiascopyData[1].pd"></el-input></td>
                            </tr>
                        </table>
                    </li>
                </ul>
            </li>
            <li class="clearfix combination_table_list pt10">
                <ul>
                    <li class="fn-left  msg_left">客观</li>
                    <li class="fn-left glass_table_770">
                        <table>
                            <tr class="">
                                <td class="w10 ft_bold">R</td>
                                <td class="w74"><el-input v-model="subjectivityData[0].sph"></el-input></td>
                                <td class="w74"><el-input v-model="subjectivityData[0].cyl"></el-input></td>
                                <td class="w74"><el-input v-model="subjectivityData[0].ax"></el-input></td>
                                <td class="w74"><el-input v-model="subjectivityData[0].va"></el-input></td>
                                <td class="w74"><el-input v-model="subjectivityData[0].pd"></el-input></td>
                                <!-- <td class="w74 glass_table_2x" rowspan="2"><el-input v-model="skiascopyData[0].add"></el-input></td> -->
                            </tr>
                            <tr class="">
                                <td class="w10 ft_bold">L</td>
                                <td class="w74"><el-input v-model="subjectivityData[1].sph"></el-input></td>
                                <td class="w74"><el-input v-model="subjectivityData[1].cyl"></el-input></td>
                                <td class="w74"><el-input v-model="subjectivityData[1].ax"></el-input></td>
                                <td class="w74"><el-input v-model="subjectivityData[1].va"></el-input></td>
                                <td class="w74"><el-input v-model="subjectivityData[1].pd"></el-input></td>
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
            <li class="clearfix combination_table_list">
                <ul>
                    <li class="fn-left glass_table_770">
                        <div class="labelInput mgl30">
                            <label>远用眼位：</label><el-input v-model="prescriptions.yyyw"></el-input>
                        </div>
                        <div class="labelInput mgl30">
                            <label>近用眼位：</label><el-input v-model="prescriptions.jyyw"></el-input>
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
                style="width:850px;"
                placeholder="请输入内容"></el-input>
            </li>
        </ul>
        <ul class="optometryMemo">
            <li class="fn-left glass_table_770">
                <div class="labelInput lineHeightAuto">
                    <label class="" style="text-align:left !important;margin-right:2px;">验光来源：</label>
                    <el-select style="width:120px" v-model="prescriptions.source" placeholder="请选择" @visible-change="getPublicSelect(7,sourceOptions)">
                        <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </div>
                <div class="labelInput lineHeightAuto mgl30">
                    <label class="mgr10">验光师：</label>
                    <el-select style="width:120px" v-model="prescriptions.optometrist" placeholder="请选择" @visible-change="getPrivateSelect(4,optometristOptions)">
                        <el-option
                        v-for="item in options"
                        :key="item.userId"
                        :label="item.trueName"
                        :value="item.trueName">
                        </el-option>
                    </el-select>
                </div>
                <div class="labelInput lineHeightAuto mgl30">
                    <label class="mgr10" >验光日期 :</label>
                    <el-date-picker
                    style="width:180px"
                    v-model="prescriptions.prescriptionTime"
                    value-format="yyyy-MM-dd"
                    type="date"
                    :default-value="defaultValue"
                    :picker-options="pickerOptions0"
                    placeholder="选择日期">
                    </el-date-picker>
                </div>
            </li>
        </ul>
    </div>
    <div class="packageDetailButtonGroup">
          <el-button @click="closeEyesModel()">取 消</el-button>
          <el-button type="primary" @click="submitThisModal()">保 存</el-button>
    </div>
</div>
</template>

<script>
import { allDate } from "../../../utils/date.js";
export default {
  name: "NewOptometryModal",
  props: [ "memberInfo"],
  data() {
    return {
      options: [],
      sourceOptions: [],
      optometristOptions: [],
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
      selectOpt:[{
        value:'BU',
        label:'BU'
      },{
        value:'BD',
        label:'BD'
      },{
        value:'BI',
        label:'BI'
      },{
        value:'BO',
        label:'BO'
      }],
      rules: {
        telphone: [{ required: true, message: "请输入", trigger: "blur" }],
        sph: [{ required: true, message: " ", trigger: "blur" }],
        cyl: [{ required: true, message: " ", trigger: "blur" }],
        npd: [{ required: true, message: " ", trigger: "blur" }]
      },
      prescription: {
        isDistance: true,
        isNigh: false
        // isContact: false,
        // isGradually: false
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      defaultValue: new Date(),
      distanceData: [
        {
          leftRight:'1',
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          dpd: "",
          // npd: "",
          hpd: "",
          jd:"",
          jh:"",
          lj:"",
          pd:"",
          add: "",
        },
        {
          leftRight:'0',
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          dpd: "",
          // npd: "",
          hpd: "",
          jd:"",
          jh:"",
          lj:"",
          pd:"",
        },
      ],
      nighDataCopy:null,
      nighData: [
        {
          leftRight:'1',
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          npd: "",
          lj:"",
          jd:"",
          jh:"",
          pd:""
        },
        {
          leftRight:'0',
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          npd: "",
          lj: "",
          jh: "",
          jd: "",
          pd: ""
        }
      ],
      // contactData: [
      //   {
      //     sph: "",
      //     cyl: "",
      //     ax: "",
      //     va: ""
      //   },
      //   {
      //     sph: "",
      //     cyl: "",
      //     ax: "",
      //     va: ""
      //   }
      // ],
      // graduallyData: [
      //   {
      //     npd: ""
      //   },
      //   {
      //     npd: ""
      //   }
      // ],
      skiascopyDataCopy:null,
      skiascopyData: [
        {
          leftRight:'1',
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          pd: "",
          add: ""
        },
        {
          leftRight:'0',
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          pd: "",
        }
      ],
      subjectivityDataCopy:null,
      subjectivityData: [
        {
          leftRight:'1',
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          pd: "",
          add:""
        },
        {
          leftRight:'0',
          sph: "",
          cyl: "",
          ax: "",
          va: "",
          pd: ""
        }
      ],
      healthCopy:null,
      health: {
        k1: "",
        k2: "",
        k3: "",
        k4: "",
        k5: ""
      },
      prescriptionsCopy:null,
      prescriptions: {
        health: "",
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
        prescriptionTime: new Date(),
        retinoscopy: "",
        sex: "",
        shopId: "",
        shopName: "",
        size: "",
        source: "",
        status: "",
        stereopsis: "",
        subjective: "",
        worth4: "",
        yyyw:'',
        jyyw:'',
        jzR:'',
        jzL:''
      }
    };
  },
  methods: {
    getPrivateSelect(type, options) {
      const _this = this;
      _this.$myAjax({
        url:'cas-api/user/getUserByOrg',
        data:{
           orgId: "",
              userType: "9"
              //参数类型（1:订单类型;2:订单状态;3:加工备注;4:特殊备注;5:取镜方式,6费用）
        },
        success:function(res){
          if(res.code == 1){
          _this.options = res.data.list;
          }else{
            _this.$message({
              type:'warning',
              message:res.msg,
              showClose:true})
           }
        },error:function(err){
           console.error(err);
           _this.$message({
            type:'error',
             message:err,
            showClose:true
          })
        }
      });
    },
    closeEyesModel(){
      const _this = this;
      this.cleardata();
      _this.$emit('closeEyesModel')
    },
    getPublicSelect(type, options) {
      const _this = this;
      _this.$myAjax({
        url:'cas-api/systemConfig/getSystemConfigList',
        data:{
           pid: "",
              id: "",
              type: type
              //参数类型（1:订单类型;2:订单状态;3:加工备注;4:特殊备注;5:取镜方式,6费用）
        },
        success:function(res){
          if(res.code == 1){
          _this.options = res.data.list;
          }else{
            _this.$message({
              type:'warning',
              message:res.msg,
              showClose:true})
           }
        },error:function(err){
           console.error(err);
           _this.$message({
            type:'error',
             message:err,
            showClose:true
          })
        }
      });
    },
    searchUser() {
        const _this = this;
      if (this.ruleForm.telphone.length == 11) {
        _this.$myAjax({
          url:'member-api/member/getMemberListByBoYang',
          data:{
                telphone: this.ruleForm.telphone
          },
          success:function(res){
            if(res.code == 1){
                Object.keys(_this.ruleForm).forEach(function(trait) {
                if (trait != "telphone") {
                  _this.ruleForm[trait] =
                    res.data.memberList[0][trait];
                }
              });
              _this.prescriptions.memberId =
                res.data.memberList[0].memberId;
              _this.ruleForm.hasMember = true;
              _this.needReg = false;
            }else{
              Object.keys(_this.ruleForm).forEach(function(trait) {
                if (trait != "telphone") {
                  _this.ruleForm[trait] = "";
                }
              });
              _this.needReg = true;
              _this.$message({
                type:'warning',
                message:res.msg,
                showClose:true})
             }
          },error:function(err){
             console.error(err);
             _this.$message({
              type:'error',
               message:err,
              showClose:true
            })
          }
        });
      }
    },
    validationStart(formName) {
      var flag = false;
      if (
        this.$refs[formName] instanceof Array &&
        this.$refs[formName].length > 0
      ) {
        this.$refs[formName].forEach((obj, index) => {
          obj.validate(valid => {
            if (valid) {
              flag = true;
              return true;
            } else {
              flag = false;
              return false;
            }
          });
        });
        return flag;
      }
    },
    validation() {
      var canNext = false;
      if(this.prescription.isDistance){
        canNext=this.validationStart('distanceData');
      }
      if(this.prescription.isNigh){
        canNext=this.validationStart('nighData');
      }
      // if(this.prescription.isContact){
      //   canNext=this.validationStart('contactData');
      // }
      // if(this.prescription.isGradually){
      //   canNext=this.validationStart('graduallyData');
      // }
      return canNext;
    },
    cleardata(){
      const _this  = this;
      this.ruleForm.telphone = '';
      function clear(target){
        for(var i=0;i<target.length;i++){
          for(var key in target[i]) {
            if(key != 'leftRight'){
              target[i][key] = ''
            }
          }
        }
      }
      clear(_this.distanceData);
      clear(_this.nighData);
      clear(_this.skiascopyData);
      clear(_this.subjectivityData);
      for(var key in _this.prescriptions) {
        if(key != 'leftRight'){
          _this.prescriptions[key] = ''
        }
      }
      _this.prescriptions.prescriptionTime = new Date()
      for(var key in _this.health) {
        if(key != 'leftRight'){
          _this.health[key] = ''
        }
      }
  },
    submitThisModal() {
        const _this = this;
      // console.log(!this.validation())
      if (!this.validation()) {
        _this.$message({
          showClose: true,
          message: "请填写配镜处方！",
          type: "error"
        });
        return false;
      }
      var memberId;
      if (_this.needReg) {
        _this.$myAjax({
          url:'member-api/member/addMember',
          data:{
            name: _this.ruleForm.name,
                telphone: _this.ruleForm.telphone,
                birthday: _this.ruleForm.birthday,
                sex: _this.ruleForm.sex,
                district: "",
                address: "",
                email: ""
          },
          success:function(res){
            if(res.code == 1){
              _this.prescriptions.memberId = res.data.memberId;
            }else{
              _this.$message({
                type:'warning',
                message:res.msg,
                showClose:true})
             }
          },error:function(err){
             console.error(err);
             _this.$message({
              type:'error',
               message:err,
              showClose:true
            })
          }
        });
      }
      var eyes = [];
      eyes.push({ key: 2, value: _this.skiascopyData });
      eyes.push({ key: 3, value: _this.subjectivityData });
      eyes.push({ key: 0, value: _this.distanceData });
      eyes.push({ key: 1, value: _this.nighData });
      // eyes.push({ key: 4, value: _this.contactData });
      // eyes.push({ key: 5, value: _this.graduallyData });
      _this.prescriptions.memberName = _this.ruleForm.name;
      _this.prescriptions.customerName = _this.ruleForm.name;
      _this.prescriptions.sex = _this.ruleForm.sex;
      _this.prescriptions.health = JSON.stringify(_this.health);
      _this.prescriptions.appKey = _this.prescription.isDistance?'0':'1';
      //   _this.prescriptions.nub=_this.ruleForm.memberCardNo;
      var jsonObject = {
        eyes: eyes,
        prescriptions: _this.prescriptions
      };
      _this.$myAjax({
        url:'pos-api/prescriptions/addPrescriptions',
        data:jsonObject,
        success:function(res){
          if(res.code == 1){
              jsonObject.prescriptions.prescriptionId = res.data.id;
              _this.cleardata();
              _this.$emit("getNewoptometry", res.data.id);
              _this.$message({
                showClose: true,
                message: "新增成功！",
                type: "success"
              });
          }else{
            _this.$message({
              type:'warning',
              message:res.msg,
              showClose:true})
           }
        },error:function(err){
           console.error(err);
           _this.$message({
            type:'error',
             message:err,
            showClose:true
          })
        }
      });
    }
  },
  mounted() {
    // this.defaultValue = allDate.TimeToDay(Date.parse(new Date()))
  },
  
  created: function() {
    // let nums = -5;
    // for(var i =0;i<20;i++){
    //   this.selectOpt.push({
    //     value:parseFloat(nums).toFixed(2)
    //   })
    //   nums+=0.5;
    // }
      this.healthCopy = this.health;
      this.distanceDataCopy = this.distanceData;
      this.nighDataCopy = this.nighData;
      this.skiascopyDataCopy = this.skiasData;
      this.subjectivityDataCopy = this.subjectivityData;
      this.prescriptionsCopy = this.prescriptions;
    if (this.memberInfo) {
      this.ruleForm.telphone = this.memberInfo.telphone;
      console.log(2)
      this.searchUser();
    }
  },
  watch: {
    submit: function(value) {
      if (value == true) {
        this.submitThisModal();
      }
    },
    showNewOptometry: function() {
      if(this.memberInfo.telphone){
        this.ruleForm.telphone = this.memberInfo.telphone;
      }
      console.log(1)
      this.searchUser();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../reset";
.newOptometry {
  .w74 {
    width: 74px !important;
  }
  .glass_combination_table {
    .el-form-item__content::after,
    .el-form-item__content::before {
      display: none;
    }
    .el-form-item::after,
    .el-form-item::before {
      display: none;
    }
    .el-form {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 100%;
      height: 40px;
      line-height: 40px;
    }
  }
  .mgl450 {
    margin-left: 450px;
  }
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
  .packageDetailButtonGroup{
    margin: 15px 0 -15px -15px !important;
    width: 950px;
  }
  .newOptometry {
    background: #f8f8f8;
    padding: 15px;
    font-size: 12px;
    .newOptometryPhone {
      /deep/ .el-form-item {
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
            width: 85px;
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
      padding-left: 0;
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
      li:first-child {
        font-size: 12px;
        color: #666666;
        margin-top: 2px;
      }
    }
  }
  .miniBtn {
    background-color: #00afe4;
    border-color: #00afe4;
    color: #fff;
  }
  .el-button-Mini {
    padding: 5px 11px !important;
    font-size: 12px;
    border-radius: 3px;
  }
  .w10 {
    width: 10px !important;
    text-align: center !important;
  }
  .glass_combination_table {
    min-height: 100px;
    border: 1px solid #e1e1e1;
    overflow: hidden;
    background: #fff;
    li {
      float: left;
      width: auto;
    }
    
  }

  .glass_table_head {
    // width: 850px;
    height: 22px;
    line-height: 22px;
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
    height: 62px;
    line-height: 62px;
    text-align: right;
    padding-right: 22px;
  }

  .combination_table_list {
    background: #fff;
    // margin-top: 13px;
    
    &:last-child {
      padding-bottom: 10px;
    }
  }

  .labelInput {
    float: left;
    line-height: 62px;
    height: 62px;
    label {
      min-width: 50px;
      width: 65px;
      text-align: right;
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
  .selectOption{
    .el-input__inner{
        padding:0 5px !important;
    }
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
