---
title: myUplink
description: Instructions on how to set up the myUplink integration within Home Assistant.
ha_category:
  - Binary sensor
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_iot_class: Cloud Polling
ha_release: '2024.2'
ha_domain: myuplink
ha_codeowners:
  - '@pajzo'
  - '@astrandb'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: integration
related:
  - url: https://myuplink.com/
    title: myUplink web portal
---

The **myUplink** {% term integration %} lets you get information about and control heat-pump devices supporting myUplink using the [official cloud API](https://dev.myuplink.com).

The integration will connect to your account and download all available data from the API. The downloaded information will be used to create devices and entities in Home Assistant. There can be from a few entities up to many hundreds depending on the type of equipment. The integration will make the best effort to map the data-points in the API to sensors, switches, number, and select entities.

{% note %}
You may need a valid subscription with myUplink to control your equipment with switch, select, and number entities.
{% endnote %}

## Prerequisites

1. Visit [https://myuplink.com/register](https://myuplink.com/register) and sign up for a user account.
2. Go to [**Applications**](https://dev.myuplink.com/apps), and register a new App:

- **Application Name**: Home Assistant (or whatever name makes sense to you)
- **Description**: A brief description of how you'll use this application (e.g., "Home Assistant integration for controlling my heat pump")
- **Callback URL**: `https://my.home-assistant.io/redirect/oauth`

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`."

{% enddetails %}

{% include integrations/config_flow.md %}

The integration configuration will require the **Client ID** and **Client Secret** created above. See [Application Credentials](/integrations/application_credentials) for more details.

## Supported heat-pump systems

The integration supports all heat-pump devices that can be connected to the myUplink cloud service. See [Works with myUplink](https://myuplink.com/legal/works-with/en).
However, the representation in Home Assistant depends on how and to what extent the manufacturer has implemented the service.

## Use cases

Common use cases include:

- **System Monitoring**: Display the current operation state of the pump (heating house, pool, or hot water)
- **Smart Notifications**: Get alerts when the water temperature is low in the heater tank
- **Automation**: Adjust the temperature curve offset during holiday mode
- **Analytics**: View long-term statistics and graphs for the relevant sensors

## Example

Automation that will send a notification to a smartphone when the hot water reserve is getting low. In this example a temperature below 42°C in the middle of the water tank will trigger the notification. Note that actual entity name varies between models of heat pumps. You will have to adapt the yaml code to your own installation.

```yaml
automation:
  - alias: "Notify on low hot water reserve"
    triggers:
      - trigger: numeric_state
        entity_id:
          - sensor.your_pump_hot_water_charging_bt6
        below: 42
    actions:
      - action: notify.mobile_app_your_device
        data:
          message: "Hot water reserve is getting low."
          title: "Water heater"
```

## Data updates

The integration will poll the API for data every 60 seconds. This polling interval is designed to work within the rate limits of myUplink APIs while providing timely updates.

## Known limitations

- The integration makes the best effort to map data-points from the API to relevant entities in Home Assistant. However, some sensors may not appear for certain heat-pump models, or in other cases, numerous irrelevant entities might be created. Please create an issue on GitHub and include a diagnostic download file from your installation if you believe that the mapping can be improved.
- Entity names are available in English and cannot be automatically translated by Home Assistant. The reason is that the names are defined by the API and can be changed by updates of the API or the firmware in the appliance. However, most entity names are self-explanatory, e.g., "Room temperature (BT50)".

## Troubleshooting

{% details "Can't log in to myUplink API" %}
Make sure that you have entered the application credentials correctly. A common problem is that leading or trailing spaces are included in the entered credential strings. You may have to delete the application credentials from Home Assistant and install the integration again to get everything right.
{% enddetails %}

## Removing the integration

After removing the integration, go to the myUplink [developer site](https://dev.myuplink.com/apps) and remove the credentials unless you will use them again.

{% include integrations/remove_device_service.md %}
