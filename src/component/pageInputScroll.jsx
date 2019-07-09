function pageInputScroll() {

  // // 获取dom节点
  // let wrapDiv = document.getElementById('TencentCaptcha');
  // console.log(wrapDiv);

  // 扩展API加载完毕后调用onPlusReady回调函数      *****定位
 document.addEventListener('plusready', onPlusReady, false);
 // 扩展API加载完毕，现在可以正常调用扩展API
 function onPlusReady() {
   console.log(1111);
   var aa = 111;
   return aa;
  // plus.geolocation.getCurrentPosition(function(p) {
  //   localStorage.setItem("latitude", p.coords.latitude);      //经度
  //   localStorage.setItem("longitude", p.coords.longitude);    //维度
  //   console.log(p.coords.latitude);
  //   console.log(p.coords.longitude);
  // }, function(e) {
  //  alert('Geolocation error: ' + e.message);
  // });
 }

}
export {
  pageInputScroll
};
