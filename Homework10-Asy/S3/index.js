var buttons = {};
var nums = [];
var flag = false;
var loadNum = 0;
var ajaxList = [];
var gettingNum = false;

$(function () {
	clearAll();
	buttons = $('#control-ring').children('li');
	buttons.click(function () {
		var $button = $(this);
		if ($button.hasClass("button") && $button.children('span').css("visibility") == "hidden") {
			showRedPoint($button);
			disableOther($button);
			var ajaxObj = $.get("http://localhost:3000/S3/", function(data, status) {
					$button.children('span').html(data.toString());
					recover($button);
					nums.push(data);
					checkValid();
    				console.log("Data: " + data + "\nStatus: " + status);
  				});
			ajaxList.push(ajaxObj);
		}
		
	});
	$.ajaxSetup ({
        cache: false //关闭AJAX缓存
    });
	$('#info-bar').click(function () {
		if (checkValid()) {
			var sum = 0;
			for (var i = 0; i < nums.length; ++i) {
				sum += parseInt(nums[i]);
			}
			$('.sum').html(sum);
			disabledInfo();
		}
	});

	$('#button').hover(function(){
		clearAll();
	});

	$('.apb').click(function () {
		if (gettingNum == false) {
			for (var i = 0; i < buttons.length; ++i)
			loadMessage($(buttons[i]));
		}
		gettingNum = true;
	});
});


function loadMessage ($button) {
	showRedPoint($button);
	var ajaxObj = $.get("http://localhost:3000/S3/", function(data, status) {
		$button.children('span').html(data.toString());
		disabledItself($(this).parent());
		recover($button);
		nums.push(data);
		if (checkValid()) {
			var sum = 0;
			for (var i = 0; i < nums.length; ++i) {
				sum += parseInt(nums[i]);
			}
			$('.sum').html(sum);
			disabledInfo();
		}
    	console.log("Data: " + data + "\nStatus: " + status);
  	});
  	ajaxList.push(ajaxObj);
}

function disabledInfo() {
	$('#info-bar').css("background-color", "#7E7E7E");
	$('#info-bar').css("cursor", "default");
}

function showRedPoint ($button) {
	$button.find('.unread').css("visibility", "visible");
	$button.children('span').html("..");
}

function disabledItself ($button) {
	$button.removeClass('button').addClass('button-disabled');
}

function disableOther ($button) {
	$('li').not($button).removeClass('button').addClass('button-disabled');
}


function recover($button) {
	if ($button) {
		$button.removeClass('button').addClass('button-disabled');
		$('.unread').each(function() {
			if ($(this).html() == '') {
				$(this).parent().removeClass('button-disabled').addClass('button');
				$(this).parent().removeAttr("disabled");
			}
		});
	}
}


function checkValid() {
	flag = true;
	$('.unread').each(function() {
		if ($(this).html() == '' || $(this).html() == '..' ) flag = false;
	});
	if (flag) {
		$('#info-bar').css("background-color", "rgba(48, 63, 159, 1)");
		$('#info-bar').css("cursor", "pointer");
	}
	return flag;
}

function clearAll() {
	for (var i = 0; i < ajaxList.length; ++i) {
		var ajaxObj = ajaxList.pop();
		ajaxObj.abort();
	}
	flag = false;
	gettingNum = false;
	nums = [];
	loadNum = 0;
	$('.unread').css("visibility", "hidden");
	$('.unread').html("");
	$('.sum').html("");
	$('.button-disabled').removeClass('button-disabled').addClass('button');
	$('#info-bar').css("background-color", "#7E7E7E");
	$('#info-bar').css("cursor", "default");
}

// $('#button').attr('disabled',"true");添加disabled属性
// $('#button').removeAttr("disabled"); 移除disabled属性
