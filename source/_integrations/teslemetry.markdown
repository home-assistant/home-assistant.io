---
title: Teslemetry
description: Instructions on how to integrate Teslemetry within Home Assistant.
ha_category:
  - Binary sensor
  - Button
  - Calendar
  - Car
  - Climate
  - Cover
  - Device tracker
  - Lock
  - Media player
  - Number
  - Select
  - Sensor
  - Switch
  - Update
ha_release: 2024.2
ha_iot_class: Cloud Polling
ha_config_flow: true
ha_codeowners:
  - '@Bre77'
ha_domain: teslemetry
ha_platforms:
  - binary_sensor
  - button
  - calendar
  - climate
  - cover
  - device_tracker
  - diagnostics
  - lock
  - media_player
  - number
  - select
  - sensor
  - switch
  - update
ha_integration_type: hub
ha_quality_scale: platinum
---

The **Teslemetry** {% term integration %} exposes various commands and sensors from the Tesla vehicles and energy sites connected to a [Teslemetry](https://teslemetry.com/) subscription.

## Prerequisites

You must have a [Teslemetry](https://teslemetry.com) account with active subscription.

Vehicles delivered in 2024 and later will require a [virtual key](https://teslemetry.com/docs/topics/virtualkey) to be configured to run certain commands.

{% include integrations/config_flow.md %}

## Bluetooth vehicle control

By default, Teslemetry sends every vehicle command through the cloud. If Home Assistant has access to a [Bluetooth adapter](/integrations/bluetooth/), you can pair a vehicle over Bluetooth so its commands are sent directly to the car over a local connection, with an automatic fallback to the cloud when the local connection isn't available.

### Requirements

- A Bluetooth adapter available to Home Assistant, such as a built-in adapter or a [Bluetooth proxy](/integrations/bluetooth/#remote-adapters-bluetooth-proxies).
- The vehicle must be awake and within Bluetooth range of that adapter while you set up pairing.

### Setting up Bluetooth control

Each vehicle has its own **Set up Bluetooth control** action.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the **Teslemetry** integration.
2. Find the vehicle you want to pair, and select **Set up Bluetooth control**.
3. Home Assistant scans for the vehicle over Bluetooth. Make sure the vehicle is awake and nearby, then continue.
4. Approve Home Assistant's virtual key by tapping your key card against the center console card reader of the vehicle.

You only need to do this once per vehicle.

Whether a paired vehicle's commands route locally over Bluetooth or through the cloud is decided when Home Assistant starts or when you reload the Teslemetry integration. If the vehicle is within Bluetooth range at that moment, its commands use the local connection first, with an automatic fallback to the cloud when needed. This can make commands like locking, unlocking, or flashing the lights feel noticeably faster.

If the vehicle is out of Bluetooth range at that moment, for example, because it's away from home when Home Assistant starts, its commands use the cloud for the rest of that session. Home Assistant doesn't automatically switch a vehicle back to Bluetooth when it returns into range. To pick up Bluetooth control again, reload the Teslemetry integration (or restart Home Assistant) while the vehicle is in range.

### Removing Bluetooth control

Removing the Teslemetry integration, or the pairing for a single vehicle, stops Home Assistant from routing that vehicle's commands over Bluetooth and forgets the stored Bluetooth address. It does not revoke Home Assistant's virtual key from the vehicle itself. That key stays authorized on the car until you remove it there.

To fully revoke Home Assistant's access:

1. Sit in the vehicle, and on the touchscreen, select **Controls** > **Locks**.
2. In the list of keys, find the one that was added when you set up Bluetooth control for Home Assistant, and select its trash icon.
3. When prompted, confirm the removal by tapping an authenticated key card or key fob against the center console card reader.

If you use other apps that also connect to the vehicle over a virtual key, they'll appear in the same list, so make sure you remove the correct one.

## Entities

These are the entities available in the Teslemetry integration. Not all entities are enabled by default, and not all values are always available.
Entities in the device tracker platform specifically require the `Vehicle location` scope, and will appear unavailable otherwise. 

### Vehicles

The **Bluetooth** column marks entities whose commands can control the vehicle over Bluetooth when it's paired and within range of a Home Assistant Bluetooth adapter when Home Assistant starts or when you reload the Teslemetry integration. See [Bluetooth vehicle control](#bluetooth-vehicle-control) for setup and requirements.

{% note %}
Only vehicle controls send commands over Bluetooth. Reading state, and the updated state that follows a command, always comes through Teslemetry's cloud connection or data stream, even for an entity marked **Yes**. If a vehicle is out of Bluetooth range when Home Assistant starts or the integration reloads, its commands use the cloud for that session, and individual commands the local connection can't complete fall back to the cloud automatically. Energy site and Wall Connector entities are not controlled over vehicle Bluetooth.
{% endnote %}

|Domain|Name|Enabled|Bluetooth|
|---|---|---|---|
|Binary sensor|Automatic blind spot camera|No|No|
|Binary sensor|Automatic emergency braking off|No|No|
|Binary sensor|Battery heater|No|No|
|Binary sensor|Blind spot collision warning chime|No|No|
|Binary sensor|BMS full charge|No|No|
|Binary sensor|Brake pedal|No|No|
|Binary sensor|Cabin overheat protection actively cooling|No|No|
|Binary sensor|Cellular|Yes|No|
|Binary sensor|Charge cable|Yes|No|
|Binary sensor|Charge enable request|No|No|
|Binary sensor|Charge port cold weather mode|No|No|
|Binary sensor|Charger has multiple phases|No|No|
|Binary sensor|Dashcam|No|No|
|Binary sensor|DC DC|No|No|
|Binary sensor|Defrost for preconditioning|No|No|
|Binary sensor|Drive rail|No|No|
|Binary sensor|Driver seat belt|No|No|
|Binary sensor|Driver seat occupied|No|No|
|Binary sensor|Emergency lane departure avoidance|No|No|
|Binary sensor|Europe vehicle|No|No|
|Binary sensor|Fast charger present|No|No|
|Binary sensor|Front driver door|Yes|No|
|Binary sensor|Front driver window|Yes|No|
|Binary sensor|Front passenger door|Yes|No|
|Binary sensor|Front passenger window|Yes|No|
|Binary sensor|GPS state|No|No|
|Binary sensor|Guest mode enabled|No|No|
|Binary sensor|Hazard lights|No|No|
|Binary sensor|High beams|No|No|
|Binary sensor|Homelink nearby|No|No|
|Binary sensor|HVAC auto mode|No|No|
|Binary sensor|High voltage interlock loop fault|No|No|
|Binary sensor|Located at favorite|Yes|No|
|Binary sensor|Located at home|Yes|No|
|Binary sensor|Located at work|Yes|No|
|Binary sensor|Offroad lightbar|No|No|
|Binary sensor|Passenger seat belt|No|No|
|Binary sensor|Pin to drive enabled|No|No|
|Binary sensor|Preconditioning enabled|No|No|
|Binary sensor|Preconditioning|No|No|
|Binary sensor|Rear display HVAC|No|No|
|Binary sensor|Rear driver door|Yes|No|
|Binary sensor|Rear driver window|Yes|No|
|Binary sensor|Rear passenger door|Yes|No|
|Binary sensor|Rear passenger window|Yes|No|
|Binary sensor|Remote start|No|No|
|Binary sensor|Right hand drive|No|No|
|Binary sensor|Scheduled charging pending|No|No|
|Binary sensor|Seat vent enabled|No|No|
|Binary sensor|Service mode|No|No|
|Binary sensor|Speed limited|No|No|
|Binary sensor|Status|Yes|No|
|Binary sensor|Supercharger session trip planner|No|No|
|Binary sensor|Tire pressure warning front left|No|No|
|Binary sensor|Tire pressure warning front right|No|No|
|Binary sensor|Tire pressure warning rear left|No|No|
|Binary sensor|Tire pressure warning rear right|No|No|
|Binary sensor|Trip charging|No|No|
|Binary sensor|User present|Yes|No|
|Binary sensor|Wi-Fi|Yes|No|
|Binary sensor|Wiper heat|No|No|
|Button|Flash lights|Yes|Yes|
|Button|HomeLink|Yes|Yes|
|Button|Honk horn|Yes|Yes|
|Button|Keyless driving|Yes|Yes|
|Button|Play fart|Yes|Yes|
|Button|Wake|Yes|Yes|
|Climate|Cabin overheat protection|Yes|Yes|
|Climate|Climate|Yes|Yes|
|Cover|Charge port door|Yes|Yes|
|Cover|Frunk|Yes|Yes|
|Cover|Sunroof|No|Yes|
|Cover|Trunk|Yes|Yes|
|Cover|Vent windows|Yes|Yes|
|Device tracker|Location|Yes|No|
|Device tracker|Origin|No|No|
|Device tracker|Route|Yes|No|
|Lock|Charge cable lock|Yes|Yes|
|Lock|Lock|Yes|Yes|
|Lock|Speed limit|Yes|Yes|
|Media player|Media player|Yes|Yes|
|Number|Charge current|Yes|Yes|
|Number|Charge limit|Yes|Yes|
|Select|Seat cooler front left|Yes|Yes|
|Select|Seat cooler front right|Yes|Yes|
|Select|Seat heater front left|Yes|Yes|
|Select|Seat heater front right|Yes|Yes|
|Select|Seat heater rear center|No|Yes|
|Select|Seat heater rear left|No|Yes|
|Select|Seat heater rear right|No|Yes|
|Select|Seat heater third row left|No|Yes|
|Select|Seat heater third row right|No|Yes|
|Select|Steering wheel heater|Yes|Yes|
|Sensor|Battery level|Yes|No|
|Sensor|Battery range|Yes|No|
|Sensor|BMS state|No|No|
|Sensor|Brake pedal position|No|No|
|Sensor|Brick voltage max|No|No|
|Sensor|Brick voltage min|No|No|
|Sensor|Charge cable|No|No|
|Sensor|Charge energy added|Yes|No|
|Sensor|Charge rate|Yes|No|
|Sensor|Charger current|Yes|No|
|Sensor|Charger power|Yes|No|
|Sensor|Charger voltage|Yes|No|
|Sensor|Charging|Yes|No|
|Sensor|Cruise follow distance|No|No|
|Sensor|Cruise set speed|No|No|
|Sensor|Current speed limit|No|No|
|Sensor|DC charging energy in|No|No|
|Sensor|DC charging power|No|No|
|Sensor|Destination|No|No|
|Sensor|Distance to arrival|Yes|No|
|Sensor|Driver temperature setting|No|No|
|Sensor|Estimate battery range|No|No|
|Sensor|Exterior color|No|No|
|Sensor|Fast charger type|No|No|
|Sensor|Front drive inverter axle speed|No|No|
|Sensor|Front drive inverter battery voltage|No|No|
|Sensor|Front drive inverter heatsink temperature|No|No|
|Sensor|Front drive inverter motor current|No|No|
|Sensor|Front drive inverter state|No|No|
|Sensor|Front drive inverter temperature|No|No|
|Sensor|Front drive unit actual torque|No|No|
|Sensor|Front drive unit stator temperature|No|No|
|Sensor|HVAC power state|No|No|
|Sensor|Ideal battery range|No|No|
|Sensor|Inside temperature|Yes|No|
|Sensor|Left temperature request|No|No|
|Sensor|Odometer|No|No|
|Sensor|Outside temperature|Yes|No|
|Sensor|Passenger temperature setting|No|No|
|Sensor|Power|No|No|
|Sensor|Rear drive inverter axle speed|No|No|
|Sensor|Rear drive inverter battery voltage|No|No|
|Sensor|Rear drive inverter heatsink temperature|No|No|
|Sensor|Rear drive inverter motor current|No|No|
|Sensor|Rear drive inverter state|No|No|
|Sensor|Rear drive inverter temperature|No|No|
|Sensor|Rear drive unit actual torque|No|No|
|Sensor|Rear drive unit stator temperature|No|No|
|Sensor|Rear left drive inverter axle speed|No|No|
|Sensor|Rear left drive inverter battery voltage|No|No|
|Sensor|Rear left drive inverter heatsink temperature|No|No|
|Sensor|Rear left drive inverter motor current|No|No|
|Sensor|Rear left drive inverter state|No|No|
|Sensor|Rear left drive inverter temperature|No|No|
|Sensor|Rear left drive unit actual torque|No|No|
|Sensor|Rear left drive unit stator temperature|No|No|
|Sensor|Rear right drive inverter axle speed|No|No|
|Sensor|Rear right drive inverter battery voltage|No|No|
|Sensor|Rear right drive inverter heatsink temperature|No|No|
|Sensor|Rear right drive inverter motor current|No|No|
|Sensor|Rear right drive inverter state|No|No|
|Sensor|Rear right drive inverter temperature|No|No|
|Sensor|Rear right drive unit actual torque|No|No|
|Sensor|Rear right drive unit stator temperature|No|No|
|Sensor|Right temperature request|No|No|
|Sensor|Roof color|No|No|
|Sensor|Scheduled charging mode|No|No|
|Sensor|Scheduled charging start time|No|No|
|Sensor|Scheduled departure time|No|No|
|Sensor|Secondary drive unit torque command|No|No|
|Sensor|Sentry mode|Yes|No|
|Sensor|Shift state|No|No|
|Sensor|Speed|No|No|
|Sensor|State of charge at arrival|No|No|
|Sensor|Time at arrival|Yes|No|
|Sensor|Time at full charge|Yes|No|
|Sensor|Time to arrival|Yes|No|
|Sensor|Time to full charge|Yes|No|
|Sensor|Tire pressure front left|No|No|
|Sensor|Tire pressure front right|No|No|
|Sensor|Tire pressure last measured front left|No|No|
|Sensor|Tire pressure last measured front right|No|No|
|Sensor|Tire pressure last measured rear left|No|No|
|Sensor|Tire pressure last measured rear right|No|No|
|Sensor|Tire pressure rear left|No|No|
|Sensor|Tire pressure rear right|No|No|
|Sensor|Traffic delay|No|No|
|Sensor|Usable Battery level|No|No|
|Sensor|Drive unit torque command|No|No|
|Switch|Auto seat climate left|Yes|Yes|
|Switch|Auto seat climate right|Yes|Yes|
|Switch|Auto steering wheel heater|Yes|Yes|
|Switch|Charge|Yes|Yes|
|Switch|Defrost|Yes|Yes|
|Switch|Guest mode|Yes|Yes|
|Switch|Sentry mode|Yes|Yes|
|Switch|Valet mode|Yes|Yes|
|Update|Update|Yes|Yes|

### Energy sites

|Domain|Name|Enabled|
|---|---|---|
|Binary sensor|Backup capable|Yes|
|Binary sensor|Grid services active|Yes|
|Binary sensor|Grid services enabled|Yes|
|Binary sensor|Grid status|Yes|
|Binary sensor|Storm watch active|Yes|
|Calendar|Buy tariff|Yes|
|Calendar|Sell tariff|Yes|
|Number|Backup reserve|Yes|
|Number|Off grid reserve|Yes|
|Select|Allow export|Yes|
|Select|Operation mode|Yes|
|Sensor|Battery power|Yes|
|Sensor|Consumer imported from battery|No|
|Sensor|Consumer imported from generator|No|
|Sensor|Consumer imported from grid|No|
|Sensor|Consumer imported from solar|No|
|Sensor|Energy left|Yes|
|Sensor|Generator exported|Yes|
|Sensor|Generator power|No|
|Sensor|Grid exported|Yes|
|Sensor|Grid exported from battery|No|
|Sensor|Grid exported from generator|No|
|Sensor|Grid exported from solar|No|
|Sensor|Grid imported|No|
|Sensor|Grid power|Yes|
|Sensor|Grid services exported|No|
|Sensor|Grid services imported|No|
|Sensor|Grid services power|Yes|
|Sensor|Home usage|Yes|
|Sensor|Island status|Yes|
|Sensor|Load power|Yes|
|Sensor|Percentage charged|Yes|
|Sensor|Solar exported|No|
|Sensor|Solar generated|Yes|
|Sensor|Solar power|Yes|
|Sensor|Total pack energy|No|
|Sensor|Version|Yes|
|Sensor|VPP backup reserve|Yes|
|Switch|Allow charging from grid|Yes|
|Switch|Storm watch|Yes|

### Wall connector

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Fault state|No|
|Sensor|Power|Yes|
|Sensor|State|Yes|
|Sensor|Vehicle|Yes|

### Metadata

|Domain|Name|Enabled|
|---|---|---|
|Sensor|Teslemetry credits|Yes|

## Actions

Teslemetry provides various custom actions to interact with the Tesla Fleet API directly.

### Navigate to coordinates

`teslemetry.navigation_gps_request`

| Field         | Description                | Example                          |
|---------------|----------------------------|----------------------------------|
| device_id     | The vehicle's device ID    | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| gps           | Dictionary of coordinates  |                                  |
| gps.latitude  | Latitude in degrees        | -27.9699373                      |
| gps.longitude | Longitude in degrees       | 153.4081865                      |
| order         | Order for this destination | 1                                |

### Set scheduled charging

`teslemetry.set_scheduled_charging`

| Field     | Description                           | Example                          |
|-----------|---------------------------------------|----------------------------------|
| device_id | The vehicle's device ID              | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable    | Enable or disable scheduled charging | true                             |
| time      | Time to start charging in HH:MM       | 6:00                             |

### Set scheduled departure

`teslemetry.set_scheduled_departure`

| Field                           | Description                               | Example                          |
|---------------------------------|-------------------------------------------|----------------------------------|
| device_id                       | The vehicle's device ID                  | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable                          | Enable or disable scheduled departure     | true                             |
| preconditioning_enabled         | Enable preconditioning                    | true                             |
| preconditioning_weekdays_only   | Enable preconditioning on weekdays only   | false                            |
| departure_time                  | Planned departure time (HH:MM)         | 6:00                             |
| off_peak_charging_enabled       | Enable off-peak charging                  | false                            |
| off_peak_charging_weekdays_only | Enable off-peak charging on weekdays only | false                            |
| end_off_peak_time               | Time to complete charging by (HH:MM)      | 5:00                             |

### Valet Mode

`teslemetry.valet_mode`

| Field         | Description                  | Example                          |
|---------------|------------------------------|----------------------------------|
| device_id     | The vehicle's device ID      | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable        | Enable or disable valet mode | true                             |
| pin           | 4-digit pin                  | 1234                             |

### Speed Limit

`teslemetry.speed_limit`

| Field         | Description                   | Example                          |
|---------------|-------------------------------|----------------------------------|
| device_id     | The vehicle's device ID       | 0d462c0c4c0b064b1a91cdbd1ffcbd31 |
| enable        | Enable or disable speed limit | true                             |
| pin           | 4-digit pin                   | 1234                             |

### Time of use

`teslemetry.time_of_use`

| Field         | Description                  | Example                                                                                                          |
|---------------|------------------------------|------------------------------------------------------------------------------------------------------------------|
| device_id     | The energy site's device ID  | 0d462c0c4c0b064b1a91cdbd1ffcbd31                                                                                 |
| tou_settings  | Time of use settings         | See [Tesla Fleet API documentation](https://developer.tesla.com/docs/fleet-api#time_of_use_settings) for details |

## Energy dashboard

The Tesla Fleet API only provides power data for Powerwall and Solar products. This means they cannot be used on the energy dashboard directly.

Energy flows can be calculated from `Battery power` and `Grid power` sensors using a [Template Sensor](/integrations/template/) to separate the positive and negative values into positive import and export values.
The `Load power`, `Solar power`, and the templated sensors can then use a [Riemann Sum](/integrations/integration/) to convert their instant power (kW) values into cumulative energy values (kWh),
which then can be used within the energy dashboard.

## Data updates

The Teslemetry integration uses a combination of streaming and polling to fetch data, depending on the vehicle type and configuration.

### Streaming

For most modern vehicles (excluding pre-2021 Model S/X), data is streamed in real-time from the vehicle to Teslemetry, and then streamed to Home Assistant via Server-Sent Events (SSE). This provides low-latency updates for sensors and states. To enable streaming, specific configuration is required on the vehicle, which can be managed in the [Teslemetry Console](https://teslemetry.com/console).

### Polling

Legacy vehicles (pre-2021 Model S/X) and Energy sites use cloud polling.

-   **Legacy Vehicles:** Polled every 60 seconds.
-   **Energy Sites:** Polled every 30 seconds.

The integration is designed to not wake the vehicle to poll for data. Updates for sleeping vehicles will pause until the vehicle wakes up naturally or is interacted with.

## Known limitations

-   **Vehicle Sleep:** The integration will not actively wake a vehicle to fetch data. However, sending commands (such as locking, unlocking, or climate control) will wake the vehicle.
-   **Rate Limits:** While Teslemetry handles upstream rate limiting with Tesla, excessive polling or command usage from aggressive automations may encounter temporary API limits.
-   **Virtual Key:** Modern vehicles require a [virtual key](https://teslemetry.com/docs/topics/virtualkey) to operate. Please follow the instructions on the [Teslemetry Console](https://teslemetry.com/console) to set this up.

## Troubleshooting

### Invalid tokens

If your Teslemetry authentication token becomes invalid or expires, Home Assistant will prompt you to re-authenticate. This typically involves signing in again via the integration's configuration flow.

### Timeouts

Timeouts can occur due to connection issues between Home Assistant, Teslemetry, Tesla, or the vehicle itself (e.g., the vehicle is in an area with poor cellular reception). These are often temporary. If timeouts persist, please contact `support@teslemetry.com`.

## Examples

### Common use cases

-   **Solar Charging:** Automate your vehicle's charging current or state based on excess solar production to maximize renewable energy usage.
-   **Smart Preconditioning:** Use calendar events or time-based triggers to precondition your vehicle's cabin temperature before you depart.
-   **Automatic Garage Door:** Automatically open your garage door when you approach your home while navigating.

### Automations

**Automate charging based on solar production**

```yaml
automation:
  - alias: "Charge Tesla from Solar"
    trigger:
      - platform: numeric_state
        entity_id: sensor.home_solar_power
        above: 3000
    actions:
      - action: switch.turn_on
        target:
          entity_id: switch.my_tesla_charge
      - action: number.set_value
        target:
          entity_id: number.my_tesla_charge_current
        data:
          value: 16
```

**Precondition vehicle before calendar events**

```yaml
automation:
  - alias: "Precondition for Work"
    trigger:
      - platform: calendar
        event: start
        offset: "-00:15:00"
        entity_id: calendar.work
    actions:
      - action: climate.turn_on
        target:
          entity_id: climate.my_tesla_climate
```

### Blueprints

**Open Garage Door based on Navigation**

Uses the distance to arrival sensor to accurately know when you're close to a specific location (such as your home), and open a garage door, or other cover entity. Requires you to be navigating to your intended destination, even if you don't need the directions.

```yaml
blueprint:
  name: Teslemetry Garage Door Opener
  author: Brett Adams
  description: Opens a garage door when your Tesla is approaching
  domain: automation
  input:
    distance_to_arrival_entity:
      name: Distance to arrival entity
      selector:
        entity:
          filter:
            - integration: teslemetry
              domain: sensor
              device_class: distance
    distance_to_arrival:
      name: Distance to arrival value to trigger open
      selector:
        number:
          min: 0
          max: 100
          step: any
          mode: box
    route_entity:
      name: Route entity
      selector:
        entity:
          filter:
            - integration: teslemetry
              domain: device_tracker
    route_zone:
      name: Route destination
      selector:
        entity:
          filter:
            - domain: zone
    cover_entity:
      name: Garage door entity
      selector:
        entity:
          filter:
            - domain: cover
trigger:
  - platform: numeric_state
    entity_id:
      - !input distance_to_arrival_entity
    below: !input distance_to_arrival
    above: 0
condition:
  - condition: zone
    entity_id: !input route_entity
    zone: !input route_zone
actions:
  - action: cover.open_cover
    target:
      entity_id: !input cover_entity
mode: restart
```
