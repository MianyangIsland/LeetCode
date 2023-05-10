// 1. 两数之和

// 暴力解法，时间复杂度为o(n^2)
// const twoSum = function(nums, target) {
//     let res = [];
//     for( let i = 0; i < nums.length ; ++i ) {
//         for( let j = 0; j < nums.length; ++j ) {
//             if( ( nums[i] + nums[j] ) === target && i !== j ) {
//                 return [i,j];
//             }
//         }
//     }
//     return res;
// }

// 用hashMap存储遍历过的元素和对应的索引. 每遍历一个元素，看看hashMap中是否存在满足要求的目标数字.所有事情在第一次遍历中完成(用了空间换取时间).
// const twoSum = ( nums , target ) => {
//     const prevNums = {};
//     for( let i = 0 ; i < nums.length ; ++i) {
//         const curNum = nums[i];
//         const targetNum = target - curNum;
//         const targetNumIndex = prevNums[targetNum];

//         if(targetNumIndex !== undefined) {
//             return [targetNumIndex,i];
//         } else {
//             prevNums[curNum] = i;
//         }
//     }
// }

//9. 回文数
// 第一种方法 : 字符串方法 --- 推荐
// const isPalindrome = function(x) {
//     if( x < 0 ) {
//         return false;
//     }
//     const temp = x.toString().split('').reverse().join('');
//     if( temp !== x.toString() ) {
//         return false
//     }
//     return true;
// }

// 第二种方法普通数学方法
// const isPalindrome = function(x) {
//     if(x < 0) {
//         return false;
//     } 
//     let temp = x;
//     let a = 0;
//     while(temp > 0) {
//         a = a * 10 + temp % 10;
//         temp = Math.floor(temp / 10);
//     }
//     if(a === x) {
//         return true;
//     }

//     return false;
// }