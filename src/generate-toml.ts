import {TomlWriter} from './toml-writer.js';
import {writeConfig} from './write-config.js';
import type {ProxmoxConfig} from './proxmox-config.js';

export const generateToml = (config: ProxmoxConfig): string => {
	const writer = new TomlWriter();
	writeConfig(config, writer);
	return writer.lines.join('\n');
};
