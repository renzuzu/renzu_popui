	var current = {}
	var currentevent = undefined
	const keyCodes = {
		0: 'That key has no keycode',
		3: 'break',
		8: 'backspace / delete',
		9: 'tab',
		12: 'clear',
		13: 'enter',
		16: 'shift',
		17: 'ctrl',
		18: 'alt',
		19: 'pause/break',
		20: 'caps lock',
		21: 'hangul',
		25: 'hanja',
		27: 'escape',
		28: 'conversion',
		29: 'non-conversion',
		32: 'spacebar',
		33: 'page up',
		34: 'page down',
		35: 'end',
		36: 'home',
		37: 'left arrow',
		38: 'up arrow',
		39: 'right arrow',
		40: 'down arrow',
		41: 'select',
		42: 'print',
		43: 'execute',
		44: 'Print Screen',
		45: 'insert',
		46: 'delete',
		47: 'help',
		48: '0',
		49: '1',
		50: '2',
		51: '3',
		52: '4',
		53: '5',
		54: '6',
		55: '7',
		56: '8',
		57: '9',
		58: ':',
		59: 'semicolon (firefox), equals',
		60: '<',
		61: 'equals (firefox)',
		63: 'ß',
		64: '@ (firefox)',
		65: 'a',
		66: 'b',
		67: 'c',
		68: 'd',
		69: 'e',
		70: 'f',
		71: 'g',
		72: 'h',
		73: 'i',
		74: 'j',
		75: 'k',
		76: 'l',
		77: 'm',
		78: 'n',
		79: 'o',
		80: 'p',
		81: 'q',
		82: 'r',
		83: 's',
		84: 't',
		85: 'u',
		86: 'v',
		87: 'w',
		88: 'x',
		89: 'y',
		90: 'z',
		91: 'Windows Key / Left ⌘ / Chromebook Search key',
		92: 'right window key',
		93: 'Windows Menu / Right ⌘',
		95: 'sleep',
		96: 'numpad 0',
		97: 'numpad 1',
		98: 'numpad 2',
		99: 'numpad 3',
		100: 'numpad 4',
		101: 'numpad 5',
		102: 'numpad 6',
		103: 'numpad 7',
		104: 'numpad 8',
		105: 'numpad 9',
		106: 'multiply',
		107: 'add',
		108: 'numpad period (firefox)',
		109: 'subtract',
		110: 'decimal point',
		111: 'divide',
		112: 'f1',
		113: 'f2',
		114: 'f3',
		115: 'f4',
		116: 'f5',
		117: 'f6',
		118: 'f7',
		119: 'f8',
		120: 'f9',
		121: 'f10',
		122: 'f11',
		123: 'f12',
		124: 'f13',
		125: 'f14',
		126: 'f15',
		127: 'f16',
		128: 'f17',
		129: 'f18',
		130: 'f19',
		131: 'f20',
		132: 'f21',
		133: 'f22',
		134: 'f23',
		135: 'f24',
		136: 'f25',
		137: 'f26',
		138: 'f27',
		139: 'f28',
		140: 'f29',
		141: 'f30',
		142: 'f31',
		143: 'f32',
		144: 'num lock',
		145: 'scroll lock',
		151: 'airplane mode',
		160: '^',
		161: '!',
		162: '؛ (arabic semicolon)',
		163: '#',
		164: '$',
		165: 'ù',
		166: 'page backward',
		167: 'page forward',
		168: 'refresh',
		169: 'closing paren (AZERTY)',
		170: '*',
		171: '~ + * key',
		172: 'home key',
		173: 'minus (firefox), mute/unmute',
		174: 'decrease volume level',
		175: 'increase volume level',
		176: 'next',
		177: 'previous',
		178: 'stop',
		179: 'play/pause',
		180: 'e-mail',
		181: 'mute/unmute (firefox)',
		182: 'decrease volume level (firefox)',
		183: 'increase volume level (firefox)',
		186: 'semi-colon / ñ',
		187: 'equal sign',
		188: 'comma',
		189: 'dash',
		190: 'period',
		191: 'forward slash / ç',
		192: 'grave accent / ñ / æ / ö',
		193: '?, / or °',
		194: 'numpad period (chrome)',
		219: 'open bracket',
		220: 'back slash',
		221: 'close bracket / å',
		222: 'single quote / ø / ä',
		223: '`',
		224: 'left or right ⌘ key (firefox)',
		225: 'altgr',
		226: '< /git >, left back slash',
		230: 'GNOME Compose Key',
		231: 'ç',
		233: 'XF86Forward',
		234: 'XF86Back',
		235: 'non-conversion',
		240: 'alphanumeric',
		242: 'hiragana/katakana',
		243: 'half-width/full-width',
		244: 'kanji',
		251: 'unlock trackpad (Chrome/Edge)',
		255: 'toggle touchpad',
		}
	var regkey = 'E'
	function KeyInput(k) {
		for (const key in keyCodes) {
			if (key == k && keyCodes[key] == regkey) {
				hidepop()
				zone_event(currentevent)
			}
		}
	}
	function zone_event(t) {
		if (t == undefined) {
			t = currentevent
			hidepop()
		}
		var data = {table:t};
		$.post("https://renzu_popui/zone_event",JSON.stringify(data),function(datab){});
	}
	function close() {
		var data = {};
		$.post("https://renzu_popui/close",JSON.stringify(data),function(datab){});
	}
	var pop = false
	document.onkeyup = function (data) {
		if (data.keyCode == '8') { // BACKSPACE
			if (pop) {
				hidepop()
			}
		}
		if (data.keyCode == '13') { // ENTER
			if (pop && currentevent !== undefined) {
				hidepop()
				zone_event(currentevent)
			}
		}
		KeyInput(data.keyCode)
	}

	function distance( x1, y1, x2, y2 ) {
		var dx = x1-x2;
		var dy = y1-y2;
		return Math.sqrt( dx*dx + dy*dy );
	}

  function showpop(table,invehicle) {
	if (!table['event']) { return }
	pop = true
	currentevent = table
	if (invehicle) {
		document.getElementById("title").innerHTML = table['invehicle_title'];
	} else {
		document.getElementById("title").innerHTML = table['title'];
	}
	if (table['key']) {
		regkey = table['key'].toLowerCase()
	}
	if (table['confirm']) {
		document.getElementById("confirm").innerHTML = 'Enter';
		document.getElementById("reject").innerHTML = 'Close';
	}
	document.getElementById("fa").innerHTML = table['fa'];
	var btn = document.querySelector( '.btn' );
	var ClientX = $(window).width();
	var ClientY = $(window).height();
	var mx = ClientX - btn.offsetLeft,
	my = ClientY - btn.offsetTop;

	var w = btn.offsetWidth,
	h = btn.offsetHeight;

	var directions = [
	  { id: 'top', x: w/2, y: 0 },
	  { id: 'right', x: w, y: h/2 },
	  { id: 'bottom', x: w/2, y: h },
	  { id: 'left', x: 0, y: h/2 }
	];

	directions.sort( function( a, b ) {
	  return distance( mx, my, a.x, a.y ) - distance( mx, my, b.x, b.y );
	} );

	directions.shift().id
	btn.setAttribute( 'data-direction', directions.shift().id );
	btn.classList.add( 'is-open' );
  }

	function hidepop() {
		close()
		var btn = document.querySelector( '.btn' );
		btn.classList.remove( 'is-open' );
		window.location.reload(false)
	}

	var current = undefined
	window.addEventListener('message', function (table) {
	  let event = table.data;
	  if (event.type == 'inzone') {
		document.getElementById("popbutton").style.display = 'block';
		if (event.table['type'] == 'drawtext') {
			document.getElementById("confirmtext").style.display = 'none';
			document.getElementById("rejectext").style.display = 'none';
		}
		showpop(event.table,event.invehicle)
	  }
	  if (event.type == 'outzone') {
		hidepop()
		close()
		document.getElementById("popbutton").style.display = 'none';
	  }
	  if (event.type == 'reset') {
		window.location.reload(false)
	  }
	});