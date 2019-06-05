import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { QuickEvalLogging } from './QuickEvalLogging.js';
import { QuickEvalLocalize } from './QuickEvalLocalize.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { Rels } from 'd2l-hypermedia-constants';
import './behaviors/d2l-quick-eval-siren-helper-behavior.js';
import './d2l-quick-eval-activities-list.js';
import './behaviors/d2l-hm-sort-behaviour.js';
import 'd2l-common/components/d2l-hm-filter/d2l-hm-filter.js';
import 'd2l-common/components/d2l-hm-search/d2l-hm-search.js';
import 'd2l-alert/d2l-alert.js';
import './d2l-quick-eval-search-results-summary-container.js';

class D2LQuickEvalSubmissions extends mixinBehaviors(
	[
		D2L.PolymerBehaviors.QuickEval.D2LQuickEvalSirenHelperBehavior,
		D2L.PolymerBehaviors.QuickEval.D2LHMSortBehaviour
	],
	QuickEvalLogging(QuickEvalLocalize(PolymerElement))
) {
	static get template() {
		const template = html`
			<style>
				d2l-hm-search {
					display: inline-block;
					width: 250px;
					margin-left: .25rem;
				}
				d2l-alert {
					margin: auto;
					margin-bottom: 0.5rem;
				}
				d2l-quick-eval-search-results-summary-container {
					margin-bottom: 0.9rem;
					margin-top: 0.9rem;
					display: block;
				}
				[hidden] {
					display: none;
				}
				.d2l-quick-eval-activity-list-modifiers {
					float: right;
				}
				.clear {
					clear: both;
				}
				d2l-quick-eval-activities-list {
					display: block;
					padding-top: 1rem;
				}
			</style>
			<div class="d2l-quick-eval-activity-list-modifiers">
				<d2l-hm-filter
					href="[[_filterHref]]"
					token="[[token]]"
					category-whitelist="[[_filterIds]]"
					result-size="[[_numberOfActivitiesToShow]]"
					on-d2l-hm-filter-filters-loaded="_filtersLoaded"
					on-d2l-hm-filter-filters-updating="_filtersUpdating"
					on-d2l-hm-filter-filters-updated="_filtersChanged"
					on-d2l-hm-filter-error="_filterError">
				</d2l-hm-filter>
				<d2l-hm-search
					hidden$="[[!searchEnabled]]"
					token="[[token]]"
					search-action="[[_searchAction]]"
					placeholder="[[localize('search')]]"
					result-size="[[_numberOfActivitiesToShow]]"
					aria-label$="[[localize('search')]]"
					on-d2l-hm-search-results-loading="_searchResultsLoading"
					on-d2l-hm-search-results-loaded="_searchResultsLoaded"
					on-d2l-hm-search-error="_searchError">
				</d2l-hm-search>
			</div>
			<div class="clear"></div>
			<d2l-alert type="critical" hidden$="[[!_showFilterError]]" id="d2l-quick-eval-filter-error-alert">
				[[localize('failedToFilter')]]
			</d2l-alert>
			<d2l-alert type="critical" hidden$="[[!_showSearchError]]" id="d2l-quick-eval-search-error-alert">
				[[localize('failedToSearch')]]
			</d2l-alert>
			<d2l-quick-eval-search-results-summary-container
				search-results-count="[[_searchResultsCount]]"
				more-results="[[_moreSearchResults]]"
				hidden$="[[!_searchResultsMessageEnabled(_showSearchResultSummary, searchEnabled)]]"
				on-d2l-quick-eval-search-results-summary-container-clear-search="_clearSearchResults">
			</d2l-quick-eval-search-results-summary-container>
			<d2l-quick-eval-activities-list
				href="[[href]]"
				token="[[token]]"
				logging-endpoint="[[loggingEndpoint]]"
				master-teacher="[[masterTeacher]]"
				_data="[[_data]]"
				_header-columns="[[_headerColumns]]"
				on-d2l-quick-eval-submission-table-load-more="_loadMore"
				on-d2l-quick-eval-submissions-table-sort-requested="_handleSortRequested">
			</d2l-quick-eval-activities-list>
		`;
		template.setAttribute('strip-whitespace', 'strip-whitespace');
		return template;
	}

	static get is() {
		return 'd2l-quick-eval-submissions';
	}

	static get properties() {
		return {
			_data: {
				type: Array,
				value: []
			},
			_headerColumns: {
				type: Array,
				value: [
					{
						key: 'displayName',
						meta: { firstThenLast: true },
						headers: [
							{ key: 'firstName', sortClass: 'first-name', suffix: ',', canSort: false, sorted: false, desc: false },
							{ key: 'lastName', sortClass: 'last-name', canSort: false, sorted: false, desc: false }
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
			_numberOfActivitiesToShow: {
				type: Number,
				computed: '_computeNumberOfActivitiesToShow(_data, _numberOfActivitiesToShow)',
				value: 20
			},
			_searchAction: {
				type: Object,
				computed: '_getSearchAction(entity)'
			},
			_filterHref: {
				type: String,
				computed: '_getFilterHref(entity)'
			},
			_filterIds: {
				type: Array,
				computed: '_getFilterIds(masterTeacher)'
			},
			_showFilterError: {
				type: Boolean,
				value: false
			},
			_searchResultsCount: {
				type: Number,
				value: 0
			},
			_moreSearchResults: {
				type: Boolean,
				value: false
			},
			searchEnabled: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			_showSearchResultSummary: {
				type: Boolean,
				value: false
			},
			_showSearchError: {
				type: Boolean,
				value: false
			},
		};
	}

	static get observers() {
		return [
			'_loadData(entity)',
			'_handleSorts(entity)'
		];
	}

	get list() {
		return this.shadowRoot.querySelector('d2l-quick-eval-activities-list');
	}

	async _loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}
		this.list._loading = true;
		this.list._fullListLoading = true;

		try {
			if (entity.entities) {
				const result = await this._parseActivities(entity);
				this._data = result;
			} else {
				this._data = [];
				this.list._pageNextHref = '';
			}
			this.list._clearAlerts();

		} catch (e) {
			this._logError(e, {developerMessage: 'Unable to load activities from entity.'});
			this.list._handleFullLoadFailure();
			return Promise.reject(e);
		} finally {
			this.list._fullListLoading = false;
			this.list._loading = false;
		}
	}

	_loadMore() {
		if (this.list._pageNextHref && !this.list._loading) {
			this.list._loading = true;
			this._followHref(this.list._pageNextHref)
				.then(async function(u) {
					if (u && u.entity) {
						const tbody = this.list.shadowRoot.querySelector('d2l-tbody');
						const lastFocusableTableElement = D2L.Dom.Focus.getLastFocusableDescendant(tbody, false);

						try {
							if (u.entity.entities) {
								const result = await this._parseActivities(u.entity);
								this._data = this._data.concat(result);
								this._updateSearchResultsCount(this._data.length);
							}
						} catch (e) {
						// Unable to load more activities from entity.
							throw e;
						} finally {
							this.list._loading = false;
							window.requestAnimationFrame(function() {
								const newElementToFocus = D2L.Dom.Focus.getNextFocusable(lastFocusableTableElement, false);
								if (newElementToFocus) {
									newElementToFocus.focus();
								}
							});
						}
					}
				}.bind(this))
				.then(this.list._clearAlerts.bind(this.list))
				.catch(function(e) {
					this._logError(e, {developerMessage: 'Unable to load more.'});
					this.list._loading = false;
					this.list._handleLoadMoreFailure();
				}.bind(this));
		}
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
					this.list._shouldDisplayColumn('masterTeacher')
						? this._getMasterTeacherPromise(activity, item)
						: Promise.resolve();

				Promise.all([getUserName, getCourseName, getMasterTeacherName]).then(function() {
					resolve(item);
				});
			}.bind(this)));
		}.bind(this));

		this.list._filterHref = this._getFilterHref(entity);
		this.list._pageNextHref = this._getPageNextHref(entity);

		const result = await Promise.all(promises);
		return result;
	}

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

	_handleSortRequested(evt) {
		let result;
		const headerId = evt.detail.headerId;

		this._headerColumns.forEach((headerColumn, i) => {
			headerColumn.headers.forEach((header, j) => {
				if ((header.key === headerId) && header.canSort) {
					const descending = header.sorted && !header.desc;
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, true);
					this.set(`_headerColumns.${i}.headers.${j}.desc`, descending);

					const customParams = this._numberOfActivitiesToShow > 0 ? { pageSize: this._numberOfActivitiesToShow } : undefined;
					result = this._applySortAndFetchData(header.sortClass, descending, customParams);
				}
				else {
					this.set(`_headerColumns.${i}.headers.${j}.sorted`, false);
				}
			});
		});

		if (result) {
			return result.then(sortedCollection => {
				this.entity = sortedCollection;
				this._dispatchSortUpdatedEvent(sortedCollection);
			});
		} else {
			return Promise.reject(new Error(`Could not find sortable header for ${headerId}`));
		}
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

	_filtersLoaded(e) {
		this.list.filterApplied = e.detail.totalSelectedFilters > 0;
		this._showFilterError = false;
	}

	_filtersUpdating() {
		this.list.setLoadingState(true);
		this._clearErrors();
	}

	_filtersChanged(e) {
		this.entity = e.detail.filteredActivities;

		if (this.entity && this.entity.entities) {
			this._updateSearchResultsCount(this.entity.entities.length);
		}
		this._clearErrors();
	}

	_filterError(e) {
		this._logError(e.detail.error, { developerMessage: 'Failed to retrieve filter results' });
		this.list.setLoadingState(false);
		this._showFilterError = true;
	}

	_getFilterIds(masterTeacher) {
		// [ 'activity-name', 'enrollments', 'completion-date' ]
		let filters = [ 'c806bbc6-cfb3-4b6b-ae74-d5e4e319183d', 'f2b32f03-556a-4368-945a-2614b9f41f76', '05de346e-c94d-4e4b-b887-9c86c9a80351' ];
		if (masterTeacher) {
			filters = filters.concat('35b3aca0-c10c-436d-b369-c8a3022455e3'); // [ 'primary-facilitator' ]
		}
		return filters;
	}

	_getFilterHref(entity) {
		return this._getHref(entity, Rels.filters);
	}

	_clearErrors() {
		this._showSearchError = false;
		this._showFilterError = false;
	}

	_updateSearchResultsCount(count) {
		this._searchResultsCount = count;

		if (this.list._pageNextHref) {
			this._moreSearchResults = true;
		} else {
			this._moreSearchResults = false;
		}
	}

	_searchResultsLoading() {
		this.list.setLoadingState(true);
		this._clearErrors();
	}

	_searchResultsLoaded(e) {
		this.entity = e.detail.results;
		this._showSearchResultSummary = !e.detail.searchIsCleared;
		this.list.searchApplied = !e.detail.searchIsCleared;

		if (this.entity && this.entity.entities) {
			this._updateSearchResultsCount(this.entity.entities.length);
		} else {
			this._updateSearchResultsCount(0);
		}
		this._clearErrors();
	}

	_searchError(e) {
		this._logError(e.detail.error, { developerMessage: 'Failed to retrieve search results.' });
		list.setLoadingState(false);
		this._showSearchError = true;
	}

	_searchResultsMessageEnabled() {
		return this._showSearchResultSummary && this.searchEnabled;
	}

	// move
	_clearSearchResults() {
		const search = this.shadowRoot.querySelector('d2l-hm-search');
		search.clearSearch();
	}

	_computeNumberOfActivitiesToShow(data, currentNumberOfActivitiesShown) {
		return Math.max(data.length, currentNumberOfActivitiesShown);
	}

	_getSearchAction(entity) {
		return this._getAction(entity, 'search');
	}

	ready() {
		super.ready();
		this.addEventListener('d2l-siren-entity-error', function() {
			this.list._fullListLoading = false;
			this.list._loading = false;
			this.list._handleFullLoadFailure();
		}.bind(this));
	}
}

window.customElements.define(D2LQuickEvalSubmissions.is, D2LQuickEvalSubmissions);
