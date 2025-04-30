---
title: "RESTful Notifications"
description: "Instructions on how to add RESTful notifications to Home Assistant."
ha_category:
  - Notifications
ha_release: 0.13
ha_domain: rest
---

The `rest` notification platform allows you to deliver [RESTful](https://en.wikipedia.org/wiki/Representational_state_transfer) notifications from Home Assistant to another party.

To enable the REST notification in your installation, add the following to your {% term "`configuration.yaml`" %} file:

```yaml
# Example configuration.yaml entry
notify:
  - name: NOTIFIER_NAME
    platform: rest
    resource: http://IP_ADDRESS/ENDPOINT
```

{% configuration %}
name:
  description: Setting the optional parameter `name` allows multiple notifiers to be created. The notifier will bind to the `notify.NOTIFIER_NAME` action.
  required: false
  default: notify
  type: string
resource:
  description: The resource or endpoint that will receive the value.
  required: true
  type: string
method:
  description: The method of the request. Valid options are `GET`, `POST` or `POST_JSON`.
  required: false
  default: GET
  type: string
verify_ssl:
  description: Verify the SSL certificate of the endpoint.
  required: false
  type: boolean
  default: True
authentication:
  description:  Type of the HTTP authentication. `basic` or `digest`.
  required: false
  default: basic
  type: string
username:
  description: The username for accessing the REST endpoint.
  required: false
  type: string
password:
  description: The password for accessing the REST endpoint.
  required: false
  type: string
headers:
  description: The headers for the request.
  required: false
  type: string
message_param_name:
  description: Parameter name for the message.
  required: false
  default: message
  type: string
title_param_name:
  description: Parameter name for the title.
  required: false
  type: string
target_param_name:
  description: Parameter name for the target.
  required: false
  type: string
data:
  description: Dictionary of extra parameters to send to the resource.
  required: false
  type: string
data:
  description: Template dictionary of extra parameters to send to the resource.
  required: false
  type: template
{% endconfiguration %}

To use notifications, please see the [getting started with automation page](/getting-started/automation/).

{% include integrations/using_templates.md %}
