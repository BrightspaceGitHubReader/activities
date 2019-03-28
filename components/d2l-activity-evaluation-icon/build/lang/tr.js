'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'draftInfo': 'Değerlendirme taslak olarak kaydedildi'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);

