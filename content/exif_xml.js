if (!AlanSRaskin)  var AlanSRaskin = {};
if (!AlanSRaskin.ExifViewer)  AlanSRaskin.ExifViewer = {};
if (!AlanSRaskin.ExifViewer.XML)  AlanSRaskin.ExifViewer.XML = {};

if (window.ActiveXObject) {
	AlanSRaskin.ExifViewer.XML.Node = {
			ELEMENT_NODE: 1 , ATTRIBUTE_NODE: 2 , TEXT_NODE: 3 , CDATA_SECTION_NODE: 4 ,
			ENTITY_REFERENCE_NODE: 5 , ENTITY_NODE: 6 , PROCESSING_INSTRUCTION_NODE: 7 ,
			COMMENT_NODE: 8 , DOCUMENT_NODE: 9 , DOCUMENT_TYPE_NODE: 10 ,
			DOCUMENT_FRAGMENT_NODE: 11 , NOTATION_NODE: 12
	};
}

AlanSRaskin.ExifViewer.XML.parseXML = function (xml) {
//	if (!AlanSRaskin.ExifViewer.Base.exifasr_isMoz) {
//		return '<pre>' + xml.replace(/\s*$/, '').replace(/</g, '[').replace(/>/g, ']') + '<\/pre>';
//	}
	if (window.ActiveXObject) {
		var doc = new ActiveXObject("Microsoft.XMLDOM");
		doc.async = "false";
		doc.loadXML(xml);
	} else {
		var parser = new DOMParser();
		var doc = parser.parseFromString(xml.replace(/\s*$/, ''), 'text/xml');	// "<items><item name='Apple'/><item name='Banana' colour='yellow'>Ha!</item></items>"
	}
    var roottag = doc.documentElement;
    if (roottag.tagName == 'parserError'  ||  roottag.namespaceURI == 'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
    	return 'Parsing Error!';
    } else {
    	var output = [];
    //	showProperties(doc);
    	AlanSRaskin.ExifViewer.XML.handleNode(doc, output);
    	return output.join('\r\n');
	}
}	// parseXML()

AlanSRaskin.ExifViewer.XML.handleNode = function (node, output) {
	function getNodeValue(node) {
		return node.value  ||  node.nodeValue;
	}	// getNodeValue()

	switch(node.nodeType) {
		case Node.ELEMENT_NODE:
			var attrib_list = node.attributes;
			var text_value = '';
			if (node.childNodes.length == 1) {
				var cnode = node.childNodes[0];
//				if (cnode.nodeType ==  Node.TEXT_NODE  ||  cnode.nodeType == Node.CDATA_SECTION_NODE  ||  cnode.nodeType == Node.COMMENT_NODE) {
//					text_value = cnode.nodeValue;
//				}
				switch (cnode.nodeType) {
					case Node.TEXT_NODE:
					case Node.CDATA_SECTION_NODE:
					case Node.COMMENT_NODE:
						text_value = cnode.nodeValue;
						break;
//					case Node.ELEMENT_NODE	// not implemented
//						if (cnode.nodeName == 'rdf:Bag'  ||  cnode.nodeName == 'rdf:Seq'  ||  cnode.nodeName == 'rdf:Alt') {
//							text_value = getRDFArrayText(cnode);
//						}
//						break;
				}
			}
			var whitespace = /^\s*$/.test(text_value);
			var down = (attrib_list.length > 0  ||  node.childNodes.length > 1  ||  (node.childNodes.length == 1  &&  whitespace));

			if (attrib_list.length == 0  &&  node.childNodes.length == 0) {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li style="list-style-image:url(file.gif)">' + node.nodeName);
			} else if (!whitespace  &&  !down) {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li style="list-style-image:url(file.gif)">' + node.nodeName + ' ==> "' + AlanSRaskin.ExifViewer.Base.cleanUTF8StringData(text_value) + '"' + AlanSRaskin.ExifViewer.XML.getXMPInterpretedData(node.nodeName, text_value));
			} else {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li style="list-style-image:url(open.gif)" onclick="AlanSRaskin.ExifViewer.XML.showHideListItems(event, this)">' + node.nodeName + (!whitespace ? ' ==> "' + text_value + '"' : ''));
			}
			if (down) {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul style="display:none">');
			}
			for (var i = 0 ; i < attrib_list.length ; i++) {
				AlanSRaskin.ExifViewer.XML.handleNode(attrib_list[i], output);
			}
			if (whitespace)  AlanSRaskin.ExifViewer.XML.handleNodeChildren(node, output);
			if (down) {
				output.push('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>');
			}
			output.push('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>');
			break;
		case Node.ATTRIBUTE_NODE:
			output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li style="list-style-image:url(file.gif)">' + node.nodeName 
							+ ' = "' + node.value + '"' + AlanSRaskin.ExifViewer.XML.getXMPInterpretedData(node.nodeName, node.value));	// was node.nodeValue
//							+ (node.nodeValue  &&  !node.nodeValue.match(/^\s*$/) ? ' = ' + node.nodeValue : ''));
/*
			if (node.childNodes.length == 0) {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li style="list-style-image:url(file.gif)">' + node.nodeName 
								+ (node.nodeValue  &&  !node.nodeValue.match(/^\s*$/) ? ' = ' + node.nodeValue : ''));
			} else {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li style="list-style-image:url(open.gif)" onclick="AlanSRaskin.ExifViewer.XML.showHideListItems(event, this)">' 
								 + node.nodeName + (node.nodeValue  &&  !node.nodeValue.match(/^\s*$/) ? ' = ' + node.nodeValue : ''));
			}
			if (node.childNodes.length > 0) {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul style="display:none">');
				AlanSRaskin.ExifViewer.XML.handleNodeChildren(node, output);
				output.push('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>');
			}
/**/
			output.push('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>');
			break;
		case Node.TEXT_NODE:
		case Node.CDATA_SECTION_NODE:
		case Node.COMMENT_NODE:
			if (node.nodeValue  &&  !node.nodeValue.match(/^\s*$/)) {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li style="list-style-image:url(file.gif)">(text) = "' + node.nodeValue + '"<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>');
			}
			break;
		case Node.ENTITY_REFERENCE_NODE: 
		case Node.ENTITY_NODE:
			if (node.childNodes.length == 0) { 
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li style="list-style-image:url(file.gif)">' + node.nodeName);
			} else {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li style="list-style-image:url(open.gif)" onclick="AlanSRaskin.ExifViewer.XML.showHideListItems(event, this)">' + node.nodeName);
			}
			if (node.childNodes.length > 0) {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul style="display:none">');
				AlanSRaskin.ExifViewer.XML.handleNodeChildren(node, output);
				output.push('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>');
			}
			output.push('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>');
			break;
		case Node.PROCESSING_INSTRUCTION_NODE: 
			output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li style="list-style-image:url(file.gif)">'
						+ node.nodeName + ' = ' + node.nodeValue + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>'); // name = target
			break;
		case Node.DOCUMENT_NODE: 
		case Node.DOCUMENT_FRAGMENT_NODE: 
			if (node.childNodes.length > 0) {
				output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>');
				AlanSRaskin.ExifViewer.XML.handleNodeChildren(node, output);
				output.push('<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'ul>');
			}
			break;
		case Node.DOCUMENT_TYPE_NODE: 
		case Node.NOTATION_NODE: 
			output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>' + node.nodeName + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>');
			break;
		default:
			output.push('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>Invalid node type: ' + node.nodeType + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'li>');
	}
}	// handleNode()

AlanSRaskin.ExifViewer.XML.handleNodeChildren = function (node, output) {
	var n = node.firstChild;
	while (n != null) {
		AlanSRaskin.ExifViewer.XML.handleNode(n, output);
		n = n.nextSibling;
	}
}	// handleNodeChildren()

AlanSRaskin.ExifViewer.XML.dumpIptcCoreData = function (divName, iptc_core) {
	if (iptc_core.type != 'IPTC Core'  ||  iptc_core.status != 0)  return;
	if (iptc_core.status != 0) {
//		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>' + AlanSRaskin.ExifViewer.Moz.getPString('noIPTCCoredata') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>', divName + '_iptc_core');
	} else {
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a name="iptc_core" id="a_iptc_core"><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a>', divName + '_iptc_core');
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>' + AlanSRaskin.ExifViewer.Moz.getPString('IPTCcore') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'h2>', divName + '_iptc_core');
//		AlanSRaskin.ExifViewer.Base.displayText('<html:pre>' + AlanSRaskin.ExifViewer.Base.parseXML(iptc_core.xml).replace(/</g, '[') + '<\/html:pre>', divName + '_iptc_core');
		AlanSRaskin.ExifViewer.Base.displayText('<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p class="no_print"><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a href="#" onclick="AlanSRaskin.ExifViewer.XML.showHideAllListItems(true);return false;" style="text-decoration:underline">' + AlanSRaskin.ExifViewer.Moz.getPString('expandAll') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a> / '
					+ '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a href="#" onclick="AlanSRaskin.ExifViewer.XML.showHideAllListItems(false);return false;" style="text-decoration:underline">' + AlanSRaskin.ExifViewer.Moz.getPString('collapseAll') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a> / '
					+ '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a href="#" onclick="AlanSRaskin.ExifViewer.XML.showHideSource(\'xmp_source\');return false;" style="text-decoration:underline">' + AlanSRaskin.ExifViewer.Moz.getPString('showHideSource') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a> / ' 
					+ '<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a href="#" onclick="AlanSRaskin.ExifViewer.XML.showHideSource(\'xmp_legend\');return false;" style="text-decoration:underline">' + AlanSRaskin.ExifViewer.Moz.getPString('showHideLegend') + '<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'a><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'p>', 
					divName + '_iptc_core');
		var legend = [
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'table border="1" cellpadding="2" cellspacing="0" id="xmp_legend" style="float:right;display:none;">',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'th>Namespace Prefix<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'th><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'th>Meaning<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'th><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>aux<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>Additional EXIF schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>crs<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>Camera Raw Schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>dc<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>Dublin Core schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>exif<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>EXIF schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>pdf<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>Adobe Portable Document Format schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>photoshop<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>Adobe Photoshop schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>rdf<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>Resource Description Framework schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>tiff<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>EXIF schema for TIFF<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>xap<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>(obsolete designation for XMP)<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>xmp<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>Extensible Metadata Platform Basic schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>xmpBJ<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>XMP Basic Job Ticket schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>xmpDM<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>XMP Dynamic Media schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>xmpMM<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>XMP Media Management schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>xmpRights<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>XMP Rights Management schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>xmpTPg<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td>XMP Paged-Text schema<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
//			'<' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'td><\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'tr>',
			'<\/' + AlanSRaskin.ExifViewer.Base.exifasr_xml0 + 'table>'
		];
		AlanSRaskin.ExifViewer.Base.displayText(legend.join('\n'), divName + '_iptc_core');
		AlanSRaskin.ExifViewer.Base.displayText('<html:pre id="xmp_source" style="display:none">' + iptc_core.xml.replace(/\s*$/, '').replace(/</g, '&#60;').replace(/>/g, '&#62;') + '<\/html:pre>', 'outputDiv_iptc_core');
		AlanSRaskin.ExifViewer.Base.displayText(AlanSRaskin.ExifViewer.XML.parseXML(iptc_core.xml), divName + '_iptc_core');
	}
}	//dumpIptcCoreData()

AlanSRaskin.ExifViewer.XML.showHideListItems = function (e, li) {
	if ((e.srcElement  &&  e.srcElement != li) ||  (e.target  &&  e.target != li)) {
		AlanSRaskin.ExifViewer.XML.cancelEvent(e);
		return;
	}

	var image = '?', display = '?';
	if (li.style.listStyleImage == 'url(open.gif)'  ||  li.style.listStyleImage == 'url("open.gif")') {
		image = 'close';
		display = 'block';
	} else if (li.style.listStyleImage == 'url(close.gif)'  ||  li.style.listStyleImage == 'url("close.gif")') {
		image = 'open';
		display = 'none';
	}

	if (image == '?') {
		AlanSRaskin.ExifViewer.XML.cancelEvent(e);
		return;
	}
	li.style.listStyleImage = 'url("' + image + '.gif")';
	var uls = li.getElementsByTagName('ul');
	if (uls.length == 0)  uls = li.getElementsByTagName('html:ul');
	for (var i = 0 ; i < uls.length ; i++) {
		if (uls[i].parentNode == li)  uls[i].style.display = display;
	}
	AlanSRaskin.ExifViewer.XML.cancelEvent(e);
//	li.blur();
	window.focus();
}	// showHideListItems()

AlanSRaskin.ExifViewer.XML.showHideAllListItems = function (show) {
	var div = document.getElementById('outputDiv_iptc_core');
	if (!div)  return;
	var uls = div.getElementsByTagName('ul');
	if (uls.length == 0)  uls = div.getElementsByTagName('html:ul');
	var lis = div.getElementsByTagName('li');
	if (lis.length == 0)  lis = div.getElementsByTagName('html:li');
	for (var i = 1 ; i < uls.length ; i++) {	// skip top level
		uls[i].style.display = (show ? 'block' : 'none');
	}
	for (var i = 0 ; i < lis.length ; i++) {
		if (lis[i].style.listStyleImage != 'url(file.gif)') {
			lis[i].style.listStyleImage = 'url(' + (show ? 'close' : 'open') + '.gif)';
		}
	}
}	// showHideAllListItems()

AlanSRaskin.ExifViewer.XML.cancelEvent = function (e) {
	if (e) {
		e.cancelBubble = true;
		if (e.stopPropagation) {
			e.stopPropagation();
		}
	}
}	// cancelEvent()

AlanSRaskin.ExifViewer.XML.showHideSource = function (divname) {
	var div = document.getElementById(divname);
	if (div) {
		div.style.display = (div.style.display == 'none' ? '' : 'none'); 
	}
}	//	showHideSource()

AlanSRaskin.ExifViewer.XML.getXMPInterpretedData = function (name, value) {
	var output;	
	var exifTag = AlanSRaskin.ExifViewer.XML.getXMPExifTagNumber(name);
	if (exifTag != undefined) {
		return ' / ' + AlanSRaskin.ExifViewer.Tags.getExifInterpretedTagData(exifTag, value, (exifTag > 0x1E ? 'n/a' : 'GPS'));
	} else {
		switch (name) {
			case 'crs:CropUnits':
				output = AlanSRaskin.ExifViewer.Moz.getPString(['pixels', 'inches', 'cm'][value]);
				break;
/*
		case '':
			output = '';
			break;
		case '':
			output = '';
			break;
		case '':
			output = '';
			break;
/**/
			default:
				return '';
				break;
		}
		return ' (' + output + ')';
	}
}	// getXMPInterpretedData()

AlanSRaskin.ExifViewer.XML.getXMPExifTagNumber = function (text) {
	var exifTags = {
		"exif:GPSVersionID" : 			0x00 ,
		"exif:GPSLatitudeRef" : 		0x01 ,
		"exif:GPSLatitude" : 			0x02 ,
		"exif:GPSLongitudeRef" : 		0x03 ,
		"exif:GPSLongitude" : 			0x04 ,
		"exif:GPSAltitudeRef" : 		0x05 ,
		"exif:GPSAltitude" : 			0x06 ,
		"exif:GPSTimeStamp" : 			0x07 ,
		"exif:GPSSatellites" : 			0x08 ,
		"exif:GPSStatus" : 				0x09 ,
		"exif:GPSMeasureMode" : 		0x0A ,
		"exif:GPSDOP" : 				0x0B ,
		"exif:GPSSpeedRef" : 			0x0C ,
		"exif:GPSSpeed" : 				0x0D ,
		"exif:GPSTrackRef" : 			0x0E ,
		"exif:GPSTrack" : 				0x0F ,
		"exif:GPSImgDirectionRef" :		0x10 ,
		"exif:GPSImgDirection" : 		0x11 ,
		"exif:GPSMapDatum" : 			0x12 ,
		"exif:GPSDestLatitudeRef" : 	0x13 ,
		"exif:GPSDestLatitude" : 		0x14 ,
		"exif:GPSDestLongitudeRef" :	0x15 ,
		"exif:GPSDestLongitude" : 		0x16 ,
		"exif:GPSDestBearingRef" : 		0x17 ,
		"exif:GPSDestBearing" : 		0x18 ,
		"exif:GPSDestDistanceRef" : 	0x19 ,
		"exif:GPSDestDistance" : 		0x1A ,
		"exif:GPSProcessingMethod" :	0x1B ,
		"exif:GPSAreaInformation" : 	0x1C ,
		"exif:GPSDateStamp" : 			0x1D ,
		"exif:GPSDifferential" : 		0x1E , 
		"exif:GPSHPositioningError" : 	0x1F , 

		"tiff:ImageWidth" : 				0x0100 ,
		"tiff:ImageLength" : 				0x0101 ,
		"tiff:BitsPerSample" : 				0x0102 ,
		"tiff:Compression" : 				0x0103 ,
		"tiff:PhotometricInterpretation" :	0x0106 ,
		"FillOrder" : 					0x010A ,
		"DocumentName" : 				0x010D ,
		"tiff:ImageDescription" : 			0x010E ,
		"tiff:Make" : 						0x010F ,
		"tiff:Model" : 						0x0110 ,
		"StripOffsets" : 				0x0111 ,
		"tiff:Orientation" : 				0x0112 ,
		"tiff:SamplesPerPixel" : 			0x0115 ,
		"RowsPerStrip" : 				0x0116 ,
		"StripByteCounts" : 			0x0117 ,
		"tiff:XResolution" : 				0x011A ,
		"tiff:YResolution" : 				0x011B ,
		"tiff:PlanarConfiguration" : 		0x011C ,
		"tiff:ResolutionUnit" : 			0x0128 ,
		"tiff:TransferFunction" : 			0x012D ,
		"tiff:Software" : 					0x0131 ,
		"tiff:DateTime" : 					0x0132 ,
		"tiff:Artist" : 					0x013B ,
		"tiff:HostComputer" : 				0x013C ,
		"tiff:WhitePoint" : 				0x013E ,
		"tiff:PrimaryChromaticities" : 		0x013F ,
		"tiff:ColorMAP" : 					0x0140 ,
		"TransferRange" : 				0x0156 ,
		"JPEGProc" : 					0x0200 ,
		"JPEGInterchangeFormat" : 		0x0201 ,
		"JPEGInterchangeFormatLength" : 0x0202 ,
		"tiff:YCbCrCoefficients" : 			0x0211 ,
		"tiff:YCbCrSubSampling" : 			0x0212 ,
		"tiff:YCbCrPositioning" : 			0x0213 ,
		"tiff:ReferenceBlackWhite" : 		0x0214 ,
		"BatteryLevel" : 				0x828F ,
		"tiff:Copyright" : 					0x8298 ,
		"exif:ExposureTime" : 				0x829A ,
		"exif:FNumber" : 					0x829D ,
		"IPTC/NAA" : 					0x83BB ,
		"ExifIFDPointer" : 				0x8769 ,
		"InterColorProfile" : 			0x8773 ,
		"exif:ExposureProgram" : 			0x8822 ,
		"exif:SpectralSensitivity" : 		0x8824 ,
		"GPSInfoIFDPointer" : 			0x8825 ,
		"exif:ISOSpeedRatings" : 			0x8827 ,
		"exif:OECF" : 						0x8828 ,
		"exif:SensitivityType" : 			0x8830 ,
		"exif:StandardOutputSensitivity" :	0x8831 ,
		"exif:RecommendedExposureIndex" :	0x8832 ,
		"exif:ISOSpeed" : 					0x8833 ,
		"exif:ISOSpeedLatitudeyyy" : 		0x8834 ,
		"exif:ISOSpeedLatitudezzz" : 		0x8835 ,
		"exif:ExifVersion" : 				0x9000 ,
		"exif:DateTimeOriginal" : 			0x9003 ,
		"exif:DateTimeDigitized" : 			0x9004 ,
		"exif:ComponentsConfiguration" : 	0x9101 ,
		"exif:CompressedBitsPerPixel" : 	0x9102 ,
		"exif:ShutterSpeedValue" : 			0x9201 ,
		"exif:ApertureValue" : 				0x9202 ,
		"exif:BrightnessValue" : 			0x9203 ,
		"exif:ExposureBiasValue" : 			0x9204 ,
		"exif:MaxApertureValue" : 			0x9205 ,
		"exif:SubjectDistance" : 			0x9206 ,
		"exif:MeteringMode" : 				0x9207 ,
		"exif:LightSource" : 				0x9208 ,
		"exif:Flash" : 						0x9209 ,
		"exif:FocalLength" : 				0x920A ,
		"exif:SubjectArea" : 				0x9214 ,
		"MakerNote" : 					0x927C ,
		"exif:UserComment" : 				0x9286 ,
		"SubSecTime" : 					0x9290 ,
		"SubSecTimeOriginal" : 			0x9291 ,
		"SubSecTimeDigitized" : 		0x9292 ,
		"exif:FlashpixVersion" : 			0xA000 ,
		"exif:ColorSpace" : 				0xA001 ,
		"exif:PixelXDimension" : 			0xA002 ,
		"exif:PixelYDimension" : 			0xA003 ,
		"exif:RelatedSoundFile" : 			0xA004 ,
		"InteroperabilityIFDPointer" : 	0xA005 ,
		"exif:FlashEnergy" : 				0xA20B ,	// 0x920B in TIFF/EP
		"exif:SpatialFrequencyResponse" :	0xA20C ,	// 0x920C    -  -
		"exif:FocalPlaneXResolution" : 		0xA20E ,	// 0x920E    -  -
		"exif:FocalPlaneYResolution" : 		0xA20F ,	// 0x920F    -  -
		"exif:FocalPlaneResolutionUnit" : 	0xA210 ,	// 0x9210    -  -
		"exif:SubjectLocation" : 			0xA214 ,	// 0x9214    -  -
		"exif:ExposureIndex" : 				0xA215 ,	// 0x9215    -  -
		"exif:SensingMethod" : 				0xA217 ,	// 0x9217    -  -
		"exif:FileSource" : 				0xA300 ,
		"exif:SceneType" : 					0xA301 ,
		"exif:CFAPattern" : 				0xA302 ,	// 0x828E in TIFF/EP
		"exif:CustomRendered" : 			0xA401 ,
		"exif:ExposureMode" : 				0xA402 ,
		"exif:WhiteBalance" : 				0xA403 ,
		"exif:DigitalZoomRatio" : 			0xA404 ,
		"exif:FocalLengthIn35mmFilm" : 		0xA405 ,
		"exif:SceneCaptureType" : 			0xA406 ,
		"exif:GainControl" : 				0xA407 ,
		"exif:Contrast" : 					0xA408 ,
		"exif:Saturation" : 				0xA409 ,
		"exif:Sharpness" : 					0xA40A ,
		"exif:DeviceSettingDescription" : 	0xA40B ,
		"exif:SubjectDistanceRange" : 		0xA40C ,
		"exif:ImageUniqueID" : 				0xA420 ,
		"exif:CameraOwnerName" : 			0xA430 ,
		"exif:BodySerialNumber" : 			0xA431 ,
		"exif:LensSpecification" : 			0xA432 ,
		"exif:LensMaker" : 					0xA433 ,
		"exif:LensModel" : 					0xA434 ,
		"exif:LensSerialNumber" : 			0xA435 ,
		"PrintImageMatching" : 				0xC4A5
	};
	return (exifTags[text] ? exifTags[text] : undefined); 
}	// getXMPExifTagNumber()

