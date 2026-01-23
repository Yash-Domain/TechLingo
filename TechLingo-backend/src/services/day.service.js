import DayContent from "../models/DayContent.model.js";
import User from "../models/User.model.js"; // ✅ ADD THIS
import { DayContentSchema } from "../validators/dayContent.schema.js";
import { generateDayContent } from "./ai.service.js";
import { decrypt } from "../utils/crypto.js";

/* =========================================================
   🎓 CURRICULUM (STATIC, NON-AI CONTROLLED)
   ========================================================= */

const CURRICULUM = {
  1: {
    title: "Names, Not Boxes: Variables and Binding",
    goal:
      "Replace C++ variable-as-memory thinking with Python name-object binding",
    cpp_intuition: "Variables are typed memory locations",
    python_reality: "Variables are names bound to objects",
    must_cover: [
      "Name binding",
      "Rebinding vs mutation",
      "Object identity",
      "Garbage collection basics",
    ],
    avoid: [
      "Beginner syntax explanations",
      "print examples",
      "Explaining what Python is",
    ],
  },

  2: {
    title: "Mutability, Aliasing, and Side Effects",
    goal:
      "Explain why Python variables behave unexpectedly for C++ developers",
    cpp_intuition: "Assignment usually copies values",
    python_reality: "Assignment creates shared references",
    must_cover: [
      "Mutable vs immutable objects",
      "Aliasing",
      "Why lists behave differently from ints",
    ],
    avoid: [
      "Shallow vs deep copy implementation details",
      "Advanced memory diagrams",
    ],
  },

  3: {
    title: "Function Calls and Argument Passing",
    goal:
      "Unify pass-by-value and pass-by-reference into Python’s model",
    cpp_intuition: "Explicit pass-by-value or reference",
    python_reality:
      "Object references are passed; mutability decides outcome",
    must_cover: [
      "Function arguments",
      "Side effects",
      "Why ints don’t change but lists do",
    ],
    avoid: ["CPython internals"],
  },

  4: {
    title: "Types Without Declarations",
    goal:
      "Understand Python’s dynamic typing without losing discipline",
    cpp_intuition: "Types are compile-time contracts",
    python_reality: "Types belong to objects, not names",
    must_cover: [
      "Duck typing",
      "Runtime type checks",
      "Common pitfalls",
    ],
    avoid: ["Type theory", "mypy discussion"],
  },

  5: {
    title: "Iteration and Control Flow the Python Way",
    goal:
      "Shift from index-based loops to iterable thinking",
    cpp_intuition: "Loop counters and indices",
    python_reality: "Iteration over objects",
    must_cover: [
      "Iterables",
      "for-in loops",
      "Comprehensions (conceptually)",
    ],
    avoid: ["Performance micro-optimizations"],
  },

  6: {
    title: "Protocols and Object Behavior",
    goal:
      "Understand why Python objects feel natural to use",
    cpp_intuition: "Operator overloading and interfaces",
    python_reality: "Protocols via dunder methods",
    must_cover: [
      "__str__",
      "__len__",
      "__iter__",
      "Operator behavior",
    ],
    avoid: ["Metaclasses"],
  },

  7: {
    title: "Pythonic Design vs C++ Design",
    goal:
      "Learn when to think like Python and when to think like C++",
    cpp_intuition: "Control, determinism, performance",
    python_reality: "Readability, flexibility, expressiveness",
    must_cover: [
      "RAII vs GC",
      "Explicit vs implicit design",
      "Performance trade-offs",
    ],
    avoid: ["Language wars"],
  },
};

/* =========================================================
   🧠 PROMPT BUILDER
   ========================================================= */

function buildPrompt(dayConfig) {
  return `
You are an expert programming mentor.

The learner is a strong C++ developer transitioning to Python.
DO NOT teach Python as a beginner language.

Lesson Title:
${dayConfig.title}

Learning Goal:
${dayConfig.goal}

C++ Mental Model:
${dayConfig.cpp_intuition}

Python Reality:
${dayConfig.python_reality}

You MUST cover:
${dayConfig.must_cover.map((c) => `- ${c}`).join("\n")}

You MUST avoid:
${dayConfig.avoid.map((a) => `- ${a}`).join("\n")}

Return ONLY valid JSON.
`;
}

/* =========================================================
   🔧 NORMALIZATION
   ========================================================= */

function normalizeDayContent(raw) {
  return {
    day: raw.day,
    title: raw.title,
    core_concept: {
      summary: raw.core_concept?.summary ?? "",
      detailed_explanation: raw.core_concept?.detailed_explanation ?? "",
    },
    comparison: Array.isArray(raw.comparison) ? raw.comparison : [],
    common_mistakes: Array.isArray(raw.common_mistakes)
      ? raw.common_mistakes
      : [],
    practice_questions: Array.isArray(raw.practice_questions)
      ? raw.practice_questions
      : [],
    unlock_condition: raw.unlock_condition ?? "",
  };
}

/* =========================================================
   🚀 MAIN SERVICE
   ========================================================= */

export async function getOrCreateDay(userId, dayNumber) {
  // ✅ Cache check
  const existing = await DayContent.findOne({ userId, day: dayNumber });
  if (existing) return existing;

  const dayConfig = CURRICULUM[dayNumber];
  if (!dayConfig) throw new Error("Invalid day requested");

  // ✅ FETCH USER (FIX)
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const prompt = buildPrompt(dayConfig);

  const raw = await generateDayContent({
    systemPrompt: prompt,
    userPayload: { day: dayNumber },
    apiKey: decrypt(user.openrouter.apiKeyEncrypted),
    model: user.openrouter.model,
  });

  if (!raw) throw new Error("AI returned empty response");

  const normalized = normalizeDayContent(raw);
  const validated = DayContentSchema.parse(normalized);

  return await DayContent.create({
    userId,
    ...validated,
  });
}
