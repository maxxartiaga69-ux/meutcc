CREATE TYPE "status_biblioteca" AS ENUM('zerado', 'jogando', 'desejado');--> statement-breakpoint
CREATE TABLE "avaliacoes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"usuario_id" uuid NOT NULL,
	"jogo_id" uuid NOT NULL,
	"nota" integer NOT NULL,
	"comentario" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "avaliacoes_nota_check" CHECK ("nota" >= 1 AND "nota" <= 5)
);
--> statement-breakpoint
CREATE TABLE "biblioteca" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"usuario_id" uuid NOT NULL,
	"jogo_id" uuid NOT NULL,
	"status" "status_biblioteca" DEFAULT 'desejado'::"status_biblioteca" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "favoritos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"usuario_id" uuid NOT NULL,
	"jogo_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "generos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "gostei" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"usuario_id" uuid NOT NULL,
	"jogo_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "jogos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"image" varchar NOT NULL,
	"descricao" text,
	"ano_lancamento" integer
);
--> statement-breakpoint
CREATE TABLE "jogos_generos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"jogo_id" uuid NOT NULL,
	"genero_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "platinados" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"usuario_id" uuid NOT NULL,
	"jogo_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "usuarios" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" varchar NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar NOT NULL,
	"senha" varchar NOT NULL,
	"avatar" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "avaliacoes_usuario_jogo_unique" ON "avaliacoes" ("usuario_id","jogo_id");--> statement-breakpoint
CREATE INDEX "avaliacoes_jogo_idx" ON "avaliacoes" ("jogo_id");--> statement-breakpoint
CREATE UNIQUE INDEX "biblioteca_usuario_jogo_unique" ON "biblioteca" ("usuario_id","jogo_id");--> statement-breakpoint
CREATE UNIQUE INDEX "favoritos_usuario_jogo_unique" ON "favoritos" ("usuario_id","jogo_id");--> statement-breakpoint
CREATE UNIQUE INDEX "generos_name_unique" ON "generos" ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "gostei_usuario_jogo_unique" ON "gostei" ("usuario_id","jogo_id");--> statement-breakpoint
CREATE UNIQUE INDEX "jogos_generos_unique" ON "jogos_generos" ("jogo_id","genero_id");--> statement-breakpoint
CREATE UNIQUE INDEX "platinados_usuario_jogo_unique" ON "platinados" ("usuario_id","jogo_id");--> statement-breakpoint
CREATE UNIQUE INDEX "usuarios_email_unique" ON "usuarios" ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "usuarios_username_unique" ON "usuarios" ("username");--> statement-breakpoint
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_usuario_id_usuarios_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_jogo_id_jogos_id_fkey" FOREIGN KEY ("jogo_id") REFERENCES "jogos"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "biblioteca" ADD CONSTRAINT "biblioteca_usuario_id_usuarios_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "biblioteca" ADD CONSTRAINT "biblioteca_jogo_id_jogos_id_fkey" FOREIGN KEY ("jogo_id") REFERENCES "jogos"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_usuario_id_usuarios_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "favoritos" ADD CONSTRAINT "favoritos_jogo_id_jogos_id_fkey" FOREIGN KEY ("jogo_id") REFERENCES "jogos"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "gostei" ADD CONSTRAINT "gostei_usuario_id_usuarios_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "gostei" ADD CONSTRAINT "gostei_jogo_id_jogos_id_fkey" FOREIGN KEY ("jogo_id") REFERENCES "jogos"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "jogos_generos" ADD CONSTRAINT "jogos_generos_jogo_id_jogos_id_fkey" FOREIGN KEY ("jogo_id") REFERENCES "jogos"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "jogos_generos" ADD CONSTRAINT "jogos_generos_genero_id_generos_id_fkey" FOREIGN KEY ("genero_id") REFERENCES "generos"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "platinados" ADD CONSTRAINT "platinados_usuario_id_usuarios_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "platinados" ADD CONSTRAINT "platinados_jogo_id_jogos_id_fkey" FOREIGN KEY ("jogo_id") REFERENCES "jogos"("id") ON DELETE CASCADE;