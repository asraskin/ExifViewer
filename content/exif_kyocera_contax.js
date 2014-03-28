if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

AlanSRaskin.ExifViewer.Makers.dumpKyoceraContaxTagData = function (ifd, output, is_motorola) {
	var tagnum;
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
			output.push(AlanSRaskin.ExifViewer.Makers.getKyoceraContaxInterpretedTagData(tagnum, data));
		}
	}
}	// dumpKyoceraContaxTagData()

AlanSRaskin.ExifViewer.Makers.getKyoceraContaxInterpretedTagData = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getKyoceraContaxInterpretedTagData()
