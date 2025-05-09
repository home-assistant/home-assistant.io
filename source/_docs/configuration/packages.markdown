---
title: "Packages"
description: "Describes all there is to know about configuration packages in Home Assistant."
---

Packages in Home Assistant provide a way to bundle configurations from multiple integrations. With packages, we have a way to include multiple integrations, or parts of integrations using any of the `!include` directives introduced in [splitting the configuration](/docs/configuration/splitting_configuration).

Packages are configured under the core `homeassistant/packages` in the configuration and take the format of a package name (no spaces, all lower case) followed by a dictionary with the package configuration. For example, package `pack_1` would be created as:

```yaml
homeassistant:
  ...
  packages: 
    pack_1:
      ...package configuration here...
```

The package configuration can include: `switch`, `light`, `automation`, `groups`, or most other Home Assistant integrations including hardware platforms.

It can be specified inline or in a separate {% term YAML %} file using `!include`.

Inline example, main {% term "`configuration.yaml`" %}:

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

Include example, main {% term "`configuration.yaml`" %}:

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
2. Integrations where entities are identified by a key that will represent the entity_id (`{key: config}`) need to have unique 'keys' between packages and the main configuration file.

    For example if we have the following in the main configuration. You are not allowed to re-use "my_input" again for `input_boolean` in a package:

    ```yaml
    input_boolean:
      my_input:
    ```

3. Any integration that is not a platform [1], or dictionaries with Entity ID keys [2] can only be merged if its keys, except those for lists, are solely defined once.

{% tip %}
Integrations inside packages can only specify platform entries using configuration style 1, where all the platforms are grouped under the integration name.
{% endtip %}

## Create a packages folder

One way to organize packages is to create a folder named "packages" in your Home Assistant configuration directory. In the packages directory, you can store any number of packages in a {% term YAML %} file. This entry in your {% term "`configuration.yaml`" %} will load all {% term YAML %}-files in this _packages_ folder and its subfolders:

```yaml
homeassistant:
  packages: !include_dir_named packages
```

The benefit of this approach is to pull all configurations required to integrate a system into one file&mdash;rather than keeping them spread across several files.
You can use other `!include` methods for packages; for example `!include_dir_merge_named`. However, unlike `!include_dir_merge_named`, the `!include_dir_named` method uses the same indentation as the 'configuration.yaml'. This means that you can copy and paste elements from the config file. With `!include_dir_named`, the file name is used as the package name. File names must be unique.

With the `!include_dir_merge_named` method, the package name has to be included in the file. The configuration below then needs to be indented accordingly. This means you cannot directly copy and paste from the configuration file.


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


{% important %}
If you are moving configuration to packages, `auth_providers` must stay within ‘configuration.yaml’. See the general documentation for [Authentication Providers](/docs/authentication/providers/#configuring-auth-providers).

This is because Home Assistant processes the authentication provided early in the start-up process, even before packages are processed.
{% endimportant %}
