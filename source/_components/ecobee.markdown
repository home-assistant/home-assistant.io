---
layout: component
title: "Ecobee thermostat"
description: "Instructions for how to integrate Ecobee thermostats and sensors within Home Assistant."
date: 2015-11-30 17:54
sidebar: true
comments: false
sharing: true
footer: true
logo: ecobee.png
ha_category: Hub
---


The Ecobee platform lets you control a thermostats and view sensor data from the [Ecobee](https://ecobee.com)
thermostat.

You will need to obtain an API key from ecobee's [developer site](https://www.ecobee.com/developers/) to use this component.
The first time you run Home-Assistant with this component it will give you a PIN code that you need to authorize in the
[ecobee consumer portal](https://www.ecobee.com/consumerportal/index.html).  You can do this by clicking 'Add Application' in the 'My Apps' section in the sidebar.

To set it up, add the following information to your `configuration.yaml` file:

```yaml
ecobee:
  api_key: asdfghjklqwertyuiopzxcvbnm 
```

Configuration variables:

- **api_key** (*Required*): Your Ecobee api key.

<p class='img'>
  <img src='{{site_root}}/images/screenshots/ecobee-sensor-badges.png' />
  <img src='{{site_root}}/images/screenshots/ecobee-thermostat-card.png' />
</p>
