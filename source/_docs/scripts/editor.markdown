---
title: "Script Editor"
description: "Instructions on how to use the new script editor."
redirect_from: /docs/script/editor/
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

## Migrating your scripts to `scripts.yaml`

If you want to migrate your old scripts to use the editor, you'll have to copy them to `scripts.yaml`. Make sure that `scripts.yaml` is named entries! For each automation that you copy over, you'll have to add an key per script. This can be any string as long as it's unique.

For example, the below script will turn on a scene.

```yaml
# Example scripts.yaml entry
'my_unique_id':  # <-- Required for editor to work, for automations created with the editor the id will be automatically generated.
  alias: Turn on a scene 'arrive_home'
  sequence:
    - service: scene.turn_on
      data:
        entity_id: scene.arrive_home
```

<div class='note'>
Any comments in the YAML file will be lost and templates will be reformatted when you update an script via the editor.
</div>
