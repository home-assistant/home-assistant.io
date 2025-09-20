#### Prerequisites

1. [Back up your installation](/common-tasks/general/#backups) and store the backup and the [backup emergency kit](/more-info/backup-emergency-kit/) somewhere safe.
   - This ensures that you can [restore your installation from backup](/common-tasks/general/#restoring-a-backup) if needed.
2. Check the release notes for backward-incompatible changes on [Home Assistant release notes](/blog/categories/core/). Be sure to check all release notes between the version you are running and the one you are upgrading to. Use the search function in your browser (`CTRL + f` / `CMD + f`) and search for **Backward-incompatible changes**.

#### To update Home Assistant Core

To update Home Assistant Core, choose one of the following options.

{% if page.installation == "os" %}

  {% tabbed_block %}

  - title: Using the UI
    content: |

      1. Open your Home Assistant UI.
      2. Navigate to the **Settings** panel.
      3. On the top you will be presented with an update notification.
        - **Troubleshooting**: If you do not see that notification:
          - In the top right corner, select the three dots {% icon "mdi:dots-vertical" %} menu and select **Check for updates**.
          - Go to {% my updates title="**System** > **Updates**" %}.
            - Select the update notification.
            - Select the cogwheel {% icon "mdi:cog-outline" %}, then set **Visible** to active.
      4. Open the notification for the component you want to update.
      5. If you want to backup the system first (recommended), enable the backup toggle.
      6. Select **Update**.
      7. After the update completed, check if there are any repair issues and check the logs to see if there are any issues with your configuration that need to be addressed.

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

After the update, check if there are any repair issues and check the logs to see if there are any issues with your configuration that need to be addressed.

{% endif %}

