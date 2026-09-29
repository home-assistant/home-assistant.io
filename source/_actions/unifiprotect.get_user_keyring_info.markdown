---
title: Get user keyring info
action: unifiprotect.get_user_keyring_info
domain: unifiprotect
description: "Returns the UniFi Protect users along with their NFC and fingerprint keys."
---

With this action, you can fetch the list of users known to a UniFi Protect instance, together with their NFC and fingerprint associations. It returns the information as [response data](/docs/scripts/perform-actions/#use-templates-to-handle-response-data) so you can use it in automations, for example to react when a specific person unlocks a door with their fingerprint.

{% include actions/ui_header.md %}

To use this action in an automation or script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create** to start a new one.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **UniFi Protect: Get user keyring info**.
6. Select a device from the UniFi Protect instance you want to read.
7. Select **Save**.

### Options in the UI

{% options_ui %}
UniFi Protect NVR:
  description: Any device from the UniFi Protect instance you want to read keyring information from. This matters when you have more than one Protect instance.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifiprotect.get_user_keyring_info`. A basic example looks like this:

{% example %}
action: |
  action: unifiprotect.get_user_keyring_info
  data:
    device_id: 1234567890abcdef1234567890abcdef
  response_variable: keyring
{% endexample %}

The `response_variable` holds the returned keyring information for later use in your script or automation.

### Options in YAML

{% options_yaml %}
device_id:
  description: The ID of any device from the UniFi Protect instance you want to read keyring information from.
  required: true
  type: string
{% endoptions_yaml %}

## Response data

The action returns a `users` list. Each user contains:

- `full_name`: The full name of the user.
- `user_status`: The status of the user, for example `ACTIVE`.
- `ulp_id`: The unique UniFi user ID.
- `keys`: A list of keys associated with the user. Each key has a `key_type` of `nfc` or `fingerprint`, along with an `nfc_id` or `fingerprint_id`.

```yaml
users:
  - full_name: User One
    user_status: ACTIVE
    ulp_id: d23e27e0-a32a-41e5-9424-be646330c2d5
    keys: []
  - full_name: User Two
    user_status: ACTIVE
    ulp_id: a243ffdb-3ab2-4186-b2fe-0b53ccb29f24
    keys:
      - key_type: nfc
        nfc_id: ABCDEF12
      - key_type: fingerprint
        fingerprint_id: "1"
```

## Good to know

- Users without any registered NFC or fingerprint keys return an empty `keys` list.
- You can match the `fingerprint_id` or `nfc_id` against the value reported when someone unlocks a door, so your automation knows who it was.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
