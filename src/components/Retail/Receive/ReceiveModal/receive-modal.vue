<template>
<div class="">
    <div class="modalContent">
        <div class="saomaHead">
            <el-row :gutter="20">
                <el-col :span="12">
                <div>
                    <span class="logistics_text">物流码：</span><input type="text" placeholder="扫码物流袋编码" />
                </div>
                </el-col>
                <el-col :span="12">
                <div class="am-ft-gray3" >
                    <span class="am-ft-gray6 am-ft-12">销售单号：</span>LSD000000001
                </div>
                </el-col>
            </el-row>
        </div>
        <div class="saomaMsg">
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="am-ft-16 am-ft-gray3 ft_bold " :span="8">
                        562536256452
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="am-ft-14 am-ft-gray3 ft_bold" :span="8">
                        镜架：LEVIS光学镜架
                    </div>
                </el-col>
            </el-row>
            <div class="am-ft-12 am-ft-gray5">数量：<span class="am-ft-gray5 ft_bold">1</span></div>
            <el-row :gutter="20">
                <el-col :span="8">
                    <div class="am-ft-16 am-ft-gray3 ft_bold ">
                        <input type="text" class="saomaMsgBt" placeholder="商品实物码" />
                    </div>
                </el-col>
                <el-col :span="8">
                    <el-checkbox><span>无商品实物码</span></el-checkbox>
                </el-col>                
            </el-row>
        </div>
    </div>
    <div class=" model-bottom">
        <button type="button" class="footerBtnNo mgr15">取消</button>
        <button type="button" class="footerBtn mgr15">确认</button>
    </div>
</div>
</template>

<script>

export default {
  name: 'ReceiveModal',
  data () {
    return { 
    }
  },
  methods:{
  }
}
</script>

<style scoped lang="scss">
@import "../../../../reset";
/*modal*/
.modalContent{
    padding: 10px 30px !important;
    padding-top: 0 !important;
}
.saomaHead {
    height: 46px;
    line-height: 30px;
    width: 100%;
    border-bottom: 1px dashed #E1E1E1;
}

.saomaHead input,
.saomaMsgBt {
    width: 130px;
    height: 30px;
    padding: 0 10px;
    font-size: 12px;
    background: #FFFFFF;
    border: 1px solid #E1E1E1;
}

.saomaHead .logistics_text {
    font-size: 14px;
    color: #666666;
    letter-spacing: 0;
    font-weight: bold;
}

.saomaMsg {
    padding: 10px 0;
}

.saomaMsg>div {
    margin-top: 10px;
}

.checkoutBt {
    line-height: 30px;
}
.model-bottom {
    border-top: none;
    background: #F1F1F1;
    width: 100%;
    height: 60px;
    padding: 14px 17px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    text-align: right;
    margin-bottom: -15px;
}
.footerBtnNo{
    width: 90px;
    height: 30px;
    border: 1px solid #C7C7C7;
    font-size: 12px;
    color: #666666;
    letter-spacing: 0;
    border-radius: 4px;
}
.footerBtn{
    width: 90px;
    height: 30px;
    border: none;
    font-size: 12px;
    color: #FFFFFF;
    background: #00AFE4;
    border-radius: 4px;
    margin-left: 8px;
    margin-bottom: 0;
}
</style>
