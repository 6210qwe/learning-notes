// 一、全局对象原型链差异
// 1. 顶层对象的原型链终点
// 一个是代码加密：ob混淆 + jsvmp混淆
// 另一个是：环境检测点
// 环境校验, 通过参数的方法, 参与到参数的生成中
// 代码混淆, 增加调试难度
const windowPrototypeChain = (() => {
  if (typeof window === 'undefined') return null;
  let chain = [];
  let current = window;
  while (current !== null) {
    chain.push(current.constructor.name);
    current = Object.getPrototypeOf(current);
  }
  return chain;
})();
// 浏览器window原型链：[Window, EventTarget, Object, null]
// Node.global原型链：[Object, null]

// 2. 全局函数的原型差异
const globalFunctionPrototype = Object.getPrototypeOf(Function);
const isBrowserFunctionPrototype = globalFunctionPrototype === Function.prototype;
// 浏览器中Function的原型链更复杂，Node中更简洁


// 二、内置对象原型差异
// 1. 数组(Array)原型方法差异
const arrayPrototypeDiff = (() => {
  const arr = [];
  // Node对部分数组方法有扩展实现差异
  return {
    hasNodeArrayExtensions: typeof arr.flatMap === 'function' &&
                          arr.flatMap.toString().includes('[native code]'),
    hasBrowserArrayFeatures: typeof arr.values === 'function' &&
                           typeof arr[Symbol.iterator] === 'function'
  };
})();

// 2. 函数(Function)原型toString差异
const functionToStringDiff = (() => {
  const nativeFunc = Object.prototype.toString;
  const str = nativeFunc.toString();
  return {
    browserStyle: str.startsWith('function toString()') && !str.includes('native code'),
    nodeStyle: str.includes('[native code]') && str.startsWith('function toString()')
  };
})();
// 浏览器中内置函数toString更接近源码格式，Node会明确标记[native code]


// 三、对象原型链核心差异
// 1. 普通对象的原型链终点
const plainObjectPrototype = Object.getPrototypeOf({});
const isBrowserObjectPrototype = plainObjectPrototype === Object.prototype &&
                               Object.getPrototypeOf(plainObjectPrototype) === null;
// 浏览器中普通对象原型链终点是null

const nodeGlobalPrototype = (() => {
  if (typeof global === 'undefined') return null;
  return Object.getPrototypeOf(global);
})();
// Node中global的原型是Object.prototype，与浏览器window不同


// 2. 错误对象(Error)原型链差异
const errorPrototypeChain = (() => {
  const err = new Error();
  let chain = [];
  let current = err;
  while (current !== null) {
    chain.push(current.constructor.name);
    current = Object.getPrototypeOf(current);
  }
  return chain;
})();
// 浏览器Error原型链：[Error, Object, null]
// Node Error原型链：[Error, Object, null]（结构相同但内部实现有差异）


// 四、特殊对象原型检测
// 1. 全局对象的构造函数差异
const windowConstructor = typeof window !== 'undefined' ? window.constructor : null;
const isBrowserWindowConstructor = windowConstructor && windowConstructor.name === 'Window';

const globalConstructor = typeof global !== 'undefined' ? global.constructor : null;
const isNodeGlobalConstructor = globalConstructor && globalConstructor.name === 'Object';
// 浏览器window有专门的Window构造函数，Node的global构造函数是Object


// 2. 数组缓冲区(ArrayBuffer)原型差异
const arrayBufferPrototype = typeof ArrayBuffer !== 'undefined' ? ArrayBuffer.prototype : null;
const hasBrowserBufferFeatures = arrayBufferPrototype && typeof arrayBufferPrototype.slice === 'function';
const hasNodeBufferFeatures = typeof Buffer !== 'undefined' && Buffer.prototype instanceof Uint8Array;
// Node的Buffer是Uint8Array子类，浏览器无Buffer但有标准ArrayBuffer


// 五、综合原型链特征判断
const isBrowserByPrototype =
  windowPrototypeChain?.includes('Window') &&
  functionToStringDiff.browserStyle &&
  isBrowserWindowConstructor &&
  hasBrowserBufferFeatures;

const isNodeByPrototype =
  (nodeGlobalPrototype?.constructor?.name === 'Object') &&
  functionToStringDiff.nodeStyle &&
  isNodeGlobalConstructor &&
  hasNodeBufferFeatures;


// 输出原型链检测结果
console.log('原型链差异检测结果:', {
  isBrowserByPrototype,
  isNodeByPrototype,
  // 关键原型链特征
  windowPrototypeChain,
  functionToString: functionToStringDiff,
  errorPrototypeChain,
  arrayBufferFeatures: {
    browser: hasBrowserBufferFeatures,
    node: hasNodeBufferFeatures
  }
});
