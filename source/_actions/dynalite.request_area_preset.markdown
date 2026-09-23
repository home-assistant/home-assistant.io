---
title: "Request area preset"
action: dynalite.request_area_preset
domain: dynalite
description: "Asks a Dynalite area to report its currently selected preset."
related_actions:
  - dynalite.request_channel_level
---

Use this action to send a command on the Dynalite network asking an area to report its currently selected preset. Normally, channel 1 is used, but some installations need a different channel for specific areas.

{% note %}
This action does not return the preset. It sends a network command asking the area to report its preset. When the area reports back, the system catches and handles that report.
{% endnote %}

{% include actions/ui_header.md %}

To request an area preset from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Philips Dynalite: Request area preset**.
6. Enter the **Area**, and optionally the **Host** and **Channel**.
7. Select **Save**.

This action does not support targets. In the UI, you enter the Dynalite area number (and optionally a channel) instead of selecting an entity.

### Options in the UI

{% options_ui %}
Host:
  description: The IP address of the gateway to send the command to. When left empty, the command is sent to all configured gateways.
  required: false
Area:
  description: The Dynalite area to request the preset for.
  required: true
Channel:
  description: The channel to request the preset from. When left empty, channel 1 is used.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `dynalite.request_area_preset`. A basic example looks like this:

{% example %}
action: |
  action: dynalite.request_area_preset
  data:
    area: 2
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
  description: The Dynalite area to request the preset for.
  required: true
  type: integer
channel:
  description: >
    The channel to request the preset from. When left empty, channel 1 is used.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
