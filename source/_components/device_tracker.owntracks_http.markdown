---
layout: page
title: "OwnTracks (via HTTP)"
description: "Instructions on how to use Owntracks via HTTP to track devices in Home Assistant."
date: 2017-09-28 07:00
sidebar: true
comments: false
sharing: true
footer: true
logo: owntracks.png
ha_category: Presence Detection
featured: true
ha_release: 0.55
---

OwnTracks is a free and open source application that allows you to track your location in Home Assistant. This is a platform that supports OwnTracks via their HTTP publishing method.

To integrate Owntracks tracking via HTTP in Home Assistant, add the following section to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
device_tracker:
  - platform: owntracks_http
    webhook_id: long-random-webhook-url
```

The value for `webhook_id` should be sufficiently long and random, as it is the only form of "authentication" that is used. For this reason, it is highly advisable to be randomly generated.

To generate a `webhook_id` you can use the following command on your Raspberry Pi:

```bash
python3 -c "import binascii;import os;print(binascii.hexlify(os.urandom(32)).decode('ascii'))"
```

{% configuration %}
webhook_id:
  description: Set the URL suffix used in the webhook component
  required: true
  type: string
{% endconfiguration %}

For further configuration options and usage instructions, read the documentation for the [OwnTracks platform](/components/device_tracker.owntracks/).

## {% linkable_title Configuring OwnTracks to submit data via HTTP %}

Open OwnTracks and go to Connection preferences:

 - Mode: Select **Private HTTP**
 - Host: [Home Assistant URL]:[port]/api/webhook/[your-random-webhook-url]?u=[your name]&d=[device name]

Host example: If I host my Home Assistant at `https://example.duckdns.org`, my name is Paulus, my phone is a Pixel and I configured the value for `webhook_id` to be `long-random-webhook-url` I would set the host to be `https://example.duckdns.org/api/webhook/long-random-webhook-url?u=paulus&d=pixel`. This will result in an entity with an ID of `device_tracker.paulus_pixel`. You can pick any name for the user and the device.

Since the battery data is available as an attribute of the device tracker entity, it can be tracked with a [`template` sensor](/components/sensor.template/).


{% raw %}
```yaml
# Example configuration.yaml entry
sensor:
  - platform: template
    sensors:
      pixel_battery:
        friendly_name: Pixel of Paulus
        unit_of_measurement: "%"
        value_template: '{{ states.device_tracker.paulus_pixel.attributes.battery|int }}'
        device_class: battery
```
{% endraw %}


## {% linkable_title Setting up on Android %}

The Android OwnTracks app sends more data than its iOS counterpart and it is possible to configure it using the `Identification` tab in `Preferences`, setting **Username** to your name, and **Device ID** to your device's name. Password field may be left blank.

Elaborating on the general example above:

 1. Identification: Turn **Authentication** on, 
 2. Set **Username** to `paulus` and leave the password blank or put any string in it.
 3. Set Device ID to `pixel`
 4. In the Host tab enter simply `https://example.duckdns.org/api/webhook/long-random-webhook-url`


