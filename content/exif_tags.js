if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.Tags)  AlanSRaskin.ExifViewer.Tags = {};

// Exif 2.2
AlanSRaskin.ExifViewer.Tags.getExifInterpretedTagData = function (tagnum, data, dtype, tagid) {
	var output = '';
			switch (tagnum) {
			case 0x0000:	// GPSVersionID (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x00', [data]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;			
			case 0x0001:	// InteroperabilityIndex (Iop IFD), GPSLatitudeRef (GPS IFD) 
				if (dtype == 'GPS') {
//					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x01', [data]);	// North or South latitude
					var GPSLatitudeRefs = {};
					GPSLatitudeRefs.N = 'north latitude';
					GPSLatitudeRefs.S = 'south latitude';
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x01', [AlanSRaskin.ExifViewer.Moz.getPString(GPSLatitudeRefs[data] || data)]);
				} else { 
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0001', [AlanSRaskin.ExifViewer.Base.cleanExifStringData(data)]);
				}
				break;
			case 0x0002:	// (Iop IFD?), GPSLatitude (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x02', [data , AlanSRaskin.ExifViewer.Base.formatLatLong(data, 5)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0002', [AlanSRaskin.ExifViewer.Base.cleanExifStringData(AlanSRaskin.ExifViewer.Base.bytesToString(data))]);
				}
				break;
			case 0x0003:	// GPSLongitudeRef (GPS IFD)
				if (dtype == 'GPS') {
//					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x03', [data]);	// East or West
					var GPSLongitudeRefs = {};
					GPSLongitudeRefs.E = 'east longitude';
					GPSLongitudeRefs.W = 'west longitude';
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x03', [AlanSRaskin.ExifViewer.Moz.getPString(GPSLongitudeRefs[data] || data)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0004:	// GPSLongitude (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x04', [data , AlanSRaskin.ExifViewer.Base.formatLatLong(data, 5)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0005:	// GPSAltitudeRef (GPS IFD)
				if (dtype == 'GPS') {
//					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x05', [(data == 0 ? 'sea level' : 'sea level reference (negative value)')]);
					var GPSAltitudeRefs = ['sea level (0)', 'sea level reference (1)'];
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x05', [AlanSRaskin.ExifViewer.Moz.getPString(GPSAltitudeRefs[data]  ||  data)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0006:	// GPSAltitude (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x06', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0007:	// GPSTimeStamp (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x07', [data , AlanSRaskin.ExifViewer.Base.formatTimestamp(data, 2)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0008:	// GPSSatellites (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x08', [data]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0009:	// GPSStatus (GPS IFD)
				if (dtype == 'GPS') {
					var GPSStatuses = new Object();
					GPSStatuses.A = 'measurement in progress';
					GPSStatuses.V = 'measurement interoperability';
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x09', [AlanSRaskin.ExifViewer.Moz.getPString(GPSStatuses[data])]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x000A:	// GPSMeasureMode (GPS IFD)
				if (dtype == 'GPS') {
					var GPSMeasureModes = ['n/a (0)', 'n/a (1)', '2-dimensional (2)', '3-dimensional (3)'];
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0A', [AlanSRaskin.ExifViewer.Moz.getPString(GPSMeasureModes[data])]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x000B:	// GPSDOP (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0B', [data]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x000C:	// GPSSpeedRef (GPS IFD)
				if (dtype == 'GPS') {
					var GPSSpeedRefs = new Object();
					GPSSpeedRefs.K = 'kilometers per hour';
					GPSSpeedRefs.M = 'miles per hour';
					GPSSpeedRefs.N = 'knots';
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0C', [AlanSRaskin.ExifViewer.Moz.getPString(GPSSpeedRefs[data])]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x000D:	// GPSSpeed (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0D', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x000E:	// GPSTrackRef (GPS IFD)
				if (dtype == 'GPS') {
					var GPSTrackRefs = new Object();
					GPSTrackRefs.T = 'true direction';
					GPSTrackRefs.M = 'magnetic direction';
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0E', [AlanSRaskin.ExifViewer.Moz.getPString(GPSTrackRefs[data])]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x000F:	// GPSTrack (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0F', [data]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0010:	// GPSImgDirectionRef (GPS IFD)
				if (dtype == 'GPS') {
					var GPSImgDirectionRefs = new Object();
					GPSImgDirectionRefs.T = 'true direction';
					GPSImgDirectionRefs.M = 'magnetic direction';
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x10', [AlanSRaskin.ExifViewer.Moz.getPString(GPSImgDirectionRefs[data])]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0011:	// GPSImgDirection (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x11', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0012:	// GPSMapDatum (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x12', [data]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0013:	// GPSDestLatitudeRef (GPS IFD)
				if (dtype == 'GPS') {
//					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x13', [data]);	// North or South
					var GPSDestLatitudeRefs = {};
					GPSDestLatitudeRefs.N = 'north latitude';
					GPSDestLatitudeRefs.S = 'south latitude';
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x13', [AlanSRaskin.ExifViewer.Moz.getPString(GPSDestLatitudeRefs[data] || data)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0014:	// GPSDestLatitude (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x14', [data , AlanSRaskin.ExifViewer.Base.formatLatLong(data, 5)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0015:	// GPSDestLongitudeRef (GPS IFD)
				if (dtype == 'GPS') {
//					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x15', [data]); // East or West
					var GPSDestLongitudeRefs = {};
					GPSDestLongitudeRefs.E = 'east longitude';
					GPSDestLongitudeRefs.W = 'west longitude';
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x15', [AlanSRaskin.ExifViewer.Moz.getPString(GPSDestLongitudeRefs[data])]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0016:	// GPSDestLongitude (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x16', [data , AlanSRaskin.ExifViewer.Base.formatLatLong(data, 5)]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0017:	// GPSDestBearingRef (GPS IFD)
				if (dtype == 'GPS') {
					var GPSDestBearingRefs = new Object();
					GPSDestBearingRefs.T = 'true direction';
					GPSDestBearingRefs.M = 'magnetic direction';
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x17', [AlanSRaskin.ExifViewer.Moz.getPString(GPSDestBearingRefs[data])]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0018:	// GPSDestBearing (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x18', [data]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x0019:	// GPSDestDistanceRef (GPS IFD)
				if (dtype == 'GPS') {
					var GPSDestDistanceRefs = new Object();
					GPSDestDistanceRefs.K = 'kilometers';
					GPSDestDistanceRefs.M = 'miles';
					GPSDestDistanceRefs.N = 'knots';
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x19', [AlanSRaskin.ExifViewer.Moz.getPString(GPSDestDistanceRefs[data])]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x001A:	// GPSDestDistance (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1A', [data]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x001B:	// GPSProcessingMethod (GPS IFD)
				if (dtype == 'GPS') {
//					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1B', [data]);
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1B', [String.fromCharCode.apply(String, data.split(','))]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x001C:	// GPSAreaInformation (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1C', [data]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x001D:	// GPSDateStamp (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1D', [data]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x001E:	// GPSDifferential (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1E', [(data == 0 ? AlanSRaskin.ExifViewer.Moz.getPString('no differential correction (0)') : AlanSRaskin.ExifViewer.Moz.getPString('differential correction applied (1)'))]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x001F:	// GPSHPositioningError (GPS IFD)
				if (dtype == 'GPS') {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1F', [data]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('invalidGPStag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				}
				break;
			case 0x00FE:	// (Iop IFD?)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x00FE', [data]);
				break; 	
			case 0x00FF:	// (Iop IFD?)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x00FF', [data]);
				break;
			case 0x0100:	// ImageWidth
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0100', [data]);
				break;
			case 0x0101:	// ImageLength
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0101', [data]);
				break;
			case 0x0102:	// BitsPerSample  
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0102', [data]);
				break;
			case 0x0103:	// Compression
				var Compressions = new Array('n/a (0)', 'uncompressed (1)', 'n/a (2)', 'n/a (3)', 'n/a (4)', 'n/a (5)', 'JPEG compression (6)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0103', [AlanSRaskin.ExifViewer.Moz.getPString(Compressions[data])]);
				break;
			case 0x0106:	// PhotometricInterpretation 
				var PhotometricInterpretations = new Array('n/a (0)', 'n/a (1)', 'RGB (2)', 'n/a (3)', 'n/a (4)', 'n/a (5)', 'YCbCr (6)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0106', [AlanSRaskin.ExifViewer.Moz.getPString(PhotometricInterpretations[data])]);
				break;
			case 0x010E:	// ImageDescription 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x010E', [data]);
				break;
			case 0x010F:	// Make
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x010F', [data]);
				break;
			case 0x0110:	// Model
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0110', [data]);
				break;
			case 0x0111:	// StripOffsets
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0111', [data]);
				break;
			case 0x0112:	// Orientation 
				var orientationFlags = new Array('undefined (0)', 'normal (1)', 'flipped horizontal (2)', 
								 'rotated 180&#176; (3)', 'flipped vertical (4)',
								 'transposed (5)', 'rotated 90&#176; (6)', 'transversed (7)',
								 'rotated 270&#176; (8)');   
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0112', [AlanSRaskin.ExifViewer.Moz.getPString(data >= 0 &&  data <= 8 ? orientationFlags[data] : '(invalid value)')]);
				break;
			case 0x0115:	// SamplesPerPixel 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0115', [data]);
				break;
			case 0x0116:	// RowsPerStrip 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0116', [data]);
				break;
			case 0x0117:	// StripByteCounts 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0117', [data]);
				break;
			case 0x011A:	// XResolution
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x011A', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				break;
			case 0x011B:	// YResolution
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x011B', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				break;
			case 0x011C:	// PlanarConfiguration
				var PlanarConfigurations = new Array('n/a (0)', 'chunky format (1)', 'planar format (2)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x011C', [AlanSRaskin.ExifViewer.Moz.getPString(PlanarConfigurations[data])]);
				break;
			case 0x0128:	// ResolutionUnit 
				var ResolutionUnits = new Array('n/a (0)', 'none (1)', 'inch (2)', 'cm (3)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0128', [AlanSRaskin.ExifViewer.Moz.getPString(ResolutionUnits[data])]);
				break;
			case 0x012D:	// TransferAlanSRaskin.ExifViewer.Tags.
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x012D', [data]);
				break; 	
			case 0x0131:	// Software
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0131', [data]);
				break;
			case 0x0132:	// DateTime
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0132', [data]);
				break;
			case 0x013B:	// Artist
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x013B', [data]);
				break;	
			case 0x013C:	// Host Computer
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x013C', [data]);
				break;	
			case 0x013D:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x013D', [data]);
				break; 	
			case 0x013E:	// WhitePoint 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x013E', [data , AlanSRaskin.ExifViewer.Base.formatRationals(data, 3)]);
				break;
			case 0x013F:	// PrimaryChromaticities
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x013F', [data , AlanSRaskin.ExifViewer.Base.formatRationals(data, 2)]);
				break;
			case 0x0140:	// Color MAP
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0140', [data]);
				break;	
			case 0x0142:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0142', [data]);
				break; 	
			case 0x0143:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0143', [data]);
				break; 	
			case 0x0144:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0144', [data]);
				break;	
			case 0x0145:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0145', [data]);
				break;	
			case 0x014A:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x014A', [data]);
				break;	
			case 0x015B:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x015B', [data]);
				break;	
			case 0x0201:	// JPEGInterchangeFormat 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0201', [data]);
				break;
			case 0x0202:	// JPEGInterchangeFormatLength
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0202', [data]);
				break;
			case 0x0211:	// YCbCrCoefficients 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0211', [data , AlanSRaskin.ExifViewer.Base.formatRationals(data, 3)]);
				break;
			case 0x0212:	// YCbCrSubSampling 
				// 2,1 = YCbCr4:2:2 
				// 2,2 = YCbCr4:2:0 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0212', [data]);
				break;
			case 0x0213:	// YCbCrPositioning
				var YCbCrPos = new Array('n/a (0)', 'centered / center of pixel array (1)', 'co-sited / datum point (2)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0213', [AlanSRaskin.ExifViewer.Moz.getPString(YCbCrPos[data])]);
				break;
			case 0x0214:	// ReferenceBlackWhite 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x0214', [data]);
				break;
			case 0x1000:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1000', [data]);
				break;
			case 0x1001:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1001', [data]);
				break;
			case 0x1002:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x1002', [data]);
				break;
			case 0x828D:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x828D', [data]);
				break; 	
			case 0x828E:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x828E', [data]);
				break;	
			case 0x828F:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x828F', [data]);
				break; 	
			case 0x8298:	// Copyright (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8298', [data]);
				break;
			case 0x829A:	// ExposureTime (Exif IFD)
				if (data  &&  data.split) {
    				var tmp = data.split('/');
    				var val;
    				if (tmp.length != 2  ||  tmp[0] == '1'  ||  (val = tmp[0] / tmp[1]) > 1) {
    					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x829A', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 5)]);
    				} else {
    					var data2 = AlanSRaskin.ExifViewer.Base.roundValue(1/val, 5); 
    					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('y829A', [data , data2, AlanSRaskin.ExifViewer.Base.formatRational(data, 5)]);
    				}
				} else {
   					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x829A', [data , '1/?']);
				}
				break;
			case 0x829D:	// FNumber (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x829D', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				break;
			case 0x83BB:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x83BB', [data]);
				break;	
			case 0x8773:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8773', [data]);
				break;	
			case 0x8822:	// ExposureProgram (Exif IFD)
				var ExpProgs = new Array('n/a (0)', 'manual control (1)', 'normal program (2)', 'aperture priority (3)', 
										 'shutter priority (4)', 'creative program (slow program, depth of field) (5)', 
										 'action program (high-speed program, fast shutter speed) (6)', 'portrait mode (7)', 
										 'landscape mode (8)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8822', [AlanSRaskin.ExifViewer.Moz.getPString(ExpProgs[data])]);
				break;
			case 0x8824:	// SpectralSensitivity (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8824', [data]);
				break;	
			case 0x8827:	// ISOSpeedRatings (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8827', [data]);
				break;
			case 0x8828:	// OECF (Exif IFD)
				// similar to 0xA302
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8828', [data]);
				break;	
			case 0x8829:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8829', [data]);
				break; 	
			case 0x8830:	// SensitivityType
				var SensTypes = new Array('unknown (0)', 'standard output sensitivity (1)', 'recommended exposure index (2)',
										 'ISO speed (3)', 'SOS and REI (4)', 'SOS and ISO speed (5)', 'REI and ISO speed (6)',
										 'SOS, REI and ISO speed (7)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8830', [AlanSRaskin.ExifViewer.Moz.getPString(SensTypes[data])]);
				break; 	
			case 0x8831:	// StandardOutputSensitivity
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8831', [data]);
				break; 	
			case 0x8832:	// RecommendedExposureIndex
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8832', [data]);
				break; 	
			case 0x8833:	// ISOSpeed
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8833', [data]);
				break; 	
			case 0x8834:	// ISOSpeedLatitudeyyy
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8834', [data]);
				break; 	
			case 0x8835:	// ISOSpeedLatitudezzz
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x8835', [data]);
				break; 	
			case 0x882A:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x882A', [data]);
				break; 	
			case 0x882B:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x882B', [data]);
				break; 	
			case 0x9000:	// ExifVersion (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9000', [AlanSRaskin.ExifViewer.Base.bytesToString(data)]);
				break;
			case 0x9003:	// DateTimeOriginal (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9003', [data]);
				break;
			case 0x9004:	// DateTimeDigitized (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9004', [data]);
				break;
			case 0x9101:	// ComponentsConfiguration (Exif IFD)
				if (typeof data == 'number') {
					var out = [];
					var tmp = data;
					while (tmp != 0) {
						out.push(AlanSRaskin.ExifViewer.Base.byteToHex(tmp % 256));
						tmp >>= 8;
					}
					data2 = out.join(',');
				} else {
					data2 = data
				}
				if (data2  &&  data2.replace) {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9101', [data ,
									data2.replace(/0x01/g, 'Y').replace(/0x02/g, 'Cb').replace(/0x03/g, 'Cr')
										 .replace(/0x04/g, 'R').replace(/0x05/g, 'G').replace(/0x06/g, 'B')
										 .replace(/0x00/g, '').replace(/,/g, '')]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9101', [data , '?']);
				}
				break;
			case 0x9102:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9102', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				break;
			case 0x9201:	// ShutterSpeedValue (Exif IFD)
				var tmp = data.split('/');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9201', [data , '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>' ,
						 			AlanSRaskin.ExifViewer.Base.roundValue(Math.pow(2, tmp[0]/tmp[1]), 2)]);
				break;
			case 0x9202:	// ApertureValue (Exif IFD)
				var tmp = data.split('/');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9202', [data , '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>' ,
						 			AlanSRaskin.ExifViewer.Base.roundValue(Math.pow(2, tmp[0]/tmp[1]/2), 2)]);
				break;
			case 0x9203:	// BrightnessValue (Exif IFD)
				var tmp = data.split('/');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9203', [data , '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>' ,
						 			AlanSRaskin.ExifViewer.Base.roundValue(Math.pow(2, tmp[0]/tmp[1]), 2)]);
				break;
			case 0x9204:	// ExposureBiasValue (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9204', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				break;
			case 0x9205:	// MaxApertureValue (Exif IFD)
				var tmp = data.split('/');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9205', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2) , '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>' ,
						 			AlanSRaskin.ExifViewer.Base.roundValue(Math.pow(2, tmp[0]/tmp[1]/2), 2)]);
				break;
			case 0x9206:	// SubjectDistance (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9206', [data]);
				break;
			case 0x9207:	// MeteringMode (Exif IFD)
				var MeteringModes = new Array('unknown (0)', 'average (1)', 'center weighted average (2)', 
									'spot (3)', 'multi-spot (4)', 'pattern / multi-segment (5)', 'partial (6)');
				MeteringModes[255] = 'other (255)';
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9207', [(MeteringModes[data] ? AlanSRaskin.ExifViewer.Moz.getPString(MeteringModes[data]) : AlanSRaskin.ExifViewer.Moz.getPString('n/a') + ' (' + data + ')')]);
				break;
			case 0x9208:	// LightSource (Exif IFD)
				var LightSources = new Array('unknown (0)', 'daylight (1)', 'fluorescent (2)', 
											 'tungsten / incandescent (3)', 'flash (4)',
											 'n/a (5)', 'n/a (6)', 'n/a (7)', 'n/a (8)', 
											 'fine weather (9)', 'cloudy weather (10)', 'shade(11)', 
											 'daylight fluorescent (12)', 'day white fluorescent (13)',
											 'cool white fluorescent (14)', 'white fluorescent (15)',
											 'warm white fluorescent (16)', 'standard light A (17)',
											 'standard light B (18)', 'standard light C (19)',
											 'D55 (20)', 'D65 (21)', 'D75 (22)', 'D50 (23)',
											 'ISO studio tungsten (24)');
				LightSources[255] = 'other (255)';
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9208', [(LightSources[data] ? AlanSRaskin.ExifViewer.Moz.getPString(LightSources[data]) : AlanSRaskin.ExifViewer.Moz.getPString('n/a') + ' (' + data + ')')]);
				break;
			case 0x9209:	// Flash (Exif IFD)
				var Flashes = [];
				Flashes[0x00] = 'flash00';				Flashes[0x01] = 'flash01';
				Flashes[0x05] = 'flash05';				Flashes[0x07] = 'flash07';
				Flashes[0x09] = 'flash09';				Flashes[0x0D] = 'flash0D';
				Flashes[0x0F] = 'flash0F';				Flashes[0x10] = 'flash10';
				Flashes[0x18] = 'flash18';				Flashes[0x19] = 'flash19';
				Flashes[0x1D] = 'flash1D';				Flashes[0x1F] = 'flash1F';
				Flashes[0x20] = 'flash20';				Flashes[0x41] = 'flash41';
				Flashes[0x45] = 'flash45';				Flashes[0x47] = 'flash47';
				Flashes[0x49] = 'flash49';				Flashes[0x4D] = 'flash4D';
				Flashes[0x4F] = 'flash4F';				Flashes[0x59] = 'flash59';
				Flashes[0x5D] = 'flash5D';				Flashes[0x5F] = 'flash5F';
				Flashes[0xFF] = 'flashFF';
//								'flash did not fire (0)', 'flash fired (1)', 'n/a (2)',
//								'n/a (3)', 'n/a (4)', 'flash fired but strobe return light not detected (5)', 
//								'n/a (6)', 'flash fired and strobe return light detected (7)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9209', [Flashes[data] ? AlanSRaskin.ExifViewer.Moz.getPString(Flashes[data]) : AlanSRaskin.ExifViewer.Moz.getPString('n/a') + ' (' + data + ')']);
				break;
			case 0x920A:	// FocalLength (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x920A', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				break;
			case 0x920B:	// FlashEnergy (Exif IFD) ???
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x920B', [data]);
				break; 	
			case 0x920C:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x920C', [data]);
				break;	
			case 0x920D:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x920D', [data]);
				break;	
			case 0x9211:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9211', [data]);
				break; 	
			case 0x9212:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9212', [data]);
				break; 	
			case 0x9213:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9213', [data]);
				break;	
			case 0x9214:	// SubjectArea (Exif IFD)
				if (data  &&  data.split) {
					var tmp = data.split(',');
					var Counts = new Array('n/a (0)', 'n/a (1)', 'x/y coordinates of main subject (2)',
								'x/y coordinates of center and radius of circle (3)', 
								'x/y coordinates of center and width/height of rectangle (4)');
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9214_1', [data , AlanSRaskin.ExifViewer.Moz.getPString(Counts[tmp.length])]);
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9214_2', [data ? data : AlanSRaskin.ExifViewer.Moz.getPString('n/a')]);
				}
				break; 	
			case 0x9215:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9215', [data]);
				break; 	
			case 0x9216:	// (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9216', [data]);
				break; 	
			case 0x927C:	// MakerNote (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x927C', [data]);
				break;
			case 0x9286:	// UserComment (Exif IFD)
				var char_code = 'unknown';
				if (data) {
					if (data.indexOf) {
						if (data.indexOf('0x41,0x53,0x43,0x49,0x49,0x00,0x00,0x00') == 0) {
							char_code = 'ASCII';
						} else if (data.indexOf('0x4a,0x49,0x53,0x00,0x00,0x00,0x00,0x00') == 0) {
							char_code = 'JIS';
						} else if (data.indexOf('0x55,0x4e,0x49,0x43,0x4f,0x44,0x45,0x00') == 0) {
							char_code = 'Unicode';
						} else if (data.indexOf('0x00,0x00,0x00,0x00,0x00,0x00,0x00,0x00') == 0) {
							char_code = 'not defined';
						}
					}
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9286_1', [data , '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>' , AlanSRaskin.ExifViewer.Moz.getPString(char_code)]);
					if (char_code == 'ASCII') {
						output += AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9286_2', ['<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>' , AlanSRaskin.ExifViewer.Base.bytesToString(data.substr(8*5))]);
					}
				}
				break;
			case 0x9290:	// SubsecTime (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9290', [data]);
				break;
			case 0x9291:	// SubsecTimeOriginal (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9291', [data]);
				break;
			case 0x9292:	// SubsecTimeDigitized (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9292', [data]);
				break;
			case 0xA000:	// FlashpixVersion (Exif IFD)
//			alert(data);
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA000', [AlanSRaskin.ExifViewer.Base.bytesToString(data)]);
//				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA000', [window.escape(data)]);
				break;
			case 0xA001:	// ColorSpace (Exif IFD)
				var ColorSpaces = new Array();
				ColorSpaces[-1] = 'uncalibrated (-1)';
				ColorSpaces[1] = 'sRGB (1)';
				ColorSpaces[255] = 'uncalibrated (255)';
				ColorSpaces[65535] = 'uncalibrated (65535)';
				ColorSpaces[4294967295] = 'uncalibrated (4294967295)';
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA001', [ColorSpaces[data] ? AlanSRaskin.ExifViewer.Moz.getPString(ColorSpaces[data]) : data]);
				break;
			case 0xA002:	// PixelXDimension (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA002', [data]);
				break;
			case 0xA003:	// PixelYDimension (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA003', [data]);
				break;
			case 0xA004:	// RelatedSoundFile (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA004', [data]);
				break;
			case 0xA20B:	// FlashEnergy (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA20B', [data]);
				break; 	
			case 0xA20C:	// SpatialFrequencyResponse (Exif IFD)
				// like 0xA302
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA20C', [data]);
				break; 	
			case 0xA20E:	// FocalPlaneXResolution (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA20E', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				break; 
			case 0xA20F:	// FocalPlaneYResolution (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA20F', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				break;
			case 0xA210:	// FocalPlaneResolutionUnit (Exif IFD)
				var FPUnits = new Array('n/a (0)', 'none (1)', 'inch (2)', 'centimeter (3)'); 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA210', [AlanSRaskin.ExifViewer.Moz.getPString(FPUnits[data])]);
				break;
			case 0xA214:	// SubjectLocation (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA214', [data]);
				break;
			case 0xA215:	// ExposureIndex (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA215', [data]);
				break;
			case 0xA217:	// SensingMethod (Exif IFD)
				var SensingMethods = new Array('n/a (0)', 'n/a (1)', 'one-chip color area sensor (2)',
									 'two-chip color area sensor (3)', 'three-chip color area sensor (4)',
									 'color sequential area sensor (5)', 'n/a', 'trilinear sensor (7)',
									 'color sequential linear sensor (8)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA217', [SensingMethods[data] ? AlanSRaskin.ExifViewer.Moz.getPString(SensingMethods[data]) : data]);
				break;
			case 0xA300:	// FileSource (Exif IFD)
//				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA300', [data == '0x03,0x00,0x00,0x00'  ||  data == '3' ? AlanSRaskin.ExifViewer.Moz.getPString('digital still camera (DSC)') : data]);
				var FileSources = ['other (0)', 'transmitting scanner (1)',
									 'reflecting scanner (2)', 'digital still camera (DSC) (3)'];
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA300', [FileSources[data] ? AlanSRaskin.ExifViewer.Moz.getPString(FileSources[data]) : data]);
				break;
			case 0xA301:	// SceneType (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA301', [data == '0x01,0x00,0x00,0x00'  ||  data == '1' ? AlanSRaskin.ExifViewer.Moz.getPString('directly photographed image') : data]);
				break;
			case 0xA302:	// CFAPattern (Exif IFD)
				// 1st 2 bytes = horizontal array length
				// 2nd 2 bytes = vertical array length
				// next bytes are the color values, row by row (123456 => Red/Green/Blue/Cyan/Magenta/Yellow/White)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA302', [data]);
				break;
			case 0xA401:	// CustomRendered (Exif IFD)
				var CustomRenders = new Array('normal process (0)', 'custom process (1)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA401', [AlanSRaskin.ExifViewer.Moz.getPString(CustomRenders[data])]);
				break;
			case 0xA402:	// ExposureMode (Exif IFD)
				var ExposureModes = new Array('auto exposure (0)', 'manual exposure (1)', 'auto bracket (2)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA402', [AlanSRaskin.ExifViewer.Moz.getPString(ExposureModes[data])]);
				break;
			case 0xA403:	// WhiteBalance (Exif IFD)
				var WhiteBalances = new Array('auto (0)', 'manual (1)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA403', [AlanSRaskin.ExifViewer.Moz.getPString(WhiteBalances[data])]);
				break; 
			case 0xA404:	// DigitalZoomRatio (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA404', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				break;
			case 0xA405:	// FocalLengthIn35mmFilm (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA405', [data]);
				break;
			case 0xA406:	// SceneCaptureType (Exif IFD)
				var SceneCaptureTypes = new Array('standard (0)', 'landscape (1)', 'portrait (2)', 'night scene (3)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA406', [AlanSRaskin.ExifViewer.Moz.getPString(SceneCaptureTypes[data])]);
				break;
			case 0xA407:	// GainControl (Exif IFD)
				var GainControls = new Array('n/a (0)', 'low gain up (1)', 'high gain up (2)', 
									'low gain down (3)', 'high gain down (4)');  
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA407', [AlanSRaskin.ExifViewer.Moz.getPString(GainControls[data])]);
				break;
			case 0xA408:	// Contrast (Exif IFD)
				var Contrasts = new Array('normal (0)', 'soft (1)', 'hard (2)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA408', [AlanSRaskin.ExifViewer.Moz.getPString(Contrasts[data])]);
				break;
			case 0xA409:	// Saturation (Exif IFD)
				var Saturations = new Array('normal (0)', 'low (1)', 'high (2)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA409', [AlanSRaskin.ExifViewer.Moz.getPString(Saturations[data])]);
				break;
			case 0xA40A:	// Sharpness (Exif IFD)
				var Sharpnesses = new Array('normal (0)', 'soft (1)', 'hard (2)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA40A', [AlanSRaskin.ExifViewer.Moz.getPString(Sharpnesses[data])]);
				break;
			case 0xA40B:	// DeviceSettingDescription (Exif IFD)
				// like 0xA302 
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA40B', [data]);
				break;
			case 0xA40C:	// SubjectDistanceRange (Exif IFD)
				var SubjectDistanceRanges = new Array('unknown (0)', 'macro (1)', 
						'close view (2)', 'distant view (3)');
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA40C', [AlanSRaskin.ExifViewer.Moz.getPString(SubjectDistanceRanges[data])]);
				break;
			case 0xA420:	// ImageUniqueID (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA420', [data]);
				break;
			case 0xA430:	// CameraOwnerName (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA430', [data]);
				break;
			case 0xA431:	// BodySerialNumber (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA431', [data]);
				break;
			case 0xA432:	// LensSpecification (Exif IFD)
				if(data) {
					var out = AlanSRaskin.ExifViewer.Base.formatRationals(data, 3);
					var tmp = out.split(',', 4);
					if(tmp.length == 4){
						output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA432', [tmp[0].replace(/\s+/g, "") + '-' + tmp[1].replace(/\s+/, "") + 'mm F' + tmp[2].replace(/\s+/, "") + '-' + tmp[3].replace(/\s+/g, "")]);
					} else {
						output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA432', [data]);
					}
				} else {
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA432', [data]);
				}
				break;
			case 0xA433:	// LensMaker (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA433', [data]);
				break;
			case 0xA434:	// LensModel (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA434', [data]);
				break;
			case 0xA435:	// LensSerialNumber (Exif IFD)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA435', [data]);
				break;
			case 0xA500:	// Gamma (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xA500', [data , AlanSRaskin.ExifViewer.Base.formatRational(data, 2)]);
				break;
			case 0xC4A5:	// Print Image Matching
				if (data) {
					var tmp = data.split('0x00', 2);
					if(tmp.length == 2){
						output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xC4A5_1', [String.fromCharCode.apply(String, tmp[0].replace(/^,|,$/g, "").split(',')) , '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'br' + AlanSRaskin.ExifViewer.Base.exifasr_xml1 + '>' , String.fromCharCode.apply(String, tmp[1].replace(/^,|,$/g, "").split(','))]);
					} else {
						output += AlanSRaskin.ExifViewer.Moz.getFormattedPString('xC4A5_2', [data]);
					}
				} else
					output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xC4A5_2', [data]);
				break;
			case 0x9C9B:	// Microsoft.XP.Title (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9C9B', [AlanSRaskin.ExifViewer.Base.bytesToString(data)]);
				break;
			case 0x9C9C:	// Microsoft.XP.Comment (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9C9C', [AlanSRaskin.ExifViewer.Base.bytesToString(data)]);
				break;
			case 0x9C9D:	// Microsoft.XP.Author (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9C9D', [AlanSRaskin.ExifViewer.Base.bytesToString(data)]);
				break;
			case 0x9C9E:	// Microsoft.XP.Keywords (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9C9E', [AlanSRaskin.ExifViewer.Base.bytesToString(data)]);
				break;
			case 0x9C9F:	// Microsoft.XP.Subject (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('x9C9F', [AlanSRaskin.ExifViewer.Base.bytesToString(data)]);
				break;
			case 0xEA1C:	// Microsoft.Padding (Not in Exif 2.2 specifications)
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('xEA1C', [AlanSRaskin.ExifViewer.Base.bytesToString(data)]);
				break;
			default:
				output = AlanSRaskin.ExifViewer.Moz.getFormattedPString('unknownTag', [AlanSRaskin.ExifViewer.Base.zeroPad(tagnum) , data]);
				break;
			}
	if (tagid) {
		var ids = tagnum.toString(16).toUpperCase();
		ids = '0000'.substr(0, (dtype == 'GPS' ? 2 : 4) - ids.length) + ids;
		output = output.replace(/=/, ' {0x' + ids + '} =');
	}
	return output; 
}	// getExifInterpretedTagData()

AlanSRaskin.ExifViewer.Tags.getExifTagNumber = function (text) {
	var exifTags = {
		"ImageWidth" : 					0x0100 ,
		"ImageLength" : 				0x0101 ,
		"BitsPerSample" : 				0x0102 ,
		"Compression" : 				0x0103 ,
		"PhotometricInterpretation" :	0x0106 ,
		"FillOrder" : 					0x010A ,
		"DocumentName" : 				0x010D ,
		"ImageDescription" : 			0x010E ,
		"Make" : 						0x010F ,
		"Model" : 						0x0110 ,
		"StripOffsets" : 				0x0111 ,
		"Orientation" : 				0x0112 ,
		"SamplesPerPixel" : 			0x0115 ,
		"RowsPerStrip" : 				0x0116 ,
		"StripByteCounts" : 			0x0117 ,
		"XResolution" : 				0x011A ,
		"YResolution" : 				0x011B ,
		"PlanarConfiguration" : 		0x011C ,
		"ResolutionUnit" : 				0x0128 ,
		"TransferFunction" : 			0x012D ,
		"Software" : 					0x0131 ,
		"DateTime" : 					0x0132 ,
		"Artist" : 						0x013B ,
		"HostComputer" : 				0x013C ,
		"WhitePoint" : 					0x013E ,
		"PrimaryChromaticities" : 		0x013F ,
		"ColorMAP" : 					0x0140 ,
		"TransferRange" : 				0x0156 ,
		"JPEGProc" : 					0x0200 ,
		"JPEGInterchangeFormat" : 		0x0201 ,
		"JPEGInterchangeFormatLength" : 0x0202 ,
		"YCbCrCoefficients" : 			0x0211 ,
		"YCbCrSubSampling" : 			0x0212 ,
		"YCbCrPositioning" : 			0x0213 ,
		"ReferenceBlackWhite" : 		0x0214 ,
		"BatteryLevel" : 				0x828F ,
		"Copyright" : 					0x8298 ,
		"ExposureTime" : 				0x829A ,
		"FNumber" : 					0x829D ,
		"IPTC/NAA" : 					0x83BB ,
		"ExifIFDPointer" : 				0x8769 ,
		"InterColorProfile" : 			0x8773 ,
		"ExposureProgram" : 			0x8822 ,
		"SpectralSensitivity" : 		0x8824 ,
		"GPSInfoIFDPointer" : 			0x8825 ,
		"ISOSpeedRatings" : 			0x8827 ,
		"OECF" : 						0x8828 ,
		"SensitivityType" : 			0x8830 ,
		"StandardOutputSensitivity" :	0x8831 ,
		"RecommendedExposureIndex" :	0x8832 ,
		"ISOSpeed" : 					0x8833 ,
		"ISOSpeedLatitudeyyy" : 		0x8834 ,
		"ISOSpeedLatitudezzz" : 		0x8835 ,
		"ExifVersion" : 				0x9000 ,
		"DateTimeOriginal" : 			0x9003 ,
		"DateTimeDigitized" : 			0x9004 ,
		"ComponentsConfiguration" : 	0x9101 ,
		"CompressedBitsPerPixel" : 		0x9102 ,
		"ShutterSpeedValue" : 			0x9201 ,
		"ApertureValue" : 				0x9202 ,
		"BrightnessValue" : 			0x9203 ,
		"ExposureBiasValue" : 			0x9204 ,
		"MaxApertureValue" : 			0x9205 ,
		"SubjectDistance" : 			0x9206 ,
		"MeteringMode" : 				0x9207 ,
		"LightSource" : 				0x9208 ,
		"Flash" : 						0x9209 ,
		"FocalLength" : 				0x920A ,
		"SubjectArea" : 				0x9214 ,
		"MakerNote" : 					0x927C ,
		"UserComment" : 				0x9286 ,
		"SubSecTime" : 					0x9290 ,
		"SubSecTimeOriginal" : 			0x9291 ,
		"SubSecTimeDigitized" : 		0x9292 ,
		"FlashpixVersion" : 			0xA000 ,
		"ColorSpace" : 					0xA001 ,
		"PixelXDimension" : 			0xA002 ,
		"PixelYDimension" : 			0xA003 ,
		"RelatedSoundFile" : 			0xA004 ,
		"InteroperabilityIFDPointer" : 	0xA005 ,
		"FlashEnergy" : 				0xA20B ,	// 0x920B in TIFF/EP
		"SpatialFrequencyResponse" :	0xA20C ,	// 0x920C    -  -
		"FocalPlaneXResolution" : 		0xA20E ,	// 0x920E    -  -
		"FocalPlaneYResolution" : 		0xA20F ,	// 0x920F    -  -
		"FocalPlaneResolutionUnit" : 	0xA210 ,	// 0x9210    -  -
		"SubjectLocation" : 			0xA214 ,	// 0x9214    -  -
		"ExposureIndex" : 				0xA215 ,	// 0x9215    -  -
		"SensingMethod" : 				0xA217 ,	// 0x9217    -  -
		"FileSource" : 					0xA300 ,
		"SceneType" : 					0xA301 ,
		"CFAPattern" : 					0xA302 ,	// 0x828E in TIFF/EP
		"CustomRendered" : 				0xA401 ,
		"ExposureMode" : 				0xA402 ,
		"WhiteBalance" : 				0xA403 ,
		"DigitalZoomRatio" : 			0xA404 ,
		"FocalLengthIn35mmFilm" : 		0xA405 ,
		"SceneCaptureType" : 			0xA406 ,
		"GainControl" : 				0xA407 ,
		"Contrast" : 					0xA408 ,
		"Saturation" : 					0xA409 ,
		"Sharpness" : 					0xA40A ,
		"DeviceSettingDescription" : 	0xA40B ,
		"SubjectDistanceRange" : 		0xA40C ,
		"ImageUniqueID" : 				0xA420 ,
		"CameraOwnerName" : 			0xA430 ,
		"BodySerialNumber" : 			0xA431 ,
		"LensSpecification" : 			0xA432 ,
		"LensMaker" : 					0xA433 ,
		"LensModel" : 					0xA434 ,
		"LensSerialNumber" : 			0xA435
	};
	return exifTags[text]; 
}	// getExifTagNumber()

AlanSRaskin.ExifViewer.Tags.getExifIOPTagNumber = function (text) {
	var iopTags = {
		"InteroperabilityIndex" : 	0x0001 ,
		"InteroperabilityVersion" :	0x0002 ,
		"RelatedImageFileFormat" : 	0x1000 ,
		"RelatedImageWidth" : 		0x1001 ,
		"RelatedImageLength" : 		0x1002
	};
	return iopTags[text];
}	// getExifIOPTagNumber()

AlanSRaskin.ExifViewer.Tags.getExifGPSTagNumber = function (text) {
	var gpsTags = {
		"GPSVersionID" : 		0x00 ,
		"GPSLatitudeRef" : 		0x01 ,
		"GPSLatitude" : 		0x02 ,
		"GPSLongitudeRef" : 	0x03 ,
		"GPSLongitude" : 		0x04 ,
		"GPSAltitudeRef" : 		0x05 ,
		"GPSAltitude" : 		0x06 ,
		"GPSTimeStamp" : 		0x07 ,
		"GPSSatellites" : 		0x08 ,
		"GPSStatus" : 			0x09 ,
		"GPSMeasureMode" : 		0x0A ,
		"GPSDOP" : 				0x0B ,
		"GPSSpeedRef" : 		0x0C ,
		"GPSSpeed" : 			0x0D ,
		"GPSTrackRef" : 		0x0E ,
		"GPSTrack" : 			0x0F ,
		"GPSImgDirectionRef" :	0x10 ,
		"GPSImgDirection" : 	0x11 ,
		"GPSMapDatum" : 		0x12 ,
		"GPSDestLatitudeRef" : 	0x13 ,
		"GPSDestLatitude" : 	0x14 ,
		"GPSDestLongitudeRef" :	0x15 ,
		"GPSDestLongitude" : 	0x16 ,
		"GPSDestBearingRef" : 	0x17 ,
		"GPSDestBearing" : 		0x18 ,
		"GPSDestDistanceRef" : 	0x19 ,
		"GPSDestDistance" : 	0x1A ,
		"GPSProcessingMethod" :	0x1B ,
		"GPSAreaInformation" : 	0x1C ,
		"GPSDateStamp" : 		0x1D ,
		"GPSDifferential" : 	0x1E ,
		"GPSHPositioningError" :0x1F 
	};
	return gpsTags[text];
}	// getExifGPSTagNumber()

AlanSRaskin.ExifViewer.Tags.exifasr_basicTags = {};

AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x010F] = "Make";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x0110] = "Model";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x0112] = "Orientation";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x0132] = "DateTime";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x829A] = "ExposureTime";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x829D] = "FNumber";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x8827] = "ISOSpeedRatings";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x9003] = "DateTimeOriginal";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x9201] = "ShutterSpeedValue";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x9202] = "ApertureValue";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x9204] = "ExposureBias";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x9209] = "Flash";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0x920A] = "FocalLength";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0xA002] = "Image Width";
AlanSRaskin.ExifViewer.Tags.exifasr_basicTags[0xA003] = "Image Height";
