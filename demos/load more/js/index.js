(function() {

	$.extend({
		index: {},
		demo: {}
	});

	$.extend($.index, {
		init: function() {
			$.demo.loadData();
		}
	})

	$.extend($.demo, {
		pageIndex: 1,
		pageSize: 5,
		loadData: function() {
			$('#btn').click(function() {
				$.get("data/brand.json", function(data) {

					var start = ($.demo.pageIndex - 1) * $.demo.pageSize;
					var end = start + $.demo.pageSize;

					var list = data.brand.slice(start, end);
					console.log(list)
					list.forEach(function(item) {
						$(".content").append(`<li>${item}</li>`)
					})
					$.demo.pageIndex++;
				})
			})

		}
	});

	$.index.init();

})()