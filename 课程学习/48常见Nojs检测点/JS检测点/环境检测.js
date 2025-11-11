// 一、基本环境检测
// 1. 检测全局对象（window/global）
const hasWindow = typeof window !== 'undefined';
const hasGlobal = typeof global !== 'undefined';

// 2. 检测Node特有全局变量（修正process判断逻辑）
const hasProcess = typeof process !== 'undefined'; // 标准Node环境仅需判断process存在性
const hasDirname = typeof __dirname !== 'undefined';
const hasFilename = typeof __filename !== 'undefined';

// 3. 检测运行时版本信息
const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : null;
const nodeVersion = hasProcess ? process.version : null;

// 二、全局对象与属性检测
// 1. 检测浏览器特有DOM/BOM对象
const hasDocument = typeof document !== 'undefined';
const hasNavigator = typeof navigator !== 'undefined';
const hasScreen = typeof screen !== 'undefined';
const hasHistory = typeof history !== 'undefined';

// 2. 检测定时器API差异
let timerOrder = [];
if (typeof setTimeout !== 'undefined') {
  Promise.resolve().then(() => timerOrder.push('promise'));
  setTimeout(() => timerOrder.push('timeout'), 0);
}

// 3. 检测浏览器特有编码API
const hasAtobBtoa = typeof atob !== 'undefined' && typeof btoa !== 'undefined';

// 三、原型链与内置类型检测
// 1. 检测Function原型toString差异
const functionToString = Function.prototype.toString.call(Function);
const isBrowserFunctionToString = !functionToString.includes('[native code]');

// 2. 检测对象toString标签差异
const processToString = hasProcess ? Object.prototype.toString.call(process) : '';
const isNodeProcess = processToString === '[object process]';

// 3. 检测日期对象差异
const dateLocale = typeof Date !== 'undefined' ? new Date().toLocaleString() : '';
const hasHrtime = hasProcess && typeof process.hrtime !== 'undefined';

// 四、模块系统检测
// 1. 检测模块加载方式
const hasRequire = typeof require !== 'undefined';
const isESModule = (() => {
  try {
    // ES模块中顶层this为undefined，CommonJS中为module.exports
    return typeof this === 'undefined';
  } catch (e) {
    return false;
  }
})();
const hasModule = typeof module !== 'undefined' && typeof module.exports !== 'undefined';

// 2. 检测Node内置模块
let hasNodeBuiltinModules = false;
if (hasRequire) {
  try {
    require('fs');
    require('path');
    hasNodeBuiltinModules = true;
  } catch (e) {
    hasNodeBuiltinModules = false;
  }
}

// 五、底层API检测
// 1. 检测DOM操作API
const hasDomSelectors = hasDocument && typeof document.querySelector !== 'undefined';
const hasAddEventListener = hasWindow && typeof window.addEventListener !== 'undefined';

// 2. 检测BOM操作API
const hasWindowOpen = hasWindow && typeof window.open !== 'undefined';
const hasLocation = hasWindow && typeof window.location !== 'undefined';

// 3. 检测网络请求API
const hasXHR = typeof XMLHttpRequest !== 'undefined';
const hasFetch = typeof fetch !== 'undefined';
const hasHttpModule = hasRequire ? (() => {
  try { return typeof require('http') !== 'undefined'; }
  catch (e) { return false; }
})() : false;

// 4. 检测存储API
const hasLocalStorage = hasWindow && typeof window.localStorage !== 'undefined';
const hasDocumentCookie = hasDocument && typeof document.cookie !== 'undefined';

// 六、安全与权限检测
// 1. 检测CSP配置
const hasCSP = hasDocument ? !!document.querySelector('meta[http-equiv="Content-Security-Policy"]') : false;

// 2. 检测跨域限制（通过尝试跨域请求）
let crossOriginRestricted = null;
if (hasFetch) {
  fetch('https://example.com')
    .then(() => crossOriginRestricted = false)
    .catch(() => crossOriginRestricted = true)
    .finally(() => {
      if (crossOriginRestricted === null) crossOriginRestricted = true;
    });
}

// 3. 检测文件系统访问权限
let canAccessFileSystem = false;
if (hasRequire) {
  try {
    // 仅在Node环境下尝试读取文件
    if (hasDirname) {
      require('fs').readFileSync(__filename);
      canAccessFileSystem = true;
    }
  } catch (e) {
    canAccessFileSystem = false;
  }
}

// 七、其他细节差异检测
// 1. 检测错误堆栈特征
let errorStackIsNode = false;
try {
  throw new Error('test');
} catch (e) {
  errorStackIsNode = e.stack.includes(__filename) || e.stack.includes('module.js');
}

// 2. 检测Buffer对象（Node特有）
const hasBuffer = typeof Buffer !== 'undefined';

// 综合判断结果（增强Node识别可靠性）
const isBrowser = hasWindow && hasDocument && hasNavigator && !hasProcess;
// 允许__dirname可能被隐藏的情况，通过Buffer辅助判断
const isNode = !hasWindow && hasProcess && (hasDirname || hasBuffer);

// 输出检测结果（包含关键验证项）
console.log('环境检测结果:', {
  isBrowser,
  isNode,
  // 核心验证特征
  hasWindow,
  hasProcess,
  hasDocument,
  hasDirname,
  hasBuffer,
  // 版本信息
  nodeVersion,
  userAgent
});
