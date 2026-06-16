---
title: "Set option"
action: netgear_lte.set_option
domain: netgear_lte
description: "Sets connection options on the NETGEAR LTE modem."
related_actions:
  - netgear_lte.connect_lte
  - netgear_lte.disconnect_lte
  - netgear_lte.delete_sms
---

The **Set option** action changes connection settings on your NETGEAR LTE modem, the same options that are otherwise available in the modem web interface. You can set the failover mode, the auto-connect mode, or both.

This is handy when you want to adjust how the modem manages its connection from an automation, for example to allow mobile data only while you are away from home.

{% include actions/ui_header.md %}

To set modem options from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **NETGEAR LTE: Set option**.
6. Set the **Failover** mode, the **Auto-connect** mode, or both. If you have more than one modem, also enter the **Host**.
7. Select **Save**.

This action does not support targets. In the UI, you select the modem through the **Host** field instead of choosing an area, device, entity, or label. When you have only one modem configured, you can leave it empty.

### Options in the UI

{% options_ui %}
Host:
  description: The modem to set options on. Optional when only one modem is configured.
  required: false
Failover:
  description: "The failover mode: `wire` (wired connection only), `mobile` (mobile connection only), or `auto` (wired connection with failover to mobile)."
  required: false
Auto-connect:
  description: "The auto-connect mode: `never`, `home` (connect only when not roaming), or `always`."
  required: false
{% endoptions_ui %}

You need to set at least one of **Failover** or **Auto-connect**.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `netgear_lte.set_option`. A basic example looks like this:

{% example %}
action: |
  action: netgear_lte.set_option
  data:
    host: 192.168.5.1
    failover: auto
    autoconnect: home
{% endexample %}

This sets the failover and auto-connect modes on the modem.

### Options in YAML

{% options_yaml %}
host:
  description: >
    The modem to set options on. Optional when only one modem is configured.
  required: false
  type: string
failover:
  description: >
    The failover mode. One of `wire` (wired connection only), `mobile` (mobile
    connection only), or `auto` (wired connection with failover to mobile).
  required: false
  type: string
autoconnect:
  description: >
    The auto-connect mode. One of `never`, `home` (connect only when not
    roaming), or `always`.
  required: false
  type: string
{% endoptions_yaml %}

You need to set at least one of `failover` or `autoconnect`.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: allow mobile data only while away

When you leave home, set the modem to always connect. When you return, switch it back to connecting only on your home network.

- **Trigger**: A presence sensor changes
- **Action**: NETGEAR LTE: Set option

{% details "YAML example for changing auto-connect based on presence" %}

{% example %}
automation: |
  alias: "Mobile data only while away"
  triggers:
    - trigger: state
      entity_id: person.me
      to: not_home
  actions:
    - action: netgear_lte.set_option
      data:
        host: 192.168.5.1
        autoconnect: always
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
