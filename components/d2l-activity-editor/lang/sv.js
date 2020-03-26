/* eslint quotes: 0 */

export default {
	"btnEditReleaseConditions": "Redigera publiceringsvillkor", // edit release conditions button
	"btnAddReleaseCondition": "Lägg till publiceringsvillkor", // add release condition button
	"btnCreateNew": "Skapa ny", // create new button
	"btnAddExisting": "Lägg till befintligt", // add existing button
	"btnRemoveCondition": "Ta bort villkor", // remove condition button
	"lblConditionsOperator": "Om användare vill få åtkomst till det här objektet måste de uppfylla", // conditions operator label
	"txtNumReleaseConditions": "{count, plural, =1 {{count} Release Condition} other {{count} Release Conditions}}", // num release condition text
	"btnCancel": "Avbryt", // cancel button
	"btnSave": "Spara", // save and close button
	"dueDate": "Förfallodatum", // ARIA label for the due date field when creating/editing an activity
	"endDate": "Slutdatum", // ARIA label for the end date field when creating/editing an activity
	"startDate": "Startdatum", // ARIA label for the start date field when creating/editing an activity
	"dueTime": "Förfallotid", // ARIA label for the due time field when creating/editing an activity
	"endTime": "Sluttid", // ARIA label for the end time field when creating/editing an activity
	"startTime": "Starttid", // ARIA label for the start time field when creating/editing an activity
	"hidden": "Dold", // Label displayed with the visibility switch when hidden
	"ariaHidden": "Dolt för elever", // Aria Label for the visibility switch when hidden
	"noDueDate": "Inget förfallodatum", // Placeholder text for due date field when no due date is set
	"noEndDate": "Inget slutdatum", // Placeholder text for due date field when no due date is set
	"noStartDate": "Inget startdatum", // Placeholder text for due date field when no due date is set
	"visible": "Synlig", // Label displayed with the visibility switch when visible
	"ariaVisible": "Visible to students", // Aria Label for the visibility switch when visible
	"txtAvailabilityStartAndEnd": "Tillgänglighet börjar {startDate} och upphör {endDate}", // start/end text
	"txtAvailabilityStartOnly": "Tillgänglighet börjar {startDate}", // start only text
	"txtAvailabilityEndOnly": "Tillgänglighet upphör {endDate}", // end only text
	"txtAvailabilityNeither": "Alltid tillgänglig", // always available text
	"ungraded": "Ej betygsatt", // State of score field when there is no score and no grade item, when creating/editing an activity
	"inGrades": "I Betyg", // State of the grades field when there is a score, and an associated grade item
	"notInGrades": "Inte i Betyg", // State of the grades field when there is a score, but no associated grade item
	"addToGrades": "Lägg till betyg", // Menu item for adding grade association
	"removeFromGrades": "Ta bort från Betyg", // Menu item for removing grade association
	"setUngraded": "Ställ in Ej betygsatt", // Menu item for setting the activity to ungraded
	"scoreOutOf": "Resultat av totalt", // ARIA label for the score out of field, when creating/editing an activity
	"emptyScoreOutOfError": "Ett poängvärde måste anges för aktiviteter i Betyg", // Error message to inform user that the score out of value is a required field when a grade item is associated
	"invalidScoreOutOfError": "Resultat av totalt måste vara större än eller lika med 0,01 och mindre än eller lika med 9 999 999 999.", // Error message when an invalid score out of value is entered
	"loading": "Läser in ...", // Message displayed while page is loading
	"ok": "Ok", // Text of dialog button to commit action
	"cancel": "Avbryt", // Text of dialog button to cancel action
	"ariaToolbarShortcutInstructions": "Tryck ALT-F10 för verktygsfält och ESC för att avsluta verktygsfältet när du är i det.", // Instructions for screenreader users on how to enter and exit the html editor toolbar
	"chooseFromGrades": "Välj betyg", // Link text and dialog title for the edit grades dialog,
	"hdrRubrics": "Rubriceringar", //Header for the rubrics section
	"startBeforeEndDate": "Startdatumet måste vara före slutdatumet",
	"dueBetweenStartEndDate": "Förfallodatum måste vara efter startdatumet och före eller på slutdatumet",
	"dueAfterStartDate": "Förfallodatumet måste vara senare än startdatumet",
	"dueBeforeEndDate": "Förfallodatumet måste vara på eller före slutdatumet",
	"createAndLinkToNewGradeItem": "Skapa och länka till ett nytt betygsobjekt", //Radio button text
	"linkToExistingGradeItem": "Länka till befintligt betygsobjekt", //Radio button text
	"points": "Poäng: {points}", // Text label for displaying points of a grade
	"noGradeItems": "No existing Grade Items exist to be linked", // Reason why existing grade items cannot be linked in the choose grades dialog
	"noGradeCreatePermission": "You do not have permission to create a new grade item" // Reason why a new grade items cannot be created in the choose grades dialog
};
