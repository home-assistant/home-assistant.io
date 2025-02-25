---
title: Home Connect
description: Instructions on how to set up the Home Connect integration within Home Assistant.
ha_category:
  - Binary sensor
  - Hub
  - Light
  - Number
  - Select
  - Sensor
  - Switch
  - Time
ha_iot_class: Cloud Push
ha_release: '0.110'
ha_domain: home_connect
ha_codeowners:
  - '@DavidMStraub'
  - '@Diegorro98'
ha_config_flow: true
ha_platforms:
  - binary_sensor
  - diagnostics
  - light
  - number
  - select
  - sensor
  - switch
  - time
ha_integration_type: integration
---

The Home Connect integration allows users to integrate their home appliances supporting the Home Connect standard for Bosch and Siemens using the [official cloud API](https://developer.home-connect.com).

## Use cases

- Monitor the multiple sensors of the appliance and trigger automations based on these sensors.
- Start programs on your appliances from your dashboard.
- Monitor the program status of the appliances.
- Control the light of your appliances.
- Adjust the appliance settings.

The integration will add one Home Assistant device for each connected home appliance which will have the following entities:

- A power switch
- If the device has programs:
  - Two select entities that will allow you to select and start a program between the available ones.
  - A timestamp sensor for remaining time and a numeric sensor for the progress percentage.
- Light:
  - Hoods:
    - Functional light: on/off and brightness
    - Ambient light: on/off, brightness, HSV and RGB
  - Dishwasher: on/off, brightness, HS and RGB
  - Cooling appliances: Both, external and internal lights, on/off and brightness
- Numbers that set the temperature of cooling appliances.
- Time for alarm clock for cooktops and ovens.
- Multiple sensors that report the different states and events reported by the appliance.
- Binary sensors that show binary states of the appliance.

{% note %}
Note that it depends on the appliance and on API permissions which of the features are supported.
{% endnote %}

{% note %}
Some devices only have the state `on` and turn off is not supported by the appliance, check [power state availability at Home Connect API documentation](https://api-docs.home-connect.com/settings/#power-state) for more information.
{% endnote %}

## Supported devices

You can find information about supported devices on the [Home Connect website](https://www.home-connect.com/global/smart-home-appliances).

## Prerequisites

1. Visit [https://developer.home-connect.com](https://developer.home-connect.com) and sign up for a developer account.
2. Enter the email of your login for the original Home Connect App from Bosch/Siemens under "Default Home Connect User Account for Testing" in the sign up process.
3. Go to the [Applications](https://developer.home-connect.com/applications) page and select [Register Application](https://developer.home-connect.com/application/add):

- Application ID: Home Assistant (or whatever name makes sense to you)
- OAuth Flow: Authorization Code Grant Flow
- Redirect URI: `https://my.home-assistant.io/redirect/oauth`
- Go to `https://my.home-assistant.io/` and make sure that your Home Assistant URL is set there. For example: `http://homeassistant:8123/` or `http://homeassistant.local:8123`

4. On success, you will be redirected to the **Applications** page. Select **Details** for your app. Make note of the client ID and secret - you will need it for the next step. Log out of the Home Connect developer portal.
5. In Home Assistant, find the Home Connect integration and launch it. You will be prompted to create an [Application Credential](https://www.home-assistant.io/integrations/application_credentials). You will need to provide a name (it's arbitrary) in addition to the Client ID and Secret from the previous step. Then, follow the steps in the UI to complete setup.

{% important %}

- **Power on** all your appliances during the integration configuration process; otherwise, appliance programs list will be empty.
- To update the appliance programs list, you can reload the Home Connect integration when an appliance is turned on. If the re-initialization process is not triggered by reload, restart the Home Assistant when an appliance is turned on.
- After performing the steps above, [log out](https://developer.home-connect.com/user/logout) of your Home Connect Developer account. If you don't do this, the configuration steps below will fail during OAuth authentication with the message `“error”: “unauthorized_client”`.
- The provided Home Connect User Account email address **must** be all lowercase; otherwise, it will result in authentication failures.
- All changes in the developer portal take 15 minutes before the change is implemented.

{% endimportant %}

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

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to [your applications at the Home Connect Developer portal](https://developer.home-connect.com/applications), find the application that you were using for Home Assistant, click on details and click on "Delete Application".

## Actions

The Home Connect integration makes various actions available.
Available actions: `set_option_active`, `set_option_selected`, `pause_program`, `resume_program`, `select_program`, `start_program` and `change_setting`

### Action `home_connect.set_option_active`

Sets an option for the active program.

| Data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `key` | no | Key of the option. |
| `value` | no | Value of the option. |
| `unit` | yes | Unit for the option. |

### Action `home_connect.set_option_selected`

Sets an option for the selected program.

| Data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `key` | no | Key of the option. |
| `value` | no | Value of the option. |
| `unit` | yes | Unit for the option. |

### Action `home_connect.pause_program`

Pauses the current running program.

| Data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |

### Action `home_connect.resume_program`

Resumes a paused program.

| Data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |

### Action `home_connect.select_program`

Selects a program without starting it.

| Data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `program` | no | Program to select. |
| `key` | yes | Key of the option. |
| `value` | yes | Value of the option. |
| `unit` | yes | Unit for the option. |

### Action `home_connect.start_program`

Selects a program and starts it.

| Data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `program` | no | Program to select. |
| `key` | yes | Key of the option. |
| `value` | yes | Value of the option. |
| `unit` | yes | Unit for the option. |

### Action `home_connect.change_setting`

Changes a setting.

| Data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `key` | no | Key of the setting. |
| `value` | no | Value of the setting. |

## Troubleshooting

### I could not configure the Home Connect integration

#### Symptom: I tried to configure the Home Connect integration, but it failed with the message `Error while obtaining access token.`

##### Description

This problem might occur when the application credentials are not correctly configured.

##### Solution

To solve the above issue, follow these steps:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Application credentials**.

    ![Devices and services overflow menu](/images/integrations/application_credentials/devices-and-services-menu.png)

    ![Application credential list](/images/integrations/application_credentials/application-credentials.png)
3. Select the three dots {% icon "mdi:dots-vertical" %} menu from the application credentials you created for the Home Connect integration and select **Delete**.
4. Add the Home Connect integration again under {% my integrations title="**Settings** > **Devices & services**" %}

### Unavailable entities for a device

#### Symptom: "The entities related to an appliance were available but no longer are"

After reloading the Home Connect integration, the entities related to an appliance that used to be available are no longer available.
Also, when downloading the diagnostics data from the device entry, the following data is obtained:

```json
{
  "data": {
    "connected": false,
    "status": {},
    "programs": null
  }
}
```

##### Description

Unavailable entities can have multiple causes:

- The appliance is turned off. When it is turned off, the appliance is disconnected and the API does not retrieve information about the appliance.
- The appliance is experiencing a network issue.
- The Home Connect API is experiencing issues.

##### Solution

To try to solve the above issues, follow these steps:

1. Turn on the appliance and reload the Home Connect integration.
2. If the appliance is turned on and the issue persists, check the network connection of the appliance and perform a soft reset on the appliance.
3. If the issue persists, check the connection of the appliance with the Home Connect API by checking it in the Home Connect app.
   1. Open the Home Connect app.
   2. Go to the appliance that is experiencing the issue.
   3. At the bottom of the screen, open the settings menu.
   4. Go to the **Network** section.
   5. Verify if the appliance is connected to the cloud:
      - If the line between the appliance and the cloud is red and with a red warning icon {% icon "mdi:alert-outline" %}, the appliance is not connected to the Home Connect API.
      - If the line between the appliance and the cloud is green, the appliance is connected to the cloud.
4. If everything is correct and the issue persists, contact Home Connect support.
   - [Home Connect service and contact](https://www.home-connect.com/us/en/support/contact-and-service)
   - [Home Connect developer Help & Support](https://developer.home-connect.com/support)

## Known limitations

- The Home Connect API does not fully match the Home Connect app. Some programs, options, or settings available in the app may not be accessible or usable via the API.
- This integration supports only one integration entry, as the Home Connect API does not allow for the unique identification of an account.

