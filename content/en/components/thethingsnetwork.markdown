---
layout: page
title: "The Things Network"
description: "Instructions for how to integrate The Things Network within Home Assistant."
date: 2017-09-30 08:00
sidebar: true
comments: false
sharing: true
footer: true
logo: thethingsnetwork.png
ha_category: Hub
ha_release: 0.55
ha_iot_class: depends
---

The `thethingsnetwork` component allows one to interact with the [The Things Network](https://www.thethingsnetwork.org). This community-driven and open network supports [LoRaWAN](https://www.lora-alliance.org/) for long range (~5 to 15km) communication with a low bandwidth (51 bytes/message). [Gateways](https://www.thethingsnetwork.org/docs/gateways/) transfers the received data from the sensors to the The Things Network.

The Things network support various integrations to make the data available:

| The Things Network Integration | Home Assistant platform |
|---|---|
| [MQTT](https://www.thethingsnetwork.org/docs/applications/mqtt/) | |
| [Storage](https://www.thethingsnetwork.org/docs/applications/storage/) | [`thethingsnetwork`](/components/sensor.thethingsnetwork/) |
| [HTTP](https://www.thethingsnetwork.org/docs/applications/http/) | |

### {% linkable_title Setup %}

Visit the [The Things Network Console](https://console.thethingsnetwork.org/) website, log in with your The Things Network credentials, choose your application from **Applications**.

The **Application ID** is used to identify the scope of your data.

<p class='img'>
<img src='/images/components/thethingsnetwork/applications.png' />
Application overview
</p>

You need an access key to be able to read the data from your application.

<p class='img'>
<img src='/images/components/thethingsnetwork/access_key.png' />
Access keys
</p>

To enable this component, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
thethingsnetwork:
  app_id: sensor-123
  access_key: ttn-account-v2.xxxxxxxxxxx_yyyyyyyyyyy
```

{% configuration %}
  app_id:
    description: The Application ID.
    required: true
    type: string
  access_key:
    description: The access key. 
    required: true
    type: string
{% endconfiguration %}

