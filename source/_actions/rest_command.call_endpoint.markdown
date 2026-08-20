---
title: "Send request"
action: rest_command.call_endpoint
domain: rest_command
description: "Sends an HTTP request to a UI-managed RESTful Command endpoint."
related_actions:
  - rest_command.reload
---

The **Send request** action calls an endpoint configured through the RESTful Command integration. Use it to send the endpoint's default payload or provide a different payload for one request.

{% include actions/ui_header.md %}

To send a request from an automation or a script:

1. Go to {% my automations title="**Settings** > **Automations & scenes**" %}.
2. Open an existing automation or script, or select **Create automation** > **Create new automation**.
3. If you're setting up a new automation, add a trigger in the **When** section. Scripts don't need a trigger. They run when something else calls them.
4. In the **Then do** section, select **Add action**.
5. Search for and select **Send request**.
6. Select the RESTful Command **Endpoint**.
7. To replace the endpoint's default request body, enter a string in **Payload**.
8. Select **Save**.

This action does not support action targets. Select the endpoint in the **Endpoint** field instead of selecting an area, device, entity, or label.

### Options in the UI

{% options_ui %}
Endpoint:
  description: RESTful Command endpoint to call.
  required: true
Payload:
  description: Request body to send for this call. When omitted, the endpoint's default payload is used. If the endpoint expects JSON, enter JSON-encoded text instead of a mapping.
  required: false
{% endoptions_ui %}

{% include actions/yaml_header.md %}

In YAML, refer to this action as `rest_command.call_endpoint`. A basic example looks like this:

{% example %}
action: |
  action: rest_command.call_endpoint
  data:
    config_entry_id: REST_COMMAND_CONFIG_ENTRY_ID
{% endexample %}

This calls the selected endpoint with its stored method, headers, and default payload.

### Options in YAML

{% options_yaml %}
config_entry_id:
  description: Config entry ID of the RESTful Command endpoint to call. Select the endpoint in the action editor to add this value automatically.
  required: true
  type: string
payload:
  description: Request body to send for this call. When omitted, the endpoint's default payload is used. If the endpoint expects JSON, provide JSON-encoded text.
  required: false
  type: string
{% endoptions_yaml %}

## Good to know

- The payload must be a string. A payload supplied by the action overrides the endpoint's default payload for that call.
- The endpoint URL, method, authentication, content type, and timeout come from the selected config entry.
- To use the response in later automation steps, set `response_variable`. The response contains `status`, `content`, and `headers`.
- UI-managed endpoints use static configuration. Use a YAML-defined REST command when you need templates or arbitrary headers.

{% include actions/try_it.md %}

{% include actions/more_examples.md %}

### Automation: send a JSON message when a door opens

When a door opens, send a JSON message to a UI-managed endpoint configured to use POST and the `application/json` content type.

- **Trigger**: Door opened
- **Action**: Send request
  - **Endpoint**: Home events
  - **Payload**: `{"title": "Front door", "message": "The door opened"}`

{% details "YAML example for sending a door event" %}

{% example %}
automation: |
  alias: "Send a message when the front door opens"
  triggers:
    - trigger: state
      entity_id: binary_sensor.front_door
      to: "on"
  actions:
    - action: rest_command.call_endpoint
      data:
        config_entry_id: REST_COMMAND_CONFIG_ENTRY_ID
        payload: >-
          {"title": "Front door", "message": "The door opened"}
{% endexample %}

{% enddetails %}

### Automation: report a response other than HTTP 200

Call a UI-managed GET endpoint each morning. If the response status is not HTTP 200, create a persistent notification with the returned status.

- **Trigger**: Time at 07:00
- **Action**: Send request
  - **Endpoint**: Service status
- **Action**: Create a persistent notification when the returned status is not `200`

{% details "YAML example for checking an endpoint response" %}

{% example %}
automation: |
  alias: "Check the service status"
  triggers:
    - trigger: time
      at: "07:00:00"
  actions:
    - action: rest_command.call_endpoint
      data:
        config_entry_id: REST_COMMAND_CONFIG_ENTRY_ID
      response_variable: endpoint_response
    - if: "{{ endpoint_response['status'] != 200 }}"
      then:
        - action: persistent_notification.create
          data:
            title: "Service status check failed"
            message: >-
              The endpoint returned HTTP status
              {{ endpoint_response['status'] }}.
{% endexample %}

{% enddetails %}

{% include actions/stuck.md %}

{% include actions/related.md %}
