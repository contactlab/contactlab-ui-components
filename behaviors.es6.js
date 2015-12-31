let UtilBehavior={

	_dashify:(str)=>{
		return str.replace(/ /g,'-');
	},

	_viewLabel:(label)=>{
		if(label.length>0) return true; else return false;
	},

	_getIndex:(item, items)=>{
		return items.indexOf(item);
	}
}
