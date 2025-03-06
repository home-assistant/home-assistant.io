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
  - '@MartinHjelmare'
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

## Use cases

- Monitor the multiple sensors of the appliance and trigger automations based on these sensors.
- Start programs on your appliances from your dashboard.
- Monitor the program status of the appliances.
- Control the light of your appliances.
- Adjust the appliance settings.

{% note %}
Note that it depends on the appliance and on API permissions which of the features are supported.
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

## Supported functionality

{% note %}

- The entities availability depends on the appliance type, but the appliance might not support all the entities for its type.
- Some appliances don't report data while they are turned off, so corresponding entities will not appear in the Home Connect integration after loading until the appliances are turned on.
{% endnote %}

### Binary sensor

{% details "List of binary sensors" %}

- **Connectivity**:
  - **Description**: Shows the connectivity status of the appliance.
  - **Availability**: All appliances
- **Remote control**:
  - **Description**: Indicates if the remote control is enabled.
  - **Availability**: Cooktop, Hood, Oven, Warming Drawer, Dishwasher, Washer, Dryer, Washer Dryer
- **Remote start**:
  - **Description**: Indicates if a program can be started remotely.
  - **Availability**: Coffee maker, Hood, Oven, Warming Drawer, Dishwasher, Washer, Dryer, Washer Dryer
- **Local control**:
  - **Description**: Indicates whether the home appliance is currently physically controlled by the user.
  - **Availability**: Coffee maker, Cooktop, Hood, Oven, Warming Drawer, Washer, Dryer, Washer Dryer
- **Bottle cooler door**:
  - **Description**: Indicates if the bottle cooler door is open.
  - **Availability**: Fridge freezer, Refrigerator
- **Chiller door**:
  - **Description**: Indicates if the chiller door is open.
  - **Availability**: Fridge freezer, Refrigerator
- **Flex compartment door**:
  - **Description**: Indicates if the flex compartment door is open.
  - **Availability**: Fridge freezer
- **Freezer door**:
  - **Description**: Indicates if the freezer door is open.
  - **Availability**: Freezer, Fridge freezer
- **Refrigerator door**:
  - **Description**: Indicates if the refrigerator door is open.
  - **Availability**: Fridge freezer, Refrigerator
- **Wine compartment door**:
  - **Description**: Indicates if the wine compartment door is open.
  - **Availability**: Wine cooler
- **Battery charging state**:
  - **Description**: Describes if the appliance is charging or discharging.
  - **Availability**: Cleaning robot
- **Charging connection**:
  - **Description**: Indicates if the appliance is connected or disconnected.
  - **Availability**: Cleaning robot

{% enddetails %}

### Button

{% details "List of buttons" %}

- **Stop program**:
  - **Description**: Stops the active program.
  - **Availability**: All the appliances with programs
- **Pause program**
  - **Description**: Pauses the active program.
  - **Availability**: Oven, Cleaning robot, Washer, Dryer, Washer dryer
- **Resume program**
  - **Description**: Resumes the paused program.
  - **Availability**: Oven, Cleaning robot, Dishwasher, Washer, Dryer, Washer dryer
- **Open door**
  - **Description**: Opens the door of the appliance.
  - **Availability**: Oven, Freezer, Fridge freezer, Refrigerator
- **Partial open door**
  - **Description**: Opens the door of the appliance partially.
  - **Availability**: Oven

{% enddetails %}

### Light

{% details "List of light entities" %}

- **Internal light**:
  - **Description**: Controls the internal light of cooling appliances.
  - **Availability**: Freezer, Fridge freezer, Refrigerator, Wine cooler
  - **Controls**: On/off, brightness
- **External light**:
  - **Description**: Controls the external light of cooling appliances.
  - **Availability**: Freezer, Fridge freezer, Refrigerator, Wine cooler
  - **Controls**: On/off, brightness
- **Functional light**:
  - **Description**: Controls the functional light of a hood.
  - **Availability**: Hood
  - **Controls**: On/off, brightness
- **Ambient light**:
  - **Description**: Controls the ambient light of an appliance.
  - **Availability**: Hood, Dishwasher
  - **Controls**: On/off, brightness, HSV, RGB

{% enddetails %}

### Number

{% details "List of number entities" %}

#### Settings

- **Refrigerator setpoint temperature**:
  - **Description**: Sets the refrigerator temperature.
  - **Availability**: Fridge freezer, Refrigerator
- **Freezer setpoint temperature**:
  - **Description**: Sets the freezer temperature.
  - **Availability**: Freezer, Fridge freezer
- **Bottle cooler setpoint temperature**:
  - **Description**: Sets the bottle cooler temperature.
  - **Availability**: Fridge freezer, Refrigerator
- **Chiller setpoint temperature**:
  - **Description**: Sets the chiller temperature.
  - **Availability**: Fridge freezer, Refrigerator
- **Left Chiller setpoint temperature**:
  - **Description**: Sets the left chiller temperature.
  - **Availability**: Fridge freezer, Refrigerator
- **Right Chiller setpoint temperature**:
  - **Description**: Sets the right chiller temperature.
  - **Availability**: Fridge freezer, Refrigerator
- **Wine compartment setpoint temperature**:
  - **Description**: Sets the wine compartment temperature.
  - **Availability**: Wine cooler
- **Wine compartment 2 setpoint temperature**:
  - **Description**: Sets the second wine compartment temperature.
  - **Availability**: Wine cooler
- **Wine compartment 3 setpoint temperature**:
  - **Description**: Sets the third wine compartment temperature.
  - **Availability**: Wine cooler
- **Color temperature percent**:
  - **Description**: Sets the color temperature of the functional light in percent (warm light: 0 %, cold light: 100 %). To use it, Color temperature select entity must be set to `custom`.
  - **Availability**: Hood
- **i-Dos 1 Base Level**:
  - **Description**: Sets the basis dosing volume for i-Dos content 1.
  - **Availability**: Washer, Washer dryer
- **i-Dos 2 Base Level**:
  - **Description**: Sets the basis dosing volume for i-Dos content 2.
  - **Availability**: Washer, Washer dryer

#### Program options

- **Duration**:
  - **Description**: Defines the run-time of the program. Afterwards, the appliance is stopped.
  - **Availability**: Oven
- **Start in relative**:
  - **Description**: Defines when the program should start, in seconds from now.
  - **Availability**: Oven, Dishwasher
- **Finish in relative**:
  - **Description**: Defines when the program should end, in seconds from now.
  - **Availability**: Dryer, Washer, Washer dryer
- **Fill quantity**:
  - **Description**: Describes the amount of water (in ml) used in a coffee machine program.
  - **Availability**: Coffee maker
- **Setpoint temperature**:
  - **Description**: Defines the target cavity temperature, which will be held by the oven.
  - **Availability**: Oven

{% enddetails %}

### Select

{% details "List of select entities" %}

#### Programs

- **Active program**:
  - **Description**: Represents the active program of the appliance, and selecting an option will start the program.
  - **Availability**: All the appliances with programs
- **Selected program**:
  - **Description**: Represents the selected program of the appliance, and selecting an option will select the program.
  - **Availability**: All the appliances with programs

{% details "Program options" %}
Both entities can use these options, but the availability of these will depend on the appliance.

- **Clean all**: `consumer_products_cleaning_robot_program_cleaning_clean_all`
- **Clean map**: `consumer_products_cleaning_robot_program_cleaning_clean_map`
- **Go home**: `consumer_products_cleaning_robot_program_basic_go_home`
- **Ristretto**: `consumer_products_coffee_maker_program_beverage_ristretto`
- **Espresso**: `consumer_products_coffee_maker_program_beverage_espresso`
- **Espresso doppio**: `consumer_products_coffee_maker_program_beverage_espresso_doppio`
- **Coffee**: `consumer_products_coffee_maker_program_beverage_coffee`
- **XL coffee**: `consumer_products_coffee_maker_program_beverage_x_l_coffee`
- **Caffe grande**: `consumer_products_coffee_maker_program_beverage_caffe_grande`
- **Espresso macchiato**: `consumer_products_coffee_maker_program_beverage_espresso_macchiato`
- **Cappuccino**: `consumer_products_coffee_maker_program_beverage_cappuccino`
- **Latte macchiato**: `consumer_products_coffee_maker_program_beverage_latte_macchiato`
- **Caffe latte**: `consumer_products_coffee_maker_program_beverage_caffe_latte`
- **Milk froth**: `consumer_products_coffee_maker_program_beverage_milk_froth`
- **Warm milk**: `consumer_products_coffee_maker_program_beverage_warm_milk`
- **Kleiner brauner**: `consumer_products_coffee_maker_program_coffee_world_kleiner_brauner`
- **Grosser brauner**: `consumer_products_coffee_maker_program_coffee_world_grosser_brauner`
- **Verlaengerter**: `consumer_products_coffee_maker_program_coffee_world_verlaengerter`
- **Verlaengerter braun**: `consumer_products_coffee_maker_program_coffee_world_verlaengerter_braun`
- **Wiener melange**: `consumer_products_coffee_maker_program_coffee_world_wiener_melange`
- **Flat white**: `consumer_products_coffee_maker_program_coffee_world_flat_white`
- **Cortado**: `consumer_products_coffee_maker_program_coffee_world_cortado`
- **Cafe cortado**: `consumer_products_coffee_maker_program_coffee_world_cafe_cortado`
- **Cafe con leche**: `consumer_products_coffee_maker_program_coffee_world_cafe_con_leche`
- **Cafe au lait**: `consumer_products_coffee_maker_program_coffee_world_cafe_au_lait`
- **Doppio**: `consumer_products_coffee_maker_program_coffee_world_doppio`
- **Kaapi**: `consumer_products_coffee_maker_program_coffee_world_kaapi`
- **Koffie verkeerd**: `consumer_products_coffee_maker_program_coffee_world_koffie_verkeerd`
- **Galao**: `consumer_products_coffee_maker_program_coffee_world_galao`
- **Garoto**: `consumer_products_coffee_maker_program_coffee_world_garoto`
- **Americano**: `consumer_products_coffee_maker_program_coffee_world_americano`
- **Red eye**: `consumer_products_coffee_maker_program_coffee_world_red_eye`
- **Black eye**: `consumer_products_coffee_maker_program_coffee_world_black_eye`
- **Dead eye**: `consumer_products_coffee_maker_program_coffee_world_dead_eye`
- **Hot water**: `consumer_products_coffee_maker_program_beverage_hot_water`
- **Pre_rinse**: `dishcare_dishwasher_program_pre_rinse`
- **Auto 1**: `dishcare_dishwasher_program_auto_1`
- **Auto 2**: `dishcare_dishwasher_program_auto_2`
- **Auto 3**: `dishcare_dishwasher_program_auto_3`
- **Eco 50ºC**: `dishcare_dishwasher_program_eco_50`
- **Quick 45ºC**: `dishcare_dishwasher_program_quick_45`
- **Intensive 70ºC**: `dishcare_dishwasher_program_intensiv_70`
- **Normal 65ºC**: `dishcare_dishwasher_program_normal_65`
- **Glass 40ºC**: `dishcare_dishwasher_program_glas_40`
- **Glass care**: `dishcare_dishwasher_program_glass_care`
- **Night wash**: `dishcare_dishwasher_program_night_wash`
- **Quick 65ºC**: `dishcare_dishwasher_program_quick_65`
- **Normal 45ºC**: `dishcare_dishwasher_program_normal_45`
- **Intensive 45ºC**: `dishcare_dishwasher_program_intensiv_45`
- **Auto half load**: `dishcare_dishwasher_program_auto_half_load`
- **Intensive power**: `dishcare_dishwasher_program_intensiv_power`
- **Magic daily**: `dishcare_dishwasher_program_magic_daily`
- **Super 60ºC**: `dishcare_dishwasher_program_super_60`
- **Kurz 60ºC**: `dishcare_dishwasher_program_kurz_60`
- **Express sparkle 65ºC**: `dishcare_dishwasher_program_express_sparkle_65`
- **Machine care**: `dishcare_dishwasher_program_machine_care`
- **Steam fresh**: `dishcare_dishwasher_program_steam_fresh`
- **Maximum cleaning**: `dishcare_dishwasher_program_maximum_cleaning`
- **Mixed load**: `dishcare_dishwasher_program_mixed_load`
- **Cotton**: `laundry_care_dryer_program_cotton`
- **Synthetic**: `laundry_care_dryer_program_synthetic`
- **Mix**: `laundry_care_dryer_program_mix`
- **Blankets**: `laundry_care_dryer_program_blankets`
- **Business shirts**: `laundry_care_dryer_program_business_shirts`
- **Down feathers**: `laundry_care_dryer_program_down_feathers`
- **Hygiene**: `laundry_care_dryer_program_hygiene`
- **Jeans**: `laundry_care_dryer_program_jeans`
- **Outdoor**: `laundry_care_dryer_program_outdoor`
- **Synthetic refresh**: `laundry_care_dryer_program_synthetic_refresh`
- **Towels**: `laundry_care_dryer_program_towels`
- **Delicates**: `laundry_care_dryer_program_delicates`
- **Super 40ºC**: `laundry_care_dryer_program_super_40`
- **Shirts 15ºC**: `laundry_care_dryer_program_shirts_15`
- **Pillow**: `laundry_care_dryer_program_pillow`
- **Anti shrink**: `laundry_care_dryer_program_anti_shrink`
- **My drying time**: `laundry_care_dryer_program_my_time_my_drying_time`
- **Cold (variable time)**: `laundry_care_dryer_program_time_cold`
- **Warm (variable time)**: `laundry_care_dryer_program_time_warm`
- **In basket**: `laundry_care_dryer_program_in_basket`
- **Cold (20 min)**: `laundry_care_dryer_program_time_cold_fix_time_cold_20`
- **Cold (30 min)**: `laundry_care_dryer_program_time_cold_fix_time_cold_30`
- **Cold (60 min)**: `laundry_care_dryer_program_time_cold_fix_time_cold_60`
- **Warm (30 min)**: `laundry_care_dryer_program_time_warm_fix_time_warm_30`
- **Warm (40 min)**: `laundry_care_dryer_program_time_warm_fix_time_warm_40`
- **Warm (60 min)**: `laundry_care_dryer_program_time_warm_fix_time_warm_60`
- **Dessous**: `laundry_care_dryer_program_dessous`
- **Automatic**: `cooking_common_program_hood_automatic`
- **Venting**: `cooking_common_program_hood_venting`
- **Delayed shut off**: `cooking_common_program_hood_delayed_shut_off`
- **Pre-heating**: `cooking_oven_program_heating_mode_pre_heating`
- **Hot air**: `cooking_oven_program_heating_mode_hot_air`
- **Hot air eco**: `cooking_oven_program_heating_mode_hot_air_eco`
- **Hot air grilling**: `cooking_oven_program_heating_mode_hot_air_grilling`
- **Top bottom heating**: `cooking_oven_program_heating_mode_top_bottom_heating`
- **Top bottom heating eco**: `cooking_oven_program_heating_mode_top_bottom_heating_eco`
- **Bottom heating**: `cooking_oven_program_heating_mode_bottom_heating`
- **Pizza setting**: `cooking_oven_program_heating_mode_pizza_setting`
- **Slow cook**: `cooking_oven_program_heating_mode_slow_cook`
- **Intensive heat**: `cooking_oven_program_heating_mode_intensive_heat`
- **Keep warm**: `cooking_oven_program_heating_mode_keep_warm`
- **Preheat ovenware**: `cooking_oven_program_heating_mode_preheat_ovenware`
- **Special Heat-Up for frozen products**: `cooking_oven_program_heating_mode_frozen_heatup_special`
- **Desiccation**: `cooking_oven_program_heating_mode_desiccation`
- **Defrost**: `cooking_oven_program_heating_mode_defrost`
- **Proof**: `cooking_oven_program_heating_mode_proof`
- **Hot air + 30 RH**: `cooking_oven_program_heating_mode_hot_air_30_steam`
- **Hot air + 60 RH**: `cooking_oven_program_heating_mode_hot_air_60_steam`
- **Hot air + 80 RH**: `cooking_oven_program_heating_mode_hot_air_80_steam`
- **Hot air + 100 RH**: `cooking_oven_program_heating_mode_hot_air_100_steam`
- **Sabbath programme**: `cooking_oven_program_heating_mode_sabbath_programme`
- **90 Watt**: `cooking_oven_program_microwave_90_watt`
- **180 Watt**: `cooking_oven_program_microwave_180_watt`
- **360 Watt**: `cooking_oven_program_microwave_360_watt`
- **600 Watt**: `cooking_oven_program_microwave_600_watt`
- **900 Watt**: `cooking_oven_program_microwave_900_watt`
- **1000 Watt**: `cooking_oven_program_microwave_1000_watt`
- **Max**: `cooking_oven_program_microwave_max`
- **Warming drawer**: `cooking_oven_program_heating_mode_warming_drawer`
- **Cotton**: `laundry_care_washer_program_cotton`
- **Cotton eco**: `laundry_care_washer_program_cotton_cotton_eco`
- **Cotton eco 40/60ºC**: `laundry_care_washer_program_cotton_eco_4060`
- **Cotton color**: `laundry_care_washer_program_cotton_colour`
- **Easy care**: `laundry_care_washer_program_easy_care`
- **Mix**: `laundry_care_washer_program_mix`
- **Mix night wash**: `laundry_care_washer_program_mix_night_wash`
- **Delicates silk**: `laundry_care_washer_program_delicates_silk`
- **Wool**: `laundry_care_washer_program_wool`
- **Sensitive**: `laundry_care_washer_program_sensitive`
- **Auto 30ºC**: `laundry_care_washer_program_auto_30`
- **Auto 40ºC**: `laundry_care_washer_program_auto_40`
- **Auto 60ºC**: `laundry_care_washer_program_auto_60`
- **Chiffon**: `laundry_care_washer_program_chiffon`
- **Curtains**: `laundry_care_washer_program_curtains`
- **Dark wash**: `laundry_care_washer_program_dark_wash`
- **Dessous**: `laundry_care_washer_program_dessous`
- **Monsoon**: `laundry_care_washer_program_monsoon`
- **Outdoor**: `laundry_care_washer_program_outdoor`
- **Plush toy**: `laundry_care_washer_program_plush_toy`
- **Shirts blouses**: `laundry_care_washer_program_shirts_blouses`
- **Sport fitness**: `laundry_care_washer_program_sport_fitness`
- **Towels**: `laundry_care_washer_program_towels`
- **Water proof**: `laundry_care_washer_program_water_proof`
- **Power speed <59 min**: `laundry_care_washer_program_power_speed_59`
- **Super 15 min**: `laundry_care_washer_program_super_153045_super_15`
- **Super 15/30 min**: `laundry_care_washer_program_super_153045_super_1530`
- **Down duvet**: `laundry_care_washer_program_down_duvet_duvet`
- **Rinse spin drain**: `laundry_care_washer_program_rinse_rinse_spin_drain`
- **Drum clean**: `laundry_care_washer_program_drum_clean`
- **Cotton**: `laundry_care_washer_dryer_program_cotton`
- **Cotton eco 40/60ºC**: `laundry_care_washer_dryer_program_cotton_eco_4060`
- **Mix**: `laundry_care_washer_dryer_program_mix`
- **Easy care**: `laundry_care_washer_dryer_program_easy_care`
- **Wash and dry (60 min)**: `laundry_care_washer_dryer_program_wash_and_dry_60`
- **Wash and dry (90 min)**: `laundry_care_washer_dryer_program_wash_and_dry_90`

{% enddetails %}

#### Settings

- **Current map**:
  - **Description**: Represents the currently selected map of the cleaning robot.
  - **Availability**: Cleaning robot
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Temporary map**: `consumer_products_cleaning_robot_option_reference_map_id_temp_map`
    - **Map 1**:`consumer_products_cleaning_robot_option_reference_map_id_map_1`
    - **Map 2**:`consumer_products_cleaning_robot_option_reference_map_id_map_2`
    - **Map 3**:`consumer_products_cleaning_robot_option_reference_map_id_map_3`

    </details>
- **Functional light color temperature**:
  - **Description**: Represents the color temperature of the functional light.
  - **Availability**: Hood
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Custom**: `cooking_hood_enum_type_color_temperature_custom`
    - **Warm**: `cooking_hood_enum_type_color_temperature_warm`
    - **Warm to Neutral**: `cooking_hood_enum_type_color_temperature_warm_to_neutral`
    - **Neutral**: `cooking_hood_enum_type_color_temperature_neutral`
    - **Neutral to Cold**: `cooking_hood_enum_type_color_temperature_neutral_to_cold`
    - **Cold**: `cooking_hood_enum_type_color_temperature_cold`

    </details>
- **Ambient light color**:
  - **Description**: Represents the color of the ambient light.
  - **Availability**: Hood, Dishwasher
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Custom**: `b_s_h_common_enum_type_ambient_light_color_custom_color`
    - **1**: `b_s_h_common_enum_type_ambient_light_color_color_1`
    - ...
    - **99**: `b_s_h_common_enum_type_ambient_light_color_color_99`

    </details>

#### Program options

- **Reference map ID**:
  - **Description**: Defines which reference map is to be used.
  - **Availability**: Cleaning robot
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Temporary map**: `consumer_products_cleaning_robot_option_reference_map_id_temp_map`
    - **Map 1**:`consumer_products_cleaning_robot_option_reference_map_id_map_1`
    - **Map 2**:`consumer_products_cleaning_robot_option_reference_map_id_map_2`
    - **Map 3**:`consumer_products_cleaning_robot_option_reference_map_id_map_3`

    </details>
- **Cleaning mode**:
  - **Description**: Defines the favoured cleaning mode.
  - **Availability**: Cleaning robot
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Silent**: `consumer_products_cleaning_robot_enum_type_cleaning_modes_silent`
    - **Standard**: `consumer_products_cleaning_robot_enum_type_cleaning_modes_standard`
    - **Power**: `consumer_products_cleaning_robot_enum_type_cleaning_modes_power`

    </details>
- **Bean amount**:
  - **Description**: Represents the amount of coffee beans used in a coffee machine program.
  - **Availability**: Coffee maker
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Very mild**: `consumer_products_coffee_maker_enum_type_bean_amount_very_mild`
    - **Mild**: `consumer_products_coffee_maker_enum_type_bean_amount_mild`
    - **Mild +**: `consumer_products_coffee_maker_enum_type_bean_amount_mild_plus`
    - **Normal**: `consumer_products_coffee_maker_enum_type_bean_amount_normal`
    - **Normal +**: `consumer_products_coffee_maker_enum_type_bean_amount_normal_plus`
    - **Strong**: `consumer_products_coffee_maker_enum_type_bean_amount_strong`
    - **Strong +**: `consumer_products_coffee_maker_enum_type_bean_amount_strong_plus`
    - **Very strong**: `consumer_products_coffee_maker_enum_type_bean_amount_very_strong`
    - **Very strong +**: `consumer_products_coffee_maker_enum_type_bean_amount_very_strong_plus`
    - **Extra strong**: `consumer_products_coffee_maker_enum_type_bean_amount_extra_strong`
    - **Double shot**: `consumer_products_coffee_maker_enum_type_bean_amount_double_shot`
    - **Double shot +**: `consumer_products_coffee_maker_enum_type_bean_amount_double_shot_plus`
    - **Double shot ++**: `consumer_products_coffee_maker_enum_type_bean_amount_double_shot_plus_plus`
    - **Triple shot**: `consumer_products_coffee_maker_enum_type_bean_amount_triple_shot`
    - **Triple shot +**: `consumer_products_coffee_maker_enum_type_bean_amount_triple_shot_plus`
    - **Coffee ground**: `consumer_products_coffee_maker_enum_type_bean_amount_coffee_ground`

    </details>
- **Coffee temperature**:
  - **Description**: Represents the coffee temperature used in a coffee machine program.
  - **Availability**: Coffee maker
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **88ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_88_c`
    - **90ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_90_c`
    - **92ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_92_c`
    - **94ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_94_c`
    - **95ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_95_c`
    - **96ºC**: `consumer_products_coffee_maker_enum_type_coffee_temperature_96_c`

    </details>
- **Bean container**:
  - **Description**: Defines the preferred bean container.
  - **Availability**: Coffee maker
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Left**: `consumer_products_coffee_maker_enum_type_bean_container_selection_right`
    - **Right**: `consumer_products_coffee_maker_enum_type_bean_container_selection_left`

    </details>
- **Flow rate**:
  - **Description**: Defines the water-coffee contact time. The duration extends to coffee intensity.
  - **Availability**: Coffee maker
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Normal**: `consumer_products_coffee_maker_enum_type_flow_rate_normal`
    - **Intense**: `consumer_products_coffee_maker_enum_type_flow_rate_intense`
    - **Intense plus**: `consumer_products_coffee_maker_enum_type_flow_rate_intense_plus`

    </details>
- **Coffee milk ratio**:
  - **Description**: Defines the amount of milk.
  - **Availability**: Coffee maker
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **10%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_10_percent`
    - **20%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_20_percent`
    - **25%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_25_percent`
    - **30%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_30_percent`
    - **40%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_40_percent`
    - **50%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_50_percent`
    - **55%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_55_percent`
    - **60%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_60_percent`
    - **65%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_65_percent`
    - **67%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_67_percent`
    - **70%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_70_percent`
    - **75%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_75_percent`
    - **80%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_80_percent`
    - **85%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_85_percent`
    - **90%**: `consumer_products_coffee_maker_enum_type_coffee_milk_ratio_90_percent`

    </details>
- **Hot water temperature**:
  - **Description**: Defines the temperature suitable for the type of tea.
  - **Availability**: Coffee maker
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **White tea**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_white_tea`
    - **Green tea**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_green_tea`
    - **Black tea**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_black_tea`
    - **50ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_50_c`
    - **55ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_55_c`
    - **60ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_60_c`
    - **65ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_65_c`
    - **70ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_70_c`
    - **75ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_75_c`
    - **80ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_80_c`
    - **85ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_85_c`
    - **90ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_90_c`
    - **95ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_95_c`
    - **97ºC**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_97_c`
    - **122ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_122_f`
    - **131ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_131_f`
    - **140ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_140_f`
    - **149ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_149_f`
    - **158ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_158_f`
    - **167ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_167_f`
    - **176ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_176_f`
    - **185ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_185_f`
    - **194ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_194_f`
    - **203ºF**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_203_f`
    - **Max**: `consumer_products_coffee_maker_enum_type_hot_water_temperature_max`

    </details>
- **Drying target**:
  - **Description**: Describes the drying target for a dryer program.
  - **Availability**: Dryer
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Iron dry**: `laundry_care_dryer_enum_type_drying_target_iron_dry`
    - **Gentle dry**: `laundry_care_dryer_enum_type_drying_target_gentle_dry`
    - **Cupboard dry**: `laundry_care_dryer_enum_type_drying_target_cupboard_dry`
    - **Cupboard dry plus**: `laundry_care_dryer_enum_type_drying_target_cupboard_dry_plus`
    - **Extra dry**: `laundry_care_dryer_enum_type_drying_target_extra_dry`

    </details>
- **Venting level**:
  - **Description**: Defines the required fan setting.
  - **Availability**: Hood
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Fan off** `cooking_hood_enum_type_stage_fan_off`
    - **Fan stage 1** `cooking_hood_enum_type_stage_fan_stage01`
    - **Fan stage 2** `cooking_hood_enum_type_stage_fan_stage02`
    - **Fan stage 3** `cooking_hood_enum_type_stage_fan_stage03`
    - **Fan stage 4** `cooking_hood_enum_type_stage_fan_stage04`
    - **Fan stage 5** `cooking_hood_enum_type_stage_fan_stage05`

    </details>
- **Intensive level**:
  - **Description**: Defines the intensive setting.
  - **Availability**: Hood
  - <details>
    <summary><b>Options:</b> (click to view)</summary>
  
    - **Intensive stage off**: `cooking_hood_enum_type_intensive_stage_intensive_stage_off`
    - **Intensive stage 1**: `cooking_hood_enum_type_intensive_stage_intensive_stage1`
    - **Intensive stage 2**: `cooking_hood_enum_type_intensive_stage_intensive_stage2`

    </details>
- **Warming level**:
  - **Description**: Defines the level of the warming drawer.
  - **Availability**: Oven
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Low**: `cooking_oven_enum_type_warming_level_low`
    - **Medium**: `cooking_oven_enum_type_warming_level_medium`
    - **High**: `cooking_oven_enum_type_warming_level_high`

    </details>
- **Temperature**:
  - **Description**: Defines the temperature of the washing program.
  - **Availability**: Washer, Washer dryer
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Cold**: `laundry_care_washer_enum_type_temperature_cold`
    - **20ºC clothes**: `laundry_care_washer_enum_type_temperature_g_c20`
    - **30ºC clothes**: `laundry_care_washer_enum_type_temperature_g_c30`
    - **40ºC clothes**: `laundry_care_washer_enum_type_temperature_g_c40`
    - **50ºC clothes**: `laundry_care_washer_enum_type_temperature_g_c50`
    - **60ºC clothes**: `laundry_care_washer_enum_type_temperature_g_c60`
    - **70ºC clothes**: `laundry_care_washer_enum_type_temperature_g_c70`
    - **80ºC clothes**: `laundry_care_washer_enum_type_temperature_g_c80`
    - **90ºC clothes**: `laundry_care_washer_enum_type_temperature_g_c90`
    - **Cold**: `laundry_care_washer_enum_type_temperature_ul_cold`
    - **Warm**: `laundry_care_washer_enum_type_temperature_ul_warm`
    - **Hot**: `laundry_care_washer_enum_type_temperature_ul_hot`
    - **Extra hot**: `laundry_care_washer_enum_type_temperature_ul_extra_hot`

    </details>
- **Spin speed**:
  - **Description**: Defines the spin speed of a washer program.
  - **Availability**: Washer, Washer dryer
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Off**: `laundry_care_washer_enum_type_spin_speed_off`
    - **400 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m400`
    - **600 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m600`
    - **800 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m800`
    - **1000 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m1000`
    - **1200 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m1200`
    - **1400 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m1400`
    - **1600 rpm**: `laundry_care_washer_enum_type_spin_speed_r_p_m1600`
    - **Off**: `laundry_care_washer_enum_type_spin_speed_ul_off`
    - **Low**: `laundry_care_washer_enum_type_spin_speed_ul_low`
    - **Medium**: `laundry_care_washer_enum_type_spin_speed_ul_medium`
    - **High**: `laundry_care_washer_enum_type_spin_speed_ul_high`

    </details>
- **Vario perfect**:
  - **Description**: Defines if a cycle saves energy (Eco Perfect) or time (Speed Perfect).
  - **Availability**: Washer
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Off**: `laundry_care_common_enum_type_vario_perfect_off`
    - **Eco perfect**: `laundry_care_common_enum_type_vario_perfect_eco_perfect`
    - **Speed perfect**: `laundry_care_common_enum_type_vario_perfect_speed_perfect`

    </details>

{% enddetails %}

### Sensor

{% details "List of binary sensors" %}

- **Finish time**:
  - **Description**: Represents the time when the program will end.
  - **Availability**: Coffee maker, Hood, Oven, Dishwasher, Dryer, Washer, Washer dryer

{% note %}
This sensor will be available only if the program is running
{% endnote %}

- **Program progress**:
  - **Description**: Represents the progress of the program.
  - **Availability**: Coffee maker, Hood, Oven, Warming drawer, Dishwasher, Dryer, Washer, Washer dryer

{% note %}
This sensor will be available only if the program is running
{% endnote %}

- **Operation state**:
  - **Description**: Represents the current operation state of the device.
  - **Availability**: All the appliances with programs
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Inactive**: `inactive`
    - **Ready**: `ready`
    - **Delayed start**: `delayedstart`
    - **Run**: `run`
    - **Pause**: `pause`
    - **Action required**: `actionrequired`
    - **Finished**: `finished`
    - **Error**: `error`
    - **Aborting**: `aborting`

    </details>
- **Door state**:
  - **Description**: Represents the current state of the door.
  - **Availability**: Oven, Dishwasher, Dryer, Washer, Washer dryer, Freezer, Fridge freezer, Refrigerator, Wine cooler
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Closed**: `closed`
    - **Locked**: `locked`
    - **Open**: `open`

    </details>
- **Coffee counter**:
  - **Description**: Represents the number of coffees made.
  - **Availability**: Coffee maker
- **Powder coffee counter**:
  - **Description**: Represents the number of powder coffees made.
  - **Availability**: Coffee maker
- **Hot water counter**:
  - **Description**: Represents the milliliters of hot water dispensed.
  - **Availability**: Coffee maker
- **Hot water cups**:
  - **Description**: Represents the number of hot water cups dispensed.
  - **Availability**: Coffee maker
- **Hot milk counter**:
  - **Description**: Represents the number of hot milk cups dispensed.
  - **Availability**: Coffee maker
- **Frothy milk counter**:
  - **Description**: Represents the number of frothy milk cups dispensed.
  - **Availability**: Coffee maker
- **Milk counter**:
  - **Description**: Represents the number of milk cups dispensed.
  - **Availability**: Coffee maker
- **Coffee and milk counter**:
  - **Description**: Represents the number of coffee and milk cups dispensed.
  - **Availability**: Coffee maker
- **Ristretto Espresso counter**:
  - **Description**: Represents the number of Ristretto Espresso cups dispensed.
  - **Availability**: Coffee maker
- **Battery level**:
  - **Description**: Represents the level of the battery.
  - **Availability**: Cleaning robot
- **Camera state**:
  - **Description**: Represents the state of the camera.
  - **Availability**: Cleaning robot
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Disabled**: `disabled`
    - **Sleeping**: `sleeping`
    - **Ready**: `ready`
    - **Streaming local**: `streaminglocal`
    - **Streaming cloud**: `streamingcloud`
    - **Streaming local and cloud**: `streaminglocalancloud`
    - **Error**: `error`

    </details>
- **Last selected map**:
  - **Description**: Represents the last selected map of the cleaning robot.
  - **Availability**: Cleaning robot
  - <details>
    <summary><b>Options:</b> (click to view)</summary>

    - **Temporary map**: `tempmap`
    - **Map 1**: `map1`
    - **Map 2**: `map2`
    - **Map 3**: `map3`

    </details>
- **Current cavity temperature**:
  - **Description**: Represents the current cavity temperature.
  - **Availability**: Oven

{% important %}
It is not recommended to use the **Current cavity temperature** sensor because the temperature might not provide the necessary accuracy.
{% endimportant %}

#### Event sensors

{% details "Event sensor options" %}
All the event sensors will have the following possible values:

- **Confirmed**: `confirmed`
- **Present**: `present`
- **Off**: `off`

{% enddetails %}

- **Freezer door alarm**:
  - **Description**: Represents the alarm state of the freezer door.
  - **Availability**: Freezer, Fridge freezer
- **Refrigerator door alarm**:
  - **Description**: Represents the alarm state of the refrigerator door.
  - **Availability**: Fridge freezer, Refrigerator
- **Freezer temperature alarm**:
  - **Description**: Represents the alarm state of the freezer temperature.
  - **Availability**: Freezer, Fridge freezer
- **Bean container empty**:
  - **Description**: Indicates whether the bean container is empty.
  - **Availability**: Coffee maker
- **Water tank empty**:
  - **Description**: Indicates whether the water tank is empty.
  - **Availability**: Coffee maker
- **Drip tray full**:
  - **Description**: Indicates whether the drip tray is full.
  - **Availability**: Coffee maker
- **Salt nearly empty**:
  - **Description**: Indicates whether the salt is nearly empty.
  - **Availability**: Dishwasher
- **Rinse aid nearly empty**:
  - **Description**: Indicates whether the rinse aid is nearly empty.
  - **Availability**: Dishwasher

{% enddetails %}

### Switch

{% details "List of switch entities" %}

- **Power**:
  - **Description**: Turns on and turns off or sets the standby mode of the device.
  - **Availability**: All the appliances

{% note %}
Some devices only have the state `on` and turn off is not supported by the appliance, check [power state availability at Home Connect API documentation](https://api-docs.home-connect.com/settings/#power-state) for more information.
{% endnote %}

- **Child lock**:
  - **Description**: Represents the state of the child lock.
  - **Availability**: Coffee maker, Cooktop, Oven, Warming drawer, Dishwasher, Dryer, Washer, Washer dryer, Freezer, Fridge freezer, Refrigerator, Wine cooler
- **Cup warmer**:
  - **Description**: Enables/Disables the cup warmer.
  - **Availability**: Coffee maker
- **Freezer super mode**:
  - **Description**: Cool the freezer compartment to the lowest temperature until disabled or a timeout.
  - **Availability**: Freezer, Fridge freezer
- **Refrigerator super mode**:
  - **Description**: Cool the refrigerator compartment to the lowest temperature until disabled or a timeout.
  - **Availability**: Fridge freezer, Refrigerator
- **Eco mode**:
  - **Description**: Enables/Disables the eco-friendly mode.
  - **Availability**: Freezer, Fridge freezer, Refrigerator
- **Sabbath mode**:
  - **Description**: Enables/Disables the Sabbath mode, which disables various functions (e.g. lighting, acoustic signals) to ensure that practising Jews can use the appliance on the Sabbath.
  - **Availability**: Oven, Freezer, Fridge freezer, Refrigerator, Wine cooler
- **Vacation mode**:
  - **Description**: Enables/Disables the vacation mode, which reduces the energy consumption of the appliance by switching the refrigerator temperature to +14ºC. The temperature in the freezer is maintained according to the setting.
  - **Availability**: Fridge freezer, Refrigerator
- **Fresh mode**:
  - **Description**: Enables/Disables the fresh mode, which reduces the temperature automatically in the refrigerator compartment to 2ºC. The freezer remains unchanged.
  - **Availability**: Fridge freezer, Refrigerator
- **Dispenser enabled**:
  - **Description**: Enables/Disables the ice water dispenser.
  - **Availability**: Fridge freezer, Refrigerator
- **Freezer door assistant**:
  - **Description**: Enables/Disables the automatic door opening for the freezer compartment
  - **Availability**: Freezer, Fridge freezer
- **Fridge door assistant**:
  - **Description**: Enables/Disables the automatic door opening for the refrigerator/freezer compartment
  - **Availability**: Fridge freezer, Refrigerator

{% enddetails %}

### Time

{% details "List of time entities" %}

- **Alarm clock**
  - **Description**: Sets the alarm clock.
  - **Availability**: Cooktop, Oven

{% enddetails %}

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
| `cooking_oven_option_setpoint_temperature` | yes | Defines the target cavity temperature, which will be held by the oven. |
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

## Automation examples

Get started with these automation examples

### Send a notification when the appliance ends the program

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: "Notify when program ends"
triggers:
  - trigger: state
    entity_id:
      - sensor.appliance_operation_state
    to: finished
actions:
  - service: notify.notify
    data:
      message: "The appliance has finished the program."
```

{% endraw %}
{% enddetails %}

### Start a program when electricity is cheap

Because electricity is typically cheaper at night, this automation will activate the silent mode when starting the program at night.

{% details "Example YAML configuration" %}

{% raw %}

```yaml
alias: "Start program when electricity is cheap"
triggers:
  - trigger: state
    entity_id: sensor.electricity_price
    to: "0.10"
conditions:
  - condition: state
    entity_id: sensor.diswasher_door
    state: closed
actions:
  - if:
      - condition: time
        after: '22:00:00'
        before: '06:00:00'
    then:
      - service: home_connect.set_program_and_options
        data:
          device_id: "your_device_id"
          affects_to: "active_program"
          program: "dishcare_dishwasher_program_eco_50"
          options:
            - key: "dishcare_dishwasher_option_silence_on_demand"
              value: true
    else:
      - service: home_connect.set_program_and_options
        data:
          device_id: "your_device_id"
          affects_to: "active_program"
          program: "dishcare_dishwasher_program_eco_50"
```

{% endraw %}
{% enddetails %}

## Data updates

This integration uses server-sent events from the Home Connect API to receive live updates from the appliances.
When the configuration entry is loaded or after a streaming error (for example after disconnection), the integration will request all data (such as appliance info, available commands, programs, settings, and status) for all appliances.
If a new appliance is added to the account, the integration will request data for the new appliance and expose the related entities automatically.

## Known limitations

- The Home Connect API does not fully match the Home Connect app. Some programs, options, or settings available in the app may not be accessible or usable via the API.
- This integration supports only one integration entry, as the Home Connect API does not allow for the unique identification of an account.

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

## Removing the integration

This integration follows standard integration removal. No extra steps are required.

{% include integrations/remove_device_service.md %}

After deleting the integration, go to [your applications at the Home Connect Developer portal](https://developer.home-connect.com/applications), find the application that you were using for Home Assistant, click on details and click on "Delete Application".
