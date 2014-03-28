if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

AlanSRaskin.ExifViewer.Makers.dumpCasioTagData = function (ifd, output, is_motorola) {
	var tagnum;
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
			switch (ifd.maker_type) {
			case 1:
				output.push(AlanSRaskin.ExifViewer.Makers.getCasioInterpretedTagData1(tagnum, data));
				break;
			case 2:
				output.push(AlanSRaskin.ExifViewer.Makers.getCasioInterpretedTagData2(tagnum, data));
				break;
			}
		}
	}
}	// dumpCasioTagData()

// http://park2.wakwak.com/~tsuruzoh/Computer/Digicams/exif-e.html#APP3
// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Casio.html
AlanSRaskin.ExifViewer.Makers.getCasioInterpretedTagData1 = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	case 0x0001:
		var RecordingModes = new Array('n/a (0)', 'single shutter (1)', 'panorama (2)', 
										'night scene (3)', 'portrait (4)', 'landscape (5)');
		RecordingModes[7] = 'panorama (7)';
		RecordingModes[10] = 'night scene (10)';
		RecordingModes[15] = 'portrait (15)';
		RecordingModes[16] = 'landscape (16)';
		output.push('Recording Mode = ' + (RecordingModes[data] ? RecordingModes[data] : data));
		break;
	case 0x0002:	
		var Qualities = new Array('n/a (0)', 'economy (1)', 'normal (2)', 'fine (3)');
		output.push('Quality = ' + (Qualities[data] ? Qualities[data] : data));
		break;
	case 0x0003:
		var FocusingModes = new Array('n/a (0)', 'n/1 (1)', 'macro (2)', 'auto focus (3)', 
										'manual focus (4)', 'infinity (5)', 'n/a (6)', 'spot AF (7)');
		output.push('Focusing Mode = ' + (FocusingModes[data] ? FocusingModes[data] : data));
		break;
	case 0x0004:	
		var FlashModes = new Array('n/a (0)', 'auto (1)', 'on (2)', 'off (3)', 'off OR red-eye reduction (4)', 
									'red-eye reduction (5)');
		output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
		break;
	case 0x0005:	
		var FlashIntensities = [];
		FlashIntensities[11] = 'weak (11)';
		FlashIntensities[12] = 'low (12)';
		FlashIntensities[13] = 'normal (13)';
		FlashIntensities[14] = 'high (14)';
		FlashIntensities[15] = 'strong (15)';
		output.push('Flash Intensity = ' + (FlashIntensities[data] ? FlashIntensities[data] : data));
		break;
	case 0x0006:
		output.push('Object Distance = ' + data + ' mm');
		break;
	case 0x0007:	
		var WhiteBalances = new Array('n/a (0)', 'auto (1)', 'tungsten (2)', 'daylight (3)', 
										'fluorescent (4)', 'shade (5)');
		WhiteBalances[129] = 'manual (129)';
		output.push('White Balance = ' + (WhiteBalances[data] ? WhiteBalances[data] : data));
		break;
	case 0x000A:
		var DigitalZooms = [];
		DigitalZooms[0x10000] = 'off';
		DigitalZooms[0x10001] = '2X';
		DigitalZooms[0x19999] = '1.6X';
		DigitalZooms[0x20000] = '2X';
		DigitalZooms[0x33333] = '3.2X';
		DigitalZooms[0x40000] = '4X';
		output.push('Digital Zoom = ' + (DigitalZooms[data] ? DigitalZooms[data] : data));
		break;
	case 0x000B:
		var Sharpnesses = new Array('normal (0)', 'soft (1)', 'hard (2)');
		Sharpnesses[16] = 'normal (16)';
		Sharpnesses[17] = '+1 (17)';
		Sharpnesses[18] = '-1 (18)';
		output.push('Sharpness = ' + (Sharpnesses[data] ? Sharpnesses[data] : data));
		break;
	case 0x000C:
		var Contrasts = new Array('normal (0)', 'low (1)', 'high (2)');
		Contrasts[16] = 'normal (16)';
		Contrasts[17] = '+1 (17)';
		Contrasts[18] = '-1 (18)';
		output.push('Contrast = ' + (Contrasts[data] ? Contrasts[data] : data));
		break;
	case 0x000D:
		var Saturations = new Array('normal (0)', 'low (1)', 'high (2)');
		Saturations[16] = 'normal (16)';
		Saturations[17] = '+1 (17)';
		Saturations[18] = '-1 (18)';
		output.push('Saturation = ' + (Saturations[data] ? Saturations[data] : data));
		break;
	case 0x0014:   
		var CCDSensitivities = [];
		CCDSensitivities[64] = 'normal (64)';
		CCDSensitivities[80] = 'normal (80)';
		CCDSensitivities[100] = 'high (100)';
		CCDSensitivities[125] = '+1.0 (125)';
		CCDSensitivities[250] = '+2.0 (250)';
		CCDSensitivities[244] = '+3.0 (244)';
		output.push('CCD Sensitivity = ' + (CCDSensitivities[data] ? CCDSensitivities[data] : data));
		break;
	case 0x0016:
		var Enhancements = new Array('n/a (0)', 'off (1)', 'red (2)', 'green (3)', 
									'blue (4)', 'flesh tones (5)');
		output.push('Enhancement = ' + (Enhancements[data] ? Enhancements[data] : data));
		break;
	case 0x0017:
		var Filters = new Array('n/a (0)', 'off (1)', 'black &amp; white (2)', 'sepia (3)',
								'red (4)', 'green (5)', 'blue (6)', 'yellow (7)', 'pink (8)',
								'purple (9)');
		output.push('Filter = ' + (Filters[data] ? Filters[data] : data));
		break;
	case 0x0018:
		var AFPoints = new Array('n/a (0)', 'center (1)', 'upper left (2)', 'upper right (3)',
								 'near left/right of center (4)', 'far left/right of center (5)',
								 'far left/right of center/bottom (6)', 'top near-left (7)',
								 'near upper/left (8)', 'top near-right (9)', 'top left (10)',
								 'top center (11)', 'top right (12)', 'center left (13)',
								 'center right (14)', 'bottom left (15)', 'bottom center (16)',
								 'bottom right (17)');
		output.push('AF Point = ' + (AFPoints[data] ? AFPoints[data] : data));
		break;
	case 0x0019:
		var FlashIntensities = new Array('n/a (0)', 'normal (1)', 'weak (2)', 'strong (3)');
		output.push('Flash Intensity = ' + (FlashIntensities[data] ? FlashIntensities[data] : data));
		break;
	case 0x0E00:
		output.push('Print IM = ' + data);
		break;
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getCasioInterpretedTagData1()

AlanSRaskin.ExifViewer.Makers.getCasioInterpretedTagData2 = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getCasioInterpretedTagData2()

