import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {EvaluationHubLocalize} from './EvaluationHubLocalize.js';
import 'd2l-table/d2l-table.js';
import 'd2l-button/d2l-button.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import 'd2l-polymer-behaviors/d2l-dom-focus.js';
import 'd2l-link/d2l-link.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {Rels, Classes} from 'd2l-hypermedia-constants';
import '../d2l-activity-name/d2l-activity-name.js';

/**
 * @customElement
 * @polymer
 */

class D2LEvaluationHubActivitiesList extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior, D2L.PolymerBehaviors.Siren.SirenActionBehavior ], EvaluationHubLocalize(PolymerElement)) {
	static get template() {
		return html`
			<style include="d2l-table-style">
				d2l-th {
					font-weight: bold;
				}
				d2l-td {
					font-weight: normal;
				}
				d2l-loading-spinner {
					width: 100%;
				}
				.d2l-evaluation-hub-activities-list-load-more-container {
					padding-top: 1rem;
					text-align: right;
					width: 100%;
				}
				[hidden] {
					display: none;
				}
			</style>
			<d2l-table hidden$="[[_fullListLoading]]" aria-colcount$="[[_headers.length]]" aria-rowcount$="[[_data.length]]">
				<d2l-thead>
					<d2l-tr>
						<dom-repeat items="[[_headers]]">
							<template>
								<template is="dom-if" if="[[_shouldDisplayColumn(item.key)]]">
									<d2l-th><d2l-table-col-sort-button nosort on-click="_sort"><span>[[localize(item.localizationKey)]]</span></d2l-table-col-sort-button></d2l-th>
								</template>
							</template>
						</dom-repeat>
					</d2l-tr>
				</d2l-thead>
				<d2l-tbody>
					<dom-repeat items="[[_data]]" as="s">
						<template>
							<d2l-tr>
								<d2l-td>
									<d2l-link href="[[s.activityLink]]">[[_getDataProperty(s, 'displayName')]]</d2l-link>
								</d2l-td>
								<d2l-td>
									<d2l-activity-name href="[[_getDataProperty(s, 'activityName')]]" token="[[token]]"></d2l-activity-name>
								</d2l-td>
								<d2l-td>
									<span>[[_getDataProperty(s, 'courseName')]]</span>
								</d2l-td>
								<d2l-td>
									<span>[[_getDataProperty(s, 'submissionDate')]]</span>
								</d2l-td>
								<template is="dom-if" if="[[_shouldDisplayColumn('masterTeacher')]]">
									<d2l-td>
										<span>[[_getDataProperty(s, 'masterTeacher')]]</span>
									</d2l-td>
								</template>
							</d2l-tr>
						</template>
					</dom-repeat>
				</d2l-tbody>
			</d2l-table>
			<d2l-offscreen role="alert" aria-live="aggressive" hidden$="[[!_loading]]">[[localize('loading')]]</d2l-offscreen>
			<d2l-loading-spinner size="80" hidden$="[[!_loading]]"></d2l-loading-spinner>
			<template is="dom-if" if="[[_pageNextHref]]">
				<div class="d2l-evaluation-hub-activities-list-load-more-container">
					<d2l-button class="d2l-evaluation-hub-activities-list-load-more" onclick="[[_loadMore]]">[[localize('loadMore')]]</d2l-button>
				</div>
			</template>
		`;
	}
	static get is() { return 'd2l-evaluation-hub-activities-list'; }
	static get properties() {
		return {
			'masterTeacher': {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			_headers: {
				type: Array,
				value: [
					{ key: 'displayName', sortKey: 'displayName', localizationKey: 'displayName' },
					{ key: 'activityName', sortKey: 'activityName', localizationKey: 'activityName'},
					{ key: 'courseName', sortKey: 'courseName', localizationKey: 'courseName' },
					{ key: 'submissionDate', sortKey: 'submissionDate', localizationKey: 'submissionDate' },
					{ key: 'masterTeacher', sortKey: 'masterTeacher', localizationKey: 'masterTeacher' }
				]
			},
			_data: {
				type: Array,
				value: [ ]
			},
			_fullListLoading: {
				type: Boolean,
				value: true
			},
			_loading: {
				type: Boolean,
				value: true
			},
			_filterHref: {
				type: String,
				value: ''
			},
			_sortHref: {
				type: String,
				value: ''
			},
			_pageNextHref: {
				type: String,
				value: ''
			}
		};
	}
	static get observers() {
		return [
			'_loadData(entity)'
		];
	}
	ready() {
		super.ready();
		this.addEventListener('d2l-siren-entity-error', function() {
			this._fullListLoading = false;
			this._loading = false;
		}.bind(this));
		this._loadMore = this._loadMore.bind(this);
	}
	constructor() { super(); }

	_myEntityStoreFetch(url) {
		return window.D2L.Siren.EntityStore.fetch(url, this.token);
	}

	_sort(e) {
		if (e.currentTarget.nosort) {
			e.currentTarget.removeAttribute('nosort');
		} else if (e.currentTarget.desc) {
			e.currentTarget.removeAttribute('desc');
		} else {
			e.currentTarget.setAttribute('desc', 'desc');
		}

		var headers = this.shadowRoot.querySelectorAll('d2l-table-col-sort-button');
		for (var i = 0; i < headers.length; i++) {
			if (headers[i] !== e.currentTarget) {
				headers[i].removeAttribute('desc');
				headers[i].setAttribute('nosort', 'nosort');
			}
		}

		// TODO: get the new sorted data once sorting is enabled!!!
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}

		this._loading = true;
		this._fullListLoading = true;

		try {
			var result = await this._parseActivities(entity);
			this._data = result;
		} catch (e) {
			// Unable to load activities from entity.
		} finally {
			this._fullListLoading = false;
			this._loading = false;
		}
	}

	_loadMore() {
		if (this._pageNextHref && !this._loading) {
			this._loading = true;
			this._followHref(this._pageNextHref).then(async function(u) {
				if (u && u.entity) {
					var tbody = this.shadowRoot.querySelector('d2l-tbody');
					var lastFocusableTableElement = D2L.Dom.Focus.getLastFocusableDescendant(tbody, false);

					try {
						var result = await this._parseActivities(u.entity);
						this._data = this._data.concat(result);
					} catch (e) {
						// Unable to load more activities from entity.
					} finally {
						this._loading = false;
						window.requestAnimationFrame(function() {
							var newElementToFocus = D2L.Dom.Focus.getNextFocusable(lastFocusableTableElement, false);
							newElementToFocus.focus();
						});
					}
				}
			}.bind(this));
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
			return this._myEntityStoreFetch(href);
		}
		return Promise.resolve();
	}

	async _parseActivities(entity) {
		var promises = [];
		entity.entities.forEach(function(activity) {
			promises.push(new Promise(function(resolve) {
				var item = {
					displayName: '',
					courseName: '',
					activityName: this._getActivityNameHref(activity),
					submissionDate: this._getSubmissionDate(activity),
					activityLink: this._getRelativeUriProperty(activity),
					masterTeacher: ''
				};

				var getUserName = this._getUserPromise(activity, item);
				var getCourseName = this._getCoursePromise(activity, item);
				var getMasterTeacherName =
					this._shouldDisplayColumn('masterTeacher')
						? this._getMasterTeacherPromise(activity, item)
						: Promise.resolve();

				Promise.all([getUserName, getCourseName, getMasterTeacherName]).then(function() {
					resolve(item);
				});
			}.bind(this)));
		}.bind(this));

		this._filterHref = this._getHref(entity, Rels.filters);
		//this._sortHref = this._getHref(entity, Rels.sort);
		this._pageNextHref = this._getHref(entity, 'next');

		const result = await Promise.all(promises);
		return result;
	}

	_getMasterTeacherPromise(entity, item) {
		return this._followLink(entity, Rels.organization)
			.then(function(org) {
				if (org && org.entity) {
					return this._followLink(org.entity, Rels.enrollments);
				}
			}.bind(this))
			.then(function(enrollment) {
				if (enrollment && enrollment.entity) {
					return this._followLink(enrollment.entity, Rels.filters);
				}
			}.bind(this))
			.then(function(filters) {
				if (filters && filters.entity && filters.entity.hasSubEntityByClass('role-markers')) {
					var roleMarkerFilter = filters.entity.getSubEntityByClass('role-markers');
					if (roleMarkerFilter.href) {
						return this._followHref(roleMarkerFilter.href);
					}
				}
			}.bind(this))
			.then(function(filterOptions) {
				if (filterOptions && filterOptions.entity) {
					var action = filterOptions.entity.getActionByName('search');
					if (action) {
						var fields = [
							{
								name: 'search',
								value: 'Primary Facilitator'
							}
						];

						return this.performSirenAction(action, fields);
					}
				}
			}.bind(this))
			.then(function(filterOptions) {
				if (filterOptions) {
					var masterTeacherOption = filterOptions.getSubEntityByRel('https://api.brightspace.com/rels/filter');
					var action = masterTeacherOption.getActionByName('add-filter');
					return this.performSirenAction(action);
				}
			}.bind(this))
			.then(function(filterOptions) {
				if (filterOptions) {
					var action = filterOptions.getActionByName('apply');
					return this.performSirenAction(action);
				}
			}.bind(this))
			.then(function(filters) {
				if (filters) {
					var action = filters.getActionByName('apply');
					return this.performSirenAction(action);
				}
			}.bind(this))
			.then(function(enrollment) {
				if (enrollment && enrollment.hasSubEntityByRel(Rels.userEnrollment)) {
					var userEnrollment = enrollment.getSubEntityByRel(Rels.userEnrollment);
					if (userEnrollment.href) {
						return this._followHref(userEnrollment.href);
					}
				}
			}.bind(this))
			.then(function(userEnrollment) {
				if (userEnrollment && userEnrollment.entity) {
					return this._followLink(userEnrollment.entity, Rels.user);
				}
			}.bind(this))
			.then(function(user) {
				if (user && user.entity && user.entity.hasSubEntityByRel(Rels.displayName)) {
					item.masterTeacher = user.entity.getSubEntityByRel(Rels.displayName).properties.name;
				}
			}.bind(this));
	}

	_getCoursePromise(entity, item) {
		return this._followLink(entity, Rels.organization)
			.then(function(o) {
				if (o && o.entity && o.entity.properties) {
					item.courseName = o.entity.properties.name;
				}
			});
	}

	_getUserPromise(entity, item) {
		return this._followLink(entity, Rels.user)
			.then(function(u) {
				if (u && u.entity && u.entity.hasSubEntityByRel(Rels.displayName)) {
					item.displayName = u.entity.getSubEntityByRel(Rels.displayName).properties.name;
				}
			});
	}

	_getActivityNameHref(entity) {
		if (entity.hasLinkByRel(Rels.Activities.userActivityUsage)) {
			const link = entity.getLinkByRel(Rels.Activities.userActivityUsage);
			return link.href;
		}
		return '';
	}

	_getSubmissionDate(entity) {
		if (entity.hasSubEntityByClass('localized-formatted-date')) {
			var i = entity.getSubEntityByClass('localized-formatted-date');
			return i.properties.text;
		}
		return '';
	}

	_getRelativeUriProperty(entity) {
		if (entity.hasSubEntityByClass(Classes.relativeUri)) {
			var i = entity.getSubEntityByClass(Classes.relativeUri);
			return i.properties.path;
		}
		return '';
	}

	_getDataProperty(item, prop) {
		var result;
		if (Array.isArray(prop) && prop.length > 0) {
			result = item;
			for (var i = 0; i < prop.length; i++) {
				result = result[prop[i]];
			}
		} else {
			result = item[prop];
		}
		return result;
	}

	_shouldDisplayColumn(columnKey) {
		if (columnKey === 'masterTeacher') {
			return this.masterTeacher;
		}
		return true;
	}
}

window.customElements.define(D2LEvaluationHubActivitiesList.is, D2LEvaluationHubActivitiesList);
