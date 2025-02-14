import type {ProxmoxGlobalConfig} from './global-config.js';
import type {ProxmoxNetworkConfig} from './network-confg.js';
import type {ProxmoxDiskConfig} from './disk-config.js';
import type {ProxmoxFirstBootConfig} from './first-boot-config.js';
import type {ProxmoxPostInstallConfig} from './post-install-config.js';

export type ProxmoxConfig = {
	global: ProxmoxGlobalConfig;
	network: ProxmoxNetworkConfig;
	diskSetup: ProxmoxDiskConfig;
	firstBoot?: ProxmoxFirstBootConfig;
	postInstall?: ProxmoxPostInstallConfig;
};
