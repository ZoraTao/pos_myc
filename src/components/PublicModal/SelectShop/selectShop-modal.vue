<template>
<div class="selectMember" id="selectRH">
    <el-form ref="form">
        <el-form-item label="商品 : ">
            <el-input style="width:90px" class="" placeholder="" v-model="shopIdName" @keyup.native.enter="emitThisValue()"/>
            <el-select style="width:90px" v-model="value" placeholder="请选择">
                <el-option
                v-for="item in options"
                :key="item.warehouseId"
                :label="item.warehouseName"
                :value="item.warehouseId">
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
                :data="selectProductSku.productSkuData.list"
                v-loading="!selectProductSku.productSkuData.list"
                size="small"
                align="left"
                @row-dblclick="selectBuya"
                style="width: 100%;margin-bottom:10px">
                <el-table-column
                prop="sku"
                width="120px"
                label="商品编码">
                </el-table-column>
                <el-table-column
                prop="skuName"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="warehouseName"
                width="140px"
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
                <!-- <el-table-column
                label="操作">
                    <template slot-scope="scope">
                        <span class="am-ft-blue" @click="selectBuy(scope.row)">
                            选择
                        </span>
                    </template>
                </el-table-column> -->
            </el-table>
            <el-pagination
            class="am-ft-right"
            background
            layout="prev, pager, next,total"
            :page-size="10"
            :total="selectProductSku.productSkuData.count"
            @current-change="emitThisValue"
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
        options: [
            {
                warehouseId:'0',
                warehouseName:'本出货库位'
            },
            {
                warehouseId:'1',
                warehouseName:'本分公司'
            }
        ],
        value:"0",
        cpSelectProductSku:null,
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
      selectBuy(value){//双击选择
          value.discount = 1;
          value.status = '0';
          value.realSale = value.price;
          this.brandsValue = '';
          this.varietysValue = '';
          this.selectBrands(2);
          this.$emit('setBuyShop',value)
      },
      selectBuya(row,event){//单击选择
          row.discount = 1;
          row.status = '0';
          row.realSale = row.price;
          this.brandsValue = '';
          this.varietysValue = '';
          this.selectBrands(2);
          this.$emit('setBuyShop',row)
      },
      getProductSku(){
        this.cpSelectProductSku=this.selectProductSku;
          this.cpSelectProductSku.type = '';
        this.$emit('getProductSku', this.cpSelectProductSku);
      },
      getWareHouseList(){//查询仓库列表
        var _this = this;
        if(_this.options==''){
            _this.$axios({
                url: 'http://myc.qineasy.cn/pos-api/warehouse/getWarehouseList',
                method: 'post',
                params: {
                    jsonObject: {
                    },
                    keyParams: {
                        weChat: true,
                        userId: JSON.parse(sessionStorage.getItem("userData")).userId,
                        orgId: JSON.parse(sessionStorage.getItem("userData")).orgId,
                    }
                }
            })
            .then(function (response) {
                if(response.code == 1){
                    _this.options=response.data.data.list;
                }else{
                    _this.$message({
                        showClose: true,
                        message: '会员信息获取失败',
                        type: 'error'
                    })
                }
            })
        }
      },
      emitThisValue(){
            var arr = [] ;
            // console.log(this.shopIdName)
            arr.push(this.typeValue,this.brandsValue,this.varietysValue)
            this.$nextTick(()=>{
                this.$emit('rhtWareHouse',{
                    product:this.shopIdName,
                    categoryCode:arr,
                    wareh:this.value
                });
            })

      },
      selectBrands(type){
        //   console.log(type)
            var _this = this;
          var id = '';
          switch ((type).toString()) {
            case '1':
                    _this.typeOptions=[];
                    _this.brandsOptions=[];
                    _this.varietysOptions=[];
                    _this.typeValue='C002';
                    _this.brandsValue='';
                    _this.varietysValue='';
                  break;
            case '2':
                    id=this.typeValue;
                    _this.brandsOptions=[];
                    _this.varietysOptions=[];
                    _this.brandsValue='';
                    _this.varietysValue='';
                  break;
            case '3':
                    id=this.brandsValue;
                    _this.varietysOptions=[];
                    _this.varietysValue='';
                  break;
              default:
                  break;
          }
            _this.$axios({
                url: 'http://myc.qineasy.cn/pos-api/productCategory/list',
                method: 'post',
                params: {
                    jsonObject: {
                        productCategoryId: id
                        // warehouseId:_this.value
                    },
                    keyParams: {
                        weChat: true
                    }
                }
            })
          .then(function (response) {
            if (response.data.code != '1') {
              _this.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            } else {
                switch ((type).toString()) {
                    case '1':
                        _this.typeOptions=response.data.data.productCategoryList;
                        break;
                    case '2':
                        _this.brandsOptions=response.data.data.productCategoryList;
                        break;
                    case '3':
                        _this.varietysOptions=response.data.data.productCategoryList;
                        break;
                    default:
                        break;
                }

            }
          })
          .catch(function (error) {
            console.info(error);
            _this.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      }
    },
    created: function () {
        var _this = this;
        _this.typeOptions=[];
        _this.brandsOptions=[];
        _this.varietysOptions=[];
        _this.typeValue='';
        _this.brandsValue='';
        _this.varietysValue='';
        // console.log(_this.selectProductSku)
        _this.shopIdName=_this.selectProductSku.selectSP
        this.selectBrands(1);
        this.selectBrands(2);
    },
    watch:{
    }
}
</script>

<style lang="scss" scope>

.selectShop{
    .el-table{
        min-height:340px;
    }
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
