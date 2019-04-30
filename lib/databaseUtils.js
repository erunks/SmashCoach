'use_strict';

export function _getTime() {
	return new Date()
		.toJSON()
		.split(/[A-Z.]/)
		.slice(0, 2)
		.join(' ')
		.trim();
}

export function _toJSONObject(object) {
	if (object.length <= 1) {
		let jsonString = JSON.stringify(object);
		jsonString = jsonString.substring(1, jsonString.length - 1);
		return JSON.parse(jsonString);
	} else {
		return object;
	}
}

export async function _query(
	_knexConnection,
	params = {
		select: '',
		from: '',
		where: {},
		returnFunction: (res) => _toJSONObject(res),
	}
) {
	return await _knexConnection
		.select(params.select)
		.from(params.from)
		.where(params.where)
		.then((results) => {
			return params.returnFunction(results);
		})
		.catch((error) => {
			throw error;
		});
}