---
title: "Connect LTE"
action: netgear_lte.connect_lte
domain: netgear_lte
description: "Asks the NETGEAR LTE modem to establish its LTE connection."
related_actions:
  - netgear_lte.disconnect_lte
  - netgear_lte.set_option
  - netgear_lte.delete_sms
---

The **Connect LTE** action asks your NETGEAR LTE modem to establish its LTE connection. This is useful when the modem does not connect on its own.

This is handy when you want to bring the mobile connection online from an automation, for example as a failover when your wired internet connection goes down.

{% include actions/ui_header.md %}

To connect the modem from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NETGEAR LTE: Connect LTE**.
6. If you have more than one modem, enter the **Host** of the modem that should connect.
7. Select **Save**.

This action does not support targets. In the UI, you select the modem through the **Host** field instead of choosing an area, device, entity, or label. When you have only one modem configured, you can leave it empty.

### Options in the UI

{% options_ui %}
Host:
  description: The modem that should connect. Optional when only one modem is configured.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netgear_lte.connect_lte`. A basic example looks like this:

{% example %}
action: |
  action: netgear_lte.connect_lte
  data:
    host: 192.168.5.1
{% endexample %}

This asks the modem at the given host to establish its LTE connection.

### Options in YAML

{% options_yaml %}
host:
  description: >
    The modem that should connect. Optional when only one modem is configured.
  required: false
  type: string
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: bring LTE online when wired internet drops

When a connectivity sensor reports that your wired internet is down, ask the modem to connect over LTE.

- **Trigger**: A connectivity sensor turns off
- **Action**: NETGEAR LTE: Connect LTE

{% details "YAML example for connecting LTE on internet loss" %}

{% example %}
automation: |
  alias: "LTE failover on internet loss"
  triggers:
    - trigger: state
      entity_id: binary_sensor.internet_connection
      to: "off"
  actions:
    - action: netgear_lte.connect_lte
      data:
        host: 192.168.5.1
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
