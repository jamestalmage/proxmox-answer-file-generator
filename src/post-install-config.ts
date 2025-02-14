/**
Optional. It can be used to configure a webhook to be called after a successful installation. See [Post-installation notification](https://pve.proxmox.com/wiki/Automated_Installation#Post-installation_notification) for more information.
 */
export type ProxmoxPostInstallConfig = {
	/** The URL the information about the installed system should be sent to as HTTP POST request. */
	url: string;
	/** SHA256 certificate fingerprint if certificate pinning should be used. */
	certFingerprint?: string;
};
