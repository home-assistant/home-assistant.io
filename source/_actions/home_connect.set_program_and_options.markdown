---
title: "Set program and options"
action: home_connect.set_program_and_options
domain: home_connect
description: "Starts or selects a program on a Home Connect appliance, or sets the options for the active or selected program."
related_actions:
  - home_connect.start_selected_program
  - home_connect.change_setting
---

Use this action to start or select a program on a Home Connect appliance, for example to start an eco dishwasher cycle or pick a coffee program ready to brew. If you omit the program, the action instead sets options on the program that is already active or selected, so you can tweak a running cycle.

You always pick the appliance and whether the action affects the active or the selected program. After that, you either choose a program, set one or more options, or both. The available options depend on the type of appliance, so a washer and a coffee maker show different choices.

{% important %}
You need to provide either a program or at least one option. If you provide neither, the action does nothing and reports an error.
{% endimportant %}

{% include actions/ui_header.md %}

To set a program and options from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Set program and options**.
6. Select the appliance you want to control.
7. Under **Affects to**, choose whether the action affects the active or the selected program.
8. Optionally, choose a program and set any options for your appliance.
9. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Home Connect appliance you want to control.
Affects to:
  description: Whether the action affects the active program (the one currently running) or the selected program (the one queued to run). Choose **Active program** or **Selected program**.
Program:
  description: The program to start or select. When set, the appliance starts or selects this program depending on the **Affects to** value. When left empty, the action only sets options on the active or selected program.
  required: false
{% endoptions_ui %}

In addition, the UI shows option groups for each appliance type. Only the options that apply to your appliance are used.
For the full list, see [Program options](#program-options).

{% include actions/yaml_header.md %}

In YAML, refer to this action as `home_connect.set_program_and_options`. A basic example that starts an eco dishwasher program looks like this:

{% example %}
action: |
  action: home_connect.set_program_and_options
  data:
    device_id: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
    affects_to: active_program
    program: dishcare_dishwasher_program_eco_50
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The device ID of the Home Connect appliance you want to control.
  required: true
  type: string
affects_to:
  description: Whether the action affects the active program or the selected program. Use `active_program` or `selected_program`.
  required: true
  type: string
program:
  description: The program to start or select. When set, the appliance starts or selects this program depending on the `affects_to` value. When left out, the action only sets options on the active or selected program.
  required: false
  type: string
{% endoptions_yaml %}

In addition, you can pass program options as extra keys in the `data` section. Only the options that apply to your appliance are used.
For the full list, see [Program options](#program-options).

### Program options

The options you can set depend on the type of appliance. In the UI, they appear in collapsible groups. In YAML, you add them as extra keys in the `data` section.

{% note %}
All the temperature options are in degrees Celsius. If your appliance uses Fahrenheit, Home Assistant automatically converts the values to Fahrenheit when sending them to the appliance.
{% endnote %}

Air conditioner options:

- `heating_ventilation_air_conditioning_air_conditioner_option_setpoint_temperature`: the target temperature, which will be held by the air conditioner.
- `heating_ventilation_air_conditioning_air_conditioner_option_fan_speed_percentage`: the fan speed as a percentage (1 to 100).
- `heating_ventilation_air_conditioning_air_conditioner_option_fan_speed_mode`: the fan speed mode, manual or automatic.

Cleaning robot options:

- `consumer_products_cleaning_robot_option_reference_map_id`: which reference map to use.
- `consumer_products_cleaning_robot_option_cleaning_mode`: the preferred cleaning mode.
- `consumer_products_cleaning_robot_option_suction_power`: the suction power.

Coffee maker options:

- `consumer_products_coffee_maker_option_bean_amount`: the amount of coffee beans used.
- `consumer_products_coffee_maker_option_fill_quantity`: the amount of water used, in milliliters.
- `consumer_products_coffee_maker_option_coffee_temperature`: the coffee temperature.
- `consumer_products_coffee_maker_option_bean_container_selection`: the preferred bean container.
- `consumer_products_coffee_maker_option_flow_rate`: the water-coffee contact time, which affects coffee intensity.
- `consumer_products_coffee_maker_option_multiple_beverages`: whether double dispensing is enabled.
- `consumer_products_coffee_maker_option_coffee_milk_ratio`: the amount of milk.
- `consumer_products_coffee_maker_option_hot_water_temperature`: the hot water temperature, suitable for the type of tea.

Dishwasher options:

- `b_s_h_common_option_start_in_relative`: when the program should start, in seconds from now.
- `dishcare_dishwasher_option_intensiv_zone`: higher spray pressure on the lower basket for very dirty pots and pans.
- `dishcare_dishwasher_option_brilliance_dry`: a special drying cycle for more shine on glasses and plastic items.
- `dishcare_dishwasher_option_vario_speed_plus`: reduces the program run time by up to 66% with the usual cleaning and drying.
- `dishcare_dishwasher_option_silence_on_demand`: extra silent mode for a selected period of time.
- `dishcare_dishwasher_option_half_load`: economical cleaning for smaller loads, saving energy, water, and time.
- `dishcare_dishwasher_option_extra_dry`: improved drying for glasses and plasticware.
- `dishcare_dishwasher_option_hygiene_plus`: cleaning at increased temperature for maximum hygienic cleanliness.
- `dishcare_dishwasher_option_eco_dry`: opens the door automatically for energy efficient drying.
- `dishcare_dishwasher_option_zeolite_dry`: a special drying cycle for improved drying of glasses, plates, and plasticware.

Dryer options:

- `laundry_care_dryer_option_drying_target`: the drying target, such as iron dry, cupboard dry, or extra dry.

Hood options:

- `cooking_common_option_hood_venting_level`: the required fan setting.
- `cooking_common_option_hood_intensive_level`: the intensive setting.

Oven options:

- `cooking_oven_option_setpoint_temperature`: the target cavity temperature the oven holds.
- `b_s_h_common_option_duration`: the run time of the program, after which the appliance stops.
- `cooking_oven_option_fast_pre_heat`: heats the cooking compartment quickly. The setpoint temperature must be at least 100 °C (212 °F), or this option is not activated.

Warming drawer options:

- `cooking_oven_option_warming_level`: the level of the warming drawer.

Washer options:

- `laundry_care_washer_option_temperature`: the temperature of the washing program.
- `laundry_care_washer_option_spin_speed`: the spin speed of the program.
- `laundry_care_washer_option_stains`: the type of stains to treat.
- `b_s_h_common_option_finish_in_relative`: when the program should end, in seconds from now.
- `laundry_care_common_option_silent_mode`: activates silent mode.
- `laundry_care_washer_option_i_dos_1_active`: activates the i-Dos 1 detergent feed.
- `laundry_care_washer_option_i_dos_2_active`: activates the i-Dos 2 detergent feed.
- `laundry_care_washer_option_intensive_plus`: intensive washing for heavily soiled laundry.
- `laundry_care_washer_option_less_ironing`: treats laundry gently to reduce creasing.
- `laundry_care_washer_option_mini_load`: activates the mini load option.
- `laundry_care_washer_option_prewash`: adds a prewash cycle to the program.
- `laundry_care_washer_option_rinse_hold`: activates the rinse hold option.
- `laundry_care_washer_option_soak`: activates soaking.
- `laundry_care_washer_option_water_plus`: activates the water plus option.
- `laundry_care_common_option_vario_perfect`: saves energy (Eco Perfect) or time (Speed Perfect).

## Good to know

- The available programs and options depend on your appliance, and not every appliance supports every option listed here. The Home Connect API does not always match the Home Connect app, so some choices available in the app may not work through Home Assistant.
- The `affects_to` value decides whether you change the program that is running now or the one queued to run next.
- The relative timing options, such as start in relative and finish in relative, are set in seconds. For example, a value of 9000 means in 2 hours and 30 minutes.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: start the dishwasher overnight when electricity is cheap

Because electricity is often cheaper at night, this automation starts a quiet eco program when the price drops, but only between 22:00 and 06:00.

- **Trigger**: Electricity price drops to your night rate
- **Condition**: The dishwasher door is closed
- **Action**: Set program and options

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Start the dishwasher when electricity is cheap"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.electricity_price
      below: 0.10
  conditions:
    - condition: state
      entity_id: binary_sensor.dishwasher_door
      state: "off"
    - condition: time
      after: "22:00:00"
      before: "06:00:00"
  actions:
    - action: home_connect.set_program_and_options
      data:
        device_id: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
        affects_to: active_program
        program: dishcare_dishwasher_program_eco_50
        dishcare_dishwasher_option_silence_on_demand: true
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
