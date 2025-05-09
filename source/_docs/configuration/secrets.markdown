---
title: "Storing secrets"
description: "Storing secrets outside of your configuration.yaml."
related:
  - docs: /docs/configuration/
    title: configuration.yaml file
  - docs: /docs/configuration/splitting_configuration/
    title: Splitting the configuration
  - docs: /docs/configuration/securing/
    title: Securing your instance
---

The {% term "`configuration.yaml`" %} file is a plain-text file, thus it is readable by anyone who has access to the file. The file contains passwords and API tokens which need to be redacted if you want to share your configuration.

By using `!secret` you can remove any private information from your configuration files. This separation can also help you to keep easier track of your passwords and API keys, as they are all stored at one place and no longer spread across the {% term "`configuration.yaml`" %} file or even multiple {% term YAML %} files if you [split up your configuration](/docs/configuration/splitting_configuration/).

## Using `secrets.yaml`

The workflow for moving private information to `secrets.yaml` is very similar to the [splitting of the configuration](/docs/configuration/splitting_configuration/). Create a `secrets.yaml` file in your Home Assistant [configuration directory](/docs/configuration/).

The entries for password and API keys in the {% term "`configuration.yaml`" %} file usually looks like the example below.

```yaml
rest:
  - authentication: basic
    username: "admin"
    password: "YOUR_PASSWORD"
    ...
```

Those entries need to be replaced with `!secret` and an identifier.

```yaml
rest:
  - authentication: basic
    username: "admin"
    password: !secret rest_password
    ...
```

The `secrets.yaml` file contains the corresponding password assigned to the identifier.

```yaml
rest_password: "YOUR_PASSWORD"
```

## Debugging secrets

When you start splitting your configuration into multiple files, you might end up with configuration in sub folders. Secrets will be resolved in this order:

- A `secrets.yaml` located in the same folder as the {% term YAML %} file referencing the secret,
- next, parent folders will be searched for a `secrets.yaml` file with the secret, stopping at the folder with the main {% term "`configuration.yaml`" %}.

To see where secrets are being loaded from, you can either add an option to your `secrets.yaml` file or use the `check_config` script. The latter is only available for {% term "Home Assistant Core" %} installations given it's available through [`hass`](/docs/tools/hass/).

*Option 1*: Print where secrets are retrieved from to the Home Assistant log by adding the following to `secrets.yaml`:

```yaml
logger: debug
```

This will not print the actual secret's value to the log.

*Option 2*: For Home Assistant Core installations, you can also view where secrets are retrieved from and the contents of all `secrets.yaml` files using the [`check_config` script](/docs/tools/check_config/) from the command line:

```bash
hass --script check_config --secrets
```

This will print all your secrets.
