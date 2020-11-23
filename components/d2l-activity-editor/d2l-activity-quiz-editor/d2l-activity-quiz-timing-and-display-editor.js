import '../d2l-activity-accordion-collapse.js';
import './d2l-activity-quiz-disable-pager-and-alerts-editor.js';
import './d2l-activity-quiz-disable-right-click-editor.js';
import './d2l-activity-quiz-disable-right-click-summary.js';
import '../d2l-activity-availability-dates-editor.js';
import '../d2l-activity-availability-dates-summary.js';
import './d2l-activity-quiz-hints-editor.js';
import './d2l-activity-quiz-hints-summary.js';
import { accordionStyles } from '../styles/accordion-styles';
import { ActivityEditorFeaturesMixin } from '../mixins/d2l-activity-editor-features-mixin.js';
import { ActivityEditorMixin } from '../mixins/d2l-activity-editor-mixin.js';
import { AsyncContainerMixin } from '@brightspace-ui/core/mixins/async-container/async-container-mixin.js';
import { html } from 'lit-element/lit-element.js';
import { labelStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { LocalizeActivityQuizEditorMixin } from './mixins/d2l-activity-quiz-lang-mixin';
import { MobxLitElement } from '@adobe/lit-mobx';
import { SkeletonMixin } from '@brightspace-ui/core/components/skeleton/skeleton-mixin.js';

class ActivityQuizTimingAndDisplayEditor extends AsyncContainerMixin(LocalizeActivityQuizEditorMixin(SkeletonMixin(ActivityEditorFeaturesMixin(ActivityEditorMixin(MobxLitElement))))) {

	static get properties() {

		return {
			href: { type: String },
			token: { type: Object }
		};
	}

	static get styles() {

		return [
			super.styles,
			accordionStyles,
			labelStyles
		];
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
					${this.localize('hdrTimingAndDisplay')}
				</span>

				<li slot="summary-items">${this._renderAllowHintsSummary()}</li>
				<li slot="summary-items">${this._renderDisableRightClickSummary()}</li>

				<div class="d2l-editors" slot="components">
					<label class="d2l-label-text">
						${this.localize('displayTools')}
					</label>
					${this._renderHintsEditor()}
					${this._renderDisableRightClickEditor()}
					${this._renderDisablePagerAndAlertsEditor()}
				</div>

			</d2l-activity-accordion-collapse>
		`;
	}
	// Returns true if any error states relevant to this accordion are set
	_errorInAccordion() {
		return false; // Todo: implement error handling
	}

	_renderAllowHintsSummary() {
		return html`
			<d2l-activity-quiz-hints-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-hints-summary>
		`;
	}

	_renderDisablePagerAndAlertsEditor() {
		return html`
			<d2l-activity-quiz-disable-pager-and-alerts
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-disable-pager-and-alerts>
		`;
	}

	_renderDisableRightClickEditor() {
		return html`
			<d2l-activity-quiz-disable-right-click-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-disable-right-click-editor>
		`;
	}

	_renderDisableRightClickSummary() {
		return html`
			<d2l-activity-quiz-disable-right-click-summary
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-disable-right-click-summary>
		`;
	}

	_renderHintsEditor() {
		return html`
			<d2l-activity-quiz-hints-editor
				href="${this.href}"
				.token="${this.token}">
			</d2l-activity-quiz-hints-editor>
		`;
	}

}

customElements.define(
	'd2l-activity-quiz-timing-and-display-editor',
	ActivityQuizTimingAndDisplayEditor
);
