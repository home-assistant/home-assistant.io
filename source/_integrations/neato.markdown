---
title: Neato Botvac
description: Instructions on how to integrate your Neato within Home Assistant.
ha_category:
  - Camera
  - Sensor
  - Switch
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.33
ha_config_flow: true
ha_codeowners:
  - '@dshokouhi'
  - '@Santobert'
ha_domain: neato
---

The `neato` integration allows you to control your [Neato Botvac Connected Robots](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/).

To activate `neato` in your installation, you can set it up from the integration screen or add it to your `configuration.yaml` file.

## Setup the integration via the integrations screen

Menu: *Configuration* -> *Integrations*

Search for or select **Neato** from the list and configure the integration. You will need to enter your username and password and whether you are using a Neato or Vorwerk device.
After that, all the entities will automatically show up in Home Assistant.

## Setup the integration via `configuration.yaml`

Add the following to your configuration.yaml:

```yaml
# Example configuration.yaml entry
neato:
  username: YOUR_USERNAME
  password: YOUR_PASSWORD
```

{% configuration %}
username:
  description: Username for the Neato account.
  required: true
  type: string
password:
  description: Password for the Neato account.
  required: true
  type: string
vendor:
  description: Support for additional vendors. Set to `vorwerk` for Vorwerk robots.
  required: false
  type: string
  default: neato
{% endconfiguration %}

<div class='note'>

After the update to firmware 4.0 (which adds cleaning maps) there is also support for displaying the maps of the Botvac D3 Connected and Botvac D5 Connected robots. More information on how to update can be found [here](https://support.neatorobotics.com/hc/en-us/articles/115004320694-Software-Update-4-0-for-Neato-Botvac-Connected-D3-D5-).

</div>

## Vacuum

The `neato` vacuum platform allows you to control your [Neato Botvac Connected](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/).
The status will contain attributes on the robots last clean session.

<div class='note'>
If you notice the robot stops responding to commands check the state to see if the robot is "unavailable". If you see "unavailable" first try to restart the vacuum and wait about 5 minutes to see if it is no longer "unavailable". If you are still having issues check the Neato app and make sure your robot is connected and working. If it is not then follow the steps in the app to reset your robot and give it the same name as before then restart Home Assistant.
</div>

### Services

Currently supported services are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `clean_spot`

And a specific Platform Service:

- `neato.custom_cleaning`

### Platform Services

#### Service `neato.custom_cleaning`

Starts a custom cleaning of your house. You can set the various options like in the mobile application (mode, map usage, navigation mode, zone).

<div class='note'>

Not all Botvac models support all the attributes. Only the Neato Botvac D7 supports the `zone` attribute.
Some information about the capabilities might be found on the [Neato Developer Portal](https://developers.neatorobotics.com/api/robot-remote-protocol/housecleaning).

</div>

| Service data attribute | Optional | Description                                                                                                                                                                   |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | Only act on a specific robot                                                                                                                                                  |
| `mode`                 | yes      | Set the cleaning mode: 1 for eco and 2 for turbo. Defaults to turbo if not set.                                                                                               |
| `navigation`           | yes      | Set the navigation mode: 1 for normal, 2 for extra care, 3 for deep. Defaults to normal if not set. Deep cleaning is only supported on the Botvac D7.                                                                           |
| `category`             | yes      | Whether to use a persistent map or not for cleaning (i.e., No go lines): 2 for no map, 4 for map. Default to using map if not set (and fallback to no map if no map is found). |
| `zone`                 | yes      | Only supported on the Botvac D7. Name of the zone to clean from the Neato app. Use unique names for the zones to avoid the wrong zone from running. Defaults to no zone i.e., complete house cleanup.                                                                  |


## Camera

The `neato` camera platform allows you to view the latest cleaning map of your [Neato Botvac Connected](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/botvac-connected/).

## Sensor

The `neato` sensor platform allows you to view the battery level for your [Neato Botvac Connected](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/botvac-connected/).

## Switch

The `neato` switch platform allows you to enable or disable the schedule of your [Neato Botvac Connected](https://www.neatorobotics.com/robot-vacuum/botvac-connected-series/botvac-connected/).

To add `neato` switch, camera and vacuum to your installation, follow instructions above.
