var yasoft = "vb-comm";
var extvalue = "vbch.Commertial#";
var prev = '';
var dom_list = ["yandex.ru", "yandex.kz", "yandex.ua", "yandex.by", "yandex.com", "yandex.com.tr", "ya.ru"];
var cookie_domain = '.chrome-elements.yandex.addons';
var fromValue = 'dist_topsite';
var vb={
	clid1: '2276905',
	clid7: '2276906',
	clid8: '2276907'
};
var default_ui = 'none';
var default_clid1 = vb.clid1;


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

// 	chrome.tabs.captureVisibleTab(window.id, {format:"png"}, function (data){
// 		console.log(data);
// });
