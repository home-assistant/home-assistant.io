---
title: GPSD
description: Instructions on how to integrate GPSD into Home Assistant.
ha_category:
  - Utility
ha_release: 0.26
ha_config_flow: true
ha_iot_class: Local Polling
ha_codeowners:
  - '@fabaff'
  - '@jrieger'
ha_domain: gpsd
ha_platforms:
  - sensor
ha_integration_type: integration
---

The `gpsd` integration is using the GPS information collected by [gpsd](https://gpsd.gitlab.io/gpsd/index.html) and a GPS receiver.

## Setup

A requirement is that `gpsd` is installed (`$ sudo apt-get install gpsd` or `$ sudo dnf -y install gpsd`). `gpsd` uses the socket activation feature of systemd on recent Linux distributions for USB receivers. This means that if you plug your GPS receiver in, `gpsd` is started. Other GPS device may work too, but this was not tested.

```bash
$ sudo systemctl status gpsdctl@ttyUSB0.service
● gpsdctl@ttyUSB0.service - Manage ttyUSB0 for GPS daemon
   Loaded: loaded (/usr/lib/systemd/system/gpsdctl@.service; static; vendor preset: disabled)
   Active: active (exited) since Sat 2016-07-16 09:30:33 CEST; 1 day 23h ago
  Process: 5303 ExecStart=/bin/sh -c [ "$USBAUTO" = true ] && /usr/sbin/gpsdctl add /dev/%I || : (code=exited, status=0/SUCCESS)
 Main PID: 5303 (code=exited, status=0/SUCCESS)

Jul 16 09:30:33 laptop019 systemd[1]: Starting Manage ttyUSB0 for GPS daemon...
Jul 16 09:30:33 laptop019 gpsdctl[5305]: gpsd_control(action=add, arg=/dev/ttyUSB0)
Jul 16 09:30:33 laptop019 gpsdctl[5305]: reached a running gpsd
```

To check if your setup is working, connect to port 2947 on the host where `gpsd` is running with `telnet`. This may need adjustments to your firewall.

```bash
$ telnet localhost 2947
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
{"class":"VERSION","release":"3.15","rev":"3.15-2.fc23","proto_major":3,"proto_minor":11}
```

{% include integrations/config_flow.md %}
