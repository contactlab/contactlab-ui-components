let UtilBehavior={

	_dashify:(str)=>{
		return str.replace(/ /g,'-');
	},

	_viewLabel:(label)=>{
		if(label!=undefined && label.length>0) return true; else return false;
	},

	_getIndex:(item, items)=>{
		for ( var i = 0; i < items.length; i++ ) {
	        if ( JSON.stringify(items[i]) == JSON.stringify(item) ) {
	            return i;
	        }
	    }
	    return -1;
	}
}
