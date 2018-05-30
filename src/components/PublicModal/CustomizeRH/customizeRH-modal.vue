<template>
<div id="customizeRH" class=" modal-content-center" >
    <div class="customizeRHBody">
      <div style="overflow:hidden">
        <div class="customizeInputGroup fn-left shops" v-show="custom == 'shop'">
            <label>类别:</label>
                <el-select v-model="customContent.class" id="classid"  placeholder="请选择" @change="initSelect(2)">
                    <el-option
                    v-for="item in classArray"
                    :key="item.className"
                    :label="item.className"
                    :value="item.productCategoryId">
                    <span style="float: left;display:block;width:100%;" @click="aler('classid',item.className)" >{{ item.className }}</span>
                    </el-option>
                </el-select>
        </div>
        <div class="customizeInputGroup fn-left shops">
            <label>品牌:</label>
                <!-- <el-select v-model="customContent.variety" placeholder="请选择" @change="initSelect(3)">
                    <el-option
                    v-for="item in varietyArray"
                    :key="item.className"
                    :label="item.className"
                    :value="item.productCategoryId">
                    <span style="float: left;display:block;width:100%;" @click="aler('varietyid',item.className)" >{{ item.className }}</span>
                    </el-option>
                </el-select> -->
                <el-autocomplete
                  popper-class="my-autocomplete"
                  v-model="customContent.varietyName"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSelect">
                  <template slot-scope="{ item }">
                    <div class="name">{{ item.className }}</div>
                  </template>
                </el-autocomplete>
        </div>
        <div class="customizeInputGroup  fn-left shops">
            <label>品种:</label>
                <el-select v-model="customContent.brand" placeholder="请选择"
                @change="initSelect(4)">
                    <el-option
                    v-for="item in brandArray"
                    :key="item.className"
                    :label="item.className"
                    :value="item.productCategoryId">
                    <span style="float: left;display:block;width:100%;" @click="aler('brandid',item.className)" >{{ item.className }}</span>
                    </el-option>
                </el-select>
        </div>
        <div class="customizeInputGroup fn-left shops"  v-show="custom =='shop'">
            <label>规格型号:</label>
                <el-select v-model="customContent.specification" placeholder="请选择" >
                    <el-option
                    v-for="item in specificationArray"
                    :key="item.className"
                    :label="item.className"
                    :value="item.productCategoryId">
                    <span style="float: left;display:block;width:100%;" @click="aler('specificationid',item.className)" >{{ item.className }}</span>
                    </el-option>
                </el-select>
        </div>
      </div>
        <div class="customizeInputGroup fn-left shops">
            <label>球镜:</label>
                <el-select v-model="customContent.value1" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>
        <div class="customizeInputGroup fn-left shops">
            <label>柱镜:</label>
                <el-select v-model="customContent.value2" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>
        <div class="customizeInputGroup fn-left shops">
            <label>下加光:</label>
                <el-select v-model="customContent.value3" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>
    </div>
    <div class="customizeRHBody">
        <div class="customizeInputGroup textareaGroup fn-left">
            <label>定做需求:</label>
            <el-input
            type="textarea"
            :rows="5"
            v-model="customContent.customMessage"
            placeholder="请输入内容"></el-input>
        </div>
    </div>
    <div class="customizeRHBody">
        <div class="customizeInputGroup fn-left">
            <label>原单价:</label>
            <el-input style="width:68px" v-model="customContent.price" @input="computedMoney" @keyup.enter.native="commitCustom" placeholder=""></el-input>
        </div>
        <div class="customizeInputGroup fn-left">
            <label>数量:</label>
            <el-input style="width:68px" v-model="customContent.nums"  @input="computedMoney" @keyup.enter.native="commitCustom" placeholder=""></el-input>
        </div>
        <div class="customizeInputGroup fn-left">
            <label>折扣:</label>
            <el-input style="width:68px" v-model="customContent.discount"  @input="computedMoney" @keyup.enter.native="commitCustom" placeholder=""></el-input>
        </div>
        <div class="customizeInputGroup fn-left">
            <label>实售单价:</label>
            <el-input style="width:68px" v-model="customContent.realSale" disabled=""  placeholder=""></el-input>
        </div>
    </div>
     <div class="enters">
            <!-- <el-button type="primary" @click="commitCustom();customizeRH = false">确定</el-button> -->
            <el-button type="primary" @click="commitCustom()">确定</el-button>
        </div>
</div>
</template>

<script>
// 出参：
// {
// customizeNo:定做单编号
// }
import _ from "lodash";
import { debounce } from '../../../utils/other';
export default {
  name: "CustomizeRHModal",
  data() {
    return {
      options:[],
      customContent: {
        value1: "",//球镜
        value2: "",//柱镜
        value3: "",//下加光
        class:'',//类别
        variety:'',//品牌
        varietyName:'',//品牌
        brand:'',//品种
        brandName:'',//品种
        specification:'',//规格
        customMessage: "",
        price: "", //原价
        nums: "1", //数量
        discount: "", //折扣
        realSale: "", //实售
        status: "1",
        classid:'',//类别
        varietyid:'',//品牌
        brandid:'',//品种
        specificationid:'',//规格型号
      },
      sphArray:null,
      cylArray:null,
      addArray:null,
      classArray:null,//大类
      varietyArray:null,//品种
      brandArray:null,//品牌
      specificationArray:null,//规格
    };
  },
   props:{
    custom:{
      type:String,
      default:null
    },
    shopMember:{
      type:String,
      default:null
    },
    orgData:{
      type:Object,
      default:null
    },
    memberShipDisCount:{
      type:String,
      default:'1'
    }
  },
  methods: {
    firstDiscount(){
      this.customContent.discount = this.memberShipDisCount==''?'10':(this.memberShipDisCount>1?parseFloat(this.memberShipDisCount).toFixed(2):parseFloat(this.memberShipDisCount*10).toFixed(2));
    },
    aler(name,data){
      console.log(name,data)
      if(name == 'classid'){
        this.customContent.classid = data;
      }else if(name == 'varietyid'){
        this.customContent.varietyid = data;
      }else if(name == 'brandid'){
        this.customContent.brandid = data;
      }else if(name == 'specificationid'){
        this.customContent.specificationid = data;
      }
    },
     querySearch(queryString, cb) {
        var restaurants = this.varietyArray;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.className.indexOf(queryString) != -1);
        };
      },
      handleSelect(item) {//选中后回调
        console.log(item);
        this.customContent.varietyName = item.className;
        this.customContent.variety = item.productCategoryId;
        this.initSelect(3);
      },
      handleIconClick(ev) {//点击icon回调
        console.log(ev);
      },
    initSelect(type){
            var _this = this;
          var id = '';
          switch ((type).toString()) {
            case '1'://类别默认
                    _this.varietyArray=[];
                    _this.brandArray=[];
                    _this.specificationArray=[];
                    if(_this.custom =='left'||_this.custom == 'right'){
                        _this.customContent.class='';
                    }else{
                        _this.customContent.class='';
                    }
                    _this.customContent.variety='';
                    _this.customContent.brand='';
                    _this.customContent.specification='';
                  break;
            case '2'://选择类别后加载品种
                    id=_this.customContent.class||"C001";
                    _this.brandArray=[];
                    _this.varietyArray=[];
                    _this.specificationArray=[];
                    _this.customContent.variety='';
                    _this.customContent.brand='';
                    _this.customContent.specification='';
                  break;
            case '3'://选择品种后加载品牌
                    id=_this.customContent.variety;
                    _this.brandArray=[];
                    _this.specificationArray=[];
                    _this.customContent.brand='';
                    _this.customContent.specification='';
                  break;
            case '4'://选择品牌加载规格
                     id=_this.customContent.brand;
                    _this.specificationArray=[];
                    _this.customContent.specification='';
                  break;
              default:
                  break;
          }
          if(id ==""&&type!=1) return
            _this.$axios({
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
              _this.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            } else {
                switch ((type).toString()) {
                    case '1':
                        _this.classArray=response.data.data.productCategoryList;
                        break;
                    case '2':
                        _this.varietyArray=response.data.data.productCategoryList;
                        break;
                    case '3':
                        _this.brandArray=response.data.data.productCategoryList;
                        break;
                    case '4':
                        _this.specificationArray=response.data.data.productCategoryList;
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
       computedMoney() {
      let _this = this;
      if (parseFloat(_this.customContent.price) > 0) {
        //如果输入了价格
        if (parseFloat(_this.customContent.nums) > 0) {
          //如果输入了数量
          if (parseFloat(_this.customContent.discount) > 0) {
            //如果输入了折扣
            _this.customContent.realSale = (
              parseFloat(_this.customContent.price) *
              parseFloat(_this.customContent.nums) *
              parseFloat(_this.customContent.discount / 10)
            ).toFixed(2);
          }
        }
      } else {
      }
    },
    commitCustom() {
      let _this = this;
      console.log(_this.customContent);
      if (_this.customContent.price==''||typeof parseFloat(_this.customContent.price) != 'number') {
           _this.$message({
            type: "error",
            message: "请填写规范",
            showClose: true
          });
          return false;
      }
      let where = ''
      if(_this.custom != 'shop'){
        if(_this.custom == 'right'){
          where = 'R'
        }else if(_this.custom == 'left'){
          where = 'L'
        }
      }
      _this.customContent.price = parseFloat(_this.customContent.price);
      let users =  JSON.parse(sessionStorage.getItem("userData"));
      // console.log(1,_this.orgData)
      _this.$myAjax({
          url:'pos-api/customize/addCustomize',
          data:{
                // customizeId :'',//定做单ID',
                // customizeNo :'',//定做单编号',
                // orderNo :'',//订单编号',
                customizeDemand :_this.customContent.customMessage,//定做需求',
                count:_this.customContent.nums,///'定做数量',
                customizeOrgName :_this.orgData.shopName,//users.orgName,//下单公司',
                customizeOrgId :_this.orgData.shopId,//下单公司ID',
                customizeShopName :_this.orgData.shopName,//下单门店',
                customizeShopId:_this.orgData.shopId,//下单门店ID',
                customizePerson :_this.shopMember,//制单人'
                sph:_this.customContent.value1,//球镜
                cyl:_this.customContent.value2,//柱镜
                add:_this.customContent.value3,//下架光
                brandId:_this.customContent.brand,//品牌
                sortId:_this.customContent.variety,//品种
                model:_this.customContent.specification,//规格型号
                sortBaseId:_this.customContent.class,//类别
                yPrice:_this.customContent.price,//原价
                sPrice:_this.customContent.realSale,//实售
                discount:_this.customContent.discount,//折扣
                count:_this.customContent.nums,//数量
                choose:where,//左右镜
                // {"customizeDemand":"1111","count":"1","customizeOrgName":"毛源昌商城","customizeOrgId":"11387","customizeShopName":"天一恒泰店","customizeShopId":"11387","customizePerson":"陈中床"}
          },
          keyParams:{
            corporationId:JSON.parse(sessionStorage.getItem("userData")).corporationId,
          },
          success:function(res){
              if(res.code == 1){
                  _this.customContent.customId = res.data.customizeNo;
                    let commits = _.clone(_this.customContent);
                    //   console.log("子组件", commits);
                    commits.discount = commits.discount/10;
                    _this.$emit("commitCustomMessage", commits);
                     _this.$message({
                        type: "success",
                        message: "添加成功",
                        showClose: true
                    });
                    setTimeout(() => {
                        for (var key in _this.customContent) {
                            _this.customContent[key] = "";
                        }
                        _this.customContent.nums = "1";
                        _this.customContent.discount = '';
                        _this.customContent.status = "1";
                    }, 1000);
              }else{
                 _this.$message({
                      type:'error',
                      message:'定做失败，请确认需求',
                      showClose:true
                  })
              }
          },error:function(err){
              console.log(err)
          }
      })

    }
  },
  computed: {},
  watch: {},
  created() {
    let opt = [];
    let num = -10;
    while (num<=10)
    {
      let obj = new Object();
      obj.value = num.toFixed(2);
      obj.label = num.toFixed(2);
      opt.push(obj);
      num+=0.25;
    }
    this.options = opt;
  }
};
</script>

<style scope lang="scss">
.customizeRH {
  .el-table th {
    background: #fff !important;
  }

  .modal-content-center {
    padding: 15px 20px;
    overflow: hidden;
  }
  #customizeRH {
    .customizeRHBody {
      width: 100%;
      overflow: hidden;
      h5 {
        font-weight: bold;
        font-size: 13px;
        color: #666666;
        margin-bottom: 15px;
      }
      .customizeInputGroup {
        font-size: 12px;
        color: #666666;
        margin-left: 10px;
        label {
          min-width: 50px;
          text-align: right;
          display: inline-block;
          margin-right: 10px;
          font-weight: 400;
        }
        .el-select {
          width: 116px;
        }
        .el-textarea {
          width: calc(100% - 155px);
        }
      }
      .shops{
        margin-top:15px;
      }
      .textareaGroup {
        width: 100%;
        margin: 10px;
        label {
          vertical-align: top;
        }
      }
    }
    .enters {
      margin-top: 40px;
      width: 100%;
      height: 40px;
      .el-button {
        margin-right: 40px;
        float: right;
      }
    }
    .customizeRHFooter {
      background: #f4f4f4;
      button {
        margin: 20px;
        padding: 0px 30px;
        background: #00afe4;
        border-radius: 4px;
      }
    }
  }
}
</style>
