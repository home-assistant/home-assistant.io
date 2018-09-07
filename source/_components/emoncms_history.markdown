---
layout: page
title: "Emoncms history"
description: "Instructions on how to integrate Emoncms history into Home Assistant."
date: 2016-09-25 12:50
sidebar: true
comments: false
sharing: true
footer: true
logo: emoncms.png
ha_category: History
featured: false
ha_release: 0.31
---


The `emoncms_history` component makes it possible to transfer details collected with Home Assistant to [Emoncms.org](https://emoncms.org/) or your local running Emoncms instance. It will send the data to a specific input node on Emoncms with the entity IDs as a key. Afterwards you can create feeds and dashboards in Emoncms with the collected data.

To use the `emoncms_history` component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
emoncms_history:
  api_key: put your emoncms WRITE api key here
  url: https://emoncms.org
  inputnode: 19
  whitelist:
    - sensor.owm_temperature
    - sensor.owm_wind_speed
```

Configuration variables:

- **api_key** (*Required*): Your emoncms write api key
- **url** (*Required*): The root URL of your Emoncms installation. (Use https://emoncms.org for the cloud based version)
- **inputnode** (*Required*): Input node that will be used inside emoncms. Please make sure you use a dedicated, not used before, node for this component!
- **whitelist** (*Required*): List of entity IDs you want to publish.
- **scan_interval** (*Optional*): Defines, in seconds, how regularly the states of the whitelisted entities are being gathered and send to emoncms. Default is 30 seconds.
