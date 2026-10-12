---
title: Sky Remote Control
description: The Sky Remote integration allows you to control a Sky box with Home Assistant.
ha_category:
  - Remote
ha_release: 2024.12
ha_domain: sky_remote
ha_config_flow: true
ha_codeowners:
  - '@dunnmj'
  - '@saty9'
ha_iot_class: Assumed State
ha_platforms:
  - remote
ha_integration_type: device
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Sky Remote Control** {% term integration %} lets you control a [Sky](https://www.sky.com/) box using Home Assistant.

## Supported models

This integration is intended to control Sky+ HD and Sky Q satellite receiver boxes with a LAN port. It will not control Sky stream pucks.

{% include integrations/config_flow.md %}

{% configuration_basic %}
host:
  description: "Hostname or IP address of your Sky device (e.g., 192.168.1.250). This can typically be found in your Sky box network settings or router's DHCP client list."
  required: true
  type: string
{% endconfiguration_basic %}

## Remote

The Sky Remote platform creates a [Remote](/integrations/remote/) entity for the device. This entity allows you to send commands with the [**Send remote command**](/actions/remote.send_command/) action. It also supports the [**Turn on via remote**](/actions/remote.turn_on/) and [**Turn off via remote**](/actions/remote.turn_off/) actions.

### Sending remote commands in automations

To send a remote command from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you are setting up a new automation, add a trigger in the **When** section. Scripts do not need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Select what you want to control. Under **By target**, select your Sky remote entity.
6. From the actions shown for that target, select **Send remote command**.
7. Enter the **Command** to send.
8. Select **Save**.

Supported commands include:

- Power and navigation: `power`, `up`, `down`, `left`, `right`, `select`, `backup`
- Menu access: `sky`, `tvguide`, `boxoffice`, `services`, `interactive`
- Channel controls: `channelup`, `channeldown`
- Information and help: `i`, `text`, `help`
- Color buttons: `red`, `green`, `yellow`, `blue`
- Numbers: `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`
- Playback controls: `play`, `pause`, `stop`, `record`, `fastforward`, `rewind`
- Sky Q only: `sidebar`, `dismiss`, `search`, `home`

In YAML, a basic example looks like this:

{% example %}
action: |
  action: remote.send_command
  target:
    entity_id: remote.192_168_1_250
  data:
    command:
      - sky
      - tvguide
{% endexample %}
