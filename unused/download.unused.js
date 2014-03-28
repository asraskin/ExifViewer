function processRemoteFile(url, outputDiv) {
	try {
		var fileName = 'c:\\tmp.jpg'; 
		var obj_URI = Components.classes["@mozilla.org/network/io-service;1"]
					.getService(Components.interfaces.nsIIOService).newURI(url, null, null);
		//set file with path
		var obj_TargetFile = Components.classes["@mozilla.org/file/local;1"]
							.createInstance(Components.interfaces.nsILocalFile);
		obj_TargetFile.initWithPath( fileName );
		//if file doesn't exist, create
		if(!obj_TargetFile.exists()) {
			obj_TargetFile.create(0x00,0644);
		}

		//new persistence object
		var obj_Persist = Components.classes["@mozilla.org/embedding/browser/nsWebBrowserPersist;1"]
							.createInstance(Components.interfaces.nsIWebBrowserPersist);
		var nsIWBP = Components.interfaces.nsIWebBrowserPersist;

		obj_Persist.persistFlags = 
			nsIWBP.PERSIST_FLAGS_REPLACE_EXISTING_FILES |
			nsIWBP.PERSIST_FLAGS_BYPASS_CACHE |
			nsIWBP.PERSIST_FLAGS_FAIL_ON_BROKEN_LINKS |
			nsIWBP.PERSIST_FLAGS_CLEANUP_ON_FAILURE;
		myProgressListener.url = url;
		myProgressListener.outputDiv = outputDiv;
		myProgressListener.targetFile = obj_TargetFile;
		obj_Persist.progressListener = myProgressListener;     	
		//save file to target
		obj_Persist.saveURI(obj_URI, null, null, null,null, obj_TargetFile);
//        if(obj_TargetFile.exists()) {
//			processFile(fileName, null, outputDiv, false, url)
//			obj_TargetFile.remove(false);
//		} else {
//			alert('Unable to download the remote file');
//		}
*/
   	} catch (e) { alert(e); }


}

var myProgressListener = {
	targetFile : null,
	url : '',
	outputDiv : '',
	onLocationChange : function(webProgress, request, location) {
//		alert('Location: ' + location);
	},
	onProgressChange : function(webProgress, request, curSelfProgress, maxSelfProgress, curTotalProgress, maxTotalProgress) {
//		alert('Progress: ' + curSelfProgress);
		document.getElementById('progress').setAttribute('value', Math.round(100 * (curSelfProgress / maxSelfProgress)) + '%');
		if (curSelfProgress > 200000  ||  curSelfProgress >= maxSelfProgress) {
			request.suspend();
			document.getElementById('progress').setAttribute('value', '100%');
			processFile(this.targetFile.path, null, this.outputDiv, false, this.url)
			this.targetFile.remove(true);
			request.resume();
		}
	},
	onSecurityChange : function(webProgress, request, state) {
//		alert('Security: ' + status);
	},
	onStateChange : function(webProgress, request, stateFlags, status) {
//		alert('State: ' + status);
	},
	onStatusChange : function(webProgress, request, status, message) {
//		alert('Status: ' + status);
	}
};
