'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'clickToViewActivity': 'クリックしてアクティビティを表示',
			'enroll': '登録'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);

