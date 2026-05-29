---
title: Tailwind
description: Instructions on how to integrate a Tailwind garage door controller with Home Assistant.
ha_category:
  - Cover
ha_release: 2024.1
ha_iot_class: Local Polling
ha_config_flow: true
ha_codeowners:
  - '@frenck'
ha_domain: tailwind
ha_zeroconf: true
ha_platforms:
  - binary_sensor
  - button
  - cover
  - diagnostics
  - number
ha_integration_type: device
ha_dhcp: true
related:
  - docs: /docs/configuration/troubleshooting/#debug-logs-and-diagnostics
    title: Debug logs and diagnostics
---

The **Tailwind** {% term integration %} lets you control your [Tailwind](https://gotailwind.com/) garage door controller fully locally, without relying on cloud services.

Use cases for this integration include:

- Opening and closing your garage door from the Home Assistant UI or automations.
- Monitoring whether the garage door is currently open or closed.
- Automating your garage door based on presence detection, for example, opening it when you arrive home.
- Adjusting the brightness of the status LED on the Tailwind device.

## Supported devices

The following Tailwind devices are supported:

- [Tailwind iQ3](https://gotailwind.com/products/iq3-smart-garage-controller)

## Prerequisites

Before setting up this integration, make sure your Tailwind device is set up, connected to your network, and configured in the Tailwind app.

You will need the following information during setup:

- **The IP address of your Tailwind device.** In the Tailwind app, select the cog icon on your device. The IP address is shown in the **Device Info** section.
- **The local control key token.** Go to the [Tailwind web portal](https://web.gotailwind.com/client/integration/local-control-key), sign in with your Tailwind account, and select the **Local Control Key** tab. The 6-digit number shown is your local control key token.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: "The hostname or IP address of your Tailwind device."
Local control key token:
  description: "The 6-digit local control key token from the [Tailwind web portal](https://web.gotailwind.com/client/integration/local-control-key)."
{% endconfiguration_basic %}

To change the host or local control key token after setup, go to {% my integrations title="**Settings** > **Devices & services**" %}, select the **Tailwind** integration, and select **Reconfigure**.

## Supported functionality

### Covers

The integration creates a cover entity for each garage door connected to your Tailwind controller. You can open and close the door and see its current state (open or closed).

### Binary sensors

- **Operational problem**
  - **Description**: Indicates whether the door has an operational problem (locked out).
  - **Entity category**: Diagnostic

### Buttons

- **Identify**
  - **Description**: Flashes the status LED on the Tailwind device so you can identify it.
  - **Entity category**: Configuration

### Numbers

- **Status LED brightness**
  - **Description**: Controls the brightness of the status LED on the Tailwind device (0 to 100%).
  - **Entity category**: Configuration

## Examples

### Notify when the garage door is left open

Send a mobile notification when the garage door has been open for more than 10 minutes:

```yaml
alias: "Notify when garage door left open"
triggers:
  - trigger: state
    entity_id: cover.garage_door
    to: "open"
    for:
      minutes: 10
actions:
  - action: notify.send_message
    target:
      entity_id: notify.my_device
    data:
      title: "Garage door"
      message: "The garage door has been open for 10 minutes."
```

### Close the garage door at bedtime if left open

Automatically close the garage door when you activate your bedtime scene, but only if it is currently open:

```yaml
alias: "Close garage door at bedtime"
triggers:
  - trigger: state
    entity_id: scene.bedtime
conditions:
  - condition: state
    entity_id: cover.garage_door
    state: "open"
actions:
  - action: cover.close_cover
    target:
      entity_id: cover.garage_door
```

### Close the garage door when everyone leaves home

Close the garage door automatically when nobody is home:

```yaml
alias: "Close garage door when leaving home"
triggers:
  - trigger: state
    entity_id: zone.home
    to: "0"
conditions:
  - condition: state
    entity_id: cover.garage_door
    state: "open"
actions:
  - action: cover.close_cover
    target:
      entity_id: cover.garage_door
```

## Data updates

The integration polls the Tailwind device every 5 seconds over the local network for updated door and device status.

## Known limitations

- The integration communicates with the Tailwind device over the local network. If the device is not reachable, the entities become unavailable.
- The Tailwind device requires a minimum firmware version. If your firmware is too old, the integration will not set up. Update your device to the latest firmware using the Tailwind app.

## Troubleshooting

### Cannot connect during setup

If you see a "Cannot connect" error during setup, verify that:

1. The Tailwind device is powered on and connected to your network.
2. The IP address you entered is correct. You can find it in the Tailwind app under the device's cog icon in the **Device Info** section.
3. Home Assistant can reach the device on the local network.

### Invalid authentication

If you see an "Invalid authentication" error, your local control key token may have changed. Go to the [Tailwind web portal](https://web.gotailwind.com/client/integration/local-control-key) and verify the current token. You can update it in Home Assistant by selecting **Reconfigure** on the integration card.

### Unsupported firmware

If you see an "Unsupported firmware" message, update your Tailwind device to the latest firmware version using the Tailwind app, then try setting up the integration again.

## Removing the integration

This integration follows standard integration removal, no extra steps are required.

{% include integrations/remove_device_service.md %}
