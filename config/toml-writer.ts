import {type SectionWriter, type ConfigWriter} from './write-config.js';

const kv = (key: string, value: any): string =>
	`${key} = ${JSON.stringify(value)}`;

class TomlSectionWriter implements SectionWriter {
	private readonly prefix: string;

	constructor(private readonly parent: TomlWriter, prefix?: string) {
		this.prefix = prefix ? `${prefix}.` : '';
	}

	writeDone(): TomlWriter {
		this.parent.lines.push('');
		return this.parent;
	}

	writeFilter(name: string, value: string): this {
		return this.push(kv(`filter.${name}`, value));
	}

	writeList(key: string, values: Array<string | number>): this {
		return this.push(kv(key, values));
	}

	writeOptional(key: string, value: string | number | false | true | undefined): this {
		if (value === undefined) {
			return this;
		}

		return this.push(kv(key, value));
	}

	subsection(sectionName: string): SectionWriter {
		return new TomlSectionWriter(this.parent, `${this.prefix}${sectionName}`);
	}

	writeOptionalList(key: string, values: Array<string | number> | undefined): this {
		if (values === undefined) {
			return this;
		}

		return this.push(kv(key, values));
	}

	writeValue(key: string, value: string | number | false | true): this {
		return this.push(kv(key, value));
	}

	private push(line: string): this {
		this.parent.lines.push(`${this.prefix}${line}`);
		return this;
	}
}

export class TomlWriter implements ConfigWriter {
	lines: string[] = [];

	section(sectionName: string): SectionWriter {
		this.lines.push(`[${sectionName}]`);
		return new TomlSectionWriter(this);
	}

	toString(): string {
		return this.lines.join('\n');
	}
}
