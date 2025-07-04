"use client"

import type React from "react"
import { createContext, useContext, useState, type ReactNode } from "react"

export type Language = "en" | "es" | "zh" | "fr" | "de" | "ko" | "ja"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

interface LanguageProviderProps {
  children: ReactNode
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Header
    "app.title": "Health Monitor Assistant",
    "app.subtitle": "Get personalized daily nutrition recommendations based on your age, weight, and lifestyle",

    // Form
    "form.title": "Personal Information",
    "form.subtitle": "Enter your details to receive personalized nutrition recommendations",
    "form.age": "Age (years)",
    "form.age.placeholder": "Enter your age",
    "form.weight": "Weight (kg)",
    "form.weight.placeholder": "Enter your weight",
    "form.gender": "Gender",
    "form.gender.male": "Male",
    "form.gender.female": "Female",
    "form.activity": "Activity Level",
    "form.activity.sedentary": "Sedentary (little/no exercise)",
    "form.activity.light": "Light (light exercise 1-3 days/week)",
    "form.activity.moderate": "Moderate (moderate exercise 3-5 days/week)",
    "form.activity.active": "Active (hard exercise 6-7 days/week)",
    "form.activity.very-active": "Very Active (very hard exercise, physical job)",
    "form.calculate": "Calculate Recommendations",
    "form.language": "Language",

    // Results
    "results.title": "Your Personalized Recommendations",
    "results.profile": "years old",
    "results.edit": "Edit Information",
    "results.calories": "Daily Calories",
    "results.calories.unit": "kcal/day",
    "results.protein": "Protein",
    "results.protein.unit": "grams/day",
    "results.carbs": "Carbohydrates",
    "results.carbs.unit": "grams/day",
    "results.fat": "Healthy Fats",
    "results.fat.unit": "grams/day",
    "results.fiber": "Fiber Intake",
    "results.fiber.desc": "Essential for digestive health and satiety",
    "results.water": "Water Intake",
    "results.water.desc": "Stay hydrated throughout the day",
    "results.sodium": "Sodium Limit",
    "results.sodium.desc": "Keep sodium intake below this limit",

    // Suggestions
    "suggestions.title": "Personalized Suggestions",
    "suggestions.subtitle": "Tips to help you achieve your daily nutrition goals",
    "suggestions.1": "Drink water regularly throughout the day to stay hydrated",
    "suggestions.2": "Include lean proteins like chicken, fish, beans, and tofu in your meals",
    "suggestions.3": "Choose whole grains over refined carbohydrates for sustained energy",
    "suggestions.4": "Incorporate healthy fats from nuts, avocados, and olive oil",
    "suggestions.5": "Eat plenty of fruits and vegetables for fiber and micronutrients",
    "suggestions.6": "Limit processed foods and added sugars",
    "suggestions.7": "Consider meal prep to maintain consistent nutrition",
  },
  es: {
    // Header
    "app.title": "Asistente Monitor de Salud",
    "app.subtitle":
      "Obtén recomendaciones nutricionales diarias personalizadas basadas en tu edad, peso y estilo de vida",

    // Form
    "form.title": "Información Personal",
    "form.subtitle": "Ingresa tus datos para recibir recomendaciones nutricionales personalizadas",
    "form.age": "Edad (años)",
    "form.age.placeholder": "Ingresa tu edad",
    "form.weight": "Peso (kg)",
    "form.weight.placeholder": "Ingresa tu peso",
    "form.gender": "Género",
    "form.gender.male": "Masculino",
    "form.gender.female": "Femenino",
    "form.activity": "Nivel de Actividad",
    "form.activity.sedentary": "Sedentario (poco/sin ejercicio)",
    "form.activity.light": "Ligero (ejercicio ligero 1-3 días/semana)",
    "form.activity.moderate": "Moderado (ejercicio moderado 3-5 días/semana)",
    "form.activity.active": "Activo (ejercicio intenso 6-7 días/semana)",
    "form.activity.very-active": "Muy Activo (ejercicio muy intenso, trabajo físico)",
    "form.calculate": "Calcular Recomendaciones",
    "form.language": "Idioma",

    // Results
    "results.title": "Tus Recomendaciones Personalizadas",
    "results.profile": "años",
    "results.edit": "Editar Información",
    "results.calories": "Calorías Diarias",
    "results.calories.unit": "kcal/día",
    "results.protein": "Proteína",
    "results.protein.unit": "gramos/día",
    "results.carbs": "Carbohidratos",
    "results.carbs.unit": "gramos/día",
    "results.fat": "Grasas Saludables",
    "results.fat.unit": "gramos/día",
    "results.fiber": "Ingesta de Fibra",
    "results.fiber.desc": "Esencial para la salud digestiva y saciedad",
    "results.water": "Ingesta de Agua",
    "results.water.desc": "Mantente hidratado durante el día",
    "results.sodium": "Límite de Sodio",
    "results.sodium.desc": "Mantén la ingesta de sodio por debajo de este límite",

    // Suggestions
    "suggestions.title": "Sugerencias Personalizadas",
    "suggestions.subtitle": "Consejos para ayudarte a alcanzar tus objetivos nutricionales diarios",
    "suggestions.1": "Bebe agua regularmente durante el día para mantenerte hidratado",
    "suggestions.2": "Incluye proteínas magras como pollo, pescado, frijoles y tofu en tus comidas",
    "suggestions.3": "Elige granos integrales sobre carbohidratos refinados para energía sostenida",
    "suggestions.4": "Incorpora grasas saludables de nueces, aguacates y aceite de oliva",
    "suggestions.5": "Come muchas frutas y verduras para fibra y micronutrientes",
    "suggestions.6": "Limita los alimentos procesados y azúcares añadidos",
    "suggestions.7": "Considera la preparación de comidas para mantener una nutrición consistente",
  },
  zh: {
    // Header
    "app.title": "健康监测助手",
    "app.subtitle": "根据您的年龄、体重和生活方式获得个性化的每日营养建议",

    // Form
    "form.title": "个人信息",
    "form.subtitle": "输入您的详细信息以获得个性化营养建议",
    "form.age": "年龄（岁）",
    "form.age.placeholder": "请输入您的年龄",
    "form.weight": "体重（公斤）",
    "form.weight.placeholder": "请输入您的体重",
    "form.gender": "性别",
    "form.gender.male": "男性",
    "form.gender.female": "女性",
    "form.activity": "活动水平",
    "form.activity.sedentary": "久坐（很少/不运动）",
    "form.activity.light": "轻度（轻度运动1-3天/周）",
    "form.activity.moderate": "中度（中度运动3-5天/周）",
    "form.activity.active": "活跃（高强度运动6-7天/周）",
    "form.activity.very-active": "非常活跃（高强度运动，体力工作）",
    "form.calculate": "计算建议",
    "form.language": "语言",

    // Results
    "results.title": "您的个性化建议",
    "results.profile": "岁",
    "results.edit": "编辑信息",
    "results.calories": "每日卡路里",
    "results.calories.unit": "千卡/天",
    "results.protein": "蛋白质",
    "results.protein.unit": "克/天",
    "results.carbs": "碳水化合物",
    "results.carbs.unit": "克/天",
    "results.fat": "健康脂肪",
    "results.fat.unit": "克/天",
    "results.fiber": "纤维摄入",
    "results.fiber.desc": "对消化健康和饱腹感至关重要",
    "results.water": "水分摄入",
    "results.water.desc": "全天保持水分充足",
    "results.sodium": "钠限制",
    "results.sodium.desc": "将钠摄入量保持在此限制以下",

    // Suggestions
    "suggestions.title": "个性化建议",
    "suggestions.subtitle": "帮助您实现每日营养目标的提示",
    "suggestions.1": "全天定期饮水以保持水分充足",
    "suggestions.2": "在餐食中包含瘦蛋白，如鸡肉、鱼类、豆类和豆腐",
    "suggestions.3": "选择全谷物而非精制碳水化合物以获得持续能量",
    "suggestions.4": "从坚果、牛油果和橄榄油中摄入健康脂肪",
    "suggestions.5": "多吃水果和蔬菜以获得纤维和微量营养素",
    "suggestions.6": "限制加工食品和添加糖",
    "suggestions.7": "考虑备餐以保持营养的一致性",
  },
  fr: {
    // Header
    "app.title": "Assistant Moniteur de Santé",
    "app.subtitle":
      "Obtenez des recommandations nutritionnelles quotidiennes personnalisées basées sur votre âge, poids et style de vie",

    // Form
    "form.title": "Informations Personnelles",
    "form.subtitle": "Entrez vos détails pour recevoir des recommandations nutritionnelles personnalisées",
    "form.age": "Âge (années)",
    "form.age.placeholder": "Entrez votre âge",
    "form.weight": "Poids (kg)",
    "form.weight.placeholder": "Entrez votre poids",
    "form.gender": "Genre",
    "form.gender.male": "Masculin",
    "form.gender.female": "Féminin",
    "form.activity": "Niveau d'Activité",
    "form.activity.sedentary": "Sédentaire (peu/pas d'exercice)",
    "form.activity.light": "Léger (exercice léger 1-3 jours/semaine)",
    "form.activity.moderate": "Modéré (exercice modéré 3-5 jours/semaine)",
    "form.activity.active": "Actif (exercice intense 6-7 jours/semaine)",
    "form.activity.very-active": "Très Actif (exercice très intense, travail physique)",
    "form.calculate": "Calculer les Recommandations",
    "form.language": "Langue",

    // Results
    "results.title": "Vos Recommandations Personnalisées",
    "results.profile": "ans",
    "results.edit": "Modifier les Informations",
    "results.calories": "Calories Quotidiennes",
    "results.calories.unit": "kcal/jour",
    "results.protein": "Protéines",
    "results.protein.unit": "grammes/jour",
    "results.carbs": "Glucides",
    "results.carbs.unit": "grammes/jour",
    "results.fat": "Graisses Saines",
    "results.fat.unit": "grammes/jour",
    "results.fiber": "Apport en Fibres",
    "results.fiber.desc": "Essentiel pour la santé digestive et la satiété",
    "results.water": "Apport en Eau",
    "results.water.desc": "Restez hydraté tout au long de la journée",
    "results.sodium": "Limite de Sodium",
    "results.sodium.desc": "Maintenez l'apport en sodium en dessous de cette limite",

    // Suggestions
    "suggestions.title": "Suggestions Personnalisées",
    "suggestions.subtitle": "Conseils pour vous aider à atteindre vos objectifs nutritionnels quotidiens",
    "suggestions.1": "Buvez de l'eau régulièrement tout au long de la journée pour rester hydraté",
    "suggestions.2":
      "Incluez des protéines maigres comme le poulet, le poisson, les haricots et le tofu dans vos repas",
    "suggestions.3": "Choisissez des grains entiers plutôt que des glucides raffinés pour une énergie soutenue",
    "suggestions.4": "Incorporez des graisses saines provenant de noix, d'avocats et d'huile d'olive",
    "suggestions.5": "Mangez beaucoup de fruits et légumes pour les fibres et micronutriments",
    "suggestions.6": "Limitez les aliments transformés et les sucres ajoutés",
    "suggestions.7": "Considérez la préparation de repas pour maintenir une nutrition cohérente",
  },
  de: {
    // Header
    "app.title": "Gesundheitsmonitor-Assistent",
    "app.subtitle":
      "Erhalten Sie personalisierte tägliche Ernährungsempfehlungen basierend auf Ihrem Alter, Gewicht und Lebensstil",

    // Form
    "form.title": "Persönliche Informationen",
    "form.subtitle": "Geben Sie Ihre Daten ein, um personalisierte Ernährungsempfehlungen zu erhalten",
    "form.age": "Alter (Jahre)",
    "form.age.placeholder": "Geben Sie Ihr Alter ein",
    "form.weight": "Gewicht (kg)",
    "form.weight.placeholder": "Geben Sie Ihr Gewicht ein",
    "form.gender": "Geschlecht",
    "form.gender.male": "Männlich",
    "form.gender.female": "Weiblich",
    "form.activity": "Aktivitätslevel",
    "form.activity.sedentary": "Sitzend (wenig/kein Sport)",
    "form.activity.light": "Leicht (leichter Sport 1-3 Tage/Woche)",
    "form.activity.moderate": "Mäßig (mäßiger Sport 3-5 Tage/Woche)",
    "form.activity.active": "Aktiv (intensiver Sport 6-7 Tage/Woche)",
    "form.activity.very-active": "Sehr Aktiv (sehr intensiver Sport, körperliche Arbeit)",
    "form.calculate": "Empfehlungen Berechnen",
    "form.language": "Sprache",

    // Results
    "results.title": "Ihre Personalisierten Empfehlungen",
    "results.profile": "Jahre alt",
    "results.edit": "Informationen Bearbeiten",
    "results.calories": "Tägliche Kalorien",
    "results.calories.unit": "kcal/Tag",
    "results.protein": "Protein",
    "results.protein.unit": "Gramm/Tag",
    "results.carbs": "Kohlenhydrate",
    "results.carbs.unit": "Gramm/Tag",
    "results.fat": "Gesunde Fette",
    "results.fat.unit": "Gramm/Tag",
    "results.fiber": "Ballaststoffaufnahme",
    "results.fiber.desc": "Wichtig für die Verdauungsgesundheit und Sättigung",
    "results.water": "Wasseraufnahme",
    "results.water.desc": "Bleiben Sie den ganzen Tag über hydratisiert",
    "results.sodium": "Natriumgrenze",
    "results.sodium.desc": "Halten Sie die Natriumaufnahme unter dieser Grenze",

    // Suggestions
    "suggestions.title": "Personalisierte Vorschläge",
    "suggestions.subtitle": "Tipps, um Ihre täglichen Ernährungsziele zu erreichen",
    "suggestions.1": "Trinken Sie regelmäßig Wasser über den Tag verteilt, um hydratisiert zu bleiben",
    "suggestions.2": "Nehmen Sie magere Proteine wie Huhn, Fisch, Bohnen und Tofu in Ihre Mahlzeiten auf",
    "suggestions.3": "Wählen Sie Vollkornprodukte statt raffinierte Kohlenhydrate für nachhaltige Energie",
    "suggestions.4": "Integrieren Sie gesunde Fette aus Nüssen, Avocados und Olivenöl",
    "suggestions.5": "Essen Sie viel Obst und Gemüse für Ballaststoffe und Mikronährstoffe",
    "suggestions.6": "Begrenzen Sie verarbeitete Lebensmittel und zugesetzten Zucker",
    "suggestions.7": "Erwägen Sie Meal Prep für eine konsistente Ernährung",
  },
  ko: {
    // Header
    "app.title": "건강 모니터 도우미",
    "app.subtitle": "나이, 체중, 생활 방식을 바탕으로 개인 맞춤형 일일 영양 권장사항을 받아보세요",

    // Form
    "form.title": "개인 정보",
    "form.subtitle": "개인 맞춤형 영양 권장사항을 받기 위해 정보를 입력하세요",
    "form.age": "나이 (세)",
    "form.age.placeholder": "나이를 입력하세요",
    "form.weight": "체중 (kg)",
    "form.weight.placeholder": "체중을 입력하세요",
    "form.gender": "성별",
    "form.gender.male": "남성",
    "form.gender.female": "여성",
    "form.activity": "활동 수준",
    "form.activity.sedentary": "좌식 (운동 거의 안함)",
    "form.activity.light": "가벼움 (주 1-3일 가벼운 운동)",
    "form.activity.moderate": "보통 (주 3-5일 중간 운동)",
    "form.activity.active": "활발함 (주 6-7일 격렬한 운동)",
    "form.activity.very-active": "매우 활발함 (매우 격렬한 운동, 육체 노동)",
    "form.calculate": "권장사항 계산",
    "form.language": "언어",

    // Results
    "results.title": "개인 맞춤형 권장사항",
    "results.profile": "세",
    "results.edit": "정보 수정",
    "results.calories": "일일 칼로리",
    "results.calories.unit": "kcal/일",
    "results.protein": "단백질",
    "results.protein.unit": "그램/일",
    "results.carbs": "탄수화물",
    "results.carbs.unit": "그램/일",
    "results.fat": "건강한 지방",
    "results.fat.unit": "그램/일",
    "results.fiber": "섬유질 섭취",
    "results.fiber.desc": "소화 건강과 포만감에 필수적",
    "results.water": "수분 섭취",
    "results.water.desc": "하루 종일 수분을 유지하세요",
    "results.sodium": "나트륨 제한",
    "results.sodium.desc": "나트륨 섭취량을 이 제한 이하로 유지하세요",

    // Suggestions
    "suggestions.title": "개인 맞춤형 제안",
    "suggestions.subtitle": "일일 영양 목표 달성을 위한 팁",
    "suggestions.1": "수분 유지를 위해 하루 종일 정기적으로 물을 마시세요",
    "suggestions.2": "닭고기, 생선, 콩류, 두부와 같은 저지방 단백질을 식사에 포함하세요",
    "suggestions.3": "지속적인 에너지를 위해 정제된 탄수화물보다 통곡물을 선택하세요",
    "suggestions.4": "견과류, 아보카도, 올리브 오일에서 건강한 지방을 섭취하세요",
    "suggestions.5": "섬유질과 미량 영양소를 위해 과일과 채소를 많이 드세요",
    "suggestions.6": "가공식품과 첨가당을 제한하세요",
    "suggestions.7": "일관된 영양 섭취를 위해 식사 준비를 고려하세요",
  },
  ja: {
    // Header
    "app.title": "ヘルスモニターアシスタント",
    "app.subtitle": "年齢、体重、ライフスタイルに基づいてパーソナライズされた毎日の栄養推奨事項を取得",

    // Form
    "form.title": "個人情報",
    "form.subtitle": "パーソナライズされた栄養推奨事項を受け取るために詳細を入力してください",
    "form.age": "年齢（歳）",
    "form.age.placeholder": "年齢を入力してください",
    "form.weight": "体重（kg）",
    "form.weight.placeholder": "体重を入力してください",
    "form.gender": "性別",
    "form.gender.male": "男性",
    "form.gender.female": "女性",
    "form.activity": "活動レベル",
    "form.activity.sedentary": "座りがち（運動なし/少ない）",
    "form.activity.light": "軽い（週1-3日軽い運動）",
    "form.activity.moderate": "中程度（週3-5日中程度の運動）",
    "form.activity.active": "アクティブ（週6-7日激しい運動）",
    "form.activity.very-active": "非常にアクティブ（非常に激しい運動、肉体労働）",
    "form.calculate": "推奨事項を計算",
    "form.language": "言語",

    // Results
    "results.title": "あなたのパーソナライズされた推奨事項",
    "results.profile": "歳",
    "results.edit": "情報を編集",
    "results.calories": "毎日のカロリー",
    "results.calories.unit": "kcal/日",
    "results.protein": "タンパク質",
    "results.protein.unit": "グラム/日",
    "results.carbs": "炭水化物",
    "results.carbs.unit": "グラム/日",
    "results.fat": "健康的な脂肪",
    "results.fat.unit": "グラム/日",
    "results.fiber": "食物繊維摂取",
    "results.fiber.desc": "消化の健康と満腹感に不可欠",
    "results.water": "水分摂取",
    "results.water.desc": "一日中水分補給を保つ",
    "results.sodium": "ナトリウム制限",
    "results.sodium.desc": "ナトリウム摂取量をこの制限以下に保つ",

    // Suggestions
    "suggestions.title": "パーソナライズされた提案",
    "suggestions.subtitle": "毎日の栄養目標達成のためのヒント",
    "suggestions.1": "水分補給のために一日中定期的に水を飲む",
    "suggestions.2": "鶏肉、魚、豆類、豆腐などの低脂肪タンパク質を食事に含める",
    "suggestions.3": "持続的なエネルギーのために精製炭水化物より全粒穀物を選ぶ",
    "suggestions.4": "ナッツ、アボカド、オリーブオイルから健康的な脂肪を摂取",
    "suggestions.5": "食物繊維と微量栄養素のために果物と野菜をたくさん食べる",
    "suggestions.6": "加工食品と添加糖を制限する",
    "suggestions.7": "一貫した栄養のために食事の準備を検討する",
  },
}
