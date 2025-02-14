# Generate a Proxmox VE Answer File

A simple utility to output TOML for a Proxmox VE answer file. Comes with TypeScript support.

# Usage

```js
import {generateToml} from 'proxmox-answer-file-generator';

const config: ProxmoxConfig = {
	global: {
		country: 'US',
		keyboard: 'en-us',
		timezone: 'America/Detroit',
		fqdn: 'some.domain.com',
		mailto: 'my.email@example.com',
		rootPasswordHashed: 'NOT A PASSWORD',
		rootSshKeys: ['SOME SSH KEY'],
	},
	network: {
		source: 'from-dhcp',
	},
	diskSetup: {
		filesystem: 'ext4',
		disks: ['sda']
	}
};

const answerFile = generateToml(config);

// Write it to a file or pass it in a server response, etc.
console.log(answerFile);
```
