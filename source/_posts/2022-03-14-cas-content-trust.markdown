---
layout: post
title: "Content Trust with Home Assistant & Codenotary CAS"
description: "Ability to verify that the updates which we deliver are the same as the update that you have fetched."
date: 2022-03-14 00:00:00
date_formatted: "March 14, 2022"
author: Pascal Vizeli
author_twitter: pvizeli
comments: true
categories:
- Announcements
---

We started to update how Home Assistant does content trust using [Codenotary CAS](https://cas.codenotary.com/).

With content trust, we can ensure that your system only runs containers/software as released by the original author. The author, in this case, can be the Home Assistant project, but also, for example, an add-on developer. This is an important security aspect, as it protects your instance from running possibly malicious software. Content trust verifies that the software you download, install or upgrade is exactly the same as it was released by its creator and ensures nobody messed with it along the way.

Codenotary CAS is built around a decentralized, cryptographically coherent and verifiable database technology called [immudb](https://github.com/codenotary/immudb). It is used to store all these trusted content signatures.

With immudb we will be able to host parts of the trusted content signatures data ourselves (we don't do this yet). It could even be made available as a Home Assistant add-on that users can install locally. Important to know is that CAS does not upload any user data for verification, it’s all done locally, just the way we like it.
When you install or update part of your system that is signed, it checks the CAS database to ensure that the image has not been revoked (similar to SSL with the CRL) and verifies that the download content, which we deliver over multiple public endpoints, is the same as the update that your system just has downloaded.

While rolling out the new system we ran into some issues which caused users unable to install updates for ~12 hours on March 11; for which we want to apologize. Thanks to the help from Codenotary engineers we were able to get it fixed in a quick and orderly fashion.

Pascal
