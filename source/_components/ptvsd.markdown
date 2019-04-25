---
layout: page
title: "PTVSD Debugger (Visual Studio Code)"
description: "Debugging from Visual Studio Code."
date: 2019-04-24 09:00
sidebar: true
comments: false
sharing: true
footer: true
ha_category: 
  - Utility
ha_qa_scale: internal
ha_release: 0.93
---

The `ptvsd` component allows you to connect the ptvsd debugger from visual studio code to connect to home assistant.

To enable the `ptvsd` component add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ptvsd:
```

By default this will listen on address 0.0.0.0 port 5678, and will not wait for a connection.

### {% linkable_title Configuration Variables %}

{% configuration %}
host:
  description: The local host to listen on. 
  required: false
  default: 0.0.0.0 or all interfaces.
  type: string
port:
  description: Port to listen on.
  required: false
  default: 5678
  type: port
wait:
  description: If true, wait for the debugger to connect before starting up home assistatn.
  required: false
  default: False
  type: boolean
{% endconfiguration %}

### {% linkable_title Waiting at startup %}

If you want to debug something in the boot-up sequence, configure the component to wait for a connection first:

```yaml
# Example configuration.yaml entry
ptvsd:
  wait: True
```

The ptvsd debugger is loaded quite early on in the boot-up sequence, before any other components.

### {% linkable_title Alternate host and port %}

You can also listen on a different server address or port:

```yaml
# Example configuration.yaml entry
ptvsd:
  host: localhost
  port: 6789
```

This is useful for multi-homed servers, or for localhost only access

### {% linkable_title Security %}

Ensure if this is a public-facing server, that the port is secured. Anyone who is able to access the debugger port can **execute arbitary code** on the home assistant server, which is very unsafe.

If the home assistant server is behind your firewall with only the http(s) port exposed, then this is safe from outside connections.

Another way of securing the port is to set `host` to localhost and have a secured SSH TCP tunnel with a client certificate for access from the outside internet.

### {% linkable_title Example `launch.json` %}

This can be copied into your launch.json in the `.vscode` subdirectory in your Visual Studio Code project to connect to the debugger.

```json
{
    "version": "0.2.0",
    "configurations": [        
        {
            // Example of attaching to local debug server running on WSL
            "name": "Python: Attach",
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