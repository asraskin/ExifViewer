if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

AlanSRaskin.ExifViewer.Makers.dumpOlympusTagData = function (ifd, output, is_motorola) {
	var tagnum;
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
			output.push(AlanSRaskin.ExifViewer.Makers.getOlympusInterpretedTagData(tagnum, data));
		}
	}
}	// dumpOlympusTagData()

// http://park2.wakwak.com/~tsuruzoh/Computer/Digicams/exif-e.html#APP1
// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Olympus.html
AlanSRaskin.ExifViewer.Makers.getOlympusInterpretedTagData = function (tagnum, data) {
	var output = new Array();
	switch (tagnum) {
	case 0x0000:
		output.push('Maker Note Version = ' + data);
		break;
	case 0x0001:
		output.push('Minolta Camera Settings (old) = ' + data);
		break;
	case 0x0003:
		output.push('Minolta Camera Settings = ' + data);
		break;
	case 0x0040:
		output.push('Compressed Image Size = ' + data);
		break;
	case 0x0081:
		output.push('Preview Image Data = ' + data);
		break;
	case 0x0088:
		output.push('Preview Image Start = ' + data);
		break;
	case 0x0089:
		output.push('Preview Image Length = ' + data);
		break;
	case 0x0100:
		output.push('Thumbnail Image = ' + data);
		break;
	case 0x0101:
		var ColourModes = new Array('natural color (0)', 'black&amp;white (1)', 'vivid color (2)',
									'solarization (3)', 'Adobe RGB (4)');
		output.push('Colour Mode = ' + (ColourModes[data] ? ColourModes[data] : data));
		break;
	case 0x0102:
	case 0x0103:
		var MinoltaQualities = new Array('raw (0)', 'superfine (1)', 'fine (2)', 'normal (3)',
											'economy (4)', 'extra fine (5)');
		output.push('Minolta Quality = ' + (MinoltaQualities[data] ? MinoltaQualities[data] : data));
		break;
	case 0x0200:
		var tmp = new Array();
		AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
		var SpecialModes1 = new Array('normal (0)', 'unknown (1)', 'fast (2)', 'panorama (3)');
		var SpecialModes3 = new Array('n/a (0)', 'left to right (1)', 'right to left (2)', 
										'bottom to top (3)', 'top to bottom (4)');
		output.push('Special Mode:<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>Picture Taking Mode = ' + (SpecialModes1[tmp[0]] ? SpecialModes1[tmp[0]] : data)
					+ '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>Sequence Number = ' + tmp[1] + '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>Panorama Direction = ' + (SpecialModes3[tmp[2]] ? SpecialModes3[tmp[2]] : data));
		break;
	case 0x0201:
		var JpegQualities = new Array('n/a (0)', 'SQ (1)', 'HQ (2)', 'SHQ (3)');
		output.push('JPEG Quality = ' + (JpegQualities[data] ? JpegQualities[data] : data));
		break;
	case 0x0202:
		var MacroModes = new Array('normal (0)', 'macro (1)', 'super macro (2)');
		output.push('Macro Mode = ' + (MacroModes[data] ? MacroModes[data] : data));
		break;
	case 0x0203:
		var BWmodes = new Array('off (0)', 'on (1)');
		output.push('B&amp;W Mode = ' + (BWmodes[data] ? BWmodes[data] : data));
		break;
	case 0x0204:
//		var DigitalZooms = new Array('normal (0)', 'n/a (1)', 'digital 2x zoom (2)');
//		output.push('Digital Zoom = ' + (DigitalZooms[data] ? DigitalZooms[data] : data));
		output.push('Digital Zoom = ' + data);		break;
	case 0x0205:
		output.push('Focal Plane Diagonal = ' + data);
		break;
	case 0x0206:
		output.push('Lens Distortion Parameters = ' + data);
		break;
	case 0x0207:
		output.push('Software Release / Firmware Version / Camera Type = ' + data);
		break;
	case 0x0208:
		output.push('Picture/Text Information = ' + data);
		break;
	case 0x0209:
		output.push('Camera ID = ' + data);
		break;
	case 0x020B:
		output.push('Epson Image Width = ' + data);
		break;
	case 0x020C:
		output.push('Epson Image Height = ' + data);
		break;
	case 0x020D:
		output.push('Epson Software = ' + data);
		break;
	case 0x0280:
		output.push('Preview Image = ' + data);
		break;
	case 0x0300:
		output.push('Pre-Capture Frames = ' + data);
		break;
	case 0x0302:
		var OneTouchWBs = new Array('off (0)', 'on (1)', 'on (preset) (2)');
		output.push('One Touch WB = ' + (OneTouchWBs[data] ? OneTouchWBs[data] : data));
		break;
	case 0x0404:
		output.push('Serial Number = ' + data);
		break;
	case 0x0E00:
		output.push('Print IM = ' + data);
		break;
	case 0x0F00:
		output.push('Data Dump = ' + data);
		break;
	case 0x0F01:
		output.push('Data Dump 2 = ' + data);
		break;
	case 0x1000:
		output.push('Shutter Speed Value = ' + data);
		break;
	case 0x1001:
		output.push('ISO Value = ' + data);
		break;
	case 0x1002:
		output.push('Aperture Value = ' + data);
		break;
	case 0x1003:
		output.push('Brightness Value = ' + data);
		break;
	case 0x1004:
		var FlashModes = new Array('n/a (0)', 'n/a (1)', 'on (2)', 'off (3)');
		output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
		break;
	case 0x1005:
		var FlashDevices = new Array('none (0)', 'internal (1)', 'n/a (2)', 'n/a (3)',
									'external (4)', 'internal + external (5)');
		output.push('Flash Device = ' + (FlashDevices[data] ? FlashDevices[data] : data));
		break;
	case 0x1006:
		output.push('Exposure Compensation = ' + data);
		break;
	case 0x1007:
		output.push('Sensor Temperature = ' + data);
		break;
	case 0x1008:
		output.push('Lens Temperature = ' + data);
		break;
	case 0x100B:
		var FocusModes = new Array('auto (0)', 'manual (1)');
		output.push('Focus Mode = ' + (FocusModes[data] ? FocusModes[data] : data));
		break;
	case 0x100C:
		output.push('Manual Focus Distance = ' + data);
		break;
	case 0x100D:
		output.push('Zoom Step Count = ' + data);
		break;
	case 0x100E:
		output.push('Focus Step Count = ' + data);
		break;
	case 0x100F:
		var Sharpnesses = new Array('normal (0)', 'hard (1)', 'soft (2)');
		output.push('Sharpness = ' + (Sharpnesses[data] ? Sharpnesses[data] : data));
		break;
	case 0x1010:
		output.push('Flash Charge Level = ' + data);
		break;
	case 0x1011:
		output.push('Colour Matrix = ' + data);
		break;
	case 0x1012:
		output.push('Black Level = ' + data);
		break;
	case 0x1015:
		var WBModes = new Object();
		WBModes['0x01'] = 'auto';
		WBModes['0x01,0x00'] = 'auto';
		WBModes['0x01,0x02'] = 'auto (2)';
		WBModes['0x01,0x04'] = 'auto (4)';
		WBModes['0x02,0x02'] = '3000 Kelvin';
		WBModes['0x02,0x03'] = '3700 Kelvin';
		WBModes['0x02,0x04'] = '4000 Kelvin';
		WBModes['0x02,0x05'] = '4500 Kelvin';
		WBModes['0x02,0x06'] = '5500 Kelvin';
		WBModes['0x02,0x07'] = '6500 Kelvin';
		WBModes['0x02,0x08'] = '7500 Kelvin';
		WBModes['0x03,0x00'] = 'one-touch';
		output.push('WB Mode = ' + (WBModes[data] ? WBModes[data] : data));
		break;
	case 0x1017:
		output.push('Red Balance = ' + data);
		break;
	case 0x1018:
		output.push('Blue Balance = ' + data);
		break;
 	 	string 	 
	case 0x101A:
		output.push('Serial Number = ' + data);
		break;
	case 0x1023:
		output.push('Flash Exposure Comp = ' + data);
		break;
	case 0x1026:
		var ExternalFlashBounces = new Array('no (0)', 'yes (1)');
		output.push('External Flash Bounce = ' + (ExternalFlashBounces[data] ? ExternalFlashBounces[data] : data));
		break;
	case 0x1027:
		output.push('External Flash Zoom = ' + data);
		break;
	case 0x1028:
		output.push('External Flash Mode = ' + data);
		break;
	case 0x1029:
		var Contrasts = new Array('high (0)', 'normal (1)', 'low (2)');
		output.push('Contrast = ' + (Contrasts[data] ? Contrasts[data] : data));
		break;
	case 0x102A:
		output.push('Sharpness Factor = ' + data);
		break;
 	 	int16u[6] 	 
	case 0x102B:
		output.push('Colour Control = ' + data);
		break;
	case 0x102C:
		output.push('Valid Bits = ' + data);
		break;
	case 0x102D:
		output.push('Coring Filter = ' + data);
		break;
	case 0x102E:
		output.push('Olympus Image Width = ' + data);
		break;
	case 0x102f:
		output.push('Olympus Image Height = ' + data);
		break;
	case 0x1034:
		output.push('Compression Ratio = ' + data);
		break;
	case 0x1035:
		var PreviewImageValids = new Array('no (0)', 'yes (1)');
		output.push('Preview Image Valid = ' + (PreviewImageValids[data] ? PreviewImageValids[data] : data));
		break;
	case 0x1036:
		output.push('Preview Image Start = ' + data);
		break;
	case 0x1037:
		output.push('Preview Image Length = ' + data);
		break;
	case 0x1039:
		var CCDScanModes = new Array('interlaced (0)', 'progressive (1)');
		output.push('CCD Scan Mode = ' + (CCDScanModes[data] ? CCDScanModes[data] : data));
		break;
	case 0x103A:
		var NoiseReductions = new Array('off (0)', 'on (1)');
		output.push('Noise Reduction = ' + (NoiseReductions[data] ? NoiseReductions[data] : data));
		break;
	case 0x103B:
		output.push('Infinity Lens Step = ' + data);
		break;
	case 0x103c:
		output.push('Near Lens Step = ' + data);
		break;
	case 0x2010:
		output.push('Equipment = ' + data);
		break;
	case 0x2020:
		output.push('Camera Settings = ' + data);
		break;
	case 0x2030:
		output.push('Raw Development = ' + data);
		break;
	case 0x2040:
		output.push('Image Processing = ' + data);
		break;
	case 0x2050:
		output.push('Focus Information = ' + data);
		break;
	case 0x3000:
		output.push('Raw Information = ' + data);
		break;
/*
	case 0x0000:
		output.push('x = ' + data);
		break;
*/
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getOlympusInterpretedTagData()
