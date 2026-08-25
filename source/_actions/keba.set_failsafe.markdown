---
title: "Set failsafe"
action: keba.set_failsafe
domain: keba
description: "Configures the failsafe mode of a Keba charging station."
related_actions:
  - keba.set_current
---

Use this action to configure the failsafe mode of a Keba charging station. Failsafe mode protects the charging process if Home Assistant stops sending updates. When enabled, the charging station falls back to a defined current after a timeout, so charging continues safely without supervision.

If you enable failsafe mode, make sure to call [Set current](/actions/keba.set_current/) regularly within the configured timeout. Otherwise, the charging station applies the fallback current.

{% caution %}
Using this action changes the state of your charging station. Use it with care.
{% endcaution %}

{% include actions/ui_header.md %}

To configure the failsafe mode from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Keba Charging Station: Set failsafe**.
6. Enter the **Failsafe timeout**, **Failsafe fallback**, and **Failsafe persist** values.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Failsafe timeout:
  description: The timeout in seconds after which the fallback current is applied if no new current is set. Allowed values are between 1 second and 3600 seconds. A value of 0 disables failsafe mode.
  required: true
Failsafe fallback:
  description: The fallback current in amperes that is applied when the timeout is reached. Allowed values are between 6 A and 63 A. A value of 0 stops the running charging process.
  required: true
Failsafe persist:
  description: Whether to save the failsafe configuration to the charging station. Use 0 to keep it until the next restart of the charging station, or 1 to store it permanently.
  required: true
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `keba.set_failsafe`. A basic example looks like this:

{% example %}
action: |
  action: keba.set_failsafe
  data:
    failsafe_timeout: 30
    failsafe_fallback: 6
    failsafe_persist: 0
{% endexample %}

### Options in YAML

{% options_yaml %}
failsafe_timeout:
  description: >
    The timeout in seconds after which the fallback current is applied if no
    new current is set. Allowed values are between 1 second and 3600 seconds.
    A value of 0 disables failsafe mode.
  required: true
  type: integer
failsafe_fallback:
  description: >
    The fallback current in amperes that is applied when the timeout is
    reached. Allowed values are between 6 A and 63 A. A value of 0 stops the
    running charging process.
  required: true
  type: float
failsafe_persist:
  description: >
    Whether to save the failsafe configuration to the charging station. Use 0
    to keep it until the next restart of the charging station, or 1 to store
    it permanently.
  required: true
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
