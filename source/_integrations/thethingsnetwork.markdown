---
title: The Things Network
description: Instructions for how to integrate The Things Network within Home Assistant.
ha_category:
  - Hub
  - Sensor
ha_release: 0.55
ha_iot_class: Local Push
ha_codeowners:
  - '@fabaff'
ha_domain: thethingsnetwork
ha_platforms:
  - sensor
ha_integration_type: integration
---

<div class='note warning'>
  This integration only supports TTNv2.
</div>

The `thethingsnetwork` integration allows one to interact with the [The Things Network](https://www.thethingsnetwork.org). This community-driven and open network supports [LoRaWAN](https://www.lora-alliance.org/) for long range (~5 to 15 km) communication with a low bandwidth (51 bytes/message). [Gateways](https://www.thethingsnetwork.org/docs/gateways/) transfers the received data from the sensors to the The Things Network.

The Things network support various integrations to make the data available:

| The Things Network Integration | Home Assistant platform |
|---|---|
| [MQTT](https://www.thethingsnetwork.org/docs/applications/mqtt/) | |
| [Storage](https://www.thethingsnetwork.org/docs/applications/storage/) | [`thethingsnetwork`](#sensor) |
| [HTTP](https://www.thethingsnetwork.org/docs/applications/http/) | |

There is currently support for the following device types within Home Assistant:

- [Sensor](#sensor)

## Setup

Visit the [The Things Network Console](https://console.thethingsnetwork.org/) website, log in with your The Things Network credentials, choose your application from **Applications**.

The **Application ID** is used to identify the scope of your data.

<p class='img'>
<img src='/images/integrations/thethingsnetwork/applications.png' />
Application overview
</p>

You need an access key to be able to read the data from your application.

<p class='img'>
<img src='/images/integrations/thethingsnetwork/access_key.png' />
Access keys
</p>

## Configuration

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

## Sensor

The `thethingsnetwork` sensor platform allows you to get data from a [The Things Network Storage Integration](https://www.thethingsnetwork.org/docs/applications/storage/).

This platform requires that the [The Things Network component](#configuration) is set up and the [The Things Network Storage Integration](https://www.thethingsnetwork.org/docs/applications/storage/) as well.

### Prerequisites

Visit the [The Things Network Console](https://console.thethingsnetwork.org/) website, log in with your The Things Network credentials, choose your application from **Applications** and go to **Integrations**.

Add a new integration.

<p class='img'>
<img src='/images/integrations/thethingsnetwork/add_integration.png' />
Add a The Things Network integration
</p>

Select **Data Storage**.

<p class='img'>
<img src='/images/integrations/thethingsnetwork/choose_integration.png' />
Choose a The Things Network integration
</p>

Click **Add integration** to finish the process.

<p class='img'>
<img src='/images/integrations/thethingsnetwork/confirm_integration.png' />
Add a The Things Network Data Storage integration
</p>

When done, the status of the integration should be **Running**. You could check the output after clicking on **go to platform** in an interactive web interface.

<p class='img'>
<img src='/images/integrations/thethingsnetwork/storage_integration.png' />
Add a The Things Network integration
</p>

Select **Devices** to get the ID of your device that you want to use.

<p class='img'>
<img src='/images/integrations/thethingsnetwork/devices.png' />
Devices overview
</p>

### Configuration

To enable this platform, add the following lines to your `configuration.yaml`:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: thethingsnetwork
    device_id: ha-demo
    values:
      current: ampere
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
