if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

AlanSRaskin.ExifViewer.Makers.dumpNikonTagData = function (ifd, output, is_motorola) {
	var tagnum;
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
			switch (ifd.maker_type) {
			case 1:
				output.push(AlanSRaskin.ExifViewer.Makers.getNikonInterpretedTagDataFormat1(tagnum, data));
				break;
			case 2:
				output.push(AlanSRaskin.ExifViewer.Makers.getNikonInterpretedTagDataFormat2(tagnum, data));
				break;
			case 3:
				output.push(AlanSRaskin.ExifViewer.Makers.getNikonInterpretedTagDataFormat23(tagnum, data));
				break;
			default:
				output.push(AlanSRaskin.ExifViewer.Makers.getGenericInterpretedTagData(tagnum, data));
				break;
			}
		}
	}
}	// dumpNikonTagData()

// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Nikon.html
// http://gvsoft.homedns.org/exif/makernote-nikon.html
// http://www.ozhiker.com/electronics/pjmt/jpeg_info/nikon_mn.html
AlanSRaskin.ExifViewer.Makers.getNikonInterpretedTagDataFormat1 = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	case 0x0002:
		output.push('Family ID / Version = ' + data);
		break;
	case 0x0003:
		var QualitySettings = new Array('n/a (0)', 'VGA Basic - 640x480 (1/16) (1)', 'VGA Normal - 640x480 (1/8) (2)', 'VGA Fine - 640x480 (1/4) (3)', 
										'SXGA Basic - 1280x960 (1/16) (4)', 'SXGA Normal - 1280x960 (1/8) (5)', 'SXGA Fine - 1280x960 (1/4) (6)',
										'XGA Basic - 1024x768 (1/16) (7)', 'XGA Normal - 1024x768 (1/8) (8)', 'XGA Fine - 1024x768 (1/4) (9)',
										'UXGA Basic - 1600x1200 (1/16) (10)', 'UXGA Normal - 1600x1200 (1/8) (11)', 'UXGA Fine - 1600x1200 (1/4) (12)');
		QualitySettings[20] = '1600x1200 - Hi (1/1) (20)';
		output.push('Quality Setting = ' + (QualitySettings[data] ? QualitySettings[data] : data));
		break;
	case 0x0004:
		var ColourModes = new Array('n/a (0)', 'colour (1)', 'monochrome (2)');
		output.push('Colour Mode = ' + (ColourModes[data] ? ColourModes[data] : data));
		break;
	case 0x0005:
		var ImageAdjustments = new Array('normal (0)', 'bright+ (1)', 'bright- (2)', 'contrast+ (3)', 'contrast- (4)', 'auto? (5)');
		output.push('Image Adjustment = ' + (ImageAdjustments[data] ? ImageAdjustments[data] : data));
		break;
	case 0x0006:
		var CCDSensitivities = new Array('ISO 80 (0)', 'n/a (1)', 'ISO 160 (2)', 'n/a (3)', 'ISO 320 (4)', 'ISO 100 (5)');
		output.push('ISO Speed / CCD Sensitivity = ' + (CCDSensitivities[data] ? CCDSensitivities[data] : data));
		break;
	case 0x0007:
		var WhiteBalances = new Array('auto (0)', 'preset (1)', 'daylight (2)', 'incandescent (3)', 'fluorescent (4)', 
									 'cloudy (5)', 'SpeedLight (flash) (6)');
		output.push('White Balance = ' + (WhiteBalances[data] ? WhiteBalances[data] : data));
		break;
	case 0x0008:
		output.push('Focus = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5));
		break;
	case 0x000A:
		output.push('Digital Zoom = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5));
		break;
	case 0x000B:
		var Converters = new Array('no/none (0)', 'yes/fisheye (1)');
		output.push('Fisheye Converter = ' + (Converters[data] ? Converters[data] : data));
		break;
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getNikonInterpretedTagDataFormat1()

AlanSRaskin.ExifViewer.Makers.getNikonInterpretedTagDataFormat23 = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	case 0x0001:
		output.push('Version = ' + AlanSRaskin.ExifViewer.Base.bytesToAscii(data));
		break;
	case 0x0002:
		var ISOSettings = {};
		ISOSettings['0,0'] = 'auto';
		ISOSettings['0,100'] = 'ISO 100';
		ISOSettings['0,200'] = 'ISO 200';
		ISOSettings['0,400'] = 'ISO 400';
		ISOSettings['0,800'] = 'ISO 800';
		ISOSettings['0,1600'] = 'ISO 1600';
		output.push('ISO Setting = ' + (ISOSettings[data] ? ISOSettings[data] : data));
		break;
	case 0x0003:
		output.push('Colour Mode = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0004:
		output.push('Quality = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0005:
		output.push('White Balance = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0006:
		output.push('Sharpness / Image Sharpening = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0007:
		output.push('Focus Mode = ' + data);
		break;
	case 0x0008:
		output.push('Flash Setting = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0009:
		output.push('Flash Type / Auto Flash Mode = ' + data);
		break;
	case 0x000A:
		output.push('Unknown = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5));
		break;
	case 0x000B:
		output.push('White Balance Fine Tuning / Bias Value = ' + data);	// Units Approx: 100 Mired per increment
		break;
	case 0x000C:
		output.push('White Balance Red, Blue Coefficients = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRationals(data, 5));
		break;
	case 0x000D:
		output.push('Program Shift = ' + data);
		break;
	case 0x000E:
		output.push('Exposure Difference = ' + data);
		break;
	case 0x000F:
		output.push('ISO Selection = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0010:
		output.push('Data Dump = ' + data);
		break;
	case 0x0011:
		output.push('Nikon Preview / Skip / Thumbnail IFD Offset = ' + data);
		break;
	case 0x0012:
		var FlashCompensations = {0x06:+1.0 , 0x04:+0.7 , 0x03:+0.5 , 0x02:+0.3 , 0x00:+0.0 , 0xfe:-0.3 , 0xfd:-0.5 ,
								  0xfc:-0.7 , 0xfa:-1.0 , 0xf8:-1.3 , 0xf7:-1.5 , 0xf6:-1.7 , 0xf4:-2.0 , 0xf2:-2.3 ,
								  0xf1:-2.5 , 0xf0:-2.7 , 0xee:-3.0}
		output.push('Flash Exposure Compensation = ' + (FlashCompensations[data] ? FlashCompensations[data] + ' EV' : data));
		break;
	case 0x0013:
		var ISOSpeedRequests = {};
		ISOSpeedRequests['0,0'] = 'auto';
		ISOSpeedRequests['0,100'] = 'ISO 100';
		ISOSpeedRequests['0,200'] = 'ISO 200';
		ISOSpeedRequests['0,400'] = 'ISO 400';
		ISOSpeedRequests['0,800'] = 'ISO 800';
		ISOSpeedRequests['0,1600'] = 'ISO 1600';
		output.push('ISO Setting / ISO Speed Requested = ' + (ISOSpeedRequests[data] ? ISOSpeedRequests[data] : data));
		break;
	case 0x0014:
		output.push('Colour Balance A / NRW Data = ' + data);
		break;
	case 0x0016:
		output.push('Image Boundary / Photo Corner Coordinates = ' + data);
		break;
	case 0x0018:
	case 0x0018:
		var FlashBracketCompensations = {0x06:+1.0 , 0x04:+0.7 , 0x03:+0.5 , 0x02:+0.3 , 0x00:+0.0 , 0xfe:-0.3 , 0xfd:-0.5 ,
								  0xfc:-0.7 , 0xfa:-1.0 , 0xf8:-1.3 , 0xf7:-1.5 , 0xf6:-1.7 , 0xf4:-2.0 , 0xf2:-2.3 ,
								  0xf1:-2.5 , 0xf0:-2.7 , 0xee:-3.0}
		output.push('Flash Exposure Bracket Value / Flash Bracket Compensation Applied / External Flash Exposure Compensation = ' + (FlashBracketCompensations[data] ? FlashBracketCompensations[data] + ' EV' : data));
		break;
	case 0x0019:
		output.push('Exposure Bracket Value / AE Bracket Compensation Applied = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5) + ' EV');
		break;
	case 0x001A:
		output.push('Image Processing = ' + data);
		break;
	case 0x001B:
		output.push('Crop High Speed = ' + data);
		break;
	case 0x001C:
		output.push('Exposure Tuning = ' + data);
		break;
	case 0x001D:
		output.push('Serial Number = ' + data);
		break;
	case 0x001E:
		var ColourSpaces = new Array('n/a (0)', 'sRGB (1)', 'Adobe RGB (2)');
		output.push('Colour Space = ' + (ColourSpaces[data] ? ColourSpaces[data] : data));
		break;
	case 0x001F:
		output.push('VR Information = ' + data);
		break;
	case 0x0020:
		var ImageAuthentications = ['off (0)', 'on (1)'];
		output.push('Image Authentication = ' + (ImageAuthentications[data] ? ImageAuthentications[data] : data));
		break;
	case 0x0021:
		output.push('Face Detection = ' + data);
		break;
	case 0x0022:
		var ActiveDLightings = ['off (0)', 'low (1)', 'n/a (2)', 'normal (3)', 'n/a (4)', 'high (5)', 'n/a (6)', 'extra high (7)'];
		ActiveDLightings[65535] = 'auto (65535)';
		output.push('Active D Lighting = ' + (ActiveDLightings[data] ? ActiveDLightings[data] : data));
		break;
	case 0x0023:
		output.push('Picture Control Data = ' + data);
		break;
	case 0x0024:
		output.push('World Time = ' + data);
		break;
	case 0x0025:
		output.push('ISO Information = ' + data);
		break;
	case 0x002a:
		var VignetteControls = ['off (0)', 'low (1)', 'n/a (2)', 'normal (3)', 'n/a (4)', 'high (5)'];
		output.push('Vignette Control = ' + (VignetteControls[data] ? VignetteControls[data] : data));
		break;
	case 0x002b:
		output.push('Distortion Information = ' + data);
		break;
	case 0x0039:
		output.push('Location Information = ' + data);
		break;
	case 0x0080:
		output.push('Image Adjustment = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0081:
		output.push('Tone Compensation (Contrast) = ' + data);
		break;
	case 0x0082:
		output.push('Lens Adapter / Auxiliary Lens = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0083:
		var data2 = '';
		data2 += (data & 0x01 ? 'MF ' : ''); 
		data2 += (data & 0x02 ? 'D ' : ''); 
		data2 += (data & 0x04 ? 'G ' : ''); 
		data2 += (data & 0x08 ? 'VR ' : ''); 
		output.push('Lens Type = ' + data2);
		break;
	case 0x0084:
		var tmp = AlanSRaskin.ExifViewer.Base.formatRationals(data, 5).split(', ');
		output.push('Lens Minimum and Maximum Focal Lengths and Maximum Aperture F-Stop at these Focal Lengths = ' + data + ' = ' + tmp[0] + ' mm, ' + tmp[1] + ' mm, f/' + tmp[2] + ', f/' + tmp[3]);
		break;
	case 0x0085:
		var tmp = data.split('/');
		output.push('Manual Focus Distance = ' + (tmp[1] == '0' ? '(not applicable)' : data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5) + ' m'));
		break;
	case 0x0086:
		output.push('Digital Zoom Factor = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5));
		break;
	case 0x0087:
		var FlashModes = new Array('did not fire (0)', 'fired, manual (1)');
		FlashModes[7] = 'fired, external (7)';
		FlashModes[8] = 'fired, commander mode (8)';
		FlashModes[9] = 'fired, TTL mode / on camera (9)';
		output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
		break;
	case 0x0088:
/*
		var AFFocusPositions = {};
		AFFocusPositions['0x00,0x00,0x00,0x00'] = 'center'; 
		AFFocusPositions['0x00,0x01,0x00,0x00'] = 'top';
		AFFocusPositions['0x00,0x02,0x00,0x00'] = 'bottom'; 
		AFFocusPositions['0x00,0x03,0x00,0x00'] = 'left';
		AFFocusPositions['0x00,0x04,0x00,0x00'] = 'right';
		output.push('AF Focus Position = ' + (AFFocusPositions[data] ? AFFocusPositions[data] : data));
*/
		var tmp = [];
		if (typeof data == 'number') {	// sometimes it's a number such as 0x1000000
			tmp[0] = data & 0xFF;
			tmp[1] = (data >> 8) & 0xFF;
			tmp[2] = (data >> 16) & 0xFFFF;
		} else {
			AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
			if (tmp.length == 4) {
				tmp[2] |= tmp[3] << 8;
				tmp[3] = 0;
			}
		}
		if (tmp.length < 3)  break;
		var AFAreaModes = new Array('single area (0)', 'dynamic area (1)',
									'dynamic area, closest subject (2)', 'group dynamic (3)',
									'single area (wide) (4)', 'dynamic area (wide) (5)');
		output.push('AF Area Mode = ' + (AFAreaModes[tmp[0]] ? AFAreaModes[tmp[0]] : data));

		var AFPoints = new Array('center (0)', 'top (1)', 'bottom (2)', 'left (3)', 'right (4)',
								 'upper-left (5)', 'upper-right (6)', 'lower-left (7)',
								 'lower-right (8)', 'far left (9)', 'far right (10)');
		output.push('AF Point = ' + (AFPoints[tmp[1]] ? AFPoints[tmp[1]] : data));
		
		var data2 = '';
		data2 += (tmp[2] & 0x001 ? 'center ' : ''); 
		data2 += (tmp[2] & 0x002 ? 'top ' : ''); 
		data2 += (tmp[2] & 0x004 ? 'bottom ' : ''); 
		data2 += (tmp[2] & 0x008 ? 'left ' : ''); 
		data2 += (tmp[2] & 0x010 ? 'right ' : ''); 
		data2 += (tmp[2] & 0x020 ? 'upper-left ' : ''); 
		data2 += (tmp[2] & 0x040 ? 'upper-right ' : ''); 
		data2 += (tmp[2] & 0x080 ? 'lower-left ' : ''); 
		data2 += (tmp[2] & 0x100 ? 'lower-right ' : ''); 
		data2 += (tmp[2] & 0x200 ? 'far-left ' : ''); 
		data2 += (tmp[2] & 0x400 ? 'far-right ' : ''); 
		output.push('AF Points Used = ' + data2); 
		break;
	case 0x0089:
		var data2 = '';
		data2 += (data & 0x01 ? 'continuous ' : ''); 
		data2 += (data & 0x02 ? 'delay / timer' : ''); 
		data2 += (data & 0x04 ? 'PC-control / remote ' : ''); 
		data2 += (data & 0x08 ? '? ' : ''); 
		data2 += (data & 0x10 ? 'exposure-bracketing ' : ''); 
		data2 += (data & 0x20 ? 'unused-LE-NR-slowdown ' : ''); 
		data2 += (data & 0x40 ? 'white-balance-bracketing ' : ''); 
		data2 += (data & 0x80 ? 'IR-control ' : ''); 
		output.push('Bracketing and Shooting Mode = ' + data2);
		break;
	case 0x008A:
		var AutoBracketReleases = new Array('none (0)', 'auto release (1)', 'manual release (2)');
		output.push('Auto Bracket Release = ' + (AutoBracketReleases[data] ? AutoBracketReleases[data] : data));
		break;
	case 0x008B:
		output.push('Lens F-Stops = ' + data);
		break;
	case 0x008C:
		output.push('NEF Curve 1 (Contrast Curve) = ' + data);
		break;
	case 0x008D:
		var ColourModes = {'1a':'Portrait sRGB (1a)' , '2':'Adobe RGB (2)' , '3a':'Landscape sRGB (3a)'};
		output.push('Colour Hue/Mode = ' + (ColourModes[data] ? ColourModes[data] : AlanSRaskin.ExifViewer.Base.cleanExifStringData(data)));
		break;
	case 0x008E:
		output.push('Scene Mode = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRationals(data, 5));
		break;
	case 0x008F:
		output.push('Scene Mode = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0090:
		output.push('Lighting Type /Light Source = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0091:
		output.push('Shot Information = ' + data);
		break;
	case 0x0092:
		output.push('Hue Adjustment = ' + data + ' degrees');
		break;
	case 0x0094:
		var SaturationAdjustments = {};
		SaturationAdjustments[-3] = 'black and white (-3)';
		SaturationAdjustments[-2] = '-2';
		SaturationAdjustments[-1] = '-1';
		SaturationAdjustments[0] = 'normal (0)';
		SaturationAdjustments[1] = '+1';
		SaturationAdjustments[2] = '+2';
		output.push('Saturation Adjustment = ' + (SaturationAdjustments[data] ? SaturationAdjustments[data] : data));
		break;
	case 0x0095:
		output.push('Noise Reduction = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0096:
		output.push('NEF Curve 2 (Linearization Table) = ' + data);
		break;
	case 0x0097:
		output.push('Colour Balance = ' + data);
		break;
	case 0x0098:
		output.push('Lens Data = ' + data);
		break;
	case 0x0099:
		output.push('Raw Image Center = ' + data);
		break;
	case 0x009A:
		output.push('Sensor Pixel Size = ' + AlanSRaskin.ExifViewer.Base.formatRationals(data, 5));
		break;
	case 0x009E:
		var TouchupHistories = ['none', 'n/a', 'n/a', 'black and white', 'sepia', 'trim', 'small picture',
			'D-lighting', 'red-eye', 'cyanotype', 'sky light', 'warm tone', 'colour custom', 'image overlay', 
			'red intensifier', 'green intensifier', 'blue intensifier', 'cross screen', 'quick retouch', 
			'NEF processing', 'n/a', 'n/a', 'n/a', 'distortion control', 'n/a', 'fisheye', 'straighten', 'n/a', 
			'n/a', 'perspective control', 'colour outline', 'soft filter', 'n/a', 'miniature effect'];
		var tmp = data.split(',');
		var data2 = (tmp[0] == 0 ? 'none' : '');
		var i = 0;
		while (tmp[i] != 0 &&  i < tmp.length) {
			data2 += ', ' + (TouchupHistories[tmp[i]] ? TouchupHistories[i] : '?');
			i++;
		}
		output.push('Touch Up History = ' + data2 + ' (' + data + ')');
		break;
	case 0x00A0:
		output.push('Serial Number = ' + data);
		break;
	case 0x00A2:
		output.push('Image Data Size = ' + AlanSRaskin.ExifViewer.Base.formatNumber(data) + ' bytes');
		break;
	case 0x00A5:
		output.push('Image Count = ' + AlanSRaskin.ExifViewer.Base.formatNumber(data));
		break;
	case 0x00A6:
		output.push('Deleted Image Count = ' + data);
		break;
	case 0x00A7:
		output.push('Shutter Count / Total Number of Shutter Releases for Camera = ' + AlanSRaskin.ExifViewer.Base.formatNumber(data));
		break;
	case 0x00A8:
		output.push('Flash Information = ' + data);
		break;
	case 0x00A9:
		output.push('Image Optimization = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x00AA:
		output.push('Saturation = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x00AB:
		output.push('Digital Vari-Program = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x00AC:
		output.push('Image Stabilization = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x00AD:
		output.push('AF Response = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x00B1:
		var NoiseReductions = ['off (0)', 'on for ISO 1600/3200 / minimal (1)', 'weak / low (2)',
										'n/a (3)', 'normal (4)', 'n/a (5)', 'strong / high (6)'];
		output.push('High ISO Noise Reduction = ' + (NoiseReductions[data] ? NoiseReductions[data] : data));
		break;
	case 0x00B3:
		output.push('Toning Effect = ' + data);
		break; 	 
	case 0x00B6:
		output.push('Power Up Date/Time = ' + data);
		break; 	 
	case 0x00B7:
		output.push('AF Information 2 = ' + data);
		break; 	 
	case 0x00B8:
		output.push('File Information = ' + data);
		break; 	 
	case 0x00B9:
		output.push('AF Tune = ' + data);
		break; 	 
	case 0x00BD:
		output.push('Picture Control Data = ' + data);
		break; 	 
	case 0x0E00:
		output.push('Print IM Flags = ' + data);
		break;
	case 0x0E01:
		output.push('Nikon Capture Data = ' + data);
		break;
	case 0x0E09:
		output.push('Nikon Capture Version = ' + data);
		break;
	case 0x0E0E:
		output.push('Nikon Capture Offsets = ' + data);
		break;
	case 0x0E10:
		output.push('Nikon Scan IFD = ' + data);
		break;
	case 0x0E13:
		output.push('Nikon Capture Edit Versions = ' + data);
		break;
	case 0x0E1D:
		output.push('Nikon ICC Profile = ' + data);
		break;
	case 0x0E1E:
		output.push('Nikon Capture Output = ' + data);
		break;
	case 0x0E22:
		output.push('NEF Bit Depth = ' + data);
		break;
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getNikonInterpretedTagDataFormat23()

AlanSRaskin.ExifViewer.Makers.getNikonInterpretedTagDataFormat2 = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	case 0x0001:
		output.push('Version = ' + data);
		break;
	case 0x0002:
		var ISOSettings = {};
		ISOSettings['0,0'] = 'auto';
		ISOSettings['0,100'] = 'ISO 100';
		ISOSettings['0,200'] = 'ISO 200';
		ISOSettings['0,400'] = 'ISO 400';
		ISOSettings['0,800'] = 'ISO 800';
		ISOSettings['0,1600'] = 'ISO 1600';
		output.push('ISO Setting = ' + (ISOSettings[data] ? ISOSettings[data] : data));
		break;
	case 0x0003:
		output.push('Colour Mode = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0004:
		output.push('Quality = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0005:
		output.push('White Balance = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0006:
		output.push('Sharpness / Image Sharpening = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0007:
		output.push('Focus Mode = ' + data);
		break;
	case 0x0008:
		output.push('Flash Setting = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0009:
		output.push('Flash Type / Auto Flash Mode = ' + data);
		break;
	case 0x000A:
		output.push('Unknown = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5));
		break;
	case 0x000B:
		output.push('White Balance Fine Tuning / White Bias = ' + data);
		break;
	case 0x000C:
		output.push('Colour Balance 1 = ' + data);
		break;
	case 0x000D:
		output.push('Program Shift = ' + data);
		break;
	case 0x000E:
		output.push('Exposure Difference = ' + data);
		break;
	case 0x000F:
		output.push('ISO Selection = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0010:
		output.push('Data Dump = ' + data);
		break;
	case 0x0011:
		output.push('Nikon Preview / Skip = ' + data);
		break;
	case 0x0012:
		output.push('Flash Exposure Compensation = ' + data);
		break;
	case 0x0013:
		output.push('ISO Setting = ' + data);
		break;
	case 0x0016:
		output.push('Image Boundary = ' + data);
		break;
	case 0x0018:
		output.push('Flash Exposure Bracket Value = ' + data);
		break;
	case 0x001A:
		output.push('Image Processing = ' + data);
		break;
	case 0x001B:
		output.push('Crop High Speed = ' + data);
		break;
	case 0x001D:
		output.push('Serial Number = ' + data);
		break;
	case 0x001E:
		var ColourSpaces = new Array('n/a (0)', 'sRGB (1)', 'Adobe RGB (2)');
		output.push('Colour Space = ' + (ColourSpaces[data] ? ColourSpaces[data] : data));
		break;
	case 0x0080:
		output.push('Image Adjustment = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0081:
		output.push('Tone Compensation = ' + data);
		break;
	case 0x0082:
		output.push('Lens Adapter / Auxiliary Lens = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0083:
		var data2 = '';
		data2 += (data & 0x01 ? 'MF ' : ''); 
		data2 += (data & 0x02 ? 'D ' : ''); 
		data2 += (data & 0x04 ? 'G ' : ''); 
		data2 += (data & 0x08 ? 'VR ' : ''); 
		output.push('Lens Type = ' + data2);
		break;
	case 0x0084:
		output.push('Lens = ' + data);
		break;
	case 0x0085:
		var tmp = data.split('/');
		output.push('Manual Focus Distance = ' + (tmp[1] == '0' ? '(not applicable)' : data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5) + ' m'));
		break;
	case 0x0086:
		output.push('Digital Zoom = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5));
		break;
	case 0x0087:
		var FlashModes = new Array('did not fire (0)', 'fired, manual (1)');
		FlashModes[7] = 'fired, external (7)';
		FlashModes[8] = 'fired, commander mode (8)';
		FlashModes[9] = 'fired, TTL mode (9)';
		output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
		break;
	case 0x0088:
/*
		var AFFocusPositions = {};
		AFFocusPositions['0x00,0x00,0x00,0x00'] = 'center'; 
		AFFocusPositions['0x00,0x01,0x00,0x00'] = 'top';
		AFFocusPositions['0x00,0x02,0x00,0x00'] = 'bottom'; 
		AFFocusPositions['0x00,0x03,0x00,0x00'] = 'left';
		AFFocusPositions['0x00,0x04,0x00,0x00'] = 'right';
		output.push('AF Focus Position = ' + (AFFocusPositions[data] ? AFFocusPositions[data] : data));
*/
		var tmp = [];
		if (typeof data == 'number') {	// sometimes it's a number such as 0x1000000
			tmp[0] = data & 0xFF;
			tmp[1] = (data >> 8) & 0xFF;
			tmp[2] = (data >> 16) & 0xFFFF;
		} else {
			AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
			if (tmp.length == 4) {
				tmp[2] |= tmp[3] << 8;
				tmp[3] = 0;
			}
		}
		if (tmp.length < 3)  break;
		var AFAreaModes = new Array('single area (0)', 'dynamic area (1)',
									'dynamic area, closest subject (2)', 'group dynamic (3)',
									'single area (wide) (4)', 'dynamic area (wide) (5)');
		output.push('AF Area Mode = ' + (AFAreaModes[tmp[0]] ? AFAreaModes[tmp[0]] : data));

		var AFPoints = new Array('center (0)', 'top (1)', 'bottom (2)', 'left (3)', 'right (4)',
								 'upper-left (5)', 'upper-right (6)', 'lower-left (7)',
								 'lower-right (8)', 'far left (9)', 'far right (10)');
		output.push('AF Point = ' + (AFPoints[tmp[1]] ? AFPoints[tmp[1]] : data));
		
		var data2 = '';
		data2 += (tmp[2] & 0x001 ? 'center ' : ''); 
		data2 += (tmp[2] & 0x002 ? 'top ' : ''); 
		data2 += (tmp[2] & 0x004 ? 'bottom ' : ''); 
		data2 += (tmp[2] & 0x008 ? 'left ' : ''); 
		data2 += (tmp[2] & 0x010 ? 'right ' : ''); 
		data2 += (tmp[2] & 0x020 ? 'upper-left ' : ''); 
		data2 += (tmp[2] & 0x040 ? 'upper-right ' : ''); 
		data2 += (tmp[2] & 0x080 ? 'lower-left ' : ''); 
		data2 += (tmp[2] & 0x100 ? 'lower-right ' : ''); 
		data2 += (tmp[2] & 0x200 ? 'far-left ' : ''); 
		data2 += (tmp[2] & 0x400 ? 'far-right ' : ''); 
		output.push('AF Points Used = ' + data2); 

		break;
	case 0x0089:
		var data2 = '';
		data2 += (data & 0x01 ? 'continuous ' : ''); 
		data2 += (data & 0x02 ? 'delay ' : ''); 
		data2 += (data & 0x04 ? 'PC-control ' : ''); 
		data2 += (data & 0x08 ? '? ' : ''); 
		data2 += (data & 0x10 ? 'exposure-bracketing ' : ''); 
		data2 += (data & 0x20 ? 'unused-LE-NR-slowdown ' : ''); 
		data2 += (data & 0x40 ? 'white-balance-bracketing ' : ''); 
		data2 += (data & 0x80 ? 'IR-control ' : ''); 
		output.push('Shooting Mode = ' + data2);
		break;
	case 0x008A:
		var AutoBracketReleases = new Array('none (0)', 'auto release (1)', 'manual release (2)');
		output.push('Auto Bracket Release = ' + (AutoBracketReleases[data] ? AutoBracketReleases[data] : data));
		break;
	case 0x008B:
		output.push('Lens F-Stops = ' + data);
		break;
	case 0x008C:
		output.push('NEF Curve 1 = ' + data);
		break;
	case 0x008D:
		output.push('Colour Hue/Mode = ' + data);
		break;
	case 0x008F:
		output.push('Scene Mode = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0090:
		output.push('Light Source = ' + data);
		break;
	case 0x0092:
		output.push('Hue Adjustment = ' + data);
		break;
	case 0x0094:
		output.push('Saturation Adjustment = ' + data);
		break;
	case 0x0095:
		output.push('Noise Reduction = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0096:
		output.push('NEF Curve 2 = ' + data);
		break;
	case 0x0097:
		output.push('Colour Balance = ' + data);
		break;
	case 0x0098:
		output.push('Lens Data = ' + data);
		break;
	case 0x0099:
		output.push('Raw Image Center = ' + data);
		break;
	case 0x009A:
		output.push('Sensor Pixel Size = ' + data);
		break;
	case 0x00A0:
		output.push('Serial Number = ' + data);
		break;
	case 0x00A2:
		output.push('Image Data Size = ' + data);
		break;
	case 0x00A5:
		output.push('Image Count = ' + data);
		break;
	case 0x00A6:
		output.push('Deleted Image Count = ' + data);
		break;
	case 0x00A7:
		output.push('Shutter Count = ' + data);
		break;
	case 0x00A9:
		output.push('Image Optimization = ' + data);
		break;
	case 0x00AA:
		output.push('Saturation = ' + data);
		break;
	case 0x00AB:
		output.push('Vari Program = ' + data);
		break;
	case 0x00AC:
		output.push('Image Stabilization = ' + data);
		break;
	case 0x00AD:
		output.push('AF Response = ' + data);
		break;
	case 0x00B1:
		var NoiseReductions = new Array('off (0)', 'on for ISO 1600/3200 (1)', 'weak (2)',
										'n/a (3)', 'normal (4)', 'n/a (5)', 'strong (6)');
		output.push('High ISO Noise Reduction = ' + (NoiseReductions[data] ? NoiseReductions[data] : data));
		break;
	case 0x0E00:
		output.push('Print IM Flags = ' + data);
		break;
	case 0x0E01:
		output.push('Nikon Capture Data = ' + data);
		break;
	case 0x0E09:
		output.push('Nikon Capture Version = ' + data);
		break;
	case 0x0E0E:
		output.push('Nikon Capture Offsets = ' + data);
		break;
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getNikonInterpretedTagDataFormat2()

AlanSRaskin.ExifViewer.Makers.getNikonInterpretedTagDataFormat3 = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	case 0x0001:
		output.push('Version = ' + data);
		break;
	case 0x0002:
		var ISOSettings = {};
		ISOSettings['0,0'] = 'auto';
		ISOSettings['0,100'] = 'ISO 100';
		ISOSettings['0,200'] = 'ISO 200';
		ISOSettings['0,400'] = 'ISO 400';
		ISOSettings['0,800'] = 'ISO 800';
		ISOSettings['0,1600'] = 'ISO 1600';
		output.push('ISO Setting = ' + (ISOSettings[data] ? ISOSettings[data] : data));
		break;
	case 0x0003:
		output.push('Colour Mode = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0004:
		output.push('Quality = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0005:
		output.push('White Balance = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0006:
		output.push('Sharpening = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0007:
		output.push('Focus Mode = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0008:
		output.push('Flash Setting = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0009:
		output.push('Auto Flash Mode = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x000B:
		output.push('White Balance Bias Value = ' + data);	// Units Approx: 100 Mired per increment
		break;
	case 0x000C:
		output.push('White Balance Red, Blue Coefficients? = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRationals(data, 5));
		break;
	case 0x000E:
		output.push('Exposure Difference = ' + data);
		break;
	case 0x000F:
		output.push('ISO Selection = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0011:
		output.push('Thumbnail IFD Offset = ' + data);
		break;
	case 0x0012:
		var FlashCompensations = {0x06:+1.0 , 0x04:+0.7 , 0x03:+0.5 , 0x02:+0.3 , 0x00:+0.0 , 0xfe:-0.3 , 0xfd:-0.5 ,
								  0xfc:-0.7 , 0xfa:-1.0 , 0xf8:-1.3 , 0xf7:-1.5 , 0xf6:-1.7 , 0xf4:-2.0 , 0xf2:-2.3 ,
								  0xf1:-2.5 , 0xf0:-2.7 , 0xee:-3.0}
		output.push('Flash Compensation = ' + (FlashCompensations[data] ? FlashCompensations[data] + ' EV' : data));
		break;
	case 0x0013:
		var ISOSpeedRequests = {};
		ISOSpeedRequests['0,0'] = 'auto';
		ISOSpeedRequests['0,100'] = 'ISO 100';
		ISOSpeedRequests['0,200'] = 'ISO 200';
		ISOSpeedRequests['0,400'] = 'ISO 400';
		ISOSpeedRequests['0,800'] = 'ISO 800';
		ISOSpeedRequests['0,1600'] = 'ISO 1600';
		output.push('ISO Speed Requested = ' + (ISOSpeedRequests[data] ? ISOSpeedRequests[data] : data));
		break;
	case 0x0016:
		output.push('Photo Corner Coordinates = ' + data);
		break;
	case 0x0018:
		var FlashBracketCompensations = {0x06:+1.0 , 0x04:+0.7 , 0x03:+0.5 , 0x02:+0.3 , 0x00:+0.0 , 0xfe:-0.3 , 0xfd:-0.5 ,
								  0xfc:-0.7 , 0xfa:-1.0 , 0xf8:-1.3 , 0xf7:-1.5 , 0xf6:-1.7 , 0xf4:-2.0 , 0xf2:-2.3 ,
								  0xf1:-2.5 , 0xf0:-2.7 , 0xee:-3.0}
		output.push('Flash Bracket Compensation Applied = ' + (FlashBracketCompensations[data] ? FlashBracketCompensations[data] + ' EV' : data));
		break;
	case 0x0019:
		output.push('AE Bracket Compensation Applied = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5) + ' EV');
		break;
	case 0x0080:
		output.push('Image Adjustment = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0081:
		output.push('Tone Compensation (Contrast) = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0082:
		output.push('Auxiliary Lens (Adapter) = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0083:
		var data2 = '';
		data2 += (data & 0x01 ? 'MF ' : 'AF '); 
		data2 += (data & 0x02 ? 'D-series ' : ''); 
		data2 += (data & 0x04 ? 'G-series ' : ''); 
		data2 += (data & 0x08 ? 'VR ' : ''); 
		output.push('Lens Type = ' + data2);
		break;
	case 0x0084:
		var tmp = AlanSRaskin.ExifViewer.Base.formatRationals(data, 5).split(', ');
		output.push('Lens Minimum and Maximum Focal Lengths and Maximum Aperture F-Stop at these Focal Lengths = ' + data + ' = ' + tmp[0] + ' mm, ' + tmp[1] + ' mm, f/' + tmp[2] + ', f/' + tmp[3]);
		break;
	case 0x0085:
		var tmp = data.split('/');
		output.push('Manual Focus Distance = ' + (tmp[1] == '0' ? '(not applicable)' : data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5) + ' m'));
		break;
	case 0x0086:
		output.push('Digital Zoom Factor = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRational(data, 5));
		break;
	case 0x0087:
		var FlashModes = ['did not fire (0)', 'fired, manual (1)'];
		FlashModes[7] = 'fired, external (7)';
		FlashModes[8] = 'fired, commander mode (8)';
		FlashModes[9] = 'fired, on camera (9)';
		output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
		break;
	case 0x0088:
/*
		var AFFocusPositions = {};
		AFFocusPositions['0x00,0x00,0x00,0x00'] = 'center'; 
		AFFocusPositions['0x00,0x01,0x00,0x00'] = 'top';
		AFFocusPositions['0x00,0x02,0x00,0x00'] = 'bottom'; 
		AFFocusPositions['0x00,0x03,0x00,0x00'] = 'left';
		AFFocusPositions['0x00,0x04,0x00,0x00'] = 'right';
		output.push('AF Focus Position = ' + (AFFocusPositions[data] ? AFFocusPositions[data] : data));
*/
		var tmp = [];
		if (typeof data == 'number') {	// sometimes it's a number such as 0x1000000
			tmp[0] = data & 0xFF;
			tmp[1] = (data >> 8) & 0xFF;
			tmp[2] = (data >> 16) & 0xFFFF;
		} else {
			AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
			if (tmp.length == 4) {
				tmp[2] |= tmp[3] << 8;
				tmp[3] = 0;
			}
		}
		if (tmp.length < 3)  break;
		var AFAreaModes = ['single area (0)', 'dynamic area (1)',
						   'dynamic area, closest subject (2)', 'group dynamic (3)',
						   'single area (wide) (4)', 'dynamic area (wide) (5)'];
		output.push('AF Area Mode = ' + (AFAreaModes[tmp[0]] ? AFAreaModes[tmp[0]] : data));

		var AFPoints = ['center (0)', 'top (1)', 'bottom (2)', 'left (3)', 'right (4)',
						'upper-left (5)', 'upper-right (6)', 'lower-left (7)',
						'lower-right (8)', 'far left (9)', 'far right (10)'];
		output.push('AF Point (Area Selected) = ' + (AFPoints[tmp[1]] ? AFPoints[tmp[1]] : data));
		
		var data2 = '';
		data2 += (tmp[2] & 0x001 ? 'center ' : ''); 
		data2 += (tmp[2] & 0x002 ? 'top ' : ''); 
		data2 += (tmp[2] & 0x004 ? 'bottom ' : ''); 
		data2 += (tmp[2] & 0x008 ? 'left ' : ''); 
		data2 += (tmp[2] & 0x010 ? 'right ' : ''); 
		data2 += (tmp[2] & 0x020 ? 'upper-left ' : ''); 
		data2 += (tmp[2] & 0x040 ? 'upper-right ' : ''); 
		data2 += (tmp[2] & 0x080 ? 'lower-left ' : ''); 
		data2 += (tmp[2] & 0x100 ? 'lower-right ' : ''); 
		data2 += (tmp[2] & 0x200 ? 'far-left ' : ''); 
		data2 += (tmp[2] & 0x400 ? 'far-right ' : ''); 
		output.push('AF Points Used = ' + data2); 
		break;
	case 0x0089:
/*
		var Bracketings = ['none-0 (0)', 'none-a (1)'];
		Bracketings[17] = 'exposure (17)';
		Bracketings[81] = 'white balance (81)';
		output.push('Bracketing = ' + (Bracketings[data] ? Bracketings[data] : data));
*/
		var Bits01 = ['single frame (0)', 'continuous (1)', 'timer? (2)', 'remote? (3)'];
		var data2 = '';
		data2 += Bits01[data & 0x03] + ' ';
		data2 += (data & 0x10 ? 'bracketing on (1) ' : 'bracketing off (0) ');
		data2 += (data & 0x40 ? 'white balance bracketing on (1) ' : 'white balance bracketing off (0) ');
		output.push('Bracketing and Shooting Mode = ' + data2);
		break;
	case 0x008D:
		var ColourModes = {'1a':'Portrait sRGB (1a)' , '2':'Adobe RGB (2)' , '3a':'Landscape sRGB (3a)'};
		output.push('Colour Mode = ' + (ColourModes[data] ? ColourModes[data] : AlanSRaskin.ExifViewer.Base.cleanExifStringData(data)));
		break;
	case 0x008E:
		output.push('Scene Mode = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRationals(data, 5));
		break;
	case 0x0090:
		output.push('Lighting Type = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x0092:
		output.push('Hue Adjustment = ' + data + ' degrees');
		break;
	case 0x0094:
		var SaturationAdjustments = {};
		SaturationAdjustments[-3] = 'black and white (-3)';
		SaturationAdjustments[-2] = '-2';
		SaturationAdjustments[-1] = '-1';
		SaturationAdjustments[0] = 'normal (0)';
		SaturationAdjustments[1] = '+1';
		SaturationAdjustments[2] = '+2';
		output.push('Saturation Adjustment = ' + (SaturationAdjustments[data] ? SaturationAdjustments[data] : data));
		break;
	case 0x0095:
		output.push('Noise Reduction = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x009A:
		output.push('Unknown (0x9a) = ' + data + ' = ' + AlanSRaskin.ExifViewer.Base.formatRationals(data, 5));
		break;
	case 0x00A7:
		output.push('Total Number of Shutter Releases for Camera = ' + data);
		break;
	case 0x00A9:
		output.push('Image Optimisation = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x00AA:
		output.push('Saturation = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	case 0x00AB:
		output.push('Digital Vari-Program = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
		break;
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getNikonInterpretedTagData3()
