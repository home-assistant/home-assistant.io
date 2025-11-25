---
title: ThingSpeak
description: Record one entity in ThingSpeak
ha_category:
  - History
ha_iot_class: Cloud Push
ha_release: 0.32
ha_domain: thingspeak
ha_integration_type: integration
ha_quality_scale: legacy
---

The `thingspeak` integrations makes Home Assistant communicate with the [ThingSpeak API](https://thingspeak.com/).
For now, it records exactly one entity at once, which is great for testing purposes. For long-time storage you should rely on the [InfluxDB integration](/integrations/influxdb/).

## Configuration

You will have to create a [new channel](https://thingspeak.com/channels/new) on ThingSpeak and grab your Write API Key from the "API Keys" tab of the channel you want to use.

To setup the ThingSpeak integration in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
thingspeak:
  api_key: MY_API_KEY
  id: 1337
  whitelist: sensor.yr_temperature
```

{% configuration %}
api_key:
  description: Your ThingSpeak Channel Write API key.
  required: true
  type: string
id:
  description: The ID of your desired ThingSpeak channel.
  required: true
  type: integer
whitelist:
  description: The name of the entity whose states should be sent to the channel.
  required: true
  type: string
{% endconfiguration %}
