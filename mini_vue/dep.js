class Dep {
    static target = null
    constructor() {
        this.subs = []
    }
    addSub(sub) {
        this.subs.push(sub)
    }
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }
    notify() {
        this.subs.forEach(sub => {
            sub.update();
        })
    }
}