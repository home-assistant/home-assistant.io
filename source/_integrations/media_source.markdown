---
title: Media Source
description: Instructions on how to access your media with Home Assistant.
ha_category:
  - Media Source
ha_release: 0.115
ha_domain: media_source
ha_codeowners:
  - '@hunterjm'
---

The Media Source integration platform allows integrations to expose media for
use inside Home Assistant through the Media Browser panel or through supported
media players like Google Cast. This integration is configured automatically
through `default_config` or if another integration implements a media source.

If your configuration does not contain any of the above, you can add the below
to your configuration file:

```yaml
# Example configuration.yaml entry
media_source:
```

## Local Media

By default, a local media source is configured which Home Assistant looks for
media to show in the media browser.

For Home Assistant OS, Supervised and Container users, this folder is by default
configured on path `/media`.

Home Assistant OS and Supervised users can access this folder using,
for example, the Samba add-on. Users of Home Assistant Container can
mount a volume of their choice to `/media`.

If you are a Home Assistant Core user, the default directory called is called
`media` under the configuration path (where you `configuration.yaml` is).

Files served from `media` are protected by the Home Assistant authentication
unlike those served from `www`.

## Using custom or additional media folders

It is also possible to set up custom and additional media directories. To do
so, you'll need to adjust the [core configuration][basic-configuration].

This example adds two media folders to Home Assistant:

```yaml
# Example configuration.yaml
homeassistant:
  media_dirs:
    local: /media
    recording: /mnt/recordings
```

[basic-configuration]: /docs/configuration/basic/#media_dirs
