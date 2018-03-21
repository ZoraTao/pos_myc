<template>


<div class="content_box flexH100">

    <div class="optometry_list_top am_bg_white">

        <div class="fn_left mgt4 mgr10">
            <span class="member">品牌:</span>
            <!-- <nz-select style="width: 120px;" [(ngModel)]="selectedOption" [nzPlaceHolder]="'请选择'" nzAllowClear>
                <nz-option
                    *ngFor="let option of options"
                    [nzLabel]="option.label"
                    [nzValue]="option"
                    [nzDisabled]="option.disabled">
                </nz-option>
            </nz-select> -->
        </div>
        <div class="fn_left mgt4">
            <span class="member">品种:</span>
            <!-- <nz-select style="width: 120px;" [(ngModel)]="selectedOption" [nzPlaceHolder]="'请选择'" nzAllowClear>
                <nz-option
                    *ngFor="let option of options"
                    [nzLabel]="option.label"
                    [nzValue]="option"
                    [nzDisabled]="option.disabled">
                </nz-option>
            </nz-select> -->
        </div>        
        <div class="fn_left mgt2 mgl30">
            <button class="col_blue_bg_white find_btn">
                查询
            </button>
        </div>

        <div class="fn_right ">
            <button class="col_blue_bg_white find_btn mgr10">
                导出
            </button>
            <button class="col_blue_bg_white find_btn">
                导入
            </button>
        </div>

    </div>
    <div class="optometry_content optometry_content">
        <!--验光列表-->
        <div class="h100">
            <div class="list_name">超期单据列表 (23)</div>
            <!-- <nz-table #nzTable class="h100" [nzDataSource]="data" [nzPageSize]="20" [nzShowTotal]="200">
                <thead nz-thead>
                    <tr>
                        <th nz-th><span>订单编号</span></th>
                        <th nz-th><span>会员姓名</span></th>
                        <th nz-th><span>会员性别</span></th>
                        <th nz-th><span>手机</span></th>
                        <th nz-th><span>地址</span></th>
                        <th nz-th><span>商品总数</span></th>
                        <th nz-th><span>未取数</span></th>
                        <th nz-th><span>下单时间</span></th>
                        <th nz-th><span>应取镜时间</span></th>
                        <th nz-th><span>超期天数</span></th>
                    </tr>
                </thead>
                <tbody nz-tbody>
                    <tr nz-tbody-tr *ngFor="let data of nzTable.data">
                        <td nz-td class="am-ft-00AFE4">{{data.id}}</td>
                        <td nz-td class="am-ft-00AFE4">{{data.name}}</td>
                        <td nz-td>{{data.sex}}</td>
                        <td nz-td>{{data.telephone}}</td>
                        <td nz-td>{{data.address}}</td>
                        <td nz-td>{{data.salesCount}}</td>
                        <td nz-td>{{data.unGetCount}}</td>
                        <td nz-td>{{data.orderTime}}</td>
                        <td nz-td class="am-ft-F58B8B">{{data.shouldTime}}</td>
                        <td nz-td class="am-ft-F58B8B">{{data.exceedTime}}</td>
                    </tr>
                </tbody>

            </nz-table> -->
        </div>
        <!--验光单一条数据详情-->
    </div>

</div>
</template>

<script>

export default {
  name: 'timeoutBill',
  data () {
    return {}
  }
}
</script>

<style scoped lang="scss">
.optometry_list_top {
    height: 70px;
    width: 100%;
    padding: 18px 20px;
}

.member {
    display: inline-block;
    width: 43px;
    font-weight: bold;
    font-size: 12px;
}

.mgt4 {
    margin-top: 4px;
}

.mgt2 {
    margin-top: 2px;
}

.find_btn {
    width: 96px;
    height: 30px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    letter-spacing: 0;
}

.add_btn {
    width: 100px;
    height: 34px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    letter-spacing: 0;
}

.col_blue_bg_white {
    color: #00AFE4;
    background: white;
    border: 1px solid #00AFE4;
    border-radius: 4px;
}

.bg_white_col_blue {
    color: #ffffff;
    background: #00AFE4;
    border: 1px solid #00AFE4;
    border-radius: 4px;
}

.optometry_input {
    background: #F8F8F8;
    border: 1px solid #E1E1E1;
    padding: 2px 10px;
    height: 26px;
}

.optometry_content {
    position: relative;
    margin-top: 10px;
    width: 100%;
    height: calc(100% - 110px);
    background: white;
    padding: 11px;
}

.find_before {
    width: 250px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 24%;
    margin-left: -125px;
    /*margin-top: -150px;*/
}

.find_before li {
    text-align: center;
    margin-top: 23px;
}

li.optometry_qs_img {
    margin-left: 25px;
}

li.optometry_qs_text {
    text-align: center;
    font-size: 14px;
    color: #888888;
    letter-spacing: 0.51px;
}


/*列表*/

.list_name {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    line-height: 26px;
    color: #333333;
    letter-spacing: 0;
    padding-left: 20px;
    margin-bottom: 5px;
}

:host ::ng-deep .ant-table-thead th {
    background: #B3E3F6;
    font-weight: bold;
    font-size: 12px;
    color: #555555;
    letter-spacing: 0;
    text-align: center;
}

:host ::ng-deep .ant-table-tbody tr td {
    font-size: 13px;
    color: #333333;
    letter-spacing: 0;
    text-align: center;
}
.h100{
    height: 100%;
}
:host ::ng-deep .ant-table-wrapper{
    height:calc(100% - 26px);
    overflow-y: scroll;
    padding-bottom: 60px;
}
:host ::ng-deep .ant-pagination{
    position: fixed;
    right: 30px;
    bottom: 0;
}
.am-ft-F58B8B{
    color: #F58B8B !important;
}
</style>
