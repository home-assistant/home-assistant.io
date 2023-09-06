---
title: "Ignored content trust"
description: "More information on why disabling content-trust marks the installation as unsupported."
---

## The issue

You have disabled the content-trust check. That means Home Assistant can't verify anymore if the content is trusted and was not modified by attackers.
We strongly recommend to have this check enabled.

For content-trust, we use the open source solution [CodeNotary](https://codenotary.io).

## The solution

To resolve this status, you need to re-enable the content-trust protection mechanism by using the CLI:

```bash
ha supervisor options --content-trust
```

When you have enabled the content-trust, restart the Supervisor.

```bash
ha supervisor restart
```
