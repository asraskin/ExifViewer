if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

AlanSRaskin.ExifViewer.Makers.dumpSanyoTagData = function (ifd, output, is_motorola) {
	var tagnum;
	for (var t in ifd) {
		if (t.match(/^x[0-9A-Fa-f]{4}$/)) {
			tagnum = parseInt('0' + t, 16);
			var data = ifd[t];
			output.push(AlanSRaskin.ExifViewer.Makers.getSanyoInterpretedTagData(tagnum, data));
		}
	}
}	// dumpSanyoTagData()

// http://www.exif.org/makernotes/SanyoMakerNote.html
AlanSRaskin.ExifViewer.Makers.getSanyoInterpretedTagData = function (tagnum, data) {
	var output = [];
	switch (tagnum) {
	case 0x0100:
		output.push('Thumbnail Image = ' + data);
		break;
	case 0x0200:
		var tmp = [];
		AlanSRaskin.ExifViewer.Base.bytesToBuffer(data, tmp);
		var SpecialModes1 = ['normal (0)', 'unknown (1)', 'fast (2)', 'panorama (3)'];
		var SpecialModes3 = ['n/a (0)', 'left to right (1)', 'right to left (2)', 
										'bottom to top (3)', 'top to bottom (4)'];
		output.push('Special Mode:<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>Picture Taking Mode = ' + (SpecialModes1[tmp[0]] ? SpecialModes1[tmp[0]] : data)
					+ '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>Sequence Number = ' + tmp[1] + '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>Panorama Direction = ' + (SpecialModes3[tmp[2]] ? SpecialModes3[tmp[2]] : data));
		break;
	case 0x0201:
		var JpegQualities = {};
		JpegQualities['0x0000'] = 'normal(very low) (0)';
		JpegQualities['0x0001'] = 'normal(low) (1)';
		JpegQualities['0x0002'] = 'normal(medium low) (2)';
		JpegQualities['0x0003'] = 'normal(medium) (3)';
		JpegQualities['0x0004'] = 'normal(medium high) (4)';
		JpegQualities['0x0005'] = 'normal(high) (5)';
		JpegQualities['0x0006'] = 'normal(very high) (6)';
		JpegQualities['0x0007'] = 'normal(super high) (7)';
		JpegQualities['0x0100'] = 'fine(very low) (256)';
		JpegQualities['0x0101'] = 'fine(low) (257)';
		JpegQualities['0x0102'] = 'fine(medium low) (258)';
		JpegQualities['0x0103'] = 'fine(medium) (259)';
		JpegQualities['0x0104'] = 'fine(medium high) (260)';
		JpegQualities['0x0105'] = 'fine(high) (261)';
		JpegQualities['0x0106'] = 'fine(very high) (262)';
		JpegQualities['0x0107'] = 'fine(super high) (263)';
		JpegQualities['0x0200'] = 'super fine(very low) (512)';
		JpegQualities['0x0201'] = 'super fine(low) (513)';
		JpegQualities['0x0202'] = 'super fine(medium low) (514)';
		JpegQualities['0x0203'] = 'super fine(medium) (515)';
		JpegQualities['0x0204'] = 'super fine(medium high) (516)';
		JpegQualities['0x0205'] = 'super fine(high) (517)';
		JpegQualities['0x0206'] = 'super fine(very high) (518)';
		JpegQualities['0x0207'] = 'super fine(super high) (519)';
		output.push('JPEG Quality = ' + (JpegQualities[data] ? JpegQualities[data] : data));
		break;
	case 0x0202:
		var MacroModes = ['normal (0)', 'macro (1)', 'view (2)', 'manual (3)'];
		output.push('Macro Mode = ' + (MacroModes[data] ? MacroModes[data] : data));
		break;
	case 0x0204:
		output.push('Digital Zoom = ' + data);
		break;
	case 0x0207:
		output.push('Software Release = ' + data);
		break;
	case 0x0208:
		output.push('Picture/Text Information = ' + data);
		break;
	case 0x0209:
		output.push('Camera ID = ' + data);
		break;
	case 0x020E:
		var SequentialShotMethods = ['none (0)', 'standard (1)', 'best (2)', 'adjust exposure (3)'];
		output.push('Sequential Shot Method = ' + (SequentialShotMethods[data] ? SequentialShotMethods[data] : data));
		break;
	case 0x020F:
		var WideRanges = ['off (0)', 'on (1)'];
		output.push('Wide Range = ' + (WideRanges[data] ? WideRanges[data] : data));
		break;
	case 0x0210:
		var ColourAdjustmentModes = ['off (0)', 'colour adjustment mode used (1)'];
		output.push('Colour Adjustment Mode = ' + (ColourAdjustmentModes[data] ? ColourAdjustmentModes[data] : data));
		break;
	case 0x0213:
		var QuickShots = ['off (0)', 'on (1)'];
		output.push('Quick Shot = ' + (QuickShots[data] ? QuickShots[data] : data));
		break;
	case 0x0214:
		var SelfTimers = ['off (0)', 'on (1)'];
		output.push('Self Timer = ' + (SelfTimers[data] ? SelfTimers[data] : data));
		break;
	case 0x0216:
		var VoiceMemos = ['off (0)', 'on (1)'];
		output.push('Voice Memo = ' + (VoiceMemos[data] ? VoiceMemos[data] : data));
		break;
	case 0x0217:
		var RecordShutterReleases = ['record whilst held (0)', 'press to start, press to stop (1)'];
		output.push('Record Shutter Release = ' + (RecordShutterReleases[data] ? RecordShutterReleases[data] : data));
		break;
	case 0x0218:
		var FlickerReduces = ['off (0)', 'on (1)'];
		output.push('Flicker Reduce = ' + (FlickerReduces[data] ? FlickerReduces[data] : data));
		break;
	case 0x0219:
		var OpticalZooms = ['disabled (0)', 'enabled (1)'];
		output.push('Optical Zoom = ' + (OpticalZooms[data] ? OpticalZooms[data] : data));
		break;
	case 0x021B:
		var DigitalZooms = ['disabled (0)', 'enabled (1)'];
		output.push('Digital Zoom = ' + (DigitalZooms[data] ? DigitalZooms[data] : data));
		break;
	case 0x021D:
		var LightSourceSpecials = ['off (0)', 'on (1)'];
		output.push('Light Source Special = ' + (LightSourceSpecials[data] ? LightSourceSpecials[data] : data));
		break;
	case 0x021E:
		var Resaveds = ['no (0)', 'yes (1)'];
		output.push('Resaved = ' + (Resaveds[data] ? Resaveds[data] : data));
		break;
	case 0x021F:
		var SceneSelects = ['off (0)', 'spot (1)', 'TV (2)', 'night (3)', 'user 1 (4)', 'user 2 (5)'];
		output.push('Scene Select = ' + (SceneSelects[data] ? SceneSelects[data] : data));
		break;
	case 0x0224:
		var SequentialShotIntervals = ['5 frames/sec (0)', '10 frames/sec (1)', '15 frames/sec (2)', '20 frames/sec (3)'];
		output.push('Sequential Shot Interval = ' + (SequentialShotIntervals[data] ? SequentialShotIntervals[data] : data));
		break;
	case 0x0224:
		var FlashModes = ['auto (0)', 'force (1)', 'disabled (2)', 'red eye (3)'];
		output.push('Flash Mode = ' + (FlashModes[data] ? FlashModes[data] : data));
		break;
	case 0x0E00:
		output.push('Print IM = ' + data);
		break;
	case 0x0F00:
		output.push('Data Dump = ' + data);
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
}	// getSanyoInterpretedTagData()
