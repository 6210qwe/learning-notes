// 基本信息
// 浏览器 User-Agent
const userAgent = (typeof navigator !== 'undefined' && navigator.userAgent) || '';

// 浏览器平台 platform
const platform = (typeof navigator !== 'undefined' && navigator.platform) || '';

// 浏览器厂商 vendor
const vendor = (typeof navigator !== 'undefined' && navigator.vendor) || '';

// 语言列表 languages
const languages = (typeof navigator !== 'undefined' && (navigator.languages && navigator.languages.slice() || [navigator.language].filter(Boolean))) || [];

// 时区 IANA 名称
const timezone = (() => { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { return ''; } })();

// 时区偏移（分钟）
const timezoneOffset = (new Date()).getTimezoneOffset();

// 屏幕分辨率（设备像素）
const screenResolution = (typeof screen !== 'undefined' && screen ? [screen.width, screen.height] : [0, 0]);

// 可用屏幕分辨率（设备像素）
const availableScreenResolution = (typeof screen !== 'undefined' && screen ? [screen.availWidth || 0, screen.availHeight || 0] : [0, 0]);

// 像素比 devicePixelRatio
const devicePixelRatio = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;

// 颜色深度 colorDepth
const colorDepth = (typeof screen !== 'undefined' && screen && screen.colorDepth) || 0;

// 色域 color-gamut 支持
const colorGamut = (typeof window !== 'undefined' && window.matchMedia ? (['rec2020','p3','srgb'].find(g => window.matchMedia('(color-gamut: ' + g + ')').matches) || 'none') : 'unknown');

// 高对比度/强制颜色 forced-colors
const forcedColors = (typeof window !== 'undefined' && window.matchMedia ? (window.matchMedia('(forced-colors: active)').matches ? 'active' : 'none') : 'unknown');

// 反色 inverted-colors
const invertedColors = (typeof window !== 'undefined' && window.matchMedia ? (window.matchMedia('(inverted-colors: inverted)').matches ? 'inverted' : 'none') : 'unknown');

// 单色显示 monochrome 位数
const monochrome = (typeof window !== 'undefined' && window.matchMedia ? (m => (m && m.matches ? parseInt(m.media.match(/monochrome:\s*(\d+)/)?.[1] || '0', 10) : 0))(window.matchMedia('(monochrome)')) : 0);

// HDR 支持
const hdr = (typeof window !== 'undefined' && window.matchMedia ? (window.matchMedia('(dynamic-range: high)').matches || window.matchMedia('(video-dynamic-range: high)').matches) : false);

// 降低动画（减少运动）
const reducedMotion = (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false);

// 降低透明度（macOS/iOS 等）
const reducedTransparency = (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-transparency: reduce)').matches : false);

// 对比度偏好
const contrastPreference = (typeof window !== 'undefined' && window.matchMedia ? (['more','less','no-preference'].find(v => window.matchMedia('(prefers-contrast: ' + v + ')').matches) || 'unknown') : 'unknown');

// Cookies 可用
const cookiesEnabled = (typeof navigator !== 'undefined' && typeof navigator.cookieEnabled === 'boolean' ? navigator.cookieEnabled : (() => { try { document.cookie = 'fpjs_test=1'; const ok = document.cookie.indexOf('fpjs_test=') !== -1; document.cookie = 'fpjs_test=; expires=Thu, 01 Jan 1970 00:00:00 GMT'; return ok; } catch (e) { return false; } })());

// localStorage 可用
const localStorageEnabled = (() => { try { if (typeof window === 'undefined' || !window.localStorage) return false; const k = '__fpjs_ls__'; window.localStorage.setItem(k, '1'); window.localStorage.removeItem(k); return true; } catch (e) { return false; } })();

// sessionStorage 可用
const sessionStorageEnabled = (() => { try { if (typeof window === 'undefined' || !window.sessionStorage) return false; const k = '__fpjs_ss__'; window.sessionStorage.setItem(k, '1'); window.sessionStorage.removeItem(k); return true; } catch (e) { return false; } })();

// IndexedDB 可用
const indexedDBEnabled = (typeof indexedDB !== 'undefined');

// WebSQL openDatabase 可用（已废弃，多为旧浏览器）
const openDatabaseEnabled = (typeof window !== 'undefined' && !!window.openDatabase);

// PDF 查看器支持（通过 MIME 类型粗略判断）
const pdfViewerEnabled = (typeof navigator !== 'undefined' && navigator.mimeTypes ? !!Array.from(navigator.mimeTypes).find(m => m && m.type === 'application/pdf') : false);

// 硬件并发（逻辑 CPU 数）
const hardwareConcurrency = (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) || 0;

// 设备内存（GB，非所有浏览器支持）
const deviceMemory = (typeof navigator !== 'undefined' && navigator.deviceMemory) || 0;

// CPU 类别（IE/旧 Edge）
const cpuClass = (typeof navigator !== 'undefined' && navigator.cpuClass) || '';

// OS/CPU（Firefox）
const oscpu = (typeof navigator !== 'undefined' && navigator.oscpu) || '';

// 触控支持（最大触点数）
const maxTouchPoints = (typeof navigator !== 'undefined' && navigator.maxTouchPoints) || 0;

// 是否支持触摸事件（旧特性）
const touchEventSupported = (typeof window !== 'undefined' && ('ontouchstart' in window || (typeof document !== 'undefined' && 'ontouchstart' in document.documentElement)));

// 平台架构（从 UA 粗略解析，可能不准）
const architecture = (() => { const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || ''; if (/arm|aarch64/i.test(ua)) return 'ARM'; if (/x86_64|win64|amd64|x64/i.test(ua)) return 'x86_64'; if (/i686|i386|x86/i.test(ua)) return 'x86'; return 'unknown'; })();

// DOM 插件列表（非所有浏览器提供）
const plugins = (typeof navigator !== 'undefined' && navigator.plugins ? Array.from(navigator.plugins).map(p => p && p.name || '').filter(Boolean) : []);

// Canvas 支持与渲染指纹（返回数据 URL 片段）
const canvasFinger = (() => { try { const c = document.createElement('canvas'); c.width = 240; c.height = 60; const g = c.getContext('2d'); if (!g) return ''; g.textBaseline = 'top'; g.font = "14px 'Arial'"; g.textBaseline = 'alphabetic'; g.fillStyle = '#f60'; g.fillRect(125,1,62,20); g.fillStyle = '#069'; g.fillText('fingerprintjs', 2, 15); g.fillStyle = 'rgba(102, 204, 0, 0.7)'; g.fillText('fingerprintjs', 4, 17); return c.toDataURL(); } catch (e) { return ''; } })();

// WebGL 支持与厂商/渲染器
const webglVendorRenderer = (() => { try { const c = document.createElement('canvas'); const gl = c.getContext('webgl') || c.getContext('experimental-webgl'); if (!gl) return { vendor: '', renderer: '' }; const ext = gl.getExtension('WEBGL_debug_renderer_info'); return { vendor: ext ? gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) : '', renderer: ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : '' }; } catch (e) { return { vendor: '', renderer: '' }; } })();

// 音频上下文可用
const audioContextSupported = (typeof window !== 'undefined' && (!!(window.AudioContext || window.webkitAudioContext)));

// 基础音频延迟（若可得）
const audioBaseLatency = (() => { try { const Ctx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)); if (!Ctx) return null; const ctx = new Ctx(); const v = typeof ctx.baseLatency === 'number' ? ctx.baseLatency : null; if (typeof ctx.close === 'function') ctx.close(); return v; } catch (e) { return null; } })();

// Apple Pay 支持
const applePaySupported = (typeof window !== 'undefined' && !!window.ApplePaySession);

// Private Click Measurement (Safari)
const privateClickMeasurement = (typeof window !== 'undefined' && !!(window.Document && 'featurePolicy' in document ? document.featurePolicy : null));

// IndexedDB 的 blob 支持（粗略探测）
const indexedDBBlobSupport = (() => { try { const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || ''; if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return false; return true; } catch (e) { return true; } })();

// PDF MIME 类型列表（名称）
const pdfMimeTypes = (typeof navigator !== 'undefined' && navigator.mimeTypes ? Array.from(navigator.mimeTypes).filter(m => m && /pdf/i.test(m.type)).map(m => m.type) : []);

// 浏览器是否在跨域隔离 (COOP+COEP)
const crossOriginIsolatedFlag = (typeof crossOriginIsolated !== 'undefined' ? crossOriginIsolated : false);

// 计算能力：Math 随机实现稳定性（简单采样）
const mathFingerprintSample = (() => { try { const samples = Array.from({ length: 8 }, () => Math.sin(Math.random())); return samples.map(v => v.toFixed(6)); } catch (e) { return []; } })();

// 媒体设备可用（是否允许/存在 enumerateDevices）
const mediaDevicesEnumerate = (typeof navigator !== 'undefined' && navigator.mediaDevices && typeof navigator.mediaDevices.enumerateDevices === 'function');

// Service Worker 支持
const serviceWorkerSupported = (typeof navigator !== 'undefined' && !!navigator.serviceWorker);

// Battery API 支持
const batteryApiSupported = (typeof navigator !== 'undefined' && typeof navigator.getBattery === 'function');

// 网络信息 API（下行/有效类型）
const networkInformation = (typeof navigator !== 'undefined' && navigator.connection ? { downlink: navigator.connection.downlink, effectiveType: navigator.connection.effectiveType } : null);

// 存在内容拦截器的迹象（基于常见 DOM 选择器的粗略探测）
const adblockLikely = (() => { try { const bait = document.createElement('div'); bait.className = 'ads banner ad-unit ad-zone ad-container ad'; bait.style.cssText = 'width:1px;height:1px;position:absolute;left:-10000px;top:-10000px;'; document.body.appendChild(bait); const blocked = getComputedStyle(bait).display === 'none' || bait.offsetParent === null || bait.offsetHeight === 0; document.body.removeChild(bait); return blocked; } catch (e) { return false; } })();

// WebGL2 支持
const webgl2Supported = (() => { try { const c = document.createElement('canvas'); return !!c.getContext('webgl2'); } catch (e) { return false; } })();

// PDF 内建查看器（Firefox/Chrome 常见特征）
const builtinPdfViewer = (typeof navigator !== 'undefined' && navigator.pdfViewerEnabled !== undefined ? !!navigator.pdfViewerEnabled : pdfViewerEnabled);

// 平台（现代 API）
const userAgentDataPlatform = (typeof navigator !== 'undefined' && navigator.userAgentData && navigator.userAgentData.platform) || '';

// UA 低熵品牌信息（可能受隐私沙箱影响）
const userAgentDataBrands = (typeof navigator !== 'undefined' && navigator.userAgentData && navigator.userAgentData.brands ? navigator.userAgentData.brands.map(b => b.brand + '/' + b.version) : []);

// UA 是否为移动端（基于 UAData 或 UA）
const isMobileUA = (typeof navigator !== 'undefined' && ((navigator.userAgentData && navigator.userAgentData.mobile) || /Mobi|Android/i.test(navigator.userAgent || '')));

// Do Not Track
const doNotTrack = (typeof navigator !== 'undefined' && (navigator.doNotTrack || navigator.msDoNotTrack || (typeof window !== 'undefined' && window.doNotTrack))) || 'unspecified';

// WebGL 支持标志
const webglSupported = !!(webglVendorRenderer && (webglVendorRenderer.vendor || webglVendorRenderer.renderer));

// 输出整合对象
const ENV_CHECKS = {
	userAgent,
	platform,
	vendor,
	languages,
	timezone,
	timezoneOffset,
	screenResolution,
	availableScreenResolution,
	devicePixelRatio,
	colorDepth,
	colorGamut,
	forcedColors,
	invertedColors,
	monochrome,
	hdr,
	reducedMotion,
	reducedTransparency,
	contrastPreference,
	cookiesEnabled,
	localStorageEnabled,
	sessionStorageEnabled,
	indexedDBEnabled,
	openDatabaseEnabled,
	pdfViewerEnabled,
	hardwareConcurrency,
	deviceMemory,
	cpuClass,
	oscpu,
	maxTouchPoints,
	touchEventSupported,
	architecture,
	plugins,
	canvasFinger,
	webglVendorRenderer,
	webglSupported,
	audioContextSupported,
	audioBaseLatency,
	applePaySupported,
	privateClickMeasurement,
	indexedDBBlobSupport,
	pdfMimeTypes,
	crossOriginIsolatedFlag,
	mathFingerprintSample,
	mediaDevicesEnumerate,
	serviceWorkerSupported,
	batteryApiSupported,
	networkInformation,
	adblockLikely,
	webgl2Supported,
	builtinPdfViewer,
	userAgentDataPlatform,
	userAgentDataBrands,
	isMobileUA,
	doNotTrack
};

// 导出：CommonJS / ESM / 浏览器全局
if (typeof module !== 'undefined' && module.exports) {
	module.exports = ENV_CHECKS;
}

if (typeof window !== 'undefined') {
	window.ENV_CHECKS = ENV_CHECKS;
}

// ESM 默认导出已移除，避免在非 module 脚本下报错

// 首选颜色方案 prefers-color-scheme
const colorScheme = (typeof window !== 'undefined' && window.matchMedia ? (['dark','light'].find(v => window.matchMedia('(prefers-color-scheme: ' + v + ')').matches) || 'no-preference') : 'unknown');

// 指针能力 pointer
const pointer = (typeof window !== 'undefined' && window.matchMedia ? (['none','coarse','fine'].find(v => window.matchMedia('(pointer: ' + v + ')').matches) || 'unknown') : 'unknown');

// 悬停能力 hover
const hover = (typeof window !== 'undefined' && window.matchMedia ? (['none','hover'].find(v => window.matchMedia('(hover: ' + v + ')').matches) || 'unknown') : 'unknown');

// 任意指针能力 any-pointer
const anyPointer = (typeof window !== 'undefined' && window.matchMedia ? (['none','coarse','fine'].find(v => window.matchMedia('(any-pointer: ' + v + ')').matches) || 'unknown') : 'unknown');

// 任意悬停能力 any-hover
const anyHover = (typeof window !== 'undefined' && window.matchMedia ? (['none','hover'].find(v => window.matchMedia('(any-hover: ' + v + ')').matches) || 'unknown') : 'unknown');

// 数据节省（Save-Data）
const saveData = (typeof navigator !== 'undefined' && navigator.connection && typeof navigator.connection.saveData === 'boolean' ? navigator.connection.saveData : false);

// 视口尺寸（CSS 像素）
const viewportSize = (typeof window !== 'undefined' ? [window.innerWidth || 0, window.innerHeight || 0] : [0, 0]);

// 文档可见性状态
const visibilityState = (typeof document !== 'undefined' && document.visibilityState) || '';

// 屏幕方向（类型与角度）
const screenOrientation = (typeof screen !== 'undefined' && screen.orientation ? { type: screen.orientation.type, angle: screen.orientation.angle } : null);

// 滚动条宽度（估算）
const scrollbarWidth = (() => { try { if (typeof document === 'undefined') return 0; const d = document.documentElement; return (window.innerWidth - d.clientWidth) || 0; } catch (e) { return 0; } })();

// 存储配额估算（可用/已用）
const storageEstimate = (typeof navigator !== 'undefined' && navigator.storage && navigator.storage.estimate ? navigator.storage.estimate() : null);

// 剪贴板读写支持
const clipboardSupported = (typeof navigator !== 'undefined' && !!(navigator.clipboard && (navigator.clipboard.readText || navigator.clipboard.writeText)));

// WebRTC 支持
const webRTCSupported = (typeof window !== 'undefined' && (!!(window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection)));

// Brave 浏览器检测（启发式）
const isBrave = (typeof navigator !== 'undefined' && navigator.brave && typeof navigator.brave.isBrave === 'function');

// 自动化/无头痕迹（webdriver）
const webdriverFlag = (typeof navigator !== 'undefined' && !!navigator.webdriver);

// Selenium/Chromedriver 变量痕迹
const automationFlavors = (typeof window !== 'undefined' ? ['__nightmare','_Selenium_IDE_Recorder','callSelenium','_selenium','__webdriver_evaluate','__driver_evaluate','__webdriver_script_fn','__webdriver_script_func','__injected_universal_variable','webdriver','domAutomation','domAutomationController'].filter(k => k in window) : []);

// 字体偏好（serif/sans/monospace 渲染差异检测）
const fontPreferences = (() => { try { if (typeof document === 'undefined') return null; const testString = 'mmmmmmmmmmlli'; const baseFonts = ['monospace','sans-serif','serif']; const testFonts = ['Arial','Times New Roman','Courier New','Helvetica','Comic Sans MS','Segoe UI','Roboto','Noto Sans','Menlo','Fira Code']; const span = document.createElement('span'); span.style.cssText = 'position:absolute;left:-9999px;font-size:72px;line-height:normal;margin:0;padding:0;border:0;'; span.textContent = testString; document.body.appendChild(span); const baseDims = {}; baseFonts.forEach(f => { span.style.fontFamily = f; baseDims[f] = [span.offsetWidth, span.offsetHeight]; }); const detected = []; testFonts.forEach(f => { baseFonts.forEach(base => { span.style.fontFamily = `'${f}',` + base; const w = span.offsetWidth, h = span.offsetHeight; if (w !== baseDims[base][0] || h !== baseDims[base][1]) detected.push(f); }); }); document.body.removeChild(span); return Array.from(new Set(detected)); } catch (e) { return null; } })();

// 首选字体族（CSS 通用）
const preferredFontFamily = (() => { try { if (typeof document === 'undefined') return ''; const el = document.createElement('div'); el.style.cssText = "font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"; document.body.appendChild(el); const fam = getComputedStyle(el).fontFamily || ''; document.body.removeChild(el); return fam; } catch (e) { return ''; } })();

// WebGL 扩展数量
const webglExtensionsCount = (() => { try { const c = document.createElement('canvas'); const gl = c.getContext('webgl') || c.getContext('experimental-webgl'); return gl && gl.getSupportedExtensions ? (gl.getSupportedExtensions() || []).length : 0; } catch (e) { return 0; } })();

// 音频采样率
const audioSampleRate = (() => { try { const Ctx = (typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)); if (!Ctx) return null; const ctx = new Ctx(); const v = ctx.sampleRate || null; if (typeof ctx.close === 'function') ctx.close(); return v; } catch (e) { return null; } })();

// 语音合成可用及可用音色数量
const speechSynthesisVoices = (typeof window !== 'undefined' && window.speechSynthesis && typeof window.speechSynthesis.getVoices === 'function' ? (window.speechSynthesis.getVoices() || []).length : 0);

// CSS 支持查询（示例）
const cssBackdropFilter = (typeof CSS !== 'undefined' && typeof CSS.supports === 'function' ? CSS.supports('backdrop-filter', 'blur(2px)') : false);

// 页面是否在 iframe 中
const inIframe = (() => { try { return typeof window !== 'undefined' && window.self !== window.top; } catch (e) { return true; } })();

// 设备类型（粗略：基于指针/hover）
const deviceTypeHeuristic = ((pointer === 'coarse' || anyPointer === 'coarse') ? 'touch-first' : 'mouse-first');

// OS 粗略判定（基于 UA）
const osGuess = (() => { const ua = (typeof navigator !== 'undefined' && navigator.userAgent) || ''; if (/Windows NT/i.test(ua)) return 'Windows'; if (/Android/i.test(ua)) return 'Android'; if (/(iPhone|iPad|iPod)/i.test(ua)) return 'iOS'; if (/Mac OS X/i.test(ua)) return 'macOS'; if (/Linux/i.test(ua)) return 'Linux'; return 'Unknown'; })();

// MIME 类型数量
const mimeTypesCount = (typeof navigator !== 'undefined' && navigator.mimeTypes ? navigator.mimeTypes.length : 0);

// 插件数量
const pluginsCount = (typeof navigator !== 'undefined' && navigator.plugins ? navigator.plugins.length : 0);

// 屏幕可用工作区与总区差异（是否有任务栏/刘海等占位）
const screenAvailOffsets = (typeof screen !== 'undefined' ? { dx: (screen.width || 0) - (screen.availWidth || 0), dy: (screen.height || 0) - (screen.availHeight || 0) } : { dx: 0, dy: 0 });

// 触摸事件被动监听支持
const passiveEventSupported = (() => { let supported = false; try { const opts = Object.defineProperty({}, 'passive', { get() { supported = true; return true; } }); window.addEventListener('test-passive', null, opts); window.removeEventListener('test-passive', null, opts); } catch (e) {} return supported; })();

// Intl 支持的区域数量（示例）
const intlDateTimeSupport = (() => { try { return typeof Intl !== 'undefined' && typeof Intl.DateTimeFormat === 'function' && typeof Intl.DateTimeFormat().resolvedOptions === 'function'; } catch (e) { return false; } })();

// Navigator 起始时间（性能 API）
const performanceTimeOrigin = (typeof performance !== 'undefined' ? (performance.timeOrigin || (performance.timing && performance.timing.navigationStart) || 0) : 0);

// H/264 解码是否存在（MediaCapabilities 简易探测）
const h264PlaybackSupport = (typeof navigator !== 'undefined' && navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo ? navigator.mediaCapabilities.decodingInfo({ type: 'file', video: { contentType: 'video/mp4; codecs=\"avc1.42E01E\"', width: 1920, height: 1080, bitrate: 1, framerate: 30 } }).then(r => !!r.supported).catch(() => null) : null);

// AV1 解码是否存在（简易探测）
const av1PlaybackSupport = (typeof navigator !== 'undefined' && navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo ? navigator.mediaCapabilities.decodingInfo({ type: 'file', video: { contentType: 'video/mp4; codecs=\"av01.0.05M.08\"', width: 1920, height: 1080, bitrate: 1, framerate: 30 } }).then(r => !!r.supported).catch(() => null) : null);

// OffscreenCanvas 支持
const offscreenCanvasSupported = (typeof window !== 'undefined' && typeof window.OffscreenCanvas !== 'undefined');

// ResizeObserver 支持
const resizeObserverSupported = (typeof window !== 'undefined' && typeof window.ResizeObserver !== 'undefined');

// IntersectionObserver 支持
const intersectionObserverSupported = (typeof window !== 'undefined' && typeof window.IntersectionObserver !== 'undefined');

// Fetch/AbortController 支持
const abortControllerSupported = (typeof window !== 'undefined' && typeof window.AbortController !== 'undefined');

// Payment Request API 支持
const paymentRequestSupported = (typeof window !== 'undefined' && typeof window.PaymentRequest !== 'undefined');

// Vibration API 支持
const vibrationSupported = (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function');

// 屏幕色彩位数（逻辑）
const screenColorBits = (typeof screen !== 'undefined' && (screen.pixelDepth || screen.colorDepth || 0));

// 文档方向（ltr/rtl）
const documentDir = (typeof document !== 'undefined' && document.documentElement && document.documentElement.dir) || '';

// 页面语言（主）
const documentLang = (typeof document !== 'undefined' && document.documentElement && document.documentElement.lang) || '';

// 设备是否支持触觉反馈（Vibration/触控）
const hapticsHeuristic = (vibrationSupported || maxTouchPoints > 0);

// 跨站跟踪保护启发（Safari/Firefox 部分场景）
const trackingProtectionHeuristic = (typeof navigator !== 'undefined' && (navigator.globalPrivacyControl === true || doNotTrack === '1' || doNotTrack === 'yes'));

// MediaSession 支持
const mediaSessionSupported = (typeof navigator !== 'undefined' && typeof navigator.mediaSession !== 'undefined');

// 屏幕分辨率 DPR 标准化（CSS 像素）
const cssPixelResolution = (typeof screen !== 'undefined' ? [Math.round((screen.width || 0) * (1 / (window.devicePixelRatio || 1))), Math.round((screen.height || 0) * (1 / (window.devicePixelRatio || 1)))] : [0, 0]);

// 设备是否倾向触摸输入（Pointer 媒体查询）
const prefersTouch = (pointer === 'coarse' || anyPointer === 'coarse');

// 是否启用缩放手势（meta viewport 缩放限制启发）
const zoomGestureLikelyEnabled = (() => { try { const metas = document.querySelectorAll('meta[name="viewport"]'); if (!metas.length) return true; return !Array.from(metas).some(m => /user-scalable=no|maximum-scale=\s*1(\.|$)/i.test(m.getAttribute('content') || '')); } catch (e) { return true; } })();

// 屏幕帧差（可用于顶栏/任务栏/工具条探测简化）
const screenFrameHeuristic = (() => { try { if (typeof window === 'undefined' || typeof screen === 'undefined') return null; const outerW = window.outerWidth || 0, outerH = window.outerHeight || 0; const innerW = window.innerWidth || 0, innerH = window.innerHeight || 0; return { dx: Math.max(0, outerW - innerW), dy: Math.max(0, outerH - innerH) }; } catch (e) { return null; } })();

// StorageManager persist() 支持
const storagePersistSupported = (typeof navigator !== 'undefined' && navigator.storage && typeof navigator.storage.persist === 'function');

// Fullscreen API 支持
const fullscreenSupported = (typeof document !== 'undefined' && !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled));

// 画中画 API 支持
const pictureInPictureSupported = (typeof document !== 'undefined' && document.pictureInPictureEnabled === true);

// 共享 API（Web Share）支持
const webShareSupported = (typeof navigator !== 'undefined' && typeof navigator.share === 'function');

// 传感器 API（DeviceOrientation）支持
const deviceOrientationSupported = (typeof window !== 'undefined' && ('DeviceOrientationEvent' in window));

// 屏幕唤醒锁 API 支持
const wakeLockSupported = (typeof navigator !== 'undefined' && navigator.wakeLock && typeof navigator.wakeLock.request === 'function');

// 空闲检测 API 支持
const idleDetectorSupported = (typeof window !== 'undefined' && typeof window.IdleDetector !== 'undefined');

// 网络类型（仅供参考）
const connectionType = (typeof navigator !== 'undefined' && navigator.connection ? (navigator.connection.type || '') : '');

// GPU Adapter（WebGPU 简易探测）
const webgpuSupported = (typeof navigator !== 'undefined' && !!navigator.gpu);

// 导出整合（追加）
Object.assign(ENV_CHECKS, {
	colorScheme,
	pointer,
	hover,
	anyPointer,
	anyHover,
	saveData,
	viewportSize,
	visibilityState,
	screenOrientation,
	scrollbarWidth,
	storageEstimate,
	clipboardSupported,
	webRTCSupported,
	isBrave,
	webdriverFlag,
	automationFlavors,
	fontPreferences,
	preferredFontFamily,
	webglExtensionsCount,
	audioSampleRate,
	speechSynthesisVoices,
	cssBackdropFilter,
	inIframe,
	deviceTypeHeuristic,
	osGuess,
	mimeTypesCount,
	pluginsCount,
	screenAvailOffsets,
	passiveEventSupported,
	intlDateTimeSupport,
	performanceTimeOrigin,
	h264PlaybackSupport,
	av1PlaybackSupport,
	offscreenCanvasSupported,
	resizeObserverSupported,
	intersectionObserverSupported,
	abortControllerSupported,
	paymentRequestSupported,
	vibrationSupported,
	screenColorBits,
	documentDir,
	documentLang,
	hapticsHeuristic,
	trackingProtectionHeuristic,
	mediaSessionSupported,
	cssPixelResolution,
	prefersTouch,
	zoomGestureLikelyEnabled,
	screenFrameHeuristic,
	storagePersistSupported,
	fullscreenSupported,
	pictureInPictureSupported,
	webShareSupported,
	deviceOrientationSupported,
	wakeLockSupported,
	idleDetectorSupported,
	connectionType,
	webgpuSupported
});
