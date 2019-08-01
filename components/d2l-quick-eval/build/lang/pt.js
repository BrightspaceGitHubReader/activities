'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'activities': 'Atividades',
			'activityName': 'Nome da Atividade',
			'assignment': 'Atribuição',
			'caughtUp': 'Você está em dia!',
			'checkBackOften': 'Verifique com frequência se há novos envios.',
			'clearSearch': 'Limpar Pesquisa',
			'close': 'Close',
			'completed': 'Concluído',
			'confirmation': 'Confirmation',
			'courseName': 'Curso',
			'discussion': 'Discussão',
			'displayName': 'Nome e Sobrenome',
			'due': 'Prazo: {date}',
			'evaluate': 'Avaliar {displayName}',
			'evaluateAll': 'Avaliar Tudo',
			'evaluated': 'Avaliado',
			'failedToFilter': 'Não foi possível aplicar o filtro. Tente novamente em alguns minutos.',
			'failedToLoadData': 'Não foi possível carregar os envios. Tente novamente em alguns minutos.',
			'failedToLoadMore': 'Não foi possível carregar mais envios. Tente novamente em alguns minutos.',
			'failedToSearch': 'Não foi possível aplicar pesquisa. Tente novamente em alguns minutos.',
			'firstName': 'Nome',
			'lastName': 'Sobrenome',
			'loadMore': 'Carregar mais',
			'loading': 'Carregando',
			'masterTeacher': 'Professor',
			'no': 'No',
			'noCriteriaMatch': 'Não há nenhum envio correspondente aos seus critérios.',
			'noResults': 'Nenhum resultado aqui.',
			'noSubmissions': 'Não há envios que precisem de sua atenção.',
			'publishAll': 'Publicar Tudo',
			'publishAllConfirmDialogMessageForAssignment': '{evaluated} out of {assigned} users will receive feedback on publishing. Do you want to continue?',
			'publishAllConfirmDialogMessageForDiscussion': 'Any previously entered grades for this activity will be overwritten. Continue?',
			'published': 'Publicado',
			'quiz': 'Questionário',
			'search': 'Pesquisar',
			'searchResultsMore': '{num}+ resultados da pesquisa',
			'searchResultsMultiple': '{num} resultados da pesquisa',
			'searchResultsSingle': '1 resultado da pesquisa',
			'sortBy': 'Classificar por {columnName}',
			'submissionDate': 'Data do Envio',
			'submissionList': 'Lista de Envio',
			'submissions': 'Envios',
			'tableTitle': 'Lista de envios de alunos não avaliados de todos os cursos e ferramentas',
			'tryAgain': 'Tentar novamente',
			'newSubmissions': 'new submissions',
			'newSubmissionDetails': '{newNum} new, {resub} resubmissions',
			'newPosts': 'new posts',
			'newPostDetails': '{newNum} new, {resub} reposts',
			'newAttempts': 'new attempts',
			'newAttemptsDetails': '{newNum} new',
			'viewBy': 'Exibir por:',
			'yes': 'Yes'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);

