$.extend({
	msg: function(content, title, hasShadow) {

		var str = ``;

		if(hasShadow === true) {
			str += `	<div class="msg-shadow" style="z-index: 9998;position: absolute;top: 0px;left: 0px;height: 1000px;width: 100%;background: grey;opacity: 0.5;">
						</div>
					`
		}

		str += `<div class="msg-layer" style="left: calc(50% - 175px);top: calc(50% - 70px);position: fixed;width: 350px;height: 140px;border:1px solid lightgrey;z-index:9999">
			<div class="msg-title" style="user-select:none;cursor: move;line-height: 40px;text-indent: 10px;width: 100%;height: 40px;background: lightgray;">
				${title||"提示"}
			</div>
			<div style="width: 100%;height: 100px;background: #fff;text-align: center;line-height: 100px;">
				${content}
			</div>
			<div class="msg-close" style="width: 16px;height: 16px;position: absolute;top: 10px;right: 10px;cursor: pointer;">
				X
			</div>
		</div>`

		$("body").append(str);

		//设置遮罩层高度，覆盖整个页面
		$(".msg-shadow").css("height", $(document).height())

		var canmove = false;
		var xxx = 0;
		var yyy = 0;
		$(".msg-title").mousedown(function(e) {
			canmove = true;
			xxx = e.offsetX;
			yyy = e.offsetY;
		})

		$(".msg-close").click(function() {
			$(".msg-layer").remove();
			$(".msg-shadow").remove();
		})

		$(window).mouseup(function() {
			canmove = false;
		}).mousemove(function(e) {
			if(canmove) {
				$(".msg-layer").css({
					left: e.pageX - xxx,
					top: e.pageY - yyy
				})
			}

		})

	}

});