---
description: Instructions on how to integrate a Sharp Aquos TV into Home Assistant.
ha_release: 0.35
ha_domain: aquostv
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Sharp Aquos TV** {% term integration %} allows you to control a [Sharp Aquos TV](https://global.sharp/aquos/index.html).

## Prerequisites

Before you add the TV, make sure IP control is set up on it. You need the username and password configured for IP control on the TV, and the TV must be reachable from Home Assistant on your network.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
    description: "The hostname or IP address of your Sharp Aquos TV, for example `192.168.0.10`."
Port:
    description: "The port used for IP control. The default is `10002`."
Username:
    description: "The username configured for IP control on the TV."
Password:
    description: "The password configured for IP control on the TV."
{% endconfiguration_basic %}

## Reconfiguring the TV connection

If the port, username, or password of your TV changes, you can update them without removing the TV.

1. Go to {% my integrations title="**Settings** > **Devices & services**" %} and select **Sharp Aquos TV**.
2. Select the three dots {% icon "mdi:dots-vertical" %} menu next to the TV, then select **Reconfigure**.
3. Update the port, username, or password, and select **Submit**.

## Supported functionality

The **Sharp Aquos TV** integration adds the TV as a device with the following entity.

### Media player

The media player entity lets you control the TV. It supports the following:

- Turning the TV on and off
- Setting the volume, changing it in steps, and muting
- Selecting the input source
- Play, pause, next, and previous
- Reading the current power state, input source, and volume level

The volume uses the 0-100 range of the TV.

Home Assistant gets the state of the TV by polling it. If the TV is off, an update can take a while to finish.

## Turning on the TV

Home Assistant can turn on the TV remotely. The first time, turn on the TV with its remote. After that, you can turn it on from Home Assistant.

To allow this, the TV keeps the Aquos logo on when it is turned off, and it can use more power while off.

## YAML configuration

If you set up your TV in your {% term "`configuration.yaml`" %} file, Home Assistant imports it as a TV in the UI the next time it starts. After that, you can remove the YAML entry. The `power_on_enabled` option from your YAML entry is kept during the import.

## Currently known supported models

- LC-40LE830U
- LC-40CFE6242E (no volume control, not fully tested but able to poll state)
- LC-46LE830U
- LC-52LE830U
- LC-60LE830U
- LC-60LE635 (no volume control)
- LC-52LE925UN
- LC-60LE925UN
- LC-60LE857U
- LC-60EQ10U
- LC-60SQ15U
- LC-50US40 (no volume control, not fully tested)
- LC-70LE650U
- LC-70LE747E (no volume control)
- LC-60LE650U
- LC-80LE632U

If your model is not on the list, give it a test. If everything works correctly, then add it to the list on [GitHub](https://github.com/home-assistant/home-assistant.io/blob/current/source/_integrations/aquostv.markdown).
