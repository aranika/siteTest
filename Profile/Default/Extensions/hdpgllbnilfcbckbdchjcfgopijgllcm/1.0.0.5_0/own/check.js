function paeseURL(str){
	var url=new Object();
	if(str.indexOf('://')+1){
		url.protocol=str.substring(0, str.indexOf('://'));
		str=str.substring((str.indexOf('://')+3), str.length);
	}
	if(str.indexOf('/')+1){
		url.domain=str.substring(0, str.indexOf('/'));
		str=str.substring((str.indexOf('/')+1), str.length);
		if(str.indexOf('#')+1){
			url.hash=str.substring((str.indexOf('#')+1), str.length);
			str=str.substring(0, (str.indexOf('#')-1));

		}
		if(str.indexOf('?')+1){
			url.search=str.substring((str.indexOf('?')+1), str.length);
			str=str.substring(0, (str.indexOf('?')-1));

		}
		if(str){
			url.path=str;
		}
	}
	else{
		url.domain=str;
	}
	if(url.domain.indexOf(':')+1){
		url.domain=url.domain.substring(0, url.domain.indexOf(':')-1);
		url.port=url.domain.substring((url.domain.indexOf(':')+1), url.domain.length);
	}
	if(url.domain.indexOf('www')+1){
		url.domain=url.domain.substring((url.domain.indexOf('www')+3), url.domain.length);
	}
	var split=url.domain.split('.');
	if(split.length>2){
		url.domain=split[split.length-2]+'.'+split[split.length-1];
		split.splice((split.length-2),2);
		url.subdomain=split.join('');
		if(url.subdomain==''){
			delete url.subdomain;
		}
	}
	return url
}
function equalURL(urlObj1, urlObj2){
	if((urlObj1.domain==urlObj2.domain)&&(urlObj1.subdomain==urlObj2.subdomain)&&(urlObj1.path==urlObj2.path)){
		return true
	}
	else{
		return false
	}

}

