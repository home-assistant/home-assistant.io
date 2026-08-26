---
title: "Switch set Wi-Fi LED off"
action: xiaomi_miio.switch_set_wifi_led_off
domain: xiaomi_miio
description: "Turns off the Wi-Fi LED of a Xiaomi smart plug or power strip."
related_actions:
  - xiaomi_miio.switch_set_wifi_led_on
---

The **Switch set Wi-Fi LED off** action turns off the Wi-Fi status LED of a Xiaomi smart plug or power strip.

{% include actions/ui_header.md %}

To turn off the Wi-Fi LED from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Xiaomi Home: Switch set Wi-Fi LED off**.
6. Select **Save**.

This action does not support targets. In the UI, use the **Entity ID** field to choose which Xiaomi switch to act on. If you leave it empty, the action applies to all of them.

### Options in the UI

{% options_ui %}
Entity ID:
  description: The Xiaomi switch to act on. If you leave this empty, all of them are affected.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `xiaomi_miio.switch_set_wifi_led_off`. A basic example looks like this:

{% example %}
action: |
  action: xiaomi_miio.switch_set_wifi_led_off
  data:
    entity_id: switch.power_strip
{% endexample %}

This turns off the Wi-Fi LED of `switch.power_strip`.

### Options in YAML

{% options_yaml %}
entity_id:
  description: The Xiaomi switch to act on. If you leave this out, all of them are affected.
  required: false
  type: [string, list]
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
