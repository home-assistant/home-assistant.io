---
title: "Remove clients from the UniFi Network"
action: unifi.remove_clients
domain: unifi
description: "Cleans up short-lived clients from the UniFi Network application."
related_actions:
  - unifi.reconnect_client
---

Use this action to clean up clients that briefly connected to your UniFi Network application, for example to keep your client list tidy after visitors or passing devices show up. It removes clients that only appeared for a short time and that you have not given a name or fixed address.

A client is removed only when both of the following are true:

- The time between when it was first seen and last seen is less than 15 minutes.
- It has no fixed IP address, hostname, or name configured.

{% include actions/ui_header.md %}

To remove short-lived clients from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the list of actions, search for and select **Remove clients from the UniFi Network**.
6. Select **Save**.

### Options in the UI

This action has no options.

{% include actions/yaml_header.md %}

In YAML, refer to this action as `unifi.remove_clients`. A basic example looks like this:

{% example %}
action: |
  action: unifi.remove_clients
{% endexample %}

### Options in YAML

This action has no options.

## Good to know

- Clients you have named or given a fixed IP address or hostname are never removed.
- The action runs across every loaded UniFi Network application you have set up in Home Assistant.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: tidy up short-lived clients every week

Run the cleanup on a schedule so your client list stays manageable over time.

- **Trigger**: Time: Sunday at 03:00
- **Action**: Remove clients from the UniFi Network

{% details "Show example YAML" %}

{% example %}
automation: |
  alias: "Weekly UniFi client cleanup"
  triggers:
    - trigger: time
      at: "03:00:00"
  conditions:
    - condition: time
      weekday:
        - sun
  actions:
    - action: unifi.remove_clients
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
