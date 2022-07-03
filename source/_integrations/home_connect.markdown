---
title: Home Connect
description: Instructions on how to set up the Home Connect integration within Home Assistant.
ha_category:
  - Binary Sensor
  - Hub
  - Light
  - Sensor
  - Switch
ha_iot_class: Cloud Push
ha_release: '0.110'
ha_domain: home_connect
ha_codeowners:
  - '@DavidMStraub'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - light
  - sensor
  - switch
ha_integration_type: integration
---

The Home Connect integration allows users to integrate their home appliances supporting the Home Connect standard for Bosch and Siemens using the [official cloud API](https://developer.home-connect.com).

The integration will add one Home Assistant device for each connected home appliance which will have the following entities:

- A power switch
- If the device has programs, switches for each of the individual programs will be added. Note that program options cannot be configured currently.
- If the device has programs, a timestamp sensor for remaining time and a numeric sensor for the progress percentage.
- For hood's functional light a light switch including brightness control will be added.
- For hood's and dishwasher's ambient light a light switch including brightness and color control will be added.

Note that it depends on the appliance and on API permissions which of the features are supported.

## Prerequisites

1. Visit [https://developer.home-connect.com](https://developer.home-connect.com) and sign up for a developer account.
2. Enter the email of your login for the original Home Connect App from Bosch/Siemens under "Default Home Connect User Account for Testing" in the sign up process.
3. Under [Applications](https://developer.home-connect.com/applications), register a new App:

- Application ID: Home Assistant (or whatever name makes sense to you)
- OAuth Flow: Authorization Code Grant Flow
- Redirect URI: `https://my.home-assistant.io/redirect/oauth`

{% details "I have manually disabled My Home Assistant" %}

If you don't have [My Home Assistant](/integrations/my) on your installation,
you can use `<HOME_ASSISTANT_URL>/auth/external/callback` as the redirect URI
instead.

The `<HOME_ASSISTANT_URL>` must be the same as used during the configuration/
authentication process.

Internal examples: `http://192.168.0.2:8123/auth/external/callback`, `http://homeassistant.local:8123/auth/external/callback`." 

{% enddetails %}

{% include integrations/config_flow.md %}

The integration configuration will ask for the *Client ID* and *Client Secret* created above. See [Application Credentials](/integrations/application_credentials) for more details.

## Services

The Home Connect integration makes various services available.
Available services: `set_option_active`, `set_option_selected`, `pause_program`, `resume_program`, `select_program`, `start_program` and `change_setting`

### Service `home_connect.set_option_active`

Sets an option for the active program.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `key` | no | Key of the option. |
| `value` | no | Value of the option. |
| `unit` | yes | Unit for the option. |

### Service `home_connect.set_option_selected`

Sets an option for the selected program.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `key` | no | Key of the option. |
| `value` | no | Value of the option. |
| `unit` | yes | Unit for the option. |

### Service `home_connect.pause_program`

Pauses the current running program.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |

### Service `home_connect.resume_program`

Resumes a paused program.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |

### Service `home_connect.select_program`

Selects a program without starting it.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `program` | no | Program to select. |
| `key` | yes | Key of the option. |
| `value` | yes | Value of the option. |
| `unit` | yes | Unit for the option. |

### Service `home_connect.start_program`

Selects a program and starts it.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `program` | no | Program to select. |
| `key` | yes | Key of the option. |
| `value` | yes | Value of the option. |
| `unit` | yes | Unit for the option. |

### Service `home_connect.change_setting`

Changes a setting.

| Service data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `key` | no | Key of the setting. |
| `value` | no | Value of the setting. |
