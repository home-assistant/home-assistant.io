---
title: "RPC Shutdown"
description: "Simple way for remote windows shutdowns."
---

Allows you to shut down a Windows computer with a service call from Home Assistant.

```json
{
  "computers": [
    {
      "alias": "test-pc-1",
      "address": "192.168.0.1",
      "credentials": "user%password"
    },
    {
      "alias": "test-pc-2",
      "address": "192.168.0.2",
      "credentials": "user%password"
    }
  ]
}
```

- **computers** (*Required*): A list of computer objects to shutdown from Home-Assistant.
- **computers/alias** (*Required*): Set an alias for this record which becomes the name for the input.
- **computers/address** (*Required*): IP address or NetBIOS name of the computer for the shutdown.
- **computers/credentials** (*Required*): Credentials for logging into computer. Use a `%` as the delimiter of username and password.

### Home Assistant configuration

Use the following inside Home Assistant service call to use it:

```yaml
service: hassio.addon_stdin
data:
  addon: core_rpc_shutdown
  input: test-pc
```

<div class='note'>

The `user` specified in the credentials should be an applicable user listed in `C:/Users`. This may differ from the username used to login to Windows. Depending on your settings and privileges within Windows, changes to the firewall, UAC (User Account Control) and registry settings may be required to allow this add-on to remotely shut down your computer. There are many guides available online on how to adjust these settings.

</div>
