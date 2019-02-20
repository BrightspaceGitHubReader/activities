'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'activityName': 'Nom de l\'activité',
			'courseName': 'Cours',
			'displayName': 'Prénom et Nom de famille',
			'loading': 'Loading',
			'loadMore': 'En voir plus',
			'submissionDate': 'Date de soumission',
			'masterTeacher': 'Master Teacher'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);

