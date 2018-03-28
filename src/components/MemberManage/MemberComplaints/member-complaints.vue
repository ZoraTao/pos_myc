<template>
<div class="content_box flexH100">
    <div class="optometry_list_top am-bg-white">

        <div class="fn-left mgt4">
            <span class="member">投诉日期:</span>
            <el-date-picker type="date" placeholder="选择日期" style="width: 120px"></el-date-picker>
            -
            <el-date-picker type="date" placeholder="选择日期" style="width: 120px"></el-date-picker>
        </div>
        <div class="fn-left mgt4">
            <span class="member">状态：</span>
            <el-select style="width:120px" v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </div>
        <div class="fn-left mgt4">
            <span class="member">零售单号：</span>
            <el-input style="width:120px" class="" v-model="searchModel" placeholder="请输入"></el-input>
        </div>
        <div class="fn-left mgt4">
            <span class="member">会员:</span>
            <el-input style="width:120px" class="" v-model="searchModel" placeholder="卡号/姓名/手机号"></el-input>
        </div>

        <div class="fn-left mgt4 mgl30">
            <button class="col_blue_bg_white find_btn">
                查询
            </button>
        </div>

        <div class="fn-right ">
            <button class="add_btn bg_white_col_blue">
                + 新增投诉
            </button>
        </div>

    </div>
    <div class="optometry_content optometry_content">
        <!--查询之前-->
        <div v-show="searchModel==''">
            <ul class="find_before">
                <li class="optometry_qs_img">
                    <img src="http://myc-oms.oss-cn-hangzhou.aliyuncs.com/img%2Foptometry_qs.png" />
                </li>
                <li class="optometry_qs_text">
                    暂无投诉信息
                </li>
            </ul>
        </div>
        <!--验光列表-->
        <div v-show="showDiv==='2'&&searchModel!=''&&searchModel!='neikami'">
            <el-table
                :data="data"
                size="small"
                align="left"
                style="width: 100%;margin-bottom:10px;">
                <el-table-column
                prop="complaintsDay"
                label="投诉日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="memberName"
                label="会员姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="telephone"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="sex"
                label="性别">
                </el-table-column>
                <el-table-column
                prop="complaintsTypes"
                label="投诉类别">
                </el-table-column>
                <el-table-column
                prop="complaintsMemo"
                label="投诉说明">
                </el-table-column>
                <el-table-column
                prop="complaintsType"
                label="投诉类型">
                </el-table-column>
                <el-table-column
                prop="retailNum"
                label="关联零售单号">
                </el-table-column>
                <el-table-column
                prop="waiter"
                label="接待人员">
                </el-table-column>
                <el-table-column
                prop="type"
                label="状态">
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <span class="am-ft-blue"><a>查看详情</a></span>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </div>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="isShowNewComplaints"
      width="900px">
      <newComplaintsModal></newComplaintsModal>      
      <div class="packageDetailButtonGroup">
            <el-button @click="isShowNewComplaints = false">取 消</el-button>
            <el-button type="primary" @click="isShowNewComplaints = false">保 存</el-button>
        </div>
    </el-dialog>
    <el-dialog
      title="提示"
      class="ComplainsBill"
      :visible.sync="isShow"
      width="900px">
      <ComplainsBillModal></ComplainsBillModal>      
      <div class="packageDetailButtonGroup">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="isShow = false">保 存</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
import newComplaintsModal from '../../PublicModal/NewComplaints/new-complaints-modal.vue'
import ComplainsBillModal from '../../PublicModal/ComplaintsBill/complains-bill-modal.vue'
    export default {
        name: "member-complaints",
        data() {
            return {
                showDiv:"2",
                searchModel:"",
                isShowNewComplaints:false,
                isShow:true,
                options:[{
                  value: '选项1',
                  label: '黄金糕'
                }],
                value:"",
                data : [{
                  complaintsDay : '2017-12-07',
                  memberName : '张三',
                  telephone : 15757179646,
                  sex : '男',
                  complaintsTypes: '产品质量',
                  complaintsMemo: '投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容',
                  complaintsType: '上门投诉',
                  retailNum: 'R0326632321',
                  waiter: '玉素甫·哈斯',
                  type:'未处理'
                }]
            };
        },
        components:{
            newComplaintsModal,
            ComplainsBillModal
        },
        created: function() {
            for (var i = 0; i < 10; i++) {
              this.data.push({
                complaintsDay : '2017-12-07',
                memberName : '张三',
                telephone : 15757179646,
                sex : '男',
                complaintsTypes: '产品质量',
                complaintsMemo: '投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容投诉内容',
                complaintsType: '上门投诉',
                retailNum: 'R0326632321',
                waiter: '玉素甫·哈斯',
                type:'未处理'
              });
            }
        }
    };
</script>

<style scoped lang="scss">
@import "../../../reset";
.optometry_list_top {
    height: 70px;
    width: 100%;
    padding: 18px 20px;
    span{
      margin-right: 5px;
    }
    .fn-left{
      margin-right: 10px;
    }
}

.member {
    display: inline-block;
    font-weight: bold;
    font-size: 12px;
}

.mgt4 {
    margin-top: 4px;
}

.mgt2 {
    margin-top: 2px;
}

.find_btn {
    width: 96px;
    height: 30px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    letter-spacing: 0;
}

.add_btn {
    width: 100px;
    height: 34px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    letter-spacing: 0;
}

.col_blue_bg_white {
    color: #00AFE4;
    background: white;
    border: 1px solid #00AFE4;
    border-radius: 4px;
}

.bg_white_col_blue {
    color: #ffffff;
    background: #00AFE4;
    border: 1px solid #00AFE4;
    border-radius: 4px;
}

.optometry_input {
    background: #F8F8F8;
    border: 1px solid #E1E1E1;
    padding: 2px 10px;
    height: 26px;
}

.optometry_content {
    position: relative;
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 123px);
    background: white;
    padding: 11px;
    overflow-y: auto;
}

.find_before {
    width: 250px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 24%;
    margin-left: -125px;
    /*margin-top: -150px;*/
}

.find_before li {
    text-align: center;
    margin-top: 23px;
}

li.optometry_qs_img {
    margin-left: 25px;
}

li.optometry_qs_text {
    text-align: center;
    font-size: 14px;
    color: #888888;
    letter-spacing: 0.51px;
}


/*列表*/

.list_name {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    line-height: 26px;
    color: #333333;
    letter-spacing: 0;
    padding-left: 20px;
    margin-bottom: 5px;
    text-align: left;
}
</style>