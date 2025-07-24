---
title: RESTful Command
description: Instructions on how to integrate REST commands into Home Assistant.
ha_category:
  - Automation
ha_release: 0.36
ha_iot_class: Local Push
ha_domain: rest_command
ha_integration_type: integration
ha_codeowners:
  - '@jpbede'
---

This {% term integration %} can expose regular REST commands as actions. Actions can be called from a [script] or in [automation].

[script]: /integrations/script/
[automation]: /getting-started/automation/

To use this {% term integration %}, add the following lines to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
rest_command:
  example_request:
    url: "http://example.com/"
```

{% configuration %}
service_name:
  description: The name used to expose the action. E.g., in the above example, it would be 'rest_command.example_request'.
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
    username:
      description: The username for basic HTTP authentication (digest is not supported).
      required: false
      type: string
    password:
      description: The password for basic HTTP authentication (digest is not supported).
      required: false
      type: string
    timeout:
      description: Timeout for requests in seconds.
      required: false
      type: string
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
{% endconfiguration %}

## Examples

### Basic example which uses PUT method and payload encoded as form data

This example implements 2 REST commands to add actions for the missing shuffle functionality of the iTunes integration.

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

### Using REST command Response in automations

REST commands provide an action response in a dictionary containing `status` (containing the HTTP response code) and `content` containing the response body as text or JSON. This response can be accessed in automations using [`response_variable`](/docs/scripts/perform-actions#use-templates-to-handle-response-data).

The following example shows how the REST command response may be used in automations. In this case, checking the [Traefik API](https://doc.traefik.io/traefik/operations/api/) for errors.

{% raw %}

```yaml
# Create a ToDo notification based on file contents
automation:
  - alias: "Check API response"
    triggers:
      - ...
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
                    {{router}}: {{ routers[router]['error'] }}
                  {% endif -%}
                {%- endfor -%}
              got_errors: "{{ router_errors|length > 0 }}"
          - if: "{{ got_errors }}"
            then:
              - action: notify.mobile_app_iphone
                data:
                  title: "Traefik errors"
                  message: "{{ router_errors }}"
        else:
          - action: notify.mobile_app_iphone
            data:
              title: "Could not reach Traefik"
              message: "HTTP code: {{ traefik_response['returncode'] }}"

rest_command:
  traefik_get_rawdata:
    url: http://127.0.0.1:8080/api/rawdata
    method: GET
```

{% endraw %}

### Using templates to change the payload based on entities

The commands can be dynamic, using templates to insert values of other entities. Actions support variables for doing things with templates.

In this example, uses [templates](/docs/configuration/templating/) for dynamic parameters.

{% raw %}

```yaml
# Example configuration.yaml entry
rest_command:
  my_request:
    url: https://slack.com/api/users.profile.set
    method: POST
    headers:
      authorization: !secret rest_headers_secret
      accept: "application/json, text/html"
      user-agent: 'Mozilla/5.0 {{ useragent }}'
    payload: '{"profile":{"status_text": "{{ status }}","status_emoji": "{{ emoji }}"}}'
    content_type:  'application/json; charset=utf-8'
    verify_ssl: true
```

{% endraw %}

### How to test your new REST command

Call the new action from [developer tools](/docs/tools/dev-tools/) in the sidebar with some `data` like:

```json
{
  "status":"My Status Goes Here",
  "emoji":":plex:"
}
```

### Using a REST command as an action in an automation

```yaml
automation:
- alias: "Arrive at Work"
  triggers:
    - trigger: zone
      entity_id: device_tracker.my_device
      zone: zone.work
      event: enter
  actions:
    - action: rest_command.my_request
      data:
        status: "At Work"
        emoji: ":calendar:"
```
