<template>
<div class="selectMember" id="selectRH">
    <el-form ref="form">
        <el-form-item label="商品 : ">            
            <el-input style="width:90px" class="" placeholder="" v-model="shopIdName"/>                 
            <el-select style="width:90px" v-model="value" placeholder="请选择" @visible-change="getWareHouseList()">
                <el-option
                v-for="item in options"
                :key="item.warehouseId"
                :label="item.warehouseName"
                :value="item.warehouseName">
                </el-option>
            </el-select>                    
            <el-select style="width:90px" v-model="typeValue" placeholder="请选择" @change="selectBrands(2)">
                <el-option
                v-for="item in typeOptions"
                :key="item.classCode"
                :label="item.className"
                :value="item.productCategoryId">
                </el-option>
            </el-select>           
            <el-select style="width:90px" v-model="brandsValue" placeholder="请选择" @change="selectBrands(3)">
                <el-option
                v-for="item in brandsOptions"
                :key="item.classCode"
                :label="item.className"
                :value="item.productCategoryId">
                </el-option>
            </el-select>           
            <el-select style="width:90px" v-model="varietysValue" placeholder="请选择">
                <el-option
                v-for="item in varietysOptions"
                :key="item.classCode"
                :label="item.className"
                :value="item.productCategoryId">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="emitThisValue()">查询</el-button>
        </el-form-item>
    </el-form>
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
                width="120px"
                label="商品编码">
                </el-table-column>
                <el-table-column
                prop="skuName"
                width="210px"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="warehouseName"
                width="70px"
                label="出货仓库">
                </el-table-column>
                <el-table-column
                prop="quantity"
                width="70px"
                label="库存数">
                </el-table-column>
                <el-table-column
                prop="allotQuantity"
                width="70px"
                label="可分配数">
                </el-table-column>
                <el-table-column
                prop="price"
                width="80px"
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
  name: 'selectShopModal',
  props:['selectProductSku'],
  data () {
    return { 
        options: [],
        cpSelectProductSku:null,
        value:"",
        typeOptions:[],
        brandsOptions:[],
        varietysOptions:[],
        typeValue:'',
        brandsValue:'',
        varietysValue:'',
        shopIdName:'',
        data:[]
    }
  },
  methods:{
      selectBuy(value){
          value.discount = 10;
          value.realSale = value.price;
          this.$emit('setBuyShop',value)
      },
      getProductSku(){
        this.cpSelectProductSku=this.selectProductSku;
        this.$emit('getProductSku', this.cpSelectProductSku);
      },
      getWareHouseList(){
        var that = this;
        if(that.options==''){
            that.$axios({
                url: 'http://myc.qineasy.cn/pos-api/warehouse/getWarehouseList',
                method: 'post',
                params: {
                    jsonObject: {           
                    },
                    keyParams: {
                        weChat: true,
                        userId: '8888',
                        orgId: '11387'
                    }
                }
            })
            .then(function (response) {                    
                that.options=response.data.data.list;
            })  
        }
      },
      emitThisValue(){
            var arr = [] ;
            arr.push(this.typeValue,this.brandsValue,this.varietysValue)
            this.$emit('rhtWareHouse',{
                product:this.shopIdName,
                categoryCode:arr,
                wareh:this.value
            });
      },
      selectBrands(type){
            var that = this;
          var id = '';
          switch ((type).toString()) {
            case '1':
                    that.typeOptions=[];
                    that.brandsOptions=[];
                    that.varietysOptions=[];
                    that.typeValue='';
                    that.brandsValue='';
                    that.varietysValue='';
                  break;
            case '2':
                    id=this.typeValue;
                    that.brandsOptions=[];
                    that.varietysOptions=[];
                    that.brandsValue='';
                    that.varietysValue='';
                  break;
            case '3':
                    id=this.brandsValue;
                    that.varietysOptions=[];
                    that.varietysValue='';
                  break;
              default:
                  break;
          }
            that.$axios({
                url: 'http://myc.qineasy.cn/pos-api/productCategory/list',
                method: 'post',
                params: {
                    jsonObject: {
                        productCategoryId: id
                    },
                    keyParams: {
                        weChat: true
                    }
                }
            })
          .then(function (response) {
            if (response.data.code != '1') {
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            } else {
                switch ((type).toString()) {
                    case '1':
                        that.typeOptions=response.data.data.productCategoryList;
                        break;
                    case '2':
                        that.brandsOptions=response.data.data.productCategoryList;
                        break;
                    case '3':
                        that.varietysOptions=response.data.data.productCategoryList;
                        break;
                    default:
                        break;
                }

            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })          
      }
    },
    created: function () {
        this.selectBrands(1)
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
