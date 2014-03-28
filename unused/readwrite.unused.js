var savefile = "c:\\garbage.txt";

function saveASR() {
	try {
		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
	} catch (e) {
		alert("Permission to save file was denied.");
	}
	var file = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);
	file.initWithPath( savefile );
	if ( file.exists() == false ) {
		alert( "Creating file... " );
		file.create( Components.interfaces.nsIFile.NORMAL_FILE_TYPE, 420 );
	}
	var outputStream = Components.classes["@mozilla.org/network/file-output-stream;1"]
		.createInstance( Components.interfaces.nsIFileOutputStream );
	/* Open flags 
	#define PR_RDONLY       0x01
	#define PR_WRONLY       0x02
	#define PR_RDWR         0x04
	#define PR_CREATE_FILE  0x08
	#define PR_APPEND      0x10
	#define PR_TRUNCATE     0x20
	#define PR_SYNC         0x40
	#define PR_EXCL         0x80
	*/
	/*
	** File modes ....
	**
	** CAVEAT: 'mode' is currently only applicable on UNIX platforms.
	** The 'mode' argument may be ignored by PR_Open on other platforms.
	**
	**   00400   Read by owner.
	**   00200   Write by owner.
	**   00100   Execute (search if a directory) by owner.
	**   00040   Read by group.
	**   00020   Write by group.
	**   00010   Execute by group.
	**   00004   Read by others.
	**   00002   Write by others
	**   00001   Execute by others.
	**
	*/
	outputStream.init( file, 0x04 | 0x08 | 0x20, 420, 0 );
	var output = document.getElementById('blog').value;
	var result = outputStream.write( output, output.length );
	outputStream.close();

}
function readASR() {
//	alert('AOK!');
//	try {
//		netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
//	} catch (e) {
//		alert("Permission to read file was denied.");
//	}
	alert('A1OK!');
	var file = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);
	alert('A2OK!');
	file.initWithPath( savefile );
	alert('A3OK!');
	if ( file.exists() == false ) {
		alert("File does not exist");
	}
	alert('BOK!');
	var is = Components.classes["@mozilla.org/network/file-input-stream;1"]
		.createInstance( Components.interfaces.nsIFileInputStream );
	alert('COK!');
	is.init( file,0x01, 00004, null);
	alert('DOK!');
	var sis = Components.classes["@mozilla.org/scriptableinputstream;1"]
		.createInstance( Components.interfaces.nsIScriptableInputStream );
	alert('EOK!');
	sis.init( is );
	alert('FOK!');
	alert(sis);
	alert(sis.available());
	var output = sis.read( sis.available() );
	alert('GOK!');
	alert(output);
	document.getElementById('blog').innerHTML = output;
}

/*
UPDATE: Platform independent determination of the users profile directory:
Just replace var savefile = "c:\\mozdata.txt"; with the following code:

var savefile = "mozdat.txt";

try {
	netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
} catch (e) {
	alert("Permission to save file was denied.");
}
// get the path to the user's home (profile) directory
const DIR_SERVICE = new Components.Constructor("@mozilla.org/file/directory_service;1","nsIProperties");
try { 
	path=(new DIR_SERVICE()).get("ProfD", Components.interfaces.nsIFile).path; 
} catch (e) {
	alert("error");
}
// determine the file-separator
if (path.search(/\\/) != -1) {
	path = path + "\\";
} else {
	path = path + "/";
}
savefile = path+savefile;
*/
