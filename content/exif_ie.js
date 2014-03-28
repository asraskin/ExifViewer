if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Moz)  AlanSRaskin.ExifViewer.Moz = {};

AlanSRaskin.ExifViewer.Moz.getPString = function (key) {
	var text = '';
	switch (key) {
		case 'testString':
			text = 'Hello, world!';
			break;
		case 'unableToExtract':
			text = 'Unable to extract some or all of the Exif data.';
			break;
		case 'unableToOpenTestFile':
			text = 'Unable to open the test file as a text stream.';
			break;
		case 'fileInformation':
			text = 'File Information';
			break;
		case 'readPermissionDenied':
			text = 'Permission to read the image was denied.';
			break;
		case 'unableOpenRemoteFile':
			text = 'Unable to open the remote file.';
			break;
		case 'fileDoesntExist':
			text = 'File does not exist.';
			break;
		case 'unableOpenLocalFile':
			text = 'Unable to open the local file.';
			break;
		case 'unableOpenImageFile':
			text = 'Unable to open the image file as a text stream.';
			break;
		case 'exifTooSmall':
			text = 'Exif data length too small.';
			break;
		case 'ifdLengthError':
			text = 'Length of an IFD entry error.';
			break;
		case 'invalidByteOrder':
			text = 'Invalid byte order.';
			break;
		case 'invalidTagMark':
			text = 'Invalid tag mark.';
			break;
		case 'invalidIFD0Offset':
			text = 'Invalid offset to IFD0.';
			break;
		case 'parsingIFD0':
			text = '* * * Parsing the IFD0 data * * *';
			break;
		case 'parseIFDerrorIFD0':
			text = 'Error in parseIFD() for IFD0.';
			break;
		case 'parsingSubIFD':
			text = '* * * Parsing the Exif SubIFD data * * *';
			break;
		case 'parseIFDerrorSubIFD':
			text = 'Error in parseIFD() for SubIFD.';
			break;
		case 'parsingIFD1':
			text = '* * * Parsing the IFD1 data * * *';
			break;
		case 'parseIFDerrorIFD1':
			text = 'Error in parseIFD() for IFD1.';
			break;
		case 'parsingInterop':
			text = '* * * Parsing the Interoperability IFD data * * *';
			break;
		case 'parseIFDerrorInterop':
			text = 'Error in parseIFD() for Interoperability IFD.';
			break;
		case 'parsingGPS':
			text = '* * * Parsing the GPS Information IFD data * * *';
			break;
		case 'parseIFDerrorGPS':
			text = 'Error in parseIFD() for GPS Information IFD.';
			break;
		case 'exifIFD0':
			text = 'Exif IFD0';
			break;
		case 'exifSubIFD':
			text = 'Exif Sub IFD';
			break;
		case 'exifIFD1':
			text = 'Exif IFD1';
			break;
		case 'exifInterop':
			text = 'Exif Interoperability IFD';
			break;
		case 'exifGPS':
			text = 'Exif GPS IFD';
			break;
		case 'offsetPointsOutside':
			text = 'Offset points beyond end of data segment.';
			break;
		case 'noDirectoryEntries':
			text = 'No directory entries found.';
			break;
		case 'ifdScanCompleted':
			text = 'IFD scan completed.';
			break;
		case 'invalidData':
			text = ' (invalid data)';
			break;
		case 'beyondEnd':
			text = 'Beyond end of data segment.';
			break;
		case 'noMoreDirectories':
			text = 'No more directory entries.';
			break;
		case 'onlineMappingLinks':
			text = 'Links to online mapping websites:';
			break;
		case 'noDivSpecified':
			text = 'No DIV specified:';
			break;
		case 'unableDisplayText':
			text = '(unable to display the specified text)';
			break;
		case 'google':
			text = 'Google&#8482; Maps';
			break;
		case 'yahoo':
			text = 'Yahoo!&reg; Maps';
			break;
		case 'msn':
			text = 'Bing Maps';	// 'MSN&reg; Maps &amp; Directions';
			break;
		case 'mapquest':
			text = 'Mapquest&reg;';
			break;
		case 'n/a (0)':
			text = 'n/a (0)';
			break;
		case 'unsigned byte (1)':
			text = 'unsigned byte (1)';
			break;
		case 'ascii string (2)':
			text = 'ascii string (2)';
			break;
		case 'unsigned short (3)':
			text = 'unsigned short (3)';
			break;
		case 'unsigned long (4)':
			text = 'unsigned long (4)';
			break;
		case 'unsigned rational (5)':
			text = 'unsigned rational (5)';
			break;
		case 'signed byte (6)':
			text = 'signed byte (6)';
			break;
		case 'undefined (7)':
			text = 'undefined (7)';
			break;
		case 'signed short (8)':
			text = 'signed short (8)';
			break;
		case 'signed long (9)':
			text = 'signed long (9)';
			break;
		case 'signed rational (10)':
			text = 'signed rational (10)';
			break;
		case 'single float (11)':
			text = 'single float (11)';
			break;
		case 'double float (12)':
			text = 'double float (12)';
			break;
		case 'other':
			text = 'other';
			break;
		case 'processingRemoteURL':
			text = 'Processing remote URL...';
			break;
		case 'processingLocalFile':
			text = 'Processing local file...';
			break;
		case 'networkError':
			text = 'A network error was encountered. Please check your connection to the Internet.';
			break;
		case 'errorNotification':
			text = 'An unrecoverable error was encountered while processing the specified file. I would appreciate it if you could email the image link and a copy of the next popup alert to me at araskin@allstream.net so that I can fix the problem.';
			break;
		case 'done':
			text = 'Done!';
			break;
		case 'selectFile':
			text = 'Select a File';
			break;
		case 'jpegFiles':
			text = 'JPEG Files';
			break;
		case 'jpegExtensions':
			text = '*.jpeg; *.jpg; *.jpe';
			break;
		case 'north latitude':
			text = 'north latitude';
			break;
		case 'south latitude':
			text = 'south latitude';
			break;
		case 'east longitude':
			text = 'east longitude';
			break;
		case 'west longitude':
			text = 'west longitude';
			break;
		case 'sea level (0)':
			text = 'sea level (0)';
			break;
		case 'sea level reference (1)':
			text = 'sea level reference (1)';
			break;
		case 'measurement in progress':
			text = 'measurement in progress';
			break;
		case 'measurement interoperability':
			text = 'measurement interoperability';
			break;
		case '2-dimensional (2)':
			text = '2-dimensional (2)';
			break;
		case '3-dimensional (3)':
			text = '3-dimensional (3)';
			break;
		case 'kilometers per hour':
			text = 'kilometers per hour';
			break;
		case 'miles per hour':
			text = 'miles per hour';
			break;
		case 'knots':
			text = 'knots';
			break;
		case 'true direction':
			text = 'true direction';
			break;
		case 'magnetic direction':
			text = 'magnetic direction';
			break;
		case 'kilometers':
			text = 'kilometers';
			break;
		case 'miles':
			text = 'miles';
			break;
		case 'no differential correction (0)':
			text = 'no differential correction (0)';
			break;
		case 'differential correction applied (1)':
			text = 'differential correction applied (1)';
			break;
		case 'uncompressed (1)':
			text = 'uncompressed (1)';
			break;
		case 'n/a (2)':
			text = 'n/a (2)';
			break;
		case 'n/a (3)':
			text = 'n/a (3)';
			break;
		case 'n/a (4)':
			text = 'n/a (4)';
			break;
		case 'n/a (5)':
			text = 'n/a (5)';
			break;
		case 'JPEG compression (6)':
			text = 'JPEG compression (6)';
			break;
		case 'n/a (1)':
			text = 'n/a (1)';
			break;
		case 'RGB (2)':
			text = 'RGB (2)';
			break;
		case 'YCbCr (6)':
			text = 'YCbCr (6)';
			break;
		case 'undefined (0)':
			text = 'undefined (0)';
			break;
		case 'normal (1)':
			text = 'normal (1)';
			break;
		case 'flipped horizontal (2)':
			text = 'flipped horizontal (2)';
			break;
		case 'rotated 180° (3)':
			text = 'rotated 180° (3)';
			break;
		case 'flipped vertical (4)':
			text = 'flipped vertical (4)';
			break;
		case 'transposed (5)':
			text = 'transposed (5)';
			break;
		case 'rotated 90° (6)':
			text = 'rotated 90° (6)';
			break;
		case 'transversed (7)':
			text = 'transversed (7)';
			break;
		case 'rotated 270° (8)':
			text = 'rotated 270° (8)';
			break;
		case '(invalid value)':
			text = '(invalid value)';
			break;
		case 'chunky format (1)':
			text = 'chunky format (1)';
			break;
		case 'planar format (2)':
			text = 'planar format (2)';
			break;
		case 'none (1)':
			text = 'none (1)';
			break;
		case 'inch (2)':
			text = 'inch (2)';
			break;
		case 'cm (3)':
			text = 'cm (3)';
			break;
		case 'centered / center of pixel array (1)':
			text = 'centered / center of pixel array (1)';
			break;
		case 'co-sited / datum point (2)':
			text = 'co-sited / datum point (2)';
			break;
		case 'manual control (1)':
			text = 'manual control (1)';
			break;
		case 'normal program (2)':
			text = 'normal program (2)';
			break;
		case 'aperture priority (3)':
			text = 'aperture priority (3)';
			break;
		case 'shutter priority (4)':
			text = 'shutter priority (4)';
			break;
		case 'creative program (slow program, depth of field) (5)':
			text = 'creative program (slow program, depth of field) (5)';
			break;
		case 'action program (high-speed program, fast shutter speed) (6)':
			text = 'action program (high-speed program, fast shutter speed) (6)';
			break;
		case 'portrait mode (7)':
			text = 'portrait mode (7)';
			break;
		case 'landscape mode (8)':
			text = 'landscape mode (8)';
			break;
		case 'standard output sensitivity (1)':
			text = 'standard output sensitivity (1)';
			break;
		case 'recommended exposure index (2)':
			text = 'recommended exposure index (2)';
			break;
		case 'ISO speed (3)':
			text = 'ISO speed (3)';
			break;
		case 'SOS and REI (4)':
			text = 'SOS and REI (4)';
			break;
		case 'SOS and ISO speed (5)':
			text = 'SOS and ISO speed (5)';
			break;
		case 'REI and ISO speed (6)':
			text = 'REI and ISO speed (6)';
			break;
		case 'SOS, REI and ISO speed (7)':
			text = 'SOS, REI and ISO speed (7)';
			break;
		case 'unknown (0)':
			text = 'unknown (0)';
			break;
		case 'average (1)':
			text = 'average (1)';
			break;
		case 'center weighted average (2)':
			text = 'center weighted average (2) ';
			break;
		case 'spot (3)':
			text = 'spot (3)';
			break;
		case 'multi-spot (4)':
			text = 'multi-spot (4)';
			break;
		case 'pattern / multi-segment (5)':
			text = 'pattern / multi-segment (5)';
			break;
		case 'partial (6)':
			text = 'partial (6)';
			break;
		case 'other (255)':
			text = 'other (255)';
			break;
		case 'n/a':
			text = 'n/a';
			break;
		case 'daylight (1)':
			text = 'daylight (1)';
			break;
		case 'fluorescent (2)':
			text = 'fluorescent (2) ';
			break;
		case 'tungsten / incandescent (3)':
			text = 'tungsten / incandescent (3)';
			break;
		case 'flash (4)':
			text = 'flash (4)';
			break;
		case 'n/a (6)':
			text = 'n/a (6)';
			break;
		case 'n/a (7)':
			text = 'n/a (7)';
			break;
		case 'n/a (8)':
			text = 'n/a (8)';
			break;
		case 'fine weather (9)':
			text = 'fine weather (9)';
			break;
		case 'cloudy weather (10)':
			text = 'cloudy weather (10)';
			break;
		case 'shade (11)':
			text = 'shade (11)';
			break;
		case 'daylight fluorescent (12)':
			text = 'daylight fluorescent (12)';
			break;
		case 'day white fluorescent (13)':
			text = 'day white fluorescent (13)';
			break;
		case 'cool white fluorescent (14)':
			text = 'cool white fluorescent (14)';
			break;
		case 'white fluorescent (15)':
			text = 'white fluorescent (15)';
			break;
		case 'warm white fluorescent (16)':
			text = 'warm white fluorescent (16)';
			break;
		case 'standard light A (17)':
			text = 'standard light A (17)';
			break;
		case 'standard light B (18)':
			text = 'standard light B (18)';
			break;
		case 'standard light C (19)':
			text = 'standard light C (19)';
			break;
		case 'D55 (20)':
			text = 'D55 (20)';
			break;
		case 'D65 (21)':
			text = 'D65 (21)';
			break;
		case 'D75 (22)':
			text = 'D75 (22)';
			break;
		case 'D50 (23)':
			text = 'D50 (23)';
			break;
		case 'ISO studio tungsten (24)':
			text = 'ISO studio tungsten (24)';
			break;
		case 'flash00':
			text = 'Flash did not fire';
			break;
		case 'flash01':
			text = 'Flash fired';
			break;
		case 'flash05':
			text = 'Strobe return light not detected ';
			break;
		case 'flash07':
			text = 'Strobe return light detected';
			break;
		case 'flash09':
			text = 'Flash fired, compulsory flash mode';
			break;
		case 'flash0D':
			text = 'Flash fired, compulsory flash mode, return light not detected ';
			break;
		case 'flash0F':
			text = 'Flash fired, compulsory flash mode, return light detected ';
			break;
		case 'flash10':
			text = 'Flash did not fire, compulsory flash mode ';
			break;
		case 'flash18':
			text = 'Flash did not fire, auto mode';
			break;
		case 'flash19':
			text = 'Flash fired, auto mode';
			break;
		case 'flash1D':
			text = 'Flash fired, auto mode, return light not detected ';
			break;
		case 'flash1F':
			text = 'Flash fired, auto mode, return light detected ';
			break;
		case 'flash20':
			text = 'No flash function';
			break;
		case 'flash41':
			text = 'Flash fired, red-eye reduction mode';
			break;
		case 'flash45':
			text = 'Flash fired, red-eye reduction mode, return light not detected';
			break;
		case 'flash47':
			text = 'Flash fired, red-eye reduction mode, return light detected';
			break;
		case 'flash49':
			text = 'Flash fired, compulsory flash mode, red-eye reduction mode';
			break;
		case 'flash4D':
			text = 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected ';
			break;
		case 'flash4F':
			text = 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected ';
			break;
		case 'flash59':
			text = 'Flash fired, auto mode, red-eye reduction mode';
			break;
		case 'flash5D':
			text = 'Flash fired, auto mode, return light not detected, red-eye reduction mode ';
			break;
		case 'flash5F':
			text = 'Flash fired, auto mode, return light detected, red-eye reduction mode 				';
			break;
		case 'flashFF':
			text = 'other (255)';
			break;
		case 'x/y coordinates of main subject (2)':
			text = 'x/y coordinates of main subject (2)';
			break;
		case 'x/y coordinates of center and radius of circle (3)':
			text = 'x/y coordinates of center and radius of circle (3)';
			break;
		case 'x/y coordinates of center and width/height of rectangle (4)':
			text = 'x/y coordinates of center and width/height of rectangle (4)';
			break;
		case 'unknown':
			text = 'unknown';
			break;
		case 'ASCII':
			text = 'ASCII';
			break;
		case 'JIS':
			text = 'JIS';
			break;
		case 'Unicode':
			text = 'Unicode';
			break;
		case 'not defined':
			text = 'not defined';
			break;
		case 'sRGB (1)':
			text = 'sRGB (1)';
			break;
		case 'uncalibrated (255)':
			text = 'uncalibrated (255)';
			break;
		case 'uncalibrated (65535)':
			text = 'uncalibrated (65535)';
			break;
		case 'centimeter (3)':
			text = 'centimeter (3)';
			break;
		case 'one-chip color area sensor (2)':
			text = 'one-chip color area sensor (2)';
			break;
		case 'two-chip color area sensor (3)':
			text = 'two-chip color area sensor (3)';
			break;
		case 'three-chip color area sensor (4)':
			text = 'three-chip color area sensor (4)';
			break;
		case 'color sequential area sensor (5)':
			text = 'color sequential area sensor (5)';
			break;
		case 'trilinear sensor (7)':
			text = 'trilinear sensor (7)';
			break;
		case 'color sequential linear sensor (8)':
			text = 'color sequential linear sensor (8)';
			break;
		case 'transmitting scanner (1)':
			text = 'transmitting scanner (1)';
			break;
		case 'reflecting scanner (2)':
			text = 'reflecting scanner (2)';
			break;
		case 'digital still camera (DSC) (3)':
			text = 'digital still camera (DSC) (3)';
			break;
		case 'directly photographed image':
			text = 'directly photographed image';
			break;
		case 'normal process (0)':
			text = 'normal process (0)';
			break;
		case 'custom process (1)':
			text = 'custom process (1)';
			break;
		case 'auto exposure (0)':
			text = 'auto exposure (0)';
			break;
		case 'manual exposure (1)':
			text = 'manual exposure (1)';
			break;
		case 'auto bracket (2)':
			text = 'auto bracket (2)';
			break;
		case 'auto (0)':
			text = 'auto (0)';
			break;
		case 'manual (1)':
			text = 'manual (1)';
			break;
		case 'standard (0)':
			text = 'standard (0)';
			break;
		case 'landscape (1)':
			text = 'landscape (1)';
			break;
		case 'portrait (2)':
			text = 'portrait (2)';
			break;
		case 'night scene (3)':
			text = 'night scene (3)';
			break;
		case 'low gain up (1)':
			text = 'low gain up (1)';
			break;
		case 'high gain up (2)':
			text = 'high gain up (2)';
			break;
		case 'low gain down (3)':
			text = 'low gain down (3)';
			break;
		case 'high gain down (4)':
			text = 'high gain down (4)';
			break;
		case 'normal (0)':
			text = 'normal (0)';
			break;
		case 'soft (1)':
			text = 'soft (1)';
			break;
		case 'hard (2)':
			text = 'hard (2)';
			break;
		case 'low (1)':
			text = 'low (1)';
			break;
		case 'high (2)':
			text = 'high (2)';
			break;
		case 'macro (1)':
			text = 'macro (1)';
			break;
		case 'close view (2)':
			text = 'close view (2)';
			break;
		case 'distant view (3)':
			text = 'distant view (3)';
			break;
		case 'lengthError':
			text = '(length error in IPTC data)';
			break;
		case 'noIPTCdata':
			text = '(no IPTC data was found)';
			break;
		case 'IPTC':
			text = 'IPTC';
			break;
		case 'IPTCcore':
			text = 'IPTC Core (Adobe XMP)';
			break;
		case 'noIPTCCoredata':
			text = 'No IPTC Core data was found';
			break;
//		case 'noIPTCdata':
//			text = 'No IPTC data was found';
//			break;
		case 'EndOfAPPx':
			text = 'End of APPx data blocks reached.';
			break;
		case 'expandAll':
			text = 'Expand All';
			break;
		case 'collapseAll':
			text = 'Collapse All';
			break;
		case 'showHideSource ':
			text = ' Show/Hide XMP Source';
			break;
		case 'showHideLegend ':
			text = ' Show/Hide XMP Legend';
			break;
		case 'pixels':
			text = 'pixels';
			break;
		case 'inches':
			text = 'inches';
			break;
		case 'cms':
			text = 'cms';
			break;
		default:
			text = key;
			break;
	}
	return text;
}	// getPString()

AlanSRaskin.ExifViewer.Moz.getFormattedPString = function (key, inserts) {
	var text = '';
	switch (key) {
		case 'testString2':
			text = '%1$S Goodbye %2$S';
			break;
		case 'badJpegFile':
			text = 'Bad JPEG file head, SOI marker not found: 0x%1$S 0x%2$S';
			break;
		case 'skippingAPPx':
			text = 'Skipping APPx (0x%1$S) block.';
			break;
		case 'appx':
			text = 'APPx (0x%1$S) Length = %2$S';
			break;
		case 'badJpegHead':
			text = 'Bad JPEG file head, APP1 (Exif) marker not found: 0x%1$S 0x%2$S';
			break;
		case 'app1':
			text = 'APP1 Length = %1$S';
			break;
		case 'exifNotDetected':
			text = 'Exif string not detected: 0x%1$S 0x%2$S 0x%3$S 0x%4$S 0x%5$S 0x%6$S';
			break;
		case 'endian':
			text = 'Endian = %1$S';
			break;
		case 'ifdScan':
			text = 'IFD scan starting: %1$S';
			break;
		case 'numberOfTags':
			text = '%1$S directory entries (tags) found.';
			break;
		case 'ifd1Offset':
			text = 'IFD1 offset = %1$S';
			break;
		case 'tagNumber':
			text = 'Tag number 0x%1$S detected.';
			break;
		case 'tagFormat':
			text = 'Tag format = %1$S (%2$S)';
			break;
		case 'tagCount':
			text = 'Tag count = %1$S';
			break;
		case 'tagData':
			text = 'Tag data = %1$S';
			break;
		case 'status':
			text = 'Status = %1$S';
			break;
		case 'invalidGPStag':
			text = '? (0x%1$S) = %2$S';
			break;
		case 'unknownTag':
			text = 'Unknown tag: Tagnum = 0x%1$S  ===>  data = %2$S';
			break;
		case 'x00':
			text = 'GPS Version ID = %1$S';
			break;
		case 'x01':
			text = 'GPS Latitude Reference = %1$S';
			break;
		case 'x02':
			text = 'GPS Latitude = %1$S [degrees, minutes, seconds] ===> %2$S';
			break;
		case 'x03':
			text = 'GPS Longitude Reference = %1$S';
			break;
		case 'x04':
			text = 'GPS Longitude  = %1$S [degrees, minutes, seconds] ===> %2$S';
			break;
		case 'x05':
			text = 'GPS Altitude Reference  = %1$S';
			break;
		case 'x06':
			text = 'GPS Altitude  = %1$S m = %2$S m';
			break;
		case 'x07':
			text = 'GPS Time Stamp / UTC Time = %1$S [hours, minutes, seconds] ===> %2$S';
			break;
		case 'x08':
			text = 'GPS Satellites = %1$S';
			break;
		case 'x09':
			text = 'GPS Status = %1$S';
			break;
		case 'x0A':
			text = 'GPS Measure Mode = %1$S';
			break;
		case 'x0B':
			text = 'GPS Data Degree of Precision (DOP) = %1$S';
			break;
		case 'x0C':
			text = 'GPS Speed Reference  = %1$S';
			break;
		case 'x0D':
			text = 'GPS Speed = %1$S = %2$S';
			break;
		case 'x0E':
			text = 'GPS Track Reference = %1$S';
			break;
		case 'x0F':
			text = 'GPS Track Direction = %1$S degrees';
			break;
		case 'x10':
			text = 'GPS Image Direction Reference = %1$S';
			break;
		case 'x11':
			text = 'GPS Image Direction = %1$S degrees';
			break;
		case 'x12':
			text = 'GPS Map Datum = %1$S';
			break;
		case 'x13':
			text = 'GPS Destination Latitude Reference  = %1$S';
			break;
		case 'x14':
			text = 'GPS Destination Latitude  = %1$S [degrees, minutes, seconds] ===> %2$S';
			break;
		case 'x15':
			text = 'GPS Destination Longitude Reference  = %1$S';
			break;
		case 'x16':
			text = 'GPS Destination Longitude  = %1$S [degrees, minutes, seconds] ===> %2$S';
			break;
		case 'x17':
			text = 'GPS Destination Bearing Reference  = %1$S';
			break;
		case 'x18':
			text = 'GPS Destination Bearing  = %1$S degrees';
			break;
		case 'x19':
			text = 'GPS Destination Distance Reference = %1$S';
			break;
		case 'x1A':
			text = 'GPS Destination Distance = %1$S';
			break;
		case 'x1B':
			text = 'GPS Processing Method = %1$S';
			break;
		case 'x1C':
			text = 'GPS Area Information  = %1$S';
			break;
		case 'x1D':
			text = 'GPS Date Stamp = %1$S UTC';
			break;
		case 'x1E':
			text = 'GPS Differential = %1$S';
			break;
		case 'x1F':
			text = 'GPS Horizontial Positioning Error = %1$S';
			break;
		case 'x0001':
			text = 'Interoperability Index = %1$S';
			break;
		case 'x0002':
			text = 'Interoperability Version = %1$S';
			break;
		case 'x00FE':
			text = 'New Subfile Type = %1$S';
			break;
		case 'x00FF':
			text = 'Subfile Type = %1$S';
			break;
		case 'x0100':
			text = 'Image Width = %1$S pixels';
			break;
		case 'x0101':
			text = 'Image Length = %1$S pixels';
			break;
		case 'x0102':
			text = 'Bits Per Sample  = %1$S';
			break;
		case 'x0103':
			text = 'Compression = %1$S';
			break;
		case 'x0106':
			text = 'Photometric Interpretation  = %1$S';
			break;
		case 'x010E':
			text = 'Image Description = %1$S';
			break;
		case 'x010F':
			text = 'Camera Make = %1$S';
			break;
		case 'x0110':
			text = 'Camera Model = %1$S';
			break;
		case 'x0111':
			text = 'Strip Offsets = %1$S';
			break;
		case 'x0112':
			text = 'Picture Orientation = %1$S';
			break;
		case 'x0115':
			text = 'Samples Per Pixel  = %1$S';
			break;
		case 'x0116':
			text = 'Rows Per Strip  = %1$S';
			break;
		case 'x0117':
			text = 'Strip Byte Counts  = %1$S';
			break;
		case 'x011A':
			text = 'X-Resolution = %1$S = %2$S';
			break;
		case 'x011B':
			text = 'Y-Resolution = %1$S = %2$S';
			break;
		case 'x011C':
			text = 'Planar Configuration = %1$S';
			break;
		case 'x0128':
			text = 'X/Y-Resolution Unit = %1$S';
			break;
		case 'x012D':
			text = 'Transfer Function = %1$S';
			break;
		case 'x0131':
			text = 'Software/Firmware Version = %1$S';
			break;
		case 'x0132':
			text = 'Last Modified Date/Time = %1$S';
			break;
		case 'x013B':
			text = 'Artist = %1$S';
			break;
		case 'x013C':
			text = 'Host Computer = %1$S';
			break;
		case 'x013D':
			text = 'Predictor = %1$S';
			break;
		case 'x013E':
			text = 'White Point Chromaticity = %1$S = %2$S';
			break;
		case 'x013F':
			text = 'Primary Chromaticities = %1$S = %2$S';
			break;
		case 'x0140':
			text = 'Color MAP = %1$S';
			break;
		case 'x0142':
			text = 'Tile Width = %1$S';
			break;
		case 'x0143':
			text = 'Tile Length = %1$S';
			break;
		case 'x0144':
			text = 'Tile Offsets = %1$S';
			break;
		case 'x0145':
			text = 'Tile Byte Counts = %1$S';
			break;
		case 'x014A':
			text = 'Sub IFDs = %1$S';
			break;
		case 'x015B':
			text = 'JPEG Tables = %1$S';
			break;
		case 'x0201':
			text = 'Offset to the start byte (SOI) of JPEG compressed thumbnail data = %1$S';
			break;
		case 'x0202':
			text = 'JPEG Interchange Format Length = %1$S';
			break;
		case 'x0211':
			text = 'Y/Cb/Cr Coefficients = %1$S = %2$S';
			break;
		case 'x0212':
			text = 'YCbCrSubSampling  = %1$S';
			break;
		case 'x0213':
			text = 'Y/Cb/Cr Positioning (Subsampling) = %1$S';
			break;
		case 'x0214':
			text = 'Reference Value of Black/White Point = %1$S';
			break;
		case 'x1000':
			text = 'Related Image File Format = %1$S';
			break;
		case 'x1001':
			text = 'Related Image Width = %1$S';
			break;
		case 'x1002':
			text = 'Related Image Length = %1$S';
			break;
		case 'x828D':
			text = 'CFA Repeat Pattern Dimension = %1$S';
			break;
		case 'x828E':
			text = 'CFA Pattern = %1$S';
			break;
		case 'x828F':
			text = 'Battery Level = %1$S';
			break;
		case 'x8298':
			text = 'Copyright Owner = %1$S';
			break;
		case 'x829A':
			text = 'Exposure Time (1 / Shutter Speed) = %1$S second = %2$S second';
			break;
		case 'y829A':
			text = 'Exposure Time (1 / Shutter Speed) = %1$S second = 1/%2$S second = %3$S second';
			break;
		case 'x829D':
			text = 'Lens F-Number/F-Stop = %1$S = F%2$S';
			break;
		case 'x83BB':
			text = 'IPTC/NAA = %1$S';
			break;
		case 'x8773':
			text = 'Inter Color Profile = %1$S';
			break;
		case 'x8822':
			text = 'Exposure Program = %1$S';
			break;
		case 'x8824':
			text = 'Spectral Sensitivity = %1$S';
			break;
		case 'x8827':
			text = 'ISO Speed Ratings = %1$S';
			break;
		case 'x8828':
			text = 'Opto-Electric Conversion Function (OECF) = %1$S';
			break;
		case 'x8829':
			text = 'Interlace = %1$S';
			break;
		case 'x882A':
			text = 'Time Zone Offset = %1$S';
			break;
		case 'x882B':
			text = 'Self Timer Mode = %1$S';
			break;
		case 'x8830':
			text = 'Sensitivity Type = %1$S';
			break;
		case 'x8831':
			text = 'Standard Output Sensitivity = %1$S';
			break;
		case 'x8832':
			text = 'Recommended Exposure Index = %1$S';
			break;
		case 'x8833':
			text = 'ISO Speed = %1$S';
			break;
		case 'x8834':
			text = 'ISO Speed Latitude yyy = %1$S';
			break;
		case 'x8835':
			text = 'ISO Speed Latitude zzz = %1$S';
			break;
		case 'x9000':
			text = 'Exif Version = %1$S';
			break;
		case 'x9003':
			text = 'Original Date/Time = %1$S';
			break;
		case 'x9004':
			text = 'Digitization Date/Time = %1$S';
			break;
		case 'x9101':
			text = 'Components Configuration = %1$S / %2$S';
			break;
		case 'x9102':
			text = 'Compressed Bits per Pixel = %1$S = %2$S';
			break;
		case 'x9201':
			text = 'Shutter Speed Value (APEX) = %1$S%2$SShutter Speed (Exposure Time) = 1/%3$S second';
			break;
		case 'x9202':
			text = 'Aperture Value (APEX) = %1$S%2$SAperture = F%3$S';
			break;
		case 'x9203':
			text = 'Brightness (APEX) = %1$S%2$SBrightness = %3$S foot-lambert';
			break;
		case 'x9204':
			text = 'Exposure Bias (EV) = %1$S = %2$S';
			break;
		case 'x9205':
			text = 'Max Aperture Value (APEX) = %1$S = %2$S%3$SMax Aperture = F%4$S';
			break;
		case 'x9206':
			text = 'Distance to Subject = %1$S m';
			break;
		case 'x9207':
			text = 'Metering Mode = %1$S';
			break;
		case 'x9208':
			text = 'Light Source / White Balance = %1$S';
			break;
		case 'x9209':
			text = 'Flash = %1$S';
			break;
		case 'x920A':
			text = 'Focal Length = %1$S mm = %2$S mm';
			break;
		case 'x920B':
			text = 'Flash/Strobe Energy = %1$S BCPS';
			break;
		case 'x920C':
			text = 'Spatial Frequency Response = %1$S';
			break;
		case 'x920D':
			text = 'Noise = %1$S';
			break;
		case 'x9211':
			text = 'Image Number = %1$S';
			break;
		case 'x9212':
			text = 'Security Classification = %1$S';
			break;
		case 'x9213':
			text = 'Image History = %1$S';
			break;
		case 'x9214_1':
			text = 'Subject Location = %1$S %2$S';
			break;
		case 'x9214_2':
			text = 'Subject Location = %1$S';
			break;
		case 'x9215':
			text = 'Exposure Index = %1$S';
			break;
		case 'x9216':
			text = 'TIFF/EP Standard ID = %1$S';
			break;
		case 'x927C':
			text = 'Maker Note = %1$S';
			break;
		case 'x9286_1':
			text = 'User Comment (Hex) = %1$S%2$SUser Comment Character Code = %3$S';
			break;
		case 'x9286_2':
			text = '%1$SUser Comment = %2$S';
			break;
		case 'x9290':
			text = 'Last Modified Subsecond Time = %1$S';
			break;
		case 'x9291':
			text = 'Original Subsecond Time = %1$S';
			break;
		case 'x9292':
			text = 'Digitized Subsecond Time = %1$S';
			break;
		case 'xA000':
			text = 'FlashPix Version = %1$S';
			break;
		case 'xA001':
			text = 'Colour Space = %1$S';
			break;
		case 'xA002':
			text = 'Image Width = %1$S';
			break;
		case 'xA003':
			text = 'Image Height = %1$S';
			break;
		case 'xA004':
			text = 'Related Sound File = %1$S';
			break;
		case 'xA20B':
			text = 'Flash/Strobe Energy = %1$S BCPS';
			break;
		case 'xA20C':
			text = 'Spatial Frequency Response = %1$S';
			break;
		case 'xA20E':
			text = 'Focal Plane X-Resolution = %1$S = %2$S';
			break;
		case 'xA20F':
			text = 'Focal Plane Y-Resolution = %1$S = %2$S';
			break;
		case 'xA210':
			text = 'Focal Plane X/Y-Resolution Unit = %1$S';
			break;
		case 'xA214':
			text = 'Subject Location = %1$S [x/y-coordinates]';
			break;
		case 'xA215':
			text = 'Exposure Index = %1$S';
			break;
		case 'xA217':
			text = 'Image Sensing Method = %1$S';
			break;
		case 'xA300':
			text = 'Image Source = %1$S';
			break;
		case 'xA301':
			text = 'Scene Type = %1$S';
			break;
		case 'xA302':
			text = 'Colour Filter Array (CFA) Geometric Pattern = %1$S';
			break;
		case 'xA401':
			text = 'Custom Rendered = %1$S';
			break;
		case 'xA402':
			text = 'Exposure Mode = %1$S';
			break;
		case 'xA403':
			text = 'White Balance = %1$S';
			break;
		case 'xA404':
			text = 'Digital Zoom Ratio = %1$S = %2$S';
			break;
		case 'xA405':
			text = 'Focal Length in 35mm Film = %1$S';
			break;
		case 'xA406':
			text = 'Scene Capture Type = %1$S';
			break;
		case 'xA407':
			text = 'Gain Control = %1$S';
			break;
		case 'xA408':
			text = 'Contrast = %1$S';
			break;
		case 'xA409':
			text = 'Saturation = %1$S';
			break;
		case 'xA40A':
			text = 'Sharpness = %1$S';
			break;
		case 'xA40B':
			text = 'Device Setting Description  = %1$S';
			break;
		case 'xA40C':
			text = 'Subject Distance Range = %1$S';
			break;
		case 'xA420':
			text = 'Image Unique ID = %1$S';
			break;
		case 'xA430':
			text = 'Camera Owner Name = %1$S';
			break;
		case 'xA431':
			text = 'Body Serial Number = %1$S';
			break;
		case 'xA432':
			text = 'Lens Specification = %1$S';
			break;
		case 'xA433':
			text = 'Lens Make = %1$S';
			break;
		case 'xA434':
			text = 'Lens Model = %1$S';
			break;
		case 'xA435':
			text = 'Lens Serial Number = %1$S';
			break;
		case 'xA500':
			text = 'Gamma = %1$S';
			break;
		case 'xC4A5_1':
			text = 'Print Image Matching = %1$S%2$Sversion = %3$S';
			break;
		case 'xC4A5_2':
			text = 'Print Image Matching = %1$S';
			break;
		case '1x0':
			text = 'Model Version = %1$S';
			break;
		case '1x5':
			text = 'Destination = %1$S';
			break;
		case '1x20':
			text = 'File Format = %1$S';
			break;
		case '1x22':
			text = 'File Format Version = %1$S';
			break;
		case '1x30':
			text = 'Service Identifier = %1$S';
			break;
		case '1x40':
			text = 'Envelope Number = %1$S';
			break;
		case '1x50':
			text = 'Product ID = %1$S';
			break;
		case '1x60':
			text = 'Envelope Priority = %1$S';
			break;
		case '1x70':
			text = 'Date Sent = %1$S';
			break;
		case '1x80':
			text = 'Time Sent = %1$S';
			break;
		case '1x90':
			text = 'Coded Character Set = %1$S';
			break;
		case '1x100':
			text = 'UNO (Unique Name of Object) = %1$S';
			break;
		case '1x120':
			text = 'ARM Identifier = %1$S';
			break;
		case '1x122':
			text = 'ARM Version = %1$S';
			break;
		case '2x0':
			text = 'Record Version = %1$S';
			break;
		case '2x3':
			text = 'Object Type Reference = %1$S';
			break;
		case '2x4':
			text = 'Object Attribute Reference = %1$S';
			break;
		case '2x5':
			text = 'Object Name = %1$S';
			break;
		case '2x7':
			text = 'Edit Status = %1$S';
			break;
		case '2x8':
			text = 'Editorial Update = %1$S';
			break;
		case '2x10':
			text = 'Urgency = %1$S';
			break;
		case '2x12':
			text = 'Subject Reference = %1$S';
			break;
		case '2x15':
			text = 'Category = %1$S';
			break;
		case '2x20':
			text = 'Supplemental Category = %1$S';
			break;
		case '2x22':
			text = 'Fixture Identifier = %1$S';
			break;
		case '2x25':
			text = 'Keywords = %1$S';
			break;
		case '2x26':
			text = 'Content Location Code = %1$S';
			break;
		case '2x27':
			text = 'Content Location Name = %1$S';
			break;
		case '2x30':
			text = 'Release Date = %1$S';
			break;
		case '2x35':
			text = 'Release Time = %1$S';
			break;
		case '2x37':
			text = 'Expiration Date = %1$S';
			break;
		case '2x38':
			text = 'Expiration Time = %1$S';
			break;
		case '2x40':
			text = 'Special Instructions = %1$S';
			break;
		case '2x42':
			text = 'Action Advised = %1$S';
			break;
		case '2x45':
			text = 'Reference Service = %1$S';
			break;
		case '2x47':
			text = 'Reference Date = %1$S';
			break;
		case '2x50':
			text = 'Reference Number = %1$S';
			break;
		case '2x55':
			text = 'Date Created = %1$S';
			break;
		case '2x60':
			text = 'Time Created = %1$S';
			break;
		case '2x62':
			text = 'Digital Creation Date = %1$S';
			break;
		case '2x63':
			text = 'Digital Creation Time = %1$S';
			break;
		case '2x65':
			text = 'Originating Program = %1$S';
			break;
		case '2x70':
			text = 'Program Version = %1$S';
			break;
		case '2x75':
			text = 'Object Cycle = %1$S';
			break;
		case '2x80':
			text = 'By-line = %1$S';
			break;
		case '2x85':
			text = 'By-line Title = %1$S';
			break;
		case '2x90':
			text = 'City = %1$S';
			break;
		case '2x92':
			text = 'Sublocation = %1$S';
			break;
		case '2x95':
			text = 'Province/State = %1$S';
			break;
		case '2x100':
			text = 'Country/Primary Location Code = %1$S';
			break;
		case '2x101':
			text = 'Country/Primary Location Name = %1$S';
			break;
		case '2x103':
			text = 'Original Transmission Reference = %1$S';
			break;
		case '2x105':
			text = 'Headline = %1$S';
			break;
		case '2x110':
			text = 'Credit = %1$S';
			break;
		case '2x115':
			text = 'Source = %1$S';
			break;
		case '2x116':
			text = 'Copyright Notice = %1$S';
			break;
		case '2x118':
			text = 'Contact = %1$S';
			break;
		case '2x120':
			text = 'Caption/Abstract = %1$S';
			break;
		case '2x122':
			text = 'Writer/Editor = %1$S';
			break;
		case '2x125':
			text = 'Rasterized Caption = %1$S';
			break;
		case '2x130':
			text = 'Image Type = %1$S';
			break;
		case '2x131':
			text = 'Image Orientation = %1$S';
			break;
		case '2x135':
			text = 'Language Identifier = %1$S';
			break;
		case '2x150':
			text = 'Audio Type = %1$S';
			break;
		case '2x151':
			text = 'Audio Sampling Rate (Hz) = %1$S';
			break;
		case '2x152':
			text = 'Audio Sampling Resolution (bits) = %1$S';
			break;
		case '2x153':
			text = 'Audio Duration = %1$S';
			break;
		case '2x154':
			text = 'Audio Outcue = %1$S';
			break;
		case '2x200':
			text = 'ObjectData Preview File Format = %1$S';
			break;
		case '2x201':
			text = 'ObjectData Preview File Format Version = %1$S';
			break;
		case '2x202':
			text = 'ObjectData Preview Data = %1$S';
			break;
		case '7x10':
			text = 'Size Mode = %1$S';
			break;
		case '7x20':
			text = 'Max Subfile Size = %1$S';
			break;
		case '7x90':
			text = 'ObjectData Size Announced = %1$S';
			break;
		case '7x95':
			text = 'Maximum ObjectData Size = %1$S';
			break;
		case '8x10':
			text = 'Subfile = %1$S';
			break;
		case '9x10':
			text = 'Confirmed ObjectData Size = %1$S';
			break;
		case 'unknownIPTC':
			text = 'Unknown IPTC record/dataset (%1$S) = %2$S';
			break;
		default:
			text = key;
			break;
	}
	return text.replace(/%(\d+)\$S/g, function(match, submatch, position, source) {return inserts[submatch - 1];});
}	// getFormattedPString()

