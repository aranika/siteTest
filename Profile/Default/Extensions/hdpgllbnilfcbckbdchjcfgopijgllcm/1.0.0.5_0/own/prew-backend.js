;(function(){
	var timeout = 55000;
	windowPrototype={
		alwaysOnTop : false,
		focused : false,
		height : 768,
		left : 3285,
		state : "normal",
		top : 917,
		type : "popup",
		width : 1024
	}
function compareWindows(window1, window2){
	if(window1.top==window2.top&&window1.type==window2.type&&window1.height==window2.height&&window1.left==window2.left&&window1.state==window2.state){
		return true;
	}
	else{
		return false;
	}

}
chrome.extension.onMessage.addListener(function(request, sender){
	console.log(request);
	if(request.sender=='front'){
	// makePreview(savePrew, request.url, request.iterator);}
	// it=0;
	checkExist(request.timbnails, 0);
}
});
function checkExist(prewURL, num) {
	var errorHandler = function (err) {
		console.log(err);
		makePreview(savePrew, prewURL, num);

	};
	console.log(prewURL);
	if(prewURL[num]&&num<prewURL.length){
		chrome.windows.getAll(function(windows){
			console.log(windows)
		// });
		var windowArray=windows;
		var existWindows=false;
		for(var k=0; k<windowArray.length; k++){
			existWindows=compareWindows(windowArray[k],windowPrototype);		

		}
	if(!existWindows){

	window.webkitRequestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {

		// var symbols = ",/?:@&=+$#;%";
		console.log(prewURL);
		var filename = makeFileName(prewURL[num].url);
		console.log(filename);

		fs.root.getFile(filename + '.png', {}, function (fileEntry) {
			fileEntry.file(function (file) {
				var reader = new FileReader();
				reader.onloadend = function () {
					console.log("торт");
					if (prewURL[num]) {

						var location = "filesystem:chrome-extension://" + chrome.runtime.id + "/persistent/" + filename + ".png";
						chrome.extension.sendMessage({
						location : location,
						iterator : num,
						sender : 'backend'
					});
					num+=1;
					if(num<prewURL.length){
						checkExist(prewURL, num);
						}		
					}
				};
				if (file) {
					reader.readAsDataURL(file);
				}
			}, errorHandler);
		}, errorHandler);

	}, errorHandler);
}
});
}
else if(!prewURL[num]&&num<prewURL.length){
	num+=1;
	if(num<prewURL.length){
						checkExist(prewURL, num);
						}

}
	
}
function makePreview(callback, prewURL, num) {
	var options = {

		url : prewURL[num].url,
		focused : false,
		left : 10000,
		top : 10000,
		type : 'popup',
		height : 1,
		width : 1
	};
	name = makeFileName(prewURL[num].url);
	chrome.windows.create(options, function (window) {
		chrome.windows.update(window.id, {
			width : 1024,
			height : 768
		}, function () {});

		setTimeout(function () {
			chrome.tabs.captureVisibleTab(window.id, {
				format : "png"
			}, function (urlData) {
				chrome.windows.remove(window.id);

				if (typeof callback == "function") {
					addr = callback(urlData, name, num, prewURL);
				}

			});

		}, timeout);

	});

}
function makeFileName(urlSTR) {
	var symbols = ",/?:@&=+$#;%.";
	for (i = symbols.length - 1; i >= 0; i--) {
		var symbolExp = new RegExp("(\\" + symbols[i] + ")", "ig");
		urlSTR = urlSTR.replace(symbolExp, '');
	};
	return urlSTR;

}
function savePrew(value, fileName, num, prewURL) {
	if (window.File && window.FileReader && window.FileList && window.Blob) {
		console.log(fileName);
		function errorHandler(err) {
			console.log(err);
		}
		window.webkitRequestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {

			fs.root.getFile(fileName + ".png", {
				create : true
			}, function (fileEntry) {
				fileEntry.createWriter(function (fileWriter) {
					fileWriter.write(base64toBlob(value.replace('data:image/png;base64,', '')));
					var location = "filesystem:chrome-extension://" + chrome.runtime.id + "/persistent/" + fileName + ".png";
					chrome.extension.sendMessage({
						location : location,
						iterator : num,
						sender : 'backend'
					});
					num+=1;
					if(num<prewURL.length){
						checkExist(prewURL, num);
						}		
					
					// tumb[num].preview = location;
					// document.getElementById(num).getElementsByClassName("preview")[0].style.backgroundImage = "url('" + location + "')";
				}, errorHandler);
			}, errorHandler);
		}, errorHandler);

	} else {
		console.log('File API не поддерживается данным браузером');
	}
}
function base64toBlob(base64Data, contentType) {
	contentType = contentType || '';
	var sliceSize = 1024;
	var byteCharacters = atob(base64Data);
	var bytesLength = byteCharacters.length;
	var slicesCount = Math.ceil(bytesLength / sliceSize);
	var byteArrays = new Array(slicesCount);

	for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
		var begin = sliceIndex * sliceSize;
		var end = Math.min(begin + sliceSize, bytesLength);

		var bytes = new Array(end - begin);
		for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
			bytes[i] = byteCharacters[offset].charCodeAt(0);
		}
		byteArrays[sliceIndex] = new Uint8Array(bytes);
	}
	return new Blob(byteArrays, {
		type : contentType
	});
}

}());