'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'activityName': 'アクティビティ名',
			'courseName': 'コース',
			'displayName': '名, 姓',
			'loading': 'Loading data',
			'loadMore': 'さらに読み込む',
			'submissionDate': '送信日'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);

