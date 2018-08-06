---
layout: page
title: "RPC Shutdown"
description: "Simple way for remote windows shutdowns."
date: 2017-09-25 14:00
sidebar: true
comments: false
sharing: true
footer: true
---

Allows you to shut down a Windows computer with a service call from Home Assistant.

```json
{
  "computers": [
    {
      "alias": "test-pc",
      "address": "192.168.0.1",
      "credentials": "user%password"
    }
  ]
}
```

- **computers** (*Required*): A list of computer objects to shutdown from Home-Assistant.
- **computers/alias** (*Required*): Set an alias for this record which becomes the name for the input.
- **computers/address** (*Required*): IP address or NetBIOS name of the computer for the shutdown.
- **computers/credentials** (*Required*): Credentials for logging into computer. Use a `%` as the delimiter of username and password.

## {% linkable_title Home Assistant %}

Use the following inside Home Assistant service call to use it:

```yaml
service: hassio.addon_stdin
data:
  addon: core_rpc_shutdown
  input: test-pc
```
