if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

AlanSRaskin.ExifViewer.Makers.dumpPentaxAsahiTagData = function (ifd, output, is_motorola) {
	var tagnum;
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
			switch (ifd.maker_type) {
			case 1:
				output.push(AlanSRaskin.ExifViewer.Makers.getPentaxAsahiInterpretedTagData1(tagnum, data));
				break;
			case 2:
				output.push(AlanSRaskin.ExifViewer.Makers.getPentaxAsahiInterpretedTagData2(tagnum, data));
				break;
			}
		}
	}
}	// dumpPentaxAsahiTagData()

AlanSRaskin.ExifViewer.Makers.getPentaxAsahiInterpretedTagData1 = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getPentaxAsahiInterpretedTagData1()

AlanSRaskin.ExifViewer.Makers.getPentaxAsahiInterpretedTagData2 = function (tagnum, data) {
	return AlanSRaskin.ExifViewer.Makers.getCasioInterpretedTagData2(tagnum, data);
/*
	var output = [];
	switch (tagnum) {
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
*/
}	// getPentaxAsahiInterpretedTagData2()

