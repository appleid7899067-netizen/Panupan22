-- App RBAC roles. Better Auth owns the base identity schema in migrations/auth/0001_auth.sql.
-- Keep this app-specific migration additive and server-owned.

alter table "user"
  add column if not exists "role" text not null default 'USER';

alter table "user"
  add constraint "user_role_check"
  check ("role" in ('OWNER', 'CEO', 'ADMIN', 'USER'));

create index if not exists "user_role_idx" on "user" ("role");
