let UtilBehavior={

	_dashify:(str)=>{
		return str.toLowerCase().replace(/ /g,'-');
	},

	_viewLabel:(label)=>{
		if(label!=undefined && label.length>0) return true; else return false;
	},

	_getIndex:(item, items)=>{
		return items.indexOf(item);
	}
};


let AnimationsBehavior={

	_onAnimationComplete:(elem, fn)=>{
		if(elem.finished){
			elem.finished.then(fn);
		} else {
			elem.onfinish = fn;
		}
	}
};
