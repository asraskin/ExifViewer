if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.IPTC)  AlanSRaskin.ExifViewer.IPTC = {};

AlanSRaskin.ExifViewer.IPTC.parseIPTC = function (iptc, buffer) {
//	var tagsfound = 0;
	var i = 0;
	var mp_length = buffer.length;
	while (i < mp_length) {	// find first tag
		if (buffer[i] == 0x1C  &&  buffer[i+1] < 0x0F) { 
			break;
		} else {
			i++;
		}
	}

	while (i < mp_length) {
		if (buffer[i++] != 0x1C) {	// check tag marker
			break;	 // found data which does not conform to IPTC, so stop
		} 
		if (i + 4 >= mp_length) {
			break;	// missing data, so stop
		}
 
		var recnum = buffer[i++];
		var dataset = buffer[i++];
		if (buffer[i] & 0x80) {	// it's an extended tag
//			var len2 = (buffer[i+2] << 24) + (buffer[i+3] << 16) + 
//						(buffer[i+4] <<  8) + (buffer[i+5]);
//			i += 6;
			var len_len = ((buffer[i] & 0x7F) << 8) | buffer[i+1];
			i += 2;
			var len = 0;
//			alert(buffer[i] + '\n' + buffer.length + '\n' + i + '\n' + len_len);
			if (i + len_len > mp_length)  break; 
			for (var j = 0 ; j < len_len ; j++) {
				len = (len << 8) | buffer[i+j]; 
			}
			i += len_len;
		} else { // it's a standard tag
			var len = (buffer[i] << 8) | buffer[i+1];
			i += 2;
		}
		var key = recnum + 'x' + dataset;
		if (i + len > mp_length) {
//			iptc[key] = AlanSRaskin.ExifViewer.Moz.getPString('lengthError');
			break;
		} else {
			if (iptc[key]) {
				iptc[key] += ' / ';
			} else {
				iptc[key] = '';
			}
			for (var j = 0 ; j < len ; j++) {
				if (buffer[i+j] != 0)  iptc[key] += String.fromCharCode(buffer[i+j]);
			}
			i += len;
//			tagsfound++;
		}
	}
//	iptc.data = [];
//	for (var i = 0 ; i < buffer.length ; i++) {
//		iptc.data[i] = buffer[i];
//	}
/*
		var output = [];
		for (var a in iptc) {
			output.push(a + ': ' + iptc[a]);
		}
		alert(output.join('\n'));
*/
	return 0;
}	// parseIPTC()

AlanSRaskin.ExifViewer.IPTC.dumpIptcData = function (divName, iptc, useTables) {
	if (iptc.type != 'IPTC'  ||  iptc.status != 0)  return;
	if (iptc.status != 0) {
//		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>' + AlanSRaskin.ExifViewer.Moz.getPString('noIPTCdata') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>', divName + '_iptc');
	} else {
		var output = [];
//		alert(AlanSRaskin.ExifViewer.Base.cleanExifStringData(iptc['2x80']));
		for (var key in iptc) {
//		alert(key);
			if (key == 'status'  ||  key == 'type')  continue;
			switch (key) {
//					output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString(key, [window.escape(iptc[key])]));
//					break;
// string:
				case '1x5':
				case '1x30':
				case '1x40':
				case '1x50':
				case '1x60':
				case '1x100':
				case '2x3':
				case '2x4':
				case '2x5':
				case '2x7':
				case '2x8':
				case '2x10':
				case '2x12':
				case '2x15':
				case '2x20':
				case '2x22':
				case '2x25':
				case '2x26':
				case '2x27':
				case '2x40':
				case '2x42':
				case '2x45':
				case '2x50':
				case '2x65':
				case '2x70':
				case '2x75':
				case '2x80':
				case '2x85':
				case '2x90':
				case '2x92':
				case '2x95':
				case '2x100':
				case '2x101':
				case '2x103':
				case '2x105':
				case '2x110':
				case '2x115':
				case '2x116':
				case '2x118':
				case '2x120':
				case '2x122':
				case '2x130':
				case '2x131':
				case '2x135':
				case '2x150':
				case '2x151':
				case '2x152':
				case '2x153':
				case '2x154':
				case '7x10':
					if (iptc['1x90']  &&  AlanSRaskin.ExifViewer.IPTC.formatIPTC_binaryS(iptc['1x90']).replace(/ /g, '') == '27,37,71') {	// UTF-8
						output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString(key, [AlanSRaskin.ExifViewer.Base.cleanUTF8StringData(iptc[key])]));
					} else {
						output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString(key, [AlanSRaskin.ExifViewer.Base.cleanExifStringData(iptc[key])]));
					}
					break;
// CCYYMMDD (date):
				case '1x70':
				case '2x30':
				case '2x37':
				case '2x47':
				case '2x55':
				case '2x62':
					output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString(key, [AlanSRaskin.ExifViewer.IPTC.formatIPTC_CCYYMMDD(iptc[key])]));
					break;
// HHMMSS_HHMM (time):
				case '1x80':
				case '2x35':
				case '2x38':
				case '2x60':
				case '2x63':
					output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString(key, [AlanSRaskin.ExifViewer.IPTC.formatIPTC_HHMMSS_HHMM(iptc[key])]));
					break;
// binary (number):
				case '1x0':
				case '1x20':
				case '1x22':
				case '1x120':
				case '1x122':
				case '2x0':
				case '2x200':
				case '2x201':
				case '7x20':
				case '7x90':
				case '7x95':
				case '9x10':
					output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString(key, [AlanSRaskin.ExifViewer.IPTC.formatIPTC_binaryN(iptc[key])]));
					break;
// binary (stream):
				case '1x90':
				case '2x125':
				case '2x202':
				case '8x10':
					output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString(key, [AlanSRaskin.ExifViewer.IPTC.formatIPTC_binaryS(iptc[key])]));
					break;
				default:
					output.push(AlanSRaskin.ExifViewer.Moz.getFormattedPString('unknownIPTC', [key.replace(/x/, '/') , /*window.escape*/AlanSRaskin.ExifViewer.Base.cleanExifStringData(iptc[key])]));
					break;
			}
		}

		if (output.length > 0) {
			AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a name="iptc" id="a_iptc"><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>', divName + '_iptc');
			AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>' + AlanSRaskin.ExifViewer.Moz.getPString('IPTC') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>', divName + '_iptc');
			AlanSRaskin.ExifViewer.Base.dumpAssembledExifData(output, divName + '_iptc', useTables);
//			AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>' + output.join('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>', divName + '_iptc');
		}
	}
}	// dumpIptcData()

AlanSRaskin.ExifViewer.IPTC.formatIPTC_CCYYMMDD = function (str) {
	return str.substr(0, 4) + '/' + str.substr(4, 2) + '/' + str.substr(6, 2);
}	// formatIPTC_CCYYMMDD()

AlanSRaskin.ExifViewer.IPTC.formatIPTC_HHMMSS_HHMM = function (str) {
	return str.substr(0, 2) + ':' + str.substr(2, 2) + ':' + str.substr(4, 2)
			+ str.charAt(6) + str.substr(7, 2) + ':' + str.substr(9, 2);
}	// formatIPTC_HHMMSS_HHMM()

AlanSRaskin.ExifViewer.IPTC.formatIPTC_binaryS = function (str) {
	if (!str)  return '';  
	var t = [];
	for (var i = 0 ; i < str.length ; i++) {
		t.push(str.charCodeAt(i));
	}
	return t.join(', ');
}	// formatIPTC_binaryS()

AlanSRaskin.ExifViewer.IPTC.formatIPTC_binaryN = function (str) {
	var n = 0;
	for (var j = 0 ; j < str.length ; j++) {
		n = (n << 8) + str.charCodeAt(j); 
	}
	return n;
}	// formatIPTC_binaryN()

