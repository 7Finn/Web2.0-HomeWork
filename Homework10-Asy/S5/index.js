$(function () {
	var buttons = $('#control-ring').children('li');
	var handlers = {
		"A" : aHandler,
		"B" : bHandler,
		"C" : cHandler,
		"D" : dHandler,
		"E" : eHandler,
		"Bubble" : bubbleHandler,
	}
	var bundle = {
		handlers : handlers,
		buttons : buttons,
		ajaxList : [],
		loadNum : 0,
	}
	var currentSum = 0;
	clearAll(bundle);
	buttons.click(function () {
		$button = $(this);
		showRedPoint($button);
		disableOther($button);
		if ($button.hasClass("button") && $button.children('span').css("visibility") == "hidden") {
			setNum(bundle.ajaxList, $button);
		}
	});
	$('#button').hover(function(){
		clearAll(bundle);
	});

	function errorHandler(bundle, message, currentSum) {
		showMessage(message);
		bundle.handlers[$(bundle.buttons[bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);
	}

	$('.apb').click(function () {
		setRandom(bundle.buttons);
		showOrder(bundle.buttons);
		bundle.handlers[$(bundle.buttons[bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);
	});
});

function aHandler(bundle, message, currentSum, callback) {
	var messages = ["这不是个天大的秘密", "这是个天大的秘密"];
	function errorHandler(bundle, message, currentSum) {
		showMessage(message);
		bundle.handlers[$(bundle.buttons[bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);
	}
	var $button = $(bundle.buttons[bundle.loadNum]);
	showRedPoint($button);
	disableOther($button);
	var ajaxObj = $.get("http://localhost:3000/S5/", function(data, status) {
		$button.children('span').html(data.toString());
		recoverOther($button);
    	console.log("Data: " + data + "\nStatus: " + status);
    	currentSum += parseInt(data); //加到currentSum上
    	showMessage(messages[1]); //显示成功的信号
		if (bundle.loadNum + 1< bundle.buttons.length) { 
    		bundle.handlers[$(bundle.buttons[++bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);//调用下一个handler
		} else { //如果够了五个button,则触发Bubble的处理
			bundle.handlers["Bubble"](bundle, currentSum);
		}
  	})
  	.fail(function () {
  		console.log("处理失败");
  		callback(bundle, messages[0], currentSum);
  	});
  	setHandleStatus(ajaxObj);
	bundle.ajaxList.push(ajaxObj);
}

function bHandler(bundle, message, currentSum, callback) {
	var messages = ["我知道", "我不知道"];
	function errorHandler(bundle, message, currentSum) {
		showMessage(message);
		bundle.handlers[$(bundle.buttons[bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);
	}
	var $button = $(bundle.buttons[bundle.loadNum]);
	showRedPoint($button);
	disableOther($button);
	var ajaxObj = $.get("http://localhost:3000/S5/", function(data, status) {
		if (status) { //如果出现了异常,则执行上一步的回调函数
			$button.children('span').html(data.toString());
			recoverOther($button);
    		console.log("Data: " + data + "\nStatus: " + status);
    		currentSum += parseInt(data); //加到currentSum上
    		showMessage(messages[1]); //显示成功的信号
			if (bundle.loadNum + 1< bundle.buttons.length) { 
    			bundle.handlers[$(bundle.buttons[++bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);//调用下一个handler
			} else { //如果够了五个button,则触发Bubble的处理
				bundle.handlers["Bubble"](bundle, currentSum);
			}
		} else {
			callback(bundle, messages[0], currentSum);
		}
  	})
  	.fail(function () {
  		console.log("处理失败");
  		callback(bundle, messages[0], currentSum);
  	});
  	setHandleStatus(ajaxObj);
	bundle.ajaxList.push(ajaxObj);
}

function cHandler(bundle, message, currentSum, callback) {
	var messages = ["你知道", "你不知道"];
	function errorHandler(bundle, message, currentSum) {
		showMessage(message);
		bundle.handlers[$(bundle.buttons[bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);
	}
	var $button = $(bundle.buttons[bundle.loadNum]);
	showRedPoint($button);
	disableOther($button);
	var ajaxObj = $.get("http://localhost:3000/S5/", function(data, status) {
		if (status) { //如果出现了异常,则执行上一步的回调函数
			$button.children('span').html(data.toString());
			recoverOther($button);
    		console.log("Data: " + data + "\nStatus: " + status);
    		currentSum += parseInt(data); //加到currentSum上
    		showMessage(messages[1]); //显示成功的信号
			if (bundle.loadNum + 1< bundle.buttons.length) { 
    			bundle.handlers[$(bundle.buttons[++bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);//调用下一个handler
			} else { //如果够了五个button,则触发Bubble的处理
				bundle.handlers["Bubble"](bundle, currentSum);
			}
		} else {
			callback(bundle, messages[0], currentSum);
		}
  	})
  	.fail(function () {
  		console.log("处理失败");
  		callback(bundle, messages[0], currentSum);
  	});
  	setHandleStatus(ajaxObj);
	bundle.ajaxList.push(ajaxObj);
}

function dHandler(bundle, message, currentSum, callback) {
	var messages = ["他知道", "他不知道"];
	function errorHandler(bundle, message, currentSum) {
		showMessage(message);
		bundle.handlers[$(bundle.buttons[bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);
	}
	var $button = $(bundle.buttons[bundle.loadNum]);
	showRedPoint($button);
	disableOther($button);
	var ajaxObj = $.get("http://localhost:3000/S5/", function(data, status) {
		if (status) { //如果出现了异常,则执行上一步的回调函数
			$button.children('span').html(data.toString());
			recoverOther($button);
    		console.log("Data: " + data + "\nStatus: " + status);
    		currentSum += parseInt(data); //加到currentSum上
    		showMessage(messages[1]); //显示成功的信号
			if (bundle.loadNum + 1< bundle.buttons.length) { 
    			bundle.handlers[$(bundle.buttons[++bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);//调用下一个handler
			} else { //如果够了五个button,则触发Bubble的处理
				bundle.handlers["Bubble"](bundle, currentSum);
			}
		} else {
			callback(bundle, messages[0], currentSum);
		}
  	})
  	.fail(function () {
  		console.log("处理失败");
  		callback(bundle, messages[0], currentSum);
  	});
  	setHandleStatus(ajaxObj);
	bundle.ajaxList.push(ajaxObj);
}

function eHandler(bundle, message, currentSum, callback) {
	var messages = ["才不怪", "才怪"];
	function errorHandler(bundle, message, currentSum) {
		showMessage(message);
		bundle.handlers[$(bundle.buttons[bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);
	}
	var $button = $(bundle.buttons[bundle.loadNum]);
	showRedPoint($button);
	disableOther($button);
	var ajaxObj = $.get("http://localhost:3000/S5/", function(data, status) {
		if (status) { //如果出现了异常,则执行上一步的回调函数
			$button.children('span').html(data.toString());
			recoverOther($button);
    		console.log("Data: " + data + "\nStatus: " + status);
    		currentSum += parseInt(data); //加到currentSum上
    		showMessage(messages[1]); //显示成功的信号
			if (bundle.loadNum + 1< bundle.buttons.length) { 
    			bundle.handlers[$(bundle.buttons[++bundle.loadNum]).attr("title")](bundle, "", currentSum, errorHandler);//调用下一个handler
			} else { //如果够了五个button,则触发Bubble的处理
				bundle.handlers["Bubble"](bundle, currentSum);
			}
		} else {
			callback(bundle, messages[0], currentSum);
		}
  	})
  	.fail(function () {
  		console.log("处理失败");
  		callback(bundle, messages[0], currentSum);
  	});
  	setHandleStatus(ajaxObj);
	bundle.ajaxList.push(ajaxObj);
}

function bubbleHandler(bundle, currentSum) {
	var message ="楼主异步调用战斗力感人, 目测不超过";
	$('#info-bar').css("background-color", "rgba(48, 63, 159, 1)");
	$('#info-bar').css("cursor", "pointer");
	setTimeout(function () {
		showMessage(message);//显示成功的信号
    	showSumNum(currentSum);
    	disabledInfo();
	}, 1500);
    bundle.loadNum = 0;
}

function setRandom(buttons) {
	for (var i = 0; i < 30; ++i) {
		var a = Math.floor(Math.random() * buttons.length);
		var b = Math.floor(Math.random() * buttons.length);
		if (a != b) {
			var temp = buttons[a];
			buttons[a] = buttons[b];
			buttons[b] = temp;
		}
	}
}

function setHandleStatus(ajaxObj) {
	if (Math.floor(Math.random() * 3) == 0) ajaxObj.abort();
}

function clearAll(bundle) {
	for (var i = 0; i < bundle.ajaxList.length; ++i) {
		var ajaxObj = bundle.ajaxList.pop();
		ajaxObj.abort();
	}
	bundle.loadNum = 0;
	disabledInfo();
	$('.unread').css("visibility", "hidden");
	$('#order').html("");
	$('.unread').html("");
	$('.sum').html("");
	$('.button-disabled').removeClass('button-disabled').addClass('button');

}

function setNum(ajaxList, $button) {
	var ajaxObj = $.get("http://localhost:3000/S5/", function(data, status) {
			$button.children('span').html(data.toString());
			recoverOther($button);
    		console.log("Data: " + data + "\nStatus: " + status);
  		});
	ajaxList.push(ajaxObj);
}

function showSumNum(sum) {
	$('.sum').html(sum);
}

function disabledInfo() {
	$('#info-bar').css("background-color", "#7E7E7E");
	$('#info-bar').css("cursor", "default");
}

function showRedPoint($button) {
	$button.find('.unread').css("visibility", "visible");
	$button.children('span').html("..");
}

function disabledItself($button) {
	$button.removeClass('button').addClass('button-disabled');
}

function disableOther($button) {
	$('li').not($button).removeClass('button').addClass('button-disabled');
}

function recoverOther($button) {
	$button.removeClass('button').addClass('button-disabled');
	$('.unread').each(function() {
		if ($(this).html() == '') {
			$(this).parent().removeClass('button-disabled').addClass('button');
			$(this).parent().removeAttr("disabled");
		}
	});
}

function showOrder (buttons) {
	var order = "";
	for (var i = 0; i < buttons.length; ++i) {
		order = order + ' ' + $(buttons[i]).attr('title');
	}
	order = order.slice(1);
	$('#order').html(order);
}

function showMessage (message) {
	$('#order').html(message);
}
