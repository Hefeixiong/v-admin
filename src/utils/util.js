export function timeFix() {
  const time = new Date()
  const hour = time.getHours()
  return hour < 9
    ? '早上好'
    : hour <= 11
      ? '上午好'
      : hour <= 13
        ? '中午好'
        : hour < 20
          ? '下午好'
          : '晚上好'
}

export function welcome() {
  const arr = [
    '休息一会儿吧',
    '准备吃什么呢?',
    '要不要打一把 DOTA',
    '我猜你可能累了',
  ]
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}



//
// /**
//  * 触发 window.resize
//  */
// export function triggerWindowResizeEvent() {
//   const event = document.createEvent('HTMLEvents')
//   event.initEvent('resize', true, true)
//   event.eventType = 'message'
//   window.dispatchEvent(event)
// }
//
// export function handleScrollHeader(callback) {
//   let timer = 0
//
//   let beforeScrollTop = window.pageYOffset
//   callback = callback || function() { }
//   window.addEventListener(
//     'scroll',
//     () => {
//       clearTimeout(timer)
//       timer = setTimeout(() => {
//         const afterScrollTop = window.pageYOffset
//         const delta = afterScrollTop - beforeScrollTop
//         if (delta === 0) {
//           return false
//         }
//         let direction = delta > 0 ? 'down' : 'up'
//         callback(direction)
//         beforeScrollTop = afterScrollTop
//       }, 50)
//     },
//     false,
//   )
// }
//
// /**
//  * Remove loading animate
//  * @param id parent element id or class
//  * @param timeout
//  */
// export function removeLoadingAnimate(id = '', timeout = 1500) {
//   if (id === '') {
//     return
//   }
//   setTimeout(() => {
//     document.body.removeChild(document.getElementById(id))
//   }, timeout)
// }
//
// export function toChinesNum(num) {
//   let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']; // changeNum[0] = "零"
//   let unit = ['', '十', '百', '千', '万'];
//   num = parseInt(num);
//   let getWan = (temp) => {
//     let strArr = temp.toString().split('').reverse();
//     let newNum = '';
//     for (var i = 0; i < strArr.length; i++) {
//       newNum = (i == 0 && strArr[i] == 0 ? '' : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? '' : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum;
//     }
//     return newNum;
//   }
//   let overWan = Math.floor(num / 10000);
//   let noWan = num % 10000;
//   if (noWan.toString().length < 4) noWan = '0' + noWan;
//   return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num);
//
// }
//
// /**
//  * 获取链接上的keyValue
//  */
// export function hrefKeyValue(href, key) {
//   const reg = new RegExp(/(\w+)=(\w+)/, 'gi')
//   const results = href.match(reg)
//   if (results) {
//     const resultKeyValues = results.map(o => ({
//       [o.split('=')[0]]: o.split('=')[1]
//     }))
//     const result = resultKeyValues.find(o => o.hasOwnProperty(key))
//     return (result && result[key]) || null
//   } else {
//     return null
//   }
// }
