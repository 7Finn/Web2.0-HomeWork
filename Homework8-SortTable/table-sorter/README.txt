��������վ��
http://soj/courses.php      
http://acm.hust.edu.cn/vjudge/problem/status.action
http://acm.nyist.net/JudgeOnline/status.php


���ش��루���th���ɽ����������򣬲���Ҳֻ��������Ϊ���жϵĻ���̫����...����

$('table').children('thead').find('tr th').each(function () { $(this).click(function () { var thisIndex = $('table').children('thead').find('tr th').index($(this));
s = $('table' + ' tbody').children().sort(function (a, b) {return a.children[thisIndex].innerText.localeCompare(b.children[thisIndex].innerText);});$('table').children('tbody').empty().append(s);});});