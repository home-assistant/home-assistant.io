---
title: "Script Editor"
description: "Instructions on how to use the new script editor."
---

In Home Assistant 0.52 we introduced the first version of our script editor. If you just created a new configuration with Home Assistant then you're all set! Go to the UI and enjoy.

<div class='videoWrapper'>
<iframe src="https://www.youtube.com/embed/_Rntpcj1CGA" frameborder="0" allowfullscreen></iframe>
</div>

## Updating your configuration to use the editor

The script editor reads and writes to the file `scripts.yaml` in your [configuration](/docs/configuration/) folder. Make sure that you have set up the script integration to read from it:

```yaml
# Configuration.yaml example
script: !include scripts.yaml
```

The content that was under `script:` should now be moved to `scripts.yaml` to be editable.
