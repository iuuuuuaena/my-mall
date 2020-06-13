<template>
    <div>


    </div>
</template>


<script>
export default {
// http://localhost:8081/order?charset=utf-8&out_trade_no=1591840494183&method=alipay.trade.page.pay.return&total_amount=100.00&sign=REIpCWXyEFmJ8cjsozXkDcfd9o5QlQ%2B4b5qY9Nat27NkIKxy2YKhNSRlzQnsqfH1gV8fDvFYMxDbDdxphyA8jWwdexCeykBbxN1ARs8azAiraxV5sUlhYcy53m17obfLjaaGvd3Eo3TEwxKOkHiMMMaT1qjap4bswDq0zlMQdxLFXYnDPoVlcu2AKcpD%2BWdOrpI9Q5eaVBFL5Tw%2FMlQoSkYyTiCCRrZEjBUhkzeYbYnlJUZ8kDO%2F7rjPQVdjpAN9YJhP8Rlthg91dWpUHnKyiDaeTSOBj8ecNxNOO11qXaVOgoAAlPfkHhc%2FU%2BYadnNIl6rLtS2ogj9Oc99rFEuntw%3D%3D&trade_no=2020061122001499810501113034&auth_app_id=2016102800774655&version=1.0&app_id=2016102800774655&sign_type=RSA2&seller_id=2088102181358531&timestamp=2020-06-11%2009%3A55%3A18
  mounted() {
    // 创建支付宝调用页面
    const div = document.createElement("div");
    div.innerHTML = this.$route.query.htmls;
    document.body.appendChild(div);
    document.forms[0].submit();
  },
  beforeDestroy(){
    window.onbeforeunload=function(e){     
　　var e = window.event||e;  
　　e.returnValue=("确定离开当前页面吗？");
} 
  }
}
</script>