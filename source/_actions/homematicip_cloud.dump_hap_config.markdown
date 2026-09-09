---
title: "Dump HAP config"
action: homematicip_cloud.dump_hap_config
domain: homematicip_cloud
description: "Dumps the configuration of the Homematic IP access point(s)."
related_actions:
  - homematicip_cloud.set_active_climate_profile
  - homematicip_cloud.set_home_cooling_mode
---

The **Dump HAP config** action writes the configuration of your Homematic IP access points to a file. This can be helpful when you need the raw configuration for troubleshooting or development.

This action is only available to Home Assistant administrators.

{% include actions/ui_header.md %}

To dump the access point configuration from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **HomematicIP Cloud: Dump HAP config**.
6. Optionally, set the **Config output path**, **Config output file prefix**, and whether to **Anonymize** the configuration.
7. Select **Save**.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Config output path:
  description: The path where the configuration is stored. Defaults to your Home Assistant configuration directory.
  required: false
Config output file prefix:
  description: The name of the configuration file. The Serialized Global Trade Item Number (SGTIN) of the access point is always appended.
  required: false
Anonymize:
  description: Turn on to anonymize the configuration.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `homematicip_cloud.dump_hap_config`. A basic example looks like this:

{% example %}
action: |
  action: homematicip_cloud.dump_hap_config
  data:
    config_output_path: "/config"
    anonymize: true
{% endexample %}

This dumps an anonymized configuration to your Home Assistant configuration directory.

### Options in YAML

{% options_yaml %}
config_output_path:
  description: >
    The path where the configuration is stored. Defaults to your Home Assistant
    configuration directory.
  required: false
  type: string
config_output_file_prefix:
  description: >
    The name of the configuration file. The Serialized Global Trade Item Number (SGTIN) of the access point is always
    appended.
  required: false
  default: hmip-config
  type: string
anonymize:
  description: >
    Turn on to anonymize the configuration.
  required: false
  default: true
  type: boolean
{% endoptions_yaml %}

## Good to know

- If you want to share the configuration for troubleshooting, prefer the **Download diagnostics** option on the integration page, which anonymizes sensitive information for you.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
