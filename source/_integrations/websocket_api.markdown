---
title: Home Assistant WebSocket API
description: Instructions on how to setup the WebSocket API within Home Assistant.
ha_category:
  - Other
ha_release: 0.34
ha_quality_scale: internal
ha_codeowners:
  - '@home-assistant/core'
ha_domain: websocket_api
ha_platforms:
  - sensor
ha_integration_type: system
---

The `websocket_api` integration set up a WebSocket API and allows one to interact with a Home Assistant instance that is running headless. This integration depends on the [`http` integration](/integrations/http/).

## Configuration

```yaml
# Example configuration.yaml entry
websocket_api:
```

For details to use the WebSocket API, please refer to the [WebSocket API documentation](https://developers.home-assistant.io/docs/api/websocket) .

## Track current connections

The WebSocket API provides a sensor that will keep track of the number of currently connected clients. You can add it by adding the following to your configuration:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: websocket_api
```

This will create a sensor called `sensor.connected_clients` whose value is the total number of connected clients.
