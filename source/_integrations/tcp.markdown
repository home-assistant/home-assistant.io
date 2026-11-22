---
title: TCP
description: Instructions on how to set up TCP within Home Assistant.
ha_release: 0.14
ha_iot_class: Local Polling
ha_config_flow: true
ha_domain: tcp
ha_integration_type: service
ha_platforms:
  - binary_sensor
  - sensor
related:
  - docs: /docs/configuration/
    title: Configuration file
  - docs: /docs/templating/where-to-use/#processing-incoming-data
    title: Templates for incoming data
---

The **TCP** {% term integration %} allows you to integrate services that communicate over a TCP socket with a simple request/reply mechanism. Home Assistant connects to the server, sends a text payload, and uses the response as the state of an entity.

## Supported functions

Each entry creates one device with:

- **Sensor**: always created. Its state is the response of the server, or the result of the value template if one is set.
- **Binary sensor**: created only if you set a value for **On**. It is on when the state is equal to that value.

{% include integrations/config_flow.md %}

{% configuration_basic %}
Host:
  description: The hostname or IP address of the TCP server.
Port:
  description: The port of the TCP server.
Payload:
  description: The text sent to the server after connecting to get the response you are interested in.
Timeout:
  description: How long, in seconds, to wait for the connection and for the response before giving up. Defaults to 10.
Buffer size:
  description: The maximum number of bytes read from the response. Increase it if you expect a larger response. Defaults to 1024.
Unit of measurement:
  description: The unit of measurement of the sensor.
Value template:
  description: A [template](/docs/templating/where-to-use/#processing-incoming-data) to extract the value from the response. The response is available as `value`. By default the entire response is the value.
Value for on:
  description: If set, a binary sensor is created in addition to the sensor. It is on when the state is equal to this value.
Use SSL:
  description: Use an SSL/TLS connection. Defaults to off.
Verify SSL certificate:
  description: Verify the certificate of the server. Turn it off if the server uses a self-signed certificate. Defaults to on.
{% endconfiguration_basic %}

Before creating the entry, Home Assistant checks that it can connect to the server. Entries with the same host, port and payload cannot be added twice.

### Reconfiguring

All the parameters above can be changed after the entry was created. Go to {% my integrations title="**Settings** > **Devices & services**" %}, select the TCP entry, then select the three dots {% icon "mdi:dots-vertical" %} and choose **Reconfigure**. If you add or remove the value for **On**, the binary sensor is created or removed accordingly.

## Data updates

Home Assistant polls the server every 30 seconds. At each update it opens a new connection, sends the payload, reads one response of up to the buffer size and closes the connection.

## Examples

### EBUSd

The [EBUSd](https://github.com/john30/ebusd/wiki) service connects to an eBUS serial bus on some home heating and cooling systems. To use it, you connect to it using a TCP socket and send it a command. On the command line this looks like:

```bash
echo "r WaterPressure" | nc 10.0.0.127 8888
```

The server answers with `0.903;ok`. The response contains more than the value, so use a template to keep only the first part.

| Parameter | Value |
| --------- | ----- |
| Host | `10.0.0.127` |
| Port | `8888` |
| Payload | `r WaterPressure` |
| Timeout | `5` |
| Value template | `{{ value.split(';')[0] }}` |
| Unit of measurement | `bar` |

### Binary sensor

If your server answers `1` when a device is on, set **Value for on** to `1`. A binary sensor is created together with the sensor, and it is on while the response is `1`.

## Use cases

- Read a value from a service that has no dedicated integration but answers requests over a plain TCP socket, such as the daemons of home heating systems or simple monitoring tools.
- Check the on/off status of a device that answers with a fixed value.

## Known limitations

- Only one response is read per update, up to the configured buffer size. Longer responses are truncated.
- The payload is sent as plain text. Binary protocols are not supported.
- The server is polled, so state changes are detected with a delay of up to 30 seconds. Persistent connections for receiving ongoing pushed updates are not supported.
- There is no authentication, other than what the server itself requires in the payload.

## Troubleshooting

### The entry cannot be added: "Failed to connect"

Check that the host and port are correct, that the server is running and that no firewall is blocking the connection.

### The entities are unavailable

Home Assistant could not connect, send the payload or receive a response within the timeout. The details are in the log. Increase the **Timeout** if the server answers slowly.

## Removing the integration

This integration follows standard integration removal.

{% include integrations/remove_device_service.md %}