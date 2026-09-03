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

The [virtual key](https://teslemetry.com/docs/topics/virtualkey) is Teslemetry's public key, installed in your vehicle through the Tesla app. It is required for fleet telemetry (live streaming) and signed vehicle commands. Since nearly all vehicles support both, nearly all customers need it: if your vehicle supports the virtual key, install it as a standard setup step. Vehicles without virtual-key support are the exception. They still work with Teslemetry at reduced capability—data by polling instead of streaming, and commands unsigned where Tesla permits.

{% include integrations/config_flow.md %}

## Entities

These are the entities available in the Teslemetry integration. Not all entities are enabled by default, and not all values are always available.
Entities in the device tracker platform specifically require the `Vehicle location` scope, and will appear unavailable otherwise. 
The **Enable keep accessory power** and **Disable keep accessory power** buttons are only created for vehicles on firmware 2025.38 or newer.

### Vehicles

|Domain|Name|Enabled|Data|
|---|---|---|---|
|Binary sensor|Automatic blind spot camera|No|Streaming|
|Binary sensor|Automatic emergency braking off|No|Streaming|
|Binary sensor|Battery heater|No|Both|
|Binary sensor|Blind spot collision warning chime|No|Streaming|
|Binary sensor|BMS full charge|No|Streaming|
|Binary sensor|Brake pedal|No|Streaming|
|Binary sensor|Cabin overheat protection actively cooling|No|Polling|
|Binary sensor|Cellular|Yes|Streaming|
|Binary sensor|Charge cable|Yes|Both|
|Binary sensor|Charge enable request|No|Streaming|
|Binary sensor|Charge port cold weather mode|No|Streaming|
|Binary sensor|Charger has multiple phases|No|Both|
|Binary sensor|Dashcam|No|Polling|
|Binary sensor|DC DC|No|Streaming|
|Binary sensor|Defrost for preconditioning|No|Streaming|
|Binary sensor|Drive rail|No|Streaming|
|Binary sensor|Driver seat belt|No|Streaming|
|Binary sensor|Driver seat occupied|No|Streaming|
|Binary sensor|Emergency lane departure avoidance|No|Streaming|
|Binary sensor|Europe vehicle|No|Streaming|
|Binary sensor|Fast charger present|No|Streaming|
|Binary sensor|Front driver door|Yes|Both|
|Binary sensor|Front driver window|Yes|Both|
|Binary sensor|Front passenger door|Yes|Both|
|Binary sensor|Front passenger window|Yes|Both|
|Binary sensor|GPS state|No|Streaming|
|Binary sensor|Guest mode enabled|No|Streaming|
|Binary sensor|Hazard lights|No|Streaming|
|Binary sensor|High beams|No|Streaming|
|Binary sensor|Homelink nearby|No|Streaming|
|Binary sensor|HVAC auto mode|No|Streaming|
|Binary sensor|High voltage interlock loop fault|No|Streaming|
|Binary sensor|Located at favorite|Yes|Streaming|
|Binary sensor|Located at home|Yes|Streaming|
|Binary sensor|Located at work|Yes|Streaming|
|Binary sensor|Offroad lightbar|No|Streaming|
|Binary sensor|Pin to drive enabled|No|Streaming|
|Binary sensor|Preconditioning enabled|No|Both|
|Binary sensor|Preconditioning|No|Polling|
|Binary sensor|Rear display HVAC|No|Streaming|
|Binary sensor|Rear driver door|Yes|Both|
|Binary sensor|Rear driver window|Yes|Both|
|Binary sensor|Rear passenger door|Yes|Both|
|Binary sensor|Rear passenger window|Yes|Both|
|Binary sensor|Remote start|No|Streaming|
|Binary sensor|Right hand drive|No|Streaming|
|Binary sensor|Scheduled charging pending|No|Both|
|Binary sensor|Seat vent enabled|No|Streaming|
|Binary sensor|Service mode|No|Streaming|
|Binary sensor|Speed limited|No|Streaming|
|Binary sensor|Status|Yes|Both|
|Binary sensor|Supercharger session trip planner|No|Streaming|
|Binary sensor|Tire pressure warning front left|No|Polling|
|Binary sensor|Tire pressure warning front right|No|Polling|
|Binary sensor|Tire pressure warning rear left|No|Polling|
|Binary sensor|Tire pressure warning rear right|No|Polling|
|Binary sensor|Trip charging|No|Polling|
|Binary sensor|User present|Yes|Polling|
|Binary sensor|Wi-Fi|Yes|Streaming|
|Binary sensor|Wiper heat|No|Streaming|
|Button|Disable keep accessory power|Yes|—|
|Button|Enable keep accessory power|Yes|—|
|Button|Flash lights|Yes|—|
|Button|HomeLink|Yes|—|
|Button|Honk horn|Yes|—|
|Button|Keyless driving|Yes|—|
|Button|Play fart|Yes|—|
|Button|Wake|Yes|—|
|Climate|Cabin overheat protection|Yes|Both|
|Climate|Climate|Yes|Both|
|Cover|Charge port door|Yes|Both|
|Cover|Frunk|Yes|Both|
|Cover|Sunroof|No|Polling|
|Cover|Trunk|Yes|Both|
|Cover|Vent windows|Yes|Both|
|Device tracker|Location|Yes|Both|
|Device tracker|Origin|No|Streaming|
|Device tracker|Route|Yes|Both|
|Lock|Charge cable lock|Yes|Both|
|Lock|Lock|Yes|Both|
|Lock|Speed limit|Yes|Both|
|Media player|Media player|Yes|Both|
|Number|Charge current|Yes|Both|
|Number|Charge limit|Yes|Both|
|Select|Seat cooler front left|Yes|Both|
|Select|Seat cooler front right|Yes|Both|
|Select|Seat heater front left|Yes|Both|
|Select|Seat heater front right|Yes|Both|
|Select|Seat heater rear center|No|Both|
|Select|Seat heater rear left|No|Both|
|Select|Seat heater rear right|No|Both|
|Select|Seat heater third row left|No|Polling|
|Select|Seat heater third row right|No|Polling|
|Select|Steering wheel heater|Yes|Both|
|Sensor|Battery level|Yes|Both|
|Sensor|Battery range|Yes|Polling|
|Sensor|BMS state|No|Streaming|
|Sensor|Brake pedal position|No|Streaming|
|Sensor|Brick voltage max|No|Streaming|
|Sensor|Brick voltage min|No|Streaming|
|Sensor|Charge cable|No|Both|
|Sensor|Charge energy added|Yes|Both|
|Sensor|Charge rate|Yes|Polling|
|Sensor|Charger current|Yes|Both|
|Sensor|Charger power|Yes|Both|
|Sensor|Charger voltage|Yes|Both|
|Sensor|Charging|Yes|Both|
|Sensor|Cruise follow distance|No|Streaming|
|Sensor|Cruise set speed|No|Streaming|
|Sensor|Current speed limit|No|Streaming|
|Sensor|DC charging energy in|No|Streaming|
|Sensor|DC charging power|No|Streaming|
|Sensor|Destination|No|Both|
|Sensor|Distance to arrival|Yes|Both|
|Sensor|Driver temperature setting|No|Polling|
|Sensor|Estimate battery range|No|Both|
|Sensor|Exterior color|No|Both|
|Sensor|Fast charger type|No|Both|
|Sensor|Front drive inverter axle speed|No|Streaming|
|Sensor|Front drive inverter battery voltage|No|Streaming|
|Sensor|Front drive inverter heatsink temperature|No|Streaming|
|Sensor|Front drive inverter motor current|No|Streaming|
|Sensor|Front drive inverter state|No|Streaming|
|Sensor|Front drive inverter temperature|No|Streaming|
|Sensor|Front drive unit actual torque|No|Streaming|
|Sensor|Front drive unit stator temperature|No|Streaming|
|Sensor|HVAC power state|No|Streaming|
|Sensor|Ideal battery range|No|Both|
|Sensor|Inside temperature|Yes|Both|
|Sensor|Left temperature request|No|Streaming|
|Sensor|Lifetime energy gained regen|No|
|Sensor|Miles since reset|No|
|Sensor|Odometer|No|Both|
|Sensor|Outside temperature|Yes|Both|
|Sensor|Passenger temperature setting|No|Polling|
|Sensor|Power|No|Polling|
|Sensor|Rear drive inverter axle speed|No|Streaming|
|Sensor|Rear drive inverter battery voltage|No|Streaming|
|Sensor|Rear drive inverter heatsink temperature|No|Streaming|
|Sensor|Rear drive inverter motor current|No|Streaming|
|Sensor|Rear drive inverter state|No|Streaming|
|Sensor|Rear drive inverter temperature|No|Streaming|
|Sensor|Rear drive unit actual torque|No|Streaming|
|Sensor|Rear drive unit stator temperature|No|Streaming|
|Sensor|Rear left drive inverter axle speed|No|Streaming|
|Sensor|Rear left drive inverter battery voltage|No|Streaming|
|Sensor|Rear left drive inverter heatsink temperature|No|Streaming|
|Sensor|Rear left drive inverter motor current|No|Streaming|
|Sensor|Rear left drive inverter state|No|Streaming|
|Sensor|Rear left drive inverter temperature|No|Streaming|
|Sensor|Rear left drive unit actual torque|No|Streaming|
|Sensor|Rear left drive unit stator temperature|No|Streaming|
|Sensor|Rear right drive inverter axle speed|No|Streaming|
|Sensor|Rear right drive inverter battery voltage|No|Streaming|
|Sensor|Rear right drive inverter heatsink temperature|No|Streaming|
|Sensor|Rear right drive inverter motor current|No|Streaming|
|Sensor|Rear right drive inverter state|No|Streaming|
|Sensor|Rear right drive inverter temperature|No|Streaming|
|Sensor|Rear right drive unit actual torque|No|Streaming|
|Sensor|Rear right drive unit stator temperature|No|Streaming|
|Sensor|Right temperature request|No|Streaming|
|Sensor|Roof color|No|Both|
|Sensor|Scheduled charging mode|No|Streaming|
|Sensor|Scheduled charging start time|No|Both|
|Sensor|Scheduled departure time|No|Both|
|Sensor|Secondary drive unit torque command|No|Streaming|
|Sensor|Self-driving miles since reset|No|
|Sensor|Sentry mode|Yes|Streaming|
|Sensor|Shift state|No|Both|
|Sensor|Speed|No|Both|
|Sensor|State of charge at arrival|No|Both|
|Sensor|Time at arrival|Yes|Both|
|Sensor|Time at full charge|Yes|Both|
|Sensor|Time to arrival|Yes|Both|
|Sensor|Time to full charge|Yes|Both|
|Sensor|Tire pressure front left|No|Both|
|Sensor|Tire pressure front right|No|Both|
|Sensor|Tire pressure last measured front left|No|Both|
|Sensor|Tire pressure last measured front right|No|Both|
|Sensor|Tire pressure last measured rear left|No|Both|
|Sensor|Tire pressure last measured rear right|No|Both|
|Sensor|Tire pressure rear left|No|Both|
|Sensor|Tire pressure rear right|No|Both|
|Sensor|Traffic delay|No|Both|
|Sensor|Usable Battery level|No|Both|
|Sensor|Drive unit torque command|No|Streaming|
|Switch|Auto seat climate left|Yes|Both|
|Switch|Auto seat climate right|Yes|Both|
|Switch|Auto steering wheel heater|Yes|Both|
|Switch|Charge|Yes|Both|
|Switch|Defrost|Yes|Both|
|Switch|Guest mode|Yes|Streaming|
|Switch|Sentry mode|Yes|Both|
|Switch|Valet mode|Yes|Both|
|Update|Update|Yes|Both|

### Energy sites

|Domain|Name|Enabled|Data|
|---|---|---|---|
|Binary sensor|Backup capable|Yes|Polling|
|Binary sensor|Grid services active|Yes|Polling|
|Binary sensor|Grid services enabled|Yes|Polling|
|Binary sensor|Grid status|Yes|Polling|
|Binary sensor|Storm watch active|Yes|Polling|
|Calendar|Buy tariff|Yes|Polling|
|Calendar|Sell tariff|Yes|Polling|
|Number|Backup reserve|Yes|Polling|
|Number|Off grid reserve|Yes|Polling|
|Select|Allow export|Yes|Polling|
|Select|Operation mode|Yes|Polling|
|Sensor|Battery power|Yes|Polling|
|Sensor|Consumer imported from battery|No|Polling|
|Sensor|Consumer imported from generator|No|Polling|
|Sensor|Consumer imported from grid|No|Polling|
|Sensor|Consumer imported from solar|No|Polling|
|Sensor|Energy left|Yes|Polling|
|Sensor|Generator exported|Yes|Polling|
|Sensor|Generator power|No|Polling|
|Sensor|Grid exported|Yes|Polling|
|Sensor|Grid exported from battery|No|Polling|
|Sensor|Grid exported from generator|No|Polling|
|Sensor|Grid exported from solar|No|Polling|
|Sensor|Grid imported|No|Polling|
|Sensor|Grid power|Yes|Polling|
|Sensor|Grid services exported|No|Polling|
|Sensor|Grid services imported|No|Polling|
|Sensor|Grid services power|Yes|Polling|
|Sensor|Home usage|Yes|Polling|
|Sensor|Island status|Yes|Polling|
|Sensor|Load power|Yes|Polling|
|Sensor|Percentage charged|Yes|Polling|
|Sensor|Solar exported|No|Polling|
|Sensor|Solar generated|Yes|Polling|
|Sensor|Solar power|Yes|Polling|
|Sensor|Total pack energy|No|Polling|
|Sensor|Version|Yes|Polling|
|Sensor|VPP backup reserve|Yes|Polling|
|Switch|Allow charging from grid|Yes|Polling|
|Switch|Storm watch|Yes|Polling|

### Wall connector

|Domain|Name|Enabled|Data|
|---|---|---|---|
|Sensor|Fault state|No|Polling|
|Sensor|Power|Yes|Polling|
|Sensor|State|Yes|Polling|
|Sensor|Vehicle|Yes|Polling|

### Metadata

|Domain|Name|Enabled|Data|
|---|---|---|---|
|Sensor|Teslemetry credits|Yes|Streaming|

{% include integrations/actions.md %}

## Energy dashboard

The Tesla Fleet API only provides power data for Powerwall and Solar products. This means they cannot be used on the energy dashboard directly.

Energy flows can be calculated from `Battery power` and `Grid power` sensors using a [Template Sensor](/integrations/template/) to separate the positive and negative values into positive import and export values.
The `Load power`, `Solar power`, and the templated sensors can then use a [Riemann Sum](/integrations/integration/) to convert their instant power (kW) values into cumulative energy values (kWh),
which then can be used within the energy dashboard.

## Data updates

Teslemetry delivers data by streaming or polling, depending on the product. The **Data** column in the entity tables above shows how each entity is updated:

- **Streaming**: the value arrives over the live stream in real time.
- **Polling**: the value comes from Teslemetry's cached vehicle data.
- **Both**: the value can arrive by streaming or polling, depending on the vehicle and its configuration.
- **—** (em dash): the entity does not report data. Buttons send commands, so they have no data source.

### Vehicle data

Most vehicles stream their data to Home Assistant in real time over Server-Sent Events (SSE), with no per-update cost. The integration sets up and manages this streaming configuration for you.

Pre-2021 Model S and Model X vehicles cannot stream. For these vehicles, Teslemetry automatically refreshes their data on its own servers at no cost to you. A non-streaming vehicle is refreshed roughly every 15 minutes, and a vehicle that Tesla marks as discounted is refreshed much more often, roughly every 90 seconds. Both are free.

Credits are only spent on an on-demand fresh full-vehicle-data fetch, which costs 2 credits, or 0.1 credit for a discounted vehicle.

On a streaming vehicle, **Polling** entities read from Teslemetry's cached vehicle data instead of the live stream. Their values are not streamed and do not refresh on their own, which is why many of them are disabled by default. Enabling one is not a switch for Teslemetry's free automatic polling, and Home Assistant never bypasses the cache or forces a refresh on its own.

If your vehicle is unpaired and streams through the safety screen, an enabled polling entity reads the cached vehicle data every 60 seconds while the vehicle is online. Most of those reads are free cache hits. Each time the cached data passes 20 minutes old, the next read becomes a charged fresh fetch at that cost, so it recurs for as long as the vehicle stays online. Streaming updates do not reset this 20-minute window.

The integration does not wake a sleeping vehicle to fetch data. Updates pause until the vehicle wakes up on its own or you interact with it.

### Energy site data

Energy sites are cloud-polled: live status and site information every 30 seconds, and energy history every 60 seconds.

## Known limitations

-   **Vehicle Sleep:** The integration will not actively wake a vehicle to fetch data. However, sending commands (such as locking, unlocking, or climate control) will wake the vehicle.
-   **Rate Limits:** While Teslemetry handles upstream rate limiting with Tesla, excessive polling or command usage from aggressive automations may encounter temporary API limits.
-   **Virtual Key:** See [Prerequisites](#prerequisites) for when a virtual key is needed. To set one up, follow the instructions on the [Teslemetry Console](https://teslemetry.com/console).

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
