import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {Rels, Classes} from 'd2l-hypermedia-constants';

/**
 * @customElement
 * @polymer
 */

class D2LActivityName extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior], PolymerElement) {
	static get template() {
		return html`
			<style>
				:host {
					display: block;
					font-weight: normal;
				}
			</style>
			<d2l-icon icon="[[_activityIcon]]"></d2l-icon>
			<span>[[_activityName]]</span>
		`;
	}
	static get is() { return 'd2l-activity-name'; }
	static get properties() {
		return {
			_activityName: {
				type: String,
				value: ''
			},
			_activityIcon: {
				type: String,
				value: ''
			}
		};
	}
	static get observers() {
		return [
			'_loadData(entity, href)'
		];
	}
	ready() {
		super.ready();
	}
	constructor() { super(); }

	__fetch(url) {
		return window.D2L.Siren.EntityStore.fetch(url, this.token);
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}

		this._loading = true;

		try {
			return this._getActivityPromise(entity);
		} catch (e) {
			// Unable to load activities from entity.
		} finally {
			this._loading = false;
		}
	}

	_followLink(entity, rel) {
		var href = this._getHref(entity, rel);
		return this._followHref(href);
	}

	_getHref(entity, rel) {
		if (entity && entity.hasLinkByRel && entity.hasLinkByRel(rel)) {
			return entity.getLinkByRel(rel).href;
		}
		return '';
	}

	_followHref(href) {
		if (href) {
			return this.__fetch(href);
		}
		return Promise.resolve();
	}

	_getActivityPromise(activityEntity) {
		let rel;
		let activityIcon;
		if (activityEntity.hasClass(Classes.activities.userQuizAttemptActivity)) {
			rel = Rels.quiz;
			activityIcon = 'd2l-tier1:quizzing';
		} else if (activityEntity.hasClass(Classes.activities.userAssignmentActivity)) {
			rel = Rels.assignment;
			activityIcon = 'd2l-tier1:assignments';
		} else if (activityEntity.hasClass(Classes.activities.userDiscussionActivity)) {
			rel = Rels.Discussions.topic;
			activityIcon = 'd2l-tier1:discussions';
		} else {
			return Promise.resolve();
		}
		return this._followLink(activityEntity, rel)
			.then(function(a) {
				if (a && a.entity && a.entity.properties) {
					this._activityName = a.entity.properties.name;
					this._activityIcon = activityIcon;
				}
			}.bind(this));
	}
}

window.customElements.define(D2LActivityName.is, D2LActivityName);
