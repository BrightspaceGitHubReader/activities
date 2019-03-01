import chunk from 'lodash-es/chunk';

function formatName(firstName, lastName) {
	return firstName + ' ' + lastName;
}

function parseUsers(data) {
	const names = data.map(row => formatName(row.firstName, row.lastName));
	const uniqueNames = [... new Set(names)];

	return uniqueNames;
}

function formatUser(name) {
	return {
		'entities':[
			{
				'rel':['https://api.brightspace.com/rels/display-name'],
				'properties':{
					'name': name
				}
			}
		]
	};
}

function getHrefForUserId(id) {
	return `users/${id}`;
}

function parseActivityNames(data) {
	const activityNames = data.map(row => row.activityName);
	const uniqueActivityNames = [... new Set(activityNames)];

	return uniqueActivityNames;
}

function formatActivityName(name) {
	return {
		'properties':{
			'name': name
		}
	};
}

function getHrefForActivityNameId(id) {
	return `activities/${id}`;
}

function parseCourses(data) {
	const courseNames = data.map(row => row.courseName);
	const uniqueCourseNames = [... new Set(courseNames)];

	return uniqueCourseNames;
}

function formatCourse(name, enrollmentHref) {
	return {
		'properties':{
			'name': name
		},
		'links': [
			{
				'rel': [
					'https://api.brightspace.com/rels/enrollments'
				],
				'href':enrollmentHref
			}
		]
	};
}

function getHrefForCourseId(id) {
	return `courses/${id}`;
}

function formatEnrollments(enrollments, filterHref) {
	return {
		'class': [
			'enrollments',
			'collection'
		],
		'entities': enrollments,
		'links': [
			{
				'rel': [
					'https://api.brightspace.com/rels/filters'
				],
				'href': filterHref
			}
		]
	};
}

function getHrefForEnrollments(id) {
	return `enrollments/${id}`;
}

function formatEnrollment(userEnrollmentLink) {
	return {
		'class': [
			'enrollment'
		],
		'rel': [
			'https://api.brightspace.com/rels/user-enrollment'
		],
		'href': userEnrollmentLink
	};
}

function getHrefForUserEnrollment(id) {
	return `user-enrollments/${id}`;
}

function formatUserEnrollment(userLink) {
	return {
		'links': [
			{
				'rel': [
					'https://api.brightspace.com/rels/user'
				],
				'href': userLink
			}
		]
	};
}

function getHrefForEnrollmentFilters(id) {
	return `enrollments/${id}/filters`;
}

function formatFilters(filters, applyHref) {
	return {
		'class': [
			'collection-filters'
		],
		'entities': filters,
		'actions': [
			{
				'href': applyHref,
				'name': 'apply',
				'fields': [
					{
						'class': [
							'base64',
							'json'
						],
						'type': 'hidden',
						'name': 'filter',
						'value': 'filterstate'
					}
				]
			}
		]
	};
}

function getHrefForFilter(enrollmentId, id) {
	return `enrollments/${enrollmentId}/filters/${id}`;
}

function formatFilter(title, filterOptions, klass, searchHref, applyHref, selfHref) {
	return {
		'class': [
			'collection',
			'filters',
			klass
		],
		'rel': ['https://api.brightspace.com/rels/filters'],
		'entities': filterOptions,
		'href': selfHref,
		'actions': [
			{
				'href': searchHref,
				'name': 'search',
				'fields': [
					{
						'type': 'search',
						'name': 'search'
					},
					{
						'class': [
							'base64',
							'json'
						],
						'type': 'hidden',
						'name': 'existingState'
					}
				]
			},
			{
				'href': applyHref,
				'name': 'apply',
				'fields': [
					{
						'class': [
							'base64',
							'json'
						],
						'type': 'hidden',
						'name': 'existingState'
					}
				]
			}
		],
		'title': title
	};
}

function formatFilterOption(title, active, toggleHref) {
	return {
		'class': [
			'filter',
			active ? 'on' : 'off'
		],
		'rel': [
			'item',
			'https://api.brightspace.com/rels/filter'
		],
		'title': title,
		'actions': [
			{
				'href': toggleHref,
				'name': active ? 'remove-filter' : 'add-filter',
				'method': 'GET',
				'fields': [
					{
						'type': 'hidden',
						'name': 'existingState',
						'value': 'filterstate'
					}
				]
			}
		]
	};
}

const classMapping = {
	assignment: 'user-assignment-activity',
	quiz: 'user-quiz-attempt-activity',
	discussion: 'user-discussion-activity'
};

const relMapping = {
	assignment: 'https://api.brightspace.com/rels/assignment',
	quiz: 'https://api.brightspace.com/rels/quiz',
	discussion: 'https://discussions.api.brightspace.com/rels/topic'
};

function parseActivities(data, users, activityNames, courses) {
	const parsedActivities = data.map(row => {
		return {
			klass: classMapping[row.activityType],
			userHref: getHrefForUserId(users.indexOf(formatName(row.firstName, row.lastName))),
			courseHref: getHrefForCourseId(courses.indexOf(row.courseName)),
			activityRel: relMapping[row.activityType],
			activityHref: getHrefForActivityNameId(activityNames.indexOf(row.activityName)),
			submissionDate: row.submissionDate
		};
	});

	return parsedActivities;
}

function formatActivity(activity) {
	return {
		'class': [
			activity.klass,
			'activity'
		],
		'rel': [
			'https://activities.api.brightspace.com/rels/user-activity-usage'
		],
		'links': [
			{
				'rel': [
					'https://api.brightspace.com/rels/user'
				],
				'href': activity.userHref
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': activity.courseHref
			},
			{
				'rel': [
					activity.activityRel
				],
				'href': activity.activityHref
			}
		],
		'entities': [
			{
				'class': [
					'relative-uri'
				],
				'rel': [
					'item',
				],
				'properties': {
					'path': '/this/is/not/used'
				}
			},
			{
				'class': [
					'completion',
					'complete'
				],
				'rel': [
					'item'
				],
				'entities': [
					{
						'class': [
							'date',
							'completion-date'
						],
						'rel': [
							'https://api.brightspace.com/rels/date'
						],
						'properties': {
							'date': activity.submissionDate
						}
					}
				]
			}
		]
	};
}

function formatPage(entities, filterLocation, sortsLocation, nextLocation) {
	const entity = {
		'links': [
			{
				'rel': [
					'https://api.brightspace.com/rels/filters'
				],
				'href': filterLocation
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/sorts'
				],
				'href': sortsLocation
			},

		],
		'entities': entities
	};

	if (nextLocation) {
		entity.links.push({
			'rel': [
				'next'
			],
			'href': nextLocation
		});
	}

	return entity;
}

function getHrefForPageId(id) {
	return `pages/${id}`;
}

function getHrefForNextPage(currentId, pages) {
	if (currentId + 1 < pages) {
		return getHrefForPageId(currentId + 1);
	}
}

function getHrefForMasterTeacher(id) {
	return `masterTeacher/${id}`;
}

/*
* `parseX` functions operate on data directly from the table
* `formatX` functions return siren representations of X
* `getHrefForX` functions generate a url for X
*
* `mappings` (which is the return value) maps urls to siren endpoints to be consumed by the interceptor
*/
function getMappings(data) {
	const users = parseUsers(data);
	const activityNames = parseActivityNames(data);
	const courses = parseCourses(data);
	const activities = parseActivities(data, users, activityNames, courses);

	const mappings = {};
	users.forEach((user, i) => {
		mappings[getHrefForUserId(i)] = formatUser(user);
	});
	const teachersByCourse = {};
	data.forEach(row => {
		teachersByCourse[row.courseName] = formatName(row.masterTeacher.firstName, row.masterTeacher.lastName);
	});
	activityNames.forEach((activityName, i) => {
		mappings[getHrefForActivityNameId(i)] = formatActivityName(activityName);
	});
	courses.forEach((course, i) => {
		const filters = [
			{ title: 'Role Markers', klass: 'role-markers', options: ['Primary Facilitator'] }
		];
		const formattedFilters = filters
			.map((filter, filterId) => {
				filter.options = filter.options.map(name => formatFilterOption(name, false, getHrefForFilter(i, filterId)));
				return filter;
			})
			.map((filter, filterId) => {
				const formattedFilter = formatFilter(filter.title, filter.options, filter.klass, getHrefForFilter(i, filterId), getHrefForEnrollmentFilters(i), getHrefForFilter(i, filterId));
				mappings[getHrefForFilter(i, filterId)] = formattedFilter;
				return formattedFilter;
			});
		mappings[getHrefForEnrollmentFilters(i)] = formatFilters(formattedFilters, getHrefForEnrollments(i));
		mappings[getHrefForMasterTeacher(i)] = formatUser(teachersByCourse[course]);
		mappings[getHrefForEnrollments(i)] = formatEnrollments([ formatEnrollment(getHrefForUserEnrollment(i)) ], getHrefForEnrollmentFilters(i));
		mappings[getHrefForUserEnrollment(i)] = formatUserEnrollment(getHrefForMasterTeacher(i));
		mappings[getHrefForCourseId(i)] = formatCourse(course, getHrefForEnrollments(i));
	});

	const pagedActivities = chunk(activities.map(a => formatActivity(a)), 3);
	const pages = pagedActivities.length;

	pagedActivities.forEach((page, i) => {
		mappings[getHrefForPageId(i)] = formatPage(page, 'filters/', 'sorts/', getHrefForNextPage(i, pages));
	});

	return mappings;
}

export default getMappings;