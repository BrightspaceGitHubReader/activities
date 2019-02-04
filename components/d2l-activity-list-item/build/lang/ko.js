'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = {
			'enroll': 'Enroll'
		};
	}
};

export const LangKo = dedupingMixin(LangKoImpl);
