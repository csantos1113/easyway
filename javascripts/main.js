(function() {
	function pad(pad, str, padLeft) {
		if (typeof str === 'undefined')
			return pad;
		if (padLeft) {
			return (pad + str).slice(-pad.length);
		} else {
			return (str + pad).substring(0, pad.length);
		}
	}
	Date.prototype.addDays = function(days) {
		this.setDate(this.getDate() + parseInt(days));
		return this;
	};
	Date.prototype.getMonthName = function() {
		var month = this.getMonth();
		return monthNames[month];
	};

	function getStartDate(saturday) {
		var currentDate = new Date();
		var currentDay = currentDate.getDay();
		var correctDay = saturday ? 6 : 5;

		if (currentDay === correctDay) {
			return currentDate;
		}
		var difference = currentDay - correctDay;
		if (difference < 0) {
			currentDate.addDays(difference * -1);
		} else {
			currentDate.addDays((7 - currentDay) + correctDay);
		}
		return currentDate;
	}

	function getLanLink(destinationCode, destinationName, endDayPad, endMonthPad, endYear, originCode, originName, startDayPad, startMonthPad, startYear) {
		var link = 'http://booking.lan.com/es_co/apps/personas/compra' +
			'?fecha1_dia=' + startDayPad +
			'&fecha1_anomes=' + startYear + '-' + startMonthPad +
			'&fecha2_dia=' + endDayPad +
			'&fecha2_anomes=' + endYear + '-' + endMonthPad +
			'&from_city2=' + destinationCode +
			'&to_city2=' + originCode +
			'&auAvailability=1' +
			'&ida_vuelta=ida_vuelta' +
			'&vuelos_origen=' + originName +
			'&from_city1=' + originCode +
			'&vuelos_destino=' + destinationName +
			'&to_city1=' + destinationCode +
			'&flex=1' +
			'&vuelos_fecha_salida_ddmmaaaa=' + startDayPad + '/' + startMonthPad + '/' + startYear +
			'&vuelos_fecha_regreso_ddmmaaaa=' + endDayPad + '/' + endMonthPad + '/' + endYear +
			'&cabina=Y' +
			'&nadults=1' +
			'&nchildren=0' +
			'&ninfants=0';
		return `<a href="${link}" target="_blank">LATAM</a>`;
	}

	function getAviancaLink(originCode, destinationCode, startLabel, endLabel) {
		var link = 'http://compra.avianca.com/NBAmadeus/InicioAmadeus.aspx' +
			'?cco=' + originCode +
			'&ccd=' + destinationCode +
			'&fi=' + startLabel +
			'&fr=' + endLabel +
			'&na=1' +
			'&nn=0' +
			'&ni=0' +
			'&lan=ES' +
			'&tt=4' +
			'&Pais=CO' +
			'&ccorp=0' +
			'&hvi=0' +
			'&hvr=0' +
			'&tarifa=0' +
			'&VInt=no' +
			'&SistemaOrigen=AH' +
			'&Cabina=0' +
			'&FFl=true' +
			'&FriendlyID=' +
			'&FriendlyIDNegoF=' +
			'&tv=true' +
			'&MPD=8621' +
			'&IvaMPD=1379' +
			'&WS=null';
		return `<a href="${link}" target="_blank">Avianca</a>`;
	}

	function getDespegarLink(originCode, destinationCode, startYear, startMonthPad, startDayPad, endYear, endMonthPad, endDayPad) {
		var link = 'http://www.despegar.com.co/shop/flights/results/roundtrip/' +
			originCode + '/' +
			destinationCode + '/' +
			startYear + '-' + startMonthPad + '-' + startDayPad + '/' +
			endYear + '-' + endMonthPad + '-' + endDayPad + '/1/0/0';
		return `<a href="${link}" target="_blank">Despegar</a>`;
	}

	function showFlies(from, to) {
		var originCode = from.code;
		var originName = encodeURIComponent(from.name);
		var destinationCode = to.code;
		var destinationName = encodeURIComponent(to.name);
		var selected = intervals[$("#options").val()];
		if (!selected) {
			alert("It's not yet enabled.");
			throw ("sorry");
		}
		var startDate = getStartDate(selected.startSaturday);
		var urls = '';
		while (startDate < endDate) {
			var startDay = startDate.getDate();
			var startDayPad = pad('00', startDay, true);
			var startMonthPad = pad('00', startDate.getMonth() + 1, true);
			var startYear = startDate.getFullYear();
			var startLabel = `${startDayPad}${startDate.getMonthName()}`;
			startDate.addDays(selected.interval);
			var endDay = startDate.getDate();
			var endDayPad = pad('00', endDay, true);
			var endMonthPad = pad('00', startDate.getMonth() + 1, true);
			var endYear = startDate.getFullYear();
			var endLabel = `${endDayPad}${startDate.getMonthName()}`;
			var lanLink = getLanLink(destinationCode, destinationName, endDayPad, endMonthPad, endYear, originCode, originName, startDayPad, startMonthPad, startYear);
			var aviancaLink = getAviancaLink(originCode, destinationCode, startLabel, endLabel);
			var despegarLink = getDespegarLink(originCode, destinationCode, startYear, startMonthPad, startDayPad, endYear, endMonthPad, endDayPad);
			urls += `<tr><td>${startLabel} - ${endLabel}</td><td>${aviancaLink}</td><td>${lanLink}</td><td>${despegarLink}</td></tr>`;
			startDate.addDays(selected.nextWeek);
		}
		$('#content').html(`${$('#content').html()}<section><h2>${from.code} -> ${to.code} -> ${from.code}</h2><table>${urls}</table></section>`);
	}

	function generateLinks() {
		$('#content').html('');
		for (var i = 0; i < trips.length; i++) {
			showFlies(trips[i].from, trips[i].to);
		}
	}
	$("#options").change(function() {
		generateLinks();
	});

	generateLinks();
})();