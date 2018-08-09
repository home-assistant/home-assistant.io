---
layout: page
title: "PJM"
description: "Instructions on how to set up the PJM  sensor in Home Assistant."
date: 2018-06-14
sidebar: true
comments: false
sharing: true
footer: true
logo: pjm.png
ha_category: Energy
ha_release: "0.72"
ha_iot_class: "Cloud Polling"
---

PJM Interconnection is a regional transmission organization (RTO) that coordinates the movement of wholesale electricity in all or parts of Delaware, Illinois, Indiana, Kentucky, Maryland, Michigan, New Jersey, North Carolina, Ohio, Pennsylvania, Tennessee, Virginia, West Virginia and the District of Columbia.

The PJM sensor currently supports total and per-zone instantaneous power load, available [here](https://datasnapshot.pjm.com/content/InstantaneousLoad.aspx).

To use this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: pjm
    monitored_variables:
      - type: instantaneous_total_load
      - type: instantaneous_zone_load
        zone: 'COMED'
```

Configuration variables:

- **monitored_variables** array (*Required*): Feeds to monitor.
  - **type** (*Required*): Name of the feed.
      - **instantaneous_total_load**: The instantaneous PJM RTO total load in megawatts.
      - **instantaneous_zone_load**: The instantaneous load for a given zone in megawatts.
  - **zone** (*Required for instantaneous_zone_load*): The case-sensitive name for the zone you want to monitor.  The list of zones is available [here](https://datasnapshot.pjm.com/content/InstantaneousLoad.aspx).
  - **name** (*Optional*): Custom name for the sensor.

