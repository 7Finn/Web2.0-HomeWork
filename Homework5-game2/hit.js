var ground, start, timeSpan, scoreSpan, time, score, timer, buttonGroup, state, playing, haveStart;

//palying变量检测当前是否在游戏
//haveStart变量检测是否已经开始了游戏

window.onload = function () {
	init();//初始化游戏，获取所有需要的元素
	start.onclick = function() {
		if (haveStart == false) {
			state.innerHTML = "Playing";
			start.innerHTML = "Pause";
			haveStart = true;
			playing = true;
			var randomNum = Math.floor(Math.random() * (buttonGroup.length - 1));//按下startButton，还没开始游戏时，出现第一个随机的地鼠
			buttonGroup[randomNum + 1].className = "active-mole";				 //因为有多一个开始button，地鼠洞从1开始。
			timer = setInterval(count, 1000);
			for (var i = 1; i < buttonGroup.length; ++i) {
				buttonGroup[i].onclick = function() { hit(this) };
			}	
		} else if (playing == false) {//按下startButton，如果游戏暂停了，则继续游戏。
			state.innerHTML = "Playing";
			start.innerHTML = "Pause";
			playing = true;
			timer = setInterval(count, 1000);
		} else { //按下startButton，如果已经开始了游戏，正在游戏时，则暂停游戏。
			start.innerHTML = "Keep Going";
			state.innerHTML = "Pause";
			playing = false;
			clearInterval(timer);
		}

	}
}

function init() {
	ground = document.getElementById('ground');
	start = document.getElementById('start');
	timeSpan = document.getElementById('time');
	scoreSpan = document.getElementById('score');
	state = document.getElementById('state');
	time = 30;
	score = 0;
	playing = false;
	haveStart = false;
	for (var i = 0; i < 72; ++i) {
		var newButton = document.createElement("button");
		newButton.className = "mole";
		ground.appendChild(newButton);
	}
	buttonGroup = document.getElementsByTagName('button');
}

function startGame() {
	time = 30;
	score = 0;
	timeSpan.innerHTML = 30;
	scoreSpan.innerHTML = 0;
	start.innerHTML = "Start Game";
	state.innerHTML = "Game Over";
	playing = false;
	haveStart = false;
	if (timer) {
		clearInterval(timer); //终止计时器
	}
	for (var i = 1; i < buttonGroup.length; ++i) {
			buttonGroup[i].className = "mole"; //把所有洞都清空
	}
}


function hit(id) {
	if (playing == false) //如果不在游戏中，则不允许点击
		return;
	if (id.className == "mole") {
		score--;
		scoreSpan.innerHTML = score; //按错后时间增加，刷新计时器
	} else {
		score++;
		scoreSpan.innerHTML = score; //打中后分数增加，刷新分数
		id.className = "mole";
		randomNum = Math.floor(Math.random() * (buttonGroup.length - 1)); //随机出现下一个地鼠
		console.log(randomNum + 1);
		buttonGroup[randomNum + 1].className = "active-mole";
	}
}

function count(id) {
	time--;
	timeSpan.innerHTML = time;
	if (time <= 0) {
		timeSpan.innerHTML = "0";
		clearInterval(timer);
		alert("Your score is: " + score);
		startGame();
	}
}