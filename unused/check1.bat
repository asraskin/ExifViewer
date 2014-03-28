@echo off

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC|XML).initExifOverlay" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Base|Moz|Makers|Tags|IPTC|XML).showExifMenuItems" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Base|Moz|Makers|Tags|IPTC|XML).handleExifImagePicked" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Base|Moz|Makers|Tags|IPTC|XML).waitForExifWindow" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Base|Moz|Makers|Tags|IPTC|XML).handleExifAttachmentPicked" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Base|Moz|Makers|Tags|IPTC|XML).deleteExifTempFile" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Base|Moz|Makers|Tags|IPTC|XML).handleExifRotateImage" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getOrientation" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getSlideshowInfo" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).processFile" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getTestData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).readByteAsText" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).dumpFileInfo" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).readByteMoz" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).readByteURLMoz" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).handleApp1" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).handleApp13" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).dumpAssembledExifData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).dumpExifData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getFileInformation" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).parseIFD" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).parseExifTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getKMLString" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getThumbnailAsDataURL" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).zeroPad" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifStringData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifByteData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifSignedByteData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifLongData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifSignedLongData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifRationalData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifSignedRationalData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).reduceRational" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifShortData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getExifSignedShortData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).offsetError" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getLong" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getSignedLong" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getShort" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).getSignedShort" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).bytesToString" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).bytesToBuffer" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).hexBytesToBuffer" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).signedByte" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).byteToHex" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).formatLatLong" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).formatLatLong2" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).formatTimestamp" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).formatRational" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).formatRationals" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).cleanValue" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).displayText" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).clearText" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).clearTexts" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).cleanExifStringData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).roundValue" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Moz|Makers|Tags|IPTC|XML).roundDecimals" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).startDisplay" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).resizeOutputDiv" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).pickFile" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).copyToClipboard" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).handleLocalChanged" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).handleRemoteChanged" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).saveURL" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).restoreURL" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).clearURL" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).clearFile" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML)._handleExifImagePicked" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).exifViewDiv" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).setExifDirectorySeparator" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).setFontSize" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).setRelativeFontSize" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).getPString" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).getFormattedPString" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).toJavaScriptConsole" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).toOpenWindowByType" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).showReleaseNotes" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).exifScrollTo" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).exifPageUpDown" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).exifLineUpDown" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).saveExifAsImage" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).simplePrint" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).copyKMLtoClipboard" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).saveKMLtoFile" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).launchKML" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).fixDiv" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).fixDivs" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).disableMainButton" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).getAppVersion" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Makers|Tags|IPTC|XML).getExtensionVersion" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).initializeMaker" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).parseMaker" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpExifMakerTagData" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|IPTC|XML).getExifInterpretedTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|IPTC|XML).getExifTagNumber" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|IPTC|XML).getExifIOPTagNumber" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|IPTC|XML).getExifGPSTagNumber" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC).parseXML" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC).handleNode" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC).handleNodeChildren" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC).dumpIptcCoreData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC).showHideListItems" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC).showHideAllListItems" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC).cancelEvent" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC).showHideSource" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC).getXMPInterpretedData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|IPTC).getXMPExifTagNumber" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|XML).parseIPTC" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|XML).dumpIptcData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|XML).formatIPTC_CCYYMMDD" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|XML).formatIPTC_HHMMSS_HHMM" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|XML).formatIPTC_binaryS" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Makers|Tags|XML).formatIPTC_binaryN" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpAgfaTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getAgfaInterpretedTagData " *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpCanonTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getCanonInterpretedTagData" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpCasioTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getCasioInterpretedTagData1" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getCasioInterpretedTagData2" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpEpsonTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getEpsonInterpretedTagData" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpFujifilmTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getFujifilmInterpretedTagData" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpGenericTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getGenericInterpretedTagData" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpKonicaMinoltaTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getKonicaMinoltaInterpretedTagData" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpKyoceraContaxTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getKyoceraContaxInterpretedTagData" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpNikonTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getNikonInterpretedTagDataFormat1" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getNikonInterpretedTagDataFormat2" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getNikonInterpretedTagDataFormat3" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpOlympusTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getOlympusInterpretedTagData" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpPanasonicTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getPanasonicInterpretedTagData1" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpPentaxAsahiTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getPentaxAsahiInterpretedTagData1" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getPentaxAsahiInterpretedTagData2" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).dumpSonyTagData" *.js *.xul >> check.out
grep -n  "AlanSRaskin.ExifViewer.(Overlay|Base|Moz|Tags|IPTC|XML).getSonyInterpretedTagData" *.js *.xul >> check.out

grep -n  "AlanSRaskin.ExifViewer.(Overlay|Makers|Moz|Tags|IPTC|XML).exifasr" *.js *.xul >> check.out

