<template>
<div id="packageGoods">
    <!--body-content-->
    <div class="clearfix modal-content-center">
        <div class="modal-content-left packageGoodsBody">
            <div class="packageGoodsTop">
                <div class="relative">
                    <el-input style="width:270px" v-model="mymodel" placeholder="输入套餐价/套餐名／套餐编码" v-on:change="ModelChange()"></el-input>
                </div>
                <el-button @click="ModelChange()">查询</el-button>
            </div>
            <div class="packageGoodsContent">
                <div class="pgCbody">
                    <div class="defaultContent" v-show="packagesArr.length<1">
                        <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/image_quesheng.png"/>
                        <p>请选择您想要的套餐</p>
                    </div>
                    <div class="fullContent">
                        <div class="packageDetail">
                            <div class="packageList">
                                <div class="packageItem" v-for=" item in packagesArr" :key="item.packageCode" @dblclick="readDetail(item)" v-show="!read">
                                    <p><i>￥</i>{{item.packagePrice}}</p>
                                    <h4>{{item.packageName}}</h4>
                                    <h5>{{item.packageCode}}</h5>
                                    <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_taocan.png">
                                </div>
                                
                            </div>
                            <div class="packageDetailInfo" v-show="read" v-if="packageCreate!=null&&packageDetails!=null">
                                <div class="packageDetailTitle">
                                    <img @click="read=!read" src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_fanhui.png"/>
                                    <p>{{packageCreate.packageName}}{{packageCreate.packageCode}} ￥{{packageCreate.packagePrice}}</p>
                                </div>
                                <div class="packageDetailContent">
                                        <el-table
                                        size="small"
                                        :data="packageDetails"
                                        style="width: 100%">
                                            <el-table-column
                                                prop="className"
                                                label="品类">
                                            </el-table-column>
                                            <el-table-column
                                                label="品牌"
                                                width="120">
                                                <template slot-scope="scope">
                                                    <el-select v-model="packageDetails[scope.$index].brandId" placeholder="请选择" v-if="packageDetails[scope.$index].level>3" @focus="initData(scope.row,1)" @change="search(scope.row,1)">
                                                        <el-option
                                                        v-for="item in packageDetails[scope.$index].brandArr"
                                                        :key="item.productCategoryId"
                                                        :label="item.className"
                                                        :value="item.productCategoryId">
                                                        </el-option>
                                                    </el-select>
                                                <span v-else>{{packageDetails[scope.$index].brandName}}</span>
                                            </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="packageSalePrice"
                                                label="零售限价">
                                            </el-table-column>
                                            <el-table-column
                                                prop="packagePrice"
                                                label="套餐价">
                                            </el-table-column>
                                            <el-table-column
                                                prop="switchPrice"
                                                label="置换限价">
                                            </el-table-column>
                                            <el-table-column
                                                prop="varietyName"
                                                label="品种"
                                                width="150">
                                                <template slot-scope="scope">
                                                    <el-select v-model="packageDetails[scope.$index].varietyId" placeholder="请选择" v-if="scope.row.level>2" @focus="initData(scope.row,2)" @change="search(scope.row,2)">
                                                        <el-option
                                                        v-for="item in packageDetails[scope.$index].varietyArr"
                                                        :key="item.productCategoryId"
                                                        :label="item.className"
                                                        :value="item.productCategoryId">
                                                        </el-option>
                                                    </el-select>
                                                <span v-else>{{scope.row.varietyName}}</span>
                                                </template>
                                            </el-table-column>
                                            <el-table-column
                                                prop="modelName"
                                                label="商品"
                                                width="150">
                                                <template slot-scope="scope">
                                                    <!-- <el-autocomplete
                                                        v-if="scope.row.level>1"
                                                        popper-class="my-autocomplete"
                                                        v-model="packageDetails[scope.$index].productModelId" 
                                                        placeholder="请选择" 
                                                        :fetch-suggestions="querySearchAsync"
                                                        @select="handleSelect">
                                                        <template slot-scope="scope">
                                                            <div class="name">{{ scope.row.farSearchCodeArr.skuName }}</div>
                                                            <span class="addr">{{ scope.row.farSearchCodeArr.stockId }}</span>
                                                        </template>
                                                    </el-autocomplete> -->
                                                    <el-autocomplete
                                                      popper-class="my-autocomplete"
                                                    v-if="scope.row.level>1"
                                                    @focus="toCopyValue(scope.row,scope.$index)"
                                                    class="inline-input"
                                                    v-model="packageDetails[scope.$index].farSearchCode"
                                                    :fetch-suggestions="querySearch"
                                                    placeholder="请输入内容"
                                                    @select="handleSelect"
                                                    >
                                                        <template slot-scope="{ item }">
                                                                <div class="name" >{{ item.skuName }}</div>
                                                        </template>
                                                    </el-autocomplete>
                                                    <!-- <el-input @input="farSearch(scope.row)" v-model="packageDetails[scope.$index].farSearchCode"  v-if="scope.row.level>1"></el-input> -->
                                                    <span v-else>{{scope.row.modelName}}</span>
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                </div>
                            </div>
                            <div class="packageDetailButtonGroup" v-show="read">
                                <el-checkbox class="fn-left">套餐置换</el-checkbox>
                                <el-button @click="toHidePackageModel(false)">取 消</el-button>
                                <el-button type="primary" @click="toHidePackageModel(true)">确定</el-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'PackageGoodsModal',
  data () {
    return { 
        mymodel:"",
        searchContent:false,        
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        value: '',
        nowIndex:'',
        packageDetails:null,
        read:false,
        packagesArr:[],
        nowSearchArr:[],
        packageCreate:null,
        data:[{
            commodity:'毛源昌1.551非球面防辐射辐射远+1.50',
            variety:'1.55绿膜防辐射远',
            displacement:'10.00',
            packagePrice:'134.00',
            sellingPrice:'230.00',
            brand:'毛源昌',
            category:'镜架'
        }]
    }
  },
  methods:{
      toHidePackageModel(bool){
          const _this = this;
          let times = Date.parse(new Date());
          console.log(times)
          for(var i=0,datas = _this.packageDetails;i<datas.length;i++){
              _this.packageDetails[i].status = '4'
              _this.packageDetails[i].dataTimt = times
          }
          console.log(_this.packageDetails)
          if(bool){
              for(var i=0,datas = _this.packageDetails;i<datas.length;i++){
                  if(datas[i].farSearchCode == ''&&datas[i].modelName == ''){
                      _this.$message({
                          message:'请填写完整',
                          type:'error',
                          showClose:true
                      })
                      return 
                  }
              }
            let obj = {
                data:_this.packageDetails,
                package:_this.packageCreate
            }
            _this.$emit('toHidePackageModel',obj);
          }else{
              _this.$emit('toHidePackageModel',bool)
          }
          this.packageDetails = [];
          this.read = false;
          this.packagesArr = [];
      },
      toCopyValue(data,index){
          this.nowIndex = index;
          this.farSearch(data)
          this.nowSearchArr = data;
      },
      handleSelect(item) {
        //   console.log(this.packageDetails[this.nowIndex])
          this.packageDetails[this.nowIndex].farSearchCode = item.skuName;
          this.packageDetails[this.nowIndex].farSearchCodeId = item.productId;
          this.packageDetails[this.nowIndex].sku = item.sku;
          this.packageDetails[this.nowIndex].warehouseId = item.warehouseId;
          this.packageDetails[this.nowIndex].stockId = item.stockId;
          this.packageDetails[this.nowIndex].quantity = item.quantity;
          this.packageDetails[this.nowIndex].allotQuantity = item.allotQuantity;
          this.packageDetails[this.nowIndex].productCategoryId = item.classId;
      },
      createFilter(queryString) {
        return (restaurant) => {
            // console.log(restaurant.skuName,restaurant.skuName.indexOf(queryString))
          return (restaurant.skuName.toLowerCase().indexOf(queryString.toLowerCase())!=-1);
        };
      },
       querySearch(queryString, cb) {
           const _this = this;
           if(_this.nowSearchArr.varietyId=='') return
            var restaurants = _this.nowSearchArr.farSearchCodeArr;
            var results = queryString ? restaurants.filter(_this.createFilter(queryString)) : restaurants;
            // clearTimeout(_this.timeout);
            // _this.timeout = setTimeout(() => {
            cb(results);
            // }, 3000 * Math.random());
        },
        //远程搜索
      farSearch(data){
          const _this = this;
          console.log(data)
          _this.$myAjax({
              url:'pos-api/productSku/list',
              data:{
                sphere: "",
                cylinder:"",
                addLight: "",
                color: "",
                colorCode: "",
                categoryCode: [data.productCategoryId,data.brandId,data.varietyId],
                product: data.farSearchCode,
                type: _this.productCategoryId=='C001'?'0':'',
                wareh: '',
              },success:function(res){
                  if(res.code == 1){
                    data.farSearchCodeArr = res.data.list
                  }else{
                      _this.$message({
                          type:'error',
                          message:res.msg,
                          showClose:true
                      })
                  }
              },error:function(err){

              }
          })
      },
      initData(data,status){
          if(status == 1){
            if(!data.brandBool) return
          }else if(status == 2){
            if(!data.varietyBool) return
          }
        this.changesSelect(status,data)
      },
      changesSelect(type,data){
        //   console.log(data)
            let _this = this;
            let id = '';
            switch ((type).toString()) {
            case '1':
                    id = data.productCategoryId;
                    data.brandArr = [];
                    data.varietyArr = [];
                break;
            case '2':
                    id=data.brandId;
                    data.varietyArr = [];
                  break;

          }
        //   console.log(id)
           _this.$myAjax({
                url: 'pos-api/productCategory/list',
                data: {
                        productCategoryId: id
                },
                success:function (res) {
                    if (res.code != '1') {
                    _this.$message({
                        showClose: true,
                        message: '请求数据出问题喽，请重试！',
                        type: 'error'
                    })
                    return false;
                    } else {
                        switch ((type).toString()) {
                            case '1':
                                data.brandArr = res.data.productCategoryList;
                                data.brandBool = false;
                                _this.changesSelect(2,data)
                                break;
                            case '2':
                                data.varietyArr = res.data.productCategoryList;
                                break;
                            default:
                                break;
                        }

                    }
                },
                error:function (error) {
                    console.info(error);
                    _this.$message({
                    showClose: true,
                    message: '请求数据失败，请联系管理员',
                    type: 'error'
                    })
                }
            })
      },
      search(data,status){
          this.changesSelect(status,data)
      },
      readDetail(data){
        //   console.log(data)
          let _this = this;
          _this.$myAjax({
              url:'pos-api/packages/getPackage',
              data:{
                  packageId:data.packageId
              },success:function(res){
                  if(res.code == 1){
                      let datas = res.data.packageDetails;
                      for(var i=0;i<datas.length;i++){
                          if(datas[i].level>3){
                              datas[i].brandBool = true;
                              datas[i].brandArr = [];
                              datas[i].varietyArr = [];
                              datas[i].farSearchCode = '';
                              datas[i].farSearchCodeId = '';
                              datas[i].farSearchCodeArr = [];
                          }else if(datas[i].level>2){
                              datas[i].varietyBool = true;
                              datas[i].varietyArr = [];
                              datas[i].farSearchCode = '';
                              datas[i].farSearchCodeId = '';
                              datas[i].farSearchCodeArr = [];
                          }else if(datas[i].level>1){
                              datas[i].shopBool = true
                              datas[i].farSearchCode = '';
                              datas[i].farSearchCodeId = '';
                              datas[i].farSearchCodeArr = [];
                          }
                      }
                      _this.packageDetails= datas;
                      console.log(datas)
                      _this.packageCreate = res.data.packages;
                        _this.read = true;
                  }else{
                      _this.$message({
                        showClose:true,
                        type:"error",
                        message:'查询失败'
                    })
                  }
              },error:function(err){
                    _this.$message({
                        showClose:true,
                        type:"error",
                        message:'网络请求失败'
                    })
              }
          })
      },
      ModelChange:function(){
          let _this = this;
          _this.$myAjax({
              url:'pos-api/packages/getPackageList',
              data:{
                    // packageId:id,
                    packageCode:'',
                    packageName:'',
                    packagePrice:'',
                    // status:1,
              },success:function(res){
                  console.log(res)
                  if(res.code == 1){
                      _this.packagesArr = res.data.list;
                  }else{
                      _this.$message({
                        showClose:true,
                        type:"error",
                        message:'网络请求失败'
                    })
                  }
              },error:function(err){
                  console.log(err)
              }
          })

      }
  }
}
</script>

<style lang="scss">
.packageGoods{
    .el-dialog__body {
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
    #packageGoods{
        .packageGoodsBody{
            .packageGoodsTop{
                height: 84px;
                line-height: 84px;
                text-align: center;
                position: relative;
                background: #fff;
                button{
                    width: 96px;
                    height: 30px;
                    margin-left: 20px;
                    border: 1px solid #00AFE4;
                    border-radius: 4px;
                    color: #00AFE4;
                }
                .relative{
                    position: relative;
                    display: inline-block;
                }
                .GoodsTopPosition{
                    position: absolute;
                    top: 60px;
                    left: 0;
                    background: #FFFFFF;
                    border: 1px solid #E1E1E1;
                    box-shadow: 0 0 4px 0 rgba(204, 204, 204, 0.5);
                    min-width: 270px;
                    z-index: 999;
                    p{
                        height: 36px;
                        line-height: 36px;
                        font-size: 13px;
                        color: #333333;
                        &:hover{
                            background: #E8F6FC;
                        }
                    }
                }
            }
            .packageGoodsContent{
                padding: 6px;
                background: #EFEFEF;
                // min-height: 400px;
                .pgCbody{
                    .defaultContent{
                        background: #fff;
                        padding: 100px;
                        text-align: center;
                        p{
                            font-size: 14px;
                            color: #888888;
                            letter-spacing: 0.51px;
                            margin-left: -5px;
                            margin-top: 30px;
                        }
                    }
                    .packageList{
                        overflow: hidden;
                        .packageItem{
                            background: #FFF;
                            position: relative;
                            width: 24%;
                            padding: 8px;
                            text-align: center;
                            height: 111px;
                            margin: 1% 0.5%;
                            float: left;
                            p{
                                font-size: 36px;
                                color: #333333;
                                // margin-top: 10px;
                                i{
                                    font-size: 20px;
                                    color: #888888;
                                    font-style: normal;
                                }
                            }
                            h4{
                                font-size: 16px;
                                color: #888888;
                                margin-top: 5px;
                                font-weight: 400;
                            }
                            h5{
                                font-size: 12px;
                                color: #888888;
                                font-weight: 400;
                            }
                            img{
                                max-width: 50px;
                                max-height: 50px;
                                width: 25%;
                                position: absolute;
                                left: 0;
                                bottom: 0;
                            }
                            &:nth-child(n+5){
                                margin-top: 2px;
                            }
                        }
                    }
                    .packageDetailInfo{
                        overflow: hidden;
                        background: #fff;
                        padding: 10px;
                        .packageDetailTitle{
                            overflow: hidden;
                            margin-bottom: 10px;
                            height: 25px;
                            line-height: 25px;
                            img{
                                float: left;
                                height: 13px;
                                display: inline-block;
                                margin-top: 6px;
                            }
                            p{
                                float: left;
                                font-size: 14px;
                                color: #333333;
                                font-weight: bold;
                                margin-left: 10px;
                            }
                        }
                    }
                    .packageDetailButtonGroup{
                        padding: 10px 15px;
                        height: 64px;
                        line-height: 44px;
                        font-size: 12px;
                        color: #666666;
                        button{
                            width: 90px;
                            height: 30px;
                            line-height: 30px;
                            margin-left: 10px;
                            margin-top:10px;
                        }
                    }
                }
            }
        }
    }
}
.my-autocomplete{
    li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
