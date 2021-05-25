---
title: RESTful Command
description: Instructions on how to integrate REST commands into Home Assistant.
ha_category:
  - Automation
ha_release: 0.36
ha_iot_class: Local Push
ha_domain: rest_command
---

This integration can expose regular REST commands as services. Services can be called from a [script] or in [automation].

[script]: /integrations/script/
[automation]: /getting-started/automation/

To use this component, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rest_command:
  example_request:
    url: "http://example.com/"
```

{% configuration %}
service_name:
  description: The name used to expose the service. E.g., in the above example, it would be 'rest_command.example_request'.
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
      type: list
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
{% endconfiguration %}

## Examples

### Basic example which uses PUT method and payload encoded as form data

This example implements 2 REST commands to add service calls for the missing shuffle functionality of the iTunes integration.

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

### Using templates to change the payload based on entities

The commands can be dynamic, using templates to insert values of other entities. Service call support variables for doing things with templates.

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

Call the new service from [developer tools](/docs/tools/dev-tools/) in the sidebar with some `data` like:

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
  trigger:
    platform: zone
    entity_id: device_tracker.my_device
    zone: zone.work
    event: enter
  action:
    - service: rest_command.my_request
      data:
        status: "At Work"
        emoji: ":calendar:"
```
