import '@brightspace-ui/core/components/button/button-subtle.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { LocalizeActivityEditorMixin } from '../mixins/d2l-activity-editor-lang-mixin.js';
import { RtlMixin } from '@brightspace-ui/core/mixins/rtl-mixin.js';

class ActivityQuizDivider extends RtlMixin(LocalizeActivityEditorMixin(LitElement)) {

	static get styles() {
		return css`
			:host([hidden]) {
				display: none;
			}
			.d2l-activity-divider {
				align-items: center;
				background-color: var(--d2l-color-regolith);
				border: 1px var(--d2l-color-mica);
				border-style: solid none;
				display: flex;
				height: 3rem;
				justify-content: center;
				margin-left: -20px;
				width: calc(100% + 40px); // to override the 20px of padding added by .d2l-primary-panel
			}
			:host([dir="rtl"]) .d2l-activity-divider {
				margin-left: 0;
				margin-right: -20px;
			}
			.d2l-divider-container {
				align-items: center;
				display: flex;
				justify-content: space-between;
				padding: 0 20px;
				width: inherit;
			}
		`;
	}

	render() {
		return html`
			<div class="d2l-activity-divider">
				<div class="d2l-divider-container">
					<slot name="header"></slot>
					<slot name="action"></slot>
				</div>
			</div>`;
	}
}

customElements.define(
	'd2l-activity-quiz-divider',
	ActivityQuizDivider
);
