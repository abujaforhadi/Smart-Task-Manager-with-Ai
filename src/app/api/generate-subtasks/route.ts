import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"

const subtasksSchema = z.object({
  subtasks: z.array(z.string()).min(3).max(5),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description } = body || {}

    if (!title) {
      return NextResponse.json({ error: "Task title is required" }, { status: 400 })
    }

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 })
    }

    const prompt = `Break down the following task into 3-5 smaller, actionable subtasks:

Task Title: ${title}
${description ? `Task Description: ${description}` : ""}

Generate specific, actionable subtasks that would help someone complete this main task. Each subtask should be clear and achievable.`

    const { object } = await generateObject({
      model: google("gemini-1.5-flash"),
      schema: subtasksSchema,
      prompt,
    })

    return NextResponse.json({ subtasks: object.subtasks })
  } catch (error: unknown) {
    // console.error("Error generating subtasks:", error)

    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      (error as { name?: string }).name === "ZodError"
    ) {
      return NextResponse.json(
        { error: "Subtasks format invalid", details: (error as { errors?: unknown }).errors },
        { status: 422 }
      )
    }

    return NextResponse.json({ error: "Failed to generate subtasks" }, { status: 500 })
  }
}
