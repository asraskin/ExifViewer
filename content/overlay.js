if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Overlay)  AlanSRaskin.ExifViewer.Overlay = {};

AlanSRaskin.ExifViewer.Overlay.ExifViewer = {
	onLoad: function() {
    	// initialization code
		this.initialized = true;
	},

	onMenuItemCommand: function() {
    	window.open("chrome://exif/content/exif.xul", "exif_viewer", "chrome,centerscreen,resizable,menubar");	// ,dependent
	}
};

window.addEventListener("load", function (e) { AlanSRaskin.ExifViewer.Overlay.ExifViewer.onLoad(e); }, false);

// stuff needed to handle popup menu items properly

AlanSRaskin.ExifViewer.Overlay.initExifOverlay = function () {
	var contextMenu;
	// Firefox:
	contextMenu = document.getElementById("contentAreaContextMenu");
	if (contextMenu)  contextMenu.addEventListener("popupshowing", AlanSRaskin.ExifViewer.Overlay.showExifMenuItems, false);
	// Thunderbird:
	contextMenu = document.getElementById("messagePaneContext");
	if (contextMenu)  contextMenu.addEventListener("popupshowing", AlanSRaskin.ExifViewer.Overlay.showExifMenuItems, false);
}	// initExifOverlay()

window.addEventListener("load", AlanSRaskin.ExifViewer.Overlay.initExifOverlay, false);

//show or hide items depending on the context
AlanSRaskin.ExifViewer.Overlay.showExifMenuItems = function () {
/*
	var jpeg_only = false;	// if set to true, suppresses menu item for dynamic urls
	
	var bShowViewImage = (gContextMenu.onImage  &&  (!jpeg_only || re_jpg.test(gContextMenu.target.src)));
	var bShowViewLink = (gContextMenu.onLink  &&  (!jpeg_only || re_jpg.test(gContextMenu.link.href)));
*/

	var re_jpg = new RegExp('\.jp(eg|e|g)(\\?.*)?$', 'i');
	var re_notjpg = new RegExp('\.('
								+ 'aiff|amc|asx|au|bmp|fdf|gif|htm|html|'
								+ 'm4a|mid|mov|mp3|mp4|mpeg|mpg|'
								+ 'pdf|pict|png|pntg|qtif|'
								+ 'rm|sdp|spl|swf|txt|'
								+ 'wav|wm|wma|wmv|'
								+ 'xfd|xfdf|xdp|'
								+ '3g2|3gp'
								+ ')(\\?.*)?$', 'i');

	var bShowViewImage = (gContextMenu.onImage  &&  !re_notjpg.test(gContextMenu.target.src));
	var bShowViewLink = (gContextMenu.onLink  &&  !re_notjpg.test(gContextMenu.link.href));
	var bShowRotateImage = (gContextMenu.onImage  &&  re_jpg.test(gContextMenu.target.src));
	var bShowRotateLinkImage = (gContextMenu.onLink  &&  re_jpg.test(gContextMenu.link.href));

	// Firefox:
	gContextMenu.showItem('context-item-image-exif', bShowViewImage);
	gContextMenu.showItem('context-item-link-exif', bShowViewLink);
	gContextMenu.showItem('context-item-rotate-image-exif', bShowRotateImage);
	gContextMenu.showItem('context-item-rotate-link-image-exif', bShowRotateLinkImage);

	// Thunderbird:
	gContextMenu.showItem('context-item-image-exif-tb', bShowViewImage);
	gContextMenu.showItem('context-item-link-exif-tb', bShowViewLink);
	return;
/*
	var menuitem_image = document.getElementById('context-item-image-exif');
	var	menuitem_link = document.getElementById('context-item-link-exif');

	menuitem_image.hidden = false;
	menuitem_link.hidden = false;

	if (gContextMenu.onImage) {
		menuitem_image.hidden = false;
		menuitem_link.hidden = true;
	}
	if (gContextMenu.onLink) {
		menuitem_image.hidden = true;
		menuitem_link.hidden = false;
	}
	if (!(gContextMenu.onImage  ||  gContextMenu.onLink)) {
		menuitem_image.hidden = true;
		menuitem_link.hidden = true;
	}
*/
}	// showExifMenuItems()

AlanSRaskin.ExifViewer.Overlay.exifasr_window = null;

AlanSRaskin.ExifViewer.Overlay.handleExifImagePicked = function (url) {
	if (!AlanSRaskin.ExifViewer.Overlay.exifasr_window  ||
			!AlanSRaskin.ExifViewer.Overlay.exifasr_window.AlanSRaskin  ||
			!AlanSRaskin.ExifViewer.Overlay.exifasr_window.AlanSRaskin.ExifViewer  ||
			!AlanSRaskin.ExifViewer.Overlay.exifasr_window.AlanSRaskin.ExifViewer.Moz  || 
			!AlanSRaskin.ExifViewer.Overlay.exifasr_window.AlanSRaskin.ExifViewer.Moz._handleExifImagePicked) {
		AlanSRaskin.ExifViewer.Overlay.exifasr_window = window.open("chrome://exif/content/exif.xul", "exif_viewer",
									 "chrome,centerscreen,resizable,menubar");
	}	
	AlanSRaskin.ExifViewer.Overlay.waitForExifWindow(url);
}	// handleExifImagePicked()

AlanSRaskin.ExifViewer.Overlay.waitForExifWindow = function (url) {
	if (AlanSRaskin.ExifViewer.Overlay.exifasr_window  &&
			AlanSRaskin.ExifViewer.Overlay.exifasr_window.AlanSRaskin  &&
	 		AlanSRaskin.ExifViewer.Overlay.exifasr_window.AlanSRaskin.ExifViewer  &&
	 		AlanSRaskin.ExifViewer.Overlay.exifasr_window.AlanSRaskin.ExifViewer.Moz  &&
			AlanSRaskin.ExifViewer.Overlay.exifasr_window.AlanSRaskin.ExifViewer.Moz._handleExifImagePicked) {
		AlanSRaskin.ExifViewer.Overlay.exifasr_window.AlanSRaskin.ExifViewer.Moz._handleExifImagePicked(url, AlanSRaskin.ExifViewer.Overlay);
		AlanSRaskin.ExifViewer.Overlay.exifasr_window.focus();
//		AlanSRaskin.ExifViewer.Overlay.exifasr_window = null;	// actually set to null in exif.xul (window.onunload)
	} else {
		window.setTimeout(function () {
			AlanSRaskin.ExifViewer.Overlay.waitForExifWindow(url);
		}, 500);
	}
}	// waitForExifWindow()

AlanSRaskin.ExifViewer.Overlay.handleExifAttachmentPicked = function (url) {
	var attachment = null;
	try {
		if (url) {
			for (var i = 0 ; i < currentAttachments.length ; i++) {
				if (url.indexOf('&filename=' + window.escape(currentAttachments[i].displayName)) != -1) {
					attachment = currentAttachments[i];
					break;
				}
			}
		} else {
			var attachmentList = document.getElementById('attachmentList');
			var selectedAttachments = attachmentList.selectedItems;
	
			if (selectedAttachments.length < 1) {
				window.alert('Please select an attachment.');
				return;
			} else if (selectedAttachments.length > 1) {
				window.alert('Please select only one attachment.');
				return;
			} else {
				attachment = selectedAttachments[0].attachment;
			}
		}
		
		if (!attachment) {
			window.alert('Nothing to do.');
			return;
		}

//		window.alert(attachment.contentType + '\n2 ' + attachment.url + '\n3 ' + encodeURIComponent(attachment.displayName)); // + '\n4 ' + attachment.uri);
		var uri = attachment.url + '&contentType=' + attachment.contentType + '&filename=' + attachment.displayName;
		var obj = Components.classes['@mozilla.org/file/directory_service;1']
    	   		    .getService(Components.interfaces.nsIDirectoryService);
		var file = Components.classes['@mozilla.org/file/directory_service;1']
           	         .getService(Components.interfaces.nsIProperties)
               	     .get('TmpD', Components.interfaces.nsIFile);
		var messenger = Components.classes['@mozilla.org/messenger;1']
    	   		    	.getService(Components.interfaces.nsIMessenger);
		var destFilePath = messenger.saveAttachmentToFolder(attachment.contentType, attachment.url, 
									'exifasr_' + encodeURIComponent(attachment.displayName), uri, file);
		window.setTimeout(function () {
			AlanSRaskin.ExifViewer.Overlay.handleExifImagePicked('file:///' + destFilePath.path.replace(/\\/g, '/'));
		}, 2000);
		window.setTimeout(function () {
			AlanSRaskin.ExifViewer.Overlay.deleteExifTempFile(destFilePath.path.replace(/\\/g, '\\\\'));
		}, 10000);
	} catch (e) {
		window.alert('An error was encountered while trying to handle the attachment. Sorry.');
//		window.alert(e);
	}
}	// handleExifAttachmentPicked()

AlanSRaskin.ExifViewer.Overlay.deleteExifTempFile = function (filename) {
	try {
		var file = Components.classes["@mozilla.org/file/local;1"]
					.createInstance(Components.interfaces.nsILocalFile);
		file.initWithPath(filename);
		if (file.exists()) {
			file.remove(false);
		}
	} catch (e) {
		window.alert(e);
	}
}	// deleteExifTempFile()

AlanSRaskin.ExifViewer.Overlay.handleExifRotateImage = function (url) {
	window.open('chrome://exif/content/rotate.html?file=' + window.escape(url) + '&angle=90', 'img',
					'resizable=yes,toolbar=no,status=no,menubar=no,scrollbars=yes');
}	// handleRotateImage()

/*
mailbox:///C|/WINDOWS/Application%20Data/Thunderbird/araskin/jcgidbof.slt/Mail/inbox.allstream.net/Inbox?number=17648837&part=1.2&type=image/jpeg&filename=CenturyOfGrowth.jpg
@mozilla.org/messenger/mailboxurl;1
nsIURL.fileBaseName
nsIURL.fileName
*/ 