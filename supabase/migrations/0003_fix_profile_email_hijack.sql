-- Corrige falha: a policy de UPDATE em profiles permitia que qualquer
-- usuário logado alterasse o próprio `email` (na tabela public.profiles,
-- não o e-mail de login de verdade) para o e-mail de outra pessoa.
--
-- Isso importa porque o webhook da Hubla decide de qual profile liberar
-- acesso buscando por `profiles.email`. Um usuário mal-intencionado
-- poderia trocar seu profiles.email para o e-mail de um cliente-alvo e,
-- na próxima compra dessa pessoa, o acesso seria concedido à conta do
-- atacante em vez da conta correta.
--
-- Hoje o app não tem nenhuma tela que edite o perfil, então a policy de
-- update nunca deveria ter sido necessária — removendo por completo.

drop policy if exists "profiles: usuário atualiza o próprio perfil" on public.profiles;

-- Se no futuro quiser permitir editar o nome de exibição, crie uma policy
-- nova restrita à coluna full_name (nunca a id/email), por exemplo:
--
-- create policy "profiles: usuário atualiza o próprio nome"
--   on public.profiles for update
--   using (auth.uid() = id)
--   with check (auth.uid() = id);
--
-- revoke update on public.profiles from authenticated;
-- grant update (full_name) on public.profiles to authenticated;
