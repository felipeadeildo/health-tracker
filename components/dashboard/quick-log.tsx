"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  RiScalesLine,
  RiRestaurantLine,
  RiRunLine,
  RiCheckLine,
} from "@remixicon/react"

export function QuickLog() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-semibold">Registro rápido</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weight">
          <TabsList className="w-full">
            <TabsTrigger value="weight" className="flex-1 gap-1.5">
              <RiScalesLine className="size-3.5" />
              Peso
            </TabsTrigger>
            <TabsTrigger value="meal" className="flex-1 gap-1.5">
              <RiRestaurantLine className="size-3.5" />
              Refeição
            </TabsTrigger>
            <TabsTrigger value="exercise" className="flex-1 gap-1.5">
              <RiRunLine className="size-3.5" />
              Exercício
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weight" className="mt-4">
            <div className="flex gap-2">
              <div className="flex flex-1 flex-col gap-1.5">
                <Label htmlFor="quick-weight" className="text-xs">Peso (kg)</Label>
                <Input id="quick-weight" type="number" placeholder="82.5" step="0.1" />
              </div>
              <div className="flex flex-col justify-end">
                <Button size="default" className="gap-1.5">
                  <RiCheckLine className="size-4" />
                  Salvar
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="meal" className="mt-4">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="quick-meal" className="text-xs">O que comeu?</Label>
                  <Input id="quick-meal" placeholder="Frango com arroz..." />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="quick-cal" className="text-xs">Calorias (kcal)</Label>
                  <Input id="quick-cal" type="number" placeholder="450" />
                </div>
              </div>
              <Button className="w-full gap-1.5">
                <RiCheckLine className="size-4" />
                Salvar refeição
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="exercise" className="mt-4">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="quick-exercise" className="text-xs">Exercício</Label>
                  <Input id="quick-exercise" placeholder="Corrida..." />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="quick-duration" className="text-xs">Duração (min)</Label>
                  <Input id="quick-duration" type="number" placeholder="45" />
                </div>
              </div>
              <Button className="w-full gap-1.5">
                <RiCheckLine className="size-4" />
                Salvar exercício
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
