<template>
<div id="otherExpense">
    <!--body-content-->
    <div class="clearfix modal-content-center">
        <div class="modal-content-left otherExpenseBody">
            <el-table
            size="small"
            :span-method="objectSpanMethod"
            v-for="(item,index) in data"
            :key="item.p.name"
            :data="item.list"
            @row-click="toCheck"
            :show-header="index==0"
            style="width: 100%">
                <el-table-column
                    label="项目">
                    <template slot-scope="scope">
                        {{item.p.name}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="分类">
                </el-table-column>
                <el-table-column
                    prop="value"
                    label="应收金额">
                </el-table-column>
                <el-table-column
                    prop="packagePrice"
                    label="选择">
                    <template slot-scope="scope">
                        <input type="checkbox" :checked="scope.row.isCheck"  @change="checkPay(scope.row,scope.$index,index,$event)">
                    </template>
                </el-table-column>
                <el-table-column
                    prop="displacement"
                    label="实收金额">
                    <template slot-scope="scope">
                        <el-input  v-model="scope.row.displacement" placeholder="" @change="computedMoney"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <div class="otherExpenseTotal">
                <p>合计 :<span>{{amount||'0.00'}}</span></p>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import _ from 'lodash'
export default {
  name: "OtherExpenseModal",
  data() {
    return {
      data: [],
      amount: "", //总金额,
      init: null,
      s:true
    };
  },
  methods: {
    addCost() {
      let _this = this;
      let manyCost = [];
      for (let i = 0; i < _this.data.length; i++) {
        let message = new Object();
        message.skuName = [];
        for (let j = 0; j < _this.data[i].list.length; j++) {
          if (_this.data[i].list[j].isCheck == true) {
            message.name = _this.data[i].p.name;
            message.skuName.push(_this.data[i].list[j]);
          }
        }
        manyCost.push(message);
      }
      _this.initData();
      // console.log(manyCost)
      _this.$emit("addCostPay", manyCost);
    },
    checkPay(data, $index, index,$event) {//多选框
      let _this = this;
      let setMoney = null;
      if(!_this.s) return
      _this.data[index].list[$index].isCheck = !_this.data[index].list[$index].isCheck;
      if (this.data[index].list[$index].isCheck) {
        _this.data[index].list[$index].displacement =
          _this.data[index].list[$index].value;
        setMoney = _this.data[index].list[$index];
      } else {
        this.data[index].list[$index].displacement = "";
        setMoney = this.data[index].list[$index];
      }
      this.data[index].list.splice($index, 1, setMoney);
      _this.computedMoney();
    },
    computedMoney() {//计算价格
      let _this = this;
      let n = 0;
      for (let i = 0; i < _this.data.length; i++) {
        for (let j = 0; j < _this.data[i].list.length; j++) {
          if (_this.data[i].list[j].isCheck == true) {
            n += parseFloat(_this.data[i].list[j].displacement);
          }
        }
      }
      _this.amount = n.toFixed(2);
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % this.data[0].list.length === 0) {
          return {
            rowspan: 6,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    toCheck(row,event,column){//多选行
        let _this = this;
        let rowId = row.id;
        if(event.target.className == 'el-input__inner'){
          return
        }
        _this.s = false;
        for (let i = 0; i < _this.data.length; i++) {
            for (let j = 0; j < _this.data[i].list.length; j++) {
                if (_this.data[i].list[j].id == rowId) {
                    _this.data[i].list[j].isCheck = !_this.data[i].list[j].isCheck;
                    if(_this.data[i].list[j].isCheck){
                        _this.data[i].list[j].displacement = _this.data[i].list[j].value;
                        let other = _this.data[i].list[j];
                        _this.data[i].list.splice([j],1,other)
                    }else{
                        _this.data[i].list[j].displacement = '';
                        let other = _this.data[i].list[j];
                        _this.data[i].list.splice([j],1,other)
                    }

                }
            }
        }
        _this.computedMoney();
    setTimeout(function(){
        _this.s = true;
    },50)
        // console.log(row)
    },
    initData(){
        let _this = this;
        console.log(this.init);
        for(let i=0;i<this.init.length;i++){
          for(let j=0;j<this.init[i].list.length;j++){
              this.init[i].list[j].isCheck = false;
          }
        }
          for(var i=0;i<_this.data.length;i++){
              _this.data.splice(i,1,_this.init[i])
          }
          // _this.data = _this.init
            // for(let i = 0;i<_this.data.length;i++){
            //     console.log(_this.data[i])
            //     for(let a = 0;a<_this.data[i].list.length;a++){
            //         _this.$set( _this.data[i].list[a], 'isCheck', false)
            //     }
            // }

    },
    requestList() {
      var _this = this;
      _this
        .$axios({
          url: "http://myc.qineasy.cn/cas-api/systemConfig/getSystemConfigList",
          method: "post",
          params: {
            jsonObject: {
              type: "6"
            },
            keyParams: {
              weChat: true,
              userId: JSON.parse(localStorage.getItem("userData")).userId,
              orgId: JSON.parse(localStorage.getItem("userData")).orgId,
            }
          }
        })
        .then(function(response) {
          let startInit = response.data.data.list;
          for (let i = 0; i < startInit.length; i++) {
            for (let j = 0; j < startInit[i].list.length; j++) {
              startInit[i].list[j].isCheck = false;
              startInit[i].list[j].displacement = "";
              startInit[i].list[j].status = "3";
            }
          }
          // _this.init = JSON.parse(JSON.stringify(startInit));
          _this.init = _.cloneDeep(startInit);
          _this.data = startInit;
        });
    }
  },
  watch:{

  },
  created: function() {
    this.requestList();
  }
};
</script>

<style lang="scss">
.otherExpense {
  .el-dialog__body {
    padding: 0;
  }
  .el-checkbox__label {
    font-size: 12px;
  }
  .el-table th {
    background: #fff !important;
  }
  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
    font-weight: 700;
  }

  #otherExpense {
    padding: 20px;
    .otherExpenseTotal {
      height: 35px;
      line-height: 35px;
      p {
        font-size: 12px;
        color: #666666;
        float: right;
        margin-right: 70px;
        span {
          margin-left: 5px;
          font-weight: bold;
          font-size: 13px;
          color: #000000;
        }
      }
    }
    .otherExpenseButtonGroup {
      overflow: hidden;
      width: 100%;
      padding: 20px;
      padding-top: 10px;
      button {
        width: 90px;
        height: 30px;
        line-height: 30px;
        margin-left: 10px;
      }
    }
  }
}
</style>
