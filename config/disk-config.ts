import {type ProxmoxFilter} from './filter.js';

export type ProxmoxFilesystem = 'ext4' | 'xfs' | 'zfs' | 'btrfs';
export type ProxmoxDiskFilterMatch = 'any' | 'all';

export type DiskList = {
	diskList: string[];
};

export type DiskFilter = {
	filters: ProxmoxFilter[];
	filterMatch: ProxmoxDiskFilterMatch;
};

export type DiskSelect = DiskList | DiskFilter;

/**
Defines ZFS-specific properties. See [ZFS Advanced Options](https://pve.proxmox.com/pve-docs/chapter-pve-installation.html#advanced_zfs_options);
 */
type Zfs = {
	filesystem: 'zfs';

	zfs: {
		/** The RAID level that should be used. */
		raid: 'raid0' | 'raid1' | 'raid10' | 'raidz-1' | 'raidz-2' | 'raidz-3';
		/** Specifies the `ashift` property of the created zpool. */
		ashift?: number;
		/** =Specifies the maximum amount of memory in MiB ZFS may use for its ARC in. See also [Limit ZFS Memory Usage](https://pve.proxmox.com/pve-docs/pve-admin-guide.html#sysadmin_zfs_limit_memory_usage). */
		arcMax?: number;
		/** Specifies the checksumming algorithm. Options are `on` (default), `fletcher4` and `sha256`. */
		checksum?: 'on' | 'off' | 'fletcher4' | 'sha256';
		/** Specifies whether compression is enabled and if yes, what algorithm to use. Options are `on` (default), `off`, `lzjb`, `lz4`, `zle`, `gzip` and `zstd`. */
		compress?: 'on' | 'off' | 'lzjb' | 'lz4' | 'zle' | 'gzip' | 'zstd';
		/** Specifies the `copies` property of the created zpool. See [zfsprops.7](https://openzfs.github.io/openzfs-docs/man/master/7/zfsprops.7.html#copies). */
		copies?: number;
		/** Defines the total hard disk size to be used in GB. Only honored for bootable disks, that is only the first disk or mirror for RAID0, RAID1 or RAID10, and all disks in RAID-Z[123]. */
		hdsize?: number;
	};
};

/** Advanced properties that can be used with the `ext4` or `xfs` file system. See [LVM Advanced Options](https://pve.proxmox.com/pve-docs/chapter-pve-installation.html#advanced_lvm_options). */
type Lvm = {
	filesystem: 'ext4' | 'xfs';

	lvm?: {
		/** Specifies the total hard disk size to be used in GB. It can be used to reserve free space on the hard disk for further partitioning after the installation. */
		hdsize?: number;

		/** Specifies the size of the swap volume in GB. Default is the size of installed memory, clamped to between 4 GB and 8 GB. */
		swapsize?: number;

		/** Specifies the maximum size of the root volume in GB. Maximum is hdsize / 4. */
		maxroot?: number;

		/** Specifies the maximum size of the data volume in GB. */
		maxvz?: number;

		/** Specifies the amount of free space that should be left in the LVM volume group. */
		minfree?: number;
	};
};

/** Defines BTRFS specific options */
type Btrs = {
	filesystem: 'btrfs';

	btrfs: {
		raid: 'raid0' | 'raid1' | 'raid10';

		/** Specifies the total hard disk size to be used in GB. */
		hdsize?: number;

		/** The compression type to use. Defaults to `off`. See also the `btrfs(5) manpage` */
		compress?: 'on' | 'off' | 'zlib' | 'lzo' | 'zstd';
	};
};

export type ProxmoxDiskConfig =
    (DiskList & Btrs) | (DiskFilter & Btrs) |
    (DiskList & Lvm) | (DiskFilter & Lvm) |
    (DiskList & Zfs) | (DiskFilter & Zfs);
