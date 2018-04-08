<template>
<div class="billing content_box flexH100">
    <div class="billingInfo">
        <div class="borderfff flex1">
            <div class="salesclerkInfo">
                <el-form ref="form">
                    <el-form-item label="销售员 :">
                        <el-select size="mini" placeholder="请选择">
                            <el-option
                            v-for="item in publicSelcet.comTypeOptions"
                            :key="item.shopId"
                            :label="item.shopName"
                            :value="item.shopId">
                            </el-option>                            
                        </el-select>
                    </el-form-item>
                    <el-form-item label="补单日期 :">
                        <el-date-picker
                        v-model="orderTemp.singleSupTime"
                        align="left" 
                        placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>  
                    <el-form-item label="会员 :" class="memberInput">
                        <el-input class="" v-model="selectMember.selectM" placeholder="输入会员卡号/手机号"></el-input>
                        <el-button  @click="showSelectMember=true">最近会员</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="salesclerkParam">
                <el-form ref="form">
                    <el-form-item label="右镜片 :" class="ParamInput">
                        <el-input class="" placeholder="" v-model="selectProductSku.selectR" @keyup.13="selectGlass(1)"></el-input>
                        <el-button @click="showSelectRH=true;selectGlass(1)">···</el-button>
                        <el-button @click="customizeRH=true">定做</el-button>
                    </el-form-item>
                    <el-form-item label="左镜片 :" class="ParamInput">
                        <el-input class="" placeholder="" v-model="selectProductSku.selectL" @keyup.13="selectGlass(2)"></el-input>
                        <el-button @click="showSelectRH=true;selectGlass(2)">···</el-button>
                        <el-button @click="customizeRH=true">定做</el-button>
                    </el-form-item>
                    <el-form-item label="商品 :" class="ParamInput">
                        <el-input class="" placeholder="" v-model="selectProductSku.selectSP" @keyup.13="selectGlass(3)"></el-input>
                        <el-button @click="showSelectShop=true;selectGlass(3)">···</el-button>
                        <el-button @click="customizeRH=true">定做</el-button>
                    </el-form-item>
                    <el-form-item class="ParamInput ParamButton">
                        <el-button @click="packageGoods=true">套餐商品</el-button>
                    </el-form-item>
                    <el-form-item class="ParamInput ParamButton">
                        <el-button >自带商品</el-button>
                    </el-form-item>
                    <el-form-item class="ParamInput ParamButton">
                        <el-button @click="otherExpense=true">其他费用</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="borderfff mgt5 am_bg_white flex3">
            <div class="salesSuggest">
                <el-table
                    :data="tableData"
                    size="small"
                    align="left"
                    @row-dblclick="delThisRow"
                    style="width: 100%;margin-bottom:10px;min-height:300px">
                    <el-table-column
                    prop="skuName"
                    label="建议配镜"
                    width="600px">
                        <template slot-scope="scope">
                            <span v-html="scope.row.skuName"></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="num"
                    label="数量">
                        <template slot-scope="scope">
                            <span class="am-ft-bold">
                                1
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="price"
                    label="原单价">
                    </el-table-column>
                    <el-table-column
                    prop="discount"
                    label="折扣"
                    width="100px">
                        <template slot-scope="scope">
                            <el-input class="" placeholder="" v-model="scope.row.discount" @input="changePrice(scope.row,1)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="realSale"
                    label="实售单价"
                    width="100px">
                        <template slot-scope="scope">
                            <el-input class="" placeholder="" v-model="scope.row.realSale" @input="changePrice(scope.row,2)"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="settleAccounts">
                    <p>
                        <span>共计 :<b>{{numCount}}件</b></span>
                        <span>合计 :<b v-show="saleCount!=''&saleCount!=0">{{saleCount}}</b><b v-show="saleCount==0">0.00</b></span>
                    </p>
                    <p>
                        <span v-show="actionSale =='' || actionSale == 0 ">促销活动 : 无</span>
                        <!--<span v-show="actionSale !='' & actionSale != 0 ">促销活动 : 圣诞配镜大促<b>{{actionSale}}元</b></span>-->
                        <span v-show="discountSale == '' & allDisCount == '' || discountSale == 0 & allDisCount == ''" >折扣 : 无</span>
                        <span v-show="discountSale != '' & discountSale != 0 || allDisCount != ''">折扣 :<b>{{allDisCount}}折 (-{{discountSale}}元)</b></span>
                        <span v-show="memberShipDisCount==10">无会员折扣</span>
                        <span v-show="memberShipDisCount<10">会员折扣 : {{memberShipDisCount}}折  <b v-show="memberShipDisCountSale!= '' &memberShipDisCountSale!= '0'">(－{{memberShipDisCountSale}}元)</b></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="salesDiscount flex1">
            <div class="fn-left">
                <el-form ref="form">
                    <!--<el-form-item class="ParamButton">
                        <el-button @click="CouponBarCode=true">折扣券</el-button>
                    </el-form-item>
                    <el-form-item class="ParamButton">
                        <el-button>优惠券</el-button>
                    </el-form-item>
                    <el-form-item class="ParamButton">
                        <el-button >促销活动</el-button>
                    </el-form-item>-->
                </el-form>
            </div>
            <div class="fn-left singleDiscount">
                <p><span>整单折扣 :</span>
                <el-input class="" placeholder="" v-model="allDisCount" @change="afterDiscount"/> 折
                </p>
            </div>
            <div class="fn-right singleDiscount">
                <!-- <p><span>整单折扣 :</span><el-input class="" placeholder=""></el-input></p> -->
                <p>
                    <span>应收 :</span>
                    <!-- <el-input class="setNum" placeholder='' type="number"  v-model.number="receivable" /> -->
                    <span class="ant_text">{{receivable||'0'}}</span>
                </p>
            </div>
        </div>
        <div class="orderType flex1">      
            <el-form ref="form">
                <el-form-item>
                    <el-checkbox v-model="orderTemp.urgent">是否加急单</el-checkbox>
                </el-form-item>
                <el-form-item label="取镜时间 :">
                    <el-date-picker
                    v-model="orderTemp.glassesTime"
                    value-format="yyyy-MM-dd"
                    align="left"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="取镜方式 :">
                    <el-select size="mini" v-model="publicSelcet.glassesTypeModel" @visible-change="getPublicSelect(5,publicSelcet.glassesTypeOptions)" placeholder="请选择">
                        <el-option
                        v-for="item in selectOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="取镜公司 :">
                    <el-select size="mini" v-model="publicSelcet.comTypeModel" placeholder="请选择" @visible-change="getCompanyList()" @change="sameComType">
                        <el-option
                        v-for="item in publicSelcet.comTypeOptions"
                        :key="item.shopId"
                        :label="item.shopName"
                        :value="item.shopId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="取镜地点 :">
                    <p style="width:100px;">{{orderTemp.glassesAddress||'--'}}</p>
                </el-form-item>
                <el-form-item>
                    <el-input class="" v-model="orderTemp.saleMemo" placeholder="销售备注"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select size="mini" v-model="publicSelcet.processMemo" placeholder="加工备注" @visible-change="getPublicSelect(3,publicSelcet.processMemoOptions)">
                        <el-option
                        v-for="item in selectOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select size="mini" v-model="publicSelcet.specialMemo" placeholder="特殊备注" @visible-change="getPublicSelect(4,publicSelcet.specialMemoOptions)">
                        <el-option
                        v-for="item in selectOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <div class="buttonGroup flex1">
            <div class="fn-left">
                <el-button type="primary">手工单[S]</el-button>
                <el-button type="primary">赠送[S]</el-button>
                <el-button type="primary">退货[T]</el-button>
                <el-button type="primary">换货</el-button>
                <el-button type="primary" @click="reprint=true">补打</el-button>
                <el-button type="primary">预览</el-button>
                <el-button type="primary" @click="showGetBill=true">取单</el-button>
                <el-badge :value="3" class="item">
                    <el-button type="primary" @click="endorsement=true">签批</el-button>
                </el-badge>
            </div>
            <div class="fn-right">
                <el-button type="primary">重置</el-button>
                <el-button type="primary">挂单[F7]</el-button>
                <el-button type="primary" @click="addOrderTemp">开单[F5]</el-button>
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
                            <img :src="selectMember.memberInfo?selectMember.memberInfo.headpicpath:'http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_touxiang.png'"/>{{selectMember.memberInfo?selectMember.memberInfo.name:''}}
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
                    <div class="basicInformationItem">
                        <label>会员卡号 :</label><span>{{selectMember.memberInfo?selectMember.memberInfo.memberCardNo:'--'}}</span>
                    </div>
                    <div class="basicInformationItem">
                        <!-- <label>会员折扣 :</label><span>{{memberShipDisCount}}</span> -->
                        <label>会员折扣 :</label><span>{{selectMember.memberInfo?selectMember.memberInfo.discount:'--'}}</span>
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
                <el-button type="primary" @click="showNewOptometry=true">新增</el-button>
            </div>            
            <div class="selectEyeglass">
                <el-select size="mini" v-model="value" placeholder="">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div class="eyeglassTable">
                <el-table
                    v-for="value in includeOptometryData"
                    :key="value.name"
                    :data="value.item"
                    size="small"
                    align="left"
                    style="width: 100%;">
                    <el-table-column
                    prop="keys"
                    :label="value.name">
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
    <el-dialog
        custom-class="noheader am-ft-center"
        title="提示"
        :visible.sync="isOptometryDialogVisible"
        width="30%"
        center>
        <h4 class="am-ft-gray6 am-ft-16 mgb20 ft_bold">调入该会员最近一次的验光单？</h4>
        <span>{{optometryTime||'暂无数据'}} 验光单号：{{optometryId||'暂无数据'}}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isOptometryDialogVisible = false;showNewOptometry=true">不,我要新增</el-button>
            <el-button type="primary" @click="isOptometryDialogVisible = false;includeOptometry()">调入</el-button>
        </span>
    </el-dialog>
    <el-dialog class="selectMember" title="选择会员 (23)" :visible.sync="showSelectMember" width="62.5%">
        <SelectMemberModal :selectM="selectMember.selectM" v-on:memberInfo="getMemberInfo"></SelectMemberModal>
    </el-dialog>
    <el-dialog class="newOptometry" title="新增验光单" :visible.sync="showNewOptometry" width="900px">
        <NewOptometryModal :submit="submitNewOptometry" v-on:getNewoptometry="getNewoptometry"></NewOptometryModal>
        <div class="packageDetailButtonGroup">
            <el-button @click="showNewOptometry = false">取 消</el-button>
            <el-button type="primary" @click="submitNewOptometry=true">保 存</el-button>
        </div>
    </el-dialog>
    <el-dialog class="selectRH" :title="selectProductSku.title" :visible.sync="showSelectRH" width="870px">
        <SelectRHModal  v-on:getProductSku="getProductSku" v-on:selectSku="selectSku"   :selectProductSku="selectProductSku"></SelectRHModal>
    </el-dialog>
    <el-dialog class="selectShop" title="选择商品" :visible.sync="showSelectShop" width="700px">
        <SelectShopModal  v-on:setBuyShop="selectSku"  v-on:getProductSku="getProductSku" :selectProductSku="selectProductSku"></SelectShopModal>
    </el-dialog>
    <el-dialog class="customizeRH" title="定做-右镜片" :visible.sync="customizeRH" width="690px">
        <CustomizeRHModal></CustomizeRHModal>
        <div class="packageDetailButtonGroup">
            <el-button type="primary" @click="customizeRH = false">确定</el-button>
        </div>
    </el-dialog>
    <el-dialog class="packageGoods" title="选择套餐" :visible.sync="packageGoods" width="800px">
        <PackageGoodsModal></PackageGoodsModal>
        <div class="packageDetailButtonGroup">             
            <el-checkbox class="fn-left">套餐置换</el-checkbox>
            <el-button @click="packageGoods = false">取 消</el-button>
            <el-button type="primary" @click="packageGoods = false">确定</el-button>
        </div>
    </el-dialog>
    <el-dialog class="otherExpense" title="其它费用" :visible.sync="otherExpense" width="700px">
        <OtherExpenseModal></OtherExpenseModal>
        <div class="packageDetailButtonGroup">        
            <el-button class="fn-right" @click="otherExpense = false">取消</el-button>
            <el-button class="fn-right" type="primary" @click="otherExpense = false">确定</el-button>
        </div>
    </el-dialog>
    <el-dialog
        custom-class="am-ft-center CouponBarCode"
        :visible.sync="CouponBarCode"
        width="360px"
        center>
        <CouponBarCodeModal></CouponBarCodeModal>
    </el-dialog>

    <el-dialog
        custom-class="noheader am-ft-center"
        title="挂单"
        :visible.sync="pendingOrders"
        width="30%"
        center>
        <h4 class="am-ft-gray6 am-ft-16 mgb20 ft_bold">确定要挂起本订单吗？</h4>
        <span>会员姓名：张丽丽</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="pendingOrders=false">取消</el-button>
            <el-button type="primary" @click="pendingOrders = false">确定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="取单（13）" :visible.sync="showGetBill" width="700px">
        <GetBill></GetBill>
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
        custom-class="noheader am-ft-center comfirmModal"
        title="提示"
        :visible.sync="permission"
        width="420px"
        center>
        <div class="textCenter mgt30 permissionBox">
            <h4 class="am-ft-gray6 am-ft-16 mgb20 ft_bold">您没有以下折扣权限，是否申请签批？</h4>
            <p><span>BM12340002 : {{allDisCount}}折</span></p>
            <!-- <p><span>BM12340002 : 8折</span></p> -->
            <p class="textareaBox">
                <i class="am-ft-red">*</i>
                <el-input
                type="textarea"
                :rows="4"
                placeholder="请输入内容">
                </el-input>
            </p>
        </div>
        <div slot="footer" class="dialog-footer">
            <div class="mgt10">
                <el-button @click="permission = false;">取消</el-button>
                <el-button type="primary" @click="permission = false">直接签批</el-button>
                <el-popover
                ref="popover"
                placement="bottom-start"
                width="224"
                trigger="hover">
                        <ul class="endorser">
                            <li @click="loginUserPermission=true;permission=false;"><span>SP001</span><p>张婷婷</p></li>
                            <li><span>SP001</span><p>张婷婷</p></li>
                            <li><span>SP001</span><p>张婷婷</p></li>
                            <li><span>SP001</span><p>张婷婷</p></li>
                            <li><span>SP001</span><p>张婷婷</p></li>
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
                <el-input auto-complete="off" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item class="mgb0">
                <el-input auto-complete="off" placeholder="密码"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="loginUserPermission = false;">取消</el-button>
            <el-button type="primary" @click="loginUserPermission = false">签批</el-button>
        </span>
    </el-dialog>
    
    <el-dialog class="endorsement" title="签批 (5)" :visible.sync="endorsement" width="600px">
        <EndorsementModal></EndorsementModal>
    </el-dialog>
    <el-dialog class="reprint" title="补打" :visible.sync="reprint" width="900px">
        <ReprintModal></ReprintModal>
        <div class="receiptsData">
            <h4>补打记录</h4>
            <p>2017-12-15 15:34 hz3046 销售补打</p>
            <p>2017-12-15 15:34 hz3046 销售补打</p>
        </div>
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
import SelectMemberModal from '../../PublicModal/SelectMember/select-member-modal.vue'
import NewOptometryModal from '../../PublicModal/NewOptometry/new-optometry-modal.vue'
import SelectRHModal from '../../PublicModal/SelectRH/selectRH-modal.vue'
import SelectShopModal from '../../PublicModal/SelectShop/selectShop-modal.vue'
import GetBill from '../../PublicModal/GetBill/get-bill-modal.vue'
import CustomizeRHModal from '../../PublicModal/customizeRH/customizeRH-modal.vue'
import PackageGoodsModal from '../../PublicModal/PackageGoods/package-goods-modal.vue'
import OtherExpenseModal from '../../PublicModal/OtherExpense/other-expense-modal.vue'
import CouponBarCodeModal from '../../PublicModal/CouponBarCode/couponBar-code-modal.vue'
import EndorsementModal from '../../PublicModal/Endorsement/endorsement-modal.vue'
import ReprintModal from '../../PublicModal/Reprint/reprint-modal.vue'
import AddMember from "../../PublicModal/addMember/add-member-modal.vue";

    export default {
        name: "billing",
        data() {
            return {
                options: [{
                    value: "选项1",
                    label: "暂无"
                }],
                value: '',
                selectOptions: '',
                publicSelcet:{
                    glassesTypeOptions:[{
                        name:'',
                        id:''
                    }],
                    glassesTypeModel:null,
                    comTypeOptions:[],
                    comTypeModel:null,
                    processMemoOptions:[],
                    processMemo:null,
                    specialMemoOptions:[],
                    specialMemo:null,
                },
                orderTemp:{
                    memberId:'',
                    prescriptionsId :'',
                    urgent:false,
                    glassesTime:'',
                    glassesType:'',
                    glassesCompany:'',
                    glassesAddress:'',
                    saleMemo:'',
                    processMemo:'',
                    specialMemo:'',
                    roundOffFlag:'',
                    couponDetailId:'',
                    process:'0',
                    service:'0',
                    singleSupTime:null,
                },
                optometryId:'',
                optometryTime:'',
                submitNewOptometry:false,//控制 提交验光单子组件传值
                includeOptometryData:null,//保存即将录入验光单信息 作为验光单数据副本
                optometryData:null,//验光单数据
                selectMember:{//选择会员数据集合
                    selectM:'',
                    memberInfo:null
                },
                saleCount:'0',//合计
                receivable:'',//应收金额
                actionSale:0,//活动金额
                numCount:0,//件数
                allDisCount:'',//整单折扣
                memberShipDisCount:'10',//会员折扣
                memberShipDisCountSale:0,//会员折扣抵扣金额
                discountSale:0,//优惠券折扣金额
                selectProductSku:{
                    selectR:'',
                    selectL:'',
                    selectSP:'',
                    productSkuData:'',
                    cylinder:'',
                    title:'',
                    count: 0,
                    nub: 0,
                    size: 5
                },
                tableData:[],//用户保存商品信息
                //以下为控制modal弹框变量
                isSubmit: false,
                reprint:false,
                endorsement:false,
                loginUserPermission:false,
                permission:false,
                pendingOrders:false,
                CouponBarCode:false,
                otherExpense:false,
                packageGoods:false,
                customizeRH:false,
                addMember:false,
                isNotMember:false,
                showGetBill:false,
                showSelectShop:false,
                showSelectRH:false,
                showNewOptometry:false,
                isOptometryDialogVisible:false,
                showSelectMember:false,
            }
        },
        components:{
            SelectMemberModal,
            NewOptometryModal,
            SelectRHModal,
            SelectShopModal,
            GetBill,
            CustomizeRHModal,
            PackageGoodsModal,
            OtherExpenseModal,
            CouponBarCodeModal,
            EndorsementModal,
            ReprintModal,
            AddMember
        },
        methods:{
            //双击删除表格td
            delThisRow(row, event){
                this.tableData.forEach(function(element,index) {
                    if(element==row){
                        this.tableData.splice(index,1)
                    }
                }, this);
            },
            //取镜公司地点
            sameComType(value){
                this.orderTemp.glassesAddress=value
            },
            //获取取镜公司
            getCompanyList(){
                var that = this;
                that.$axios({
                    url: 'http://myc.qineasy.cn/pos-api/shopBy/getShopByList',
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
                    that.publicSelcet.comTypeOptions=response.data.data.shopByList;
                })  
            },
            //获取公共select options
            getPublicSelect(type,options){
                if(options==''){
                    console.log("1")
                }else{
                    console.log("2")
                }
                var that = this;
                that.$axios({
                    url: 'http://myc.qineasy.cn/cas-api/systemConfig/getSystemConfigList',
                    method: 'post',
                    params: {
                        jsonObject: {
                            pid:'',
                            id:'',
                            type: type    
                            //参数类型（1:订单类型;2:订单状态;3:加工备注;4:特殊备注;5:取镜方式,6费用）                 
                        },
                        keyParams: {
                            weChat: true,
                            userId: '8888',
                            orgId: '11387'
                        }
                    }
                })
                .then(function (response) {                    
                    that.selectOptions=response.data.data.list;
                })   
            },
            //选择镜片 商品
            selectGlass(type){
                var that=this;
                if(type&&type==1){
                    this.selectProductSku.cylinder='';
                    this.selectProductSku.title="选择右镜片";
                    this.selectProductSku.cylinder=that.selectProductSku.selectR;
                }else if(type==2){
                    this.selectProductSku.cylinder='';
                    this.selectProductSku.title="选择左镜片"
                    this.selectProductSku.cylinder=that.selectProductSku.selectL;
                }else if(type==3){
                    this.selectProductSku.cylinder='';
                    this.selectProductSku.cylinder=that.selectProductSku.selectSP;
                }else if(type==null){
                }else{
                    this.selectProductSku.cylinder='';
                }
                that.$axios({
                    url: 'http://myc.qineasy.cn/pos-api/productSku/list',
                    method: 'post',
                    params: {
                        jsonObject: {
                            sphere:'',
                            cylinder:this.selectProductSku.cylinder,
                            addLight:'',
                            color:'',
                            colorCode:'',
                            categoryCode:'',
                            product:'',
                            wareh:'',                         
                            nub: (this.selectProductSku.nub==0?0:(this.selectProductSku.nub-1)*this.selectProductSku.size),
                            size: this.selectProductSku.size
                        },
                        keyParams: {
                            weChat: true,
                            userId: '8888',
                            orgId: '11387'
                        }
                    }
                })
                .then(function (response) {
                    that.selectProductSku.productSkuData=response.data.data;
                })                 

            },
            getProductSku(info){
                this.$nextTick(() => {  
                    this.selectProductSku.nub=info.nub;
                    this.selectGlass();
                });  
            },
            selectSku(value){
                var _this= this;
                _this.tableData.push(value);
                _this.showSelectRH = false;
                _this.customizeRH = false;
                _this.showSelectShop = false;
                let countSale = 0; 
                for(let i=0;i<_this.tableData.length;i++){
                    let thisSale = _this.tableData[i].discount/10 * parseFloat(_this.tableData[i].realSale);
                    countSale = countSale+thisSale
                }
                //优惠价 = 无折扣前 - 优惠价↓
                countSale = countSale - this.actionSale;
                //会员价 = 会员价格 * 总价↓
                var difference = (parseFloat(this.memberShipDisCount)*countSale/10).toFixed(2); 
                //会员折扣差价 = 总金额 - 会员价↓
                let memberDisCount = (countSale - difference).toFixed(2);
                this.memberShipDisCountSale = memberDisCount
                countSale = countSale - parseFloat(memberDisCount); 
                //无整单折扣情况下↓
                this.saleCount = countSale.toFixed(2);

                console.log(_this.tableData)
            },
            changePrice(value,type){
                if(type==1){
                    value.realSale=value.price/value.discount/10
                }else{
                    value.realSale=value.price/value.discount*10
                }
            },
            //获取用户最后一次验光单信息
            getOptometryRecord() {
                var that = this;
                that.$axios({
                url: 'http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptionsLately',
                method: 'post',
                params: {
                    jsonObject: {
                        memberId: '2222767'
                    },
                    keyParams: {
                        weChat: true
                    }
                }
                })
                .then(function (response) {
                    if(response.data.code==1&&response.data.data.eyes.length>0){
                        that.showSelectMember=false;
                        that.isOptometryDialogVisible=true;
                        that.optometryData=response.data.data.eyes;
                        that.optometryId=response.data.data.prescriptions.prescriptionId;
                        that.optometryTime=response.data.data.prescriptions.prescriptionTime;
                    }
                })
                .catch(function (error) {
                    console.info(error)
                })
            },
            //选择会员子组件返回函数 获取用户信息
            getMemberInfo(value){
                this.selectMember.memberInfo=value
                this.memberShipDisCount=this.selectMember.memberInfo.discount;
                if(value){
                    this.getOptometryRecord();
                }
            },
            //整单折扣
            afterDiscount(){
                if(this.allDisCount!='' && this.allDisCount != 0 ){//有整单折扣
                    //整单折扣金额差价 = 折扣前 - 折扣后↓
                    console.log(`计算`)
                    this.discountSale = this.saleCount - (this.allDisCount*this.saleCount)/10;   
                    //最后价格 = 整单折扣前 * 折扣 ↓
                    this.saleCount = (this.allDisCount/10 * this.saleCount).toFixed(2); 
                }
                this.permission=true;
            },
            //获取新增验光单信息
            getNewoptometry(value){
                this.showNewOptometry=false;
                this.optometryData=value.eyes;
                this.optometryId=value.prescriptions.prescriptionId;
                this.optometryTime=value.prescriptions.prescriptionTime;
                this.includeOptometry();
            },
            //录入验光单信息
            includeOptometry(){
                var that=this;
                if(that.optometryData!=null){
                    var tableArr=[];
                    that.optometryData.forEach(element => {
                        // console.log(object.keys(element.value[0]))
                        var tArr=[];
                        var keys=[];
                        var lData=[];
                        var rData=[];
                        for(var item in element.value[1]){
                            delete element.value[0].leftRight;
                            delete element.value[0].perscriptionType;
                            delete element.value[0].prescriptionId;
                            delete element.value[0].prescriptionEye;
                            delete element.value[1].prescriptionEye;
                            delete element.value[1].leftRight;
                            delete element.value[1].perscriptionType;
                            delete element.value[1].prescriptionId;
                            
                            tArr.push(
                                {
                                    keys:item,
                                    lData:element.value[0][item],
                                    rData:element.value[1][item]
                                }
                            )
                        }
                        var name;
                        switch (element.key) {
                            case '0':
                                name='检影';
                                break;
                            case '1':
                                name='主观';
                                break;
                            case '2':
                                name='远用';
                                break;    
                            case '3':
                                name='近用';
                                break;    
                            case '4':
                                name='渐进';
                                break;     
                            case '5':
                                name='隐形';
                                break;                                                       
                            default:
                                break;
                        }
                        tableArr.push({item:tArr,name:name})
                    });
                    that.includeOptometryData=tableArr;
                }
            },
            //添加会员 子组件返回事件 提交表单信息
            memberAddSubmit: function (formdata) {
            //data为从子组件取到的数据
                var that = this;
                that.isSubmit = !that.isSubmit;
                if (formdata.name != '' && formdata.telphone != '' && formdata.birthday != '' && formdata.sex != '') {
                    that.$axios({
                        url: 'http://myc.qineasy.cn/member-api/member/addMember',
                        method: 'post',
                        params: {
                            jsonObject: formdata,
                            keyParams: {
                                weChat: true,
                                userId: "8888",
                                orgId: "11387"
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
                            that.addMember = false;
                            that.MemberInfoForAdd(response.data.data.memberId)
                            that.$message({
                                showClose: true,
                                message: '新增会员成功',
                                type: 'success'
                            });
                        }
                    })
                    .catch(function (error) {
                        console.info(error)
                        that.$message({
                            showClose: true,
                            message: error,
                            type: 'error'
                        })
                    })
                } else {
                    that.$message({
                        showClose: true,
                        message: '请输入完整信息',
                        type: 'error'
                    })
                }
            },
            //新增验光单后获取用户信息录入到页面
            MemberInfoForAdd(memberId){
                var that=this;
                that.$axios({
                    url: 'http://myc.qineasy.cn/member-api/member/getMemberListByBoYang',
                    method: 'post',
                    params: {
                        jsonObject: {
                            seachCode:memberId
                        },
                        keyParams: {
                            weChat: true,
                            userId: '8888',
                            orgId: '11387'
                        }
                    }
                })
                .then(function (response) {
                    if(response.data.code==1){
                        that.getMemberInfo(response.data.data.memberList[0])
                    }else{
                        that.$message({
                            showClose: true,
                            message: '会员信息获取失败',
                                type: 'error'
                        })
                    }
                })    
            },
            //开单
            addOrderTemp(){
                var that=this;
                if(this.selectMember.memberInfo==null){
                    that.$message({
                        showClose: true,
                        message: '会员信息获取失败',
                            type: 'error'
                    })                    
                    return false;
                }
                if(!this.optometryId){
                    that.$message({
                        showClose: true,
                        message: '验光单信息获取失败',
                            type: 'error'
                    })                    
                    return false;
                }
                var orderItemsList=[];
                for(var item in this.tableData){
                    orderItemsList.push({
                        itemId:this.tableData[item].sku,
                        itemName:this.tableData[item].skuName,
                        proMemo:this.tableData[item].skuName,
                        quantity:1,
                        discountRate:this.tableData[item].discount,
                        orderPromotionId:'',
                        money:this.tableData[item].realSale
                    })
                }
                if(orderItemsList==''){
                    that.$message({
                        showClose: true,
                        message: '商品信息获取失败',
                            type: 'error'
                    })                        
                    return false;
                }
                var jsonObject=
                {
                    memberId : this.selectMember.memberInfo.memberId,
                    prescriptionsId  : this.optometryId,
                    urgent : this.orderTemp.urgent,
                    glassesTime : this.orderTemp.glassesTime,
                    glassesType : this.orderTemp.glassesType,
                    glassesCompany : this.publicSelcet.comTypeModel,
                    glassesAddress : this.orderTemp.glassesAddress,
                    saleMemo : this.orderTemp.saleMemo,
                    processMemo : this.publicSelcet.processMemo,
                    specialMemo : this.publicSelcet.specialMemo,
                    roundOffFlag : this.orderTemp.roundOffFlag,
                    couponDetailId : this.orderTemp.couponDetailId,
                    process : this.orderTemp.process,
                    service : this.orderTemp.service,
                    orderItemsList:orderItemsList
                }
                console.log(jsonObject);
                debugger;
                that.$axios({
                    url: 'http://myc.qineasy.cn/pos-api/orderTemp/addOrderTemp',
                    method: 'post',
                    params: {
                        jsonObject: jsonObject,
                        keyParams: {
                            weChat: true,
                            userId: '8888',
                            orgId: '11387'
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
                        that.$message({
                            showClose: true,
                            message: '开单成功',
                            type: 'success'
                        });
                    }
                })                   
            }
        },
        computed:{
            // mustNumberForReceivable:{
            //     get:function(){
            //     return this.receivable;
            //     },
            //     set:function(newValue){
            //         console.log(1)
            //         this.receivable = newValue.replace(/[^\d]/g,'');
            //     }
            // }
        },
        watch:{
            // receivable:function(){
            //     console.log(1)
            //     this.receivable = this.receivable.replace(/[^\d]/g,'');
            // }
        }
    };
</script>

<style lang="scss">
    @import "../../../reset";
    @import "billing";

    .setNum{
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button{
            -webkit-appearance: none !important;
            margin: 0; 
        }
        input[type="number"]{-moz-appearance:textfield;}
    }
</style>