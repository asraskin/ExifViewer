if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Base)  AlanSRaskin.ExifViewer.Base = {};

AlanSRaskin.ExifViewer.Base.exifasr_isMoz = true;
AlanSRaskin.ExifViewer.Base.exifasr_xml0 = 'html:';
AlanSRaskin.ExifViewer.Base.exifasr_xml1 = '/';
AlanSRaskin.ExifViewer.Base.exifasr_fileName = '';
AlanSRaskin.ExifViewer.Base.exifasr_kml = '';

AlanSRaskin.ExifViewer.Base.getOrientation = function (fileName, testFileName, divName) {
	var status;
	var ifd0 = {};
	ifd0.type = 'IFD0';

	var conversion = {};
	if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz) {
		status = 0;
	} else {
		status = AlanSRaskin.ExifViewer.Base.getTestData(testFileName, conversion);
	}
	if (status == 0) {
		status = AlanSRaskin.ExifViewer.Base.getExifData(fileName, divName, true, conversion, null, ifd0, null, null, null, null, null, null);
		if (status == 0  &&  ifd0.x0112) {
			return ifd0.x0112;	//	orientation!
		} else {
//			alert('Unable to extract the orientation information from the Exif data.');
		}
	} else {
//		alert('Unable to open the test file as a text stream.');
	}
	return 1;	// assume it's "normal"
}	// getOrientation()

AlanSRaskin.ExifViewer.Base.getSlideshowInfo = function (fileName, testFileName, output, divName) {
	var status;
	var ifd0 = {}, subifd = {};
	ifd0.type = 'IFD0';
	subifd.type = 'SubIFD';

	var conversion = {};
	if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz) {
		status = 0;
	} else {
		status = AlanSRaskin.ExifViewer.Base.getTestData(testFileName, conversion);
	}
	if (status == 0) {
		status = AlanSRaskin.ExifViewer.Base.getExifData(fileName, divName, true, conversion, null, ifd0, subifd, null, null, null, null, null);
		if (status == 0) {
			output.orientation = ifd0.x0112;
			output.width = subifd.xa002;
			output.height = subifd.xa003;
		} else {
			window.alert('Unable to extract the orientation information from the Exif data.');
		}
	} else {
//		alert('Unable to open the test file as a text stream.');
	}
	return;
}	// getSlideshowInfo()

AlanSRaskin.ExifViewer.Base.processFile = function (fileName, testFileName, divName, suppressMakerNote, suppressImage, basicTags, useTables, displayTagID) {
	var status;
	var fileInfo = {}, ifd0 = {}, ifd1 = {};
	var subifd = {}, interop = {}, gps = {};
	var iptc = {}, iptc_core = {};
	var jpeg = {};
	fileInfo.type = 'File';
	ifd0.type = 'IFD0';			ifd0.status = -1;		ifd0.gpsifd_offset = -1;
	subifd.type = 'SubIFD';		subifd.status = -1;		subifd.iopifd_offset = -1;
	ifd1.type = 'IFD1';			ifd1.status = -1;
	interop.type = 'IOP';		interop.status = -1;
	gps.type = 'GPS';			gps.status = -1;
	iptc.type = 'IPTC';			iptc.status = -1;
	iptc_core.type = 'IPTC Core';	iptc_core.status = -1;

	AlanSRaskin.ExifViewer.Base.exifasr_fileName = fileName;

	var isURL = (fileName.indexOf('http://') == 0  ||  fileName.indexOf('https://') == 0  ||  fileName.indexOf('ftp://') == 0);
	if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz)  AlanSRaskin.ExifViewer.Moz.addToHistory(isURL ? 'rem' : 'loc' , fileName);
//	var isMailbox = (fileName.indexOf('mailbox://') == 0);

	AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h1>' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(fileName) + '</' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h1>', divName + '_head');
	var conversion = {};
	if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz) {
		status = 0;
	} else {
		status = AlanSRaskin.ExifViewer.Base.getTestData(testFileName, conversion);
	}
	if (status == 0) {
		status = AlanSRaskin.ExifViewer.Base.getExifData(fileName, divName, suppressMakerNote, conversion, fileInfo, ifd0, subifd, ifd1, interop, gps, iptc, iptc_core, jpeg);
		if (!suppressImage) {
			AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'img src="' + (isURL ? '' : 'file://') + fileName.replace(/&/g, '&amp;') + '" width="200"' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>', divName + '_img');
		}
		if (!AlanSRaskin.ExifViewer.Base.exifasr_isMoz) {
			AlanSRaskin.ExifViewer.Base.dumpFileInfo(fileInfo, divName);
		}

		if (status == 0, true) {
			AlanSRaskin.ExifViewer.Base.dumpJPEGcomment(divName, jpeg);
			AlanSRaskin.ExifViewer.Base.dumpExifData(divName, ifd0, subifd, ifd1, interop, gps, basicTags, useTables, displayTagID);
			if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz)  AlanSRaskin.ExifViewer.Moz.fixDivs(divName);
			if (!basicTags) {
				AlanSRaskin.ExifViewer.IPTC.dumpIptcData(divName, iptc, useTables);
				AlanSRaskin.ExifViewer.XML.dumpIptcCoreData(divName, iptc_core);
			}
		}
		if (status != 0  ||  ifd0.status == -1) {
			AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>' + AlanSRaskin.ExifViewer.Moz.getPString('unableToExtract') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>', divName + '_err');
		}
	} else {
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>' + AlanSRaskin.ExifViewer.Moz.getPString('unableToOpenTestFile') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>', divName + '_err');
	}
//	if (status != 0  &&  AlanSRaskin.ExifViewer.Base.exifasr_isMoz)  AlanSRaskin.ExifViewer.Moz.disableMainButton(true, fileName);
}	// processFile()

AlanSRaskin.ExifViewer.Base.getTestData = function (fileName, conversion) {	// IE only
	var status = 0;
	var ok = {};
	var fso = new ActiveXObject('Scripting.FileSystemObject');
	var file = fso.GetFile(fileName);
	var textStream = file.OpenAsTextStream();
	if (!textStream)  return -1;

//	AlanSRaskin.ExifViewer.Base.displayText('<pre>');
//	var c = textStream.Read(1);
	for (var i = 0 ; i < 256 ; i++) {
		var c = textStream.Read(1);
		var c2 = c.charCodeAt(0);
		// var c3 = String.fromCharCode(c2)
		// AlanSRaskin.ExifViewer.Base.displayText('' + i + ' c=' + c + ' c2=' + c2 + ' c3=' + c3);
		if (i == c2) {
			ok['x' + c2] = 'y';
		} else {
			if (ok['x' + c2]  ||  conversion['x' + c2]) {
				status = -1;
			} else {
				conversion['x' + c2] = i;
			}
		}
	}
//	AlanSRaskin.ExifViewer.Base.displayText('<\/pre>');
	textStream.Close();
	return status;
}	// getTestData()

AlanSRaskin.ExifViewer.Base.readByteAsText = function (textStream, conversion) {
	var tmp1 = textStream.Read(1);
	var tmp2 = tmp1.charCodeAt(0);
	if (conversion  &&  conversion['x' + tmp2])  tmp2 = conversion['x' + tmp2];
	return tmp2;
}	// readByteAsText()

AlanSRaskin.ExifViewer.Base.dumpFileInfo = function (fileInfo, divName) {
	var attrib = [], output = [];
	for (var a in fileInfo) {
		attrib.push(a + ' = ' + fileInfo[a]);
	}
	output.push('<h2>' + AlanSRaskin.ExifViewer.Moz.getPString('fileInformation') + '<\/h2>');
	output.push('<ul>');
	output.push('<li>' + attrib.join('<\/li>\n<li>') + '<\/li>');
	output.push('<\/ul>');
	AlanSRaskin.ExifViewer.Base.displayText(output.join(''), divName + '_err');
}	// dumpFileInfo()

AlanSRaskin.ExifViewer.Base.readByteMoz = function (sis) {
//	try {
		var c = sis.read( 1 /*sis.available()*/ );
		return ( c == '' ? 0 : c.charCodeAt(0));
//	} catch (e) {
//		return 0;
//	}
}	// readByteMoz()

AlanSRaskin.ExifViewer.Base.readByteURLMoz = function (bis) {
//	try {
		return bis.read8();
//	} catch (e) {
//		return 0;
//	}
}	// readByteURLMoz()

AlanSRaskin.ExifViewer.Base.getExifData = function (fileName, divName, suppressMakerNote, conversion, fileInfo, ifd0, subifd, ifd1, interop, gps, iptc, iptc_core, jpeg) {
	var output = [];
	var error_num = 0, status;
	var exif_data = [];
	var debug = false;
	var isURL = (fileName.indexOf('http://') == 0  ||  fileName.indexOf('https://') == 0  ||  fileName.indexOf('ftp://') == 0);
//	var isMailbox = (fileName.indexOf('mailbox://') == 0);
	var readByteFunction = null, readByteStream = null;

	if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz) {
	/*	- considered unsafe; Exif Viewer seems to work just fine for local files without this code
		try {
			netscape.security.PrivilegeManager.enable---Privilege("UniversalXPConnect");
		} catch (e) {
			output.push(AlanSRaskin.ExifViewer.Moz.getPString('readPermissionDenied'));
			return -100;
		}
	*/
		if (isURL) {
			try {
				var ios = Components.classes["@mozilla.org/network/io-service;1"]
							.getService(Components.interfaces.nsIIOService);
				var uri = ios.newURI(fileName, null, null);
				var channel = ios.newChannelFromURI(uri);
//				channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_BYPASS_CACHE;
//				channel.loadFlags |= Components.interfaces.nsIRequest.INHIBIT_CACHING;
//				channel.loadFlags |= Components.interfaces.nsIRequest.INHIBIT_PERSISTENT_CACHING;
				channel.loadFlags |= Components.interfaces.nsIRequest.LOAD_FROM_CACHE;
				var bis = Components.classes["@mozilla.org/binaryinputstream;1"]
							.createInstance(Components.interfaces.nsIBinaryInputStream);
				bis.setInputStream(channel.open());
				readByteFunction = AlanSRaskin.ExifViewer.Base.readByteURLMoz;
				readByteStream = bis;
			} catch (e) {
				output.push(AlanSRaskin.ExifViewer.Moz.getPString('unableOpenRemoteFile'));
				error_num = -102;
			}
//		} else if (isMailbox) {
//			try {
//				var ph = Components.classes["@mozilla.org/network/protocol;1?name=mailbox"]
//							.getService(Components.interfaces.nsIIOService);	// nsIProtocolHandler
//				var uri = ph.newURI(fileName, null, null);
//				alert(uri.spec);
//				var channel = ph.newChannelFromURI(uri);
//				alert(channel);
//				var bis = Components.classes["@mozilla.org/binaryinputstream;1"]
//							.createInstance(Components.interfaces.nsIBinaryInputStream);
//				var x = channel.open();
//				alert(x);
//				bis.setInputStream(x);
//				readByteFunction = AlanSRaskin.ExifViewer.Base.readByteURLMoz;
//				readByteStream = bis;
//			} catch (e) {
//				alert(e);
//				output.push('Unable to open the attachment.');
//				error_num = -102;
//			}
		} else {
			try {
				var file = Components.classes["@mozilla.org/file/local;1"]
							.createInstance(Components.interfaces.nsILocalFile);
				file.initWithPath(fileName);
				if (file.exists() == false) {
					output.push(AlanSRaskin.ExifViewer.Moz.getPString('fileDoesntExist'));
					error_num = -101;
				} else {
					var is = Components.classes["@mozilla.org/network/file-input-stream;1"]
								.createInstance( Components.interfaces.nsIFileInputStream );
					is.init(file, 0x01, 4, 0);	// was 00004
					var sis = Components.classes["@mozilla.org/scriptableinputstream;1"]
								.createInstance( Components.interfaces.nsIScriptableInputStream );
					sis.init(is);
					readByteFunction = AlanSRaskin.ExifViewer.Base.readByteMoz;
					readByteStream = sis;
				}
			} catch (e) {
				output.push(AlanSRaskin.ExifViewer.Moz.getPString('unableOpenLocalFile'));
				error_num =- -102;
			}
		}
	} else {
		var fso = new ActiveXObject('Scripting.FileSystemObject');
		var file = fso.GetFile(fileName);
		var textStream = file.OpenAsTextStream();
		if (!textStream) {
			output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>' + AlanSRaskin.ExifViewer.Moz.getPString('unableOpenImageFile') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>');
			error_num = -100;
		}

		if (fileInfo) {
			AlanSRaskin.ExifViewer.Base.getFileInformation(fileInfo, file);
		}
		readByteFunction = AlanSRaskin.ExifViewer.Base.readByteAsText;
		readByteStream = textStream;
	}

	if (error_num == 0) {
// 		Read file head, check for JPEG SOI
		for (var i = 0 ; i < 2 ; i++) {
			exif_data[i] = readByteFunction(readByteStream, conversion);
		}
//		if ((exif_data[0] == 0xFF  &&  exif_data[1] == 0xD8)  ||  (exif_data[0] == 0x3C  &&  exif_data[1] == 0x21)) {
//		} else {
		if (exif_data[0] != 0xFF  ||  exif_data[1] != 0xD8) {
//    		output.push('Bad JPEG file head, SOI marker not found: 0x' + exif_data[0].toString(16)
//						+ ' 0x' + exif_data[1].toString(16));
			output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('badJpegFile', [exif_data[0].toString(16) , exif_data[1].toString(16)]));
			error_num = -1;
		}
	}

	if (error_num == 0) {
// 		Read file head, check for APPx
		for (var i = 0 ; i < 4 ; i++) {
			exif_data[i] = readByteFunction(readByteStream, conversion);
		}

		var mp_length;

//		go through all the APPx data blocks (e.g. APP0: JPEG FIF (JFIF)), looking for the Exif (APP1), 
//		IPTC Core (APP1), or IPTC (APP13) segment
		while (exif_data[0] == 0xFF  &&  exif_data[1] >= 0xE0  &&  exif_data[1] <= 0xFE) {	// E0 and FE
//			output.push('Handling APPx (0x' + exif_data[1].toString(16) + ') block');
			output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('handlingAPPx', [exif_data[1].toString(16)]));

//			Get the marker parameter length count
			mp_length = exif_data[3] + 256 * exif_data[2];
//			if (debug)  output.push('APPx (0x' + exif_data[1].toString(16) + ') Length = ' + mp_length);
			if (debug)  output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('appx', [exif_data[1].toString(16)], mp_length));

// 			Read and handle APPx data
			var app = exif_data[1];
			exif_data.length = 0;
			for (var i = 0 ; i < mp_length - 2 ; i++) {
				exif_data[i] = readByteFunction(readByteStream, conversion);
			}

			switch (app) {
				case 0xE1:	// Exif or IPTC Core
					error_num = AlanSRaskin.ExifViewer.Base.handleApp1(ifd0, subifd, ifd1, interop, gps, iptc_core, exif_data, suppressMakerNote, debug, output);
					break;
				case 0xED:	// possibly IPTC
					AlanSRaskin.ExifViewer.Base.handleApp13(iptc, exif_data);
					break;
				case 0xFE: // COM (JPEG Comment)
					AlanSRaskin.ExifViewer.Base.handleCOM(jpeg, exif_data);
					break;
			}

// 			Read file head, check next APPx
			for (var i = 0 ; i < 4 ; i++) {
				exif_data[i] = readByteFunction(readByteStream, conversion);
			}
		}
		output.push(AlanSRaskin.ExifViewer.Moz.getPString('endOfAPPx'));

//		if (exif_data[0] != 0xFF  ||  exif_data[1] != 0xE1) {
////    		output.push('Bad JPEG file head, APP1 (Exif) marker not found: 0x' + exif_data[0].toString(16) + ' 0x' + exif_data[1].toString(16));
//			output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('badJpegHead', [exif_data[0].toString(16) , exif_data[1].toString(16)]));
//			error_num = -1;
//		}
	}


//	if (error_num == 0) {
		if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz) {
			if (isURL) {	//   ||  isMailbox
				try {
					bis.close();
					channel.suspend();
				} catch (e) {
//					do nothing...
				}
			} else {
				try {
					sis.close();
					is.close();
				} catch (e) {
//					do nothing...
				}
			}
		} else {
			textStream.Close();
		}
//	}

	if (error_num != 0  ||  ifd0.status == -1) {
//		output.push('Status = ' + error_num);
		output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('status', [error_num]));
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'pre>' + output.join('\n') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'pre>', divName + '_err');
	}

	return error_num;
}	// getExifData()

AlanSRaskin.ExifViewer.Base.handleApp1 = function (ifd0, subifd, ifd1, interop, gps, iptc_core, exif_data, suppressMakerNote, debug, output) {
	var is_motorola = -1;
	var error_num = 0, status;
	var mp_length = exif_data.length;

//	if (debug)  output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('app1', [mp_length]));

//	Length includes itself, so must be at least 2
//	Following Exif data length must be at least 6
	if (mp_length < 8) {
		output.push(AlanSRaskin.ExifViewer.Moz.getPString('exifTooSmall'));
		error_num = -2;
	}

	if (error_num == 0) {
		// Read Exif head, check for "Exif"
		if (exif_data[0] == 0x45  &&  exif_data[1] == 0x78  &&  exif_data[2] == 0x69  &&  exif_data[3] == 0x66
				&&  exif_data[4] == 0  &&  exif_data[5] == 0)	{ // "Exif"
			if (mp_length < 12) {
				output.push(AlanSRaskin.ExifViewer.Moz.getPString('ifdLengthError'));
				error_num = -4;
			}
			exif_data = exif_data.slice(6);	// remove the leading Exif00 bytes
			mp_length -= 6;

			if (error_num == 0) {
//				Discover byte order
				if (exif_data[0] == 0x49  &&  exif_data[1] == 0x49) {	// 'II' ==> Intel
					is_motorola = 0;
				} else if (exif_data[0] == 0x4D && exif_data[1] == 0x4D) {	// 'MM' ==> Motorola
					is_motorola = 1;
				}
				if (is_motorola == -1) {
					output.push(AlanSRaskin.ExifViewer.Moz.getPString('invalidByteOrder'));
					error_num = -5;
				} else {
//					output.push('Endian = ' + (is_motorola ? 'Motorola' : 'Intel'));
					output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('endian', [(is_motorola ? 'Motorola' : 'Intel')]));
					ifd0.is_motorola = is_motorola;
				}
			}

			if (error_num == 0) {
//				Check Tag Mark
				if (is_motorola) {
					if (exif_data[2] != 0x00  ||  exif_data[3] != 0x2A) {
						output.push(AlanSRaskin.ExifViewer.Moz.getPString('invalidTagMark'));
						error_num = -6;
					}
				} else {
					if (exif_data[3] != 0x00  ||  exif_data[2] != 0x2A){
						output.push(AlanSRaskin.ExifViewer.Moz.getPString('invalidTagMark'));
						error_num = -6;
					}
				}
			}

        	if (error_num == 0) {
        //		Get first IFD offset (offset to IFD0)
        		var offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, 4, is_motorola);
        		if (offset > 0x0000FFFF) {
        			output.push(AlanSRaskin.ExifViewer.Moz.getPString('invalidIFD0Offset'));
        			error_num = -8;
        		}
        	}
        
        	if (ifd0  &&  error_num == 0) {
        		output.push(AlanSRaskin.ExifViewer.Moz.getPString('parsingIFD0'));
        		status = AlanSRaskin.ExifViewer.Base.parseIFD(ifd0, mp_length, exif_data, offset, is_motorola, debug, output);
        		ifd0.status = status;
        		if (status < 0) {
        			output.push(AlanSRaskin.ExifViewer.Moz.getPString('parseIFDerrorIFD0'));
        			error_num = status;
        		}
        	}
        
        	if (ifd0  &&  subifd  &&  error_num == 0  &&  ifd0.subifd_offset  &&  ifd0.subifd_offset > 0) {
        		offset = ifd0.subifd_offset;
        		output.push(AlanSRaskin.ExifViewer.Moz.getPString('parsingSubIFD'));
        		if (ifd0  &&  ifd0.x010f  &&  !suppressMakerNote) {
        			AlanSRaskin.ExifViewer.Makers.initializeMaker(ifd0.x010f, ifd0.x0110, subifd);
        		}
        		status = AlanSRaskin.ExifViewer.Base.parseIFD(subifd, mp_length, exif_data, offset, is_motorola, debug, output);
        		subifd.status = status;
        		if (status < 0) {
        			output.push(AlanSRaskin.ExifViewer.Moz.getPString('parseIFDerrorSubIFD'));
        			error_num = status;
        		}
        	}
        
        	if (ifd0  &&  ifd1  &&  error_num == 0  &&  ifd0.ifd1_offset  &&  ifd0.ifd1_offset > 0) {
        		offset = ifd0.ifd1_offset;
        		output.push(AlanSRaskin.ExifViewer.Moz.getPString('parsingIFD1'));
        		status = AlanSRaskin.ExifViewer.Base.parseIFD(ifd1, mp_length, exif_data, offset, is_motorola, debug, output);
        		ifd1.status = status;
        		if (status < 0) {
        			output.push(AlanSRaskin.ExifViewer.Moz.getPString('parseIFDerrorIFD1'));
        			error_num = status;
        		}
        	}
        	if (subifd  &&  interop  &&  error_num == 0  &&  subifd.iopifd_offset > 0) {
        		offset = subifd.iopifd_offset;
        		output.push(AlanSRaskin.ExifViewer.Moz.getPString('parsingInterop'));
        		status = AlanSRaskin.ExifViewer.Base.parseIFD(interop, mp_length, exif_data, offset, is_motorola, debug, output);
        		interop.status = status;
        		if (status < 0) {
        			output.push(AlanSRaskin.ExifViewer.Moz.getPString('parseIFDerrorInterop'));
        			error_num = status;
        		}
        	}
        
        	if (ifd0  &&  gps  &&  error_num == 0  &&  ifd0.gpsifd_offset > 0) {
        		offset = ifd0.gpsifd_offset;
        		output.push(AlanSRaskin.ExifViewer.Moz.getPString('parsingGPS'));
        		status = AlanSRaskin.ExifViewer.Base.parseIFD(gps, mp_length, exif_data, offset, is_motorola, debug, output);
        		gps.status = status;
        		if (status < 0) {
        			output.push(AlanSRaskin.ExifViewer.Moz.getPString('parseIFDerrorGPS'));
        			error_num = status;
        		}
        	}
		} else if (iptc_core  &&  exif_data[0] == 0x68  &&  exif_data[1] == 0x74  &&  exif_data[2] == 0x74  &&  exif_data[3] == 0x70
				&&  exif_data[4] == 0x3A  &&  exif_data[5] == 0x2F  &&  exif_data[6] == 0x2F  &&  exif_data[7] == 0x6E
				&&  exif_data[8] == 0x73  &&  exif_data[9] == 0x2E  &&  exif_data[10] == 0x61  &&  exif_data[11] == 0x64 
				&&  exif_data[12] == 0x6F  &&  exif_data[13] == 0x62  &&  exif_data[14] == 0x65  &&  exif_data[15] == 0x2E 
				&&  exif_data[16] == 0x63  &&  exif_data[17] == 0x6F  &&  exif_data[18] == 0x6D  &&  exif_data[19] == 0x2F 
				&&  exif_data[20] == 0x78  &&  exif_data[21] == 0x61  &&  exif_data[22] == 0x70  &&  exif_data[23] == 0x2F 
				&&  exif_data[24] == 0x31  &&  exif_data[25] == 0x2E  &&  exif_data[26] == 0x30  &&  exif_data[27] == 0x2F
				&&  exif_data[28] == 0x00) {	// namespace = "http://ns.adobe.com/xap/1.0/" ==> IPTC Core
												// reference: http://partners.adobe.com/public/developer/en/xmp/sdk/XMPspecification.pdf
			var xml = '';
			// last 31 characters seem to consist of spaces followed by <?xpacket end='w'?>
			for (var i = 29 ; i < mp_length /*- 31*/ ; i++) {
//				if (exif_data[i] == 0)  break;
				xml += String.fromCharCode(exif_data[i]);
			}
			iptc_core.xml = xml;
			iptc_core.status = 0;
		} else {
//			output.push('Exif string not detected: 0x' + exif_data[0].toString(16)
//						+ ' 0x' + exif_data[1].toString(16) + ' 0x' + exif_data[2].toString(16)
//						+ ' 0x' + exif_data[3].toString(16) + ' 0x' + exif_data[4].toString(16)
//						+ ' 0x' + exif_data[5].toString(16));
			output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('exifNotDetected', [exif_data[0].toString(16) , exif_data[1].toString(16) ,
							exif_data[2].toString(16) , exif_data[3].toString(16) , exif_data[4].toString(16) ,
							exif_data[5].toString(16)]));
			error_num = -3;
		}
	}

	return error_num;
}	// handleApp1()

AlanSRaskin.ExifViewer.Base.handleApp13 = function (iptc, exif_data) {
	if (iptc) {
		var status = AlanSRaskin.ExifViewer.IPTC.parseIPTC(iptc, exif_data);
		iptc.status = status;
	}
}	// handleApp13()

AlanSRaskin.ExifViewer.Base.handleCOM = function (jpeg, exif_data) {
	var text = [];
	for (var i = 0 ; i < exif_data.length ; i++) {
		text.push(String.fromCharCode(exif_data[i]));
	}
	jpeg.comment = text.join('');
} // handleCOM()

AlanSRaskin.ExifViewer.Base.dumpJPEGcomment = function (divName, jpeg) {
	if (jpeg.comment) {
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>' 
			+ AlanSRaskin.ExifViewer.Moz.getPString('jpegComment') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 
			+ 'h2>' + '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>' + jpeg.comment.replace(/\0/g, ' ').replace(/&/g, '&amp;') + '<\/' 
			+ AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>', divName + '_jpeg');
	}
}	// dumpJPEGcomment()

AlanSRaskin.ExifViewer.Base.dumpAssembledExifData = function (output, divName, bTables) {
	if (bTables) {
		var re = new RegExp('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>', 'gi');
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'table class="exif_output" cellspacing="0" id="table_' + divName + '">'
					+ '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td class="first">' 
					+ output.join('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>').replace(/( = |:&#160;)/g, '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>').replace(re, '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td class="first">')
					+ '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'table>', divName);
	} else {	/* list */
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>' 
					+ output.join('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>') 
					+ '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>', divName);
	}
}	// dumpAssembledExifData()

AlanSRaskin.ExifViewer.Base.dumpExifData = function (divName, ifd0, subifd, ifd1, interop, gps, basic, table, tagid) {
	var is_motorola = -1;
	var output = [];
	if (ifd0  &&  ifd0.status == 0) {
		is_motorola = ifd0.is_motorola;
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a name="ifd0" id="a_ifd0"><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>', divName + '_ifd0');
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>' + AlanSRaskin.ExifViewer.Moz.getPString('exifIFD0') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>', divName + '_ifd0');
		AlanSRaskin.ExifViewer.Base.parseExifTagData(ifd0, output, is_motorola, basic, tagid);
		AlanSRaskin.ExifViewer.Base.dumpAssembledExifData(output, divName + '_ifd0', table);
		output.length = 0;
	}
	if (subifd  &&  subifd.status == 0) {
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a name="sub" id="a_sub"><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>', divName + '_subifd');
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>' + AlanSRaskin.ExifViewer.Moz.getPString('exifSubIFD') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>', divName + '_subifd');
		AlanSRaskin.ExifViewer.Base.parseExifTagData(subifd, output, is_motorola, basic, tagid);
//		AlanSRaskin.ExifViewer.Base.displayText('<ul><li>' + output.join('<\/li><li>') + '<\/li><\/ul>', divName);
//		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>' + output.join('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>', divName + '_subifd');
		AlanSRaskin.ExifViewer.Base.dumpAssembledExifData(output, divName + '_subifd', table);
		output.length = 0;
		if (ifd0  &&  ifd0.x010f  &&  subifd.maker) {
			AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a name="maker" id="a_maker"><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>', divName + '_mn');
			if (!basic)  AlanSRaskin.ExifViewer.Makers.dumpExifMakerTagData(subifd.maker, output, is_motorola, divName + '_mn', table);
		}
	}
	if (ifd1  &&  ifd1.status == 0  &&  !basic) {
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a name="ifd1" id="a_ifd1"><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>', divName + '_ifd1');
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>' + AlanSRaskin.ExifViewer.Moz.getPString('exifIFD1') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>', divName + '_ifd1');
		AlanSRaskin.ExifViewer.Base.parseExifTagData(ifd1, output, is_motorola, basic, tagid);
//		AlanSRaskin.ExifViewer.Base.displayText('<ul><li>' + output.join('<\/li><li>') + '<\/li><\/ul>', divName);
//		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>' + output.join('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>', divName + '_ifd1');
		AlanSRaskin.ExifViewer.Base.dumpAssembledExifData(output, divName + '_ifd1', table);
		output.length = 0;
	}
	if (interop  &&  interop.status == 0  &&  !basic) {
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a name="iop" id="a_iop"><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>', divName + '_iop');
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>' +  AlanSRaskin.ExifViewer.Moz.getPString('exifInterop') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>', divName + '_iop');
		AlanSRaskin.ExifViewer.Base.parseExifTagData(interop, output, is_motorola, basic, tagid);
//		AlanSRaskin.ExifViewer.Base.displayText('<ul><li>' + output.join('<\/li><li>') + '<\/li><\/ul>', divName);
//		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>' + output.join('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>', divName + '_iop');
		AlanSRaskin.ExifViewer.Base.dumpAssembledExifData(output, divName + '_iop', table);
		output.length = 0;
	}
	if (gps  &&  gps.status == 0  &&  !basic) {
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a name="gps" id="a_gps"><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>', divName + '_gps');
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>' + AlanSRaskin.ExifViewer.Moz.getPString('exifGPS') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>', divName + '_gps');
		AlanSRaskin.ExifViewer.Base.parseExifTagData(gps, output, is_motorola, basic, tagid);
//		AlanSRaskin.ExifViewer.Base.displayText('<ul><li>' + output.join('<\/li><li>') + '<\/li><\/ul>', divName);
//		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>' + output.join('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>', divName + '_gps');
		AlanSRaskin.ExifViewer.Base.dumpAssembledExifData(output, divName + '_gps', table);
		output.length = 0;
	}
}	// dumpExifData()

AlanSRaskin.ExifViewer.Base.getFileInformation = function (fileInfo, file) {	// IE only
	fileInfo.attributes = file.Attributes;
	fileInfo.dateCreated = file.DateCreated;
	fileInfo.dateLastAccessed = file.dateLastAccessed;
	fileInfo.DateLastModified = file.DateLastModified;
	fileInfo.drive = file.Drive;
	fileInfo.name = file.Name;
	fileInfo.path = file.Path;
	fileInfo.shortName = file.ShortName;
	fileInfo.shortPath = file.ShortPath;
	fileInfo.size = file.Size;
	fileInfo.type = file.Type;
	var tmp = [];
	if (fileInfo.attributes & 0x0001) {
		tmp.push('read-only');
	}
	if (fileInfo.attributes & 0x0002) {
		tmp.push('hidden');
	}
	if (fileInfo.attributes & 0x0004) {
		tmp.push('system');
	}
	if (fileInfo.attributes & 0x0020) {
		tmp.push('archive');
	}
	if (fileInfo.attributes & 0x0040) {
		tmp.push('alias/shortcut');
	}
	if (fileInfo.attributes & 0x0800) {
		tmp.push('compressed');
	}
	if (tmp.length == 0) {
		tmp.push('normal');
	}
	fileInfo.interpretedAttributes = tmp.join('; ');
}	// getFileInformation()

AlanSRaskin.ExifViewer.Base.parseIFD = function (ifd, mp_length, exif_data, offset, is_motorola, debug, output) {
	var error_num = 0;

//	if (debug)  output.push('IFD scan starting: ' + ifd.type);
	if (debug)  output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('ifdScan', [ifd.type]));

	if (offset > mp_length - 2) {
		output.push(AlanSRaskin.ExifViewer.Moz.getPString('offsetPointsOutside'));
		error_num = -9;
	}
	if (debug)  output.push('parseIFD: offset = ' + offset);

	if (error_num == 0) {
//		Get the number of directory entries contained in this IFD
		var number_of_tags = AlanSRaskin.ExifViewer.Base.getShort(exif_data, offset, is_motorola);
		ifd.number_of_tags = number_of_tags;
		if (number_of_tags == 0  ||  number_of_tags > 1000) {	// second part is a work-around for some JPEGs rotated by MS Photo Viewer 
			output.push(AlanSRaskin.ExifViewer.Moz.getPString('noDirectoryEntries'));
			error_num = +1;
		} else {
//			output.push(number_of_tags + ' directory entries (tags) found');
			output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('numberOfTags', [number_of_tags]));
			offset += 2;
		}
	}

	if (error_num == 0) {
		for ( ; error_num == 0 ; ) {
    		if (offset > mp_length - 12) {
				output.push(AlanSRaskin.ExifViewer.Moz.getPString('beyondEnd'));
				error_num = -11;
			} else {
//				alert(mp_length + '\n' + exif_data.length + '\n' + offset);
				AlanSRaskin.ExifViewer.Base.getExifTagData(ifd, mp_length, exif_data, offset, is_motorola, debug, output);
				offset += 12;
				if (--number_of_tags == 0) {
					if (debug)  output.push(AlanSRaskin.ExifViewer.Moz.getPString('noMoreDirectories'));
					if (ifd.type == 'IFD0')  ifd.ifd1_offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset, is_motorola);
//					if (debug)  output.push('IFD1 offset = ' + ifd.ifd1_offset);
					if (debug)  output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('ifd1Offset', [ifd.ifd1_offset]));
					break;
				}
			}
		}
	}
	if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz  &&  ifd.type == 'IFD1'  &&  ifd.x0103  &&  ifd.x0201  &&  ifd.x0202) {
		if (ifd.x0103 == 6) {	// compression ==> thumbnail is JPEG image
			var tn_offset = ifd.x0201;
			var tn_length = ifd.x0202;
			if (tn_offset + tn_length <= exif_data.length) {
				ifd.thumbnail = exif_data.slice(tn_offset, tn_offset + tn_length);
			}
		}
	}
	if (debug)  output.push(AlanSRaskin.ExifViewer.Moz.getPString('ifdScanCompleted'));
	ifd.status = error_num;
	return error_num;
}	// parseIFD()

AlanSRaskin.ExifViewer.Base.parseExifTagData = function (ifd, output, is_motorola, basic, tagid) {
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			var tagnum = parseInt('0' + t, 16);
			if (basic  &&  !AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[tagnum])  continue;
			var data = ifd[t];
//			AlanSRaskin.ExifViewer.Base.displayText('Tagnum = ' + tagnum + '  ===>  data = ' + data + '  type = ' + ifd.type);
			switch (tagnum) {
			case 0x8769:	// Exif IFD: pointer to Exif SubIFD in IFD0
			case 0x8825:	// GPS Info IFD Pointer
			case 0xA005:	// Interoperability IFD Pointer
			case 0x0201:	// JPEG Interchange Format Offset (offset of embedded thumbnail image)
			case 0x0202:	// JPEG Interchange Format Byte Count (size of thumbnail)
				// no need to dump this internal data!
				break;
			case 0x927C:	// MakerNote
				var out = AlanSRaskin.ExifViewer.Tags.getExifInterpretedTagData(tagnum, data, ifd.type, tagid);
				output.push(out);
				ifd.makerNote = data;
				if (ifd.model  &&  ifd.model == 'ikeGPS') {	// make == 'Surveylab Ltd (www.ikegps.com)'
					AlanSRaskin.ExifViewer.Base.processIKEdata(data, output);
				}
				break;
			case 0x0004:
				if (ifd.type == 'GPS') {
					var lat = AlanSRaskin.ExifViewer.Base.formatLatLong2(ifd.x0002, 6);
					var lon = AlanSRaskin.ExifViewer.Base.formatLatLong2(ifd.x0004, 6);
					var alt = ifd.x0006 ? AlanSRaskin.ExifViewer.Base.formatRational(ifd.x0006, 2) : 0;
					if (ifd.x0001  &&  ifd.x0001.substring) {
						switch (ifd.x0001.substring(0, 1).toLowerCase()) {
							case 'south':
							case 's':
								lat = -lat;
								break;
							case 'north':
							case 'n':
							default:
								break;
						}
					}
					if (ifd.x0003  &&  ifd.x0003.substring) {
						switch (ifd.x0003.substring(0, 1).toLowerCase()) {
							case 'west':
							case 'w':
								lon = -lon;
								break;
							case 'east':
							case 'e':
							default:
								break;
						}
					}
					output.push(AlanSRaskin.ExifViewer.Tags.getExifInterpretedTagData(tagnum, data, ifd.type, tagid));
					var style = 'style="text-decoration:underline;cursor:pointer"';
					var out = [];
					// Photograph%20Location@
					var href = 'http://maps.google.com/maps?q=' + lat + ',' + lon + '&z=15';
					out.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a href="' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(href) + '" target="exif" ' + style + '>' + AlanSRaskin.ExifViewer.Moz.getPString('google') + '</' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>');
//					href = 'http://maps.yahoo.com/index.php#mvt=m&trf=0&lon=' + lon + '&lat=' + lat + '&mag=8';
					href = 'http://maps.yahoo.com/#q1=++&mvt=m&trf=0&lon=' + lon + '&lat=' + lat + '&zoom=13';
					out.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a href="' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(href) + '" target="exif" ' + style + '>' + AlanSRaskin.ExifViewer.Moz.getPString('yahoo') + '</' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>');
//					href = 'http://maps.msn.com/map.aspx?C=' + lat + ',' + lon + '&A=50&S=405,320';
					href = 'http://www.bing.com/maps/?cp=' + lat + '%7e' + lon + '&lvl=16';
					out.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a href="' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(href) + '" target="exif" ' + style + '>' + AlanSRaskin.ExifViewer.Moz.getPString('msn') + '</' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>');
					href = 'http://www.mapquest.com/maps/map.adp?searchtype=address&formtype=latlong&latlongtype=decimal&latitude=' + lat + '&longitude=' + lon;
					out.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a href="' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(href) + '" target="exif" ' + style + '>' + AlanSRaskin.ExifViewer.Moz.getPString('mapquest') + '</' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>');

					var gpsdata = [];
					if (ifd.x0002)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x02x01b', [(ifd.x0001 ? ifd.x0001 : '') , AlanSRaskin.ExifViewer.Base.formatLatLong(ifd.x0002, 5)]));	// GPSLatitude (GPS IFD)
					if (ifd.x0004)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x04x03b', [(ifd.x0003 ? ifd.x0003 : '') , AlanSRaskin.ExifViewer.Base.formatLatLong(ifd.x0004, 5)]));	// GPSLongitude (GPS IFD)
//					if (ifd.x0006)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x06x05b', [AlanSRaskin.ExifViewer.Base.formatRational(ifd.x0006, 2) , (ifd.x0005 == 0 ? 'sea level' : 'sea level reference (negative value)')]));	// GPSAltitude (GPS IFD)
					if (ifd.x0006)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x06', [ifd.x0006 , AlanSRaskin.ExifViewer.Base.formatRational(ifd.x0006, 2)]));	// GPSAltitude (GPS IFD)
					if (ifd.x0005)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x05', [(ifd.x0005 == 0 ? 'sea level' : 'sea level reference (negative value)')]));	// GPSAltitudeRef (GPS IFD)
					if (ifd.x001D)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1D', [ifd.x001D]));	// GPSDateStamp (GPS IFD)
					if (ifd.x0007)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x07b', [AlanSRaskin.ExifViewer.Base.formatTimestamp(ifd.x0007, 2)]));	// GPSTimeStamp (GPS IFD)
					if (ifd.x0012)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x12', [ifd.x0012]));	// GPSMapDatum (GPS IFD)
					if (ifd.x0011)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x11', [ifd.x0011]));	// GPSImgDirection (GPS IFD)
					if (ifd.x0010) {	// GPSImgDirectionRef (GPS IFD)
						var GPSImgDirectionRefs = {};
						GPSImgDirectionRefs.T = 'true direction';
						GPSImgDirectionRefs.M = 'magnetic direction';
						gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x10', [GPSImgDirectionRefs[data] ? AlanSRaskin.ExifViewer.Moz.getPString(GPSImgDirectionRefs[data]) : data]));
					}
/*
					if (ifd.x0000)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x00', [ifd.x0000]));	// GPSVersionID (GPS IFD)
					if (ifd.x0001)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x01', [ifd.x0001]));	// GPSLatitudeRef (GPS IFD) 
					if (ifd.x0002)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x02', [ifd.x0002 , AlanSRaskin.ExifViewer.Base.formatLatLong(ifd.x0002, 5)]));	// GPSLatitude (GPS IFD)
					if (ifd.x0003)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x03', [ifd.x0003]));	// GPSLongitudeRef (GPS IFD)
					if (ifd.x0004)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x04', [ifd.x0004 , AlanSRaskin.ExifViewer.Base.formatLatLong(ifd.x0004, 5)]));	// GPSLongitude (GPS IFD)
					if (ifd.x0008)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x08', [ifd.x0008]));	// GPSSatellites (GPS IFD)
					if (ifd.x0009) {	// GPSStatus (GPS IFD)
						var GPSStatuses = {};
						GPSStatuses.A = 'measurement in progress';
						GPSStatuses.V = 'measurement interoperability';
						gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x09', [AlanSRaskin.ExifViewer.Moz.getPString(GPSStatuses[ifd.x0009])]));
				}
					if (ifd.x000A) {	// GPSMeasureMode (GPS IFD)
						var GPSMeasureModes = new Array('n/a (0)', '2-dimensional (1)', '3-dimensional (2)');
    					gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0A', [AlanSRaskin.ExifViewer.Moz.getPString(GPSMeasureModes[ifd.x000A])]));
					}
					if (ifd.x000B)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0A', [ifd.x000B]));	// GPSDOP (GPS IFD)
					if (ifd.x000C) {	// GPSSpeedRef (GPS IFD)
						var GPSSpeedRefs = {};
						GPSSpeedRefs.K = 'kilometers per hour';
						GPSSpeedRefs.M = 'miles per hour';
						GPSSpeedRefs.N = 'knots';
						gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0C', [AlanSRaskin.ExifViewer.Moz.getPString(GPSSpeedRefs[ifd.x000C])]));
					}
					if (ifd.x000D)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0D', [ifd.x000D , AlanSRaskin.ExifViewer.Base.formatRational(ifd.x000D, 2)]));	// GPSSpeed (GPS IFD)
					if (ifd.x000E) {	// GPSTrackRef (GPS IFD)
						var GPSTrackRefs = {};
						GPSTrackRefs.T = 'true direction';
						GPSTrackRefs.M = 'magnetic direction';
						gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0E', [AlanSRaskin.ExifViewer.Moz.getPString(GPSTrackRefs[ifd.x000E])]));
					}
					if (ifd.x000F)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0F', [ifd.x000F]));	// GPSTrack (GPS IFD)
					if (ifd.x0013)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x13', [ifd.x0013]));	// GPSDestLatitudeRef (GPS IFD)
					if (ifd.x0014)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x14', [ifd.x0014 , AlanSRaskin.ExifViewer.Base.formatLatLong(ifd.x0014, 5)]));	// GPSDestLatitude (GPS IFD)
					if (ifd.x0015)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x15', [ifd.x0015]));	// GPSDestLongitudeRef (GPS IFD)
					if (ifd.x0016)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x16', [ifd.x0016 , AlanSRaskin.ExifViewer.Base.formatLatLong(ifd.x0016, 5)]));	// GPSDestLongitude (GPS IFD)
					if (ifd.x0017) {	// GPSDestBearingRef (GPS IFD)
						var GPSDestBearingRefs = {};
						GPSDestBearingRefs.T = 'true direction';
						GPSDestBearingRefs.M = 'magnetic direction';
						gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x17', [AlanSRaskin.ExifViewer.Moz.getPString(GPSDestBearingRefs[ifd.x0017])]));
					}
					if (ifd.x0018)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x18', [ifd.x0018]));	// GPSDestBearing (GPS IFD)
					if (ifd.x0019) {	// GPSDestDistanceRef (GPS IFD)
						var GPSDestDistanceRefs = {};
						GPSDestDistanceRefs.K = 'kilometers';
						GPSDestDistanceRefs.M = 'miles';
						GPSDestDistanceRefs.N = 'knots';
						gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x19', [AlanSRaskin.ExifViewer.Moz.getPString(GPSDestDistanceRefs[ifd.x0019])]));
					}
					if (ifd.x001A)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1A', [ifd.x001A]));	// GPSDestDistance (GPS IFD)
					if (ifd.x001B)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1B', [ifd.x001B]));	// GPSProcessingMethod (GPS IFD)
					if (ifd.x001C)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1C', [ifd.x001C]));	// GPSAreaInformation (GPS IFD)
					if (ifd.x001E)	gpsdata.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1E', [(ifd.x001E == 0 ? AlanSRaskin.ExifViewer.Moz.getPString('no differential correction (0)') : AlanSRaskin.ExifViewer.Moz.getPString('differential correction applied (1)'))]));	// GPSDifferential (GPS IFD)
/**/
					AlanSRaskin.ExifViewer.Base.exifasr_kml = AlanSRaskin.ExifViewer.Base.getKMLString(AlanSRaskin.ExifViewer.Base.exifasr_fileName, gpsdata.join('<br>\n'), lat, lon, alt);
					if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz) {
//						out.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'span ' + style + ' onclick="AlanSRaskin.ExifViewer.Moz.copyKMLtoClipboard()">' + AlanSRaskin.ExifViewer.Moz.getPString('copyKMLtoClipboard') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'span>');
						out.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'span ' + style + ' onclick="AlanSRaskin.ExifViewer.Moz.launchKML()">' + AlanSRaskin.ExifViewer.Moz.getPString('launchKMLGE') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'span>');
						out.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'span ' + style + ' onclick="AlanSRaskin.ExifViewer.Moz.saveKMLtoFile(false)">' + AlanSRaskin.ExifViewer.Moz.getPString('saveKMLtoFile') + '</' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'span>');
						out.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'span ' + style + ' onclick="AlanSRaskin.ExifViewer.Moz.saveKMLtoFile(true)">' + AlanSRaskin.ExifViewer.Moz.getPString('saveKMLtoFileGE') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'span>');
					}
					output.push(AlanSRaskin.ExifViewer.Moz.getPString('onlineMappingLinks') + '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>' + out.join('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>') + '</' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li></' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>');
				}
				break;
			default:
				output.push(AlanSRaskin.ExifViewer.Tags.getExifInterpretedTagData(tagnum, data, ifd.type, tagid));
				break;
			}
		}
	}
	if (AlanSRaskin.ExifViewer.Base.exifasr_isMoz  &&  ifd.type == 'IFD1'  &&  ifd.thumbnail) {
		output.push(AlanSRaskin.ExifViewer.Moz.getPString('thumbnail') + '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'img src="' + AlanSRaskin.ExifViewer.Base.getThumbnailAsDataURL(ifd.thumbnail) + '" class="thumbnail" />'); //></' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'img>');
	}
}	// parseExifTagData()

AlanSRaskin.ExifViewer.Base.getKMLString = function (name, desc, lat, lon, alt) {
	var out = [];
	out.push('<?xml version="1.0" encoding="UTF-8"?>');
	out.push('<kml xmlns="http:\/\/www.opengis.net\/kml\/2.2">');
	out.push('<Document>');
	out.push('	<name>KML file generated by Exif Viewer<\/name>');
	out.push('	<Style id="sh_camera">');
	out.push('		<IconStyle>');
	out.push('			<scale>1.4<\/scale>');
	out.push('			<Icon>');
	out.push('				<href>http:\/\/maps.google.com\/mapfiles\/kml\/shapes\/camera.png<\/href>');
	out.push('			<\/Icon>');
	out.push('			<hotSpot x="0.5" y="0" xunits="fraction" yunits="fraction"\/>');
	out.push('		<\/IconStyle>');
//	out.push('		<ListStyle>');
//	out.push('		<\/ListStyle>');
	out.push('	<\/Style>');
	out.push('	<StyleMap id="msn_camera">');
	out.push('		<Pair>');
	out.push('			<key>normal<\/key>');
	out.push('			<styleUrl>#sn_camera<\/styleUrl>');
	out.push('		<\/Pair>');
	out.push('		<Pair>');
	out.push('			<key>highlight<\/key>');
	out.push('			<styleUrl>#sh_camera<\/styleUrl>');
	out.push('		<\/Pair>');
	out.push('	<\/StyleMap>');
	out.push('	<Style id="sn_camera">');
	out.push('		<IconStyle>');
	out.push('			<scale>1.2<\/scale>');
	out.push('			<Icon>');
	out.push('				<href>http:\/\/maps.google.com\/mapfiles\/kml\/shapes\/camera.png<\/href>');
	out.push('			<\/Icon>');
	out.push('			<hotSpot x="0.5" y="0" xunits="fraction" yunits="fraction"\/>');
	out.push('		<\/IconStyle>');
//	out.push('		<ListStyle>');
//	out.push('		<\/ListStyle>');
	out.push('	<\/Style>');
	out.push('	<Placemark>');
	out.push('		<name>' + name + '<\/name>');
	out.push('		<description>');
	out.push('<![CDATA[');
	out.push(desc);
	out.push(']]>');
	out.push('		<\/description>');
	out.push('		<styleUrl>#msn_camera<\/styleUrl>');
	out.push('		<Point>');
	out.push('			<altitudeMode>clampToGround<\/altitudeMode>');
	out.push('			<coordinates>' + lon + ',' + lat + ',' + alt + '<\/coordinates>');
	out.push('		<\/Point>');
	out.push('	<\/Placemark>');
	out.push('<\/Document>');
	out.push('<\/kml>');
	return out.join('\n');
}	// getKMLString()

AlanSRaskin.ExifViewer.Base.getThumbnailAsDataURL = function (buffer) {
	// Convert the data to a URL-encoded string
	var tmp = [];
	for (var i = 0 ; i < buffer.length ; i++) {
		var ch = parseInt(buffer[i], 10).toString(16);
		tmp.push(('0' + ch).substr(ch.length - 1, 2));
	}
	var encodedString = '%' + tmp.join('%');

	// And return it all as a data: URL
	return "data:image/png," + encodedString;
}	// getThumbnailAsDataURL()

AlanSRaskin.ExifViewer.Base.getExifTagData = function (ifd, mp_length, exif_data, offset, is_motorola, debug, output) {
	var tagFormats = ['n/a (0)', 'unsigned byte (1)', 'ascii string (2)', 'unsigned short (3)',
								'unsigned long (4)', 'unsigned rational (5)', 'signed byte (6)',
								'undefined (7)', 'signed short (8)', 'signed long (9)',
								'signed rational (10)', 'single float (11)', 'double float (12)'];
//	Get Tag number
	var tagnum = AlanSRaskin.ExifViewer.Base.getShort(exif_data, offset, is_motorola);
	var format = AlanSRaskin.ExifViewer.Base.getShort(exif_data, offset+2, is_motorola);
	var number_of_components = AlanSRaskin.ExifViewer.Base.getShort(exif_data, offset+4, is_motorola);
	var data;
	switch (format) {
		case 1:
			data = AlanSRaskin.ExifViewer.Base.getExifByteData(exif_data, offset, is_motorola, debug);
			break;
		case 2:
			data = AlanSRaskin.ExifViewer.Base.getExifStringData(exif_data, offset, is_motorola, debug);
			break;
		case 3:
			data = AlanSRaskin.ExifViewer.Base.getExifShortData(exif_data, offset, is_motorola, debug);
			break;
		case 4:
			data = AlanSRaskin.ExifViewer.Base.getExifLongData(exif_data, offset, is_motorola, debug);
			break;
		case 5:
			data = AlanSRaskin.ExifViewer.Base.getExifRationalData(exif_data, offset, is_motorola, debug);
			break;
		case 6:
			data = AlanSRaskin.ExifViewer.Base.getExifSignedByteData(exif_data, offset, is_motorola, debug);
			break;
		case 7:
			data = AlanSRaskin.ExifViewer.Base.getExifByteData(exif_data, offset, is_motorola, debug);
			break;
		case 8:
			data = AlanSRaskin.ExifViewer.Base.getExifSignedShortData(exif_data, offset, is_motorola, debug);
			break;
		case 9:
			data = AlanSRaskin.ExifViewer.Base.getExifSignedLongData(exif_data, offset, is_motorola, debug);
			break;
		case 10:
			data = AlanSRaskin.ExifViewer.Base.getExifSignedRationalData(exif_data, offset, is_motorola, debug);
			break;
		case 11:
			data = '(' + tagFormats[format] + ')';
			break;
		case 12:
			data = '(' + tagFormats[format] + ')';
			break;
		default:
			data = '(' + format + ')';
			break;
	}
	if (tagnum == 0x927C) {	// MakerNote
//		ifd.makerNoteOffset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
		var makerNoteOffset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
		if (ifd.maker) {
			AlanSRaskin.ExifViewer.Makers.parseMaker(ifd.maker, exif_data, mp_length, is_motorola, makerNoteOffset, data, debug, output);
		}
	}
	if (debug) {
//		output.push('Tag number 0x' + tagnum.toString(16).toUpperCase() + ' detected');
		output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('tagNumber', [tagnum.toString(16).toUpperCase()]));
//		output.push('Tag format = ' + format + ' (' + TagFormats[format] + ')');
		output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('tagFormat', [format , AlanSRaskin.ExifViewer.Moz.getPString(format < TagFormats.length ? TagFormats[format] : 'other')]));
//		output.push('Tag count = ' + number_of_components);
		output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('tagCount', [number_of_components]));
//		output.push('Tag data = ' + data);
		output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('tagData', [data]));
	}
	var hash = AlanSRaskin.ExifViewer.Base.zeroPad(tagnum);
	ifd['x' + hash] = data;
	switch (tagnum) {
		case 0x8769:	// Exif IFD: pointer to Exif SubIFD in IFD0
			ifd.subifd_offset = data;
			break;
		case 0x8825:	// GPS Info IFD Pointer
			ifd.gpsifd_offset = data;
			break;
		case 0xA005:	// Interoperability IFD Pointer
			ifd.iopifd_offset = data;
			break;
	}
	return;
}	// getExifTagData()

AlanSRaskin.ExifViewer.Base.zeroPad = function (tagnum) {
	if (tagnum < 0x0010) {
		return '000' + tagnum.toString(16);
	} else if (tagnum < 0x0100) {
		return '00' + tagnum.toString(16);
	} else if (tagnum < 0x1000) {
		return '0' + tagnum.toString(16);
	}
	return tagnum.toString(16);
}	// zeroPad()

// 0 and 1 are the tag
// 2 and 3 are the data type (0x0002 ==> ==> ascii string)
// 4 through 7 are the number of components
// 8 through 11 are the data if the # of components * component size <= 4
// otherwise, they form a pointer to the site of the actual data
AlanSRaskin.ExifViewer.Base.getExifStringData = function (exif_data, offset, is_motorola, debug) {
	var data = '';
	var number_of_components = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+4, is_motorola);
/*
	if (debug) {
		AlanSRaskin.ExifViewer.Base.displayText('getExifStringData: # of components = ' + number_of_components);
		for (var i = 4 ; i < 8 ; i++) {
			AlanSRaskin.ExifViewer.Base.displayText('getExifStringData: ' + i + ' ==> ' + exif_data[offset+i].toString(16));
		}
	}
*/
	if (number_of_components <= 4) {
		data = '';
		for (var i = 8 ; i <= 11 ; i++) {
			data += (exif_data[offset+i] != 0 ? String.fromCharCode(exif_data[offset+i]) : '');	// was ';'
		}
	} else {
		var data_offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
//		AlanSRaskin.ExifViewer.Base.displayText('getExifStringData: Data offset = ' + data_offset + '\n' + exif_data.length);
		if (data_offset + number_of_components > exif_data.length) {
			AlanSRaskin.ExifViewer.Base.offsetError(data_offset, number_of_components, exif_data.length, 'String');
			return '???';
		}
		for (var i = data_offset ; i < data_offset + 1 * number_of_components ; i++) {
//			if (debug)  AlanSRaskin.ExifViewer.Base.displayText('getExifStringData: ' + i + ' ==> ' + exif_data[i].toString(16));
			if (exif_data[i] == 0) {
				data += '';	// was ';';
			} else {
				data += String.fromCharCode(exif_data[i]);
			}
//			if (debug)  AlanSRaskin.ExifViewer.Base.displayText('getExifStringData: ' + data);
		}
	}
	return AlanSRaskin.ExifViewer.Base.cleanExifStringData(data);
}	// getExifStringData()

AlanSRaskin.ExifViewer.Base.getExifByteData = function (exif_data, offset, is_motorola, debug) {
	var data = [];
	var number_of_components = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+4, is_motorola);
/*
	if (debug) {
		AlanSRaskin.ExifViewer.Base.displayText('getExifByteData: # of components = ' + number_of_components);
		for (var i = 4 ; i < 8 ; i++) {
			AlanSRaskin.ExifViewer.Base.displayText('getExifByteData: ' + i + ' ==> ' + exif_data[offset+i].toString(16));
		}
	}
*/
	if (number_of_components <= 4) {
		data.push(AlanSRaskin.ExifViewer.Base.byteToHex(exif_data[offset+8]));
		data.push(AlanSRaskin.ExifViewer.Base.byteToHex(exif_data[offset+9]));
		data.push(AlanSRaskin.ExifViewer.Base.byteToHex(exif_data[offset+10]));
		data.push(AlanSRaskin.ExifViewer.Base.byteToHex(exif_data[offset+11]));
	} else {
		var data_offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
		if (data_offset + number_of_components > exif_data.length) {
			AlanSRaskin.ExifViewer.Base.offsetError(data_offset, number_of_components, exif_data.length, 'Byte');
			return '0x21,0x21';
		}
//		AlanSRaskin.ExifViewer.Base.displayText('getExifByteData: Data offset = ' + data_offset + '\n' + exif_data.length);
//		if (data_offset >= exif_data.length)  return ['-1'];
		for (var i = data_offset ; i < data_offset + 1 * number_of_components ; i++) {
//			if (debug)  AlanSRaskin.ExifViewer.Base.displayText('getExifByteData: ' + i + ' ==> ' + exif_data[i].toString(16));
			data.push(AlanSRaskin.ExifViewer.Base.byteToHex(exif_data[i]));
//			if (debug)  AlanSRaskin.ExifViewer.Base.displayText('getExifByteData: ' + data);
		}
	}
	return data.join(',');
}	// getExifByteData()

AlanSRaskin.ExifViewer.Base.getExifSignedByteData = function (exif_data, offset, is_motorola, debug) {
	var data = [];
	var number_of_components = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+4, is_motorola);
/*
	if (debug) {
		AlanSRaskin.ExifViewer.Base.displayText('getExifByteData: # of components = ' + number_of_components);
		for (var i = 4 ; i < 8 ; i++) {
			AlanSRaskin.ExifViewer.Base.displayText('getExifByteData: ' + i + ' ==> ' + exif_data[offset+i].toString(16));
		}
	}
*/
	if (number_of_components <= 4) {
		data.push(AlanSRaskin.ExifViewer.Base.signedByte(exif_data[offset+8]));
		data.push(AlanSRaskin.ExifViewer.Base.signedByte(exif_data[offset+9]));
		data.push(AlanSRaskin.ExifViewer.Base.signedByte(exif_data[offset+10]));
		data.push(AlanSRaskin.ExifViewer.Base.signedByte(exif_data[offset+11]));
	} else {
		var data_offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
		if (data_offset + number_of_components > exif_data.length) {
			AlanSRaskin.ExifViewer.Base.offsetError(data_offset, number_of_components, exif_data.length, 'SignedByte');
			return '0x21,0x21';
		}
//		AlanSRaskin.ExifViewer.Base.displayText('getExifSignedByteData: Data offset = ' + data_offset + '\n' + exif_data.length);
//		if (data_offset >= exif_data.length)  return ['-1'];
		for (var i = data_offset ; i < data_offset + 1 * number_of_components ; i++) {
//			if (debug)  AlanSRaskin.ExifViewer.Base.displayText('getExifByteData: ' + i + ' ==> ' + exif_data[i].toString(16));
			data.push(AlanSRaskin.ExifViewer.Base.signedByte(exif_data[i]));
//			if (debug)  AlanSRaskin.ExifViewer.Base.displayText('getExifByteData: ' + data);
		}
	}
	return data.join(',');
}	// getExifSignedByteData()

AlanSRaskin.ExifViewer.Base.getExifLongData = function (exif_data, offset, is_motorola, debug) {
	var data = [];
	var number_of_components = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+4, is_motorola);
	if (number_of_components == 1) {
		 return AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
	} else {
		var data_offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
//		AlanSRaskin.ExifViewer.Base.displayText('getExifLongData: Data offset = ' + data_offset + '\n' + exif_data.length);
		if (data_offset + 4 * number_of_components > exif_data.length) {
			AlanSRaskin.ExifViewer.Base.offsetError(data_offset, number_of_components, exif_data.length, 'Long');
			return '0x01,0x01';
		}
		for (var i = 0 ; i < number_of_components ; i++) {
			data.push(AlanSRaskin.ExifViewer.Base.getLong(exif_data, data_offset, is_motorola));
			data_offset += 4;
		}
	}
	return data.join(',');
}	// getExifLongData()

AlanSRaskin.ExifViewer.Base.getExifSignedLongData = function (exif_data, offset, is_motorola, debug) {
	var data = [];
	var number_of_components = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+4, is_motorola);
	if (number_of_components == 1) {
		 return AlanSRaskin.ExifViewer.Base.getSignedLong(exif_data, offset+8, is_motorola);
	} else {
		var data_offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
//		AlanSRaskin.ExifViewer.Base.displayText('getExifSignedLongData: Data offset = ' + data_offset + '\n' + exif_data.length);
		if (data_offset + 4 * number_of_components > exif_data.length) {
			AlanSRaskin.ExifViewer.Base.offsetError(data_offset, number_of_components, exif_data.length, 'SignedLong');
			return '0x01,0x01';
		}
		for (var i = 0 ; i < number_of_components ; i++) {
			data.push(AlanSRaskin.ExifViewer.Base.getSignedLong(exif_data, data_offset, is_motorola));
			data_offset += 4;
		}
	}
	return data.join(',');
}	// getExifSignedLongData()

AlanSRaskin.ExifViewer.Base.getExifRationalData = function (exif_data, offset, is_motorola, debug) {
	var data = [], numerator = -1, denominator = -1;
	var number_of_components = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+4, is_motorola);
//	if (debug)  AlanSRaskin.ExifViewer.Base.displayText('getExifRationalData: # of components = ' + number_of_components);
	var data_offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
//	AlanSRaskin.ExifViewer.Base.displayText('getExifRationalData: Data offset = ' + data_offset + '\n' + exif_data.length);
	if (data_offset + 8 * number_of_components > exif_data.length) {
		AlanSRaskin.ExifViewer.Base.offsetError(data_offset, number_of_components, exif_data.length, 'Rational');
		return '-1/1';
	}
	for (var i = 0 ; i < number_of_components ; i++) {
		numerator = AlanSRaskin.ExifViewer.Base.getLong(exif_data, data_offset, is_motorola);
		denominator = AlanSRaskin.ExifViewer.Base.getLong(exif_data, data_offset+4, is_motorola);
		data.push(numerator + '/' + denominator);
		data_offset += 8;
	}
	return data.join(',');
}	// getExifRationalData()

AlanSRaskin.ExifViewer.Base.getExifSignedRationalData = function (exif_data, offset, is_motorola, debug) {
	var data = [], numerator = -1, denominator = -1;
	var number_of_components = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+4, is_motorola);
//	if (debug)  AlanSRaskin.ExifViewer.Base.displayText('getExifRationalData: # of components = ' + number_of_components);
	var data_offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
//	AlanSRaskin.ExifViewer.Base.displayText('getExifSignedRationalData: Data offset = ' + data_offset + '\n' + exif_data.length);
	if (data_offset + 8 * number_of_components > exif_data.length) {
		AlanSRaskin.ExifViewer.Base.offsetError(data_offset, number_of_components, exif_data.length, 'SignedRational');
		return '-1/1';
	}
	for (var i = 0 ; i < number_of_components ; i++) {
		numerator = AlanSRaskin.ExifViewer.Base.getSignedLong(exif_data, data_offset, is_motorola);
		denominator = AlanSRaskin.ExifViewer.Base.getSignedLong(exif_data, data_offset+4, is_motorola);
		data.push(numerator + '/' + denominator);
		data_offset += 8;
	}
	return data.join(',');
}	// getExifSignedRationalData()

AlanSRaskin.ExifViewer.Base.reduceRational = function (str) {	// returns the fraction reduced to its simplest form (e.g. '10/600' ==> '1/60')
	var tmp = str.split('/');
	if (tmp.length != 2)  return str;
	var a = parseInt(tmp[0], 10);
	if (a == 0)  return '0/1';
	var b = parseInt(tmp[1], 10);
    var g0, g1, g2;

    if (a > b) {
        g0 = a;
        g1 = b;
    } else {
        g0 = b;
        g1 = a;
    }

    while (g1 > 0) {
        g2 = g0 % g1;
        g0 = g1;
        g1 = g2;
    }

    return (a / g0) + '/' + (b / g0);
}	// reduceRational()

AlanSRaskin.ExifViewer.Base.getExifShortData = function (exif_data, offset, is_motorola, debug) {
	var data = [];
	var number_of_components = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+4, is_motorola);
	if (number_of_components == 1) {
		 return AlanSRaskin.ExifViewer.Base.getShort(exif_data, offset+8, is_motorola);
	} else if (number_of_components == 2) {
		data.push(AlanSRaskin.ExifViewer.Base.getShort(exif_data, offset+8, is_motorola));
		data.push(AlanSRaskin.ExifViewer.Base.getShort(exif_data, offset+10, is_motorola));
	} else {
		var data_offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
//		AlanSRaskin.ExifViewer.Base.displayText('getExifShortData: Data offset = ' + data_offset + '\n' + exif_data.length);
		if (data_offset + 2 * number_of_components > exif_data.length) {
			AlanSRaskin.ExifViewer.Base.offsetError(data_offset, number_of_components, exif_data.length, 'Short');
			return '-1';
		}
		for (var i = 0 ; i < number_of_components ; i++) {
			data.push(AlanSRaskin.ExifViewer.Base.getShort(exif_data, data_offset, is_motorola));
			data_offset += 2;
		}
	}
	return data.join(',');
}	// getExifShortData()

AlanSRaskin.ExifViewer.Base.getExifSignedShortData = function (exif_data, offset, is_motorola, debug) {
	var data = [];
	var number_of_components = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+4, is_motorola);
	if (number_of_components == 1) {
		 return AlanSRaskin.ExifViewer.Base.getSignedShort(exif_data, offset+8, is_motorola);
	} else if (number_of_components == 2) {
		data.push(AlanSRaskin.ExifViewer.Base.getSignedShort(exif_data, offset+8, is_motorola));
		data.push(AlanSRaskin.ExifViewer.Base.getSignedShort(exif_data, offset+10, is_motorola));
	} else {
		var data_offset = AlanSRaskin.ExifViewer.Base.getLong(exif_data, offset+8, is_motorola);
//		AlanSRaskin.ExifViewer.Base.displayText('getExifSignedShortData: Data offset = ' + data_offset + '\n' + exif_data.length);
		if (data_offset + 2 * number_of_components > exif_data.length) {
			AlanSRaskin.ExifViewer.Base.offsetError(data_offset, number_of_components, exif_data.length, 'SignedShort');
			return '-1';
		}
		for (var i = 0 ; i < number_of_components ; i++) {
			data.push(AlanSRaskin.ExifViewer.Base.getSignedShort(exif_data, data_offset, is_motorola));
			data_offset += 2;
		}
	}
	return data.join(',');
}	// getExifSignedShortData()

AlanSRaskin.ExifViewer.Base.offsetError = function (data_offset, number_of_components, buffer_length, routine) {
//	alert(routine + '\nOffset = 0x' + data_offset.toString(16) + '\nComponents = 0x' + number_of_components.toString(16) + '\nLength = ' + buffer_length);
}	// offsetError()

AlanSRaskin.ExifViewer.Base.getLong = function (buffer, offset, is_motorola) {
	var data;
	if (is_motorola) {
		data = buffer[offset+3]
				| (buffer[offset+2] << 8)
				| (buffer[offset+1] << 16)
				| (buffer[offset] << 24);
	} else {
		data = buffer[offset]
				| (buffer[offset+1] <<  8)
				| (buffer[offset+2] <<  16)
				| (buffer[offset+3] <<  24);
	}
	return data;
}	// getLong()

AlanSRaskin.ExifViewer.Base.getSignedLong = function (buffer, offset, is_motorola) {
	var data;
	if (is_motorola) {
		data = buffer[offset+3]
				| (buffer[offset+2] << 8)
				| (buffer[offset+1] << 16)
				| (buffer[offset] << 24);
	} else {
		data = buffer[offset]
				| (buffer[offset+1] << 8)
				| (buffer[offset+2] << 16)
				| (buffer[offset+3] << 24);
	}
	if (data & 0x80000000) {
		data = -((~data & 0xFFFFFFFF) + 1);
	}
	return data;
}	// getSignedLong()

AlanSRaskin.ExifViewer.Base.getShort = function (buffer, offset, is_motorola) {
	var data;
	if (is_motorola) {
		data = buffer[offset];
    	data <<= 8;
		data |= buffer[offset+1];
	} else {
		data = buffer[offset+1];
		data <<= 8;
		data |= buffer[offset];
	}
	return data;
}	// getShort()

AlanSRaskin.ExifViewer.Base.getSignedShort = function (buffer, offset, is_motorola) {
	var data;
	if (is_motorola) {
		data = buffer[offset];
    	data <<= 8;
		data |= buffer[offset+1];
	} else {
		data = buffer[offset+1];
		data <<= 8;
		data |= buffer[offset];
	}
	if (data & 0x8000) {
		data = -((~data & 0xFFFF) + 1);
	}
	return data;
}	// getSignedShort()

AlanSRaskin.ExifViewer.Base.bytesToString = function (data) {
	if (!data  ||  !data.split  ||  data.indexOf('0x') == -1) {
		return data;
	}
	var bytes = data.split(',');
	var output = '';
	for (var i = 0 ; i < bytes.length ; i++) {
		if (bytes[i] == 0) {
			output += ''; // was ';';
		} else {
			var code = parseInt(bytes[i], 16);
			output += (code >= 32 ? String.fromCharCode(code) : bytes[i]);
		}
	}
	return output;
}	// bytesToString()

AlanSRaskin.ExifViewer.Base.bytesToBuffer = function (data, buffer) {
   	if (!data  ||  !data.split) {
   		return;
   	}
   	var bytes = data.split(',');
   	for (var i = 0 ; i < bytes.length ; i++) {
   		buffer[i] = parseInt(bytes[i], (bytes[i].match(/^0x/i) ? 16 : 10));
   	}
}	// bytesToBuffer()

AlanSRaskin.ExifViewer.Base.hexBytesToBuffer = function (data, buffer) {
	var bytes = data.split(',');
	for (var i = 0 ; i < bytes.length ; i++) {
		buffer[i] = parseInt(bytes[i], 16);
	}
}	// bytesToBuffer()

AlanSRaskin.ExifViewer.Base.signedByte = function (b) {
	if (b & 0x80) {
		return -((~b & 0xFF) + 1);
	} else {
		return b;
	}
}	// signedByte()

AlanSRaskin.ExifViewer.Base.byteToHex = function (b) {
	if (isNaN(b)) { return '????';}
	if (b == 0) {
		return '0x00'
	} else if (b < 0x10) {
		return '0x0' + b.toString(16);
	} else {
		return '0x' + b.toString(16);
	}
}	// byteToHex()

AlanSRaskin.ExifViewer.Base.formatLatLong = function (data, digits) {
	if (!data.split)  return data + AlanSRaskin.ExifViewer.Moz.getPString('invalidData');
	var output = '', value = 0, sign = +1;
	var symbols = ['&#176;' , '&#8242;' , '&#8243;'];
	var pairs = data.split(',');
//	if (pairs.length != 3)  return data;
	switch (pairs.length) {
	case 3:
		var tmp = pairs[0].split('/');
		output += AlanSRaskin.ExifViewer.Base.roundValue(tmp[0]/tmp[1], 0) + symbols[0] + ' ';
		value += tmp[0]/tmp[1];
		if (value < 0) {
			sign = -1;
			value = -value;
		}
		tmp = pairs[1].split('/');
		var x = tmp[0]/tmp[1];
		if (tmp[1] != 1) {
			output += AlanSRaskin.ExifViewer.Base.roundValue(tmp[0]/tmp[1], digits) + symbols[1];
			value += tmp[0]/tmp[1]/60;
		} else {
			output += AlanSRaskin.ExifViewer.Base.roundValue(tmp[0]/tmp[1], 0) + symbols[1] + ' ';
			value += tmp[0]/tmp[1]/60;
			tmp = pairs[2].split('/');
			output += AlanSRaskin.ExifViewer.Base.roundValue(tmp[0]/tmp[1], digits) + symbols[2];
			value += tmp[0]/tmp[1]/3600;
		}
		output += ' == ' + AlanSRaskin.ExifViewer.Base.roundValue(sign*value, 6) + symbols[0];
		break;
	case 2:
		output = pairs[0] + symbols[0] + ' ' + pairs[1].substr(0, pairs[1].length-1) + symbols[1] 
					+ ' ' + pairs[1].substr(pairs[1].length-1); 
		break;
	default:
		output = data;
	} 
	return output;
}	// formatLatLong()

AlanSRaskin.ExifViewer.Base.formatLatLong2 = function (data, digits) {
	if (!data.split)  return data + AlanSRaskin.ExifViewer.Moz.getPString('invalidData');
	var output = 0;
	var pairs = data.split(',');
	if (pairs.length != 3)  return data + AlanSRaskin.ExifViewer.Moz.getPString('invalidData');
	var tmp = pairs[0].split('/');
	output += tmp[0]/tmp[1];
	if (pairs[1] != '0/0') {
		tmp = pairs[1].split('/');
		output += tmp[0]/tmp[1] / 60;
	}
	if (pairs[2] != '0/0') {
		tmp = pairs[2].split('/');
		output += tmp[0]/tmp[1] / 3600;
	}
	return AlanSRaskin.ExifViewer.Base.roundValue(output, digits);
}	// formatLatLong2()

AlanSRaskin.ExifViewer.Base.formatTimestamp = function (data, digits) {
	if (!data.split)  return data + AlanSRaskin.ExifViewer.Moz.getPString('invalidData');
	var output = '';
	var symbols = ['h' , 'm' , 's'];
	var pairs = data.split(',');
	if (pairs.length != 3)  return data + AlanSRaskin.ExifViewer.Moz.getPString('invalidData');
	for (var i = 0 ; i < 3 ; i++) {
		var tmp = pairs[i].split('/');
		output += AlanSRaskin.ExifViewer.Base.roundValue(tmp[0]/tmp[1], (i != 2 ? 0 : digits)) + symbols[i] + ' ';
	}
	return output;
}	// formatTimestamp()

AlanSRaskin.ExifViewer.Base.formatRational = function (data, digits) {
	if (!data.split)  return data + AlanSRaskin.ExifViewer.Moz.getPString('invalidData');
	var tmp = data.split('/');
	return AlanSRaskin.ExifViewer.Base.roundValue(tmp[0]/tmp[1], digits);
}	// formatRational()

AlanSRaskin.ExifViewer.Base.formatRationals = function (data, digits) {
	if (!data.split)  return data + AlanSRaskin.ExifViewer.Moz.getPString('invalidData');
	var output = '';
	var pairs = data.split(',');
	for (var i = 0 ; i < pairs.length ; i++) {
		var tmp = pairs[i].split('/');
		output += AlanSRaskin.ExifViewer.Base.roundValue(tmp[0]/tmp[1], digits) + ', ';
	}
	return output;
}	// formatRationals()

AlanSRaskin.ExifViewer.Base.cleanValue = function (x) {
	return (x == '0' ? '0' : (x.indexOf('.') == -1 ? x : x.replace(/\.?0*$/, '')));
}	// cleanValue()
/*
alert(AlanSRaskin.ExifViewer.Base.cleanValue("50.01"));
alert(AlanSRaskin.ExifViewer.Base.cleanValue("50.10"));
alert(AlanSRaskin.ExifViewer.Base.cleanValue("50.0"));
alert(AlanSRaskin.ExifViewer.Base.cleanValue("50."));
alert(AlanSRaskin.ExifViewer.Base.cleanValue("50"));
alert(AlanSRaskin.ExifViewer.Base.cleanValue("0"));
alert(AlanSRaskin.ExifViewer.Base.cleanValue(".0"));
alert(AlanSRaskin.ExifViewer.Base.cleanValue("0.0"));
alert(AlanSRaskin.ExifViewer.Base.cleanValue("0."));
*/

AlanSRaskin.ExifViewer.Base.displayText = function (text, divName) {
	if (!divName) {
		window.alert(AlanSRaskin.ExifViewer.Moz.getPString('noDivSpecified') + '\n\n' + text);
		return;
	}
	var div = document.getElementById(divName);
	if (!div)  return;
	try {
		div.innerHTML += text + '\r\n';
	} catch (e) {
		try {
			div.innerHTML += AlanSRaskin.ExifViewer.Base.cleanExifHTML(text);
		} catch (e2) {
			div.innerHTML += AlanSRaskin.ExifViewer.Moz.getPString('unableDisplayText');
			window.alert(text.replace(/[-a-zA-Z0-9<>:.?_/="';, &#)(\r\n\t]/g, ''));
//			prompt('a', text);
		}
	}
}	// AlanSRaskin.ExifViewer.Base.displayText()

AlanSRaskin.ExifViewer.Base.clearText = function (divName) {
	if (!divName)  return;
	var div = document.getElementById(divName);
	if (div)  div.innerHTML = '';
}	// clearText()

AlanSRaskin.ExifViewer.Base.clearTexts = function (divName) {
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_head');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_img');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_err');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_ifd0');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_subifd');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_ifd1');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_mn');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_iop');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_gps');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_iptc');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_iptc_core');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_msg');
	AlanSRaskin.ExifViewer.Base.clearText(divName + '_jpeg');
}	// clearTexts()

AlanSRaskin.ExifViewer.Base.cleanExifHTML = function (text) {
	if (!(text instanceof String))  text = String(text);
	var text2 = text.replace(/&/g, '&amp;').replace(/[\x00-\x1F]/g, ' ');
	// following code caused a problem for the IPTC XML data
	/*function() { 
		var x = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 
				 'BS',  'TAB', 'LF',  'VT',  'FF',	'CR',  'SO',  'SI', 
				 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 
				 'CAN', 'EM',  'SUB', 'ESC', 'FS',  'GS',  'RS',  'US']; 
		return '{{' + x[arguments[0].charCodeAt(0)] + '}}';
	});*/
//	text2 = text2.replace(/&#27;/g, '{ESC}');
	return text2;
//	var text3 = '';
//	for (var i = 0 ; i < text2.length ; i++) {
//		var c = text2.charCodeAt(i);
//		text3 += (c < 128 ? text2.substr(i, 1) : '&#' + c + ';');
//	}
//	return '<![CDATA[' + text2 + ']]>';
}	// cleanExifHTML()

AlanSRaskin.ExifViewer.Base.cleanExifStringData = function (text) {
	if (!(text instanceof String))  text = String(text);
	var text2 = text.replace(/;*$/, '').replace(/\</g, '&#60;').replace(/\>/g, '&#62;')
//					.replace(/\&copy;/g, '©').replace(/\&reg;/g, '®')
					.replace(/\&/g, '&#38;');
	var text3 = text2.replace(/[\x00-\x1F]/g, function () { 
		var x = ['NUL', 'SOH', 'STX', 'ETX', 'EOT', 'ENQ', 'ACK', 'BEL', 
				 'BS',  'TAB', 'LF',  'VT',  'FF',	'CR',  'SO',  'SI', 
				 'DLE', 'DC1', 'DC2', 'DC3', 'DC4', 'NAK', 'SYN', 'ETB', 
				 'CAN', 'EM',  'SUB', 'ESC', 'FS',  'GS',  'RS',  'US']; 
		return '{{' + x[arguments[0].charCodeAt(0)] + '}}';
	});
	text3 = text3.replace(/[\x80-\xff]/g, function () {
		return '&#' + arguments[0].charCodeAt(0) + ';';
	});
	return text3;
//	var text3 = '';
//	for (var i = 0 ; i < text2.length ; i++) {
//		var c = text2.charCodeAt(i);
//		text3 += (c < 128 ? text2.substr(i, 1) : '&#' + c + ';');
//	}
//	return '<![CDATA[' + text2 + ']]>';
}	// cleanExifStringData()

AlanSRaskin.ExifViewer.Base.roundValue = function (value, digits) {
	return AlanSRaskin.ExifViewer.Base.cleanValue(Number.prototype.toFixed ? value.toFixed(digits) : AlanSRaskin.ExifViewer.Base.roundDecimals(value, digits));
}	// roundValue()

AlanSRaskin.ExifViewer.Base.roundDecimals = function (value, n) {
	var poten = Math.pow(10, n);
	return Math.round(poten * value) / poten;
}	// roundDecimals()

AlanSRaskin.ExifViewer.Base.cleanUTF8StringData = function (inbytes) {
	var bytes = [];
	for (var i = 0 ; i < inbytes.length ; i++) {
		bytes.push(inbytes.charCodeAt(i));
	}
	var txt = [];
	var idx = 0;
	while (idx < bytes.length) {
		if ((bytes[idx] & 0xF0) == 0xE0  &&  (bytes[idx+1] & 0xC0) == 0x80  &&  (bytes[idx+2] & 0xC0) == 0x80) {
			txt.push('&#' + (((bytes[idx] & 0x0F) << 12) | ((bytes[idx+1] & 0x3F) << 6) |(bytes[idx+2] & 0x3F)) + ';');
			idx += 3;
		} else if ((bytes[idx] & 0xE0) == 0xC0  &&  (bytes[idx+1] & 0xC0) == 0x80) {
			txt.push('&#' + (((bytes[idx] & 0x1F) << 6) | (bytes[idx+1] & 0x3F)) + ';');
			idx += 2;
		} else if ((bytes[idx] & 0x80) == 0x00) {
			txt.push('&#' + (bytes[idx] & 0x7F) + ';');
			idx++;
		}
	}
	return txt.join('').replace(/&#27;/g, '{{ESC}}');	// innerHTML doesn't like &#27;
}	// cleanUTF8StringData() 

AlanSRaskin.ExifViewer.Base.processIKEdata = function (data, output) {
	function dopStatus(dop) {
		dop = parseFloat(dop);
		if (dop < 1)  return 'invalid';
		else if (dop == 1)  return 'ideal';
		else if (dop <= 2)  return 'excellent';
		else if (dop <= 5)  return 'good';
		else if (dop <= 10)  return 'moderate';
		else if (dop <= 20)  return 'fair';
		else return 'poor';
	}	// dopStatus()
	var ikedata = AlanSRaskin.ExifViewer.Base.bytesToString(data);
	if (ikedata) {
		var tmp = ikedata.split(',');
		// ikeDataV2,title,pitch,roll,PDOP,HDOP,DestinationAltitude
		// ikeDataV3,title,pitch,roll,PDOP,HDOP,DestinationAltitude,MeasuredHeight
		var out = ['Maker Note (ikeGPS)'];
		if (tmp[0] == 'ikeDataV2'  ||  tmp[0] == 'ikeDataV3') {
			out.push('Version = ' + tmp[0]);
			out.push('Title = ' + tmp[1].replace(/_/g, ','));
			out.push('Pitch = ' + tmp[2] + '&#176;');
			out.push('Roll = ' + tmp[3] + '&#176;');
			out.push('PDOP = ' + tmp[4] + ' (' + dopStatus(tmp[4]) + ')');
			out.push('HDOP = ' + tmp[5] + ' (' + dopStatus(tmp[5]) + ')');
			out.push('Destination Altitude = ' + tmp[6] + ' m');
		}
		if (tmp[0] == 'ikeDataV3') {
			out.push('Measured Height = ' + tmp[7] + (tmp[7] === ' '  ||  tmp[7].indexOf("'") != -1 ? '' : ' m'));
		}
		output.push(out.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>'));
	}
}	// processIKEdata()

AlanSRaskin.ExifViewer.Base.bytesToAscii = function (bytes) {
	var out = [];
	var abytes = bytes.split(',');
	for (var i = 0 ; i < abytes.length ; i++) {
		out.push(String.fromCharCode(abytes[i]));
	}
	return out.join('');
}	// bytesToAscii()

AlanSRaskin.ExifViewer.Base.formatNumber = function (num, inDec, outDec, outSep) {
	// taken from http://www.mredkj.com/javascript/nfbasic.html
	inDec = inDec || '.';
	outDec = outDec || '.';
	outSep = outSep || ',';
	num += '';
	var dpos = num.indexOf(inDec);
	var numEnd = '';
	if (dpos != -1) {
		numEnd = outDec + num.substring(dpos + 1, num.length);
		num = num.substring(0, dpos);
	}
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(num)) {
		num = num.replace(rgx, '$1' + outSep + '$2');
	}
	return num + numEnd;
}	// formatNumber()
