<template>
<div class="content_box flexH100">
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
                        <el-input class="" placeholder="输入会员卡号/手机号"></el-input>
                        <el-button >最近会员</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="salesclerkParam">
                <el-form ref="form">
                    <el-form-item label="右镜片 :" class="ParamInput">
                        <el-input class="" placeholder=""></el-input>
                        <el-button @click="showSelectRH=true">···</el-button>
                        <el-button @click="customizeRH=true">定做</el-button>
                    </el-form-item>
                    <el-form-item label="左镜片 :" class="ParamInput">
                        <el-input class="" placeholder=""></el-input>
                        <el-button @click="showSelectRH=true">···</el-button>
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
                    style="width: 100%;margin-bottom:10px;">
                    <el-table-column
                    prop="suggest"
                    label="建议配镜"
                    width="600px">
                        <template slot-scope="scope">
                            <span v-html="scope.row.suggest"></span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="num"
                    label="数量">
                        <template slot-scope="scope">
                            <span class="am-ft-bold">
                                {{scope.row.num}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="originalCost"
                    label="原单价">
                    </el-table-column>
                    <el-table-column
                    prop="discount"
                    label="折扣"
                    width="100px">
                        <template slot-scope="scope">
                            <el-input class="" placeholder="" :value="scope.row.discount"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="realSale"
                    label="实售单价"
                    width="100px">
                        <template slot-scope="scope">
                            <el-input class="" placeholder="" :value="scope.row.realSale"></el-input>
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
                <el-button type="primary" @click="showSelectMember=true">添加会员</el-button>
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
        <SelectMemberModal></SelectMemberModal>
    </el-dialog>
    <el-dialog class="newOptometry" title="新增验光单" :visible.sync="showNewOptometry" width="900px">
        <NewOptometryModal></NewOptometryModal>
        <div class="packageDetailButtonGroup">
            <el-button @click="showNewOptometry = false">取 消</el-button>
            <el-button type="primary" @click="showNewOptometry = false">保 存</el-button>
        </div>
    </el-dialog>
    <el-dialog class="selectRH" title="选择右镜片" :visible.sync="showSelectRH">
        <SelectRHModal></SelectRHModal>
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
        custom-class="am-ft-center"
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
    <el-dialog class="reprint" title="签批 (5)" :visible.sync="reprint" width="900px">
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
                {
                    suggest    : '右镜片：毛源昌1.55非球面防辐射远+1.50',
                    num   : '1',
                    originalCost   : '134.00',
                    discount    : '10.0',
                    realSale:'134.00'
                },
                {
                suggest    : '左镜片：<div class="am-ft-blue fn-line">定做 DZ12340001</div> - 柱镜0.5  球镜0.5  下加光0.3  定做需求：需求内容',
                num   : '1',
                originalCost   : '134.00',
                discount    : '10.0',
                realSale:'134.00',
                },
                {
                suggest    : '镜架：LEVIS光学镜架',
                num   : '1',
                originalCost   : '134.00',
                discount    : '10.0',
                realSale:'134.00',
                },
                {
                suggest    : '眼镜辅助产品：毛源昌镜布(普通)',
                num   : '1',
                originalCost   : '134.00',
                discount    : '10.0',
                realSale:'134.00',
                },
                {
                suggest    : '眼镜辅助产品：毛源昌镜盒',
                num   : '1',
                originalCost   : '134.00',
                discount    : '10.0',
                realSale:'134.00',
                },
                {
                suggest    : '医学费用：验光费',
                num   : '1',
                originalCost   : '134.00',
                discount    : '10.0',
                realSale:'134.00',
                }],
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
            showModal:function(){

            }
        }
    };
</script>

<style lang="scss">
    @import "../../../reset";
.el-badge{
vertical-align: unset;
margin-left: 10px;
}
.reprint{
    .el-dialog__footer{
        background: #eee;
    }
}
.receiptsData{
    text-align: left;
    padding: 12px;
    padding-left: 28px;
    line-height: 18px;
    background: #f8f8f8;
    h4{
        font-size: 12px;
        color: #666666;
        margin-bottom: 7px;
    }
    p{
        font-size: 12px;
        color: #888888;
    }
}
.addMember,.customizeRH{
    .el-dialog__body{
        padding:0;
    }
}
.noheader{    
    .el-dialog__body{
        padding: 0;
        padding-top: 40px;
        padding-bottom: 10px;
    }
    .el-dialog__footer{
      padding-bottom: 40px;
    }
}
.borderfff{
    border:2px solid #fff;
}
.boldText{
    font-size: 12px;
    color: #000000;
    font-weight: bold;
    input{
        text-align: right;
    }
}
.modal_ef{
    background: #efefef;
}
.textCenter{
    text-align: center;
}
.textLeft{
    text-align: left !important;
}
.borderNone{
    border: none;
}
.am-ft-center{
    .el-dialog__body{
        text-align: center;
    }
}
.content_box{
    // height: calc(100% - 30px) !important;
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: row;
    .billingInfo{
        display: flex;
        flex-direction: column;
        overflow: hidden;
        flex: 3;
        float: left;
        min-width: 992px;
        .salesclerkInfo{
            background: #B3E3F6;
            height:40px;
            display: flex;
            align-items: center;
            padding-left: 18px;
            .el-form{
                margin-right: 40px;
                .el-form-item{
                    float: left;
                    margin-bottom: 0 !important;
                }
                .el-form-item__label{
                    float: left;
                    line-height: 28px;
                    margin-right: 10px;
                }
                .el-form-item__content{
                    line-height: 28px;
                    float: left;
                }
            }
        }
        .salesclerkParam{
            width: 100%;
            height: 68px;
            background: #fff;
            overflow: hidden;
            display: flex;
            align-items: center;
        }
    }
    .memberInfo{
        height: 100%;
        min-width: 248px;
        max-width: 250px;
        flex: 1;        
        overflow: hidden;
        .memberTop,.eyeglassTop{
            background: #F7F7F7;
            height: 40px;
            line-height: 40px;
            overflow: hidden;
            padding: 0 8px;
            label{
                font-size: 14px;
                color: #666666;
                float: left;
                margin-bottom:0; 
                font-weight: bold;
            }
            button{
                float: right;
                background: #FFFFFF;
                border: 1px solid #C7C7C7;
                height: 24px;
                padding: 0px 10px;
                border-radius: 4px;
                font-size: 12px;
                color: #666666;
                margin-top: 8px;
            }
        }
        .addMember{
            max-height: 280px;
            flex: 1;
            .memberBottom{
                background: #fff;
                padding-bottom: 15px;
                .memberName{
                    .memberTx{
                        font-size: 18px;
                        color: #666666;
                        position: relative;
                        padding: 8px;
                        img{
                            width: 22px;
                            height: 22px;
                            margin-right: 6px;
                        }
                        p{
                            display: flex;
                            align-items: center;
                            line-height: 100%;
                            text-align: center;
                            justify-content: center;
                            font-weight: bold;
                        }
                        span{
                            position: absolute;
                            right: 10px;
                            top: calc(50% - 11px);
                            height: 100%;
                            line-height: 100%;
                        }
                    }
                }
                .cardLevel{
                    height: 25px;
                    line-height: 25px;
                    margin-bottom: 10px;
                    text-align: center;
                    span{
                        padding: 0.5px 9px;
                        border: 1px solid #FF9400;
                        border-radius: 4px;
                        font-size: 12px;
                        color: #FF9400;
                    }
                }
                .consume{
                    overflow: hidden;
                    .consumeItem{
                        float: left;
                        width: 30%;
                        text-align: center;
                        span{
                            font-size: 18px;
                            color: #666666;
                        }
                        p{
                            font-size: 12px;
                            color: #AAAAAA;
                        }
                        &:nth-of-type(2){
                            width: 40%;
                            padding: 0 10px;
                            border-left: 1px solid #E1E1E1;
                            border-right: 1px solid #E1E1E1;
                        }
                    }
                }
                .basicInformation{
                    margin-top: 15px;
                    line-height: 26px;
                    .basicInformationItem{
                        padding: 0 18px;
                        background: rgba(246,246,246,0.50);
                        label{
                            font-size: 12px;
                            color: #666666;
                            margin-right: 10px;
                            font-weight: 400;
                        }
                        span{
                            font-size: 13px;
                            color: #333333;
                        }
                        &:nth-of-type(2){
                            background: #fff;
                        }
                    }
                }
            }
        }
        .eyeglassBills{
            height: calc(100% - 273px);
            flex: 4;
            display: flex;
            flex-direction: column;
            .eyeglassTop{
                min-height: 40px;
                max-height: 40px;
                flex: 1;
            }     
            .selectEyeglass{
                min-height: 28px;
                max-height: 28px;
                flex: 1;
            }       
            .eyeglassTable{
                overflow-y: scroll;
            }
        }
    }
}
.salesclerkInfo .el-date-editor{
    box-shadow: none !important;
    max-width: 120px;
    input{
        background-color: #b3e3f6 !important;
    }
}
.salesclerkInfo input{
    border:none;
}
.salesclerkInfo .el-select{
    max-width: 100px;
    line-height: 28px;
    input{
        background: #b3e3f6 !important;
        box-shadow: none !important;
    }
}
.memberInput{
    .el-form-item__content{
        float: left;
        width: auto;
        height: 30px;
        line-height: 30px;
    }
    .el-input{
        float: left;
        input{
            background: #F8F8F8;
            border: 1px solid #CCCCCC;
            height: 30px;
            line-height: 30px;
            border-right:none; 
            border-radius: 0;
            box-shadow: none !important;
            
        }
    }
    button{
        background: #F8F8F8;
        border: 1px solid #E1E1E1;
        font-size: 12px;
        color: #666666;
        float: left;
        height: 30px;
        border-radius: 0;
        padding: 0 15px;
    }
}
.salesclerkParam .ParamInput{
    float: left;
    margin-right: 10px;
    margin-bottom: 0;
    &:first-child{
        margin-left: 18px;
    }
    .el-form-item__label{
        margin-right: 10px;
        line-height: 30px;
        float: left;
        .ant-form-item{
            margin-bottom: 0;
        }
    }
    .el-form-item__content{
        line-height: 28px;
        float: left;
        .el-input{
            float: left;
        }
    }
    input{
        background: #F8F8F8;
        width: 110px;
        height: 30px;
        line-height: 30px;
        border-radius: 0;
        box-shadow: none !important;
        border-right: none;
    }
    button{
        width: 30px;
        border: 1px solid #E1E1E1;
        background: #F8F8F8;
        font-size: 12px;
        color: #666666;
        float: left;
        height: 30px;
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
        &:last-child{
            margin-left: 5px;
            width: 40px;
            background: #fff;
            border: 1px solid #C7C7C7;
            border-radius: 4px;
        }
    }
}
.salesclerkParam .ParamButton{
    button{
        padding-left: 5px;
        padding-right: 5px;
        width: auto !important;
        background: #FFFFFF;
        border: 1px solid #C7C7C7;
        border-radius: 4px;
    }
}
.salesSuggest{
    .el-table{
        margin-bottom: 0 !important;
    }
    th{
        background: #b3e3f6;
        text-align: center;
        padding: 11px 8px !important;
    }
    td{
        text-align: center;
        padding: 8.5px 8px;
    }
    tr:nth-of-type(even){
      background: rgba(246,246,246,0.50);  
    }
    tr td:first-child,tr th:first-child{
        text-align: left;
        padding-left: 18px;
    }
    .settleAccounts{
        height: 67px;
        background: #fff;
        padding: 0 18px;
        text-align: right;
        p{
            line-height: 30px;
            span{
                margin-right: 10px;
                color: #666666;
            }
            b{
                font-weight: bold;
                font-size: 12px;
                color: #000;
                margin-left: 5px;
            }
        }
    }
}
.salesDiscount{
    padding: 8px 18px;
    height: 65px;
    max-height: 65px;
    background: #FAFAFA;
    overflow: hidden;
    .ParamButton{
        float: left;
        margin-right: 5px;
        margin-bottom: 0;
        button{
            margin-top: 15px;
            padding: 0 15px;
            height: 32px;
            background: #FFFFFF;
            border: 1px solid #C7C7C7;
            border-radius: 4px;
            font-size: 14px;
            color: #666666;
        }
    }
    .fn-left.singleDiscount{
        p{
            margin-left: 15px;
            margin-right: 5px;
            float: left;
            input{
                width: auto;
            }
            span{
                margin-right: 5px;
            }
            &:first-child input{
                width: 60px;
                margin-top: 15px;
            }
        }
    }
    .fn-right.singleDiscount{
        p{
            margin-right: 5px;
            float: left;
            nz-input{
                width: auto;
            }
            input{
                width: auto;
            }
            span{
                margin-right: 5px;
            }
            // &:first-child input{
            //     margin-top: 20px;
            // }
            &:last-child input,&:last-child .ant_text{
                min-width: 60px;
                max-width: 120px;
                height: 50px !important;
                font-size: 32px;
                color: #FF9400;
                text-align: right;
                font-weight: bold;
                display: inline-block;
            }
        }
    }
}
.orderType{
    padding: 14px 18px;
    max-height: 100px;
    height: 100px;
    background: #fff;
    .el-form-item{
        float: left;
        margin-right: 10px;
        margin-bottom: 0;
        .el-form-item__label{
            font-size: 12px;
            color: #666666;
            margin-bottom: 0;
            font-weight: 400;
            float: left;
            margin-right: 10px;
        }
        .el-form-item__content{
            line-height: 40px;
            float: right;
            white-space: nowrap;
            input{
                max-width: 150px;
            }
            p{
                overflow: hidden;
                text-overflow: ellipsis;
                color: rgba(0, 0, 0, 0.65);
                font-size: 12px;
            }
        }
        .el-date-editor{
            width: auto;
        }
    }
}
.buttonGroup{
    margin-top: 10px;
    height: 70px;
    max-height: 70px;
    line-height: 70px;
    background: #fff;
    padding-left: 9px;
    padding-right: 21px;
    .fn-left{
        button{
            background: #FFFFFF;
            border: 1px solid #C7C7C7;
            border-radius: 4px;
            font-size: 14px;
            color: #666666;
            min-width: 70px;
            height: 50px;
            padding: 0 15px;
        }
    }
    .fn-right{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        button{
            height: 60px;
            width: 120px;
            margin-right: 5px;
            padding: 0 15px;
            &:not(:last-child){
                background: #FFFFFF;
                border: 1px solid #C7C7C7;
                font-size: 20px;
                color: #666666;
            }
            &:last-child{
                font-size: 20px;
            }
        }
    }
    .el-badge__content.is-fixed{
        top: 10px;
    }
}

.memberInfo{
    .selectEyeglass{
        width: 100%;
        .el-select{
            width: 100%;
            input{
                width: 100%;
                border:none;
                box-shadow: none !important;
                background-color: #f7f7f7 !important;
            }
        }
    }
    .eyeglassTable{
        .el-table__header{
            width: auto !important;
        }
        table{
            width: auto !important;
        }
        th{
            background: #fff !important;
            text-align: center;
            padding: 7px 8px !important;
        }
        td{
            text-align: center;
            padding: 8.5px 8px;
        }
        tr:nth-of-type(even){
          background: rgba(246,246,246,0.50);  
        }        
    }
}
.oldGlassMess{
    .oldGlassMessBox{
        padding: 10px;
        overflow: hidden;
        p{
            float: left;
        }
        span{
            font-size: 12px;
            color: #00AFE4;
            float: right;
        }
    }
}
.flex1{
    flex: 1;
}
.flex3{
    flex: 3;
}
@media only screen and (max-width: 1350px) {
    .buttonGroup{
        .fn-left{
            button{
                padding: 0 10px;
            }
        }
        .fn-right{
            button{
                width: 80px !important;
                font-size: 16px !important;
                padding: 0;
            }
        }
    }			
}
@media only screen and (min-height: 790px) {
    .salesSuggest .el-table{
        max-height: 300px !important;
        overflow-y: scroll;
    }		
}

//modal
.comfirmModal{
    .el-dialog__body{
        padding: 0;
    }
    .noheader .el-dialog__footer {
        padding-bottom: 40px;
    }
    .permissionBox{
        .textareaBox{
            width: 80%;
            margin: 0 auto;
            overflow: hidden;
            margin-top: 10px;
            i{
                float: left;
                width: 20px;
                text-align: center;
            }
            .el-textarea{
                width: calc(100% - 20px);
                float: left;
            }
        }
    }
}
.endorser{
    padding: 2px 0;
    width: 200px;
    li{
        padding: 0 24px;
        overflow: hidden;
        height: 36px;
        line-height: 36px;
        font-size: 13px;
        span{
            float: left;
        }
        p{
            color: #333333;
            margin-left:40px;
            float: left;
        }
        &:hover{
            background: #E8F6FC;
        }
    }
}

.totalCount{
    position: absolute;
    bottom: 24px;
    left: 30px;
}
#selectShop{
    .modalFormGroup{
        padding: 10px;
        label{
            font-size: 12px;
            color: #555555;
            margin-left: 18px;
            float: left;
            height: 28px;
            line-height: 28px;
            margin-right: 18px;
        }
        nz-input,nz-select{
            float: left;
            width: 120px;
            margin-right: 10px;
        }
        button{
            width:80px;
            border: 1px solid #00AFE4;
            border-radius: 4px;
            height: 28px;
        }
    }
}
.packageGoods{
    .packageDetailButtonGroup{ 
        .el-checkbox__label{
            font-size: 12px;
        }
    }  
}
.loginEndorserButton{
    button{
        width: 80px;
        &:last-child{
            background: #00AFE4;
            border: none;
        }
    }
}

#salesReturn{
    .modal-content{
        width: 460px;
        margin: 0 auto;
    }
    .salesReturnContent{
        overflow: hidden;
        .returnFormItem{
            line-height: 30px;
            margin-bottom: 14px;
            overflow: hidden;
            label{
                width: 80px;
                text-align: right;
                margin: 0;
                vertical-align: top;
                float: left;
                i{
                    vertical-align: middle;
                }
            }
            nz-input{
                float: left;
            }
            .returnFormItemButton{
                float: left;
                button{
                    width: 80px;
                    height: 30px;
                    line-height: 30px;
                    margin-right: 18px;
                    &:last-child{
                        background: #00AFE4;
                        border: none;
                    }
                }
            }
        }
    }
}

@media only screen and (max-width:1270px){
    .packageList{
        .packageItem{
            height: 111px*0.8 !important;
            line-height: 30px*0.8 !important;
            p{
                font-size: 36px*0.8 !important;
                i{
                    font-size: 20px*0.8 !important;
                }
            }
            h4{
                font-size: 18px*0.8 !important;
            }
            h5{
                font-size: 12px*0.8 !important;
            }
        }
    }
}

.glass_combination_table {
    border: 1px solid #E1E1E1;
}

.glass_table_head {
    width: 850px;
    height: 30px;
    line-height: 30px;
    font-weight: bold;
    text-align: center;
    font-size: 12px;
    color: #555555;
    letter-spacing: 0;
}

.glass_table_770 {
    width: 770px;
}

.glass_table_2x{
    input{
        padding: 33px 0;
        text-align: center;
    }
}

.glass_table_head li {
    float: left;
}

.glass_table_770 td {
    text-align: center;
}

.glass_table_770 table tr {
    height: 40px;
    line-height: 40px;
}

.glass_table_770 tr.dis_bg td {
    background: rgba(246, 246, 246, 0.50);
}

.glass_table_770 table {
}

.border_bottom {
    border-bottom: 1px solid #EFEFEF;
}

.border_left {
    border-left: 1px solid #EFEFEF;
    border-bottom: 1px solid #D2D2D2;
}

.msg_left {
    width: 80px !important;
    height: 82px;
    line-height: 82px;
    text-align: right;
    padding-right: 22px;
}

.combination_table_list {
    background: #fff;
    // margin-top: 13px;
    &:last-child{
        padding-bottom: 20px;
    }
}

.labelInput{
    float: left;    
    line-height: 82px;
    height: 82px;
    label{
        min-width: 50px;
    }
    nz-input{
        width: 80px;
        padding:0; 
    }
}
.lineHeightAuto{
    line-height: 1 !important;
    height: auto !important;
}

.breakMsg{
    line-height: 20px;
    text-align: right;
    padding-right: 22px;
    margin-top: 20px;
    height: auto;
}

.wid80 {
    width: 80px !important;
}

.glass_old {
    height: 40px;
    margin-top: 24px;
}

.glass_old .data_li,
.eye_healthy .data_li {
    float: left;
    padding: 0 20px;
    color: #333333;
}

.eye_healthy {
    height: 40px;
}

.glass_old .data_li span,
.eye_healthy .data_li span {
    color: #666666;
    padding: 0 5px;
}

.over_scroll {
    overflow: auto;
}

.combination_footer {
    margin: 10px 0 10px 80px;
    height: 40px;
    line-height: 40px;
}

.combination_footer li {
    padding: 0 20px;
    font-size: 12px;
    color: #333333;
}

.combination_footer li span {
    color: #666666;
    padding: 0 5px;
}

.optometry_remarks {
    line-height: 20px;
}

.optometry_remarks_text {
    width: 670px;
    line-height: 20px;
    color: #333333;
    padding: 0 3px;
}

.optometry_origin,
.optometrist {
    color: #666666;
    line-height: 20px;
    margin-right: 30px;
}

.optometry_origin span,
.optometrist span {
    color: #333333;
    line-height: 20px;
    padding: 0 3px;
}
</style>