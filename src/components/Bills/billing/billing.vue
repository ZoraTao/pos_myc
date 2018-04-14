<template>
<div class="billing content_box flexH100">
    <div class="billingInfo">
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
                            </el-option>                            
                        </el-select>
                    </el-form-item>
                    <el-form-item label="补单日期 :">
                        <el-date-picker
                        v-model="orderTemp.singleSupTime"
                        class="placeHolder"
                        align="left" 
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
                    <el-form-item label="右镜片 :" class="ParamInput">
                        <el-input class="" placeholder="" @input="setWhere('left');" v-model="selectProductSku.selectR" @keyup.enter.native="selectGlass(1);"></el-input>
                        <el-button @click="type='0';selectGlass(1);setWhere('left');">···</el-button>
                        <el-button @click="showTitle('right');customizeRH=true">定做</el-button>
                    </el-form-item>
                    <el-form-item label="左镜片 :" class="ParamInput">
                        <el-input class="" placeholder="" @input="setWhere('right');" v-model="selectProductSku.selectL" @keyup.enter.native="selectGlass(2);"></el-input>
                        <el-button @click="type='0';selectGlass(2);setWhere('right');">···</el-button>
                        <el-button @click="showTitle('right');customizeRH=true">定做</el-button>
                    </el-form-item>
                    <el-form-item label="商品 :" class="ParamInput">
                        <el-input class="" placeholder="" v-model="selectProductSku.selectSP" @keyup.enter.native="type='';selectGlass(3);"></el-input>
                        <el-button @click="type='';selectGlass(3);">···</el-button>
                        <el-button @click="showTitle('shop');customizeRH=true">定做</el-button>
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
                        @delThisRow="delThisRow">
        </vue-context-menu>
        <div class="borderfff mgt5 am_bg_white flex5">
            <div class="salesSuggest">
                <el-table
                    :data="tableData"
                    size="small"
                    align="left"
                    @row-contextmenu="showMenu"
                    style="width: 100%;margin-bottom:10px;min-height:300px">
                    <el-table-column
                    prop="skuName"
                    label="建议配镜">
                        <template slot-scope="scope">
                            <span>
                              {{scope.row.skuName2||scope.row.skuName}}
                              <span v-if="scope.row.status=='1'">
                                <a href="javascript:void(0)" class="readContent">查看详情</a>
                              </span>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    prop="num"
                    label="数量"
                    width="140px">
                        <template slot-scope="scope">
                            <span class="am-ft-bold am-ft-black">
                                {{scope.row.nums}}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column
                    label="原单价"
                    width="140px">
                    <template slot-scope="scope">
                        {{scope.row.price||'--'}}
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="discount"
                    label="折扣"
                    width="140px">
                        <template slot-scope="scope">
                            <el-input class="" placeholder="" v-model="tableData[scope.$index].discount" @change="changePrice(scope.row,1,scope.$index)"></el-input>
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
                                <span class="" placeholder="" >{{tableData[scope.$index].realSale||'--'}}</span>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="settleAccounts">
                    <p>
                        <span>共计 :<b>{{numCount}}件</b></span>
                        <span>合计 :<b v-show="amountSale!=''&amountSale!=0">{{amountSale}}</b><b v-show="amountSale==0">0.00</b></span>
                    </p>
                    <p> 
                        <span>促销活动:无</span>
                        
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
                        <el-button @click="openConpon();">促销活动</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="fn-left singleDiscount">
                <p><span>整单折扣 :</span>
                <el-input class="" placeholder="" v-model="allDisCount" @change="afterDiscount"/> 折
                </p>
            </div>
            <div class="fn-right singleDiscount">
                <!-- <p><span>整单折扣 :</span><el-input class="" placeholder=""></el-input></p> -->
                <p >
                    <span>应收 :</span>
                    <!-- <el-input class="setNum" placeholder='' type="number"  v-model.number="receivable" /> -->
                    <span class="ant_text">{{ saleCount || '0'}}</span>
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
                <div style="overflow:hidden;width:800px;">
                    <el-form-item>
                        <el-input class="" v-model="orderTemp.saleMemo" placeholder="销售备注"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input size="mini" v-model="publicSelcet.processMemo" placeholder="加工备注" @visible-change="getPublicSelect(3,publicSelcet.processMemoOptions)">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input size="mini" v-model="publicSelcet.specialMemo" placeholder="特殊备注" @visible-change="getPublicSelect(4,publicSelcet.specialMemoOptions)">
                        </el-input>
                    </el-form-item>
                </div>
                
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
                <el-button type="primary" @click="resetPage">重置</el-button>
                <el-button type="primary">挂单[F7]</el-button>
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
                <el-button type="primary" @click="showNewOptometry=true">新增</el-button>
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
                    size="small"
                    align="left"
                    style="width: 100%;">
                    <el-table-column
                    :label="value.name">
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
    <el-dialog class="newOptometry" title="新增验光单" :visible.sync="showNewOptometry" width="950px">
        <NewOptometryModal :submit="submitNewOptometry" :memberInfo="selectMember.memberInfo" :showNewOptometry="showNewOptometry" v-on:getNewoptometry="getNewoptometry"></NewOptometryModal>
        <div class="packageDetailButtonGroup">
            <el-button @click="showNewOptometry = false">取 消</el-button>
            <el-button type="primary" @click="submitNewOptometry=true">保 存</el-button>
        </div>
    </el-dialog>
    <el-dialog class="selectRH" :title="selectProductSku.title" :visible.sync="showSelectRH" width="870px">
        <SelectRHModal :where="where"  v-on:getProductSku="getProductSku" v-on:rhtWareHouse="rhtWareHouse" :selectProductSku="selectProductSku" v-on:selectSku="selectSku" ></SelectRHModal>
    </el-dialog>
    <el-dialog class="selectShop" title="选择商品" :visible.sync="showSelectShop" width="700px">
        <SelectShopModal :where="where"  v-on:getProductSku="getProductSku" v-on:rhtWareHouse="rhtWareHouse" :selectProductSku="selectProductSku" v-on:setBuyShop="selectSku" ></SelectShopModal>
    </el-dialog>
    <el-dialog class="customizeRH" :title="customText" :visible.sync="customizeRH" width="690px">
        <CustomizeRHModal v-on:commitCustomMessage="commitCustom"></CustomizeRHModal >
        <!-- <div class="packageDetailButtonGroup">
            <el-button type="primary"  @click="commitCustom();customizeRH = false">确!定</el-button>
        </div> -->
    </el-dialog>
    <el-dialog class="withShopModal" title="自带商品" :visible.sync="withShop" width="600px">
        <withShopModal v-on:commitMessage="withShopCommit"></withShopModal>  
    </el-dialog>
    <el-dialog class="endorsement" title="选择促销活动" :visible.sync="cuActions" width="500px">
        <cuActions></cuActions>
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
        <CouponBarCodeModal :conponData="conponData" :memberMessage="selectMember.memberInfo" @receiveconpon="receiveconpon"></CouponBarCodeModal>
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
                <el-button @click="permission = false;confirmAllDiscount(false);">取消</el-button>
                <el-button type="primary" @click="permission = false;confirmAllDiscount(true);">直接签批</el-button>
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
import {allDate} from '../../../utils/date'
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
import cuActions from '../../PublicModal/cuActions/cuActions-modal.vue'
import withShopModal from '../../PublicModal/withShop/withShop-modal.vue'
    export default {
        
        name: "billing",
        data() {
            return {
                contextMenuData: {
                // the contextmenu name(@1.4.1 updated)
                menuName: 'demo',
                // The coordinates of the display(菜单显示的位置)
                axios: {
                    x: null,
                    y: null
                },
                row:'',
                // Menu options (菜单选项)
                menulists: [
                    {
                        fnHandler: 'delThisRow', // Binding events(绑定事件)
                        btnName: '删除' // The name of the menu option (菜单名称)
                    }
                ]
                },
                options: [{
                    value: "选项1",
                    label: "暂无"
                }],
                value: '',
                //销售人员
                shopMember:'',
                custom:'',//定做状态
                customText:'1',
                selectOptions: '',
                publicSelcet:{
                    glassesTypeOptions:[{
                        name:'',
                        id:''
                    }],
                    glassesTypeModel:'到店自取',
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
                    glassesTime:new Date(),
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
                    singleSupTime:new Date(),
                },
                optometryId:'',
                type:'',
                optometryTime:'',
                submitNewOptometry:false,//控制 提交验光单子组件传值
                includeOptometryData:null,//保存即将录入验光单信息 作为验光单数据副本
                amountSale:0,//原价合计
                optometryData:[],//验光单数据
                optometryList:null,//验光单列表数据
                selectMember:{//选择会员数据集合
                    selectM:'',
                    memberInfo:null//会员信息
                },
                saleCount:'0.00',//合计
                // receivable:'',//应收金额
                actionSale:0,//活动金额
                numCount:0,//件数
                allDisCount:'',//整单折扣
                memberShipDisCount:'10',//会员折扣
                memberShipDisCountSale:0,//会员折扣抵扣金额
                discountFlag:1,
                discountSale:0,//优惠券折扣金额
                conponDiscountMoney:'',//优惠券折扣金额
                conponResponse:{},
                timeDefaultShow:'',//当前日期默认值
                selectProductSku:{
                    selectR:'',
                    selectL:'',
                    where:'',
                    selectSP:'',
                    productSkuData:'',
                    cylinder:'',
                    title:'',
                    wareh:'',
                    product:'',
                    categoryCode:'',
                    type:'',
                    count: 0,
                    nub: 0,
                    size: 5
                },
                tableData:[],//用户保存商品信息
                where:'',//左右镜片
                addShop:true,
                //以下为控制modal弹框变量,
                conponData:null,
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
                withShop:false,
                addMember:false,
                isNotMember:false,
                showGetBill:false,
                showSelectShop:false,
                showSelectRH:false,
                showNewOptometry:false,
                isOptometryDialogVisible:false,
                showSelectMember:false,
                cuActions:false
            }
        },
        components:{
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
            cuActions
        },
        
        methods:{
            openConpon(){
                // 促销活动、
                this.cuActions = true;
            },
            showMenu (row, event) {
                event.preventDefault()
                var x = event.clientX
                var y = event.clientY
                // Get the current location
                this.contextMenuData.axios = {
                    x, y
                }
                this.contextMenuData.row=row;
            },
            //打开优惠券
            openCouponBarCode(){
                // console.log(this.selectMember.memberInfo)
                if(this.selectMember.memberInfo){
                    this.CouponBarCode=true;
                }else{
                    this.$message({
                        showClose: true,
                        message: '用户数据获取失败，请先选择用户',
                        type: 'error'
                    })                    
                }
            },
            //自带商品添加
            withShopCommit(data){
                console.log(data)
                this.selectSku(data,data.nums);
                this.withShop = false;
            },
            //获取销售人员
            getPrivateSelect(type,options){
                var _this = this;
                _this.$axios({
                    url: 'http://myc.qineasy.cn/cas-api/user/getUserByOrg',
                    method: 'post',
                    params: {
                        jsonObject: {
                            orgId:'11387', 
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
                    _this.options=response.data.data.list;
                })  
            },
            setWhere(value){
                let _this =this;
                _this.type='0';
                // 辨别左右镜片
                if(value == 'left'){
                    this.where = 'left '
                }else if (value == 'right'){
                    this.where = 'right '
                }
            },
            //定做商品
            commitCustom(data){
                console.log('父组件',data);
                this.selectSku(data,data.nums)
            },
            //删除表格td
            delThisRow(){
                var that=this;
                this.tableData.forEach(function(element,index) {
                    if(element==that.contextMenuData.row){
                        this.tableData.splice(index,1)
                    }
                }, this);
                that.computedPay();
            },
            //取镜公司地点
            sameComType(value){
                this.orderTemp.glassesAddress=value
            },
            //获取取镜公司
            getCompanyList(){
                var _this = this;
                _this.$axios({
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
                    _this.publicSelcet.comTypeOptions=response.data.data.shopByList;
                })  
            },
            
            //获取公共select options
            getPublicSelect(type,options){
                if(options==''){
                    console.log("1")
                }else{
                    console.log("2")
                }
                var _this = this;
                _this.$axios({
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
                    _this.selectOptions=response.data.data.list;
                })   
            },
            //选择镜片 商品
            selectGlass(type){
                if(this.optometryData==null){
                    this.$message({
                        showClose: true,
                        message: '验光单获取失败!',
                            type: 'error'
                    })                    
                    // return false;
                }
                var _this= this;
                var sph ='';
                var cyl ='';
                var add ='';
                // Object.keys(_this.selectProductSku).forEach(element => {
                //    _this.selectProductSku[element]
                // });
                this.selectProductSku.type=_this.type;
                this.selectProductSku.wareh='';
                this.selectProductSku.cylinder='';
                this.selectProductSku.productSkuData='';
                if(type&&type==1){
                    this.selectProductSku.selectSP='';
                    this.showSelectRH=true;
                    this.selectProductSku.title="选择右镜片";
                    this.selectProductSku.cylinder=_this.selectProductSku.selectR;
                    var where = '右镜片：'
                    for(var i=0;i<this.optometryData.length;i++){
                        if(this.optometryData[i].key!='0'&&this.optometryData[i].key!='1'){
                            if(this.optometryData[i].value[0].sph!=''){
                                sph=this.optometryData[i].value[1].sph;
                                cyl=this.optometryData[i].value[1].cyl;
                                add=this.optometryData[i].value[1].add;
                                break;
                            }
                        }                        
                    }
                }else if(type==2){
                    this.showSelectRH=true;
                    this.selectProductSku.title="选择左镜片"
                    this.selectProductSku.cylinder=_this.selectProductSku.selectL;
                    var where = '左镜片：'
                    for(var i=0;i<this.optometryData.length;i++){
                        if(this.optometryData[i].key!='0'&&this.optometryData[i].key!='1'){
                            if(this.optometryData[i].value[0].sph!=''){
                                sph=this.optometryData[i].value[0].sph;
                                cyl=this.optometryData[i].value[0].cyl;
                                add=this.optometryData[i].value[0].add;
                                break;
                            }
                        }                        
                    }
                }else if(type==3){
                    var where = ''
                    this.selectProductSku.selectR='';
                    this.selectProductSku.selectL='';
                    this.showSelectShop=true;
                    this.selectProductSku.cylinder=_this.selectProductSku.selectSP;
                }else if(type==null){
                    
                    console.log('null')
                }else{
                    console.log('else')
                }
                _this.$axios({
                    url: 'http://myc.qineasy.cn/pos-api/productSku/list',
                    method: 'post',
                    params: {
                        jsonObject: {
                            sphere:sph,
                            cylinder:cyl,
                            addLight:'',
                            color:'',
                            colorCode:'',
                            categoryCode:'',
                            product:'',
                            type:_this.type,
                            wareh:_this.selectProductSku.wareh,                         
                            nub: (_this.selectProductSku.nub==0?0:(_this.selectProductSku.nub-1)*_this.selectProductSku.size),
                            size: _this.selectProductSku.size
                        },
                        keyParams: {
                            weChat: true,
                            userId: '8888',
                            orgId: '11387'
                        }
                    }
                })
                .then(function (response) {
                    _this.selectProductSku.productSkuData=response.data.data;
                    let list = _this.selectProductSku.productSkuData.list;
                    for(var i = 0;i<list.length;i++){
                        list[i].skuName2 = where+list[i].skuName;
                    }

                })                 

            },
            rhtWareHouse(value){
                this.selectProductSku.wareh=value.wareh||"";
                this.selectProductSku.product=value.product||"";
                this.selectProductSku.categoryCode=value.categoryCode||"";
                var _this = this;
                _this.$axios({
                    url: 'http://myc.qineasy.cn/pos-api/productSku/list',
                    method: 'post',
                    params: {
                        jsonObject: {
                            sphere:'',
                            cylinder:this.selectProductSku.cylinder,
                            addLight:'',
                            color:'',
                            colorCode:'',
                            categoryCode:this.selectProductSku.categoryCode,
                            product:this.selectProductSku.product,
                            wareh:this.selectProductSku.wareh,                         
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
                    _this.selectProductSku.productSkuData=response.data.data;
                })                       
            },
            getProductSku(info){
                this.$nextTick(() => {  
                    this.selectProductSku.nub=info.nub;
                    this.selectGlass();
                });  
            },
            //选择商品后进行关闭弹窗计算
            selectSku(value,nums){
                console.log(value)
                if(value.status == '1'){
                    let title=''
                    if(this.custom =='right'){
                        title = '右镜片-定做单：'
                    }else if(this.custom == 'left'){
                        title = '左镜片-定做单：'
                    }else {
                        title = '商品-定做单：'
                    }
                    value.skuName =  'YZW7492634';
                    value.skuName2 = title+value.customMessage;//显示
                    value.sku="--";
                    // value.orderPromotionId='';
                }else if(value.status == '2'){
                    let title = '自带';
                    if(value.lens == 'left'){
                        title = title+'左镜片：'
                    }else if(value.lens == 'right'){
                        title = title+'右镜片：'
                    }else{
                        title = title+'商品：consoleeeeee'
                    }
                    value.skuName =  title+value.message;
                    value.skuName2 = title+value.message;//显示
                    value.sku="--";
                    value.price = '';
                    value.realSale = '';
                }
                
                var _this= this;
                let alldis = _this.allDisCount;
                if(alldis != '' && typeof parseFloat(alldis) == 'number'){
                    value.realSale =  ((value.discount * value.price)/10).toFixed(2);
                }else{
                    _this.$message({
                        type:'error',
                        message:'整单折扣输入错误',
                        showClose:true
                    })
                }
                // this.allDisCount = '';
                // this.discountSale = '';
                 console.log(value)
                 if(!nums){
                     value.nums = 1;
                 }
                 if(this.allDisCount>0){//添加商品的时候如果有整单折扣
                    console.log('整单折扣')
                    this.addShop = true
                 }
                _this.tableData.push(value);
                _this.showSelectRH = false;
                _this.customizeRH = false;
                _this.showSelectShop = false;
                _this.computedPay();
            },
            //计算价格区域
            computedPay(){
                let _this = this;
                let countSale = 0; 
                let n = 0;
                // if(parseFloat(this.allDisCount) > 0 ){

                // }
                // _this.allDisCount = '';
                console.log(this.tableData)
                for(let i=0;i<_this.tableData.length;i++){//循环计算价格
                // debugger
                    if(_this.tableData[i].status!='2'){
                        let thisSale =  parseFloat(_this.tableData[i].realSale);
                        countSale = countSale+thisSale
                        n+=parseInt(_this.tableData[i].nums);
                    }
                }
                // debugger
                this.amountSale = parseFloat(countSale).toFixed(2);//原价合计
                // if(this.conponResponse.amount>0){
                if((_this.conponResponse.amount>0 || _this.conponResponse.discount >0)){//如果有优惠券
                    // 金额||折扣
                    console.log(_this.conponResponse)
                    if(_this.conponResponse.amount>0 ){//按固定金额算
                        _this.conponDiscountMoney = _this.conponResponse.amount;
                        countSale = countSale - _this.conponResponse.amount;//优惠价 = 无折扣前 - 优惠价↓
                    }else if(_this.conponResponse.discount >0){//按折扣算
                        let conpon = parseFloat(countSale*_this.conponResponse.discount/10).toFixed(2);
                        _this.conponDiscountMoney = (parseFloat(countSale)-conpon).toFixed(2);
                        countSale = conpon;
                    }
                }
                if(_this.selectMember.memberInfo!=null){//如果有会员id
                    _this.discountFlag = 0;
                    var difference = (_this.memberShipDisCount*countSale).toFixed(2); //会员价 = 会员价格 * 总价
                    let memberDisCount = (countSale - difference).toFixed(2);//会员折扣差价 = 总金额 - 会员价
                    _this.memberShipDisCountSale = memberDisCount
                    countSale = countSale - parseFloat(memberDisCount); //会员价
                }
                _this.numCount = n;
                _this.saleCount = countSale.toFixed(2);//无整单折扣情况下
                if(this.addShop){
                    this.discountSale = parseFloat(this.saleCount - (this.allDisCount*this.saleCount)/10).toFixed(2);   
                        //最后价格 = 整单折扣前 * 折扣 ↓
                        this.saleCount = (this.allDisCount/10 * this.saleCount).toFixed(2);
                }
            },
            changePrice(value,type,index){
                // this.allDisCount = '';
                this.discountSale = '';
                if(type==1){
                    value.realSale=parseFloat(value.price*value.discount/10).toFixed(2);
                }else{
                    value.realSale=parseFloat(value.price/value.discount*10).toFixed(2);
                }
                 this.tableData.splice(index,1,value);
                this.computedPay();
            },
            confirmAllDiscount(value){
                if(value){
                    if(parseFloat(this.allDisCount) > 0 ){//有整单折扣
                        this.addShop = false;
                        this.computedPay();
                        // //整单折扣金额差价 = 折扣前 - 折扣后↓
                        this.discountSale = parseFloat(this.saleCount - (this.allDisCount*this.saleCount)/10).toFixed(2);   
                        //最后价格 = 整单折扣前 * 折扣 ↓
                        this.saleCount = (this.allDisCount/10 * this.saleCount).toFixed(2); 
                        // let discount = _this.tableData;
                        // for(var i=0;i<discount.length;i++){
                        //     discount[i].discount = parseFloat(_this.allDisCount);
                        //     discount[i].realSale = (discount[i].discount*discount[i].price/10).toFixed(2);
                        // }
                        // // console.log(discount)
                        // _this.tableData = [];
                        // _this.tableData = discount;
                        // _this.computedPay();
                    }
                }else{
                    this.allDisCount = '';
                    this.discountSale = '';
                    this.computedPay();
                }
            },
            //整单折扣
            afterDiscount(){
                let _this = this ;
                _this.permission=true;
            },
            //获取用户验光单列表
            getOptometryRecordList() {
                var that = this;
                that.$axios({
                url: 'http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptionsList',
                method: 'post',
                params: {
                    jsonObject: {
                        memberId: this.selectMember.memberInfo.memberId
                    },
                    keyParams: {
                        weChat: true
                    }
                }
                })
                .then(function (response) {
                    if(response.data.code=='1'){
                        that.optometryList=response.data.data.list;
                    }else{
                        that.$message({
                            showClose: true,
                            message: response.data.msg,
                                type: 'error'
                        })                        
                    }
                })
                .catch(function (error) {
                    console.info(error)
                })
            },
            getPrescriptions(){
                var that = this;
                that.$axios({
                url: 'http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptions',
                method: 'post',
                params: {
                    jsonObject: {
                        prescriptionId: this.optometryId
                    },
                    keyParams: {
                        weChat: true
                    }
                }
                })
                .then(function (response) {
                    if(response.data.code==1&&response.data.data.eyes.length>0){
                        that.optometryData=response.data.data.eyes;
                        that.optometryId=response.data.data.prescriptions.prescriptionId;
                        that.optometryTime=response.data.data.prescriptions.prescriptionTime;
                        that.includeOptometry();
                    }else{
                        that.$message({
                            showClose: true,
                            message: response.data.msg,
                                type: 'error'
                        })                        
                    }
                })
                .catch(function (error) {
                    console.info(error)
                })
            },
            
            //获取用户最后一次验光单信息
            getOptometryRecord() {
                var _this = this;
                _this.$axios({
                url: 'http://myc.qineasy.cn/pos-api/prescriptions/getPrescriptionsLately',
                method: 'post',
                params: {
                    jsonObject: {
                        memberId: this.selectMember.memberInfo.memberId
                    },
                    keyParams: {
                        weChat: true
                    }
                }
                })
                .then(function (response) {
                    if(response.data.code==1&&response.data.data.eyes.length>0){
                        console.log(response.data.data)
                        _this.showSelectMember=false;
                        _this.isOptometryDialogVisible=true;
                        _this.optometryData=response.data.data.eyes;
                        _this.optometryId=response.data.data.prescriptions.prescriptionId;
                        _this.optometryTime=response.data.data.prescriptions.prescriptionTime;
                    }else{
                        _this.$message({
                            showClose: true,
                            message: response.data.msg,
                                type: 'error'
                        });
                        _this.includeOptometryData = null;
                        _this.showSelectMember = false ;                        
                    }
                })
                .catch(function (error) {
                    console.info(error)
                })
            },
            //回车查询会员
            key13GetMemberInfo(){
                var _this=this;
                setTimeout(() => {
                    if(_this.selectMember.selectM.length==11){
                        _this.$axios({
                            url: 'http://myc.qineasy.cn/member-api/member/getMemberListByBoYang',
                            method: 'post',
                            params: {
                                jsonObject: {
                                    seachCode:_this.selectMember.selectM,
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
                                // console.log(response)
                                // _this.isOptometryDialogVisible = false;
                                // _this.includeOptometry()
                                _this.getMemberInfo(response.data.data.memberList[0])
                            }else{
                                _this.$message({
                                    showClose: true,
                                    message: '会员信息获取失败',
                                        type: 'error'
                                })
                            }
                        })                  
                    }
                }, 0);
            },
            //选择会员子组件返回函数 获取用户信息
            getMemberInfo(value){
                this.selectMember.memberInfo=value
                this.memberShipDisCount=this.selectMember.memberInfo.discount;
                this.conpon();//选择用户后，获取优惠券信息
                this.computedPay();//如果选择用户前选择商品了就再次进行计算
                this.allDisCount='';//整单折扣归零,重新输入进行计算
                if(value){
                    this.getOptometryRecord();
                    this.getOptometryRecordList();
                }
            },
            //使用优惠券
            receiveconpon(data){
                this.CouponBarCode = false;
                console.log(data)
                if(data.couponModality == '0'){
                    data.amount =  '';
                }else if(data.couponModality =='1'){
                    data.discount ='';
                }
                console.log(data)
                this.conponResponse = data;
                this.computedPay()
                // console.log(data)
            },
            
            //优惠券信息获取
            conpon(){
                let _this = this;
                _this.$axios({
                    url:'http://myc.qineasy.cn/coupon-api/newCouponMsg/getMyAllCoupon',
                    method:'post',
                    params:{
                        jsonObject:{
                        memberCardNo:_this.selectMember.memberInfo.memberCardNo,//会员卡号
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
                .then(function(res){
                    if(res.data.code == 1){
                        _this.conponData = res.data.data;
                    }else{
                         _this.$message({
                                showClose: true,
                                message: '请求数据出问题喽，请重试！',
                                type: 'error'
                            })
                    }
                    
                }).catch(function(err){
                    _this.$message({
                                showClose: true,
                                message: '请求数据出问题喽，请重试！',
                                type: 'error'
                            })
                })
                
            },
            
            //获取新增验光单信息
            getNewoptometry(value){
                this.showNewOptometry=false;
                this.submitNewOptometry=false;
                this.optometryData=value.eyes;
                this.optometryId=value.prescriptions.prescriptionId;
                this.optometryTime=value.prescriptions.prescriptionTime;
                this.includeOptometry();
            },
            //录入验光单信息
            includeOptometry(){
                var _this=this;
                if(_this.optometryData!=null){
                    var tableArr=[];
                    _this.optometryData.forEach(element => {
                        // console.log(object.keys(element.value[0]))
                        if(element.key!="0"&&element.key!="1"){
                        var tArr=[];
                        var keys=[];
                        var lData=[];
                        var rData=[];
                            for(var item in element.value[1]){
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
                                
                                tArr.push(
                                    {
                                        keys:item,
                                        lData:element.value[0][item],
                                        rData:element.value[1][item]
                                    }
                                )
                            }
                        var name;
                        switch ((element.key).toString()) {
                            // case '0':
                            //     name='检影';
                            //     break;
                            // case '1':
                            //     name='主观';
                            //     break;
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
                        }
                    });
                    if(tableArr)
                    _this.includeOptometryData=tableArr;
                }
            },
            //刷新页面
            resetPage(){
                location.reload();
            },
            //添加会员 子组件返回事件 提交表单信息
            memberAddSubmit: function (formdata) {
            //data为从子组件取到的数据
                var _this = this;
                _this.isSubmit = !_this.isSubmit;
                if (formdata.name != '' && formdata.telphone != '' && formdata.birthday != '' && formdata.sex != '') {
                    _this.$axios({
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
                            _this.$message({
                                showClose: true,
                                message: '请求数据出问题喽，请重试！',
                                type: 'error'
                            })
                            return false;
                        } else {
                            _this.addMember = false;
                            _this.MemberInfoForAdd(response.data.data.memberId)
                            _this.$message({
                                showClose: true,
                                message: '新增会员成功',
                                type: 'success'
                            });
                        }
                    })
                    .catch(function (error) {
                        console.info(error)
                        _this.$message({
                            showClose: true,
                            message: error,
                            type: 'error'
                        })
                    })
                } else {
                    _this.$message({
                        showClose: true,
                        message: '请输入完整信息',
                        type: 'error'
                    })
                }
            },
            showTitle(value){
                let _this = this;
                _this.$nextTick(()=>{
                    if(value== 'left'){
                        _this.custom='left';
                        _this.customText = '定做-左镜片'
                    }else if(value=='right'){
                        _this.custom='right';
                        _this.customText = '定做-右镜片'
                    }else if(value == 'shop'){
                        _this.custom='shop';
                        _this.customText = '定做-商品'
                    }
                })
                
            },
            //新增验光单后获取用户信息录入到页面
            MemberInfoForAdd(memberId){
                var _this=this;
                _this.$axios({
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
                        _this.getMemberInfo(response.data.data.memberList[0]);
                    }else{
                        _this.$message({
                            showClose: true,
                            message: '会员信息获取失败',
                                type: 'error'
                        })
                    }
                })    
            },
            //开单
            addOrderTemp(){
                var _this=this;
                if(this.selectMember.memberInfo==null){
                    _this.$message({
                        showClose: true,
                        message: '会员信息获取失败',
                            type: 'error'
                    })                    
                    // return false;
                }
                if(!this.optometryId){
                    _this.$message({
                        showClose: true,
                        message: '验光单信息获取失败',
                            type: 'error'
                    })                    
                    // return false;
                }
                var orderItemsList=[];
                console.log(this.tableData)
                for(var item in this.tableData){
                    orderItemsList.push({
                        itemId:this.tableData[item].sku,//商品sku码
                        itemName:this.tableData[item].skuName2,//明细名称
                        proMemo:this.tableData[item].skuName,
                        quantity:this.tableData[item].nums,//数量
                        discountRate:this.tableData[item].discount,//折扣比率
                        orderPromotionId:'',//订单营销活动id
                        listPrice:this.tableData[item].price,//原价
                        roundFlag:"1"
                        // price:this.tableData[item].realSale,//实售单价
                    })
                    
                }
                if(orderItemsList==''){
                    _this.$message({
                        showClose: true,
                        message: '商品信息获取失败',
                            type: 'error'
                    })                        
                    return false;
                }
                
                let memberId = '';//会员id
                if(_this.selectMember.memberInfo){
                    memberId = _this.selectMember.memberInfo.memberId
                }
                let memberDiscount = 10;//会员卡折扣  游客默认10 满折
                if(_this.selectMember.memberInfo){
                    console.log(this.selectMember.memberInfo)
                    memberDiscount = (parseFloat(this.selectMember.memberInfo.discount*10)).toFixed(2)
                }
                let alldis = this.allDisCount;//整单折扣
                if(alldis  == ''){
                    alldis = "10";
                }
                let coupon = this.conponResponse.amount;//卡券优惠金额
                if(!coupon){
                    coupon = '0'
                }
                var jsonObject =
                {
                    memberId : memberId,//会员id
                    prescriptionsId  : this.optometryId,//验光单id
                    urgent : (this.orderTemp.urgent).toString(),//是否加急
                    glassesTime : this.orderTemp.glassesTime,//取镜时间
                    glassesType : this.orderTemp.glassesType,//取镜类型
                    glassesCompany : this.publicSelcet.comTypeModel|| '取镜公司',//取镜公司
                    glassesAddress : this.orderTemp.glassesAddress||'取镜地址',//取镜地址
                    saleMemo : this.orderTemp.saleMemo||'销售备注',//销售备注
                    processMemo : this.publicSelcet.processMemo||'加工备注',//加工备注
                    specialMemo : this.publicSelcet.specialMemo||'特殊备注',//特殊备注
                    couponDetailId : this.orderTemp.couponDetailId,//优惠券id
                    moneyProduct:(parseFloat(this.amountSale)).toFixed(2),//原价合计
                    moneyAmount:(parseFloat(this.saleCount)).toFixed(2),//应付
                    moneyPaid:0,//应收
                    activityMoney:this.actionSale,//活动优惠金额,
                    discountMoney:this.memberShipDisCountSale,//折扣优惠金额,会员
                    cardDiscount:this.memberShipDisCount,//会员折扣
                    discountFlag:this.discountFlag,//是否使用会员折扣
                    roundOffFlag:"1",//取整标识 0使用 1不用
                    decimal : memberDiscount,//会员卡折扣
                    couponMoney : coupon,//卡券优惠金额
                    process : this.orderTemp.process,//加工费
                    service : this.orderTemp.service,//服务费
                    orderItemsList:orderItemsList,//商品列表
                    orderDiscount:alldis//整单折扣
                }
                _this.$axios({
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
                        _this.$message({
                            showClose: true,
                            message: '请求数据出问题喽，请重试！',
                            type: 'error'
                        })
                        return false;
                    } else {
                        debugger
                        _this.$message({
                            showClose: true,
                            message: '开单成功',
                            type: 'success'
                        });
                        
                        setTimeout(function(){
                            location.reload();
                        },1000)
                        // if(是门店收银){
                            // let orderId = response.data.data.orderId;//直接开单收银  门店收银
                            // _this.$router.push({path:'/cashier/cashierList',query:{orderId:orderId}})
                        // }
                        
                    }
                })                   
            }
        },
        computed:{
           
        },
        mounted(){
            let _this = this;
            _this.timeDefaultShow = allDate.TimetoDateDay();
        },
        beforeDestory(){

        },
        created(){
            
        },
        mounted(){
        },
        watch:{
            // tableData(newValue,oldValue){
            //     console.log(newValue,oldValue)
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
    .placeHolder{
            input::input-placeholder{color:#606266!important;} 
            input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
            color: #606266!important; 
            } 
            input:-moz-placeholder, textarea:-moz-placeholder { 
            color: #606266!important; 
            } 
            input::-moz-placeholder, textarea::-moz-placeholder { 
            color: #606266!important; 
            } 
            input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
            color: #606266!important; 
            } 
            .el-input__inner{
                width: 150px;
            }
        }
</style>