;
(function () {
	var srvCol = 5;
	document.addEventListener("DOMContentLoaded", function () {
		function setTumb(title, url, k, pinnState, prewImg) {
			document.getElementById(k).getElementsByClassName("topName")[0].innerHTML = title;
			// document.getElementById(k).innerHTML = '<a href="' + url + '" class="ref">' + document.getElementById(k).innerHTML + '</a>';
			document.getElementById("favicon" + k).style.backgroundImage = "url('https://favicon.yandex.net/favicon/" + url.slice(url.indexOf('://') + 3, -1);
			 + "')";
			document.getElementsByClassName("topSite")[k].style.visibility = 'visible';
			document.getElementById(k).addEventListener('click', function (e) {
				// console.log(e.toElement);
				if (e.target.className != 'pin' && e.target.className != "remove remove-hover") {
					open(url, '_self');
				}

			});
			var visible = '';
			if (pinnState !== false) {
				visible = 'visible';
				pinnState = 1;
			}
			document.getElementsByClassName("topSite")[k].firstChild.getElementsByClassName("pin")[0].style.visibility = visible;
			document.getElementsByClassName("topSite")[k].firstChild.getElementsByClassName("pin")[0].style.opacity = pinnState;
		}
		function checkURL(array, link) {
			// console.log(array +'-'+ link);
			for (var i = 0; i < array.length; i++) {
				if (array[i] && equalURL(paeseURL(link), paeseURL(array[i].url))){
					return i
				}
			}
			return false
		}

		function setBackground(num, imgLocation) {
			tumb[num].preview = imgLocation;
			document.getElementById(k).getElementsByClassName("preview")[0].style.backgroundImage = "url('" + prewImg + "')";

		}

		function makeFileName(urlSTR){
			var symbols = ",/?:@&=+$#;%.";
			for (i = symbols.length - 1; i >= 0; i--) {
					var symbolExp = new RegExp("(\\" + symbols[i] + ")", "ig");
					urlSTR = urlSTR.replace(symbolExp, '');
				};
				return urlSTR;

		}

		function checkExist(prewURL) {
			chrome.extension.sendMessage({
				timbnails : prewURL,
				// iterator : num,
				sender : 'front'
			});
			chrome.extension.onMessage.addListener(function (request, sender) {
				if (request.sender == 'backend') {
					tumb[request.iterator].preview = request.location;
					document.getElementById(request.iterator).getElementsByClassName("preview")[0].style.backgroundImage = "url('" + request.location + "')";
					setTumb(tumb[request.iterator].title, tumb[request.iterator].url, request.iterator, tumb[request.iterator].pinned, tumb[request.iterator].prewiew);
				}
			});

		}
		function drawTumbs(){
			
		chrome.topSites.get(function (sites) {
		var topSites = sites;
		console.log(pinnedSites.length)
		for(var i = 0; i < Math.min(8, pinnedSites.length); i++){
			if(pinnedSites[i]&&(pinnedSites[i].url===Yandex[0].url)){
				for(var j = 0; j < Math.min(8, topSites.length); j++){
					if(equalURL(paeseURL(topSites[j].url), paeseURL(pinnedSites[i].url)) === true){
						pinnedSites[i].url=topSites[j].url;
						localStorage.setItem('pinnedSites', JSON.stringify(pinnedSites));
					}
				}
			}

			
			
		}
			tumb.splice(0,tumb.length);
			for (var i = 0; i < pinnedSites.length; i++) {

			if (pinnedSites[i] != null) {
				tumb[pinnedSites[i].pinned] = pinnedSites[i];

			}
		}

			
			for (var i = 0; i < Math.min(8, topSites.length); i++) {
				if ((checkURL(pinnedSites, topSites[i].url) === false) && (checkURL(blackList, topSites[i].url) === false) && checkURL(tumb, topSites[i].url)===false) {
					for (var j = 0; j < 8; j++) {
						if (!tumb[j]) {
							tumb[j] = topSites[i];
							tumb[j].pinned = false;
							j = 8;
						}
					}
				}
			}
			// var iterator=0;
			chrome.extension.sendMessage({tumb, sender:'front'});
			checkExist(tumb, i);


			for (var i = 0; i < 8; i++) {
				if (tumb[i]) {
					setTumb(tumb[i].title, tumb[i].url, i, tumb[i].pinned);
				}
				else {
					document.getElementById(i).style.visibility = 'hidden';
				}
			}


		});
		}

		var clid7 = getParametr('yandex.statistics.clid.7', vb.clid7);
		var win=getParametr('yandex.statistics.win', makeWin());

		var Yandex = new Array({
				title : "Яндекс",
				url : 'https://www.yandex.ru/?from=' + fromValue + '&clid=' + clid7+'&win='+win,
				pinned : "0"
			});

		var pinnedSites = new Array();
		pinnedSites = JSON.parse(getParametr('pinnedSites', JSON.stringify(Yandex)));
		var blackList = new Array();
		if (getParametr('blackList', '')) {
			blackList = JSON.parse(getParametr('blackList', '[{}]'));
		}
		if(window.innerWidth<1057){
			document.getElementById("logo").style.visibility='hidden';

		}
		else{
			document.getElementById("logo").style.visibility='visible';
		document.getElementById("logo").parentNode.href = Yandex[0].url;
	}
	window.onresize=function(){	console.log('res');	if(window.innerWidth<1057){
			document.getElementById("logo").style.visibility='hidden';

		}
		else{
			document.getElementById("logo").style.visibility='visible';

		// document.getElementById("logo").parentNode.href = Yandex[0].url;
	}};
		var tumb = new Array(); 
		drawTumbs();

		for (var i = 0; i < srvCol; i++) {
			document.getElementsByClassName("service_net")[i].addEventListener('mouseover', function () {
				this.firstChild.className += " btn-hover";
			});
			document.getElementsByClassName("service_net")[i].addEventListener('mouseout', function () {
				this.firstChild.className = "btn";
			});
		}
		for (var i = 0; i < 8; i++) {
			document.getElementsByClassName("topSite")[i].addEventListener('mouseover', function () {
				this.firstChild.className += " preview-hover";
				this.firstChild.firstChild.className += " control-hover";
				this.lastChild.className += " remove-hover";

				// console.log(this.firstChild);
			});
			document.getElementsByClassName("topSite")[i].addEventListener('mouseout', function () {
				this.firstChild.className = "preview";
				this.firstChild.firstChild.className = "control";
				this.lastChild.className = "remove";
			});
			document.getElementsByClassName("pin")[i].addEventListener('click', function (e) {
				// console.log(e);
				if (tumb[Number(e.path[3].id)].pinned !== false) {
					e.target.style.visibility = '';
					e.target.style.opacity = '';
					tumb[Number(e.path[3].id)].pinned = false;
					pinnedSites.splice([Number(e.path[3].id)],1);
					localStorage.setItem('pinnedSites', JSON.stringify(pinnedSites));
				} else {
					e.target.style.visibility = 'visible';
					e.target.style.opacity = 1;

					tumb[Number(e.path[3].id)].pinned = Number(e.path[3].id);
					pinnedSites[pinnedSites.length] = tumb[Number(e.path[3].id)];
					// console.log(pinnedSites);
					localStorage.setItem('pinnedSites', JSON.stringify(pinnedSites));
				}
				// e.target.style.visibility = 'hidden';
			});
			document.getElementsByClassName("remove")[i].addEventListener('click', function (e) {
				console.log(e);
				if (tumb[Number(e.path[1].id)]) {
					var siteNum = checkURL(pinnedSites, tumb[Number(e.path[1].id)].url);
					if (siteNum !==false) {
						pinnedSites.splice(siteNum, 1);
						localStorage.setItem('pinnedSites', JSON.stringify(pinnedSites));
						this.parentNode.firstChild.firstChild.firstChild.style.visibility = '';
						this.parentNode.firstChild.firstChild.firstChild.style.opacity = '';

					}
					// var blackList=new Array();
					// blackList=JSON.parse(getParametr('blackList', JSON.stringify('{}')));
					blackList.push(tumb[Number(e.path[1].id)]);
					localStorage.setItem('blackList', JSON.stringify(blackList));
					// tumb.splice([Number(e.path[1].id)], 1);
					drawTumbs();


				}

			});

		}
	});

}
	());
