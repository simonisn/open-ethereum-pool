# Ubuntu Services Installation

**Usage:** sudo ./install.sh

#### Services Installed:
	ubiqpool-api.service
	ubiqpool-proxy.service
	ubiqpool-unlocker.service
	ubiqpool-payouts.service

##### NOTES:
	Services are started **immediately** when installed.

#### Config Files:
	Deployed to /etc/ubiqpool/config

##### NOTES:
	Be sure to update the config files with your settings prior to installing.
	Minimally, the following should be updated:
		config/ubiqpool-proxy.json
			upstream: url (url to your instance of go-ubiq)
		config/ubiqpool-payouts.json
			upstream: url (url to your instance of go-ubiq)
			payouts: address (pool's Ubiq address)
		config/ubiqpool-unlocker.json
			unlocker: poolFeeAddress (where pool fees are sent)

#### Script Files:
	Deployed to /etc/ubiqpool/scripts

##### NOTES:
	Script Files are used by the services to execute open-ethereum-pool with the appropriate config file.
	Scripts exceute open-ethereum-pool at /usr/local/bin/open-ethereum-pool, so be sure to deploy open-ethereum-pool here after building.

