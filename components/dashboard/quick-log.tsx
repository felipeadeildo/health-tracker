"use client"

import { useState, useTransition } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  RiScalesLine,
  RiRestaurantLine,
  RiRunLine,
  RiCheckLine,
  RiLoader4Line,
  RiAddLine,
  RiPencilLine,
} from "@remixicon/react"
import { logWeight } from "@/lib/actions/weight"
import { logMeal } from "@/lib/actions/meals"
import { logExercise } from "@/lib/actions/exercises"
import type {
  MealType,
  ExerciseType,
  Intensity,
} from "@/generated/prisma/enums"

// ── Weight Tab ────────────────────────────────────────────────────────

function WeightTab() {
  const [pending, startTransition] = useTransition()
  const [value, setValue] = useState("")
  const [done, setDone] = useState(false)

  function submit() {
    const kg = parseFloat(value.replace(",", "."))
    if (!kg || kg < 20 || kg > 400) return
    startTransition(async () => {
      await logWeight(kg)
      setValue("")
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <Label
            htmlFor="quick-weight"
            className="text-xs text-muted-foreground"
          >
            Peso (kg)
          </Label>
          <Input
            id="quick-weight"
            type="number"
            placeholder="82.5"
            step="0.1"
            min={20}
            max={400}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="text-base"
          />
        </div>
        <div className="flex flex-col justify-end">
          <Button
            onClick={submit}
            disabled={pending || !value}
            className="gap-1.5"
          >
            {pending ? (
              <RiLoader4Line className="size-4 animate-spin" />
            ) : done ? (
              <>
                <RiCheckLine className="size-4" />
                Salvo!
              </>
            ) : (
              <>
                <RiAddLine className="size-4" />
                Salvar
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

// ── Meal Tab ──────────────────────────────────────────────────────────

const MEAL_TYPE_LABELS = [
  { value: "BREAKFAST", label: "Café da manhã" },
  { value: "LUNCH", label: "Almoço" },
  { value: "SNACK", label: "Lanche" },
  { value: "DINNER", label: "Jantar" },
  { value: "OTHER", label: "Outro" },
]

function MealTab() {
  const [pending, startTransition] = useTransition()
  const [description, setDescription] = useState("")
  const [calories, setCalories] = useState("")
  const [mealType, setMealType] = useState<MealType>("LUNCH")
  const [done, setDone] = useState(false)

  function submit() {
    if (!description.trim()) return
    startTransition(async () => {
      await logMeal({
        description: description.trim(),
        calories: calories ? parseInt(calories) : undefined,
        mealType: mealType as MealType,
      })
      setDescription("")
      setCalories("")
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="quick-meal-desc"
          className="text-xs text-muted-foreground"
        >
          O que você comeu?
        </Label>
        <Input
          id="quick-meal-desc"
          placeholder="Frango grelhado com arroz e brócolis..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          className="text-base"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="quick-meal-type"
            className="text-xs text-muted-foreground"
          >
            Tipo
          </Label>
          <Select
            value={mealType}
            onValueChange={(v) => setMealType(v as MealType)}
          >
            <SelectTrigger id="quick-meal-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MEAL_TYPE_LABELS.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="quick-cal" className="text-xs text-muted-foreground">
            Calorias (kcal)
          </Label>
          <Input
            id="quick-cal"
            type="number"
            placeholder="450"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
      </div>
      <Button
        onClick={submit}
        disabled={pending || !description.trim()}
        className="w-full gap-1.5"
      >
        {pending ? (
          <RiLoader4Line className="size-4 animate-spin" />
        ) : done ? (
          <>
            <RiCheckLine className="size-4" />
            Refeição salva!
          </>
        ) : (
          <>
            <RiAddLine className="size-4" />
            Registrar refeição
          </>
        )}
      </Button>
    </div>
  )
}

// ── Exercise Tab ──────────────────────────────────────────────────────

const EXERCISE_TYPE_LABELS = [
  { value: "CARDIO", label: "Cardio" },
  { value: "STRENGTH", label: "Musculação" },
  { value: "FLEXIBILITY", label: "Flexibilidade" },
  { value: "SPORTS", label: "Esporte" },
  { value: "OTHER", label: "Outro" },
]

const INTENSITY_LABELS = [
  { value: "LOW", label: "Leve" },
  { value: "MODERATE", label: "Moderada" },
  { value: "HIGH", label: "Intensa" },
  { value: "MAX", label: "Máxima" },
]

function ExerciseTab() {
  const [pending, startTransition] = useTransition()
  const [name, setName] = useState("")
  const [exerciseType, setExerciseType] = useState<ExerciseType>("CARDIO")
  const [duration, setDuration] = useState("")
  const [calories, setCalories] = useState("")
  const [intensity, setIntensity] = useState<Intensity>("MODERATE")
  const [done, setDone] = useState(false)

  function submit() {
    const mins = parseInt(duration)
    if (!name.trim() || !mins || mins < 1) return
    startTransition(async () => {
      await logExercise({
        name: name.trim(),
        exerciseType: exerciseType as ExerciseType,
        durationMin: mins,
        caloriesBurned: calories ? parseInt(calories) : undefined,
        intensity: intensity as Intensity,
      })
      setName("")
      setDuration("")
      setCalories("")
      setDone(true)
      setTimeout(() => setDone(false), 2000)
    })
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label
          htmlFor="quick-exercise-name"
          className="text-xs text-muted-foreground"
        >
          Exercício
        </Label>
        <Input
          id="quick-exercise-name"
          placeholder="Corrida, Supino, Bicicleta..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="text-base"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="quick-exercise-type"
            className="text-xs text-muted-foreground"
          >
            Tipo
          </Label>
          <Select
            value={exerciseType}
            onValueChange={(v) => setExerciseType(v as ExerciseType)}
          >
            <SelectTrigger id="quick-exercise-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {EXERCISE_TYPE_LABELS.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="quick-intensity"
            className="text-xs text-muted-foreground"
          >
            Intensidade
          </Label>
          <Select
            value={intensity}
            onValueChange={(v) => setIntensity(v as Intensity)}
          >
            <SelectTrigger id="quick-intensity">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {INTENSITY_LABELS.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="quick-duration"
            className="text-xs text-muted-foreground"
          >
            Duração (min)
          </Label>
          <Input
            id="quick-duration"
            type="number"
            placeholder="45"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label
            htmlFor="quick-burned"
            className="text-xs text-muted-foreground"
          >
            Calorias gastas
          </Label>
          <Input
            id="quick-burned"
            type="number"
            placeholder="320"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </div>
      </div>
      <Button
        onClick={submit}
        disabled={pending || !name.trim() || !duration}
        className="w-full gap-1.5"
      >
        {pending ? (
          <RiLoader4Line className="size-4 animate-spin" />
        ) : done ? (
          <>
            <RiCheckLine className="size-4" />
            Treino salvo!
          </>
        ) : (
          <>
            <RiAddLine className="size-4" />
            Registrar treino
          </>
        )}
      </Button>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────

export function QuickLog() {
  return (
    <Card>
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <RiPencilLine className="size-4 text-muted-foreground" />
          Registro rápido
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <Tabs defaultValue="weight">
          <TabsList className="w-full">
            <TabsTrigger value="weight" className="flex-1 gap-1.5">
              <RiScalesLine className="size-3.5" />
              <span>Peso</span>
            </TabsTrigger>
            <TabsTrigger value="meal" className="flex-1 gap-1.5">
              <RiRestaurantLine className="size-3.5" />
              <span>Refeição</span>
            </TabsTrigger>
            <TabsTrigger value="exercise" className="flex-1 gap-1.5">
              <RiRunLine className="size-3.5" />
              <span>Exercício</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weight" className="mt-4">
            <WeightTab />
          </TabsContent>

          <TabsContent value="meal" className="mt-4">
            <MealTab />
          </TabsContent>

          <TabsContent value="exercise" className="mt-4">
            <ExerciseTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
