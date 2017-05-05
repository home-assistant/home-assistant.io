---
layout: page
title: "Publishing your add-on"
description: "Steps on how-to create an add-on for Hass.io."
date: 2017-04-30 13:28
sidebar: true
comments: false
sharing: true
footer: true
---

At the end, all add-ons are simple docker container. You can use our [build scripts][builder] for automate the hole process our you can build your own docker image and push it manual do a docker hub. Inside your addon `config.json` can you use:
```json
{
  "image": "myhub/image-addon-name"
}
{
  "image": "myhub/image-{arch}-addon-name"
}
```

To specify from where it will load the addon by user installation. With `{arch}` inside image name, you can build your addon for multible architectures.

Best praxis is to merge change into a branch like `build`. After you push the addon to docker hub, you can merge this branch to master.

## {% linkable_title Custom Add-ons %}

You need a docker hub account. It is also possible to use our own docker registrator. Download our [build script][builder] local.

For a git repository:
```bash
# Test only:
./create_hassio_addon.sh -a amd64 -s addon-slug -r https://github.com/xy/addons -b branchname

# push do docker hub:
./create_hassio_addon.sh -a amd64 -s addon-slug -r https://github.com/xy/addons -b branchname -p

# create for all supported arch:
./create_addon_all.sh -s addon-slug -r https://github.com/xy/addons -b branchname -p
```

For a local repository:
```bash
# Test only:
./create_hassio_addon.sh -a amd64 -s addon-slug -l /home/xy/my_local_repo

# push do docker hub:
./create_hassio_addon.sh -a amd64 -s addon-slug -l /home/xy/my_local_repo -p
```

## {% linkable_title Core Add-ons %}


[builder]: https://github.com/home-assistant/hassio-build/tree/master/build-scripts/addons
