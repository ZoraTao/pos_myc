<template>
<div id="customizeRH" class=" modal-content-center">
    <div class="customizeRHBody">
      <div style="overflow:hidden">
        <div class="customizeInputGroup  fn-left shops">
            <label>品牌:</label>
                <el-select v-model="customContent.brand" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>
        <div class="customizeInputGroup fn-left shops">
            <label>品种:</label>
                <el-select v-model="customContent.variety" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>
        <div class="customizeInputGroup fn-left shops"  v-show="custom =='shop'">
            <label>规格型号:</label>
                <el-select v-model="customContent.specification" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
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
export default {
  name: "CustomizeRHModal",
  data() {
    return {
      options: [
        {
          value: "-10.00",
          label: "-10.00"
        },
        {
          value: "-9.75",
          label: "-9.75"
        },
        {
          value: "-9.50",
          label: "-9.50"
        },
        {
          value: "-9.25",
          label: "-9.25"
        },
        {
          value: "-9.00",
          label: "-9.00"
        },
        {
          value: "-8.75",
          label: "-8.75"
        },
        {
          value: "-8.50",
          label: "-8.50"
        },
        {
          value: "-8.25",
          label: "-8.25"
        },
        {
          value: "-8.00",
          label: "-8.00"
        },
        {
          value: "-7.75",
          label: "-7.75"
        },
        {
          value: "-7.50",
          label: "-7.50"
        },
        {
          value: "-7.25",
          label: "-7.25"
        },
        {
          value: "-7.00",
          label: "-7.00"
        },
        {
          value: "-6.75",
          label: "-6.75"
        },
        {
          value: "-6.50",
          label: "-6.50"
        },
        {
          value: "-6.25",
          label: "-6.25"
        },
        {
          value: "-6.00",
          label: "-6.00"
        },
        {
          value: "-5.75",
          label: "-5.75"
        },
        {
          value: "-5.50",
          label: "-5.50"
        },
        {
          value: "-5.25",
          label: "-5.25"
        },
        {
          value: "-5.00",
          label: "-5.00"
        },
        {
          value: "-4.75",
          label: "-4.75"
        },
        {
          value: "-4.50",
          label: "-4.50"
        },
        {
          value: "-4.25",
          label: "-4.25"
        },
        {
          value: "-4.00",
          label: "-4.00"
        },
        {
          value: "-3.75",
          label: "-3.75"
        },
        {
          value: "-3.50",
          label: "-3.50"
        },
        {
          value: "-3.25",
          label: "-3.25"
        },
        {
          value: "-3.00",
          label: "-3.00"
        },
        {
          value: "-2.75",
          label: "-2.75"
        },
        {
          value: "-2.50",
          label: "-2.50"
        },
        {
          value: "-2.25",
          label: "-2.25"
        },
        {
          value: "-2.00",
          label: "-2.00"
        },
        {
          value: "-1.75",
          label: "-1.75"
        },
        {
          value: "-1.50",
          label: "-1.50"
        },
        {
          value: "-1.25",
          label: "-1.25"
        },
        {
          value: "-1.00",
          label: "-1.00"
        },
        {
          value: "-0.75",
          label: "-0.75"
        },
        {
          value: "-0.50",
          label: "-0.50"
        },
        {
          value: "-0.25",
          label: "-0.25"
        },
        {
          value: "-0.00",
          label: "-0.00"
        }
      ],
      customContent: {
        value1: "",//球镜
        value2: "",//柱镜
        value3: "",//下加光
        specification:'',//规格
        brand:'',//品牌
        variety:'',//品种
        customMessage: "",
        price: "", //原价
        nums: "1", //数量
        discount: "10", //折扣
        realSale: "", //实售
        status: "1"
      },
      sphArray:null,
      cylArray:null,
      addArray:null,
      specificationArray:null,
      varietyArray:null,
      brandArray:null,
    };
  },
   props:{
    custom:{
      type:String,
      default:null
    }
  },
  methods: {
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
        console.log("不是价格");
      }
    },
    initSelect(){
      _this.$myAjax({
          url:'pos-api/customize/addCustomize',
          data:{},
          success:function(res){
           if(res.code ==1){
            _this.sphArray = res.data.sph;
            _this.cylArray = res.data.cyl;
            _this.addArray = res.data.add;
            _this.specificationArray = res.data.model;
            _this.brandArray = res.data.brandId;
            _this.varietyArray = res.data.sortId;
           }
          },
          error:function(err){

          }
      })
    },
    commitCustom() {
      let _this = this;
      console.log(this.customContent);
      if (this.customContent.value1 ==''||this.customContent.price==''||typeof parseFloat(this.customContent.price) != 'number') {
           this.$message({
            type: "error",
            message: "请填写规范",
            showClose: true
          });
          return false;
      }
      customContent.price = parseFloat(this.customContent.price);
      let users =  JSON.parse(localStorage.getItem("userData"));
      _this.$myAjax({
          url:'pos-api/customize/addCustomize',
          data:{
                // customizeId :'',//定做单ID',
                // customizeNo :'',//定做单编号',
                // orderNo :'',//订单编号',
                customizeDemand :_this.customContent.customMessage,//定做需求',
                count:_this.customContent.nums,///'定做数量',
                customizeOrgName :'毛源昌商城',//users.orgName,//下单公司',
                customizeOrgId :'4343',//下单公司ID',
                customizeShopName : '天一恒泰店',//下单门店',
                customizeShopId:'4232',//下单门店ID',
                customizePerson :'陈中床',//制单人'
                // {"customizeDemand":"1111","count":"1","customizeOrgName":"毛源昌商城","customizeOrgId":"11387","customizeShopName":"天一恒泰店","customizeShopId":"11387","customizePerson":"陈中床"}
          },
          success:function(res){
              if(res.code == 1){
                  _this.customContent.customId = res.data.customizeNo;
                    let commits = _.clone(_this.customContent);
                    //   console.log("子组件", commits);
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
                        _this.customContent.discount = "10";
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
  created() {}
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
          width: 100px;
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
