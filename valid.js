class valid {
  constructor(obj, rules = []) {
    this.rules = []
    this.initRules(rules)
    this.formObj = obj
  }

  _isObj(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
  }

  _isRightRule(obj) {
    return this._isObj(obj) && obj['field'] && obj['func'] && (typeof obj['func'] === 'function')
  }

  initRules(rules) {
    if (Array.isArray(rules)) {
      rules.forEach(rule => {
        this.addRule(rule)
      })
    } else {
      throw new Error('The second arg except an Array!')
    }
  }

  addRule(obj) {
    if (this._isRightRule(obj)) {
      this.rules.push(obj)
    } else {
      console.warn('rule must be an Object with [field] & [func],and [func] must be a Function')
    }
  }

  _hasProp(field) {
    return this.formObj.hasOwnProperty(field)
  }

  _judgeValue(field, func) {

    let _func = func.bind(this.formObj)

    if (Array.isArray(field)) {

      for (let i = 0; i < field.length; i++) {
        let p = field[i]
        if (!_func(this.formObj[p])) {
          return false
        }
      }
      return true

    } else {
      return this._hasProp(field) ? _func(this.formObj[field]) : (console.warn('useless rule of ' + field) || false)
    }
  }

  judgeFunc(isfindall) {
    let bol = true
    let errmsg = []
    for (let i = 0; i < this.rules.length; i++) {

      let rule = this.rules[i]
      let r = this._judgeValue(rule.field, rule.func)

      if (!r) {
        bol = false
        errmsg.push(rule.emsg ? rule.emsg : `${Array.isArray(rule.field) ? JSON.stringify(rule.field) : rule.field} is not valid`)
        if (!isfindall) {
          return {
            isValid: bol,
            errmsg: errmsg[0]
          }
        }
      }
    }
    return {
      isValid: bol,
      errmsg: errmsg
    }
  }

  isvalid(isfindall) {
    return this.judgeFunc(isfindall)
  }
}