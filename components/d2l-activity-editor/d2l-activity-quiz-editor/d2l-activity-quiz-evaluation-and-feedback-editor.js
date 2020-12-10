import '../d2l-activity-accordion-collapse.js';
import './d2l-activity-quiz-auto-set-graded-editor.js';
import './d2l-activity-quiz-auto-set-graded-summary.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorFeaturesMixin } from '../mixins/d2l-activity-editor-features-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityQuizEvaluationAndFeedbackEditor extends AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(ActivityEditorFeaturesMixin(ActivityEditorMixin(MobxLitElement))))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object },
			isDialogOpen: { type: Boolean }
		};
	}

	static get styles() {

		return [
			super.styles,
			accordionStyles,
			labelStyles,
		];
	}

	constructor() {
		super();
		this.isDialogOpen = false;
	}

	connectedCallback() {
		super.connectedCallback();
	}

	render() {
		return html`
			<d2l-activity-accordion-collapse
				?has-errors=${this._errorInAccordion()}
				?skeleton="${this.skeleton}">

				<span slot="header">
					${this.localize('hdrEvaluationAndFeedback')}
				</span>

				// the summary text is in a specific order and should only be changed if required in a story

				<li slot="summary-items">${this._renderAutoSetGradedSummary()}</li>

				<div class="d2l-editors" slot="components">
					${this._renderAutoSetGradedSubHeader()}
					${this._renderAutomaticGradesEditor()}
				</div>
			</d2l-activity-accordion-collapse>

			${this._renderDialog()}
		`;
	}

	// Returns true if any error states relevant to this accordion are set
	_errorInAccordion() {
		return false; // Todo: implement error handling
	}

	_renderAutomaticGradesEditor() {
		return html`
			<d2l-activity-quiz-auto-set-graded-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-auto-set-graded-editor>
	`;
	}

	_renderAutoSetGradedSubHeader() {
		return html`
			<div>
				<span>
					<label class="d2l-label-text">
						${this.localize('subHdrAutomaticGrades')}
					</label>
				</span>
				<span>
					<d2l-button-icon
						text="${this.localize('autoSetGradedAccessibleHelpText')}"
						icon="tier1:help"
						@click="${this._setIsDialogOpen}">
					</d2l-button-icon>
				</span>
			</div>
		`;
	}
	_renderAutoSetGradedSummary() {
		return html`
			<d2l-activity-quiz-auto-set-graded-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-auto-set-graded-summary>
		`;
	}
	_renderDialog() {
		return html`
			<d2l-dialog
				?opened="${this.isDialogOpen}"
				@d2l-dialog-close="${this._setClosed}"
				title-text="${this.localize('autoSetGradedHelpDialogTitle')}">
					<div>
						<p>${this.localize('autoSetGradedHelpDialogParagraph1')}</p>
						<p>${this.localize('autoSetGradedHelpDialogParagraph2')}</p>
						<p>${this.localize('autoSetGradedHelpDialogParagraph3')}</p>
					</div>
					<d2l-button
						data-dialog-action="done"
						slot="footer"
						primary>
						${this.localize('autoSetGradedHelpDialogConfirmationText')}
					</d2l-button>
			</d2l-dialog>
		`;
	}

	_setIsDialogOpen(e) {
		const isDialogOpen = e.target && e.target.type && e.target.type !== 'd2l-dialog-close';

		this.isDialogOpen = isDialogOpen;
	}

}

customElements.define(
	'd2l-activity-quiz-evaluation-and-feedback-editor',
	ActivityQuizEvaluationAndFeedbackEditor
);
