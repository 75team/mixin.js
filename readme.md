## 使用说明

### 外链形式

```html
<script src="{{src}}"></script>

<script>
    function A(options){
    	this.options = mixin(options, defaultOptions);
    }
</script>
```

### 模块加载形式

```html
<script>
    require(['{{module}}'], function(mixin) {
	    function A(options){
	    	this.options = mixin(options, defaultOptions);
	    }
    });
</script>
```

### Node 模块

```
npm install node-mixin
```

## 文档参考

### mixin *mixin(des, src)*

将src上的属性复制到des上

默认复制des上不存在而src上存在的属性，会忽略掉des上已经存在的属性

### mixin *mixin(des, src, true)*

将src上的属性复制到des上并覆盖des上原有的属性

等价于 *jQuery.extend(des, src)*

### mixin *mixin(des, src, map)*

依次遍历src每一个属性，对每一个属性触发一次map操作，将map的结果赋给des

如果map返回undefeind，des上的对应属性将被delete

```js
var a = {x:{y:1, z:3}};
mixin(a, {x:{y:2}, z:2}, function(a,b){
	try{
		return mixin(a,b, arguments.callee)
	}catch(ex){
		return b
	}
});
//实现了深拷贝，等价于 jQuery.extend(true, a, {x:{y:2}, z:2});
```