---
title: "API"
description: "Instructions on how to setup the RESTful API within Home Assistant."
logo: home-assistant.png
ha_category:
  - Other
ha_qa_scale: internal
ha_release: 0.7
---

The `api` integration exposes a RESTful API and allows one to interact with a Home Assistant instance that is running headless. This integration depends on the [`http` integration](/integrations/http/).

<div class='note warning'>

It is HIGHLY recommended that you set the `api_password`, especially if you are planning to expose your installation to the internet.

</div>

```yaml
# Example configuration.yaml entry
api:
```

For details to use the API, please refer to the [REST API](/developers/rest_api/) or the [Python REST API documentation](/developers/python_api/) in the "Developer" section.
