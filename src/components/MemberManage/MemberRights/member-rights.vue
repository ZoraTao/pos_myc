<template>
  <div class="member-rights">
    <h3><span></span>会员等级及权益<span></span></h3>
    <div class="content">
      <div class="info-item">
        <span class="title">1、会员等级</span>
        <p>毛源昌眼镜会员分为普卡、金卡、白金卡</p>
      </div>
      <div class="info-item">
        <span class="title">2、会员权益</span>
        <p><em>2.1</em>折扣福利：折扣购镜，专属优惠；</p>
        <p><em>2.2</em>积分福利：消费积累积分，消费越多，积分越多，积分可当钱花；</p>
        <p><em>2.3</em>生日福利：会员生日当月消费双倍积分（以注册会员所填写日期为准，不与其他优惠同享）；</p>
        <p><em>2.4</em>会员独享活动：不定期举办会员答谢、积分换礼、让利等主题活动；</p>
        <p><em>2.5</em>积分累计送礼：有效期内每积累1000积分，即送精美礼品1份（不减扣积分直接赠送）</p>
        <p><em>2.6</em>会员身份终生有效（不允许客人自己解绑）；</p>
        <p><em>2.7</em>专享新品优先享受福利、护理知识及促销资讯。</p>
      </div>
      <div class="info-item">
        <span class="title">3、会员折扣</span>
        <p><em>普卡：</em>享受框架类、太阳镜可享受正价商品8.5折优惠，隐形眼镜、护理产品享受 9.5 折优惠（不与其它优惠并用）</p>
        <p><em>金卡：</em>框架类可享受正价商品 8 折优惠，定制镜片、隐形眼镜、护理产品享受 9 折优惠（不与其它优惠并用）</p>
        <p><em>白金卡：</em>框架类可享受正价商品 7.5 折优惠，定制镜片、隐形眼镜、护理产品享受 8.8 折优惠（不与其它优惠并用）</p>
        <p><em>兰州6.5折卡：</em>保留但不增加</p>
      </div>
      <div class="info-item">
        <span class="title">4、成长值（会员升级）</span>
        <p>成长值是提升会员等级的唯一标准，每消费（实付）10元获得1个成长值。</p>
        <p><em>普卡：</em>0-499成长值</p>
        <p><em>金卡：</em>500-999成长值</p>
        <p><em>白金卡：</em>1000及以上成长值</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "member-rights",
    data() {
      return {}
    }
  }
</script>

<style scoped lang="scss">
  .member-rights{
    padding: 10px 30px;
    background-color: #ffffff;
    h3{
      font-size: 20px;
      color: #D2A051;
      text-align: center;
      padding: 20px 0;
      border-bottom: 2px dashed #ebeef5;
      span{
        width: 45px;
        height: 2px;
        display: inline-block;
        vertical-align: middle;
        transform: rotate(180deg);
        background-image: linear-gradient(-47deg, #E8CE93 0%, #D09C4A 100%);
        &:first-child{
          margin-right: 16px;
        }
        &:last-child{
          margin-left: 16px;
        }
      }
    }
    .content{
      font-size: 14px;
      color: #151515;
      line-height: 26px;
      .info-item{
        width: 100%;
        p{
          padding-left: 20px;
        }
        .title{
          font-size: 16px;
          color: #FFFFFF;
          text-align: center;
          padding: 5px 20px;
          background-image: linear-gradient(47deg, #E8CE93 0%, #D09C4A 100%);
          border-radius: 45px;
          display: inline-block;
          margin: 20px 0 10px;
        }
        em{
          font-style: normal;
          font-weight: bold;
          margin-right: 5px;
        }
      }

    }
  }
</style>
