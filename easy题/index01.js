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

// 14. 最长公共前缀
// function longestCommonPrefix(strs) {
//   let res = strs[0] || '';
//   if ( strs.length === 0 || strs.length === 1 ) {
//     return res;
//   }

//   for(let i = 1; i<strs.length ; ++i ) {
//      while( strs[i].slice(0, res.length) !== res ) {
//         res = res.slice(0,res.length - 1);
//      }
//   }

//   return res;
// }


//20. 有效的括号 --- 辅助栈的方法.
// const s = '()[]{}'
// const isValid = (s) => {
//   const n = s.length;
//   if( n % 2 === 1 ) {
//     return false;
//   }
//   const paris = new Map([
//     [']','['],
//     ['}','{'],
//     [')','(']
//   ]);
//   const stk = [];
//   for( let ch of s) {
//     if(paris.has(ch)) {
//       if(!stk.length || stk[stk.length - 1] !== paris.get(ch) ) { 
//         return false;
//       } else {
//         stk.pop();
//       }
//     } else {
//       stk.push(ch);
//     }
//   }
//   return !stk.length;
// }

// console.log(isValid(s));

//21. 合并两个有序链表
/**
 *  将两个升序链表合并为一个新的升序链表并返回.新链表是通过拼接给定的两个链表的所有节点组成的.
 */

// const mergeTwoLists = (list1,list2) => {
//   let head_1 = list1;
//   let head_2 = list2;
//   const head = new ListNode(-1);
//   let p = head;
//   while( head_1 !== null && head_2 !== null ) {
//     if(head_1.val < head_2.val ) {
//       p.next = head_1;
//       head_1 = head_1.next;
//     } else {
//       p.next = head_2;
//       head_2 = head_2.next;
//     }
//     p = p.next;
//   }
//   p.next = head_1 === null ? head_2 : head_1;
//   return head.next;
// }

// 26. 删除有序数组中的重复项
/**
给你一个 升序排列 的数组 nums ，请你 原地 删除重复出现的元素，使每个元素 只出现一次 ，返回删除后数组的新长度。元素的 相对顺序 应该保持 一致 。然后返回 nums 中唯一元素的个数。

考虑 nums 的唯一元素的数量为 k ，你需要做以下事情确保你的题解可以被通过：

更改数组 nums ，使 nums 的前 k 个元素包含唯一元素，并按照它们最初在 nums 中出现的顺序排列。nums 的其余元素与 nums 的大小不重要。
返回 k 。
 */

/**
 * 方法: 双指针:
 * 这道题目的要求是: 对给定的有序数组nums删除重复元素, 在删除重复元素之后,每个元素只出现一次, 并返回新的长度，上述操作必须通过原地修改数组的方法，使用O(1)的空间
 * 复杂度.
 * 
 * 由于给定的数组 nums\textit{nums}nums 是有序的，因此对于任意 i<ji<ji<j，如果 nums[i]=nums[j]\textit{nums}[i]=\textit{nums}[j]nums[i]=nums[j]，则对任意 i≤k≤ji \le k \le ji≤k≤j，必有 nums[i]=nums[k]=nums[j]\textit{nums}[i]=\textit{nums}[k]=\textit{nums}[j]nums[i]=nums[k]=nums[j]，即相等的元素在数组中的下标一定是连续的。利用数组有序的特点，可以通过双指针的方法删除重复元素。

如果数组 nums\textit{nums}nums 的长度为 000，则数组不包含任何元素，因此返回 000。

当数组 nums\textit{nums}nums 的长度大于 000 时，数组中至少包含一个元素，在删除重复元素之后也至少剩下一个元素，因此 nums[0]\textit{nums}[0]nums[0] 保持原状即可，从下标 111 开始删除重复元素。

定义两个指针fast和slow分别为快指针和慢指针，快指针表示遍历数组到达的下标位置，慢指针表示下一个不同元素要填入的下标位置，初始时两个指针都指向下标1.

假设数组nums的长度为n. 将快指针fast依次遍历从1到n-1 的每个位置，对于每个位置，如果nums[fast] != nums[fast-1] , 说明nums[fast] 和之前的元素都不同，因此将nums[fast] 的值复制到nums[slow], 然后将slow的值加1,即指向下一个位置.

遍历结束之后，从nums[0]搭配nums[slow-1]的每个元素都不相同且包含原数组中的每个不同元素，因此新的长度即为slow,返回slow即可.
 */

// const removeDuplicates = function(nums) {
//     const n = nums.length;
//     if( n === 0 ) {
//         return 0;
//     }
//     let fast = 1; let slow = 1;
//     while( fast < n ) {
//         if( nums[fast] !== nums[fast - 1] ) {
//             nums[slow] = nums[fast];
//             ++slow;
//         }
//         ++fast;
//     }
//     return slow;
// }


//35. 搜索插入位置
/**
 *给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

  请必须使用时间复杂度为 O(log n) 的算法。
 */
// 典型二分查找
// const nums = [1,3,5,6];
// const target = 2;
// const searchInsert = (nums, target) => {
//     let left = 0;
//     let right = nums.length - 1;
//     while( left <= right ) {
//         let index = Math.floor((right + left) / 2);
//         if(nums[index] === target) {
//             return index;
//         } else if(nums[index] < target) {
//             left = index + 1;
//         } else {
//             right = index - 1;
//         }
//     }
//     return left;
// }

// console.log(searchInsert(nums,target));

// 58. 最后一个单词的长度
/**
 * 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中 最后一个 单词的长度。

   单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。
 */
// const s = "luffy is still joyboy"
// const lengthOfLastWord = (s) => {
//     let arr = s.split(' ');
//     let len = 0;
//     arr.forEach((item) => {
//         if(item.length > len) {
//             len = item.length;
//         }
//     })
//     return len;
// }
// console.log(lengthOfLastWord(s));

