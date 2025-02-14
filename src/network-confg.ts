import {type ProxmoxFilter} from './filter.js';

type IpAddress = `${number}.${number}.${number}.${number}`;
type Cidr = `${number}.${number}.${number}.${number}/${number}`;

type DhcpConfig = {source: 'from-dhcp'};

type AnswerConfig = {
	source: 'from-answer';
	cidr: Cidr;
	dns: IpAddress;
	gateway: IpAddress;
	filter: ProxmoxFilter;
};

export type ProxmoxNetworkConfig = DhcpConfig | AnswerConfig;
