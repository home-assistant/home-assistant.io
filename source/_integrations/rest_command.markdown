---
title: RESTful Command
description: Instructions on how to integrate REST commands into Home Assistant.
ha_category:
  - Automation
ha_release: 0.36
ha_iot_class: Local Push
ha_domain: rest_command
ha_config_flow: true
ha_integration_type: service
ha_codeowners:
  - '@jpbede'
---

The **RESTful Command** {% term integration %} sends HTTP requests from Home Assistant. You can configure named endpoints in the UI or define templated REST commands in YAML. Both configuration methods expose actions that can be called from a [script] or in an [automation].

[script]: /integrations/script/
[automation]: /getting-started/automation/

{% include integrations/config_flow.md %}

Each UI-managed entry represents one outbound endpoint. Home Assistant initially names the entry after the endpoint's hostname. You can rename the entry after setup.

{% configuration_basic %}
URL:
    description: HTTP or HTTPS URL to call. Do not include a username or password in the URL. Use the authentication fields instead.
HTTP method:
    description: HTTP method used for the request. Select GET, PATCH, POST, PUT, or DELETE. The default is GET.
Authentication:
    description: Authentication method used by the endpoint. Select None, Basic, Digest, or Bearer token. The default is None.
Username:
    description: Username used for Basic or Digest authentication.
Password:
    description: Password used for Basic or Digest authentication.
Bearer token:
    description: Token used for Bearer authentication.
Default payload:
    description: >
      Request body sent when an action does not provide a payload. The
      prefilled value is `{"message": "The event occurred"}`.
Content type:
    description: Content-Type header sent with the request. The default is `application/json`.
Timeout:
    description: Maximum number of seconds to wait for the endpoint. The default is 10 seconds.
Verify SSL certificate:
    description: Verify the endpoint's TLS certificate. This is enabled by default.
Use legacy TLS ciphers:
    description: Allow legacy TLS ciphers. This is disabled by default. Enable it only when the endpoint cannot use modern ciphers.
Skip URL encoding:
    description: Send the URL without applying URL encoding. This is disabled by default.
{% endconfiguration_basic %}

Passwords and Bearer tokens are stored in the config entry. They are not included in action data. When you reconfigure an endpoint, leave the password or token empty to retain the stored value.

Use the **Send request** (`rest_command.call_endpoint`) action to call a UI-managed endpoint. Select the endpoint in the action editor. The payload is optional: when omitted, the endpoint's default payload is sent.

The payload must be a string. If the endpoint expects JSON, provide JSON-encoded text instead of a YAML mapping. An action payload overrides the default payload for that call.

The action can return a response containing `status`, `content`, and `headers`. To use it in an automation, set `response_variable`.

UI-managed endpoints use static URLs and payloads. To template a URL, headers, or payload, or to send arbitrary request headers, use YAML configuration.

## YAML configuration

To use this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
rest_command:
  example_request:
    url: "http://example.com/"
```

The command name becomes an action in the form `rest_command.<command_name>`. The name `reload` is reserved and cannot be used for a YAML command.

For backward compatibility, an existing YAML command named `call_endpoint` takes precedence over the action for UI-managed endpoints. While that YAML command is configured, UI-managed endpoints cannot be called. Rename the YAML command, then reload the YAML configuration or restart Home Assistant to make the **Send request** action available.

{% configuration %}
service_name:
  description: The name used to expose the action. For example, the configuration above creates `rest_command.example_request`.
  required: true
  type: map
  keys:
    url:
      description: The URL (supports template) for sending request.
      required: true
      type: template
    method:
      description: HTTP method to use (get, patch, post, put, or delete).
      required: false
      default: get
      type: string
    headers:
      description: The headers for the requests.
      required: false
      type: map
    payload:
      description: A string/template to send with request.
      required: false
      type: template
    authentication:
      description: Type of HTTP authentication. Either `basic` or `digest`.
      required: false
      type: string
    username:
      description: The username for HTTP authentication.
      required: false
      type: string
    password:
      description: The password for HTTP authentication.
      required: false
      type: string
    timeout:
      description: Timeout for requests in seconds.
      required: false
      type: integer
      default: 10
    content_type:
      description: Content type for the request.
      required: false
      type: string
    verify_ssl:
      description: Verify the SSL certificate of the endpoint.
      required: false
      type: boolean
      default: true
    insecure_cipher:
      description: Allow insecure ciphers for the request. This is useful for older servers/devices that do not support modern ciphers.
      required: false
      type: boolean
      default: false
    skip_url_encoding:
      description: Skip internal URL canonicalization, which would have encoded the _host_ part by [IDNA](https://docs.aiohttp.org/en/stable/glossary.html#term-IDNA) codec and applied [requoting](https://docs.aiohttp.org/en/stable/glossary.html#term-requoting) to the _path_ and _query_ parts.
      required: false
      type: boolean
      default: false
{% endconfiguration %}

{% include integrations/actions.md %}

## RESTful Command automation examples

Use RESTful Command actions to send events to an HTTP endpoint or use an HTTP response in later automation steps.

{% include docs/paste_yaml_tip.md %}

### Automation: send a JSON message when a door opens

Configure a UI-managed endpoint to use POST and the `application/json` content type. Then use **Send request** when a door opens.

- **Trigger**: Front door opened
- **Action**: Send request
  - **Endpoint**: Home events
  - **Payload**: `{"title": "Front door", "message": "The door opened"}`

{% details "YAML example for sending a JSON message" %}

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

### Automation: use a YAML-defined REST command

Call a templated YAML-defined command when the alarm control panel is armed away.

- **Trigger**: Alarm control panel armed away
- **Action**: Send the alarm state to an endpoint

{% details "YAML example for calling a YAML-defined REST command" %}

{% example %}
automation: |
  alias: "Send the alarm state to an endpoint"
  triggers:
    - trigger: state
      entity_id: alarm_control_panel.home
      to: armed_away
  actions:
    - action: rest_command.my_request
      data:
        status: "{{ trigger.to_state.state }}"
        emoji: ":house:"
{% endexample %}

{% enddetails %}

## YAML configuration examples

### Basic example which uses PUT method and payload encoded as form data

This example implements two REST commands to add actions for the missing shuffle functionality of the iTunes integration.

```yaml
rest_command:
  shuffle_on:
    url: "http://YOUR_ITUNES-API_SERVER_IP:8181/shuffle"
    method: put
    content_type: "application/x-www-form-urlencoded"
    payload: "mode=songs"
  shuffle_off:
    url: "http://YOUR_ITUNES-API_SERVER_IP:8181/shuffle"
    method: put
    content_type: "application/x-www-form-urlencoded"
    payload: "mode=off"
```

### Using digest authentication

This example shows how to use digest authentication with a REST command:

```yaml
rest_command:
  secured_command:
    url: "http://example.com/api/secure-endpoint"
    method: post
    authentication: digest
    username: "USERNAME"
    password: "PASSWORD"
    payload: >-
      {"data": "example"}
    content_type: "application/json"
```

### Using REST command response in automations

REST commands provide an action response in a dictionary containing `status` (containing the HTTP response code), `content` containing the response body as text or JSON and `headers` containing the response headers.
This response can be accessed in automations using [`response_variable`](/docs/scripts/perform-actions#use-templates-to-handle-response-data).

The following example shows how the REST command response may be used in automations. In this case, checking the [Traefik API](https://doc.traefik.io/traefik/operations/api/) for errors.

```yaml
# Create a ToDo notification based on file contents
automation:
  - alias: "Check API response"
    triggers:
      - trigger: time
        at: "07:00:00"
    actions:
      - action: rest_command.traefik_get_rawdata
        response_variable: traefik_response
      - if: "{{ traefik_response['status'] == 200 }}"
        then:
          - alias: "Parse data"
            variables:
              routers: "{{ traefik_response['content']['routers'] }}"
              router_errors: >
                {%- for router in routers -%}
                  {%- if 'error' in routers[router] -%}
                    {{ router }}: {{ routers[router]['error'] }}
                  {% endif -%}
                {%- endfor -%}
              got_errors: "{{ router_errors | length > 0 }}"
          - if: "{{ got_errors }}"
            then:
              - action: notify.send_message
                target:
                  entity_id: notify.my_device
                data:
                  title: "Traefik errors"
                  message: "{{ router_errors }}"
        else:
          - action: notify.send_message
            target:
              entity_id: notify.my_device
            data:
              title: "Could not reach Traefik"
              message: "HTTP code: {{ traefik_response['status'] }}"

rest_command:
  traefik_get_rawdata:
    url: "http://127.0.0.1:8080/api/rawdata"
    method: get
```

### Using templates to change the payload based on entities

The commands can be dynamic, using templates to insert values of other entities. Actions support variables for doing things with templates.

This example uses [templates](/docs/templating/) for dynamic parameters.

```yaml
# Example configuration.yaml entry
rest_command:
  my_request:
    url: "https://slack.com/api/users.profile.set"
    method: post
    headers:
      authorization: !secret rest_headers_secret
      accept: "application/json, text/html"
      user-agent: "Mozilla/5.0 {{ useragent }}"
    payload: >-
      {"profile":{"status_text":"{{ status }}","status_emoji":"{{ emoji }}"}}
    content_type: "application/json; charset=utf-8"
```

### How to test your new REST command

Call the new action from [Tools](/docs/tools/dev-tools/) in the sidebar with some `data` like:

```json
{
  "status": "My status goes here",
  "emoji": ":plex:"
}
```

### Using a REST command as an action in an automation

```yaml
automation:
  - alias: "Arrive at work"
    triggers:
      - trigger: zone
        entity_id: device_tracker.my_device
        zone: zone.work
        event: enter
    actions:
      - action: rest_command.my_request
        data:
          status: "At work"
          emoji: ":calendar:"
```
