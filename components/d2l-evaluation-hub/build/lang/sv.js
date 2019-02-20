'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'activityName': 'Aktivitetsnamn',
			'courseName': 'Kurs',
			'displayName': 'Förnamn, efternamn',
			'loading': 'Loading',
			'loadMore': 'Ladda mer',
			'submissionDate': 'Inlämningsdatum',
			'masterTeacher': 'Master Teacher'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);

