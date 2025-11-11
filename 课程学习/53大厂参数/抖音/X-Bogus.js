function waitForModule(moduleName, timeout) {
    return new Promise((resolve) => {
        let elapsed = 0;
        const interval = 100;

        const check = setInterval(() => {
            try {
                const module = Process.findModuleByName(moduleName);
                if (module) {
                    clearInterval(check);
                    resolve(module);
                }
            } catch (e) {
            }

            elapsed += interval;
            if (elapsed >= timeout) {
                clearInterval(check);
                resolve(null);
            }
        }, interval);
    });
}

// 主函数
main();
// frida -U -f com.ss.android.ugc.aweme -l X-Bogus.js


















