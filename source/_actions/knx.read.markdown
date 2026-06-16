---
title: "Read from KNX bus"
action: knx.read
domain: knx
description: "Sends GroupValueRead requests to the KNX bus."
related_actions:
  - knx.send
  - knx.event_register
  - knx.exposure_register
---

The **Read from KNX bus** action sends a GroupValueRead request to one or more KNX group addresses. The response can be used in automations through the [KNX telegram](/integrations/knx/#telegram-trigger) trigger, and it is processed in KNX entities.

This is useful when you want to actively ask a KNX device for its current value, for example to refresh a cover position after it has been moving for a while, instead of waiting for the device to report on its own.

To issue GroupValueRead requests for all state addresses of an entity at once, you can use the [Home Assistant: Update entity](/integrations/homeassistant/) action instead.

{% include actions/ui_header.md %}

To read from the KNX bus in an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **KNX: Read from KNX bus**.
6. Enter the **Group address** to read from.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Group address:
  description: The group address(es) to send the read request to. Provide a list to read multiple group addresses.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `knx.read`. A basic example looks like this:

{% example %}
action: |
  action: knx.read
  data:
    address: "1/0/15"
{% endexample %}

This sends a GroupValueRead request to group address `1/0/15`.

### Options in YAML

{% options_yaml %}
address:
  description: >
    The group address(es) to send the read request to. A list reads multiple
    group addresses.
  required: true
  type: [string, list]
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: update a cover position after movement

This automation reacts to a cover-move telegram and, after a short delay, reads the cover position address so Home Assistant stays in sync.

{% details "YAML example for reading a cover position" %}

{% example %}
automation: |
  alias: "Update cover position"
  triggers:
    - trigger: knx.telegram
      # Cover move trigger
      destination: "0/4/20"
  actions:
    - delay: "0:0:10"
    - action: knx.read
      data:
        # Cover position address
        address: "0/4/21"
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
