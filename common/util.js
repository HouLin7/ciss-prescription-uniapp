function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function(n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}

function isValidPhoneNumber(phone) {
	const phoneRegex = /^1[3-9]\d{9}$/;
	return phoneRegex.test(phone);
}


/**
 * 是否是微信真机环境
 */
function isWexinRuntime() {
	let result = uni.getSystemInfoSync();
	return result.platform === 'android' || result.platform === 'iOS';
}

function calculateAge(birthday) {
	const birthDate = new Date(birthday); // 解析生日
	const today = new Date(); // 当前日期

	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();
	const dayDiff = today.getDate() - birthDate.getDate();

	// 如果生日还没过，减去 1 岁
	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age;
}

var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function(milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	formatYYMMDD: function(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // 补零
		const day = String(date.getDate()).padStart(2, '0'); // 补零
		return `${year}-${month}-${day}`;
	},

	formatYYMMDDHHMMSS: function(date) {
		let yyyy = date.getFullYear();
		let MM = String(date.getMonth() + 1).padStart(2, '0'); // 月份补 0
		let dd = String(date.getDate()).padStart(2, '0'); // 日期补 0
		let HH = String(date.getHours()).padStart(2, '0');
		let mm = String(date.getMinutes()).padStart(2, '0');
		let ss = String(date.getSeconds()).padStart(2, '0');
		return `${yyyy}-${MM}-${dd} ${HH}:${mm}:${ss}`;
	},

	format: function(dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function(number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function(str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

export {
	formatTime,
	formatLocation,
	dateUtils,
	isWexinRuntime,
	isValidPhoneNumber,
	calculateAge
}