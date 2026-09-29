---
title: "Speedtest"
action: iperf3.speedtest
domain: iperf3
description: "Runs an iperf3 speed test on demand."
---

Use this action to run an iperf3 speed test right away, instead of waiting for the next scheduled test. This is handy when you want an up-to-date measurement, for example to check your connection after making a network change.

{% include actions/ui_header.md %}

To run a speed test from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Iperf3: Speedtest**.
6. Optionally, set the **Host** to test against a single configured server.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Host:
  description: The host name or IP address of a configured iperf3 server to test against. If left empty, the test runs against all configured servers.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `iperf3.speedtest`. A basic example looks like this:

{% example %}
action: |
  action: iperf3.speedtest
  data:
    host: "iperf.he.net"
{% endexample %}

This runs a speed test against the `iperf.he.net` server.

### Options in YAML

{% options_yaml %}
host:
  description: >
    The host name or IP address of a configured iperf3 server to test against. If omitted,
    the test runs against all configured servers.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- Leave the host empty to test every configured server at once.
- This action is most useful when you've set a long scan interval and want a fresh result without waiting for the next automatic test.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: run a speed test after the router reboots

When the router comes back online, run an iperf3 speed test so you have a fresh measurement of the connection.

- **Trigger**: Router connectivity sensor turns on
- **Action**: Iperf3: Speedtest

{% details "YAML example for testing after a router reboot" %}

{% example %}
automation: |
  alias: "Run iperf3 test after router reboot"
  triggers:
    - trigger: state
      entity_id: binary_sensor.router_online
      to: "on"
  actions:
    - action: iperf3.speedtest
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
