if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

AlanSRaskin.ExifViewer.Makers.dumpEpsonTagData = function (ifd, output, is_motorola) {
	var tagnum;
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
			output.push(AlanSRaskin.ExifViewer.Makers.getEpsonInterpretedTagData(tagnum, data));
		}
	}
}	// dumpEpsonTagData()

AlanSRaskin.ExifViewer.Makers.getEpsonInterpretedTagData = function (tagnum, data) {
	return AlanSRaskin.ExifViewer.Makers.getOlympusInterpretedTagData(tagnum, data);
/*
	var output = new Array();
	switch (tagnum) {
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
*/
}	// getEpsonInterpretedTagData()
