---
title: PTVSD - Python Tools for Visual Studio Debug Server
description: Debugging from Visual Studio Code.
ha_category:
  - Utility
ha_release: 0.93
ha_codeowners:
  - '@swamp-ig'
ha_domain: ptvsd
---

The `ptvsd` integration allows you to use the Visual Studio Code PTVSD debugger with Home Assistant.

This is useful in testing changes on a local development install, or connecting to a production server to debug issues.

To enable the `ptvsd` integration add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ptvsd:
```

By default this will listen on all local interfaces, on port 5678, and will not wait for a connection.

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
wait:
  description: If true, wait for the debugger to connect before starting up Home Assistant.
  required: false
  default: false
  type: boolean
{% endconfiguration %}

### Security

Ensure if this is a public-facing server, that the port is secured. Anyone who is able to access the debugger port can *execute arbitrary code* on the Home Assistant server, which is very unsafe.

If the Home Assistant server is behind your firewall with only the http(s) port exposed, then this is safe from outside connections.

Another way of securing the port is to set `host` to localhost and have a secured SSH TCP tunnel with a client certificate for access from the outside internet.

### Memory Use

There have been reports of continually increasing memory use while the debugger is running, although this doesn't seem to appear on all systems. Only configure the debugger on a persistent server when it's actually required.

### Waiting at startup

If you want to debug something in the boot-up sequence, configure the integration to wait for a connection first:

```yaml
# Example configuration.yaml entry
ptvsd:
  wait: True
```

The ptvsd debugger is loaded quite early on in the boot-up sequence, before any other components. This will allow you to set breakpoints in `async_setup` or similar and debug the loading of the component.

### Alternate host and port

You can also listen on a different server address or port:

```yaml
# Example configuration.yaml entry
ptvsd:
  host: localhost
  port: 6789
```

This is useful for multi-homed servers, or for localhost only access

### Example Visual Studio Code configuration

This can be copied into your `launch.json` in the `.vscode` subdirectory in your Visual Studio Code project to connect to the debugger.

```json
{
    "version": "0.2.0",
    "configurations": [        
        {
            // Example of attaching to local debug server running on WSL
            "name": "Python: Attach Local",
            "type": "python",
            "request": "attach",
            "port": 5678,
            "host": "localhost",
            "pathMappings": [
                {
                    "localRoot": "c:\\Users\\Penny\\Documents\\Software\\home-assistant\\",
                    "remoteRoot": "/mnt/c/Users/Penny/Documents/Software/home-assistant" 
                }
            ],            
        },
        {
            // Example of attaching to my production server
            "name": "Python: Attach Brontosarus",
            "type": "python",
            "request": "attach",
            "port": 5678,
            "host": "10.0.0.3", // Within my firewall so I don't need to secure the port.
            "pathMappings": [
                {
                    "localRoot": "c:\\Users\\Penny\\Documents\\Software\\home-assistant\\",
                    "remoteRoot": "/usr/src/app" // setup for docker container.
                }
            ],            
        }
    ]
}
```
