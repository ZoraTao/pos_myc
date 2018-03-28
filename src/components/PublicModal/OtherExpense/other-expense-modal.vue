<template>
<div id="otherExpense">
    <!--body-content-->
    <div class="clearfix modal-content-center">
        <div class="modal-content-left otherExpenseBody">
            <el-table
            size="small"
            :span-method="objectSpanMethod"
            :data="data"
            style="width: 100%">
                <el-table-column
                    prop="category"
                    label="项目">
                </el-table-column>
                <el-table-column
                    prop="brand"
                    label="分类">
                </el-table-column>
                <el-table-column
                    prop="sellingPrice"
                    label="应收金额">
                </el-table-column>
                <el-table-column
                    prop="packagePrice"
                    label="选择">
                    <template slot-scope="scope">
                        <el-checkbox></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="displacement"
                    label="实收金额">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.displacement" placeholder="请输入内容"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="otherExpenseTotal">
                <p>合计 :<span>498.00</span></p>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'OtherExpenseModal',
  data () {
    return { 
        data:[{
            category:"医学费用",
            brand:"验光费",
            sellingPrice:"10.00",
            packagePrice:"125.00",
            displacement:"10.00"
        },{
            category:"医学费用",
            brand:"验光费",
            sellingPrice:"10.00",
            packagePrice:"125.00",
            displacement:"10.00"
        },{
            category:"医学费用",
            brand:"验光费",
            sellingPrice:"10.00",
            packagePrice:"125.00",
            displacement:"10.00"
        },{
            category:"医学费用",
            brand:"验光费",
            sellingPrice:"10.00",
            packagePrice:"125.00",
            displacement:"10.00"
        },{
            category:"医学费用",
            brand:"验光费",
            sellingPrice:"10.00",
            packagePrice:"125.00",
            displacement:"10.00"
        },{
            category:"医学费用",
            brand:"验光费",
            sellingPrice:"10.00",
            packagePrice:"125.00",
            displacement:"10.00"
        }]
    }
  },
  methods:{
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (rowIndex % 3 === 0) {
                    return {
                        rowspan: 3,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        }
  }
}
</script>

<style lang="scss">

.el-dialog__body {
    padding: 0;
}
.el-checkbox__label {
    font-size: 12px;
}
.el-table th {
    background: #fff !important;
}
label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
}

#otherExpense{
    padding: 20px;
    .otherExpenseTotal{
        height: 35px;
        line-height: 35px;
        p{
            font-size: 12px;
            color: #666666;
            float: right;
            margin-right: 70px;
            span{
                margin-left:5px;
                font-weight: bold;
                font-size: 13px;
                color: #000000;
            }
        }
    }
    .otherExpenseButtonGroup{
        overflow: hidden;
        width: 100%;
        padding: 20px;
        padding-top: 10px;
        button{
            width: 90px;
            height: 30px;
            line-height: 30px;
            margin-left: 10px;
        }
    }
}
</style>
