$.fn.extend({
	datepicker: function() {
		var today, thismonth, date;
		var self = $(this)

		self.focus(function() {
			createpicker()
		})

		//		self.blur(function() {
		//			$("#mypicker").remove()
		//		})

		self.prop("readonly", "readonly")

		function createpicker() {

			var str = `
				<div id="mypicker" style="left:${self.offset().left}px;
				top:${self.offset().top + self.outerHeight()+5}px;
				border: 1px solid grey;width: 400px;overflow: hidden;position: absolute;">

			<div style="text-align: center;margin: 10px 0px;">
				<select id="curryear">
				</select>
				<button id="btnprev">上月</button>
				<strong id="currmonth"></strong>
				<button id="btnnext">下月</button>
			</div>
			<ul id="container1" style="width: 400px;">
				<li>日</li>
				<li>一</li>
				<li>二</li>
				<li>三</li>
				<li>四</li>
				<li>五</li>
				<li>六</li>
			</ul>
			<ul id="container" style="">

			</ul>
		</div>
		
		`

			$("body").append(str)

			$("#container").on("click", "li", function() {
				self.val(date.getFullYear() + "-" + buling(date.getMonth() + 1) + "-" + buling($(this).text()))
				$("#mypicker").remove()
			})

			function buling(val) {
				if(parseInt(val) < 10) {
					return "0" + val
				}

				return val
			}

			date = new Date()

			for(var i = date.getFullYear() - 10; i <= date.getFullYear() + 10; i++) {
				$("#curryear").append(`<option value="${i}">${i}</option>`)
			}
			
			today = date.getDate()
			thismonth = date.getMonth()
			
			loaddate()

			$("#curryear").change(function() {
				date.setFullYear($(this).val())
				date.setMonth(0)
				date.setDate(1)
				loaddate()
			})

			$("#btnprev").click(function() {
				date.setMonth(date.getMonth() - 1)
				loaddate()
			})

			$("#btnnext").click(function() {
				date.setMonth(date.getMonth() + 1)
				loaddate()
			})
		}

		function loaddate() {
			$("#curryear").val(date.getFullYear())

			$("#currmonth").text(date.getMonth() + 1)

			$("#container").empty()
			var totalcount = 0

			switch(date.getMonth() + 1) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					totalcount = 31
					break;
				case 2:
					totalcount = (date.getFullYear() % 400 === 0 || (date.getFullYear() % 4 === 0 && date.getFullYear() % 100 !== 0)) ? 29 : 28
					break;
				default:
					totalcount = 30
					break;
			}

			//高亮显示今天数字

			for(var i = 1; i <= totalcount; i++) {

				var li = $(`<li>${i}</li>`)

				if(today === i && thismonth === date.getMonth()) {
					li.addClass("active")
				}

				$("#container").append(li)
			}

			//设置时间为本月第一天
			date.setDate(1)

			var count = date.getDay()
			for(var i = 0; i < count; i++) {

				date.setDate(date.getDate() - 1)

				var li = $(`<li class="disable">${date.getDate()}</li>`)
				$("#container li").first().before(li)
			}

			date.setDate(date.getDate() + count)
			date.setDate(totalcount)

			//后面需要补得li
			var aftercount = 6 - date.getDay()
			for(var i = 0; i < aftercount; i++) {
				date.setDate(date.getDate() + 1)
				var li = $(`<li class="disable">${date.getDate()}</li>`)
				$("#container").append(li)
			}

			date.setDate(date.getDate() - aftercount)
			date.setDate(1)
		}

	}
})