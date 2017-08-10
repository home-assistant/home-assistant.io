---
layout: page
title: "EtherRain"
description: "The EtherRain networked irrigation controller"
date: 2017-08-09 06:16
sidebar: true
comments: false
sharing: true
footer: true
logo: etherrain.jpg
ha_category: Hub
featured: false
ha_release: 0.52
ha_iot_class: "Local Polling"
---

The EtherRain component integrates your [EtherRain](http://www.quicksmart.com/qs_etherrain.html) and allows you to [control](/components/switch.etherrain) the state of your irrigation valves.

```yaml
# Example configuration.yaml entry

etherrain:
  host: 192.168.1.1
  username: admin
  password: mypassword
```

Configuration variables:
- **host** (*Required*): The Hostname or IP address of your EtherRain 8
- **username** (*Optional*): Your EtherRain username.
- **password** (*Optional*): Your EtherRain password.

## Notes and Limitations
- The EtherRain component logs into the EtherRain for each request.  External programs may fail or interfere due to an EtherRain product limitation/assumption that only one IP address can be authenticated with it at a time.
- Only one valve can be active at a time.  If a valve is on and another valve is switched on, then it will fail.
- You can't turn off an individual valve.  You can only reset the state of the EtherRain/8 to 'Idle'.
