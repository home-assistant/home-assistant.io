---
title: "Disconnect LTE"
action: netgear_lte.disconnect_lte
domain: netgear_lte
description: "Asks the Netgear LTE modem to close its LTE connection."
related_actions:
  - netgear_lte.connect_lte
  - netgear_lte.set_option
  - netgear_lte.delete_sms
---

The **Disconnect LTE** action asks your Netgear LTE modem to close its LTE connection.

This is handy when you want to drop the mobile connection from an automation, for example to switch back to your wired internet connection once it is available again.

{% include actions/ui_header.md %}

To disconnect the modem from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NETGEAR LTE: Disconnect LTE**.
6. If you have more than one modem, enter the **Host** of the modem that should disconnect.
7. Select **Save**.

This action does not support targets. In the UI, you select the modem through the **Host** field instead of choosing an area, device, entity, or label. When you have only one modem configured, you can leave it empty.

### Options in the UI

{% options_ui %}
Host:
  description: The modem that should disconnect. Optional when only one modem is configured.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netgear_lte.disconnect_lte`. A basic example looks like this:

{% example %}
action: |
  action: netgear_lte.disconnect_lte
  data:
    host: 192.168.5.1
{% endexample %}

This asks the modem at the given host to close its LTE connection.

### Options in YAML

{% options_yaml %}
host:
  description: >
    The modem that should disconnect. Optional when only one modem is
    configured.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: drop LTE when wired internet returns

When a connectivity sensor reports that your wired internet is back, ask the modem to close the LTE connection.

- **Trigger**: A connectivity sensor turns on
- **Action**: NETGEAR LTE: Disconnect LTE

{% details "YAML example for disconnecting LTE when internet returns" %}

{% example %}
automation: |
  alias: "Drop LTE when internet returns"
  triggers:
    - trigger: state
      entity_id: binary_sensor.internet_connection
      to: "on"
  actions:
    - action: netgear_lte.disconnect_lte
      data:
        host: 192.168.5.1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
