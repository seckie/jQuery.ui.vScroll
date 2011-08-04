/*
 * LineNumberWriter 0.4.1
 * http://likealunatic.jp/2008/04/04_linenumberwriter.php
 * Author: Naoki Sekiguchi (http://likealunatic.jp)
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Since:    2007-04-04
 * Modified: 2009-10-15
 */

var LNW;
if (!LNW) LNW = {};

// Initial Setting [Start]-------------------------- //

// [1] - length of white space for "tab"
LNW.tabSpace = 4;

// Initial Setting [End]---------------------------- //

LNW.getTab = function() {
	var s = "";
	for (var i = 0, l = LNW.tabSpace; i < l; i ++) s += "&nbsp;";
	return s;
}

LNW.changeDisp = function(ele, target) {
	var e = ele.parentNode.parentNode;
	if (target == "withlinenumber") {
		e.getElementsByTagName("div")[0].style.display = "none";
		e.getElementsByTagName("div")[1].style.display = "block";
		e.getElementsByTagName("ol")[0].style.display = "block";
		e.getElementsByTagName("pre")[0].style.display = "none";
	} else if (target == "plaintext") {
		e.getElementsByTagName("div")[0].style.display = "block";
		e.getElementsByTagName("div")[1].style.display = "none";
		e.getElementsByTagName("ol")[0].style.display = "none";
		e.getElementsByTagName("pre")[0].style.display = "block";
	} else return;
}

LNW.nodeToString = function(nodeList) {
	var str = "";
	if (!nodeList.length) return str;

	for (var i = 0, l = nodeList.length; i < l; i ++) {
		if (nodeList[i].nodeType == 3) { // for Text Nodes 
			var s = nodeList[i].nodeValue;
			s = s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;").replace(/ /g, "&nbsp;").replace(/\t/g, LNW.getTab());
			str += s;
		} else if (nodeList[i].nodeType == 1) { // for Element Nodes
			var eleName = nodeList[i].nodeName;	
			if(nodeList[i].outerHTML) { // for exclude Firefox 
				var tagOpen = nodeList[i].outerHTML.match(/<[^>]+>/);
				str += tagOpen;
				str += arguments.callee(nodeList[i].childNodes);
				str += '</' + eleName + '>';
			} else { // for Firefox that doesn't support "outerHTML" property 
				var eleText = '<' + eleName;
				var attrs = nodeList[i].attributes;
				for (var i2 = 0, l2 = attrs.length; i2 < l2; i2 ++) {
					eleText += ' ';
					eleText += attrs.item(i2).nodeName;
					eleText += '="';
					eleText += attrs.item(i2).nodeValue;
					eleText += '"';
				}
				eleText += '>';
				str += eleText;
				str += arguments.callee(nodeList[i].childNodes);
				eleText = '</';
				eleText += eleName;
				eleText += '>';
				str += eleText;
			}
		} else continue;
	}
	return str;
}

LNW.write = function() {
	var str = "";
	var preEle = [], codeEle = [];
	var preEleAll = document.getElementsByTagName("pre");
	for (var i = 0, l = preEleAll.length; i < l; i ++) {
		var ele = preEleAll[i].getElementsByTagName("code");
		if (ele[0]) {
			preEle.push(preEleAll[i]);
			codeEle.push(ele[0]);
		}
	}
	for (var i = 0, l = codeEle.length; i < l; i ++) {
		var div = document.createElement("div");
		div.id = "LNW" + [i];
		div.className = "LNW";
		var ol = document.createElement("ol");
		var pre = codeEle[i].parentNode.cloneNode(true);
		pre.style.display = "none";
		
		// create Header section
		var headDiv1 = document.createElement("div");
		headDiv1.className = "header";
		var headDiv2 = document.createElement("div");
		headDiv2.className = "header";
		var a1 = document.createElement("a");
		a1.href = "#";
		a1.className = "ctrl1";
		a1.innerHTML = "with line number";
		var a2 = document.createElement("a");
		a2.href = "#";
		a2.className = "ctrl2";
		a2.innerHTML = "plain text";
		a1.onclick = function() {
			LNW.changeDisp(this, "withlinenumber");
			return false;
		}
		a2.onclick = function() {
			LNW.changeDisp(this, "plaintext");
			return false;
		}
		var span1 = document.createElement("span");
		span1.className = "ctrl1";
		span1.innerHTML = "with line number";
		var span2 = document.createElement("span");
		span2.className = "ctrl2"
		span2.innerHTML = "plain text";
		headDiv1.appendChild(a1);
		headDiv1.appendChild(span2);
		headDiv1.style.display = "none";
		headDiv2.appendChild(span1);
		headDiv2.appendChild(a2);
		div.appendChild(headDiv1);
		div.appendChild(headDiv2);
		
		// create "with Line Number" code section
		var node = codeEle[i].childNodes;
		str = LNW.nodeToString(node);
		str = str.replace(/\r?\n/g, "\r");

		var line = str.split("\r");
		for (var i2 = 0, l2 = line.length; i2 < l2; i2 ++) {
			if (line[i2] == "") line[i2] = "&nbsp;";
			var li = document.createElement("li");
			li.innerHTML = line[i2];
			ol.appendChild(li);
		}

		// an Odd Number Line or an Even Number Line
		li = ol.getElementsByTagName("li");
		for (var i2 = 0, l2 = li.length; i2 < l2; i2 ++) {
			var j = i2 % 2;
			if (j == 0) li[i2].className = "odd";
			else if (j == 1) li[i2].className = "even";
			else continue;
		}
		
		// publish
		div.appendChild(ol);
		div.appendChild(pre);
		preEle[i].parentNode.replaceChild(div, preEle[i]);
		str = "";
	}
};
