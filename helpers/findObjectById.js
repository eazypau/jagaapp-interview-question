export function findObjectById(id, obj) {
	if (obj.id === id) {
		return obj;
	} else if (obj.items) {
		for (let i = 0; i < obj.items.length; i++) {
			const foundObj = findObjectById(id, obj.items[i]);
			if (foundObj) {
				return foundObj;
			}
		}
	}
	return null;
}
