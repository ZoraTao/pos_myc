<template>
<div id="customizeRH" class="clearfix modal-content-center">
    <div class="modal-content-left customizeRHBody">
        <h5>右镜片-定做单号：DZ12340001</h5>
        <div class="customizeInputGroup fn-left">
            <label>球镜：</label>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>
        <div class="customizeInputGroup fn-left">
            <label>柱镜：</label>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>                            
        <div class="customizeInputGroup fn-left">
            <label>下加光：</label>
                <el-select v-model="value" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
        </div>
    </div>
    <div class="customizeRHBody">
        <div class="customizeInputGroup textareaGroup fn-left">
            <label>定做需求：</label>
            <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入内容"></el-input>
        </div>                               
    </div>                               
    <div class="customizeRHBody">
        <div class="customizeInputGroup fn-left">
            <label>原单价：</label>
            <el-input style="width:68px" placeholder=""></el-input>
        </div>                          
        <div class="customizeInputGroup fn-left">
            <label>数量：</label>
            <el-input style="width:40px" placeholder=""></el-input>
        </div>                          
        <div class="customizeInputGroup fn-left">
            <label>折扣：</label>
            <el-input style="width:40px" placeholder=""></el-input>
        </div>                          
        <div class="customizeInputGroup fn-left">
            <label>实售单价：</label>
            <el-input style="width:68px" placeholder=""></el-input>
        </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'CustomizeRHModal',
  data () {
    return { 
        options: [{
          value: '选项1',
          label: '黄金糕'
        }],
        value:"",
        data:[
            {
                shopid:'0012345',
                shopname:'毛源昌1.551非球面防辐射远+1.50',
                storehouse:'总仓库',
                inventory:'24',
                allocation:'20',
                price:'230.00'
            }
        ]
    }
  },
  methods:{

  }
}
</script>

<style lang="scss">
.customizeRH{
    .el-table th {
        background: #fff !important;
    }

    .modal-content-center{
        padding: 15px 20px;
        overflow: hidden;
    }
    #customizeRH{
        .customizeRHBody{
            width: 100%;
            overflow: hidden;
            h5{
                font-weight: bold;
                font-size: 13px;
                color: #666666;
                margin-bottom: 15px;
            }
            .customizeInputGroup{
                font-size: 12px;
                color: #666666;
                margin-left: 10px;
                label{
                    width: 60px;
                    text-align: right;
                    display: inline-block;
                    margin-right: 10px;
                }
                .el-select{
                    width: 100px;
                }
                .el-textarea{
                    width: calc(100% - 180px);
                }
            }
            .textareaGroup{
                width: 100%;
                margin: 10px;
                label{
                    vertical-align: top;
                }
            }
        }
        .customizeRHFooter{
            background: #F4F4F4;
            button{
                margin: 20px;
                padding: 0px 30px;
                background: #00AFE4;
                border-radius: 4px;
            }
        }
    }
}
</style>
