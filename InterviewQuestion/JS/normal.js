function showHint(t) {
	var style = window.getComputedStyle(t.nextSibling.nextSibling);
	if (style.display === "none") {
		t.nextSibling.nextSibling.style.display = "block";
		t.innerHTML = "点击关闭答案";
	} else {
		t.nextSibling.nextSibling.style.display = "none";
		t.innerHTML = "点击显示答案";
	}
}

lis = document.getElementsByTagName('li');
bkArr = ["#fff","gray","#fffde7"];
lastIndex = lis[0];
for (var i = 0; i < lis.length; i++) {
	(function (i) {
		lis[i].onclick = function () {
			lastIndex.style.color = "#009688";
			lastIndex = this;
			document.body.style.backgroundColor = bkArr[i];
			this.style.color = "#fff";
		}
	})(i);
}