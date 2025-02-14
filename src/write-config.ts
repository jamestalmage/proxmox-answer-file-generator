import {type ProxmoxConfig} from './proxmox-config.js';

export type ConfigWriter = {
	section(sectionName: string): SectionWriter;
};

export type SectionWriter = {
	writeValue(key: string, value: string | number | boolean): SectionWriter;
	writeOptional(key: string, value: string | number | boolean | undefined): SectionWriter;
	writeOptionalList(key: string, values: undefined | Array<string | number>): SectionWriter;
	writeList(key: string, values: Array<string | number>): SectionWriter;
	writeFilter(name: string, value: string): SectionWriter;
	writeDone(): ConfigWriter;
	subsection(sectionName: string): SectionWriter;
};

export const writeConfig = (config: ProxmoxConfig, writer: ConfigWriter): void => {
	const {global, network, diskSetup, postInstall, firstBoot} = config;

	const globalSection: SectionWriter = writer.section('global');
	globalSection
		.writeValue('keyboard', global.keyboard)
		.writeValue('country', global.country)
		.writeValue('fqdn', global.fqdn)
		.writeValue('mailto', global.mailto)
		.writeValue('timezone', global.timezone)
		.writeOptionalList('root_ssh_keys', global.rootSshKeys)
		.writeOptional('reboot_on_error', global.rebootOnError);

	if ('rootPassword' in global) {
		globalSection.writeValue('root_password', global.rootPassword);
	} else {
		globalSection.writeValue('root_password_hashed', global.rootPasswordHashed);
	}

	globalSection.writeDone();

	const networkSection: SectionWriter = writer.section('network');
	networkSection.writeValue('source', network.source);
	if (network.source === 'from-answer') {
		networkSection
			.writeValue('cidr', network.cidr)
			.writeValue('gateway', network.gateway)
			.writeValue('dns', network.dns)
			.writeFilter(network.filter.name, network.filter.value);
	}

	networkSection.writeDone();

	const diskSection: SectionWriter = writer.section('disk-setup');
	diskSection.writeValue('filesystem', diskSetup.filesystem);

	if ('diskList' in diskSetup) {
		diskSection.writeList('disk_list', diskSetup.diskList);
	} else {
		for (const filter of diskSetup.filters) {
			diskSection.writeFilter(filter.name, filter.value);
		}

		diskSection.writeValue('filter_match', diskSetup.filterMatch);
	}

	switch (diskSetup.filesystem) {
		case 'zfs': {
			const zfs = diskSetup.zfs;
			diskSection.subsection('zfs')
				.writeValue('raid', diskSetup.zfs.raid)
				.writeOptional('ashift', zfs.ashift)
				.writeOptional('arc_max', zfs.arcMax)
				.writeOptional('checksum', zfs.checksum)
				.writeOptional('compress', zfs.compress)
				.writeOptional('copies', zfs.copies)
				.writeOptional('hdsize', zfs.hdsize)
				.writeDone();

			break;
		}

		case 'ext4':
		case 'xfs': {
			const lvm = diskSetup.lvm;
			if (lvm) {
				diskSection.subsection('lvm')
					.writeOptional('hdsize', lvm.hdsize)
					.writeOptional('swapsize', lvm.swapsize)
					.writeOptional('maxroot', lvm.maxroot)
					.writeOptional('maxvz', lvm.maxvz)
					.writeOptional('minfree', lvm.minfree)
					.writeDone();
			}

			break;
		}

		case 'btrfs': {
			const btrfs = diskSetup.btrfs;
			diskSection.subsection('btrfs')
				.writeValue('raid', btrfs.raid)
				.writeOptional('hdsize', btrfs.hdsize)
				.writeOptional('compress', btrfs.compress)
				.writeDone();

			break;
		}
	}

	diskSection.writeDone();

	if (typeof postInstall === 'object') {
		writer.section('post-installation-webhook')
			.writeValue('url', postInstall.url)
			.writeOptional('cert_fingerprint', postInstall.certFingerprint)
			.writeDone();
	}

	if (typeof firstBoot === 'object') {
		const firstBootSection: SectionWriter = writer.section('first-boot')
			.writeValue('source', firstBoot.source)
			.writeOptional('ordering', firstBoot.ordering);
		if (firstBoot.source === 'from-url') {
			firstBootSection
				.writeValue('url', firstBoot.url)
				.writeOptional('cert-fingerprint', firstBoot.certFingerprint);
		}

		firstBootSection.writeDone();
	}
};
