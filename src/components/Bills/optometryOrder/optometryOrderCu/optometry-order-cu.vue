<template>
  <div class="flexH100">
    <div class="optometry_content" style="min-height:500px;" v-if="userInfo">
      <!--验光单一条数据详情-->
      <router-link class="back" tag="div" to='/bills/optometryOrderList'>返回</router-link>
      <div class="list_one">
        <ul class="optometry_head">
          <li class="ft_bold am-ft-20 am-ft-gray3 fn-left" v-if="memberDet !='detail'">验光单</li>
          <li class="fn-left pt10 am-ft-gray3">ID:&nbsp;{{userInfo.prescriptionId}}</li>
          <li class="fn-left pt10 am-ft-gray6">验光日期 :&nbsp;{{userInfo.prescriptionTime}}</li>
        </ul>
        <ul class="optometry_head_msg">
          <li class="fn-left am-ft-gray3"><span class="am-ft-gray6">手机号:</span>{{userInfo.mobile}}</li>
          <li class="fn-left am-ft-gray3"><span class="am-ft-gray6">姓名:</span>&nbsp;{{userInfo.memberName}}</li>
          <li class="fn-left am-ft-gray3"><span class="am-ft-gray6">会员卡号 :</span>&nbsp;{{cpMemberInfo.memberCardNo}}</li>
          <li class="fn-left am-ft-gray3"><span class="am-ft-gray6">性别 :</span>&nbsp;<em
            v-if="cpMemberInfo.sex=='M'">男</em>
            <em v-else>女</em></li>
          <li class="fn-left am-ft-gray3"><span class="am-ft-gray6">出生年月 :</span>&nbsp;{{cpMemberInfo.birthday}}</li>
        </ul>

        <div class="glass_combination">
          <div class="glass_combination_text">
            配镜处方 :
          </div>
          <ul class="glass_combination_table">
            <li class="clearfix combination_table_list">
              <ul class="glass_table_head">
                <li class="wid80"> &nbsp;&nbsp;</li>
                <li class="w50"> &nbsp;&nbsp;</li>
                <li class="w90">SPH</li>
                <li class="w90">CYL</li>
                <li class="w90">AX</li>
                <li class="w90">VA</li>
                <li class="w90">DPD</li>
                <li class="w90">NPD</li>
                <li class="w90">HPD</li>
                <li class="w90">PD</li>
                <li class="w90">ADD</li>
              </ul>
              <ul>
                <li class="fn-left  msg_left">远用</li>
                <li class="fn-left glass_table_770">
                  <table>
                    <tr class="border_bottom">
                      <td class="w50">R</td>
                      <td class="w90">{{data3[1].sph}}</td>
                      <td class="w90">{{data3[1].cyl}}</td>
                      <td class="w90">{{data3[1].ax}}</td>
                      <td class="w90">{{data3[1].va}}</td>
                      <td class="w90">{{data3[1].dpd}}</td>
                      <td class="w90">{{data3[1].npd}}</td>
                      <td class="w90">{{data3[1].pd}}</td>
                      <td class="w90">{{data3[1].hpd}}</td>
                      <td class="w90 border_left" rowspan="2">{{data3[0].add}}</td>
                    </tr>
                    <tr class="dis_bg">
                      <td class="w50">L</td>
                      <td class="w90">{{data3[0].sph}}</td>
                      <td class="w90">{{data3[0].cyl}}</td>
                      <td class="w90">{{data3[0].ax}}</td>
                      <td class="w90">{{data3[0].va}}</td>
                      <td class="w90">{{data3[0].dpd}}</td>
                      <td class="w90">{{data3[0].npd}}</td>
                      <td class="w90">{{data3[0].pd}}</td>
                      <td class="w90">{{data3[0].hpd}}</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>
            <li class="clearfix combination_table_list" v-if="data4[0].sph">
              <ul>
                <li class="fn-left msg_left">近用</li>
                <li class="fn-left glass_table_770">
                  <table>
                    <tr class="border_bottom">
                      <td class="w50">R</td>
                      <td class="w90">{{data4[1].sph}}</td>
                      <td class="w90">{{data4[1].cyl}}</td>
                      <td class="w90">{{data4[1].ax}}</td>
                      <td class="w90">{{data4[1].va}}</td>
                      <td class="w90">{{data4[1].dpd}}</td>
                      <td class="w90">{{data4[1].npd}}</td>
                      <td class="w90">{{data4[1].hpd}}</td>
                    </tr>
                    <tr class="dis_bg">
                      <td class="w50">L</td>
                      <td class="w90">{{data4[0].sph}}</td>
                      <td class="w90">{{data4[0].cyl}}</td>
                      <td class="w90">{{data4[0].ax}}</td>
                      <td class="w90">{{data4[0].va}}</td>
                      <td class="w90">{{data4[0].dpd}}</td>
                      <td class="w90">{{data4[0].npd}}</td>
                      <td class="w90">{{data4[0].hpd}}</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>
            <li class="clearfix combination_table_list" v-if="data5[0].sph">
              <ul>
                <li class="fn-left msg_left">隐形</li>
                <li class="fn-left glass_table_770">
                  <table>
                    <tr class="border_bottom">
                      <td class="w50">R</td>
                      <td class="w90">{{data5[1].sph}}</td>
                      <td class="w90">{{data5[1].cyl}}</td>
                      <td class="w90">{{data5[1].ax}}</td>
                      <td class="w90">{{data5[1].va}}</td>
                    </tr>
                    <tr class="dis_bg">
                      <td class="w50">L</td>
                      <td class="w90">{{data5[0].sph}}</td>
                      <td class="w90">{{data5[0].cyl}}</td>
                      <td class="w90">{{data5[0].ax}}</td>
                      <td class="w90">{{data5[0].va}}</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>
            <li class="clearfix combination_table_list" v-if="data6[0].sph">
              <ul>
                <li class="fn-left  msg_left">渐进</li>
                <li class="fn-left glass_table_770">
                  <table>
                    <tr class="border_bottom">
                      <td class="w50">R</td>
                      <td class="w90">{{data6[1].sph}}</td>
                    </tr>
                    <tr class="dis_bg">
                      <td class="w50">L</td>
                      <td class="w90">{{data6[0].sph}}</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>

          </ul>
        </div>

        <div class="glass_combination">
          <div class="glass_combination_text">
            检查数据 :
          </div>
          <ul class="glass_old">
            <li class="wid80 fn-left">旧镜</li>
            <li class="data_li">R：<span>{{userInfo.originalR}}</span></li>
            <li class="data_li">L：<span>{{userInfo.originalL}}</span></li>
            <li class="data_li">PD：<span>{{userInfo.originalPd}}</span></li>
          </ul>
          <ul class="eye_healthy">
            <li class="wid80 fn-left">眼部健康</li>
            <li class="data_li">上下眼睑：<span>{{userInfo.health?JSON.parse(userInfo.health).k1:''}}</span></li>
            <li class="data_li">角膜：<span>{{userInfo.health?JSON.parse(userInfo.health).k2:''}}</span></li>
            <li class="data_li">结膜：<span>{{userInfo.health?JSON.parse(userInfo.health).k3:''}}</span></li>
            <li class="data_li">泪腺：<span>{{userInfo.health?JSON.parse(userInfo.health).k4:''}}</span></li>
            <li class="data_li">其他：<span>{{userInfo.health?JSON.parse(userInfo.health).k5:''}}</span></li>
          </ul>


          <ul class="glass_combination_table" v-if="data1[0].sph">
            <li class="clearfix combination_table_list">
              <ul class="glass_table_head">
                <li class="wid80"> &nbsp;&nbsp;</li>
                <li class="w50"> &nbsp;&nbsp;</li>
                <li class="w90">SPH</li>
                <li class="w90">CYL</li>
                <li class="w90">AX</li>
                <li class="w90">VA</li>
                <li class="w90">PD</li>
                <li class="w90">ADD</li>
              </ul>
              <ul v-if="data1[0].sph">
                <li class="fn-left  msg_left">检影</li>
                <li class="fn-left glass_table_770">
                  <table>
                    <tr class="border_bottom">
                      <td class="w50">R</td>
                      <td class="w90">{{data1[1].sph}}</td>
                      <td class="w90">{{data1[1].cyl}}</td>
                      <td class="w90">{{data1[1].ax}}</td>
                      <td class="w90">{{data1[1].va}}</td>
                      <td class="w90">{{data1[1].pd}}</td>
                      <td class="w90 border_left" rowspan="2">{{data1[1].add}}</td>
                    </tr>
                    <tr class="dis_bg">
                      <td class="w50">L</td>
                      <td class="w90">{{data1[0].sph}}</td>
                      <td class="w90">{{data1[0].cyl}}</td>
                      <td class="w90">{{data1[0].ax}}</td>
                      <td class="w90">{{data1[0].va}}</td>
                      <td class="w90">{{data1[0].pd}}</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>
            <li class="clearfix combination_table_list">
              <ul v-if="data2[0].sph">
                <li class="fn-left  msg_left">主观</li>
                <li class="fn-left glass_table_770">
                  <table>
                    <tr class="border_bottom">
                      <td class="w50">R</td>
                      <td class="w90">{{data2[1].sph}}</td>
                      <td class="w90">{{data2[1].cyl}}</td>
                      <td class="w90">{{data2[1].ax}}</td>
                      <td class="w90">{{data2[1].va}}</td>
                      <td class="w90">{{data2[1].pd}}</td>
                      <td class="w90 border_left" rowspan="2">{{data2[1].add}}</td>
                    </tr>
                    <tr class="dis_bg">
                      <td class="w50">L</td>
                      <td class="w90">{{data2[0].sph}}</td>
                      <td class="w90">{{data2[0].cyl}}</td>
                      <td class="w90">{{data2[0].ax}}</td>
                      <td class="w90">{{data2[0].va}}</td>
                      <td class="w90">{{data2[0].pd}}</td>
                    </tr>
                  </table>
                </li>
              </ul>
            </li>

            <li>
              <ul class="clearfix combination_footer">
                <li class="fn-left">WORTH4：<span>{{userInfo.worth4}}</span></li>
                <li class="fn-left">立体视：<span>{{userInfo.stereopsis}}</span></li>
                <li class="fn-left">NAR/PRA：<span>{{userInfo.narpra}}</span></li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="glass_combination">
          <div class="am-ft-gray6 clearfix pb10">
            <div class=" fn-left optometry_remarks">验光备注：</div>
            <p class=" fn-left optometry_remarks_text">{{userInfo.memo}}</p>
          </div>
          <ul class="clearfix" v-if="memberDet !='detail'">
            <li class=" fn-left optometry_origin">验光来源：<span>{{userInfo.source}}</span></li>
            <li class="fn-left optometrist">验光师：<span>{{userInfo.optometrist}} </span></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "optometryOrderCu",
    data() {
      return {
        cpMemberInfo:{
          memberCardNo:'',
          sex:'',
          birthday:''
        },
        eyesData: [],//验光数据
        userInfo: {},//验光人信息
        data1: [{},{}], //检影数据
        data2: [{},{}],//主观数据
        data3: [{},{}],//远用数据
        data4: [{},{}], //近用数据
        data5: [{},{}], //隐形数据
        data6: [{},{}], //渐进数据
        showDiv: "2",
      };
    },
    props: ['memberDet', 'memberInfo','eyes'],
    created: function () {
        if(this.eyes!=undefined){
          this.eyesData=this.eyes;
          this.userInfo=this.memberInfo;
          this.cpMemberInfo=this.memberInfo;
          this.setData();
        }else{
          this.userInfo=this.memberInfo;
          this.cpMemberInfo=this.memberInfo;
          this.getOptometryRecord();
        }
    },
    mounted(){
      // console.log(this.$route.params.data.memberId)
    },
    methods: {
      getOptometryRecord() {
        var that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptionsLately',
          method: 'post',
          params: {
            jsonObject: {
              memberId: this.$route.params.data.memberId
            },
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            // console.info(response.data.data)
            that.eyesData = response.data.data.eyes; //左右眼数据
            that.userInfo = response.data.data.prescriptions; //检查数据
            that.cpMemberInfo=response.data.data.member;
            //检影数据
            that.setData()
          })
          .catch(function (error) {
            console.info(error)
          })
      },
      setData:function(){
          var that=this;
          that.data1 = that.eyesData[0].value;
          //主观数据
          that.data2 = that.eyesData[1].value;
          //远用数据
          that.data3 = that.eyesData[2].value;
          //近用数据
          that.data4 = that.eyesData[3].value;
          //隐形数据
          that.data5 = that.eyesData[5].value;
          //渐进数据
          that.data6 = that.eyesData[4].value;
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../../reset";

  .optometry_content {
    position: relative;
    width: 100%;
    height: calc(100% - 43px);
    background: white;
    padding: 11px;
    overflow-y: auto;
  }

  /* 详情  */

  .optometry_head {
    height: 30px;
    margin-left: -16px;
  }

  .optometry_head li {
    height: 26px;
    margin-left: 16px;
  }

  .optometry_head_msg {
    height: 30px;
    margin-left: -40px;
    margin-top: 10px;
  }

  .optometry_head_msg li {
    margin-left: 40px;
  }

  .list_one {
    padding: 4px 13px;
  }

  .glass_combination {
    width: 850px;
    border-top: 1px dotted #D8D8D8;
    padding: 15px 0 25px 0;
  }

  .glass_combination_text {
    border-left: 6px solid #00AFE4;
    font-weight: bold;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    margin-left: -25px;
    padding-left: 18px;
  }

  .glass_combination_table {
    width: 1000px;
    /* height: 400px; */
  }

  .glass_table_head {
    width: 940px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    text-align: center;
    font-size: 12px;
    color: #555555;
    letter-spacing: 0;
  }

  .glass_table_770 {
    width: 860px;
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
    background: rgba(246, 246, 246, 0.50);
  }

  .glass_table_770 table {
    border: 1px solid #D2D2D2;
  }

  .border_bottom {
    border-bottom: 1px solid #EFEFEF;
  }

  .border_left {
    border-left: 1px solid #EFEFEF;
  }

  .msg_left {
    width: 80px !important;
    height: 82px;
    line-height: 82px;
    text-align: right;
    padding-right: 22px;
  }

  .combination_table_list {
    margin-top: 13px;
    overflow: hidden;
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
    /* font-weight: 600; */
    color: #333333;
  }

  .eye_healthy {
    height: 40px;
  }

  .glass_old .data_li span,
  .eye_healthy .data_li span {
    color: #666666;
    padding: 0 5px;
    /* font-weight: 300; */
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
</style>
