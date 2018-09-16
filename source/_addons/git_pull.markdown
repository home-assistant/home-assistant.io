---
layout: page
title: "Git pull"
description: "Load and update configuration files for Home Assistant from a GIT repository."
date: 2017-09-25 14:00
sidebar: true
comments: false
sharing: true
footer: true
---

Load and update configuration files for Home Assistant from a [Git](https://git-scm.com/) repository.

```json
{
  "repository": "https://example.com/my_configs.git",
  "auto_restart": false,
  "git_branch": "master",
  "git_command": "pull",
  "git_remote": "origin",
  "git_prune": "false",
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

- **repository** (*Required*): Git URL to your repository (make sure to use double quotes). You have to add `.git` to your GitHub repository URL (see example configuration)
- **git_branch** (*Required*): Branch name of the Git repo. If left empty, the currently checked out branch will be updated. Leave this as 'master' if you are unsure.
- **git_remote** (*Required*): Name of the tracked repository. Leave this as `origin` if you are unsure.
- **git_prune** (*Required*): If set to true, the add-on will cleanup branches that are deleted on the remote repository, but still have cached entries on the local machine. Leave this as `false` if you are unsure.
- **git_command** (*Required*): Must be either `pull` or `reset`. Leave this as `pull` if you are unsure.

  * **pull**: Incorporates changes from a remote repository into the current branch. Will preserve any local changes to tracked files.
  * **reset**: Will execute `git reset --hard` and overwrite any local changes to tracked files and update from the remote repository.

<p class='note warning'>
  Using the `reset` option will overwrite changes to tracked files. Tracked files are those visible in the Github repository or those given by the output on this command: `git ls-tree -r master --name-only`.
</p>
  
- **auto_restart** (*Optional*): Restart Home Assistant when the configuration has changed (and is valid).
- **repeat/active** (*Optional*): Pull periodic for Git updates.
- **repeat/interval** (*Optional*): Pull all x seconds and look for changes.
- **deployment_user** (*Optional*): Username to use when authenticating to a repository with a username and password.
- **deployment_password** (*Optional*): Password to use when authenticating to a repository.  Ignored if `deployment_user` is not set.
- **deployment_key** (*Optional*): A private SSH key that will be used for communication during Git operations. This key is mandatory for ssh-accessed repositories, which are the ones with the following pattern: `<user>@<host>:<repository path>`.
- **deployment_key_protocol** (*Optional*): The key protocol. Default is `rsa`. Valid protocols are:

  * **dsa**
  * **ecdsa**
  * **ed25519**
  * **rsa**
  
The protocol is typically known by the suffix of the private key --e.g., a key file named `id_rsa` will be a private key using `rsa` protocol.

<p class='note warning'>
You should only use this add-on if you do not have an existing configuration or if your existing configuration is already in a Git repository. If the script does not find the necessary Git files in your configuration folder, it will delete anything that might be there. Please ensure that there is a `.git` folder before using this. You can verify this by listing the items in the configuration folder including hidden files. The command is `ls -a /config`.
</p>
