# object-valid

### what
----
一个自定义校验规则的对象(object)校验工具
### why
----
其实就是这周做了个超级多字段的表单，然后还有很多条特殊规则的校验,感觉啥设
计模式也省不了多少代码..也想不到啥特别好的方法，然后今下午有了点时间，写了
个....插件，小工具吧...搞着玩玩，可能比写if else强点

### How
----
#### 1.引入js
```html
<!DOCTYPE html>
<html>
    <head>
        <mate charest="utf-8" />
        <title>valid demo</title>
    </head>
    <body>
	<script src="./valid.js"></script>
    </body>
</html>
```



#### 2.使用
```javascript
//举例对象
var obj = {
  name: '',
  passwd: '',
  age: null,
  num: 10,
}
//1.创建valid实例
var fm = new valid(obj)
//2.添加规则
fm.addRule({
  field: 'age', //需要校验的属性名
  func(e) {	//自定义校验方法，e为改规则所校验的属性值，返回一个布尔值
  if (!e || (e > this.num)) {  //该方法中的this指向校验的对象，即obj
    return false
  }
  return true
  },
  emsg: 'age错误' //未通过校验的错误信息，可不传
})

//多个值使用同一规则，field字段可为数组
fm.addRule({
  field: ['name','passwd'], //
  func(e) {//该值不为空校验
    if (!e) {
      return false
    }
    return true
  }
})

//获取校验结果
fm.isvalid() || fm.isvalid('all')

{
	isValid：Boolean，
	errmsg：String || Array
}

//区别:
//isvalid()无参数时会在遇到第一个不符合规则的值时返回结果，并停止校验，返回的errmsg为String
//isvalid(true)当传入参数布尔值为true时，会对所有的规则进行校验，返回的errmsg为Array
```

### demo
----
demo.html
