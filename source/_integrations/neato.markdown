---
title: Neato Botvac
description: Instructions on how to integrate your Neato within Home Assistant.
ha_category:
  - Button
  - Camera
  - Sensor
  - Switch
  - Vacuum
ha_iot_class: Cloud Polling
ha_release: 0.33
ha_config_flow: true
ha_domain: neato
ha_platforms:
  - button
  - camera
  - sensor
  - switch
  - vacuum
ha_integration_type: integration
---

The Neato integration allows you to control your [Neato Botvac Connected Robots][botvac-connected].

There is support for the following platform types within Home Assistant:

- **Camera** - allows you to view the latest cleaning map.
- **Sensor** - allows you to view the battery level.
- **Switch** - allows you to enable or disable the schedule.
- [**Button**](#button) - allows you to dismiss an alert visible in the app.
- [**Vacuum**](#vacuum)

## Prerequisites

Visit [the Neato Developer Network](https://developers.neatorobotics.com/applications) and create a new app.

{% important %}

You will have to enter a name, a description, and the redirect URI:

- **Name**: can be anything you like, for example, "Home Assistant".
- **Description**: can be anything you like, for example, "Home Assistant integration for Neato"
- **Redirect URI**: `https://my.home-assistant.io/redirect/oauth`
- **Terms Of Service URL**: leave blank
- **Privacy Policy URL**: leave blank

You have to select all three scopes (`public_profile`, `control_robots` and `maps`).
{% endimportant %}

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `https://192.168.0.2:8123/auth/external/callback`, `https://homeassistant.local:8123/auth/external/callback`." 

Please note that your instance must be accessible via HTTPS. However, your
instance does not need to be exposed to the Internet.

{% enddetails %}

{% include integrations/config_flow.md %}

The integration configuration will ask for the *Client ID* and *Client Secret* created above. See [Application Credentials](/integrations/application_credentials) for more details.

{% note %}
After the update to firmware 4.0 (which adds cleaning maps) there is also support for displaying the maps of the Botvac D3 Connected and Botvac D5 Connected robots. More information on how to update can be found [here](https://support.neatorobotics.com/hc/en-us/articles/115004320694-Software-Update-4-0-for-Neato-Botvac-Connected-D3-D5-).
{% endnote %}

## Button

Each `neato` vacuum has a _Dismiss alert_ button. This allows to dismiss an alert visible in the app (e.g. dust bin full) and preventing the vacuum to start cleaning.

## Vacuum

The `neato` vacuum platform allows you to control your [Neato Botvac Connected][botvac-connected].
The status will contain attributes on the robots last clean session.

### Actions

Currently supported actions are:

- `start`
- `pause`
- `stop`
- `return_to_base`
- `locate`
- `clean_spot`

And a specific integration-specific action:

- `neato.custom_cleaning`

#### Action `neato.custom_cleaning`

Starts a custom cleaning of your house. You can set the various options like in the mobile application (mode, map usage, navigation mode, zone).

{% note %}
Not all Botvac models support all the attributes. Only the Neato Botvac D7 supports the `zone` attribute.
Some information about the capabilities might be found on the [Neato Developer Portal](https://developers.neatorobotics.com/api/robot-remote-protocol/housecleaning).
{% endnote %}

| Data attribute | Optional | Description                                                                                                                                                                   |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `entity_id`            | no       | Only act on a specific robot                                                                                                                                                  |
| `mode`                 | yes      | Set the cleaning mode: 1 for eco and 2 for turbo. Defaults to turbo if not set.                                                                                               |
| `navigation`           | yes      | Set the navigation mode: 1 for normal, 2 for extra care, 3 for deep. Defaults to normal if not set. Deep cleaning is only supported on the Botvac D7.                                                                           |
| `category`             | yes      | Whether to use a persistent map or not for cleaning (i.e., No go lines): 2 for no map, 4 for map. Default to using map if not set (and fallback to no map if no map is found). |
| `zone`                 | yes      | Only supported on the Botvac D7. Name of the zone to clean from the Neato app. Use unique names for the zones to avoid the wrong zone from running. Defaults to no zone i.e., complete house cleanup.                                                                  |

[botvac-connected]: https://neatorobotics.com/products

## Troubleshooting

### My robot is unavailable

Try to restart the vacuum and wait about 5 minutes to see if it is no longer unavailable. If you are still having issues check the Neato app and make sure your robot is connected and working. If it is not then follow the steps in the app to reset your robot and give it the same name as before then restart Home Assistant.

### My robot is not detected by Home Assistant

Please check your logs if there are any warnings. When there is a message about your robot being offline, check if it is connected to the internet and available though the app. If there is a message about a bad response, try to reset this robot via your app.

### There is a warning about a bad response but everything works as expected

Do you have a stale robot in your configuration? Try to [look into your account](https://neatorobotics.com) and delete any stale robots. If these warnings are about actively used robots, please report an issue to help us solving this problem.

### Server got itself in trouble

If you see this message after trying to set up Neato, please check if the setup still worked or not. If not, try again and make sure you start the process only once. Do not click the "Open External Page" button if a page has already opened by itself. Be patient and wait for the setup to complete.
