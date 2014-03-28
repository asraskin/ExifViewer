if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

// may also apply for Leica

AlanSRaskin.ExifViewer.Makers.dumpPanasonicTagData = function (ifd, output, is_motorola) {
	var tagnum;
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
			output.push(AlanSRaskin.ExifViewer.Makers.getPanasonicInterpretedTagData1(tagnum, data));
		}
	}
}	// dumpPanasonicTagData()

// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Panasonic.html
AlanSRaskin.ExifViewer.Makers.getPanasonicInterpretedTagData1 = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	case 0x0001:
		var ImageQualities = new Array('n/a (0)', 'n/a (1)', 'high (2)', 'normal (3)',
									   'n/a (4)', 'n/a (5)', 'very high (6)', 'raw (7)', 'n/a (8)', 'motion picture (9)');
		output.push('Image Quality = ' + (ImageQualities[data] ? ImageQualities[data] : data));
		break;
	case 0x0002:
		output.push('Production Firmware Version = ' + data);
		break;
	case 0x0003:
		var WhiteBalances = new Array('n/a (0)', 'auto (1)', 'daylight (2)', 'cloudy (3)', 'incandescent/halogen (4)',
									  'manual (5)', 'n/a (6)', 'n/a (7)', 'flash (8)', 'n/a (9)',
									  'black &amp; white (10)', 'manual (11)', 'shade (12)', 'n/a (13)');
		output.push('White Balance = ' + (WhiteBalances[data] ? WhiteBalances[data] : data));
		break;
	case 0x0007:
		var FocusModes = new Array('n/a (0)', 'auto (1)', 'manual (2)', 'n/a (3)', 'auto, focus button (4)',
								   'auto, continuous (5)', 'n/a (6)', 'n/a (7)');
		output.push('Focus Mode = ' + (FocusModes[data] ? FocusModes[data] : data));
		break;
	case 0x000F:
		var SpotModes = new Object();
		SpotModes['0x00,0x01'] = 'on (DMC-FZ10); 9-area (other)';
		SpotModes['0x00,0x10'] = 'off (DMC-FZ10); 3-area (high speed) (other)';
		SpotModes['0x01,0x00'] = 'spot focusing';
		SpotModes['0x01,0x01'] = '5-area';
		SpotModes['0x10,0x00'] = '1-area';
		SpotModes['0x10,0x10'] = '1-area (high speed)';
		SpotModes['0x20,0x00'] = 'auto or face detect';
		SpotModes['0x20,0x01'] = '3-area (left)?';
		SpotModes['0x20,0x02'] = '3-area (center)?';
		SpotModes['0x20,0x03'] = '3-area (right)?';
		SpotModes['0x40,0x00'] = 'face detect';
		output.push('Spot/AF Mode = ' + (SpotModes[data] ? SpotModes[data] : data));
		break;
	case 0x001A:
		var ImageStabilizers = new Array('n/a (0)', 'n/a (1)', 'on, mode 1 (2)', 'off (3)',
										 'on, mode 2 (4)');
		ImageStabilizers[257] = 'tele-macro (257)';
		ImageStabilizers[513] = 'macro zoom (513)';
		output.push('Image Stabilizer = ' + (ImageStabilizers[data] ? ImageStabilizers[data] : data));
		break;
	case 0x001C:
		var MacroModes = new Array('n/a (0)', 'on (1)', 'off (2)');
		MacroModes[257] = 'tele-macro (257)';
		MacroModes[513] = 'macro zoom (513)';
		output.push('Macro Mode = ' + (MacroModes[data] ? MacroModes[data] : data));
		break;
	case 0x001F:
		var ShootingModes = new Array('n/a (0)', 'normal (1)', 'portrait (2)', 'scenery (3)',
									  'sports (4)', 'night portrait (5)', 'program (6)',
									  'aperture priority (7)', 'shutter priority (8)', 'macro (9)',
									  'spot (10)', 'manual (11)', 'movie preview (12)', 'panning (13)', 'simple (14)',
									  'colour effects (15)', 'self-portrait (16)', 'economy (17)', 'fireworks (18)', 'party (19)',
									  'snow (20)', 'night scenery (21)', 'food (22)', 'baby (23)', 'soft skin (24)', 'candlelight (25)',
									  'starry night (26)', 'high sensitivity (27)', 'panorama assist (28)', 'underwater (29)', 
									  'beach (30)', 'aerial photo (31)', 'sunset (32)', 'pet (33)', 'intelligent ISO (34)', 
									  'clipboard (35)', 'high speed continuous shooting (36)', 'intelligent auto (37)', 'n/a (38)', 
									  'multi-aspect (39)', 'n/a (40)', 'transform (41)', 'flash burst (42)', 'pin hole (43)', 
									  'film grain (44)', 'my colour (45)', 'photo frame (46)');
		ShootingModes[51] = 'HDR (51)';
		output.push('Shooting Mode = ' + (ShootingModes[data] ? ShootingModes[data] : data));
		break;
	case 0x0020:
		var Audios = new Array('n/a (0)', 'yes (1)', 'no (2)');
		output.push('Audio = ' + (Audios[data] ? Audios[data] : data));
		break;
	case 0x0021:
		output.push('Data Dump = ' + data);
		break;
	case 0x0023:
		output.push('White Balance Bias = ' + data);
		break;
	case 0x0024:
		output.push('Flash Bias = ' + data);
		break;
	case 0x0025:
		output.push('Internal Serial Number = ' + data);
		break;
	case 0x0026:
		output.push('Panasonic Exif Version = ' + data);
		break;
	case 0x0028:
		var ColourEffects = new Array('n/a (0)', 'off (1)', 'warm (2)', 'cool (3)',
									 'black &amp; white (4)', 'sepia (5)', 'happy (6)');
		output.push('Colour Effect = ' + (ColourEffects[data] ? ColourEffects[data] : data));
		break;
	case 0x0029:
		output.push('Time Since Power On = ' + (data/100) + ' seconds');
		break;
	case 0x002A:
		var BurstModes = new Array('off (0)', 'on (low/high quality?) (1)', 'infinite (2)', 'n/a (3)', 'unlimited (4)');
		output.push('Burst Mode = ' + (BurstModes[data] ? BurstModes[data] : data));
		break;
	case 0x002B:
		output.push('Sequence Number = ' + data);
		break;
	case 0x002C:
/*
		var Contrasts = new Array('normal [Panasonic] (0)', 'low [Panasonic] (1)', 'high [Panasonic] (2)');
		Contrasts[0x100] = 'low [Leica] (0x100)';
		Contrasts[0x110] = 'normal [Leica] (0x110)';
		Contrasts[0x120] = 'high [Leica] (0x120)';
		output.push('Contrast = ' + (Contrasts[data] ? Contrasts[data] : data));
*/
		output.push('Contrast = ' + data + ' (too model-dependent to interpret)');
		break;
	case 0x002D:
		var NoiseReductions = new Array('standard (0)', 'low(-1) (1)', 'high(+1) (2)', 'lowest(-2) (3)', 'highest(+2) (4)');
		output.push('Noise Reduction = ' + (NoiseReductions[data] ? NoiseReductions[data] : data));
		break;
	case 0x002E:
		var SelfTimers = new Array('n/a (0)', 'off (1)', '10s (2)', '2s (3)');
		output.push('Self Timer = ' + (SelfTimers[data] ? SelfTimers[data] : data));
		break;
	case 0x0030:
		var Rotations = new Array('n/a (0)', 'horizontal (normal) (1)', 'n/a (2)', 'rotate 180 (3)',
								  'n/a (4)', 'n/a (5)', 'rotate 90 CW (6)', 'n/a (7)',
								  'rotate 270 CW (8)');
		output.push('Rotation = ' + (Rotations[data] ? Rotations[data] : data));
		break;
	case 0x0031:
		var AFAssistLamps = new Array('n/a (0)', 'fired (1)', 'enabled but not used (2)', 'disabled but required (3)', 
									  'disabled and not required (4)');
		output.push('AF Assist Lamp = ' + (AFAssistLamps[data] ? AFAssistLamps[data] : data));
		break;
	case 0x0032:
		var ColourModes = new Array('normal (0)', 'natural (1)', 'vivid (2)');
		output.push('Colour Mode = ' + (ColourModes[data] ? ColourModes[data] : data));
		break;
	case 0x0033:
		output.push('Baby/Pet Age = ' + data);
		break;
	case 0x0034:
		var OpticalZoomModes = new Array('n/a (0)', 'standard (1)', 'extended (2)');
		output.push('Optical Zoom Mode = ' + (OpticalZoomModes[data] ? OpticalZoomModes[data] : data));
		break;
	case 0x0035:
		var ConversionLens = new Array('n/a (0)', 'off (1)', 'wide (2)', 'telephoto (3)', 'macro (4)');
		output.push('Conversion Lens = ' + (ConversionLens[data] ? ConversionLens[data] : data));
		break;
	case 0x0036:
		output.push('Travel Day = ' + data);
		break;
	case 0x0039:
		var Contrasts = new Array('normal (0)');
		output.push('Contrast = ' + (Contrasts[data] ? Contrasts[data] : data));
		break;
	case 0x003A:
		var WorldTimeLocations= new Array('n/a (0)', 'home (1)', 'destination (2)');
		output.push('World Time Location = ' + (WorldTimeLocations[data] ? WorldTimeLocations[data] : data));
		break;
	case 0x003B:
		var TextStamps3 = new Array('n/a (0)', 'off (1)', 'on (2)');
		output.push('Text Stamp = ' + (TextStamps3[data] ? TextStamps3[data] : data));
		break;
	case 0x003C:
		var ProgramISOs = [];
		ProgramISOs[65534] = 'intelligent ISO (65534)';
		ProgramISOs[65535] = 'n/a (65535)';
		output.push('Program ISO = ' + (ProgramISOs[data] ? ProgramISOs[data] : data));
		break;
	case 0x003D:
		var AdvancedSceneModes = new Array('n/a (0)', 'normal (1)', 'outdoor/illuminations/flower/HDR art (2)', 
											'indoor/architecture/objects/HDR B&amp;W (3)', 'creative (4)', 'auto (5)',
											'n/a (6)', 'expressive (7)', 'retro (8)', 'pure (9)', 'elegant (10)', 'n/a (11)',
											'monochrome (12)', 'dynamic art (13)', 'silhouette (14)');
		output.push('Advanced Scene Mode = ' + (AdvancedSceneModes[data] ? AdvancedSceneModes[data] : data));
		break;
	case 0x003E:
		var TextStamps4 = new Array('n/a (0)', 'off (1)', 'on (2)');
		output.push('Text Stamp = ' + (TextStamps4[data] ? TextStamps4[data] : data));
		break;
	case 0x003F:
		output.push('Faces Detected = ' + data);
		break; 	 
	case 0x0040:
		var Saturations = new Array('normal (0)');
		output.push('Saturation = ' + (Saturations[data] ? Saturations[data] : data));
		break;
	case 0x0041:
		var Sharpnesses = new Array('normal (0)');
		output.push('Sharpness = ' + (Sharpnesses[data] ? Sharpnesses[data] : data));
		break;
	case 0x0042:
		var FilmModes = new Array('n/a (0)', 'standard (colour) (1)', 'dynamic (colour) (2)', 'nature (colour) (3)', 'smooth (colour) (4)',
								  'standard (B&amp;W) (5)', 'dynamic (B&amp;W) (6)', 'smooth (B&amp;W) (7)', 'n/a (8)', 'n/a (9)', 
								  'nostalgic (10)', 'vibrant (11)');
		output.push('Film Mode = ' + (FilmModes[data] ? FilmModes[data] : data));
		break;
	case 0x0046:
		output.push('WB Adjust AB = ' + data + ' (positive is a shift toward blue)');
		break;
	case 0x0047:
		output.push('WB Adjust GM = ' + data + ' (positive is a shift toward green)');
		break;
	case 0x004B:
		output.push('Panasonic Image Width = ' + data + ' pixels');
		break;  	 
	case 0x004C:
		output.push('Panasonic Image Height = ' + data + ' pixels');
		break;
	case 0x004D:
		output.push('AF Point Position = ' + data);//	rational64u[2] 	(X Y coordinates of primary AF area center, in the range 0.0 to 1.0)
		break;
	case 0x004E:
		output.push('Face Detection Information = ' + data);
		break;
	case 0x0051:
		output.push('Lens Type = ' + data);
		break; 	 
	case 0x0052:
		output.push('Lens Serial Number = ' + data);
		break; 	 
	case 0x0053:
		output.push('Accessory Type = ' + data);
		break;
	case 0x0059:
		var Transforms = new Object();
		Transforms['0xFF,0x01'] = 'slim low';	// -1
		Transforms['0xFD,0x02'] = 'slim high';	// -3
		Transforms['0x00,0x00'] = 'off';
		Transforms['0x01,0x01'] = 'stretch low';
		Transforms['0x03,0x02'] = 'stretch high';
		output.push('Transform = ' + (Transforms[data] ? Transforms[data] : data));
		break;
	case 0x005D:
		var	IntelligentExposures = new Array('off (0)', 'low (1)', 'standard (2)', 'high (3)');
		output.push('Intelligent Exposure = ' + (IntelligentExposures[data] ? IntelligentExposures[data] : data));
		break;
	case 0x0061:
		output.push('Face Recognition Information = ' + data);
		break;
	case 0x0062:
		var FlashWarnings = new Array('no (0)', 'yes (flash required but disabled) (1)');
		output.push('Flash Warning = ' + (FlashWarnings[data] ? FlashWarnings[data] : data));
		break;
	case 0x0063:
		output.push('Recognized Face Flags? = ' + data);
		break; 	 
	case 0x0065:
		output.push('Title = ' + data);
		break; 	 
	case 0x0066:
		output.push('Baby/Pet Name = ' + data);
		break;
	case 0x0067:
		output.push('Location = ' + data);
		break; 	 
	case 0x0069:
		output.push('Country = ' + data);
		break; 	 
	case 0x006B:
		output.push('State = ' + data);
		break; 	 
	case 0x006D:
		output.push('City = ' + data);
		break; 	 
	case 0x006F:
		output.push('Landmark = ' + data);
		break; 	 
	case 0x0070:
		var IntelligentResolutions = new Array('off (0)', 'low (1)', 'standard (2)', 'high (3)', 'extended (4)');
		output.push('Intelligent Resolution = ' + (IntelligentResolutions[data] ? IntelligentResolutions[data] : data));
		break;
	case 0x0079:
	 	var IntelligentDRanges = new Array('off (0)', 'low (1)', 'standard (2)', 'high (3)');
		output.push('Intelligent D-Range = ' + (IntelligentDRanges[data] ? IntelligentDRanges[data] : data));
		break;
	case 0x0E00:
		output.push('Print IM = ' + data);
		break;
	case 0x8000:
		output.push('Maker Note Version = ' + data);
		break;
	case 0x8001:
		var SceneModes = new Array('off (0)', 'normal (1)', 'portrait (2)', 'scenery (3)',
									  'sports (4)', 'night portrait (5)', 'program (6)',
									  'aperture priority (7)', 'shutter priority (8)', 'macro (9)',
									  'spot (10)', 'manual (11)', 'movie preview (12)', 'panning (13)', 'simple (14)',
									  'colour effects (15)', 'self-portrait (16)', 'economy (17)', 'fireworks (18)', 'party (19)',
									  'snow (20)', 'night scenery (21)', 'food (22)', 'baby (23)', 'soft skin (24)', 'candlelight (25)',
									  'starry night (26)', 'high sensitivity (27)', 'panorama assist (28)', 'underwater (29)', 
									  'beach (30)', 'aerial photo (31)', 'sunset (32)', 'pet (33)', 'intelligent ISO (34)', 
									  'clipboard (35)', 'high speed continuous shooting (36)', 'intelligent auto (37)', 'n/a (38)', 
									  'multi-aspect (39)', 'n/a (40)', 'transform (41)', 'flash burst (42)', 'pin hole (43)', 
									  'film grain (44)', 'my colour (45)', 'photo frame (46)');
		SceneModes[51] = 'HDR (51)'; 	
		output.push('Scene Mode = ' + (SceneModes[data] ? SceneModes[data] : data));
		break;
	case 0x8004:
		output.push('WB Red Level = ' + data);
		break; 	 
	case 0x8005:
		output.push('WB Green Level = ' + data);
		break; 	 
	case 0x8006:
		output.push('WB Blue Level = ' + data);
		break;
	case 0x8007:
		var FlashFireds = new Array('n/a (0)', 'no (1)', 'yes (2)');
		output.push('Flash Fired = ' + (FlashFireds[data] ? FlashFireds[data] : data));
		break;
	case 0x8008:
		var TextStamps = new Array('n/a (0)', 'off (1)', 'on (2)');
		output.push('Text Stamp = ' + (TextStamps[data] ? TextStamps[data] : data));
		break;
	case 0x8009:
		var TextStamps2 = new Array('n/a (0)', 'off (1)', 'on (2)');
		output.push('Text Stamp = ' + (TextStamps2[data] ? TextStamps2[data] : data));
		break;
	case 0x8010:
		output.push('Baby/Pet Age = ' + data);
		break;
	case 0x8012:
		var Transforms = new Object();
		Transforms['0xFF,0x01'] = 'slim low';	// -1
		Transforms['0xFD,0x02'] = 'slim high';	// -3
		Transforms['0x00,0x00'] = 'off';
		Transforms['0x01,0x01'] = 'stretch low';
		Transforms['0x03,0x02'] = 'stretch high';
		output.push('Transform = ' + (Transforms[data] ? Transforms[data] : data));
		break;
	default:
		output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
		break;
	} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getPanasonicInterpretedTagData1()
