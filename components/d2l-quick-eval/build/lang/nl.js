'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'activities': 'Activiteiten',
			'activityName': 'Naam activiteit',
			'assignment': 'Opdracht',
			'caughtUp': 'U bent weer helemaal bij!',
			'checkBackOften': 'Kijk regelmatig of er nieuwe indieningen zijn.',
			'clearSearch': 'Zoekopdracht wissen',
			'close': 'Sluiten',
			'completed': 'Voltooid',
			'confirmation': 'Bevestiging',
			'courseName': 'Cursus',
			'discussion': 'Discussie',
			'displayName': 'Voornaam, achternaam',
			'due': 'Uiterste datum: {date}',
			'evaluate': '{displayName} evalueren',
			'evaluateAll': 'Alles evalueren',
			'evaluated': 'Geëvalueerd',
			'failedToFilter': 'Kan filter niet toepassen. Probeer het nogmaals over een paar minuten.',
			'failedToLoadActivities': 'Kan activiteiten niet laden. Probeer het nogmaals over een paar minuten.',
			'failedToLoadData': 'Kan indieningen niet laden. Probeer het nogmaals over een paar minuten.',
			'failedToLoadMore': 'Kan niet meer indieningen laden. Probeer het nogmaals over een paar minuten.',
			'failedToSearch': 'Kan zoekopdracht niet toepassen. Probeer het nogmaals over een paar minuten.',
			'firstName': 'Voornaam',
			'lastName': 'Achternaam',
			'loadMore': 'Meer laden',
			'loading': 'Laden',
			'masterTeacher': 'Docent',
			'newAttempts': 'Nieuwe pogingen',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 nieuwe poging} other {{reAttemptNum} nieuwe pogingen}}} other {{reAttemptNum, plural, =0 {{newNum} nieuw} =1{{newNum} nieuw, 1 nieuwe poging} other {{newNum} nieuw, {reAttemptNum} nieuwe pogingen}}}}',
			'newPostDetails': '{numInteractions, plural, =1 {1 thread of antwoord} other {{numInteractions} threads of antwoorden}}',
			'newPosts': 'Nieuwe publicaties',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 herindiening} other {{resub} herindieningen}}} other {{resub, plural, =0 {{newNum} nieuw} =1{{newNum} nieuw, 1 herindiening} other {{newNum} nieuw, {resub} herindieningen}}}}',
			'newSubmissions': 'Nieuwe herindieningen',
			'no': 'Nee',
			'noCriteriaMatch': 'Er zijn geen indieningen die overeenkomen met uw criteria.',
			'noCriteriaMatchActivities': 'Er zijn geen activiteiten die overeenkomen met uw criteria.',
			'noResults': 'Geen resultaten hier.',
			'noSubmissions': 'Er zijn geen indieningen die uw aandacht nodig hebben.',
			'publishAll': 'Alles publiceren',
			'publishAllConfirmDialogMessage': '{evaluated} van de {assigned} gebruikers ontvangt feedback over publicatie. Wilt u doorgaan?',
			'publishAllToastMessage': '{activityName} evaluaties zijn gepubliceerd.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluaties zijn gepubliceerd.',
			'published': 'Gepubliceerd',
			'quiz': 'Test',
			'search': 'Zoeken',
			'searchResultsMore': '{num}+ zoekresultaten',
			'searchResultsMultiple': '{num} zoekresultaten',
			'searchResultsSingle': '1 zoekresultaat',
			'sortBy': 'Sorteren op {columnName}',
			'submissionDate': 'Datum van indiening',
			'submissionList': 'Lijst met indieningen',
			'submissions': 'Indieningen',
			'tableTitle': 'Lijst van niet-geëvalueerde indieningen van cursisten van alle cursussen en tools',
			'toggleIndicatorLabelActions': 'Acties uitvoeren op {target}',
			'toggleIndicatorLabelInfo': 'Informatie over {target} weergeven',
			'tryAgain': 'Probeer het opnieuw',
			'viewBy': 'Weergeven op:',
			'yes': 'Ja'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);

