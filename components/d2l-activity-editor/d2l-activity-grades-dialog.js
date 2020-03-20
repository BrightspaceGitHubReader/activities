import './d2l-activity-grades/d2l-activity-grade-candidate-selector';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/inputs/input-radio-spacer.js';
import { css, html } from 'lit-element/lit-element';
import { ActivityEditorMixin } from './mixins/d2l-activity-editor-mixin.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { formatNumber } from '@brightspace-ui/intl/lib/number.js';
import { getLocalizeResources } from './localization';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { MobxLitElement } from '@adobe/lit-mobx';
import { radioStyles } from '@brightspace-ui/core/components/inputs/input-radio-styles.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';
import { shared as store } from './state/activity-store.js';

class ActivityGradesDialog extends ActivityEditorMixin(LocalizeMixin(RtlMixin(MobxLitElement))) {

	static get properties() {
		return {
			activityName: { type: String },
			_createNewRadioChecked: { type: Boolean }
		};
	}

	static get styles() {
		return [
			bodySmallStyles,
			radioStyles,
			css`
			:host {
				display: block;
			}
			:host([hidden]),
			[hidden] {
				display: none !important;
			}
			.d2l-activity-grades-dialog-create-new-container {
				display: flex;
			}
			.d2l-activity-grades-dialog-create-new-activity-name {
				word-break: break-word;
				overflow-wrap: anywhere; /* not supported by safari */
			}
			.d2l-activity-grades-dialog-create-new-icon {
				padding-right: 10px;
			}
			:host([dir="rtl"]) .d2l-activity-grades-dialog-create-new-icon {
				padding-right: 0;
				padding-left: 10px;
			}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super(store);
	}

	async open() {
		const scoreAndGrade = store.get(this.href).scoreAndGrade;
		this._createNewRadioChecked = scoreAndGrade.createNewGrade;

		await scoreAndGrade.fetchGradeCandidates();

		const prevSelectedHref = scoreAndGrade.gradeCandidateCollection.selected.href;
		const dialog = this.shadowRoot.querySelector('d2l-dialog');
		const action = await dialog.open();
		if (action !== 'done') {
			scoreAndGrade.gradeCandidateCollection.setSelected(prevSelectedHref);
			return;
		}

		if (this._createNewRadioChecked) {
			// Not yet implemented
		} else {
			scoreAndGrade.linkToExistingGrade(prevSelectedHref);
		}
	}

	_dialogRadioChanged(e) {
		const currentTarget = e.currentTarget;
		if (currentTarget && currentTarget.value === 'createNew') {
			this._createNewRadioChecked = true;
		} else if (currentTarget && currentTarget.value === 'linkExisting') {
			this._createNewRadioChecked = false;
		}

		const dialog = this.shadowRoot.querySelector('d2l-dialog');
		dialog.resize();
	}

	render() {
		const activity = store.get(this.href);
		if (!activity) {
			return html``;
		}

		const {
			scoreOutOf,
			scoreOutOfError,
			gradeCandidateCollection
		} = activity.scoreAndGrade;

		const hasGradeCandidates = gradeCandidateCollection && gradeCandidateCollection.gradeCandidates.length > 0;

		return html`
			<d2l-dialog title-text="${this.localize('chooseFromGrades')}">
				<label class="d2l-input-radio-label">
					<input
						type="radio"
						name="chooseFromGrades"
						value="createNew"
						.checked="${this._createNewRadioChecked}"
						@change="${this._dialogRadioChanged}">
					${this.localize('createAndLinkToNewGradeItem')}
				</label>
				<d2l-input-radio-spacer ?hidden="${!this._createNewRadioChecked}">
					<div class="d2l-activity-grades-dialog-create-new-container">
						<div class="d2l-activity-grades-dialog-create-new-icon"><d2l-icon icon="tier1:grade"></d2l-icon></div>
						<div>
							<div class="d2l-activity-grades-dialog-create-new-activity-name">${this.activityName}</div>
							<div class="d2l-body-small">${scoreOutOf && !scoreOutOfError ? html`
								${this.localize('points', { points: formatNumber(scoreOutOf, { maximumFractionDigits: 2 })})}
							` : null }
							</div>
						</div>
					</div>
				</d2l-input-radio-spacer>
				<label class="d2l-input-radio-label ${!hasGradeCandidates ? 'd2l-input-radio-label-disabled' : ''}">
					<input
						type="radio"
						name="chooseFromGrades"
						value="linkExisting"
						?disabled="${!hasGradeCandidates}"
						.checked="${!this._createNewRadioChecked}"
						@change="${this._dialogRadioChanged}">
					${this.localize('linkToExistingGradeItem')}
				</label>
				<d2l-input-radio-spacer ?hidden="${this._createNewRadioChecked && hasGradeCandidates}" ?disabled="${!hasGradeCandidates}">
					${hasGradeCandidates ? html`<d2l-activity-grade-candidate-selector
						href="${this.href}"
						.token="${this.token}">
					</d2l-activity-grade-candidate-selector>` : html`<div class="d2l-body-small">
						${this.localize('noGradeItems')}
					</div>`}
				</d2l-input-radio-spacer>
				<d2l-button slot="footer" primary dialog-action="done">${this.localize('ok')}</d2l-button>
				<d2l-button slot="footer" dialog-action="cancel">${this.localize('cancel')}</d2l-button>
			</d2l-dialog>
		`;
	}
}
customElements.define('d2l-activity-grades-dialog', ActivityGradesDialog);
