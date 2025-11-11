!(function () {
    "use strict";
    const $toString = Function.toString;
    const myFunction_toString_symbol = Symbol('('.concat('', ')_', (Math.random() + '').toString(36)));
    const mytoString = function () {
        return typeof this == 'function' && this[myFunction_toString_symbol] || $toString.call(this);
    };

    function set_native(func, key, value) {
        Object.defineProperty(func, key, {
            "enumerable": false,
            "configurable": true,
            "writable": true,
            "value": value
        })
    };
    delete Function.prototype['toString'];
    set_native(Function.prototype, "toString", mytoString);
    set_native(Function.prototype.toString, myFunction_toString_symbol, "function toString() { [native code] }");
    globalThis.func_set_native = function (func) {
        set_native(func, myFunction_toString_symbol, `function ${myFunction_toString_symbol, func.name || ''}() { [native code] }`)
    }
}).call(this);

require_ = require;
process_ = process;

function obj_toString(obj, name) {
    Object.defineProperty(obj, Symbol.toStringTag, {
        value: name
    });
};

function obj_toStringTag(obj, name) {
    Object.defineProperties(obj, {
        [Symbol.toStringTag]: {
            value: name
        }
    })

}

if (typeof __dirname != 'undefined') {
    __dirname = undefined
}
if (typeof __filename != 'undefined') {
    __filename = undefined
}
if (typeof require != 'undefined') {
    require = undefined
}
if (typeof exports != 'undefined') {
    exports = undefined
}
if (typeof module != 'undefined') {
    module = undefined
}
if (typeof Buffer != 'undefined') {
    Buffer = undefined
}
if (typeof process != 'undefined') {
    process = undefined
}
if (typeof global != 'global') {
    global = undefined
}

// window.performance
dtavm = {}
dtavm.log = console.log

function proxy(obj, objname, type) {
    function getMethodHandler(WatchName, target_obj) {
        let methodhandler = {
            apply(target, thisArg, argArray) {
                if (this.target_obj) {
                    thisArg = this.target_obj
                }
                let result = Reflect.apply(target, thisArg, argArray)
                if (target.name !== "toString") {
                    if (target.name === "addEventListener") {
                        dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray[0]}], 结果 => [${result}].`)
                    } else if (WatchName === "window.console") {
                    } else {
                        dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${result}].`)
                    }
                } else {
                    dtavm.log(`调用者 => [${WatchName}] 函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${result}].`)
                }
                return result
            },
            construct(target, argArray, newTarget) {
                var result = Reflect.construct(target, argArray, newTarget)
                dtavm.log(`调用者 => [${WatchName}] 构造函数名 => [${target.name}], 传参 => [${argArray}], 结果 => [${(result)}].`)
                return result;
            }
        }
        methodhandler.target_obj = target_obj
        return methodhandler
    }

    function getObjhandler(WatchName) {
        let handler = {
            get(target, propKey, receiver) {
                let result = target[propKey]
                if (result instanceof Object) {
                    if (typeof result === "function") {
                        dtavm.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey}] , 是个函数`)
                        return new Proxy(result, getMethodHandler(WatchName, target))
                    } else {
                        dtavm.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey}], 结果 => [${(result)}]`);
                    }
                    return new Proxy(result, getObjhandler(`${WatchName}.${propKey}`))
                }
                if (typeof (propKey) !== "symbol") {
                    dtavm.log(`调用者 => [${WatchName}] 获取属性名 => [${propKey?.description ?? propKey}], 结果 => [${result}]`);
                }
                return result;
            },
            set(target, propKey, value, receiver) {
                if (value instanceof Object) {
                    dtavm.log(`调用者 => [${WatchName}] 设置属性名 => [${propKey}], 值为 => [${(value)}]`);
                } else {
                    dtavm.log(`调用者 => [${WatchName}] 设置属性名 => [${propKey}], 值为 => [${value}]`);
                }
                return Reflect.set(target, propKey, value, receiver);
            },
            has(target, propKey) {
                var result = Reflect.has(target, propKey);
                dtavm.log(`针对in操作符的代理has=> [${WatchName}] 有无属性名 => [${propKey}], 结果 => [${result}]`)
                return result;
            },
            deleteProperty(target, propKey) {
                var result = Reflect.deleteProperty(target, propKey);
                dtavm.log(`拦截属性delete => [${WatchName}] 删除属性名 => [${propKey}], 结果 => [${result}]`)
                return result;
            },
            defineProperty(target, propKey, attributes) {
                var result = Reflect.defineProperty(target, propKey, attributes);
                dtavm.log(`拦截对象define操作 => [${WatchName}] 待检索属性名 => [${propKey.toString()}] 属性描述 => [${(attributes)}], 结果 => [${result}]`)
                // debugger
                return result
            },
            getPrototypeOf(target) {
                var result = Reflect.getPrototypeOf(target)
                dtavm.log(`被代理的目标对象 => [${WatchName}] 代理结果 => [${(result)}]`)
                return result;
            },
            setPrototypeOf(target, proto) {
                dtavm.log(`被拦截的目标对象 => [${WatchName}] 对象新原型==> [${(proto)}]`)
                return Reflect.setPrototypeOf(target, proto);
            },
            preventExtensions(target) {
                dtavm.log(`方法用于设置preventExtensions => [${WatchName}] 防止扩展`)
                return Reflect.preventExtensions(target);
            },
            isExtensible(target) {
                var result = Reflect.isExtensible(target)
                dtavm.log(`拦截对对象的isExtensible() => [${WatchName}] isExtensible, 返回值==> [${result}]`)
                return result;
            },
        }
        return handler;
    }

    if (type === "method") {
        return new Proxy(obj, getMethodHandler(objname, obj));
    }
    return new Proxy(obj, getObjhandler(objname));
}


//////////////////////////////////////////////////////////////////////////////////html标签 相关

CSSStyleDeclaration = {
    "accentColor": "",
    "additiveSymbols": "",
    "alignContent": "",
    "alignItems": "",
    "alignSelf": "",
    "alignmentBaseline": "",
    "all": "",
    "anchorName": "",
    "animation": "",
    "animationComposition": "",
    "animationDelay": "",
    "animationDirection": "",
    "animationDuration": "",
    "animationFillMode": "",
    "animationIterationCount": "",
    "animationName": "",
    "animationPlayState": "",
    "animationRange": "",
    "animationRangeEnd": "",
    "animationRangeStart": "",
    "animationTimeline": "",
    "animationTimingFunction": "",
    "appRegion": "",
    "appearance": "",
    "ascentOverride": "",
    "aspectRatio": "",
    "backdropFilter": "",
    "backfaceVisibility": "",
    "background": "",
    "backgroundAttachment": "",
    "backgroundBlendMode": "",
    "backgroundClip": "",
    "backgroundColor": "",
    "backgroundImage": "",
    "backgroundOrigin": "",
    "backgroundPosition": "",
    "backgroundPositionX": "",
    "backgroundPositionY": "",
    "backgroundRepeat": "",
    "backgroundSize": "",
    "basePalette": "",
    "baselineShift": "",
    "baselineSource": "",
    "blockSize": "",
    "border": "",
    "borderBlock": "",
    "borderBlockColor": "",
    "borderBlockEnd": "",
    "borderBlockEndColor": "",
    "borderBlockEndStyle": "",
    "borderBlockEndWidth": "",
    "borderBlockStart": "",
    "borderBlockStartColor": "",
    "borderBlockStartStyle": "",
    "borderBlockStartWidth": "",
    "borderBlockStyle": "",
    "borderBlockWidth": "",
    "borderBottom": "",
    "borderBottomColor": "",
    "borderBottomLeftRadius": "",
    "borderBottomRightRadius": "",
    "borderBottomStyle": "",
    "borderBottomWidth": "",
    "borderCollapse": "",
    "borderColor": "",
    "borderEndEndRadius": "",
    "borderEndStartRadius": "",
    "borderImage": "",
    "borderImageOutset": "",
    "borderImageRepeat": "",
    "borderImageSlice": "",
    "borderImageSource": "",
    "borderImageWidth": "",
    "borderInline": "",
    "borderInlineColor": "",
    "borderInlineEnd": "",
    "borderInlineEndColor": "",
    "borderInlineEndStyle": "",
    "borderInlineEndWidth": "",
    "borderInlineStart": "",
    "borderInlineStartColor": "",
    "borderInlineStartStyle": "",
    "borderInlineStartWidth": "",
    "borderInlineStyle": "",
    "borderInlineWidth": "",
    "borderLeft": "",
    "borderLeftColor": "",
    "borderLeftStyle": "",
    "borderLeftWidth": "",
    "borderRadius": "",
    "borderRight": "",
    "borderRightColor": "",
    "borderRightStyle": "",
    "borderRightWidth": "",
    "borderSpacing": "",
    "borderStartEndRadius": "",
    "borderStartStartRadius": "",
    "borderStyle": "",
    "borderTop": "",
    "borderTopColor": "",
    "borderTopLeftRadius": "",
    "borderTopRightRadius": "",
    "borderTopStyle": "",
    "borderTopWidth": "",
    "borderWidth": "",
    "bottom": "",
    "boxShadow": "",
    "boxSizing": "",
    "breakAfter": "",
    "breakBefore": "",
    "breakInside": "",
    "bufferedRendering": "",
    "captionSide": "",
    "caretColor": "",
    "clear": "",
    "clip": "",
    "clipPath": "",
    "clipRule": "",
    "color": "",
    "colorInterpolation": "",
    "colorInterpolationFilters": "",
    "colorRendering": "",
    "colorScheme": "",
    "columnCount": "",
    "columnFill": "",
    "columnGap": "",
    "columnRule": "",
    "columnRuleColor": "",
    "columnRuleStyle": "",
    "columnRuleWidth": "",
    "columnSpan": "",
    "columnWidth": "",
    "columns": "",
    "contain": "",
    "containIntrinsicBlockSize": "",
    "containIntrinsicHeight": "",
    "containIntrinsicInlineSize": "",
    "containIntrinsicSize": "",
    "containIntrinsicWidth": "",
    "container": "",
    "containerName": "",
    "containerType": "",
    "content": "",
    "contentVisibility": "",
    "counterIncrement": "",
    "counterReset": "",
    "counterSet": "",
    "cursor": "",
    "cx": "",
    "cy": "",
    "d": "",
    "descentOverride": "",
    "direction": "",
    "display": "",
    "dominantBaseline": "",
    "emptyCells": "",
    "fallback": "",
    "fieldSizing": "",
    "fill": "",
    "fillOpacity": "",
    "fillRule": "",
    "filter": "",
    "flex": "",
    "flexBasis": "",
    "flexDirection": "",
    "flexFlow": "",
    "flexGrow": "",
    "flexShrink": "",
    "flexWrap": "",
    "float": "",
    "floodColor": "",
    "floodOpacity": "",
    "font": "",
    "fontDisplay": "",
    "fontFamily": "",
    "fontFeatureSettings": "",
    "fontKerning": "",
    "fontOpticalSizing": "",
    "fontPalette": "",
    "fontSize": "",
    "fontSizeAdjust": "",
    "fontStretch": "",
    "fontStyle": "",
    "fontSynthesis": "",
    "fontSynthesisSmallCaps": "",
    "fontSynthesisStyle": "",
    "fontSynthesisWeight": "",
    "fontVariant": "",
    "fontVariantAlternates": "",
    "fontVariantCaps": "",
    "fontVariantEastAsian": "",
    "fontVariantLigatures": "",
    "fontVariantNumeric": "",
    "fontVariantPosition": "",
    "fontVariationSettings": "",
    "fontWeight": "",
    "forcedColorAdjust": "",
    "gap": "",
    "grid": "",
    "gridArea": "",
    "gridAutoColumns": "",
    "gridAutoFlow": "",
    "gridAutoRows": "",
    "gridColumn": "",
    "gridColumnEnd": "",
    "gridColumnGap": "",
    "gridColumnStart": "",
    "gridGap": "",
    "gridRow": "",
    "gridRowEnd": "",
    "gridRowGap": "",
    "gridRowStart": "",
    "gridTemplate": "",
    "gridTemplateAreas": "",
    "gridTemplateColumns": "",
    "gridTemplateRows": "",
    "height": "",
    "hyphenateCharacter": "",
    "hyphenateLimitChars": "",
    "hyphens": "",
    "imageOrientation": "",
    "imageRendering": "",
    "inherits": "",
    "initialLetter": "",
    "initialValue": "",
    "inlineSize": "",
    "inset": "",
    "insetArea": "",
    "insetBlock": "",
    "insetBlockEnd": "",
    "insetBlockStart": "",
    "insetInline": "",
    "insetInlineEnd": "",
    "insetInlineStart": "",
    "isolation": "",
    "justifyContent": "",
    "justifyItems": "",
    "justifySelf": "",
    "left": "",
    "letterSpacing": "",
    "lightingColor": "",
    "lineBreak": "",
    "lineGapOverride": "",
    "lineHeight": "",
    "listStyle": "",
    "listStyleImage": "",
    "listStylePosition": "",
    "listStyleType": "",
    "margin": "",
    "marginBlock": "",
    "marginBlockEnd": "",
    "marginBlockStart": "",
    "marginBottom": "",
    "marginInline": "",
    "marginInlineEnd": "",
    "marginInlineStart": "",
    "marginLeft": "",
    "marginRight": "",
    "marginTop": "",
    "marker": "",
    "markerEnd": "",
    "markerMid": "",
    "markerStart": "",
    "mask": "",
    "maskClip": "",
    "maskComposite": "",
    "maskImage": "",
    "maskMode": "",
    "maskOrigin": "",
    "maskPosition": "",
    "maskRepeat": "",
    "maskSize": "",
    "maskType": "",
    "mathDepth": "",
    "mathShift": "",
    "mathStyle": "",
    "maxBlockSize": "",
    "maxHeight": "",
    "maxInlineSize": "",
    "maxWidth": "",
    "minBlockSize": "",
    "minHeight": "",
    "minInlineSize": "",
    "minWidth": "",
    "mixBlendMode": "",
    "navigation": "",
    "negative": "",
    "objectFit": "",
    "objectPosition": "",
    "objectViewBox": "",
    "offset": "",
    "offsetAnchor": "",
    "offsetDistance": "",
    "offsetPath": "",
    "offsetPosition": "",
    "offsetRotate": "",
    "opacity": "",
    "order": "",
    "orphans": "",
    "outline": "",
    "outlineColor": "",
    "outlineOffset": "",
    "outlineStyle": "",
    "outlineWidth": "",
    "overflow": "",
    "overflowAnchor": "",
    "overflowClipMargin": "",
    "overflowWrap": "",
    "overflowX": "",
    "overflowY": "",
    "overlay": "",
    "overrideColors": "",
    "overscrollBehavior": "",
    "overscrollBehaviorBlock": "",
    "overscrollBehaviorInline": "",
    "overscrollBehaviorX": "",
    "overscrollBehaviorY": "",
    "pad": "",
    "padding": "",
    "paddingBlock": "",
    "paddingBlockEnd": "",
    "paddingBlockStart": "",
    "paddingBottom": "",
    "paddingInline": "",
    "paddingInlineEnd": "",
    "paddingInlineStart": "",
    "paddingLeft": "",
    "paddingRight": "",
    "paddingTop": "",
    "page": "",
    "pageBreakAfter": "",
    "pageBreakBefore": "",
    "pageBreakInside": "",
    "pageOrientation": "",
    "paintOrder": "",
    "perspective": "",
    "perspectiveOrigin": "",
    "placeContent": "",
    "placeItems": "",
    "placeSelf": "",
    "pointerEvents": "",
    "position": "",
    "positionAnchor": "",
    "positionTry": "",
    "positionTryOptions": "",
    "positionTryOrder": "",
    "positionVisibility": "",
    "prefix": "",
    "quotes": "",
    "r": "",
    "range": "",
    "resize": "",
    "right": "",
    "rotate": "",
    "rowGap": "",
    "rubyPosition": "",
    "rx": "",
    "ry": "",
    "scale": "",
    "scrollBehavior": "",
    "scrollMargin": "",
    "scrollMarginBlock": "",
    "scrollMarginBlockEnd": "",
    "scrollMarginBlockStart": "",
    "scrollMarginBottom": "",
    "scrollMarginInline": "",
    "scrollMarginInlineEnd": "",
    "scrollMarginInlineStart": "",
    "scrollMarginLeft": "",
    "scrollMarginRight": "",
    "scrollMarginTop": "",
    "scrollPadding": "",
    "scrollPaddingBlock": "",
    "scrollPaddingBlockEnd": "",
    "scrollPaddingBlockStart": "",
    "scrollPaddingBottom": "",
    "scrollPaddingInline": "",
    "scrollPaddingInlineEnd": "",
    "scrollPaddingInlineStart": "",
    "scrollPaddingLeft": "",
    "scrollPaddingRight": "",
    "scrollPaddingTop": "",
    "scrollSnapAlign": "",
    "scrollSnapStop": "",
    "scrollSnapType": "",
    "scrollTimeline": "",
    "scrollTimelineAxis": "",
    "scrollTimelineName": "",
    "scrollbarColor": "",
    "scrollbarGutter": "",
    "scrollbarWidth": "",
    "shapeImageThreshold": "",
    "shapeMargin": "",
    "shapeOutside": "",
    "shapeRendering": "",
    "size": "",
    "sizeAdjust": "",
    "speak": "",
    "speakAs": "",
    "src": "",
    "stopColor": "",
    "stopOpacity": "",
    "stroke": "",
    "strokeDasharray": "",
    "strokeDashoffset": "",
    "strokeLinecap": "",
    "strokeLinejoin": "",
    "strokeMiterlimit": "",
    "strokeOpacity": "",
    "strokeWidth": "",
    "suffix": "",
    "symbols": "",
    "syntax": "",
    "system": "",
    "tabSize": "",
    "tableLayout": "",
    "textAlign": "",
    "textAlignLast": "",
    "textAnchor": "",
    "textCombineUpright": "",
    "textDecoration": "",
    "textDecorationColor": "",
    "textDecorationLine": "",
    "textDecorationSkipInk": "",
    "textDecorationStyle": "",
    "textDecorationThickness": "",
    "textEmphasis": "",
    "textEmphasisColor": "",
    "textEmphasisPosition": "",
    "textEmphasisStyle": "",
    "textIndent": "",
    "textOrientation": "",
    "textOverflow": "",
    "textRendering": "",
    "textShadow": "",
    "textSizeAdjust": "",
    "textSpacingTrim": "",
    "textTransform": "",
    "textUnderlineOffset": "",
    "textUnderlinePosition": "",
    "textWrap": "",
    "timelineScope": "",
    "top": "",
    "touchAction": "",
    "transform": "",
    "transformBox": "",
    "transformOrigin": "",
    "transformStyle": "",
    "transition": "",
    "transitionBehavior": "",
    "transitionDelay": "",
    "transitionDuration": "",
    "transitionProperty": "",
    "transitionTimingFunction": "",
    "translate": "",
    "types": "",
    "unicodeBidi": "",
    "unicodeRange": "",
    "userSelect": "",
    "vectorEffect": "",
    "verticalAlign": "",
    "viewTimeline": "",
    "viewTimelineAxis": "",
    "viewTimelineInset": "",
    "viewTimelineName": "",
    "viewTransitionClass": "",
    "viewTransitionName": "",
    "visibility": "",
    "webkitAlignContent": "",
    "webkitAlignItems": "",
    "webkitAlignSelf": "",
    "webkitAnimation": "",
    "webkitAnimationDelay": "",
    "webkitAnimationDirection": "",
    "webkitAnimationDuration": "",
    "webkitAnimationFillMode": "",
    "webkitAnimationIterationCount": "",
    "webkitAnimationName": "",
    "webkitAnimationPlayState": "",
    "webkitAnimationTimingFunction": "",
    "webkitAppRegion": "",
    "webkitAppearance": "",
    "webkitBackfaceVisibility": "",
    "webkitBackgroundClip": "",
    "webkitBackgroundOrigin": "",
    "webkitBackgroundSize": "",
    "webkitBorderAfter": "",
    "webkitBorderAfterColor": "",
    "webkitBorderAfterStyle": "",
    "webkitBorderAfterWidth": "",
    "webkitBorderBefore": "",
    "webkitBorderBeforeColor": "",
    "webkitBorderBeforeStyle": "",
    "webkitBorderBeforeWidth": "",
    "webkitBorderBottomLeftRadius": "",
    "webkitBorderBottomRightRadius": "",
    "webkitBorderEnd": "",
    "webkitBorderEndColor": "",
    "webkitBorderEndStyle": "",
    "webkitBorderEndWidth": "",
    "webkitBorderHorizontalSpacing": "",
    "webkitBorderImage": "",
    "webkitBorderRadius": "",
    "webkitBorderStart": "",
    "webkitBorderStartColor": "",
    "webkitBorderStartStyle": "",
    "webkitBorderStartWidth": "",
    "webkitBorderTopLeftRadius": "",
    "webkitBorderTopRightRadius": "",
    "webkitBorderVerticalSpacing": "",
    "webkitBoxAlign": "",
    "webkitBoxDecorationBreak": "",
    "webkitBoxDirection": "",
    "webkitBoxFlex": "",
    "webkitBoxOrdinalGroup": "",
    "webkitBoxOrient": "",
    "webkitBoxPack": "",
    "webkitBoxReflect": "",
    "webkitBoxShadow": "",
    "webkitBoxSizing": "",
    "webkitClipPath": "",
    "webkitColumnBreakAfter": "",
    "webkitColumnBreakBefore": "",
    "webkitColumnBreakInside": "",
    "webkitColumnCount": "",
    "webkitColumnGap": "",
    "webkitColumnRule": "",
    "webkitColumnRuleColor": "",
    "webkitColumnRuleStyle": "",
    "webkitColumnRuleWidth": "",
    "webkitColumnSpan": "",
    "webkitColumnWidth": "",
    "webkitColumns": "",
    "webkitFilter": "",
    "webkitFlex": "",
    "webkitFlexBasis": "",
    "webkitFlexDirection": "",
    "webkitFlexFlow": "",
    "webkitFlexGrow": "",
    "webkitFlexShrink": "",
    "webkitFlexWrap": "",
    "webkitFontFeatureSettings": "",
    "webkitFontSmoothing": "",
    "webkitHyphenateCharacter": "",
    "webkitJustifyContent": "",
    "webkitLineBreak": "",
    "webkitLineClamp": "",
    "webkitLocale": "",
    "webkitLogicalHeight": "",
    "webkitLogicalWidth": "",
    "webkitMarginAfter": "",
    "webkitMarginBefore": "",
    "webkitMarginEnd": "",
    "webkitMarginStart": "",
    "webkitMask": "",
    "webkitMaskBoxImage": "",
    "webkitMaskBoxImageOutset": "",
    "webkitMaskBoxImageRepeat": "",
    "webkitMaskBoxImageSlice": "",
    "webkitMaskBoxImageSource": "",
    "webkitMaskBoxImageWidth": "",
    "webkitMaskClip": "",
    "webkitMaskComposite": "",
    "webkitMaskImage": "",
    "webkitMaskOrigin": "",
    "webkitMaskPosition": "",
    "webkitMaskPositionX": "",
    "webkitMaskPositionY": "",
    "webkitMaskRepeat": "",
    "webkitMaskSize": "",
    "webkitMaxLogicalHeight": "",
    "webkitMaxLogicalWidth": "",
    "webkitMinLogicalHeight": "",
    "webkitMinLogicalWidth": "",
    "webkitOpacity": "",
    "webkitOrder": "",
    "webkitPaddingAfter": "",
    "webkitPaddingBefore": "",
    "webkitPaddingEnd": "",
    "webkitPaddingStart": "",
    "webkitPerspective": "",
    "webkitPerspectiveOrigin": "",
    "webkitPerspectiveOriginX": "",
    "webkitPerspectiveOriginY": "",
    "webkitPrintColorAdjust": "",
    "webkitRtlOrdering": "",
    "webkitRubyPosition": "",
    "webkitShapeImageThreshold": "",
    "webkitShapeMargin": "",
    "webkitShapeOutside": "",
    "webkitTapHighlightColor": "",
    "webkitTextCombine": "",
    "webkitTextDecorationsInEffect": "",
    "webkitTextEmphasis": "",
    "webkitTextEmphasisColor": "",
    "webkitTextEmphasisPosition": "",
    "webkitTextEmphasisStyle": "",
    "webkitTextFillColor": "",
    "webkitTextOrientation": "",
    "webkitTextSecurity": "",
    "webkitTextSizeAdjust": "",
    "webkitTextStroke": "",
    "webkitTextStrokeColor": "",
    "webkitTextStrokeWidth": "",
    "webkitTransform": "",
    "webkitTransformOrigin": "",
    "webkitTransformOriginX": "",
    "webkitTransformOriginY": "",
    "webkitTransformOriginZ": "",
    "webkitTransformStyle": "",
    "webkitTransition": "",
    "webkitTransitionDelay": "",
    "webkitTransitionDuration": "",
    "webkitTransitionProperty": "",
    "webkitTransitionTimingFunction": "",
    "webkitUserDrag": "",
    "webkitUserModify": "",
    "webkitUserSelect": "",
    "webkitWritingMode": "",
    "whiteSpace": "",
    "whiteSpaceCollapse": "",
    "widows": "",
    "width": "",
    "willChange": "",
    "wordBreak": "",
    "wordSpacing": "",
    "wordWrap": "",
    "writingMode": "",
    "x": "",
    "y": "",
    "zIndex": "",
    "zoom": ""
};

WebGLDebugRendererInfo = {
    UNMASKED_RENDERER_WEBGL: 37446,
    UNMASKED_VENDOR_WEBGL: 37445
};
obj_toString(WebGLDebugRendererInfo, 'WebGLDebugRendererInfo');
obj_toStringTag(WebGLDebugRendererInfo, "WebGLDebugRendererInfo");
WebGLRenderingContext = {};
WebGLRenderingContext.getExtension = function getExtension() {
    console.log("WebGLRenderingContext.getExtension ---> ", arguments)
    let args1 = arguments[0]
    if (args1 === 'WEBGL_debug_renderer_info') {
        return WebGLDebugRendererInfo
    }
};
WebGLRenderingContext.getParameter = function getParameter() {
    console.log("WebGLRenderingContext.getParameter ---> ", arguments)
    let args1 = arguments[0]
    let ele = ''
    switch (args1 + "") {
        case "37445":
            ele = "Google Inc. (NVIDIA)"
            break
        case "37446":
            ele = "ANGLE (NVIDIA, NVIDIA GeForce GTX 1650 (0x00001F82) Direct3D11 vs_5_0 ps_5_0, D3D11)"
            break
        default:
            break
    }
    return ele
}
obj_toString(WebGLRenderingContext, 'WebGLRenderingContext');
obj_toStringTag(WebGLRenderingContext, "WebGLRenderingContext");
func_set_native(WebGLRenderingContext.getExtension);
func_set_native(WebGLRenderingContext.getParameter);


CanvasRenderingContext2D = {};
CanvasRenderingContext2D.fillRect = function fillRect() {
    console.log("CanvasRenderingContext2D.fillRect -->", arguments)
}
CanvasRenderingContext2D.fillText = function () {
    console.log("CanvasRenderingContext2D.fillText -->", arguments)

}
obj_toString(CanvasRenderingContext2D, 'CanvasRenderingContext2D');
obj_toStringTag(CanvasRenderingContext2D, 'CanvasRenderingContext2D');
func_set_native(CanvasRenderingContext2D.fillRect);
func_set_native(CanvasRenderingContext2D.fillText);

function HTMLCanvasElement() {
    console.log("HTMLCanvasElement -->", arguments)
    throw new TypeError("Illegal constructor");
}

obj_toString(WebGLRenderingContext, 'WebGLRenderingContext');
canvas = {
    canvas: this,
    clientWidth: '',
    accessKey: '',
    childNodes: [],
    contentEditable: 'inherit',
    height: 150,
    hidden: false,
    innerHTML: '',
    namespaceURI: "http://www.w3.org/1999/xhtml",
    localName: 'canvas',
    nodeName: 'CANVAS',
    offsetHeight: 0,
    offsetLeft: 0,
    offsetParent: 0,
    getAttributeNames: function () {
    },
    offsetTop: 0,
    outerHTML: "<canvas></canvas>",
    width: 300,
};
HTMLCanvasElement.prototype.getContext = function getContext() {
    console.log("HTMLCanvasElement.prototype.getContext --->", arguments)
    let args1 = arguments[0]
    var canvas_webgl = WebGLRenderingContext;
    var canvas_2d = CanvasRenderingContext2D;
    if (args1 === 'webgl' || args1 === 'experimental-webgl') {
        return canvas_webgl
    } else if (args1 === '2d') {
        return canvas_2d
    }
}
HTMLCanvasElement.prototype.getAttributeNames = function getAttributeNames() {
    console.log("HTMLCanvasElement.prototype.getAttributeNames --->", arguments)
}
HTMLCanvasElement.prototype.style = CSSStyleDeclaration;

HTMLCanvasElement.prototype.toDataURL = function toDataURL() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAAAXNSR0IArs4c6QAABGJJREFUeF7t1AEJAAAMAsHZv/RyPNwSyDncOQIECEQEFskpJgECBM5geQICBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAAYPlBwgQyAgYrExVghIgYLD8AAECGQGDlalKUAIEDJYfIEAgI2CwMlUJSoCAwfIDBAhkBAxWpipBCRAwWH6AAIGMgMHKVCUoAQIGyw8QIJARMFiZqgQlQMBg+QECBDICBitTlaAECBgsP0CAQEbAYGWqEpQAgQdWMQCX4yW9owAAAABJRU5ErkJggg=='
}
HTMLCanvasElement.prototype.getSupportedExtensions = function getSupportedExtensions() {
    return ['ANGLE_instanced_arrays', 'EXT_blend_minmax', 'EXT_color_buffer_half_float', 'EXT_disjoint_timer_query', 'EXT_float_blend', 'EXT_frag_depth', 'EXT_shader_texture_lod', 'EXT_texture_compression_bptc', 'EXT_texture_compression_rgtc', 'EXT_texture_filter_anisotropic', 'EXT_sRGB', 'KHR_parallel_shader_compile', 'OES_element_index_uint', 'OES_fbo_render_mipmap', 'OES_standard_derivatives', 'OES_texture_float', 'OES_texture_float_linear', 'OES_texture_half_float', 'OES_texture_half_float_linear', 'OES_vertex_array_object', 'WEBGL_color_buffer_float', 'WEBGL_compressed_texture_s3tc', 'WEBGL_compressed_texture_s3tc_srgb', 'WEBGL_debug_renderer_info', 'WEBGL_debug_shaders', 'WEBGL_depth_texture', 'WEBGL_draw_buffers', 'WEBGL_lose_context', 'WEBGL_multi_draw']
}


obj_toString(canvas, 'HTMLCanvasElement')
obj_toStringTag(canvas, "HTMLCanvasElement");
Object.setPrototypeOf(canvas, HTMLCanvasElement.prototype);
func_set_native(HTMLCanvasElement);
func_set_native(HTMLCanvasElement.prototype.getContext);
func_set_native(HTMLCanvasElement.prototype.getAttributeNames);
func_set_native(HTMLCanvasElement.prototype.toDataURL);
func_set_native(HTMLCanvasElement.prototype.getSupportedExtensions);


HTMLScriptElement = function HTMLScriptElement() {
    console.log("HTMLScriptElement --->", arguments)
};
script0 = {
    hasAttribute: function hasAttribute() {
        console.log("hasAttribute --->", arguments)
    },
    src: 'https://hm.baidu.com/hm.js?eb739bb878f02b4f7b5352a0f4fea15c'
};
script1 = {
    hasAttribute: function hasAttribute() {
        console.log("hasAttribute --->", arguments)
    },
    src: 'https://dn-growing.qbox.me/vds.js'
};
script2 = {
    hasAttribute: function hasAttribute() {
        console.log("hasAttribute --->", arguments)
    },
    src: ''
};
script3 = {
    hasAttribute: function hasAttribute() {
        console.log("hasAttribute --->", arguments)
    },
    src: 'https://static.zcool.cn/passport4.0/lib/jquery.mousewheel.min.js'
};
script4 = {
    hasAttribute: function hasAttribute() {
        console.log("hasAttribute --->", arguments)
    },
    src: ''
};
script5 = {
    hasAttribute: function hasAttribute() {
        console.log("hasAttribute --->", arguments)
    },
    src: 'https://static.zcool.cn/passport4.0/lib/jquery-1.9.1.min.js?v=v1.1.99'
};
script6 = {
    hasAttribute: function hasAttribute() {
        console.log("hasAttribute --->", arguments)
    },
    src: 'https://static.zcool.cn/passport4.0/lib/jquery.mCustomScrollbar.js?v=v1.1.99'
};
script7 = {
    hasAttribute: function hasAttribute() {
        console.log("hasAttribute --->", arguments)
    },
    src: 'https://static.zcool.cn/passport4.0/script/Verification.js?v=v1.1.99'
};
script8 = {
    hasAttribute: function hasAttribute() {
        console.log("hasAttribute --->", arguments)
    },
    src: 'https://static.zcool.cn/passport/scripts/passport-v1.0.7.js?v=v1.1.99'
};
script9 = {
    hasAttribute: function hasAttribute() {
        console.log("hasAttribute --->", arguments)
    },
    src: ''
};

script = {
    length: 10,
    0: script0,
    1: script1,
    2: script2,
    3: script3,
    4: script4,
    5: script5,
    6: script6,
    7: script7,
    8: script8,
    9: script9,

};
obj_toString(script, 'HTMLScriptElement');
obj_toStringTag(script, "HTMLScriptElement");
Object.setPrototypeOf(script, HTMLScriptElement.prototype);
func_set_native(HTMLScriptElement);

HTMLBodyElement = function HTMLBodyElement() {
    console.log("HTMLBodyElement --->", arguments)
    throw new TypeError("Illegal constructor");
}
;
body = {
    clientWidth: 1920,
    clientHeight: 919
};
obj_toString(body, 'HTMLBodyElement');
body.appendChild = function appendChild() {
    console.log("body.appendChild --->", arguments)
    return arguments[0]
};
func_set_native(body.appendChild);

body.removeChild = function () {
    console.log('body.removeChild --->:', arguments)
},
    obj_toString(body, "HTMLBodyElement");
obj_toStringTag(body, "HTMLBodyElement");
Object.setPrototypeOf(body, HTMLBodyElement.prototype);
func_set_native(HTMLBodyElement);

HTMLCollection = {
    0: body
}
obj_toString(HTMLCollection, 'HTMLCollection');
obj_toStringTag(HTMLCollection, "HTMLCollection");

HTMLHeadElement = function HTMLHeadElement() {
    console.log("HTMLHeadElement --->", arguments)
    throw new TypeError("Illegal constructor");
}
head = {
    tagName: 'HEAD',
    0: `<head>\x3Cscript src="https://hm.baidu.com/hm.js?eb739bb878f02b4f7b5352a0f4fea15c">\x3C/script>\n<title>用户登录-通行证-站酷ZCOOL</title>\n\n\n<meta charset="utf-8">\n<meta name="renderer" content="webkit|ie-comp|ie-stand">\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no">\n<link rel="Bookmark" href="/favicon.ico">\n<link rel="Shortcut Icon" href="/favicon.ico">\n<link href="//static.zcool.cn/passport4.0/css/jquery.mCustomScrollbar.css?v=v1.1.98" rel="stylesheet" type="text/css">\n<link href="//static.zcool.cn/passport4.0/common/css/common.css?v=v1.1.98" rel="stylesheet" type="text/css">\n\n\n  \n    \n    \n    \n    \n    \n    \t<link href="//static.zcool.cn/passport4.0/css/passnumberbind.css?v=v1.1.98" rel="stylesheet" type="text/css">\n    \n\n\n\n<style>\n#nc_1_captcha_input {border: solid 1px #999;}\n\n</style>\n\n\n\x3Cscript type="text/javascript" async="" src="https://dn-growing.qbox.me/vds.js">\x3C/script>\x3Cscript type="text/javascript">\n      var _vds = _vds || [];\n      window._vds = _vds;\n      (function(){\n        _vds.push(['setAccountId', 'bd647439edc1d679']);\n        _vds.push(['trackBot', false]);\n        (function() {\n          var vds = document.createElement('script');\n          vds.type='text/javascript';\n          vds.async = true;\n          vds.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'dn-growing.qbox.me/vds.js';\n          var s = document.getElementsByTagName('script')[0];\n          s.parentNode.insertBefore(vds, s);\n        })();\n      })();\n  \x3C/script>\n\n\n\x3Cscript src="https://static.zcool.cn/passport4.0/lib/jquery.mousewheel.min.js">\x3C/script></head>`
};
obj_toString(head, 'HTMLHeadElement');
Object.setPrototypeOf(head, HTMLHeadElement.prototype);
func_set_native(HTMLHeadElement);


function HTMLUnknownElement() {
    console.log("HTMLUnknownElement --->", arguments)
};func_set_native(HTMLUnknownElement);

HTMLUnknownElement.prototype.style = CSSStyleDeclaration;
span = {
    tagName: 'SPAN',
    offsetWidth: 0,
    offsetHeight: 0
};
Object.setPrototypeOf(span, HTMLUnknownElement.prototype);
obj_toString(span, 'HTMLUnknownElement');
obj_toStringTag(span, "HTMLUnknownElement");
obj_toString(HTMLUnknownElement.prototype.style, 'CSSStyleDeclaration');

HTMLDivElement = function HTMLDivElement() {
    console.log("HTMLDivElement --->", arguments)
};
func_set_native(HTMLDivElement);
div = {
    tagName: 'DIV',
};
func_set_native(HTMLUnknownElement);
div.childNodes = function childNodes() {
    console.log("div.childNodes --->", arguments)
};
func_set_native(div.childNodes);
Object.setPrototypeOf(div, HTMLDivElement.prototype);
obj_toString(div, 'HTMLDivElement');
obj_toStringTag(div, "HTMLDivElement");

////////////////////////////////////////////////////////////////////////////////// window 相关
function Window() {
}

Window = function Window() {
    this.PERSISTENT = 1;
    this.TEMPORARY = 0;
}
Window.prototype.toString = function () {
    return '[object Window]'
}
Window.toString = function () {
    return 'function Window() { [native code] }'
}
Object.defineProperties(Window.prototype, {
    [Symbol.toStringTag]: {
        value: 'Window'
    }
})
window = globalThis;
window["0"] = window;
self = top = window;
window.self = window.top = window;
obj_toString(window, 'Window');
obj_toStringTag(window, "Window");
obj_toStringTag(Window, "Window");
func_set_native(Window);


chrome = {
    autofillPrivate: {
        AddressField: {
            ADDRESS_LEVEL_1: "ADDRESS_LEVEL_1",
            ADDRESS_LEVEL_2: "ADDRESS_LEVEL_2",
            ADDRESS_LEVEL_3: "ADDRESS_LEVEL_3",
            ADDRESS_LINES: "ADDRESS_LINES",
            COMPANY_NAME: "COMPANY_NAME",
            COUNTRY_CODE: "COUNTRY_CODE",
            FULL_NAME: "FULL_NAME",
            HONORIFIC: "HONORIFIC",
            POSTAL_CODE: "POSTAL_CODE",
            SORTING_CODE: "SORTING_CODE"
        },
        getAddressComponents() {
        },
        getAddressComponents() {
        },
        getAddressList() {
        },
        getCountryList() {
        },
        getCreditCardList() {
        },
        getUpiIdList() {
        },
        logServerCardLinkClicked() {
        },
        maskCreditCard() {
        },
        migrateCreditCards() {
        },
        get onPersonalDataChanged() {
            return {
                addListener() {
                    debugger;
                },
                dispatch() {
                    debugger;
                },
                hasListener() {
                    debugger;
                },
                hasListeners() {
                    debugger;
                },
                removeListener() {
                    debugger;
                },
            }
        },
        set onPersonalDataChanged(value) {
        },
        removeEntry() {
        },
        saveAddress() {
        },
        saveCreditCard() {
        },
        setCreditCardFIDOAuthEnabledState() {
        },
        validatePhoneNumbers() {
        }
    },
    csi: function csi() {
    },
    getVariableValue() {
    },
    inputMethodPrivate: {
        AutoCapitalizeType: {
            CHARACTERS: "characters",
            OFF: "off",
            SENTENCES: "sentences",
            WORDS: "words",
        },
        FocusReason: {
            MOUSE: "mouse",
            OTHER: "other",
            PEN: "pen",
            TOUCH: "touch",
        },
        InputContextType: {
            EMAIL: "email",
            NULL: "null",
            NUMBER: "number",
            PASSWORD: "password",
            SEARCH: "search",
            TEL: "tel",
            TEXT: "text",
            URL: "url",
        },
        InputModeType: {
            DECIMAL: "decimal",
            EMAIL: "email",
            NO_KEYBOARD: "noKeyboard",
            NUMERIC: "numeric",
            SEARCH: "search",
            TEL: "tel",
            TEXT: "text",
            URL: "url",
        },
        MenuItemStyle: {
            CHECK: "check",
            RADIO: "radio",
            SEPARATOR: "separator",
        },
        UnderlineStyle: {
            DOUBLE_UNDERLINE: "doubleUnderline",
            NO_UNDERLINE: "noUnderline",
            UNDERLINE: "underline",
        },
        addWordToDictionary() {
        },
        fetchAllDictionaryWords() {
        },
        finishComposingText() {
        },
        getAutocorrectCharacterBounds() {
        },
        getAutocorrectRange() {
        },
        getCompositionBounds() {
        },
        getCurrentInputMethod() {
        },
        getEncryptSyncEnabled() {
        },
        getInputMethodConfig() {
        },
        getInputMethods() {
        },
        getSettings() {
        },
        getSurroundingText() {
        },
        getTextFieldBounds() {
        },
        hideInputView() {
        },
        notifyImeMenuItemActivated() {
        },
        onAutocorrect() {
        },
        get onChanged() {
        },
        set onChanged(value) {
        },
        get onCompositionBoundsChanged() {
        },
        set onCompositionBoundsChanged(value) {
        },
        get onDictionaryChanged() {
        },
        set onDictionaryChanged(value) {
        },
        get onDictionaryLoaded() {
        },
        set onDictionaryLoaded(value) {
        },
        get onFocus() {
        },
        set onFocus(value) {
        },
        get onImeMenuActivationChanged() {
        },
        set onImeMenuActivationChanged(value) {
        },
        get onImeMenuItemsChanged() {
        },
        set onImeMenuItemsChanged(value) {
        },
        get onImeMenuListChanged() {
        },
        set onImeMenuListChanged(value) {
        },
        get onInputMethodOptionsChanged() {
        },
        set onInputMethodOptionsChanged(value) {
        },
        get onScreenProjectionChanged() {
        },
        set onScreenProjectionChanged(value) {
        },
        get onSettingsChanged() {
        },
        set onSettingsChanged(value) {
        },
        get onSuggestionsChanged() {
        },
        set onSuggestionsChanged(value) {
        },
        openOptionsPage() {
        },
        reset() {
        },
        setAutocorrectRange() {
        },
        setComposingRange() {
        },
        setCompositionRange() {
        },
        setCurrentInputMethod() {
        },
        setSelectionRange() {
        },
        setSettings() {
        },
        setXkbLayout() {
        },
        showInputView() {
        },
    },
    languageSettingsPrivate: {
        MoveType: {
            DOWN: "DOWN",
            TOP: "TOP",
            UNKNOWN: "UNKNOWN",
            UP: "UP",
        },
        addInputMethod() {
        },
        addSpellcheckWord() {
        },
        disableLanguage() {
        },
        enableLanguage() {
        },
        getAlwaysTranslateLanguages() {
        },
        getInputMethodLists() {
        },
        getLanguageList() {
        },
        getNeverTranslateLanguages() {
        },
        getSpellcheckDictionaryStatuses() {
        },
        getSpellcheckWords() {
        },
        getTranslateTargetLanguage() {
        },
        moveLanguage() {
        },
        onCustomDictionaryChanged: {
            addListener() {
            },
            dispatch() {
            },
            hasListener() {
            },
            hasListeners() {
            },
            removeListener() {
            }
        },
        get onInputMethodAdded() {
            return {
                addListener() {
                },
                dispatch() {
                },
                hasListener() {
                },
                hasListeners() {
                },
                removeListener() {
                }
            }
        },
        set onInputMethodAdded(value) {
        },
        get onInputMethodRemoved() {
            return {
                addListener() {
                },
                dispatch() {
                },
                hasListener() {
                },
                hasListeners() {
                },
                removeListener() {
                }
            }
        },
        set onInputMethodRemoved(value) {
            debugger
        },
        onSpellcheckDictionariesChanged: {
            addListener() {
            },
            dispatch() {
            },
            hasListener() {
            },
            hasListeners() {
            },
            removeListener() {
            }
        },
        removeInputMethod() {
        },
        removeSpellcheckWord() {
        },
        retryDownloadDictionary() {
        },
        setEnableTranslationForLanguage() {
        },
        setLanguageAlwaysTranslateState() {
        },
        setTranslateTargetLanguage() {
        },

    },
    loadTimes: function loadTimes() {
    },
    management: {
        ExtensionDisabledReason: {
            PERMISSIONS_INCREASE: "permissions_increase",
            UNKNOWN: "unknown",
        },
        ExtensionInstallType: {
            ADMIN: "admin",
            DEVELOPMENT: "development",
            NORMAL: "normal",
            OTHER: "other",
            SIDELOAD: "sideload"
        },
        ExtensionType: {
            EXTENSION: "extension",
            HOSTED_APP: "hosted_app",
            LEGACY_PACKAGED_APP: "legacy_packaged_app",
            LOGIN_SCREEN_EXTENSION: "login_screen_extension",
            PACKAGED_APP: "packaged_app",
            THEME: "theme",
        },
        LaunchType: {
            OPEN_AS_PINNED_TAB: "OPEN_AS_PINNED_TAB",
            OPEN_AS_REGULAR_TAB: "OPEN_AS_REGULAR_TAB",
            OPEN_AS_WINDOW: "OPEN_AS_WINDOW",
            OPEN_FULL_SCREEN: "OPEN_FULL_SCREEN",
        },
        createAppShortcut() {
        },
        generateAppForLink() {
        },
        get() {
        },
        getAll() {
        },
        getPermissionWarningsById() {
        },
        launchApp() {
        },
        get onDisabled() {
            return {
                addListener() {
                },
                dispatch() {
                },
                hasListener() {
                },
                hasListeners() {
                },
                removeListener() {
                }
            }
        },
        set onDisabled(value) {
        },
        get onEnabled() {
            return {
                addListener() {
                },
                dispatch() {
                },
                hasListener() {
                },
                hasListeners() {
                },
                removeListener() {
                }
            }
        },
        set onEnabled(value) {
        },
        get onInstalled() {
            return {
                addListener() {
                },
                dispatch() {
                },
                hasListener() {
                },
                hasListeners() {
                },
                removeListener() {
                }
            }
        },
        set onInstalled(value) {
            debugger
        },
        get onUninstalled() {
            return {
                addListener() {
                },
                dispatch() {
                },
                hasListener() {
                },
                hasListeners() {
                },
                removeListener() {
                }
            }
        },
        set onUninstalled(value) {
            debugger
        },
        setEnabled() {
        },
        setLaunchType() {
        },
        uninstall() {
        }
    },
    metricsPrivate: {
        MetricTypeType: {
            HISTOGRAM_LINEAR: "histogram-linear",
            HISTOGRAM_LOG: "histogram-log"
        },
        getFieldTrial() {
        },
        getHistogram() {
        },
        getVariationParams() {
        },
        recordBoolean() {
        },
        recordCount() {
        },
        recordEnumerationValue() {
        },
        recordLongTime() {
        },
        recordMediumCount() {
        },
        recordMediumTime() {
        },
        recordPercentage() {
        },
        recordSmallCount() {
        },
        recordSparseHashable() {
        },
        recordSparseValue() {
        },
        recordTime() {
        },
        recordUserAction() {
        },
        recordValue() {
        }
    },
    passwordsPrivate: {
        CompromiseType: {
            LEAKED: "LEAKED",
            PHISHED: "PHISHED",
            PHISHED_AND_LEAKED: "PHISHED_AND_LEAKED"
        },
        ExportProgressStatus: {
            FAILED_CANCELLED: "FAILED_CANCELLED",
            FAILED_WRITE_FAILED: "FAILED_WRITE_FAILED",
            IN_PROGRESS: "IN_PROGRESS",
            NOT_STARTED: "NOT_STARTED",
            SUCCEEDED: "SUCCEEDED"
        },
        PasswordCheckState: {
            CANCELED: "CANCELED",
            IDLE: "IDLE",
            NO_PASSWORDS: "NO_PASSWORDS",
            OFFLINE: "OFFLINE",
            OTHER_ERROR: "OTHER_ERROR",
            QUOTA_LIMIT: "QUOTA_LIMIT",
            RUNNING: "RUNNING",
            SIGNED_OUT: "SIGNED_OUT"
        },
        PlaintextReason: {
            COPY: "COPY",
            EDIT: "EDIT",
            VIEW: "VIEW"
        },
        addPassword() {
        },
        cancelExportPasswords() {
        },
        changeInsecureCredential() {
        },
        changeSavedPassword() {
        },
        exportPasswords() {
        },
        getCompromisedCredentials() {
        },
        getPasswordCheckStatus() {
        },
        getPasswordExceptionList() {
        },
        getPlaintextInsecurePassword() {
        },
        getSavedPasswordList() {
        },
        getUrlCollection() {
        },
        getWeakCredentials() {
        },
        importPasswords() {
        },
        isAccountStoreDefault() {
        },
        isOptedInForAccountStorage() {
        },
        movePasswordsToAccount() {
        },
        get onAccountStorageOptInStateChanged() {
            return {
                addListener() {
                },
                dispatch() {
                },
                hasListener() {
                },
                hasListeners() {
                },
                removeListener() {
                }
            }
        },
        set onAccountStorageOptInStateChanged(value) {
            debugger
        },
        onCompromisedCredentialsChanged: {
            addListener() {
            },
            dispatch() {
            },
            hasListener() {
            },
            hasListeners() {
            },
            removeListener() {
            }
        },
        get onPasswordExceptionsListChanged() {
            return {
                addListener() {
                },
                dispatch() {
                },
                hasListener() {
                },
                hasListeners() {
                },
                removeListener() {
                }
            }
        },
        set onPasswordExceptionsListChanged(value) {
            debugger
        },
        get onPasswordsFileExportProgress() {
            return {
                addListener() {
                },
                dispatch() {
                },
                hasListener() {
                },
                hasListeners() {
                },
                removeListener() {
                }
            }
        },
        set onPasswordsFileExportProgress(value) {
            debugger
        },
        get onSavedPasswordsListChanged() {
            return {
                addListener() {
                },
                dispatch() {
                },
                hasListener() {
                },
                hasListeners() {
                },
                removeListener() {
                }
            }
        },
        set onSavedPasswordsListChanged(value) {
            debugger
        },
        onWeakCredentialsChanged: {
            addListener() {
            },
            dispatch() {
            },
            hasListener() {
            },
            hasListeners() {
            },
            removeListener() {
            }
        },
        optInForAccountStorage() {
        },
        recordPasswordsPageAccessInSettings() {
        },
        removeInsecureCredential() {
        },
        removePasswordException() {
        },
        removePasswordExceptions() {
        },
        removeSavedPassword() {
        },
        removeSavedPasswords() {
        },
        requestExportProgressStatus() {
        },
        requestPlaintextPassword() {
        },
        startPasswordCheck() {
        },
        stopPasswordCheck() {
        },
        undoRemoveSavedPasswordOrException() {
        }
    },
    runtime: {
        OnInstalledReason: {
            CHROME_UPDATE: "chrome_update",
            INSTALL: "install",
            SHARED_MODULE_UPDATE: "shared_module_update",
            UPDATE: "update"
        },
        OnRestartRequiredReason: {
            APP_UPDATE: "app_update",
            OS_UPDATE: "os_update",
            PERIODIC: "periodic"
        },
        PlatformArch: {
            ARM: "arm",
            ARM64: "arm64",
            MIPS: "mips",
            MIPS64: "mips64",
            X86_32: "x86-32",
            X86_64: "x86-64"
        },
        PlatformNaclArch: {
            ARM: "arm",
            MIPS: "mips",
            MIPS64: "mips64",
            X86_32: "x86-32",
            X86_64: "x86-64"
        },
        PlatformOs: {
            ANDROID: "android",
            CROS: "cros",
            LINUX: "linux",
            MAC: "mac",
            OPENBSD: "openbsd",
            WIN: "win"
        },
        RequestUpdateCheckStatus: {
            NO_UPDATE: "no_update",
            THROTTLED: "throttled",
            UPDATE_AVAILABLE: "update_available"
        },
        get id() {
            return undefined;
        },
        set id(value) {
        }
    },
    send() {
    },
    settingsPrivate: {
        ControlledBy: {
            CHILD_RESTRICTION: "CHILD_RESTRICTION",
            DEVICE_POLICY: "DEVICE_POLICY",
            EXTENSION: "EXTENSION",
            OWNER: "OWNER",
            PARENT: "PARENT",
            PRIMARY_USER: "PRIMARY_USER",
            USER_POLICY: "USER_POLICY"
        },
        Enforcement: {
            ENFORCED: "ENFORCED",
            PARENT_SUPERVISED: "PARENT_SUPERVISED",
            RECOMMENDED: "RECOMMENDED"
        },
        PrefType: {
            BOOLEAN: "BOOLEAN",
            DICTIONARY: "DICTIONARY",
            LIST: "LIST",
            NUMBER: "NUMBER",
            STRING: "STRING",
            URL: "URL"
        },
        getAllPrefs() {
        },
        getDefaultZoom() {
        },
        getPref() {
        },
        onPrefsChanged: {
            addListener() {
            },
            dispatch() {
            },
            hasListener() {
            },
            hasListeners() {
            },
            removeListener() {
            }
        },
        setDefaultZoom() {
        },
        setPref() {
        }
    }
};
Element = function Element() {
    console.log("Element  --->", arguments)
};
Image = function Image() {
    console.log("Image  --->", arguments)
};
DOMTokenList = function DOMTokenList() {
    console.log("DOMTokenList  --->", arguments)
}
origin = 'https://passport.zcool.com.cn';
screenLeft = 0;
screenTop = 0;
innerHeight = 919;
outerWidth = 1920;
innerWidth = 1920;
outerHeight = 1040;

webkitRTCPeerConnection = function webkitRTCPeerConnection() {
    console.log("webkitRTCPeerConnection  --->", arguments)
}
PerformanceTiming = function PerformanceTiming() {
    console.log("PerformanceTiming  --->", arguments)
}
HTMLMediaElement = function HTMLMediaElement() {
    console.log("PerformanceTiming  --->", arguments)
}
MediaStreamTrack = function MediaStreamTrack() {
    console.log("MediaStreamTrack  --->", arguments)
}
PointerEvent = function PointerEvent() {
    console.log("PointerEvent  --->", arguments)
}
OfflineAudioContext = function OfflineAudioContext() {
    console.log("OfflineAudioContext  --->", arguments)
}
removeEventListener = function removeEventListener() {
    console.log("removeEventListener  --->", arguments)
}
DeviceMotionEvent = function DeviceMotionEvent() {
    console.log("DeviceMotionEvent  --->", arguments)
}
addEventListener = function addEventListener() {
    console.log("addEventListener  --->", arguments)
}
Bluetooth = function Bluetooth() {
    console.log("Bluetooth  --->", arguments)
}
BluetoothDevice = function BluetoothDevice() {
    console.log("BluetoothDevice  --->", arguments)
}
BluetoothUUID = function BluetoothUUID() {
    console.log("BluetoothUUID  --->", arguments)
}
func_set_native(Element);
func_set_native(Image);
func_set_native(webkitRTCPeerConnection);
func_set_native(DOMTokenList);
func_set_native(PerformanceTiming);
func_set_native(HTMLMediaElement);
func_set_native(MediaStreamTrack);
func_set_native(PointerEvent);
func_set_native(OfflineAudioContext);
func_set_native(removeEventListener);
func_set_native(DeviceMotionEvent);
func_set_native(addEventListener);
func_set_native(Bluetooth);
func_set_native(BluetoothDevice);

////////////////////////////////////////////////////////////////////////////////// navigator 相关
function Navigator() {
    throw new TypeError("Illegal constructor");
}

Navigator.prototype.platform = 'Win32';
Navigator.prototype.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
Navigator.prototype.getBattery = function getBattery() {
    console.log("getBattery--->", arguments);
    {
        if (!Navigator.prototype.isPrototypeOf(this)) {
            throw new TypeError("Illegal constructor");
        }
        ;
        return new Promise((resolve, reject) => {
            resolve({
                charging: true,
                chargingTime: Infinity,
                dischargingTime: Infinity,
                level: 1,
                onchargingchange: null,
                onchargingtimechange: null,
                ondischargingtimechange: null,
                onlevelchange: null

            })
        })
    }
};
func_set_native(Navigator.prototype.getBattery);
Navigator.prototype.requestMIDIAccess = function requestMIDIAccess() {
    console.log("Navigator.prototype.requestMIDIAccess", arguments)
    {
        if (!Navigator.prototype.isPrototypeOf(this)) {
            throw new TypeError("Illegal constructor");
        }
        ;
        return new Promise((resolve, reject) => {
            resolve({
                charging: true,
                chargingTime: Infinity,
                dischargingTime: Infinity,
                level: 1,
                onchargingchange: null,
                onchargingtimechange: null,
                ondischargingtimechange: null,
                onlevelchange: null

            })
        })
    }
}
Navigator.prototype.mimeTypes = {
    0: {
        type: 'application/pdf',
        suffixes: 'pdf',
        description: 'Portable Document Format',
        enabledPlugin: this.mimeTypes
    },
    1: {type: 'text/pdf', suffixes: 'pdf', description: 'Portable Document Format', enabledPlugin: this.mimeTypes},
    'application/pdf': {
        type: 'application/pdf',
        suffixes: 'pdf',
        description: 'Portable Document Format',
        enabledPlugin: this.mimeTypes
    },
    'text/pdf': {
        type: 'text/pdf',
        suffixes: 'pdf',
        description: 'Portable Document Format',
        enabledPlugin: this.mimeTypes
    },
    length: 2
}

MimeType = {
    toString: function toString() {
        return '[object MimeType]'
    },
    type: 'text/pdf'
}
Plugin0 = {
    length: 0,
    name: 'PDF Viewer',
    filename: 'PDF Viewer',
    item: function item() {
        console.log("plugins1-->item--->", arguments)
        return MimeType
    }
};

Plugin1 = {
    length: 2,
    name: 'PDF Viewer',
    filename: 'PDF Viewer',
    item: function item() {
        console.log("plugins1-->item--->", arguments)
        return MimeType
    },
    toString: function toString() {
        return '[object Plugin]'
    }
};
Plugin2 = {
    length: 2,
    name: 'Chrome PDF Viewer',
    filename: 'Chrome PDF Viewer',
    item: function item() {
        console.log("plugins2-->item--->", arguments)
        return MimeType
    },
    toString: function toString() {
        return '[object Plugin]'
    }
};
Plugin3 = {
    length: 2,
    name: 'Chromium PDF Viewer',
    filename: 'Chromium PDF Viewer',
    item: function item() {
        console.log("plugins3-->item--->", arguments)
        return MimeType
    },
    toString: function toString() {
        return '[object Plugin]'
    }
};
Plugin4 = {
    length: 2,
    name: 'Microsoft Edge PDF Viewer',
    filename: 'Microsoft Edge PDF Viewer',
    item: function item() {
        console.log("plugins4-->item--->", arguments)
        return MimeType
    },
    toString: function toString() {
        return '[object Plugin]'
    }
};
Plugin5 = {
    length: 2,
    name: 'WebKit built-in PDF',
    item: function item() {
        console.log("plugins5-->item--->", arguments)
        return MimeType
    },
    filename: 'WebKit built-in PDF',
    toString: function toString() {
        return '[object Plugin]'
    }
};
navigator = {};

plugins = {
    length: 5,
    0: Plugin0,
    1: Plugin1,
    2: Plugin2,
    3: Plugin3,
    4: Plugin4,
    5: Plugin5,
};
Navigator.prototype.plugins = plugins;
window.clientInformation = navigator;
obj_toString(navigator, 'Navigator');
obj_toStringTag(navigator, "Navigator");
obj_toString(plugins, 'PluginArray');
obj_toString(plugins, 'PluginArray');
Object.setPrototypeOf(navigator, Navigator.prototype);
func_set_native(Navigator);
func_set_native(Navigator.prototype.requestMIDIAccess);
func_set_native(Navigator.prototype.getBattery);


////////////////////////////////////////////////////////////////////////////////// location 相关
function Location() {

}

location = {};
location.protocol = 'https:';
location.href = 'https://passport.zcool.com.cn/loginApp.do?appId=1006&cback=https%3A%2F%2Fwww.zcool.com.cn%2F';
obj_toString(location, 'Location');
obj_toStringTag(location, "Location");
Object.setPrototypeOf(location, Location.prototype);
func_set_native(Location);

////////////////////////////////////////////////////////////////////////////////// document 相关

Document = function Document() {
};
HTMLDocument = function HTMLDocument() {
}
window.HTMLDocument = HTMLDocument;

document = {};
HTMLDocument.prototype.currentScript = null;
HTMLDocument.prototype.hidden = true;
HTMLDocument.prototype.wasDiscarded = false;
HTMLDocument.prototype.visibilityState = 'hidden';
HTMLDocument.prototype.referrer = 'https://www.zcool.com.cn/';
HTMLDocument.prototype.readyState = 'complete';
HTMLDocument.prototype.body = body
HTMLDocument.prototype.head = head

HTMLDocument.prototype.createElement = function createElement() {
    console.log("document.createElement  --->", arguments)
    let args1 = arguments[0]
    if (args1 === 'canvas') {
        return canvas
    } else if (args1 === 'script') {
        return script
    } else if (args1 === 'span') {
        return span
    } else if (args1 === 'div') {
        return div
    }
};

HTMLDocument.prototype.getElementsByTagName = function getElementsByTagName() {
    console.log("document.getElementsByTagName  --->", arguments)
    let args1 = arguments[0]
    if (args1 === 'body') {
        return HTMLCollection
    } else if (args1 === 'head') {
        return head
    } else if (args1 === "script") {
        return script
    }

};
func_set_native(HTMLDocument.prototype.getElementsByTagName);
HTMLDocument.prototype.addEventListener = function addEventListener() {
    console.log("document.addEventListener  --->", arguments)
}
HTMLDocument.prototype.hasFocus = function hasFocus() {
    console.log("document.hasFocus  --->", arguments)
}
HTMLDocument.prototype.querySelector = function querySelector() {
    console.log("document.querySelector  --->", arguments)
}
HTMLDocument.prototype.documentElement = function documentElement() {
    console.log("document.documentElement  --->", arguments)
}
HTMLDocument.prototype.hasFocus = function hasFocus() {
    console.log("document.hasFocus  --->", arguments)
    if (JSON.stringify([]) === JSON.stringify(arguments)) {
    }
    return false

}
HTMLDocument.prototype.getElementById = function getElementById() {
    console.log("document.getElementById  --->", arguments)
}










obj_toString(document, 'HTMLDocument');
obj_toStringTag(document, "HTMLDocument");
Object.setPrototypeOf(document, HTMLDocument.prototype);
Object.setPrototypeOf(HTMLDocument.prototype, Document.prototype);
func_set_native(Document);
func_set_native(HTMLDocument);
func_set_native(HTMLDocument.prototype.createElement);
func_set_native(HTMLDocument.prototype.getElementsByTagName);
func_set_native(HTMLDocument.prototype.addEventListener);
func_set_native(HTMLDocument.prototype.hasFocus);
func_set_native(HTMLDocument.prototype.querySelector);
func_set_native(HTMLDocument.prototype.documentElement);
func_set_native(HTMLDocument.prototype.getElementById);
func_set_native(HTMLDocument.prototype.hasFocus);

////////////////////////////////////////////////////////////////////////////////// screen 相关
function Screen() {
    console.log("Screen  --->", arguments)
}

ScreenOrientation = function ScreenOrientation() {
    this.angle = 0;
    this.type = 'landscape-primary';
    this.onchange = null
};
func_set_native(ScreenOrientation);

screen = {
    availHeight: 1040,
    availLeft: 0,
    availTop: 0,
    availWidth: 1920,
    colorDepth: 24,
    height: 1080,
    isExtended: false,
    onchange: null,
    orientation: new ScreenOrientation(),
    pixelDepth: 24,
    width: 1920,
};
obj_toString(screen, 'Screen');
obj_toStringTag(screen, "Screen");
Object.setPrototypeOf(screen, Screen.prototype);
func_set_native(Screen);





////////////////////////////////////////////////////////////////////////////////// localStorage  相关








Object.prototype.hasOwnProperty_ = Object.prototype.hasOwnProperty;
Object.prototype.hasOwnProperty = function (argus2) {
    // return false
    if (argus2 === 'species') {
        return true
    } else if (argus2 === 'Reflect') {
        return true
    } else if (argus2 === 'clear') {
        return false
    } else if (argus2 === 'toPrimitive') {
        return true
    } else if (argus2 === 'replace') {
        return false
    } else if (argus2 === 'hasInstance') {
        return true
    } else if (argus2 === 'isSecureContext') {
        return true
    } else if (argus2 === 'origin') {
        return true
    } else if (argus2 === 'secureConnectionStart') {
        return true
    } else if (argus2 === 'showModalDialog') {
        return false
    } else if (argus2 === 'getSelection') {
        return false
    } else if (argus2 === 'mozAutoplayEnabled') {
        return false
    } else if (argus2 === 'Touch') {
        return true
    } else if (argus2 === 'Proxy') {
        return true
    } else if (argus2 === 'close') {
        return false
    } else if (argus2 === 'match') {
        return true
    } else if (argus2 === 'values') {
        return true
    } else if (argus2 === 'getCoalescedEvents') {
        return true
    } else if (argus2 === 'BudgetService') {
        return false
    } else if (argus2 === 'PluralRules') {
        return true
    } else if (argus2 === 'getMatchedCSSRules') {
        return false
    } else if (argus2 === 'PerformanceServerTiming') {
        return true
    } else if (argus2 === 'BigInt') {
        return true
    } else if (argus2 === 'OffscreenCanvas') {
        return true
    } else if (argus2 === 'globalThis') {
        return true
    } else if (argus2 === 'fromEntries') {
        return false
    } else if (argus2 === 'getCapabilities') {
        return true
    } else if (argus2 === 'ListFormat') {
        return true
    } else if (argus2 === 'Locale') {
        return true
    } else if (argus2 === 'allSettled') {
        return true
    } else if (argus2 === 'FormDataEvent') {
        return true
    }
    console.log(argus2);
    debugger;
}


//////////////////////////////////////////////////////////////////////////////////
// window = proxy(window, "window");
// self = proxy(self, "self");
// top = proxy(top, "top");
// navigator = proxy(navigator, "navigator");
// location = proxy(location, "location");
// document = proxy(document, "document");
// chrome = proxy(chrome, "chrome");
// canvas = proxy(canvas, "canvas");
// script = proxy(script, "script")
// body = proxy(body, "body");
// head = proxy(head, "head");
// span = proxy(span, "span");
// div = proxy(div, "div");
// Plugin0 = proxy(Plugin0, "Plugin0");
// Plugin1 = proxy(Plugin1, "Plugin1");
// Plugin2 = proxy(Plugin2, "Plugin2");
// Plugin3 = proxy(Plugin3, "Plugin3");
// Plugin4 = proxy(Plugin4, "Plugin4");
// Plugin5 = proxy(Plugin5, "Plugin5");
// WebGLRenderingContext = proxy(WebGLRenderingContext, "WebGLRenderingContext");
// WebGLDebugRendererInfo = proxy(WebGLDebugRendererInfo, "WebGLDebugRendererInfo");
// HTMLUnknownElement = proxy(HTMLUnknownElement, "HTMLUnknownElement");
// CSSStyleDeclaration = proxy(CSSStyleDeclaration, "CSSStyleDeclaration");
// HTMLCollection = proxy(HTMLCollection, "HTMLCollection");
// plugins = proxy(plugins, "plugins");
// CanvasRenderingContext2D = proxy(CanvasRenderingContext2D, "CanvasRenderingContex t2D");

Object.freeze(screen);
Object.freeze(document);
Object.freeze(navigator);
Object.freeze(location);
func_set_native(Object.freeze);


_keys = Object.keys;
Object.keys = function (obj) {
    debugger;
    if (obj === document) {
        return ['location']
    }
    if (obj === HTMLDocument.prototype || obj === document.__proto__) {
        return []
    }
    if (obj === Document.prototype || obj === document.__proto__.__proto__) {
        return ["implementation", "URL", "documentURI", "compatMode", "characterSet", "charset", "inputEncoding", "contentType", "doctype", "documentElement", "xmlEncoding", "xmlVersion", "xmlStandalone", "domain", "referrer", "cookie", "lastModified", "readyState", "title", "dir", "body", "head", "images", "embeds", "plugins", "links", "forms", "scripts", "currentScript", "defaultView", "designMode", "onreadystatechange", "anchors", "applets", "fgColor", "linkColor", "vlinkColor", "alinkColor", "bgColor", "all", "scrollingElement", "onpointerlockchange", "onpointerlockerror", "hidden", "visibilityState", "wasDiscarded", "prerendering", "featurePolicy", "webkitVisibilityState", "webkitHidden", "onbeforecopy", "onbeforecut", "onbeforepaste", "onfreeze", "onprerenderingchange", "onresume", "onsearch", "onvisibilitychange", "timeline", "fullscreenEnabled", "fullscreen", "onfullscreenchange", "onfullscreenerror", "webkitIsFullScreen", "webkitCurrentFullScreenElement", "webkitFullscreenEnabled", "webkitFullscreenElement", "onwebkitfullscreenchange", "onwebkitfullscreenerror", "rootElement", "pictureInPictureEnabled", "onbeforexrselect", "onabort", "onbeforeinput", "onbeforematch", "onbeforetoggle", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange", "onclick", "onclose", "oncontentvisibilityautostatechange", "oncontextlost", "oncontextmenu", "oncontextrestored", "oncuechange", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "onformdata", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause", "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize", "onscroll", "onsecuritypolicyviolation", "onseeked", "onseeking", "onselect", "onslotchange", "onstalled", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange", "onwaiting", "onwebkitanimationend", "onwebkitanimationiteration", "onwebkitanimationstart", "onwebkittransitionend", "onwheel", "onauxclick", "ongotpointercapture", "onlostpointercapture", "onpointerdown", "onpointermove", "onpointerrawupdate", "onpointerup", "onpointercancel", "onpointerover", "onpointerout", "onpointerenter", "onpointerleave", "onselectstart", "onselectionchange", "onanimationend", "onanimationiteration", "onanimationstart", "ontransitionrun", "ontransitionstart", "ontransitionend", "ontransitioncancel", "oncopy", "oncut", "onpaste", "children", "firstElementChild", "lastElementChild", "childElementCount", "activeElement", "styleSheets", "pointerLockElement", "fullscreenElement", "adoptedStyleSheets", "pictureInPictureElement", "fonts", "adoptNode", "append", "captureEvents", "caretRangeFromPoint", "clear", "close", "createAttribute", "createAttributeNS", "createCDATASection", "createComment", "createDocumentFragment", "createElement", "createElementNS", "createEvent", "createExpression", "createNSResolver", "createNodeIterator", "createProcessingInstruction", "createRange", "createTextNode", "createTreeWalker", "elementFromPoint", "elementsFromPoint", "evaluate", "execCommand", "exitFullscreen", "exitPictureInPicture", "exitPointerLock", "getAnimations", "getElementById", "getElementsByClassName", "getElementsByName", "getElementsByTagName", "getElementsByTagNameNS", "getSelection", "hasFocus", "hasStorageAccess", "hasUnpartitionedCookieAccess", "importNode", "open", "prepend", "queryCommandEnabled", "queryCommandIndeterm", "queryCommandState", "queryCommandSupported", "queryCommandValue", "querySelector", "querySelectorAll", "releaseEvents", "replaceChildren", "requestStorageAccess", "requestStorageAccessFor", "startViewTransition", "webkitCancelFullScreen", "webkitExitFullscreen", "write", "writeln", "fragmentDirective", "browsingTopics", "hasPrivateToken", "hasRedemptionRecord", "onscrollend"];
    }
    if (obj === Node.prototype || obj === document.__proto__.__proto__.__proto__) {
        return ["nodeType", "nodeName", "baseURI", "isConnected", "ownerDocument", "parentNode", "parentElement", "childNodes", "firstChild", "lastChild", "previousSibling", "nextSibling", "nodeValue", "textContent", "ELEMENT_NODE", "ATTRIBUTE_NODE", "TEXT_NODE", "CDATA_SECTION_NODE", "ENTITY_REFERENCE_NODE", "ENTITY_NODE", "PROCESSING_INSTRUCTION_NODE", "COMMENT_NODE", "DOCUMENT_NODE", "DOCUMENT_TYPE_NODE", "DOCUMENT_FRAGMENT_NODE", "NOTATION_NODE", "DOCUMENT_POSITION_DISCONNECTED", "DOCUMENT_POSITION_PRECEDING", "DOCUMENT_POSITION_FOLLOWING", "DOCUMENT_POSITION_CONTAINS", "DOCUMENT_POSITION_CONTAINED_BY", "DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC", "appendChild", "cloneNode", "compareDocumentPosition", "contains", "getRootNode", "hasChildNodes", "insertBefore", "isDefaultNamespace", "isEqualNode", "isSameNode", "lookupNamespaceURI", "lookupPrefix", "normalize", "removeChild", "replaceChild"];
    }
    if (obj === EventTarget.prototype || obj === document.__proto__.__proto__.__proto__.__proto__) {
        return ["addEventListener", "dispatchEvent", "removeEventListener"];
    }
    if (obj === HTMLImageElement.prototype) {
        return ["alt", "src", "srcset", "sizes", "crossOrigin", "useMap", "isMap", "width", "height", "naturalWidth", "naturalHeight", "complete", "currentSrc", "referrerPolicy", "decoding", "fetchPriority", "loading", "name", "lowsrc", "align", "hspace", "vspace", "longDesc", "border", "x", "y", "decode", "attributionSrc", "sharedStorageWritable"];
    }

    // console.log(arguments);
    return _keys.apply(this, arguments)
};
func_set_native(Object.keys)
_getOwnPropertyNames = Object.getOwnPropertyNames;
Object.getOwnPropertyNames = function (obj) {
    if (obj == navigator) {
        return []
    } else
        // console.log(arguments);
        return _getOwnPropertyNames.apply(this, arguments)
};
func_set_native(Object.getOwnPropertyNames)
_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
Object.getOwnPropertyDescriptor = function (target, property) {
    debugger;
    if (target == navigator) {
        return undefined
    } else if (property === 'head') {
        // return _getOwnPropertyDescriptor.apply(Document, arguments)
        return {
            "enumerable": true,
            "configurable": true
        }
    }

    // console.log(arguments)
    return _getOwnPropertyDescriptor.apply(this, arguments)
};
func_set_native(Object.getOwnPropertyDescriptor)
RegExp = new Proxy(RegExp, {
    construct(target, argArray) {
        debugger;
        if (argArray[0] && argArray[0].indexOf('vm') !== -1) {

            return new target(...['bootstrapNodeJSCoretryModuleLoadevalmachinerunInContext', 'g'])
        }
        return new target(...argArray)
    }
});
;
top = self = window;
window["0"] = window;
top.window = window;
self.window = window;
top.self = window;
self.top = window;
window.top = window;
window.self = window;

Object.defineProperty(window, "top", {
    configurable:false,
    enumerable: true,
    set: undefined,
    get: function top(){
        return window
    }
})
Object.defineProperty(window, "self", {
    configurable:false,
    enumerable: true,
    set: undefined,
    get: function self(){
        return window
    }
})

require_('./源码');



process_.exit(0); // 正常退出
// --inspect-brk
