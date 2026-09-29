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

The **Remote Python debugger** {% term integration %} allows you to use the Visual Studio Code Python debug tooling with a remote Home Assistant instance.

It uses Microsoft's `debugpy` library, which is the successor of `ptvsd` and the default library used by Visual Studio Code.

This is useful for testing changes on a local development install, or for connecting to a production server to debug issues. You can also load the integration without activating the debugger and inject it later with an action. This is particularly useful on a production system, as the debugger does not impact performance until it is injected.

## Prerequisites

To connect to the debugger, you need a debugpy-compatible debugging client on the computer you debug from. Visual Studio Code with the Python extension is the most common choice.

## Configuration

To enable the remote Python debugger integration, add the following to your {% term "`configuration.yaml`" %} file.
{% include integrations/restart_ha_after_config_inclusion.md %}

```yaml
# Example configuration.yaml entry
debugpy:
```

By default, this listens on all local interfaces on port 5678, does not wait for a connection, and starts when Home Assistant starts.

{% configuration %}
host:
  description: The local interface to listen on.
  required: false
  default: 0.0.0.0 (all interfaces)
  type: string
port:
  description: Port to listen on.
  required: false
  default: 5678
  type: integer
start:
  description: "If `true`, the debugger will be injected on start of Home Assistant. Set it to `false` to inject it on demand using the `debugpy.start` action."
  required: false
  default: true
  type: boolean
wait:
  description: "If `true`, wait for the debugger to connect before starting up Home Assistant. This option is ignored when `start` is set to `false`."
  required: false
  default: false
  type: boolean
{% endconfiguration %}

## Security

{% warning %}
Anyone who can reach the debugger port can run arbitrary code on your Home Assistant instance. Only enable the debugger on a network you trust, and never expose the port directly to the internet.
{% endwarning %}

If your Home Assistant instance is behind a firewall with only the HTTP(S) port exposed, the debugger is safe from outside connections.

{% include integrations/actions.md %}

## Examples

### Wait for a connection at startup

If you want to debug something in the start-up sequence, configure the integration to wait for a connection first:

```yaml
# Example configuration.yaml entry
debugpy:
  start: true
  wait: true
```

The debugger is loaded quite early in the boot-up sequence, before any other integrations. This allows you to set breakpoints in `async_setup` or similar and debug the loading of integrations.

### Listen on a different host or port

You can listen on a different server address or port:

```yaml
# Example configuration.yaml entry
debugpy:
  host: localhost
  port: 6789
```

This is useful for multi-homed servers, or for localhost only access.

### Visual Studio Code configuration

Copy this into your `launch.json` in the `.vscode` subdirectory of your Visual Studio Code project to connect to the debugger.

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

## Known limitations

- Using the debugger increases memory usage and decreases performance, even when no client is attached. Avoid enabling it permanently on a production server unless it is really required. To keep this cost off your system until you need it, set the `start` option to `false` and inject the debugger on demand with the [Start action](/actions/debugpy.start/).
- Once the debugger is started, there is no action to stop it again. To stop it, restart Home Assistant.

## Removing the integration

This integration is set up through YAML. To remove it, delete the `debugpy` entry from your {% term "`configuration.yaml`" %} file and restart Home Assistant.
