if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Makers)  AlanSRaskin.ExifViewer.Makers = {};

AlanSRaskin.ExifViewer.Makers.initializeMaker = function (make, model, subifd) {
	subifd.make = make;
	subifd.model = model;
	var makeTitles = {
		'AGFA' : 'Agfa' , 'ASAHI' : 'Asahi' , 
		'CANON' : 'Canon' , 'CASIO' : 'Casio', 'CONTAX' : 'Contax' , 
		'EPSON' : 'Epson' , 
		'FUJIFILM' : 'Fujifilm' , 
		'HEWLETT-PACKARD' : 'Hewlett-Packard' , 'HP' : 'Hewlett-Packard' , 
		'JVC' : 'JVC' , 
		'KODAK' : 'Kodak' , 'KONICA' : 'Konica' , 'KYOCERA' : 'Kyocera' , 
		'MINOLTA' : 'Minolta' , 
		'NIKON' : 'Nikon' ,
		'OLYMPUS' : 'Olympus' , 
		'PANASONIC' : 'Panasonic' , 'PENTAX' : 'Pentax' ,
		'RICOH' : 'Ricoh' , 
		'SAMSUNG' : 'Samsung' , 'SANYO' : 'Sanyo' , 'SIGMA' : 'Sigma' , 'SONY' : 'Sony' , 
		'TOSHIBA' : 'Toshiba'
	};
	var parseFunctions = {
		'AGFA' : 		AlanSRaskin.ExifViewer.Makers.dumpAgfaTagData ,
		'ASAHI' :		AlanSRaskin.ExifViewer.Makers.dumpPentaxAsahiTagData ,
		'CANON' : 		AlanSRaskin.ExifViewer.Makers.dumpCanonTagData ,
		'CONTAX' :		AlanSRaskin.ExifViewer.Makers.dumpKyoceraContaxTagData ,
		'CASIO' : 		AlanSRaskin.ExifViewer.Makers.dumpCasioTagData ,
		'EPSON' : 		AlanSRaskin.ExifViewer.Makers.dumpEpsonTagData ,
		'FUJIFILM' : 	AlanSRaskin.ExifViewer.Makers.dumpFujifilmTagData , 
		'KYOCERA' :		AlanSRaskin.ExifViewer.Makers.dumpKyoceraContaxTagData ,
		'KONICA' :		AlanSRaskin.ExifViewer.Makers.dumpKonicaMinoltaTagData ,
		'MINOLTA' :		AlanSRaskin.ExifViewer.Makers.dumpKonicaMinoltaTagData ,
 		'NIKON' : 		AlanSRaskin.ExifViewer.Makers.dumpNikonTagData ,
		'OLYMPUS' : 	AlanSRaskin.ExifViewer.Makers.dumpOlympusTagData ,
		'PANASONIC' : 	AlanSRaskin.ExifViewer.Makers.dumpPanasonicTagData ,
		'PENTAX' :		AlanSRaskin.ExifViewer.Makers.dumpPentaxAsahiTagData,
		'SANYO' :		AlanSRaskin.ExifViewer.Makers.dumpSanyoTagData,
		'Surveylab Ltd (www.ikegps.com)': AlanSRaskin.ExifViewer.Makers.dumpIKETagData
	};
	var make_match = make.replace(/ .*$/, '').toUpperCase();

	switch (make_match) {
//	case 'AGFA':
//	case 'ASAHI':
	case 'CANON':
	case 'CASIO':
//	case 'CONTAX':
//	case 'EPSON':
	case 'FUJIFILM':
//	case 'KONICA':
//	case 'KYOCERA':
//	case 'MINOLTA':
	case 'NIKON':	// also 'NIKON CORPORATION'
	case 'OLYMPUS': // also 'OLYMPUS IMAGING CORP.  '
	case 'PANASONIC':
//	case 'PENTAX':
//	case 'RICOH':
	case 'SANYO':
//	case 'SONY':
		subifd.maker = {};
		subifd.maker.type = 'Maker';
		subifd.maker.format = 'IFD';
		subifd.maker.make = make;
		subifd.maker.make_match = make_match;
		subifd.maker.make_title = makeTitles[make_match];
		subifd.maker.model = model;
		subifd.maker.parseFunction = parseFunctions[make_match];
		break;
	default:
		// nothing to do
		break;
	}
}	 // initializeMaker()

AlanSRaskin.ExifViewer.Makers.parseMaker = function (maker, exif_data, mp_length, is_motorola, makerNoteOffset, data, debug, output) {
	var mn_buffer_length, data_buffer, makerNoteStartOffset, is_motorola_mn;
	switch (maker.make_match) {
	case 'AGFA':
		if (data.indexOf('0x41,0x47,0x46,0x41,0x00,0x01') == 0) { // 'AGFA' at start
			makerNoteStartOffset = makerNoteOffset + 8; // skip label
		} else {
			output.push('Agfa label not found');
			window.alert('An unrecognized Agfa maker-note format was found.');
			maker = null;
		}
		break;
	case 'ASAHI':
	case 'PENTAX':
		if (data.indexOf('0x41,0x4f,0x43,0x00') == 0) { // 'AOC' at start
			makerNoteStartOffset = makerNoteOffset + 6; // skip label + 2 bytes
			maker.maker_type = 2;
		} else {
			makerNoteStartOffset = makerNoteOffset + 0;
			maker.maker_type = 1;
		}
		break;
	case 'CANON':
		makerNoteStartOffset = makerNoteOffset + 0;
		break;
	case 'CASIO':
		if (data.indexOf('0x51,0x56,0x43,0x00,0x00,0x00') == 0) { // 'QVC' at start
			makerNoteStartOffset = makerNoteOffset + 6; // skip label
			maker.maker_type = 2;
		} else {
			makerNoteStartOffset = makerNoteOffset + 0;
			maker.maker_type = 1;
		}
		break;
	case 'EPSON':
		if (data.indexOf('0x45,0x50,0x53,0x4f,0x4e,0x00,0x01,0x00') == 0) { // 'EPSON' at start
			makerNoteStartOffset = makerNoteOffset + 8; // skip label
		} else {
			output.push('Epson label not found');
			window.alert('An unrecognized Epson maker-note format was found.');
			maker = null;
		}
		break;
	case 'KONICA':
	case 'MINOLTA':
		if (data.indexOf('0x4d,0x4c,0x59') == 0  ||  data.indexOf('0x4b,0x43') == 0  
				||  data.indexOf('0x2b,0x4d,0x2b,0x4d,0x2b,0x4d,0x2b,0x4d') == 0  ||  data.indexOf('0x4d,0x49,0x4e,0x4f,0x4c') == 0) {
			output.push('Unknown Konica/Minolta maker note format');			// types 1 (MLY), 2 (KC), 3 (+M+M+M+M), and 4 (MINOL), respectively
			window.alert('An unrecognized Konica/Minolta maker-note format was found.');
			maker = null;
		} else {
			makerNoteStartOffset = makerNoteOffset + 0;
			maker.maker_type = 5;
		}
		break;
	case 'KYOCERA':
	case 'CONTAX':
		if (data.indexOf('0x4b,0x59,0x4f,0x43,0x45,0x52,0x41,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x20,0x00,0x00,0x00') == 0) { // 'KYOCERA            ' at start
			makerNoteStartOffset = makerNoteOffset + 22; // skip label
		} else {
			output.push('Kyocera label not found');
			window.alert('An unrecognized Kyocera maker-note format was found.');
			maker = null;
		}
		break;
	case 'NIKON':
		if (data.indexOf('0x4e,0x69,0x6b,0x6f,0x6e,0x00,0x01,0x00') == 0) {	// 'Nikon' at start? 
			makerNoteStartOffset = makerNoteOffset + 8;	// skip label
			maker.maker_type = 1;
		} else if (data.indexOf('0x4e,0x69,0x6b,0x6f,0x6e,0x00,0x02,0x00,0x00,0x00') == 0
				||  data.indexOf('0x4e,0x69,0x6b,0x6f,0x6e,0x00,0x02,0x10,0x00,0x00') == 0) {	// 'Nikon' at start?
//			alert('3: ' + data.replace(/,/g, ' ').substr(0, 4000));
//			makerNoteStartOffset = makerNoteOffset + 18;	// skip label and TIFF header stuff
			makerNoteStartOffset = 8;
			maker.maker_type = 3;
		} else {
			makerNoteStartOffset = makerNoteOffset + 0;
			maker.maker_type = 2;
		}
		break;
	case 'OLYMPUS':
		if (data.indexOf('0x4f,0x4c,0x59,0x4d,0x50,0x00,0x01') != 0  &&  data.indexOf('0x4f,0x4c,0x59,0x4d,0x50,0x00,0x02') != 0) {	// 'OLYMP' at start?
			output.push('Olympus label not found');
			window.alert('An unrecognized Olympus maker-note format was found.');
			maker = null;
		} else {
			makerNoteStartOffset = makerNoteOffset + 8;
		}
		break;
	case 'FUJIFILM':
		if (data.indexOf('0x46,0x55,0x4a,0x49,0x46,0x49,0x4c,0x4d') != 0) {	// 'FUJIFILM' at start
			output.push('Fujifilm label not found');
			window.alert('An unrecognized Fujifilm maker-note format was found.');
			maker = null;
		} else {
			makerNoteStartOffset = -1;	// see below
		}
		break;
	case 'PANASONIC':
		if (data.indexOf('0x50,0x61,0x6e,0x61,0x73,0x6f,0x6e,0x69,0x63,0x00,0x00,0x00') != 0) {	// 'Panasonic' at start
			output.push('Panasonic label not found');		// e.g. 'MKED'
			window.alert('An unrecognized Panasonic maker-note format was found.');
			maker = null;
		} else {
			makerNoteStartOffset = makerNoteOffset + 12;
		}
		break;
	case 'RICOH':
		if (data.indexOf('0x52,0x49,0x43,0x4f,0x48') == 0  ||  data.indexOf('0x52,0x69,0x63,0x6f,x68') == 0) {	// 'RICOH' or 'Ricoh'
			maker.maker_type = 3;
			makerNoteStartOffset = makerNoteOffset + 8;
		} else if (data.indexOf('0x52,0x76') == 0) {	// Rv
			maker.maker_type = 1;
			maker.format = 'text';
			maker.text = AlanSRaskin.ExifViewer.Base.bytesToString(data.substr(2 * 5))
		} else if (data.indexOf('0x52,0x65,0x76') == 0) {	// Rev
			maker.maker_type = 1;
			maker.format = 'text';
			maker.text = AlanSRaskin.ExifViewer.Base.bytesToString(data.substr(3 * 5))
		} else {
			output.push('Ricoh maker note cannot be parsed');	// 'Rv' or 'Rev' for type 1, nothing for type 2 
			window.alert('An unrecognized Ricoh maker-note format was found.');
			maker = null;
		}
		break;
	case 'SANYO':
		makerNoteStartOffset = makerNoteOffset + 8;
		break;
	case 'SONY':
		if (data.indexOf('0x53,0x4f,0x4e,0x59,0x20,0x43,0x41,0x4d,0x20,0x00,0x00,0x00') != 0  &&  data.indexOf('0x53,0x4f,0x4e,0x59,0x20,0x44,x53,0x43,0x20,0x00,0x00,0x00') != 0) {	// 'SONY CAM ' or 'SONY DSC ' at start?
			output.push('Sony label not found');
			window.alert('An unrecognized Sony maker-note format was found.');
			maker = null;
		} else {
			makerNoteStartOffset = makerNoteOffset + 12;
		}
		break;
	}
	
	if (!maker)  return;

	switch (maker.make_match) {
	case 'CASIO':
		data_buffer = exif_data;
		mn_buffer_length = mp_length;
		is_motorola_mn = 1;	// Motorola
		break;
	case 'KYOCERA':
	case 'CONTAX':
		data_buffer = [];
		AlanSRaskin.ExifViewer.Base.hexBytesToBuffer(data.substr(22 * 5), data_buffer);
		mn_buffer_length = data_buffer.length;
		is_motorola_mn = is_motorola;
		break;
	case 'NIKON':
		if (maker.maker_type == 3) {
			data_buffer = [];
			AlanSRaskin.ExifViewer.Base.hexBytesToBuffer(data.substr(10 * 5), data_buffer);
			mn_buffer_length = data_buffer.length;
			if (data.indexOf('0x49,0x49') == 10 * 5) {
				is_motorola_mn = 0;	// Intel
			} else if (data.indexOf('0x4d,0x4d') == 10 * 5) {
				is_motorola_mn = 1;	// Motorola
			} else {
				is_motorola_mn = is_motorola;
			}
		} else {
			data_buffer = exif_data;
			mn_buffer_length = mp_length;
			is_motorola_mn = is_motorola;
		}
		break;
	case 'RICOH':
		if (maker.maker_type == 3) {
			data_buffer = exif_data;
			mn_buffer_length = mp_length;
			is_motorola_mn = 1; // Motorola
		} else {
			maker = null;
		}
		break;
	case 'ASAHI':	// offsets are relative to start of IFD!
	case 'PENTAX':
		data_buffer = [];
		if (maker.maker_type == 1) {
			AlanSRaskin.ExifViewer.Base.hexBytesToBuffer(data, data_buffer);
		} else {
			AlanSRaskin.ExifViewer.Base.hexBytesToBuffer(data.substr(6 * 5), data_buffer);
		}
		mn_buffer_length = data_buffer.length;
		is_motorola_mn = is_motorola;
		break;
	case 'AGFA':
	case 'CANON':
	case 'EPSON':
	case 'KONICA':
	case 'MINOLTA':
	case 'OLYMPUS':
	case 'PANASONIC':
	case 'SANYO':
	case 'SONY':
		data_buffer = exif_data;
		mn_buffer_length = mp_length;
		is_motorola_mn = is_motorola;
		break;
	case 'FUJIFILM':	// offsets are relative to start of Maker Note!
		data_buffer = [];
		AlanSRaskin.ExifViewer.Base.hexBytesToBuffer(data, data_buffer);
		mn_buffer_length = data_buffer.length;
		is_motorola_mn = 0;	// Intel
		makerNoteStartOffset = AlanSRaskin.ExifViewer.Base.getLong(data_buffer, 8, is_motorola_mn);
		break;
	}
	if (maker) {
		switch (maker.format) {
		case 'IFD':
			var status = AlanSRaskin.ExifViewer.Base.parseIFD(maker, mn_buffer_length, data_buffer, makerNoteStartOffset, is_motorola_mn, debug, output);
			maker.status = status;
			break;
		case 'text':
			break;
		default:
			maker.status = -1000;
			break;
		}
	}
}	// parseMaker()

AlanSRaskin.ExifViewer.Makers.dumpExifMakerTagData = function (maker, output, is_motorola, divName, bTable) {
	switch (maker.make_match) {
	case 'AGFA':
	case 'ASAHI':
	case 'CANON':
	case 'CONTAX':
	case 'CASIO':
	case 'EPSON':
	case 'FUJIFILM':
	case 'KONICA':
	case 'KYOCERA':
	case 'MINOLTA':
	case 'NIKON':
	case 'OLYMPUS':
	case 'PANASONIC':
	case 'PENTAX':
	case 'RICOH':
	case 'SANYO':
	case 'SONY':
		var header = '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>' + maker.make_title + ' Maker Note' 
					+ (maker.maker_type && maker.maker_type > 0 ? ' (type ' + maker.maker_type + ')': '') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>';
		switch (maker.format) {
		case 'IFD':
			maker.parseFunction(maker, output, is_motorola);
			if (output.length > 0)  {
				AlanSRaskin.ExifViewer.Base.displayText(header, divName);
//				AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>' + output.join('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>', divName);
				AlanSRaskin.ExifViewer.Base.dumpAssembledExifData(output, divName, bTable);
			}
			break;
		case 'text':
			if (maker.text) {
				AlanSRaskin.ExifViewer.Base.displayText(header, divName);
				AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>' + maker.text + '</' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>');
			}
			break;
		}
		output.length = 0;
		break;
	}
}	// dumpExifMakerTagData()