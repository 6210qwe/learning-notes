// js 如果我们要补dom的话 得先知道 dom每个方法操作了什么 详细去插mdm https://developer.mozilla.org/

// 元素节点的创建方法 一些公共属性 个别节点的属性会有差异需要另外考虑 例如iframe video等等
DOM_ELENT_NODE = function DOM_ELENT_NODE(tagName, isConnected = false) {
    // 基础属性
    this.tagName = tagName.toLocaleUpperCase();
    this.nodeName = tagName.toLocaleUpperCase();
    this.nodeType = 1; // 1 表示元素节点
    this.nodeValue = null; // 元素节点的 nodeValue 固定为 null

    // 内容属性
    this.textContent_ = "";  // 将文本解析为文本节点  不含标签 &lt;strong&gt;文本内容&lt;/strong&gt;
    this.innerHTML_ = ""; //子节点下的标签例如: <div></div>
    this.outerHTML_ = "<" + tagName + ">" + "</" + tagName + ">"; //'<body><div></div></body>' # 当前节点含子节点下的文件内容
    this.innerText_ = ""; //子节点下的节点文本 例如: "" //输出含标签的节点内容 '<strong>文本内容</strong>'

    // 标识属性
    this.id_ = "";
    this.className_ = "";
    this.title_ = "";
    this.src_ = "";
    this.lang = "";
    this.dir = ""; // 文本方向 (ltr/rtl)
    this.hidden = false;
    this.tabIndex = -1; // tab 键访问顺序
    this.accessKey = ""; // 快捷键
    this.contentEditable = "inherit"; // 是否可编辑

    // 结构关系
    this.parentNode_ = null;  // 总是返回父节点，无论它是什么类型的节点（元素节点、文本节点、文档节点等）。
    this.parentElement_ = null; // 只返回父元素节点，如果父节点不是元素节点（如文本节点、文档节点等），则返回 null
    this.childNodes_ = []; // 所有子节点
    this.children_ = []; // 仅包含元素子节点（nodeType=1） 未完善
    this.previousSibling_ = null; //返回同级的前一个节点
    this.nextSibling_ = null;  //返回同级的后一个节点
    this.firstChild_ = null; // 自动指向 childNodes[0]
    this.lastChild_ = null;  // 自动指向 childNodes 最后一个元素
    this.ownerDocument = document; // 所属文档对象

    // 属性集合
    this.attributes_ = []; // 存储 { name: "attrName", value: "attrValue" } 格式的对象
    this.dataset = {};    // 存储 data-* 属性
    this.style_ = {};
    this.classList_ = [];

    this.childElementCount_ = 0;
    // 状态标志
    this._isRendering = false; //用于标识节点是否正在进行渲染，避免`outetHTML`的递归渲染
    this.isConnected = isConnected; // 是否已挂载到 DOM 树

    // 其他扩展属性
    this.namespaceURI = "http://www.w3.org/1999/xhtml"; // HTML 默认命名空间
    this.draggable = false; //是否可被拖拽


    // hook 读取设置会先经过此方法
    Object.defineProperty(this, "parentNode", {
        // 取值 赋值时会默认先经过此方法
        get: function () {
            return this.parentNode_
        },
        set: function (value) {
            debugger;
        }
    });
    Object.defineProperty(this, "childNodes", {
        // 取值 赋值时会默认先经过此方法
        get: function () {
            return this.childNodes_
        },
        set: function (value) {
            debugger;
        }

    });

};


// 创建元素节点 即标签元素
Document = function Document() {
}
Document.prototype.createElement = function createElement(tag_name) {
    if (tag_name === "div") {
        // let dom_name = new DOM_ELENT_NODE(tag_name)
        // 赋值原型...等操作toString保护
    }
    let dom_name = new DOM_ELENT_NODE(tag_name)
    Object.setPrototypeOf(dom_name, Document.prototype); // 为了后续操作直接这么指定了
    return dom_name

}
document = {};
Object.setPrototypeOf(document, Document.prototype);

// 在当前父节点下 追加子节点  // 实现是最简单的dom操作 没用考虑兄弟节点的关系 自行完善
Document.prototype.appendChild = function appendChild(aChild) {
    if (!aChild) {
        return null
    } else if (aChild.parentNode_) {
        // 要追加的 节点已存在对应节点中  先删除 后插入
        aChild.parentNode_.removeChild(aChild)
        aChild.parentNode_ = null;
    }
    aChild.parentNode_ = this;
    this.childNodes_.push(aChild);
    // 判断是否挂载 DOM树 跟随父亲几点
    if (this.isConnected) {
        aChild.isConnected = true;
    }

}


// 删除子节点
Document.prototype.removeChild = function removeChild(child) {
    debugger;
    // 删除 DOM 节点
    if (child === null) {
        //没有传递节点
        throw new Error('Something went wrong!');
    }
    let DOM_ = this.childNodes_;
    for (let index = 0; index < DOM_.length; index++) {
        if (child === DOM_[index]) {
            this.childNodes_.splice(index, 1); // 删除该子节点
            child.parentNode_ = null;
            if (this.nodeType === 1) {
                child.parentElement_ = null;
            }
            return child
        }
    }
    throw new Error('Something went wrong!'); //未找到该节点抛出异常
}

div = document.createElement("div") // 这样我们就创建了一个的div 标签
span = document.createElement("span") // 这样我们就创建了一个的span标签
div.appendChild(span)
console.log(div.childNodes[0].tagName) // 成功找到
console.log(span.parentNode_.tagName) // 成功找到


div.removeChild(span)
console.log(div.childNodes[0]) // 成功删除