/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "Edit Release Conditions", // edit release conditions button
	"btnAddReleaseCondition": "Tilføj betingelse for offentliggørelse", // add release condition button
	"btnCreateNew": "Opret ny", // create new button
	"btnAddExisting": "Tilføj eksisterende", // add existing button
	"btnRemoveCondition": "Fjern betingelse", // remove condition button
	"lblConditionsOperator": "For at få vist dette element skal brugerne opfylde", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} Release Condition} other {{count} Release Conditions}}", // num release condition text
	"btnCancel": "Annuller", // cancel button
	"btnSave": "Gem og luk", // save and close button
	"dueDate": "Forfaldsdato", // ARIA label for the due date field when creating/editing an activity
	"endDate": "Slutdato", // ARIA label for the end date field when creating/editing an activity
	"startDate": "Startdato", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "Due Time", // ARIA label for the due time field when creating/editing an activity
	"endTime": "Sluttidspunkt", // ARIA label for the end time field when creating/editing an activity
	"startTime": "Starttidspunkt", // ARIA label for the start time field when creating/editing an activity
	"hidden": "Skjult", // Label displayed with the visibility switch when hidden
	"ariaHidden": "Skjult for studerende", // Aria Label for the visibility switch when hidden
	"noDueDate": "Ingen forfaldsdato", // Placeholder text for due date field when no due date is set
	"noEndDate": "Ingen slutdato", // Placeholder text for due date field when no due date is set
	"noStartDate": "Ingen startdato", // Placeholder text for due date field when no due date is set
	"visible": "Synlig", // Label displayed with the visibility switch when visible
	"ariaVisible": "Synlig for elever", // Aria Label for the visibility switch when visible
	"txtAvailabilityStartAndEnd": "Tilgængelighed starter d. {startDate} og slutter d. {endDate}", // start/end text
	"txtAvailabilityStartOnly": "Tilgængelighed starter d. {startDate}", // start only text
	"txtAvailabilityEndOnly": "Ikke længere tilgængeligt d. {endDate}", // end only text
	"txtAvailabilityNeither": "Altid tilgængelig", // always available text
	"ungraded": "Ungraded", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "In Grades", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "Not in Grades", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "Føj til Karakterer", // Menu item for adding grade association
	"removeFromGrades": "Remove from Grades", // Menu item for removing grade association
	"setUngraded": "Nulstil til uden karakter", // Menu item for setting the activity to ungraded
	"scoreOutOf": "Score Out Of", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "A points value must be specified for activities in Grades", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "Score Out Of must be greater than or equal to 0.01 and less than or equal to 9,999,999,999", // Error message when an invalid score out of value is entered
	"loading": "Indlæser...", // Message displayed while page is loading
	"ok": "Ok", // Text of dialog button to commit action
	"cancel": "Annuller", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "Tryk på Alt-F10 for værktøjslinjen, og tryk på ESC for at afslutte værktøjslinjen, når du er inde.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "Vælg mellem karakterer", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "Rubrikker", //Header for the rubrics section
	"startBeforeEndDate": "Startdato skal være før slutdato",
	"dueBetweenStartEndDate": "Forfaldsdato skal være efter startdato og før eller lig med slutdato",
	"dueAfterStartDate": "Forfaldsdato skal ligge efter startdato",
	"dueBeforeEndDate": "Forfaldsdato skal være før eller lig med slutdato",
	"createAndLinkToNewGradeItem": "Opret og knyt til nyt karakterelement", //Radio button text
	"linkToExistingGradeItem": "Link til eksisterende karakterelement", //Radio button text
	"points": "Point: {points}", // Text label for displaying points of a grade
	"noGradeItems": "No existing Grade Items exist to be linked", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "You do not have permission to create a new grade item" // Reason why a new grade items cannot be created in the choose grades dialog
};