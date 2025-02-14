type RecursiveMap = {
	endpoint: boolean;
	children: Map<string, RecursiveMap>;
};

const createMap = (): RecursiveMap => ({
	endpoint: false,
	children: new Map<string, RecursiveMap>(),
});

const dictionary = createMap();

for (const zone of Intl.supportedValuesOf('timeZone')) {
	let current = dictionary;
	for (const layer of zone.split('/')) {
		let next = current.children.get(layer);
		if (!next) {
			next = createMap();
			current.children.set(layer, next);
		}

		current = next;
	}

	current.endpoint = true;
}

const processLayer = ([key, layer]: [string, RecursiveMap], indent: string): string => {
	if (layer.children.size > 0) {
		const withChildren = `\`${key}/\${${Array.from(layer.children).map(l => processLayer(l, `${indent}  `)).join(' | ')}}\``;
		if (layer.endpoint) {
			return `\n${indent}'${key}' | ${withChildren}`;
		}

		return `\n${indent}${withChildren}`;
	}

	return `'${key}'`;
};

const timezones = Array.from(dictionary.children).map(l => processLayer(l, '')).join(' | ');

console.log(`export type timezones = ${timezones};`);
