/**
 * 小程序key
 */
export const amapAppKey = "57aa4246d0ae99a310e2bfcac69ec5ef";

/**
 * 高德后台接口服务key
 */
export const amapWebApiKey = "9be52df947f2b47e969963717d7374d4";

export const userAgreementUrl = "http://localhost:8080/informed_consent.html";

export const riskEvaluationQuestion = function () {
	return [{
		"title": "1.您是否有医院确诊的心脏病",
		"answers": ["是", "否"],
		"selectIndexSet": [1],
		"isSingleChoise": true
	},
	{
		"title": "2.您的安静时血压是否收缩压超过",
		"answers": ["是", "否"],
		"selectIndexSet": [1],
		"isSingleChoise": true
	},
	{
		"title": "3.您平时生活或者运动中是否出现过胸闷或缺血性胸痛（心绞痛）？",
		"answers": ["是", "否"],
		"selectIndexSet": [1],
		"isSingleChoise": true
	},
	{
		"title": "4.一年内您是否曾因头晕跌倒或曾失去知觉过？",
		"answers": ["是", "否"],
		"selectIndexSet": [1],
		"isSingleChoise": true
	},
	{
		"title": "5.医生是否告诉过您只能参加强度较轻的身体活动？",
		"answers": ["是", "否"],
		"selectIndexSet": [1],
		"isSingleChoise": true
	},
	{
		"title": "6.您是否会因为运动使关节疼痛加重？",
		"answers": ["是", "否"],
		"selectIndexSet": [1],
		"isSingleChoise": true
	},
	{
		"title": "7.您是否有其他不能参加运动的原因？",
		"answers": ["是", "否"],
		"selectIndexSet": [1],
		"isSingleChoise": true
	}
	];
};


/**
 * 健康问卷
 */
export const heathAskQuestion = function () {
	return {
		questionsUni1: [{
			"title": "1.您是否患有下列疾病",
			"answers": ["高血压", "高血脂", "糖尿病", "冠心病", "无"],
			"selectIndexSet": [],
			"isSingleChoise": true
		},
		{
			"title": "2.您是否吸烟",
			"answers": ["是", "否"],
			"selectIndexSet": [],
			"isSingleChoise": true
		},
		{
			"title": "3.您是否喝酒",
			"answers": ["是", "否"],
			"selectIndexSet": [],
			"isSingleChoise": true
		},
		{
			"title": "4.您的运动频率",
			"answers": ["不运动", "偶尔", "经常"],
			"selectIndexSet": [],
			"isSingleChoise": true
		},
		{
			"title": "5.您的运动强度",
			"answers": ["低", "中", "高"],
			"selectIndexSet": [],
			"isSingleChoise": true
		},
		],

		questionsUni2: [{

			"typeTitle": "1.心血管疾病",
			"data": [{
				"title": "先天性心脏病",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			},
			{
				"title": "心衰",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			},
			{
				"title": "心肌缺血",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "冠心病",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "慢性风湿性心脏病",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "心脏外科手术",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "心脏介入治（冠脉造影、支架、射频、扩瓣、起搏器）",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "高血压",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			},

			]

		}, {

			"typeTitle": "2.肺部疾病",
			"data": [{
				"title": "慢性支气管炎",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			},
			{
				"title": "慢性阻塞性肺病",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "支气管扩张",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "哮喘",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "肺气肿",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "其他慢性呼吸系统疾病",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			},

			]

		}, {

			"typeTitle": "3.代谢系统疾病",
			"data": [{
				"title": "血脂异常",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			},
			{
				"title": "2型糖尿病",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "痛风",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "骨质疏松",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "环血病",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "其他代谢系统疾病",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			},
			]

		}, {

			"typeTitle": "4.其他疾病",
			"data": [{
				"title": "脑血管病",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			},
			{
				"title": "肿瘤",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}, {
				"title": "脂肪肝",
				"answers": ["您", "您的家属"],
				"selectIndexSet": [],
				"isSingleChoise": false
			}
			]

		}],

		questionsUni3: [{
			"title": "您是出现过下列症状和相关健康问题？",
			"answers": ["1.肥胖", "2.动脉粥样化", "3做体力活动时有过胸部不适", "有过原因不明的呼吸停止",
				"5.有过原因不明的头晕眼花、晕倒或眩晕", "6有过不明原因的突然心跳加速或者房颤的情况",
				"7.在步行的时候 出现过这样的情况：不走路时没有明显不适，但走一段路会出现下肢疼痛，越走越疼导致不得不停下休息，休息一段时间后疼痛缓解，又可以继续走路",
				"8.有限制活动的肌肉、骨骼或关节问题", "9.已经绝经？（女性回答）",
				"10.有夜间失眠（各种原因引起入睡困难、睡眠深度或频率过短、早睡及睡眠时间不足或质量差等）或睡眠不良（包括多梦、觉醒次数过多造成醒后感觉疲乏）的情况",
				"11.有打鼾的情况", "12.白天有精神状态不佳的情况（例如疲乏困倦、昏昏欲睡等）", "13.过去的一年中经历过因为压力、紧张和抑郁而影响到您健康的事情",
			],
			"selectIndexSet": [-1],
			"isSingleChoise": false
		},
		{
			"title": "服药史",
			"answers": ["1.长期服用药物", "2.降血压药", "3降血糖药", "降血脂药", "减肥药", "心脏病药物", "钙片", "其他"],
			"selectIndexSet": [-1],
			"isSingleChoise": false
		}
		]
	};
};

export const bodyTestData = function () {
	return {
		bodyParamsUnit1: [{
			"name": "身高",
			"unit": "厘米:cm",
			"value": null,
			validator: (value : number) => {
				return value > 10 && value < 300;
			},
		}, {
			"name": "体重",
			"unit": "千克:kg",
			"value:": null,
			validator: (value : number) => {
				return value > 10 && value < 200;
			},
		}, {
			"name": "腰围",
			"unit": "厘米:cm",
			"value:": null,
			validator: (value : number) => {
				return value > 0 && value < 200;
			},
		}, {
			"name": "臀围",
			"unit": "厘米:cm",
			"value:": null,
			validator: (value : number) => {
				return value > 0 && value < 200;
			},
		}, {
			"name": "体脂率",
			"unit": "百分比:%",
			"value:": null,
			validator: (value : number) => {
				return value >= 0 && value <= 100;
			},
		},],

		bodyParamsUnit2: [{
			"name": "收缩压",
			"unit": "毫米汞柱:mmHg",
			"value": null,
			validator: (value : number) => {
				return value >= 0 && value <= 300;
			},
		}, {
			"name": "舒张压",
			"unit": "毫米汞柱:mmHg",
			"value:": null,
			validator: (value : number) => {
				return value >= 0 && value <= 300;
			},
		}, {
			"name": "功率车二级负荷实验",
			"unit": "毫升/千克/分钟:ml/kg/min",
			"value:": null,
			validator: (value : number) => {
				return value >= 0 && value <= 3000;
			},
		}, {
			"name": "安静脉搏",
			"unit": "次/分钟:bpm",
			"value:": null,
			validator: (value : number) => {
				return value >= 10 && value <= 200;
			},
		}, {
			"name": "肺活量",
			"unit": "毫升:ml",
			"value:": null,
			validator: (value : number) => {
				return value >= 0 && value <= 10000;
			},
		},],

		bodyParamsUnit3: [{
			"name": "握力",
			"unit": "千克:kg",
			"value": null,
			"score": 0,
			validator: (value : number) => {
				return value > 0 && value < 100;
			},
		}, {
			"name": "背力",
			"unit": "千克:kg",
			"value:": null,
			"score": 0,
			validator: (value : number) => {
				return value > 0 && value < 500;
			},
		}, {
			"name": "纵跳",
			"unit": "厘米:cm",
			"value:": null,
			"score": 0,
			validator: (value : number) => {
				return value > 0 && value < 300;
			},
		}, {
			"name": "俯卧撑",
			"unit": "次",
			"value:": null,
			"score": 0,
			validator: (value : number) => {
				return value > 0 && value < 1000;
			},
		}, {
			"name": "跪卧撑",
			"unit": "次",
			"value:": null,
			"score": 0,
			validator: (value : number) => {
				return value > 0 && value < 1000;
			},
		}, {
			"name": "一分钟仰卧起坐",
			"unit": "次",
			"value:": null,
			"score": 0,
			validator: (value : number) => {
				return value > 0 && value < 1000;
			},
		}, {
			"name": "坐位体前屈",
			"unit": "厘米:cm",
			"value:": null,
			"score": 0,
			validator: (value : number) => {
				return value > -50 && value < 200;
			},
		}, {
			"name": "闭眼单脚站立",
			"unit": "秒:s",
			"value:": null,
			"score": 0,
			validator: (value : number) => {
				return value > 0 && value < 2000;
			},
		}, {
			"name": "选择反应时",
			"unit": "秒:s",
			"value:": null,
			"score": 0,
			validator: (value : number) => {
				return value > 0 && value < 2000;
			},
		},]
	};
};

/**
 * 有氧运动
 */
export const aerobicExerciseItems = function () {
	return [
		{ "label": "快走", "value": "kz" },
		{ "label": "慢跑", "value": "mp" },
		{ "label": "自行车", "value": "zxc" },
		{ "label": "跑步机", "value": "pbj" },
		{ "label": "健身操", "value": "jsc" },
		{ "label": "划船机", "value": "hcj" },
		{ "label": "其他", "value": "other" }
	];
}

export const strengthTrainingItems = function () {
	return [
		{ "label": "上肢肌群", "value": "szjq" },
		{ "label": "下肢肌群", "value": "xzjq" },
		{ "label": "腰背肌", "value": "ybj" },
		{ "label": "腹肌", "value": "fj" },

	];
}

export const defaultRiskWarning = "感冒、熬夜、酒后禁止运动。\n运动中出现胸闷、胸痛、气短、恶心等情况应该立即停止运动。\n运动后不能立即洗澡，防止出现晕厥跌倒。\n运动后不要立即大量快速饮水，容易给心脏造成负荷。";