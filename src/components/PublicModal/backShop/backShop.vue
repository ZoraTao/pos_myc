<template>
<div class="billing content_box flexH100" >
    <div class="billingInfo"   v-if="initData!==null" >
        <div class="newShop">
             <div class="newShopHead">
                <div class="newShopHead_opt">
                    <h3>退货单</h3>
                </div>
                <div class="newShopHead_opt">
                    <span class="reasonQuestion">退货原因：</span><span class="reason">{{$route.params.reason}}</span>
                </div>
                <div class="newShopHead_opt">
                    <span class="reasonQuestion">退货说明：</span><span class="reason">{{$route.params.desc}}</span>
                </div>
                <div class="newShopHead_opt">
                    <span class="reasonQuestion">原零售单号：</span><span class="reason">{{$route.params.order}}</span>
                </div>
            </div>
            <div class="newShopTable">
                <div class="box98">
                  <div  style="width:100%;">
                      <div class="thead">
                          <div style="width:58%;">退货商品</div>
                          <div style="width:8%;">数量</div>
                          <div style="width:8%;">原单价</div>
                          <div style="width:8%;">折扣</div>
                          <div style="width:9%;">退货价</div>
                          <div style="width:9%;text-align:center;">操作</div>
                      </div>
                      <div class="tbody">
                          <div v-for="(item,index) in tableData" :key="item.itemId" class="tbodyTr">
                              <div style="width:58%;">
                                <div class="backShopImgTag">
                                  <img src="https://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_tui.png" alt="">
                                </div>
                                {{item.skuName2}}</div>
                              <div style="width:8%;">{{item.nums}}</div>
                              <div style="width:8%;">{{item.price}}</div>
                              <div style="width:8%;">{{parseFloat(item.discount*10).toFixed(2)}}</div>
                              <div style="width:9%;">
                                <el-input v-model="tableData[index].realSale"  :disabled="tableData[index].status == '2'||tableData[index].status == '3'||tableData[index].status == '4'">
                                    <template slot="prefix">-</template>
                                </el-input>
                              </div>
                              <div style="width:9%;"><span class="cancalBackShop">取消退货</span></div>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
            <div class="newShop_footer">
                  <span class="newShop_countNum">共计：<i>{{initData.quantity}}件</i></span>
                  <span class="newShop_amountPrice">合计：<em>-{{initData.moneyAmount}}</em></span>
                </div>
        </div>
        <div class="oldShop">
            <div class="oldShop_head">
              <div class="oldShop_head_opt ">
                <span class="oldShop_head_title">原零售单号：<i>{{$route.params.order}}</i></span>
              </div>
              <div class="oldShop_head_opt">
                <i>{{(initData.createTime).substring(0,19)}}</i> 
              </div>
              <div class="oldShop_head_opt">
                <span class="oldShop_head_title">销售人员：<i>李四</i></span>
              </div>
            </div>
            
            <div class="box98">
                <div  style="width:100%;">
                    <div class="thead">
                        <div style="width:58%;">退货商品</div>
                        <div style="width:8%;">数量</div>
                        <div style="width:8%;">原单价</div>
                        <div style="width:8%;">折扣</div>
                        <div style="width:9%;">实售单价</div>
                        <div style="width:9%;text-align:center;">操作</div>
                    </div>
                    <div class="tbody">
                        <div v-for="(item,index) in tableData" :key="item.itemId" class="tbodyTr">
                            <div style="width:58%;">{{item.skuName2}}</div>
                            <div style="width:8%;">{{item.nums}}</div>
                            <div style="width:8%;">{{item.price}}</div>
                            <div style="width:8%;">{{parseFloat(item.discount*10).toFixed(2)}}</div>
                            <div style="width:9%;">{{item.realSale}}</div>
                            <div style="width:9%;">
                              <span class="BackShop">
                                <!-- 退货 -->
                                </span>
                              </div>
                        </div>
                    </div>
                </div>
                <div class="apply">
                  <div>
                    <em>应收：<i>{{(-saleCount).toFixed(2)}}<small style="font-size:14px;" v-show="$route.params.datas.moneyPaid>0">(已付{{$route.params.datas.moneyPaid}})</small></i></em>
                    <el-button @click="submitApply()">提交申请</el-button>
                  </div>
                </div>
            </div>
        </div>
        
    </div>
    <div :class="{memberInfo:true,mgl10:true,memberInfoPosition:!initData}">
        <div class="addMember borderfff">
            <div class="memberTop">
                <label>会员</label>
            </div>
            <div class="memberBottom">
                <div class="memberName">
                    <div class="memberTx">
                        <p>
                            <img :src="selectMember.memberInfo?(selectMember.memberInfo.headpicpath?selectMember.memberInfo.headpicpath : 'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_touxiang.png'):'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_touxiang.png'"/>{{selectMember.memberInfo?selectMember.memberInfo.name:''}}
                        </p>
                        <span>···</span>
                    </div>
                    <div class="cardLevel">
                        <span v-show="selectMember.memberInfo">{{selectMember.memberInfo?selectMember.memberInfo.cardName:''}}</span>
                    </div>
                </div>
                <div class="consume">
                    <div class="consumeItem">
                        <span>
                            {{selectMember.memberInfo?selectMember.memberInfo.shoppingCount==''?'--':selectMember.memberInfo.shoppingCount:'--'}}
                        </span>
                        <p>消费次数</p>
                    </div>
                    <div class="consumeItem">
                        <span>
                            {{selectMember.memberInfo?selectMember.memberInfo.totalConsumption==''?'--':selectMember.memberInfo.totalConsumption:'--'}}
                        </span>
                        <p>消费金额</p>
                    </div>
                    <div class="consumeItem">
                        <span>{{selectMember.memberInfo?selectMember.memberInfo.totalPoints==''?'--':selectMember.memberInfo.totalPoints:'--'}}</span>
                        <p>积分</p>
                    </div>
                </div>
                <div class="basicInformation">
                    <div class="basicInformationItem" >
                        <label>会员卡号 :</label><span>{{selectMember.memberInfo?selectMember.memberInfo.memberCardNo:'--'}}</span>
                    </div>
                    <div class="basicInformationItem">
                        <!-- <label>会员折扣 :</label><span>{{memberShipDisCount}}</span> -->
                        <label>会员折扣 :</label><span>{{selectMember.memberInfo?(selectMember.memberInfo.discount*10).toFixed(1)+'折':'--'}}</span>
                    </div>
                    <div class="basicInformationItem">
                        <label>手机号码 :</label><span>{{selectMember.memberInfo?selectMember.memberInfo.telphone:'--'}}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="eyeglassBills borderfff mgt10">
            <div class="eyeglassTop">
                <label>验光单</label>
            </div>
            <div class="selectEyeglass">
                <el-select size="mini" v-model="optometryId" placeholder="" @change="getPrescriptions()">
                    <el-option
                    v-for="item in optometryList"
                    :key="item.prescriptionId"
                    :label="item.prescriptionTime+' 验光师：'+item.optometrist"
                    :value="item.prescriptionId">
                    </el-option>
                </el-select>
            </div>
            <div class="eyeglassTable">
                <el-table
                    v-for="value in includeOptometryData"
                    :key="value.name"
                    :data="value.item"
                    v-if="value.item[0].lData != ''||value.item[0].rData != ''"
                    size="small"
                    align="left"
                    style="width: 100%;">
                    <el-table-column
                    :label="value.name"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.keys == 'add'">下加光</span>
                            <span v-if="scope.row.keys == 'ax'">轴位</span>
                            <span v-if="scope.row.keys == 'cyl'">柱镜</span>
                            <span v-if="scope.row.keys == 'dpd'">远瞳距</span>
                            <span v-if="scope.row.keys == 'hpd'">瞳高</span>
                            <span v-if="scope.row.keys == 'npd'">近瞳距</span>
                            <span v-if="scope.row.keys == 'pd'">瞳距</span>
                            <span v-if="scope.row.keys == 'sph'">球镜</span>
                            <span v-if="scope.row.keys == 'va'">矫正视力</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="lData"
                    label="L">
                    </el-table-column>
                    <el-table-column
                    prop="rData"
                    label="R">
                    </el-table-column>
                </el-table>
                <div class="oldGlassMess">
                    <div class="oldGlassMessBox">
                        <p>旧镜信息</p>
                        <span>查看完整验光单</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import store from "../../../vuex/store";
// import {unicode} from '../../../utils/other'
import { allDate } from "../../../utils/date";

export default {
  name: "backShop",
  data() {
    return {
      value: "",
      shopMember: "",
      customText: "1",
      publicSelcet: {
        glassesTypeOptions: [
          {
            name: "",
            id: ""
          }
        ],
        glassesTypeModel: "2",
        comTypeOptions: [],
        comTypeModel: null,
        processMemoOptions: [],
        processMemo: null,
        specialMemoOptions: [],
        specialMemo: null
      },
      packageIdArr:[],
      orderTemp: {
        memberId: "",
        prescriptionsId: "",
        urgent: false,
        glassesTime: new Date(),
        glassesType: "",
        glassesCompany: "",
        glassesAddress: "",
        saleMemo: "",
        processMemo: "",
        specialMemo: "",
        roundOffFlag: "",
        couponDetailId: "",
        process: "0",
        service: "0",
        singleSupTime: new Date()
      },
      eyesdata: {
        sph: "",
        cyl: "",
        add: ""
      },
      initData: null,
      optometryId: "",
      defaultTimes: new Date(),
      type: "",
      optometryTime: "",
      submitNewOptometry: false, //控制 提交验光单子组件传值
      includeOptometryData: null, //保存即将录入验光单信息 作为验光单数据副本
      amountSale: 0, //原价合计
      optometryData: [], //验光单数据
      optometryList: null, //验光单列表数据
      selectMember: {
        //选择会员数据集合
        selectM: "",
        memberInfo: null //会员信息
      },
      extraMoney: 0, //其他费用
      saleCount: "0.00", //合计
      // receivable:'',//应收金额
      actionSale: 0, //活动金额
      numCount: 0, //件数
      allDisCount: "", //整单折扣
      memberShipDisCount: "10", //会员折扣
      memberShipDisCountSale: 0, //会员折扣抵扣金额
      discountFlag: 1,
      discountSale: 0, //优惠券折扣金额
      conponDiscountMoney: "", //优惠券折扣金额
      actionCost: {}, //促销活动信息
      conponResponse: {},
      timeDefaultShow: "", //当前日期默认值
      tableData: [], //用户保存商品信息
      //以下为控制modal弹框变量,
      tableDataNew: [{}]
    };
  },
  components: {},

  methods: {
    submitApply() {
      let _this = this;
      _this.$myAjax({
        url: "pos-api/orderTemp/orderTempRefund/add",
        data: {
          orderTemp: {
            orderId: _this.$route.params.order,
            desc: _this.$route.params.desc,
            reason: _this.$route.params.reason
          }
        },
        success: function(res) {
          console.log(res);
          if (res.code == 1) {
            _this.$router.push('/cashier/cashierList');
            _this.$message({
              type:'success',
              message:'退货成功',
              showClose:true
            });
          }else{
            _this.$message({
              type:'danger',
              message:'退货失败',
              showClose:true
            });
          }
        },
        error: function(err) {
          console.log(err);
          _this.$message({
              type:'danger',
              message:'网络连接失败',
              showClose:true
            });
        }
      });
    },
    //选择商品后进行关闭弹窗计算
    selectSku(value, nums, name) {
      console.log("选择商品后进行渲染", value);
      let _this = this;
      if (name == "package") {
        //套餐产品
        console.log(value.data);
        this.packageIdArr.push(value.package);
        let valueShop = value.data;
        for (var i = 0; i < valueShop.length; i++) {
          let obj = {};
          if (valueShop[i].hasOwnProperty("farSearchCodeId")) {
            obj.productId = valueShop[i].farSearchCodeId; //商品id
            obj.skuName2 = valueShop[i].farSearchCode;
            obj.skuName = valueShop[i].farSearchCode;
            obj.sku = valueShop[i].sku;
            obj.warehouseId = valueShop[i].warehouseId;
            obj.stockId = valueShop[i].stockId;
            obj.quantity = valueShop[i].quantity;
            obj.classId = valueShop[i].productCategoryId;
            obj.allotQuantity = valueShop[i].allotQuantity;
          } else {
            obj.productId = valueShop[i].productSku.productId; //商品id
            obj.skuName2 = valueShop[i].productSku.skuName;
            obj.skuName = valueShop[i].productSku.skuName;
            obj.sku = valueShop[i].productSku.sku;
            obj.warehouseId = valueShop[i].productSku.warehouseId;
            obj.stockId = valueShop[i].productSku.stockId;
            obj.quantity = valueShop[i].productSku.quantity;
            obj.classId = valueShop[i].productSku.productCategoryId;
            obj.allotQuantity = valueShop[i].productSku.allotQuantity;
            // obj.realSale=valueShop[i].productSku.packagePrice;
          }
          obj.packageDetailId = valueShop[i].packageDetailId;
          obj.price = valueShop[i].packagePrice;
          obj.nums = valueShop[i].nums || "1";
          obj.packageId = valueShop[i].packageId;
          obj.status = valueShop[i].status; //
          obj.realSale = valueShop[i].packagePrice;
          obj.times = valueShop[i].times;
          obj.discount = '1';
          _this.tableData.push(obj);
        }
      } else {
        
        if (value.status == "1") {
          let title = "";
          if (this.custom == "right") {
            title = "右镜片-定做单：";
          } else if (this.custom == "left") {
            title = "左镜片-定做单：";
          } else {
            title = "商品-定做单：";
          }
          value.skuName = title;
          value.skuName3 = title +'定做单号：<span class="readContent">' +value.customId +"</span>定做需求：" +value.customMessage;
          value.skuName2 = title + "定做需求：" + value.customMessage;
          value.value1 != ""? (value.skuName3 += "球镜:" + value.value1 + " "): value.skuName3;
          value.value2 != ""? (value.skuName3 += "柱镜:" + value.value2 + " "): value.skuName3;
          value.value3 != ""? (value.skuName3 += "下加光:" + value.value3 + " "): value.skuName3;
          value.classid != ""? (value.skuName3 += value.classid + " "): value.skuName3;
          value.varietyid != ""? (value.skuName3 += value.varietyid + " "): value.skuName3;
          value.brandid != ""? (value.skuName3 += value.brandid + " "): value.skuName3;
          value.specificationid != ""? (value.skuName3 += value.specificationid): value.skuName3;
          value.value1 != ""? (value.skuName2 += "球镜:" + value.value1 + " "): value.skuName2;
          value.value2 != ""? (value.skuName2 += "柱镜:" + value.value2 + " "): value.skuName2;
          value.value3 != ""? (value.skuName2 += "下加光:" + value.value3 + " "): value.skuName2;
          value.classid != ""? (value.skuName2 += value.classid + " "): value.skuName2;
          value.varietyid != ""? (value.skuName2 += value.varietyid + " "): value.skuName2;
          value.brandid != ""? (value.skuName2 += value.brandid + " "): value.skuName2;
          value.specificationid != ""? (value.skuName2 += value.specificationid): value.skuName2;
          value.sku = "--";
          // value.orderPromotionId='';
        } else if (value.status == "2") {
          let title = "自带";
          if (value.where == "2") {
            title = title + "镜架：";
          } else {
            if (value.lens == "left") {
              title = title + "左镜片：";
            } else if (value.lens == "right") {
              title = title + "右镜片：";
            }
          }
          value.skuName = title + value.message;
          value.skuName2 = title + value.message; //显示
          value.sku = "--";
          value.discount=1;
          value.realSale = "0";
        }
        if (value.status == "0") {
          // console.log("点击类型status", value.status);
          value.where = this.where;
          this.where == "shop"? (value.skuName2 = value.skuName): this.where == "left"
              ? (value.skuName2 ="左" +(value.classId == "C004"? "隐形眼镜" + value.skuName.substr(5): value.skuName))
              : (value.skuName2 ="右" +(value.classId == "C004"? "隐形眼镜" + value.skuName.substr(5): value.skuName));
        }
      }
      console.warn("渲染后的value", value);
      if (!nums && name != "package") {
        value.nums = 1;
      }
      if (this.alldiscountBool) {
        value.discount = parseFloat(_this.allDisCount).toFixed(2);
      }
      if (name != "package") {
        
        if(value.where =='left'){
            for(var i=0;i<_this.tableData.length;i++){
                if(_this.tableData[i].where == 'left'){
                  _this.$message({
                    type:'warning',
                    message:'不可同时购买2个相同位置的镜片',
                    closeShow:true
                  })
                  return false
              }
            }
          }
          if(value.where =='right'){
            for(var i=0;i<_this.tableData.length;i++){
                if(_this.tableData[i].where == 'right'){
                  _this.$message({
                    type:'warning',
                    message:'不可同时购买2个相同位置的镜片',
                    closeShow:true
                  })
                  return false
              }
            }
          }
          if(value.classId =='C001'){
            for(var i=0;i<_this.tableData.length;i++){
                if(_this.tableData[i].classId == 'C004'){
                  _this.$message({
                    type:'warning',
                    message:'光学镜和隐形镜不可同时购买',
                    closeShow:true
                  })
                  return false
              }
            }
          }
          if(value.classId =='C002'){
            for(var i=0;i<_this.tableData.length;i++){
                if(_this.tableData[i].classId == 'C002'){
                  _this.$message({
                    type:'warning',
                    message:'不可同时购买2个镜架',
                    closeShow:true
                  })
                  return false
              }
            }
          }
          if(value.classId =='C004'){
            for(var i=0;i<_this.tableData.length;i++){
                if(_this.tableData[i].classId == 'C001'){
                  _this.$message({
                    type:'warning',
                    message:'光学镜和隐形镜不可同时购买',
                    closeShow:true
                  })
                  return false
              }
            }
          } 
        _this.tableData.push(value);
      }
      _this.showSelectRH = false;
      _this.customizeRH = false;
      _this.showSelectShop = false;
      if (this.alldiscountBool) {
        _this.computedPay("shopModefly");
      } else {
        _this.computedPay('order');
      }
      if(_this.actionCost.actionId){
        _this.$nextTick(()=>{
        _this.$refs.ActionQualifying.requestAction();
      })
      }
    },
    //定义统一修改折扣
    changeDiscount() {
      const _this = this;
      let discount = 1; //折扣
      let coupon = 0; //折扣券固定减额
      let n = 0; //受到优惠的数量
      let memberShipDisCountSale = 0; //会员优惠金额
      let conponDiscountMoney = 0; //折扣券优惠金额
      let discountMoney = 0; //折扣券打折金额
      let actionMoney = 0;
      let actionDiscount = 1;
      let money = 0;
      for (var i = 0; i < _this.tableData.length; i++) {
        //获取每列商品总金额
        if (_this.tableData[i].status == 0 || _this.tableData[i].status == 1) {
          _this.tableData[i].coupon = 0;
          _this.tableData[i].actionMoney = 0;
          _this.tableData[i].cMoney =_this.tableData[i].nums * _this.tableData[i].price;
          n+=_this.tableData[i].nums;
          money += _this.tableData[i].cMoney;
        }
      }
      this.participateActionMoney = money;
      this.participateActionNum = n;
      for (var i = 0; i < _this.tableData.length; i++) {
        //获取每个商品总占比
        if (_this.tableData[i].status == 0 || _this.tableData[i].status == 1) {
          _this.tableData[i].cli = _this.tableData[i].cMoney / money;
        }
      }
      if (
        _this.memberShipDisCount * 10 < 10 &&
        _this.memberShipDisCount != ""
      ) {
        //如果有会员折扣
        discount = _this.memberShipDisCount;
      }
      if (_this.actionData) {
        //促销活动
        if (_this.actionData.cashFlag == "1") {
          for (var i = 0; i < _this.tableData.length; i++) {
            //每列商品现金流 占比
            _this.tableData[i].actionMoney =
              _this.actionData.cashAmount * _this.tableData[i].cli;
          }
        }
        if (_this.actionData.discountFlag == "1") {
          //促销活动打折
          actionDiscount = _this.actionData.discountAmount;
          discount = discount * parseFloat(actionDiscount) / 10;
          if (_this.actionData.cashFlag == "1") {
            discountMoney = money - _this.actionData.cashAmount;
          }
          discountMoney = (1 - actionDiscount / 10) * money;
        }
      }

      if (_this.conponResponse.couponModality === "0") {
        //如果有折扣券打折
        discount = discount * (_this.conponResponse.discount / 10);
      }
      if (_this.conponResponse.couponModality === "1") {
        //如果有减额券
        for (var i = 0; i < _this.tableData.length; i++) {
          //每列商品现金流 占比
          _this.tableData[i].coupon =
            _this.conponResponse.amount * _this.tableData[i].cli;
        }
      }
      for (var i = 0; i < _this.tableData.length; i++) {
        if (
          _this.tableData[i].status == "0" ||
          _this.tableData[i].status == "1"
        ) {
          let data = _this.tableData[i];

          if (_this.conponResponse.couponModality === "0") {
            //如果有折扣券打折
            if (
              _this.memberShipDisCount * 10 < 10 &&
              _this.memberShipDisCount != ""
            ) {
              //如果有会员折扣
              conponDiscountMoney +=(_this.memberShipDisCount - _this.memberShipDisCount *_this.conponResponse.discount /10) * data.price;
            } else {
              conponDiscountMoney += _this.conponResponse.discount;
              // discountMoney+=_this.conponResponse.discount
            }
          }

          // console.warn(
          //   "数量",
          //   data.nums,
          //   "价格" + data.price,
          //   "合计占比" + data.cli,
          //   "优惠金额" + data.coupon,
          //   "活动金额" + data.actionMoney,
          //   "折扣" + discount
          // );
          data.realSale = (
            (data.nums * data.price - data.coupon - data.actionMoney) *
            discount
          ).toFixed(2);
          data.discount = data.realSale / data.price / data.nums;
          console.warn(
            "该商品折扣计算后" + data.discount,
            "最终价格" + data.realSale
          );
          _this.tableData.splice(i, 1, data);
        }
      }
      if (_this.actionData) {
        if (_this.actionData.discountFlag == "1") {
          //促销活动打折
          actionDiscount = _this.actionData.discountAmount;
          if (_this.actionData.cashFlag == "1") {
            discountMoney =
              money - _this.actionData.cashAmount - conponDiscountMoney;
          }
          if (_this.conponResponse.couponModality == 1) {
            discountMoney =
              (1 - actionDiscount / 10) * (money - _this.conponResponse.amount);
          } else {
            discountMoney = (1 - actionDiscount / 10) * money;
          }
        }
      }
      this.actionCost.discountMoney = discountMoney.toFixed(2);
      this.conponDiscountMoney = conponDiscountMoney;
    },
    //计算价格区域
    computedPay(status) {
      let _this = this;
      let countSale = 0;
      let realCount = 0;
      let discountSale = 0;
      let cuMoney = 0; //促销活动金额
      let disMoney = 0; //折扣券金额
      let memberShipDisCountSale = 0; //会员优惠金额
      let n = 0; //件数
      let packageNum = 0;
      _this.extraMoney = 0;
      
      
      for (let i = 0; i < _this.tableData.length; i++) {
        //循环计算价格
        // if (_this.tableData[i].status != "4") {
          console.error('原价'+_this.tableData[i].price,'数量'+_this.tableData[i].nums,'实售'+_this.tableData[i].realSale)
          countSale += parseFloat(_this.tableData[i].price * parseInt(_this.tableData[i].nums));
          realCount += parseFloat(_this.tableData[i].realSale);
          n += parseInt(_this.tableData[i].nums);
          discountSale += parseFloat(parseFloat( _this.tableData[i].price * parseInt(_this.tableData[i].nums) ) - parseFloat(_this.tableData[i].realSale))
        // }else{
        //   packageNum+=parseInt(_this.tableData[i].nums);
        // }
        if (_this.tableData[i].status == "3") {//其他费用
          _this.extraMoney += parseFloat(_this.tableData[i].realSale);
        }
      }
      // if(_this.actionData&&_this.actionTime&&!_this.alldiscountBool){
      //   _this.actionTime = false;
      //     _this.$nextTick(()=>{
      //       _this.$refs.ActionQualifying.requestAction();
      //     })
      //     setTimeout(function(){
      //       _this.actionTime = true
      //     },500)
      // }
      // if(_this.packageIdArr.length>0){
      //   for(var i=0;i<_this.packageIdArr.length;i++){
      //     countSale += _this.packageIdArr[i].packagePrice;
      //     realCount += _this.packageIdArr[i].packagePrice;
      //   }
      // }
      // if (_this.actionData) {//促销活动
      //   console.log(_this.actionData)
      //     if(_this.actionData.discountFlag == "1") {
      //       console.log('折扣',this.actionCost.discountMoney)
      //       cuMoney = parseFloat(this.actionCost.discountMoney);
      //     }
      //     if (_this.actionData.cashFlag == "1") {
      //       console.log('折扣',this.actionCost.money)
      //       cuMoney = parseFloat(this.actionCost.money);
      //     }
      // }
      // if(_this.conponResponse){//优惠券
      //   if (_this.conponResponse.couponModality === "0") {
      //     disMoney = parseFloat(this.conponDiscountMoney);
      //   }
      //   if (_this.conponResponse.couponModality === "1") {
      //     disMoney = parseFloat(this.conponResponse.amount);
      //   }
      // }
      
      // if (_this.memberShipDisCount * 10 < 10 &&_this.memberShipDisCount != "") {
      //   _this.discountFlag = 0;
      //   console.warn('销售价格'+countSale,'应收金额'+realCount,'折扣金额'+disMoney,'促销活动'+cuMoney,)
      //   memberShipDisCountSale = countSale - realCount - disMoney - cuMoney;
      // }
      // _this.memberShipDisCountSale = parseFloat(memberShipDisCountSale).toFixed(2); //会员优惠金额
      // _this.packageNum = packageNum;
      realCount-=parseFloat(_this.$route.params.datas.moneyPaid)
      _this.amountSale = parseFloat(countSale).toFixed(2); //原价合计
      _this.saleCount = parseFloat(realCount).toFixed(2); //应付合计
      _this.discountSale = parseFloat(discountSale).toFixed(2);
      _this.numCount = n;
    },
    //商品折扣发生变化
    changePrice(value, type, index) {
      // console.log(value,type,index)
      // this.allDisCount = '';
      this.discountSale = ""; //优惠券优惠金额
      if (type == 1) {
        //正常都是1，8折计算为*0.8
        value.realSale = parseFloat(
          value.price * value.discount / 10 * value.nums
        ).toFixed(2);
      } else {
        value.realSale = parseFloat(
          value.price / value.discount * 10 * value.nums
        ).toFixed(2);
      }
      this.tableData.splice(index, 1, value);
      this.computedPay("alldiscount");
    },
   
    //获取用户验光单列表
    getOptometryRecordList(memberId) {
      var that = this;
      that
        .$axios({
          url:
            "http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptionsList",
          method: "post",
          params: {
            jsonObject: {
              memberId: memberId || this.selectMember.memberInfo.memberId
            },
            keyParams: {
              weChat: true
            }
          }
        })
        .then(function(response) {
          if (response.data.code == "1") {
            // console.log(response.data.data.list)
            that.optometryList = response.data.data.list;
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },

    //取得该次验光单信息
    getPrescriptions(id) {
      var that = this;
      that
        .$axios({
          url: "http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptions",
          method: "post",
          params: {
            jsonObject: {
              prescriptionId: id || this.optometryId
            },
            keyParams: {
              weChat: true
            }
          }
        })
        .then(function(response) {
          if (response.data.code == 1 && response.data.data.eyes.length > 0) {
            that.optometryData = response.data.data.eyes;
            that.optometryId = response.data.data.prescriptions.prescriptionId;
            that.optometryTime =
              response.data.data.prescriptions.prescriptionTime;
            that.getOptometryRecordList();
            that.includeOptometry();
          } else {
            that.$message({
              showClose: true,
              message: response.data.msg,
              type: "error"
            });
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },

    //获取用户最后一次验光单信息,搜索会员后调用验光单信息
    getOptometryRecord() {
      var _this = this;
      _this
        .$axios({
          url:
            "http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptionsLately",
          method: "post",
          params: {
            jsonObject: {
              memberId: this.selectMember.memberInfo.memberId
            },
            keyParams: {
              weChat: true
            }
          }
        })
        .then(function(response) {
          if (response.data.code == 1 && response.data.data.eyes.length > 0) {
            _this.optometryData = response.data.data.eyes;
            _this.optometryId = response.data.data.prescriptions.prescriptionId;
            _this.optometryTime =
              response.data.data.prescriptions.prescriptionTime;
          } else {
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
            _this.includeOptometryData = null;
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    //选择会员子组件返回函数 获取用户信息
    getMemberInfo(value, bool) {
      //bool作为挂单直接导入，
      this.selectMember.memberInfo = value;
      this.memberShipDisCount = this.selectMember.memberInfo.discount;
      this.computedPay('order'); //如果选择用户前选择商品了就再次进行计算
      // this.allDisCount='';//整单折扣归零,重新输入进行计算
      if (value && !bool) {
        this.getOptometryRecord();
        this.getOptometryRecordList();
      }
    },
    //录入验光单信息
    includeOptometry() {
      var _this = this;
      if (_this.optometryData != null) {
        var tableArr = [];
        _this.optometryData.forEach(element => {
          if (element.key != "0" && element.key != "1") {
            var tArr = [];
            var keys = [];
            var lData = [];
            var rData = [];
            for (var item in element.value[1]) {
              delete element.value[0].leftRight;
              delete element.value[0].perscriptionType;
              delete element.value[0].prescriptionId;
              delete element.value[0].prescriptionEye;
              delete element.value[0].nub;
              delete element.value[0].size;
              delete element.value[1].nub;
              delete element.value[1].size;
              delete element.value[1].prescriptionEye;
              delete element.value[1].leftRight;
              delete element.value[1].perscriptionType;
              delete element.value[1].prescriptionId;

              tArr.push({
                keys: item,
                lData: element.value[0][item],
                rData: element.value[1][item]
              });
            }
            var name;
            switch (element.key.toString()) {
              // case '0':
              //     name='检影';
              //     break;
              // case '1':
              //     name='主观';
              //     break;
              case "2":
                name = "远用";
                break;
              case "3":
                name = "近用";
                break;
              case "4":
                name = "渐进";
                break;
              case "5":
                name = "隐形";
                break;
              default:
                break;
            }
            tableArr.push({ item: tArr, name: name });
          }
        });
        if (tableArr) _this.includeOptometryData = tableArr;
        // console.log(_this.includeOptometryData)
      }
    },
    //取单操作
    openOrder(data) {
      console.log(data);
      let _this = this;
      if (data.memberId != "0") {
        setTimeout(() => {
          _this.$myAjax({
            url: "member-api/member/getMemberListByBoYang",
            data: {
              memberId: data.memberId,
              size: 5,
              nub: 0
            },
            success: function(res) {
              console.log(res)
              if (res.code == 1) {
                _this.getMemberInfo(res.data.memberList[0], true);
              } else {
                _this.$message({
                  showClose: true,
                  message: "会员信息获取失败",
                  type: "error"
                });
              }
            },
            error: function(err) {
              console.log(err);
            }
          });
          _this.$myAjax({
            //验光单信息获取
            url: "pos-api/prescriptions/getPrescriptions",
            data: {
              prescriptionId: data.prescriptionsId
            },
            success: function(res) {
              if (res.code != 1 && res.data.eyes.length == 0) {
                return false;
              }
              _this.optometryData = res.data.eyes;
              _this.optometryId = res.data.prescriptions.prescriptionId;
              _this.optometryTime = res.data.prescriptions.prescriptionTime;
              _this.getOptometryRecordList(data.memberId);
              _this.includeOptometry();
            },
            error: function(err) {
              console.log(err);
              _this.$message({
                showClose: true,
                message: err.msg,
                type: "error"
              });
            }
          });
        }, 0);
      }
      _this.tableData = [];
      console.log(data.orderItems.length)
      for (let i = 0; i < data.orderItems.length; i++) {
        // //备注，取镜方式，操作人
        let obj = new Object();
        obj.orderItemId = data.orderItems[i].orderItemId;
        obj.status = data.orderItems[i].productMold;
        obj.skuName2 = data.orderItems[i].itemName;
        obj.skuName = data.orderItems[i].itemName;
        obj.nums = data.orderItems[i].quantity;
        obj.price = parseFloat(data.orderItems[i].listPrice);
        obj.discount = data.orderItems[i].discountRate/10;
        obj.realSale = data.orderItems[i].money;
        if (data.orderItems[i].productMold == "0") {
          obj.productId = data.orderItems[i].itemId;
          obj.sku = data.orderItems[i].itemNo;
          obj.warehouseId = data.orderItems[i].warehouseId;
          obj.stockId = data.orderItems[i].stockId || "";
          obj.allotQuantity = data.orderItems[i].stockQuantityNo;
          obj.classId = data.orderItems[i].productType;
          obj.quantity = data.orderItems[i].stockQuantity;
        } else if (data.orderItems[i].productMold == "1") {
          //定做
          obj.customId = data.orderItems[i].orderReceiptId;
          obj.classId = data.orderItems[i].productType;
        } else if (data.orderItems[i].productMold == "2") {
          //自带
          obj.discount = '1';
        } else if (data.orderItems[i].productMold == "3") {
          //其他
          obj.discount = '1';
        }else if(data.orderItems[i].productMold =='4'){
          //套餐
          //处理套餐包
          obj.discount = '1'
        }
        _this.tableData.push(obj);
      }
      console.log("处理后商品列表", _this.tableData);
      _this.computedPay('shopModefly');
    },

    //新增验光单后获取用户信息录入到页面
    MemberInfoForAdd(memberId) {
      var _this = this;
      _this
        .$axios({
          url: "http://myc.qineasy.cn/member-api/member/getMemberListByBoYang",
          method: "post",
          params: {
            jsonObject: {
              seachCode: memberId
            },
            keyParams: {
              weChat: true,
              userId: JSON.parse(sessionStorage.getItem("userData")).userId,
              orgId: JSON.parse(sessionStorage.getItem("userData")).orgId
            }
          }
        })
        .then(function(response) {
          if (response.data.code == 1) {
            _this.getMemberInfo(response.data.data.memberList[0]);
          } else {
            _this.$message({
              showClose: true,
              message: "会员信息获取失败",
              type: "error"
            });
          }
        });
    },
    //开单
    addOrderTemp(types) {
      //type = -1 挂单
      var _this = this;
      if (this.selectMember.memberInfo == null) {
        _this.$message({
          showClose: true,
          message: "会员信息获取失败",
          type: "warning"
        });
        // return false;
      }
      if (!this.optometryId) {
        // _this.$message({
        //     showClose: true,
        //     message: '验光单信息获取失败',
        //         type: 'error'
        // })
        // return false;
      }
      var orderItemsList = [];
      console.log(this.tableData);
      for (var item in this.tableData) {
        orderItemsList.push({
          itemId: this.tableData[item].productId, //商品sku码
          itemName: this.tableData[item].skuName2, //明细名称
          proMemo: this.tableData[item].skuName,
          quantity: this.tableData[item].nums, //数量
          discountRate: this.tableData[item].discount, //折扣比率
          orderPromotionId: "", //订单营销活动id
          listPrice: this.tableData[item].price, //原价
          roundFlag: "1", //商品取整
          itemNo: this.tableData[item].sku, //商品编码
          warehouseId: this.tableData[item].warehouseId, //仓库id
          orderReceiptId: this.tableData[item].customId || "", //定做单id
          stockId: this.tableData[item].stockId || "", //库存id
          refundId: this.tableData[item].refundId,
          stockQuantity: this.tableData[item].quantity, //总库存
          productType: this.tableData[item].classId, //商品类型 镜片镜架...
          stockQuantityNo: this.tableData[item].allotQuantity, //可分配库存
          productMold: this.tableData[item].status || "0" //商品类型，前端自定义 0普通商品 1定做 2自带 3其他 4套餐
          // price:this.tableData[item].realSale,//实售单价
        });
      }
      console.log(orderItemsList);
      if (orderItemsList == "") {
        _this.$message({
          showClose: true,
          message: "商品信息获取失败",
          type: "error"
        });
        return false;
      }

      let memberId = ""; //会员id
      if (_this.selectMember.memberInfo) {
        memberId = _this.selectMember.memberInfo.memberId;
      }
      let memberDiscount = 10; //会员卡折扣  游客默认10 满折
      if (_this.selectMember.memberInfo) {
        console.log("会员信息", this.selectMember.memberInfo);
        memberDiscount = parseFloat(
          this.selectMember.memberInfo.discount * 10
        ).toFixed(2);
      }
      let alldis = this.allDisCount; //整单折扣
      if (alldis == "") {
        alldis = "10";
      }
      let coupon = this.conponDiscountMoney; //卡券优惠金额
      if (!coupon) {
        coupon = "0";
      }
      let BorderType = "0";
      for (var i = 0; i < orderItemsList.length; i++) {
        if (orderItemsList[i].orderReceiptId) {
          BorderType = "1";
        }
      }
      this.orderTemp.glassesTime = allDate.TimetoDateDay(
        Date.parse(this.orderTemp.glassesTime)
      );
      // if(this.publicSelcet.glassesTypeModel == '1'){
      //     this.express  快递信息
      // }
      var jsonObject = {
        memberId: memberId, //会员id
        prescriptionsId: this.optometryId, //验光单id
        urgent: this.orderTemp.urgent.toString(), //是否加急
        glassesTime: this.orderTemp.glassesTime, //取镜时间
        glassesType: this.orderTemp.glassesType, //取镜类别
        glassesCompany: this.publicSelcet.comTypeModel || "取镜公司", //取镜公司
        glassesAddress: this.orderTemp.glassesAddress || "无", //取镜地址
        saleMemo: this.orderTemp.saleMemo || "销售备注", //销售备注
        processMemo: this.publicSelcet.processMemo || "加工备注", //加工备注
        specialMemo: this.publicSelcet.specialMemo || "特殊备注", //特殊备注
        couponDetailId: types == "-1" ? "" : this.orderTemp.couponDetailId, //优惠券id
        moneyProduct: parseFloat(this.amountSale).toFixed(2), //原价合计
        moneyAmount: parseFloat(this.saleCount).toFixed(2), //应付
        moneyPaid: 0, //应收
        couponNo: types == "-1" ? "" : this.conponResponse.couponNo, //优惠券卡号核销
        activityMoney:
          types == "-1"
            ? ""
            : this.actionCost.money || this.actionCost.discountMoney, //活动优惠金额,
        discountMoney: this.memberShipDisCountSale, //折扣优惠金额,会员
        cardDiscount: this.memberShipDisCount, //会员折扣
        discountFlag: this.discountFlag, //是否使用会员折扣
        roundOffFlag: "1", //取整标识 0使用 1不用
        decimal: memberDiscount, //会员卡折扣
        couponMoney: types == "-1" ? "" : coupon, //卡券优惠金额
        orderItemsList: orderItemsList, //商品列表
        orderDiscount: types == "-1" ? "" : alldis, //整单折扣
        orderType: BorderType,
        extraMoney: _this.extraMoney, //其他费用
        status: types == "-1" ? "-1" : "" //挂单
      };
      _this
        .$axios({
          url: "http://myc.qineasy.cn/pos-api/orderTemp/addOrderTemp",
          method: "post",
          params: {
            jsonObject: jsonObject,
            keyParams: {
              weChat: true,
              userId: JSON.parse(sessionStorage.getItem("userData")).userId,
              orgId: JSON.parse(sessionStorage.getItem("userData")).orgId
            }
          }
        })
        .then(function(response) {
          if (response.data.code != "1") {
            _this.$message({
              showClose: true,
              message: "请求数据出问题喽，请重试！",
              type: "error"
            });
            return false;
          } else {
            if (types == "-1") {
              _this.$message({
                showClose: true,
                message: "挂单成功",
                type: "success"
              });
            } else {
              _this.$message({
                showClose: true,
                message: "开单成功",
                type: "success"
              });
            }
            setTimeout(function() {
              location.reload();
            }, 1000);
            // if(是门店收银){
            // let orderId = response.data.data.orderId;//直接开单收银  门店收银
            // _this.$router.push({path:'/cashier/cashierList',query:{orderId:orderId}})
            // }
          }
        });
    }
  },
  beforeDestory() {},
  created() {},
  mounted() {
    let _this = this;
    _this.users = JSON.parse(sessionStorage.getItem("userData"));
    if (_this.$route.params.datas) {
      // {|} -i  -t 重新开单参数
      _this.$nextTick(()=>{
        this.initData = _this.$route.params.datas;
        _this.openOrder(_this.$route.params.datas);
      })
    }
  },
  watch: {}
};
</script>
<style lang="scss">
@import "../../../reset";
@import "../../Bills/billing/billing";
</style>
