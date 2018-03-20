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

Allow to shutdown a Windows computer with a service call from Home Assistant.

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

- **computers** (*Required*): A list of computer object to shutdown from Home-Assistant.
- **computers/alias** (*Required*): Set a alias for this record and that is the name for the input.
- **computers/address** (*Required*): IP address or netbios name of the computer for shutdown.
- **computers/credentials** (*Required*): Credentials for logging into computer. Use a `%` as delimiter of username and password.

## {% linkable_title Home Assistant %}

Use the following inside Home Assistant service call to use it:

```yaml
service: hassio.addon_stdin
data:
  addon: core_rpc_shutdown
  input: test-pc
```
