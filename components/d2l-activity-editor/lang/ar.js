/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "تحرير شروط الإصدار", // edit release conditions button
	"btnAddReleaseCondition": "إضافة شروط الإصدار", // add release condition button
	"btnCreateNew": "إنشاء جديد", // create new button
	"btnAddExisting": "إضافة موجود", // add existing button
	"btnRemoveCondition": "إزالة شرط", // remove condition button
	"lblConditionsOperator": "لعرض هذه المادة، يجب على المستخدمين استيفاء", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} Release Condition} other {{count} Release Conditions}}", // num release condition text
	"btnCancel": "إلغاء", // cancel button
	"btnSave": "حفظ", // save and close button
	"dueDate": "تاريخ الاستحقاق", // ARIA label for the due date field when creating/editing an activity
	"endDate": "تاريخ الانتهاء", // ARIA label for the end date field when creating/editing an activity
	"startDate": "تاريخ البدء", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "وقت الاستحقاق", // ARIA label for the due time field when creating/editing an activity
	"endTime": "وقت الانتهاء", // ARIA label for the end time field when creating/editing an activity
	"startTime": "وقت البدء", // ARIA label for the start time field when creating/editing an activity
	"hidden": "مخفي", // Label displayed with the visibility switch when hidden
	"ariaHidden": "مخفٍ عن الطلاب", // Aria Label for the visibility switch when hidden
	"noDueDate": "ما من تاريخ استحقاق", // Placeholder text for due date field when no due date is set
	"noEndDate": "ما من تاريخ انتهاء", // Placeholder text for due date field when no due date is set
	"noStartDate": "ما من تاريخ بدء", // Placeholder text for due date field when no due date is set
	"visible": "مرئي", // Label displayed with the visibility switch when visible
	"ariaVisible": "Visible to students", // Aria Label for the visibility switch when visible
	"txtAvailabilityStartAndEnd": "يبدأ التوفر بتاريخ {startDate} وينتهي بتاريخ {endDate}", // start/end text
	"txtAvailabilityStartOnly": "يبدأ التوفر بتاريخ {startDate}", // start only text
	"txtAvailabilityEndOnly": "تاريخ انتهاء التوفر {endDate}", // end only text
	"txtAvailabilityNeither": "متوفر دائمًا", // always available text
	"ungraded": "لم توضَع علامة عليها", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "في حقل العلامات", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "ليس في حقل العلامات", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "إضافة إلى العلامات", // Menu item for adding grade association
	"removeFromGrades": "الإزالة من حقل العلامات", // Menu item for removing grade association
	"setUngraded": "التعيين كـ \"لم توضَع علامة عليها\"", // Menu item for setting the activity to ungraded
	"scoreOutOf": "مجموع الدرجات من أصل", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "يجب تحديد قيمة نقاط الأنشطة في حقل العلامات", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "يجب أن يكون \"مجموع الدرجات من أصل\" أكبر من 0,01 أو مساويًا له وأقل من 9999999999 أو مساويًا له.", // Error message when an invalid score out of value is entered
	"loading": "يتم الآن التحميل...", // Message displayed while page is loading
	"ok": "موافق", // Text of dialog button to commit action
	"cancel": "إلغاء", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "اضغط على ALT-F10 لفتح شريط الأدوات، واضغط على ESC للخروج من شريط الأدوات عندما يكون مفتوحًا.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "اختيار من العلامات", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "آليات التقييم", //Header for the rubrics section
	"startBeforeEndDate": "يجب أن يقع تاريخ البدء قبل تاريخ النهاية",
	"dueBetweenStartEndDate": "يجب أن يقع تاريخ الاستحقاق بعد تاريخ البدء ويوم تاريخ النهاية أو قبله",
	"dueAfterStartDate": "يجب أن يقع تاريخ الاستحقاق بعد تاريخ البدء",
	"dueBeforeEndDate": "يجب أن يقع تاريخ الاستحقاق يوم تاريخ النهاية أو قبله",
	"createAndLinkToNewGradeItem": "إنشاء مادة جديدة سيتم وضع علامة عليها والربط إليها", //Radio button text
	"linkToExistingGradeItem": "ارتباط إلى مادة موجودة سيتم وضع علامة عليها", //Radio button text
	"points": "النقاط: {points}", // Text label for displaying points of a grade
	"noGradeItems": "No existing Grade Items exist to be linked", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "You do not have permission to create a new grade item" // Reason why a new grade items cannot be created in the choose grades dialog
};
