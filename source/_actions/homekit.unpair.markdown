---
title: Unpair an accessory or bridge
action: homekit.unpair
domain: homekit
description: "Forcefully removes all pairings from an accessory to allow re-pairing."
related_actions:
  - homekit.reload
  - homekit.reset_accessory
---

The **Unpair an accessory or bridge** action forcefully removes all pairings from an accessory so you can pair it again. Use it when an accessory is no longer responsive and you want to avoid deleting and re-adding the integration entry.

Occasionally, the public key for a paired device goes missing because of pairing failures, which can make one or more devices show the accessory as unavailable. Unpairing and re-pairing ensures the integration has the public key for each paired client.

{% include actions/ui_header.md %}

To unpair an accessory from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomeKit Bridge: Unpair an accessory or bridge**.
6. Select the **Device** to unpair.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The device to unpair.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homekit.unpair`:

{% example %}
action: |
  action: homekit.unpair
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
{% endexample %}

This removes all pairings from the selected device so you can pair it again.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the accessory or bridge to unpair.
  required: true
  type: string
{% endoptions_yaml %}

## Good to know

- After unpairing, the accessory behaves as if it's set up for the first time. You need to restore its name, group, room, scene, and automation settings.
- When you set up HomeKit from the UI, this action avoids the sometimes time-consuming process of deleting and recreating the integration entry.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
