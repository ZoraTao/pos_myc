<template>
  <div class="content-out-wrapper transfer-wrapper">
    <!--top-->
    <el-row class="inquiry-row top-box mgt20">
      <el-col :span="24">
        <h3 class="titl">调拨单号：{{requisitionNo}}</h3>
      </el-col>
      <el-form :inline="true" :model="formInline" ref="formInline" :rules="rules" class="demo-form-inline am-ft-left">
        <el-col :span="24">
          <el-form-item
            label="制单日期：">
            <span>{{fullDate}}</span>
          </el-form-item>
          <el-form-item
            label="制单人：">
            <span>{{ueserName}}</span>
          </el-form-item>
          <el-form-item
            label="调拨部门：">
            <span>{{ueserOrgName}}</span>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="经办日期：" prop="handleTime">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="formInline.handleTime"
              value-format="yyyy-MM-dd"
              style="width: 130px;"></el-date-picker>
          </el-form-item>
          <el-form-item label="调拨人：" prop="requisitionP">
            <el-select v-model="formInline.requisitionP" placeholder="请选择" :disabled="isEdit" style="width: 130px">
              <el-option
                v-for="n in requisitionP"
                :key="n.userId"
                :label="n.trueName"
                :value="n.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调出仓库：" prop="outWarehId">
            <el-select v-model="formInline.outWarehId" filterable placeholder="请选择" :disabled="isEdit"
                       style="width: 130px">
              <el-option
                v-for="n in warehList"
                :key="n.warehouseId"
                :label="n.warehouseName"
                :value="n.warehouseId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调入仓库：" prop="inWarehId">
            <el-select v-model="formInline.inWarehId" filterable placeholder="请选择" style="width: 130px">
              <el-option
                v-for="n in warehList"
                :key="n.warehouseId"
                :label="n.warehouseName"
                :value="n.warehouseId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="调拨级别：" prop="level">
            <el-select v-model="formInline.level" placeholder="请选择" style="width: 130px">
              <el-option
                v-for="n in levelList"
                :key="n.code"
                :label="n.name"
                :value="n.code">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="承运类型：" prop="carrierType">
            <el-select v-model="formInline.carrierType" placeholder="请选择" style="width: 130px">
              <el-option
                v-for="n in carrierType"
                :key="n.code"
                :label="n.name"
                :value="n.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="承运人：" prop="carrierP">
            <el-select v-model="formInline.carrierP" placeholder="请选择" style="width: 130px">
              <el-option
                v-for="n in carrierP"
                :key="n.userId"
                :label="n.trueName"
                :value="n.userId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="运费：" prop="freight">
            <el-input clearable v-model="formInline.freight" min="0" style="width: 120px"></el-input>
          </el-form-item>
          <el-form-item label="备注：">
            <el-input clearable v-model="formInline.memo" style="width: 280px"></el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <!--content-->
    <el-row class="inquiry-row mgt10">
      <!--<el-col :span="24">-->
      <!--<el-form :inline="true" :model="searchForm" class="demo-form-inline am-ft-left">-->
      <!--<el-form-item label="编码选择过滤："></el-form-item>-->
      <!--<el-form-item label="类别：">-->
      <!--<el-select v-model="categoryLevel.category1" filterable clearable placeholder="请选择" style="width: 130px"-->
      <!--@change="selectBrands">-->
      <!--<el-option v-for="(i,index) in categoryCode1" :key="i.className" :label="i.className"-->
      <!--:value="i.productCategoryId"></el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="品牌：">-->
      <!--<el-select v-model="categoryLevel.category2" filterable clearable placeholder="请选择" style="width: 130px"-->
      <!--@change="selectVarietys">-->
      <!--<el-option v-for="(i,index) in categoryCode2" :key="i.className" :label="i.className"-->
      <!--:value="i.productCategoryId"></el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="品种：">-->
      <!--<el-select v-model="categoryLevel.category3" filterable clearable placeholder="请选择" style="width: 130px">-->
      <!--<el-option v-for="(i,index) in categoryCode3" :key="i.className" :label="i.className"-->
      <!--:value="i.productCategoryId"></el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="度数：" class="input_num">-->
      <!--<div class="fn-line-block">-->
      <!--<el-input type="number" min="0" v-model="searchForm.degree1" style="width: 60px"></el-input>-->
      <!--</div>-->
      <!--<div class="fn-line-block am-ft-center am-text-secondary">-</div>-->
      <!--<div class="fn-line-block">-->
      <!--<el-input type="number" min="0" v-model="searchForm.degree2" style="width: 60px"></el-input>-->
      <!--</div>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
      <!--<el-button type="primary" plain>过滤</el-button>-->
      <!--</el-form-item>-->
      <!--</el-form>-->
      <!--</el-col>-->
      <!--table-->
      <el-col :span="24">
        <el-col :span="24" class="table-box">
          <el-table
            :data="tableData"
            stripe
            size="small"
            align="left"
            max-height="400"
            style="width: 100%">
            <el-table-column
              label="商品编码"
              prop="sku"
              width="120">
              <!--<template slot-scope="scope">-->
              <!--<el-input v-model="tableData[scope.$index].proNum" size="small"></el-input>-->
              <!--</template>-->
            </el-table-column>
            <el-table-column
              prop="skuName"
              label="商品名称"
              width="150">
            </el-table-column>
            <el-table-column
              prop="unit"
              label="单位"
              width="50">
            </el-table-column>
            <el-table-column
              prop="registerCode"
              label="注册证号">
            </el-table-column>
            <el-table-column
              prop="batchNo"
              label="批次号">
            </el-table-column>
            <el-table-column
              prop="validity"
              label="有效期">
            </el-table-column>
            <el-table-column
              label="调拨数量">
              <template slot-scope="scope" class="input_num">
                <el-form :model="tableData[scope.$index]" prop="count" :rules="rules2">
                  <el-form-item
                    label=""
                    prop="count">
=======
                    prop="proCount" >
>>>>>>> Seven/0415dev-4
                    <el-input type="number" min="1" v-model.number="tableData[scope.$index].count" size="small" ></el-input>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              label="调出库库存">
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column
              label="调入库库存">
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column
              label="公司库存">
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column
              label="零售价"
              prop="price">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <a href="javascript:;" class="am-text-secondary" @click="removeProduct(scope.$index)">移除</a>
              </template>
            </el-table-column>
          </el-table>
          <!--扫码-->
          <el-col :span="24">
            <el-input
              class="scan-btn"
              clearable
              placeholder="商品编码/条形码/快速码"
              v-model="searchForm.proNum"
              @keyup.native.enter="addOrder">
            </el-input>
            <el-button type="primary"><img src="http://myc-pos.oss-cn-hangzhou.aliyuncs.com/img/icon_saoma.png"/>
            </el-button>
          </el-col>
        </el-col>
        <el-button class="mgt15" type="primary" v-if="isEdit === false" @click="addTransferOrder('formInline')">提交
        </el-button>
        <el-button class="mgt15" type="primary" v-if="isEdit === true" @click="editTransferOrder('formInline')">确定修改
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "transfer-order-add",
    component: {},
    data() {
      return {
        detailInfo: {},//调拨单信息
        detailList: [],//调拨单子商品列表
        requisitionNo: '--',//调拨单号
        isEdit: false,
        warehList: [],//仓库列表
        requisitionP: [],//调拨人列表
        carrierP: [],//承运人列表
        carrierType: [],//承运类型列表
        levelList: [],//调拨级别列表
        ueserName: '',
        ueserId: '',
        ueserOrgName: '',
        ueserOrgId: '',
        fullDate: '',
        formInline: {
          makingP: '',//制单人
          requisitionOrgName: '',//调拨部门
          requisitionOrg: '',//调拨部门id
          handleTime: '',//经办日期
          requisitionP: '',//调拨人
          outWarehId: '',//调出仓库id
          outWarehName: '',//调出仓库名
          inWarehId: '',//调入仓库id
          inWarehName: '',//调入仓库名
          level: '',//调拨级别
          carrierType: '',//承运类型
          carrierP: '',//承运人
          freight: '',//运费
          memo: '',//备注
          dRequisitionDetailList: [{
            proNum: '',//商品编码,
            count: 0,//调拨数量
          }],
        },
        categoryCode1: [],//类别
        categoryCode2: [],//品牌
        categoryCode3: [],//品种
        categoryLevel: {//类别+品牌+品种
          category1: '',
          category2: '',
          category3: '',
        },
        degree1: '',//度数起始
        degree2: '',//度数截止
        searchForm: {
          degree: ['', ''],//度数
          categoryCode: [],//类别+品牌+品种
          proNum: ''
        },
        tableData: [],
        rules: {
          handleTime: [
            {required: true, message: '请选择经办日期', trigger: 'blur'}
          ],
          requisitionP: [
            {required: true, message: '请选择调拨人', trigger: 'change'}
          ],
          outWarehId: [
            {required: true, message: '请选择调出仓库', trigger: 'change'}
          ],
          inWarehId: [
            {required: true, message: '请选择调入仓库', trigger: 'change'}
          ],
          level: [
            {required: true, message: '请选择调拨级别', trigger: 'change'}
          ],
          carrierType: [
            {required: true, message: '请选择承运类型', trigger: 'change'}
          ],
          carrierP: [
            {required: true, message: '请选择承运人', trigger: 'change'}
          ],
          freight: [
            {required: true, message: '请输入运费', trigger: 'blur'}
          ],
        },
        rules2: {
          count:[{ required: true, message: '调拨数量不能为空且大于0', trigger: 'change', trigger: 'blur' },],
        },
      }
    },
    created() {
      this.getType();
      this.getNowDate();
      this.getWarehList();
      this.getCarrierP();
      this.getRequisitionP();
      this.getLevelList();
      this.getCarrierType();
      const ueserInfo = JSON.parse(localStorage.getItem("userData"));
      this.ueserName = ueserInfo.trueName;
      this.ueserId = ueserInfo.userId;
      this.ueserOrgName = ueserInfo.orgName;
      this.ueserOrgId = ueserInfo.orgId;
      this.editOrder();
    },
    methods: {
      //从详情页进入--修改
      editOrder() {
        const that = this;
        // console.info(that.$route.params);
        that.detailInfo = that.$route.params.dRequisition;//调拨单信息
        that.detailList = that.$route.params.detailList;//子商品列表
        if (that.detailInfo != undefined || that.detailList != undefined) {
          that.isEdit = true;
          that.requisitionNo = that.detailInfo.requisitionNo;
          that.tableData = that.detailList;
          const newFormline = {
            requisitionP: that.detailInfo.requisitionP,
            handleTime: that.detailInfo.handleTime,
            outWarehId: that.detailInfo.outWarehId,
            inWarehId: that.detailInfo.inWarehId,
            level: that.detailInfo.level,
            carrierType: that.detailInfo.carrierType,
            carrierP: that.detailInfo.carrierP,
            freight: that.detailInfo.freight,
            memo: that.detailInfo.memo,
            dRequisitionDetailList: that.tableData,
          };
          that.formInline = Object.assign(that.formInline, newFormline);
        }
        // console.info(that.formInline);
      },

      //获取当前时间
      getNowDate() {
        const that = this;
        let date = new Date();
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        that.fullDate = y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
      },
      //查询仓库列表
      getWarehList() {
        const that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/warehouse/getWarehouseList',
          method: 'post',
          params: {
            jsonObject: {
              status: 0
            },
            keyParams: {
              weChat: true
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
              // console.info(response.data.data);
              that.warehList = response.data.data.list;
            }

          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //查询类别+品牌+品种
      getType() {
        const that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/productCategory/list',
          method: 'post',
          params: {
            jsonObject: {
              productCategoryId: ''
            },
            keyParams: {
              weChat: true
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
              // console.info(response.data.data)
              that.categoryCode1 = response.data.data.productCategoryList;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //根据类别选择品牌
      selectBrands(id) {
        const that = this;
        that.categoryLevel.category2 = '';
        that.$axios({
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
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            } else {
              // console.info(response.data.data)
              that.categoryCode2 = response.data.data.productCategoryList;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //根据品牌选择品种
      selectVarietys(id) {
        const that = this;
        that.categoryLevel.category3 = '';
        that.$axios({
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
              that.$message({
                showClose: true,
                message: '请求数据出问题喽，请重试！',
                type: 'error'
              })
              return false;
            } else {
              console.info(response.data.data)
              that.categoryCode3 = response.data.data.productCategoryList;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //新增调拨单
      addTransferOrder(formName) {
        const that = this;
        if (that.warehList.find(ele => ele.warehouseId == that.formInline.outWarehId)) {
          that.formInline.outWarehName = that.warehList.find(ele => ele.warehouseId == that.formInline.outWarehId).warehouseName;
        }
        if (that.warehList.find(ele => ele.warehouseId == that.formInline.outWarehId)) {
          that.formInline.inWarehName = that.warehList.find(ele => ele.warehouseId == that.formInline.inWarehId).warehouseName;
        }
        that.formInline.requisitionOrgName = that.ueserOrgName;
        that.formInline.makingP = that.ueserName;
        that.formInline.requisitionOrg = that.ueserOrgId;
        that.formInline.dRequisitionDetailList = that.tableData;
        delete that.formInline.dRequisitionId;

        // console.info(that.formInline)
        // console.info(that.formInline.dRequisitionDetailList.length)
        this.$refs[formName].validate((valid) => {
          if (valid && that.formInline.dRequisitionDetailList.length > 0) {
            that.$axios({
              url: 'http://myc.qineasy.cn/pos-api/dRequisition/addDRequisition',
              method: 'post',
              params: {
                jsonObject: that.formInline,
                keyParams: {
                  weChat: true,
                  orgId: that.ueserOrgId,
                  userId: that.userId
                }
              }
            })
              .then(function (response) {
                if (response.data.code != '1') {
                  that.$message({
                    showClose: true,
                    message: '新增调拨单失败，请检查后重试！',
                    type: 'error'
                  })
                  return false;
                } else {
                  that.$message({
                    showClose: true,
                    message: '新增成功！',
                    type: 'success'
                  });
                  that.$refs[formName].resetFields();
                  that.tableData = [];
                  that.formInline.memo = '';
                }
              })
              .catch(function (error) {
                console.info(error);
                that.$message({
                  showClose: true,
                  message: '请求数据失败，请联系管理员',
                  type: 'error'
                })
              })
          } else {
            that.$message({
              showClose: true,
              message: '请正确输入后重试！',
              type: 'error'
            })
            return false;
          }
        });
      },
      //修改调拨单
      editTransferOrder(formName) {
        const that = this;
        if (that.warehList.find(ele => ele.warehouseId == that.formInline.outWarehId)) {
          that.formInline.inWarehName = that.warehList.find(ele => ele.warehouseId == that.formInline.inWarehId).warehouseName;
        }
        that.formInline.dRequisitionId = that.detailInfo.requisitionNo;
        that.formInline.requisitionOrgName = that.ueserOrgName;
        that.formInline.requisitionOrg = that.ueserOrgId;
        that.formInline.dRequisitionDetailList = that.tableData;

        // console.info(that.formInline)
        this.$refs[formName].validate((valid) => {
          if (valid && that.formInline.dRequisitionDetailList.length > 0) {
            that.$axios({
              url: 'http://myc.qineasy.cn/pos-api/dRequisition/updateDRequisition',
              method: 'post',
              params: {
                jsonObject: that.formInline,
                keyParams: {
                  weChat: true,
                  orgId: that.ueserOrgId,
                  userId: that.userId
                }
              }
            })
              .then(function (response) {
                if (response.data.code != '1') {
                  that.$message({
                    showClose: true,
                    message: '修改调拨单失败，请检查后重试！',
                    type: 'error'
                  })
                  return false;
                } else {
                  that.$message({
                    showClose: true,
                    message: '修改成功！',
                    type: 'success'
                  });
                  that.$router.go(-2);
                }
              })
              .catch(function (error) {
                console.info(error);
                that.$message({
                  showClose: true,
                  message: '请求数据失败，请联系管理员',
                  type: 'error'
                })
              })
          } else {
            that.$message({
              showClose: true,
              message: '请正确输入后重试！',
              type: 'error'
            })
            return false;
          }
        });
      },
      //追加商品
      addOrder() {
        const that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/pos-api/stock/getStockListBysku',
          method: 'post',
          params: {
            jsonObject: {
              sku: that.searchForm.proNum,
              warehouseId: that.formInline.outWarehId,
            },
            keyParams: {
              weChat: true
            }
          }
        })
          .then(function (response) {
            if (response.data.code != '1') {
              that.$message({
                showClose: true,
                message: '查询数据出问题喽，请检查后重试！',
                type: 'error'
              })
              return false;
            } else {
              // console.info(response.data.data)
              const productData = response.data.data.list;
              const params = {
                proNum: that.searchForm.proNum,
                count: that.formInline.dRequisitionDetailList.count,
              };
              if (response.data.data.list.length > 0) {
                that.tableData.push(productData[0]);
              } else {
                that.$message({
                  showClose: true,
                  message: '无此商品！',
                  type: 'error'
                })
                return false;
              }
              that.searchForm.proNum = '';
              // console.info(that.tableData)
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //承运人列表
      getCarrierP() {
        const that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/cas-api/user/getUserByOrg',
          method: 'post',
          params: {
            jsonObject: {
              userType: 7
            },
            keyParams: {
              weChat: true
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
              // console.info(response.data.data);
              that.carrierP = response.data.data.list;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //调拨人列表
      getRequisitionP() {
        const that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/cas-api/user/getUserByOrg',
          method: 'post',
          params: {
            jsonObject: {
              userType: 8
            },
            keyParams: {
              weChat: true
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
              // console.info(response.data.data);
              that.requisitionP = response.data.data.list;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //调拨级别列表
      getLevelList() {
        const that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/cas-api/systemConfig/getSystemConfigList',
          method: 'post',
          params: {
            jsonObject: {
              type: 14
            },
            keyParams: {
              weChat: true
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
              // console.info(response.data.data);
              that.levelList = response.data.data.list;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //承运类型列表
      getCarrierType() {
        const that = this;
        that.$axios({
          url: 'http://myc.qineasy.cn/cas-api/systemConfig/getSystemConfigList',
          method: 'post',
          params: {
            jsonObject: {
              type: 15
            },
            keyParams: {
              weChat: true
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
              // console.info(response.data.data);
              that.carrierType = response.data.data.list;
            }
          })
          .catch(function (error) {
            console.info(error);
            that.$message({
              showClose: true,
              message: '请求数据失败，请联系管理员',
              type: 'error'
            })
          })
      },
      //移除商品
      removeProduct(item) {
        const that = this;
        that.tableData.splice(item, 1);
      },
    }
  }
</script>

<style lang="scss">
  @import "../../../reset";
  @import "../../MemberManage/MemberInquiry/member-public-css";

  .transfer-wrapper {
    .el-input__inner[type='number'] {
      padding-right: 0 !important;
    }
    .top-box {
      .el-form--inline .el-form-item__label {
        float: none;
        display: inline-block;
        min-width: 60px;
        line-height: 36px;
        font-weight: normal;
        color: #666666;
      }
      .titl {
        padding-bottom: 13px;
        border-bottom: 1px solid #E1E1E1;
        margin-bottom: 20px;
        font-size: 15px;
        overflow: hidden;
      }
    }
    .table-box {
      height: 450px;
      border: 1px solid #ECEBEB;
      background-color: rgba(248, 248, 248, 0.50);
      overflow: auto;
    }
    .scan-btn {
      margin: 10px 0 10px 10px;
      + .el-button {
        padding: 6px 10px;
        margin-left: -6px;
        position: relative;
        border-radius: 0 4px 4px 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        vertical-align: -2.5px;
        span {
          display: block;
          margin: 0 auto;
        }
      }
    }
  }

</style>
