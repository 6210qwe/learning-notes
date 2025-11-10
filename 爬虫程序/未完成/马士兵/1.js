n.prototype.trigger = function(t) {
    for (var e = arguments.length, i = new Array(1 < e ? e - 1 : 0), n = 1; n < e; n++)
        i[n - 1] = arguments[n];
    this.emit.apply(this, [t, t].concat(i))
}