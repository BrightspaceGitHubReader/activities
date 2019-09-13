'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'activities': 'Actividades',
			'activityName': 'Nombre de la actividad',
			'assignment': 'Asignación',
			'caughtUp': 'Ya está al día.',
			'checkBackOften': 'Vuelva a revisar a menudo para ver los nuevos envíos.',
			'clearSearch': 'Borrar búsqueda',
			'close': 'Cerrar',
			'completed': 'Completado',
			'confirmation': 'Confirmación',
			'courseName': 'Curso',
			'discussion': 'Debate',
			'displayName': 'Nombre, Apellido',
			'due': 'Fecha de entrega: {date}',
			'evaluate': 'Evaluar {displayName}',
			'evaluateAll': 'Evaluar todo',
			'evaluated': 'Evaluado',
			'failedToFilter': 'No se puede aplicar el filtro. Intente de nuevo en algunos minutos.',
			'failedToLoadActivities': 'No se pueden cargar las actividades. Intente de nuevo en algunos minutos.',
			'failedToLoadData': 'No se puede cargar los envíos. Intente de nuevo en algunos minutos.',
			'failedToLoadMore': 'No se puede cargar más envíos. Intente de nuevo en algunos minutos.',
			'failedToSearch': 'No se puede aplicar la búsqueda. Intente de nuevo en algunos minutos.',
			'firstName': 'Nombre',
			'lastName': 'Apellido',
			'loadMore': 'Cargar más',
			'loading': 'Cargando',
			'masterTeacher': 'Profesor',
			'newAttempts': 'Nuevos intentos',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 reintento} other {{reAttemptNum} reintentos}}} other {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} new, 1 reintento} other {{newNum} new, {reAttemptNum} reintentos}}}}',
			'newPostDetails': '{numInteractions, plural, =1 {1 cadena o respuesta} other {{numInteractions} cadenas o respuestas}}',
			'newPosts': 'Nuevas publicaciones',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 reenvío} other {{resub} reenvíos}}} other {{resub, plural, =0 {{newNum} new} =1{{newNum} new, 1 reenvío} other {{newNum} new, {resub} reenvíos}}}}',
			'newSubmissions': 'Nuevos materiales enviados',
			'no': 'No',
			'noCriteriaMatch': 'No hay materiales enviados que coincidan con sus criterios.',
			'noCriteriaMatchActivities': 'No hay actividades que coincidan con sus criterios.',
			'noResults': 'No hay resultados aquí.',
			'noSubmissions': 'No hay envíos que requieran su atención.',
			'publishAll': 'Publicar todo',
			'publishAllConfirmDialogMessage': '{evaluated} de {assigned} usuarios recibirán comentarios sobre la publicación. ¿Desea continuar?',
			'publishAllToastMessage': 'Evaluaciones de {activityName} publicadas correctamente.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… evaluaciones publicadas correctamente.',
			'published': 'Publicado',
			'quiz': 'Cuestionario',
			'search': 'Buscar',
			'searchResultsMore': 'Más de {num} resultados de búsqueda',
			'searchResultsMultiple': '{num} resultados de búsqueda',
			'searchResultsSingle': '1 resultado de búsqueda',
			'sortBy': 'Ordenar por {columnName}',
			'submissionDate': 'Fecha del material enviado',
			'submissionList': 'Lista de material enviado',
			'submissions': 'Materiales enviados',
			'tableTitle': 'Lista de envíos no evaluados del estudiante de todos los cursos y herramientas',
			'toggleIndicatorLabelActions': 'Realizar acciones en {target}',
			'toggleIndicatorLabelInfo': 'Get Info on {target}',
			'tryAgain': 'Volver a intentarlo',
			'viewBy': 'Ver por:',
			'yes': 'Sí'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);

