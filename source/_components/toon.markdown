---
layout: page
title: "Toon"
description: "Instructions on how to integrate Toon within Home Assistant."
date: 2017-10-22 12:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: Hub
ha_release: 0.56
logo: toon.png
ha_iot_class: "Cloud Polling"
---

The `toon` component platform can be used to control your Toon thermostat. This component adds a climate device for your Toon thermostat and sensors for power and gas consumption. The component also auto-detects any smart plugs, solar panels and smoke detectors connected to Toon and adds sensors and switches for them.

For the `toon` component to work, you'll need an active Toon subscription with Eneco. The component uses your Mijn Eneco credentials to control your thermostat through the [toonopafstand](https://toonopafstand.eneco.nl) domain.

To use your Toon thermostat in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
toon:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

Configuration variables:

- **username** (*Required*): Username for Mijn Eneco.
- **password** (*Required*): Password for Mijn Eneco.

Toon is a smart thermostat delivered by the Eneco power company in The Netherlands. It can measure energy consumption (power and gas), but also the amount of energy generated in case solar panels are connected to it. Toon also acts as a z-wave hub for supported devices like the wall plug and the smoke detector. This component uses the [toonlib library](https://github.com/costastf/toonlib) by Costas Tyfoxylos that connects to the unofficial API on [https://toonopafstand.eneco.nl](https://toonopafstand.eneco.nl).

The current version of this component supports setting any of the four built-in programs and setting the temperature manually. It polls the Toon API at 30 second intervals so the status is relatively fresh without overloading the API.
