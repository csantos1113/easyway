var monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

var endDate = new Date();
endDate.setFullYear(endDate.getFullYear() + 1);

var intervals = {
	frisun: {
		interval: 2,
		nextWeek: 5,
		startSaturday: false
	},
	frimon: {
		interval: 3,
		nextWeek: 4,
		startSaturday: false
	},
	satsun: {
		interval: 1,
		nextWeek: 6,
		startSaturday: true
	},
	satmon: {
		interval: 2,
		nextWeek: 5,
		startSaturday: true
	}
};
var cali = {
	code: 'CLO',
	name: 'Cali'
};
var medellin = {
	code: 'MDE',
	name: 'Medellín'
};
var bucaramanga = {
	code: 'BGA',
	name: 'Bucaramanga'
};
var trips = [{
	from: medellin,
	to: cali
}, {
	from: medellin,
	to: bucaramanga
}, {
	from: cali,
	to: medellin
}, {
	from: cali,
	to: bucaramanga
}];