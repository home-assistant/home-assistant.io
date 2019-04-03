---
layout: page
title: "RESTful Command"
description: "Instructions on how to integrate REST commands into Home Assistant."
date: 2018-02-24 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: restful.png
ha_category: Automation
ha_release: 0.36
ha_iot_class: Local Push
---

This component can expose regular REST commands as services. Services can be called from a [script] or in [automation].

[script]: /components/script/
[automation]: /getting-started/automation/

To use this component, add the following lines to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
rest_command:
  example_request:
    url: 'http://example.com/'
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
      type: [string, template]
    method:
      description: HTTP method to use (get, post, put, or delete).
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
      type: [string, template]
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
      type: string
      defaut: 10
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

## {% linkable_title Examples %}

The commands can be dynamic, using templates to insert values of other entities. Service call support variables for doing things with templates.

{% raw %}
```yaml
# Example configuration.yaml entry
rest_command:
  my_request:
    url: https://slack.com/api/users.profile.set
    method: POST
    headers:
      authorization: !secret rest_headers_secret
      accept: 'application/json, text/html'
    payload: '{"profile":{"status_text": "{{ status }}","status_emoji": "{{ emoji }}"}}'
    content_type:  'application/json; charset=utf-8'
    verify_ssl: true
```
{% endraw %}

In this example entry, you can see some simple [templates](/docs/configuration/templating/) in use for dynamic parameters.

Call the new service from [developer tools](/docs/tools/dev-tools/) in the sidebar with some `data` like:

```json
{
  "status":"My Status Goes Here",
  "emoji":":plex:"
}
```
Or in an example `automation`

```yaml
automation:
- alias: 'Arrive at Work'
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
