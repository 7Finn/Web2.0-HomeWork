$(function () {
	sort('#todo');
	sort('#staff');
});

function sort(id) {
	var tbData = {tableId : id, sortIndex : -1, sortUp : false, value : null};
	$(tbData.tableId).children('thead').find('tr th').each(function () {
		$(this).click(function () {
			var thisIndex = $(tbData.tableId).children('thead').find('tr th').index($(this));
			append(tbData, thisIndex);
		});
	});
}

function append(tbData, thisIndex) {
	if (thisIndex == tbData.sortIndex) {
		sortFuntcion(tbData, thisIndex, 'b');
		tbData.sortIndex = -1;
	} else {
		sortFuntcion(tbData, thisIndex, 'a');
		tbData.sortIndex = thisIndex;
	}
	$(tbData.tableId).children('tbody').empty().append(tbData.value);
	changeColor(tbData.tableId, thisIndex);
}

function sortFuntcion (tbData, thisIndex, dir) {
	tbData.value = $(tbData.tableId + ' tbody').children().sort(function (a, b) {
		if (dir == 'b') return b.children[thisIndex].innerText.localeCompare(a.children[thisIndex].innerText);
		if (dir == 'a') return a.children[thisIndex].innerText.localeCompare(b.children[thisIndex].innerText);
	});
	if (dir == 'b') $(tbData.tableId).children('thead').find('tr th').children('img').attr("src", "descend.png");
	if (dir == 'a') $(tbData.tableId).children('thead').find('tr th').children('img').attr("src", "ascend.png");
}

function changeColor(tableId, index) {
	$('tr').removeClass('alternate');
	$("tr:even").addClass('alternate');
	$('th').removeClass('selected');				//去掉所有选中的颜色
	var ths = $(tableId).children('thead').find('tr th');
	$(ths[index]).addClass('selected'); //增加选中的颜色
}



// 神秘代码：
// $('table').children('thead').find('tr th').each(function () {
// 		$(this).click(function () {
// 			var thisIndex = $('table').children('thead').find('tr th').index($(this));
// 			s = $('table' + ' tbody').children().sort(function (a, b) {
// 				return a.children[thisIndex].innerText.localeCompare(b.children[thisIndex].innerText);
// 			});
// 			$('table').children('tbody').empty().append(s);
// 		});
// });