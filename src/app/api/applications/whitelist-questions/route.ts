import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import questionsData from "@/config/fivem_whitelist_questions.json";
import { getWhitelistCooldown } from "@/lib/whitelist-server";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "You must be logged in to fetch quiz questions" },
        { status: 401 }
      );
    }

    const discordId = (session.user as any).id;
    if (!discordId) {
      return NextResponse.json(
        { success: false, error: "Discord account not found in session" },
        { status: 400 }
      );
    }

    // Check if user is on cooldown
    const cooldownRemaining = await getWhitelistCooldown(discordId);
    if (cooldownRemaining > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: "You are on cooldown. Please wait before attempting the quiz again.",
          cooldownRemaining 
        },
        { status: 429 }
      );
    }

    // Clone the original questions list to prevent mutation issues
    const allQuestions = [...questionsData];

    // Pick 10 random questions
    const selectedQuestions = [];
    const tempQuestions = [...allQuestions];
    for (let i = 0; i < 10; i++) {
      if (tempQuestions.length === 0) break;
      const randomIndex = Math.floor(Math.random() * tempQuestions.length);
      selectedQuestions.push(tempQuestions.splice(randomIndex, 1)[0]);
    }

    // Jumble/shuffle the options for each selected question and remove correctIndex
    const processedQuestions = selectedQuestions.map((q) => {
      // Shuffle options using modern Fisher-Yates or simple random sort
      const shuffledOptions = [...q.options]
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

      return {
        id: q.id,
        question: q.question,
        options: shuffledOptions,
      };
    });

    return NextResponse.json({
      success: true,
      questions: processedQuestions,
    });
  } catch (error) {
    console.error('Error fetching whitelist questions:', error);
    return NextResponse.json(
      { success: false, error: "Failed to load quiz questions" },
      { status: 500 }
    );
  }
}
