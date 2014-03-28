if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Moz)  AlanSRaskin.ExifViewer.Moz = {};

AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator = null;

AlanSRaskin.ExifViewer.Moz.startDisplay = function () {
	var fileName;
//	var document = AlanSRaskin.ExifViewer.Overlay.exifasr_window.document;
	var sb = document.getElementById('statusbar');
	var pb = document.getElementById('progressbar');
	if (pb)  pb.setAttribute('mode', 'undetermined');
	AlanSRaskin.ExifViewer.Base.clearTexts('outputDiv');
	if (document.getElementById('remote_file').value != '') {
		if (sb)  sb.setAttribute('label', AlanSRaskin.ExifViewer.Moz.getPString('processingRemoteURL')); 
		fileName = document.getElementById('remote_file').value;
	} else {
		if (sb)  sb.setAttribute('label', AlanSRaskin.ExifViewer.Moz.getPString('processingLocalFile')); 
		fileName = document.getElementById('local_file').value;
	}

	if (fileName.indexOf('file://') == 0) {
		if (!AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator)  AlanSRaskin.ExifViewer.Moz.setExifDirectorySeparator();
		var re1 = new RegExp('^file://(localhost|127.0.0.1)?', '')
		var re2 = new RegExp('/', 'g'); 
		var re3 = new RegExp('^/([a-zA-Z]:)', ''); 
		fileName = window.decodeURI(fileName.replace(re1, '').replace(re3, '$1').replace(re2, AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator));
	}

	try {
		AlanSRaskin.ExifViewer.Base.processFile(fileName, null, 'outputDiv', !document.getElementById('maker').checked, document.getElementById('image').checked, document.getElementById('basic').checked, document.getElementById('tables').checked, document.getElementById('tagid').checked);
	} catch (e) {
/*
		var output = [];
		for (var a in e) {
			output.push(a + ': ' + e[a]);
		}
		alert(e + '\n' + output.join('\n'));
*/
		var handled = false;
		if (typeof e === 'string') {
			window.alert(e);
			handled = true;
		} else if (e.name  &&  e.name == 'NS_ERROR_FAILURE'  &&  e.location) {
			var location = e.location.toString();
			if (location.indexOf('read8') != -1) {
				AlanSRaskin.ExifViewer.Moz.alert(AlanSRaskin.ExifViewer.Moz.getPString('networkError'));
				handled = true;
			} else if (location.indexOf('readByteURLMoz') != -1) {
				window.alert(AlanSRaskin.ExifViewer.Moz.getPString('connectionError'));
				handled = true;
			}
		} 
		if (!handled) {
			window.alert(AlanSRaskin.ExifViewer.Moz.getPString('errorNotification'));
			var message = '' 
					+ (e.result			? 'Result:        ' + '0x' + e.result.toString(16) + '\n' : '')
					+ (e.name			? 'Name:          ' + e.name + '\n' : '')
					+ (e.message		? 'Message:       ' + e.message + '\n' : '')
					+ (e.fileName		? 'File name:     ' + e.fileName + '\n' : '')
					+ (e.filename		? 'File name:     ' + e.filename + '\n' : '')
					+ (e.lineNumber		? 'Line number:   ' + e.lineNumber + '\n' : '')
					+ (e.linenumber		? 'Line number:   ' + e.linenumber + '\n' : '')
					+ (e.columnNumber	? 'Column number: ' + e.columnNumber + '\n' : '')
					+ (e.columnnumber	? 'Column number: ' + e.columnnumber + '\n' : '')
					+ (e.location		? 'Location:      ' + e.location + '\n' : '')
					+ (e.data			? 'Data:          ' + e.data + '\n' : '')
					+ (e.inner			? 'Inner:         ' + e.inner + '\n' : '')
					+ (e.stack			? 'Stack:         ' + e.stack + '\n' : '');
			if (window.confirm(message + '\n' + AlanSRaskin.ExifViewer.Moz.getPString('copyToClipboard'))) {
				AlanSRaskin.ExifViewer.Moz.copyToClipboard(message);
			}
		} 
	}
//	AlanSRaskin.ExifViewer.Moz.resizeOutputDiv()
	if (sb)  sb.setAttribute('label', AlanSRaskin.ExifViewer.Moz.getPString('done')); 
	if (pb)  pb.setAttribute('mode', 'determined');
	if (pb)  pb.setAttribute('value', '0');
	if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz)  AlanSRaskin.ExifViewer.Moz.fixDiv('outputDiv');
}	// startDisplay()

AlanSRaskin.ExifViewer.Moz.resizeOutputDiv = function () {	// needed for FF3?
	var ele = document.getElementById('outputDiv');
	ele.style.display = 'none';
	var tmp = ele.offsetTop;
	var tmp2 = window.innerHeight;
	ele.style.height = (tmp2 - tmp - 45) + 'px';
	ele.style.display = 'block';
//	alert(tmp + '\n' + tmp2 + '\n' + ele.style.height);
}     // resizeOutputDiv()

//window.onresize = AlanSRaskin.ExifViewer.Base.resizeOutputDiv;

AlanSRaskin.ExifViewer.Moz.pickFile = function () {
	var nsIFilePicker = Components.interfaces.nsIFilePicker;
	var fp = Components.classes["@mozilla.org/filepicker;1"]
				.createInstance(nsIFilePicker);
	fp.init(window, AlanSRaskin.ExifViewer.Moz.getPString('selectFile'), nsIFilePicker.modeOpen);
	fp.appendFilter(AlanSRaskin.ExifViewer.Moz.getPString('jpegFiles'), AlanSRaskin.ExifViewer.Moz.getPString('jpegExtensions'));
	fp.appendFilters(nsIFilePicker.filterImages);
//	fp.appendFilters(nsIFilePicker.filterHTML | nsIFilePicker.filterImages | nsIFilePicker.filterText | nsIFilePicker.filterAll);
	var res = fp.show();
	if (res == nsIFilePicker.returnOK) {
		var thefile = fp.file;
  		document.getElementById('local_file').value = thefile.path;
		AlanSRaskin.ExifViewer.Base.clearText('fileDiv');
		AlanSRaskin.ExifViewer.Base.displayText(AlanSRaskin.ExifViewer.Base.cleanExifStringData(thefile.path), 'fileDiv');
		AlanSRaskin.ExifViewer.Moz.saveTheURL();
		AlanSRaskin.ExifViewer.Moz.clearURL();
//		AlanSRaskin.ExifViewer.Moz.disableMainButton(false);
	}
}	// pickFile()

/*
AlanSRaskin.ExifViewer.Moz.printOutput() {
	var frame = document.getElementById("outputDiv");
	var req = frame.QueryInterface(Components.interfaces.nsIInterfaceRequestor);
	var wbprint = req.getInterface(Components.interfaces.nsIWebBrowserPrint);
	var settings = PrintUtils.getPrintSettings(); // from chrome://global/content/printUtils.js
	wbprint.print(settings, null);
}	// printOutput()
*/

AlanSRaskin.ExifViewer.Moz.copyToClipboard = function (text) {
	var gClipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"]
							.getService(Components.interfaces.nsIClipboardHelper);
	gClipboardHelper.copyString(text.replace(/<html:/gi, '<').replace(/<\/html:/gi, '</').replace(/ xmlns:html="http:\/\/www.w3.org\/1999\/xhtml"/g, ''));
}	// copyToClipboard()

AlanSRaskin.ExifViewer.Moz.handleLocalChanged = function (value) {
	AlanSRaskin.ExifViewer.Base.clearText('fileDiv');
	AlanSRaskin.ExifViewer.Base.displayText(AlanSRaskin.ExifViewer.Base.cleanExifStringData(value), 'fileDiv');
	AlanSRaskin.ExifViewer.Moz.saveTheURL();
	AlanSRaskin.ExifViewer.Moz.clearURL();
//	AlanSRaskin.ExifViewer.Moz.disableMainButton(false);
}	// handleLocalChanged()

AlanSRaskin.ExifViewer.Moz.handleRemoteChanged = function (value) {
	AlanSRaskin.ExifViewer.Base.clearText('fileDiv');
	AlanSRaskin.ExifViewer.Base.displayText(AlanSRaskin.ExifViewer.Base.cleanExifStringData(value), 'fileDiv');
	AlanSRaskin.ExifViewer.Moz.clearFile();
//	AlanSRaskin.ExifViewer.Moz.disableMainButton(false);
}	// handleRemoteChanged()

AlanSRaskin.ExifViewer.Moz.exifasr_savedURL = document.getElementById('remote_file').value;

AlanSRaskin.ExifViewer.Moz.saveTheURL = function () {
	var s = document.getElementById('remote_file').value;
	if (s != '')  AlanSRaskin.ExifViewer.Moz.exifasr_savedURL = s;
}	// saveTheURL()

AlanSRaskin.ExifViewer.Moz.restoreURL = function () {
	document.getElementById('remote_file').value = AlanSRaskin.ExifViewer.Moz.exifasr_savedURL;
	AlanSRaskin.ExifViewer.Moz.clearFile();
	AlanSRaskin.ExifViewer.Base.clearText('fileDiv');
	AlanSRaskin.ExifViewer.Base.displayText(AlanSRaskin.ExifViewer.Base.cleanExifStringData(AlanSRaskin.ExifViewer.Moz.exifasr_savedURL), 'fileDiv');
}	// restoreURL()

AlanSRaskin.ExifViewer.Moz.clearURL = function () {
	document.getElementById('remote_file').value = '';
}	// clearURL()

AlanSRaskin.ExifViewer.Moz.clearFile = function () {
	document.getElementById('local_file').value = '';
}	// clearFile()

AlanSRaskin.ExifViewer.Moz._handleExifImagePicked = function (url, asroverlay) {
	if (asroverlay) {
		AlanSRaskin.ExifViewer.Moz.exifasr_overlay = asroverlay;
	}
	if (url.indexOf('file://') == 0) {
		if (!AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator)  AlanSRaskin.ExifViewer.Moz.setExifDirectorySeparator();
		var re1 = new RegExp('^file://(localhost|127.0.0.1)?', '')
		var re2 = new RegExp('/', 'g'); 
		var re3 = new RegExp('^/([a-zA-Z]:)', ''); 
		url = window.decodeURI(url.replace(re1, '').replace(re3, '$1').replace(re2, AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator));
		document.getElementById('local_file').value = url;
		AlanSRaskin.ExifViewer.Moz.clearURL();
	} else {
		AlanSRaskin.ExifViewer.Moz.saveTheURL();
		document.getElementById('remote_file').value = url;
		AlanSRaskin.ExifViewer.Moz.clearFile();
	}
	AlanSRaskin.ExifViewer.Base.clearText('fileDiv');
	AlanSRaskin.ExifViewer.Base.displayText(AlanSRaskin.ExifViewer.Base.cleanExifStringData(url), 'fileDiv');
//	AlanSRaskin.ExifViewer.Overlay.exifasr_window.alert('hi');
	AlanSRaskin.ExifViewer.Moz.startDisplay();
}	// _handleExifImagePicked()

AlanSRaskin.ExifViewer.Moz.exifViewDiv = function (checked, divExt) {
	var div = document.getElementById('outputDiv_' + divExt);
	if (div)  div.style.display = (checked ? 'none' : '');
}	// exifViewDiv()

AlanSRaskin.ExifViewer.Moz.setExifDirectorySeparator = function () {
	var profD = Components.classes['@mozilla.org/file/directory_service;1'].
				getService(Components.interfaces.nsIProperties).
				get('ProfD', Components.interfaces.nsIFile);
	profD.append('abc');
	profD.append('abc');
    var l = profD.path.length;
    AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator = profD.path.substr(l - ('abc'.length) - 1 , 1);
/*
	try {
		const id = 'exif_viewer@mozilla.doslash.org';
		var ext = Components.classes["@mozilla.org/extensions/manager;1"]
					.getService(Components.interfaces.nsIExtensionManager)
					.getInstallLocation(id)
					.getItemLocation(id); 
		// ext is an instance of nsIFile, so ext.path contains the directory as a string

		// determine the file-separator
		if (ext.path.search(/\\/) != -1) {
			AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator = '\\';		// Windows
		} else if (ext.path.search(/\//) != -1) {
			AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator = '/';		// Unix
		} else {
			AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator = ':';		// Mac
		}
	} catch (e) {
		AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator = '\\';
	}
/**/
}	// setExifDirectorySeparator()

AlanSRaskin.ExifViewer.Moz.setFontSize = function (n) {
	var sizes = new Array('66%', '83%', '100%', '120%', '150%');
	var o = document.getElementById('outputDiv');
	if (!o  ||  !o.style  ||  n < 0  ||  n >= sizes.length)  return;
	o.style.overflow = 'hidden';
	o.style.fontSize = sizes[n];
	window.setTimeout(function () {
		document.getElementById('outputDiv').style.overflow = 'scroll';
	}, 2);
}	// setFontSize()

AlanSRaskin.ExifViewer.Moz.setRelativeFontSize = function (t) {
	var o = document.getElementById('outputDiv');
	var factor = 1.10;
	if (!o  ||  !o.style)  return;
	var x = parseInt(o.style.fontSize, 10);
	switch (t) {
		case '+':
			x = Math.round(x * factor);
			break;
		case '-':
			x = Math.round(x / factor);
			break;
		default:
			break;
	}

	o.style.overflow = 'hidden';
	o.style.fontSize = x + '%';
	window.setTimeout(function () {
		document.getElementById('outputDiv').style.overflow = 'scroll';
	}, 2);
}	// setRelativeFontSize()

AlanSRaskin.ExifViewer.Moz.asrexif_strbundle = document.getElementById("asrexif_strings");

AlanSRaskin.ExifViewer.Moz.getPString = function (key) {
	try {
//		var ch = AlanSRaskin.ExifViewer.Moz.asrexif_strbundle.getString(key);
//		ch = ch.replace(/&#([0-9]+);/g, function(str, p1){return(String.fromCharCode(p1));});
//		return ch;
		return AlanSRaskin.ExifViewer.Moz.asrexif_strbundle.getString(key).
					replace(/&#([0-9]+);/g, function (str, p1) { return String.fromCharCode(p1); });
	} catch (e) {
		return key;
	}
}	// getConvertPString()

AlanSRaskin.ExifViewer.Moz.getPStringOld = function (key) {
	try {
		return AlanSRaskin.ExifViewer.Moz.asrexif_strbundle.getString(key);
	} catch (e) {
		return key;
	}
}	// getPString()

AlanSRaskin.ExifViewer.Moz.getFormattedPString = function (key, inserts) {
	try {
		return AlanSRaskin.ExifViewer.Moz.asrexif_strbundle.getFormattedString(key, inserts);
	} catch (e) {
		return key + ' [' + inserts.join(' / ') + ']';
	}
}	// getFormattedPString()

/*
AlanSRaskin.ExifViewer.Moz.showLocale() {
	var ps_cls = Components.classes["@mozilla.org/preferences-service;1"];
	var ps = ps_cls.getService(Components.interfaces.nsIPrefService);
	var branch = ps.getBranch('general.useragent.');
	alert('Locale is: ' + branch.getCharPref('locale'));
//	branch.setCharPref('locale', 'fr')
//	alert(branch.getCharPref('locale'));

	var strbundle = document.getElementById("strings");
	var test1 = strbundle.getString("testString");
	var test2 = strbundle.getFormattedString("testString2", [ 'end', 'start' ]);
	alert('String bundle test:\n\n' + test1 + '\n' + test2);
}	// showLocale()
*/

// from Mozilla/Firefox's browser.js
AlanSRaskin.ExifViewer.Moz.toJavaScriptConsole = function () {
	AlanSRaskin.ExifViewer.Moz.toOpenWindowByType("global:console", "chrome://global/content/console.xul");
}	// toJavaScriptConsole()

AlanSRaskin.ExifViewer.Moz.toOpenWindowByType = function (inType, uri, features) {
	var windowManager = Components.classes['@mozilla.org/appshell/window-mediator;1'].getService();
	var windowManagerInterface = windowManager.QueryInterface(Components.interfaces.nsIWindowMediator);
	var topWindow = windowManagerInterface.getMostRecentWindow(inType);

	if (topWindow) {
		topWindow.focus();
		return topWindow;
	} else if (features) {
		return window.open(uri, "_blank", features);
	} else {
		return window.open(uri, "_blank", "chrome,extrachrome,menubar,resizable,scrollbars,status,toolbar");
	}
}	// toOpenWindowByType()

AlanSRaskin.ExifViewer.Moz.showReleaseNotes = function () {
	AlanSRaskin.ExifViewer.Moz.toOpenWindowByType("exif:notes", "chrome://exif/content/notes.xul");
}	// showReleaseNotes()

AlanSRaskin.ExifViewer.Moz.exifScrollTo = function (eleID) {
	var ele = document.getElementById(eleID);
	if (ele  &&  ele.scrollIntoView) ele.scrollIntoView();
}	// exifScrollTo()

AlanSRaskin.ExifViewer.Moz.exifPageUpDown = function (u_or_d) {
	var ele = document.getElementById('outputDiv');
	var t = ele.scrollTop + (u_or_d == 'u' ? -ele.clientHeight : + ele.clientHeight);
	if (t < 0) {
		t = 0;
	} else if (t >= ele.scrollHeight) {
		t = ele.scrollHeight - 1;
	}
	ele.scrollTop = t;
}	// exifPageUpDown()

AlanSRaskin.ExifViewer.Moz.exifLineUpDown = function (u_or_d) {	// messes up the scroll bar
	var ele = document.getElementById('outputDiv');
	var t = ele.scrollTop + (u_or_d == 'u' ? -10 : +10);
	if (t < 0) {
		t = 0;
	} else if (t >= ele.scrollHeight) {
		t = ele.scrollHeight - 1;
	}
	ele.scrollTop = t;
}	// exifLineUpDown()

AlanSRaskin.ExifViewer.Moz.saveExifAsImage = function () {
	AlanSRaskin.ExifViewer.Moz.toOpenWindowByType('exif:capture', 'chrome://exif/content/capture.xul');
}	// saveExifAsImage()

AlanSRaskin.ExifViewer.Moz.simplePrint = function () {
	try {
		var win = window.open('empty.html', "_blank", "chrome,extrachrome,menubar,resizable,scrollbars,status,toolbar");
	} catch (e) {
		window.alert(AlanSRaskin.ExifViewer.Moz.getPString('simplePrintError'));
		return;
	}
	self.focus();
/**/
	var out = [];
	out.push('<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"  "http://www.w3.org/TR/html4/strict.dtd">');
	out.push('<html><head><title>Exif Image Metadata<\/title>');
	out.push('<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">');
	out.push('<style type="text/css">');
	out.push('body { font-family: serif; font-size: 100%; }');
	out.push('.no_print { display: none; }');
	out.push('<\/style>');
	out.push('<base href="chrome://exif/content/">');
	out.push('<\/head><body>');
	out.push(document.getElementById('outputDiv').innerHTML.replace(/html:/gi, ''));
	out.push('<\/body><\/html>');

	win.document.open();
	win.document.write(out.join('\r\n'));
	win.document.close();
	win.print();
	win.close();
/**/
}	// simplePrint()

AlanSRaskin.ExifViewer.Moz.copyKMLtoClipboard = function () {
	AlanSRaskin.ExifViewer.Moz.copyToClipboard(AlanSRaskin.ExifViewer.Base.exifasr_kml);
	window.alert(AlanSRaskin.ExifViewer.Moz.getPString('copyKMLtoClipboardResponse'));
}	// copyKMLtoClipboard()

AlanSRaskin.ExifViewer.Moz.saveKMLtoFile = function (launch) {
/*	try {
		netscape.security.PrivilegeManager.enable---Privilege("UniversalXPConnect");
	} catch (e) {
		alert("Permission to create a file has been denied by your security settings.");
		return;
	}*/
	var nsIFilePicker = Components.interfaces.nsIFilePicker;
	var fp = Components.classes["@mozilla.org/filepicker;1"]
				.createInstance(nsIFilePicker);
	fp.init(window, AlanSRaskin.ExifViewer.Moz.getPString('selectFile'), nsIFilePicker.modeSave);
	fp.appendFilter(AlanSRaskin.ExifViewer.Moz.getPString('kmlFiles'), AlanSRaskin.ExifViewer.Moz.getPString('kmlExtensions'));
	fp.defaultExtension = 'kml';
	fp.defaultString = AlanSRaskin.ExifViewer.Base.exifasr_fileName.match(/(\w*)\.(\w*)$/)[1];	// use the image filename as the default KML filename
//	fp.appendFilters(nsIFilePicker.filterHTML | nsIFilePicker.filterImages | nsIFilePicker.filterText | nsIFilePicker.filterAll);
	var res = fp.show();
	if (res != nsIFilePicker.returnCancel) {
		var savefile = fp.file;
		var file = Components.classes["@mozilla.org/file/local;1"]
			.createInstance(Components.interfaces.nsILocalFile);
		file.initWithPath(savefile.path);
		if (file.exists() == false) {
			file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);
		}
		var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
							.createInstance( Components.interfaces.nsIFileOutputStream );
		outputStream.init(file, 0x02 | 0x08 | 0x20, 420, 0 );	// (write-only | create-file | truncate)
		var result = outputStream.write(AlanSRaskin.ExifViewer.Base.exifasr_kml, AlanSRaskin.ExifViewer.Base.exifasr_kml.length );
		outputStream.close();
		if (launch)  file.launch();		// open file in Google Earth!?!
		window.alert(AlanSRaskin.ExifViewer.Moz.getPString('saveKMLtoFileResponse') + ' ' + savefile.path);
	}
}	// saveKMLtoFile()

AlanSRaskin.ExifViewer.Moz.launchKML = function () {
	if (AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator == null) {
		AlanSRaskin.ExifViewer.Moz.setExifDirectorySeparator();
	}
	var tempDir = Components.classes['@mozilla.org/file/directory_service;1']
       	         .getService(Components.interfaces.nsIProperties)
          	     .get('TmpD', Components.interfaces.nsIFile);
	var file = Components.classes["@mozilla.org/file/local;1"]
				.createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath(tempDir.path + AlanSRaskin.ExifViewer.Moz.exifasr_directorySeparator + 'exif.kml');
	if (file.exists() == false) {
		file.create(Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420);
	}
	var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
						.createInstance( Components.interfaces.nsIFileOutputStream );
	outputStream.init(file, 0x02 | 0x08 | 0x20, 420, 0 );	// (write-only | create-file | truncate)
	var result = outputStream.write(AlanSRaskin.ExifViewer.Base.exifasr_kml, AlanSRaskin.ExifViewer.Base.exifasr_kml.length );
	outputStream.close();
	file.launch();		// open file in Google Earth!?!
}	// launchKML()

AlanSRaskin.ExifViewer.Moz.fixDiv = function () {
	AlanSRaskin.ExifViewer.Moz.fixDivs('outputDiv');
}	// fixDiv()

//window.onresize = function () {AlanSRaskin.ExifViewer.Moz.fixDiv();};
//window.onload = function () {AlanSRaskin.ExifViewer.Moz.fixDiv();};
window.addEventListener('load', function () {AlanSRaskin.ExifViewer.Moz.fixDiv();}, false);
window.addEventListener('resize', function () {AlanSRaskin.ExifViewer.Moz.fixDiv();}, false);

AlanSRaskin.ExifViewer.Moz.fixDivs = function (divName) {
//	var version = AlanSRaskin.ExifViewer.Moz.getAppVersion();	// needed for FF 10 *sigh*
//	if (/^[12]\.*/.test(version))  return;	// the following code is only needed for FF 3

//	for some reason, in FF3 and 10 the outer div tries to display the full content within 
//	it, by widening indefinitely and lengthening to cover the status bar;
//	hence, we need to manually adjust the widths of the inner divs and the height
//	of the outer div

//	step 1: adjust inner widths

	var subdivs = ['iptc', 'iptc_core', 'ifd0', 'ifd1', 'iop', 'gps', 'subifd', 'mn'];	// 'head', 'msg', 'img', 'err'
	var tmp = window.innerWidth - 35;
	if (tmp < 300)  tmp = 300;
	for (var i = 0 ; i < subdivs.length ; i++) {
		var div = document.getElementById(divName + '_' + subdivs[i]);
		if (div) {
			div.style.width = tmp + 'px';
			div.style.overflow = 'auto';
		}
	}

//	step 2: adjust outer height

	var win_h = window.innerHeight;
	var div = document.getElementById(divName);
	if (div) {
		var div_t = div.offsetTop;
		var sb_h = 45;		// height of statusbar, was 40
		var h = win_h - div_t - sb_h; 
		if (h >= 0)  div.style.height = h + 'px';
	}
}	// fixDivs()

AlanSRaskin.ExifViewer.Moz.disableMainButton = function (t_or_f, fileName) {
/*
	if (t_or_f) {
		var cache = Components.classes["@mozilla.org/network/cache-service;1"]
            			.getService(Components.interfaces.nsICacheService);
		var id = 'test';
		var storagePolicy = cache.STORE_ANYWHERE;
		var streamBased = cache.STREAM_BASED;
		var session = cache.createSession(id, storagePolicy, streamBased);
		var accessRequested = cache.ACCESS_READ;
		var blockingMode = cache.NON_BLOCKING;
		try {
			var entry = session.open/Cache/Entry(fileName, accessRequested, blockingMode);
		} catch (e) {
			alert('failure');
			return;
		}
		entry.doom();
	}
	return;
/**/
	var btn = document.getElementById('mainBtn');
	if (btn) {
		btn.disabled = t_or_f;
	}
}	// disableMainButton()

AlanSRaskin.ExifViewer.Moz.getAppVersion = function () {
	var info = Components.classes["@mozilla.org/xre/app-info;1"]
						.getService(Components.interfaces.nsIXULAppInfo);
	// info.name: "Firefox"
	// info.version: "2.0.0.1"
	// info.ID: "{ex8040...}"
	// info.appBuildID: "2007112718"
	// info.platformBuildID: "2007112718"
	// info.platformVersion: "1.8.1.11"
	// info.vendor: "Mozilla"
	return info.version;
}	// getAppVersion()

AlanSRaskin.ExifViewer.Moz.getExtensionVersion = function () {
	var extmgr = Components.classes["@mozilla.org/extensions/manager;1"]
						.getService(Components.interfaces.nsIExtensionManager);
	var addon = extmgr.getItemForID("exif_viewer@mozilla.doslash.org");
	// addon.iconURL: "chrome:/mozapps/skin/xpinstall/xpinstallItemGeneric.png"
	// addon.id: "exif_viewer@mozilla.doslash.org"
	// addon.installLocationKey: "app-profile"
	// addon.maxAppVersion: "2.0.0.*"
	// addon.minAppVersion: "1.5"
	// addon.name: "Exif Viewer"
	// addon.type
	// var interpretedType = '?';
	// if (addon.type == 1)  interpretedType = 'app';
	// if (addon.type == 2)  interpretedType = 'extension';  
	// if (addon.type == 4)  interpretedType = 'theme';  
	// if (addon.type == 8)  interpretedType = 'locale';  
	// if (addon.type == 16)  interpretedType = 'plugin';  
	// if (addon.type == 32)  interpretedType = 'multi xpi';  
	// addon.updateRDF: ""
	// addon.version: "1.36"
	// addon.xpiHash: ""
	// addon.xpiURL: "none"
	return addon.version;
}	// getExtensionVersion()

AlanSRaskin.ExifViewer.Moz.toggleControls = function () {
	var e = document.getElementById('mainControls');
	e.style.display = e.style.display != 'none' ? 'none' : 'block';
}	// toggleControls()

AlanSRaskin.ExifViewer.Moz.pickRemoteHistory = function (url) {
	document.getElementById('remote_file').value = url;
	AlanSRaskin.ExifViewer.Moz.clearFile();
	AlanSRaskin.ExifViewer.Base.clearText('fileDiv');
	AlanSRaskin.ExifViewer.Base.displayText(AlanSRaskin.ExifViewer.Base.cleanExifStringData(url), 'fileDiv');
}	// pickRemoteHistory()

AlanSRaskin.ExifViewer.Moz.pickLocalHistory = function (file) {
	document.getElementById('local_file').value = file;
	AlanSRaskin.ExifViewer.Moz.clearURL();
	AlanSRaskin.ExifViewer.Base.clearText('fileDiv');
	AlanSRaskin.ExifViewer.Base.displayText(AlanSRaskin.ExifViewer.Base.cleanExifStringData(file), 'fileDiv');
}	// pickLocalHistory()

AlanSRaskin.ExifViewer.Moz.clearHistory = function (rem_or_loc) {
	var menu = document.getElementById('history-' + rem_or_loc + '-popup');
	if (menu) {
		var menuitems = menu.getElementsByTagName('menuitem');
		for (var i = 0 ; i < menuitems.length-1 ; i++) {
			menuitems[i].label = i;
			menuitems[i].hidden = 'true';
		}
	}
}	// clearHistory()

AlanSRaskin.ExifViewer.Moz.addToHistory = function (rem_or_loc, url) {
	// bug workaround regardig unset attributes: https://bugzilla.mozilla.org/show_bug.cgi?id=15232
	var menu = document.getElementById('history-' + rem_or_loc + '-popup');
	if (menu) {
		var menuitems = menu.getElementsByTagName('menuitem');
		for (var i = 0 ; i < menuitems.length - 1 ; i++) {
			if (!menuitems[i].hidden  &&  menuitems[i].label == url)  return;
		} 
		for (var i = menuitems.length-2 ; i >= 1  ; i--) {
			menuitems[i].label = menuitems[i-1].label;
			menuitems[i].setAttribute('hidden', menuitems[i-1].hidden);
		}
		menuitems[0].label = url;
		menuitems[0].setAttribute('hidden', 'false');
	}
}	// addToHistory()

