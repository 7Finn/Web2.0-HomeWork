var startDiv, endDiv, walls, inRoad, inMaze, maze, cheated, testCheatedDiv, show;

window.onload = function () {
	init();//初始化变量，获取所有需要的元素
	startDiv.onmouseover = function(e) {
		start();
	};
	maze.onmouseover = function(e) {
		e = window.event || e;
    	var s = e.fromElement || e.relatedTarget;
    	if (document.all) {    //判断浏览器是否为IE,如果存在document.all则为IE
    	    if (!this.contains(s)) {    // 判断调用onmouseover的对象(this)是否包含自身或子级，如果包含，则不执行
    	        // console.log('IE will over');
    	    }    
    	} else {    //标准浏览器下的方法
    	    var reg = this.compareDocumentPosition(s);
    	    if (!(reg == 20 || reg == 0)) {
    	        // console.log('Browser will over');
    	        inMaze = true;
    	    }
    	}
	}
	maze.onmouseout = function(e) {
		e = window.event || e;
        var s = e.toElement || e.relatedTarget;
        if(document.all) {
            if (!this.contains(s)) {
                // console.log('IE will out');
                inMaze = false;
				clear();
            }
        } else {
            var reg = this.compareDocumentPosition(s);
            if (!(reg == 20 || reg == 0)) {
                // console.log('Browser will out');
                inMaze = false;
				clear();
            }
        }

	}
	endDiv.onmouseover = function(e) {
		end();						//触碰E结束游戏
	}
	testCheatedDiv.onmouseover = function(e) {
		noCheated();				//检测作弊块
	}
	for (var i = 0; i < walls.length; ++i) {
		walls[i].onmouseover = function(e) {
			change(this, e);		//把墙壁变红色
		};
	}
}

function init() {
	startDiv = document.getElementById('start-div');
	endDiv = document.getElementById('end-div');
	maze = document.getElementById('maze');
	show = document.getElementById('show');
	testCheatedDiv = document.getElementById('testCheated');
	walls = getByClass(document, "wall");
	inRoad = false;
	inMaze = false;
	cheated = true;
}

function noCheated() {
	if (inRoad) {
		cheated = false;
	}
}

function change(id, event) {
	if (inRoad) {
		id.className = "red-wall";
		var newText = document.createTextNode("You Lose!!");
		show.className = "show";
		show.appendChild(newText);
		cheated = false;
		inRoad = false;
	}
}

function end() {
	if (inRoad && !cheated) {
		var newText = document.createTextNode("You Win!!");
		show.className = "show";
		show.appendChild(newText);
		cheated = false;
		inRoad = false;
	} else if (inRoad && cheated) {
		var newText = document.createTextNode("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
		show.className = "show";
		show.appendChild(newText);
		cheated = false;
		inRoad = false;
	}
}

function start() {
	inRoad = true;
	cheated = true;
	clear();
	show.innerHTML = "";
}

function clear() {
	for (var i = 0; i < walls.length; ++i) {
		walls[i].className = "wall";
	}
}

//在父元素里面找class元素
function getByClass(oParent, sClass) {
    var aEle = oParent.getElementsByTagName('*');
    var aResult = [];
    var re = new RegExp('\\b'+sClass+'\\b', 'i');
    var i = 0;

    for (i = 0; i < aEle.length; i++) {
        if (re.test(aEle[i].className)) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
}
