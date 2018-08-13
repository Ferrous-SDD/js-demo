var pack = {
	byId: function(id) {
		return document.getElementById(id);
	},
	byName: function(n) {
		return document.getElementsByName(n);
	},
	byClass: function(n) {
		return document.getElementsByClassName(n);
	},
	byTag: function(n) {
		return document.getElementsByTagName(n);
	},
	create: function(n) {
		return document.createElement(n);
	},
	remove: function(node) {
		node.parentElement.removeChild(node);
	},
	setCookie: function(key, val, expires) {
		var date = new Date();
		date.setMinutes(date.getMinutes() + expires);
		document.cookie = key + "=" + val + ";expires=" + date.toUTCString();
	},
	getCookie: function(key) {
		var cookies = document.cookie.split("; ");
		for(var i = 0; i < cookies.length; i++) {
			var cookieItem = cookies[i].split("=");
			if(cookieItem[0] === key) {
				return cookieItem[1];
			}
		}
	},
	ajax: function(url, sb) {
		var myajax = new XMLHttpRequest();
		myajax.open("GET", url, true);
		myajax.send();
		myajax.onreadystatechange = function() {
			if(myajax.readyState === 4) {
				if(myajax.status === 200) {
					var data = JSON.parse(myajax.response);
					sb(data)
				}
			}
		}
	}
}

HTMLElement.prototype.addClass = function(cname) {
	this.classList.add(cname);
	return this;
}

HTMLElement.prototype.removeClass = function(cname) {
	this.classList.remove(cname);
	return this;
}