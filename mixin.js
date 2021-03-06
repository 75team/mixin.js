(function(define, global) { 'use strict';
	define(function () {
		return function(des, src, map){
			if(typeof des !== 'object' 
				&& typeof des !== 'function'){
				throw new TypeError('Unable to enumerate properties of '+ des);
			}
			if(typeof src !== 'object' 
				&& typeof src !== 'function'){
				throw new TypeError('Unable to enumerate properties of '+ src);
			}

			map = map || function(d, s, i, des, src){
				//这里要加一个des[i]，是因为要照顾一些不可枚举的属性
				if(!(des[i] || (i in des))){
					return s;
				}
				return d;
			}

			if(map === true){	//override
				map = function(d,s){
					return s;
				}
			}

			for (var i in src) {
				des[i] = map(des[i], src[i], i, des, src);
				//如果返回undefined，尝试删掉这个属性
				if(des[i] === undefined) delete des[i];	
			}
			return des;		
		}
	});
}) (
	typeof define === 'function' && define.amd ? define : function (name, requires, factory) { 
	    if(typeof name === 'function') {
	        factory = name, name = undefined, requires = [];
	    } else if(typeof requires === 'function') {
	        factory = requires, requires = [];
	    }

	    if(typeof module != 'undefined' && module.exports){
	    	var _requires = [];
	    	for(var i = 0; i < requires.length; i++){
	    		_requires.push(require(requires[i]));
	    	}
	      	module.exports = factory.apply(this, _requires); 
	    }else if(typeof window != 'undefined'){
	    	var _requires = [];
	    	for(var i = 0; i < requires.length; i++){
	    		_requires.push(window[requires[i]]);
	    	}	        
	        window[name || 'mixin'] = factory.apply(this, _requires);
	    }
	},
	this
);