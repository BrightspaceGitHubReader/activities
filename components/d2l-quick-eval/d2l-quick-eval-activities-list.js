import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {QuickEvalLocalize} from './QuickEvalLocalize.js';
import {QuickEvalLogging} from './QuickEvalLogging.js';
import 'd2l-alert/d2l-alert.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-table/d2l-table.js';
import 'd2l-button/d2l-button.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-polymer-behaviors/d2l-dom-focus.js';
import 'd2l-link/d2l-link.js';
import 'd2l-users/components/d2l-profile-image.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import '../d2l-activity-name/d2l-activity-name.js';
import '../d2l-activity-evaluation-icon/d2l-activity-evaluation-icon-base.js';
import './d2l-quick-eval-no-submissions-image.js';
import './d2l-quick-eval-no-criteria-results-image.js';
import './d2l-quick-eval-skeleton.js';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';
import './behaviors/d2l-hm-sort-behaviour.js';
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import {StringEndsWith} from './compatability/ie11shims.js';

/**
 * @customElement
 * @polymer
 */

class D2LQuickEvalActivitiesList extends mixinBehaviors(
	[D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior, D2L.PolymerBehaviors.QuickEval.D2LHMSortBehaviour],
	QuickEvalLogging(QuickEvalLocalize(PolymerElement))
) {
	static get template() {
		const quickEvalActivitiesListTemplate = html`
			<style include="d2l-table-style">
				.d2l-quick-eval-table {
					--d2l-table-body-background-color: transparent;
					--d2l-table-light-header-background-color: transparent;
				}
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
				d2l-quick-eval-skeleton {
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
				.d2l-quick-eval-30-column {
					width: 30%;
				}
				.d2l-quick-eval-25-column {
					width: 25%;
				}
				.d2l-quick-eval-20-column {
					width: 20%;
				}
				.d2l-quick-eval-15-column {
					width: 15%;
				}
				.d2l-quick-eval-truncated-column {
					max-width: 10rem;
					white-space: nowrap;
				}
				d2l-activity-evaluation-icon-base {
					padding-left: 0.6rem;
				}
				d2l-loading-spinner {
					width: 100%;
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
			<d2l-table class="d2l-quick-eval-table" type="light" hidden$="[[_fullListLoading]]" aria-describedby$="d2l-quick-eval-activities-list-table-summary" aria-colcount$="[[_headerColumns.length]]" aria-rowcount$="[[_data.length]]">
				<d2l-thead>
					<d2l-tr>
						<dom-repeat items="[[_headerColumns]]" as="headerColumn">
							<template>
								<template is="dom-if" if="[[_shouldDisplayColumn(headerColumn.key)]]">
									<d2l-th class$=[[_getWidthCssClass(headerColumn.key)]]>
										<dom-repeat items="[[headerColumn.headers]]" as="header">
											<template>
												<template is="dom-if" if="[[header.canSort]]">
													<d2l-table-col-sort-button
														nosort$="[[!header.sorted]]"
														desc$="[[header.desc]]"
														on-click="_sortClickHandler"
														id="[[header.key]]"
														title="[[_localizeSortText(header.key)]]"
														aria-label$="[[_localizeSortText(header.key)]]"
														aria-live="assertive"
													>
														<span aria-hidden="true">[[localize(header.key)]]</span>
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
										<d2l-profile-image
											class="d2l-user-badge-image"
											href="[[s.userHref]]"
											token="[[token]]"
											small=""
											aria-hidden="true">
										</d2l-profile-image>
									</template>
									<d2l-link
										title="[[_localizeEvaluationText(s, _headerColumns.0.meta.firstThenLast)]]"
										href="[[s.activityLink]]"
										aria-label$="[[_localizeEvaluationText(s, _headerColumns.0.meta.firstThenLast)]]"
									>[[_formatDisplayName(s, _headerColumns.0.meta.firstThenLast)]]</d2l-link>
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
			<d2l-quick-eval-skeleton hidden$="[[!_fullListLoading]]"></d2l-quick-eval-skeleton>
	     	<d2l-loading-spinner size="80" hidden$="[[!_isLoadingMore(_fullListLoading,_loading)]]"></d2l-loading-spinner>

			<template is="dom-if" if="[[_shouldShowLoadMore(_pageNextHref, _loading)]]">
				<div class="d2l-quick-eval-activities-list-load-more-container">
					<d2l-button class="d2l-quick-eval-activities-list-load-more" onclick="[[_loadMore]]">[[localize('loadMore')]]</d2l-button>
				</div>
			</template>
			<template is="dom-if" if="[[_shouldShowNoSubmissions(_data.length, _loading, _health.isHealthy, filterApplied, searchApplied)]]">
				<div class="d2l-quick-eval-no-submissions">
					<d2l-quick-eval-no-submissions-image></d2l-quick-eval-no-submissions-image>
					<h2 class="d2l-quick-eval-no-submissions-heading">[[localize('caughtUp')]]</h2>
					<p class="d2l-body-standard">[[localize('noSubmissions')]]</p>
					<p class="d2l-body-standard">[[localize('checkBackOften')]]</p>
				</div>
			</template>
			<template is="dom-if" if="[[_shouldShowNoCriteriaResults(_data.length, _loading, _health.isHealthy, filterApplied, searchApplied)]]">
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
			filterApplied: {
				type: Boolean,
				value: false
			},
			searchApplied: {
				type: Boolean,
				value: false
			},
			_headerColumns: {
				type: Array,
				value: [
					{
						key: 'displayName',
						meta: { firstThenLast: true },
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
						headers: [{ key: 'masterTeacher', sortClass: 'primary-facilitator', canSort: false, sorted: false, desc: false }]
					}
				]
			},
			_data: {
				type: Array,
				value: [ ]
			},
			_numberOfActivitiesToShow: {
				type: Number,
				computed: '_computeNumberOfActivitiesToShow(_data, _numberOfActivitiesToShow)',
				value: 20
			},
			_numberOfActivitiesShownInSearchResults: {
				type: Number,
				computed: '_computeNumberOfActivitiesShownInSearchResults(_data)'
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
			'_handleSorts(entity)',
			'_handleNameSwap(_headerColumns.0.headers.*)',
			'_dispatchPageSizeEvent(_numberOfActivitiesToShow)',
			'_dispatchActivitiesShownInSearchResultsEvent(_numberOfActivitiesShownInSearchResults)'
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

	_handleSorts(entity) {
		// entity is null on initial load
		if (!entity) {
			return Promise.resolve();
		}

		return this._loadSorts(entity).then(sortsEntity => {
			this._headerColumns.forEach((headerColumn, i) => {
				headerColumn.headers.forEach((header, j) => {
					if (header.sortClass) {
						const sort = sortsEntity.getSubEntityByClass(header.sortClass);
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
		});
	}

	_sortClickHandler(event) {

		let result;
		const headerId = event.currentTarget.id;

		this._headerColumns.forEach((headerColumn, i) => {
			headerColumn.headers.forEach((header, j) => {
				if ((header.key === headerId) && header.canSort) {
					const descending = header.sorted && !header.desc;
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, true);
					this.set(`_headerColumns.${i}.headers.${j}.desc`, descending);

					result = this._applySortAndFetchData(header.sortClass, descending);
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

	setLoadingState(state) {
		this.set('_fullListLoading', state);
		this.set('_loading', state);
	}

	_isLoadingMore(fullListLoading, isLoading) {
		return !fullListLoading && isLoading;
	}

	_computeNumberOfActivitiesToShow(data, currentNumberOfActivitiesShown) {
		return Math.max(data.length, currentNumberOfActivitiesShown);
	}

	_computeNumberOfActivitiesShownInSearchResults(data) {
		return data.length;
	}

	_handleNameSwap(entry) {
		if (entry && StringEndsWith(entry.path, '1.sorted')) {
			const tmp = this._headerColumns[0].headers[0];
			this.set('_headerColumns.0.headers.0', this._headerColumns[0].headers[1]);
			this.set('_headerColumns.0.headers.1', tmp);
			this.set('_headerColumns.0.headers.0.suffix', ',');
			this.set('_headerColumns.0.headers.1.suffix', '');
			this.set('_headerColumns.0.meta.firstThenLast', this._headerColumns[0].headers[0].key === 'firstName');
		}
	}

	_shouldShowLoadMore(hasPageNextHref, isLoading) {
		return hasPageNextHref && !isLoading;
	}

	_shouldShowNoSubmissions(dataLength, isLoading, isHealthy, filterApplied, searchApplied) {
		return !dataLength && !isLoading && isHealthy && !(filterApplied || searchApplied);
	}

	_shouldShowNoCriteriaResults(dataLength, isLoading, isHealthy, filterApplied, searchApplied) {
		return !dataLength && !isLoading && isHealthy && (filterApplied || searchApplied);
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}
		this._loading = true;
		this._fullListLoading = true;

		try {
			if (entity.entities) {
				const result = await this._parseActivities(entity);
				this._data = result;
			} else {
				this._data = [];
				this._pageNextHref = '';
			}
			this._clearAlerts();

		} catch (e) {
			this._logError(e, {developerMessage: 'Unable to load activities from entity.'});
			this._handleFullLoadFailure();
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
						const tbody = this.shadowRoot.querySelector('d2l-tbody');
						const lastFocusableTableElement = D2L.Dom.Focus.getLastFocusableDescendant(tbody, false);

						try {
							if (u.entity.entities) {
								const result = await this._parseActivities(u.entity);
								this._data = this._data.concat(result);
							}
						} catch (e) {
						// Unable to load more activities from entity.
							throw e;
						} finally {
							this._loading = false;
							window.requestAnimationFrame(function() {
								const newElementToFocus = D2L.Dom.Focus.getNextFocusable(lastFocusableTableElement, false);
								if (newElementToFocus) {
									newElementToFocus.focus();
								}
							});
						}
					}
				}.bind(this))
				.then(this._clearAlerts.bind(this))
				.catch(function(e) {
					this._logError(e, {developerMessage: 'Unable to load more.'});
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

	async _parseActivities(entity) {
		const extraParams = this._getExtraParams(this._getHref(entity, 'self'));

		const promises = [];
		entity.entities.forEach(function(activity) {
			promises.push(new Promise(function(resolve) {

				const item = {
					displayName: '',
					userHref: this._getUserHref(activity),
					courseName: '',
					activityNameHref: this._getActivityNameHref(activity),
					submissionDate: this._getSubmissionDate(activity),
					activityLink: this._getRelativeUriProperty(activity, extraParams),
					masterTeacher: '',
					isDraft: this._determineIfActivityIsDraft(activity)
				};

				const getUserName = this._getUserPromise(activity, item);
				const getCourseName = this._getCoursePromise(activity, item);
				const getMasterTeacherName =
					this._shouldDisplayColumn('masterTeacher')
						? this._getMasterTeacherPromise(activity, item)
						: Promise.resolve();

				Promise.all([getUserName, getCourseName, getMasterTeacherName]).then(function() {
					resolve(item);
				});
			}.bind(this)));
		}.bind(this));

		this._filterHref = this._getFilterHref(entity);
		this._pageNextHref = this._getPageNextHref(entity);

		const result = await Promise.all(promises);
		return result;
	}

	_determineIfActivityIsDraft(activity) {
		const evaluation = this._getEvaluation(activity);
		if (evaluation && evaluation.properties && evaluation.properties.state === 'Draft') {
			return true;
		}

		return false;
	}

	_localizeSortText(columnName) {
		const localizedColumnName = this.localize(columnName);
		return this.localize('sortBy', 'columnName', localizedColumnName);
	}

	_localizeEvaluationText(
		data,
		firstThenLast
	) {
		const formattedDisplayName = this._formatDisplayName(data, firstThenLast);
		return this.localize('evaluate', 'displayName', formattedDisplayName);
	}

	_formatDisplayName(
		data,
		firstThenLast
	) {
		const firstName = data.displayName.firstName;
		const lastName = data.displayName.lastName;
		const defaultDisplayName = data.displayName.defaultDisplayName;

		if (!lastName && !firstName) {
			return defaultDisplayName;
		}
		if (!lastName) {
			return firstName;
		}
		if (!firstName) {
			return lastName;
		}

		if (firstThenLast) {
			return firstName + ' ' + lastName;
		}

		return lastName + ', ' + firstName;
	}

	_getDataProperty(item, prop) {
		let result;
		if (Array.isArray(prop) && prop.length > 0) {
			result = item;
			for (let i = 0; i < prop.length; i++) {
				result = result[prop[i]];
			}
		} else {
			result = item[prop];
		}
		return result;
	}

	_getWidthCssClass(columnKey) {
		if (this.masterTeacher) {
			switch (columnKey) {
				case 'displayName':
					return 'd2l-quick-eval-25-column';
				case 'activityName':
				case 'courseName':
				case 'masterTeacher':
					return 'd2l-quick-eval-20-column';
				case 'submissionDate':
					return 'd2l-quick-eval-15-column';
				default:
					throw new Error(`Invalid column key: ${columnKey}`);
			}
		} else {
			switch (columnKey) {
				case 'displayName':
					return 'd2l-quick-eval-30-column';
				case 'activityName':
				case 'courseName':
					return 'd2l-quick-eval-25-column';
				case 'submissionDate':
					return 'd2l-quick-eval-20-column';
				default:
					throw new Error(`Invalid column key: ${columnKey}`);
			}
		}
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

	_dispatchPageSizeEvent(numberOfActivitiesToShow) {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activities-list-activities-shown-number-updated',
				{
					detail: {
						count: numberOfActivitiesToShow
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}

	_dispatchActivitiesShownInSearchResultsEvent(countOfSearchResults) {
		this.dispatchEvent(
			new CustomEvent(
				'd2l-quick-eval-activities-list-search-results-count',
				{
					detail: {
						count: countOfSearchResults
					},
					composed: true,
					bubbles: true
				}
			)
		);
	}
}

window.customElements.define(D2LQuickEvalActivitiesList.is, D2LQuickEvalActivitiesList);
