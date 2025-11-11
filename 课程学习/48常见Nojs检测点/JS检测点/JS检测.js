// 常见的浏览器指纹检测的方法
// 基础浏览器指纹检测
// 1. User-Agent 检测
//  复制代码 隐藏代码
// 检测浏览器基本信息
function detectUserAgent() {
    return {
        userAgent: navigator.userAgent,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        platform: navigator.platform,
        vendor: navigator.vendor,
        product: navigator.product
    };
}
// 2. 语言和地区检测
//  复制代码 隐藏代码
function detectLanguage() {
    return {
        language: navigator.language,
        languages: navigator.languages,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        locale: Intl.NumberFormat().resolvedOptions().locale
    };
}
3. 屏幕指纹检测
 复制代码 隐藏代码
function detectScreen() {
    return {
        screenWidth: screen.width,
        screenHeight: screen.height,
        availWidth: screen.availWidth,
        availHeight: screen.availHeight,
        colorDepth: screen.colorDepth,
        pixelDepth: screen.pixelDepth,
        orientation: screen.orientation ? screen.orientation.type : 'unknown',
        devicePixelRatio: window.devicePixelRatio
    };
}
Canvas 指纹检测
4. Canvas 2D 指纹
 复制代码 隐藏代码
function getCanvas2DFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 设置文本样式
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillStyle = '#f60';
    ctx.fillRect(125, 1, 62, 20);

    // 绘制文本
    ctx.fillStyle = '#069';
    ctx.fillText('Canvas fingerprint 🎨', 2, 15);

    // 绘制更复杂的图形
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillStyle = 'rgb(255,0,255)';
    ctx.beginPath();
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();

    return canvas.toDataURL();
}
5. Canvas WebGL 指纹
 复制代码 隐藏代码
function getWebGLFingerprint() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) return null;

    const fingerprint = {
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER),
        version: gl.getParameter(gl.VERSION),
        shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
        maxViewportDims: gl.getParameter(gl.MAX_VIEWPORT_DIMS),
        maxVertexAttribs: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
        maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
        aliasedLineWidthRange: gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE),
        aliasedPointSizeRange: gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)
    };

    // 获取扩展信息
    const extensions = gl.getSupportedExtensions();
    fingerprint.extensions = extensions;

    // 获取WebGL渲染指纹
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}');
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}');
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    program.attrVertex = gl.getAttribLocation(program, 'attrVertex');
    program.uniformOffset = gl.getUniformLocation(program, 'uniformOffset');

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,0,1,1,-1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(program.attrVertex);
    gl.vertexAttribPointer(program.attrVertex, 2, gl.FLOAT, false, 0, 0);
    gl.uniform2f(program.uniformOffset, 1, 1);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);

    // 读取像素数据作为指纹
    const pixels = new Uint8Array(gl.drawingBufferWidth * gl.drawingBufferHeight * 4);
    gl.readPixels(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    fingerprint.renderFingerprint = Array.from(pixels).join(',');

    return fingerprint;
}
音频指纹检测
6. AudioContext 指纹
 复制代码 隐藏代码
function getAudioFingerprint() {
    return new Promise((resolve) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const analyser = audioContext.createAnalyser();
        const gainNode = audioContext.createGain();
        const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);

        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(10000, audioContext.currentTime);

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);

        oscillator.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(gainNode);
        gainNode.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = function(bins) {
            bins.outputBuffer.getChannelData(0).set(bins.inputBuffer.getChannelData(0));

            const data = bins.inputBuffer.getChannelData(0);
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                sum += Math.abs(data[i]);
            }

            oscillator.disconnect();
            scriptProcessor.disconnect();
            analyser.disconnect();
            gainNode.disconnect();

            resolve(sum.toString());
        };

        oscillator.start(0);
    });
}
字体指纹检测
7. 字体检测
 复制代码 隐藏代码
function detectFonts() {
    const baseFonts = ['monospace', 'sans-serif', 'serif'];
    const testFonts = [
        'Arial', 'Arial Black', 'Arial Narrow', 'Arial Rounded MT Bold',
        'Calibri', 'Cambria', 'Candara', 'Comic Sans MS', 'Consolas',
        'Courier', 'Courier New', 'Geneva', 'Georgia', 'Helvetica',
        'Impact', 'Lucida Console', 'Lucida Sans Unicode', 'Microsoft Sans Serif',
        'Monaco', 'Palatino', 'Tahoma', 'Times', 'Times New Roman',
        'Trebuchet MS', 'Verdana', '宋体', '微软雅黑', '黑体'
    ];

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const testString = 'mmmmmmmmmmlli';
    const testSize = '72px';

    const baselines = {};
    baseFonts.forEach(font => {
        ctx.font = `${testSize} ${font}`;
        baselines[font] = ctx.measureText(testString).width;
    });

    const detectedFonts = [];
    testFonts.forEach(font => {
        let detected = false;
        baseFonts.forEach(baseFont => {
            ctx.font = `${testSize} ${font}, ${baseFont}`;
            const width = ctx.measureText(testString).width;
            if (width !== baselines[baseFont]) {
                detected = true;
            }
        });
        if (detected) {
            detectedFonts.push(font);
        }
    });

    return detectedFonts;
}
硬件指纹检测
8. 硬件信息检测
 复制代码 隐藏代码
function detectHardware() {
    const fingerprint = {
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemory: navigator.deviceMemory,
        maxTouchPoints: navigator.maxTouchPoints,
        connection: null
    };

    // 网络连接信息
    if (navigator.connection) {
        fingerprint.connection = {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt,
            saveData: navigator.connection.saveData
        };
    }

    return fingerprint;
}
9. 电池信息检测
 复制代码 隐藏代码
function detectBattery() {
    if ('getBattery' in navigator) {
        return navigator.getBattery().then(battery => {
            return {
                charging: battery.charging,
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime,
                level: battery.level
            };
        });
    }
    return Promise.resolve(null);
}
时间相关指纹
10. 时间精度检测
 复制代码 隐藏代码
function detectTiming() {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
        Math.random();
    }
    const end = performance.now();

    return {
        performanceNowResolution: measureTimeResolution(() => performance.now()),
        dateNowResolution: measureTimeResolution(() => Date.now()),
        executionTime: end - start,
        timezoneOffset: new Date().getTimezoneOffset(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
}

function measureTimeResolution(timeFunction) {
    const times = [];
    for (let i = 0; i < 1000; i++) {
        times.push(timeFunction());
    }

    const unique = [...new Set(times)];
    return {
        samples: times.length,
        uniqueValues: unique.length,
        resolution: unique.length / times.length
    };
}
WebRTC 指纹检测
11. WebRTC 本地IP检测
 复制代码 隐藏代码
function detectWebRTCIPs() {
    return new Promise((resolve) => {
        const ips = [];
        const pc = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
        });

        pc.createDataChannel('');
        pc.createOffer().then(offer => pc.setLocalDescription(offer));

        pc.onicecandidate = (ice) => {
            if (!ice || !ice.candidate || !ice.candidate.candidate) return;

            const candidate = ice.candidate.candidate;
            const ip = candidate.split(' ')[4];

            if (ip && ips.indexOf(ip) === -1) {
                ips.push(ip);
            }
        };

        setTimeout(() => {
            pc.close();
            resolve(ips);
        }, 2000);
    });
}
行为指纹检测
12. 鼠标行为检测
 复制代码 隐藏代码
function detectMouseBehavior() {
    const mouseData = {
        movements: [],
        clicks: [],
        startTime: Date.now()
    };

    document.addEventListener('mousemove', (e) => {
        mouseData.movements.push({
            x: e.clientX,
            y: e.clientY,
            timestamp: Date.now() - mouseData.startTime
        });
    });

    document.addEventListener('click', (e) => {
        mouseData.clicks.push({
            x: e.clientX,
            y: e.clientY,
            timestamp: Date.now() - mouseData.startTime,
            button: e.button
        });
    });

    return mouseData;
}
13. 键盘行为检测
 复制代码 隐藏代码
function detectKeyboardBehavior() {
    const keyData = {
        keystrokes: [],
        startTime: Date.now()
    };

    document.addEventListener('keydown', (e) => {
        keyData.keystrokes.push({
            key: e.key,
            code: e.code,
            timestamp: Date.now() - keyData.startTime,
            type: 'down'
        });
    });

    document.addEventListener('keyup', (e) => {
        keyData.keystrokes.push({
            key: e.key,
            code: e.code,
            timestamp: Date.now() - keyData.startTime,
            type: 'up'
        });
    });

    return keyData;
}
插件和扩展检测
14. 浏览器插件检测
 复制代码 隐藏代码
function detectPlugins() {
    const plugins = [];

    for (let i = 0; i < navigator.plugins.length; i++) {
        const plugin = navigator.plugins[i];
        plugins.push({
            name: plugin.name,
            description: plugin.description,
            filename: plugin.filename,
            version: plugin.version
        });
    }

    return plugins;
}
15. Flash 检测
 复制代码 隐藏代码
function detectFlash() {
    let hasFlash = false;
    let flashVersion = 'unknown';

    if (navigator.plugins && navigator.plugins.length > 0) {
        for (let i = 0; i < navigator.plugins.length; i++) {
            if (navigator.plugins[i].name.toLowerCase().includes('flash')) {
                hasFlash = true;
                flashVersion = navigator.plugins[i].version || navigator.plugins[i].description;
                break;
            }
        }
    }

    return {
        hasFlash,
        version: flashVersion
    };
}
自动化检测
16. Selenium/WebDriver 检测
 复制代码 隐藏代码
function detectAutomation() {
    const checks = {
        webdriver: navigator.webdriver !== undefined,
        chrome: window.chrome === undefined,
        permissions: navigator.permissions === undefined,
        plugins: navigator.plugins.length === 0,
        languages: navigator.languages.length === 0,
        webgl: (() => {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl');
            if (!gl) return false;
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return debugInfo && gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).includes('SwiftShader');
        })(),
        userAgent: /HeadlessChrome/.test(navigator.userAgent),
        viewport: window.outerHeight === 0,
        documentReady: document.readyState !== 'complete'
    };

    return checks;
}
17. Puppeteer 检测
 复制代码 隐藏代码
function detectPuppeteer() {
    const checks = {
        runtimeEnabled: !!window.__chrome_app_runtime__,
        permissionsQuery: (() => {
            try {
                navigator.permissions.query({name: 'notifications'});
                return false;
            } catch (e) {
                return true;
            }
        })(),
        chromeNotifications: !window.Notification,
        chromeRuntime: !!window.chrome && !!window.chrome.runtime,
        frameElement: window.top !== window.self,
        headlessUserAgent: /HeadlessChrome/.test(navigator.userAgent)
    };

    return checks;
}
综合指纹生成
18. 生成综合指纹
 复制代码 隐藏代码
async function generateFingerprint() {
    const fingerprint = {
        basic: detectUserAgent(),
        screen: detectScreen(),
        language: detectLanguage(),
        hardware: detectHardware(),
        canvas2d: getCanvas2DFingerprint(),
        webgl: getWebGLFingerprint(),
        fonts: detectFonts(),
        plugins: detectPlugins(),
        timing: detectTiming(),
        automation: detectAutomation(),
        puppeteer: detectPuppeteer(),
        timestamp: Date.now()
    };

    // 异步获取的指纹
    try {
        fingerprint.audio = await getAudioFingerprint();
        fingerprint.battery = await detectBattery();
        fingerprint.webrtcIPs = await detectWebRTCIPs();
    } catch (e) {
        console.log('异步指纹获取失败:', e);
    }

    // 生成指纹哈希
    const fingerprintString = JSON.stringify(fingerprint);
    fingerprint.hash = await hashFingerprint(fingerprintString);

    return fingerprint;
}

async function hashFingerprint(data) {
    const encoder = new TextEncoder();
    const dataBuffer = encoder.encode(data);
    const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
使用示例
19. 完整检测脚本
 复制代码 隐藏代码
// 页面加载完成后执行指纹检测
document.addEventListener('DOMContentLoaded', async () => {
    console.log('开始指纹检测...');

    const fingerprint = await generateFingerprint();

    console.log('指纹检测完成:', fingerprint);
    console.log('指纹哈希:', fingerprint.hash);

    // 发送指纹到服务器
    // fetch('/api/fingerprint', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(fingerprint)
    // });
});

常见的指纹检测绕过的方法
基础浏览器指纹绕过
1. User-Agent 伪装
 复制代码 隐藏代码
// 方法1: Object.defineProperty 重定义
Object.defineProperty(navigator, 'userAgent', {
    value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    writable: false,
    enumerable: true,
    configurable: false
});

// 方法2: 完整浏览器信息伪装
const fakeNavigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    appName: 'Netscape',
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    platform: 'Win32',
    vendor: 'Google Inc.',
    product: 'Gecko',
    language: 'en-US',
    languages: ['en-US', 'en'],
    onLine: true,
    cookieEnabled: true,
    hardwareConcurrency: 8,
    maxTouchPoints: 0,
    deviceMemory: 8
};

Object.keys(fakeNavigator).forEach(key => {
    Object.defineProperty(navigator, key, {
        value: fakeNavigator[key],
        writable: false,
        enumerable: true,
        configurable: false
    });
});
2. 屏幕信息标准化
 复制代码 隐藏代码
// 标准化屏幕分辨率
const fakeScreen = {
    width: 1920,
    height: 1080,
    availWidth: 1920,
    availHeight: 1040,
    colorDepth: 24,
    pixelDepth: 24,
    orientation: {
        angle: 0,
        type: 'landscape-primary'
    }
};

Object.keys(fakeScreen).forEach(key => {
    if (key === 'orientation') {
        Object.defineProperty(screen, key, {
            value: fakeScreen[key],
            writable: false
        });
    } else {
        Object.defineProperty(screen, key, {
            value: fakeScreen[key],
            writable: false,
            enumerable: true,
            configurable: false
        });
    }
});

// 设备像素比标准化
Object.defineProperty(window, 'devicePixelRatio', {
    value: 1,
    writable: false
});
3. 时区和语言统一
 复制代码 隐藏代码
// 重写时区检测
const originalDateTimeFormat = Intl.DateTimeFormat;
Intl.DateTimeFormat = function(...args) {
    const instance = new originalDateTimeFormat(...args);
    const originalResolvedOptions = instance.resolvedOptions;
    instance.resolvedOptions = function() {
        const options = originalResolvedOptions.call(this);
        options.timeZone = 'America/New_York';
        options.locale = 'en-US';
        return options;
    };
    return instance;
};

// 重写时区偏移
const originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;
Date.prototype.getTimezoneOffset = function() {
    return 300; // UTC-5 (Eastern Time)
};
Canvas 指纹绕过
4. Canvas 2D 指纹干扰
 复制代码 隐藏代码
// 方法1: 添加随机噪声
const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
HTMLCanvasElement.prototype.toDataURL = function(type, quality) {
    if (!this._fingerprinted) {
        const ctx = this.getContext('2d');
        const imageData = ctx.getImageData(0, 0, this.width, this.height);

        // 添加轻微的随机噪声
        for (let i = 0; i < imageData.data.length; i += 4) {
            if (Math.random() < 0.001) {
                const noise = Math.floor(Math.random() * 5) - 2;
                imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + noise));
                imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + noise));
                imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + noise));
            }
        }

        ctx.putImageData(imageData, 0, 0);
        this._fingerprinted = true;
    }

    return originalToDataURL.apply(this, arguments);
};

// 方法2: 返回固定的Canvas指纹
HTMLCanvasElement.prototype.toDataURL = function() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
};

// 方法3: Hook getImageData
const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
CanvasRenderingContext2D.prototype.getImageData = function(sx, sy, sw, sh) {
    const imageData = originalGetImageData.apply(this, arguments);

    // 添加轻微扰动
    for (let i = 0; i < imageData.data.length; i += 4) {
        if (Math.random() < 0.001) {
            imageData.data[i] = (imageData.data[i] + Math.floor(Math.random() * 3) - 1) % 256;
        }
    }

    return imageData;
};
5. WebGL 指纹伪装
 复制代码 隐藏代码
// Hook WebGL getParameter
const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
WebGLRenderingContext.prototype.getParameter = function(parameter) {
    // 常见的WebGL参数伪装
    const fakeValues = {
        [this.VENDOR]: 'Intel Inc.',
        [this.RENDERER]: 'Intel(R) HD Graphics 4000',
        [this.VERSION]: 'WebGL 1.0 (OpenGL ES 2.0 Chromium)',
        [this.SHADING_LANGUAGE_VERSION]: 'WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)',
        [this.MAX_TEXTURE_SIZE]: 16384,
        [this.MAX_VIEWPORT_DIMS]: new Int32Array([16384, 16384]),
        [this.MAX_VERTEX_ATTRIBS]: 16,
        [this.MAX_VARYING_VECTORS]: 15,
        [this.ALIASED_LINE_WIDTH_RANGE]: new Float32Array([1, 1]),
        [this.ALIASED_POINT_SIZE_RANGE]: new Float32Array([1, 1024])
    };

    if (parameter in fakeValues) {
        return fakeValues[parameter];
    }

    return originalGetParameter.apply(this, arguments);
};

// Hook WebGL扩展
const originalGetExtension = WebGLRenderingContext.prototype.getExtension;
WebGLRenderingContext.prototype.getExtension = function(name) {
    // 返回标准化的扩展列表
    const standardExtensions = [
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_color_buffer_half_float',
        'EXT_disjoint_timer_query',
        'EXT_frag_depth',
        'EXT_shader_texture_lod',
        'EXT_texture_filter_anisotropic',
        'WEBKIT_EXT_texture_filter_anisotropic',
        'EXT_sRGB',
        'OES_element_index_uint',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_float_linear',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_compressed_texture_s3tc',
        'WEBKIT_WEBGL_compressed_texture_s3tc',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_depth_texture',
        'WEBKIT_WEBGL_depth_texture',
        'WEBGL_draw_buffers',
        'WEBGL_lose_context',
        'WEBKIT_WEBGL_lose_context'
    ];

    if (standardExtensions.includes(name)) {
        return originalGetExtension.apply(this, arguments);
    }

    return null;
};

// Hook getSupportedExtensions
const originalGetSupportedExtensions = WebGLRenderingContext.prototype.getSupportedExtensions;
WebGLRenderingContext.prototype.getSupportedExtensions = function() {
    return [
        'ANGLE_instanced_arrays',
        'EXT_blend_minmax',
        'EXT_color_buffer_half_float',
        'EXT_disjoint_timer_query',
        'EXT_frag_depth',
        'EXT_shader_texture_lod',
        'EXT_texture_filter_anisotropic',
        'WEBKIT_EXT_texture_filter_anisotropic',
        'EXT_sRGB',
        'OES_element_index_uint',
        'OES_standard_derivatives',
        'OES_texture_float',
        'OES_texture_float_linear',
        'OES_texture_half_float',
        'OES_texture_half_float_linear',
        'OES_vertex_array_object',
        'WEBGL_color_buffer_float',
        'WEBGL_compressed_texture_s3tc',
        'WEBKIT_WEBGL_compressed_texture_s3tc',
        'WEBGL_debug_renderer_info',
        'WEBGL_debug_shaders',
        'WEBGL_depth_texture',
        'WEBKIT_WEBGL_depth_texture',
        'WEBGL_draw_buffers',
        'WEBGL_lose_context',
        'WEBKIT_WEBGL_lose_context'
    ];
};
音频指纹绕过
6. AudioContext 指纹干扰
 复制代码 隐藏代码
// 方法1: 添加随机噪声到音频输出
const originalCreateOscillator = AudioContext.prototype.createOscillator;
AudioContext.prototype.createOscillator = function() {
    const oscillator = originalCreateOscillator.apply(this, arguments);

    const originalStart = oscillator.start;
    oscillator.start = function() {
        // 添加微小的频率偏移
        const offset = (Math.random() - 0.5) * 0.001;
        this.frequency.value += offset;
        return originalStart.apply(this, arguments);
    };

    return oscillator;
};

// 方法2: Hook AnalyserNode
const originalCreateAnalyser = AudioContext.prototype.createAnalyser;
AudioContext.prototype.createAnalyser = function() {
    const analyser = originalCreateAnalyser.apply(this, arguments);

    const originalGetFloatFrequencyData = analyser.getFloatFrequencyData;
    analyser.getFloatFrequencyData = function(array) {
        originalGetFloatFrequencyData.apply(this, arguments);

        // 添加轻微噪声
        for (let i = 0; i < array.length; i++) {
            array[i] += (Math.random() - 0.5) * 0.001;
        }
    };

    return analyser;
};

// 方法3: 完全禁用AudioContext
if (typeof AudioContext !== 'undefined') {
    AudioContext = function() {
        throw new Error('AudioContext is not supported');
    };
}

if (typeof webkitAudioContext !== 'undefined') {
    webkitAudioContext = function() {
        throw new Error('webkitAudioContext is not supported');
    };
}
字体指纹绕过
7. 字体检测绕过
 复制代码 隐藏代码
// 方法1: Hook measureText返回固定宽度
const originalMeasureText = CanvasRenderingContext2D.prototype.measureText;
CanvasRenderingContext2D.prototype.measureText = function(text) {
    const result = originalMeasureText.apply(this, arguments);

    // 为常见字体返回标准化的宽度
    const fontFamilies = ['Arial', 'Helvetica', 'Times', 'Courier', 'Verdana', 'Georgia', 'Palatino', 'Garamond', 'Bookman', 'Comic Sans MS', 'Trebuchet MS', 'Arial Black', 'Impact'];

    for (const font of fontFamilies) {
        if (this.font.includes(font)) {
            // 返回固定宽度，消除字体差异
            Object.defineProperty(result, 'width', {
                value: text.length * 12, // 简单的固定宽度计算
                writable: false
            });
            break;
        }
    }

    return result;
};

// 方法2: 标准化offsetWidth和offsetHeight
const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth');
const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight');

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    get: function() {
        if (this.style.fontFamily) {
            return 100; // 返回固定宽度
        }
        return originalOffsetWidth.get.call(this);
    },
    configurable: true
});

Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get: function() {
        if (this.style.fontFamily) {
            return 20; // 返回固定高度
        }
        return originalOffsetHeight.get.call(this);
    },
    configurable: true
});
时间指纹绕过
8. 性能时间戳干扰
 复制代码 隐藏代码
// performance.now() 干扰
const originalPerformanceNow = performance.now;
let performanceStartTime = originalPerformanceNow.call(performance);

performance.now = function() {
    const realTime = originalPerformanceNow.call(performance);
    const fakeTime = realTime - performanceStartTime;

    // 添加随机偏移，但保持单调递增
    const offset = Math.random() * 0.1;
    return Math.floor(fakeTime + offset);
};

// Date.now() 标准化
const originalDateNow = Date.now;
Date.now = function() {
    const realTime = originalDateNow();
    // 将时间戳模糊化到最近的秒
    return Math.floor(realTime / 1000) * 1000;
};

// 高精度时间戳保护
if (typeof PerformanceObserver !== 'undefined') {
    PerformanceObserver = function() {
        throw new Error('PerformanceObserver is not supported');
    };
}
硬件指纹绕过
9. CPU 和内存信息伪装
 复制代码 隐藏代码
// 硬件并发数伪装
Object.defineProperty(navigator, 'hardwareConcurrency', {
    value: 8,
    writable: false,
    enumerable: true,
    configurable: false
});

// 设备内存伪装
Object.defineProperty(navigator, 'deviceMemory', {
    value: 8,
    writable: false,
    enumerable: true,
    configurable: false
});

// 触摸点数伪装
Object.defineProperty(navigator, 'maxTouchPoints', {
    value: 0,
    writable: false,
    enumerable: true,
    configurable: false
});

// 网络连接信息伪装
if (navigator.connection) {
    Object.defineProperty(navigator, 'connection', {
        value: {
            effectiveType: '4g',
            downlink: 10,
            rtt: 100,
            saveData: false,
            addEventListener: function() {},
            removeEventListener: function() {}
        },
        writable: false,
        enumerable: true,
        configurable: false
    });
}
10. 电池信息隐藏
 复制代码 隐藏代码
// 禁用电池API
if ('getBattery' in navigator) {
    navigator.getBattery = function() {
        return Promise.reject(new Error('Battery API is not supported'));
    };
}

// 隐藏电池事件
if ('battery' in navigator) {
    delete navigator.battery;
}
WebRTC 指纹绕过
11. 本地IP地址隐藏
 复制代码 隐藏代码
// 方法1: 禁用WebRTC
const originalRTCPeerConnection = window.RTCPeerConnection;
window.RTCPeerConnection = function() {
    throw new Error('WebRTC is disabled');
};

if (window.webkitRTCPeerConnection) {
    window.webkitRTCPeerConnection = function() {
        throw new Error('WebRTC is disabled');
    };
}

if (window.mozRTCPeerConnection) {
    window.mozRTCPeerConnection = function() {
        throw new Error('WebRTC is disabled');
    };
}

// 方法2: 过滤ICE候选
const originalCreateOffer = RTCPeerConnection.prototype.createOffer;
RTCPeerConnection.prototype.createOffer = function() {
    const offer = originalCreateOffer.apply(this, arguments);

    const originalOnIceCandidate = this.onicecandidate;
    this.onicecandidate = function(event) {
        if (event.candidate && event.candidate.candidate) {
            // 过滤本地IP地址
            const candidate = event.candidate.candidate;
            if (candidate.includes('192.168.') ||
                candidate.includes('10.') ||
                candidate.includes('172.')) {
                return; // 阻止本地IP泄露
            }
        }

        if (originalOnIceCandidate) {
            originalOnIceCandidate.call(this, event);
        }
    };

    return offer;
};
插件和扩展绕过
12. 浏览器插件伪装
 复制代码 隐藏代码
// 伪装标准插件列表
const fakePlugins = [
    {
        name: 'Chrome PDF Plugin',
        description: 'Portable Document Format',
        filename: 'internal-pdf-viewer',
        version: '1.0.0.0'
    },
    {
        name: 'Chrome PDF Viewer',
        description: '',
        filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai',
        version: '1.0.0.0'
    },
    {
        name: 'Native Client',
        description: '',
        filename: 'internal-nacl-plugin',
        version: '1.0.0.0'
    }
];

// 重写plugins属性
Object.defineProperty(navigator, 'plugins', {
    value: {
        length: fakePlugins.length,
        ...fakePlugins,
        item: function(index) {
            return this[index] || null;
        },
        namedItem: function(name) {
            return Array.from(this).find(plugin => plugin.name === name) || null;
        },
        refresh: function() {}
    },
    writable: false,
    enumerable: true,
    configurable: false
});

// 重写mimeTypes
Object.defineProperty(navigator, 'mimeTypes', {
    value: {
        length: 0,
        item: function() { return null; },
        namedItem: function() { return null; }
    },
    writable: false,
    enumerable: true,
    configurable: false
});
自动化检测绕过
13. Selenium/WebDriver 检测绕过
 复制代码 隐藏代码
// 删除webdriver属性
Object.defineProperty(navigator, 'webdriver', {
    get: () => undefined,
    enumerable: true,
    configurable: true
});

// 删除webdriver属性的另一种方法
delete navigator.__proto__.webdriver;

// 伪装Chrome对象
if (!window.chrome) {
    window.chrome = {
        runtime: {
            onConnect: null,
            onMessage: null
        },
        loadTimes: function() {
            return {
                commitLoadTime: Date.now() / 1000 - Math.random(),
                finishDocumentLoadTime: Date.now() / 1000 - Math.random(),
                finishLoadTime: Date.now() / 1000 - Math.random(),
                firstPaintAfterLoadTime: Date.now() / 1000 - Math.random(),
                firstPaintTime: Date.now() / 1000 - Math.random(),
                navigationType: 'Other',
                npnNegotiatedProtocol: 'h2',
                requestTime: Date.now() / 1000 - Math.random(),
                startLoadTime: Date.now() / 1000 - Math.random(),
                wasAlternateProtocolAvailable: false,
                wasFetchedViaSpdy: true,
                wasNpnNegotiated: true
            };
        },
        csi: function() {
            return {
                startE: Date.now(),
                onloadT: Date.now(),
                pageT: Math.random() * 1000,
                tran: 15
            };
        }
    };
}

// 伪装Notification权限
const originalQuery = Permissions.prototype.query;
Permissions.prototype.query = function(parameters) {
    if (parameters.name === 'notifications') {
        return Promise.resolve({
            state: 'granted',
            onchange: null
        });
    }
    return originalQuery.apply(this, arguments);
};

// 修复outerHeight和outerWidth
if (window.outerHeight === 0) {
    Object.defineProperty(window, 'outerHeight', {
        value: window.innerHeight,
        writable: false
    });
}

if (window.outerWidth === 0) {
    Object.defineProperty(window, 'outerWidth', {
        value: window.innerWidth,
        writable: false
    });
}
14. Puppeteer 检测绕过
 复制代码 隐藏代码
// 删除HeadlessChrome标识
if (navigator.userAgent.includes('HeadlessChrome')) {
    Object.defineProperty(navigator, 'userAgent', {
        value: navigator.userAgent.replace('HeadlessChrome', 'Chrome'),
        writable: false
    });
}

// 伪装iframe检测
Object.defineProperty(window, 'frameElement', {
    value: null,
    writable: false
});

// 伪装document.hidden
Object.defineProperty(document, 'hidden', {
    value: false,
    writable: false
});

// 伪装visibilityState
Object.defineProperty(document, 'visibilityState', {
    value: 'visible',
    writable: false
});

// 修复console.debug
if (!console.debug) {
    console.debug = console.log;
}
Node.js环境补环境
15. 浏览器环境完整模拟
 复制代码 隐藏代码
// 隐藏Node.js特征
const nodeFeatures = [
    'process', 'global', 'Buffer', 'require', 'module', 'exports',
    '__dirname', '__filename', 'setImmediate', 'clearImmediate'
];

nodeFeatures.forEach(feature => {
    try {
        delete global[feature];
    } catch (e) {
        // ignore
    }
});

// 创建window对象
global.window = global;
global.self = global;
global.top = global;
global.parent = global;

// 添加基础浏览器对象
global.document = {
    createElement: function(tag) {
        const element = {
            tagName: tag.toUpperCase(),
            style: {},
            setAttribute: function() {},
            getAttribute: function() { return ''; },
            appendChild: function() {},
            removeChild: function() {},
            addEventListener: function() {},
            removeEventListener: function() {},
            click: function() {},
            focus: function() {},
            blur: function() {}
        };

        if (tag === 'canvas') {
            element.getContext = function(type) {
                if (type === '2d') {
                    return {
                        fillText: function() {},
                        measureText: function(text) {
                            return { width: text.length * 8 };
                        },
                        fillRect: function() {},
                        getImageData: function() {
                            return { data: new Uint8ClampedArray(400) };
                        },
                        putImageData: function() {},
                        clearRect: function() {},
                        beginPath: function() {},
                        arc: function() {},
                        fill: function() {},
                        closePath: function() {}
                    };
                }
                return null;
            };

            element.toDataURL = function() {
                return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
            };
        }

        return element;
    },
    getElementById: function() {
        return this.createElement('div');
    },
    getElementsByTagName: function() {
        return [];
    },
    querySelector: function() {
        return this.createElement('div');
    },
    querySelectorAll: function() {
        return [];
    },
    body: {},
    head: {},
    readyState: 'complete',
    cookie: '',
    domain: 'localhost',
    URL: 'http://localhost'
};

// 添加navigator对象
global.navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    appName: 'Netscape',
    appVersion: '5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    platform: 'Win32',
    vendor: 'Google Inc.',
    language: 'en-US',
    languages: ['en-US', 'en'],
    onLine: true,
    cookieEnabled: true,
    hardwareConcurrency: 8,
    maxTouchPoints: 0,
    deviceMemory: 8,
    plugins: { length: 0 },
    mimeTypes: { length: 0 }
};

// 添加screen对象
global.screen = {
    width: 1920,
    height: 1080,
    availWidth: 1920,
    availHeight: 1040,
    colorDepth: 24,
    pixelDepth: 24
};

// 添加location对象
global.location = {
    href: 'http://localhost',
    origin: 'http://localhost',
    protocol: 'http:',
    hostname: 'localhost',
    port: '',
    pathname: '/',
    search: '',
    hash: ''
};

// 添加history对象
global.history = {
    length: 1,
    pushState: function() {},
    replaceState: function() {},
    go: function() {},
    back: function() {},
    forward: function() {}
};

// 添加常用函数
global.setTimeout = setTimeout;
global.setInterval = setInterval;
global.clearTimeout = clearTimeout;
global.clearInterval = clearInterval;

global.btoa = function(str) {
    return Buffer.from(str, 'binary').toString('base64');
};

global.atob = function(str) {
    return Buffer.from(str, 'base64').toString('binary');
};

// 添加XMLHttpRequest
global.XMLHttpRequest = class {
    constructor() {
        this.readyState = 0;
        this.status = 0;
        this.statusText = '';
        this.responseText = '';
        this.responseXML = null;
        this.onreadystatechange = null;
    }

    open(method, url, async = true) {
        this.method = method;
        this.url = url;
        this.async = async;
        this.readyState = 1;
    }

    setRequestHeader(name, value) {
        this.headers = this.headers || {};
        this.headers[name] = value;
    }

    send(data) {
        this.readyState = 4;
        this.status = 200;
        this.statusText = 'OK';
        this.responseText = '{}';
        if (this.onreadystatechange) {
            this.onreadystatechange();
        }
    }

    abort() {
        this.readyState = 0;
    }
};

// 添加URL构造函数
global.URL = class {
    constructor(url, base) {
        const urlObj = new (require('url').URL)(url, base);
        Object.assign(this, urlObj);
    }
};

// 添加FormData
global.FormData = class {
    constructor() {
        this.data = new Map();
    }

    append(name, value) {
        this.data.set(name, value);
    }

    get(name) {
        return this.data.get(name);
    }

    has(name) {
        return this.data.has(name);
    }

    delete(name) {
        this.data.delete(name);
    }
};
综合防检测脚本
16. 一键防检测脚本
 复制代码 隐藏代码
(function() {
    'use strict';

    console.log('🛡️ 启动指纹防护...');

    // 1. 基础信息伪装
    const fakeUserAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';

    Object.defineProperty(navigator, 'userAgent', {
        value: fakeUserAgent,
        writable: false
    });

    Object.defineProperty(navigator, 'platform', {
        value: 'Win32',
        writable: false
    });

    Object.defineProperty(navigator, 'language', {
        value: 'en-US',
        writable: false
    });

    Object.defineProperty(navigator, 'languages', {
        value: ['en-US', 'en'],
        writable: false
    });

    // 2. 硬件信息标准化
    Object.defineProperty(navigator, 'hardwareConcurrency', {
        value: 8,
        writable: false
    });

    Object.defineProperty(navigator, 'deviceMemory', {
        value: 8,
        writable: false
    });

    // 3. 屏幕信息标准化
    Object.defineProperties(screen, {
        width: { value: 1920, writable: false },
        height: { value: 1080, writable: false },
        availWidth: { value: 1920, writable: false },
        availHeight: { value: 1040, writable: false },
        colorDepth: { value: 24, writable: false }
    });

    // 4. Canvas指纹干扰
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function() {
        const canvas = this;
        const ctx = canvas.getContext('2d');

        // 添加轻微噪声
        if (!this._protected) {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                if (Math.random() < 0.001) {
                    imageData.data[i] = (imageData.data[i] + Math.floor(Math.random() * 5) - 2) % 256;
                }
            }
            ctx.putImageData(imageData, 0, 0);
            this._protected = true;
        }

        return originalToDataURL.apply(this, arguments);
    };

    // 5. WebGL指纹标准化
    const originalGetParameter = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(parameter) {
        const fakeValues = {
            [this.VENDOR]: 'Intel Inc.',
            [this.RENDERER]: 'Intel(R) HD Graphics 4000',
            [this.VERSION]: 'WebGL 1.0 (OpenGL ES 2.0 Chromium)',
            [this.SHADING_LANGUAGE_VERSION]: 'WebGL GLSL ES 1.0 (OpenGL ES GLSL ES 1.0 Chromium)'
        };

        return fakeValues[parameter] || originalGetParameter.apply(this, arguments);
    };

    // 6. 时间API干扰
    const originalPerformanceNow = performance.now;
    performance.now = function() {
        return Math.floor(originalPerformanceNow.apply(this, arguments));
    };

    // 7. 字体检测绕过
    const originalMeasureText = CanvasRenderingContext2D.prototype.measureText;
    CanvasRenderingContext2D.prototype.measureText = function(text) {
        const result = originalMeasureText.apply(this, arguments);

        // 标准化测量结果
        if (this.font.includes('Arial') || this.font.includes('Helvetica')) {
            Object.defineProperty(result, 'width', {
                value: Math.floor(result.width),
                writable: false
            });
        }

        return result;
    };

    // 8. 自动化检测绕过
    if (navigator.webdriver) {
        Object.defineProperty(navigator, 'webdriver', {
            value: false,
            writable: false
        });
    }

    // 9. Puppeteer检测绕过
    if (navigator.userAgent.includes('HeadlessChrome')) {
        Object.defineProperty(navigator, 'userAgent', {
            value: navigator.userAgent.replace('HeadlessChrome', 'Chrome'),
            writable: false
        });
    }

    // 10. 插件标准化
    Object.defineProperty(navigator, 'plugins', {
        value: {
            length: 3,
            0: { name: 'Chrome PDF Plugin', description: 'Portable Document Format' },
            1: { name: 'Chrome PDF Viewer', description: '' },
            2: { name: 'Native Client', description: '' }
        },
        writable: false
    });

    console.log('✅ 指纹防护已启用');

})();
17. Tampermonkey 用户脚本
 复制代码 隐藏代码
// ==UserScript==
// @name         反指纹检测
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  防止网站指纹识别
// @AuThor       You
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    // 在页面加载前执行防护代码
    const script = document.createElement('script');
    script.textContent = `
        // 这里放入上面的综合防检测脚本代码
        ${综合防检测脚本}
    `;

    (document.head || document.documentElement).appendChild(script);
    script.remove();
})();
高级绕过技术
18. 动态指纹生成
 复制代码 隐藏代码
// 生成随机但一致的指纹
class FingerprintSpoofing {
    constructor() {
        this.seed = this.generateSeed();
        this.rng = this.seededRandom(this.seed);
    }

    generateSeed() {
        // 基于域名生成固定种子，确保同一网站指纹一致
        const domain = window.location.hostname;
        let hash = 0;
        for (let i = 0; i < domain.length; i++) {
            const char = domain.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // 转换为32位整数
        }
        return Math.abs(hash);
    }

    seededRandom(seed) {
        return function() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    }

    getRandomUserAgent() {
        const userAgents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        ];

        const index = Math.floor(this.rng() * userAgents.length);
        return userAgents[index];
    }

    getRandomScreenResolution() {
        const resolutions = [
            [1920, 1080], [1366, 768], [1440, 900], [1536, 864], [1280, 720]
        ];

        const index = Math.floor(this.rng() * resolutions.length);
        return resolutions[index];
    }

    apply() {
        // 应用随机指纹
        const userAgent = this.getRandomUserAgent();
        const [width, height] = this.getRandomScreenResolution();

        Object.defineProperty(navigator, 'userAgent', {
            value: userAgent,
            writable: false
        });

        Object.defineProperties(screen, {
            width: { value: width, writable: false },
            height: { value: height, writable: false }
        });
    }
}

// 使用动态指纹
const fingerprint = new FingerprintSpoofing();
fingerprint.apply();
19. 检测逃逸技术
 复制代码 隐藏代码
// 检测是否被检测
function detectFingerprinting() {
    const suspiciousAPIs = [
        'toDataURL', 'getImageData', 'measureText', 'getParameter',
        'createAnalyser', 'createOscillator', 'getBattery'
    ];

    let detectionCount = 0;

    suspiciousAPIs.forEach(api => {
        const elements = document.querySelectorAll('script');
        elements.forEach(script => {
            if (script.textContent && script.textContent.includes(api)) {
                detectionCount++;
                console.warn(`检测到指纹识别API: ${api}`);
            }
        });
    });

    if (detectionCount > 3) {
        console.warn('⚠️ 检测到大量指纹识别代码，建议启用防护');
        return true;
    }

    return false;
}

// 自动启用防护
if (detectFingerprinting()) {
    console.log('🛡️ 自动启用指纹防护');
    // 执行防护代码
}