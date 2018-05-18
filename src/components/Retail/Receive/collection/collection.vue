<template>
  <div class="collection">
    <div class="collection_head">
      <div class="collection_head_title">
        收件检验
      </div>
      <div class="collection_head_content">
        <strong>{{datas.shopName}}</strong>
        <em>{{datas.orderId}}</em>
        <span>姓名：<i>{{datas.name}}</i></span>
        <span>时间：<i>{{(datas.createTime).substring(0,10)}}</i></span>
        <span>取镜日期：<i>{{(datas.glassesTime).substring(0,10)}}</i></span>
      </div>
    </div>
    <div class="collection_content">
      <table>
        <thead>
          <th style="width:70%;">商品名称</th>
          <th style="width:30%;">数量</th>
        </thead>
        <tbody>
          <tr v-for="item in datas.orderItems" :key="item.orderItemId">
            <td>{{item.itemName}}</td>
            <td>{{item.quantity}}</td>
          </tr>
          
        </tbody>
      </table>
      <div class="messaage">
          <p>销售备注：<i>{{datas.saleMemo}}</i></p>
          <p>加工备注：<i>{{datas.processMemo}}</i></p>
          <p>特殊备注：<i>{{datas.specialMemo}}</i></p>
      </div>
      <div class="eyes">
        <ul class="ul_head">
            <li class="w120">处方内容</li>
            <li class="w40">&nbsp;</li>
            <li class="w120">SPH</li>
            <li class="w120">CYL</li>
            <li class="w120">AX</li>
            <li class="w120">基底</li>
            <li class="w120">PH</li>
            <li class="w120">瞳距</li>
            <li class="w120">ADD</li>
        </ul>
        <ul class="ul_content"  v-show="eyes!=null">
          <li class="w120 line-height_48">远用</li>
          <li>
           <ul>
             <li>
               <ul>
                <li class="w40 strongIndex">R</li>
                 <li class="w120">+1.75</li>
                 <li class="w120">+1.75</li>
                 <li class="w120">+1.75</li>
                 <li class="w120">+1.75</li>
                 <li class="w120">+1.75</li>
                 <li class="w120">+1.75</li>
               </ul>
             </li>
             <li>
               <ul>
                 <li class="w40 strongIndex">L</li>
                 <li class="w120">+1.75</li>
                 <li class="w120">+1.75</li>
                 <li class="w120">+1.75</li>
                 <li class="w120">+1.75</li>
                 <li class="w120">+1.75</li>
                 <li class="w120">+1.75</li>
                </ul>
             </li>
           </ul>
          </li>
          <li class="w120 line-height_48 border-left">+0.75</li>
        </ul>
        <div class="titles" v-show="!eyes||eyes.length == 0">暂无数据</div>
      </div>
      <div class="qualified">
        <div class="qualified_head">
          <div class="title">是否合格：</div>
          <el-select v-model="qualified">
            <el-option value="1" label="合格收件"></el-option>
            <el-option value="2" label="不合格退件"></el-option>
          </el-select>
        </div>
        <div class="foot_message">
          <div class="title">备注：</div>
          <el-input type="textarea" v-model="inputArea"></el-input>
        </div>
      </div>
    </div>
    <div class="qualified_btn">
        <el-button type="primary" @click="receive(true)">确定</el-button>
        <el-button type="plain" @click="receive(false)">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name:'collection',
      data(){
        return{
          qualified:'1',
          inputArea:'',
          eyes:null,
        }
      },
      props:['datas'],
      methods:{
          searchPrescriptions(){
            const _this = this;
            if(!_this.datas.prescriptionsId) return
            _this.$myAjax({
              url:'pos-api/prescriptions/getPrescriptions',
              data:{
                prescriptionId:_this.datas.prescriptionsId
              },
              success:function(res){
                if(res.code == 1){
                    console.log(res)
                    _this.eyes = res.data.eyes;
                }else{
                  _this.$message({
                        type:'error',
                        message:res.msg,
                        showClose:true
                    })
                }
              },error:function(err){
                console.log(err)
                _this.$message({
                    type:'error',
                    message:err,
                    showClose:true
                })
              }
            })
          },
          clear(){
              this.qualified='1';
              this.inputArea='';
              this.eyes=null;
              _this.$emit('closedialog');
          },
          receive(bool){
            const _this = this ;
            if(!bool){
              _this.clean();
            }
            _this.$myAjax({
              url:'pos-api/orderTemp/updateOrderTemp',
              data:{
                orderId:_this.datas.orderId,
                receiptCheckStatus:_this.qualified,
                receiptCheckMemo:_this.inputArea
              },
              success:function(res){
                if(res.code == 1){
                  console.log(res)
                  _this.$message({
                    type: "success",
                    message: '操作成功',
                    showClose: true
                  });
                  _this.clean();
                }else{
                  _this.$message({
                    type: "error",
                    message: res.msg,
                    showClose: true
                  });
                }
              },error:function(err){
                  _this.$message({
                    type: "error",
                    message: err,
                    showClose: true
                  });
              }
            })
          }
      },
      created(){
      }
  }
</script>

<style scoped lang="scss">
@import '../../../../reset.scss';
.collection{
  width: 96%;
  margin:0 auto;
  padding-bottom: 20px;
  overflow: hidden;
  .collection_head{
    padding: 10px 0;
    font-family: MicrosoftYaHei;
    letter-spacing: 0;
    .collection_head_title{
      text-align: center;
      padding-bottom: 10px;
      border-bottom: 2px dashed #E1E1E1;
      font-size: 18px;
      color: #555555;
    }
    .collection_head_content{
      padding: 15px 0;
      border-bottom: 2px solid #aaaaaa;
      strong{
        font-size: 24px;
        color: #333333;
        font-weight: 400;
      }
      em{
        font-size: 20px;
        margin:0 40px 0 15px ;
        color: #333333;
      }
      span{
        font-size: 12px;
        margin-left: 15px;
        color: #666666;
        i{
          font-size: 12px;
          color: #333333;
        }
      }
    }
  }
  .collection_content{
      table{
        width:100%;
        overflow:hidden;
        border-bottom: 2px solid #AAAAAA;
        th{
          text-align: left;
          font-size: 12px;
          color: #555555;
          text-indent: 15px;
        }
        thead{
          border-bottom: 1px solid #E1E1E1;
        }
        tbody{
          font-size: 13px;
          color: #333333;
          tr{
            border-bottom: 1px solid #EFEFEF;
            td{
                padding:7px 0;
                text-indent: 15px;
            }
          }
          tr:nth-child(2n){
            background-color:rgba(246,246,246,0.50);
          }
          tr:hover{
            background-color:rgba(246,246,246,0.50);
          }
        }
      }
      .messaage{
        font-family: MicrosoftYaHei;
        border-bottom: 2px solid #AAAAAA;
        font-weight: 400;
        padding:5px 0 5px 13px;
        p{
          font-size: 12px;
          line-height: 20px;
          color: #666666;
          i{
            font-size: 12px;
            color: #333333;
          }
        }
      }
      .eyes{
        margin-top: 15px;
        min-height: 100px;
        .titles{
          text-align: center;
          padding-top: 20px;
        }
        .ul_head{
          overflow: hidden;
          font-size: 12px;
          color: #555555;
          border-top: 2px solid #AAAAAA;
          border-bottom:1px solid #E1E1E1;
          li{
            float: left;
            text-align: center;
            padding:3px 0;
          }
        }
          .w120{
            width: 120px;
          }
          .w40{
            width: 40px;
          }
          .ul_content{
            overflow: hidden;
            border-bottom:1px solid #e1e1e1;
            li{
              padding:1px 0;
            }
          }
          .line-height_48{
            line-height: 48px;
          }
          .ul_content>li{
              float:left;
              text-align:center;
              height: 60px;
              ul{
                width: 760px;
                position:relative;
                overflow: hidden;
                float:left;
                li{
                  float:left;
                  text-align: center;
                }
              }
            }
            .strongIndex{
              font-family: MicrosoftYaHei-Bold;
              font-size: 16px;
              color: #333333;
              font-weight: bold;
            }
            .border-left{
              border-left:1px solid #E1E1E1;
            }
      }
    }
    .qualified{
      padding-top: 20px;
      overflow: hidden;
      font-size: 12px;
      color: #333333;
      .qualified_head{
        .title{
          width: 60px;
          float:left;
        }
      }
      .el-select{
        width: 100px;
      }
      .foot_message{
        margin-top: 20px;
          .title{
            width: 60px;
            float:left;
            text-align: right;
          }
          .el-textarea{
            float:left;
            width: calc(100% - 60px);
          }
      }
    }
    .qualified_btn{
      margin-top: 30px;
      padding-top: 14px;
      border-top: 1px solid #e1e1e1;
      .el-button{
        padding:8px 18px;
        float:right;
      }
      .el-button--primary{
        margin-left: 30px;
      }
    }
}
</style>