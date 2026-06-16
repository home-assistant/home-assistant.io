---
title: "Delete SMS"
action: netgear_lte.delete_sms
domain: netgear_lte
description: "Deletes messages from the NETGEAR LTE modem inbox."
related_actions:
  - netgear_lte.connect_lte
  - netgear_lte.disconnect_lte
  - netgear_lte.set_option
---

The **Delete SMS** action removes one or more messages from your NETGEAR LTE modem inbox, using their inbox IDs.

This is handy when you want to keep the modem inbox tidy, for example by deleting an incoming message after an automation has processed it.

{% include actions/ui_header.md %}

To delete messages from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NETGEAR LTE: Delete SMS**.
6. Enter the **SMS ID** of the message, or a list of message IDs, to delete. If you have more than one modem, also enter the **Host**.
7. Select **Save**.

This action does not support targets. In the UI, you select the modem through the **Host** field instead of choosing an area, device, entity, or label. When you have only one modem configured, you can leave it empty.

### Options in the UI

{% options_ui %}
Host:
  description: The modem to delete messages from. Optional when only one modem is configured.
  required: false
SMS ID:
  description: A single inbox ID, or a list of inbox IDs, of the messages to delete.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netgear_lte.delete_sms`. A basic example looks like this:

{% example %}
action: |
  action: netgear_lte.delete_sms
  data:
    host: 192.168.5.1
    sms_id:
      - 7
      - 8
{% endexample %}

This deletes the messages with inbox IDs 7 and 8 from the modem.

### Options in YAML

{% options_yaml %}
host:
  description: >
    The modem to delete messages from. Optional when only one modem is
    configured.
  required: false
  type: string
sms_id:
  description: >
    A single inbox ID, or a list of inbox IDs, of the messages to delete.
  required: true
  type: [integer, list]
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: delete an SMS after processing it

When a new SMS arrives, process it and then remove it from the modem inbox.

- **Trigger**: A `netgear_lte_sms` event fires
- **Action**: NETGEAR LTE: Delete SMS

{% details "YAML example for deleting an SMS after processing" %}

{% example %}
automation: |
  alias: "Clean up processed SMS"
  triggers:
    - trigger: event
      event_type: netgear_lte_sms
  actions:
    - action: netgear_lte.delete_sms
      data:
        host: "{{ trigger.event.data.host }}"
        sms_id: "{{ trigger.event.data.sms_id }}"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
