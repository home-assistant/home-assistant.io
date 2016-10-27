---
layout: page
title: "Thingspeak"
description: "Record one entity in Thingspeak"
date: 2016-10-24 15:45
sidebar: true
comments: false
sharing: true
footer: true
ha_category: "History"
ha_release: 0.32
---

The `thingspeak` components makes Home Assistant communicate with the [ThingSpeak API](https://thingspeak.com/). 
For now, it records exactly one entity at once, which is great for testing purposes. For long-time storage you should rely
on the [InfluxDB component](https://home-assistant.io/components/influxdb/).

```yaml
# Example configuration.yaml entry
thingspeak:
```

You will have to create a [new channel](https://thingspeak.com/channels/new) on ThingSpeak and grab your API key from your [account page](https://thingspeak.com/account). 

Configuration variables:
- **api_key**: Yout ThingSpeak API key
- **id**: The ID of your desired ThingSpeak channel
- **whitelist**: The name of the entity whose states should be sent to the channel.

## {% linkable_title Examples %}

### {% linkable_title Full configuration %}

```yaml
thingspeak:
  api_key: MY_API_KEY
  id: 1337
  whitelist: sensor.yr_temperature
```