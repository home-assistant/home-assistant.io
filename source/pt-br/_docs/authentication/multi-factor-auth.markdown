---
title: "Autenticação de Múltiplos Fatores"
description: "Como configurar a autenticação de múltiplos fatores no Home Assistant."
---

A autenticação de múltiplos fatores (MFA) é uma camada extra de segurança para sua conta Home Assistant. Ela exige que você forneça um segundo fator de autenticação, como um código do seu telefone, além de sua senha.

## Configurando a MFA

Você pode configurar a MFA na seção de perfil do usuário do Home Assistant. Você precisará de um aplicativo autenticador em seu telefone, como o Google Authenticator ou o Authy.

Ao configurar a MFA, você receberá um código QR que precisará escanear com seu aplicativo autenticador. Isso irá configurar seu aplicativo para gerar códigos de uso único para sua conta Home Assistant.

## Fazendo login com MFA

Depois de configurar a MFA, você será solicitado a inserir um código do seu aplicativo autenticador sempre que fizer login no Home Assistant.

Isso adiciona uma camada extra de segurança à sua conta, pois mesmo que alguém roube sua senha, não conseguirá fazer login sem acesso ao seu telefone.

## Códigos de recuperação

Ao configurar a MFA, você também receberá um conjunto de códigos de recuperação. Guarde esses códigos em um local seguro, pois eles podem ser usados para acessar sua conta se você perder o acesso ao seu telefone.

Cada código de recuperação só pode ser usado uma vez.

## Desativando a MFA

Você pode desativar a MFA a qualquer momento na seção de perfil do usuário do Home Assistant. Você precisará inserir sua senha e um código do seu aplicativo autenticador para desativar a MFA.

## Tipos de MFA suportados

O Home Assistant suporta os seguintes tipos de MFA:

- **Aplicativos autenticadores baseados em tempo (TOTP):** Este é o tipo mais comum de MFA. Ele usa um aplicativo em seu telefone para gerar códigos de uso único que são válidos por um curto período de tempo.
- **Chaves de segurança de hardware:** Você também pode usar uma chave de segurança de hardware, como uma YubiKey, como seu segundo fator de autenticação.
