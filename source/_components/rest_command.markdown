---
layout: page
title: "RESTful Command"
description: "Instructions how to integrate REST commands into Home Assistant."
date: 2016-12-27 00:00
sidebar: true
comments: false
sharing: true
footer: true
logo: restful.png
ha_category: Automation
ha_release: 0.36.0
---

This component can expose regular rest commands as services. Services can be called from a [script] or in [automation].

[script]: /components/script/
[automation]: /getting-started/automation/

To enable this switch, add the following lines to your `configuration.yaml` file:
```yaml
# Example configuration.yaml entry
# Exposes service rest_command.example_request 
rest_command:
  example_request:
    url: 'http://example.com/'
```

Configuration variables:
- **url** (*Required*): URL (support template) for sending request.
- **method** (*Optional*): HTTP method (get, post, put, delete). Default is get.
- **payload** (*Optional*): A string/Template to send with request.
- **username** (*Optional*): username for HTTP authentication
- **password** (*Optional*): password for HTTP authentication
- **timeout** (*Optional*): Timeout for requests, default 10 seconds.

The commands can be dynamic, using templates to insert values of other entities. Service call support variables for template stuff.

