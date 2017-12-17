---
layout: page
title: "ThingSpeak"
description: "Record one entity in ThingSpeak"
date: 2016-10-24 15:45
sidebar: true
comments: false
sharing: true
footer: true
logo: thingspeak.png
ha_category: "History"
ha_release: 0.32
---

The `thingspeak` components makes Home Assistant communicate with the [ThingSpeak API](https://thingspeak.com/). 
For now, it records exactly one entity at once, which is great for testing purposes. For long-time storage you should rely on the [InfluxDB component](https://home-assistant.io/components/influxdb/).

You will have to create a [new channel](https://thingspeak.com/channels/new) on ThingSpeak and grab your Write API Key from the "API Keys" tab of the channel you want to use.

To setup the ThingSpeak component in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
thingspeak:
  api_key: MY_API_KEY
  id: 1337
  whitelist: sensor.yr_temperature
```

Configuration variables:

- **api_key** (*Required*): Your ThingSpeak Channel Write API key.
- **id** (*Required*): The ID of your desired ThingSpeak channel.
- **whitelist** (*Required*): The name of the entity whose states should be sent to the channel.

