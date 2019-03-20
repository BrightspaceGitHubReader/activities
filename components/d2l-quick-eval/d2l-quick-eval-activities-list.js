import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-table/d2l-table.js';
import 'd2l-button/d2l-button.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import 'd2l-polymer-behaviors/d2l-dom-focus.js';
import 'd2l-link/d2l-link.js';
import 'd2l-users/components/d2l-profile-image.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {Rels, Classes} from 'd2l-hypermedia-constants';
import '../d2l-activity-name/d2l-activity-name.js';
import '../d2l-activity-evaluation-icon/d2l-activity-evaluation-icon-base.js';
import './d2l-quick-eval-no-submissions-image.js';
import './d2l-quick-eval-no-criteria-results-image.js';

/**
 * @customElement
 * @polymer
 */

class D2LQuickEvalActivitiesList extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior, D2L.PolymerBehaviors.Siren.SirenActionBehavior ], QuickEvalLocalize(PolymerElement)) {
	static get template() {
		const quickEvalActivitiesListTemplate = html`
			<style include="d2l-table-style">
				d2l-td {
					font-size: 0.7rem;
				}
				d2l-td.d2l-username-column {
					font-size: 0.8rem;
				}

				.d2l-user-badge-image {
					display: inline-block;
					padding-right: 0.6rem;
					vertical-align: middle;
				}
				:host(:dir(rtl)) .d2l-user-badge-image {
					padding-right: 0;
					padding-left: 0.6rem;
				}

				/* Needed for Edge */
				d2l-table-col-sort-button span {
					color: var(--d2l-color-ferrite);
				}
				d2l-loading-spinner {
					width: 100%;
				}
				d2l-alert {
					margin: auto;
					margin-top: 1rem;
				}
				.d2l-quick-eval-activities-list-load-more-container {
					padding-top: 1rem;
					text-align: right;
					width: 100%;
				}
				:host(:dir(rtl)) .d2l-quick-eval-activities-list-load-more-container {
					text-align: left;
				}
				.d2l-quick-eval-truncated-column {
					max-width: 10rem;
					white-space: nowrap;
				}
				d2l-activity-evaluation-icon-base {
					padding-left: 0.6rem;
				}
				:host(:dir(rtl)) d2l-activity-evaluation-icon-base {
					padding-left: 0;
					padding-right: 0.6rem;
				}
				d2l-activity-name {
					padding-right: 1.4rem;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				:host(:dir(rtl)) d2l-activity-name {
					padding-right: 0;
					padding-left: 1.4rem;
				}
				.d2l-course-name-column {
					overflow: hidden;
					text-overflow: ellipsis;
				}
				[hidden] {
					display: none;
				}
				.d2l-quick-eval-no-submissions,
				.d2l-quick-eval-no-criteria-results {
					text-align: center;
				}
				d2l-quick-eval-no-submissions-image {
					padding-top: 30px;
					padding-bottom: 30px;
					height: 35%;
					width: 35%;
				}
				d2l-quick-eval-no-criteria-results-image {
					padding-top: 30px;
					padding-bottom: 30px;
					height: 15%;
					width: 15%;
				}
				.d2l-quick-eval-no-submissions-heading,
				.d2l-quick-eval-no-criteria-results-heading {
					@apply --d2l-heading-2;
					margin: 0;
				}
				.d2l-body-standard {
					@apply --d2l-body-compact-text;
				}
			</style>
			<d2l-offscreen id="d2l-quick-eval-activities-list-table-summary">[[localize('tableTitle')]]</d2l-offscreen>
			<d2l-table type="light" hidden$="[[_fullListLoading]]" aria-describedby$="d2l-quick-eval-activities-list-table-summary" aria-colcount$="[[_headerColumns.length]]" aria-rowcount$="[[_data.length]]">
				<d2l-thead>
					<d2l-tr>
						<dom-repeat items="[[_headerColumns]]" as="headerColumn">
							<template>
								<template is="dom-if" if="[[_shouldDisplayColumn(headerColumn.key)]]">
									<d2l-th>
										<dom-repeat items="[[headerColumn.headers]]" as="header">
											<template>
												<template is="dom-if" if="[[header.canSort]]">
													<d2l-table-col-sort-button
														nosort$="[[!header.sorted]]"
														desc$="[[header.desc]]"
														on-click="_updateSortState"
														id="[[header.key]]"
													>
														<span>[[localize(header.key)]]</span>
													</d2l-table-col-sort-button>
													<template is="dom-if" if="[[header.suffix]]">
														<span>[[header.suffix]]&nbsp;</span>
													</template>
												</template>
												<template is="dom-if" if="[[!header.canSort]]">
													<span>[[localize(header.key)]]</span>
													<template is="dom-if" if="[[header.suffix]]">
														<span>[[header.suffix]]&nbsp;</span>
													</template>
												</template>
											</template>
										</dom-repeat>
									</d2l-th>
								</template>
							</template>
						</dom-repeat>
					</d2l-tr>
				</d2l-thead>
				<d2l-tbody>
					<dom-repeat items="[[_data]]" as="s">
						<template>
							<d2l-tr>
								<d2l-td class="d2l-username-column">
									<template is="dom-if" if="[[s.userHref]]">
										<d2l-profile-image class="d2l-user-badge-image" href="[[s.userHref]]" token="[[token]]" small=""></d2l-profile-image>
									</template>
									<d2l-offscreen id="d2l-quick-eval-activities-list-username">[[localize('evaluate', 'displayName', s.displayName)]]</d2l-offscreen>
									<d2l-link
										title="[[localize('evaluate', 'displayName', s.displayName)]]"
										aria-describedby$="d2l-quick-eval-activities-list-username"
										href="[[s.activityLink]]"
									>[[_getDataProperty(s, 'displayName')]]</d2l-link>
									<d2l-activity-evaluation-icon-base draft$="[[s.isDraft]]"></d2l-activity-evaluation-icon-base>
								</d2l-td>
								<d2l-td class="d2l-quick-eval-truncated-column d2l-activity-name-column">
									<d2l-activity-name href="[[_getDataProperty(s, 'activityNameHref')]]" token="[[token]]"></d2l-activity-name>
								</d2l-td>
								<d2l-td class="d2l-quick-eval-truncated-column d2l-course-name-column">
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
			<d2l-alert id="list-alert" type="critical" hidden$="[[_health.isHealthy]]">
				[[localize(_health.errorMessage)]]
			</d2l-alert>
			<d2l-offscreen role="alert" aria-live="aggressive" hidden$="[[!_loading]]">[[localize('loading')]]</d2l-offscreen>
			<d2l-loading-spinner size="80" hidden$="[[!_loading]]"></d2l-loading-spinner>
			<template is="dom-if" if="[[_shouldShowLoadMore(_pageNextHref, _loading)]]">
				<div class="d2l-quick-eval-activities-list-load-more-container">
					<d2l-button class="d2l-quick-eval-activities-list-load-more" onclick="[[_loadMore]]">[[localize('loadMore')]]</d2l-button>
				</div>
			</template>
			<template is="dom-if" if="[[_shouldShowNoSubmissions(_data.length, _loading, _health.isHealthy, criteriaApplied)]]">
				<div class="d2l-quick-eval-no-submissions">
					<d2l-quick-eval-no-submissions-image></d2l-quick-eval-no-submissions-image>
					<h2 class="d2l-quick-eval-no-submissions-heading">[[localize('caughtUp')]]</h2>
					<p class="d2l-body-standard">[[localize('noSubmissions')]]</p>
					<p class="d2l-body-standard">[[localize('checkBackOften')]]</p>
				</div>
			</template>
			<template is="dom-if" if="[[_shouldShowNoCriteriaResults(_data.length, _loading, _health.isHealthy, criteriaApplied)]]">
				<div class="d2l-quick-eval-no-criteria-results">
					<d2l-quick-eval-no-criteria-results-image></d2l-quick-eval-no-criteria-results-image>
					<h2 class="d2l-quick-eval-no-criteria-results-heading">[[localize('noResults')]]</h2>
					<p class="d2l-body-standard">[[localize('noCriteriaMatch')]]</p>
				</div>
			</template>
		`;

		quickEvalActivitiesListTemplate.setAttribute('strip-whitespace', 'strip-whitespace');
		return quickEvalActivitiesListTemplate;
	}
	static get is() { return 'd2l-quick-eval-activities-list'; }
	static get properties() {
		return {
			masterTeacher: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			criteriaApplied: {
				type: Boolean,
				value: false
			},
			_headerColumns: {
				type: Array,
				value: [
					{
						key: 'displayName',
						headers: [
							{ key: 'firstName', sortClass: 'first-name', suffix: ',', canSort: false, sorted: false, desc: false  },
							{ key: 'lastName', sortClass: 'last-name', canSort: false, sorted: false, desc: false  }
						]
					},
					{
						key: 'activityName',
						headers: [{ key: 'activityName', sortClass: 'activity-name', canSort: false, sorted: false, desc: false }]
					},
					{
						key: 'courseName',
						headers: [{ key: 'courseName', sortClass: 'course-name', canSort: false, sorted: false, desc: false }]
					},
					{
						key: 'submissionDate',
						headers: [{ key: 'submissionDate', sortClass: 'completion-date', canSort: false, sorted: false, desc: false }]
					},
					{
						key: 'masterTeacher',
						headers: [{ key: 'masterTeacher', canSort: false }]
					}
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
			_health: {
				type: Object,
				value: {
					isHealthy: true,
					errorMessage: ''
				}
			},
			_loading: {
				type: Boolean,
				value: true
			},
			_filterHref: {
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
			'_loadData(entity)',
			'_loadSorts(entity)'
		];
	}
	ready() {
		super.ready();
		this.addEventListener('d2l-siren-entity-error', function() {
			this._fullListLoading = false;
			this._loading = false;
			this._handleFullLoadFailure();
		}.bind(this));
		this._loadMore = this._loadMore.bind(this);
	}

	constructor() { super(); }

	setLoadingState(state) {
		this.set('_fullListLoading', state);
		this.set('_loading', state);
	}

	_myEntityStoreFetch(url) {
		return window.D2L.Siren.EntityStore.fetch(url, this.token);
	}

	_shouldShowLoadMore(hasPageNextHref, isLoading) {
		return hasPageNextHref && !isLoading;
	}

	_shouldShowNoSubmissions(dataLength, isLoading, isHealthy, criteriaApplied) {
		return !dataLength && !isLoading && isHealthy && !criteriaApplied;
	}

	_shouldShowNoCriteriaResults(dataLength, isLoading, isHealthy, criteriaApplied) {
		return !dataLength && !isLoading && isHealthy && criteriaApplied;
	}

	_loadSorts(entity) {
		// entity is null on initial load
		if (!entity) {
			return Promise.resolve();
		}

		return this._followLink(entity, Rels.sorts)
			.then(sortsEntity => {

				if (!sortsEntity || !sortsEntity.entity) {
					return Promise.reject(new Error('Could not load sorts endpoint'));
				}

				this._headerColumns.forEach((headerColumn, i) => {
					headerColumn.headers.forEach((header, j) => {
						if (header.sortClass) {
							const sort = sortsEntity.entity.getSubEntityByClass(header.sortClass);
							if (sort) {
								this.set(`_headerColumns.${i}.headers.${j}.canSort`, true);
								if (sort.properties && sort.properties.applied && (sort.properties.priority === 0)) {
									const descending = sort.properties.direction === 'descending';
									this.set(`_headerColumns.${i}.headers.${j}.sorted`, true);
									this.set(`_headerColumns.${i}.headers.${j}.desc`, descending);
								} else {
									this.set(`_headerColumns.${i}.headers.${j}.sorted`, false);
									this.set(`_headerColumns.${i}.headers.${j}.desc`, false);
								}
							}
						}
					});
				});
				return Promise.resolve();
			});
	}

	_updateSortState(event) {

		let result;
		const headerId = event.currentTarget.id;

		this._headerColumns.forEach((headerColumn, i) => {
			headerColumn.headers.forEach((header, j) => {
				if ((header.key === headerId) && header.canSort) {
					const descending = header.sorted && !header.desc;
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, true);
					this.set(`_headerColumns.${i}.headers.${j}.desc`, descending);

					result = this._fetchSortedData(header.sortClass, descending);
				}
				else {
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, false);
				}
			});
		});

		if (result) {
			return result;
		} else {
			return Promise.reject(new Error(`Could not find sortable header for ${headerId}`));
		}
	}

	_fetchSortedData(sortClass, descending) {
		return this._followLink(this.entity, Rels.sorts)
			.then((sortsEntity => {
				if (!sortsEntity || !sortsEntity.entity) {
					return Promise.reject(new Error('Could not load sorts endpoint'));
				}

				const sort = sortsEntity.entity.getSubEntityByClass(sortClass);
				if (!sort) {
					return Promise.reject(new Error(`Could not find sort class ${sortClass}`));
				}

				const actionName = descending ? 'sort-descending' : 'sort-ascending';
				const action = sort.getActionByName(actionName);
				if (!action) {
					return Promise.reject(new Error(`Could not find sort action ${actionName} for sort ${JSON.stringify(sort)}`));
				}

				return this._performSirenActionWithQueryParams(action);
			}).bind(this))
			.then((sortsEntity => {
				if (!sortsEntity) {
					return Promise.reject(new Error('Could not load sorts endpoint after sort is applied'));
				}
				const action = sortsEntity.getActionByName('apply');
				if (!action) {
					return Promise.reject(new Error(`Could not find apply action in ${sortsEntity}`));
				}
				return action;
			}).bind(this))
			.then((collectionAction => {
				const collection = this._performSirenActionWithQueryParams(collectionAction);
				return collection;
			}).bind(this))
			.then((collection => {
				this.entity = collection;
				this._dispatchSortUpdatedEvent(collection);
				return Promise.resolve();
			}).bind(this));
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}
		this._loading = true;
		this._fullListLoading = true;

		try {
			if (entity.entities) {
				var result = await this._parseActivities(entity);
				this._data = result;
			} else {
				this._data = [];
			}
			this._clearAlerts();

		} catch (e) {
			// Unable to load activities from entity.
			this._handleFullLoadFailure().bind(this);
			return Promise.reject(e);
		} finally {
			this._fullListLoading = false;
			this._loading = false;
		}
	}

	_loadMore() {
		if (this._pageNextHref && !this._loading) {
			this._loading = true;
			this._followHref(this._pageNextHref)
				.then(async function(u) {
					if (u && u.entity) {
						var tbody = this.shadowRoot.querySelector('d2l-tbody');
						var lastFocusableTableElement = D2L.Dom.Focus.getLastFocusableDescendant(tbody, false);

						try {
							if (u.entity.entities) {
								var result = await this._parseActivities(u.entity);
								this._data = this._data.concat(result);
							}
						} catch (e) {
						// Unable to load more activities from entity.
							throw e;
						} finally {
							this._loading = false;
							window.requestAnimationFrame(function() {
								var newElementToFocus = D2L.Dom.Focus.getNextFocusable(lastFocusableTableElement, false);
								if (newElementToFocus) {
									newElementToFocus.focus();
								}
							});
						}
					}
				}.bind(this))
				.then(this._clearAlerts.bind(this))
				.catch(function() {
					this._loading = false;
					this._handleLoadMoreFailure();
				}.bind(this));
		}
	}

	_clearAlerts() {
		this.set('_health', { isHealthy: true, errorMessage: '' });
	}

	_handleLoadMoreFailure() {
		this.set('_health', { isHealthy: false, errorMessage: 'failedToLoadMore' });
	}

	_handleFullLoadFailure() {
		this.set('_health', { isHealthy: false, errorMessage: 'failedToLoadData' });
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
		var extraParams = this._getExtraParams(this._getHref(entity, 'self'));

		var promises = [];
		entity.entities.forEach(function(activity) {
			promises.push(new Promise(function(resolve) {

				var item = {
					displayName: '',
					userHref: this._getUserHref(activity),
					courseName: '',
					activityNameHref: this._getActivityNameHref(activity),
					submissionDate: this._getSubmissionDate(activity),
					activityLink: this._getRelativeUriProperty(activity, extraParams),
					masterTeacher: '',
					isDraft: this._determineIfActivityIsDraft(activity)
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
		this._pageNextHref = this._getHref(entity, 'next');

		const result = await Promise.all(promises);
		return result;
	}

	_determineIfActivityIsDraft(activity) {
		if (activity.hasSubEntityByRel('https://api.brightspace.com/rels/evaluation')) {
			var evaluation = activity.getSubEntityByRel('https://api.brightspace.com/rels/evaluation');
			if (evaluation.properties && evaluation.properties.state === 'Draft') {
				return true;
			}
		}

		return false;
	}

	_getMasterTeacherPromise(entity, item) {
		return this._followLink(entity, Rels.organization)
			.then(function(org) {
				if (org && org.entity) {
					return this._followLink(org.entity, 'https://enrollments.api.brightspace.com/rels/primary-facilitators');
				}
			}.bind(this))
			.then(function(enrollment) {
				if (enrollment && enrollment.entity && enrollment.entity.hasSubEntityByRel(Rels.userEnrollment)) {
					var userEnrollment = enrollment.entity.getSubEntityByRel(Rels.userEnrollment);
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

	_getUserHref(entity) {
		if (entity.hasLinkByRel(Rels.user)) {
			const link = entity.getLinkByRel(Rels.user);
			return link.href;
		}
		return '';
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

	_getRelativeUriProperty(entity, extraParams) {
		if (entity.hasSubEntityByClass(Classes.relativeUri)) {
			var i = entity.getSubEntityByClass(Classes.relativeUri);
			return this._buildRelativeUri(i.properties.path, extraParams);
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

	_dispatchSortUpdatedEvent(sorted) {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activities-list-sort-updated',
				{
					detail: {
						sortedActivities: sorted
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_performSirenActionWithQueryParams(action) {
		const url = new URL(action.href, window.location.origin);

		if (!action.fields) {
			action.fields = [];
		}

		url.searchParams.forEach(function(value, key) {
			if (!action.fields.filter(x => x.name === key)[0]) {
				action.fields.push({name: key, value: value, type: 'hidden'});
			}
		});

		return this.performSirenAction(action);
	}

	_getExtraParams(url) {
		if (!url || url === '') return [];

		const extraParams = [];

		var filterVal = this._getQueryStringParam('filter', url);
		if (filterVal) {
			extraParams.push(
				{
					name: 'filter',
					value: filterVal
				}
			);
		}
		var sortVal = this._getQueryStringParam('sort', url);
		if (sortVal) {
			extraParams.push(
				{
					name: 'sort',
					value: sortVal
				}
			);
		}

		return extraParams;
	}

	_getQueryStringParam(name, url) {
		const parsedUrl = new window.URL(url);
		return parsedUrl.searchParams.get(name);
	}

	_buildRelativeUri(url, extraParams) {
		if (extraParams.length === 0) {
			return url;
		}

		const parsedUrl = new window.URL(url, 'https://notused.com');

		extraParams.forEach(param => {
			parsedUrl.searchParams.set(param.name, param.value);
		});

		return parsedUrl.pathname + parsedUrl.search;
	}

}

window.customElements.define(D2LQuickEvalActivitiesList.is, D2LQuickEvalActivitiesList);