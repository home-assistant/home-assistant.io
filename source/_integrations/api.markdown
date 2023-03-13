---
title: Home Assistant API
description: Instructions on how to setup the RESTful API within Home Assistant.
ha_category:
  - Other
ha_release: 0.7
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: api
ha_integration_type: system
---

The `api` integration exposes a RESTful API and allows one to interact with a Home Assistant instance that is running headless. This integration depends on the [HTTP integration](/integrations/http/).

```yaml
# Example configuration.yaml entry
api:
```

For details to use the API, please refer to the [REST API](/developers/rest_api/) in the "Developer" section.
