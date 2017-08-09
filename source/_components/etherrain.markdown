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
ha_release: 0.31
ha_iot_class: "Local Polling"
---

The EtherRain component integrates your [EtherRain](http://www.quicksmart.com/qs_etherrain.html) and allows you to [sense](/components/sensor.etherrain/) and [control](/components/switch.etherrain) the state of your irrigation valves.

```yaml
# Example configuration.yaml entry

etherrain:
  host: 192.168.1.1
  username: admin
  password: mypassword
```

Configuration variables:
- **host** (*Required*): The IP address of your EtherRain 8
- **username** (*Optional*): Your EtherRain username.
- **password** (*Optional*): Your EtherRain password.

### {% linkable_title Full configuration %}

```yaml
# Example configuration.yaml entry
etherrain:
  host: 192.168.1.1
  username: admin
  password: mypassword
```

## Notes and Limitations
- The EtherRain component logs into the EtherRain for each request.  External programs may fail or interfere due to an EtherRain product limitation/assumption that only one IP address can be authenticated with it at a time.
- Only one valve can be active at a time.  If a valve is on and another valve is switched on, then it will fail.
- Use the Etherrain 'sensor' module if you are controlling the Etherrain/8 from another program (cron) to monitor when valves go on/off.
- You can't turn off an individual valve.  You can only reset the state of the EtherRain/8 to 'Idle'.
