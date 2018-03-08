function getParametr(stat_param, default_value) {
	if (!localStorage.getItem(stat_param)) {
		localStorage.setItem(stat_param, default_value);
	};
	var param = localStorage.getItem(stat_param);
	if (param.charAt(0) == '"') {
		param = param.substr(1, (param.length - 2));
	};
	return param;
};

var fromValue = 'dist_topsite';
var vb={
	clid1: '2276905',
	clid7: '2276906',
	clid8: '2276907'
}
	function makeWin(){
		var startTime = new Date(Date.parse("2 Jan 2012 00:00:01"));
		var start = Date.parse(startTime)
		var currentTime = new Date();
		var current = Date.parse(currentTime);
		currentWin = Math.floor((current - start) / (86400000 * 7) + 1);
		return currentWin
	}

;(function () {

	var clid=getParametr('yandex.statistics.clid.8', vb.clid8);
	var win=getParametr('yandex.statistics.win', makeWin());

	

	function prepareText(searchText) {
		var symbols = ",/?:@&=+$#%";
		for (i = symbols.length - 1; i >= 0; i--) {
			var symbolExp = new RegExp("(\\" + symbols[i] + ")", "ig");
			searchText = searchText.replace(symbolExp, encodeURIComponent(symbols[i]));
		}
		searchText = searchText.replace(/( ){1,}/g, encodeURIComponent(" "));
		searchText = (searchText.length > 301) ? searchText.substring(0, 300) : searchText;
		return searchText
	}
	function search(question){
		// clid = '123';
		// win = '321';
		// console.log(getParametr('yandex.statistics.clid.1', '34321'));

		chrome.tabs.getCurrent(function (tab) {
		var newUrl = 'https://www.yandex.ru/?clid=' + clid + "&win=" + win + '&from=' + fromValue;
		if (question) {
			question = prepareText(question);
			newUrl = 'https://www.yandex.ru/search/?text=' + question + '&clid=' + clid + "&win=" + win + '&from=' + fromValue;
			chrome.tabs.update(tab.id, {
				url : newUrl
				});
			}

		});

	}

	document.addEventListener("DOMContentLoaded", function () {

		var input = document.getElementById("YandexSearch");
		document.onkeydown=function (e) {
			console.log(e.keyCode);
			if(e.keyCode==27){
				document.getElementById("help").innerHTML = "";
				input.value='';
			}
			input.focus();

		};

		$('input').keydown(function (e) {
			var $listItems = $('li');
			var key = e.keyCode,
			index,
			$selected = $listItems.filter('.suggest-active'),
			$current;

			if (key != 40 && key != 38)
				return;

			$listItems.removeClass('suggest-active');
			$listItems.addClass('suggest');
			if (key == 40) // Down key
			{
				if (!$selected.length || $selected.is(':last-child')) {
					$current = $listItems.eq(0);
				} else {
					$current = $selected.next();
				}
				e.preventDefault();
			} else if (key == 38){ // Up key
				if (!$selected.length || $selected.is(':first-child')) {
					$current = $listItems.last();
					} else {
						$current = $selected.prev();
					}
					e.preventDefault();
				}

			$current.addClass('suggest-active');
			if($current[0].innerHTML.indexOf('<span id="place">')+1){
						input.value=$current[0].innerHTML.substring(0, ($current[0].innerHTML.indexOf('<span id="place">')-1));
					}
					else{
						input.value=$current[0].innerHTML;
					}

			});
		$('ul').mouseover(function () {
			$('li').mouseover(function () {

				index = $(this).index();

			});

		});

		$('ul').mousemove(function () {
			$('li').mouseover(function () {
				var $listItems = $('li');
				$selected = $listItems.filter('.suggest-active');
				$current = $selected;
				if ($selected.index() != index) {
					$selected.removeClass('suggest-active');
					$selected.addClass('suggest');
					$current = $listItems.eq(index);
					$current.addClass('suggest-active');
					if($current[0].innerHTML.indexOf('<span id="place">')+1){
						input.value=$current[0].innerHTML.substring(0, ($current[0].innerHTML.indexOf('<span id="place">')-1));
					}
					else{
						input.value=$current[0].innerHTML;
					}
					// console.log($current[0].innerHTML);
					// input.value=$selected.text;
				}
			});

		});
		$('ul').click(function () {

			var searchTerms = input.value;
			var $listItems = $('li');
				$selected = $listItems.filter('.suggest-active');
				if ($selected.index() != 0) {
					searchTerms = $selected.text();
				}
			search(searchTerms);
		});
		input.oninput = function () {
			var part = input.value;

			{
					if (part.length >= 400) {
						part = part.substring(0, 399)
					}

					var xhr = new XMLHttpRequest();

					xhr.open("GET", "http://suggest.yandex.ru/suggest-ff.cgi?part=" + part + "&fact=1&uil=" + chrome.i18n.getMessage("locale"), true);

					xhr.onreadystatechange = function () {
						if (xhr.readyState == 4) {

							var data = xhr.responseText;

							if (data) {
								document.getElementById("help").innerHTML = '';
								console.log(data);
								var suggest = (JSON.parse(data))[1];
								console.log(suggest);
								console.log(suggest.length);

								if (suggest.length > 5) { ;
									suggest = suggest.slice(0, 4);
								}

								var list = new Array(suggest.length);
								if (input.value) {
									suggest.unshift(input.value);
								} 
								// document.getElementById("help").setAttribute("size", suggest.length);

								for (var i = 0; i < suggest.length; i++) {

									// document.getElementById("help").style.height = document.getElementById("help").style.height + 40;
									if (i == 0) {
										document.getElementById("help").innerHTML += "<li class='suggest-active'  id='suggest" + i + "'>" + suggest[i] + " " + "<span id='place'>" + "– " + "Найти в Яндексе" + "</span></li>";
									} else {

										document.getElementById("help").innerHTML += "<li class='suggest'  id='suggest-" + i + "'>" + suggest[i] + "</li>";
									}
								}
							}
						} 

					}

					xhr.send();
				}
			}
		$().click
		$('#button').click(function (){
			var searchTerms = input.value;
			search(searchTerms);
		});

		$('#MainForm').submit(function (){

			var searchTerms = input.value;
			var $listItems = $('li');
			$selected = $listItems.filter('.suggest-active');
			if ($selected.index() != 0) {
				searchTerms = $selected.text();
			}
			search(searchTerms);

		});

	});

}());