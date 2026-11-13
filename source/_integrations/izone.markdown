---
description: Instructions on how to integrate iZone climate control devices with Home Assistant.
ha_release: '0.100'
ha_domain: izone
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **iZone** {% term integration %} lets you monitor and control local [iZone](https://izone.com.au/) ducted reverse-cycle climate control systems. These systems are largely available in Australia.

Use it to control your air conditioner and each of its zones from Home Assistant. For example, you can set the target temperature and airflow for each room on its own schedule, switch to outside air when it's cooler than inside, or get notified when a damper or sensor reports a fault.

## Supported devices

Any current iZone unit with ducted reverse cycle air-conditioning and an iZone Smart Hub installed should work. The Smart Hub was formerly called the CB bridge, and comes in wired and wireless versions.

## Unsupported devices

The following iZone products are not supported by the integration:

- iZone lights
- iZone reticulation
- Other iZone devices that aren't part of the air conditioning system

## Prerequisites

Before you set up the integration, make sure that:

- Your iZone system has a Smart Hub installed, either wired or wireless, and the Smart Hub is paired with the iZone controller.
- The Smart Hub is connected to your local network, and Home Assistant can reach it. To find the Smart Hub automatically, Home Assistant and the Smart Hub need to be on the same network segment. For details, see [Network settings](#network-settings).

{% include integrations/config_flow.md %}

{% configuration_basic %}
Setup method:
  description: Choose **Search for devices** to look for controllers on your local network, or **Enter host** to type the controller IP address or hostname.
Host:
  description: The address of your Smart Hub. Shown when you choose **Enter host**, or when **Search for devices** does not find a controller.
{% endconfiguration_basic %}

If **Search for devices** does not find a controller, Home Assistant asks for the address instead. Use **Enter host** when UDP discovery traffic is blocked between Home Assistant and the Smart Hub.

{% tip %}
Smart Hubs also advertise themselves for Apple HomeKit. Home Assistant may therefore show a separate [HomeKit Device](/integrations/homekit_controller/) discovery for the same Smart Hub. Set up the **iZone** discovery (or add iZone manually) and ignore the HomeKit Device discovery. The HomeKit Device path does not provide working climate control for these Smart Hubs.
{% endtip %}

## Multiple iZone systems

If you have more than one iZone system on your local network, the iZone integration discovers all available controllers and shows them during setup. You can then choose the controller you want to configure.

Any other controllers found during the search will become available as discovered controllers.

To keep a controller out of Home Assistant, select **Ignore** on its discovered card.

## Network settings

Once set up, Home Assistant controls the Smart Hub over HTTP on TCP port `80`. Your Home Assistant host must be able to reach the Smart Hub by IP address or hostname on your local network.

UDP broadcast discovery is used to find controllers on the LAN (for example **Search for devices**), to notice new Smart Hubs, and to pick up IP address changes. For discovery to work reliably, Home Assistant and the Smart Hub usually need to be on the same local network segment, like the same VLAN. If they are on different segments, standard routing is usually not enough. Your network must support a UDP broadcast relay, directed broadcast, or a similar feature to forward this traffic between segments.

Discovery uses outbound UDP packets to destination port `12107` and listens locally for inbound UDP iZone messages on port `7005`. The integration currently listens on `0.0.0.0` and sends discovery to local IPv4 broadcast addresses, which is not configurable.

If UDP discovery traffic is blocked, you can still set up a controller by choosing **Enter host** and providing the Smart Hub IP address or hostname, as long as HTTP on port `80` works. Without working UDP discovery, Home Assistant will not automatically find new controllers or follow IP address changes.

## Supported functionality

The integration creates a device for each iZone controller, and a device for each of its zones.

### Controller

The controller climate entity controls the air conditioning unit:

- **Modes**: **Off**, **Heat**, **Cool**, **Heat/Cool**, **Dry**, and **Fan only**. **Heat/Cool** is the iZone auto mode, where the unit chooses between heating and cooling.
- **Fan modes**: **Low**, **Medium**, **High**, **Top**, and **Auto**. Only the fan speeds your unit supports are available.
- **Presets**: **Eco**, on units fitted with the iSave system, which vents external air into the house. While **Eco** is on, the controller shows **Fan only**, and only **Off** and **Fan only** are available.

The entity exposes a `supply_temperature` attribute. Use the **Supply temperature** sensor entity (below) instead.

#### Zone control mode

In zone control mode, a zone drives the air conditioner instead of the unit's return air sensor. Each zone with a temperature sensor has its own target temperature. Depending on the system setting, iZone either picks the zone that is furthest from its target (zones mode), or always uses the zone selected as the control zone (master mode).

Home Assistant mirrors this on the controller climate entity:

- The controller's current temperature follows the room sensor of the controlling zone.
- The `control_zone_source` attribute contains the entity ID of the controlling zone's climate entity.
- The controller has no target temperature. Set the target temperature on the zone climate entities instead.

When iZone selects a different zone, the controller's current temperature can jump.

#### Return air sensor mode

The controller uses the unit's return air sensor, and you set the target temperature on the controller, when:

- The system is set to return air sensor (RAS) mode.
- The system is in master mode, and the control zone is set to the unit itself.
- A climate-controlled (auto) zone has no room temperature reading, for example because its sensor stopped reporting. The controller switches back to zone control when the sensor reports again.

In this mode, the controller's current temperature is the return air temperature, and the `control_zone_source` attribute is not present.

When the **Eco** preset is on, the controller's current temperature is the supply air temperature in both modes.

#### Legacy attributes

The controller climate entity also has the attributes `control_zone`, `control_zone_name`, and `control_zone_setpoint`. For new automations and dashboards, use `control_zone_source` instead. To get the target temperature of the controlling zone, read the `temperature` attribute of the climate entity it names.

#### Sensors

The integration creates the following {% term sensor %} entities for each controller:

- **Supply temperature**: (diagnostic) The temperature of the air leaving the indoor unit into the ductwork.
- **Return temperature**: (diagnostic) The temperature of the air returning to the indoor unit.

These sensors always report the unit duct temperatures. They do not change when a different zone is controlling the system.

### Zones

Each zone has a climate entity. iZone zones have three modes: closed, open, and auto. These map to the Home Assistant modes **Off**, **Fan only**, and **Heat/Cool**. Only climate-controlled zones, which have a temperature sensor, have the auto mode, and you can only set the target temperature while the zone is in auto.

#### Zone dampers

Each zone has the following entities for its damper:

- **Damper minimum**: (configuration) How far the damper stays open at its most closed, as a percentage. You can set it in steps of 5%.
- **Damper maximum**: (configuration) How far the damper opens at its most open, as a percentage. You can set it in steps of 5%.
- **Damper position**: The position the controller is driving the damper to, as a percentage.

If your installer has locked airflow adjustment on the iZone controller, **Damper minimum** and **Damper maximum** are unavailable. If only the minimum airflow is locked, only **Damper minimum** is unavailable.

**Damper position** is only created for zones that report a damper position. Some systems don't report it and show a constant 50%, so the entity is disabled by default unless at least one zone reports a different value. To use it anyway, [enable the entity](/docs/configuration/customizing-devices/#disabling-or-enabling-an-entity).

The damper position is best-effort, and some controllers don't report it correctly. The value can differ from the zone's mode. For example, the controller may briefly open a closed zone used as a constant or bypass, and positions drop to 0 a few minutes after the system turns off. Your installer's balance settings can also limit the damper beyond the minimum and maximum set here.

Damper position isn't a percentage of airflow, because airflow doesn't change linearly with damper position.

#### Wireless zone sensors

Zones with a wireless temperature sensor have the following {% term sensor %} entities:

- **RF signal**: (diagnostic) The radio signal strength of the zone sensor, as a percentage. This entity is disabled by default. To use it, [enable the entity](/docs/configuration/customizing-devices/#disabling-or-enabling-an-entity).
- **Battery**: (diagnostic) The battery level of the zone sensor, as a percentage.

The iZone controller only reports these in coarse steps. The RF signal is 100%, 50%, 25%, or 0%, and the battery is 100%, 50%, or 0%. The RF signal and battery sensors are only created for zones with a wireless sensor, and only if your Smart Hub reports the values.

#### Zone faults

Zones can have the following {% term "binary sensor" %} entities, which are created only when your Smart Hub reports the corresponding fault status. They show **Problem** when the iZone controller reports a fault, and **OK** otherwise:

- **Damper fault**: (diagnostic) The controller reports a fault with the zone damper motor.
- **Sensor fault**: (diagnostic) The controller reports a fault with the zone temperature sensor.

**Sensor fault** is also only created for zones with a temperature sensor. Older Smart Hubs don't report sensor faults.

{% include integrations/actions.md %}

## iZone automation examples

Each zone has its own climate entity, so you can automate each room separately. Here are a few ideas to get you started.

{% include docs/paste_yaml_tip.md %}

### Automation: Open all zones when Eco turns on

When the **Eco** preset is on, the iSave system vents outside air into the house. To spread the outside air through every room, open all zones when **Eco** turns on.

- **Trigger**: The controller preset changes to **Eco**
- **Action**: Set all zones to **Fan only**, which opens them

{% details "YAML example for opening all zones when Eco turns on" %}

{% example %}
automation: |
  alias: "Open all zones when Eco turns on"
  triggers:
    - trigger: state
      entity_id: climate.izone_controller
      attribute: preset_mode
      to: eco
  actions:
    - action: climate.set_hvac_mode
      target:
        entity_id:
          - climate.bedroom
          - climate.living_room
          - climate.office
      data:
        hvac_mode: fan_only
{% endexample %}

{% enddetails %}

### Automation: Get notified when a zone sensor needs attention

Get a notification when the battery of a wireless zone sensor runs low, or when the iZone controller reports a fault with a zone sensor. That way, you can replace the battery or check the sensor before the zone stops reporting its temperature.

- **Triggers**:
  - A zone **Battery** sensor drops to 50% or below
  - A zone **Sensor fault** entity changes to **Problem**
- **Action**: Create a notification that names the entity

{% details "YAML example for getting notified when a zone sensor needs attention" %}

{% example %}
automation: |
  alias: "Notify when an iZone zone sensor needs attention"
  triggers:
    # The battery only reports 100%, 50%, or 0%, so warn at 50%
    - trigger: numeric_state
      entity_id:
        - sensor.bedroom_battery
        - sensor.office_battery
      below: 51
    - trigger: state
      entity_id:
        - binary_sensor.bedroom_sensor_fault
        - binary_sensor.office_sensor_fault
      to: "on"
  actions:
    - action: persistent_notification.create
      data:
        title: "iZone zone sensor needs attention"
        message: "Check {{ trigger.to_state.name }}."
{% endexample %}

{% enddetails %}

### Automation: Run a zone on a schedule

Use a [schedule](/integrations/schedule/) helper to set when a zone is in use, and change the times from the UI without editing the automation. When the schedule turns on, the zone switches to climate control with a comfortable target temperature. When it turns off, the zone closes.

- **Triggers**: The schedule turns on or off
- **Actions**:
  - When the schedule turns on: set the bedroom zone to **Heat/Cool**, then set the target temperature to 20 °C
  - When the schedule turns off: turn off the bedroom zone

{% details "YAML example for running a zone on a schedule" %}

{% example %}
automation: |
  alias: "Run the bedroom zone on a schedule"
  triggers:
    - trigger: state
      entity_id: schedule.bedroom
      to: "on"
      id: "start"
    - trigger: state
      entity_id: schedule.bedroom
      to: "off"
      id: "stop"
  actions:
    - choose:
        - conditions:
            - condition: trigger
              id: "start"
          sequence:
            # Set the mode first, a closed zone has no target temperature
            - action: climate.set_hvac_mode
              target:
                entity_id: climate.bedroom
              data:
                hvac_mode: heat_cool
            - action: climate.set_temperature
              target:
                entity_id: climate.bedroom
              data:
                temperature: 20
        - conditions:
            - condition: trigger
              id: "stop"
          sequence:
            - action: climate.turn_off
              target:
                entity_id: climate.bedroom
{% endexample %}

{% enddetails %}

## Data updates

The integration {% term polling polls %} each iZone controller every 25 seconds. When you change a setting from Home Assistant, the new state shows right away. Changes made with the iZone app or on the iZone touchscreen show up at the next update.

The integration listens for iZone UDP discovery messages. These let Home Assistant find new Smart Hubs, and follow a Smart Hub that gets a new IP address. If a Smart Hub stops responding, Home Assistant sends a discovery request to look for it at a new address. For what discovery needs from your network, see [Network settings](#network-settings).

If your iZone installation changes, for example when your installer adds or removes zones, the integration reloads automatically to pick up the changes. Devices for zones that no longer exist are removed.

## Known limitations

The iZone system hardware has the following limitations:

- The iZone system accepts target temperatures in 0.5 °C steps, and damper minimum and maximum in 5% steps.
- The damper position is best-effort, and some iZone controllers don't report it correctly. For details, see [Zone dampers](#zone-dampers).
- The iZone controller reports wireless sensor signal strength and battery levels in coarse steps.
- iZone discovery uses UDP broadcasts, which don't cross network segments without a broadcast relay. A Smart Hub on a different segment, like another VLAN, isn't discovered. You can still add it with **Enter host**, but Home Assistant won't follow IP address changes.
- Smart Hubs also advertise themselves for Apple HomeKit, so they show up as a HomeKit Device discovery as well. That path doesn't provide working climate control, so use the iZone integration instead.

## Troubleshooting

{% details "Search for devices doesn't find the controller" %}

### Symptom: "No devices found on the network"

When you choose **Search for devices**, Home Assistant doesn't find your iZone controller, and asks for the Smart Hub address instead.

#### Description

Home Assistant finds Smart Hubs with UDP broadcasts. The broadcasts don't reach the Smart Hub, or its reply doesn't reach Home Assistant. This usually happens when Home Assistant and the Smart Hub are on different network segments, like different VLANs, or when a firewall blocks the UDP ports.

#### Resolution

1. Make sure the Smart Hub is powered on and connected to your network.
2. Enter the Smart Hub IP address or hostname in the **Host** field. You can find the address in your router's list of connected devices.
3. To use discovery, put Home Assistant and the Smart Hub on the same network segment, or set up a UDP broadcast relay. For the ports discovery uses, see [Network settings](#network-settings).

{% enddetails %}

{% details "Home Assistant can't connect to the Smart Hub address" %}

### Symptom: "Failed to connect"

When you enter the Smart Hub address in the **Host** field, the form shows the message "Failed to connect".

#### Description

Home Assistant can't reach the Smart Hub over HTTP on TCP port `80` at the address you entered.

#### Resolution

1. Check that the address is correct. The Smart Hub address can change if your router assigns a new one.
2. Make sure the Smart Hub is powered on and connected to your network.
3. Make sure no firewall blocks TCP port `80` between Home Assistant and the Smart Hub.

To keep the address from changing, reserve an IP address for the Smart Hub in your router.

{% enddetails %}

{% details "The Smart Hub isn't paired" %}

### Symptom: "This iZone Smart Hub is not paired with an air conditioner"

When you set up the integration, the form shows the message "This iZone Smart Hub is not paired with an air conditioner". Or the integration entry shows the error "iZone Smart Hub is not paired with an air conditioner".

#### Description

The Smart Hub is on your network, but it isn't connected to an iZone system.

#### Resolution

1. Pair the Smart Hub with your iZone system. For instructions, see the manual for your iZone system, the [iZone FAQ](https://izone.com.au/faqs/), or ask your installer.
2. Set up the integration again. If the integration entry shows the error, reload it from its three-dot {% icon "mdi:dots-vertical" %} menu.

{% enddetails %}

{% details "Entities are unavailable" %}

### Symptom: The iZone entities are unavailable, or the integration keeps retrying setup

All the entities of an iZone controller are unavailable, or the integration entry shows that it's retrying setup.

#### Description

Home Assistant can't get the state of the iZone system. Either the Smart Hub doesn't respond, or the Smart Hub responds but reports that the iZone system is offline. This can happen when the Smart Hub or the air conditioning unit loses power, or when the Smart Hub loses its network connection.

#### Resolution

1. Make sure the Smart Hub is powered on and connected to your network.
2. Make sure the air conditioning unit and the iZone touchscreen have power.
3. Wait for the next update. Home Assistant keeps retrying, and the entities become available again when the system responds.

If the Smart Hub got a new IP address and UDP discovery can't reach it, Home Assistant can't find it again. Make sure discovery works, as described in [Network settings](#network-settings), or reserve an IP address for the Smart Hub in your router.

{% enddetails %}

### Diagnostics

The iZone {% term integration %} provides diagnostics to help with troubleshooting. The download includes:

- Redacted config entry data
- A snapshot of the discovery service (when it is running)
- A snapshot of the controller state

Hosts and IP addresses are redacted in the file.

To download diagnostics:

1. Go to {% my integrations title="**Settings** > **Devices & services**" %}.
2. Select the **iZone** integration.
3. Open the three-dot {% icon "mdi:dots-vertical" %} menu on the integration entry and select **Download diagnostics**.

Attach the downloaded file when reporting an issue. For more information, see [Download diagnostics](/docs/configuration/troubleshooting/#download-diagnostics).

### Debugging

If you're trying to track down issues with the integration, set up logging for it:

```yaml
# Example configuration.yaml with logging for iZone
logger:
  default: warning
  logs:
    homeassistant.components.izone: debug
    pizone: debug
```

This will help you to find network connection issues.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}
