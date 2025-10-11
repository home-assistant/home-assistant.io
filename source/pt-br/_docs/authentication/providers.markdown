---
title: "Provedores de Autenticação"
description: "Como configurar diferentes provedores de autenticação no Home Assistant."
---

Os provedores de autenticação no Home Assistant permitem que você use diferentes métodos para autenticar usuários. Por exemplo, você pode usar um provedor de autenticação para permitir que os usuários façam login com suas contas do Google ou do Facebook.

## Provedor de Autenticação Padrão

O provedor de autenticação padrão no Home Assistant é o provedor de senha legado. Este provedor armazena senhas de usuários em um hash no diretório de configuração do Home Assistant.

## Provedores de Autenticação Alternativos

Existem vários provedores de autenticação alternativos que você pode usar com o Home Assistant. Esses provedores permitem que você use diferentes métodos para autenticar usuários, como:

- **Tokens de acesso de longa duração:** Este provedor permite que você crie tokens de acesso de longa duração que podem ser usados para autenticar com o Home Assistant. Isso é útil para scripts e integrações que precisam se autenticar com o Home Assistant.
- **Home Assistant Command Line:** Este provedor permite que você se autentique com o Home Assistant usando a linha de comando.
- **Trusted Networks:** Este provedor permite que você se autentique com o Home Assistant sem uma senha se você estiver se conectando de uma rede confiável.

## Configurando Provedores de Autenticação

Você pode configurar provedores de autenticação na seção `homeassistant` do seu arquivo `configuration.yaml`.

Para cada provedor de autenticação, você precisará especificar o tipo de provedor e quaisquer opções de configuração necessárias.

## Múltiplos Provedores de Autenticação

Você pode configurar vários provedores de autenticação ao mesmo tempo. Quando um usuário tenta fazer login, o Home Assistant tentará autenticá-lo com cada provedor em ordem.

O primeiro provedor que autenticar com sucesso o usuário será usado.

## Exemplo de Configuração

Aqui está um exemplo de configuração que configura o provedor de autenticação de senha legado e o provedor de autenticação de redes confiáveis:

```yaml
homeassistant:
  auth_providers:
    - type: homeassistant
    - type: trusted_networks
      trusted_networks:
        - 192.168.1.0/24
```

Esta configuração permitirá que os usuários façam login com uma senha ou de qualquer dispositivo na rede `192.168.1.0/24` sem uma senha.
