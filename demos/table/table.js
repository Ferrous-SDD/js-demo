/**
 * 
 * Name:表格一键生成插件
 * 
 * Author:Ferrous
 * 
 * LastUpdateTime:2017-5-18
 * 
 * Version:v1.5.3
 * 
 * QQ:1414130103
 * 
 
 * * Description:
 * 本插件用于表格的自定义生成场景，调用者只需传入所需的行数、列数、类名、容器，即可一键调用
 * 安全无毒
 * Example:
 * tableWay.create({row: 5,col: 6,className: "cltb",containerid: "container"});
 * 
 * */

var tableWay = (function() {
	function createTable(option) {
		var table = document.createElement("table");
		table.classList.add(option.className || "tb")

		for(var j = 0; j < (option.row || 1); j++) {
			var tr = document.createElement("tr")
			table.appendChild(tr)

			for(var i = 0; i < (option.col || 1); i++) {
				var td = document.createElement("td")
				tr.appendChild(td)
			}
		}

		var container = document.body;

		if(option.containerid) {
			container = document.getElementById(option.containerid)
		}

		container.appendChild(table);
	}

	return {
		create: createTable
	}

})()