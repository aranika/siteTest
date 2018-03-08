(function(){
			function checkExist(callback, prewURL, tabObject) {
			var errorHandler = function (err) {
				console.log(err);
				makePreview(callback, prewURL, tabObject);
			};
			

			window.webkitRequestFileSystem(window.PERSISTENT, 1024 * 1024, function (fs) {
				
				// var symbols = ",/?:@&=+$#;%";
			var filename = makeFileName(prewURL);
				console.log(filename);

				fs.root.getFile(filename + '.png', {}, function (fileEntry) {
					fileEntry.file(function (file) {
						var reader = new FileReader();
						reader.onloadend = function () {
							// console.log("торт");
						};
						if (file) {
							reader.readAsDataURL(file);
						}
					}, errorHandler);
				}, errorHandler);
			}, errorHandler);
		}
		function makePreview(callback, prewURL, tabObject) {
			var options = {
				
				url : prewURL,
				focused : false,
				left:10000,
				top:10000,
				type : 'popup',
				height:1,
				width:1
			};
			prewURL=makeFileName(prewURL);
			// chrome.windows.create(options, function (window) {
				// chrome.windows.update(window.id, { width:1024,
                // height:768}, function (){});
				

				// setTimeout(function () {
					chrome.tabs.captureVisibleTab(tabObject.windowId, {
						format : "png"
					}, function (urlData) {
						// chrome.windows.remove(window.id);
						// console.log(urlData);

						if (typeof callback == "function") {
							addr = callback(urlData, prewURL);
						}

					});

				// }, 50);

			// });

		}
		function makeFileName(urlSTR){
			var symbols = ",/?:@&=+$#;%.";
			for (i = symbols.length - 1; i >= 0; i--) {
					var symbolExp = new RegExp("(\\" + symbols[i] + ")", "ig");
					urlSTR = urlSTR.replace(symbolExp, '');
				};
				return urlSTR;

		}
		function savePrew(value, fileName) {
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
		chrome.tabs.onUpdated.addListener(function(tabID, info, tab) {
			// console.log(tab);
    if (info.status == "complete") {
    	chrome.topSites.get(function (sites) {
    		for (var i = 0; i < sites.length; i++) {
    			if(tab.url==sites[i].url){    	
    				tabObj=tab;
    		    	checkExist(savePrew, tab.url, tabObj);
    		    	// console.log(info)

    			}
    		}

;

    });
    }
});



}());