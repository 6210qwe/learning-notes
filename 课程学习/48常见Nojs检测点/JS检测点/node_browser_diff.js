// 运行时类型（browser / node / other）
const runtimeKind = (typeof window !== 'undefined' && typeof window.document !== 'undefined') ? 'browser' : (typeof process !== 'undefined' && process.versions && process.versions.node ? 'node' : 'other');

// 是否 Node.js 环境（含 Deno/JSR 排除）
const isNode = (typeof process !== 'undefined' && process.versions && !!process.versions.node);

// 是否 Deno 环境
const isDeno = (typeof Deno !== 'undefined' && typeof Deno.version !== 'undefined');

// 是否 Bun 环境
const isBun = (typeof Bun !== 'undefined' && !!Bun.version);

// Node 版本（若在 Node）
const nodeVersion = (isNode && process.versions.node) || '';

// 浏览器 UA（Node 中通常为空）
const userAgentBrowser = (typeof navigator !== 'undefined' && navigator.userAgent) || '';

// DOM 是否存在
const hasDOM = (typeof window !== 'undefined' && typeof document !== 'undefined');

// File/Blob 是否可用
const hasFileBlob = (typeof File !== 'undefined' && typeof Blob !== 'undefined');

// fetch 是否原生存在
const hasFetch = (typeof fetch === 'function');

// XMLHttpRequest 是否存在
const hasXMLHttpRequest = (typeof XMLHttpRequest !== 'undefined');

// WebSocket 是否存在（Node 可能来自第三方实现）
const hasWebSocket = (typeof WebSocket !== 'undefined');

// localStorage 是否存在
const hasLocalStorage = (typeof window !== 'undefined' && !!window.localStorage);

// sessionStorage 是否存在
const hasSessionStorage = (typeof window !== 'undefined' && !!window.sessionStorage);

// IndexedDB 是否存在
const hasIndexedDB = (typeof indexedDB !== 'undefined');

// WebSQL 是否存在（浏览器旧特性）
const hasOpenDatabase = (typeof window !== 'undefined' && !!window.openDatabase);

// document.cookie 是否可用
const hasDocumentCookie = (typeof document !== 'undefined' && typeof document.cookie === 'string');

// navigator 是否存在
const hasNavigator = (typeof navigator !== 'undefined');

// window 是否存在
const hasWindow = (typeof window !== 'undefined');

// globalThis 是否存在（两端都应存在）
const hasGlobalThis = (typeof globalThis !== 'undefined');

// global（Node 全局）是否存在
const hasGlobal = (typeof global !== 'undefined');

// process 是否存在（Node 全局）
const hasProcess = (typeof process !== 'undefined');

// Buffer 是否存在（Node 全局）
const hasBuffer = (typeof Buffer !== 'undefined');

// Crypto API：浏览器 window.crypto vs Node crypto 模块
const hasWebCrypto = (typeof window !== 'undefined' && window.crypto && (window.crypto.subtle || window.crypto.getRandomValues));

// Node crypto 模块可用性
const hasNodeCrypto = (() => { try { return !!(isNode && require('crypto')); } catch (e) { return false; } })();

// URL API（两端有，但实现略异）
const hasURLApi = (typeof URL !== 'undefined');

// Performance API（Node 需 perf_hooks 或全局 polyfill）
const hasPerformance = (typeof performance !== 'undefined');

// 定时器（两端都有）
const hasTimers = (typeof setTimeout === 'function' && typeof clearTimeout === 'function');

// 编码解码 API（TextEncoder/TextDecoder）
const hasTextEncoderDecoder = (typeof TextEncoder !== 'undefined' && typeof TextDecoder !== 'undefined');

// Canvas/WebGL（浏览器内建，Node 需第三方）
const hasCanvas = (typeof document !== 'undefined' && typeof document.createElement === 'function' && !!document.createElement('canvas').getContext);

// AudioContext（浏览器）
const hasAudioContext = (typeof window !== 'undefined' && (!!(window.AudioContext || window.webkitAudioContext)));

// WebRTC（浏览器）
const hasWebRTC = (typeof window !== 'undefined' && (!!(window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection)));

// WebGPU（浏览器）
const hasWebGPU = (typeof navigator !== 'undefined' && !!navigator.gpu);

// 文件系统：Node fs vs 浏览器 File System Access API
const hasNodeFs = (() => { try { return !!(isNode && require('fs')); } catch (e) { return false; } })();

// File System Access API（浏览器实验）
const hasFileSystemAccessApi = (typeof window !== 'undefined' && !!(window.showOpenFilePicker || window.showSaveFilePicker || window.showDirectoryPicker));

// 路径模块（Node path）
const hasNodePath = (() => { try { return !!(isNode && require('path')); } catch (e) { return false; } })();

// OS 模块（Node os）
const hasNodeOs = (() => { try { return !!(isNode && require('os')); } catch (e) { return false; } })();

// Worker：浏览器 Web Worker vs Node Worker Threads
const hasWebWorker = (typeof Worker !== 'undefined');

// Node Worker Threads 模块
const hasNodeWorkerThreads = (() => { try { return !!(isNode && require('worker_threads')); } catch (e) { return false; } })();

// 环境变量：process.env vs 浏览器
const hasProcessEnv = (typeof process !== 'undefined' && process.env);

// 命令行参数：process.argv（Node）
const hasProcessArgv = (typeof process !== 'undefined' && Array.isArray(process.argv));

// CJS require 是否可用
const hasRequire = (typeof require === 'function');

// ESM import.meta 是否存在（浏览器模块/Node ESM）
const hasImportMeta = (typeof import !== 'undefined' || (typeof importScripts === 'function') || (typeof window !== 'undefined' && typeof document !== 'undefined')); // 近似

// 顶级 await（仅 ESM 或特定运行时）
const supportsTopLevelAwait = false;

// navigator.hardwareConcurrency（浏览器）
const hasHardwareConcurrency = (typeof navigator !== 'undefined' && typeof navigator.hardwareConcurrency === 'number');

// navigator.deviceMemory（浏览器）
const hasDeviceMemory = (typeof navigator !== 'undefined' && typeof navigator.deviceMemory === 'number');

// navigator.language / languages（浏览器）
const hasNavigatorLanguage = (typeof navigator !== 'undefined' && (!!navigator.language || !!navigator.languages));

// 屏幕对象（浏览器）
const hasScreen = (typeof screen !== 'undefined');

// 文档可见性（浏览器）
const hasDocumentVisibility = (typeof document !== 'undefined' && typeof document.visibilityState === 'string');

// 位置地理 API（浏览器）
const hasGeolocation = (typeof navigator !== 'undefined' && !!navigator.geolocation);

// Notification（浏览器）
const hasNotification = (typeof window !== 'undefined' && 'Notification' in window);

// Service Worker（浏览器）
const hasServiceWorker = (typeof navigator !== 'undefined' && !!navigator.serviceWorker);

// Push API（浏览器）
const hasPushManager = (typeof window !== 'undefined' && 'PushManager' in window);

// Clipboard API（浏览器）
const hasClipboard = (typeof navigator !== 'undefined' && !!navigator.clipboard);

// Battery API（浏览器）
const hasBattery = (typeof navigator !== 'undefined' && typeof navigator.getBattery === 'function');

// Storage API（浏览器）
const hasNavigatorStorage = (typeof navigator !== 'undefined' && !!navigator.storage);

// History API（浏览器）
const hasHistoryApi = (typeof window !== 'undefined' && !!window.history);

// Location 对象（浏览器）
const hasLocation = (typeof window !== 'undefined' && !!window.location);

// 屏幕方向（浏览器）
const hasScreenOrientation = (typeof screen !== 'undefined' && !!screen.orientation);

// 全屏 API（浏览器）
const hasFullscreen = (typeof document !== 'undefined' && (!!document.fullscreenEnabled || !!document.webkitFullscreenEnabled || !!document.mozFullScreenEnabled || !!document.msFullscreenEnabled));

// 设备方向/运动（浏览器）
const hasDeviceOrientation = (typeof window !== 'undefined' && ('DeviceOrientationEvent' in window || 'DeviceMotionEvent' in window));

// CSS 支持查询（浏览器）
const hasCssSupports = (typeof CSS !== 'undefined' && typeof CSS.supports === 'function');

// 媒体查询（浏览器）
const hasMatchMedia = (typeof window !== 'undefined' && typeof window.matchMedia === 'function');

// 控制台颜色支持：Node/浏览器实现差异
const consoleColorSupport = (() => { try { if (isNode) { const tty = require('tty'); return tty && tty.isatty && tty.isatty(1); } return true; } catch (e) { return false; } })();

// 进程/线程 ID（Node 可用）
const hasPid = (typeof process !== 'undefined' && typeof process.pid === 'number');

// 高精度时钟源（两端不同来源）
const timeOrigin = (typeof performance !== 'undefined' ? (performance.timeOrigin || (performance.timing && performance.timing.navigationStart) || 0) : (isNode && typeof process.hrtime === 'function' ? Date.now() : 0));

// Base64 编解码：atob/btoa（浏览器）
const hasAtobBtoa = (typeof atob === 'function' && typeof btoa === 'function');

// URL.createObjectURL（浏览器）
const hasCreateObjectURL = (typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function');

// Image/HTMLCanvasElement（浏览器）
const hasImageElement = (typeof Image !== 'undefined');

// NavigatorUAData（浏览器新 UA）
const hasUserAgentData = (typeof navigator !== 'undefined' && !!navigator.userAgentData);

// Intl.DisplayNames/Locale（可区分实现差异）
const hasIntlDisplayNames = (typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function');

// 事件循环钩子（Node 的 nextTick）
const hasProcessNextTick = (typeof process !== 'undefined' && typeof process.nextTick === 'function');

// AbortController（两端逐步统一）
const hasAbortController = (typeof AbortController !== 'undefined');

// ReadableStream（两端逐步统一）
const hasReadableStream = (typeof ReadableStream !== 'undefined');

// CompressionStream（浏览器）
const hasCompressionStream = (typeof CompressionStream !== 'undefined');

// DecompressionStream（浏览器）
const hasDecompressionStream = (typeof DecompressionStream !== 'undefined');

// BroadcastChannel（浏览器/部分运行时支持）
const hasBroadcastChannel = (typeof BroadcastChannel !== 'undefined');

// SharedArrayBuffer/Atomics（跨域隔离依赖）
const hasSharedArrayBuffer = (typeof SharedArrayBuffer !== 'undefined' && typeof Atomics !== 'undefined');

// WebAssembly（两端都有，特性不同）
const hasWebAssembly = (typeof WebAssembly !== 'undefined');

// 导出整合对象
const NODE_BROWSER_DIFF = {
	runtimeKind,
	isNode,
	isDeno,
	isBun,
	nodeVersion,
	userAgentBrowser,
	hasDOM,
	hasFileBlob,
	hasFetch,
	hasXMLHttpRequest,
	hasWebSocket,
	hasLocalStorage,
	hasSessionStorage,
	hasIndexedDB,
	hasOpenDatabase,
	hasDocumentCookie,
	hasNavigator,
	hasWindow,
	hasGlobalThis,
	hasGlobal,
	hasProcess,
	hasBuffer,
	hasWebCrypto,
	hasNodeCrypto,
	hasURLApi,
	hasPerformance,
	hasTimers,
	hasTextEncoderDecoder,
	hasCanvas,
	hasAudioContext,
	hasWebRTC,
	hasWebGPU,
	hasNodeFs,
	hasFileSystemAccessApi,
	hasNodePath,
	hasNodeOs,
	hasWebWorker,
	hasNodeWorkerThreads,
	hasProcessEnv,
	hasProcessArgv,
	hasRequire,
	hasImportMeta,
	supportsTopLevelAwait,
	hasHardwareConcurrency,
	hasDeviceMemory,
	hasNavigatorLanguage,
	hasScreen,
	hasDocumentVisibility,
	hasGeolocation,
	hasNotification,
	hasServiceWorker,
	hasPushManager,
	hasClipboard,
	hasBattery,
	hasNavigatorStorage,
	hasHistoryApi,
	hasLocation,
	hasScreenOrientation,
	hasFullscreen,
	hasDeviceOrientation,
	hasCssSupports,
	hasMatchMedia,
	consoleColorSupport,
	hasPid,
	timeOrigin,
	hasAtobBtoa,
	hasCreateObjectURL,
	hasImageElement,
	hasUserAgentData,
	hasIntlDisplayNames,
	hasProcessNextTick,
	hasAbortController,
	hasReadableStream,
	hasCompressionStream,
	hasDecompressionStream,
	hasBroadcastChannel,
	hasSharedArrayBuffer,
	hasWebAssembly
};

// 导出：CommonJS / 浏览器全局
if (typeof module !== 'undefined' && module.exports) {
	module.exports = NODE_BROWSER_DIFF;
}

if (typeof window !== 'undefined') {
	window.NODE_BROWSER_DIFF = NODE_BROWSER_DIFF;
}
