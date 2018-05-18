<template>
<div class="selectMember" id="selectRH">
    <div nz-form-item class="w150 mgb10">
        <el-select style="width:120px" clearable v-model="value" placeholder="请选择" @change="emitThisValue()">
            <el-option
            v-for="item in options"
            :key="item.warehouseId"
            :label="item.warehouseName"
            :value="item.warehouseId">
            </el-option>
        </el-select>
         <el-select style="width:120px" clearable v-model="brand" placeholder="全部品牌" @change="changesSelect(2)">
            <el-option
            v-for="item in brands"
            :key="item.productCategoryId"
            :label="item.className"
            :value="item.productCategoryId">
            </el-option>
        </el-select>
         <el-select style="width:120px" clearable v-model="Varieties" placeholder="全部品种"  @change="changesSelect(3)">
            <el-option
            v-for="item in Varietiess"
            :key="item.productCategoryId"
            :label="item.className"
            :value="item.productCategoryId">
            </el-option>
        </el-select>

        <el-button type="plain" @click="emitThisValue">查询</el-button>
    </div>
    <div class="">
        <!--body-top-->
        <div class="clearfix modal-content-top">
            <el-table
                :data="selectProductSku.productSkuData.list"
                v-loading="!selectProductSku.productSkuData.list || selectProductSku.productSkuData.list == []"
                size="small"
                align="center"
                @row-dblclick="selectThisa"
                style="width: 100%;margin-bottom:10px">
                <el-table-column
                prop="sku"
                width="160px"
                label="商品编码">
                </el-table-column>
                <el-table-column
                width="300px"
                prop="skuName"
                label="商品名称">
                </el-table-column>
                <el-table-column
                prop="warehouseName"
                width="90px"
                label="出货仓库">
                </el-table-column>
                <el-table-column
                prop="quantity"
                width="80px"
                label="库存数">
                </el-table-column>
                <el-table-column
                prop="allotQuantity"
                width="90px"
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
                        <span class="am-ft-blue" @click="selectThis(scope.row)">
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
  props:['selectProductSku','selectBrand'],
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
        loading:true,
        value:"0",
        brands:null,
        Varietiess:null,
        brand:'',//品牌
        Varieties:'',//品种
        cpSelectProductSku:null,
    }
  },
  methods:{
      getProductSku(){
        this.cpSelectProductSku=this.selectProductSku;
        this.$emit('getProductSku', this.cpSelectProductSku);
      },
      childrenCleanSelectRHModal(){
          this.brand = '';
          this.Varieties = '';
          this.initBrand();
      },
      selectThis(value){//选择镜片 传值
        value.discount = 10;
        // value.skuName = '';
        value.realSale=value.price;
        console.log(value)
        this.childrenCleanSelectRHModal();
        this.$emit('selectSku',value);
      },
      selectThisa(row,event){//双击
        row.discount = 10;
        // value.skuName = '';
        row.realSale=row.price;
        this.childrenCleanSelectRHModal();
        row.status = '0';
        this.$emit('selectSku',row);
      },
      changesSelect(type){
            let _this = this;
            let id = '';
            console.log(this.brand)
            switch ((type).toString()) {
            case '2':
                    id=this.brand;
                    _this.Varietiess=[];
                    _this.Varieties='';
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
                    case '2':
                        _this.Varietiess=response.data.data.productCategoryList;
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
                        userId: JSON.parse(localStorage.getItem("userData")).userId,
                        orgId: JSON.parse(localStorage.getItem("userData")).orgId,
                    }
                }
            })
            .then(function (res) {
                if(res.code == 1){
                    that.options=res.data.data.list;
                }else{
                    _this.$message({
                        type:'error',
                        message:res.msg,
                        showClose:true
                    })
                }
            })
        }
      },
      //全部品牌接口获取
      initBrand(){
          let _this = this;
          _this.$myAjax({
              url:'pos-api/productCategory/list',
              data:{
                  productCategoryId:"C001"
              },success:function(res){
                  if(res.code == 1){
                    _this.brands = res.data.productCategoryList
                  }
              },error:function(err){
                  _this.$message({
                      type:'error',
                      message:'数据获取失败',
                      showClose:true
                  })
              }
          })
      },
      emitThisValue(){
          let arr = [];
          arr.push('C001',this.brand,this.Varieties)
        this.$emit('rhtWareHouse',{
            categoryCode:arr,
            wareh:this.value});
      }
  },
  watch:{

  },
  destoryed(){
      console.log(1)
  },
  mounted:function(){
          this.initBrand();
  }
}
</script>

<style lang="scss" scope>
.w150{
    overflow: hidden;
}
.selectRH{
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
            // width: 150px;
        }
        .el-select{
            margin-right: 20px;
        }
    }


}
</style>
