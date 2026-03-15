---
title: Remote Python Debugger
description: Remote Python debugger (debugpy) for Visual Studio Code
ha_category:
  - Utility
ha_release: 0.112
ha_codeowners:
  - '@frenck'
ha_domain: debugpy
ha_quality_scale: internal
ha_iot_class: Local Push
ha_integration_type: service
related:
  - docs: /docs/configuration/
    title: Configuration file
---

The **Remote Python debugger** {% term integration %} allows you to use the Visual Studio Code
Python debug tooling with a remote Home Assistant instance.

It uses Microsoft's `debugpy` library which is the successor of `ptvsd`, and
the default library used by Visual Studio Code.

This is useful in testing changes on a local development install, or connecting
to a production server to debug issues. It is possible to load the integration
without activating the debugger, but injecting it with an action. This
is particularly useful on a developer's production system as it does not impact
performance when not injected.

## Configuration

To enable the remote Python debugger integration add the following to
your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
debugpy:
```

By default this will listen on all local interfaces, on port 5678,
will not wait for a connection and start when Home Assistant starts.

{% configuration %}
host:
  description: The local interface to listen on.
  required: false
  default: 0.0.0.0 (all interfaces).
  type: string
port:
  description: Port to listen on.
  required: false
  default: 5678
  type: integer
start:
  description: "If `true`, the debugger will be injected on start of Home Assistant. Set it to false to inject it on demand using the `debugpy.start` action."
  required: false
  default: true
  type: boolean
wait:
  description: "If `true`, wait for the debugger to connect before starting up Home Assistant. This option is ignore when `start` is set to `false`."
  required: false
  default: false
  type: boolean
{% endconfiguration %}

## Security

Ensure if this is a public-facing server, that the port is secured. Anyone who
is able to access the debugger port can *execute arbitrary code* on the
Home Assistant instance, which is very unsafe.

If the Home Assistant instance is behind your firewall with only the http(s) port
exposed, then this is safe from outside connections.

## Performance and memory use

Using the debugger (even when not attached), increases memory usage and
decreases performance. It is not recommended to configure the debugger on a
persistent (production) server, unless absolutely required.

Alternatively, the integration can be loaded by setting the `start` option
to `false`. This will prevent the debugger from being injected, instead,
it will be injected on-demand by calling the `debugpy.start` action.

## Waiting at startup

If you want to debug something in the start-up sequence, configure the
integration to wait for a connection first:

```yaml
# Example configuration.yaml entry
debugpy:
  start: true
  wait: true
```

The debugger is loaded quite early on in the boot-up sequence, before any other
integrations. This will allow you to set breakpoints in `async_setup` or similar
and debug the loading of the integration.

## Alternate host and port

You can also listen on a different server address or port:

```yaml
# Example configuration.yaml entry
debugpy:
  host: localhost
  port: 6789
```

This is useful for multi-homed servers, or for localhost only access

## Action `debugpy.start`

When the `start` option of the integration has been set to `false`, one can
use the `debugpy.start` action to inject and start the remote Python
debugger at runtime.

Please note: There is no way to stop it once started, this would require
a restart of Home Assistant.

## Example Visual Studio Code configuration

This can be copied into your `launch.json` in the `.vscode` subdirectory in
your Visual Studio Code project to connect to the debugger.

```json
{
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            // Example of attaching to local debug server
            "name": "Python: Attach Local",
            "type": "debugpy",
            "request": "attach",
            "connect": {
                "port": 5678,
                "host": "localhost",
            },
            "pathMappings": [
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "."
                }
            ],
        },
        {
            // Example of attaching to my production server
            "name": "Python: Attach Remote",
            "type": "debugpy",
            "request": "attach",
            "connect": {
                "port": 5678,
                "host": "homeassistant.local",
            },
            "pathMappings": [
                {
                    "localRoot": "${workspaceFolder}",
                    "remoteRoot": "/usr/src/homeassistant"
                }
            ],
        }
    ]
}
```
