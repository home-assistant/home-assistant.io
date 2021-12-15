---
title: Neurio energy
description: Instructions on how to integrate Neurio within Home Assistant.
logo: neurio.png
ha_category:
  - Energy
ha_iot_class: Cloud Polling
ha_release: 0.14
ha_domain: neurio_energy
ha_platforms:
  - sensor
---

Integrate your [Neurio](https://neur.io/) meter information into Home Assistant. To get an API key and secret, login to your [Neurio account](https://my.neur.io/#settings/applications/register) and register an application. Note the Homepage URL and Callback URL are optional.

To enable this sensor in your installation, add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
sensor:
  platform: neurio_energy
  api_key: "CLIENT_ID"
  api_secret: "CLIENT_SECRET"
  sensor_id: "SENSOR_ID"
```

Two sensors will be created with the following names:

- **Energy Usage**: Current active power usage in Watts. Updated every 10 seconds.
- **Daily Energy Usage**: Daily power usage in kWh.  Updated every 2.5 minutes.

{% configuration %}
api_key:
  description: The API key for your account/application.
  required: true
  type: string
api_secret:
  description: The API secret for your account/application.
  required: true
  type: string
sensor_id:
  description: "The sensor ID, a hex number as shown on the [PWRView webpage](https://mypwrview.generac.com/#settings/sensors), e.g., `0x0000XXXXXXXXXXXX`."
  required: true
  type: string
{% endconfiguration %}

## Neurio hardware has an open local network accessible API

The current implementation of the Neurio Energy component is based on a cloud based service, should that service end in the future, it is still possible to read the Neurio's Energy values for each CT and their consumption directly from the neurio hardware itself by hitting the device's IP with `/current-sample` at the end, i.e. `http://NEURIO-IP/current-sample`

The data that comes back looks something like:
```json
{
    "sensorId": "0x0000C47F510185DC",
    "timestamp": "2021-12-15T04:14:35Z",
    "channels": [
        {
            "type": "PHASE_A_CONSUMPTION",
            "ch": 1,
            "eImp_Ws": 111639399492,
            "eExp_Ws": 3487634862,
            "p_W": 1028,
            "q_VAR": -80,
            "v_V": 122.456
        },
        {
            "type": "PHASE_B_CONSUMPTION",
            "ch": 2,
            "eImp_Ws": 115701364915,
            "eExp_Ws": 1324518714,
            "p_W": 212,
            "q_VAR": -85,
            "v_V": 123.135
        },
        {
            "type": "CONSUMPTION",
            "ch": 3,
            "eImp_Ws": 227335016810,
            "eExp_Ws": 4806405446,
            "p_W": 1240,
            "q_VAR": -165,
            "v_V": 122.796
        }
    ],
    "cts": [
        {
            "ct": 1,
            "p_W": 1028,
            "q_VAR": -80,
            "v_V": 122.456,
            "i_A": 8.488
        },
        {
            "ct": 2,
            "p_W": 212,
            "q_VAR": -85,
            "v_V": 123.135,
            "i_A": 2.206
        },
        {
            "ct": 3,
            "p_W": 0,
            "q_VAR": 0,
            "v_V": 0.000,
            "i_A": 0.000
        },
        {
            "ct": 4,
            "p_W": 0,
            "q_VAR": 0,
            "v_V": 122.453,
            "i_A": 0.000
        }
    ]
}
```

