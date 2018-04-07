<template>
<div class="selectMember">
<!--body-top-->
<div class="clearfix modal-content-top">
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name">
            <el-table
                :data="data.memberList"
                size="small"
                align="left"
                style="width: 100%;margin-bottom:10px">
                <el-table-column
                prop="memberCardNo"
                label="会员卡号">
                </el-table-column>
                <el-table-column
                prop="name"
                label="会员姓名">
                </el-table-column>
                <el-table-column
                prop="telphone"
                label="手机号">
                </el-table-column>
                <el-table-column
                prop="sex"
                label="性别">
                </el-table-column>
                <el-table-column
                prop="age"
                label="年龄">
                </el-table-column>
                <el-table-column
                prop="lastPrescriptionTime"
                label="最近验光时间">
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <span class="am-ft-blue" @click="selectThis(scope.row)">
                            选择
                        </span>
                    </template>
                </el-table-column>
            </el-table> 
            <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next"
            :page-size="5"
            :total="Number(data.count)"
            @current-change="getList"
            :current-page.sync="nub">
            </el-pagination>
        </el-tab-pane>
    </el-tabs>
    </div>
</div>
</template>

<script>

export default {
  name: 'SelectMemberModal',
  props:['selectM'],
  data () {
    return { 
        tabs : [
            {
            name: '1',
            label:'搜索结果'
            },
            {
            name: '2',
            label:'最近验光会员'
            }
        ],
        activeName: '1',
        nub:1,
        size:5,
        data:''
    }
  },
  methods:{
      getList(){
        var that=this;
        setTimeout(() => {
            that.$axios({
                url: 'http://myc.qineasy.cn/member-api/member/getMemberListByBoYang',
                method: 'post',
                params: {
                    jsonObject: {
                        seachCode:that.selectM,
                        nub: that.nub==1?0:(that.nub-1)*that.size,
                        size: that.size
                    },
                    keyParams: {
                        weChat: true,
                        userId: '8888',
                        orgId: '11387'
                    }
                }
            })
            .then(function (response) {
                if(response.data.code==1){
                    that.data=response.data.data;
                }else{
                    that.$message({
                        showClose: true,
                        message: '会员信息获取失败',
                            type: 'error'
                    })
                }
            })    
        },0)          
      },
      selectThis(value){
        if(value){
            this.$emit('memberInfo',value);
        }
      }
  },
    created:function(){
        this.getList();
    }
}
</script>

<style lang="scss">

.selectMember{
    .el-dialog__body {
        padding: 10px 0;
        padding-bottom: 0;
        background: #efefef;
    }
    .el-tabs--border-card{
        border:none !important;
    }
    .el-tabs--border-card>.el-tabs__header {
        background-color: #efefef;
        padding-left: 10px;
    }
    .el-tabs__item{
        font-size: 12px;
    }
    .el-tabs__item.is-active{
        color: #00AFE4 !important;
        background: #fff !important;
    }
    .el-table th {
        background: #fff !important;
    }
    th{
        background: #fff;
        text-align: center;
        padding: 7px 8px !important;
        border-bottom: 1px solid #DDDDDD;
        font-weight: bold;
        color: #555;
    }
    td{
        text-align: center;
        padding: 8.5px 8px;
    }
    tr:nth-of-type(even){
      background: rgba(246,246,246,0.50);  
    }  
}
</style>
