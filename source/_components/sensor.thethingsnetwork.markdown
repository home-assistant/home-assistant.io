---
layout: page
title: "The Things Network Sensor"
description: "Instructions how to integrate The Things Network sensors into Home Assistant."
date: 2017-09-30 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: thethingsnetwork.png
ha_category: Sensor
ha_iot_class: "Local Polling"
ha_release: 0.55
---

The `thethingsnetwork` sensor platform allows you to get data from a [The Things Network Storage Integration](https://www.thethingsnetwork.org/docs/applications/storage/).

This platform requires that the [The Things Network component](/components/thethingsnetwork/) is set up and the [The Things Network Storage Integration](https://www.thethingsnetwork.org/docs/applications/storage/) as well.

Visit the [The Things Network Console](https://console.thethingsnetwork.org/) website, log in with your The Things Network credentials, choose your application from **Applications** and go to **Integrations**.

Add a new integration.

<p class='img'>
<img src='/images/components/thethingsnetwork/add_integration.png' />
Add a The Things Network integration
</p>

Select **Data Storage**.

<p class='img'>
<img src='/images/components/thethingsnetwork/choose_integration.png' />
Choose a The Things Network integration
</p>

Click **Add integration** to finish the process.

<p class='img'>
<img src='/images/components/thethingsnetwork/confirm_integration.png' />
Add a The Things Network Data Storage integration
</p>

When done, the status of the integration should be **Running**. You could check the output after clicking on **go to platform** in an interactive web interface. 

<p class='img'>
<img src='/images/components/thethingsnetwork/storage_integration.png' />
Add a The Things Network integration
</p>

Select **Devices** to get the ID of your device that you want to use.

<p class='img'>
<img src='/images/components/thethingsnetwork/devices.png' />
Devices overview
</p>

To enable this platform, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thethingsnetwork
    device_id: ha-demo
    values:
      sensor_value: unit of measurement
      voltage: V
```

{% configuration %}
  device_id:
    description: The ID of the device.
    required: true
    type: string
  values:
    description: The sensor values with their unit of measurement
    required: true
    type: list
{% endconfiguration %}

