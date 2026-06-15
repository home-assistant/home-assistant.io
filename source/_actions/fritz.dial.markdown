---
title: "Dial a phone number"
action: fritz.dial
domain: fritz
description: "Makes a FRITZ!Box dial a phone number."
related_actions:
  - fritz.set_guest_wifi_password
---

Use this action to make your FRITZ!Box dial a phone number. This is handy when you want the connected phones to ring as a notification, for example to ring the house phones when motion is detected at the front door.

Only users with administrator rights can run this action.

{% include actions/ui_header.md %}

To dial a phone number from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Dial a phone number**.
6. Select the **FRITZ!Box device** to dial from, and set the **Phone number** and **Maximum ring duration**.
7. Select **Save**.

### Options in the UI

{% options_ui %}
FRITZ!Box device:
  description: The FRITZ!Box to dial from.
Phone number:
  description: The phone number to dial.
Maximum ring duration:
  description: The maximum number of seconds to ring after dialing. The actual ring time may be shorter, depending on the settings of the phone that is called. Defaults to 15 seconds.
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `fritz.dial`. A basic example looks like this:

{% example %}
action: |
  action: fritz.dial
  data:
    device_id: a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4
    number: "**9"
    max_ring_seconds: 15
{% endexample %}

### Options in YAML

{% options_yaml %}
device_id:
  description: The FRITZ!Box to dial from.
  required: true
  type: string
number:
  description: The phone number to dial.
  required: true
  type: string
max_ring_seconds:
  description: The maximum number of seconds to ring after dialing. The actual ring time may be shorter, depending on the settings of the phone that is called. Defaults to 15 seconds.
  required: true
  type: integer
{% endoptions_yaml %}

## Good to know

- Dialing `**9` rings all internal phones connected to the FRITZ!Box, which is useful as a doorbell or alarm signal.
- The maximum ring duration can be between 1 and 300 seconds.

{% include actions/stuck.md %}

{% include actions/related.md %}
