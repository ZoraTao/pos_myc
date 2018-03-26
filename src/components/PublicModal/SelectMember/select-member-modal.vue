<template>
<div class="selectMember pb10">
<!--body-top-->
<div class="clearfix modal-content-top">
    <el-tabs type="border-card" v-model="activeName">
        <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.label" :name="item.name">
            <el-table
                :data="data"
                size="small"
                align="left"
                style="width: 100%;margin-bottom:10px">
                <el-table-column
                prop="memberCard"
                label="会员卡号">
                </el-table-column>
                <el-table-column
                prop="memberName"
                label="会员姓名">
                </el-table-column>
                <el-table-column
                prop="phone"
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
                prop="time"
                label="最近验光时间">
                </el-table-column>
                <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <span class="am-ft-blue">
                            选择
                        </span>
                    </template>
                </el-table-column>
            </el-table> 
            <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next"
            :total="1000">
            </el-pagination>
        </el-tab-pane>
    </el-tabs>
    </div>
</div>
</template>

<script>

export default {
  name: 'SelectMemberModal',
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
        data:[
            {
                memberCard:'0012345',
                memberName:'张三',
                phone:'15383465790',
                sex:'男',
                age:'12',
                time:'2017-10-12 12:34:55'
            },
            {
                memberCard:'0012345',
                memberName:'张三',
                phone:'15383465790',
                sex:'男',
                age:'12',
                time:'2017-10-12 12:34:55'
            }
        ]
    }
  },
  methods:{
  }
}
</script>

<style lang="scss">
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
.selectMember{
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
