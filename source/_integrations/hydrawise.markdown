---
title: Hunter Hydrawise
description: Instructions on how to integrate your Hunter Hydrawise Wi-Fi irrigation control system within Home Assistant.
ha_categories:
  - garden_plants
ha_config_flow: true
ha_release: 0.71
ha_iot_class: Cloud Polling
ha_domain: hydrawise
ha_codeowners:
  - '@dknowles2'
  - '@thomaskistler'
  - '@ptcryan'
  - '@frenck'
ha_platforms:
  - binary_sensor
  - sensor
  - switch
  - valve
ha_integration_type: hub
---

The **Hunter Hydrawise** {% term integration %} allows you to integrate your [Hunter Hydrawise](https://hydrawise.com) Wi-Fi irrigation controller system in Home Assistant.

You can see when your zones water and how much water they use, start and stop zones, and pause the automatic watering schedule. For example, skip watering when it rains, get a notification when a zone starts, or track your garden's water use on the energy dashboard.

## Supported devices

The following Hydrawise controllers are known to be supported:

- Pro-HC
- HPC
- HCC
- X2 with the WAND module
- HC (discontinued, but still supported)

Rain sensors and flow meters that are connected to the controller are supported as well.

## Prerequisites

1. To set up the Hydrawise integration, you must first set up an online account at
[https://app.hydrawise.com](https://app.hydrawise.com).
2. Generate an API key in the **Account Details** section of the Hydrawise app.
3. Then, use your online credentials and the API key to configure the integration.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
  description: "The email address you use to sign in to your Hydrawise account."
Password:
  description: "The password of your Hydrawise account."
API key:
  description: "The API key of your Hydrawise account. You can generate one in the **Account Details** section of the Hydrawise app."
{% endconfiguration_basic %}

## Supported functionality

The integration adds a device for each controller, and a device for each irrigation zone of a controller.

### Controllers

- **Connectivity**: Whether the controller is connected to the Hydrawise cloud service.
- **Rain sensor**: Whether the rain sensor detects rain. Only added when a rain sensor is connected to the controller.
- **Daily active watering time**: How long the zones of the controller watered today.
- **Daily total water use**, **Daily active water use**, and **Daily inactive water use**: How much water went through the flow meter today, in total, while a zone was watering, and while no zone was watering. Only added when a flow meter is connected to the controller.

### Zones

- **Valve**: Opens and closes the zone. An opened zone runs for the default watering duration of the zone, as set in the Hydrawise [mobile or web app](https://www.hydrawise.com).
- **Watering**: Whether the zone is watering.
- **Next cycle**: When the next scheduled watering cycle of the zone starts.
- **Remaining watering time**: How many minutes of the current watering cycle are left.
- **Daily active watering time**: How long the zone watered today.
- **Daily active water use**: How much water the zone used today. Only added when a flow meter is connected to the controller.
- **Automatic watering**: Turns the watering schedule of the zone on or off.
- **Manual watering**: Starts or stops watering the zone.

When **Automatic watering** is turned on, the zone follows the Smart Watering schedule set in the Hydrawise [mobile or web app](https://www.hydrawise.com). When it's turned off, the schedule of the zone is suspended for 1 year.

When **Manual watering** is turned on, the zone runs for 15 minutes.

{% note %}
Due to changes in the Hydrawise API the status of the Auto Watering switches has changed. Under normal conditions the Auto Watering switches correctly reflect the Smart Watering schedule on the Hydrawise mobile or web app. However, if a rain sensor is connected to the system and it is active (rain detected), or the zone is running the Auto Watering switch will turn off. After both of those conditions are removed the switch will again show the correct Auto Watering condition.
{% endnote %}

The daily water use sensors can be added to the [energy dashboard](/docs/energy/water/) to track your garden's water use over time. The daily inactive water use is left out of the long-term statistics, as its value can drop during the day.

{% include integrations/actions.md %}

## Examples

{% include docs/paste_yaml_tip.md %}

### Automation: Skip watering when it rains

If you have a rain gauge or a weather station in Home Assistant, you can use it to pause the watering schedule of a zone for a day once it starts raining.

- **Trigger**: State of your rain sensor changes to **On**
- **Action**: Hydrawise: Suspend automatic watering of the zone, until tomorrow

{% details "YAML example for skipping watering when it rains" %}

{% example %}
automation: |
  alias: "Skip watering the front lawn when it rains"
  triggers:
    - trigger: state
      entity_id: binary_sensor.rain_gauge
      to: "on"
  actions:
    - action: hydrawise.suspend
      target:
        entity_id: binary_sensor.front_lawn_watering
      data:
        until: "{{ (now() + timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S') }}"
{% endexample %}

{% enddetails %}

### Automation: Get notified when a zone starts watering

- **Trigger**: State of the **Watering** binary sensor of the zone changes to **On**
- **Action**: Send a notification

{% details "YAML example for a notification when watering starts" %}

{% example %}
automation: |
  alias: "Notify when the front lawn starts watering"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_lawn_watering
      to: "on"
  actions:
    - action: notify.notify
      data:
        message: "The front lawn started watering."
{% endexample %}

{% enddetails %}

## Data updates

The **Hunter Hydrawise** integration {% term polling polls %} the Hydrawise cloud service for the state of your controllers and zones every 5 minutes, and for the water use every hour.

Hydrawise strictly limits how often its API can be used. To stay within those limits, the integration spreads its requests over the available budget and can show data from an earlier request when the budget runs out.

A controller checks in with the Hydrawise cloud service about every 15 seconds, sometimes less often. A command, like opening a valve, takes effect the next time the controller checks in. Home Assistant shows the state you set right away, and the state reported by the controller with a later update.

## Known limitations

- The integration works through the Hydrawise cloud service. It needs an internet connection, and there is no local control of the controller.
- States can take up to a few minutes to update, as described under [Data updates](#data-updates).
- The water use sensors require a flow meter connected to the controller.
- The watering schedules and programs can't be changed from Home Assistant. Use the Hydrawise app for that.
- **Manual watering** always runs a zone for 15 minutes, and opening a **Valve** runs it for its default watering duration. To water for a different duration, use the [start watering](#list-of-actions) action.

## Troubleshooting

{% details "Can't set up the integration" %}

### Symptom: "Invalid authentication"

When trying to set up the integration, the form shows the message "Invalid authentication".

#### Description

Hydrawise didn't accept the username, password, or API key.

#### Resolution

1. Make sure you can sign in to the Hydrawise app with the same username and password.
2. Generate a new API key in the **Account Details** section of the Hydrawise app, and use that one.

If the integration was already set up and stopped working after you changed your password or API key, Home Assistant asks you to reauthenticate. You can also update the credentials yourself: go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Hunter Hydrawise**, select the three dots {% icon "mdi:dots-vertical" %} menu next to the entry, and select **Reconfigure**.

{% enddetails %}

{% details "Entities are unavailable" %}

### Symptom: The entities of a controller are unavailable

#### Description

The controller isn't connected to the Hydrawise cloud service. The **Connectivity** binary sensor of the controller shows the connection.

#### Resolution

1. Check that the controller has power and is connected to your Wi-Fi network.
2. Check that the Hydrawise app shows the controller as online.

{% enddetails %}

{% details "States update slowly" %}

### Symptom: A zone started or stopped, but Home Assistant shows it minutes later

#### Description

Home Assistant only learns about changes the next time it updates the data, as described under [Data updates](#data-updates).

#### Resolution

This is expected. Don't add your own automations that update the Hydrawise entities more often: Hydrawise limits how often its API can be used, and too many requests can get your account blocked.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}
