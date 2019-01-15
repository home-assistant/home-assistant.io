---
layout: page
title: "Asuswrt Device Tracker"
description: "Instructions on how to integrate Asuswrt device tracker into Home Assistant."
date: 2015-08-06 19:00
sidebar: true
comments: false
sharing: true
footer: true
logo: asus.png
ha_category: Presence Detection
ha_release: pre 0.7
---


The `asuswrt` platform offers presence detection by looking at connected devices to a [ASUSWRT](http://event.asus.com/2013/nw/ASUSWRT/) based router.

The platform will be automatically configured if Asuswrt component is configured.

For more configuration information see the [Asuswrt component](/components/asuswrt/) documentation.

## {% linkable_title Padavan custom firmware (The rt-n56u project) %}
The [rt-n56u project](https://bitbucket.org/padavan/rt-n56u) does not store `dnsmasq.leases` which is used to track devices at `/var/lib/misc/` as `asuswrt` do. However this component can still be used for the rt-n56u project by linking `dnsmasq.leases` at the router boot.

Follow these steps to setup the link.
1. SSH or Telnet into the router. (default ssh admin@my.router)
2. Run the following command to find the file:
```
$ find / -name "dnsmasq.leases" 
```
3. Copy or remember the full path of, example: 
`/tmp/dnsmasq.leases`
4. Create the folder if it does not exist: 
```
$ mkdir -p /var/lib/misc
```
5. Add the linking process to the routers started script (one line): 
```
$ echo "/bin/ln -s /tmp/dnsmasq.leases /var/lib/misc/dnsmasq.leases" >> /etc/storage/started_script.sh
```
6. Reboot the router or link the file: 
```
$ /bin/ln -s /tmp/dnsmasq.leases /var/lib/misc/dnsmasq.leases
```

Note: The started script is also accessable and editable in the web gui. `Advanced Settings -> Customization -> Scripts -> Custom User Script -> Run After Router Started`

See the [device tracker component page](/components/device_tracker/) for instructions how to configure the people to be tracked.