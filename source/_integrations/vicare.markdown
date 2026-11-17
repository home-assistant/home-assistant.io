---
description: Instructions on how to integrate Viessmann heating, ventilation, and energy devices with Home Assistant.
ha_release: 0.99
ha_domain: vicare
---

The **Viessmann ViCare** {% term integration %} connects Home Assistant to the [Viessmann](https://www.viessmann-climatesolutions.com) cloud, the same cloud the ViCare app uses. It shows the values your devices report and lets you control heating, domestic hot water (<abbr title="domestic hot water">DHW</abbr>), and ventilation from Home Assistant.

## Supported devices

Devices that you can see in the ViCare app can be added to Home Assistant. The integration recognizes these device families:

- **Gas boilers**: Vitodens, Vitocrossal, and Vitopend
- **Oil boilers**: Vitoladens, Vitorondens, and Vitoradial
- **Pellet boilers**: Vitoligno
- **Heat pumps**: Vitocal, including hybrid systems such as the Vitocaldens
- **Fuel cell heating**: Vitovalor and Vitoblo
- **Electricity storage**: Vitocharge VX3
- **Ventilation**: Vitoair and Vitovent units, and the Vitopure air purifier
- **Water softeners**: Vitoset Aqua
- **ViCare Smart Climate**: radiator thermostats, room sensors, floor heating distributors, and repeaters

Newer devices with built-in Wi-Fi connect to the cloud directly. Older devices need a Vitoconnect gateway.

## Prerequisites

Home Assistant needs its own API client from the Viessmann developer portal:

1. Sign in to the [Viessmann developer portal](https://app.developer.viessmann-climatesolutions.com) with your ViCare app account.
2. In the **Clients** section of the dashboard, select **Add** and create a client with these settings:
   - **Name**: `HomeAssistant`
   - **Redirect URIs**: `https://my.home-assistant.io/redirect/oauth`
   - If the form offers **Google reCAPTCHA**, disable it.
3. Copy the **Client ID** of the new client.

{% note %}
A new client can take up to an hour to become active. Until then, Home Assistant does not find any devices.
{% endnote %}

When Home Assistant asks for application credentials during setup, enter the **Client ID**. The **Client Secret** field is not used, so you can enter any value.

The API access is free. Viessmann currently offers no paid plans.

{% include integrations/config_flow.md %}

## Supported functionality

The integration creates entities for the data points your device reports, so the entities differ from device to device. A single physical device usually has entities of several types.

### Heating

Each heating circuit has a **Heating** climate entity. It shows the room temperature if the device measures one, and the supply temperature otherwise.

The HVAC modes of the climate entity map to the Viessmann operation modes:

- `off`: `Standby`, which switches off heating and domestic hot water. Devices without standby use `DHW` (hot water only) or `ForcedReduced` instead.
- `heat`: `ForcedNormal`, which permanently heats to the normal temperature.
- `auto`: `DHWandHeating`, which switches between the reduced and normal temperature following the schedule programmed in your device.
- `cool`: `Cooling`, on heat pumps that can cool.

Each heating circuit also has an **Operating mode** select that offers all operation modes the device reports, such as **DHW only**, **DHW and heating**, or **Standby**. The climate entity maps several of these modes to the same HVAC mode, the select sets each one directly.

The `climate.set_temperature` action changes the normal temperature or, if a preset is active, the temperature of the preset. The presets *eco* and *comfort* are the Viessmann programs of the same name and end after 8 hours. Eco lowers the target temperature by 3 °C, comfort heats to a temperature you configure. Number entities set the temperatures of the reduced, normal, and comfort programs, and the slope and shift of the heating curve.

The holiday programs appear as **Holiday** and **Holiday at home** binary sensors, with sensors for their start and end dates.

### Hot water

The **Domestic hot water** water heater entity shows the hot water temperature and sets its target. It cannot switch hot water on or off. Use the **DHW operating mode** select if your device has one, or the **Operating mode** select of the heating circuit.

The **Activate one-time charge** button heats the hot water once, also outside of the schedule. Depending on the device, it heats to the normal or to the **DHW secondary temperature**.

If your device has a domestic hot water circulation pump, you can read its weekly schedule with the [Get circulation schedule](/actions/vicare.get_circulation_schedule/) action and change it with the [Set circulation schedule](/actions/vicare.set_circulation_schedule/) action.

### Ventilation

Ventilation units appear as fans with their speeds and presets. Their quickmodes, such as **Intensive**, **Eco**, **Boost**, and **Silent**, are switches. Only one quickmode can be active at a time, so turn the active one off before you turn on another.

### Sensors

Sensors and binary sensors cover temperatures, pressures, energy and gas consumption, compressor and burner states, and more, depending on what your device reports.

The rooms of a ViCare room control appear as separate devices named **Room 0**, **Room 1**, and so on, each with a temperature and a humidity sensor and a **Window** and a **Condensation risk** binary sensor. The Viessmann API does not provide the room names, so rename the devices and assign them to areas as needed.

Vitoset Aqua water softeners have the following sensors:

- **Salt supply**: the number of days the salt lasts
- **Water consumption**: the total water consumption, in liters
- **Water consumption today**: the water consumed today, in liters
- **Water flow**: the current water flow, in liters per minute

Heat pumps that report the heat they produce have the following sensors:

- **Heat production**: the current heat output
- **Heating heat production today**: the heat produced for heating today
- **DHW heat production today**: the heat produced for domestic hot water today

{% include integrations/actions.md %}

## Viessmann ViCare automation examples

With your heating in Home Assistant, you can combine it with your other devices, for example a solar system or a weather station. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Heat the hot water with surplus solar power

Raise the hot water target to 60 °C when you feed more than 2 kW of solar power into the grid for 10 minutes. The device heats the hot water only within the times of its hot water schedule, so make sure the schedule covers the sunny hours. In this example, the grid power sensor reports export as a negative value. Lower the target again with a second automation, for example in the evening.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Your grid power sensor
  - **Below**: `-2000`
  - **For**: 10 minutes
- **Action**: Set water heater target temperature
  - **Target**: The **Domestic hot water** entity of your device
  - **Temperature**: `60`

{% details "YAML example for heating the hot water with surplus solar power" %}

{% example %}
automation: |
  alias: "Hot water boost with solar surplus"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.grid_power
      below: -2000
      for: "00:10:00"
  actions:
    - action: water_heater.set_temperature
      target:
        entity_id: water_heater.vitocal_domestic_hot_water
      data:
        temperature: 60
{% endexample %}

{% enddetails %}

### Automation: Hot water only in summer

Stop heating once it stays warm outside for a day, and keep the hot water running.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: The **Outside temperature** sensor of your device
  - **Above**: `18`
  - **For**: 24 hours
- **Action**: Select option
  - **Target**: The **Operating mode** select of your heating circuit
  - **Option**: **DHW only**

{% details "YAML example for hot water only in summer" %}

{% example %}
automation: |
  alias: "Summer mode for the heating"
  triggers:
    - trigger: numeric_state
      entity_id: sensor.vitocal_outside_temperature
      above: 18
      for: "24:00:00"
  actions:
    - action: select.select_option
      target:
        entity_id: select.vitocal_operating_mode
      data:
        option: dhw
{% endexample %}

{% enddetails %}

### Automation: Notify when the heating goes offline

Get a notification when your heating has been unavailable in Home Assistant for an hour, for example because the gateway lost its connection.

- **Trigger**: State
  - **Entity**: The **Heating** climate entity of your device
  - **To**: Unavailable
  - **For**: 1 hour
- **Action**: Send a notification message
  - **Target**: My phone

{% details "YAML example for a notification when the heating goes offline" %}

{% example %}
automation: |
  alias: "Heating offline"
  triggers:
    - trigger: state
      entity_id: climate.vitocal_heating
      to: unavailable
      for: "01:00:00"
  actions:
    - action: notify.send_message
      target:
        entity_id: notify.my_phone
      data:
        message: "The heating has been offline in Home Assistant for an hour."
{% endexample %}

{% enddetails %}

### Automation: Pause circulation while nobody is home

This automation saves the circulation schedule when everyone leaves, turns the pump off, and restores the saved schedule once someone comes back.

- **Trigger**: Numeric state crossed threshold
  - **Entity**: Home
  - **Below**: `1`
- **Action**: Viessmann ViCare: Get circulation schedule
  - **Target**: Main water heater
  - **Response variable**: `saved`
- **Action**: Viessmann ViCare: Set circulation schedule
  - **Target**: Main water heater
  - **Monday** to **Sunday**: selected, with no slots
- **Action**: Wait for a trigger
  - **Trigger**: Numeric state crossed threshold
    - **Entity**: Home
    - **Above**: `0`
- **Action**: Viessmann ViCare: Set circulation schedule
  - **Target**: Main water heater
  - **Data** (in YAML mode): the saved schedule of the water heater, as shown in the example YAML

{% details "YAML example for pausing circulation while nobody is home" %}

{% example %}
automation: |
  alias: "Pause circulation while nobody is home"
  triggers:
    - trigger: numeric_state
      entity_id: zone.home
      below: 1
  actions:
    - action: vicare.get_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      response_variable: saved
    - action: vicare.set_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      data:
        monday: []
        tuesday: []
        wednesday: []
        thursday: []
        friday: []
        saturday: []
        sunday: []
    - wait_for_trigger:
        - trigger: numeric_state
          entity_id: zone.home
          above: 0
    - action: vicare.set_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      data: "{{ saved['water_heater.main_water_heater'] }}"
{% endexample %}

{% enddetails %}

### Automation: Turn off circulation on weekends

This automation turns off the circulation pump on Saturday and Sunday every Friday evening. The weekday schedule stays as it is.

- **Trigger**: Time
  - **At time**: `20:00:00`
  - **Weekdays**: Friday
- **Action**: Viessmann ViCare: Set circulation schedule
  - **Target**: Main water heater
  - **Saturday** and **Sunday**: selected, with no slots

{% details "YAML example for turning off circulation on weekends" %}

{% example %}
automation: |
  alias: "Turn off circulation on weekends"
  triggers:
    - trigger: time
      at: "20:00:00"
      weekday: fri
  actions:
    - action: vicare.set_circulation_schedule
      target:
        entity_id: water_heater.main_water_heater
      data:
        saturday: []
        sunday: []
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} the Viessmann cloud every 60 seconds. Devices behind the same gateway share one request. With more than one gateway, the interval grows with the number of gateways, so that the total stays within the API limit: every 120 seconds with two gateways, every 180 seconds with three.

Viessmann allows 1,450 API calls in 24 hours for each API client. Polling uses most of them, and every command you send from Home Assistant counts as well. When the limit is reached, Viessmann blocks further requests until the 24-hour window ends, and the entities become unavailable in the meantime. The ViCare app uses its own client and does not count toward the limit of Home Assistant.

{% important %}
Use your API client only for one Home Assistant installation. Two installations or other tools that share a client ID also share its limit and run into it.
{% endimportant %}

## Known limitations

- Values are as fresh as the last poll. A change made in the ViCare app or at the device shows up in Home Assistant with the next poll.
- The water heater entity sets the target temperature only. Switching hot water on or off goes through the operating mode selects.
- The Viessmann API does not provide the names of the rooms of a ViCare room control.

## Report a new device or a missing value

The integration only creates entities for the data points that the Viessmann API reports for your device. If your device has only a few entities, or a value you see in the ViCare app is missing in Home Assistant, it most likely needs support in [PyViCare](https://github.com/openviess/PyViCare), the library that reads the data for Home Assistant:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}, open the **Viessmann ViCare** integration, and select **Download diagnostics**. The file contains the data points of all your devices, with gateway IDs and credentials replaced by placeholders.
2. Open a [new issue](https://github.com/openviess/PyViCare/issues/new) in the PyViCare repository, name your device model, describe the value you are missing, and attach the diagnostics file.

## Troubleshooting

### Invalid redirection URI

When adding or re-authenticating the integration, you get this error in the browser:

```text
{"error":"invalid_request", "error_description":"Invalid redirection URI."}
```

Set the **Redirect URIs** on your API client in the [Viessmann developer portal](https://app.developer.viessmann-climatesolutions.com) to exactly `https://my.home-assistant.io/redirect/oauth`, save (it may take up to an hour to become active), and try again.

This error can also happen if you use a **Client ID** from older guides, like the one used by the ViCare app. That client only allows the redirect URI `vicare://oauth-callback/everest`, which Home Assistant cannot use. Instead of trying to change the redirect URI, create your own API client (see [prerequisites](#prerequisites)) and use its **Client ID**.

### Client not registered

When adding the integration, you get this error in the browser:

```text
{"error":"invalid_request", "error_description":"Client not registered."}
```

The Client ID sent to Viessmann does not match a client in the developer portal. This usually happens after you have set up ViCare before: Home Assistant keeps your old Client ID as an application credential and reuses it automatically, even after you remove the integration. To enter a new Client ID, delete the stored one first:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Application credentials**.
3. Select the **Viessmann ViCare** credential, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Delete**.
4. Add the integration again. Setup now prompts for the application credentials again; enter the **Client ID** from your current client in the [Viessmann developer portal](https://app.developer.viessmann-climatesolutions.com).

### Devices are unavailable for a while

The Viessmann cloud loses contact with the gateway from time to time, and the Home Assistant log shows `GATEWAY_OFFLINE`. This usually resolves itself after a while. If it persists, power cycle the gateway.

## Removing the integration

This integration follows standard integration removal. Once the integration is removed, you can remove the API client (assuming it was only used by this integration) by going to the [Viessmann developer portal](https://app.developer.viessmann-climatesolutions.com) and deleting the client you created for Home Assistant.

{% include integrations/remove_device_service.md %}
