<template>
<div class="billing content_box flexH100">
    <div class="billingInfo">
        <div class="borderfff flex1">
            <div class="salesclerkInfo">
                <el-form ref="form">
                    <el-form-item label="销售员 :">
                        <el-select size="mini" v-model="value" placeholder="请选择">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="补单日期 :">
                        <el-date-picker
                        align="left"
                        type="date"
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
                        <el-input class="" placeholder=""></el-input>
                        <el-button @click="showSelectShop=true">···</el-button>
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
                        <span>共计 :<b>6件</b></span>
                        <span>合计 :<b>498.00元</b></span>
                    </p>
                    <p>
                        <span>促销活动 : 圣诞配镜大促<b>－20元</b></span>
                        <span>折扣 :<b>5折(-20元)</b></span>
                        <span>会员折扣 : 8.8折  <b>－20元</b></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="salesDiscount flex1">
            <div class="fn-left">
                <el-form ref="form">
                    <el-form-item class="ParamButton">
                        <el-button @click="CouponBarCode=true">折扣券</el-button>
                    </el-form-item>
                    <el-form-item class="ParamButton">
                        <el-button>优惠券</el-button>
                    </el-form-item>
                    <el-form-item class="ParamButton">
                        <el-button >促销活动</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="fn-left singleDiscount">
                <p><span>整单折扣 :</span>
                <el-input class="" placeholder="" @change="permission=true"></el-input> 折
                </p>
            </div>
            <div class="fn-right singleDiscount">
                <!-- <p><span>整单折扣 :</span><el-input class="" placeholder=""></el-input></p> -->
                <p>
                    <span>应收 :</span>
                    <el-input class="" placeholder=""></el-input>
                    <!-- <span class="ant_text">1999.00</span> -->
                </p>
            </div>
        </div>
        <div class="orderType flex1">      
            <el-form ref="form">
                <el-form-item>
                    <el-checkbox>备选项</el-checkbox>
                </el-form-item>
                <el-form-item label="取镜时间 :">
                    <el-date-picker
                    align="left"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="取镜方式 :">
                    <el-select size="mini" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="取镜公司 :">
                    <el-select size="mini" v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="取镜地点 :">
                    <p>西湖区建国北路211号</p>
                </el-form-item>
                <el-form-item>
                    <el-input class="" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select size="mini" v-model="value" placeholder="加工备注">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select size="mini" v-model="value" placeholder="特殊备注">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
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
                <el-button type="primary">开单[F5]</el-button>
            </div>
        </div>
    </div>
    <div class="memberInfo mgl10">  
        <div class="addMember borderfff">
            <div class="memberTop">
                <label>会员</label>
                <el-button type="primary">添加会员</el-button>
            </div>
            <div class="memberBottom">
                <div class="memberName">
                    <div class="memberTx">
                        <p>
                            <img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_touxiang.png"/>张丽丽
                        </p>
                        <span>···</span>
                    </div>
                    <div class="cardLevel">
                        <span>金卡</span>
                    </div>
                </div>
                <div class="consume">
                    <div class="consumeItem">
                        <span>3</span>
                        <p>消费次数</p>
                    </div>
                    <div class="consumeItem">
                        <span>￥10088</span>
                        <p>消费金额</p>
                    </div>
                    <div class="consumeItem">
                        <span>2068</span>
                        <p>积分</p>
                    </div>
                </div>
                <div class="basicInformation">
                    <div class="basicInformationItem">
                        <label>会员卡号 :</label><span>V121222121</span>
                    </div>
                    <div class="basicInformationItem">
                        <label>会员折扣 :</label><span>8.8</span>
                    </div>
                    <div class="basicInformationItem">
                        <label>手机号码 :</label><span>18898989898</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="eyeglassBills borderfff mgt10">
            <div class="eyeglassTop">
                <label>验光单</label>
                <el-button type="primary" @click="isOptometryDialogVisible=true">新增</el-button>
            </div>            
            <div class="selectEyeglass">
                <el-select size="mini" v-model="value" placeholder="请选择">
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
                    :data="glassData"
                    size="small"
                    align="left"
                    style="width: 100%;">
                    <el-table-column
                    prop="yy"
                    label="远用">
                    </el-table-column>
                    <el-table-column
                    prop="l"
                    label="L">
                    </el-table-column>
                    <el-table-column
                    prop="r"
                    label="R">
                    </el-table-column>
                </el-table>       
                <el-table
                    :data="glassData"
                    size="small"
                    align="left"
                    style="width: 100%;">
                    <el-table-column
                    prop="yy"
                    label="远用">
                    </el-table-column>
                    <el-table-column
                    prop="l"
                    label="L">
                    </el-table-column>
                    <el-table-column
                    prop="r"
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
        <span>2017-10-11 15:10:45 验光单号：0001545463476</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="isOptometryDialogVisible = false;showNewOptometry=true">不,我要新增</el-button>
            <el-button type="primary" @click="isOptometryDialogVisible = false">调入</el-button>
        </span>
    </el-dialog>
    <el-dialog class="selectMember" title="选择会员 (23)" :visible.sync="showSelectMember" width="62.5%">
        <SelectMemberModal :selectM="selectMember.selectM" v-on:memberInfo="getMemberInfo"></SelectMemberModal>
    </el-dialog>
    <el-dialog class="newOptometry" title="新增验光单" :visible.sync="showNewOptometry" width="900px">
        <NewOptometryModal></NewOptometryModal>
        <div class="packageDetailButtonGroup">
            <el-button @click="showNewOptometry = false">取 消</el-button>
            <el-button type="primary" @click="showNewOptometry = false">保 存</el-button>
        </div>
    </el-dialog>
    <el-dialog class="selectRH" title="选择右镜片" :visible.sync="showSelectRH">
        <SelectRHModal  v-on:getProductSku="getProductSku" v-on:selectSku="selectSku" :selectProductSku="selectProductSku"></SelectRHModal>
    </el-dialog>
    <el-dialog class="selectShop" title="选择商品" :visible.sync="showSelectShop" width="700px">
        <SelectShopModal></SelectShopModal>
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
    <el-dialog class="addMember" title="添加会员" :visible.sync="addMember" width="800px">
        <AddMember></AddMember>
        <div class="packageDetailButtonGroup">
            <el-button @click="addMember = false">取消</el-button>
            <el-button type="primary" @click="addMember = false">确定</el-button>
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
            <p><span>BM12340002 : 8折</span></p>
            <p><span>BM12340002 : 8折</span></p>
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
    
</div>
</template>

<script>
import SelectMemberModal from '../../PublicModal/SelectMember/select-member-modal.vue'
import NewOptometryModal from '../../PublicModal/NewOptometry/new-optometry-modal.vue'
import SelectRHModal from '../../PublicModal/SelectRH/selectRH-modal.vue'
import SelectShopModal from '../../PublicModal/SelectShop/selectShop-modal.vue'
import GetBill from '../../PublicModal/GetBill/get-bill-modal.vue'
import AddMember from '../../PublicModal/addMember/add-member-modal.vue'
import CustomizeRHModal from '../../PublicModal/customizeRH/customizeRH-modal.vue'
import PackageGoodsModal from '../../PublicModal/PackageGoods/package-goods-modal.vue'
import OtherExpenseModal from '../../PublicModal/OtherExpense/other-expense-modal.vue'
import CouponBarCodeModal from '../../PublicModal/CouponBarCode/couponBar-code-modal.vue'
import EndorsementModal from '../../PublicModal/Endorsement/endorsement-modal.vue'
import ReprintModal from '../../PublicModal/Reprint/reprint-modal.vue'
    export default {
        name: "billing",
        data() {
            return {
                options: [{
                    value: "选项1",
                    label: "选项1"
                }],
                selectMember:{
                    selectM:''
                },
                selectProductSku:{
                    selectR:'',
                    selectL:'',
                    productSkuData:'',
                    cylinder:'',
                    count: 0,
                    nub: 0,
                    size: 5
                },
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
                value: "",
                tableData:[
                ],
                glassData:[
                    {
                    yy : 'SPH',
                    l   : '+1.50',
                    r   : '+1.50'
                    },{
                    yy : 'SPH',
                    l   : '+1.50',
                    r   : '+1.50'
                    },{
                    yy : 'SPH',
                    l   : '+1.50',
                    r   : '+1.50'
                    },{
                    yy : 'SPH',
                    l   : '+1.50',
                    r   : '+1.50'
                    },{
                    yy : 'SPH',
                    l   : '+1.50',
                    r   : '+1.50'
                    },{
                    yy : 'SPH',
                    l   : '+1.50',
                    r   : '+1.50'
                    },{
                    yy : 'SPH',
                    l   : '+1.50',
                    r   : '+1.50'
                    },{
                    yy : 'SPH',
                    l   : '+1.50',
                    r   : '+1.50'
                    },{
                    yy : 'SPH',
                    l   : '+1.50',
                    r   : '+1.50'
                    }
                ]
            }
        },
        components:{
            SelectMemberModal,
            NewOptometryModal,
            SelectRHModal,
            SelectShopModal,
            GetBill,
            AddMember,
            CustomizeRHModal,
            PackageGoodsModal,
            OtherExpenseModal,
            CouponBarCodeModal,
            EndorsementModal,
            ReprintModal
        },
        methods:{
            selectGlass(type){
                var that=this;
                if(type&&type==1){
                    this.selectProductSku.cylinder='';
                    this.selectProductSku.cylinder=that.selectProductSku.selectR;
                }else if(type==2){
                    this.selectProductSku.cylinder='';
                    this.selectProductSku.cylinder=that.selectProductSku.selectL;
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
                this.tableData.push(value)
            },
            changePrice(value,type){
                if(type==1){
                    value.realSale=value.price/value.discount/10
                }else{
                    value.realSale=value.price/value.discount*10
                }
            },
            getOptometryRecord() {
                var that = this;
                that.$axios({
                url: 'http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptionsList',
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
                    // console.info(response.data.data)
                    that.eyesData = response.data.data.eyes; //左右眼数据
                    that.userInfo = response.data.data.prescriptions; //检查数据
                    //检影数据
                    // that.setData()
                })
                .catch(function (error) {
                    console.info(error)
                })
            },
            getMemberInfo(value){
                console.log(value)
            }
        }
    };
</script>

<style lang="scss">
    @import "../../../reset";
    @import "billing";
</style>