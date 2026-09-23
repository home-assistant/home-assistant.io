---
title: "Set guest Wi-Fi password"
action: fritz.set_guest_wifi_password
domain: fritz
description: "Sets a new password for the guest Wi-Fi on a FRITZ!Box."
related_actions:
  - fritz.dial
---

Use this action to set a new password for the guest Wi-Fi on your FRITZ!Box. This is handy when you want to rotate the guest password on a schedule, for example to generate a fresh password each week for visitors.

You can provide your own password, or let the FRITZ!Box generate one for you.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To set the guest Wi-Fi password from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Set guest Wi-Fi password**.
6. Select the **FRITZ!Box device** to configure, and set any other options you want to use.
7. Select **Save**.

### Options in the UI

{% options_ui %}
FRITZ!Box device:
  description: The FRITZ!Box to configure.
Password:
  description: The new password for the guest Wi-Fi, between 8 and 63 characters. If you don't set one, a password is generated for you.
  required: false
Password length:
  description: The length of the generated password, between 8 and 63 characters. Only used when you don't provide a password. Defaults to 12.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fritz.set_guest_wifi_password`. A basic example looks like this:

{% example %}
action: |
  action: fritz.set_guest_wifi_password
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
{% endexample %}

This generates a new password of 12 characters. To set your own password, add it to the data:

{% example %}
action: |
  action: fritz.set_guest_wifi_password
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    password: "MyGuestPassword"
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The FRITZ!Box to configure.
  required: true
  type: string
password:
  description: The new password for the guest Wi-Fi, between 8 and 63 characters. If you don't set one, a password is generated for you.
  required: false
  type: string
length:
  description: The length of the generated password, between 8 and 63 characters. Only used when you don't provide a password. Defaults to 12.
  required: false
  type: integer
{% endoptions_yaml %}

## Good to know

- If you don't provide a password, the FRITZ!Box generates one of 12 characters by default. Use the password length option to change that length.
- The password must be between 8 and 63 characters long.

{% include actions/stuck.md %}

{% include actions/related.md %}
