---
title: "URL-encode a value: urlencode"
function_name: "urlencode"
description: "URL-encodes a dictionary of values for use in HTTP requests."
available_as:
  - function
category: strings
return_type: string
limited: true
since: "0.117"
related_functions:
  - slugify
  - ordinal
---

The `urlencode` template function converts a dictionary of key-value pairs into a URL-encoded query string. This is Home Assistant's override of the default `urlencode` filter, specifically designed to handle dictionaries for building HTTP request parameters.

This is useful when constructing URLs for REST commands, webhooks, or API calls from within your {% term automations %} and {% term scripts %}. For example, you might need to send data to an external service with properly encoded parameters, or build a query string for a webhook URL. The function ensures that special characters in your values are properly escaped so they are transmitted correctly.

{% include template_functions/usage.md %}

{% template_function_usage %}
function: '{{ urlencode({"name": "Living Room", "value": "23.5"}) }}'
type: string
output: name=Living+Room&value=23.5
{% endtemplate_function_usage %}

{% include template_functions/signatures.md %}

```signature
urlencode(
    value: dict,
) -> str
```

### Function parameters

The following parameters can be provided to this function.

{% function_parameters %}
value:
  description: >
    A dictionary of key-value pairs to encode into a URL query string format. Keys and values are joined with `=` and pairs are separated with `&`.
  required: true
  type: map
{% endfunction_parameters %}

## Good to know

- Spaces in values are encoded as `+`, not `%20`. Most servers accept both, but if you need `%20` specifically, replace it afterwards.
- Only accepts a dictionary. To encode a single string (for example, a URL path segment), handle it manually or use [`slugify`](/template-functions/slugify/) where appropriate.

{% include template_functions/try_it.md %}

{% include template_functions/more_examples.md %}

### Build a webhook URL with parameters

Construct a full URL with encoded query parameters for calling an external webhook.

{% example %}
template: |
  {{
    "https://example.com/webhook?" ~ urlencode({
      "token": "abc123",
      "message": "Front door opened",
      "room": "Living Room"
    })
  }}
type: string
output: "https://example.com/webhook?token=abc123&message=Front+door+opened&room=Living+Room"
{% endexample %}

### Send sensor data to an external service

Encode sensor values into a query string for use in a REST command.

{% example %}
action: |
  action:
    - action: rest_command.send_data
      data:
        payload: >
          {{
            urlencode({
              "temperature": states("sensor.temperature"),
              "humidity": states("sensor.humidity"),
              "location": "home"
            })
          }}
{% endexample %}

{% include template_functions/stuck.md %}

{% include template_functions/related.md %}
