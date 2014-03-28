@echo off

grep -n  [^.]initExifOverlay *.js *.xul >> check.out
grep -n  [^.]showExifMenuItems *.js *.xul >> check.out
grep -n  [^.]handleExifImagePicked *.js *.xul >> check.out
grep -n  [^.]waitForExifWindow *.js *.xul >> check.out
grep -n  [^.]handleExifAttachmentPicked *.js *.xul >> check.out
grep -n  [^.]deleteExifTempFile *.js *.xul >> check.out
grep -n  [^.]handleExifRotateImage *.js *.xul >> check.out

grep -n  [^.]getOrientation *.js *.xul >> check.out
grep -n  [^.]getSlideshowInfo *.js *.xul >> check.out
grep -n  [^.]processFile *.js *.xul >> check.out
grep -n  [^.]getTestData *.js *.xul >> check.out
grep -n  [^.]readByteAsText *.js *.xul >> check.out
grep -n  [^.]dumpFileInfo *.js *.xul >> check.out
grep -n  [^.]readByteMoz *.js *.xul >> check.out
grep -n  [^.]readByteURLMoz *.js *.xul >> check.out
grep -n  [^.]getExifData *.js *.xul >> check.out
grep -n  [^.]handleApp1 *.js *.xul >> check.out
grep -n  [^.]handleApp13 *.js *.xul >> check.out
grep -n  [^.]dumpAssembledExifData *.js *.xul >> check.out
grep -n  [^.]dumpExifData *.js *.xul >> check.out
grep -n  [^.]getFileInformation *.js *.xul >> check.out
grep -n  [^.]parseIFD *.js *.xul >> check.out
grep -n  [^.]parseExifTagData *.js *.xul >> check.out
grep -n  [^.]getKMLString *.js *.xul >> check.out
grep -n  [^.]getThumbnailAsDataURL *.js *.xul >> check.out
grep -n  [^.]getExifTagData *.js *.xul >> check.out
grep -n  [^.]zeroPad *.js *.xul >> check.out
grep -n  [^.]getExifStringData *.js *.xul >> check.out
grep -n  [^.]getExifByteData *.js *.xul >> check.out
grep -n  [^.]getExifSignedByteData *.js *.xul >> check.out
grep -n  [^.]getExifLongData *.js *.xul >> check.out
grep -n  [^.]getExifSignedLongData *.js *.xul >> check.out
grep -n  [^.]getExifRationalData *.js *.xul >> check.out
grep -n  [^.]getExifSignedRationalData *.js *.xul >> check.out
grep -n  [^.]reduceRational *.js *.xul >> check.out
grep -n  [^.]getExifShortData *.js *.xul >> check.out
grep -n  [^.]getExifSignedShortData *.js *.xul >> check.out
grep -n  [^.]offsetError *.js *.xul >> check.out
grep -n  [^.]getLong *.js *.xul >> check.out
grep -n  [^.]getSignedLong *.js *.xul >> check.out
grep -n  [^.]getShort *.js *.xul >> check.out
grep -n  [^.]getSignedShort *.js *.xul >> check.out
grep -n  [^.]bytesToString *.js *.xul >> check.out
grep -n  [^.]bytesToBuffer *.js *.xul >> check.out
grep -n  [^.]hexBytesToBuffer *.js *.xul >> check.out
grep -n  [^.]signedByte *.js *.xul >> check.out
grep -n  [^.]byteToHex *.js *.xul >> check.out
grep -n  [^.]formatLatLong *.js *.xul >> check.out
grep -n  [^.]formatLatLong2 *.js *.xul >> check.out
grep -n  [^.]formatTimestamp *.js *.xul >> check.out
grep -n  [^.]formatRational *.js *.xul >> check.out
grep -n  [^.]formatRationals *.js *.xul >> check.out
grep -n  [^.]cleanValue *.js *.xul >> check.out
grep -n  [^.]displayText *.js *.xul >> check.out
grep -n  [^.]clearText *.js *.xul >> check.out
grep -n  [^.]clearTexts *.js *.xul >> check.out
grep -n  [^.]cleanExifStringData *.js *.xul >> check.out
grep -n  [^.]roundValue *.js *.xul >> check.out
grep -n  [^.]roundDecimals *.js *.xul >> check.out

grep -n  [^.]startDisplay *.js *.xul >> check.out
grep -n  [^.]resizeOutputDiv *.js *.xul >> check.out
grep -n  [^.]pickFile *.js *.xul >> check.out
grep -n  [^.]copyToClipboard *.js *.xul >> check.out
grep -n  [^.]handleLocalChanged *.js *.xul >> check.out
grep -n  [^.]handleRemoteChanged *.js *.xul >> check.out
grep -n  [^.]saveURL *.js *.xul >> check.out
grep -n  [^.]restoreURL *.js *.xul >> check.out
grep -n  [^.]clearURL *.js *.xul >> check.out
grep -n  [^.]clearFile *.js *.xul >> check.out
grep -n  [^.]_handleExifImagePicked *.js *.xul >> check.out
grep -n  [^.]exifViewDiv *.js *.xul >> check.out
grep -n  [^.]setExifDirectorySeparator *.js *.xul >> check.out
grep -n  [^.]setFontSize *.js *.xul >> check.out
grep -n  [^.]setRelativeFontSize *.js *.xul >> check.out
grep -n  [^.]getPString *.js *.xul >> check.out
grep -n  [^.]getFormattedPString *.js *.xul >> check.out
grep -n  [^.]toJavaScriptConsole *.js *.xul >> check.out
grep -n  [^.]toOpenWindowByType *.js *.xul >> check.out
grep -n  [^.]showReleaseNotes *.js *.xul >> check.out
grep -n  [^.]exifScrollTo *.js *.xul >> check.out
grep -n  [^.]exifPageUpDown *.js *.xul >> check.out
grep -n  [^.]exifLineUpDown *.js *.xul >> check.out
grep -n  [^.]saveExifAsImage *.js *.xul >> check.out
grep -n  [^.]simplePrint *.js *.xul >> check.out
grep -n  [^.]copyKMLtoClipboard *.js *.xul >> check.out
grep -n  [^.]saveKMLtoFile *.js *.xul >> check.out
grep -n  [^.]launchKML *.js *.xul >> check.out
grep -n  [^.]fixDiv *.js *.xul >> check.out
grep -n  [^.]fixDivs *.js *.xul >> check.out
grep -n  [^.]disableMainButton *.js *.xul >> check.out
grep -n  [^.]getAppVersion *.js *.xul >> check.out
grep -n  [^.]getExtensionVersion *.js *.xul >> check.out

grep -n  [^.]initializeMaker *.js *.xul >> check.out
grep -n  [^.]parseMaker *.js *.xul >> check.out
grep -n  [^.]dumpExifMakerTagData *.js *.xul >> check.out

grep -n  [^.]getExifInterpretedTagData *.js *.xul >> check.out
grep -n  [^.]getExifTagNumber *.js *.xul >> check.out
grep -n  [^.]getExifIOPTagNumber *.js *.xul >> check.out
grep -n  [^.]getExifGPSTagNumber *.js *.xul >> check.out

grep -n  [^.]parseXML *.js *.xul >> check.out
grep -n  [^.]handleNode *.js *.xul >> check.out
grep -n  [^.]handleNodeChildren *.js *.xul >> check.out
grep -n  [^.]dumpIptcCoreData *.js *.xul >> check.out
grep -n  [^.]showHideListItems *.js *.xul >> check.out
grep -n  [^.]showHideAllListItems *.js *.xul >> check.out
grep -n  [^.]cancelEvent *.js *.xul >> check.out
grep -n  [^.]showHideSource *.js *.xul >> check.out
grep -n  [^.]getXMPInterpretedData *.js *.xul >> check.out
grep -n  [^.]getXMPExifTagNumber *.js *.xul >> check.out

grep -n  [^.]parseIPTC *.js *.xul >> check.out
grep -n  [^.]dumpIptcData *.js *.xul >> check.out
grep -n  [^.]formatIPTC_CCYYMMDD *.js *.xul >> check.out
grep -n  [^.]formatIPTC_HHMMSS_HHMM *.js *.xul >> check.out
grep -n  [^.]formatIPTC_binaryS *.js *.xul >> check.out
grep -n  [^.]formatIPTC_binaryN *.js *.xul >> check.out

grep -n  [^.]dumpAgfaTagData *.js *.xul >> check.out
grep -n  [^.]getAgfaInterpretedTagData *.js *.xul >> check.out

grep -n  [^.]dumpCanonTagData *.js *.xul >> check.out
grep -n  [^.]getCanonInterpretedTagData *.js *.xul >> check.out

grep -n  [^.]dumpCasioTagData *.js *.xul >> check.out
grep -n  [^.]getCasioInterpretedTagData1 *.js *.xul >> check.out
grep -n  [^.]getCasioInterpretedTagData2 *.js *.xul >> check.out

grep -n  [^.]dumpEpsonTagData *.js *.xul >> check.out
grep -n  [^.]getEpsonInterpretedTagData *.js *.xul >> check.out

grep -n  [^.]dumpFujifilmTagData *.js *.xul >> check.out
grep -n  [^.]getFujifilmInterpretedTagData *.js *.xul >> check.out

grep -n  [^.]dumpGenericTagData *.js *.xul >> check.out
grep -n  [^.]getGenericInterpretedTagData *.js *.xul >> check.out

grep -n  [^.]dumpKonicaMinoltaTagData *.js *.xul >> check.out
grep -n  [^.]getKonicaMinoltaInterpretedTagData *.js *.xul >> check.out

grep -n  [^.]dumpKyoceraContaxTagData *.js *.xul >> check.out
grep -n  [^.]getKyoceraContaxInterpretedTagData *.js *.xul >> check.out

grep -n  [^.]dumpNikonTagData *.js *.xul >> check.out
grep -n  [^.]getNikonInterpretedTagDataFormat1 *.js *.xul >> check.out
grep -n  [^.]getNikonInterpretedTagDataFormat2 *.js *.xul >> check.out
grep -n  [^.]getNikonInterpretedTagDataFormat3 *.js *.xul >> check.out

grep -n  [^.]dumpOlympusTagData *.js *.xul >> check.out
grep -n  [^.]getOlympusInterpretedTagData *.js *.xul >> check.out

grep -n  [^.]dumpPanasonicTagData *.js *.xul >> check.out
grep -n  [^.]getPanasonicInterpretedTagData1 *.js *.xul >> check.out

grep -n  [^.]dumpPentaxAsahiTagData *.js *.xul >> check.out
grep -n  [^.]getPentaxAsahiInterpretedTagData1 *.js *.xul >> check.out
grep -n  [^.]getPentaxAsahiInterpretedTagData2 *.js *.xul >> check.out

grep -n  [^.]dumpSonyTagData *.js *.xul >> check.out
grep -n  [^.]getSonyInterpretedTagData *.js *.xul >> check.out

grep -n  [^.]exifasr *.js *.xul >> check.out

