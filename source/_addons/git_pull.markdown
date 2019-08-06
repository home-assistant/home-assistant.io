---
title: "Git pull"
description: "Load and update configuration files for Home Assistant from a GIT repository."
---

Load and update configuration files for Home Assistant from a [Git](https://git-scm.com/) repository.

```json
{
  "git_branch": "master",
  "git_command": "pull",
  "git_remote": "origin",
  "git_prune": "false",
  "repository": "https://example.com/my_configs.git",
  "auto_restart": false,
  "restart_ignore": [
    "ui-lovelace.yaml",
    ".gitignore",
    "exampledirectory/"
  ],
  "repeat": {
    "active": false,
    "interval": 300
  },
  "deployment_user": "",
  "deployment_password": "",
  "deployment_key": [
"-----BEGIN RSA PRIVATE KEY-----",
"MIIEowIBAAKCAQEAv3hUrCvqGZKpXQ5ofxTOuH6pYSOZDsCqPqmaGBdUzBFgauQM",
"xDEcoODGHIsWd7t9meAFqUtKXndeiKjfP0MMKsttnDohL1kb9mRvHre4VUqMsT5F",
"...",
"i3RUtnIHxGi1NqknIY56Hwa3id2yk7cEzvQGAAko/t6PCbe20AfmSQczs7wDNtBD",
"HgXRyIqIXHYk2+5w+N2eunURIBqCI9uWYK/r81TMR6V84R+XhtvM",
"-----END RSA PRIVATE KEY-----"
  ],
  "deployment_key_protocol": "rsa"
}
```

- **git_branch** (*Required*): Branch name of the Git repo. If left empty, the currently checked out branch will be updated. Leave this as 'master' if you are unsure.
- **git_command** (*Required*): `pull`/`reset`: Command to run. Leave this as `pull` if you are unsure.
* **pull**: Incorporates changes from a remote repository into the current branch. Will preserve any local changes to tracked files.
* **reset**: Will execute `git reset --hard` and overwrite any local changes to tracked files and update from the remote repository. Use with caution.

<div class='note warning'>

Using the `reset` option will overwrite changes to tracked files. Tracked files are those visible in the git repository or those given by the output on this command: `git ls-tree -r master --name-only`.

</div>

- **git_remote** (*Required*): Name of the tracked repository. Leave this as `origin` if you are unsure.
- **git_prune** (*Required*): `true`/`false`: If set to true, the add-on will clean-up branches that are deleted on the remote repository, but still have cached entries on the local machine. Leave this as `false` if you are unsure.

- **repository** (*Required*): Git URL to your repository (make sure to use double quotes). You have to add `.git` to your repository URL (see example configuration).
- **auto_restart** (*Required*): `true`/`false`: Restart Home Assistant when the configuration has changed (and is valid).
- **restart_ignore** (*Optional*): When `auto_restart` is enabled, changes to these files will not make HA restart. Full directories to ignore can be specified.
- **repeat**: Poll the repository for updates periodically automatically.
* **active** (*Required*): `true`/`false`: Enable/disable automatic polling.
* **interval** (*Required*): The interval in seconds to poll the repo for if automatic polling is enabled.
- **deployment_user** (*Optional*): Username to use when authenticating to a repository with a username and password.
- **deployment_password** (*Optional*): Password to use when authenticating to a repository.  Ignored if `deployment_user` is not set.
- **deployment_key** (*Optional*): A private SSH key that will be used for communication during Git operations. This key is mandatory for ssh-accessed repositories, which are the ones with the following pattern: `<user>@<host>:<repository path>`. This key has to be created without a passphrase.
- **deployment_key_protocol** (*Optional*): The key protocol. Default is `rsa`. Valid protocols are:

  * **dsa**
  * **ecdsa**
  * **ed25519**
  * **rsa**

The protocol is typically known by the suffix of the private key --e.g., a key file named `id_rsa` will be a private key using `rsa` protocol.

<div class='note warning'>

You should only use this add-on if you do not have an existing configuration or if your existing configuration is already in a Git repository. If the script does not find the necessary Git files in your configuration folder, it will delete anything that might be there. Please ensure that there is a `.git` folder before using this. You can verify this by listing the items in the configuration folder including hidden files. The command is `ls -a /config`.

</div>
