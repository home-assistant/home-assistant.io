---
title: Get keypad information
action: switchbot.get_keypad_info
domain: switchbot
description: "Retrieves settings and credential counts from a SwitchBot Keypad Vision device."
related_actions:
  - switchbot.add_password
---

The **Get keypad information** action retrieves settings and credential counts from a SwitchBot Keypad Vision or Keypad Vision Pro device. It returns the information as [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data) and does not change the keypad configuration.

The action returns only the number of stored credentials. It does not expose passwords or biometric data.

{% include actions/ui_header.md %}

To get keypad information from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **SwitchBot: Get keypad information**.
6. Select the **Device**.
7. In the **Response variable** field, enter a name to store the data in, such as `keypad_info`.
8. Select **Save**.

### Options in the UI

{% options_ui %}
Device:
  description: The Keypad Vision or Keypad Vision Pro device to retrieve information from.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `switchbot.get_keypad_info`. Because it returns data, store the result in a response variable. A basic example looks like this:

{% example %}
action: |
  action: switchbot.get_keypad_info
  data:
    device_id: c2d01328efd261f586e56d914e3af07e
  response_variable: keypad_info
{% endexample %}

This stores the keypad settings and credential counts in a variable named `keypad_info`.

### Options in YAML

{% options_yaml %}
device_id:
  description: >
    The device ID of the Keypad Vision or Keypad Vision Pro device.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The response contains a `basic_info` mapping and a `credential_counts` mapping.

### Basic information

The `basic_info` mapping contains:

- `battery`: Battery level in percent.
- `firmware`: Firmware version reported by the keypad.
- `hardware`: Hardware version reported by the keypad.
- `support_fingerprint`: Fingerprint capability value reported by the keypad.
- `lock_button_enabled`: Whether the lock button is enabled.
- `tamper_alarm_enabled`: Whether the tamper alarm is enabled.
- `backlight_enabled`: Whether the keypad backlight is enabled.
- `backlight_level`: Keypad backlight level.
- `prompt_tone_enabled`: Whether prompt tones are enabled.
- `battery_charging`: Whether the battery is charging.

### Credential counts

The `credential_counts` mapping contains:

- `pin`: Number of stored passwords.
- `nfc`: Number of stored NFC cards.
- `fingerprint`: Number of stored fingerprints.
- `duress_pin`: Number of stored duress passwords.
- `duress_fingerprint`: Number of stored duress fingerprints.
- `face`: Number of stored faces. This field is returned only for Keypad Vision Pro.
- `palm_vein`: Number of stored palm vein profiles. This field is returned only for Keypad Vision Pro.

An example response for a Keypad Vision Pro looks like this:

```yaml
basic_info:
  battery: 95
  firmware: 2.4
  hardware: 22
  support_fingerprint: 1
  lock_button_enabled: true
  tamper_alarm_enabled: true
  backlight_enabled: true
  backlight_level: 5
  prompt_tone_enabled: true
  battery_charging: false
credential_counts:
  pin: 3
  nfc: 2
  fingerprint: 1
  duress_pin: 1
  duress_fingerprint: 0
  face: 2
  palm_vein: 1
```

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
