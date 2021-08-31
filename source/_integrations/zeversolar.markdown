---
title: Zeversolar Local
description: Get solar data from your Zeversolar inverter using the local API.
ha_category:
  - Sensor
  - Energy
ha_iot_class: Local Polling
ha_release: 2021.8.8
ha_codeowners:
  - '@sander76'
ha_domain: zeversolar
ha_platforms:
  - sensor
---

The `zeversolar` platform uses the local API available on Zeversolar inverters.
It is unclear which Zeversolar inverters are supported, but a quick check would be to see if the address `http://<local zever IP address>/home.cgi` returns any data in the form of

```shell
1 1 EAB9618C1399 AWWQBDWVVXDJKVXF M11 12225-787R+42829-719R 13:05 26/08/2021 236 1 ZS150060118C0109 196 1.54 OK Error 
```

This would be a good indication this integration will work on your Zeversolar inverter.

## Requirements

**Powered on Zeversolar inverter**. The zeversolar inverter is powered by the solar panels attached to it. No sun means the inverter is off. So make sure when adding this integration your zeversolar inverter is powered on. After successful installation the integration takes care of the on and off switching of the inverter.

**Fixed IP address**. Your zeversolar inverter must have a fixed IP-address. The easiest way would be to make a IP-address reservation in your dhcp server.

{% include integrations/config_flow.md %}
