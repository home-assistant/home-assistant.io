---
layout: page
title: "PTVSD Debugger"
description: "Debugging from visual studio code."
date: 2019-04-24 09:00
sidebar: true
comments: false
sharing: true
footer: true
logo: home-assistant.png
ha_category: "Utility"
ha_qa_scale: internal
ha_release: 0.92
---

The `ptvsd` component allows you to connect the ptvsd debugger from visual studio code to connect to home assistant.

To enable the `ptvsd` component add the following to your `configuration.yaml` file:

```yaml
# Example configuration.yaml entry
ptvsd:
```

By default this will listen on address 0.0.0.0 port 5678, and will not wait for a connection.

If you want to debug something in the boot-up sequence, configure the component to wait for a connection first:

```yaml
# Example configuration.yaml entry
ptvsd:
  wait: True
```

The ptvsd debugger is loaded quite early on in the boot-up sequence, before any other components.

You can also listen on a different local address or port:

```yaml
# Example configuration.yaml entry
ptvsd:
  host: localhost
  port: 6789
```

### {% linkable_title Security %}

Ensure if this is a public-facing server, that the port is secured. One way of doing this is setting host to localhost and only allowing SSH tunnels in. Another would be to only access the server from the local network and only allow the HTTP/S port into hass.

### {% linkable_title Example launch.json }

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