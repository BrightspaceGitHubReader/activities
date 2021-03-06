function parseSortFromUrl(input) {
	const parsed = new window.URL(input, 'https://doesntmatter.org/');

	return parsed.searchParams.get('sort');
}

function encodeSortState(state) {
	return state
		.map(s => s.id + '-' + s.direction)
		.join(',');
}

function decodeSortState(serialized) {
	if (!serialized) {
		return [];
	}
	return serialized
		.split(',')
		.map(chunk => chunk.split('-'))
		.map(arr => {
			return { id: arr[0], direction: arr[1] };
		});
}

function addSort(sort, sortState) {
	const cleanSortState = sortState.filter(s => s.id !== sort.id);
	cleanSortState.unshift(sort);
	return cleanSortState;
}

function createSortEndpoint(sorts, collectionHref, sortsHref) {
	return (url) => {

		const serializedSortState = parseSortFromUrl(url);
		const sortState = decodeSortState(serializedSortState);

		const entities = sorts.map(sort => {
			const ascSortState = encodeSortState(addSort({ id: sort.id, direction: 'a' }, sortState));
			const descSortState = encodeSortState(addSort({ id: sort.id, direction: 'd' }, sortState));

			return formatSort(sort, sortsHref, ascSortState, descSortState, sortState);
		});

		return formatSorts(entities, collectionHref, encodeSortState(sortState));
	};
}

function formatSorts(sortEntities, collectionHref, sortState) {
	return {
		entities: sortEntities,
		actions: [
			{
				name: 'apply',
				href: collectionHref,
				fields: [
					{
						class: ['base64', 'json'],
						type: 'hidden',
						name: 'sort',
						value: sortState
					}
				]
			}
		]
	};
}

function formatSort(sort, sortsHref, ascState, descState, sortState) {
	const klass = sort.class;

	const response = {
		rel: ['https://api.brightspace.com/rels/sort'],
		class: ['sort', klass],
		actions: [
			{
				name: 'sort-ascending',
				href: sortsHref,
				fields: [
					{
						type: 'hidden',
						name: 'sort',
						value: ascState
					}
				]
			},
			{
				name: 'sort-descending',
				href: sortsHref,
				fields: [
					{
						type: 'hidden',
						name: 'sort',
						value: descState
					}
				]
			}
		]
	};

	const lastSort = sortState.length - 1;
	if (sortState[lastSort] && sortState[lastSort].id === sort.id) {
		response.properties = {
			applied: true,
			direction: sortState[lastSort].direction === 'd' ? 'descending' : 'ascending',
			priority: 0
		};
	}

	return response;
}

export { createSortEndpoint, parseSortFromUrl, encodeSortState, decodeSortState, addSort };
