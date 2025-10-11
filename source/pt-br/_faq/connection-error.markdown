---
title: "Connection error"
description: "Connection error"
ha_category: Usage
---

It can happen that you get a traceback that notify you about connection issues while running Home Assistant. Eg.

```bash
ConnectionRefusedError: [Errno 111] Connection refused
```

The chance is very high that this is not a bug but an issue with the service/daemon itself. Check your network (DNS, DHCP, uplink, etc.) first and make sure that Home Assistant and the service are properly configured. Keep in mind that webservices can be down.
