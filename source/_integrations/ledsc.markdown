# LedSC integration

[LedSC] is a controller for LED strips that communicates via the Modbus protocol.
[WebSC] is a daemon that communicates with LedSC via Modbus and publishes its control and other advanced functions as a WebSocket API.
This integration can connect to this WebSocket API and make the LedSC control available in the Home Assistant.

## WebSC

This service is written in Python and can be installed on any device.
The condition is that the device has a RS485 bus.
You can also buy a [WebSC device] that has everything ready and has 4 RS485 buses.

Before loading the integration, it is necessary to configure the WebSC first.
Each time you add or remove a device, you must re-initialise the integration.

## Configuration

The configuration of the integration only involves setting the host and port of the WebSocket control API.

## Entities

After a successful connection to the WebSC control API, the integration will automatically load all devices configured in the WebSC.
No further configuration is required.

### Light

A common Home Assistant entity.
Allows you to control LedSC as RGBW lights.

[LedSC]: https://ledsc.eu/
[WebSC]: https://gitlab.com/ledsc/websc
[WebSC device]: https://ledsc.eu/?page_id=150