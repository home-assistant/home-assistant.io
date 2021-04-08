---
title: Smappee
description: Instructions on how to setup Smappee within Home Assistant.
ha_category:
  - Hub
  - Energy
  - Binary Sensor
  - Sensor
  - Switch
ha_iot_class: Cloud polling
ha_release: 0.64
ha_config_flow: true
ha_codeowners:
  - '@bsmappee'
ha_domain: smappee
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - sensor
  - switch
---

The Smappee integration will allow users to integrate their Smappee monitors, Smappee Comfort Plugs and Smappee Switches into Home Assistant using the local API, local MQTT broker or the [official cloud API](https://smappee.atlassian.net/wiki/spaces/DEVAPI/overview).

## Local discovery

In most cases, the Smappee Energy, Solar, Plus, Pro and Infinity monitors will be automatically discovered by Home Assistant through network scanning.
Those automatically discovered Smappee devices are listed on the integrations page and can be configured without any additional details.
This will provide you a limited number of entities only.
If your home network doesn't support mDNS you can still manually initiate the Smappee integration by choosing the LOCAL option and entering the IP address of the Smappee monitor through the configuration flow.

#### Sensor
A sensor entity is being added for the current active power usage. In case of solar production an entity for the active power production is added as well.

Smappee Infinity devices will also provide entities for the current reactive, voltages for each phase and current active powers for each configured load (submeter).

#### Switch
Switch entities are created for each Smappee Switch and Smappee Comfort Plug.



## Cloud API configuration
If you have API credentials, we strongly suggest you use the Smappee cloud configured integration by following the scheme below.

To use the Smappee integration you need a personal `client_id` and `client_secret` and add these to your `configuration.yaml` file. The `client_id` and `client_secret` can be obtained by contacting [info@smappee.com](mailto:info@smappee.com) and require a recurring monthly fee.
For any information about the use of the API please refer to the [Smappee API space](https://smappee.atlassian.net/wiki/spaces/DEVAPI/overview).

```yaml
# Example configuration.yaml entry
smappee:
  client_id: YOUR_CLIENT_ID
  client_secret: YOUR_CLIENT_SECRET
```

Once Home Assistant restarted, go to Configuration > Integrations and select the Smappee integration. You will be redirected to a login page and be able to select the locations you would like to use within Home Assistant.

#### Sensor
Sensor entities are being added for the current active power usage,
the always on active power, today's total consumption,
total consumption during the current hour, total consumption during the last 5 minutes
and the always on (slumber) consumption from today. In case of solar production entities for the active power production,
today's total solar production
and the solar production during the current hour are added as well.

Smappee Pro, Plus and Infinity devices will create current active powers for each configured load (submeter).

In case a Smappee Gas and/or Water meter is installed as well, an entity showing today's consumption is provided.

Additionally, Smappee Infinity devices will also provide entities for the line voltages and phase voltages (for each phase).

#### Switch
Switch entities are created for each Smappee Switch, Smappee Comfort Plug and Smappee Output module.

#### Binary sensor
For each discovered NILM appliance a binary sensor is being added showing the current state of the appliance.


{% configuration %}
client_id:
  description: Your Smappee API client ID.
  required: true
  type: string
client_secret:
  description: Your Smappee API client secret.
  required: true
  type: string
{% endconfiguration %}
