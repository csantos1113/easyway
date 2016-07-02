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
	var names = [
		'JAN',
		'FEB',
		'MAR',
		'APR',
		'MAY',
		'JUN',
		'JUL',
		'AUG',
		'SEP',
		'OCT',
		'NOV',
		'DEC'
	];
	return names[month];
};

function getStartDate(saturday) {
	var actual = new Date();
	var diaActual = actual.getDay();
	var correctDay = saturday ? 6 : 5;

	if (diaActual === correctDay) {
		return actual;
	}
	var resta = diaActual - correctDay;
	if (resta < 0) {
		actual.addDays(resta * -1);
	} else {
		actual.addDays((7 - diaActual) + correctDay);
	}
	return actual;
}

function mostrar(desde, hasta) {
	var origen = desde.sigla;
	var origen2 = encodeURIComponent(desde.nombre);
	var destino = hasta.sigla;
	var destino2 = encodeURIComponent(hasta.nombre);
	var startDate = getStartDate(true);
	var endDate = new Date();
	endDate.setFullYear(endDate.getFullYear() + 1);
	var breakpoint = 100;
	var counter = 0;
	var basura = '';
	while (startDate < endDate) {
		var dia11 = startDate.getDate();
		var dia1 = pad('00', dia11, true);
		var mes1 = pad('00', startDate.getMonth() + 1, true);
		var ano1 = startDate.getFullYear();
		var inicio = `${dia11}${startDate.getMonthName()}`;
		startDate.addDays(2);
		var dia22 = startDate.getDate();
		var dia2 = pad('00', dia22, true);
		var mes2 = pad('00', startDate.getMonth() + 1, true);
		var ano2 = startDate.getFullYear();
		var fin = `${dia22}${startDate.getMonthName()}`;
		var ref = (`http://compra.avianca.com/NBAmadeus/InicioAmadeus.aspx?cco=${origen}&ccd=${destino}&fi=${inicio}&fr=${fin}&na=1&nn=0&ni=0&lan=ES&tt=4&Pais=CO&ccorp=0&hvi=0&hvr=0&tarifa=0&VInt=no&SistemaOrigen=AH&Cabina=0&FFl=true&FriendlyID=&FriendlyIDNegoF=&tv=true&MPD=8621&IvaMPD=1379&WS=null`);
		var refLan = (`http://booking.lan.com/es_co/apps/personas/compra?fecha1_dia=${dia1}&fecha1_anomes=${ano1}-${mes1}&fecha2_dia=${dia2}&fecha2_anomes=${ano2}-${mes2}&from_city2=${destino}&to_city2=${origen}&auAvailability=1&ida_vuelta=ida_vuelta&vuelos_origen=${origen2}&from_city1=${origen}&vuelos_destino=${destino2}&to_city1=${destino}&flex=1&vuelos_fecha_salida_ddmmaaaa=${dia1}/${mes1}/${ano1}&vuelos_fecha_regreso_ddmmaaaa=${dia2}/${mes2}/${ano2}&cabina=Y&nadults=1&nchildren=0&ninfants=0`);
		basura += `<tr><td>${inicio} - ${fin}</td><td><a href="${ref}">Avianca</a></td><td><a href="${refLan}">LATAM</a></td></tr>`;
		startDate.addDays(5);
		counter++;
		if (counter > breakpoint) {
			console.log('out');
			break;
		}
	}
	$('#contenido').html(`${$('#contenido').html()}<section><h2>${desde.sigla} -> ${hasta.sigla} -> ${desde.sigla}</h2><table>${basura}</table></section>`);
}
var cali = {
	sigla: 'CLO',
	nombre: 'Cali'
};
var medellin = {
	sigla: 'MDE',
	nombre: 'Medellín'
};
var bucaramanga = {
	sigla: 'BGA',
	nombre: 'Bucaramanga'
};
var viajes = [{
	desde: medellin,
	hasta: cali
}, {
	desde: medellin,
	hasta: bucaramanga
}, {
	desde: cali,
	hasta: medellin
}, {
	desde: cali,
	hasta: bucaramanga
}];
$('#contenido').html('');
for (var i = 0; i < viajes.length; i++) {
	mostrar(viajes[i].desde, viajes[i].hasta);
}