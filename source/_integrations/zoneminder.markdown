---
title: ZoneMinder
description: How to integrate ZoneMinder into Home Assistant.
ha_category:
  - Hub
  - Binary Sensor
  - Camera
  - Sensor
ha_release: 0.31
ha_iot_class: Local Polling
ha_codeowners:
  - '@rohankapoorcom'
  - '@vangorra'
ha_domain: zoneminder
---

The `zoneminder` integration sets up Home Assistant with your [ZoneMinder](https://www.zoneminder.com) instance.

There is currently support for the following device types within Home Assistant:

- [Binary Sensor](#binary-sensor)
- [Camera](#camera)
- [Sensor](#sensor)

## Configuration

1. From the Home Assistant front-end, navigate to 'Configuration' then 'Integrations'. Under 'Set up a new integration' locate 'ZoneMinder' and click 'Configure'.
2. Enter the information appropriate for the server and click 'Submit'.

## Service

Once loaded, the `zoneminder` integration will expose a service (`set_run_state`) that can be used to change the current run state of ZoneMinder.

| Service data attribute | Optional | Description                       |
|:-----------------------|:---------|:----------------------------------|
| `id`                   | no       | Host of the ZoneMinder instance.  |
| `name`                 | no       | Name of the new run state to set. |

For example, if your ZoneMinder instance was configured with a run state called "Home", you could write an [automation](/getting-started/automation/) that changes ZoneMinder to the "Home" run state by including the following [action](/getting-started/automation-action/):

 ```yaml
action:
  service: zoneminder.set_run_state
  data:
    id: 10.10.3.2
    name: Home
```
