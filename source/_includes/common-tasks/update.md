#### Prerequisites

1. [Back up your installation](/common-tasks/general/backups/) and store the backup and the [backup emergency kit](/more-info/backup-emergency-kit/) somewhere safe.
   - This ensures that you can [restore your installation from backup](/common-tasks/general/backups/#restoring-a-backup) if needed.
2. Check the release notes for backward-incompatible changes on [Home Assistant release notes](/blog/categories/core/). Be sure to check all release notes between the version you are running and the one you are upgrading to. Use the search function in your browser (`CTRL + f` / `CMD + f`) and search for **Backward-incompatible changes**.

#### To update Home Assistant Core

To update Home Assistant Core, choose one of the following options.

{% if page.installation == "os" %}

  {% tabbed_block %}

  - title: Using the UI
    content: |

      1. Go to {% my config title="**Settings**" %}.
      2. At the top, select the **Home Assistant Core** update.
         - Troubleshooting: If you don't see the update:
           - In the top-right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Check for updates**.
           - Go to {% my updates title="**Settings** > **System** > **Updates**" %}, and select the update there.
      3. To create a backup before the update, turn on the backup option. Depending on your backup settings, it's called **Automatic backup before update** or **Create manual backup before update**.
      4. Select **Update**.
      5. After the update, check {% my repairs title="**Settings** > **System** > **Repairs**" %} and {% my logs title="**Settings** > **System** > **Logs**" %} for issues with your configuration that you need to address.

  - title: Using the CLI
    content: |

      ```bash
      ha core update --backup
      ```

      _The_ `--backup` _flag here ensures that you have a partial backup of your current setup in case you need to downgrade._

  {% endtabbed_block %}

{% elsif page.installation == "container" %}

  {% tabbed_block %}

  - title: Docker CLI
    content: |

      **First start with pulling the new container.**

      ```bash
      docker pull {{ site.installation.container }}:stable
      ```

      **[You then need to recreate the container with the new image.](/installation/linux#install-home-assistant-container)**

  - title: Docker Compose
    content: |

      ```bash
      docker compose pull homeassistant
      docker compose up -d
      ```

  {% endtabbed_block %}

After the update, check {% my repairs title="**Settings** > **System** > **Repairs**" %} and {% my logs title="**Settings** > **System** > **Logs**" %} for issues with your configuration that you need to address.

{% endif %}

