---
title: "Set carrier"
action: seventeentrack.set_carrier
domain: seventeentrack
description: "Sets the carrier 17Track uses to track a package."
related_actions:
  - seventeentrack.add_package
  - seventeentrack.get_packages
---

The **Set carrier** action changes the carrier 17Track uses to track a package in your 17Track account.

17Track detects the carrier automatically when a package is added, but sometimes picks the wrong one. For example, a Swiss Post tracking number whose events are only available from Cainiao. Setting the carrier fixes the tracking data for that package.

Carriers are identified by their 17Track carrier code. You can look up codes in the [17Track carrier list](https://res.17track.net/asset/carrier/info/apicarrier.all.json), where the code is the `key` field.

{% include actions/ui_header.md %}

To set the carrier of a package from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **17TRACK: Set carrier**.
6. Select the **17Track service**, enter the **Package tracking number**, and enter the **First carrier** code. Optionally, enter the **Second carrier** code.
7. Select **Save**.

This action does not support targets. In the UI, you select the 17Track service through the **17Track service** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
17Track service:
  description: The 17Track service the package belongs to.
  required: true
Package tracking number:
  description: The tracking number of the package.
  required: true
First carrier:
  description: The 17Track carrier code of the first carrier.
  required: true
Second carrier:
  description: The 17Track carrier code of the last-mile carrier. Only supported when the first carrier is a postal service. Keeps the current value if not specified.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `seventeentrack.set_carrier`. A basic example looks like this:

{% example %}
action: |
  action: seventeentrack.set_carrier
  data:
    config_entry_id: 2b4be47a1fa7c3764f14cf756dc98991
    package_tracking_number: LW240952645CH
    first_carrier: 190271
{% endexample %}

This tracks the package with Cainiao (carrier code `190271`).

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the 17Track service config entry the package belongs to.
  required: true
  type: string
package_tracking_number:
  description: >
    The tracking number of the package.
  required: true
  type: string
first_carrier:
  description: >
    The 17Track carrier code of the first carrier.
  required: true
  type: integer
second_carrier:
  description: >
    The 17Track carrier code of the last-mile carrier. Only supported when
    the first carrier is a postal service. Keeps the current value if not
    specified.
  required: false
  type: integer
{% endoptions_yaml %}

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Script: add a package and set its carrier

Add a package and immediately set the carrier, so 17Track doesn't rely on automatic detection.

- **Action 1**: 17TRACK: Add a package
- **Action 2**: 17TRACK: Set carrier

{% details "YAML example for adding a package with a carrier" %}

{% example %}
script: |
  alias: "Add Cainiao package"
  sequence:
    - action: seventeentrack.add_package
      data:
        config_entry_id: 2b4be47a1fa7c3764f14cf756dc98991
        package_tracking_number: LW240952645CH
        package_friendly_name: "Camera part"
    - action: seventeentrack.set_carrier
      data:
        config_entry_id: 2b4be47a1fa7c3764f14cf756dc98991
        package_tracking_number: LW240952645CH
        first_carrier: 190271
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
