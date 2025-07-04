"use client"

import type React from "react"

import { useState } from "react"
import { Calculator, Heart, Target, TrendingUp, User, Weight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"

interface HealthData {
  age: number
  weight: number
  gender: "male" | "female"
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very-active"
}

interface Recommendations {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
  water: number
  sodium: number
}

export default function HealthMonitor() {
  const [formData, setFormData] = useState<HealthData>({
    age: 0,
    weight: 0,
    gender: "male",
    activityLevel: "moderate",
  })
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null)
  const [showResults, setShowResults] = useState(false)

  const { t } = useLanguage()

  const calculateRecommendations = (): Recommendations => {
    // BMR calculation using Mifflin-St Jeor Equation
    let bmr: number
    if (formData.gender === "male") {
      bmr = 88.362 + 13.397 * formData.weight + 4.799 * 175 - 5.677 * formData.age
    } else {
      bmr = 447.593 + 9.247 * formData.weight + 3.098 * 162 - 4.33 * formData.age
    }

    // Activity multipliers
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      "very-active": 1.9,
    }

    const calories = Math.round(bmr * activityMultipliers[formData.activityLevel])

    return {
      calories,
      protein: Math.round(formData.weight * 0.8), // 0.8g per kg body weight
      carbs: Math.round((calories * 0.45) / 4), // 45% of calories from carbs
      fat: Math.round((calories * 0.3) / 9), // 30% of calories from fat
      fiber: formData.age < 50 ? (formData.gender === "male" ? 38 : 25) : formData.gender === "male" ? 30 : 21,
      water: Math.round(formData.weight * 35), // 35ml per kg body weight
      sodium: 2300, // mg per day (recommended limit)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.age > 0 && formData.weight > 0) {
      const recs = calculateRecommendations()
      setRecommendations(recs)
      setShowResults(true)
    }
  }

  const getSuggestions = () => {
    if (!recommendations) return []

    const suggestions = [
      "Drink water regularly throughout the day to stay hydrated",
      "Include lean proteins like chicken, fish, beans, and tofu in your meals",
      "Choose whole grains over refined carbohydrates for sustained energy",
      "Incorporate healthy fats from nuts, avocados, and olive oil",
      "Eat plenty of fruits and vegetables for fiber and micronutrients",
      "Limit processed foods and added sugars",
      "Consider meal prep to maintain consistent nutrition",
    ]

    return suggestions
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              {t("app.title")}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{t("app.subtitle")}</p>
          <div className="flex justify-center mt-4">
            <LanguageSelector />
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {!showResults ? (
            /* Input Form */
            <Card className="max-w-2xl mx-auto shadow-lg border-0 bg-white/80 backdrop-blur">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Calculator className="h-5 w-5" />
                  {t("form.title")}
                </CardTitle>
                <CardDescription>{t("form.subtitle")}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {t("form.age")}
                      </Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder={t("form.age.placeholder")}
                        value={formData.age || ""}
                        onChange={(e) => setFormData({ ...formData, age: Number.parseInt(e.target.value) || 0 })}
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight" className="flex items-center gap-2">
                        <Weight className="h-4 w-4" />
                        {t("form.weight")}
                      </Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder={t("form.weight.placeholder")}
                        value={formData.weight || ""}
                        onChange={(e) => setFormData({ ...formData, weight: Number.parseFloat(e.target.value) || 0 })}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">{t("form.gender")}</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value: "male" | "female") => setFormData({ ...formData, gender: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t("form.gender.male")}</SelectItem>
                        <SelectItem value="female">{t("form.gender.female")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="activity">{t("form.activity")}</Label>
                    <Select
                      value={formData.activityLevel}
                      onValueChange={(value: any) => setFormData({ ...formData, activityLevel: value })}
                    >
                      <SelectTrigger className="h-12">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">{t("form.activity.sedentary")}</SelectItem>
                        <SelectItem value="light">{t("form.activity.light")}</SelectItem>
                        <SelectItem value="moderate">{t("form.activity.moderate")}</SelectItem>
                        <SelectItem value="active">{t("form.activity.active")}</SelectItem>
                        <SelectItem value="very-active">{t("form.activity.very-active")}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700"
                  >
                    {t("form.calculate")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            /* Results Display */
            <div className="space-y-6">
              {/* Header with user info */}
              <Card className="bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-2">{t("results.title")}</h2>
                      <p className="opacity-90">
                        {t(`form.gender.${formData.gender}`)}, {formData.age} {t("results.profile")}, {formData.weight}
                        kg
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      onClick={() => setShowResults(false)}
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      {t("results.edit")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Main Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{recommendations?.calories}</div>
                    <div className="text-sm font-medium text-orange-700">{t("results.calories")}</div>
                    <div className="text-xs text-orange-600 mt-1">{t("results.calories.unit")}</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{recommendations?.protein}</div>
                    <div className="text-sm font-medium text-blue-700">{t("results.protein")}</div>
                    <div className="text-xs text-blue-600 mt-1">{t("results.protein.unit")}</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{recommendations?.carbs}</div>
                    <div className="text-sm font-medium text-green-700">{t("results.carbs")}</div>
                    <div className="text-xs text-green-600 mt-1">{t("results.carbs.unit")}</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{recommendations?.fat}</div>
                    <div className="text-sm font-medium text-purple-700">{t("results.fat")}</div>
                    <div className="text-xs text-purple-600 mt-1">{t("results.fat.unit")}</div>
                  </CardContent>
                </Card>
              </div>

              {/* Additional Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5 text-blue-600" />
                      {t("results.fiber")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600 mb-2">{recommendations?.fiber}g</div>
                    <Progress value={75} className="mb-2" />
                    <p className="text-sm text-muted-foreground">{t("results.fiber.desc")}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5 text-cyan-600" />
                      {t("results.water")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-cyan-600 mb-2">{recommendations?.water}ml</div>
                    <Progress value={60} className="mb-2" />
                    <p className="text-sm text-muted-foreground">{t("results.water.desc")}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Target className="h-5 w-5 text-red-600" />
                      {t("results.sodium")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600 mb-2">
                      {"<"}
                      {recommendations?.sodium}mg
                    </div>
                    <Progress value={40} className="mb-2" />
                    <p className="text-sm text-muted-foreground">{t("results.sodium.desc")}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    {t("suggestions.title")}
                  </CardTitle>
                  <CardDescription>{t("suggestions.subtitle")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {Array.from({ length: 7 }, (_, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <Badge variant="secondary" className="bg-green-100 text-green-700 shrink-0">
                          {index + 1}
                        </Badge>
                        <p className="text-sm text-green-800">{t(`suggestions.${index + 1}`)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
