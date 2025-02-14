import test from 'ava';
import {execa} from 'execa';
import tempWrite from 'temp-write';
import {generateToml} from '../config/generate-toml.js';
import {type ProxmoxConfig} from '../config/index.js';

const config: ProxmoxConfig = {
	global: {
		country: 'US',
		keyboard: 'en-us',
		timezone: 'America/Detroit',
		fqdn: 'some.domain.com',
		mailto: 'james.talmage@jrtechnical.com',
		rootPasswordHashed: 'NOT A PASSWORD',
		rootSshKeys: ['SOME SSH KEY'],
	},
	network: {
		source: 'from-answer',
		cidr: '10.132.0.2/16',
		gateway: '10.132.0.1',
		dns: '10.132.0.1',
		filter: {
			name: 'ID_NET_NAME',
			value: 'eno1',
		},
	},
	diskSetup: {
		filesystem: 'ext4',
		filterMatch: 'any',
		filters: [
			{
				name: 'DEVNAME',
				value: '/dev/nvme',
			},
		],
	},
	postInstall: {
		url: 'https://example.com',
	},
	firstBoot: {
		source: 'from-url',
		url: 'https://example.com',
	},
};

const validateConfig = async (toml: string) => {
	const path = await tempWrite(toml);
	return execa({all: true})`docker run --rm -v ${path}:/config.toml --platform linux/amd64 --pull missing jamestalmage/proxmox-auto-install-assistant proxmox-auto-install-assistant validate-answer /config.toml`;
};

test('a generated config is valid', async t => {
	const toml = generateToml(config);
	const {all, exitCode} = await validateConfig(toml);
	t.is(exitCode, 0, `${all}`);
});

test('should fail if incomplete', async t => {
	// Testing the test framework here...
	const toml = '[global]\n';
	await t.throwsAsync(validateConfig(toml), {message: /Error parsing answer file/});
});
