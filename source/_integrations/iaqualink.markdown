---
title: Jandy iAquaLink
description: Instructions on how to configure Jandy iAquaLink integration.
ha_category:
  - Binary sensor
  - Climate
  - Light
  - Sensor
  - Switch
ha_release: 0.99
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@flz'
ha_domain: iaqualink
ha_platforms:
  - binary_sensor
  - climate
  - light
  - sensor
  - switch
ha_integration_type: hub
ha_quality_scale: bronze
ha_dhcp: true
---

The **Jandy iAquaLink** {% term integration %} lets you monitor and control supported Jandy pool and spa systems from Home Assistant. Depending on the equipment connected to your controller, you can check water and air temperatures, control auxiliary equipment like pumps and water features, manage compatible pool lights, and adjust supported pool or spa heaters.

Use case: Turn on your spa heater before you get home, automate pool lights at sunset, get notified when freeze protection activates, or add your pool equipment status to a dashboard so you can check it at a glance.

## Supported devices

The integration supports pool and spa systems that are managed through the iAquaLink cloud service using one of the following platforms:

- iAquaLink 2.0 (iQ20)
- eXO

The entities that appear in Home Assistant depend on the equipment configured in your iAquaLink system. For example, if your system has a spa heater, pool lights, a cleaner, or a waterfall circuit, Home Assistant can create entities for those features.

## Unsupported devices

Other iAquaLink systems are not supported. Equipment that is not exposed in the iAquaLink app or cloud service also cannot be added to Home Assistant.

## Prerequisites

1. Create an account and log in using either the iAquaLink app or the [iAquaLink website](https://site.iaqualink.net/signin).
2. Add your devices to the account you created in the previous step, typically using their serial numbers.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Username:
    description: "The email address used to sign in to your account using the iAquaLink app or website."
Password:
    description: "The password associated with your account."
{% endconfiguration_basic %}

## Supported functionality

### Entities

The **Jandy iAquaLink** integration provides the following entities.

#### Binary sensors

- **Freeze protection**
  - **Description**: Indicates whether the controller has enabled freeze protection.
  - **Remarks**: Only available on systems that expose freeze protection status.

#### Climate

- **Pool heater** or **spa heater**
  - **Description**: Lets you turn a supported heater on or off and set the target water temperature.
  - **Modes**: Heat, Off
  - **Remarks**: Created only when your iAquaLink system exposes a controllable heater.

#### Lights

- **Pool and spa lights**
  - **Description**: Lets you turn compatible lights on or off.
  - **Remarks**: Some lights also support brightness control or effect selection, depending on the hardware exposed by your iAquaLink system.

#### Sensors

- **Temperature sensors**
  - **Description**: Report numeric values exposed by the controller, such as pool, spa, or air temperature.
  - **Remarks**: Temperature units follow the unit configured in your iAquaLink system.

- **Other numeric sensors**
  - **Description**: Additional numeric readings may be available when your controller exposes them through the cloud service.

#### Switches

- **Auxiliary equipment**
  - **Description**: Lets you turn supported auxiliary circuits on or off.
  - **Examples**: Filter pumps, cleaners, waterfalls, blowers, and other equipment connected to auxiliary relays.
  - **Remarks**: The exact switch entities depend on how your pool or spa system is configured.

## Examples

Examples of automations you can create using the Jandy iAquaLink integration.

### Preheat the spa on a schedule

This automation turns on the spa heater and sets the target temperature every weekday afternoon.

This example assumes your iAquaLink system is configured to use degrees Fahrenheit.

{% details "Example YAML configuration" %}

```yaml
alias: "Preheat spa before evening"
description: >
  Turn on the spa heater and set the target temperature every weekday afternoon.
triggers:
  - trigger: time
    at: "16:30:00"
conditions:
  - condition: time
    weekday:
      - mon
      - tue
      - wed
      - thu
      - fri
actions:
  - action: climate.set_temperature
    target:
      entity_id: climate.spa_heater
    data:
      hvac_mode: heat
      temperature: 100
```

{% enddetails %}

### Notify when freeze protection turns on

This automation sends a notification when your controller activates freeze protection.

{% details "Example YAML configuration" %}

```yaml
alias: "Notify when freeze protection starts"
description: >
  Send a notification when the pool controller enables
  freeze protection.
triggers:
  - trigger: state
    entity_id: binary_sensor.freeze_protection
    to: "on"
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "Pool freeze protection active"
      message: >
        The Jandy controller has enabled freeze protection.
```

{% enddetails %}

## Data updates

This integration uses cloud {% term polling %} to refresh data from your iAquaLink system, like equipment status, sensor readings, and climate values. Home Assistant updates this data approximately every 15 seconds.

## Known limitations

Only equipment exposed through the iAquaLink cloud service can be added to Home Assistant. The entities you see depend on the controller model and the pool or spa equipment configured in the iAquaLink app.

If you need support for another iAquaLink platform, please open a request in the iaqualink-py Python library [repository](https://github.com/flz/iaqualink-py/issues).

## Troubleshooting

{% details "Cannot sign in during setup" %}

**Symptom:** Setup fails with an authentication or login error.

1. Make sure you can sign in to the [iAquaLink website](https://site.iaqualink.net/signin) or the iAquaLink app with the same email address and password.
2. Check for extra spaces or typing mistakes in your email address and password.
3. If you recently changed your password, go to {% my integrations title="**Settings** > **Devices & services**" %}, open the **Jandy iAquaLink** three-dots menu, and select **Reconfigure**.

{% enddetails %}

{% details "Setup succeeds, but no systems or entities appear" %}

**Symptom:** The integration is added, but no pool or spa system shows up in Home Assistant.

1. Confirm the equipment is listed in the iAquaLink app under the same account you used in Home Assistant.
2. Verify your system is in the list of supported systems.
3. If the account contains only unsupported systems, Home Assistant will not create any devices or entities.

{% enddetails %}

{% details "Some equipment is missing" %}

**Symptom:** Your pool or spa system is added, but one or more expected entities are missing.

1. Open the iAquaLink app and confirm the missing equipment is visible and controllable there.
2. The integration only creates entities for equipment exposed by the iAquaLink cloud service.
3. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select **Jandy iAquaLink**, and reload the integration after making changes in the manufacturer's app.

{% enddetails %}

{% details "Entities become unavailable" %}

**Symptom:** One or more iAquaLink entities show as unavailable.

1. Check that Home Assistant has internet access.
2. Open the iAquaLink app or website and verify the controller is online.
3. If the iAquaLink service is unavailable, wait a few minutes and reload the integration.

{% enddetails %}

{% details "Enable debug logging" %}

If you need more detail in the logs, add the following to your YAML configuration:

```yaml
logger:
  default: info
  logs:
    iaqualink: debug
    homeassistant.components.iaqualink: debug
```

After reproducing the issue, check the logs for the integration.

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
