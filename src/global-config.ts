import type {Keyboard} from './keyboard.js';
import {type CountryCode} from './country-codes.js';
import {type TimeZoneCode} from './time-zones.js';

type PartialGlobalConfig = {
	/**
     * The keyboard layout
     */
	keyboard: Keyboard;

	/**
     * The country code
     */
	country: CountryCode;

	/**
     * The fully qualified domain name of the host. The domain part will be used as the search domain.
     */
	fqdn: string;

	/**
     * The default email address for the user `root`
     */
	mailto: string;

	/**
     * The timezone in TZ format (i.e. Europe/Vienna or America/New_York)
     */
	timezone: TimeZoneCode;

	/**
     * SSH public keys to add to the authorized_keys file of the root user after the installation
     */
	rootSshKeys?: string[];

	/**
     * If set to true, the system will reboot if an error occurs during the installation.
     */
	rebootOnError?: boolean;
};

type WithPassword = {
	/**
     * The root password
     */
	rootPassword: string;
} & PartialGlobalConfig;

type WithHash = {
	/**
     * The root password_hashed with mkpasswd
     */
	rootPasswordHashed: string;
} & PartialGlobalConfig;
export type ProxmoxGlobalConfig = WithPassword | WithHash;
