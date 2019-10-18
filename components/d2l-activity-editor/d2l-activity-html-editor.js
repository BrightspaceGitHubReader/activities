import 'd2l-html-editor/d2l-html-editor.js';
import 'd2l-html-editor/d2l-html-editor-client.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { getUniqueId } from '@brightspace-ui/core/helpers/uniqueId';

class ActivityHtmlEditor extends LitElement {

	static get properties() {
		return {
			richtextEditorConfig: { type: Object },
			value: { type: String },
			ariaLabel: { type: String },
			disabled: { type: Boolean },
			_htmlEditorUniqueId: { type: String },
			_valueSet: { type: Boolean }
		};
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				width: 100%
			}
			:host([hidden]) {
				display: none;
			}

			d2l-html-editor {
				word-wrap: break-word;
				display: flex;
				width: 100%;
			}
			d2l-html-editor > .d2l-html-editor-container > p:first-of-type {
				margin-top: 0;
			}
			d2l-html-editor > .d2l-html-editor-container > p:last-of-type {
				margin-bottom: 0;
			}
			d2l-html-editor > .d2l-html-editor-container * {
				max-width: 100%;
			}

			/*
			Styles copied from d2l-inputs-shared-styles; once BrightspaceUI/inputs
			is converted to LitElement, we can import these directly.
			*/
			d2l-html-editor > .d2l-html-editor-container {
				--d2l-input-border-radius: 0.3rem;
				--d2l-input-height: auto;
				--d2l-input-line-height: 1.2rem;
				--d2l-input-width: 100%;
				--d2l-input-background-color: #ffffff;
				--d2l-input-border-color: var(--d2l-color-galena);
				--d2l-input-boxshadow: inset 0 2px 0 0 rgba(181, 189, 194, .2); /* corundum */
				--d2l-input-padding: 0.4rem 0.75rem;
				--d2l-input-padding-focus: calc(0.4rem - 1px) calc(0.75rem - 1px);
				--d2l-input-color: var(--d2l-color-ferrite);
				--d2l-input-placeholder-color: var(--d2l-color-mica);

				/* d2l-input-common */
				border-radius: var(--d2l-input-border-radius);
				border-style: solid;
				border-color: var(--d2l-input-border-color);
				box-sizing: border-box;
				display: inline-block;
				margin: 0;
				min-width: calc(2rem + 1em);
				vertical-align: middle;
				width: var(--d2l-input-width);
				transition: background-color 0.5s ease, border-color 0.001s ease;

				/* d2l-input-text */
				color: var(--d2l-input-color);
				font-size: 0.8rem;
				font-weight: 400;
				letter-spacing: 0.02rem;
				line-height: var(--d2l-input-line-height);
				min-height: calc(2rem + 2px);

				/* d2l-input-hover-disabled */
				background-color: var(--d2l-input-background-color);
				border-color: var(--d2l-input-border-color);
				border-width: 1px;
				box-shadow: var(--d2l-input-boxshadow);
				padding: var(--d2l-input-padding);

				height: var(--d2l-input-height)
			}
			d2l-html-editor > .d2l-html-editor-container:hover,
			d2l-html-editor > .d2l-html-editor-container:focus {
				/* d2l-input-hover-focus */
				border-color: var(--d2l-color-celestine);
				border-width: 2px;
				outline-style: none;
				outline-width: 0;
				padding: var(--d2l-input-padding-focus);
			}
			d2l-html-editor.invalid > .d2l-html-editor-container {
				/* d2l-input-invalid */
				border-color: var(--d2l-color-cinnabar);
			}
			d2l-html-editor > .d2l-html-editor-container:disabled {
				/* d2l-input-disabled */
				opacity: 0.5;
			}
			d2l-html-editor > .d2l-html-editor-container:hover:disabled {
				/* d2l-input-hover-disabled */
				background-color: var(--d2l-input-background-color);
				border-color: var(--d2l-input-border-color);
				border-width: 1px;
				box-shadow: var(--d2l-input-boxshadow);
				padding: var(--d2l-input-padding);
			}
		`;
	}

	constructor() {
		super();
		this._htmlEditorUniqueId = `htmleditor-${getUniqueId()}`;
		this._valueSet = false;
	}

	set value(newValue) {
		const oldValue = this.value;

		if (!this._valueSet) {
			const editorContainer = this.shadowRoot.querySelector('d2l-html-editor > .d2l-html-editor-container');
			if (editorContainer) {
				this._valueSet = true;
				editorContainer.innerHTML = newValue;
			}
		}

		this.requestUpdate('value', oldValue);
	}

	set richtextEditorConfig(newValue) {
		const oldValue = this.richtextEditorConfig;

		const editorConfig = newValue || {};
		const editor = this.shadowRoot.querySelector('d2l-html-editor');
		if (editor) {
			editor.d2lPluginSettings = editorConfig.properties || {};
		}

		this.requestUpdate('richtextEditorConfig', oldValue);
	}

	_resolveUrl() {
		return `${import.meta.url}/../../../`;
	}

	getContent() {
		return this.shadowRoot.querySelector('d2l-html-editor').getContent();
	}

	render() {
		return html`
			<d2l-html-editor
				id="assignment-instructions"
				editor-id="${this._htmlEditorUniqueId}"
				app-root="${this._resolveUrl()}"
				inline="1"
				min-rows="1"
				max-rows="1000"
				fullpage-enabled="0"
				toolbar="bold italic bullist d2l_isf"
				plugins="lists paste d2l_isf">

				<div id="toolbar-shortcut-${this._htmlEditorUniqueId}" hidden=""></div>
				<div
					class="d2l-html-editor-container"
					id="${this._htmlEditorUniqueId}"
					aria-label="${this.ariaLabel}"
					?disabled="${this.disabled}"
					role="textbox"
					prevent-submit>
				</div>
			</d2l-html-editor>`;
	}
}

customElements.define('d2l-activity-html-editor', ActivityHtmlEditor);