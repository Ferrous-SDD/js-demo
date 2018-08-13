function Index(node) {
    this.node = node;
    this.init();
}

Index.prototype.init = function() {
    var self = this;
    this.nodes = [];
    Array.prototype.slice.call(self.node, 0).forEach(function(item, index) {
        //获取到每一个li的width/height/left/right --> upDate
        self.nodes.push(self.upDate(item));
        //bindEvents
        self.bindEvents(item,index);
    })
    console.log(self.nodes)
}

Index.prototype.upDate = function(item) {
    return {
        w: item.offsetWidth,
        h: item.offsetHeight,
        l: item.offsetLeft,
        t: item.offsetTop
    }
}

Index.prototype.bindEvents = function(item,index) {
    var self = this;
    $(item).on('mouseenter', function(e) {
    	self.addClass(item,e,'in',index)
        console.log('in')
        //addClass
        return false;
    })
    $(item).on('mouseleave', function(e) {
        console.log('out')
        self.addClass(item,e,'out',index)
        return false;
    })
}

Index.prototype.addClass = function(item,e,state,index) {
	//getDirection
	var self = this;
	var class_add = '';
	var d = self.getDirection(e,index);
	switch(d) {
		case 0:
		class_add = '-top';
		break;
		case 1:
		class_add = '-right';
		break;
		case 2:
		class_add = '-bottom';
		break;
		case 3:
		class_add = '-left';
		break;
	}
	item.className = '';
	item.classList.add(state + class_add)
}

Index.prototype.getDirection = function(e,index) {
	var self = this;
	var w = self.nodes[index].w,
		h = self.nodes[index].h,
		x = e.pageX - self.nodes[index].l - w/2,
		y = e.pageY - self.nodes[index].t - h/2,
		d = (Math.round((Math.atan2(y,x) * (180 / Math.PI) + 180) / 90) + 3) % 4;
		console.log(d)
		return d;
}

new Index($('li'));