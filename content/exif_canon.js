if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

AlanSRaskin.ExifViewer.Makers.dumpCanonTagData = function (ifd, output, is_motorola) {
	var tagnum;
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
			output.push(AlanSRaskin.ExifViewer.Makers.getCanonInterpretedTagData(tagnum, data));
		}
	}
}	// dumpCanonTagData()

// http://park2.wakwak.com/~tsuruzoh/Computer/Digicams/exif-e.html
// http://www.ozhiker.com/electronics/pjmt/jpeg_info/canon_mn.html
// http://www.burren.cx/david/canon.html
// http://translate.google.com/translate?hl=en&sl=ja&u=http://homepage3.nifty.com/kamisaka/makernote/makernote_canon.htm&sa=X&oi=translate&resnum=5&ct=result&prev=/search%3Fq%3Dcanon%2Bmakernote%26hl%3Den%26hs%3DzDF%26lr%3D%26client%3Dfirefox-a%26rls%3Dorg.mozilla:en-US:official
// http://www.sno.phy.queensu.ca/~phil/exiftool/TagNames/Canon.html

AlanSRaskin.ExifViewer.Makers.getCanonInterpretedTagData = function (tagnum, data) {
	var output = [];
			switch (tagnum) {
			case 0x0000:
				output.push('Unknown (0x0000) = ' + data);
				break;
			case 0x0001:
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>Camera Settings<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>');
				var tmp = [];
				AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
//				if (tmp[0] != 2 * tmp.length) {
//					output.push('Tag length = ' + tmp[0] + ' bytes');
//					output.push('Buffer length = ' + tmp.length + ' shorts'); 
//				}
				var length = tmp.length;
				if (length == 1)  break;
				var MacroModes = new Array('n/a', 'macro (1)', 'normal (2)');
				output.push('Macro Mode = ' + (MacroModes[tmp[1]] ? MacroModes[tmp[1]] : tmp[1]));
				if (length == 2)  break;
				output.push('Self-Timer = ' + (tmp[2] != 0 ? tmp[2] + ' tenths of a second' : 'n/a'));
				if (length == 3)  break;
				var Qualities = new Array('n/a (0)', 'economy (1)', 'normal (2)', 'fine (3)', 'RAW (4)', 
										'superfine (5)');
				output.push('Quality = ' + (Qualities[tmp[3]] ? Qualities[tmp[3]] : tmp[3]));
				if (length == 4)  break;
				var FlashModes = new Array('off / flash not fired (0)', 'auto (1)', 'on (2)',
											'red-eye reduction (3)', 'slow synchro (4)' ,
											'auto + red-eye reduction (5)', 'on + red-eye reduction (6)');
				FlashModes[16] = 'external flash (16)';
				output.push('Flash Mode = ' + (FlashModes[tmp[4]] ? FlashModes[tmp[4]] : tmp[4]));
				if (length == 5)  break;
				var CDModes = new Array('single frame or timer mode (0)', 'continuous (1)', 'movie (2)',
								'continuous, speed priority (3)', 'continuous, low (4)',
								'continuous, high (5)');
				output.push('Continuous Drive Mode = ' + (CDModes[tmp[5]] ? CDModes[tmp[5]] : tmp[5]));
				if (length == 6)  break;
				output.push('Unknown (0x0001.6) = ' + tmp[6]);
				if (length == 7)  break;
				var FocusModes = new Array('one-shot auto-focus (0)', 'AI servo auto focus (1)', 'AI focus auto focus (2)',
											'manual focus (3)', 'single (4)', 'continuous (5)', 
											'manual focus (6)');
				FocusModes[16] = 'pan focus (16)';
				output.push('Focus Mode = ' + (FocusModes[tmp[7]] ? FocusModes[tmp[7]] : tmp[7]));
				if (length == 8)  break;
				output.push('Unknown (0x0001.8) = ' + tmp[8]);
				if (length == 9)  break;
				var RecordModes = ['n/a (0)', 'JPEG (1)', 'CRW+THM (2)', 'AVI+THM (3)', 'TIF (4)', 
									'TIF+JPEG (5)', 'CR2 (6)', 'CR2+JPEG (7)'];
				output.push('Record Mode = ' + (RecordModes[tmp[9]] ? RecordModes[tmp[9]] : tmp[9]));
				if (length == 10)  break;
				var ImageSizes = new Array('large (0)', 'medium (1)', 'small (2)', 'n/a (3)', 'n/a (4)',
									'medium 1 (5)', 'medium 2 (6)', 'medium 3 (7)',
									'postcard (8)', 'widescreen (9)');
				output.push('Image Size = ' + (ImageSizes[tmp[10]] ? ImageSizes[tmp[10]] : tmp[10]));
				if (length == 11)  break;
				var ShootingModes = new Array('full auto (0)', 'manual (1)', 'landscape (2)',
										'fast shutter (3)', 'slow shutter (4)', 'night (5)',
										'black &amp; white / gray scale (6)', 'sepia (7)', 'portrait (8)',
										'sports (9)', 'macro / close-up (10)', 'pan focus / black &amp; white (11)',
										'pan focus (12)', 'vivid (13)', 'neutral (14)', 'flash off (15)',
										'long shutter (16)', 'super macro (17)', 'foliage (18)',
										'indoor (19)', 'fireworks (20)', 'beach (21)', 'underwater (22)',
										'snow (23)', 'kids &amp; pets (24)', 'night snapshot (25)',
										'digital macro (26)', 'My Colors (27)', 'still image (28)',
										'n/a (29)', 'color accent (30)', 'color swap (31)', 'aquarium (32)',
										'ISO 3200 (33)');
				output.push('&#8220;Easy Shooting&#8221; Mode = ' + (ShootingModes[tmp[11]] ? ShootingModes[tmp[11]] : tmp[11]));
				if (length == 12)  break;
				var DigitalZooms = new Array('no digital zoom (0)', '2x (1)', '4x (2)', 'other (3)');
				output.push('Digital Zoom = ' + (DigitalZooms[tmp[12]] ? DigitalZooms[tmp[12]] : tmp[12]));
				if (length == 13)  break;
				var Contrasts = new Array('normal (0)', 'high (1)');
				Contrasts[0xFFFF] = 'low (-1)';
				output.push('Contrast = ' + (Contrasts[tmp[13]] ? Contrasts[tmp[13]] : tmp[13]));
				if (length == 14)  break;
				var Saturations = new Array('normal (0)', 'high (1)');
				Saturations[0xFFFF] = 'low (-1)';
				output.push('Saturation = ' + (Saturations[tmp[14]] ? Saturations[tmp[14]] : tmp[14]));
				if (length == 15)  break;
				var Sharpnesses = new Array('normal (0)', 'high (1)');
				Sharpnesses[0xFFFF] = 'low (-1)';
				output.push('Sharpness = ' + (Sharpnesses[tmp[15]] ? Sharpnesses[tmp[15]] : tmp[15]));
				if (length == 16)  break;
				var ISOs = new Array('use Exif ISOSpeedRatings (0)');
				ISOs[15] = 'auto (15)';
				ISOs[16] = '50 (16)';
				ISOs[17] = '100 (17)';
				ISOs[18] = '200 (18)';
				ISOs[19] = '400 (19)';
				output.push('ISO Speed = ' + (ISOs[tmp[16]] ? ISOs[tmp[16]] : tmp[16]));
				if (length == 17)  break;
				var MeteringModes = new Array('default (0)', 'spot (1)', 'average (2)', 'evaluative (3)',
												'partial (4)', 'center-weighted averaging (5)');
				output.push('Metering Mode = ' + (MeteringModes[tmp[17]] ? MeteringModes[tmp[17]] : tmp[17]));
				if (length == 18)  break;
				var FocusTypes = new Array('manual (0)', 'auto (1)', 'not known (2)', 'close-up (macro) (3)',
									'very close (4)', 'close (5)', 'middle range (6)', 'far range (7)',
									'locked (pan mode) (8)', 'super macro (9)', 'infinity (10)');
				output.push('Focus Type = ' + (FocusTypes[tmp[18]] ? FocusTypes[tmp[18]] : tmp[18]));
				if (length == 19)  break;
				var APPoints = new Array();
				APPoints[0x2005] = 'manual AF point selection'; 
				APPoints[0x3000] = 'none (manual focus)';
				APPoints[0x3001] = 'auto-selected / auto AF point selection';
				APPoints[0x3002] = 'right';
				APPoints[0x3003] = 'center';
				APPoints[0x3004] = 'left';
				APPoints[0x4001] = 'auto AF point selection';
				APPoints[0x4006] = 'face detect';
				output.push('Auto Focus Point Selected = ' + (APPoints[tmp[19]] ? APPoints[tmp[19]] : '0x' + tmp[19] /*.toString(16)*/));
				if (length == 20)  break;
				var ExposureModes = new Array('&#8220;easy shooting&#8221; (0)', 'program AE (1)',
												'Tv-priority / shutter speed priority AE (2)', 
												'Av-priority / aperture-priority AE (3)',
												'manual (4)', 'A-DEP / depth-of-field AE (5)',
												'M-DEP (6)');
				output.push('Exposure Mode = ' + (ExposureModes[tmp[20]] ? ExposureModes[tmp[20]] : tmp[20]));
				if (length == 21)  break;
				output.push('Unknown (0x0001.21) = ' + tmp[21]);
				if (length == 22)  break;
				var LensTypes = [];
				LensTypes[1] = 'Canon EF 50mm f/1.8';
				LensTypes[2] = 'Canon EF 28mm f/2.8';
				LensTypes[3] = 'Canon EF 135mm f/2.8 Soft';
				LensTypes[4] = 'Sigma UC Zoom 35-135mm f/4-5.6';
				LensTypes[6] = 'Sigma 18-125mm F3.5-5.6 DC IF ASP or Tokina AF193-2 19-35mm f/3.5-4.5';
				LensTypes[7] = 'Canon EF 100-300mm F5.6L';
				LensTypes[10] = 'Canon EF 50mm f/2.5 Macro or Sigma';
				LensTypes[11] = 'Canon EF 35mm f/2';
				LensTypes[13] = 'Canon EF 15mm f/2.8';
				LensTypes[21] = 'Canon EF 80-200mm f/2.8L';
				LensTypes[22] = 'Tokina AT-X280AF PRO 28-80mm F2.8 ASPHERICAL';
				LensTypes[26] = 'Canon EF 100mm f/2.8 Macro or Cosina 100mm f/3.5 Macro AF or Tamron';
				LensTypes[28] = 'Tamron AF Aspherical 28-200mm f/3.8-5.6 or 28-75mm f/2.8 or 28-105mm f/2.8';
				LensTypes[29] = 'Canon EF 50mm f/1.8 MkII';
				LensTypes[31] = 'Tamron SP AF 300mm f/2.8 LD IF';
				LensTypes[32] = 'Canon EF 24mm f/2.8 or Sigma 15mm f/2.8 EX Fisheye';
				LensTypes[39] = 'Canon EF 75-300mm f/4-5.6';
				LensTypes[40] = 'Canon EF 28-80mm f/3.5-5.6';
				LensTypes[43] = 'Canon EF 28-105mm f/4-5.6';
				LensTypes[45] = 'Canon EF-S 18-55mm f/3.5-5.6';
				LensTypes[124] = 'Canon MP-E 65mm f/2.8 1-5x Macro Photo';
				LensTypes[125] = 'Canon TS-E 24mm f/3.5L';
				LensTypes[126] = 'Canon TS-E 45mm f/2.8';
				LensTypes[127] = 'Canon TS-E 90mm f/2.8';
				LensTypes[130] = 'Canon EF 50mm f/1.0L';
				LensTypes[131] = 'Sigma 17-35mm f2.8-4 EX Aspherical HSM';
				LensTypes[134] = 'Canon EF 600mm f/4L IS';
				LensTypes[135] = 'Canon EF 200mm f/1.8L';
				LensTypes[136] = 'Canon EF 300mm f/2.8L';
				LensTypes[137] = 'Canon EF 85mm f/1.2L';
				LensTypes[139] = 'Canon EF 400mm f/2.8L';
				LensTypes[141] = 'Canon EF 500mm f/4.5L';
				LensTypes[142] = 'Canon EF 300mm f/2.8L IS';
				LensTypes[143] = 'Canon EF 500mm f/4L IS';
				LensTypes[149] = 'Canon EF 100mm f/2';
				LensTypes[150] = 'Canon EF 14mm f/2.8L or Sigma 20mm EX f/1.8';
				LensTypes[151] = 'Canon EF 200mm f/2.8L';
				LensTypes[152] = 'Sigma Lens (various models)';
				LensTypes[153] = 'Canon EF 35-350mm f/3.5-5.6L or Tamron or Sigma Bigma';
				LensTypes[155] = 'Canon EF 85mm f/1.8 USM';
				LensTypes[156] = 'Canon EF 28-105mm f/3.5-4.5 USM';
				LensTypes[160] = 'Canon EF 20-35mm f/3.5-4.5 USM';
				LensTypes[161] = 'Canon EF 28-70mm f/2.8L or Sigma 24-70mm EX f/2.8 or Tamron 90mm f/2.8';
				LensTypes[165] = 'Canon EF 70-200mm f/2.8 L';
				LensTypes[166] = 'Canon EF 70-200mm f/2.8 L + x1.4';
				LensTypes[167] = 'Canon EF 70-200mm f/2.8 L + x2';
				LensTypes[168] = 'Canon EF 28mm f/1.8 USM';
				LensTypes[169] = 'Canon EF17-35mm f/2.8L or Sigma 15-30mm f/3.5-4.5 EX DG Aspherical';
				LensTypes[170] = 'Canon EF 200mm f/2.8L II';
				LensTypes[173] = 'Canon EF 180mm Macro f/3.5L or Sigma 180mm F3.5 or 150mm f/2.8 Macro';
				LensTypes[174] = 'Canon EF 135mm f/2L';
				LensTypes[176] = 'Canon EF 24-85mm f/3.5-4.5 USM';
				LensTypes[177] = 'Canon EF 300mm f/4L IS';
				LensTypes[178] = 'Canon EF 28-135mm f/3.5-5.6 IS';
				LensTypes[180] = 'Canon EF 35mm f/1.4L';
				LensTypes[181] = 'Canon EF 100-400mm f/4.5-5.6L IS + x1.4';
				LensTypes[182] = 'Canon EF 100-400mm f/4.5-5.6L IS + x2';
				LensTypes[183] = 'Canon EF 100-400mm f/4.5-5.6L IS';
				LensTypes[184] = 'Canon EF 400mm f/2.8L + x2';
				LensTypes[186] = 'Canon EF 70-200mm f/4L';
				LensTypes[190] = 'Canon EF 100mm f/2.8 Macro';
				LensTypes[191] = 'Canon EF 400mm f/4 DO IS';
				LensTypes[197] = 'Canon EF 75-300mm f/4-5.6 IS';
				LensTypes[198] = 'Canon EF 50mm f/1.4 USM';
				LensTypes[202] = 'Canon EF 28-80 f/3.5-5.6 USM IV';
				LensTypes[211] = 'Canon EF 28-200mm f/3.5-5.6';
				LensTypes[213] = 'Canon EF 90-300mm f/4.5-5.6';
				LensTypes[214] = 'Canon EF-S 18-55mm f/3.5-4.5 USM';
				LensTypes[224] = 'Canon EF 70-200mm f/2.8L IS USM';
				LensTypes[225] = 'Canon EF 70-200mm f/2.8L IS USM + x1.4';
				LensTypes[226] = 'Canon EF 70-200mm f/2.8L IS USM + x2';
				LensTypes[229] = 'Canon EF 16-35mm f/2.8L';
				LensTypes[230] = 'Canon EF 24-70mm f/2.8L';
				LensTypes[231] = 'Canon EF 17-40mm f/4L';
				LensTypes[232] = 'Canon EF 70-300mm f/4.5-5.6 DO IS USM';
				LensTypes[234] = 'Canon EF-S 17-85mm f4-5.6 IS USM';
				LensTypes[235] = 'Canon EF-S10-22mm F3.5-4.5 USM';
				LensTypes[236] = 'Canon EF-S60mm F2.8 Macro USM';
				LensTypes[237] = 'Canon EF 24-105mm f/4L IS';
				LensTypes[238] = 'Canon EF 70-300mm f/4-5.6 IS USM';
				LensTypes[239] = 'Canon EF 85mm f/1.2L II USM';
				LensTypes[240] = 'Canon EF-S 17-55mm f/2.8 IS USM';
				LensTypes[241] = 'Canon EF 50mm f/1.2L USM';
				LensTypes[242] = 'Canon EF 70-200mm f/4L IS USM';
				LensTypes[0x7FFF] = LensTypes[65535] = 'n/a';
				output.push('Lens Type = ' + (LensTypes[tmp[22]] ? LensTypes[tmp[22]] : tmp[22]));
				if (length == 23)  break;
				output.push('&#8220;Long&#8221; Focal Length of Lens = ' + tmp[23] + ' focal units');
				if (length == 24)  break;
				output.push('&#8220;Short&#8221; Focal Length of Lens = ' + tmp[24] + ' focal units');
				if (length == 25)  break;
				output.push('Focal Units = ' + tmp[25] + ' per mm');
				if (length == 26)  break;
				output.push('Maximum Aperture = ' + tmp[26]);
				if (length == 27)  break;
				output.push('Minimum Aperture = ' + tmp[27]);
				if (length == 28)  break;
				var FlashActivities = new Array('flash did not fire (0)', 'flash fired (1)');
				output.push('Flash Activity = ' + (FlashActivities[tmp[28]] ? FlashActivities[tmp[28]] : tmp[28]));
				if (length == 29)  break;
				var out = new Array();
				if (tmp[29] & (1 << 14))  out.push('external E-TTL (bit 14)');
				if (tmp[29] & (1 << 13))  out.push('internal / built-in flash (bit 13)');
				if (tmp[29] & (1 << 11))  out.push('FP sync used (bit 11)');
				if (tmp[29] & (1 <<  4))  out.push('FP sync enabled (bit 4)');
				if (tmp[29] & (1 <<  0))  out.push('manual (bit 0)');				
				if (tmp[29] & (1 <<  1))  out.push('TTL (bit 1)');				
				if (tmp[29] & (1 <<  2))  out.push('A-TTL (bit 2)');				
				if (tmp[29] & (1 <<  3))  out.push('E-TTL (bit 3)');				
				if (tmp[29] & (1 <<  7))  out.push('second-curtain sync used (bit 7)');				
//				out.push('0x' + tmp[29].toString(16));
				output.push('Flash Details = ' + out.join(' / '));
				if (length == 30)  break;
				output.push('Unknown (0x0001.30) = ' + tmp[30]);
				if (length == 31)  break;
				output.push('Unknown (0x0001.31) = ' + tmp[31]);
				if (length == 32)  break;
				var FocusModes = new Array('single (0)', 'continuous (1)');
				output.push('Focus Continuous Mode = ' + (FocusModes[tmp[32]] ? FocusModes[tmp[32]] : tmp[32]));
				if (length == 33)  break;
				var AESettings = new Array('normal AE (0)', 'exposure compensation (1)', 'AE lock (2)',
									'AE lock + exposure compensation (3)', 'no AE (4)');
				output.push('AE Setting = ' + (AESettings[tmp[33]] ? AESettings[tmp[33]] : tmp[33]));
				if (length == 34)  break;
				var ImageStabilizations = new Array('off (0)', 'on, continuous (1)', 'on, shot only (2)',
											'on, panning (3)');
				output.push('Image Stabilization = ' + (ImageStabilizations[tmp[34]] ? ImageStabilizations[tmp[34]] : tmp[34]));
				if (length == 35)  break;
				output.push('Display Aperture = ' + tmp[35]);
				if (length == 36)  break;
				output.push('Zoom Source Width = ' + tmp[36]);
				if (length == 37)  break;
				output.push('Zoom Target Width = ' + tmp[37]);
				if (length == 38)  break;
				output.push('Unknown (0x0001.38) = ' + tmp[38]);
				if (length == 39)  break;
				output.push('Unknown (0x0001.39) = ' + tmp[39]);
				if (length == 40)  break;
				var PhotoEffects = new Array('off (0)', 'vivid (1)', 'neutral (2)',
										'smooth (3)', 'sepia (4)', 'black &amp; white (5)',
										'custom (6)');
				PhotoEffects[100] = 'My Color data (100)';
				output.push('Photo Effect = ' + (PhotoEffects[tmp[40]] ? PhotoEffects[tmp[40]] : tmp[40]));
				if (length == 41)  break;
				var FlashOutputs = [];
				output.push('Manual Flash Output = ' + (FlashOutputs[tmp[41]] ? FlashOutputs[tmp[41]] : tmp[41]));
				if (length == 42)  break;
				output.push('Color Tone = ' + tmp[42]);
				for (var i = 43 ; i < length ; i++) {
					output.push('Unknown (0x0001.' + i + ') = ' + tmp[i]);
				} 
				break;
			case 0x0002:
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>Focal Length<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>');
				var tmp = new Array();
				AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
//				if (tmp[0] != 2 * tmp.length) {
//					output.push('Tag length = ' + tmp[0] + ' bytes');
//					output.push('Buffer length = ' + tmp.length + ' shorts'); 
//				}
				var length = tmp.length;
				if (length == 0)  break;
				var FocalTypes = new Array('n/a (0)', 'fixed (1)', 'zoom (2)');
				output.push('Focal Type  = ' + (FocalTypes[tmp[0]] ? FocalTypes[tmp[0]] : tmp[0]));
				if (length == 1)  break;
				output.push('(Scaled) Focal Length = ' + tmp[1]);
				if (length == 2)  break;
				output.push('Focal Plane X Size = ' + tmp[2]);
				if (length == 3)  break;
				output.push('Focal Plane Y Size = ' + tmp[3]);
				for (var i = 4 ; i < tmp.length ; i++) {
					output.push('Unknown (0x0002.' + i + ') = ' + tmp[i]);
				} 
				break;
			case 0x0003:
				output.push('Unknown / Flash Information? (0x0003) = ' + data);
				break;
			case 0x0004:
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>Shot Information<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>');
				var tmp = new Array();
				AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
//				if (tmp[0] != 2 * tmp.length) {
//					output.push('Tag length = ' + tmp[0] + ' bytes');
//					output.push('Buffer length = ' + tmp.length + ' shorts'); 
//				}
				var length = tmp.length;
				if (length == 1)  break;
				output.push('Auto ISO = ' + tmp[1]);
				if (length == 2)  break;
				output.push('Base ISO = ' + tmp[2]);
//				output.push('Actual ISO = ' + (tmp[1] * tmp[2] / 100000));
				if (length == 3)  break;
				output.push('Measured EV = ' + tmp[3]);
				if (length == 4)  break;
				output.push('Target Aperture = ' + tmp[4]);
				if (length == 5)  break;
				output.push('Target Exposure Time = ' + tmp[5]);
				if (length == 6)  break;
				output.push('Exposure Compensation = ' + tmp[6]);
				if (length == 7)  break;
				var WhiteBalances = new Array('auto (0)', 'sunny / daylight (1)', 'cloudy (2)', 'tungsten (3)',
										'flourescent (4)', 'flash (5)', 'custom (6)', 'black &amp; white (7)',
										'shade (8)', 'manual temperature (Kelvin) (9)', 'PC set1 (10)',
										'PC set2 (11)', 'PC set3 (12)', 'n/a (13)', 'daylight fluorescent (14)',
										'custom 1 (15)', 'custom 2 (16)', 'underwater (17)');
				output.push('White Balance = ' + (WhiteBalances[tmp[7]] ? WhiteBalances[tmp[7]] : tmp[7]));
				if (length == 8)  break;
				var SlowShutters = new Array('off (0)', 'night scene (1)', 'on (2)', 'none (3)');
				output.push('Slow Shutter = ' + (SlowShutters[tmp[8]] ? SlowShutters[tmp[8]] : tmp[8]));
				if (length == 9)  break;
				output.push('Sequence Number = ' + tmp[9]);
				if (length == 10)  break;
				output.push('Optical Zoom Code = ' + tmp[10]);
				if (length == 11)  break;
				output.push('Unknown (0x0004.11) = ' + tmp[11]);
				if (length == 12)  break;
				output.push('Unknown (0x0004.12) = ' + tmp[12]);
				if (length == 13)  break;
				output.push('Flash Guide Number = ' + tmp[13]);
				if (length == 14)  break;
				var out = new Array();
				if (tmp[14] & (1 << 2))  out.push('left (bit 2)');
				if (tmp[14] & (1 << 1))  out.push('center (bit 1)');
				if (tmp[14] & (1 << 0))  out.push('right (bit 0)');
				if (out.length == 0)  out.push('none / manual focus');
				out.push((tmp[14] >> 12) + ' available focus points (bits 15-12)');
				output.push('AF Points In Focus (Used) = ' + out.join(' / '));
				if (length == 15)  break;
				var FlashBiases = new Array();
				FlashBiases[0xffc0] = -2;
				FlashBiases[0xffcc] = -1.67;
				FlashBiases[0xffd0] = -1.50;
				FlashBiases[0xffd4] = -1.33;
				FlashBiases[0xffe0] = -1;
				FlashBiases[0xffec] = -0.67;
				FlashBiases[0xfff0] = -0.50;
				FlashBiases[0xfff4] = -0.33;
				FlashBiases[0x0000] = 0;
				FlashBiases[0x000c] = 0.33;
				FlashBiases[0x0010] = 0.50;
				FlashBiases[0x0014] = 0.67;
				FlashBiases[0x0020] = 1;
				FlashBiases[0x002c] = 1.33;
				FlashBiases[0x0030] = 1.50;
				FlashBiases[0x0034] = 1.67;
				FlashBiases[0x0040] = 2;
				output.push('Flash Bias /Exposure Compensation = ' + (FlashBiases[tmp[15]] ? FlashBiases[tmp[15]] + ' EV' : tmp[15]));
				if (length == 16)  break;
				var AutoExposureBracketings = new Array('off (0)', 'on (shot 1) (1)',
												'on (shot 2) (2)', 'on (shot 3) (3)');
				AutoExposureBracketings[0xFFFF] = 'on (-1)';
				output.push('Auto Exposure Bracketing = ' + (AutoExposureBracketings[tmp[16]] ? AutoExposureBracketings[tmp[16]] : tmp[16]));
				if (length == 17)  break;
				output.push('AEB Bracket Value = ' + tmp[17]);
				if (length == 18)  break;
				output.push('Unknown (0x0004.18) = ' + tmp[18]);
				if (length == 19)  break;
				output.push('Subject Distance (Focus Distance Upper) = ' + tmp[19] + ' (in units of 0.01 or 0.001 m)');
				if (length == 20)  break;
				output.push('(Focus Distance Lower) = ' + tmp[20]);
				if (length == 21)  break;
				output.push('F Number = ' + tmp[21]);
				if (length == 22)  break;
				output.push('Exposure Time = ' + tmp[22]);
				if (length == 23)  break;
				output.push('Unknown (0x0004.23) = ' + tmp[23]);
				if (length == 24)  break;
				output.push('Bulb Duration = ' + tmp[24]);
				if (length == 25)  break;
				output.push('Unknown (0x0004.25) = ' + tmp[25]);
				if (length == 26)  break;
				var CameraTypes = new Array();
				CameraTypes[248] = 'EOS high-end (248)';
				CameraTypes[250] = 'compact (250)';
				CameraTypes[252] = 'EOS mid-range (252)';
				CameraTypes[255] = 'DV Camera (255)';
				output.push('Camera Type = ' + (CameraTypes[tmp[26]] ? CameraTypes[tmp[26]] : tmp[26]));
				if (length == 27)  break;
				var AutoRotates = new Array('none (0)', 'rotate 90 CW (1)', 'rotate 180 (2)',
											'rotate 270 CW (3)');
				AutoRotates[0xFFFF] = 'rotated by software (-1)';
				output.push('Auto Rotate = ' + (AutoRotates[tmp[27]] ? AutoRotates[tmp[27]] : tmp[27]));
				if (length == 28)  break;
				var NDFilters = new Array('off (0)', 'on (1)');
				output.push('ND Filter = ' + (NDFilters[tmp[28]] ? NDFilters[tmp[28]] : tmp[28]));
				if (length == 29)  break;
				output.push('Self Timer 2 = ' + tmp[29]);
				if (length == 30)  break;
				output.push('Unknown (0x0004.30) = ' + tmp[30]);
				if (length == 31)  break;
				output.push('Unknown (0x0004.31) = ' + tmp[31]);
				if (length == 32)  break;
				output.push('Unknown (0x0004.32) = ' + tmp[32]);
				if (length == 33)  break;
				output.push('Flash Output = ' + tmp[33]);
				for (var i = 34 ; i < tmp.length ; i++) {
					output.push('Unknown (0x0004.' + i + ') = ' + tmp[i]);
				} 
				break;
			case 0x0005:
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>Panorama<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>');
				var tmp = new Array();
				AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
				var length = tmp.length;
				if (length == 1)  break;
				output.push('Unknown (0x0005.1) = ' + tmp[1]);
				if (length == 2)  break;
				output.push('Panorama Frame = ' + tmp[2]);
				if (length == 3)  break;
				output.push('Unknown (0x0005.3) = ' + tmp[3]);
				if (length == 4)  break;
				output.push('Unknown (0x0005.4) = ' + tmp[4]);
				if (length == 5)  break;
				var PanoramaDirections = ['left-to-right (0)', 'right-to-left (1)',
										'bottom-to-top (2)', 'top-to-bottom (3)', 
										'2x2 matrix (clockwise) (4)'];
				output.push('Panorama Direction = ' + (PanoramaDirections[tmp[5]] ? PanoramaDirections[tmp[5]] : tmp[5]));
				for (var i = 6 ; i < tmp.length ; i++) {
					output.push('Unknown (0x0005.' + i + ') = ' + tmp[i]);
				} 
				break;
			case 0x0006:
				output.push('Image Type = ' + data);
				break;
			case 0x0007:
				output.push('Firmware Version = ' + data);
				break;
			case 0x0008:
				var image = data.toString(10);
				output.push('Image/File Number = ' + image.substr(0, 3) + '-' + image.substr(3, 4)); 
				break;
			case 0x0009:
				output.push('Owner Name = ' + AlanSRaskin.ExifViewer.Base.cleanExifStringData(data));
				break;
			case 0x000A:
				output.push('Color Information (D30) (0x000A) = ' + data);
				break;
			case 0x000B:
				output.push('Unknown (0x000B) = ' + data);
				break;
			case 0x000C:
				var out = '';
				out += ((data & 0xFFFF0000) >> 16).toString(16);	// 4-digit hex number
				out += '-';
				out += (data & 0xFFFF);	// 5-digit decimal number 
				output.push('Camera Serial Number = ' + out);
				break;
			case 0x000D:
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>Camera Information<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>');	// multiple formats
				var tmp = new Array();
				AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
//				if (tmp[0] != 2 * tmp.length) {
//					output.push('Tag length = ' + tmp[0] + ' bytes');
//					output.push('Buffer length = ' + tmp.length + ' shorts'); 
//				}
				var cnt = 0;
				for (var i = 0 ; i < tmp.length ; i++) {
					if (tmp[i] != 0) {
						output.push('Unknown (0x000D.' + i + ') = ' + tmp[i]);
					} else {
						cnt++;
					}
				}
				if (cnt != 0)  output.push(cnt + ' zero values omitted out of ' + tmp.length + ' values provided.'); 
				break;
			case 0x000E:
				output.push('File Length = ' + data);
				break;
			case 0x000F:
				output.push('Custom Functions = ' + data);	// multiple formats
				break;
			case 0x0010:
				var CameraModels = new Array();
				CameraModels[0x1010000] = 'PowerShot A30';
				CameraModels[0x1040000] = 'PowerShot S300 / Digital IXUS 300 / IXY Digital 300';
				CameraModels[0x1060000] = 'PowerShot A20';
				CameraModels[0x1080000] = 'PowerShot A10';
				CameraModels[0x1090000] = 'PowerShot S110 / Digital IXUS v / IXY Digital 200';
				CameraModels[0x1100000] = 'PowerShot G2';
				CameraModels[0x1110000] = 'PowerShot S40';
				CameraModels[0x1120000] = 'PowerShot S30';
				CameraModels[0x1130000] = 'PowerShot A40';
				CameraModels[0x1140000] = 'EOS D30';
				CameraModels[0x1150000] = 'PowerShot A100';
				CameraModels[0x1160000] = 'PowerShot S200 / Digital IXUS v2 / IXY Digital 200a';
				CameraModels[0x1170000] = 'PowerShot A200';
				CameraModels[0x1180000] = 'PowerShot S330 / Digital IXUS 330 / IXY Digital 300a';
				CameraModels[0x1190000] = 'PowerShot G3';
				CameraModels[0x1210000] = 'PowerShot S45';
				CameraModels[0x1230000] = 'PowerShot SD100 / Digital IXUS II / IXY Digital 30';
				CameraModels[0x1240000] = 'PowerShot S230 / Digital IXUS v3 / IXY Digital 320';
				CameraModels[0x1250000] = 'PowerShot A70';
				CameraModels[0x1260000] = 'PowerShot A60';
				CameraModels[0x1270000] = 'PowerShot S400 / Digital IXUS 400 / IXY Digital 400';
				CameraModels[0x1290000] = 'PowerShot G5';
				CameraModels[0x1300000] = 'PowerShot A300';
				CameraModels[0x1310000] = 'PowerShot S50';
				CameraModels[0x1340000] = 'PowerShot A80';
				CameraModels[0x1350000] = 'PowerShot SD10 / Digital IXUS i / IXY Digital L';
				CameraModels[0x1360000] = 'PowerShot S1 IS';
				CameraModels[0x1370000] = 'PowerShot Pro1';
				CameraModels[0x1380000] = 'PowerShot S70';
				CameraModels[0x1390000] = 'PowerShot S60';
				CameraModels[0x1400000] = 'PowerShot G6';
				CameraModels[0x1410000] = 'PowerShot S500 / Digital IXUS 500 / IXY Digital 500';
				CameraModels[0x1420000] = 'PowerShot A75';
				CameraModels[0x1440000] = 'PowerShot SD110 / Digital IXUS IIs / IXY Digital 30a';
				CameraModels[0x1450000] = 'PowerShot A400';
				CameraModels[0x1470000] = 'PowerShot A310';
				CameraModels[0x1490000] = 'PowerShot A85';
				CameraModels[0x1520000] = 'PowerShot S410 / Digital IXUS 430 / IXY Digital 450';
				CameraModels[0x1530000] = 'PowerShot A95';
				CameraModels[0x1540000] = 'PowerShot SD300 / Digital IXUS 40 / IXY Digital 50';
				CameraModels[0x1550000] = 'PowerShot SD200 / Digital IXUS 30 / IXY Digital 40';
				CameraModels[0x1560000] = 'PowerShot A520';
				CameraModels[0x1570000] = 'PowerShot A510';
				CameraModels[0x1590000] = 'PowerShot SD20 / Digital IXUS i5 / IXY Digital L2';
				CameraModels[0x1640000] = 'PowerShot S2 IS';
				CameraModels[0x1650000] = 'PowerShot SD430 / IXUS Wireless / IXY Wireless';
				CameraModels[0x1660000] = 'PowerShot SD500 / Digital IXUS 700 / IXY Digital 600';
				CameraModels[0x1668000] = 'EOS D60';
				CameraModels[0x1700000] = 'PowerShot SD30 / Digital IXUS i zoom / IXY Digital L3';
				CameraModels[0x1740000] = 'PowerShot A430';
				CameraModels[0x1750000] = 'PowerShot A410';
				CameraModels[0x1760000] = 'PowerShot S80';
				CameraModels[0x1780000] = 'PowerShot A620';
				CameraModels[0x1790000] = 'PowerShot A610';
				CameraModels[0x1800000] = 'PowerShot SD630 / Digital IXUS 65 / IXY Digital 80';
				CameraModels[0x1810000] = 'PowerShot SD450 / Digital IXUS 55 / IXY Digital 60';
				CameraModels[0x1870000] = 'PowerShot SD400 / Digital IXUS 50 / IXY Digital 55';
				CameraModels[0x1880000] = 'PowerShot A420';
				CameraModels[0x1890000] = 'PowerShot SD900 / Digital IXUS 900 Ti';
				CameraModels[0x1900000] = 'PowerShot SD550 / Digital IXUS 750 / IXY Digital 700';
				CameraModels[0x1920000] = 'PowerShot A700';
				CameraModels[0x1940000] = 'PowerShot SD700 IS / Digital IXUS 800 IS / IXY Digital 800 IS';
				CameraModels[0x1950000] = 'PowerShot S3 IS';
				CameraModels[0x1960000] = 'PowerShot A540';
				CameraModels[0x1970000] = 'PowerShot SD600 / Digital IXUS 60 / IXY Digital 70';
				CameraModels[0x1980000] = 'PowerShot G7';
				CameraModels[0x1990000] = 'PowerShot A530';
				CameraModels[0x2000000] = 'PowerShot SD800 IS / Digital IXUS 850 IS';
				CameraModels[0x2010000] = 'PowerShot SD40 / Digital IXUS i7 zoom';
				CameraModels[0x2020000] = 'PowerShot A710 IS';
				CameraModels[0x2030000] = 'PowerShot A640';
				CameraModels[0x2040000] = 'PowerShot A630';
				CameraModels[0x3010000] = 'PowerShot Pro90 IS';
				CameraModels[0x4040000] = 'PowerShot G1';
				CameraModels[0x6040000] = 'PowerShot S100 / Digital IXUS / IXY Digital';
				CameraModels[0x4007d675] = 'HV10';
				CameraModels[0x80000001] = 'EOS-1D';
				CameraModels[0x80000167] = 'EOS-1DS';
				CameraModels[0x80000168] = 'EOS 10D';
				CameraModels[0x80000170] = 'EOS Digital Rebel / 300D / Kiss Digital';
				CameraModels[0x80000174] = 'EOS-1D Mark II';
				CameraModels[0x80000175] = 'EOS 20D';
				CameraModels[0x80000188] = 'EOS-1Ds Mark II';
				CameraModels[0x80000189] = 'EOS Digital Rebel XT / 350D / Kiss Digital N';
				CameraModels[0x80000213] = 'EOS 5D';
				CameraModels[0x80000232] = 'EOS-1D Mark II N';
				CameraModels[0x80000234] = 'EOS 30D';
				CameraModels[0x80000236] = 'EOS Digital Rebel XTi / 400D / Kiss Digital X';
				if (data < 0)  data += 0xFFFFFFFF + 1;
				output.push('Camera Model = ' + (CameraModels[data] ? CameraModels[data] : '0x' + data.toString(16)));
				break;
			case 0x0011:
				output.push('Unknown (0x0011) = ' + data);
				break;
			case 0x0012:
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>Picture / AutoFocus Information<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'b>');
				var tmp = new Array();
				AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
//				if (tmp[0] != 2 * tmp.length) {
//					output.push('Tag length = ' + tmp[0] + ' bytes');
//					output.push('Buffer length = ' + tmp.length + ' shorts'); 
//				}
				var length = tmp.length;
				if (length == 0)  break;
				output.push('Number AF Points = ' + tmp[0]);
				if (length == 1)  break;
				output.push('Number Valid AF Points = ' + tmp[1]);
				if (length == 2)  break;
				output.push('Image Width = ' + tmp[2]);
				if (length == 3)  break;
				output.push('Image Height = ' + tmp[3]);
				if (length == 4)  break;
				output.push('AF Image Width (as Shot) = ' + tmp[4]);
				if (length == 5)  break;
				output.push('AF Image Height (as Shot) = ' + tmp[5]);
				if (length == 6)  break;
				output.push('AF Area Width = ' + tmp[6]);
				if (length == 7)  break;
				output.push('AF Area Height = ' + tmp[7]);
				if (length == 8)  break;
				output.push('AF Area X Positions = ' + tmp[8]);
				if (length == 9)  break;
				output.push('AF Area Y Positions = ' + tmp[9]);
				if (length == 10)  break;
				output.push('AF Points In Focus = ' + tmp[10]);
				if (length == 11)  break;
				output.push('Primary AF Point  ' + tmp[11]);
				if (length == 12)  break;
				output.push('Primary AF Point = ' + tmp[12]);
				if (length == 13)  break;
				output.push('Unknown (0x0012.13) = ' + tmp[13]);
				if (length == 14)  break;
				output.push('Unknown (0x0012.14) = ' + tmp[14]);
				if (length == 15)  break;
				output.push('Unknown (0x0012.15) = ' + tmp[15]);
				if (length == 16)  break;
				output.push('Unknown (0x0012.16) = ' + tmp[16]);
				if (length == 17)  break;
				output.push('Unknown (0x0012.17) = ' + tmp[17]);
				if (length == 18)  break;
				output.push('Unknown (0x0012.18) = ' + tmp[18]);
				if (length == 19)  break;
				output.push('Unknown (0x0012.19) = ' + tmp[19]);
				if (length == 20)  break;
				output.push('Unknown (0x0012.20) = ' + tmp[20]);
				if (length == 21)  break;
				output.push('Unknown (0x0012.21) = ' + tmp[21]);
				if (length == 22)  break;
				output.push('AF Points Used = ' + tmp[22]);
				if (length == 23)  break;
				output.push('Unknown (0x0012.23) = ' + tmp[23]);
				if (length == 24)  break;
				output.push('Unknown (0x0012.24) = ' + tmp[24]);
				if (length == 25)  break;
				output.push('Unknown (0x0012.25) = ' + tmp[25]);
				if (length == 26)  break;
				output.push('AF Points Used = ' + tmp[26]);
				for (var i = 27 ; i < length ; i++) {
					output.push('Unknown (0x0012.' + i + ') = ' + tmp[i]);
				}
				break;
			case 0x0015:
				// 0x90000000 = Format 1
				// 0xa0000000 = Format 2
				output.push('Serial Number Format = ' + data);
				break;
			case 0x001C:
				var DateStamps = ['off (0)', 'date (1)', 'date and time (2)'];
				output.push('Date Stamp Mode = ' + (DateStamps[data] ? DateStamps[data] : data));
				break;
			case 0x001D:
				output.push('My Colors = ' + data);
				break;
			case 0x001E:
				output.push('Firmware Revision = ' + data);
				break;
			case 0x0024:
				output.push('Face Detect 1 = ' + data);
				break;
			case 0x0025:
				output.push('Face Detect 2 = ' + data);
				break;
			case 0x0026:
				output.push('AF Information 2 = ' + data);
				break;
			case 0x0083:
				output.push('Original Decision Data = ' + data);
				break; 	 
			case 0x0090:
				output.push('Custom Functions 1D = ' + data);
				break;
			case 0x0091:
				output.push('Personal Functions = ' + data);
				break;
			case 0x0092:
				output.push('Personal Function Values = ' + data);
				break;
			case 0x0093:
				output.push('File Information = ' + data);
				break;
			case 0x0094:
				output.push('AF Points Used (in Focus) 1D = ' + data);
				break;
			case 0x0095:
				output.push('Lens Type = ' + data);
				break; 	 
			case 0x0096:
				output.push('Internal Serial Number? = ' + data);
				break; 	 
			case 0x0097:
				output.push('Dust Removal Data = ' + data);
				break; 	 
			case 0x0099:
				output.push('Custom Functions 2 = ' + data);
				break;
			case 0x00A0:
				output.push('Proccessing Information = ' + data);
				break;
			case 0x00A1:
				output.push('Tone Curve Table = ' + data);
				break; 	 
			case 0x00A2:
				output.push('Sharpness Table = ' + data);
				break; 	 
			case 0x00A3:
				output.push('Sharpness Frequency Table = ' + data);
				break; 	 
			case 0x00A4:
				output.push('White Balance Table = ' + data);
				break; 	 
			case 0x00A9:
				output.push('Colour Balance = ' + data);
				break;
			case 0x00AE:
				output.push('Color Temperature = ' + data);
				break; 	 
			case 0x00B0:
				output.push('Canon Flags = ' + data);
				break;
			case 0x00B1:
				output.push('Modified Information = ' + data);
				break;
			case 0x00B2:
				output.push('Tone Curve Matching = ' + data);
				break; 	 
			case 0x00B3:
				output.push('White Balance Matching = ' + data);
				break; 	 
			case 0x00B4:
				var ColourSpaces = new Array('n/a (0)', 'sRGB (1)', 'Adobe RGB (2)');
				output.push('Color Space = ' + (ColourSpaces[data] ? ColourSpaces[data] : data));
				break;
			case 0x00B6:
				output.push('Preview Image Information = ' + data);
				break;
			case 0x00E0:
				output.push('Sensor Information = ' + data);
				break;
			case 0x4001:
				output.push('Color Balance Information = ' + data);
				break;
			case 0x4002:
				output.push('Unknown Block 1? = ' + data);
				break; 	 
			case 0x4003:
				output.push('Color Information = ' + data);
				break;
			case 0x4005:
				output.push('Unknown Block 2? = ' + data);
				break;
			case 0x4008:
				output.push('Black Level? = ' + data);
				break;
			default:
				output.push('Unknown (0x' + tagnum.toString(16) + ') = ' + data);
				break;
			} 
	return output.join('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>');
}	// getCanonInterpretedTagData()
