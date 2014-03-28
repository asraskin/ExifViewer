if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

AlanSRaskin.ExifViewer.Makers.dumpFujifilmTagData = function (ifd, output, is_motorola) {
	var tagnum;
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
			output.push(AlanSRaskin.ExifViewer.Makers.getFujifilmInterpretedTagData(tagnum, data));
		}
	}
}	// dumpFujifilmTagData()

// http://park2.wakwak.com/~tsuruzoh/Computer/Digicams/exif-e.html#APP4
// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/FujiFilm.html
AlanSRaskin.ExifViewer.Makers.getFujifilmInterpretedTagData = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	case 0x0000:
		output.push('Version = ' + AlanSRaskin.ExifViewer.Base.bytesToString(data));
		break;
	case 0x1010:
		output.push('Internal Serial Number = ' + data);
		break;
	case 0x1000:
		output.push('Quality = ' + data);
		break;
	case 0x1001:
		var Sharpnesses = new Array('n/a (0)', 'soft (1)', 'soft (2)', 'normal (3)', 'hard (4)', 'hard (5)');
		output.push('Sharpness = ' + (Sharpnesses[data] ? Sharpnesses[data] : data));
		break;
	case 0x1002:
		var WhiteBalances = new Array();
		WhiteBalances[0] = 'auto (0)';
		WhiteBalances[256] = 'daylight (256)';
		WhiteBalances[512] = 'cloudy (512)';
		WhiteBalances[768] = 'daylight color - fluorescent (768)';
		WhiteBalances[769] = 'day white color - fluorescent (769)';
		WhiteBalances[770] = 'white - fluorescent (770)';
		WhiteBalances[1024] = 'incandenscent (1024)';
		WhiteBalances[3840] = 'custom white balance (3840)';
		output.push('White Balance = ' + (WhiteBalances[data] ? WhiteBalances[data] : data));
		break;
	case 0x1003:
		var Colours = new Array();
		Colours[0] = 'normal (STD) (0)'; 
		Colours[256] = 'high (256)'; 
		Colours[512] = 'low (ORG) (512)';
		Colours[768] = 'none (black&amp;white) (768)';
		output.push('Colour / Chroma Saturation = ' + (Colours[data] ? Colours[data] : data));
		break;
	case 0x1004:
		var Tones = new Array();
		Tones[0] = 'normal (STD) (0)'; 
		Tones[256] = 'high (HARD) (256)'; 
		Tones[512] = 'low (ORG) (512)';
		output.push('Tone / Contrast = ' + (Tones[data] ? Tones[data] : data));
		break;
	case 0x1010:
		var FlashModes = new Array('auto (0)', 'on (1)', 'off (2)', 'red-eye reduction (3)');
		output.push('Flash Firing Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
		break;
	case 0x1011:
		output.push('Flash Firing Strength Compensation = ' + data + ' (APEX(EV))');
		break;
	case 0x1020:
		var MacroModes = new Array('off (0)', 'on (1)');
		output.push('Macro Mode = ' + (MacroModes[data] ? MacroModes[data] : data));
		break;
	case 0x1021:
		var FocusModes = new Array('auto (0)', 'manual (1)');
		output.push('Focusing Mode = ' + (FocusModes[data] ? FocusModes[data] : data));
		break;
	case 0x1023:
		output.push('Focus Pixel = ' + data);
		break;
	case 0x1030:
		var SlowSyncs = new Array('off (0)', 'on (1)');
		output.push('Slow Sync = ' + (SlowSyncs[data] ? SlowSyncs[data] : data));
		break;
	case 0x1031:
		var PictureModes = new Array('auto (0)', 'portrait scene (1)', 'landscape scene (2)',
			'n/a (3)', 'sports scene (4)', 'night scene (5)', 'program AE (6)',
			'natural light (7)', 'anti-blur (8)', 'n/a (9)', 'sunset (10)', 
			'museum (11)', 'party (12)', 'flower (13)', 'text (14)', 
			'natural light &amp; flash (15)', 'beach (16)', 'snow (17)',
			'fireworks (18)', 'underwater (19)');
		PictureModes[256] = 'aperture priority AE (256)';
		PictureModes[512] = 'shutter speed priority AE (512)';
		PictureModes[768] = 'manual exposure (768)';
		output.push('Picture Mode = ' + (PictureModes[data] ? PictureModes[data] : data));
		break;
	case 0x1100:
		var ContTakes = new Array('off (0)', 'on (1)', 'no flash &amp; flash (2)');
		output.push('Continuous Taking / Auto Bracketing Mode = ' + (ContTakes[data] ? ContTakes[data] : data));
		break;
	case 0x1101:
		output.push('Sequence Number = ' + data);
		break;
	case 0x1210:
		var ColourModes = new Array();
		ColourModes[0] = 'standard (0)';
		ColourModes[16] = 'chrome (16)';
		ColourModes[48] = 'black &amp; white (48)';
		output.push('Colour Mode = ' + (ColourModes[data] ? ColourModes[data] : data));
		break;
	case 0x1300:
		var BlurWarnings = new Array('no (0)', 'yes (1)');
		output.push('Blur Warning = ' + (BlurWarnings[data] ? BlurWarnings[data] : data));
		break;
	case 0x1301:
		var FocusWarnings = new Array('auto-focus good (0)', 'out of focus (1)');
		output.push('Auto Focus Warning = ' + (FocusWarnings[data] ? FocusWarnings[data] : data));
		break;
	case 0x1302:
		var ExposureWarnings = new Array('AE good (0)', 'bad/over exposure (>1/1000s, F11) (1)');
		output.push('Auto Exposure Warning = ' + (ExposureWarnings[data] ? ExposureWarnings[data] : data));
		break;
	case 0x1400:
		var DynamicRanges = new Array('n/a (0)', 'standard (1)', 'n/a (2)', 'wide (3)');
		output.push('Dynamic Range = ' + (DynamicRanges[data] ? DynamicRanges[data] : data));
		break;
	case 0x1401:
		var FilmModes = new Array();
		FilmModes[0] = 'F0/Standard (0)';
		FilmModes[256] = 'F1/Studio Portrait (256)';
		FilmModes[512] = 'F2/Fujichrome (512)';
		FilmModes[768] = 'F3/Studio Portrait Ex (768)';
		FilmModes[1024] = 'F4/Velvia (1024)';
		output.push('Filem Mode = ' + (FilmModes[data] ? FilmModes[data] : data));
		break;
	case 0x1402:
		var DynamicRangeSettings = new Array();
		DynamicRangeSettings[0] = 'auto (100-400%) (0)';
		DynamicRangeSettings[1] = 'RAW (1)';
		DynamicRangeSettings[256] = 'standard (100%) (256)';
		DynamicRangeSettings[512] = 'wide1 (230%) (512)';
		DynamicRangeSettings[513] = 'wide2 (400%) (513)';
		DynamicRangeSettings[0x8000] = 'film simulation mode (0x8000)';
		output.push('Dynamic Range Setting = ' + (DynamicRangeSettings[data] ? DynamicRangeSettings[data] : data));
		break;
	case 0x1403:
		output.push('Development Dynamic Range = ' + data);
		break;
	case 0x1404:
		output.push('Minimum Focal Length = ' + data);
		break;
	case 0x1405:
		output.push('Maximum Focal Length = ' + data);
		break;
	case 0x1406:
		output.push('Maximum Aperture at Minimum Focal Length = ' + data);
		break;
	case 0x1407:
		output.push('Maximum Aperture at Maximum Focal Length = ' + data);
		break;
	case 0x8000:
		output.push('File Source = ' + data);
		break;
	case 0x8002:
		output.push('Order Number = ' + data);
		break;
	case 0x8003:
		output.push('Frame Number = ' + data);
		break;
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getFujifilmInterpretedTagData()
