---
title: "Request channel level"
action: dynalite.request_channel_level
domain: dynalite
description: "Asks a Dynalite channel to report its current level."
related_actions:
  - dynalite.request_area_preset
---

Use this action to send a command on the Dynalite network asking a channel in an area to report its current level.

{% note %}
This action does not return the level. It sends a network command asking the channel to report its level. When the channel reports back, the system catches and handles that report.
{% endnote %}

{% include actions/ui_header.md %}

To request a channel level from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Philips Dynalite: Request channel level**.
6. Enter the **Area** and **Channel**, and optionally the **Host**.
7. Select **Save**.

This action does not support targets. In the UI, you enter the Dynalite area and channel numbers instead of selecting an entity.

### Options in the UI

{% options_ui %}
Host:
  description: The IP address of the gateway to send the command to. When left empty, the command is sent to all configured gateways.
  required: false
Area:
  description: The Dynalite area that contains the channel.
  required: true
Channel:
  description: The channel to request the level for.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `dynalite.request_channel_level`. A basic example looks like this:

{% example %}
action: |
  action: dynalite.request_channel_level
  data:
    area: 2
    channel: 1
{% endexample %}

### Options in YAML

{% options_yaml %}
host:
  description: >
    The IP address of the gateway to send the command to. When left empty, the
    command is sent to all configured gateways.
  required: false
  type: string
area:
  description: The Dynalite area that contains the channel.
  required: true
  type: integer
channel:
  description: The channel to request the level for.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
