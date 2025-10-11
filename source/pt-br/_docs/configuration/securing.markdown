---
title: "Protegendo sua Instância"
description: "Como proteger sua instância do Home Assistant."
---

É importante proteger sua instância do Home Assistant para evitar o acesso não autorizado. Existem várias coisas que você pode fazer para proteger sua instância.

## Use senhas fortes

A coisa mais importante que você pode fazer é usar senhas fortes para suas contas de usuário. Uma senha forte deve ter pelo menos 12 caracteres e incluir uma mistura de letras maiúsculas e minúsculas, números e símbolos.

## Ative a autenticação de múltiplos fatores

A autenticação de múltiplos fatores (MFA) adiciona uma camada extra de segurança à sua conta. Ela exige que você forneça um segundo fator de autenticação, como um código do seu telefone, além de sua senha.

Você pode ativar a MFA na seção de perfil do usuário do Home Assistant.

## Limite o acesso à sua instância

Se você não precisar acessar sua instância do Home-Assistant de fora de sua rede local, poderá limitar o acesso à sua rede local. Isso pode ser feito configurando seu firewall para bloquear o acesso à sua instância de fora de sua rede.

Se você precisar acessar sua instância de fora de sua rede local, considere usar uma VPN para se conectar à sua rede. Uma VPN criará uma conexão segura entre seu dispositivo e sua rede, e criptografará todo o tráfego entre eles.

## Mantenha seu sistema atualizado

É importante manter seu sistema Home Assistant atualizado com os patches de segurança mais recentes. O Home Assistant lança atualizações regularmente que incluem correções de segurança.

Você pode verificar se há atualizações na seção de configuração do Home Assistant.

## Use HTTPS

Se você estiver acessando sua instância do Home Assistant de fora de sua rede local, deverá usar HTTPS para criptografar o tráfego entre seu dispositivo e sua instância.

Você pode configurar o HTTPS usando um complemento como o Let's Encrypt.

## Faça backup de sua configuração

É uma boa ideia fazer backup regularmente de sua configuração do Home Assistant. Isso permitirá que você restaure sua configuração se algo der errado.

Você pode fazer backup de sua configuração usando o serviço `homeassistant.backup`.

## Mais informações

A documentação do Home Assistant tem informações mais detalhadas sobre como proteger sua instância, incluindo uma lista de verificação de segurança que você pode usar para garantir que sua instância esteja o mais segura possível.
