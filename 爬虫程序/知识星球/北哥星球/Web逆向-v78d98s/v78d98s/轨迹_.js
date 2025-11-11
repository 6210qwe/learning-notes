class HumanTrajectoryGenerator {
    constructor() {
        // 基于分析的参数
        this.mpAvgInterval = 60.7;  // MP平均时间间隔
        this.mpStdInterval = 901.13;  // MP时间间隔标准差
        this.mmAvgInterval = 9.26;  // MM平均时间间隔
        this.mmStdInterval = 10.35;  // MM时间间隔标准差

        // 滑动距离参数
        this.slideDistanceRange = [500, 530];  // 滑动距离范围
        this.yVariationRange = [40, 60];  // Y坐标变化范围

        // 速度参数
        this.mpAvgSpeed = 600;  // MP平均速度
        this.mmAvgSpeed = 600;  // MM平均速度
    }

    /**
     * 生成随机数（正态分布）
     */
    randomGaussian(mean = 0, std = 1) {
        let u = 0, v = 0;
        while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
        while(v === 0) v = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        return z * std + mean;
    }

    /**
     * 生成对数正态分布随机数
     */
    randomLogNormal(mean, std) {
        const normal = this.randomGaussian(Math.log(mean), Math.log(1 + std/mean));
        return Math.exp(normal);
    }

    /**
     * 在范围内生成随机整数
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 在范围内生成随机浮点数
     */
    randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    /**
     * 生成贝塞尔曲线轨迹
     */
    generateBezierCurve(startPoint, endPoint, controlPoints = null, numPoints = 50) {
        if (!controlPoints) {
            // 自动生成控制点，模拟人类不完全直线的移动
            const midX = (startPoint[0] + endPoint[0]) / 2;
            const midY = (startPoint[1] + endPoint[1]) / 2;

            // 添加随机偏移
            const offsetX = this.randomFloat(-50, 50);
            const offsetY = this.randomFloat(-20, 20);

            controlPoints = [[midX + offsetX, midY + offsetY]];
        }

        const points = [];

        if (controlPoints.length === 1) {
            // 二次贝塞尔曲线
            for (let i = 0; i < numPoints; i++) {
                const t = i / (numPoints - 1);
                const x = (1-t)**2 * startPoint[0] + 2*(1-t)*t * controlPoints[0][0] + t**2 * endPoint[0];
                const y = (1-t)**2 * startPoint[1] + 2*(1-t)*t * controlPoints[0][1] + t**2 * endPoint[1];
                points.push([x, y]);
            }
        } else {
            // 三次贝塞尔曲线
            for (let i = 0; i < numPoints; i++) {
                const t = i / (numPoints - 1);
                const x = (1-t)**3 * startPoint[0] + 3*(1-t)**2*t * controlPoints[0][0] +
                         3*(1-t)*t**2 * controlPoints[1][0] + t**3 * endPoint[0];
                const y = (1-t)**3 * startPoint[1] + 3*(1-t)**2*t * controlPoints[0][1] +
                         3*(1-t)*t**2 * controlPoints[1][1] + t**3 * endPoint[1];
                points.push([x, y]);
            }
        }

        return points;
    }

    /**
     * 添加人类手抖的微小噪声
     */
    addHumanNoise(points, noiseLevel = 2) {
        return points.map(([x, y]) => [
            x + this.randomGaussian(0, noiseLevel),
            y + this.randomGaussian(0, noiseLevel)
        ]);
    }

    /**
     * 生成符合人类特征的时间间隔
     */
    generateTimeIntervals(numPoints, avgInterval, stdInterval, minInterval = 1) {
        const intervals = [];
        for (let i = 0; i < numPoints - 1; i++) {
            const interval = Math.max(minInterval,
                this.randomLogNormal(avgInterval, stdInterval)
            );
            intervals.push(Math.round(interval));
        }
        return intervals;
    }

    /**
     * 生成人类滑动的速度曲线（慢-快-慢）
     */
    generateSpeedProfile(numPoints) {
        const speeds = [];
        for (let i = 0; i < numPoints; i++) {
            const t = i / (numPoints - 1);
            // 开始慢，中间快，结束慢
            const speedFactor = Math.sin(Math.PI * t) * 0.8 + 0.2;
            speeds.push(speedFactor);
        }
        return speeds;
    }

    /**
     * 生成MP轨迹（屏幕鼠标移动）
     */
    generateMpTrajectory(startPos, endPos, durationMs = 5000) {
        // 计算轨迹点数
        const avgInterval = this.mpAvgInterval;
        const numPoints = Math.max(50, Math.round(durationMs / avgInterval));

        // 生成贝塞尔曲线路径
        const curvePoints = this.generateBezierCurve(startPos, endPos, null, numPoints);

        // 添加人类噪声
        const noisyPoints = this.addHumanNoise(curvePoints, 3);

        // 生成时间间隔
        const intervals = this.generateTimeIntervals(
            numPoints, this.mpAvgInterval, this.mpStdInterval
        );

        // 构建轨迹数据
        const trajectory = [];
        let currentTime = 0;

        noisyPoints.forEach((point, i) => {
            trajectory.push({
                x: Math.round(point[0]),
                y: Math.round(point[1]),
                time: currentTime,
                isTrusted: 1
            });

            if (i < intervals.length) {
                currentTime += intervals[i];
            }
        });

        return trajectory;
    }

    /**
     * 生成MM轨迹（滑动条内的滑动）
     */
    generateMmTrajectory(startX, slideDistance, yCenter, durationMs = 800) {
        // 计算轨迹点数
        const numPoints = Math.max(30, Math.round(durationMs / this.mmAvgInterval));

        // 生成X坐标序列（主要移动方向）
        const xPoints = [];
        for (let i = 0; i < numPoints; i++) {
            xPoints.push(startX + (slideDistance * i) / (numPoints - 1));
        }

        // 生成Y坐标变化（模拟轻微的上下波动）
        const yVariation = this.randomFloat(...this.yVariationRange);
        const yPoints = [];

        for (let i = 0; i < numPoints; i++) {
            const t = i / (numPoints - 1);
            // 使用正弦波模拟Y坐标的自然变化
            const yOffset = Math.sin(t * Math.PI * 2) * (yVariation / 4) +
                           this.randomGaussian(0, 2);  // 添加随机噪声
            yPoints.push(yCenter + yOffset);
        }

        // 生成速度曲线
        const speedProfile = this.generateSpeedProfile(numPoints);

        // 生成时间间隔
        const baseIntervals = this.generateTimeIntervals(
            numPoints, this.mmAvgInterval, this.mmStdInterval, 4
        );

        // 根据速度调整时间间隔
        const adjustedIntervals = baseIntervals.map((interval, i) => {
            const speedFactor = speedProfile[i] || 1;
            return Math.max(4, Math.round(interval / speedFactor));
        });

        // 构建轨迹数据
        const trajectory = [];
        let currentTime = 0;

        for (let i = 0; i < numPoints; i++) {
            trajectory.push({
                x: Math.round(xPoints[i]),
                y: Math.round(yPoints[i]),
                time: currentTime,
                isTrusted: 1
            });

            if (i < adjustedIntervals.length) {
                currentTime += adjustedIntervals[i];
            }
        }

        return trajectory;
    }

    /**
     * 生成点击事件（mc和mu）
     */
    generateClickEvents(startPos, endPos, startTime, endTime) {
        const mc = [
            {
                x: startPos[0],
                y: startPos[1],
                time: startTime,
                isTrusted: 1,
                button: 0
            },
            {
                x: endPos[0],
                y: endPos[1],
                time: endTime,
                isTrusted: 1,
                button: 0
            }
        ];

        const mu = [
            {
                x: startPos[0],
                y: startPos[1],
                time: startTime + 100,  // 点击后100ms抬起
                isTrusted: 1,
                button: 0
            }
        ];

        return { mc, mu };
    }

    /**
     * 生成键盘事件（基于原数据模式，稍作变动）
     */
    generateKeyboardEvents(startTime, durationMs) {
        const keys = ["Tab", "Numpad0", "Numpad1", "Numpad2", "Numpad3", "Numpad4",
                     "Numpad5", "Numpad6", "Numpad7", "Numpad8", "Numpad9"];

        const ks = [];
        let currentTime = startTime + this.randomInt(1000, 2000);  // 延迟开始

        // 生成5-15个键盘事件
        const numEvents = this.randomInt(5, 15);
        for (let i = 0; i < numEvents; i++) {
            const key = keys[Math.floor(Math.random() * keys.length)];
            ks.push({
                key: key,
                time: currentTime,
                isTrusted: 1
            });
            currentTime += this.randomInt(200, 800);  // 键盘间隔
        }

        return ks;
    }

    /**
     * 生成完整的滑动验证码轨迹
     */
    generateCompleteTrajectory(slideDistance = null) {
        if (slideDistance === null) {
            slideDistance = this.randomInt(...this.slideDistanceRange);
        }

        // 随机生成起始位置
        const startScreenX = this.randomInt(800, 1200);
        const startScreenY = this.randomInt(300, 500);

        // 滑动条位置（相对固定）
        const sliderStartX = this.randomInt(1000, 1100);
        const sliderY = this.randomInt(320, 350);
        const sliderEndX = sliderStartX + slideDistance;

        // 生成MP轨迹（从屏幕某处移动到滑动条）
        const mpTrajectory = this.generateMpTrajectory(
            [startScreenX, startScreenY],
            [sliderStartX, sliderY],
            this.randomInt(3000, 6000)
        );

        // 生成MM轨迹（滑动条内的滑动）
        const mmStartTime = mpTrajectory[mpTrajectory.length - 1].time + this.randomInt(50, 200);
        const mmTrajectory = this.generateMmTrajectory(
            sliderStartX, slideDistance, sliderY,
            this.randomInt(600, 1000)
        );

        // 调整MM轨迹的时间
        mmTrajectory.forEach(point => {
            point.time += mmStartTime;
        });

        // 生成点击事件
        const { mc, mu } = this.generateClickEvents(
            [sliderStartX, sliderY],
            [sliderEndX, sliderY],
            mpTrajectory[mpTrajectory.length - 1].time,
            mmTrajectory[mmTrajectory.length - 1].time
        );

        // 生成键盘事件
        const ks = this.generateKeyboardEvents(
            0, mmTrajectory[mmTrajectory.length - 1].time + 5000
        );

        // 生成焦点事件
        const fi = [
            { type: 0, time: this.randomInt(500, 1000), isTrusted: 1 },
            { type: 1, time: mmTrajectory[mmTrajectory.length - 1].time + this.randomInt(1000, 2000), isTrusted: 1 }
        ];

        // 生成屏幕信息
        const si = {
            fps: Math.round(this.randomFloat(25, 60) * 100) / 100,
            screenWidth: 1920,
            screenHeight: 1080,
            innerWidth: 1920,
            innerHeight: this.randomInt(900, 950),
            outerWidth: 1920,
            outerHeight: this.randomInt(1000, 1080),
            clientWidth: 1920,
            clientWidthHeight: this.randomInt(900, 950)
        };

        return {
            mc: mc,
            tc: [],
            mu: mu,
            te: [],
            mp: mpTrajectory,
            tmv: [],
            mm: mmTrajectory,
            ks: ks,
            fi: fi,
            startTime: Math.floor(this.randomFloat(1700000000000, 1800000000000)),
            si: si
        };
    }


}

// 使用示例
function demonstrateUsage() {
    const generator = new HumanTrajectoryGenerator();
    return generator.generateCompleteTrajectory();;
}

function transformObject(obj) {
    const result = {};

    // 处理 mc 数组
    result.mc = obj.mc.map(item =>
        `${item.x},${item.y},${item.time}, ,${item.isTrusted}`
    ).join('|');

    // 处理 tc 数组（空数组）
    result.tc = '';

    // 处理 mu 数组
    result.mu = obj.mu.map(item =>
        `${item.x},${item.y},${item.time}, ,${item.isTrusted}`
    ).join('|');

    // 处理 te 数组（空数组）
    result.te = '';

    // 处理 mp 数组
    result.mp = obj.mp.map(item =>
        `${item.x},${item.y},${item.time},${item.isTrusted}`
    ).join('|');

    // 处理 tmv 数组（空数组）
    result.tmv = '';

    // 处理 mm 数组
    result.mm = obj.mm.map(item =>
        `${item.x},${item.y},${item.time},${item.isTrusted}`
    ).join('|');

    // 处理 ks 数组
    result.ks = obj.ks.map(item =>
        `${item.time},${item.key},${item.isTrusted}`
    ).join('|');

    // 处理 fi 数组
    result.fi = obj.fi.map(item =>
        `${item.time},${item.type},${item.isTrusted}`
    ).join('|');

    // 处理 startTime
    result.startTime = obj.startTime;

    // 处理 si 对象
    const si = obj.si;
    result.si = [
        si.screenWidth,
        si.innerWidth,
        si.innerHeight,
        si.outerWidth,
        si.clientWidthHeight,
        si.outerHeight,
        si.screenHeight,
        si.fps,
        si.clientWidth
    ].join(',');

    return result;
}

code1 = demonstrateUsage()

code2 = transformObject(code1)
console.log(code2)