---
title: "Ignored content trust"
description: "More information on why disabling content-trust marks the installation as unsupported."
---

## The issue

You have disable the content trust check. That means we can't veryify anymore if the content is trusted and was not modify by attackers.
We strongly recomment to have this enabled.

For Content-Trust, we use the OpenSource solution [CodeNotary](https://codenotary.io).

## The solution

To solve this you need to re-enable the protection mechanism by content-trust by using the CLI:

```bash
ha supervisor options --content-trust
```

When you have the content-trust, restart the Supervisor.

```bash
ha supervisor restart
```
