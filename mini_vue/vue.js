import { observe } from "../src/core/observer";

class Vue {
    constructor(options) {
        this._init(options)
    }
    _init(options) {
        const vm = this;
        vm.$options = options

        initState(vm); // 初始化数据，data,methods

        vm.$options.mounted() 
    }
}

function initState(vm) {
    vm.methods = vm.$options.methods;
    vm.data = vm.$options.data;
    initData(vm)
}

function initData(vm) {
    let data = vm.$options.data;
    const keys = Object.keys(data);
    // 将data属性代理到vm
    proxy(vm, 'data', keys);
    observe(data);
}

function proxy(vm, source, keys) {
    for(let key of keys) {
        Object.defineProperty(vm, key, {
            enumerable: true,
            configurable: true,
            get: function getter() {
                console.log('代理获取数据');
                return vm[source][key]
            },
            set: function setter(val) {
                vm[source][key] = val
            }
        })
    }
}