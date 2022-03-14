---
layout: post
title: "Content Trust with Home Assistant & Codenotary CAS"
description: "Ability to verify that the updates which we deliver are the same as the update that you have fetched."
date: 2022-03-13 00:00:00
date_formatted: "March 14, 2022"
author: Pascal Vizeli
author_twitter: falstaff_ch
comments: true
categories:
- Announcements
---

We started to revamp our Content of Trust validation with [Codenotary CAS](https://cas.codenotary.com/) on the devices.

With content trust, we can ensure that your system only runs containers/software as released by the original author. The author, in this case, can be the Home Assistant project, but also, for example, an add-on developer. This is an important security aspect, as it protects your instance from running possible malicious software. Content trust verifies the software you download, install or upgrade is exactly the same as it was released by its creator and ensures nobody messed with it along the way.

Codenotary CAS is a young solution with great potential. It has an energy-efficient, decentralized, cryptographically coherent, and verifiable database technology called [immudb](https://github.com/codenotary/immudb). It is used to store all these trusted content signatures.

immudb is also future proof for us, as it allows us to host parts of this data ourselves (in the future), and it could even be made available as an add-on to be installed by anyone locally. Important to know is that CAS does not upload any user data for verification, it’s all done locally, just the way we like it.
When you install or update part of your system that is signed, it checks the CAS database to ensure that the image has not been revoked (similar to SSL with the CRL) and verifies that the download content, which we deliver over multiple public endpoints, is the same as the update that your system just has downloaded.

Unfortunately, while rolling out our renewed CAS feature, we ran into some issues which caused users unable to install updates for ~12 hours on March 11; for which we want to apologize. Thanks to the help from Codenotary engineers we were able to get it fixed in a quick and orderly fashion.

Pascal
