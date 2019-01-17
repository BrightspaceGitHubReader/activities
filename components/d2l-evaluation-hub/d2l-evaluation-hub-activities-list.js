import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-table/d2l-table.js';
import 'd2l-colors/d2l-colors.js';
import 'd2l-offscreen/d2l-offscreen.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import 'd2l-polymer-siren-behaviors/store/siren-action-behavior.js';
import 'd2l-link/d2l-link.js';
import {mixinBehaviors} from '@polymer/polymer/lib/legacy/class.js';
import {Rels, Classes} from 'd2l-hypermedia-constants';

/**
 * @customElement
 * @polymer
 */

class D2LEvaluationHubActivitiesList extends mixinBehaviors([D2L.PolymerBehaviors.Siren.EntityBehavior], PolymerElement) {
	static get template() {
		return html`
			<style include="d2l-table-style">
				d2l-table d2l-tr d2l-td d2l-link {
					display:block;
					height:100%;
					width:100%;
				}
				[hidden] {
					display: none;
				}
			</style>
			<d2l-table>
				<d2l-thead>
					<d2l-tr>
						<dom-repeat items="[[_headers]]">
							<template>
								<d2l-th on-click=sort>{{item.displayName}}</d2l-th>
							</template>
						</dom-repeat>
					</d2l-tr>
				</d2l-thead>
				<d2l-tbody>
					<dom-repeat items="[[_data]]" as="s">
						<template>
							<d2l-tr>
								<dom-repeat items="[[_headers]]" as="h">
									<template>
										<d2l-td>
											<d2l-link href="[[s.activityLink]]" hidden$="[[!h.canLink]]">[[getProperty(s, h.key)]]</d2l-link>
											<span hidden$="[[h.canLink]]">[[getProperty(s, h.key)]]</span>
										</d2l-td>
									</template>
								</dom-repeat>
							</d2l-tr>
						</template>
					</dom-repeat>
				</d2l-tbody>
			</d2l-table>
			<d2l-offscreen>
				<button onclick="[[loadMore]]">Load more</button>
			</d2l-offscreen>
		`;
	}
	static get is() { return 'd2l-evaluation-hub-activities-list'; }
	static get properties() {
		return {
			_headers: {
				type: Array,
				value: [
					{ key: [ 'displayName' ], sortKey: 'displayName', displayName: 'Submitter', canLink: true},
					{ key: [ 'activityName' ], sortKey: 'activityName', displayName: 'Activity Name', canLink: false},
					{ key: [ 'courseName' ], sortKey: 'courseName', displayName: 'Course Name', canLink: false},
					{ key: [ 'submissionDate' ], sortKey: 'submissionDate', displayName: 'Submission Date', canLink: false}
				]
			},
			_data: {
				type: Array,
				value: [ ]
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
			'loadData(entity, href)'
		];
	}
	ready() {
		super.ready();
		var self = this;
		this.addEventListener('d2l-siren-entity-error', function() {
			self._loading = false;
		});
	}
	constructor() { super(); }

	fetch(url) {
		return window.D2L.Siren.EntityStore.fetch(url, this.token);
	}

	loadMore() {
		// TODO: once paging is enabled!!!
	}

	sort(/*e*/) {
		// TODO: once sorting is enabled!!!
		// var sortKey = e.model.item.sortKey;
	}

	async loadData(entity) {
		if (!entity) {
			return Promise.resolve();
		}

		this._loading = true;

		try {
			await this.parseActivities(entity);
		} catch (e) {
			// Unable to load activities from entity.
		} finally {
			this._loading = false;
		}
	}

	followLink(entity, rel) {
		var href = this.getHref(entity, rel);
		if (href) {
			return this.fetch(href);
		}
		return Promise.resolve();
	}

	async parseActivities(entity) {
		var self = this;
		var promises = [];
		entity.entities.forEach(function(activity) {
			promises.push(new Promise(function(resolve) {
				var item = {
					displayName: '',
					courseName: '',
					activityName: '',
					submissionDate: self.getSubmissionDate(activity),
					activityLink: self.getHref(activity, Rels.Assessments.assessmentApplication)
				};

				var getUserName = self.getUserPromise(activity, item);
				var getCourseName = self.getCoursePromise(activity, item);
				var getActivityName = self.getActivityPromise(activity, item);

				Promise.all([getUserName, getCourseName, getActivityName]).then(function() {
					resolve(item);
				});
			}));
		});

		self._filterHref = self.getHref(entity, Rels.filters);
		//self._sortHref = self.getHref(entity, Rels.sort);
		//self._pageNextHref = self.getHref(entity, Rels.pageNext);

		const result = await Promise.all(promises);
		self._data = self._data.concat(result);
	}

	getHref(entity, rel) {
		if (entity && entity.hasLinkByRel && entity.hasLinkByRel(rel)) {
			return entity.getLinkByRel(rel).href;
		}
		return '';
	}

	getActivityPromise(entity, item) {
		var rel;
		if (entity.hasClass(Classes.activities.userQuizActivity)) {
			rel = Rels.quiz;
		} else if (entity.hasClass(Classes.activities.userAssignmentActivity)) {
			rel = Rels.assignment;
		} else if (entity.hasClass(Classes.activities.userDiscussionActivity)) {
			rel = Rels.Discussions.topic;
		} else {
			return Promise.resolve();
		}
		return this.followLink(entity, rel)
			.then(function(a) {
				if (a && a.entity && a.entity.properties) {
					item.activityName = a.entity.properties.name;
				}
			});
	}

	getCoursePromise(entity, item) {
		return this.followLink(entity, Rels.organization)
			.then(function(o) {
				if (o && o.entity && o.entity.properties) {
					item.courseName = o.entity.properties.name;
				}
			});
	}

	getUserPromise(entity, item) {
		return this.followLink(entity, Rels.user)
			.then(function(u) {
				if (u && u.entity && u.entity.hasSubEntityByRel(Rels.displayName)) {
					item.displayName = u.entity.getSubEntityByRel(Rels.displayName).properties.name;
				}
			});
	}

	getSubmissionDate(entity) {
		if (entity.hasSubEntityByRel('item')) {
			var i = entity.getSubEntityByRel('item');
			if (i.hasSubEntityByRel(Rels.date)) {
				return i.getSubEntityByRel(Rels.date).properties.date;
			}
		}
		return '';
	}

	getProperty(item, prop) {
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
}

window.customElements.define(D2LEvaluationHubActivitiesList.is, D2LEvaluationHubActivitiesList);
