let UtilBehavior={

	_dashify:(str)=>{
		return str.toLowerCase().replace(/ /g,'-');
	},

	_viewLabel:(label, icon)=>{
		let bool=false;
		if(label!=undefined && label.length>0) bool=true; else bool=false;
		if(icon!=undefined && icon.length>0) bool=true;
		return bool;
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
