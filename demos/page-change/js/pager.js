$.extend({
	pager(args) {

		if(!args.container) throw new Error("容器必填")
		if(!args.pagecount) throw new Error("页数必填")
		if(!args.jump) throw new Error("回调必填")

		var pagecount = 10;
		var currentPageIndex = 1;

		$(args.container).append(`<ul id="pager-container"></ul>`)

		for(var i = 1; i <= args.pagecount; i++) {
			$("#pager-container").append(`<li class="pageindex">${i}</li>`)
		}

		//在容器的开始添加元素
		$("#pager-container").prepend(`<li class="ctrl prev disabled">上一页</li>`)
			//在容器的末尾添加元素
		$("#pager-container").append(`<li class="ctrl next">下一页</li>`)

		//给第一个加上默认激活样式
		$(".pageindex").first().addClass("active")

		//给每个页码都加上点击事件，点击跳转，并且加上Class
		$("#pager-container").on("click", ".pageindex", function() {
			$(this).addClass("active").siblings().removeClass("active")

			currentPageIndex = $(this).index(".pageindex") + 1

			check()
		})

		//点击上一页
		$("#pager-container").on("click", ".ctrl.prev", function() {

			//判断标签是否禁用
			if(currentPageIndex === 1) {
				return;
			}

			currentPageIndex--
			$(".pageindex").eq(currentPageIndex - 1).addClass("active").siblings().removeClass("active")

			check()
		})

		//点击下一页
		$("#pager-container").on("click", ".ctrl.next", function() {
			//判断标签是否禁用
			if(currentPageIndex === pagecount) {
				return;
			}

			currentPageIndex++
			$(".pageindex").eq(currentPageIndex - 1).addClass("active").siblings().removeClass("active")

			check()
		})

		function check() {

			//点击第一页之外的，解禁上一页按钮
			if(currentPageIndex - 1 === 0) {
				$(".ctrl.prev").addClass("disabled")
			} else {
				$(".ctrl.prev").removeClass("disabled")
			}

			//点击最后一页之外的，解禁下一页按钮
			if(currentPageIndex === pagecount) {
				$(".ctrl.next").addClass("disabled")
			} else {
				$(".ctrl.next").removeClass("disabled")
			}

			//执行分页回调
			if(args.jump) args.jump(currentPageIndex)

		}

	}
})