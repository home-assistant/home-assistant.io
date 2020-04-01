---
title: Sense
description: Instructions on how to integrate Sense within Home Assistant.
ha_category:
  - Energy
  - Binary Sensor
  - Sensor
ha_iot_class: Cloud Polling
ha_release: 0.82
ha_config_flow: true
ha_codeowners:
  - '@kbickar'
ha_domain: sense
---

Integrate your [Sense](https://sense.com) meter information into Home Assistant.

There is currently support for the following device types within Home Assistant:

- Binary Sensor
- Sensor

## Configuration

To add `Sense` to your installation, go to **Configuration** >> **Integrations** in the UI, click the button with `+` sign and from the list of integrations select **Sense**.

Alternatively, to enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sense:
  email: CLIENT_ID
  password: CLIENT_SECRET
```

{% configuration %}
email:
  description: The email associated with your Sense account/application.
  required: true
  type: string
password:
  description: The password for your Sense account/application.
  required: true
  type: string
timeout:
  description: Seconds for timeout of API requests.
  required: false
  type: integer
{% endconfiguration %}

Sensors are added for both usage and production with the following names:

- **Active Usage/Production**: Current active power usage/production in Watts. Updated every 60 seconds.
- **Daily/Weekly/Monthly Usage/Production**: Daily/Weekly/Monthly power usage/production in kWh. Updated every 5 minutes.

Binary sensors are created for each of the devices detected by your Sense monitor to show their power state.

Sensors are created for each of the devices detected by your Sense monitor to show their power usage in Watts.
