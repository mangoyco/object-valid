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

  _judgeValue(val,_func) {
    
  }

  judgeFunc(isfindall) {
    let bol = true
    let errmsg = []
    for (let i = 0; i < this.rules.length; i++) {
      let rule = this.rules[i]
      let F = rule.func
      if (!typeof F === 'function') {
        throw new Error(`func Property Needs a Function Not a ${typeof F}`)
      }
      let r = F.call(this.formObj, this.formObj[rule.field])
      if (!r) {
        bol = false
        errmsg.push(rule.emsg ? rule.emsg : `${rule.field} is not valid`)
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