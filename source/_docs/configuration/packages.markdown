---
title: "Packages"
description: "Describes all there is to know about configuration packages in Home Assistant."
---

Packages in Home Assistant provide a way to bundle different component's configuration together. We already learned about the two configuration styles (specifying platforms entries together or individually) on the [adding devices](/docs/configuration/devices/) page. Both of these configuration methods require you to create the integration key in the main `configuration.yaml` file. With packages we have a way to include different components, or different configuration parts using any of the `!include` directives introduced in [splitting the configuration](/docs/configuration/splitting_configuration).

Packages are configured under the core `homeassistant/packages` in the configuration and take the format of a package name (no spaces, all lower case) followed by a dictionary with the package configuration. For example, package `pack_1` would be created as:

```yaml
homeassistant:
  ...
  packages: 
    pack_1:
      ...package configuration here...
```

The package configuration can include: `switch`, `light`, `automation`, `groups`, or most other Home Assistant integrations including hardware platforms.

It can be specified inline or in a separate YAML file using `!include`.

Inline example, main `configuration.yaml`:

```yaml
homeassistant:
  ...
  packages: 
    pack_1:
      switch:
        - platform: rest
          ...
      light:
        - platform: rpi
          ...
```

Include example, main `configuration.yaml`:

```yaml
homeassistant:
  ...
  packages: 
    pack_1: !include my_package.yaml
```

The file `my_package.yaml` contains the "top-level" configuration:

```yaml
switch:
  - platform: rest
    ...
light:
  - platform: rpi
    ...
```

There are some rules for packages that will be merged:

1. Platform based integrations (`light`, `switch`, etc) can always be merged.
2. Components where entities are identified by a key that will represent the entity_id (`{key: config}`) need to have unique 'keys' between packages and the main configuration file.

    For example if we have the following in the main configuration. You are not allowed to re-use "my_input" again for `input_boolean` in a package:

    ```yaml
    input_boolean:
      my_input:
    ```

3. Any integration that is not a platform [1], or dictionaries with Entity ID keys [2] can only be merged if its keys, except those for lists, are solely defined once.

<div class='note tip'>
Components inside packages can only specify platform entries using configuration style 1, where all the platforms are grouped under the integration name.
</div>

## Create a packages folder

One way to organize packages is to create a folder named "packages" in your Home Assistant configuration directory. In the packages directory you can store any number of packages in a YAML file. This entry in your `configuration.yaml` will load all packages:

```yaml
homeassistant:
  packages: !include_dir_named packages
```

This uses the concept splitting the configuration and will include all files in a directory with the keys representing the filenames.
See the documentation about [splitting the configuration](/docs/configuration/splitting_configuration/) for more information about `!include_dir_named` and other include statements that might be helpful. The benefit of this approach is to pull all configurations required to integrate a system, into one file, rather than across several.

The following example allows to have subfolders in the `packages` folder, which could make managing multiple packages easier by grouping:

```yaml
homeassistant:
  packages: !include_dir_merge_named packages/
```

and in `packages/subsystem1/functionality1.yaml`:

```yaml
subsystem1_functionality1:
  input_boolean:
  ...
  binary_sensor:
  ...
  automation:
```

## Customizing entities with packages

It is possible to [customize entities](/docs/configuration/customizing-devices/) within packages. Just create your customization entries under:

```yaml
homeassistant:
  customize:
```
