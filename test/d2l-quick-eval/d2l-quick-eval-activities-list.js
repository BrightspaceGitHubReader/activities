import '@polymer/iron-test-helpers/mock-interactions.js';

(function() {
	var list;

	async function loadPromise(url) {
		var entity = await window.D2L.Siren.EntityStore.fetch(url, '');
		await list._loadData(entity.entity);
	}

	function createExpectedData(expectedData, includeMasterTeacher) {
		var expectedActivities = [];

		expectedData.forEach(function(item) {
			var expectedActivity = {
				isDraft: item.isDraft
			};

			var activityColumns = [];

			activityColumns.push({ text: item.displayName.defaultDisplayName, href: item.activityLink });
			activityColumns.push({ href: item.activityNameHref });
			activityColumns.push({ text: item.courseName });
			activityColumns.push({ text: item.submissionDate });

			if (includeMasterTeacher) {
				activityColumns.push({ text: item.masterTeacher });
			}

			expectedActivity.data = activityColumns;

			expectedActivities.push(expectedActivity);
		});

		return expectedActivities;
	}

	function createExpectedDataWithMasterTeacher(expectedArray) {
		return createExpectedData(expectedArray, true);
	}

	function verifyData(expectedActivities, done) {
		var data = list.shadowRoot.querySelectorAll('d2l-td');

		var expectedActivityData = [].concat.apply(
			[], expectedActivities.map(function(expectedActivity) {
				return expectedActivity.data;
			}));

		for (var i = 0; i < expectedActivityData.length; i++) {
			const link = data[i].querySelector('d2l-link');
			const span = data[i].querySelector('span');
			const activityName = data[i].querySelector('d2l-activity-name');

			if (link) {
				assert.equal(expectedActivityData[i].text, link.innerHTML);
				assert.equal(expectedActivityData[i].href, link.href);
			} else if (span) {
				assert.equal(expectedActivityData[i].text, span.innerHTML);
			} else if (activityName) {
				assert.equal(expectedActivityData[i].href, activityName.href);
			}
		}

		done();
	}

	var expectedData = [
		{
			displayName: { firstName: 'Special User', lastName: 'Name', defaultDisplayName: 'Special User Name' },
			userHref: 'data/userUnique.json',
			courseName: 'Org Name',
			activityNameHref: 'data/assignmentActivity.json',
			submissionDate: '3/9/2019 10:16 AM',
			activityLink: '/the/best/vanity/url/3?filter=96W3siU29ydCI6eyJJ&sort=Y3Rpb24iOjB9',
			masterTeacher: '',
			isDraft: true
		},
		{
			displayName: { firstName: 'User', lastName: 'Name', defaultDisplayName: 'User Name' },
			userHref: 'data/user.json',
			courseName: 'Org Name',
			activityNameHref: 'data/quizAttemptActivity.json',
			submissionDate: '3/9/2019 10:16 AM',
			activityLink: '/the/best/vanity/url/2?filter=96W3siU29ydCI6eyJJ&sort=Y3Rpb24iOjB9',
			masterTeacher: '',
			isDraft: false
		},
		{
			displayName: { firstName: 'User', lastName: 'Name', defaultDisplayName: 'User Name' },
			userHref: 'data/user.json',
			courseName: 'Org Name',
			activityNameHref: 'data/topicActivity.json',
			submissionDate: '3/9/2019 10:16 AM',
			activityLink: '/the/best/vanity/url?ou=11111&filter=96W3siU29ydCI6eyJJ&sort=Y3Rpb24iOjB9',
			masterTeacher: '',
			isDraft: false
		}
	];

	var expectedDataWithMasterTeacher = expectedData.map(function(x) {
		var updatedExpectedData = {};

		Object.keys(x).forEach(function(key) {
			updatedExpectedData[ key ] = x[ key ];
		});

		updatedExpectedData.masterTeacher = 'Master Teacher';
		return updatedExpectedData;
	});

	var expectedNextData = [
		{
			displayName: { firstName: 'User', lastName: 'Name', defaultDisplayName: 'User Name' },
			userHref: 'data/user.json',
			courseName: 'Org Name',
			activityNameHref: 'data/nextAssignmentActivity.json',
			submissionDate: '3/9/2019 10:16 AM',
			activityLink: '/the/best/vanity/url/next1?ou=11111&sort=Y3Rpb24iOjB9',
			masterTeacher: 'Master Teacher',
			isDraft: true
		},
		{
			displayName: { firstName: 'User', lastName: 'Name', defaultDisplayName: 'User Name' },
			userHref: 'data/user.json',
			courseName: 'Org Name',
			activityNameHref: 'data/nextQuizAttemptActivity.json',
			submissionDate: '3/9/2019 10:16 AM',
			activityLink: '/the/best/vanity/url/next2?sort=Y3Rpb24iOjB9',
			masterTeacher: 'Master Teacher',
			isDraft: false
		},
		{
			displayName: { firstName: 'User', lastName: 'Name', defaultDisplayName: 'User Name' },
			userHref: 'data/user.json',
			courseName: 'Org Name',
			activityNameHref: 'data/nextTopicActivity.json',
			submissionDate: '3/9/2019 10:16 AM',
			activityLink: '/the/best/vanity/url/next3?sort=Y3Rpb24iOjB9',
			masterTeacher: 'Master Teacher',
			isDraft: false
		}
	];
	var expectedColumnHeaders = [
		['First Name', 'Last Name'],
		['Activity Name'],
		['Course'],
		['Submission Date']
	];
	var expectedColumnHeadersWithMasterTeacher = expectedColumnHeaders.concat([['Teacher']]);

	suite('d2l-quick-eval-activities-list', function() {
		setup(function() {
			list = fixture('basic');
		});
		test('instantiating the element works', function() {
			assert.equal(list.tagName.toLowerCase(), 'd2l-quick-eval-activities-list');
		});
		test('_numberOfActivitiesToShow starts with default value of 20', function() {
			assert.equal(20, list._numberOfActivitiesToShow);
		});
		test('attributes are set correctly', function() {
			assert.equal(list.href, 'blah');
			assert.equal(list.token, 't');
		});
		test('no alert displayed when healthy', function() {
			const alert = list.shadowRoot.querySelector('#list-alert');
			assert.equal(true, alert.hasAttribute('hidden'));
		});
		test('when _updateNumberOfActivitiesToShow updated, event "d2l-quick-eval-activities-list-activities-shown-number-updated" fires', function(done) {
			const expectedNumberOfActivitiesToShow = 50;

			list.addEventListener('d2l-quick-eval-activities-list-activities-shown-number-updated', function(e) {
				assert.equal(expectedNumberOfActivitiesToShow, e.detail.count);
				done();
			});

			list._numberOfActivitiesToShow = expectedNumberOfActivitiesToShow;
		});
		test('when data size increased, _numberOfActivitiesToShow matches size and event is triggered', function(done) {
			const expectedNumberOfActivitiesToShow = 100;
			const fakeData = new Array(expectedNumberOfActivitiesToShow);

			list.addEventListener('d2l-quick-eval-activities-list-activities-shown-number-updated', function(e) {
				assert.equal(expectedNumberOfActivitiesToShow, list._numberOfActivitiesToShow);
				assert.equal(expectedNumberOfActivitiesToShow, e.detail.count);
				list._data = [];
				done();
			});

			list._data = fakeData;
		});
		test('_fullListLoading and _loading are set to true before data is loaded, and loading-skeleton is present', () => {
			var loadingskeleton = list.shadowRoot.querySelector('d2l-quick-eval-skeleton');
			assert.equal(loadingskeleton.hidden, false);
			assert.equal(list._fullListLoading, true);
			assert.equal(list._loading, true);
		});
		test.skip('_fullListLoading and _loading is set to false after data is loaded and the loading skeleton is hidden', (done) => {
			var loadingskeleton = list.shadowRoot.querySelector('d2l-quick-eval-skeleton');

			loadPromise('data/unassessedActivities.json').then(function() {
				assert.equal(loadingskeleton.hidden, true);
				assert.equal(list._fullListLoading, false);
				assert.equal(list._loading, false);
				done();
			});
		});
		test.skip('setLoadingState lets consumers control the table loading', (done) => {
			var loadingskeleton = list.shadowRoot.querySelector('d2l-quick-eval-skeleton');

			loadPromise('data/unassessedActivities.json').then(function() {
				assert.equal(loadingskeleton.hidden, true);
				assert.equal(list._fullListLoading, false);
				assert.equal(list._loading, false);

				list.setLoadingState(true);
				requestAnimationFrame(function() {
					assert.equal(loadingskeleton.hidden, false);
					assert.equal(list._fullListLoading, true);
					assert.equal(list._loading, true);
					done();
				});
			});
		});
		test.skip('if _loading is true, the Load More button is hidden', (done) => {
			loadPromise('data/unassessedActivities.json').then(function() {
				var loadMore = list.shadowRoot.querySelector('.d2l-quick-eval-activities-list-load-more-container');
				assert.notEqual(loadMore.style.display, 'none');
				list._loading = true;
				requestAnimationFrame(function() {
					assert.equal(loadMore.style.display, 'none');
					done();
				});
			});
		});
		test('if _loading is true, d2l-quick-eval-no-submissions-image and d2l-quick-eval-no-submissions-image are not shown', () => {
			var noSubmissionComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
			var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
			assert.equal(noSubmissionComponent, null);
			assert.equal(noCriteriaResultsComponent, null);
			assert.equal(list._loading, true);
		});
		test.skip('if there is no data in the list, d2l-quick-eval-no-submissions-image is shown', (done) => {
			loadPromise('data/emptyUnassessedActivities.json').then(function() {
				var noSubmissionComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
				assert.notEqual(noSubmissionComponent.style.display, 'none');
				var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
				assert.equal(noCriteriaResultsComponent, null);
				//This is here because of how dom-if works, we need to load activities once to ensure we actually
				//render the d2l-quick-eval-no-submissions component and instantly hide it.
				loadPromise('data/unassessedActivities.json').then(function() {
					var noSubmissionComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
					assert.equal(noSubmissionComponent.style.display, 'none');
					done();
				});
			});
		});
		test.skip('if there is no data in the list and filters have been applied, d2l-quick-eval-no-criteria-results-image is shown', (done) => {
			list.setAttribute('filter-applied', '');

			loadPromise('data/emptyUnassessedActivities.json').then(function() {
				var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
				assert.notEqual(noCriteriaResultsComponent.style.display, 'none');
				var noSubmissionComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
				assert.equal(noSubmissionComponent, null);
				//This is here because of how dom-if works, we need to load activities once to ensure we actually
				//render the d2l-quick-eval-no-criteria-results component and instantly hide it.
				loadPromise('data/unassessedActivities.json').then(function() {
					var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
					assert.equal(noCriteriaResultsComponent.style.display, 'none');
					done();
				});
			});
		});
		test.skip('if there is no data in the list and search has been applied, d2l-quick-eval-no-criteria-results-image is shown', (done) => {
			list.setAttribute('search-applied', '');

			loadPromise('data/emptyUnassessedActivities.json').then(function() {
				var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
				assert.notEqual(noCriteriaResultsComponent.style.display, 'none');
				var noSubmissionComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
				assert.equal(noSubmissionComponent, null);
				//This is here because of how dom-if works, we need to load activities once to ensure we actually
				//render the d2l-quick-eval-no-criteria-results component and instantly hide it.
				loadPromise('data/unassessedActivities.json').then(function() {
					var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
					assert.equal(noCriteriaResultsComponent.style.display, 'none');
					done();
				});
			});
		});
		test.skip('if there is no data in the list and filters and search have been applied, d2l-quick-eval-no-criteria-results-image is shown', (done) => {
			list.setAttribute('filter-applied', '');
			list.setAttribute('search-applied', '');

			loadPromise('data/emptyUnassessedActivities.json').then(function() {
				var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
				assert.notEqual(noCriteriaResultsComponent.style.display, 'none');
				var noSubmissionComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-submissions');
				assert.equal(noSubmissionComponent, null);
				//This is here because of how dom-if works, we need to load activities once to ensure we actually
				//render the d2l-quick-eval-no-criteria-results component and instantly hide it.
				loadPromise('data/unassessedActivities.json').then(function() {
					var noCriteriaResultsComponent = list.shadowRoot.querySelector('.d2l-quick-eval-no-criteria-results');
					assert.equal(noCriteriaResultsComponent.style.display, 'none');
					done();
				});
			});
		});
		test('headers display correctly', function(done) {
			flush(function() {
				var headers = list.shadowRoot.querySelectorAll('d2l-th');

				assert.equal(expectedColumnHeaders.length, headers.length);

				for (var i = 0; i < expectedColumnHeaders.length; i++) {
					expectedColumnHeaders[i].forEach(function(expectedHeader) {
						assert.include(headers[i].innerHTML, expectedHeader);
					});
				}
				done();
			});
		});
		test('headers include master teacher when toggled on, and is display correctly', function(done) {
			list.setAttribute('master-teacher', '');

			flush(function() {

				var headers = list.shadowRoot.querySelectorAll('d2l-th');
				assert.equal(expectedColumnHeadersWithMasterTeacher.length, headers.length);

				for (var i = 0; i < expectedColumnHeadersWithMasterTeacher.length; i++) {
					expectedColumnHeadersWithMasterTeacher[i].forEach(function(expectedHeader) {
						assert.include(headers[i].innerHTML, expectedHeader);
					});
				}
				done();
			});
		});
		test.skip('data is imported correctly', (done) => {
			loadPromise('data/unassessedActivities.json').then(function() {
				assert.equal(list._data.length, expectedData.length);
				assert.deepEqual(list._data, expectedData);
				done();
			});
		});
		test.skip('data is imported correctly when master teacher toggled on', (done) => {
			list.setAttribute('master-teacher', '');

			flush(function() {
				loadPromise('data/unassessedActivities.json').then(function() {
					assert.equal(list._data.length, expectedDataWithMasterTeacher.length);
					assert.deepEqual(list._data, expectedDataWithMasterTeacher);
					done();
				});
			});
		});
		test.skip('data displays correctly', (done) => {
			var expected = createExpectedData(expectedData);

			loadPromise('data/unassessedActivities.json').then(function() {
				flush(function() {
					verifyData(expected, done);
				});
			});
		});
		test.skip('data displays correctly when master teacher toggled on', (done) => {
			var expected = createExpectedDataWithMasterTeacher(expectedDataWithMasterTeacher);

			list.setAttribute('master-teacher', '');
			flush(function() {
				loadPromise('data/unassessedActivities.json').then(function() {
					verifyData(expected, done);
				});
			});
		});
		test.skip('the Load More button appears when there is a next link', (done) => {
			loadPromise('data/unassessedActivities.json').then(function() {
				var loadMore = list.shadowRoot.querySelector('.d2l-quick-eval-activities-list-load-more');
				assert.equal(loadMore.tagName.toLowerCase(), 'd2l-button');
				assert.notEqual(loadMore.style.display, 'none');
				assert.notEqual(loadMore.disabled, 'true');
				done();
			});
		});
		test.skip('clicking Load More adds the proper data, and the button is hidden when there is no more next link', (done) => {
			var expectedNext = createExpectedData(expectedData.concat(expectedNextData));

			loadPromise('data/unassessedActivities.json').then(function() {
				var loadMore = list.shadowRoot.querySelector('.d2l-quick-eval-activities-list-load-more');
				var loadMoreContainer = list.shadowRoot.querySelector('.d2l-quick-eval-activities-list-load-more-container');
				var verify = function() {
					if (!list._loading && loadMoreContainer.style.display === 'none') {
						verifyData(expectedNext, done);
					} else {
						window.setTimeout(function() {
							verify();
						}, 30);
					}
				};
				loadMore.addEventListener('click', verify);
				MockInteractions.tap(loadMore);
			});
		});
		test('when handling load more failure, alert should pop up and alert should hide when alerts cleared', (done) => {
			list._handleLoadMoreFailure();

			flush(function() {
				var alert = list.shadowRoot.querySelector('#list-alert');
				assert.equal(false, alert.hasAttribute('hidden'));

				list._clearAlerts();
				flush(function() {
					assert.equal(true, alert.hasAttribute('hidden'));
					done();
				});

			});
		});
		test('when handling initial load failure, alert should pop up and alert should hide when alerts cleared', (done) => {
			list._handleFullLoadFailure();

			flush(function() {
				var alert = list.shadowRoot.querySelector('#list-alert');
				assert.equal(false, alert.hasAttribute('hidden'));

				list._clearAlerts();
				flush(function() {
					assert.equal(true, alert.hasAttribute('hidden'));
					done();
				});

			});
		});
		test('_getWidthCssClass returns correct value when passed column key (with master teacher off)', () => {
			const validColumnKeys = ['displayName', 'activityName', 'courseName', 'submissionDate'];
			const expectedCssClasses = ['d2l-quick-eval-30-column', 'd2l-quick-eval-25-column', 'd2l-quick-eval-25-column', 'd2l-quick-eval-20-column'];

			const actualCssClasses = validColumnKeys.map(list._getWidthCssClass.bind(list));
			assert.deepEqual(expectedCssClasses, actualCssClasses);
		});
		test('_getWidthCssClass returns correct value when passed column key (with master teacher on)', () => {
			const validColumnKeys = ['displayName', 'activityName', 'courseName', 'submissionDate', 'masterTeacher'];
			const expectedCssClasses = ['d2l-quick-eval-25-column', 'd2l-quick-eval-20-column', 'd2l-quick-eval-20-column', 'd2l-quick-eval-15-column', 'd2l-quick-eval-20-column'];

			list.masterTeacher = true;

			const actualCssClasses = validColumnKeys.map(list._getWidthCssClass.bind(list));
			assert.deepEqual(expectedCssClasses, actualCssClasses);
		});
		suite('_getWidthCssClass throws an error when passed an invalid column key', () => {
			[
				{
					name: 'master teacher on', masterTeacher: true
				},
				{
					name: 'master teacher off', masterTeacher: false
				}
			].forEach((testCase) => {
				test(testCase.name, () => {
					list.masterTeacher = testCase.masterTeacher;
					assert.throws(() => list._getWidthCssClass('notARealColumnKey'), 'Invalid column key: notARealColumnKey');
				});
			});
		});
		test('_formatDisplayName return firstName when firstName defined and lastName undefined', () => {
			const expectedDisplayName = 'firstName';
			const displayName = list._formatDisplayName(
				{
					displayName: {
						firstName: expectedDisplayName,
						lastName: '',
						defaultDisplayName: ''
					}
				}
			);
			assert.equal(expectedDisplayName, displayName);
		});

		test('_formatDisplayName return lastName when firstName undefined and lastName defined', () => {
			const expectedDisplayName = 'lastName';
			const displayName = list._formatDisplayName(
				{
					displayName: {
						firstName: '',
						lastName: expectedDisplayName,
						defaultDisplayName: ''
					}
				}
			);
			assert.equal(expectedDisplayName, displayName);
		});

		test('_formatDisplayName return firstName and lastName when firstName defined and lastName defined and order is firstNameLastName', () => {
			const firstThenLast = true;
			const displayName = list._formatDisplayName(
				{
					displayName: {
						firstName: 'firstName',
						lastName: 'lastName',
						defaultDisplayName: ''
					}
				},
				firstThenLast
			);
			assert.equal('firstName lastName', displayName);
		});

		test('_formatDisplayName return firstName and lastName when firstName defined and lastName defined and order is lastNameFirstName', () => {
			const firstThenLast = true;
			const displayName = list._formatDisplayName(
				{
					displayName: {
						firstName: 'firstName',
						lastName: 'lastName',
						defaultDisplayName: ''
					}
				},
				!firstThenLast
			);
			assert.equal('lastName, firstName', displayName);
		});

		test('_formatDisplayName return displayName when firstName undefined and lastName undefined', () => {
			const expectedDisplayName = 'displayName';
			const displayName = list._formatDisplayName(
				{
					displayName: {
						firstName: '',
						lastName: '',
						defaultDisplayName: expectedDisplayName
					}
				}
			);
			assert.equal(expectedDisplayName, displayName);
		});

		test('firstName begins before lastName, clicking lastName puts it before firstName and clicking firstName puts it before lastName', (done) => {

			var nameHeaders = list._headerColumns[0].headers;
			assert.equal('firstName', nameHeaders[0].key);

			list._headerColumns[0].headers[0].canSort = true;
			list._headerColumns[0].headers[1].canSort = true;

			flush(function() {
				var lastNameHeader = list.shadowRoot.querySelector('#lastName');

				var verifyFirstNameNameFirst = function() {
					assert.equal('firstName', nameHeaders[0].key);
					assert.equal(',', nameHeaders[0].suffix);
					assert.equal('', nameHeaders[1].suffix);

					done();
				};

				var verifyLastNameFirst = function() {
					assert.equal('lastName', nameHeaders[0].key);
					assert.equal(',', nameHeaders[0].suffix);
					assert.equal('', nameHeaders[1].suffix);

					lastNameHeader.removeEventListener('click', verifyLastNameFirst);

					var firstNameHeader = list.shadowRoot.querySelector('#firstName');
					firstNameHeader.addEventListener('click', verifyFirstNameNameFirst);

					MockInteractions.tap(firstNameHeader);
				};

				lastNameHeader.addEventListener('click', verifyLastNameFirst);
				MockInteractions.tap(lastNameHeader);

			});
		});

		test('_computeNumberOfActivitiesToShow returns max of data length, and previously shown number of activities', function() {
			const numberOfActivitiesToShowWhenDataLarger = list._computeNumberOfActivitiesToShow([1, 2, 3, 4], 1);
			assert.equal(4, numberOfActivitiesToShowWhenDataLarger);

			const numberOfActivitiesToShowWhenPreviousLarger = list._computeNumberOfActivitiesToShow([1], 5);
			assert.equal(5, numberOfActivitiesToShowWhenPreviousLarger);
		});

		test.skip('_loadData sets _pageNextHref to empty string when no entities present on entity', function() {
			const entityWithoutEntities = { };
			list._pageNextHref = 'notAnEmptyString';

			list._loadData(entityWithoutEntities);
			assert.equal('', list._pageNextHref);
		});
	});
})();
