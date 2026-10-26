---
description: Information about the device automation plugin.
ha_release: 0.7
ha_domain: device_automation
---

**Device automation** is a plugin for the automation integration that allows other integrations to provide device-specific triggers, conditions, and actions.

There is no device automation-specific configuration. Instead, device automations are configured as part of regular automations.

Device automations are meant to be configured in the UI. For most automations, use the purpose-specific triggers and conditions instead, such as [Door opened](/triggers/door.opened/) or [Light is on](/conditions/light.is_on/). They're easier to set up and to read. Use device automations for things that no other trigger or condition covers, such as button presses on some remotes.

[MQTT device triggers](/integrations/device_trigger.mqtt/) are set up through [MQTT discovery](/integrations/mqtt/#mqtt-discovery).

## Device trigger

The [Device trigger](/triggers/device/) starts an automation when something happens to a device, such as a button press on a remote. In most cases, you don't need it. Use a purpose-specific trigger instead, such as [Light turned on](/triggers/light.turned_on/). For more information on the difference, refer to [How the Device trigger differs from other triggers](/triggers/device/#how-the-device-trigger-differs-from-other-triggers).

{% include integrations/conditions.md %}

## Using device automations in YAML

If you need YAML for an automation that is not managed in the UI, create the trigger in the visual automation editor first, then copy the YAML from the trigger. For examples, refer to the [Device trigger](/triggers/device/#more-examples) page.
