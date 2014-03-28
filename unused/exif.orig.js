var exifasr_isMoz = true;
var exifasr_xml0 = 'html:', exifasr_xml1 = '/';

function getOrientation(fileName, testFileName, divName) {
	var status;
	var ifd0 = new Object();
	ifd0.type = 'IFD0';

	var conversion = new Object();
	if (exifasr_isMoz) {
		status = 0;
	} else {
		status = getTestData(testFileName, conversion);
	}
	if (status == 0) {
		status = getExifData(fileName, divName, true, conversion, null, ifd0, null, null, null, null);
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

function getSlideshowInfo(fileName, testFileName, output, divName) {
	var status;
	var ifd0 = new Object(), subifd = new Object();
	ifd0.type = 'IFD0';
	subifd.type = 'SubIFD';

	var conversion = new Object();
	if (exifasr_isMoz) {
		status = 0;
	} else {
		status = getTestData(testFileName, conversion);
	}
	if (status == 0) {
		status = getExifData(fileName, divName, true, conversion, null, ifd0, subifd, null, null, null);
		if (status == 0) {
			output.orientation = ifd0.x0112;
			output.width = subifd.xa002;
			output.height = subifd.xa003;
		} else {
//			alert('Unable to extract the orientation information from the Exif data.');
		}
	} else {
//		alert('Unable to open the test file as a text stream.');
	}
	return;
}	// getSlideshowInfo()

function processFile(fileName, testFileName, divName, suppressMakerNote, suppressImage) {
	var status;
	var fileInfo = new Object(), ifd0 = new Object(), ifd1 = new Object();
	var  subifd = new Object(), interop = new Object(), gps = new Object();
	var iptc = new Object();
	fileInfo.type = 'File';
	ifd0.type = 'IFD0';			ifd0.status = -1;		ifd0.gpsifd_offset = -1;
	subifd.type = 'SubIFD';		subifd.status = -1;		subifd.iopifd_offset = -1;
	ifd1.type = 'IFD1';			ifd1.status = -1;
	interop.type = 'IOP';		interop.status = -1;
	gps.type = 'GPS';			gps.status = -1;
	iptc.type = 'IPTC';			iptc.status = -1;

	var isURL = (fileName.indexOf('http://') == 0  ||  fileName.indexOf('https://') == 0);
//	var isMailbox = (fileName.indexOf('mailbox://') == 0);

	displayText('<' + exifasr_xml0 + 'h1>' + cleanExifStringData(fileName) + '</' + exifasr_xml0 + 'h1>', divName + '_head');
	var conversion = new Object();
	if (exifasr_isMoz) {
		status = 0;
	} else {
		status = getTestData(testFileName, conversion);
	}
	if (status == 0) {
		status = getExifData(fileName, divName, suppressMakerNote, conversion, fileInfo, ifd0, subifd, ifd1, interop, gps, iptc);
		if (!suppressImage) {
			displayText('<' + exifasr_xml0 + 'img src="' + (isURL ? '' : 'file://') + fileName + '" width="200" style="float:right"' + exifasr_xml1 + '>', divName + '_head');
		}
		if (!exifasr_isMoz) {
			dumpFileInfo(fileInfo, divName);
		}

		if (status == 0) {
			dumpExifData(divName, ifd0, subifd, ifd1, interop, gps);
			dumpIptcData(divName, iptc);
		} else {
			displayText('<' + exifasr_xml0 + 'p>' + getPString('unableToExtract') + '<\/' + exifasr_xml0 + 'p>', divName + '_head');
		}
	} else {
		displayText('<' + exifasr_xml0 + 'p>' + getPString('unableToOpenTestFile') + '<\/' + exifasr_xml0 + 'p>', divName + '_head');
	}
}	// processFile()

function getTestData(fileName, conversion) {
	var status = 0;
	var ok = new Object()
	var fso = new ActiveXObject('Scripting.FileSystemObject');
	var file = fso.GetFile(fileName);
	var textStream = file.OpenAsTextStream();
	if (!textStream)  return -1;

//	displayText('<pre>');
//	var c = textStream.Read(1);
	for (var i = 0 ; i < 256 ; i++) {
		var c = textStream.Read(1);
		var c2 = c.charCodeAt(0);
		// var c3 = String.fromCharCode(c2)
		// displayText('' + i + ' c=' + c + ' c2=' + c2 + ' c3=' + c3);
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
//	displayText('<\/pre>');
	textStream.Close();
	return status;
}	// getTestData()

function readByteAsText(textStream, conversion) {
	var tmp1 = textStream.Read(1);
	var tmp2 = tmp1.charCodeAt(0);
	if (conversion  &&  conversion['x' + tmp2])  tmp2 = conversion['x' + tmp2];
	return tmp2;
}	// readByteAsText()

function dumpFileInfo(fileInfo, divName) {
	var attrib = new Array(), output = new Array();
	for (var a in fileInfo) {
		attrib.push(a + ' = ' + fileInfo[a]);
	}
	output.push('<h2>' + getPString('fileInformation') + '<\/h2>');
	output.push('<ul>');
	output.push('<li>' + attrib.join('<\/li>\n<li>') + '<\/li>');
	output.push('<\/ul>');
	displayText(output.join(''), divName + '_head');
}	// dumpFileInfo()

function readByteMoz(sis) {
//	try {
		var c = sis.read( 1 /*sis.available()*/ );
		return ( c == '' ? 0 : c.charCodeAt(0));
//	} catch (e) {
//		return 0;
//	}
}	// readByteMoz()

function readByteURLMoz(bis) {
//	try {
		return bis.read8();
//	} catch (e) {
//		return 0;
//	}
}	// readByteURLMoz()

function getExifData(fileName, divName, suppressMakerNote, conversion, fileInfo, ifd0, subifd, ifd1, interop, gps, iptc) {
	var output = new Array();
	var error_num = 0, status;
	var is_motorola = -1;
	var exif_data = new Array();
	var debug = false;
	var isURL = (fileName.indexOf('http://') == 0  ||  fileName.indexOf('https://') == 0);
//	var isMailbox = (fileName.indexOf('mailbox://') == 0);
	var readByteFunction = null, readByteStream = null;

	if (exifasr_isMoz) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		} catch (e) {
			output.push(getPString('readPermissionDenied'));
			return -100;
		}

		if (isURL) {
			try {
				var ios = Components.classes["@mozilla.org/network/io-service;1"]
							.getService(Components.interfaces.nsIIOService);
				var uri = ios.newURI(fileName, null, null);
				var channel = ios.newChannelFromURI(uri);
				var bis = Components.classes["@mozilla.org/binaryinputstream;1"]
							.createInstance(Components.interfaces.nsIBinaryInputStream);
				bis.setInputStream(channel.open());
				readByteFunction = readByteURLMoz;
				readByteStream = bis;
			} catch (e) {
				output.push(getPString('unableOpenRemoteFile'));
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
//				readByteFunction = readByteURLMoz;
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
				file.initWithPath( fileName );
				if (file.exists() == false) {
					output.push(getPString('fileDoesntExist'));
					error_num = -101;
				} else {
					var is = Components.classes["@mozilla.org/network/file-input-stream;1"]
							.createInstance( Components.interfaces.nsIFileInputStream );
					is.init( file, 0x01, 00004, 0);
					var sis = Components.classes["@mozilla.org/scriptableinputstream;1"]
							.createInstance( Components.interfaces.nsIScriptableInputStream );
					sis.init( is );
					readByteFunction = readByteMoz;
					readByteStream = sis;
				}
			} catch (e) {
				output.push(getPString('unableOpenLocalFile'));
				error_num =- -102;
			}
		}
	} else {
		var fso = new ActiveXObject('Scripting.FileSystemObject');
		var file = fso.GetFile(fileName);
		var textStream = file.OpenAsTextStream();
		if (!textStream) {
			output.push('<' + exifasr_xml0 + 'p>' + getPString('unableOpenImageFile') + '<\/' + exifasr_xml0 + 'p>');
			error_num = -100;
		}

		if (fileInfo) {
			getFileInformation(fileInfo, file);
		}
		readByteFunction = readByteAsText;
		readByteStream = textStream;
	}

	if (error_num == 0) {
// 		Read file head, check for JPEG SOI
		for (var i = 0 ; i < 2 ; i++) {
			exif_data[i] = readByteFunction(readByteStream, conversion);
		}
		if (exif_data[0] != 0xFF  ||  exif_data[1] != 0xD8) {
//    		output.push('Bad JPEG file head, SOI marker not found: 0x' + exif_data[0].toString(16)
//						+ ' 0x' + exif_data[1].toString(16));
			output.push(getFormattedPString('badJpegFile', [exif_data[0].toString(16) , exif_data[1].toString(16)]));
			error_num = -1;
		}
	}

	if (error_num == 0) {
// 		Read file head, check for APP0
		for (var i = 0 ; i < 4 ; i++) {
			exif_data[i] = readByteFunction(readByteStream, conversion);
		}

		var mp_length;

//		skip through all the non-Exif (Exif = APP1 = 0xE1) data blocks (e.g. APP0: JPEG FIF (JFIF)), looking for the IPTC (APP13) segment
		while (exif_data[0] == 0xFF  &&  exif_data[1] >= 0xE0  &&  exif_data[1] <= 0xFE  &&  exif_data[1] != 0xE1) {
//			output.push('Skipping APPx (0x' + exif_data[1].toString(16) + ') block');
			output.push(getFormattedPString('skippingAPPx', [exif_data[1].toString(16)]));
//			Get the marker parameter length count
			mp_length = exif_data[3] + 256 * exif_data[2];
//			if (debug)  output.push('APPx (0x' + exif_data[1].toString(16) + ') Length = ' + mp_length);
			if (debug)  output.push(getFormattedPString('appx', [exif_data[1].toString(16)], mp_length));

// 			Read and discard APPx data
			var app = exif_data[1];
			exif_data.length = 0;
			for (var i = 0 ; i < mp_length - 2 ; i++) {
				exif_data[i] = readByteFunction(readByteStream, conversion);
			}
			if (app == 0xED) {	// possibly the IPTC information
				status = parseIPTC(iptc, exif_data);
				iptc.status = status;
			}

// 			Read file head, check next APPx
			for (var i = 0 ; i < 4 ; i++) {
				exif_data[i] = readByteFunction(readByteStream, conversion);
			}
		}

		if (exif_data[0] != 0xFF  ||  exif_data[1] != 0xE1) {
//    		output.push('Bad JPEG file head, APP1 (Exif) marker not found: 0x' + exif_data[0].toString(16) + ' 0x' + exif_data[1].toString(16));
			output.push(getFormattedPString('badJpegHead', [exif_data[0].toString(16) , exif_data[1].toString(16)]));
			error_num = -1;
		}
	}

	if (error_num == 0) {
		mp_length = exif_data[3] + 256 * exif_data[2];
//		if (debug)  output.push('APP1 Length = ' + mp_length);
		if (debug)  output.push(getFormattedPString('app1', [mp_length]));

//		Length includes itself, so must be at least 2
//		Following Exif data length must be at least 6
		if (mp_length < 8) {
			output.push(getPString('exifTooSmall'));
			error_num = -2;
		} else {
			mp_length -= 8;
		}
	}

	if (error_num == 0) {
		// Read Exif head, check for "Exif"
		for (var i = 0 ; i < 6 ; i++) {
			exif_data[i] = readByteFunction(readByteStream, conversion);
		}
		if (exif_data[0] != 0x45  ||  exif_data[1] != 0x78 ||  exif_data[2] != 0x69  ||  exif_data[3] != 0x66
				||  exif_data[4] != 0 ||  exif_data[5] != 0)	{ // "Exif"
//			output.push('Exif string not detected: 0x' + exif_data[0].toString(16)
//						+ ' 0x' + exif_data[1].toString(16) + ' 0x' + exif_data[2].toString(16)
//						+ ' 0x' + exif_data[3].toString(16) + ' 0x' + exif_data[4].toString(16)
//						+ ' 0x' + exif_data[5].toString(16));
			output.push(getFormattedPString('exifNotDetected', [exif_data[0].toString(16) , exif_data[1].toString(16) ,
							exif_data[2].toString(16) , exif_data[3].toString(16) , exif_data[4].toString(16) ,
							exif_data[5].toString(16)]));
			error_num = -3;
		}
	}

	if (error_num == 0) {
//		Read Exif body
		for (var i = 0 ; i < mp_length - 2 ; i++) {
			exif_data[i] = readByteFunction(readByteStream, conversion);
		}

		if (mp_length < 12) {
			output.push(getPString('ifdLengthError'));
			error_num = -4;
		}
	}

	if (error_num == 0) {
//		Discover byte order
		if (exif_data[0] == 0x49  &&  exif_data[1] == 0x49) {	// 'II' ==> Intel
			is_motorola = 0;
		} else if (exif_data[0] == 0x4D && exif_data[1] == 0x4D) {	// 'MM' ==> Motorola
			is_motorola = 1;
		}
		if (is_motorola == -1) {
			output.push(getPString('invalidByteOrder'));
			error_num = -5;
		} else {
//			output.push('Endian = ' + (is_motorola ? 'Motorola' : 'Intel'));
			output.push(getFormattedPString('endian', [(is_motorola ? 'Motorola' : 'Intel')]));
			ifd0.is_motorola = is_motorola;
		}
	}

	if (error_num == 0) {
//		Check Tag Mark
		if (is_motorola) {
    		if (exif_data[2] != 0x00  ||  exif_data[3] != 0x2A) {
				output.push(getPString('invalidTagMark'));
				error_num = -6;
			}
		} else {
    		if (exif_data[3] != 0x00  ||  exif_data[2] != 0x2A){
				output.push(getPString('invalidTagMark'));
				error_num = -6;
			}
		}
	}

	if (error_num == 0) {
//		Get first IFD offset (offset to IFD0)
		var offset = getLong(exif_data, 4, is_motorola);
		if (offset > 0x0000FFFF) {
			output.push(getPString('invalidIFD0Offset'));
			error_num = -8;
		}
	}

	if (ifd0  &&  error_num == 0) {
		output.push(getPString('parsingIFD0'));
		status = parseIFD(ifd0, mp_length, exif_data, offset, is_motorola, debug, output);
		ifd0.status = status;
		if (status < 0) {
			output.push(getPString('parseIFDerrorIFD0'));
			error_num = status;
		}
	}

	if (ifd0  &&  subifd  &&  error_num == 0  &&  ifd0.subifd_offset > 0) {
		offset = ifd0.subifd_offset;
		output.push(getPString('parsingSubIFD'));
		if (ifd0  &&  ifd0.x010f  &&  !suppressMakerNote) {
			initializeMaker(ifd0.x010f, ifd0.x0110, subifd);
		}
		status = parseIFD(subifd, mp_length, exif_data, offset, is_motorola, debug, output);
		subifd.status = status;
		if (status < 0) {
			output.push(getPString('parseIFDerrorSubIFD'));
			error_num = status;
		}
	}

	if (ifd0  &&  ifd1  &&  error_num == 0  &&  ifd0.ifd1_offset > 0) {
		offset = ifd0.ifd1_offset;
		output.push(getPString('parsingIFD1'));
		status = parseIFD(ifd1, mp_length, exif_data, offset, is_motorola, debug, output);
		ifd1.status = status;
		if (status < 0) {
			output.push(getPString('parseIFDerrorIFD1'));
			error_num = status;
		}
	}
	if (subifd  &&  interop  &&  error_num == 0  &&  subifd.iopifd_offset > 0) {
		offset = subifd.iopifd_offset;
		output.push(getPString('parsingInterop'));
		status = parseIFD(interop, mp_length, exif_data, offset, is_motorola, debug, output);
		interop.status = status;
		if (status < 0) {
			output.push(getPString('parseIFDerrorInterop'));
			error_num = status;
		}
	}

	if (ifd0  &&  gps  &&  error_num == 0  &&  ifd0.gpsifd_offset > 0) {
		offset = ifd0.gpsifd_offset;
		output.push(getPString('parsingGPS'));
		status = parseIFD(gps, mp_length, exif_data, offset, is_motorola, debug, output);
		gps.status = status;
		if (status < 0) {
			output.push(getPString('parseIFDerrorGPS'));
			error_num = status;
		}
	}

	if (error_num == 0  &&  iptc.status == -1) {
		// skip two 0 bytes (mp_length decreased by 8 above, but only 6 additional bytes were read)
		for (var i = 0 ; i < 2 ; i++) {
			exif_data[i] = readByteFunction(readByteStream, conversion);
		}
// 		Read file head, check for APP
		for (var i = 0 ; i < 4 ; i++) {
			exif_data[i] = readByteFunction(readByteStream, conversion);
		}

		var mp_length;

//		skip through all the data blocks (e.g. APP0: JPEG FIF (JFIF)), looking for the IPTC (APP13) segment
		while (exif_data[0] == 0xFF  &&  exif_data[1] >= 0xE0  &&  exif_data[1] <= 0xFE  /*&&  exif_data[1] != 0xE1*/) {
//			output.push('Skipping APPx (0x' + exif_data[1].toString(16) + ') block');
			output.push(getFormattedPString('skippingAPPx', [exif_data[1].toString(16)]));
//			Get the marker parameter length count
			mp_length = exif_data[3] + 256 * exif_data[2];
//			if (debug)  output.push('APPx (0x' + exif_data[1].toString(16) + ') Length = ' + mp_length);
			if (debug)  output.push(getFormattedPString('appx', [exif_data[1].toString(16)], mp_length));

// 			Read and discard APPx data
			var app = exif_data[1];
			exif_data.length = 0;
			for (var i = 0 ; i < mp_length - 2 ; i++) {
				exif_data[i] = readByteFunction(readByteStream, conversion);
			}
			if (app == 0xED) {	// possibly the IPTC information
				status = parseIPTC(iptc, exif_data);
				iptc.status = status;
				break;
			}

// 			Read file head, check next APPx
			for (var i = 0 ; i < 4 ; i++) {
				exif_data[i] = readByteFunction(readByteStream, conversion);
			}
		}
	}
	
	if (error_num == 0) {
		if (exifasr_isMoz) {
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
	}

	if (error_num != 0) {
//		output.push('Status = ' + error_num);
		output.push(getFormattedPString('status', [error_num]));
		displayText('<' + exifasr_xml0 + 'pre>' + output.join('\n') + '<\/' + exifasr_xml0 + 'pre>', divName + '_head');
	}

	return error_num;
}	// getExifData()

function dumpExifData(divName, ifd0, subifd, ifd1, interop, gps) {
	var is_motorola = -1;
	var output = new Array();
	if (ifd0  &&  ifd0.status == 0) {
		is_motorola = ifd0.is_motorola;
		displayText('<' + exifasr_xml0 + 'a name="ifd0" id="a_ifd0"><\/' + exifasr_xml0 + 'a>', divName + '_ifdo');
		displayText('<' + exifasr_xml0 + 'h2>' + getPString('exifIFD0') + '<\/' + exifasr_xml0 + 'h2>', divName + '_ifd0');
		parseExifTagData(ifd0, output, is_motorola);
		displayText('<' + exifasr_xml0 + 'ul><' + exifasr_xml0 + 'li>' + output.join('<\/' + exifasr_xml0 + 'li><' + exifasr_xml0 + 'li>') + '<\/' + exifasr_xml0 + 'li><\/' + exifasr_xml0 + 'ul>', divName + '_ifd0');
		output.length = 0;
	}
	if (subifd  &&  subifd.status == 0) {
		displayText('<' + exifasr_xml0 + 'a name="sub" id="a_sub"><\/' + exifasr_xml0 + 'a>', divName + '_subifd');
		displayText('<' + exifasr_xml0 + 'h2>' + getPString('exifSubIFD') + '<\/' + exifasr_xml0 + 'h2>', divName + '_subifd');
		parseExifTagData(subifd, output, is_motorola);
//		displayText('<ul><li>' + output.join('<\/li><li>') + '<\/li><\/ul>', divName);
		displayText('<' + exifasr_xml0 + 'ul><' + exifasr_xml0 + 'li>' + output.join('<\/' + exifasr_xml0 + 'li><' + exifasr_xml0 + 'li>') + '<\/' + exifasr_xml0 + 'li><\/' + exifasr_xml0 + 'ul>', divName + '_subifd');
		output.length = 0;
		if (ifd0  &&  ifd0.x010f  &&  subifd.maker) {
			displayText('<' + exifasr_xml0 + 'a name="maker" id="a_maker"><\/' + exifasr_xml0 + 'a>', divName + '_mn');
			dumpExifMakerTagData(subifd.maker, output, is_motorola, divName + '_mn');
		}
	}
	if (ifd1  &&  ifd1.status == 0) {
		displayText('<' + exifasr_xml0 + 'a name="ifd1" id="a_ifd1"><\/' + exifasr_xml0 + 'a>', divName + '_ifd1');
		displayText('<' + exifasr_xml0 + 'h2>' + getPString('exifIFD1') + '<\/' + exifasr_xml0 + 'h2>', divName + '_ifd1');
		parseExifTagData(ifd1, output, is_motorola);
//		displayText('<ul><li>' + output.join('<\/li><li>') + '<\/li><\/ul>', divName);
		displayText('<' + exifasr_xml0 + 'ul><' + exifasr_xml0 + 'li>' + output.join('<\/' + exifasr_xml0 + 'li><' + exifasr_xml0 + 'li>') + '<\/' + exifasr_xml0 + 'li><\/' + exifasr_xml0 + 'ul>', divName + '_ifd1');
		output.length = 0;
	}
	if (interop  &&  interop.status == 0) {
		displayText('<' + exifasr_xml0 + 'a name="iop" id="a_iop"><\/' + exifasr_xml0 + 'a>', divName + '_iop');
		displayText('<' + exifasr_xml0 + 'h2>' + getPString('exifInterop') + '<\/' + exifasr_xml0 + 'h2>', divName + '_iop');
		parseExifTagData(interop, output, is_motorola);
//		displayText('<ul><li>' + output.join('<\/li><li>') + '<\/li><\/ul>', divName);
		displayText('<' + exifasr_xml0 + 'ul><' + exifasr_xml0 + 'li>' + output.join('<\/' + exifasr_xml0 + 'li><' + exifasr_xml0 + 'li>') + '<\/' + exifasr_xml0 + 'li><\/' + exifasr_xml0 + 'ul>', divName + '_iop');
		output.length = 0;
	}
	if (gps  &&  gps.status == 0) {
		displayText('<' + exifasr_xml0 + 'a name="gps" id="a_gps"><\/' + exifasr_xml0 + 'a>', divName + '_gps');
		displayText('<' + exifasr_xml0 + 'h2>' + getPString('exifGPS') + '<\/' + exifasr_xml0 + 'h2>', divName + '_gps');
		parseExifTagData(gps, output, is_motorola);
//		displayText('<ul><li>' + output.join('<\/li><li>') + '<\/li><\/ul>', divName);
		displayText('<' + exifasr_xml0 + 'ul><' + exifasr_xml0 + 'li>' + output.join('<\/' + exifasr_xml0 + 'li><' + exifasr_xml0 + 'li>') + '<\/' + exifasr_xml0 + 'li><\/' + exifasr_xml0 + 'ul>', divName + '_gps');
		output.length = 0;
	}
}	// dumpExifData()

function getFileInformation(fileInfo, file) {	// IE only
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
	var tmp = new Array();
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

function parseIFD(ifd, mp_length, exif_data, offset, is_motorola, debug, output) {
	var error_num = 0;

//	if (debug)  output.push('IFD scan starting: ' + ifd.type);
	if (debug)  output.push(getFormattedPString('ifdScan', [ifd.type]));

	if (offset > mp_length - 2) {
		output.push(getPString('offsetPointsOutside'));
		error_num = -9;
	}
	if (debug)  output.push('parseIFD: offset = ' + offset);

	if (error_num == 0) {
//		Get the number of directory entries contained in this IFD
		var number_of_tags = getShort(exif_data, offset, is_motorola);
		ifd.number_of_tags = number_of_tags;
		if (number_of_tags == 0) {
			output.push(getPString('noDirectoryEntries'));
			error_num = +1;
		} else {
//			output.push(number_of_tags + ' directory entries (tags) found');
			output.push(getFormattedPString('numberOfTags', [number_of_tags]));
			offset += 2;
		}
	}

	if (error_num == 0) {
		for ( ; error_num == 0 ; ) {
    		if (offset > mp_length - 12) {
				output.push(getPString('beyondEnd'));
				error_num = -11;
			} else {
				getExifTagData(ifd, mp_length, exif_data, offset, is_motorola, debug, output);
				offset += 12;
				if (--number_of_tags == 0) {
					if (debug)  output.push(getPString('noMoreDirectories'));
					if (ifd.type == 'IFD0')  ifd.ifd1_offset = getLong(exif_data, offset, is_motorola);
//					if (debug)  output.push('IFD1 offset = ' + ifd.ifd1_offset);
					if (debug)  output.push(getFormattedPString('ifd1Offset', [ifd.ifd1_offset]));
					break;
				}
			}
		}
	}
	if (debug)  output.push(getPString('ifdScanCompleted'));
	ifd.status = error_num;
	return error_num;
}	// parseIFD()

function parseExifTagData(ifd, output, is_motorola) {
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			var tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
//			displayText('Tagnum = ' + tagnum + '  ===>  data = ' + data + '  type = ' + ifd.type);
			switch (tagnum) {
			case 0x8769:	// Exif IFD: pointer to Exif SubIFD in IFD0
			case 0x8825:	// GPS Info IFD Pointer
			case 0xA005:	// Interoperability IFD Pointer
				// no need to dump this internal data!
				break;
			case 0x927C:	// MakerNote
				var out = getExifInterpretedTagData(tagnum, data, ifd.type);
				output.push(out);
				ifd.makerNote = data;
				break;
			case 0x0004:
				if (ifd.type == 'GPS') {
					var lat = formatLatLong2(ifd.x0002, 6);
					var lon = formatLatLong2(ifd.x0004, 6);
					if (ifd.x0001  &&  ifd.x0001.toLowerCase) {
						switch (ifd.x0001.toLowerCase()) {
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
					if (ifd.x0003  &&  ifd.x0003.toLowerCase) {
						switch (ifd.x0003.toLowerCase()) {
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
					output.push(getExifInterpretedTagData(tagnum, data, ifd.type));
					var out = new Array();
					var href = 'http://maps.google.com/maps?ll=' + lat + ',' + lon + '&z=10';
					out.push('<' + exifasr_xml0 + 'a href="' + cleanExifStringData(href) + '" target="exif">' + getPString('google') + '</' + exifasr_xml0 + 'a>');
					href = 'http://maps.yahoo.com/index.php#mvt=m&trf=0&lon=' + lon + '&lat=' + lat + '&mag=8';
					out.push('<' + exifasr_xml0 + 'a href="' + cleanExifStringData(href) + '" target="exif">' + getPString('yahoo') + '</' + exifasr_xml0 + 'a>');
					href = 'http://maps.msn.com/map.aspx?C=' + lat + ',' + lon + '&A=50&S=405,320';
					out.push('<' + exifasr_xml0 + 'a href="' + cleanExifStringData(href) + '" target="exif">' + getPString('msn') + '</' + exifasr_xml0 + 'a>');
					href = 'http://www.mapquest.com/maps/map.adp?searchtype=address&formtype=latlong&latlongtype=decimal&latitude=' + lat + '&longitude=' + lon;
					out.push('<' + exifasr_xml0 + 'a href="' + cleanExifStringData(href) + '" target="exif">' + getPString('mapquest') + '</' + exifasr_xml0 + 'a>');
					output.push(getPString('onlineMappingLinks') + '<' + exifasr_xml0 + 'ul><' + exifasr_xml0 + 'li>' + out.join('</' + exifasr_xml0 + 'li><' + exifasr_xml0 + 'li>') + '</' + exifasr_xml0 + 'li></' + exifasr_xml0 + 'ul>');
				}
				break;
			default:
				output.push(getExifInterpretedTagData(tagnum, data, ifd.type));
				break;
			}
		}
	}
}	// parseExifTagData()

function getExifTagData(ifd, mp_length, exif_data, offset, is_motorola, debug, output) {
	var TagFormats = new Array('n/a (0)', 'unsigned byte (1)', 'ascii string (2)', 'unsigned short (3)',
								'unsigned long (4)', 'unsigned rational (5)', 'signed byte (6)',
								'undefined (7)', 'signed short (8)', 'signed long (9)',
								'signed rational (10)', 'single float (11)', 'double float (12)');
//	Get Tag number
	var tagnum = getShort(exif_data, offset, is_motorola);
	var format = getShort(exif_data, offset+2, is_motorola);
	var number_of_components = getShort(exif_data, offset+4, is_motorola);
	var data;
	switch (format) {
		case 1:
			data = getExifByteData(exif_data, offset, is_motorola, debug);
			break;
		case 2:
			data = getExifStringData(exif_data, offset, is_motorola, debug);
			break;
		case 3:
			data = getExifShortData(exif_data, offset, is_motorola, debug);
			break;
		case 4:
			data = getExifLongData(exif_data, offset, is_motorola, debug);
			break;
		case 5:
			data = getExifRationalData(exif_data, offset, is_motorola, debug);
			break;
		case 6:
			data = getExifSignedByteData(exif_data, offset, is_motorola, debug);
			break;
		case 7:
			data = getExifByteData(exif_data, offset, is_motorola, debug);
			break;
		case 8:
			data = getExifSignedShortData(exif_data, offset, is_motorola, debug);
			break;
		case 9:
			data = getExifSignedLongData(exif_data, offset, is_motorola, debug);
			break;
		case 10:
			data = getExifSignedRationalData(exif_data, offset, is_motorola, debug);
			break;
		case 11:
			data = '(' + TagFormats[format] + ')';
			break;
		case 12:
			data = '(' + TagFormats[format] + ')';
			break;
		default:
			data = '(' + format + ')';
			break;
	}
	if (tagnum == 0x927C) {	// MakerNote
//		ifd.makerNoteOffset = getLong(exif_data, offset+8, is_motorola);
		var makerNoteOffset = getLong(exif_data, offset+8, is_motorola);
		if (ifd.maker) {
			parseMaker(ifd.maker, exif_data, mp_length, is_motorola, makerNoteOffset, data, debug, output);
		}
	}
	if (debug) {
//		output.push('Tag number 0x' + tagnum.toString(16).toUpperCase() + ' detected');
		output.push(getFormattedPString('tagNumber', [tagnum.toString(16).toUpperCase()]));
//		output.push('Tag format = ' + format + ' (' + TagFormats[format] + ')');
		output.push(getFormattedPString('tagFormat', [format , getPString(format < TagFormats.length ? TagFormats[format] : 'other')]));
//		output.push('Tag count = ' + number_of_components);
		output.push(getFormattedPString('tagCount', [number_of_components]));
//		output.push('Tag data = ' + data);
		output.push(getFormattedPString('tagData', [data]));
	}
	var hash = zeroPad(tagnum);
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

function zeroPad(tagnum) {
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
function getExifStringData(exif_data, offset, is_motorola, debug) {
	var data = '';
	var number_of_components = getLong(exif_data, offset+4, is_motorola);
/*
	if (debug) {
		displayText('getExifStringData: # of components = ' + number_of_components);
		for (var i = 4 ; i < 8 ; i++) {
			displayText('getExifStringData: ' + i + ' ==> ' + exif_data[offset+i].toString(16));
		}
	}
*/
	if (number_of_components <= 4) {
		data = '';
		for (var i = 8 ; i <= 11 ; i++) {
			data += (exif_data[offset+i] != 0 ? String.fromCharCode(exif_data[offset+i]) : ';');
		}
	} else {
		var data_offset = getLong(exif_data, offset+8, is_motorola);
//		if (debug)  displayText('getExifStringData: Data offset = ' + data_offset);
		for (var i = data_offset ; i < data_offset + 1 * number_of_components ; i++) {
//			if (debug)  displayText('getExifStringData: ' + i + ' ==> ' + exif_data[i].toString(16));
			if (exif_data[i] == 0) {
				data += ';';
			} else {
				data += String.fromCharCode(exif_data[i]);
			}
//			if (debug)  displayText('getExifStringData: ' + data);
		}
	}
	return cleanExifStringData(data);
}	// getExifStringData()

function getExifByteData(exif_data, offset, is_motorola, debug) {
	var data = new Array();
	var number_of_components = getLong(exif_data, offset+4, is_motorola);
/*
	if (debug) {
		displayText('getExifByteData: # of components = ' + number_of_components);
		for (var i = 4 ; i < 8 ; i++) {
			displayText('getExifByteData: ' + i + ' ==> ' + exif_data[offset+i].toString(16));
		}
	}
*/
	if (number_of_components <= 4) {
		data.push(byteToHex(exif_data[offset+8]));
		data.push(byteToHex(exif_data[offset+9]));
		data.push(byteToHex(exif_data[offset+10]));
		data.push(byteToHex(exif_data[offset+11]));
	} else {
		var data_offset = getLong(exif_data, offset+8, is_motorola);
//		if (data_offset + number_of_components > exif_data.length)  return '0x01,0x01';
//		if (debug)  displayText('getExifByteData: Data offset = ' + data_offset);
		for (var i = data_offset ; i < data_offset + 1 * number_of_components ; i++) {
//			if (debug)  displayText('getExifByteData: ' + i + ' ==> ' + exif_data[i].toString(16));
			data.push(byteToHex(exif_data[i]));
//			if (debug)  displayText('getExifByteData: ' + data);
		}
	}
	return data.join(',');
}	// getExifByteData()

function getExifSignedByteData(exif_data, offset, is_motorola, debug) {
	var data = new Array();
	var number_of_components = getLong(exif_data, offset+4, is_motorola);
/*
	if (debug) {
		displayText('getExifByteData: # of components = ' + number_of_components);
		for (var i = 4 ; i < 8 ; i++) {
			displayText('getExifByteData: ' + i + ' ==> ' + exif_data[offset+i].toString(16));
		}
	}
*/
	if (number_of_components <= 4) {
		data.push(signedByte(exif_data[offset+8]));
		data.push(signedByte(exif_data[offset+9]));
		data.push(signedByte(exif_data[offset+10]));
		data.push(signedByte(exif_data[offset+11]));
	} else {
		var data_offset = getLong(exif_data, offset+8, is_motorola);
		if (data_offset + number_of_components > exif_data.length)  return '0x01,0x01';
//		if (debug)  displayText('getExifByteData: Data offset = ' + data_offset);
		for (var i = data_offset ; i < data_offset + 1 * number_of_components ; i++) {
//			if (debug)  displayText('getExifByteData: ' + i + ' ==> ' + exif_data[i].toString(16));
			data.push(signedByte(exif_data[i]));
//			if (debug)  displayText('getExifByteData: ' + data);
		}
	}
	return data.join(',');
}	// getExifSignedByteData()

function getExifLongData(exif_data, offset, is_motorola, debug) {
	var data = new Array();
	var number_of_components = getLong(exif_data, offset+4, is_motorola);
	if (number_of_components == 1) {
		 return getLong(exif_data, offset+8, is_motorola);
	} else {
		var data_offset = getLong(exif_data, offset+8, is_motorola);
		for (var i = 0 ; i < number_of_components ; i++) {
			data.push(getLong(exif_data, data_offset, is_motorola));
			data_offset += 4;
		}
	}
	return data.join(',');
}	// getExifLongData()

function getExifSignedLongData(exif_data, offset, is_motorola, debug) {
	var data = new Array();
	var number_of_components = getLong(exif_data, offset+4, is_motorola);
	if (number_of_components == 1) {
		 return getSignedLong(exif_data, offset+8, is_motorola);
	} else {
		var data_offset = getLong(exif_data, offset+8, is_motorola);
		for (var i = 0 ; i < number_of_components ; i++) {
			data.push(getSignedLong(exif_data, data_offset, is_motorola));
			data_offset += 4;
		}
	}
	return data.join(',');
}	// getExifSignedLongData()

function getExifRationalData(exif_data, offset, is_motorola, debug) {
	var data = new Array(), numerator = -1, denominator = -1;
	var number_of_components = getLong(exif_data, offset+4, is_motorola);
//	if (debug)  displayText('getExifRationalData: # of components = ' + number_of_components);
	var data_offset = getLong(exif_data, offset+8, is_motorola);
	for (var i = 0 ; i < number_of_components ; i++) {
		numerator = getLong(exif_data, data_offset, is_motorola);
		denominator = getLong(exif_data, data_offset+4, is_motorola);
		data.push(numerator + '/' + denominator);
		data_offset += 8;
	}
	return data.join(',');
}	// getExifRationalData()

function getExifSignedRationalData(exif_data, offset, is_motorola, debug) {
	var data = new Array(), numerator = -1, denominator = -1;
	var number_of_components = getLong(exif_data, offset+4, is_motorola);
//	if (debug)  displayText('getExifRationalData: # of components = ' + number_of_components);
	var data_offset = getLong(exif_data, offset+8, is_motorola);
	for (var i = 0 ; i < number_of_components ; i++) {
		numerator = getSignedLong(exif_data, data_offset, is_motorola);
		denominator = getSignedLong(exif_data, data_offset+4, is_motorola);
		data.push(numerator + '/' + denominator);
		data_offset += 8;
	}
	return data.join(',');
}	// getExifSignedRationalData()

function getExifShortData(exif_data, offset, is_motorola, debug) {
	var data = new Array();
	var number_of_components = getLong(exif_data, offset+4, is_motorola);
	if (number_of_components == 1) {
		 return getShort(exif_data, offset+8, is_motorola);
	} else if (number_of_components == 2) {
		data.push(getShort(exif_data, offset+8, is_motorola));
		data.push(getShort(exif_data, offset+10, is_motorola));
	} else {
		var data_offset = getLong(exif_data, offset+8, is_motorola);
		for (var i = 0 ; i < number_of_components ; i++) {
			data.push(getShort(exif_data, data_offset, is_motorola));
			data_offset += 2;
		}
	}
	return data.join(',');
}	// getExifShortData()

function getExifSignedShortData(exif_data, offset, is_motorola, debug) {
	var data = new Array();
	var number_of_components = getLong(exif_data, offset+4, is_motorola);
	if (number_of_components == 1) {
		 return getSignedShort(exif_data, offset+8, is_motorola);
	} else if (number_of_components == 2) {
		data.push(getSignedShort(exif_data, offset+8, is_motorola));
		data.push(getSignedShort(exif_data, offset+10, is_motorola));
	} else {
		var data_offset = getLong(exif_data, offset+8, is_motorola);
		for (var i = 0 ; i < number_of_components ; i++) {
			data.push(getSignedShort(exif_data, data_offset, is_motorola));
			data_offset += 2;
		}
	}
	return data.join(',');
}	// getExifSignedShortData()

function getLong(buffer, offset, is_motorola) {
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
	return data;
}	// getLong()

function getSignedLong(buffer, offset, is_motorola) {
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

function getShort(buffer, offset, is_motorola) {
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

function getSignedShort(buffer, offset, is_motorola) {
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

function bytesToString(data) {
	if (!data  ||  !data.split) {
		return data;
	}
	var bytes = data.split(',');
	var output = '';
	for (var i = 0 ; i < bytes.length ; i++) {
		if (bytes[i] == 0) {
			output += ';';
		} else {
			output += String.fromCharCode(parseInt(bytes[i], 16));
		}
	}
	return output;
}	// bytesToString()

function bytesToBuffer(data, buffer) {
	if (!data  ||  !data.split) {
		return;
	}
	var bytes = data.split(',');
	for (var i = 0 ; i < bytes.length ; i++) {
		buffer[i] = parseInt(bytes[i], 10);
	}
}	// bytesToBuffer()

function hexBytesToBuffer(data, buffer) {
	var bytes = data.split(',');
	for (var i = 0 ; i < bytes.length ; i++) {
		buffer[i] = parseInt(bytes[i], 16);
	}
}	// bytesToBuffer()

function signedByte(b) {
	if (b & 0x80) {
		return -((~b & 0xFF) + 1);
	} else {
		return b;
	}
}	// signedByte()

function byteToHex(b) {
	if (isNaN(b)) { return '????';}
	if (b == 0) {
		return '0x00'
	} else if (b < 0x10) {
		return '0x0' + b.toString(16);
	} else {
		return '0x' + b.toString(16);
	}
}	// byteToHex()

function formatLatLong(data, digits) {
	var output = '';
	var symbols = new Array('&#176;' , '&#8242;' , '&#8243;');
	var pairs = data.split(',');
	if (pairs.length != 3)  return data;
	var tmp = pairs[0].split('/');
	output += roundValue(tmp[0]/tmp[1], 0) + symbols[0] + ' ';
	tmp = pairs[1].split('/');
	var x = tmp[0]/tmp[1];
	if (tmp[1] != 1) {
		output += roundValue(tmp[0]/tmp[1], digits) + symbols[1];
	} else {
		output += roundValue(tmp[0]/tmp[1], 0) + symbols[1] + ' ';
		tmp = pairs[2].split('/');
		output += roundValue(tmp[0]/tmp[1], digits) + symbols[2];
	}
	
	return output;
}	// formatLatLong()

function formatLatLong2(data, digits) {
	var output = 0;
	var pairs = data.split(',');
	if (pairs.length != 3)  return 0;
	var tmp = pairs[0].split('/');
	output += tmp[0]/tmp[1];
	tmp = pairs[1].split('/');
	output += tmp[0]/tmp[1] / 60;
	tmp = pairs[2].split('/');
	output += tmp[0]/tmp[1] / 3600;
	return roundValue(output, digits);
}	// formatLatLong2()

function formatTimestamp(data, digits) {
	var output = '';
	var symbols = new Array('h' , 'm' , 's');
	var pairs = data.split(',');
	if (pairs.length != 3)  return data;
	for (var i = 0 ; i < 3 ; i++) {
		var tmp = pairs[i].split('/');
		output += roundValue(tmp[0]/tmp[1], (i != 2 ? 0 : digits)) + symbols[i] + ' ';
	}
	return output;
}	// formatTimestamp()

function formatRational(data, digits) {
	var tmp = data.split('/');
	return roundValue(tmp[0]/tmp[1], digits);
}	// formatRational()

function formatRationals(data, digits) {
	var output = '';
	var pairs = data.split(',');
	for (var i = 0 ; i < pairs.length ; i++) {
		var tmp = pairs[i].split('/');
		output += roundValue(tmp[0]/tmp[1], digits) + ', ';
	}
	return output;
}	// formatRationals()

function displayText(text, divName) {
	if (!divName) {
		alert(getPString('noDivSpecified') + '\n\n' + text);
		return;
	}
	var div = document.getElementById(divName);
	try {
		if (div)  div.innerHTML += text + '\r\n';
	} catch (e) {
		if (div)  div.innerHTML += getPString('unableDisplayText');
//		alert(text);
	}
}	// displayText(

function clearText(divName) {
	if (!divName)  return;
	var div = document.getElementById(divName);
	if (div)  div.innerHTML = '';
}	// clearText()

function clearTexts(divName) {
	clearText(divName + '_head');
	clearText(divName + '_ifd0');
	clearText(divName + '_subifd');
	clearText(divName + '_ifd1');
	clearText(divName + '_mn');
	clearText(divName + '_iop');
	clearText(divName + '_gps');
	clearText(divName + '_iptc');
	clearText(divName + '_msg');
}	// clearTexts()

function cleanExifStringData(text) {
	var text2 = text.replace(/;*$/, '').replace(/\</g, '&#60;').replace(/\>/g, '&#62;').replace(/\&/g, '&#38;');
	return text2;
//	var text3 = '';
//	for (var i = 0 ; i < text2.length ; i++) {
//		var c = text2.charCodeAt(i);
//		text3 += (c < 128 ? text2.substr(i, 1) : '&#' + c + ';');
//	}
//	return '<![CDATA[' + text2 + ']]>';
}	// cleanExifStringData()

function roundValue(value, digits) {
	return (Number.prototype.toFixed ? value.toFixed(digits) : roundDecimals(value, digits));
}	// roundValue()

function roundDecimals(value, n) {
	var poten = Math.pow(10, n);
	return Math.round(poten * value) / poten;
}	// roundDecimals()

