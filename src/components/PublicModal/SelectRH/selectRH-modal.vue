<template>
<div class="selectMember" id="selectRH">
    <div nz-form-item class="w150 mgb10">                    
        <el-select style="width:120px" v-model="value" placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
    <div class="">
        <!--body-top-->
        <div class="clearfix modal-content-top">
            <el-table
                :data="data"
                size="small"
                align="left"
                style="width: 100%;margin-bottom:10px">
                <el-table-column
                prop="shopid"
                label="商品编码">
                </el-table-column>
                <el-table-column
                prop="shopname"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="storehouse"
                label="出货仓库">
                </el-table-column>
                <el-table-column
                prop="inventory"
                label="库存数">
                </el-table-column>
                <el-table-column
                prop="allocation"
                label="可分配数">
                </el-table-column>
                <el-table-column
                prop="price"
                label="单价">
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
            layout="prev, pager, next,total"
            :total="1000">
            </el-pagination>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'selectRHModal',
  data () {
    return { 
        options: [],
        value:"",
        data:[
            {
                shopid:'0012345',
                shopname:'毛源昌1.551非球面防辐射远+1.50',
                storehouse:'总仓库',
                inventory:'24',
                allocation:'20',
                price:'230.00'
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
    padding: 15px;
}
.el-table th {
    background: #fff !important;
}
.el-pagination__total{
    float: left;
}
#selectRH{
    .w150{
        width: 150px;
    }
}
</style>
