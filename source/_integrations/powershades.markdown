---
title: PowerShades
description: Instructions on how to integrate PowerShades motorized shades with Home Assistant.
ha_category:
  - Cover
ha_release: 2026.7
ha_iot_class: Local Push
ha_config_flow: true
ha_codeowners:
  - '@vemboy200'
ha_domain: powershades
ha_platforms:
  - cover
ha_integration_type: device
ha_quality_scale: silver
ha_dhcp: true
---

The **PowerShades** {% term integration %} allows you to control [PowerShades](https://powershades.com) motorized shades. It communicates with the shade controller directly over your local network using UDP, so no cloud connection is required.

This integration is tested with PoE and Wi-Fi PowerShades controllers. Support for the RF hub may be limited or non-existent. If you have RF shades, it is recommended to use a [Bond](/integrations/bond/) bridge to connect them to Home Assistant instead. If you already have a PowerShades RF hub and would like to help test this integration with it, please [open an issue](https://github.com/home-assistant/core/issues).

## Supported devices

Any PoE or Wi-Fi PowerShades shade with UDP communication enabled, and on the same local network as Home Assistant.

## Prerequisites

It is currently unknown whether UDP communication is enabled by default on every PowerShades device. If the auto-discovery cannot find your shade, and/or entering its IP address manually results in a "cannot connect" error, you may need to enable UDP on the device itself.

### Finding your shade's IP address

Discovery will usually find shades on your network automatically. If you need to enter an IP address manually, you can find it in one of these ways:

- **Via the PowerShades app (recommended)**: Open the PowerShades app, navigate to your shade, and select **Enable Configuration**, then confirm the pop-up. Then scroll down to see the IP address of your shade
- **Via your router**: Go to your router's client list. The clients with a name contianing "Wideband Labs LLC" are most likely your Powershades devices.

{% include integrations/config_flow.md %}

### Configuration parameters

{% configuration_basic %}
IP Address:
  description: "The IP address of your shade, can be autofilled by autodiscovery"
{% endconfiguration_basic %}

If your shade's IP address changes later (for example, after a DHCP reassignment), and Home Assistant does not auto resolve the problem, then you have to remove and re-add the entry

## Supported functionality

### Cover

Each shade is represented as a cover entity, which supports:

- **Open** and **close** the shade fully.
- **Set position**, to move the shade to a specific position between 0% and 100%.
- **Stop**, to stop the shade while it is moving.


## Data updates

While this integration's IoT class is local push, in reality it is a combination of 3 IoT classes:

- **Local push**: When Home Assistant is the one controlling the shade, called the **"UDP master"**, the shade pushes its status roughly every 10 seconds on its own, and also sends an extra push the instant it reaches its target position, so Home Assistant knows it has stopped moving without waiting for the next poll.
- **Local polling**: Home Assistant polls the shade every 10 seconds (or every 5 seconds while the position is unknown). This is used for when the shades moves by an external source, since they would not push updates to Home Assistant, because that source (If its using UDP communication like Home Assistant) is the UDP master.
- **Assumed state**: The state of the shade (opening, closing, opened, or closed) is assumed by Home Assistant since the Shade only sends it's % open to Home Assistant. This means that the state shown in Home Assistant may not be accurate to what the shade is acutally doing, especially if Home Assistant is not the one controlling it.
    - If Home Assistant is controlling the shade then it will assume that the command was sent successfully and the shade is moving. It also assumes that when the shade reaches the % Home Assistant told it open at it has stopped.
    - However, when an external source controls the shade, Home Assistant assumes the state of the shade based on change of % opened of the shade. Home Assistant will assume it is going to the fully open or closed state, but if the % open hasnt change in 15 seconds, then it will assume it has stopped moving.

All communication is local with this integration, and does not require an internet connection at all.

## Known limitations

- PowerShades devices send push updates only to the UDP master. If Home Assistant is not the UDP master, then it can only get the shade's status by polling.
- This also affects other hubs that communicate over UDP, (for example, Control4) but solely rely on push data, since they will have an outdated status of the shade if Home Assistant or any other source controls it.
- The shade's reported state (opening, closing, opened, or closed) is assumed by Home Assistant and may not always be accurate. See [Data updates](#data-updates) for more info.
- The shade must be on the same network subnet as Home Assistant, or UDP broadcast traffic must be routed between subnets.
- Only PoE and Wi-Fi shades are fully supported. For RF PowerShades, use a [Bond](/integrations/bond/) bridge for full support. If you have the Powershades RF hub, it would be helpful to tell the integration owner your experience using it with this integration, and help make it compatible with this integration.
- Your shade may randomly go unavailable for anywhere between 10-120 seconds. This is normal behavior.

## Troubleshooting

### Cannot connect, or the cover entity is unavailable

This means Home Assistant cannot communicate with the shade. Check the following:

- The shade is powered on and connected to your network.
- Home Assistant can reach port 42 on the shade, and UDP broadcasts are routed between subnets if Home Assistant and the shade are on different ones.
- The IP address entered is correct and is not already used by another config entry. If the shade's IP address has changed due to DHCP, remove and readd the config entry, and set a DHCP reservation for the shade.

### Enabling debug logging

To get more detailed logs:

- Go to {% my integrations title="**Settings** > **Devices & services**" %} and select the PowerShades integration.
- Select the three-dot {% icon "mdi:dots-vertical" %} menu in the top right corner and select **Enable debug logging**.
- Reproduce the issue, then return to the same menu and select **Disable debug logging** to download the logs.

## Automation examples

Open a shade in the morning:

Trigger: `time` is `"07:00:00"`

Action: `cover:open_cover` to the `cover.bedroom_shade entity`

{% details "YAML example for opening a shade in the morning" %}

{% example %}
automation: |
  alias: "Open bedroom shade"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: cover.open_cover
      target:
        entity_id: cover.bedroom_shade
  mode: single
{% endexample %}

{% enddetails %}

Close shades at sunset:

Trigger: `state` of `sensor.sun_next_sunset` changes

Condition: `cover.bedroom_shade entity` is `open`

Action: `cover:close_cover` to the `cover.bedroom_shade entity`

{% details "YAML example for closing shades at dusk" %}

{% example %}
automation: |
  alias: "Close shades at sunset"
  triggers:
    - trigger: state
      entity_id:
        - sensor.sun_next_sunset
  conditions:
    - condition: state
      entity_id: cover.bedroom_shade
      state: "open"
  actions:
    - action: cover.close_cover
      target:
        entity_id:
          - cover.bedroom_shade
  mode: single
{% endexample %}

{% enddetails %}

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}

If you can, please disable UDP on your shades if there isn't another source using it, since anyone on your local network can send commands and read the shade's status without any authentication.

## Acknowledgments

This integration builds on the [powershades-homeassistant](https://github.com/dstocking/powershades-homeassistant) custom integration created by [@dstocking](https://github.com/dstocking), who reverse-engineered the PowerShades UDP protocol, and made the base of this integration.
