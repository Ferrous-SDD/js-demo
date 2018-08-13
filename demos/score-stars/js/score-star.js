$.extend({
	star(args) {
		//判断，必须传容器
		if(!args.container) {
			throw new Error("the 'container' of args is required")
		}

		//配置默认值
		var settings = {
			count: 5,
			value: 0,
			color: "gold",
			size: 30,
			readonly: false
		}

		//如果一个参数，则将参数中的元素克隆到$
		//如果两个参数，则将第二个参数克隆到第一个，如果有同名属性，则覆盖
		$.extend(settings, args);

		//判断，实心一定比总数小
		if(settings.value > settings.count) {
			throw new Error("the 'value' must less than the 'count' ")
		}

		//根据用户配置，创建星星
		for(var i = 1; i <= settings.count; i++) {
			var star = $(`<i style="cursor:pointer;color:${settings.color};font-size:${settings.size}px" class="fa star" aria-hidden="true"></i>`)
			//如果需要3颗实心，则前三颗都是实心
			if(i <= settings.value) {
				star.addClass("fa-star")
			} else {
				star.addClass("fa-star-o")
			}
			$(args.container).append(star)
		}

		if(!settings.readonly) {

			//鼠标悬浮，显示对应个数的星星
			$(args.container).on("mouseover", ".star", function() {

				$(".star").each((index, item) => {

					//根据鼠标悬浮的星星的位置，渲染实心与空心
					if(index <= $(this).index()) {
						$(item).removeClass("fa-star-o").addClass("fa-star")
					} else {
						$(item).removeClass("fa-star").addClass("fa-star-o")
					}
				})
			})

			//鼠标离开，还原，根据实心的个数重新初始化
			$(args.container).on("mouseout", ".star", function() {

				$(".star").each((index, item) => {
					//根据实心的个数值，渲染实心与空心
					if(index < settings.value) {
						$(item).removeClass("fa-star-o").addClass("fa-star")
					} else {
						$(item).removeClass("fa-star").addClass("fa-star-o")
					}
				})

			})

			//鼠标点击，设置实心个数
			$(args.container).on("click", ".star", function() {
				settings.value = $(this).index() + 1;
				//如果用户需要回调，则将新的值返回
				if(settings.choose) settings.choose(settings.value)
			})
		}
	}
});