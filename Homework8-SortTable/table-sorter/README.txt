可排序网站：
http://soj/courses.php      
http://acm.hust.edu.cn/vjudge/problem/status.action
http://acm.nyist.net/JudgeOnline/status.php


神秘代码（点击th即可进行升序排序，不过也只能升序，因为加判断的话就太长了...）：

$('table').children('thead').find('tr th').each(function () { $(this).click(function () { var thisIndex = $('table').children('thead').find('tr th').index($(this));
s = $('table' + ' tbody').children().sort(function (a, b) {return a.children[thisIndex].innerText.localeCompare(b.children[thisIndex].innerText);});$('table').children('tbody').empty().append(s);});});