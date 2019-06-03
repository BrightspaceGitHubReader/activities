'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'activities': 'Activities',
			'activityName': '活動名稱',
			'caughtUp': '您已趕上最新進度！',
			'checkBackOften': '請經常返回查看新的提交項目。',
			'clearSearch': '清除搜尋',
			'completed': 'Completed',
			'courseName': '課程',
			'displayName': '名字，姓氏',
			'due': 'Due: {date}',
			'evaluate': '評估{displayName}',
			'evaluateAll': 'Evaluate All',
			'evaluated': 'Evaluated',
			'failedToFilter': '無法套用篩選器。請在幾分鐘後再試一次。',
			'failedToLoadData': '無法載入提交項目。請在幾分鐘後再試一次。',
			'failedToLoadMore': '無法載入更多提交項目。請在幾分鐘後再試一次。',
			'failedToSearch': '無法套用搜尋。請在幾分鐘後再試一次。',
			'firstName': '名字',
			'lastName': '姓氏',
			'loadMore': '載入更多',
			'loading': '正在載入',
			'masterTeacher': '教師',
			'noCriteriaMatch': '沒有提交項目符合您的標準。',
			'noResults': '這裡沒有任何結果。',
			'noSubmissions': '沒有提交項目需要您注意。',
			'publishAll': 'Publish All',
			'published': 'Published',
			'search': '搜尋',
			'searchResultsMore': '{num}+ 個搜尋結果',
			'searchResultsMultiple': '{num} 個搜尋結果',
			'searchResultsSingle': '1 個搜尋結果',
			'sortBy': '排序方式：{columnName}',
			'submissionDate': '提交日期',
			'submissionList': 'Submission List',
			'submissions': 'Submissions',
			'tableTitle': '此清單包含所有課程和工具中未評估的學習者提交項目',
			'tryAgain': '再試一次',
			'unreadSubmissions': '{num} unread submissions',
			'unreadSubmissionsDetail': '{unread} new, {resub} resubmissions',
			'viewBy': 'View by:'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);

