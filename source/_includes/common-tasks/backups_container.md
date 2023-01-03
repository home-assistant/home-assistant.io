## Backups

Backup of your Home Assistant. They are stored in a compressed archive file (.tar). Backups are made from {% my supervisor_backups title="Settings > System > Backups" %}. There is also a service available that allows you to trigger the creation of a backup from an automation. Backups are stored in the `/backup` directory and includes files in the configuration directory.

{% include common-tasks/backups_create.md %}

### Restoring a Backup

You can make use of backup which you have copied off of a previous install. Ensure Home Assistant is not running.

Untar the backup file and `homeassistant.tar.gz` inside the backup file and copy the contents of `homeassistant/data` folder to the `/config` volume.

If you're looking to slim down your backup, check if your configuration directory contains a large database file (`home-assistant_v2.db`). See the [`recorder`](/integrations/recorder/) integration page for options to keep your database data down to a size that won't cause issues. Note the keep days, purge interval, and include/exclude options.

Start Home Assistant container.
