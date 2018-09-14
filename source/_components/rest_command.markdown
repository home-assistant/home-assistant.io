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
ha_iot_class: "Local Push"
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

Configuration variables:

- **[service_name]** (*Required*): The name used to expose the service. E.g., in the above example, it would be `rest_command.example_request`.
  - **url** (*Required*): The URL (support template) for sending request.
  - **method** (*Optional*): HTTP method to use (`get`, `post`, `put`, or `delete`). Defaults to `get`.
  - **headers** (*Optional*): The headers for the requests.
  - **payload** (*Optional*): A string/template to send with request.
  - **username** (*Optional*): The username for HTTP authentication.
  - **password** (*Optional*): The password for HTTP authentication.
  - **timeout** (*Optional*): Timeout for requests. Defaults to 10 seconds.
  - **content_type** (*Optional*): Content type for the request.

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
