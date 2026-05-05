"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import {
  RiHeartPulseFill,
  RiUserLine,
  RiMailLine,
  RiLockPasswordLine,
  RiShieldCheckLine,
  RiLoader4Line,
  RiArrowRightLine,
} from "@remixicon/react"

const schema = z
  .object({
    name: z.string().min(2, "Nome deve ter ao menos 2 caracteres"),
    email: z.email("E-mail inválido"),
    password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  })

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
    })
    if (error) {
      setServerError(
        error.code === "USER_ALREADY_EXISTS"
          ? "Este e-mail já está em uso."
          : "Erro ao criar conta. Tente novamente."
      )
      return
    }
    router.push("/")
    router.refresh()
  }

  return (
    <div className="w-full max-w-sm space-y-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
          <RiHeartPulseFill className="size-7" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Health Tracker</h1>
          <p className="mt-1 text-sm text-muted-foreground">Comece sua jornada hoje</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Preencha seus dados para começar</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="flex flex-col gap-4">
            {serverError && (
              <div className="flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                <span className="size-1.5 shrink-0 rounded-full bg-destructive" />
                {serverError}
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Nome</Label>
              <div className="relative">
                <RiUserLine className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  className="pl-9"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <RiMailLine className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="voce@email.com"
                  className="pl-9"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <RiLockPasswordLine className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  className="pl-9"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <div className="relative">
                <RiShieldCheckLine className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="pl-9"
                  aria-invalid={!!errors.confirmPassword}
                  {...register("confirmPassword")}
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-3 border-t pt-6">
            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <RiLoader4Line className="animate-spin" />
                  Criando conta...
                </>
              ) : (
                <>
                  Criar conta
                  <RiArrowRightLine />
                </>
              )}
            </Button>
            <p className="text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Entrar
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
