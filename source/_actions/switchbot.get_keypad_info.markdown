---
title: "Get keypad information"
action: switchbot.get_keypad_info
domain: switchbot
description: "Retrieves settings, firmware and hardware versions, and credential counts from a SwitchBot Keypad Vision device."
---

Use this action to retrieve the current settings, firmware and hardware versions, and aggregate credential counts from a SwitchBot Keypad Vision or Keypad Vision Pro device.

Only counts of stored credentials are returned, such as the number of PINs, NFC cards, and fingerprints; no credential values or biometric data are exposed.

This action returns its result in a response variable, which you can use in later steps of the same automation or script.

{% include actions/ui_header.md %}

To get keypad information from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SwitchBot Bluetooth: Get keypad information**.
6. Select the **Device**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Keypad Vision device to get information from.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `switchbot.get_keypad_info`. Store the result in a response variable so you can use it in later steps:

{% example %}
action: |
  action: switchbot.get_keypad_info
  data:
    device_id: c2d01328efd261f586e56d914e3af07e
  response_variable: keypad_info
{% endexample %}

This retrieves the information from the selected Keypad Vision device.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the Keypad Vision device to get information from.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `basic_info` map and a `credential_counts` map.

`basic_info` includes the following fields:

- `firmware`: The firmware version.
- `hardware`: The hardware version.
- `support_fingerprint`: Whether the device supports fingerprint credentials.
- `lock_button_enabled`: Whether the lock button is enabled.
- `backlight_enabled`: Whether the keypad backlight is enabled.
- `backlight_level`: The keypad backlight brightness level.
- `prompt_tone_enabled`: Whether the prompt tone is enabled.

`credential_counts` includes the number of stored credentials of each type, such as `pin`, `nfc`, `fingerprint`, `duress_pin`, and `duress_fingerprint`. On Keypad Vision Pro devices, it also includes `face` and `palm_vein`.

A shortened example of the response looks like this:

```yaml
basic_info:
  firmware: 2.4
  hardware: 22
  support_fingerprint: 1
  lock_button_enabled: true
  backlight_enabled: true
  backlight_level: 5
  prompt_tone_enabled: true
credential_counts:
  pin: 3
  nfc: 2
  fingerprint: 1
  duress_pin: 1
  duress_fingerprint: 0
```

## Good to know

- This action is available on SwitchBot Keypad Vision and Keypad Vision Pro devices.
- This action is only invoked on demand; it is not part of the integration's periodic polling, to avoid extra Bluetooth traffic.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
