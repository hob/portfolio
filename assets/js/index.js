var selectedTab;
function onLoad() {
	$(window).hashchange(onHashChange);
	$(window).hashchange();
}
function onHashChange() {
	parseHash();
	var allTabs = $('nav a');
	var tabId = document.hashData.tabId;
	if(!tabId) {
		tabId = allTabs[0].getAttribute('href');
	}
	if(selectedTab == tabId) return;
	selectedTab = tabId;
	loadTabContent(selectedTab.replace("#",""));
}
function loadTabContent(tabContentURL) {
	$('#contentPane').load(tabContentURL);
}
function parseHash() {
	var tabId=null;
	var path=null;
	var query=null;
	if(location.hash != '') {
		var hashParts = location.hash.split('?');
		if(hashParts.length > 1) {
			query = createQueryMap(hashParts[1]);
		}
		var pathParts = hashParts[0].split('/');
		if(pathParts.length > 1) {
			path = pathParts[1];
		}
		tabId = pathParts[0];
	}
	document.hashData = {tabId:tabId,path:path,query:query};
}
function createQueryMap(query) {
	var args = query.split('&');
	var map = {};
	for(var i=0;i<args.length;i++) {
		var arg = args[i].split('=');
		map[arg[0]] =arg[1];
	}
	return map;
}