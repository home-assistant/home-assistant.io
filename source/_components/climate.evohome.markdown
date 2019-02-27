---
layout: page
title: "Honeywell evohome/TCC Climate devices"
description: "Instructions on how to utilize a Honeywell evohome/TCC system within Home Assistant."
date: 2018-09-25 12:00
sidebar: true
comments: false
sharing: true
footer: true
logo: honeywell.png
ha_category: Climate
ha_release: 0.80
ha_iot_class: "Cloud Polling"
---

The `evohome` climate platform integrates your _non-US_ [Honeywell Total Connect Comfort (TCC)](https://international.mytotalconnectcomfort.com/Account/Login) system into Home Assistant. It has been tested with the Honeywell evohome multi-zone CH/DHW system, but other systems may also work.

It is distinct from - but related to - the [`honeywell`](/components/climate.honeywell/) climate platform, which also allows (limited) integration with Honeywell Connected thermostats; these two components may well be usable side-by-side, but YMMV.

The evohome evotouch Controller supports seven distict operating modes: Auto, AutoWithEco, Away, DayOff, HeatingOff, and Custom; AutoWithReset is a 7th, hidden, mode.

Currently, only the standard HA operating modes are supported; the evohome modes are mapped thus: 'Eco' (AutoWithEco), 'Off' (HeatingOff), and 'Auto' (all other evohome modes). 'Away' mode is supported separately, in the HA fashion.

The evohome Heating zones support only three operating modes: FollowSchedule, TemporaryOverride, and PermanentOverride. If the zone is in FollowSchedule mode, it inherits its `operating_mode` from the controller; the other modes are mapped to 'Manual' or 'Off'.

A device's actual operating mode can be tracked via its `device_state_attributes`, which includes a JSON data structure for current state called `status`. For example:
```json
{
	'zoneId': '999999',
	'temperatureStatus': {
		'temperature': 21.5,
		'isAvailable': true
	},
	'activeFaults': [],
	'setpointStatus': {
		'targetHeatTemperature': 17.5,
		'setpointMode': 'FollowSchedule'
	},
	'name': 'Main Room'
}
```

This data can be accessed in automations, etc., via a value template:
{% raw %}
```
value_template: "{{ state_attr('climate.main_room', 'status').setpointStatus.setpointMode }}"
```
{% endraw %}

<p class='note'>
Full configuration details can be found on the main [evohome component](/components/evohome/) page.
</p>
