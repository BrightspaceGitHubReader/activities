import '../d2l-activity-editor.js';
import './d2l-activity-assignment-editor-detail.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { AssignmentActivityUsageEntity } from 'siren-sdk/src/activities/assignments/AssignmentActivityUsageEntity.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from '../localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { PendingContainerMixin } from 'siren-sdk/src/mixin/pending-container-mixin.js';

const baseUrl = import.meta.url;

class AssignmentEditor extends PendingContainerMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_assignmentHref: { type: String },
		};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, baseUrl);
	}

	constructor() {
		super();
		this._setEntityType(AssignmentActivityUsageEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAssignmentActivityUsageChange(entity);
			super._entity = entity;
		}
	}

	_onAssignmentActivityUsageChange(assignmentActivityUsage) {
		this._assignmentHref = assignmentActivityUsage.assignmentHref();
	}

	render() {
		return html`
			<d2l-activity-editor ?loading="${this._hasPendingChildren}">
				<d2l-activity-assignment-editor-detail
					.href="${this._assignmentHref}"
					.token="${this.token}"
					slot="editor">
				</d2l-activity-assignment-editor-detail>
			</d2l-activity-editor>
		`;
	}
}
customElements.define('d2l-activity-assignment-editor', AssignmentEditor);
