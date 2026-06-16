---
title: "Get packages"
action: seventeentrack.get_packages
domain: seventeentrack
description: "Queries the 17Track API for the latest package data."
related_actions:
  - seventeentrack.add_package
  - seventeentrack.archive_package
---

The **Get packages** action queries the 17Track API and returns the latest data for your tracked packages. You can limit the result to packages in specific states, such as packages that are in transit or ready to be picked up.

This is handy when you want to use up-to-date package information in an automation or a script, for example to send yourself a notification listing everything that is out for delivery today.

{% include actions/ui_header.md %}

To get package data from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **17TRACK: Get packages**.
6. Select the **17Track service** to query, and optionally choose which **Package states** to return.
7. Select **Save**.

This action does not support targets. In the UI, you select the 17Track service through the **17Track service** field instead of choosing an area, device, entity, or label.

### Options in the UI

{% options_ui %}
17Track service:
  description: The 17Track service to retrieve packages for.
  required: true
Package states:
  description: Only return packages in the selected states. Returns all packages when left empty.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `seventeentrack.get_packages`. A basic example looks like this:

{% example %}
action: |
  action: seventeentrack.get_packages
  data:
    config_entry_id: 2b4be47a1fa7c3764f14cf756dc98991
    package_state:
      - delivered
      - in_transit
  response_variable: result
{% endexample %}

This returns the matching packages in the `result` response variable, under `result.packages`.
### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the 17Track service config entry to retrieve packages for.
  required: true
  type: string
package_state:
  description: >
    Only return packages in the listed states. Returns all packages when
    omitted. One or more of `not_found`, `in_transit`, `expired`,
    `ready_to_be_picked_up`, `undelivered`, `delivered`, or `alert`.
  required: false
  type: list
{% endoptions_yaml %}

## Response data

The action returns a `packages` list. Each entry describes a package with the following fields:

- `tracking_number`: The tracking number of the package.
- `friendly_name`: The friendly name you gave the package.
- `status`: The current status of the package.
- `info_text`: A short description of the latest tracking event.
- `location`: The last known location of the package.
- `timestamp`: The time of the latest tracking event, in ISO 8601 format. Only present when 17Track reports a time.
- `origin_country`: The country the package is shipped from.
- `destination_country`: The destination country of the package.
- `package_type`: The type of package.
- `tracking_info_language`: The language of the tracking information.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
