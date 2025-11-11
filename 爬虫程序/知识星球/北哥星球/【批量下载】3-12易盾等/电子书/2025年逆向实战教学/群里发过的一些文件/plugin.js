window = global;

function MimeType(_this, _type){
    this["type"] = _type,
    this["suffixes"] = "pdf"
    this["description"] = "Portable Document Format"
    this["enabledPlugin"] = _this
}
fun_to_native(MimeType)

function Plugin(){}
Object.defineProperty(Plugin.prototype, "name", {
    get: function(){
        return this.id
    },
    enumerable: true,
    configurable: true,
})
Object.defineProperty(Plugin.prototype, "filename", {
    value:"internal-pdf-viewer",
    writable:true,
    enumerable: true,
    configurable: true,
})
Object.defineProperty(Plugin.prototype, "description", {
    value:"Portable Document Format",
    writable:true,
    enumerable: true,
    configurable: true,
})
Object.defineProperty(Plugin.prototype, "length", {
    value:2,
    writable:true,
    enumerable: true,
    configurable: true,
})
Object.defineProperty(Plugin.prototype, "item", {
    value:function(){
        debugger
    },
    writable:true,
    enumerable: true,
    configurable: true,
})
Object.defineProperty(Plugin.prototype, "namedItem", {
    value:function(){
        debugger
    },
    writable:true,
    enumerable: true,
    configurable: true,
})
Plugin = new Proxy(Plugin, {
    construct: function(target, args){
        let obj = {}
        Object.defineProperty(obj, "0", {
            get: function(){
                return new MimeType(this, 'application/pdf')
            },
            enumerable: true,
            configurable: true,
        })
        Object.defineProperty(obj, "1", {
            get: function(){
                return new MimeType(this, 'text/pdf')
            },
            enumerable: true,
            configurable: true,
        })
        if (args[0] == 0){
            Object.defineProperty(obj, "id", {
                value:"PDF Viewer",
                writable:false,
                enumerable: false,
                configurable: false,
            })
        }
        if (args[0] == 1){
            Object.defineProperty(obj, "id", {
                value:"Chrome PDF Viewer",
                writable:false,
                enumerable: false,
                configurable: false,
            })
        }
        if (args[0] == 2){
            Object.defineProperty(obj, "id", {
                value:"Chromium PDF Viewer",
                writable:false,
                enumerable: false,
                configurable: false,
            })
        }
        if (args[0] == 3){
            Object.defineProperty(obj, "id", {
                value:"Microsoft Edge PDF Viewer",
                writable:false,
                enumerable: false,
                configurable: false,
            })
        }
        if (args[0] == 4){
            Object.defineProperty(obj, "id", {
                value:"WebKit built-in PDF",
                writable:false,
                enumerable: false,
                configurable: false,
            })
        }
        Object.defineProperty(obj, "application/pdf", {
            get: function(){
                return new MimeType(this, 'application/pdf')
            },
            enumerable: false,
            configurable: false,
        })
        Object.defineProperty(obj, "text/pdf", {
            get: function(){
                return new MimeType(this, 'text/pdf')
            },
            enumerable: false,
            configurable: false,
        })
        obj.__proto__ = Plugin.prototype
        return obj
    }
})
fun_to_native(Plugin)

PluginArray=function PluginArray(){
    if (new.target) {
    throw new TypeError('Illegal constructor');
  } else {

  }
}  //不能new
Object.defineProperty(PluginArray.prototype, Symbol.toStringTag, {
    value: 'PluginArray',
    writable: false, // 可选，设置为不可写
    enumerable: false,
    configurable: true,
});

function namedItem(){
    if (new.target) {
    throw new TypeError('Illegal constructor');
  } else {

  }
}  //不能new
fun_to_native(namedItem)
Object.defineProperty(namedItem.prototype, 'name', {
    value: "namedItem",
    writable: false, // 可选，设置为不可写
    enumerable: false,
    configurable: true,
});
Object.defineProperty(PluginArray.prototype, 'namedItem', {
    value: namedItem,
    writable: false, // 可选，设置为不可写
    enumerable: false,
    configurable: true,
});

function item(){
    if (new.target) {
    throw new TypeError('Illegal constructor');
  } else {

  }
}  //不能new
fun_to_native(item)
Object.defineProperty(item.prototype, 'name', {
    value: "item",
    writable: false, // 可选，设置为不可写
    enumerable: false,
    configurable: true,
});
Object.defineProperty(PluginArray.prototype, 'item', {
    value: item,
    writable: false, // 可选，设置为不可写
    enumerable: false,
    configurable: true,
});
function refresh(){
    if (new.target) {
    throw new TypeError('Illegal constructor');
  } else {

  }
}  //不能new
fun_to_native(refresh)
Object.defineProperty(refresh.prototype, 'name', {
    value: "refresh",
    writable: false, // 可选，设置为不可写
    enumerable: false,
    configurable: true,
});
Object.defineProperty(PluginArray.prototype, 'refresh', {
    value: refresh,
    writable: false, // 可选，设置为不可写
    enumerable: false,
    configurable: true,
});
fun_to_native(PluginArray)

plugins = {}
plugins["0"] = new Plugin(0);
plugins["1"] = new Plugin(1);
plugins["2"] = new Plugin(2);
plugins["3"] = new Plugin(3);
plugins["4"] = new Plugin(4);
plugins.length = 5;
plugins.__proto__=PluginArray.prototype



navigator = {
    plugins:plugins
};