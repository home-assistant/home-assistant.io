---
title: "Ajuda! Fui bloqueado no Home Assistant"
description: "Passos a seguir se você for bloqueado no Home Assistant."
---

Se você não conseguir fazer login no Home Assistant, não se preocupe. Existem algumas coisas que você pode tentar para voltar.

## Verifique sua senha

A primeira coisa a verificar é sua senha. Certifique-se de que a está digitando corretamente. Se você não tiver certeza de qual é sua senha, pode tentar redefini-la.

## Redefinir sua senha

Se você configurou a recuperação de senha, pode usá-la para redefinir sua senha. Para fazer isso, vá para a página de login do Home Assistant e clique no link "Esqueci minha senha".

Se você não configurou a recuperação de senha, precisará redefinir sua senha manualmente. Para fazer isso, você precisará ter acesso aos arquivos de configuração do Home Assistant.

1.  Pare o Home Assistant.
2.  Navegue até o diretório de configuração do Home Assistant.
3.  Exclua o arquivo `.storage/auth`.
4.  Inicie o Home Assistant.

Isso excluirá todos os seus usuários e senhas. Na próxima vez que você iniciar o Home Assistant, será solicitado que você crie um novo usuário proprietário.

## Verifique seu endereço IP

Se você estiver tentando acessar o Home Assistant de fora de sua rede local, certifique-se de que está usando o endereço IP correto. Se você não tiver certeza de qual é o seu endereço IP, pode encontrá-lo fazendo login no seu roteador.

## Verifique seu firewall

Se você tiver um firewall em execução em seu computador ou rede, certifique-se de que ele não está bloqueando o acesso ao Home Assistant. Você pode precisar adicionar uma regra ao seu firewall para permitir o acesso ao Home Assistant.

## Verifique os logs

Se você ainda estiver tendo problemas, pode verificar os logs do Home Assistant para obter mais informações. Os logs podem fornecer pistas sobre o que está errado.

Você pode encontrar os logs do Home Assistant no diretório de configuração do Home Assistant. O arquivo de log é chamado `home-assistant.log`.

## Peça ajuda

Se você tentou todas as opções acima e ainda está tendo problemas, pode pedir ajuda nos fóruns do Home Assistant. Há muitas pessoas amigáveis nos fóruns que estão dispostas a ajudar.

Ao pedir ajuda, certifique-se de incluir o máximo de informações possível sobre seu problema. Isso ajudará outras pessoas a entender seu problema e a fornecer uma solução.
