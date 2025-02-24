---
title: Home Connect
description: Instructions on how to set up the Home Connect integration within Home Assistant.
ha_category:
  - Binary sensor
  - Button
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
  - button
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
- Buttons to pause, resume, and stop the running program, as well as to open the door either completely or partially.

{% note %}
Some appliances don't report data while they are turned off so corresponding entities will not appear in the Home Connect integration after loading until the appliances are turned on.
{% endnote %}

{% note %}
Note that it depends on the appliance and on API permissions which of the features are supported.
{% endnote %}

{% note %}
Some devices only have the state `on` and turn off is not supported by the appliance, check [power state availability at Home Connect API documentation](https://api-docs.home-connect.com/settings/#power-state) for more information.
{% endnote %}

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
Available actions: `set_program_and_options`, and `change_setting`

### Action `home_connect.set_program_and_options`

Starts or selects a program. If the `program` attribute is not set, this action sets the options for the active or the selected program.

| Data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | ID of the device. |
| `affects_to` | no | Selects if the program affected by the action should be the active or the selected program. |
| `program` | yes | Program to select. If set, it will start or select a program depending on `affects_to`. |
| `consumer_products_cleaning_robot_option_reference_map_id` | yes | Defines which reference map is to be used. |
| `consumer_products_cleaning_robot_option_cleaning_mode` | yes | Defines the favoured cleaning mode. |
| `consumer_products_coffee_maker_option_bean_amount` | yes | Describes the amount of coffee beans used in a coffee machine program. |
| `consumer_products_coffee_maker_option_fill_quantity` | yes | Describes the amount of water (in ml) used in a coffee machine program. |
| `consumer_products_coffee_maker_option_coffee_temperature` | yes | Describes the coffee temperature used in a coffee machine program. |
| `consumer_products_coffee_maker_option_bean_container` | yes | Defines the preferred bean container. |
| `consumer_products_coffee_maker_option_flow_rate` | yes | Defines the water-coffee contact time. The duration extends to coffee intensity. |
| `consumer_products_coffee_maker_option_multiple_beverages` | yes | Defines if double dispensing is enabled. |
| `consumer_products_coffee_maker_option_coffee_milk_ratio` | yes | Defines the amount of milk. |
| `consumer_products_coffee_maker_option_hot_water_temperature` | yes | Defines the temperature suitable for the type of tea. |
| `b_s_h_common_option_start_in_relative` | yes | Defines when the program should start, in seconds from now. For example: a value of 9000 means in 2 h 30 min. |
| `dishcare_dishwasher_option_intensiv_zone` | yes | Defines if the cleaning is done with higher spray pressure on the lower basket for very dirty pots and pans. |
| `dishcare_dishwasher_option_brilliance_dry` | yes | Defines if the program sequence is optimized with a special drying cycle to ensure more shine on glasses and plastic items. |
| `dishcare_dishwasher_option_vario_speed_plus` | yes | Defines if the program duration is shortened dynamically (up to 66% less run time) with the usual optimum cleaning and drying. |
| `dishcare_dishwasher_option_silence_on_demand` | yes | Defines if the extra silent mode is activated for a selected period of time. |
| `dishcare_dishwasher_option_half_load` | yes | Defines if economical cleaning is enabled for smaller loads. This reduces energy and water consumption and also saves time. The utensils can be placed in the upper and lower baskets. |
| `dishcare_dishwasher_option_extra_dry` | yes | Defines if improved drying for glasses and plasticware is enabled. |
| `dishcare_dishwasher_option_hygiene_plus` | yes | Defines if the cleaning is done with increased temperatures. This ensures maximum hygienic cleanliness for regular use. |
| `dishcare_dishwasher_option_eco_dry` | yes | Defines if the door is opened automatically for extra energy efficient and effective drying. |
| `dishcare_dishwasher_option_zeolite_dry` | yes | Defines if the program sequence is optimized with special drying cycle ensures improved drying for glasses, plates and plasticware. |
| `laundry_care_dryer_option_drying_target` | yes | Describes the drying target for a dryer program. For example: Iron Dry, Cupboard Dry, Extra Dry. |
| `cooking_hood_option_venting_level` | yes | Defines the required fan setting. |
| `cooking_hood_option_intensive_level` | yes | Defines the intensive setting. |
| `cooking_oven_option_setpoint_temperature` | yes | Defines the target cavity temperature, which will be hold by the oven. |
| `b_s_h_common_option_duration` | yes | Defines the run-time of the program. Afterwards, the appliance is stopped. |
| `cooking_oven_option_fast_pre_heat` | yes | Defines if the cooking compartment is heated up quickly. Please note that the setpoint temperature has to be equal to or higher than 100 °C or 212 °F. Otherwise, the fast pre-heat option is not activated. |
| `cooking_oven_option_warming_level` | yes | Defines the level of the warming drawer. |
| `laundry_care_washer_option_temperature` | yes | Defines the temperature of the washing program. |
| `laundry_care_washer_option_spin_speed` | yes | Defines the spin speed of a washer program. |
| `b_s_h_common_option_finish_in_relative` | yes | Defines when the program should end, in seconds from now. For example: a value of 9000 means in 2 h 30 min. |
| `laundry_care_washer_option_i_dos1_active` | yes | Defines if the detergent feed is activated / deactivated. (i-Dos content 1) |
| `laundry_care_washer_option_i_dos2_active` | yes | Defines if the detergent feed is activated / deactivated. (i-Dos content 2) |
| `laundry_care_washer_option_vario_perfect` | yes | Defines if a cycle saves energy (Eco Perfect) or time (Speed Perfect). |

### Action `home_connect.change_setting`

Changes a setting.

| Data attribute    | Optional | Description                                      |
|---------------------------|----------|--------------------------------------------------|
| `device_id` | no | Id of a device associated with the home appliance. |
| `key` | no | Key of the setting. |
| `value` | no | Value of the setting. |
