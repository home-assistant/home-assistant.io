---
layout: page
title: "Emoncms history"
description: "Record events in emoncms."
date: 2016-09-25 12:50
sidebar: true
comments: false
sharing: true
footer: true
logo: emoncms.png
ha_category: History
featured: false
ha_release: 0.29
---


The `emoncms` component makes it possible to transfer details collected with Home Assistant to [Emoncms.org](https://emoncms.org/) or your local running Emoncms instance. 
It will send the data to a specific input node on emoncms with the entity id's as a key. Afterwards you can create feeds and dashboards in Emoncms with the collected data.

<p class='note warning'>
  The publishing interval is limited to 1 second. This means that it's possible to miss fast changes.
</p>

To use the `emoncms` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
emoncms_history:
  api_key: put your emoncms WRITE api key here
  url: https://emoncms.org
  inputnode: 19
  whitelist:
    - sensor.owm_temperature
    - sensor.owm_wind_speed
    - sensor.owm_humidity
    - sensor.mold_indicator
    - sensor.emoncms1_feedid_29
    - sensor.cpu_use
    - binary_sensor.pir_motion
```

Configuration variables:

- **api_key** (*Required*): Your emoncms write api key
- **url** (*Required*): The root url of your emoncms installation. (Use https://emoncms.org for the cloud based version)
- **inputnode** (*Required*): Input node that will be used inside emoncms. Please make sure you use a dedicated, not used before, node for this component!
- **whitelist** (*Required*): List of entity ID's you want to publish.
