<template>
<div class="selectMember" id="selectRH">
    <el-form ref="form">
        <el-form-item label="商品 : ">            
            <el-select style="width:90px" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>                    
            <el-select style="width:90px" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>                    
            <el-select style="width:90px" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>           
            <el-select style="width:90px" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>           
            <el-select style="width:90px" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button>查询</el-button>
        </el-form-item>
    </el-form>
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
                        <span class="am-ft-blue" @click="selectBuy(scope.row)">
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
  name: 'selectShopModal',
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
            },
            {
                shopid:'001312345',
                shopname:'毛源昌射远+1.50',
                storehouse:'总仓库',
                inventory:'214',
                allocation:'220',
                price:'210.00'
            }
        ]
    }
  },
  methods:{
      selectBuy(value){
          value.discount = 10;
          value.realSale = value.price;
          this.$emit('setBuyShop',value)
      }
  }
}
</script>

<style lang="scss">
.selectShop{
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
        .el-form-item{
            float: left;
            margin: 0;
            height: 40px;
            line-height: 40px;
            font-size: 12px;
            .el-form-item__label{
                margin:0 10px;
                width: auto !important;
            }
            .el-form-item__content{
                margin-left: 0 !important;
                float: left;
                margin-right: 20px;
            }
        }
    }
}
</style>
