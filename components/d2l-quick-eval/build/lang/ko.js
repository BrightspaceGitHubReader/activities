'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = {
			'activities': '활동',
			'activityName': '활동 이름',
			'assignment': '과제',
			'caughtUp': '거의 따라잡았습니다!',
			'checkBackOften': '새로운 제출 항목이 있는지 자주 다시 확인하십시오.',
			'clearSearch': '검색 지우기',
			'close': '닫기',
			'completed': '완료됨',
			'confirmation': '확인',
			'courseName': '강의',
			'discussion': '토론',
			'displayName': '이름, 성',
			'due': '기한: {date}',
			'evaluate': '{displayName} 평가',
			'evaluateAll': '모두 평가',
			'evaluated': '평가됨',
			'failedToFilter': '필터를 적용할 수 없습니다. 몇 분 후에 다시 시도하십시오.',
			'failedToLoadActivities': '활동을 로드할 수 없습니다. 몇 분 후에 다시 시도하십시오.',
			'failedToLoadData': '제출 항목을 로드할 수 없습니다. 몇 분 후에 다시 시도하십시오.',
			'failedToLoadMore': '추가 제출 항목을 로드할 수 없습니다. 몇 분 후에 다시 시도하십시오.',
			'failedToSearch': '탐색을 적용할 수 없습니다. 몇 분 후에 다시 시도하십시오.',
			'firstName': '이름',
			'lastName': '성',
			'loadMore': '더 많이 로드',
			'loading': '로드 중',
			'masterTeacher': '교사',
			'newAttempts': '새 시도',
			'newAttemptsDetails': '{newNum, plural, =0 {{reAttemptNum, plural, =1 {1 reattempt} 기타 {{reAttemptNum} reattempts}}} 기타 {{reAttemptNum, plural, =0 {{newNum} new} =1{{newNum} new, 1 reattempt} 기타 {{newNum} new, {reAttemptNum} reattempts}}}}',
			'newPostDetails': '{numInteractions, plural, =1 {1 thread or reply} 기타 {{numInteractions} threads or replies}}',
			'newPosts': '뉴스 게시물',
			'newSubmissionDetails': '{newNum, plural, =0 {{resub, plural, =1 {1 resubmission} other {{resub} resubmissions}}} 기타{{resub, plural, =0 {{newNum} new} =1{{newNum} new, 1 resubmission} 기타 {{newNum} new, {resub} resubmissions}}}}',
			'newSubmissions': '새 제출',
			'no': '아니요',
			'noCriteriaMatch': '기준과 일치하는 제출 항목이 없습니다',
			'noCriteriaMatchActivities': '기준과 일치하는 활동이 없습니다',
			'noResults': '결과가 없습니다.',
			'noSubmissions': '주목할 제출 항목이 없습니다.',
			'publishAll': '모두 게시',
			'publishAllConfirmDialogMessage': '{evaluated} / {assigned} 사용자가 게시에 대한 피드백을 수신합니다. 계속하시겠습니까?',
			'publishAllToastMessage': '{activityName} 평가를 성공적으로 게시했습니다.',
			'publishAllToastMessageTruncated': '{truncatedActivityName}… 평가 양식은 성공적으로 게시되었습니다.',
			'published': '게시됨',
			'quiz': '퀴즈',
			'search': '검색',
			'searchResultsMore': '{num}+ 검색 결과',
			'searchResultsMultiple': '{num} 탐색 결과',
			'searchResultsSingle': '1 탐색 결과',
			'sortBy': '{columnName}으로 정렬',
			'submissionDate': '제출일',
			'submissionList': '제출 목록',
			'submissions': '제출 항목',
			'tableTitle': '강의 및 도구 전체의 평가되지 않은 학습자 제출 항목 목록',
			'toggleIndicatorLabelActions': '{target}에 작업 수행',
			'toggleIndicatorLabelInfo': '{target}에서 정보 보기',
			'tryAgain': '다시 시도',
			'viewBy': '보기 기준:',
			'yes': '예'
		};
	}
};

export const LangKo = dedupingMixin(LangKoImpl);

