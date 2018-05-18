<template>
<div class="billing content_box flexH100">
    <div class="billingInfo" >
        <div class="borderfff flex1">
            <div class="salesclerkInfo">
                <el-form ref="form">
                    <el-form-item label="销售员 :">
                        <el-select size="mini" class="placeHolder" v-model="shopMember" placeholder="请选择" @visible-change="getPrivateSelect()">
                            <el-option
                            v-for="item in options"
                            :key="item.userId"
                            :label="item.trueName"
                            :value="item.userId">
                            <span style="display:block;width:100%;float:left;">{{item.trueName}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="补单日期 :">
                        <el-date-picker
                        v-model="orderTemp.singleSupTime"
                        class="placeHolder"
                        @change="modifyDataStyle"
                        align="left"
                        ref="datapick"
                        style="width: 130px;"
                        placeholder='选择日期'>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="会员 :" class="memberInput">
                        <el-input class="" v-model="selectMember.selectM" placeholder="输入会员卡号/手机号" @keyup.enter.native="key13GetMemberInfo"></el-input>
                        <el-button  @click="showSelectMember=true">最近会员</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="salesclerkParam">
                <el-form ref="form">
                   <el-form-item class="ParamInput">
                        <el-select v-model="selectBrand.varieties" placeholder="类别"  @change="changesSelect(2)">
                         <el-option 
                         v-for="item in varietiesArr"
                         :key="item.classCode"
                         :label="item.className"
                         :value="item.productCategoryId">
                         </el-option>
                       </el-select>
                    </el-form-item>
                    <el-form-item  class="ParamInput">
                       <el-select v-model="selectBrand.brand" placeholder='品牌'>
                         <el-option 
                         v-for="item in brandArr"
                         :key="item.classCode"
                         :label="item.className"
                         :value="item.productCategoryId"></el-option>
                       </el-select>
                    </el-form-item>
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
        </div>
        <vue-context-menu :contextMenuData="contextMenuData"
                        @dlThisRow="delThisRow">
        </vue-context-menu>
        <div class="borderfff mgt5 am_bg_white flex5">
            <div class="salesSuggest">
                <el-table
                    :data="tableData"
                    size="small"
                    @row-dblclick="removeRow"
                    align="left"
                    @row-contextmenu="showMenu"
                    style="width: 100%;margin-bottom:10px;min-height:300px">
                    <el-table-column
                    prop="skuName"
                    label="建议配镜">
                        <template slot-scope="scope">
                            <span>
                              <span v-html="scope.row.skuName3||scope.row.skuName2||scope.row.skuName"></span>
                              <!-- <span v-if="scope.row.status=='1'">
                                 定做单号：<span class="readContent">{{scope.row.customId}}</span>
                                 定做需求:{{scope.row.customMessage}} -->
                                 <!-- <span v-show="scope.row.value1">球镜：{{scope.row.value1}}</span>
                                 <span v-show="scope.row.value2">柱镜：{{scope.row.value2}}</span>
                                 <span v-show="scope.row.value3">下架光：{{scope.row.value3}}</span> -->
                                <!-- <a href="javascript:void(0)" class="readContent">查看详情</a> -->
                              <!-- </span> -->
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="数量"
                    width="140px">
                        <template slot-scope="scope">
                            <span class="am-ft-bold am-ft-black">
                                <el-input 
                                v-model="tableData[scope.$index].nums"
                                :disabled = "tableData[scope.$index].status == '2' || tableData[scope.$index].status == '3'|| tableData[scope.$index].status == '4'"
                                @change="changeNums(scope.row,scope.$index);"
                                ></el-input>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="原单价"
                    width="140px">
                    <template slot-scope="scope">
                                <span v-if='tableData[scope.$index].price != "0"' class="" placeholder="" >{{scope.row.price}}</span>
                                <span v-if='parseFloat(tableData[scope.$index].price) == "0"' class="" placeholder="" >--</span>
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="discount"
                    label="折扣"
                    width="140px">
                        <template slot-scope="scope">
                            <el-input class=""
                            placeholder=""
                            :disabled="tableData[scope.$index].status == '2' ||tableData[scope.$index].status == '3'||tableData[scope.$index].status == '4'"
                            v-model="tableData[scope.$index].discount"
                            @change="changePrice(scope.row,1,scope.$index);"></el-input>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column
                    prop=""
                    label="加工费"
                    width="100px">
                        <template slot-scope="scope">
                            <span class="" placeholder="" >--</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop=""
                    label="服务费"
                    width="100px">
                        <template slot-scope="scope">
                            <span class="" placeholder=""  >--</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column
                    prop="realSale"
                    label="实售单价"
                    width="140px">
                        <template slot-scope="scope">
                            <div class="inputBold  am-ft-black">
                                <span v-if='tableData[scope.$index].realSale == "0"' class="" placeholder="" >--</span>
                                <span v-if='parseFloat(tableData[scope.$index].realSale) != "0"' class="" placeholder="" >{{tableData[scope.$index].realSale||'--'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="settleAccounts">
                    <p>
                        <span>共计 :<b>{{numCount}}件</b></span>
                        <span>合计 :<b v-show="amountSale!=''&amountSale!=0">{{(parseFloat(amountSale)+parseFloat(actionCost.discountMoney||actionCost.money||0)).toFixed(2)}}</b><b v-show="amountSale==0">0.00</b></span>
                    </p>
                    <p>
                        <span v-show="!actionCost.actionId">促销活动:无</span>
                        <span v-show="actionCost.actionId">
                            促销活动:
                            <span v-show="actionCost.money">优惠(-{{actionCost.money}})元</span>
                            <span v-show="actionCost.discount">优惠{{actionCost.discount}}折(-{{actionCost.discountMoney}}元)</span>
                        </span>
                        <span v-show="extraMoney">其他费用:+{{extraMoney}}元</span>
                        <span v-show="!conponResponse.amount && !conponResponse.discount ">折扣券 : 无</span>
                        <span v-show="conponResponse.amount>0 || conponResponse.discount > 0">
                            折扣券 : {{conponResponse.couponName}}
                            <i v-show="conponResponse.discount>0">
                                (<b>{{parseFloat(conponResponse.discount)}}折</b> <b>-{{conponDiscountMoney}}元</b>)
                            </i>
                            <i v-show="conponResponse.amount>0">(<b>-{{conponDiscountMoney}}元</b>)</i>
                        </span>
                        <span v-show=" allDisCount == 0">折扣 : 无</span>
                        <span v-show="parseFloat(allDisCount) > 0">折扣 : {{allDisCount}}折(-{{discountSale}}元)</span>
                        <span v-show="memberShipDisCount==10">无会员折扣</span>
                        <span v-show="memberShipDisCount<10">会员折扣 : {{parseFloat(memberShipDisCount*10).toFixed(2)}}折  <b v-show="memberShipDisCountSale!= '' &memberShipDisCountSale!= '0'">(-{{parseFloat(memberShipDisCountSale).toFixed(2)}}元)</b></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="salesDiscount flex1">
            <div class="fn-left">
                <el-form ref="form">
                    <el-form-item class="ParamButton">
                        <el-button @click="openCouponBarCode">折扣券</el-button>
                    </el-form-item>
                    <el-form-item class="ParamButton">
                        <el-button @click="openConpon(true);">促销活动</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="fn-left singleDiscount">
                <p><span>整单折扣 :</span>
                <el-input class="" placeholder="" v-model="allDisCount" @change="afterDiscount()"/> 折
                </p>
            </div>
            <div class="fn-right singleDiscount">
                <!-- <p><span>整单折扣 :</span><el-input class="" placeholder=""></el-input></p> -->
                <p >
                    <span>应收 :</span>
                    <!-- <el-input class="setNum" placeholder='' type="number"  v-model.number="receivable" /> -->
                    <span class="ant_text" v-show="extraMoney">{{(parseFloat(saleCount)+parseFloat(extraMoney)).toFixed(2)}}</span>
                    <span class="ant_text" v-show="!extraMoney">{{saleCount || '0'}}</span>
                </p>
            </div>
        </div>
        <div class="orderType flex1">
            <el-form ref="form" class="ov">
                    <div style="width:100%" class="ov">
                        <el-form-item>
                            <el-checkbox v-model="orderTemp.urgent">是否加急单</el-checkbox>
                        </el-form-item>
                        <el-form-item label="取镜时间 :" >
                            <el-date-picker
                            v-model="orderTemp.glassesTime"
                            value-format="yyyy-MM-dd"
                            align="left"
                            :default-value="defaultTimes"
                            type="date"
                            style="width:130px"
                            placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="取镜方式 :">
                            <el-select size="mini" class="shopexpress"  v-model="publicSelcet.glassesTypeModel" @visible-change="getPublicSelect(5,publicSelcet.glassesTypeOptions)" placeholder="请选择">
                                <el-option
                                v-for="item in selectOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.code">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="取镜公司 :" v-show="publicSelcet.glassesTypeModel=='2'">
                            <el-select size="mini" v-model="publicSelcet.comTypeModel" placeholder="请选择" @visible-change="getCompanyList()">
                                <el-option
                                v-for="item in publicSelcet.comTypeOptions"
                                :key="item.shopId"
                                :label="item.shopName"
                                :value="item.shopId">
                                <span style="display:block;width:100%;float:left;" @click="sameComType(item)">{{item.shopName}}</span>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="取镜地点 :"  v-show="publicSelcet.glassesTypeModel=='2'">
                            <p style="width:150px;" :title="orderTemp.glassesAddress">{{orderTemp.glassesAddress||'--'}}</p>
                        </el-form-item>
                        <div class="ov">
                            <el-form-item label="收件人：" v-show="publicSelcet.glassesTypeModel=='1'">
                                <el-input class="express"  v-model="express.name"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号：" v-show="publicSelcet.glassesTypeModel=='1'">
                                <el-input class="express" v-model="express.telphone"></el-input>
                            </el-form-item>
                            <el-form-item  label="收件地址：" v-show="publicSelcet.glassesTypeModel=='1'">
                                <el-input class="expressAddress"  v-model="express.address"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div style="width:100%" class="ov remarks">
                        <el-row>
                          <el-col :span="8">
                              <el-form-item class="box100">
                                <el-input class="box100" v-model="orderTemp.saleMemo" placeholder="销售备注"></el-input>
                              </el-form-item>
                          </el-col>
                            <el-col :span="8">
                                    <el-form-item class="box100">
                                    <el-input size="mini" class="box100" v-model="publicSelcet.processMemo" placeholder="加工备注" @visible-change="getPublicSelect(3,publicSelcet.processMemoOptions)"></el-input>
                                </el-form-item>
                            </el-col>
                              <el-col :span="8">
                                    <el-form-item class="box100">
                                        <el-input size="mini" class="box100" v-model="publicSelcet.specialMemo" placeholder="特殊备注" @visible-change="getPublicSelect(4,publicSelcet.specialMemoOptions)"></el-input>
                                    </el-form-item>
                              </el-col>
                            </el-row>
                    </div>
            </el-form>
        </div>
        <div class="buttonGroup flex1">
            <div class="fn-left">
                <el-button type="primary">手工单[S]</el-button>
                <el-button type="primary">赠送[S]</el-button>
                <el-button type="primary" @click="backShoping('back',true)">退货[T]</el-button>
                <el-button type="primary" @click="backShoping('replace',true)">换货</el-button>
                <el-button type="primary" @click="reprint=true">补打</el-button>
                <el-button type="primary">预览</el-button>
                <el-button type="primary" @click="hangOrder" >取单</el-button>
                <!-- <el-badge :value="3" class="item"> -->
                <el-badge  class="item">
                    <el-button type="primary" @click="endorsementFn();">签批</el-button>
                </el-badge>
            </div>
            <div class="fn-right">
                <el-button type="primary" @click="resetPage">重置</el-button>
                <el-button type="primary" @click="addOrderTemp('-1')">挂单[F7]</el-button>
                <el-button type="primary" @click="addOrderTemp">开单[F5]</el-button>
                <!-- <el-button type="primary" @click="addOrderTemp">收银[F5]</el-butt> 根据状态判断收银开单-->
            </div>
        </div>
    </div>
    <div class="memberInfo mgl10">
        <div class="addMember borderfff">
            <div class="memberTop">
                <label>会员</label>
                <el-button type="primary" @click="addMember=true">添加会员</el-button>
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
                <el-button type="primary" @click="openNewOpt()">新增</el-button>
            </div>
            <div class="selectEyeglass">
                <el-select size="mini" v-model="optometryId" placeholder="" @change="getPrescriptions()" v-show="includeOptometryData">
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
                    size="small"
                    align="left">
                    <el-table-column
                    :label="value.name"
                    >
                        <template slot-scope="scope">
                            <span v-if="scope.row.keys == 'cyl'">柱镜</span>
                            <span v-if="scope.row.keys == 'sph'">球镜</span>
                            <span v-if="scope.row.keys == 'add'">下加光</span>
                            <span v-if="scope.row.keys == 'ax'">轴位</span>
                            <span v-if="scope.row.keys == 'dpd'">远瞳距</span>
                            <span v-if="scope.row.keys == 'jd'">基底</span>
                            <span v-if="scope.row.keys == 'lj'">棱镜</span>
                            <span v-if="scope.row.keys == 'jh'">基弧</span>
                            <span v-if="scope.row.keys == 'hpd'">瞳高</span>
                            <span v-if="scope.row.keys == 'npd'">近瞳距</span>
                            <span v-if="scope.row.keys == 'pd'">瞳距</span>
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
                <div class="oldGlassMess" v-if="includeOptometryData&&optometryDetail">
                    <div class="oldGlassMessBox">
                        <p>旧镜信息 L:{{optometryDetail.originalL}} &nbsp;R:{{optometryDetail.originalR}} &nbsp;PD:{{optometryDetail.originalPd}}</p>
                        <span @click="toReadDetail(optometryDetail.prescriptionId)">查看完整验光单</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <el-dialog
        custom-class="noheader am-ft-center"
        title="提示"
        :visible.sync="isOptometryDialogVisible"
        width="30%"
        center>
        <h4 class="am-ft-gray6 am-ft-16 mgb20 ft_bold">调入该会员最近一次的验光单？</h4>
        <span>{{optometryTime||'暂无数据'}} 验光单号：{{optometryId||'暂无数据'}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button  v-show="!optometryId" @click="isOptometryDialogVisible = false">先不了</el-button>
            <el-button  v-show="!optometryId" type="primary" @click="isOptometryDialogVisible = false;openNewOpt();">我要新增</el-button>
            <el-button   v-show="optometryId"  @click="isOptometryDialogVisible = false;openNewOpt()">不,我要新增</el-button>
            <el-button v-show="optometryId" type="primary" @click="isOptometryDialogVisible = false;includeOptometry()">调入</el-button>
        </span>
    </el-dialog>
    <el-dialog class="selectMember" title="选择会员" :visible.sync="showSelectMember" width="62.5%">
        <SelectMemberModal :selectM="selectMember.selectM" v-on:memberInfo="getMemberInfo"></SelectMemberModal>
    </el-dialog>
    <el-dialog class="newOptometry" title="新增验光单" :visible.sync="showNewOptometry" width="950px">
        <NewOptometryModal  ref="addOptometry" :memberInfo="selectMember.memberInfo"  v-on:getNewoptometry="getNewoptometry" @closeEyesModel="closeEyesModel"></NewOptometryModal>
    </el-dialog>
    <el-dialog class="selectRH" :title="selectProductSku.title" :visible.sync="showSelectRH" width="870px" :before-close="cleanSelectRHModal">
        <SelectRHModal :where="where" ref="SelectRHModal"  v-on:getProductSku="getProductSku" v-on:rhtWareHouse="rhtWareHouse" :selectProductSku="selectProductSku" v-on:selectSku="selectSku" :selectBrand="selectBrand" ></SelectRHModal>
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
    <el-dialog class="endorsement" title="选择促销活动" :visible.sync="cuActions" width="500px">
        <cuActions :numCount='numCount' @closeShow="openConpon(false)" :saleCount='saleCount' @actionMessage="actionComputed"></cuActions>
    </el-dialog>
    <el-dialog class="packageGoods" title="选择套餐" :visible.sync="packageGoods" width="800px">
        <PackageGoodsModal @toHidePackageModel="closePackage" ></PackageGoodsModal>
        
    </el-dialog>
    <el-dialog class="otherExpense" title="其它费用" :visible.sync="otherExpense" width="700px">
        <OtherExpenseModal ref="otherExpenseRef" @addCostPay="addCostPayFn"></OtherExpenseModal>
        <div class="packageDetailButtonGroup">
            <el-button class="fn-right" @click="otherExpense = false">取消</el-button>
            <el-button class="fn-right" type="primary" @click="otherExpense = false;otherExpenseFn()">确定</el-button>
        </div>
    </el-dialog>
    <el-dialog
        custom-class="am-ft-center CouponBarCode"
        :visible.sync="CouponBarCode"
        width="360px"
        center>
        <CouponBarCodeModal :conponData="conponData" :memberMessage="selectMember.memberInfo" @receiveconpon="receiveconpon"></CouponBarCodeModal>
    </el-dialog>

    <!-- <el-dialog
        custom-class="noheader am-ft-center"
        title="挂单"
        :visible.sync="pendingOrders"
        width="30%"
        center>
        <h4 class="am-ft-gray6 am-ft-16 mgb20 ft_bold">确定要挂起本订单吗？</h4>
        <span>会员姓名：张丽丽</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="pendingOrders=false"></el-button>
            <el-button type="primary" @click="pendingOrders = false">确定</el-button>
        </span>
    </el-dialog> -->
    <el-dialog title="取单" :visible.sync="showGetBill" width="700px">
        <GetBill ref="hangOrders" @openOrder="openOrder"></GetBill>
    </el-dialog>
    <el-dialog
        custom-class="noheader am-ft-center"
        title="提示"
        :visible.sync="isNotMember"
        width="30%"
        center>
        <h4 class="am-ft-gray6 am-ft-16 mgb20 ft_bold">此号码非会员，是否添加会员？</h4>
        <span>15703416754</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isNotMember = false;addMember=true">取消</el-button>
            <el-button type="primary" @click="isNotMember = false">添加会员</el-button>
        </span>
    </el-dialog>
    <el-dialog 
        title="退货单"
        :visible.sync="backShop"
        width="460px"
        center>
        <div class="textCenter " >
          <backshopModel @tohide="backShoping('back',false)" ref="backShopRefs"></backshopModel>
        </div>
    </el-dialog>
    <el-dialog 
        title="换货单"
        :visible.sync="replaceShop"
        width="460px"
        center>
        <div class="textCenter  ">
          <replaceShopModel @tohide="backShoping('replace',false)" ref="replaceShopRefs"></replaceShopModel>
        </div>
    </el-dialog>
    <el-dialog
        custom-class="noheader am-ft-center comfirmModal"
        title="提示"
        :visible.sync="permission"
        width="420px"
        center>
        <div class="textCenter mgt30 permissionBox">
            <h4 class="am-ft-gray6 am-ft-16 mgb20 ft_bold">您没有以下折扣权限，是否申请签批？</h4>
            <p><span>BM12340002 : {{allDisCount}}折</span></p>
            <p v-for="item in strlist" :key="item"><span>{{item}}</span></p>
            <p class="textareaBox">
                <i class="am-ft-red">*</i>
                <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容"
                v-model="checkMemo">
                </el-input>
            </p>
        </div>
        <div slot="footer" class="dialog-footer">
            <div class="mgt10">
                <el-button @click="permission = false;confirmAllDiscount(false);">取消</el-button>
                <el-button type="primary" @click="loginUserPermission = true;">直接签批</el-button>
                <el-popover
                ref="popover"
                placement="bottom-start"
                width="224"
                trigger="hover">
                        <ul class="endorser">
                            <li v-for="item in ShopPerson" :key="item.userId" @click="signToSubmit(item)"><span>{{item.userName}}</span><p>{{item.userId}}</p></li>
                        </ul>
                </el-popover>
                <el-button type="primary" v-popover:popover>申请签批</el-button>
            </div>
        </div>
    </el-dialog>

    <el-dialog
        custom-class="noheader am-ft-center"
        title="登录人签批"
        :visible.sync="loginUserPermission"
        width="30%"
        center>
        <h4 class="am-ft-gray6 am-ft-16 mgb20 ft_bold">签批人登录签批</h4>
        <el-form>
            <el-form-item class="mgb0">
                <el-input auto-complete="off" placeholder="用户名" v-model="signaBatch.user"></el-input>
            </el-form-item>
            <el-form-item class="mgb0">
                <el-input auto-complete="off" type="passWord" placeholder="密码" v-model="signaBatch.pass" @keyup.native.enter="signABatch()"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="loginUserPermission = false;">取消</el-button>
            <el-button type="primary" @click="signABatch()">签批</el-button>
        </span>
    </el-dialog>

    <el-dialog class="endorsement" title="签批" :visible.sync="endorsement" width="600px">
        <EndorsementModal ref="endorsement"></EndorsementModal>
    </el-dialog>

    <el-dialog class="reprint" title="补打" :visible.sync="reprint" width="900px">
        <ReprintModal></ReprintModal>
        <!-- <div class="receiptsData">
            <h4>补打记录</h4>
            <p>2017-12-15 15:34 hz3046 销售补打</p>
            <p>2017-12-15 15:34 hz3046 销售补打</p>
        </div> -->
        <span slot="footer" class="dialog-footer">
            <el-button @click="reprint = false;">取消</el-button>
            <el-button type="primary" @click="reprint = false">打印</el-button>
        </span>
    </el-dialog>
    <el-dialog class="addMember" title="添加会员" :visible.sync="addMember" width="800px">
      <AddMember :submit="isSubmit" v-on:listenToChild="memberAddSubmit"></AddMember>
      <div class="packageDetailButtonGroup">
        <el-button @click="addMember = false">取消</el-button>
        <el-button type="primary" @click="isSubmit=true">确定</el-button>
      </div>
    </el-dialog>
</div>
</template>

<script>
import store from "../../../vuex/store";
// import {unicode} from '../../../utils/other'
import { allDate } from "../../../utils/date.js";
import { judgeCode } from "../../../utils/other.js";
import SelectMemberModal from "../../PublicModal/SelectMember/select-member-modal.vue";
import NewOptometryModal from "../../PublicModal/NewOptometry/new-optometry-modal.vue";
import SelectRHModal from "../../PublicModal/SelectRH/selectRH-modal.vue";
import SelectShopModal from "../../PublicModal/SelectShop/selectShop-modal.vue";
import GetBill from "../../PublicModal/GetBill/get-bill-modal.vue";
import CustomizeRHModal from "../../PublicModal/customizeRH/customizeRH-modal.vue";
import PackageGoodsModal from "../../PublicModal/PackageGoods/package-goods-modal.vue";
import OtherExpenseModal from "../../PublicModal/OtherExpense/other-expense-modal.vue";
import CouponBarCodeModal from "../../PublicModal/CouponBarCode/couponBar-code-modal.vue";
import EndorsementModal from "../../PublicModal/Endorsement/endorsement-modal.vue";
import ReprintModal from "../../PublicModal/Reprint/reprint-modal.vue";
import AddMember from "../../PublicModal/addMember/add-member-modal.vue";
import cuActions from "../../PublicModal/cuActions/cuActions-modal.vue";
import withShopModal from "../../PublicModal/withShop/withShop-modal.vue";
import backshopModel from '../../PublicModal/backShopModel/backShopModel.vue'
import replaceShopModel from '../../PublicModal/replaceShopModel/replaceShopModel.vue'
export default {
  name: "billing",
  data() {
    return {
      contextMenuData: {
        // the contextmenu name(@1.4.1 updated)
        menuName: "demo",
        // The coordinates of the display(菜单显示的位置)
        axios: {
          x: null,
          y: null
        },
        row: "",
        users: {},
        // Menu options (菜单选项)
        menulists: [
          {
            fnHandler: "delThisRow", // Binding events(绑定事件)
            btnName: "删除" // The name of the menu option (菜单名称)
          }
        ]
      },
      options: [
        {
          value: "选项1",
          label: "暂无"
        }
      ],
      signaBatch:{
        user:'',
        pass:''
      },
      orgId:'',//审批门店id
      userId:'',//审批人id
      check_user:'',//申请审批人
      checkMemo:'',//审批内容
      value: "",
      firstEnterSaleIdBool: true,
      //销售人员
      shopMember: "",
      ShopPerson:[],//本店人员
      custom: "", //定做状态
      customText: "1",
      selectOptions: "",
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
      orgPeople:[],//本店员工
      optometryId: "",
      defaultTimes: new Date(),
      type: "",
      optometryTime: "",
      optometryDetail:null,
      // submitNewOptometry: false, //控制 提交验光单子组件传值
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
      packagePrice:0,//套餐金额
      discountSale: 0, //优惠券折扣金额
      conponDiscountMoney: "", //优惠券折扣金额
      actionCost: {}, //促销活动信息
      conponResponse: {},
      timeDefaultShow: "", //当前日期默认值
      express: {
        //快递方式
        name: "", //收件人
        telphone: "", //手机号
        address: "" //收件地址
      },
      strlist:[],//审核列表
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
      orgDatas: null,
      tableData: [], //用户保存商品信息
      where: "", //左右镜片
      addShop: false,
      //以下为控制modal弹框变量,
      conponData: null,
      isSubmit: false,
      reprint: false,
      endorsement: false,
      loginUserPermission: false,
      permission: false,
      pendingOrders: false,
      CouponBarCode: false,
      otherExpense: false,
      packageGoods: false,
      customizeRH: false,
      backShop:false,
      replaceShop:false,
      withShop: false,
      addMember: false,
      isNotMember: false,
      showGetBill: false,
      showSelectShop: false,
      showSelectRH: false,
      showNewOptometry: false,
      isOptometryDialogVisible: false,
      showSelectMember: false,
      cuActions: false,
      selectBrand:{
        varieties:'',
        brand:'',
      },
      varietiesArr:[],
      brandArr:[],
    };
  },
  components: {
    SelectMemberModal,
    NewOptometryModal,
    SelectRHModal,
    SelectShopModal,
    GetBill,
    CustomizeRHModal,
    withShopModal,
    PackageGoodsModal,
    OtherExpenseModal,
    CouponBarCodeModal,
    EndorsementModal,
    ReprintModal,
    AddMember,
    cuActions,
    backshopModel,
    replaceShopModel
  },

  methods: {
    //选择套餐弹窗
    closePackage(data){
      console.log(data)
      if(data){

        this.packagePrice=parseFloat(this.packagePrice)+parseFloat(data.package.packagePrice);
        console.log(this.packagePrice)
        this.selectSku(data.data,null,'package');
      }
        this.packageGoods = false;
    },
    // 促销活动、
    openConpon(data) {
      this.cuActions = data;
    },
    //促销活动计算方案
    actionComputed(data) {
      let _this = this;
      _this.actionCost = data;
      _this.computedPay();
    },
    //右键菜单
    showMenu(row, event) {
      event.preventDefault();
      var x = event.clientX;
      var y = event.clientY;
      // Get the current location
      this.contextMenuData.axios = {
        x,
        y
      };
      this.contextMenuData.row = row;
    },
    //打开优惠券
    openCouponBarCode() {
      if (this.selectMember.memberInfo) {
        this.CouponBarCode = true;
      } else {
        this.$message({
          showClose: true,
          message: "用户数据获取失败，请先选择用户",
          type: "error"
        });
      }
    },
    //其他费用
    otherExpenseFn() {
      let _this = this;
      _this.$nextTick(() => {
        _this.$refs.otherExpenseRef.addCost();
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
    //自带商品添加
    withShopCommit(data) {
      this.selectSku(data, data.nums);
      this.withShop = false;
    },
    //获取销售人员
    getPrivateSelect(type, options) {
      var _this = this;
      _this
        .$axios({
          url: "http://myc.qineasy.cn/cas-api/user/getUserByOrg",
          method: "post",
          params: {
            jsonObject: {
              // orgId: JSON.parse(localStorage.getItem("userData")).orgId,
              // orgId:'11387',
              //参数类型（1:订单类型;2:订单状态;3:加工备注;4:特殊备注;5:取镜方式,6费用）
            },
            keyParams: {
              weChat: true,
              userId: JSON.parse(localStorage.getItem("userData")).userId,
              orgId: JSON.parse(localStorage.getItem("userData")).orgId
            }
          }
        })
        .then(function(response) {
          // console.log(response.data.data)
          if(response.data.code == 1 ){
            _this.options = response.data.data.list;
            // console.log(_this.users.userId)
            if (_this.firstEnterSaleIdBool) {
              _this.firstEnterSaleIdBool = false;
              _this.shopMember = _this.users.userId;
            }
          }else{
            _this.$message({
              showClose: true,
              message: "销售员数据获取失败",
              type: "warning"
            });
          }
        });
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
    //定做商品
    commitCustom(data) {
      this.selectSku(data, data.nums);
    },
    toReadDetail(id){ 
        const _this = this;
        _this.$router.push({
          name:'optometryOrderCu',
          params:{
            id:id
          }
        })
    },
    removeRow(row, event) {
      let _this = this;
      if (event.target.className == "el-input__inner") {
        return;
      }
      if(row.status == 4){
        return
      }
      if (this.tableData.indexOf(row) != -1) {
        this.tableData.splice(this.tableData.indexOf(row), 1);
      }
      _this.computedPay();
    },
    //删除表格td
    delThisRow() {
      var _this = this;
      this.tableData.forEach(function(element, index) {
        if (element == _this.contextMenuData.row) {
          if(this.tableData[index].status == '4'){

          }else{
            this.tableData.splice(index, 1);
          }
        }
      }, this);
      _this.computedPay();
    },
    //取镜公司地点
    sameComType(value) {
      let _this = this;
      console.log(value);
      _this.orgDatas = value;
      _this.orderTemp.glassesAddress = value.shopAddr; //下单门店地址
    },
    openNewOpt(){
      const _this = this;
      _this.showNewOptometry=true;
      _this.$nextTick(()=>{
        _this.$refs.addOptometry.cleardata();
      })
    },
    //退货
    backShoping(status,bool){
      let _this = this;
      if(status === 'back'){
          _this.backShop = bool;
          console.log(_this.$refs);
          if(bool){
            _this.$nextTick(()=>{
              _this.$refs.backShopRefs.searchReason();
            })
          }
      }else if(status === 'replace'){
        _this.replaceShop = bool;
        if(bool){
            _this.$nextTick(()=>{
              _this.$refs.replaceShopRefs.searchReason();
            });
        }
      }
    },
    closeEyesModel(){
      const _this = this;
      _this.showNewOptometry = false;
      // _this.$nextTick(()=>{
      //   _this.$refs.addOptometry.cleardata();
      // })
    },
    //获取取镜公司
    getCompanyList(bool) {
      var _this = this;
      _this
        .$axios({
          url: "http://myc.qineasy.cn/pos-api/shopBy/getShopByList",
          method: "post",
          params: {
            jsonObject: {},
            keyParams: {
              weChat: true,
              userId: JSON.parse(localStorage.getItem("userData")).userId,
              orgId: JSON.parse(localStorage.getItem("userData")).orgId
            }
          }
        })
        .then(function(response) {
          _this.publicSelcet.comTypeOptions = response.data.data.shopByList;
          if (bool) {
            let orgId = _this.users.orgId;
            let orgData = _this.publicSelcet.comTypeOptions;
            // console.log(orgId)
            for (let i = 0; i < orgData.length; i++) {
              if (orgData[i].shopId == orgId) {
                // console.log('门店地址',orgData[i]);
                _this.orgDatas = orgData[i];
                _this.publicSelcet.comTypeModel = orgId;
                _this.orderTemp.glassesAddress = orgData[i].shopAddr;
              }
            }
          }
          // _this.orderTemp.glassesAddress = _this.users.
        });
    },

    //获取公共select options
    getPublicSelect(type, options) {
      if (options == "") {
        // console.log("1")
      } else {
        // console.log("2")
      }
      var _this = this;
      _this
        .$axios({
          url: "http://myc.qineasy.cn/cas-api/systemConfig/getSystemConfigList",
          method: "post",
          params: {
            jsonObject: {
              pid: "",
              id: "",
              type: type
              //参数类型（1:订单类型;2:订单状态;3:加工备注;4:特殊备注;5:取镜方式,6费用）
            },
            keyParams: {
              weChat: true,
              userId: JSON.parse(localStorage.getItem("userData")).userId,
              orgId: JSON.parse(localStorage.getItem("userData")).orgId
            }
          }
        })
        .then(function(response) {
          _this.selectOptions = response.data.data.list;
        });
    },
    //选择镜片 商品
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
      console.log(this.optometryData);
      let appkey =''
      if(_this.appkey == '0'){//如果是0，筛选远用
          appkey = 1
      }else if(_this.appKey == '1'){//近用
          appkey = 0
      }
      if (type == 1) {
        this.selectProductSku.selectSP = "";
        this.showSelectRH = true;
        this.selectProductSku.title = "选择右镜片";
        // this.selectProductSku.cylinder=_this.selectProductSku.selectR;柱镜==度数model干嘛
        // var where = '右镜片：'
        for (var i = 0; i < this.optometryData.length; i++) {
          if (
            this.optometryData[i].key != "2" &&
            this.optometryData[i].key != "3" &&
            this.optometryData[i].key != appkey
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
            this.optometryData[i].key != "2" &&
            this.optometryData[i].key != "3" &&
            this.optometryData[i].key != appkey
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
        console.log(1,degress,bool)
        _this.searchStr = degress;
      } else if (degress == undefined && bool == undefined) {
        //如果不是镜片度数搜索
        console.log(2,degress,bool)
        _this.searchStr = "";
      }
      let code = [];
      if(_this.selectBrand.varieties !='' && type!='3'){
          code=[_this.selectBrand.varieties,_this.selectBrand.brand,'']
      }else{
        if (_this.type == "") {
          code = ["C002", "", ""];
        } else {
          code = ["C001", "", ""];
        }
      }
      console.log(_this.eyesdata)
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
                userId: JSON.parse(localStorage.getItem("userData")).userId,
                orgId: JSON.parse(localStorage.getItem("userData")).orgId
              }
            }
          })
          .then(function(res) {
            // console.log('查询镜片完毕',res.data)
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
    //商品镜片列表点击查询
    rhtWareHouse(value) {
      // console.log(value)
      this.selectProductSku.wareh = value.wareh || "";
      this.selectProductSku.product = value.product || "";
      this.selectProductSku.categoryCode = value.categoryCode || "";
      var _this = this;
      console.log(value);
      if (_this.searchStr) {
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
                userId: JSON.parse(localStorage.getItem("userData")).userId,
                orgId: JSON.parse(localStorage.getItem("userData")).orgId
              }
            }
          })
          .then(function(res) {
            if(res.data.code == 1){
              _this.selectProductSku.productSkuData = res.data.data;
            }else{
              _this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'error'
                  })
            }
          });
      }, 0);
    },
    getProductSku(info) {
      const _this = this;
      console.log("info", info);
      _this.$nextTick(() => {
        _this.selectProductSku.nub = info.nub;
        _this.selectProductSku.productSkuData.count = info.productSkuData.nub;
        if(this.where == "left"){
          _this.selectGlass(2,_this.selectProductSku.selectL,true);
        }else if(this.where = "right"){
          _this.selectGlass(1,_this.selectProductSku.selectR,true);
        }else{
            _this.selectGlass();
        }
      });
    },
     changesSelect(type){
            let _this = this;
            let id = '';
            // console.log(this.selectBrand)
            switch ((type).toString()) {
              case '1':
                _this.selectBrand.varieties= '';
                _this.varietiesArr= [];
                _this.selectBrand.brand = '';
                _this.brandArr = [];
                break;
              case '2':
                  id=this.selectBrand.varieties;
                  _this.selectBrand.brand='';
                  _this.brandArr = [];
                  if(id=="") return
                break;

          }
           _this.$myAjax({
                url: 'pos-api/productCategory/list',
                data: {
                        productCategoryId: id
                }
            ,success:function(res){
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
                              let list = [];
                              for(var i=0;i<res.data.productCategoryList.length;i++){
                                  if(res.data.productCategoryList[i].productCategoryId == "C001"||res.data.productCategoryList[i].productCategoryId == "C004"){
                                    list.push(res.data.productCategoryList[i]);
                                  }
                              }
                              _this.varietiesArr=list;
                              break
                          case '2':
                              _this.brandArr=res.data.productCategoryList;
                              break;
                          default:
                              break;
                      }
                  }
                },error:function(err){
                  console.info(err);
                  _this.$message({
                    showClose: true,
                    message: '请求数据失败，请联系管理员',
                    type: 'error'
                  })
                }
      })},
    //选择商品后进行关闭弹窗计算
    selectSku(value, nums, name) {
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
      if (value.status == '0') {
        console.log("点击类型status", value.status);
        this.where == "shop"
          ? (value.skuName2 = value.skuName)
          : this.where == "left"
            ? (value.skuName2 = "左" + (value.classId=='C004' ? '隐形眼镜' + value.skuName.substr(5) : value.skuName))
            : (value.skuName2 = "右" + (value.classId=='C004' ? '隐形眼镜' + value.skuName.substr(5) : value.skuName));
      }
      if(name =='package'){//套餐产品
          console.log(value);
          let packageShop = [];
          for(var i =0;i<value.length;i++){
              let obj = {};
            if(value[i].hasOwnProperty('farSearchCodeId')){
              obj.productId = value[i].farSearchCodeId;//商品id
              obj.skuName2=value[i].farSearchCode;
              obj.skuName=value[i].farSearchCode;
              obj.sku=value[i].sku;
              obj.warehouseId=value[i].warehouseId;
              obj.stockId=value[i].stockId;
              obj.quantity=value[i].quantity;
              obj.classId=value[i].productCategoryId;
              obj.allotQuantity=value[i].allotQuantity;
            }else{
              obj.productId = value[i].productSku.productId;//商品id
              obj.skuName2=value[i].productSku.skuName;
              obj.skuName=value[i].productSku.skuName;
              obj.sku=value[i].productSku.sku;
              obj.warehouseId=value[i].productSku.warehouseId;
              obj.stockId=value[i].productSku.stockId;
              obj.quantity=value[i].productSku.quantity;
              obj.classId=value[i].productSku.productCategoryId;
              obj.allotQuantity=value[i].productSku.allotQuantity;
              // obj.realSale=value[i].productSku.packagePrice;
            }
              obj.packageDetailId = value[i].packageDetailId;
              obj.price=value[i].packagePrice;
              obj.nums=value[i].nums||'1';
              obj.packageId = value[i].packageId;
              obj.status=value[i].status;//
              obj.realSale='--';
              obj.discount='10.00';
              _this.tableData.push(obj)
          }
      }
      console.log("渲染后的value", value);
      let alldis = _this.allDisCount;
      if (alldis != "" && typeof parseFloat(alldis) == "number") {
        value.realSale = (value.discount * value.price / 10).toFixed(2);
      }
      if (!nums&&name!='package') {
        // if (value.status != 3) {
          value.nums = 1;
        // }
      }
      if (this.allDisCount > 0) {
        //添加商品的时候如果有整单折扣
        this.addShop = true;
      }
      if(name != 'package'){
        _this.tableData.push(value);
      }
      _this.showSelectRH = false;
      _this.customizeRH = false;
      _this.showSelectShop = false;
      _this.computedPay();
    },
    //计算价格区域
    computedPay(alldiscount) {
      let _this = this;
      let countSale = 0;
      // let packagePrice = 0;
      let n = 0;
      // _this.allDisCount = '';
      // console.log(_this.tableData)
      _this.extraMoney = 0;
      for (let i = 0; i < _this.tableData.length; i++) {
        //循环计算价格
        if (
          _this.tableData[i].status != "2" &&
          _this.tableData[i].status != "3" &&
          _this.tableData[i].status != "4"
        ) {
          let thisSale = parseFloat(_this.tableData[i].realSale);
          countSale = countSale + thisSale;
        }
        if (_this.tableData[i].status != "3") {
          n += parseInt(_this.tableData[i].nums);
        }
        if (_this.tableData[i].status == "3") {
          //其他费用
          _this.extraMoney += parseFloat(_this.tableData[i].realSale);
        }
        // if(_this.tableData[i].status == '4'){
        //   //套餐
        //   packagePrice += parseFloat(_this.tableData[i].price);
        // }
      }
      if (_this.actionCost.actionId) {
        if (_this.actionCost.money) {
          countSale = countSale - _this.actionCost.money; //优惠金额后
        } else if (_this.actionCost.discount) {
          countSale = parseFloat(
            countSale * _this.actionCost.discount / 10
          ).toFixed(2); //打折后价格
          _this.actionCost.discountMoney = (
            (1 - parseFloat(_this.actionCost.discount) / 10) *
            countSale
          ).toFixed(2); //打折优惠金额
        }
      }
      this.amountSale = parseFloat(countSale).toFixed(2); //原价合计

      if (
        _this.conponResponse.amount > 0 ||
        _this.conponResponse.discount > 0
      ) {
        //如果有优惠券
        // 金额||折扣
        if (_this.conponResponse.amount > 0) {
          //按固定金额算
          _this.conponDiscountMoney = _this.conponResponse.amount;
          countSale = countSale - _this.conponResponse.amount; //优惠价 = 无折扣前 - 优惠价↓
        } else if (_this.conponResponse.discount > 0) {
          //按折扣算
          let conpon = parseFloat(
            countSale * _this.conponResponse.discount / 10
          ).toFixed(2);
          _this.conponDiscountMoney = (parseFloat(countSale) - conpon).toFixed(
            2
          );
          countSale = conpon;
        }
      }
      if (_this.selectMember.memberInfo != null) {
        //如果有会员id
        if (_this.selectMember.memberInfo.discount < 1) {
          _this.discountFlag = 0;
        }
        var difference = (_this.memberShipDisCount * countSale).toFixed(2); //会员价 = 会员价格 * 总价
        let memberDisCount = (countSale - difference).toFixed(2); //会员折扣差价 = 总金额 - 会员价
        _this.memberShipDisCountSale = memberDisCount;
        countSale = countSale - parseFloat(memberDisCount); //会员价
      }
      _this.numCount = n;
      _this.saleCount = Math.round(parseFloat(countSale) * 100) / 100; //无整单折扣情况下

      if (_this.addShop || alldiscount == "alldiscount") {
        if (_this.allDisCount > 0) {
          _this.discountSale = parseFloat(_this.saleCount - _this.allDisCount * _this.saleCount / 10).toFixed(2);
          //最后价格 = 整单折扣前 * 折扣 ↓
          _this.saleCount = (_this.allDisCount / 10 * _this.saleCount).toFixed(2);
        }
      }
        _this.amountSale = (parseFloat(_this.amountSale)+parseFloat(_this.packagePrice)).toFixed(2);
        _this.saleCount = (parseFloat(_this.saleCount)+parseFloat(_this.packagePrice)).toFixed(2);
      
    },
    changeNums(value,index){
      console.log(value)
      value.realSale = parseFloat(value.price * value.discount/10 * value.nums).toFixed(2);
      this.tableData.splice(index, 1, value);
      this.computedPay("alldiscount");
    },
    //商品折扣发生变化
    changePrice(value, type, index) {
      // console.log(value,type,index)
      // this.allDisCount = '';
      this.discountSale = "";//优惠券优惠金额
      if (type == 1) {//正常都是1，8折计算为*0.8
        value.realSale = parseFloat(value.price * value.discount / 10 * value.nums).toFixed(2);
      } else {
        value.realSale = parseFloat(value.price / value.discount * 10 * value.nums).toFixed(2);
      }
      this.tableData.splice(index, 1, value);
      this.computedPay("alldiscount");
    },
    confirmAllDiscount(value) {
      console.log(value,'触发整单折扣计算')
      if (value && parseFloat(this.allDisCount) > 0) {
          //有整单折扣
          this.addShop = false;
          this.computedPay();
          // //整单折扣金额差价 = 折扣前 - 折扣后↓
          this.discountSale = parseFloat(
            this.saleCount - this.allDisCount * this.saleCount / 10
          ).toFixed(2);
          //最后价格 = 整单折扣前 * 折扣 ↓
          this.saleCount = (this.allDisCount / 10 * this.saleCount).toFixed(2);
      } else {
        this.allDisCount = "";
        this.discountSale = "";
        this.computedPay();
      }
    },
    //整单折扣
    afterDiscount() {
      let _this = this;
      // _this.permission = true;
      _this.confirmAllDiscount(true);
    },
    //获取用户验光单列表
    getOptometryRecordList(memberId) {
      var _this = this;
      _this
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
            _this.optometryList = response.data.data.list;
          } else {
            _this.$message({
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
      var _this = this;
      _this
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
            console.log('取验光单信息',response.data.data)
            _this.optometryData = response.data.data.eyes;
            _this.appKey = response.data.data.prescriptions.appKey;
            _this.optometryId = response.data.data.prescriptions.prescriptionId;
            _this.optometryTime =
              response.data.data.prescriptions.prescriptionTime;
            _this.getOptometryRecordList(response.data.data.member.memberId);
            setTimeout(() => {
              _this.$myAjax({
                url: "member-api/member/getMemberListByBoYang",
                data: {
                  memberId: response.data.data.member.memberId,
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
                },error:function(err){
                  console.log(err)
                }
              })
            })
            _this.includeOptometry();
          } else {
            _this.$message({
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
            console.log(1,response.data.data)
            _this.showSelectMember = false;
            _this.isOptometryDialogVisible = true;
            _this.optometryData = response.data.data.eyes;
            _this.optometryDetail = response.data.data.prescriptions;
            _this.optometryId = response.data.data.prescriptions.prescriptionId;
            _this.optometryTime = response.data.data.prescriptions.prescriptionTime;
            _this.appKey = response.data.data.prescriptions.appKey;
          } else {
            _this.isOptometryDialogVisible = true;
            _this.$message({
              showClose: true,
              message: response.data.msg,
              type: "warning"
            });
            _this.includeOptometryData = null;
            _this.showSelectMember = false;
          }
        })
        .catch(function(error) {
          console.info(error);
        });
    },
    //回车查询会员
    key13GetMemberInfo() {
      var _this = this;
      setTimeout(() => {
        if (_this.selectMember.selectM.length == 11) {
          _this
            .$axios({
              url:
                "http://myc.qineasy.cn/member-api/member/getMemberListByBoYang",
              method: "post",
              params: {
                jsonObject: {
                  seachCode: _this.selectMember.selectM,
                  size: 5,
                  nub: 0
                },
                keyParams: {
                  weChat: true,
                  userId: JSON.parse(localStorage.getItem("userData")).userId,
                  orgId: JSON.parse(localStorage.getItem("userData")).orgId
                }
              }
            })
            .then(function(response) {
              if (response.data.code == 1) {
                // console.log(response)
                // _this.isOptometryDialogVisible = false;
                // _this.includeOptometry()
                _this.getMemberInfo(response.data.data.memberList[0]);
              } else {
                _this.$message({
                  showClose: true,
                  message: "会员信息获取失败",
                  type: "error"
                });
              }
            });
        }
      }, 0);
    },
    //选择会员子组件返回函数 获取用户信息
    getMemberInfo(value, bool) {
      //bool作为挂单直接导入，
      this.selectMember.memberInfo = value;
      this.memberShipDisCount = this.selectMember.memberInfo.discount;
      this.conpon(); //选择用户后，获取优惠券信息
      this.computedPay(); //如果选择用户前选择商品了就再次进行计算
      // this.allDisCount='';//整单折扣归零,重新输入进行计算
      if (value && !bool) {
        this.getOptometryRecord();
        this.getOptometryRecordList();
      }
    },
    //使用优惠券
    receiveconpon(data) {
      this.CouponBarCode = false;
      if (data.couponModality == "0") {
        data.amount = "";
      } else if (data.couponModality == "1") {
        data.discount = "";
      }
      console.log(data);
      this.conponResponse = data;
      this.computedPay();
    },
    //优惠券信息获取
    conpon() {
      let _this = this;
      _this
        .$axios({
          url: "http://myc.qineasy.cn/coupon-api/newCouponMsg/getMyAllCoupon",
          method: "post",
          params: {
            jsonObject: {
              memberCardNo: _this.selectMember.memberInfo.memberCardNo //会员卡号
              // orgScope:'',//适用门店编号
              // couponMsgId:'',//优惠券信息Id
              // couponNo:'',//优惠券编号
              // fullAmount:'',//满额条件 0没有门槛
              // couponState:'',//卡券状态
              // activeTime:'',//当天时间，是否当天可用
              // nub:'',//分页起始位
              // size:'',//每页条数
            },
            keyParams: {
              weChat: true
            }
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            _this.conponData = res.data.data;
          } else {
            _this.$message({
              showClose: true,
              message: "请求数据出问题喽，请重试！",
              type: "error"
            });
          }
        })
        .catch(function(err) {
          _this.$message({
            showClose: true,
            message: "请求数据出问题喽，请重试！",
            type: "error"
          });
        });
    },
    //获取新增验光单信息
    getNewoptometry(value) {
      console.log(value);
      const _this =this;
      _this.showNewOptometry = false;
      // _this.$nextTick(()=>{
      //   _this.$refs.addOptometry.cleardata();
      // })
      _this.getPrescriptions(value.prescriptions.prescriptionId);
      // this.optometryData=value.eyes;
      // this.optometryId=value.prescriptions.prescriptionId;
      // this.optometryTime=value.prescriptions.prescriptionTime;
      // console.log(this.optometryId, this.optometryTime)
      // this.includeOptometry();
    },
    //录入验光单信息
    includeOptometry() {
      var _this = this;
      console.log("录入验光单信息", _this.optometryData);
      if (_this.optometryData != null) {
        var tableArr = [];
        _this.optometryData.forEach(element => {
          // if (element.key != "0" && element.key != "1") {
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
              if(element.value[0][item] !='' || element.value[1][item] !=""){
                tArr.push({
                  keys: item,
                  lData: element.value[0][item],
                  rData: element.value[1][item]
                });
              }
              
            }
            var name;
            switch (element.key.toString()) {
              case '0':
                  name = '远用';
                  break;
              case '1':
                  name = '近用';
                  break;
              // case "2":
              //     name = "主观";
              //   break;
              // case "3":
              //     name = "客观";
                // break;
              // case "4":
              //   name = "渐进";
              //   break;
              // case "5":
              //   name = "隐形";
                // break;
              default:
                break;
            }
            if(name){
              tableArr.push({ item: tArr, name: name });
            }
          // }
        });
        if (tableArr) _this.includeOptometryData = tableArr;
        console.log(_this.includeOptometryData)
      }
    },
    //刷新页面
    resetPage() {
      location.reload();
    },
    //取单操作
    openOrder(data) {
      // console.log(data)
      let _this = this;
      _this.showGetBill = false;
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
            }
          });
          _this.$myAjax({
            //验光单信息获取
            url: "pos-api/prescriptions/getPrescriptions",
            data: {
              prescriptionId: data.prescriptionsId
            },
            success: function(res) {
              console.log(res.data)
              if (res.code != 1 && res.data.eyes.length == 0) {
                return false;
              }
              _this.optometryData = res.data.eyes;
              _this.optometryDetail = res.data.prescriptions;
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
        obj.orderItemId =  data.orderItems[i].orderItemId;
        obj.status = data.orderItems[i].productMold;
        obj.skuName2 = data.orderItems[i].itemName;
        obj.skuName = data.orderItems[i].itemName;
        obj.nums = data.orderItems[i].quantity;
        obj.price = parseFloat(data.orderItems[i].price) || "0";
        obj.discount = data.orderItems[i].discountRate;
        obj.realSale =
          data.orderItems[i].status == 3
            ? data.orderItems[i].price
            : data.orderItems[i].money;
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
          delete obj.discount;
        }
        _this.tableData.push(obj);
      }
      console.log("取单、重新开单商品列表", _this.tableData);
      _this.computedPay();
    },
    //添加会员 子组件返回事件 提交表单信息，data为从子组件取到的数据
    memberAddSubmit: function(formdata) {
      var _this = this;
      _this.isSubmit = !_this.isSubmit;
      if (
        formdata.name != "" &&
        formdata.telphone != "" &&
        formdata.birthday != "" &&
        formdata.sex != ""
      ) {
        _this
          .$axios({
            url: "http://myc.qineasy.cn/member-api/member/addMember",
            method: "post",
            params: {
              jsonObject: formdata,
              keyParams: {
                weChat: true,
                userId: JSON.parse(localStorage.getItem("userData")).userId,
                orgId: JSON.parse(localStorage.getItem("userData")).orgId
              }
            }
          })
          .then(function(response) {
            if (response.data.code != "1") {
              _this.$message({
                showClose: true,
                message: response.data.msg,
                type: "error"
              });
              return false;
            } else {
              _this.addMember = false;
              _this.MemberInfoForAdd(response.data.data.memberId);
              _this.$message({
                showClose: true,
                message: "新增会员成功",
                type: "success"
              });
            }
          })
          .catch(function(error) {
            console.info(error);
            _this.$message({
              showClose: true,
              message: error,
              type: "error"
            });
          });
      } else {
        _this.$message({
          showClose: true,
          message: "请输入完整信息",
          type: "error"
        });
      }
    },
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
    //新增验光单后获取用户信息录入到页面
    MemberInfoForAdd(memberId) {
      var _this = this;
      _this
        .$axios({
          url: "http://myc.qineasy.cn/member-api/member/getMemberListByBoYang",
          method: "post",
          params: {
            jsonObject: {
              memberId: memberId
            },
            keyParams: {
              weChat: true,
              userId: JSON.parse(localStorage.getItem("userData")).userId,
              orgId: JSON.parse(localStorage.getItem("userData")).orgId
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
    signToSubmit(item){
      const _this = this;
      console.log(item);
      _this.check_user = item.userId;
      _this.addOrderTemp(1);
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
      let datas = this.tableData;
      let packageArr = [];
      let orderItemsList = [];
      let packageList = [];
      let packageDetails = [];
      let packageArrId = []
      for(var i=0;i<datas.length;i++){
          if(datas[i].status == '4'){
            packageArr.push(datas[i]);
          }
      }
      for(var i=0;i<packageArr.length;i++){
        if(packageArrId.indexOf(packageArr[i].packageId)==-1){//创建多个套餐包
            packageArrId.push(packageArr[i].packageId)
            let obj = {};
            obj.packageId = packageArr[i].packageId;
            obj.packageDetails = [];
            packageList.push(obj)
        }
        for(var j=0;j<packageList.length;j++){
          if(packageList[j].packageId == packageArr[i].packageId){
            packageList[j].packageDetails.push({
              itemId: packageArr[i].productId, //商品sku码
              itemName: packageArr[i].skuName2||packageArr[i].skuName, //明细名称
              proMemo: packageArr[i].skuName,
              quantity: packageArr[i].nums, //数量
              discountRate: packageArr[i].discount, //折扣比率
              orderPromotionId: "", //订单营销活动id
              listPrice: packageArr[i].price, //原价
              roundFlag: "1", //商品取整
              itemNo: packageArr[i].sku, //商品编码
              warehouseId: packageArr[i].warehouseId, //仓库id
              orderReceiptId: packageArr[i].customId || "", //定做单id
              stockId: packageArr[i].stockId || "", //库存id
              refundId: packageArr[i].refundId || "",
              stockQuantity: packageArr[i].quantity, //总库存
              productType: packageArr[i].classId||"", //商品类型 镜片镜架...
              stockQuantityNo: packageArr[i].allotQuantity, //可分配库存
              packageDetailId: packageArr[i].packageDetailId,//套餐商品id
              productMold: packageArr[i].status || "0" //商品类型，前端自定义 0普通商品 1定做 2自带 3其他 4套餐
            })
          }
        }
      }
      for (var item in this.tableData) {
        if(this.tableData[item].status != 4){
          orderItemsList.push({
            itemId: this.tableData[item].productId, //商品sku码
            itemName: this.tableData[item].skuName2||this.tableData[item].skuName, //明细名称
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
      }
      if (_this.tableData.length == 0) {
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
        prescriptionsId: _this.optometryId, //验光单id
        urgent: _this.orderTemp.urgent.toString(), //是否加急
        glassesTime: _this.orderTemp.glassesTime, //取镜时间
        glassesType: _this.orderTemp.glassesTypeModel, //取镜类别
        glassesCompany: _this.publicSelcet.comTypeModel || "取镜公司", //取镜公司
        glassesAddress: _this.orderTemp.glassesAddress || "无", //取镜地址
        saleMemo: _this.orderTemp.saleMemo || "销售备注", //销售备注
        processMemo: _this.publicSelcet.processMemo || "加工备注", //加工备注
        specialMemo: _this.publicSelcet.specialMemo || "特殊备注", //特殊备注
        couponDetailId: types == "-1" ? "" : _this.orderTemp.couponDetailId, //优惠券id
        moneyProduct: parseFloat(_this.amountSale).toFixed(2), //原价合计
        moneyAmount: parseFloat(_this.saleCount).toFixed(2), //应付
        moneyPaid: 0, //应收
        couponNo: types == "-1" ? "" : _this.conponResponse.couponNo, //优惠券卡号核销
        activityMoney:
          types == "-1"
            ? ""
            : _this.actionCost.money || _this.actionCost.discountMoney, //活动优惠金额,
        discountMoney: _this.memberShipDisCountSale, //折扣优惠金额,会员
        cardDiscount: _this.memberShipDisCount>1?(_this.memberShipDisCount/10):_this.memberShipDisCount, //会员折扣
        discountFlag: _this.discountFlag, //是否使用会员折扣
        roundOffFlag: "1", //取整标识 0使用 1不用
        decimal: memberDiscount, //会员卡折扣
        couponMoney: types == "-1" ? "" : coupon, //卡券优惠金额
        orderItemsList: orderItemsList, //商品列表
        orderDiscount: types == "-1" ? "" : alldis, //整单折扣
        orderType: BorderType,
        extraMoney: _this.extraMoney, //其他费用
        status: types == "-1" ? "-1" : types||'', //挂单
        check_user:_this.check_user,//审批人
        checkMemo:_this.checkMemo,//审批内容
        packageList:packageList,//套餐
      };
      let params = {};
      if(_this.userId!='' && _this.orgId!=''){
        params.userId = _this.userId;
        params.orgId = _this.orgId;
        _this.signaBatch.user = '';
        _this.signaBatch.pass = '';
      }
        _this.$myAjax({
          url:'pos-api/orderTemp/addOrderTemp',
          data:jsonObject,
          keyParams:params,
          success:function(res){
            // console.log(res)
            if (res.code != "1") {
                _this.$message({
                  showClose: true,
                  message: "请求数据出问题喽，请重试！",
                  type: "error"
                });
              return 
            } else if(res.code == 1){
              if(res.data.checkFlag == 1){
                  _this.permission = true;
                  _this.searchOrgPeople();
                  _this.strlist = res.data.strList;
                  _this.$message({
                    showClose: true,
                    message: "登录账号权限不足",
                    type: "warning"
                    })    
                  _this.loginUserPermission = false;
              }else{
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
                    if(_this.userId != ''){
                      _this.permission = false;
                      _this.loginUserPermission = false;
                      _this.signaBatch.user = '';
                      _this.signaBatch.pass = '';
                      _this.userId = '';
                      _this.orgId = '';
                    }
                    
                setTimeout(function() {
                  location.reload();
                }, 1000);
              }
            }
            // if(是门店收银){
            // let orderId = response.data.data.orderId;//直接开单收银  门店收银
            // _this.$router.push({path:'/cashier/cashierList',query:{orderId:orderId}})
            // }
        },error:function(err){
          console.log(err)
            _this.$message({
                showClose: true,
                message: err,
                type: "error"
              });
        }
      })
    },
    searchOrgPeople(){
      const _this = this;
      _this.$myAjax({
          url:'cas-api/user/getUsersByOrgId',
          data:{
            orgId:JSON.parse(localStorage.getItem("userData")).orgId
          },success:function(res){
            if(res.code ==1){
              _this.ShopPerson = res.data.userList;
            }else{
              _this.$message({
                showClose: true,
                message: res.msg,
                type: 'error'
              })
            }
          },error:function(err){
            console.log(err)
            _this.$message({
                showClose: true,
                message: err,
                type: 'error'
              })
          }
        })
    },
    //登录签批
    signABatch(){
      const _this = this;
      _this.$myAjax({
        url:'cas-api/user/userlogin',
        data:{
          userName:_this.signaBatch.user,
          passWord:_this.signaBatch.pass,
        },
        success:function(res){
          console.log(res.data.user)
          if(res.code == 1){
            _this.userId = res.data.user.userId,
            _this.orgId = res.data.user.orgId
            _this.addOrderTemp()
            
          }else{
            _this.$message({
              type:'error',
              message:res.msg,
              showClose:true
            })
          }
        },error:function(err){
          _this.$message({
              type:'error',
              message:err,
              showClose:true
            })
        }
      })
    },
    hangOrder() {
      //取单
      let _this = this;
      _this.showGetBill = true;
      this.$nextTick(() => {
        _this.$refs.hangOrders.getOrderList("-1");
      });
    },
    modifyDataStyle() {
      //修改日期改样式
      this.$refs.datapick.$el.childNodes[1].style.color = "#333";
    },
    cleanSelectRHModal() {
      //关闭弹窗后清除select
      this.showSelectRH = false;
      this.$refs.SelectRHModal.childrenCleanSelectRHModal();
    },
    cleanSelectShopModal(event) {
      //关闭弹窗后清除select
      this.showSelectShop = false;
      this.$refs.showSelectShop.selectBrands(2);
    },
    endorsementFn(){
      const _this = this;
        _this.endorsement=true;
      console.log(_this.$refs)
      _this.$nextTick(()=>{
        _this.$refs.endorsement.requestOrder();
      })
      
    }
  },
  computed: {},
  mounted() {
    
  },
  beforeDestory() {},
  created() {
    this.getPrivateSelect();
    this.getCompanyList(true);
    this.getPublicSelect(5,this.publicSelcet.glassesTypeOptions);
    this.changesSelect(1);
  },
  mounted() {
    let _this = this;
    _this.users = JSON.parse(localStorage.getItem("userData"));
    if (_this.$route.params.datas) {
      console.log("重新开单参数", _this.$route.params.datas);
      _this.openOrder(_this.$route.params.datas);
    }
  },
  watch: {
    // tableData(newValue,oldValue){
    //     console.log(newValue,oldValue)
    // }
  }
};
</script>
<style lang="scss">
@import "../../../reset";
@import "billing";

.setNum {
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none !important;
    margin: 0;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
}
.placeHolder {
  input::input-placeholder {
    color: #606266 !important;
  }
  input::-webkit-input-placeholder,
  textarea::-webkit-input-placeholder {
    color: #606266 !important;
  }
  input:-moz-placeholder,
  textarea:-moz-placeholder {
    color: #606266 !important;
  }
  input::-moz-placeholder,
  textarea::-moz-placeholder {
    color: #606266 !important;
  }
  input:-ms-input-placeholder,
  textarea:-ms-input-placeholder {
    color: #606266 !important;
  }
  .el-input__inner {
    width: 150px;
  }
}
.el-input__prefix,
.el-input__suffix {
  color: #606266;
}
.el-input__inner {
  color: #888888;
}
.el-select .el-input .el-select__caret {
  color: #606266;
}
.inputBold span {
  font-weight: bold;
}

.shopexpress {
  width: 95px;
}
.express {
  width: 80px;
}
.expressAddress {
  width: 105px;
}
.expressAddress{
  .el-input__inner{
    width: 100% !important;
    max-width: 300px !important;
  }
}

.orderType {
  .el-form {
    .el-date-editor {
      .el-input__inner {
        color: red;
      }
    }
  }
}
.box100 {
  width: 100%;
}
.ov {
  overflow: hidden;
}
.salesclerkInfo .el-select {
  min-width: 100px;
  max-width: 120px;
}
.remarks {
  .el-form-item__content{
    width: 100%;
  }
  .el-input__inner{
    width: 90%;
    max-width: 400px !important;
  }
}
</style>
