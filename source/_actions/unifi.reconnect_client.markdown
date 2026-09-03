---
title: "Reconnect wireless client"
action: unifi.reconnect_client
domain: unifi
description: "Tries to get a wireless client to reconnect to the UniFi network."
related_actions:
  - unifi.remove_clients
---

Use this action to ask a wireless client to reconnect to your UniFi network, for example to nudge a device that has dropped off Wi-Fi or is stuck on a weaker access point.

This action only works for wireless clients. Wired clients are skipped.

{% include actions/ui_header.md %}

To reconnect a wireless client from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Reconnect wireless client**.
6. Select the UniFi wireless client device you want to reconnect.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The wireless client device that should reconnect to the network.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifi.reconnect_client`. A basic example looks like this:

{% example %}
action: |
  action: unifi.reconnect_client
  data:
    device_id: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The device ID of the wireless client that should reconnect to the network.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- This action only works for wireless clients. Wired clients are left untouched.
- The device must be a client known to your UniFi Network application.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: reconnect a flaky device when it drops off Wi-Fi

If a wireless device keeps losing its connection, you can ask it to reconnect automatically when it becomes unavailable for a few minutes.

- **Trigger**: Smart plug unavailable for 5 minutes
- **Action**: Reconnect wireless client
  - **Device**: Garden smart plug

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Reconnect the garden smart plug when it drops off"
  triggers:
    - trigger: state
      entity_id: switch.garden_smart_plug
      to: "unavailable"
      for:
        minutes: 5
  actions:
    - action: unifi.reconnect_client
      data:
        device_id: a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
