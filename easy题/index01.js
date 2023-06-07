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

// 66. 加一
// const digits = [4,3,2,1];
// const plusOne = (digits) => {
//   const len = digits.length-1;
//   const res = [];
//   let temp = 0;
//   for(let i = len ; i >= 0 ; --i ) {
//     let t ;
//     if( i === len ) {
//     t  = digits[i] + 1 + temp;
//     } else {
//       t = digits[i] + temp;
//     }
//     temp = Math.floor( t/ 10);
//     res.unshift( t % 10 );
//   }
//   if( temp !== 0 ) {
//     res.unshift(temp);
//   }
//   return res;
// }
// console.log(plusOne(digits));

// 67.二进制求和
// const a ='11';
// const b = '1';
// const addBinary = (a , b) => {
//  let ans = '';
//  let ca = 0;
//  for( let i = a.length - 1 , j = b.length - 1 ; i >=0 || j>=0; i--, j--) {
//   let sum = ca;
//   sum += i >=0 ? parseInt(a[i]) : 0;
//   sum += j >=0 ? parseInt(b[j]) : 0;
//   ans += sum % 2;
//   ca = Math.floor( sum / 2) ;
//  }
//  ans += ca === 1 ? ca : '';
//  return ans.split('').reverse().join('');
// }
// console.log(addBinary(a,b))

// 69. x的平方根.

// let x = 8;
// const mySqrt  = (x) => {
//   if(x == 0 || x == 1) {
//     return x;
//   }
//   for( let i = 0; i < x ; ++i ) {
//     if( i * i < x && (i+ 1) * (i + 1) > x || i * i === x) {
//       return i;
//     }
//   }
// }

// console.log(mySqrt(x))

// 70. 爬楼梯
// const n = 3;
// const climbStairs = (n) => {
//    let a = 1;
//    let b = 2;
//    if( n === 1) {
//     return a;
//    }
//    if( n === 2 ) {
//     return b;
//    }
//    let res = 0;
//    for( let i = 3; i <= n ; ++i) {
//     res = a + b;
//     a = b;
//     b = res;
//    }
//    return res;
// }
// console.log(climbStairs(n));

// 83. 删除排序链表中的重复元素.
// const deleteDuplicates = (head) => {
//   if( !head ) {
//     return head;
//   }
//   let cur = head;
//   while(cur.next) {
//     if( cur.val === cur.next.val ) {
//       cur.next = cur.next.next;
//     } else {
//       cur = cur.next;
//     }
//   }
//   return head;
// }

// 88. 删除排序链表中的重复元素

// 94. 二叉树的中序遍历
// const inorderTraversal = ( root ) => {

//   const res = [];
//   const inorder = ( root ) => {
//     if( !root ) {
//       return;
//     }
//     if( root.left ) inorder(root.left);
//     res.push(root.val);
//     if(root.right) inorder(root.right);
//   }
//   inorder(root);
//   return res;
// }

// 

// 100. 相同的树
// const isSameTree = (p , q) => {
//   if( p === null && q === null ) {
//     return true;
//   }
//   if( p === null || q === null ) {
//     return false;
//   }
//   if( p.val !== q.val) {
//     return false;
//   }
//   return isSameTree(p.left,q.left) && isSameTree(p.right, q.right);
// }


// 101. 对称二叉树
// const isSymmetric = ( root ) => {
//   if( root === null ) return true;
//   let p = root.left;
//   let q = root.right;

//   const inorder  = (a , b) => {
//     if( a === null && b === null) {
//       return true;
//     }
//     if( a === null || b === null ) {
//       return false;
//     }
//     if( a.val !== b.val) {
//       return false;
//     }
//     return inorder(a.left, b.right) && inorder(a.right, b.left);
//   }
//   return inorder(p,q);
// }


// 104. 二叉树的最大深度
// const maxDepth = (root) => {
//   if( !root ) {
//     return 0;
//   } else {
//     const left = maxDepth(root.left);
//     const right = maxDepth(root.right);
//     return Math.max(left,right) + 1; 
//   }
// }

// 108. 将有序数组转换为二叉搜索树
// function TreeNode(val) {
//   this.val = val;
//   this.left = this.right = null;
// }

// function toTreeNode(arr,left,right) {
//   let mid = Math.floor((right + left ) / 2);
//   let node = new TreeNode(arr[mid]);
//   if( left === right) return node;
//   node.right = toTreeNode(arr,mid + 1, right);
//   if( right - left === 1) return node;
//   node.left = toTreeNode(arr,left,mid - 1);
//   return node;
// }

// const sortedArrayToBST = (nums) => {
//   if(nums.length === 0 ){
//     return null;
//   }
//   return toTreeNode(nums,0,nums.length - 1);
// }

//

// 平衡二叉树
// const isBalanced = (root) => {
//    const res = {
//     isBalancedTree: true,
//    }
//    defs(root,res);
//    return res.isBalancedTree;
// }

// const maxDepth = (root) => {
//    if( root === null ) return 0;
//    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
// }

// const defs = (root, res) => {
//    if(root === null) return;
//    if(Math.abs(maxDepth(root.left) - maxDepth(root.right)) > 1) {
//     return res.isBalanced = false;
//    }
//    defs(root.left,res);
//    defs(root.right,res);
// }

// 111. 二叉树的最小深度
// const minDepth = (root) => {
//   if( root === null ) {
//    return 0;
//   }
//   if( root.left === null && root.right === null ) {
//      return 1;
//   }
//   let ans = Number.MAX_SAFE_INTEGER;
//   if( root.left != null ) {
//    ans = Math.min(minDepth(root.left) , ans);
//   }
//   if(root.right != null ){
//    ans = Math.min(minDepth(root.right),ans);
//   }
//   return ans + 1;
// } 

// 112. 路径总和
// const hasPathSum = (root, targetSum) => {
//    if(root === null ) return 0;
//    let res = false;
//    const defs = (root, sum) => {
//       if( !root) {
//          return;
//       }
//       if(sum === targetSum && ( !root.left && !root.right)) {
//          res = true;
//       }
//       if(root.left) defs(root.left, sum + root.left.val);
//       if(root.right) defs(root.left, sum + root.right.val);
//    }

//    defs(root, root.val);
//    return res;
// }

// 118. 杨辉三角形
// const generate = (numRows) => {
//   let res = [];
//   for( let i = 0; i < numRows ; ++i) {
//     let temp = new Array(i + 1).fill(1);
//     for(let j = 1; j < temp.length - 1 ; ++j) {
//       temp[j] = res[ i - 1][j-1] + res[i - 1][j];
//     }
//     res.push(temp);
//   }
//   return res;
// }

// 119. 杨辉三角形 ||
// const getRow = (rowIndex) => {
//   let ret = [];
//   let temp = null;
//   for( let i = 0; i <= rowIndex; ++i) {
//     temp = new Array(i+ 1).fill(1);
//     for( let j = 1; j < temp.length - 1 ; ++j ) {
//       temp[j] = ret[i - 1][j - 1] + ret[i - 1][j];
//     }
//     ret.push(temp);
//   }
//   return temp;
// }

// 121. 买卖股票的最佳时机  --- 取数组两数之差的最大值
/**
  基本思路: 取左值最小值，右值最大值， 两数之差即为最大值.
 */
// const maxProfit = (prices) => {
//   if(prices.length === 0 ) return 0;
//   let min = prices[0];
//   let max = 0;
//   for( let p of prices) {
//     min = Math.min(min,p);
//     max = Math.max(max,p - min);
//   }
//   return max;
// }

//  125. 验证回文串
// const s = "A man, a plan, a canal: Panama";
// const isPalindrome = (s) => {
//   if(!s.length || s.length === 1) {
//     return true;
//   } 

//   let a = '';
//   s = s.trim().split(''); // 去掉空格，转为字符数组
//   for( let i = 0 ; i < s.length ; ++i ) {
//     if((s[i].charCodeAt() >= 65 && s[i].charCodeAt() <= 90) || (s[i].charCodeAt() >= 97 && s[i].charCodeAt() <= 122) ||  (s[i].charCodeAt() >= 48 && s[i].charCodeAt() <= 57 ) ) {
//       a += s[i].toLowerCase();
//     }
//   }
//   return a === a.split('').reverse().join('');
// }
// console.log(isPalindrome(s));

// 141. 环形链表
// const hasCycle = (head) => {
//   while(head) {
//     if(head.tag) {
//       return true;
//     }
//     head.tag = true;
//     head = head.next;
//   }
//   return false;
// }

// const hasCycle = (head) => {
//   try{
//     JSON.stringify(head);
//   } catch(e) {
//     return true;
//   }
//   return false;
// }


// 160 . 相交链表
// var getIntersectionNode = function(headA, headB) {
//   if( headA === null || headB === null) {
//     return null;
//   }
 
//   let pA = headA;
//   let pB = headB;
//   while( pA !== pB ) {
//     pA = pA === null ? headB : pA.next;
//     pB = pB === null ? headA : pB.next;
//   }
//    return pA;
//  };

// var getIntersectionNode = function(headA, headB) {
//   const visited = new Set();
//   let temp = headA;
//   while(temp !== null ) {
//     visited.add(temp);
//     temp = temp.next;
//   }
//   temp = headB;
//   while(temp !== null ) {
//     if(visited.has(temp)) {
//       return temp;
//     }
//     temp = temp.next;
//   }
//   return null;
// };

// 191 . 位1的个数
// var hammingWeight = function(n) {
//   let arr = (n + '').split('');
//   console.log(arr);
//   let flag = 0;
//   arr.forEach((item) => {
//     if(item == 1) {
//       flag++;
//     }
//   })
//   return flag
// };
// const n = 00000000000000000000000000001011;
// hammingWeight(n);

// 2619. 数组原型对象的最后一个元素

// Array.prototype.last = function() {
//   let res = -1;
//   let len = this.length;
//   if( len ) {
//       res = this[len - 1];
//   }  
//   return res;
// };

// 2620.  计数器
// 考察闭包
// const createCounter = function(n) {
//   return function() {
//     return n++;
//   }
// }

// 2621. 睡眠函数
/**
 * 原理就是返回一个promise,在这个promsie中进行一个对应
 * 时长的延迟setTimeout,延迟结束执行resolve,即该promsie
 * 会等到延迟时间到时才会进行回调，达到睡眠的目的.
 */

// async function sleep(millis) {
//   return new Promise( resolve => setTimeout(resolve, millis));
// }

// 2626. 数组归约运算
// const reduce = function(nums, fn, init) {
//   let res = init;
//   for (const num of nums) {
//     res = fn(res, num);
//   }
//   return res;
// }

// 3. 无重复字符的最长字串
/**
 * 给定一个字符串s, 请你找出其中不含有重复的最长字串的长度
 */


// 206. 反转链表
// const reverseList = (head) => {
// let prev = null;
// let curr = head;
// while(curr) {
//   const next = curr.next;
//   curr.next = prev;
//   prev = curr;
//   curr = next;
// }
// return prev;
// }

// 704. 二分查找
// const search = ( nums, target ) => {
//    let left = 0 ;
//    let right = nums.length - 1;
//    while( left <= right ) {
//     let mid = Math.floor(( right - left ) / 2) + left;
//     let data = nums[mid];
//     if(data === target) {
//       return mid;
//     } else if ( nums[mid] > target ) {
//       right = mid - 1;
//     } else {
//       left = mid + 1;
//     }
//    }
//    return -1;
// }

// 217. 存在重复元素
// const nums = [1,1,1,3,3,4,3,2,4,2];
// const containsDuplicate = (nums) => {
//   let temp = new Set();
//   let flag = false;
//   nums.forEach( ele => {
//     if( temp.has(ele) ) {
//       flag = true;
//       return flag;
//     }
//     temp.add(ele);
//   });
//   return flag;
// }
// console.log(containsDuplicate(nums));

// 219. 存在重复元素||
// const containsNearbyDuplicate = ( nums, k ) => {
//   const map = new Map();
//   const length = nums.length;
//   for( let i = 0 ; i < length ; ++i ) {
//     const num = nums[i];
//     if( map.has(num) && i - map.get(num) <= k ) {
//       return true;
//     }
//     map.set(num,i);
//   }
//   return false;
// }

// 226. 翻转二叉树
// const invertTree = (root) => {
//   if( root === null ) {
//     return null;
//   }
//   const left = invertTree(root.left);
//   const right = invertTree(root.right);
//   root.left = right;
//   root.right = left;
//   return root;
// }

// 228. 汇总区间
// const summaryRanges = (nums) => {
//   const ret = [];
//   let i = 0;
//   const n = nums.length;
//   while( i < n ) {
//     const low = i;
//     i++;
//     while( i < n && nums[i] === nums[ i - 1] + 1) {
//       i++;
//     }
//     const high = i - 1;
//     const temp = ['' + nums[low]];
//     if( low < high ) {
//       temp.push('->');
//       temp.push('' + nums[high]);
//     }
//     ret.push(temp.join(''));
//   }
//   return ret;
// }

// 231.  2的幂
