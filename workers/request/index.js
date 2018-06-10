var utils = require('./utils')
var count = 0;
var timestamp1 =0;
// 在 Worker 线程执行上下文会全局暴露一个 `worker` 对象，直接调用 worker.onMeesage/postMessage 即可
worker.onMessage(function (res) {
  var that = res.obj;
  count = 0;
 Countdown(that);

})

function Countdown(that) {
  timestamp1 = (new Date()).valueOf();
  while (((new Date()).valueOf() - timestamp1) != 1000) {
  }
  timestamp1 = (new Date()).valueOf();
  //var count = that.data.count;
  count++;
  console.log(count);
  worker.postMessage({
    back: count
  })
  Countdown(that);
  /*
  timer = setTimeout(function () {

    Countdown(that);
  }, 1000);*/
};
