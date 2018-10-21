---
layout: page
title: "Systemair Savecair Climate"
description: "Instructions on how to integrate Systemair Savecair into Home Assistant."
date: 2018-10-19 05:00
sidebar: true
comments: false
sharing: true
footer: true
logo: systemair.png
ha_category: Climate
ha_release: 0.81
ha_iot_class: "Cloud Polling"
---
The `systemair_savecair` climate platform consumes data from the [Savecair web interface](https://savecair.systemair.com). This component enables you to view and configure the climate device.

To enable this platform, you need the Savecair module configured.

```yaml
# Example configuration.yaml entry
climate:
  - platform: systemair_savecair
    iam_id: IAM_XXXXXXXXXXX
    password: xxxxxxxxxx
```
{% configuration %}
device:
  description: The climate device id. Currently, only vtr_300 is supported.
  required: true
  type: string
name:
  description: Name of the component.
  required: false
  type: string
iam_id:
  description: The IAM id linked to your savecair device.
  required: true
  type: string
password:
  description: The password of your IAM user
  required: true
  type: string
{% endconfiguration %}

```yaml
# Example configuration.yaml entry
climate:
  - platform: systemair_savecair
    name: System AIR
    device: vtr_300
    iam_id: IAM_XXXXXXXXXXX
    password: xxxxxxxxxx
```

### {% linkable_title Available Devices %}

Available devices: `vtr_300`

| attribute | Optional | Description |
| ---------------------- | -------- | ----------- |
| `device` | yes | Your System AIR model.
