/**
 Optional. It can be used to configure a script to run on the first boot of the new system after a successful installation.

 If configured, this installs an additional package named proxmox-first-boot. After booting the new system for the first time, this package can safely be removed using apt purge proxmox-first-boot.

 * */
export type ProxmoxFirstBootConfig = {
	ordering?: 'before-network' | 'network-online' | 'fully-up';
} & (
	{source: 'from-iso'}
	|
	{source: 'from-url'; url: string; certFingerprint?: string}
);
