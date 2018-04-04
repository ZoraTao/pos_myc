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
                :data="selectProductSku.productSkuData.skulist"
                size="small"
                align="left"
                style="width: 100%;margin-bottom:10px">
                <el-table-column
                prop="sku"
                label="商品编码">
                </el-table-column>
                <el-table-column
                prop="skuName"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="warehouseName"
                label="出货仓库">
                </el-table-column>
                <el-table-column
                prop="quantity"
                label="库存数">
                </el-table-column>
                <el-table-column
                prop="allotQuantity"
                label="可分配数">
                </el-table-column>
                <el-table-column
                prop="price"
                label="单价">
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
            layout="prev, pager, next,total"
            :page-size="5"
            :total="selectProductSku.productSkuData.count"
            @current-change="getProductSku"
            :current-page.sync="selectProductSku.nub">
            </el-pagination>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'selectRHModal',
  props:['selectProductSku'],
  data () {
    return { 
        options: [],
        value:"",
        cpSelectProductSku:null,
    }
  },
  methods:{  
      getProductSku(){
        this.cpSelectProductSku=this.selectProductSku;
        this.$emit('getProductSku', this.cpSelectProductSku);
      },
      selectThis(value){
        value.discount=10;
        value.realSale=value.price;
        this.$emit('selectSku',value);
      }
  },
  created:function(){
  }
}
</script>

<style lang="scss">
.selectRH{
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
}
</style>
