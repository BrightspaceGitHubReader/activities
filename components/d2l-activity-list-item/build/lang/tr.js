'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'enroll': 'Kaydol'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

