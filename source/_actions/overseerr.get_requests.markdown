---
title: "Get requests"
action: overseerr.get_requests
domain: overseerr
description: "Retrieves a list of media requests from Seerr."
---

The **Get requests** action retrieves a list of media requests from Seerr and returns them as [response data](/docs/scripts/perform-actions#use-templates-to-handle-response-data).

This is useful when you want an automation to react to media requests, for example to send a notification with the pending requests that still need approval.

This action does not support targets. In the UI, you are not prompted to choose an area, device, entity, or label. Instead, you select which Seerr instance to query through the **Seerr instance** option.

{% include actions/ui_header.md %}

To get the requests from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. From the search box, search for and select **Seerr: Get requests**.
6. Choose the **Seerr instance**, then set any filters you want.
7. Select **Save**.

### Options in the UI

{% options_ui %}
Seerr instance:
  description: The Seerr instance to get requests from.
  required: true
Request status:
  description: "Filter the requests by status: `approved`, `pending`, `available`, `processing`, `unavailable`, or `failed`."
  required: false
Sort order:
  description: "Sort the requests by `added` or `modified` date."
  required: false
Requested by:
  description: Filter the requests by the user ID that requested them.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `overseerr.get_requests`. Because this action returns a response, use `response_variable` to capture the result. A basic example looks like this:

{% example %}
action: |
  action: overseerr.get_requests
  data:
    config_entry_id: 1b4a46c6d0f3406c80d275f5b0c6483b
    status: pending
  response_variable: media_requests
{% endexample %}

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: >
    The ID of the Seerr config entry to get requests from.
  required: true
  type: string
status:
  description: >
    Filter the requests by status: `approved`, `pending`, `available`,
    `processing`, `unavailable`, or `failed`.
  required: false
  type: string
sort_order:
  description: >
    Sort the requests by `added` or `modified` date.
  required: false
  type: string
requested_by:
  description: >
    Filter the requests by the user ID that requested them.
  required: false
  type: integer
{% endoptions_yaml %}

## Response data

The response contains a `requests` field, which is a list of media requests. Each entry includes the request details, such as its status and the user who requested it, along with the associated media information.

{% include actions/try_it.md %}

{% include actions/stuck.md %}

{% include actions/related.md %}
