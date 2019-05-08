---
layout: page
title: "Genius Hub"
description: "Instructions on how to integrate Genius Hub with Home Assistant."
date: 2019-03-03 16:00
sidebar: true
comments: false
sharing: true
footer: true
logo: geniushub.png
ha_category:
  - Climate
  - Water heater
ha_release: 0.92
ha_iot_class: Local Polling
---

The `geniushub` integration links Home Assistant with your Genius Hub (the hub does not have to be in the same network as HA).

Currently only **Radiator** and **Hot Water Temperature** zones are supported. Within HA, each **Radiator** zone will appear as a `Climate` device, and each **Hot Water Temperature** zone will appear as a `WaterHeater` device.

The device's `operating_mode` can be set to one of `off`, `timer`, `on` (i.e. **Override** mode) or `eco`. The `eco` mode is a proxy for the **Footprint** mode and so is only available to **Radiator** zones that have room sensors.

Other properties are available via the device's state attributes, which includes a JSON data structure called `status`. For example, in the case of **Radiator** zones/`Climate` devices:

```json
{
  "status": {
    "type": "radiator",
    "temperature": 19,
    "occupied": False,
    "override": {
      "duration": 0,
      "setpoint": 16
    }
  }
}

```

This data can be accessed in automations, etc. via a value template. For example:

{% raw %}
```
value_template: "{{ state_attr('water_heater.boiler_h_w', 'status').override.setpoint }}"
```
{% endraw %}

In the specific case of **Radiator** zones with room sensors:

{% raw %}
```
value_template: "{{ state_attr('climate.main_room', 'status').occupied }}"
```
{% endraw %}

Currently, there is no support for modifying schedules and neither do they appear in the state attributes.

## {% linkable_title Configuration %}

To add your Genius Hub into your Home Assistant installation, add one of the following to your `configuration.yaml` file.

### {% linkable_title Option 1: hub token only %}

 - requires a **hub token** obtained from [my.geniushub.co.uk/tokens](https://my.geniushub.co.uk/tokens)
 - uses the v1 API - which is well-documented
 - polls Heat Genius' own servers (so is slower, say 5-10s response time)

```yaml
# Example configuration.yaml entry, using a Hub Token
geniushub:
  token: GENIUS_HUB_TOKEN
```

### {% linkable_title Option 2: hub hostname/address with user credentials %}

 - requires your **username** & **password**, as used with [www.geniushub.co.uk/app](https://www.geniushub.co.uk/app)
 - uses the v3 API - results are WIP and may not be what you expect
 - polls the hub directly (so is faster, say 1s response time)

```yaml
# Example configuration.yaml entry, directly polling the Hub
geniushub:
  host: IP_ADDRESS
  username: GENIUS_HUB_USERNAME
  password: GENIUS_HUB_PASSWORD
```

Note that if a `host` is used instead of `token`, then the `username` and `password` are also required.

{% configuration %}
token:
  description: The Hub Token of the Genius Hub
  required: true
  type: string
host:
  description: The hostname/IP address of the Genius Hub
  required: true
  type: string
username:
  description: Your Genius Hub username
  required: false
  type: string
password:
  description: Your Genius Hub password
  required: false
  type: string
{% endconfiguration %}
