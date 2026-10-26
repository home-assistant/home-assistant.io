---
description: Instructions on how to set up the WebSocket API within Home Assistant.
ha_release: 0.34
ha_domain: websocket_api
---

The **Home Assistant WebSocket API** {% term integration %} set up a WebSocket API and allows one to interact with a Home Assistant instance that is running headless. This integration depends on the [`http` integration](/integrations/http/).

## Configuration

```yaml
# Example configuration.yaml entry
websocket_api:
```

For details to use the WebSocket API, please refer to the [WebSocket API documentation](https://contributors.home-assistant.io/core/internals/websocket-api/) .

## Track current connections

The WebSocket API provides a sensor that will keep track of the number of currently connected clients. You can add it by adding the following to your configuration:

```yaml
# Example configuration.yaml entry
sensor:
  - platform: websocket_api
```

This will create a sensor called `sensor.connected_clients` whose value is the total number of connected clients.
