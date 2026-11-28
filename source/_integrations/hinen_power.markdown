---
title: Hinen Power
description: Instructions on how to integrate Hinen Power within Home Assistant.
ha_category:

  - Hub
  - Sensor
  - Number
  - Switch
  - Select

ha_release: "2025.8.8"
ha_iot_class: Cloud_Polling
ha_config_flow: true
ha_codeowners: "@Hinen-WeiFeng"
ha_domain: hinen_power
ha_platforms:
  - sensor
  - select
  - number
  - switch

ha_integration_type: service
---

The Hinen Power integration allows you to connect Hinen devices to Home Assistant. For each device you add, the following entities will be created:

- Sensor
  - Alert status
  - Device status
  - Cumulative electricity consumption
  - Cumulative power generation
  - Cumulative grid connection
  - Cumulative charging
  - Cumulative discharging

- Select
  - Working mode (state options: not enabled, self-consumption, battery priority, grid priority, time period control, power protection mode)

- Number
  - Battery discharge minimum SOC
  - Battery charge cutoff SOC
  - Battery discharge cutoff SOC
  - Time period related control (6: Period 1, Period 2, Period 3, Period 4, Period 5, Period 6, if not set, the default value is 0)
    - Period 1 start time
    - Period 1 charge/discharge power percentage
    - Period 1 end time
    - Period 1 cutoff SOC
  
- Switch (used in conjunction with working mode: time period control)
  - Period 1 enable
  - Period 2 enable
  - Period 3 enable
  - Period 4 enable
  - Period 5 enable
  - Period 6 enable

## Prerequisites

To use this integration, you need to have a corresponding Hinen Solar account and one or more devices under your account;

{% include integrations/config_flow.md %}

## Custom Cards

Optional: Simply configure custom card examples based on Hinen's related entities to achieve better control of Hinen devices

To set up a custom card, you need to replace the **device identifier** with **your own device identifier**, the steps are as follows

1. Go to "**Home > Developer Tools > Templates**" and put the following yaml configuration into the template.
2. Find any entity to view the entity identifier **to get the corresponding device identifier**. For example: device status entity (sensor.6kw_0048_status), the device identifier is "6kw_0048".
3. Update the **device_identifier** variable value with your own device identifier
4. Copy the generated yaml configuration
5. Go to "**Home > Overview > Edit > Add Card > Manual Edit**", put the copied yaml configuration into the template and click finish

It is recommended to use this method to install the Hinen integration. When there is a specific version and you want to update to a specific version, you only need to switch to the corresponding Tag.

### Device Working Mode Settings

```yaml
{% raw %}
{% set device_identifier = "your own device identifier" %}
type: entities
entities:
  - entity: select.{{device_identifier}}_work_mode
  - entity: sensor.{{device_identifier}}_status
  - entity: sensor.{{device_identifier}}_alert_status
title: Working Mode Settings
state_color: true
{% endraw %}
```

### Display attributes associated with each mode according to working mode

```yaml
{% raw %}
{% set device_identifier = "your own device identifier" %}

type: vertical-stack
cards:
  - type: conditional
    conditions:
      - condition: state
        entity: select.{{ device_identifier }}_work_mode
        state: self_consumption
    card:
      type: entities
      title: Self-consumption
      entities:
        - entity: number.{{ device_identifier }}_load_first_stop_soc
          name: Battery discharge minimum SOC
          secondary_info: last-updated
  
  - type: conditional
    conditions:
      - condition: state
        entity: select.{{ device_identifier }}_work_mode
        state: battery_priority
    card:
      type: entities
      title: Battery priority
      entities:
        - entity: number.{{ device_identifier }}_charge_stop_soc
          secondary_info: last-updated
          name: Battery charge cutoff SOC
  
  - type: conditional
    conditions:
      - condition: state
        entity: select.{{ device_identifier }}_work_mode
        state: grid_priority
    card:
      type: entities
      title: Grid priority
      entities:
        - entity: number.{{ device_identifier }}_grid_first_stop_soc
          secondary_info: last-updated
          name: Battery discharge cutoff SOC
  
  - type: conditional
    conditions:
      - condition: state
        entity: select.{{ device_identifier }}_work_mode
        state: time_period
    card:
      type: entities
      title: ⚡Charge/discharge priority time period configuration
      entities:
        {% for period in range(1, 7) %}
        - type: section
          label: Period {{ period }}
        - entity: switch.{{ device_identifier }}_cd_period_{{ period }}_enable
          name: Enable
        - entity: number.{{ device_identifier }}_cd_period_{{ period }}_rate
          name: Rate
        - entity: number.{{ device_identifier }}_cd_period_{{ period }}_stop_soc
          name: Cutoff SOC
        - entity: number.{{ device_identifier }}_cd_period_{{ period }}_start
          name: Start time
        - entity: number.{{ device_identifier }}_cd_period_{{ period }}_end
          name: End time
        {% endfor %}
      show_header_toggle: false
      state_color: true
{% endraw %}
```
