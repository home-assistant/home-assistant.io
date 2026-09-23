---
title: "Fetch connections"
action: swiss_public_transport.fetch_connections
domain: swiss_public_transport
description: "Fetches a list of upcoming connections from Swiss public transport."
---

Use this action to fetch a list of upcoming connections for one of your configured Swiss public transport instances. Each instance represents a specific start and destination, so the action returns the next departures for that route.

This action returns its result in a response variable, which you can use in later steps of the same automation or script. For example, you can read out the next train departure on a dashboard or send it in a notification.

{% include actions/ui_header.md %}

To fetch connections from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Swiss public transport: Fetch connections**.
6. Select the **Instance** to fetch connections for. Optionally, set a **Limit** for the number of connections to return.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Instance:
  description: The Swiss public transport instance to fetch connections for.
  required: true
Limit:
  description: The number of connections to fetch.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `swiss_public_transport.fetch_connections`. A basic example looks like this:

{% example %}
action: |
  action: swiss_public_transport.fetch_connections
  data:
    config_entry_id: zurich_geneva
    limit: 3
  response_variable: connections
{% endexample %}

This fetches the next three connections for the selected instance.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The Swiss public transport instance to fetch connections for.
  required: true
  type: string
limit:
  description: >
    The number of connections to fetch, between 1 and 15.
  required: false
  type: integer
{% endoptions_yaml %}

## Response data

The action returns a `connections` list. Each connection includes the following information:

- `departure`: The departure time of the connection.
- `duration`: The travel duration, in seconds.
- `platform`: The platform the connection departs from.
- `remaining_time`: The time remaining until departure.
- `start`: The name of the start station.
- `destination`: The name of the destination station.
- `train_number`: The train number of the connection.
- `transfers`: The number of transfers along the way.
- `delay`: The departure delay, in minutes.
- `line`: The line name of the connection.

## Good to know

- When you do not set a limit, the action returns three connections.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
