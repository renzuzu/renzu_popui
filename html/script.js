	var current = {}
	var currentevent = undefined
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
	document.getElementById("confirm").innerHTML = table['confirm'];
	document.getElementById("reject").innerHTML = table['reject'];
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

	console.log(directions.shift().id)
	console.clear();
	btn.setAttribute( 'data-direction', directions.shift().id );
	btn.classList.add( 'is-open' );
  }

	function hidepop() {
		pop = false
		var btn = document.querySelector( '.btn' );
		btn.classList.remove( 'is-open' );
		close()
	}

	var current = undefined
	window.addEventListener('message', function (table) {
	  let event = table.data;
	  if (event.type == 'inzone') {
		  //console.log("ASO")
		showpop(event.table,event.invehicle)
	  }
	  if (event.type == 'outzone') {
		hidepop()
		close()
	  }
	  if (event.type == 'reset') {
		window.location.reload(false);
		//console.log("reset")
	  }
	});