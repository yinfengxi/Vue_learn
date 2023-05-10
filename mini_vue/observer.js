function observe(data) {
    if (typeof data !== 'object') {
        return
    }
    return new Observer(data)
}

class Observer {
    constructor(value) {
        this.value = value
        if (Array.isArray(value)) {
            console.log('重新数组方法');
        }
        this.walk(value)
    }
    walk(obj) {
        const keys = Object.keys(obj);
        for(let key of keys) {
            defineReactive(obj, key, obj[key])
        }
    }
}

function defineReactive(obj, key, val) {
    let dep = new Dep();
    let childOb = observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function getter() {
            dep.depend();
            return val
        },
        set: function setter(newVal) {
            if (val === newVal) {
                return 
            }
            val = newVal
            // childOb = observe(newVal)
            dep.notify()
        }
    })
}
