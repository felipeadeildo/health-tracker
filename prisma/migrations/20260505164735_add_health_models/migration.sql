-- CreateEnum
CREATE TYPE "MealType" AS ENUM ('BREAKFAST', 'LUNCH', 'SNACK', 'DINNER', 'OTHER');

-- CreateEnum
CREATE TYPE "ExerciseType" AS ENUM ('CARDIO', 'STRENGTH', 'FLEXIBILITY', 'SPORTS', 'OTHER');

-- CreateEnum
CREATE TYPE "Intensity" AS ENUM ('LOW', 'MODERATE', 'HIGH', 'MAX');

-- CreateEnum
CREATE TYPE "GoalType" AS ENUM ('TARGET_WEIGHT', 'DAILY_CALORIES', 'WEEKLY_WORKOUTS', 'MIN_WORKOUT_DURATION', 'DAILY_WATER', 'CALORIES_PER_WORKOUT');

-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('GREAT', 'GOOD', 'NEUTRAL', 'BAD', 'AWFUL');

-- CreateTable
CREATE TABLE "weight_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weight_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meal_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "mealType" "MealType" NOT NULL,
    "description" TEXT NOT NULL,
    "calories" INTEGER,
    "protein" DOUBLE PRECISION,
    "carbs" DOUBLE PRECISION,
    "fat" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "meal_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "name" TEXT NOT NULL,
    "exerciseType" "ExerciseType" NOT NULL,
    "durationMin" INTEGER NOT NULL,
    "caloriesBurned" INTEGER,
    "intensity" "Intensity",
    "heartRate" INTEGER,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercise_log_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "goal" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "GoalType" NOT NULL,
    "targetValue" DOUBLE PRECISION NOT NULL,
    "deadline" DATE,
    "notes" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_note" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "mood" "Mood",
    "notes" TEXT,
    "waterLiters" DOUBLE PRECISION,
    "sleepHours" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "weight_log_userId_date_idx" ON "weight_log"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "weight_log_userId_date_key" ON "weight_log"("userId", "date");

-- CreateIndex
CREATE INDEX "meal_log_userId_date_idx" ON "meal_log"("userId", "date");

-- CreateIndex
CREATE INDEX "exercise_log_userId_date_idx" ON "exercise_log"("userId", "date");

-- CreateIndex
CREATE INDEX "goal_userId_active_idx" ON "goal"("userId", "active");

-- CreateIndex
CREATE INDEX "daily_note_userId_date_idx" ON "daily_note"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "daily_note_userId_date_key" ON "daily_note"("userId", "date");

-- AddForeignKey
ALTER TABLE "weight_log" ADD CONSTRAINT "weight_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "meal_log" ADD CONSTRAINT "meal_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exercise_log" ADD CONSTRAINT "exercise_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "goal" ADD CONSTRAINT "goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_note" ADD CONSTRAINT "daily_note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
