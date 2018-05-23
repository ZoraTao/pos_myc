<template>
<div class="billing content_box flexH100" v-if="initData!=null">
    <div class="billingInfo">
        <div class="newShop">
             <div class="newShopHead">
                <div class="newShopHead_opt">
                    <h3>换货单</h3>
                </div>
                <div class="newShopHead_opt">
                    <span class="reasonQuestion">换货原因：</span><span class="reason"></span>{{$route.params.reason}}
                </div>
                <div class="newShopHead_opt">
                    <span class="reasonQuestion">换货说明：</span><span class="reason"></span>{{$route.params.desc}}
                </div>
                <div class="newShopHead_opt">
                    <span class="reasonQuestion">原零售单号：</span><span class="reason"></span>{{initData.orderId}}
                </div>
            </div>
             <div class="salesclerkParam replaceShop">
                    <el-form ref="form">
                        <el-form-item label="左镜片 :" class="ParamInput">
                            <el-input class="" placeholder="" @input="setWhere('left');" v-model="selectProductSku.selectL" @keyup.enter.native="selectGlass(2,selectProductSku.selectL,true);"></el-input>
                            <el-button @click="type='0';selectGlass(2);setWhere('left');">···</el-button>
                            <el-button @click="showTitle('left')">定做</el-button>
                        </el-form-item>
                        <el-form-item label="右镜片 :" class="ParamInput">
                            <el-input class="" placeholder="" @input="setWhere('right');" v-model="selectProductSku.selectR" @keyup.enter.native="selectGlass(1,selectProductSku.selectR,true);"></el-input>
                            <el-button @click="type='0';selectGlass(1);setWhere('right');">···</el-button>
                            <el-button @click="showTitle('right')">定做</el-button>
                        </el-form-item>
                        <el-form-item label="商品 :" class="ParamInput">
                            <el-input class="" placeholder="" @input="setWhere('shop');" v-model="selectProductSku.selectSP" @keyup.enter.native="type='';selectGlass(3,selectProductSku.selectSP,true);"></el-input>
                            <el-button @click="type='';selectGlass(3);setWhere('shop');">···</el-button>
                            <el-button @click="showTitle('shop')">定做</el-button>
                        </el-form-item>
                        <el-form-item class="ParamInput ParamButton">
                            <el-button @click="packageGoods=true">套餐商品</el-button>
                        </el-form-item>
                        <el-form-item class="ParamInput ParamButton">
                            <el-button @click="withShop = true">自带商品</el-button>
                        </el-form-item>
                        <el-form-item class="ParamInput ParamButton">
                            <el-button @click="otherExpense=true">其他费用</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            <div class="newShopTable">
                <div class="box98 mgtop0">
                  <div  style="width:100%;">
                      <div class="thead">
                          <div style="width:58%;">换货商品</div>
                          <div style="width:8%;">数量</div>
                          <div style="width:8%;">原单价</div>
                          <div style="width:8%;">折扣</div>
                          <div style="width:9%;">换货价</div>
                          <div style="width:9%;text-align:center;">操作</div>
                      </div>
                      <div class="tbody" style="height:150px">
                          <div v-for="(item,index) in newtableData" :key="item.itemId" class="tbodyTr">
                              <div style="width:58%;">
                                <div class="backShopImgTag">
                                  <img src="https://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_tui.png" alt="" v-show="!item.replaceStatus">
                                </div>
                                {{item.skuName2}}</div>
                              <div style="width:8%;">{{item.nums}}</div>
                              <div style="width:8%;">{{item.price}}</div>
                              <div style="width:8%;">{{parseFloat(item.discount).toFixed(2)||'0'}}</div>
                              <div style="width:9%;">
                                <el-input v-model="newtableData[index].realSale" :disabled="newtableData[index].status == 2" @change="computedPay()">
                                <template slot="prefix" ><span v-show="!item.replaceStatus">-</span></template>
                                </el-input>
                              </div>
                              <div style="width:9%;"><span class="cancalBackShop" @click="cancalBackShop(item,index)">取消换货</span></div>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
            <div class="newShop_footer">
                  <span class="newShop_countNum">共计：<i>{{newtableData.length||'0'}}件</i></span>
                  <span class="newShop_amountPrice">合计：<em>{{saleCount||'0'}}元</em></span>
                </div>
        </div>
        <div class="oldShop">
            <div class="oldShop_head">
              <div class="oldShop_head_opt ">
                <span class="oldShop_head_title">原零售单号：<i>{{initData.orderId}}</i></span>
              </div>
              <div class="oldShop_head_opt">
                <i>{{(initData.createTime).substring(0,initData.createTime.length-2)}}</i>
              </div>
              <div class="oldShop_head_opt">
                <span class="oldShop_head_title">销售人员：<i>李四</i></span>
              </div>
            </div>
            
            <div class="box98">
                <div  style="width:100%;">
                    <div class="thead">
                        <div style="width:58%;">换货商品</div>
                        <div style="width:8%;">数量</div>
                        <div style="width:8%;">原单价</div>
                        <div style="width:8%;">折扣</div>
                        <div style="width:9%;">实售单价</div>
                        <div style="width:9%;text-align:center;">操作</div>
                    </div>
                    <div class="tbody">
                        <div v-for="(item,index) in tableData" :key="item.itemId" :class="{'tbodyTr':true,'checkstatus':!item.replaceStatus||(item.status==2)}">
                            <div style="width:58%;">{{item.skuName2}}</div>
                            <div style="width:8%;">{{item.nums}}</div>
                            <div style="width:8%;">{{item.price}}</div>
                            <div style="width:8%;">{{item.discount||'0'}}</div>
                            <div style="width:9%;">{{item.realSale}}</div>
                            <div style="width:9%;">
                              <span class="BackShop" v-show="item.replaceStatus&&item.status!=2" @click="checkItem(item,index)">
                                换货
                                </span>
                              </div>
                        </div>
                    </div>
                </div>
                <div class="apply">
                  <div>
                    <em>应收：<i>{{saleCount||'0'}}元</i></em>
                    <el-button @click="submitApply()">提交申请</el-button>
                  </div>
                </div>
            </div>
        </div>
        
    </div>
    <div  :class="{memberInfo:true,mgl10:true,memberInfoPosition:!initData}">
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
    <el-dialog class="selectRH" :title="selectProductSku.title" :visible.sync="showSelectRH" width="870px" :before-close="cleanSelectRHModal">
        <SelectRHModal :where="where" ref="SelectRHModal"  v-on:getProductSku="getProductSku" v-on:rhtWareHouse="rhtWareHouse" :selectProductSku="selectProductSku" v-on:selectSku="selectSku" ></SelectRHModal>
    </el-dialog>
    <el-dialog class="selectShop" title="选择商品" :visible.sync="showSelectShop" width="800px" :before-close="cleanSelectShopModal">
        <SelectShopModal :where="where" ref="showSelectShop"  v-on:getProductSku="getProductSku" v-on:rhtWareHouse="rhtWareHouse" :selectProductSku="selectProductSku" v-on:setBuyShop="selectSku" ></SelectShopModal>
    </el-dialog>
    <el-dialog class="customizeRH"   :title="customText" :visible.sync="customizeRH" width="690px">
        <CustomizeRHModal    :custom="custom"  ref="customs" :shopMember="shopMember" :orgData="orgDatas"  v-on:commitCustomMessage="commitCustom"></CustomizeRHModal >
    </el-dialog>
    <el-dialog class="withShopModal" title="自带商品" :visible.sync="withShop" width="600px">
        <withShopModal v-on:commitMessage="withShopCommit"></withShopModal>
    </el-dialog>
    
    <el-dialog class="packageGoods" title="选择套餐" :visible.sync="packageGoods" width="800px">
        <PackageGoodsModal @showBottom="showhideBottom=true" @hideBottom="showhideBottom=false"></PackageGoodsModal>
        <div class="packageDetailButtonGroup" v-show="showhideBottom">
            <el-checkbox class="fn-left">套餐置换</el-checkbox>
            <el-button @click="packageGoods = false">取 消</el-button>
            <el-button type="primary" @click="packageGoods = false">确定</el-button>
        </div>
    </el-dialog>
    <el-dialog class="otherExpense" title="其它费用" :visible.sync="otherExpense" width="700px">
        <OtherExpenseModal ref="otherExpenseRef" @addCostPay="addCostPayFn"></OtherExpenseModal>
        <div class="packageDetailButtonGroup">
            <el-button class="fn-right" @click="otherExpense = false">取消</el-button>
            <el-button class="fn-right" type="primary" @click="otherExpense = false;otherExpenseFn()">确定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import store from "../../../vuex/store";
import { allDate } from "../../../utils/date";
import _ from 'lodash'
import withShopModal from "../../PublicModal/withShop/withShop-modal.vue";
import SelectRHModal from "../../PublicModal/SelectRH/selectRH-modal.vue";
import SelectShopModal from "../../PublicModal/SelectShop/selectShop-modal.vue";
import CustomizeRHModal from "../../PublicModal/customizeRH/customizeRH-modal.vue";
import PackageGoodsModal from "../../PublicModal/PackageGoods/package-goods-modal.vue";
import OtherExpenseModal from "../../PublicModal/OtherExpense/other-expense-modal.vue";

export default {
  name: "replaceShop",
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
      newtableData:[],
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
      searchStr: "", // 镜片查询参数
      selectProductSku: {
        selectR: "",
        selectL: "",
        where: "",
        selectSP: "",
        productSkuData: "",
        cylinder: "",
        title: "",
        wareh: "",
        product: "",
        categoryCode: "",
        type: "",
        count: 0,
        nub: 1,
        size: 10
      },
      initData:null,
      amountPrice:'',//换货差价
      optometryId: "",
      defaultTimes: new Date(),
      type: "",
      optometryTime: "",
      submitNewOptometry: false, //控制 提交验光单子组件传值
      where: "", //左右镜片
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
      custom: "", //定做状态
      orgDatas: null,
      tableData: [], //用户保存商品信息
      //以下为控制modal弹框变量,
      tableDataNew: [{}],
      showSelectRH: false,
      withShop: false,
      showSelectShop: false,
      packageGoods: false,
      customizeRH: false,
      showhideBottom: "", //控制套餐底部按钮
      otherExpense: false,
      
    }
  },
   components: {
    SelectRHModal,
    SelectShopModal,
    CustomizeRHModal,
    withShopModal,
    PackageGoodsModal,
    OtherExpenseModal,
  },
  methods: {
    //定做商品title
    showTitle(value) {
      let _this = this;
      console.log(value);
      _this.customizeRH = true;
      if (value == "left") {
        _this.custom = "left";
        _this.customText = "定做-左镜片";
        _this.$nextTick(() => {
          _this.$refs.customs.initSelect(2);
        });
      } else if (value == "right") {
        _this.custom = "right";
        _this.customText = "定做-右镜片";
        _this.$nextTick(() => {
          _this.$refs.customs.initSelect(2);
        });
      } else if (value == "shop") {
        _this.custom = "shop";
        _this.customText = "定做-商品";
        _this.$nextTick(() => {
          _this.$refs.customs.initSelect(1);
        });
      }
    },
    //自带商品添加
    withShopCommit(data) {
      this.selectSku(data, data.nums);
      this.withShop = false;
    },
    cleanSelectShopModal(event) {
      //关闭弹窗后清除select
      this.showSelectShop = false;
      this.$refs.showSelectShop.selectBrands(2);
    },
    commitCustom(data) {
      this.selectSku(data, data.nums);
    },
    getProductSku(info) {
      console.log("info", info);
      this.$nextTick(() => {
        this.selectProductSku.nub = info.nub;
        this.selectProductSku.productSkuData.count = info.productSkuData.nub;
        this.selectGlass();
      });
    },
    //其他费用添加到列表
    addCostPayFn(data) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].name) {
          let obj = new Object();
          obj.skuName2 = data[i].name + ":";
          obj.skuName = "";
          for (let j = 0; j < data[i].skuName.length; j++) {
            obj.skuName2 += data[i].skuName[j].name + " ";
            obj.skuName += data[i].skuName[j].name + " ";
          }
          obj.price = 0;
          for (let j = 0; j < data[i].skuName.length; j++) {
            obj.price += parseFloat(data[i].skuName[j].displacement);
          }
          obj.realSale = obj.price;
          obj.status = "3";
          this.selectSku(obj);
        }
      }
    },
    //商品镜片列表点击查询
    rhtWareHouse(value) {
      // console.log(value)
      this.selectProductSku.wareh = value.wareh || "";
      this.selectProductSku.product = value.product || "";
      this.selectProductSku.categoryCode = value.categoryCode || "";
      var _this = this;
      console.log(value);
      if (value.product) {
        _this.searchStr = value.product;
      }
      setTimeout(() => {
        _this
          .$axios({
            url: "http://myc.qineasy.cn/pos-api/productSku/list",
            method: "post",
            params: {
              jsonObject: {
                sphere: "",
                cylinder: _this.selectProductSku.cylinder,
                type: _this.type,
                addLight: "",
                color: "",
                colorCode: "",
                categoryCode: _this.selectProductSku.categoryCode,
                product: _this.searchStr || _this.selectProductSku.product,
                wareh: _this.selectProductSku.wareh,
                nub:
                  _this.selectProductSku.nub == 1
                    ? 0
                    : (_this.selectProductSku.nub - 1) *
                      _this.selectProductSku.size,
                size: _this.selectProductSku.size
              },
              keyParams: {
                weChat: true,
                userId: JSON.parse(sessionStorage.getItem("userData")).userId,
                orgId: JSON.parse(sessionStorage.getItem("userData")).orgId
              }
            }
          })
          .then(function(response) {
            _this.selectProductSku.productSkuData = response.data.data;
          });
      }, 0);
    },
    cleanSelectRHModal() {
      //关闭弹窗后清除select
      this.showSelectRH = false;
      this.$refs.SelectRHModal.childrenCleanSelectRHModal();
    },
    submitApply(){
      let _this = this;
      let orderContent = [];
      for(var i in _this.newtableData){
       orderContent.push({//replaceStatus为true买入
          pOrderItemsId : _this.newtableData[i].orderItemId||'',
          type : _this.newtableData[i].replaceStatus?'1':'-1',
          money :_this.newtableData[i].nums*(_this.newtableData[i].replaceStatus?_this.newtableData[i].realSale:-_this.newtableData[i].realSale) ,
          quantity : _this.newtableData[i].replaceStatus?_this.newtableData[i].nums:-_this.newtableData[i].nums,
          // discount : _this.newtableData[i].discount,
          discountRate : _this.newtableData[i].discount,
          itemId : _this.newtableData[i].productId,
          itemNo : _this.newtableData[i].sku,
          itemName : _this.newtableData[i].skuName2,
          proMemo : _this.newtableData[i].skuName,
          listPrice : _this.newtableData[i].price, //原价
          roundFlag :  "1", //商品取整
          orderPromotionId :  "",//订单营销活动id
          warehouseId : _this.newtableData[i].warehouseId, //仓库id
          orderReceiptId : _this.newtableData[i].customId || "", //定做单id
          stockId : _this.newtableData[i].stockId || "", //库存id
          refundId : _this.newtableData[i].refundId||'',
          stockQuantity : _this.newtableData[i].quantity, //总库存
          productType : _this.newtableData[i].classId, //商品类型 镜片镜架...
          stockQuantityNo : _this.newtableData[i].allotQuantity, //可分配库存
          productMold : _this.newtableData[i].status || "0" //商品类型，前端自定义 0普通商品 1定做 2自带 3其他 4套餐
        })
      }
            _this.$myAjax({
              url:'pos-api/orderTemp/orderTempSwitch/add',
              data: {
                    "orderTemp": {
                      pOrderId: _this.initData.orderId,
                      reason: _this.$route.params.reason,
                      desc: _this.$route.params.desc,
                      quantity: _this.newtableData.length,
                      moneyAmount: _this.saleCount
                    },
                    itemsList: orderContent
              },
              success:function(res){
                console.log(res)
                if(res.code == 1){
                  _this.$message({
                    type:'success',
                    message:res.msg,
                    showClose:true
                  })
                  _this.$router.push('/cashier/cashierList');
                }
              },
              error:function(err){
                console.log(err)
                _this.$message({
                    type:'error',
                    message:err,
                    showClose:true
                  })
              }
            })
    },
    
    //选择商品后进行关闭弹窗计算
    selectSku(value, nums) {
      console.log("选择商品后进行渲染", value);
      let _this = this;
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
        value.skuName3 =
          title +
          '定做单号：<span class="readContent">' +
          value.customId +
          "</span>定做需求：" +
          value.customMessage;
        value.skuName2 = title + "定做需求：" + value.customMessage;
        value.value1 != ""
          ? (value.skuName3 += "球镜:" + value.value1 + " ")
          : value.skuName3;
        value.value2 != ""
          ? (value.skuName3 += "柱镜:" + value.value2 + " ")
          : value.skuName3;
        value.value3 != ""
          ? (value.skuName3 += "下加光:" + value.value3 + " ")
          : value.skuName3;
        value.classid != ""
          ? (value.skuName3 += value.classid + " ")
          : value.skuName3;
        value.varietyid != ""
          ? (value.skuName3 += value.varietyid + " ")
          : value.skuName3;
        value.brandid != ""
          ? (value.skuName3 += value.brandid + " ")
          : value.skuName3;
        value.specificationid != ""
          ? (value.skuName3 += value.specificationid)
          : value.skuName3;
        value.value1 != ""
          ? (value.skuName2 += "球镜:" + value.value1 + " ")
          : value.skuName2;
        value.value2 != ""
          ? (value.skuName2 += "柱镜:" + value.value2 + " ")
          : value.skuName2;
        value.value3 != ""
          ? (value.skuName2 += "下加光:" + value.value3 + " ")
          : value.skuName2;
        value.classid != ""
          ? (value.skuName2 += value.classid + " ")
          : value.skuName2;
        value.varietyid != ""
          ? (value.skuName2 += value.varietyid + " ")
          : value.skuName2;
        value.brandid != ""
          ? (value.skuName2 += value.brandid + " ")
          : value.skuName2;
        value.specificationid != ""
          ? (value.skuName2 += value.specificationid)
          : value.skuName2;

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
        value.realSale = "0";
      }
      if (value.status =='0') {
        this.where == "shop"
          ? (value.skuName2 = value.skuName)
          : this.where == "left"
            ? (value.skuName2 = "左" + (value.classId=='C004' ? '隐形眼镜' + value.skuName.substr(5) : value.skuName))
            : (value.skuName2 = "右" + (value.classId=='C004' ? '隐形眼镜' + value.skuName.substr(5) : value.skuName));
      }
      // console.log("渲染后的value", value);
      if (!nums) {
        // if (value.status != 3) {
        value.nums = 1;
        // }
      }
      if (this.allDisCount > 0) {
        //添加商品的时候如果有整单折扣
        this.addShop = true;
      }
      value.replaceStatus = true;
      _this.newtableData.push(value);
      _this.showSelectRH = false;
      _this.customizeRH = false;
      _this.showSelectShop = false;
      _this.computedPay();
      
    },
    selectGlass(type, degress, bool) {
      if (this.optometryData == null) {
        this.$message({
          showClose: true,
          message: "验光单获取失败!",
          type: "error"
        });
        // return false;
      }
      var _this = this;
      // Object.keys(_this.selectProductSku).forEach(element => {
      //    _this.selectProductSku[element]
      // });
      this.selectProductSku.type = _this.type;
      this.selectProductSku.wareh = "";
      this.selectProductSku.cylinder = "";
      this.selectProductSku.productSkuData = "";
      this.selectProductSku.product = "";
      if (type == 1) {
        this.selectProductSku.selectSP = "";
        this.showSelectRH = true;
        this.selectProductSku.title = "选择右镜片";
        // this.selectProductSku.cylinder=_this.selectProductSku.selectR;柱镜==度数model干嘛
        // var where = '右镜片：'
        for (var i = 0; i < this.optometryData.length; i++) {
          if (
            this.optometryData[i].key != "0" &&
            this.optometryData[i].key != "1"
          ) {
            if (this.optometryData[i].value[0].sph != "") {
              this.eyesdata.sph = this.optometryData[i].value[1].sph;
              this.eyesdata.cyl = this.optometryData[i].value[1].cyl;
              this.eyesdata.add = this.optometryData[i].value[1].add;
              break;
            }
          }
        }
      } else if (type == 2) {
        this.showSelectRH = true;
        this.selectProductSku.title = "选择左镜片";
        // this.selectProductSku.cylinder=_this.selectProductSku.selectL;
        // var where = '左镜片：'
        for (var i = 0; i < this.optometryData.length; i++) {
          if (
            this.optometryData[i].key != "0" &&
            this.optometryData[i].key != "1"
          ) {
            if (this.optometryData[i].value[0].sph != "") {
              this.eyesdata.sph = this.optometryData[i].value[0].sph;
              this.eyesdata.cyl = this.optometryData[i].value[0].cyl;
              this.eyesdata.add = this.optometryData[i].value[0].add;
              break;
            }
          }
        }
      } else if (type == 3) {
        // var where = '商品：'
        this.selectProductSku.selectR = "";
        this.selectProductSku.selectL = "";
        this.showSelectShop = true;
        this.selectProductSku.product = this.selectProductSku.selectSP;
        this.eyesdata.sph = "";
        this.eyesdata.cyl = "";
      } else if (type == null) {
        // console.log('null')
      } else {
        // console.log('else')
      }
      if (degress && bool) {
        _this.searchStr = degress;
      } else if (degress == undefined && bool == undefined) {
        //如果不是镜片度数搜索
        _this.searchStr = "";
      }
      let code = null;
      if (_this.type == "") {
        code = ["C002", "", ""];
      } else {
        code = ["C001", "", ""];
      }
      setTimeout(() => {
        _this
          .$axios({
            url: "http://myc.qineasy.cn/pos-api/productSku/list",
            method: "post",
            params: {
              //
              jsonObject: {
                sphere: _this.eyesdata.sph,
                cylinder: _this.eyesdata.cyl,
                addLight: "",
                color: "",
                colorCode: "",
                categoryCode: code,
                product: _this.searchStr.replace(/\+/g, "%2B"),
                type: _this.type,
                wareh: _this.selectProductSku.wareh,
                nub:
                  _this.selectProductSku.nub == 1
                    ? 0
                    : (_this.selectProductSku.nub - 1) *
                      _this.selectProductSku.size,
                size: _this.selectProductSku.size
              },
              keyParams: {
                weChat: true,
                userId: JSON.parse(sessionStorage.getItem("userData")).userId,
                orgId: JSON.parse(sessionStorage.getItem("userData")).orgId
              }
            }
          })
          .then(function(res) {
            // console.log(res)
            if (res.data.code == 1) {
              _this.selectProductSku.productSkuData = res.data.data;
            } else {
              _this.$message({
                type: "error",
                message: res.data.msg,
                showClose: true
              });
            }
            // let list = _this.selectProductSku.productSkuData.list;
            // for(var i = 0;i<list.length;i++){
            //     list[i].skuName2 = where+list[i].skuName;
            // }
          });
      }, 0);
    },
    setWhere(value) {
      let _this = this;
      _this.type = "0";
      // 辨别左右镜片
      if (value == "left") {
        this.where = "left";
      } else if (value == "right") {
        this.where = "right";
      } else if (value == "shop") {
        this.where = "shop";
      }
    },
    //计算价格区域
    computedPay(){
      const _this = this;
      let countSale = 0;
      for(var i=0;i<_this.newtableData.length;i++){
          countSale = (countSale+(_this.newtableData[i].replaceStatus?+_this.newtableData[i].realSale*_this.newtableData[i].nums:-_this.newtableData[i].realSale*_this.newtableData[i].nums))
      }
      if (_this.selectMember.memberInfo != null) {
        //如果有会员id
        if (_this.selectMember.memberInfo.discount < 1) {
          _this.discountFlag = 0;
        }
        countSale = (_this.memberShipDisCount * countSale).toFixed(2); //会员价 = 会员价格 * 总价
      }
      _this.saleCount = (countSale).toFixed(2);
      console.log(_this.saleCount)
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
      this.computedPay(); //如果选择用户前选择商品了就再次进行计算
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
    checkItem(data,index){
      console.log(data.replaceStatus)
      let _this = this;
      data.replaceStatus = false;
      let thisdata = _.clone(data);
      console.log(thisdata)
      _this.newtableData.push(thisdata);
      _this.tableData[index].replaceStatus = false;
      _this.computedPay();
    },
    //取单操作
    openOrder(data) { 
      console.log(data)
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

      for (let i = 0; i < data.orderItems.length; i++) {
        // //备注，取镜方式，操作人
        let obj = new Object();
        obj.replaceStatus = true;
        obj.skuName2 = data.orderItems[i].itemName;
        obj.skuName = data.orderItems[i].itemName;
        obj.nums = data.orderItems[i].quantity;
        obj.price = parseFloat(data.orderItems[i].money/data.orderItems[i].quantity) || "0";
        obj.discount = data.orderItems[i].discountRate;
        obj.orderItemId = data.orderItems[i].orderItemId;
        obj.refundId = data.orderItems[i].refundId;
        obj.realSale =
          data.orderItems[i].status == "3"
            ? data.orderItems[i].price
            : data.orderItems[i].listPrice;
        obj.status = data.orderItems[i].productMold;
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

          delete obj.discount;
        } else if (data.orderItems[i].productMold == "3") {
          //其他
          obj.discount ='10.00'
        }
        _this.tableData.push(obj);
      }
      console.log("处理后商品列表", _this.tableData);
      _this.computedPay();
    },
    cancalBackShop(data,index){
        let _this = this;
        _this.newtableData.splice(index,1);
        for(var i=0;i<_this.tableData.length;i++){
          console.log(_this.tableData[i].orderItemId,data.orderItemId)
            if(_this.tableData[i].orderItemId === data.orderItemId){
              console.log(_this.tableData[i])
                _this.tableData[i].replaceStatus = true;
            }
        }
        _this.computedPay();
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
      this.initData = _this.$route.params.datas;
      _this.openOrder(_this.$route.params.datas);
    }
  },
  watch: {}
};
</script>
<style lang="scss">
@import "../../../reset";
@import "../../Bills/billing/billing";
</style>
