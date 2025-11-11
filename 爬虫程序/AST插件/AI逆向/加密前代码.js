class SecurityUtils {
    constructor() {
        this.init();
    }

    // 初始化
    init() {
        this.log('安全工具初始化完成', 'info');
        this.detectConsole();
        this.generateBrowserFingerprint();
    }

    // 日志打印
    log(message, level = 'log') {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`;

        switch(level) {
            case 'info': console.info(logMessage); break;
            case 'warn': console.warn(logMessage); break;
            case 'error': console.error(logMessage); break;
            default: console.log(logMessage);
        }
    }

    // 控制台检测
    detectConsole() {
        const dummy = document.createElement('div');
        const originalConsole = console.log;

        console.log = (...args) => {
            this.log('检测到控制台输出', 'warn');
            originalConsole.apply(console, args);
        };

        try {
            console.assert(false, '控制台检测');
        } catch (e) {
            this.log('控制台已打开', 'warn');
        }
    }

    // MD5加密（简化版）
    md5(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // 转换为32位整数
        }
        return this.toHex(hash);
    }

    // 转为十六进制
    toHex(n) {
        return ((n >>> 0).toString(16)).padStart(8, '0');
    }

    // 位运算加密
    bitwiseEncrypt(str) {
        let result = '';
        for (let i = 0; i < str.length; i++) {
            // 位异或运算
            result += String.fromCharCode(str.charCodeAt(i) ^ 0x55);
        }
        return btoa(result);
    }

    // 位运算解密
    bitwiseDecrypt(encrypted) {
        let str = atob(encrypted);
        let result = '';
        for (let i = 0; i < str.length; i++) {
            result += String.fromCharCode(str.charCodeAt(i) ^ 0x55);
        }
        return result;
    }

    // AES加密（简化版）
    aesEncrypt(str, key) {
        key = this.md5(key).substring(0, 16); // 16位密钥
        let result = '';
        for (let i = 0; i < str.length; i++) {
            const keyChar = key.charCodeAt(i % key.length);
            // 结合位运算的简单加密
            result += String.fromCharCode(str.charCodeAt(i) ^ keyChar);
        }
        return btoa(result);
    }

    // AES解密（简化版）
    aesDecrypt(encrypted, key) {
        key = this.md5(key).substring(0, 16);
        let str = atob(encrypted);
        let result = '';
        for (let i = 0; i < str.length; i++) {
            const keyChar = key.charCodeAt(i % key.length);
            result += String.fromCharCode(str.charCodeAt(i) ^ keyChar);
        }
        return result;
    }

    // 浏览器指纹校验
    generateBrowserFingerprint() {
        const fingerPrintData = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            navigator.hardwareConcurrency,
            navigator.cookieEnabled ? 'cookies' : 'no-cookies'
        ].join('|');

        this.fingerprint = this.md5(fingerPrintData);
        this.log(`浏览器指纹生成: ${this.fingerprint}`, 'info');
        return this.fingerprint;
    }

    // 验证指纹
    verifyFingerprint(fingerprint) {
        const isValid = this.fingerprint === fingerprint;
        this.log(`指纹验证: ${isValid ? '通过' : '失败'}`, isValid ? 'info' : 'error');
        return isValid;
    }
}

// 示例使用
const security = new SecurityUtils();
const testStr = 'Hello World! 123';

security.log(`原始字符串: ${testStr}`);
const md5Hash = security.md5(testStr);
security.log(`MD5加密: ${md5Hash}`);

const bitEncrypted = security.bitwiseEncrypt(testStr);
security.log(`位运算加密: ${bitEncrypted}`);
security.log(`位运算解密: ${security.bitwiseDecrypt(bitEncrypted)}`);

const aesKey = 'mySecretKey';
const aesEncrypted = security.aesEncrypt(testStr, aesKey);
security.log(`AES加密: ${aesEncrypted}`);
security.log(`AES解密: ${security.aesDecrypt(aesEncrypted, aesKey)}`);

// 验证指纹
security.verifyFingerprint(security.fingerprint);
