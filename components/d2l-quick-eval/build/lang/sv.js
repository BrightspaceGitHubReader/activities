'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'activities': 'Aktiviteter',
			'activityName': 'Aktivitetsnamn',
			'assignment': 'Uppgift',
			'caughtUp': 'Du är ifatt!',
			'checkBackOften': 'Du bör kontrollera om det finns nya inlämningar här med regelbundna intervall.',
			'clearSearch': 'Rensa sökning',
			'completed': 'Slutförd',
			'courseName': 'Kurs',
			'discussion': 'Diskussion',
			'displayName': 'Förnamn, efternamn',
			'due': 'Förfaller: {date}',
			'evaluate': 'Utvärdera {displayName}',
			'evaluateAll': 'Utvärdera alla',
			'evaluated': 'Utvärderad',
			'failedToFilter': 'Det gick inte att använda filtret. Försök igen om några minuter.',
			'failedToLoadData': 'Det gick inte att läsa in inlämningarna. Försök igen om några minuter.',
			'failedToLoadMore': 'Det gick inte att läsa in fler inlämningar. Försök igen om några minuter.',
			'failedToSearch': 'Det gick inte att använda sökningen. Försök igen om några minuter.',
			'firstName': 'Förnamn',
			'lastName': 'Efternamn',
			'loadMore': 'Ladda mer',
			'loading': 'Laddar',
			'masterTeacher': 'Lärare',
			'noCriteriaMatch': 'Det finns inga inlämningar som matchar dina kriterier.',
			'noResults': 'Det finns inga resultat här.',
			'noSubmissions': 'Det finns inga inlämningar som du behöver utföra någon åtgärd på.',
			'publishAll': 'Publicera alla',
			'published': 'Publicerad',
			'quiz': 'Förhör',
			'search': 'Sökning',
			'searchResultsMore': '{num}+ sökresultat',
			'searchResultsMultiple': '{num} sökresultat',
			'searchResultsSingle': '1 sökresultat',
			'sortBy': 'Sortera efter {columnName}',
			'submissionDate': 'Inlämningsdatum',
			'submissionList': 'Inlämningslista',
			'submissions': 'inlämningar',
			'tableTitle': 'Lista över ej utvärderade elevinlämningar från kurser och verktyg',
			'tryAgain': 'Försök på nytt',
			'newSubmissions': '{num} new submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newPosts': '{num} new posts',
			'newPostDetails': '{newNum} new, {resub} reposts',
			'newAttempts': '{num} new attempts',
			'newAttemptsDetails': '{newNum} new',
			'viewBy': 'Visa enligt:'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);
