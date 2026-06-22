import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { google } from 'googleapis';
import { GOOGLE_PRIVATE_KEY, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_WHITELIST_SHEET_ID } from "@/config/googleConfig";
import questionsData from "@/config/fivem_whitelist_questions.json";
import { getWhitelistCooldown } from "@/lib/whitelist-server";
import { sendFormResponseToDiscord } from "@/lib/webhook";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "You must be logged in to submit an application" },
        { status: 401 }
      );
    }

    const discordId = (session.user as any).id;
    if (!discordId) {
      return NextResponse.json(
        { success: false, error: "Discord ID not found in session" },
        { status: 400 }
      );
    }

    // Check if user is on cooldown
    const cooldownRemaining = await getWhitelistCooldown(discordId);
    if (cooldownRemaining > 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: "You are on cooldown. Please wait before reapplying.",
          cooldownRemaining 
        },
        { status: 429 }
      );
    }

    const { answers, terminated } = await req.json();

    let score = 0;
    let totalQuestions = 0;

    if (!terminated && answers) {
      // Evaluate answers
      const answeredKeys = Object.keys(answers);
      totalQuestions = answeredKeys.length;

      for (const qIdStr of answeredKeys) {
        const qId = parseInt(qIdStr, 10);
        const originalQuestion = questionsData.find(q => q.id === qId);
        
        if (originalQuestion) {
          const selectedOption = answers[qIdStr];
          const correctOptionText = originalQuestion.options[originalQuestion.correctIndex];
          
          if (selectedOption === correctOptionText) {
            score++;
          }
        }
      }
    }

    const passed = !terminated && score >= 7;
    const status = passed ? 'approved' : 'failed';

    // Initialize Google Sheets
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    // Prepare row data for Google Sheets
    const timestamp = new Date().toISOString();
    const resultText = terminated 
      ? 'failed (terminated due to screen exit)' 
      : `${status} (${score}/10)`;

    const rowData = [
      timestamp,              // A - TimeStamp
      session.user.name,       // B - Username
      discordId,               // C - Discord ID
      '',                      // D - Character Name (N/A)
      '',                      // E - Experience (N/A)
      '',                      // F - Backstory (N/A)
      '',                      // G - Powergaming (N/A)
      '',                      // H - New Life Rule (N/A)
      '',                      // I - RDM/VDM (N/A)
      '',                      // J - Staying In Character (N/A)
      '',                      // K - Rule Breaking (N/A)
      '',                      // L - Gunpoint (N/A)
      'Yes',                   // M - Agree to rules
      'Yes',                   // N - Has microphone
      resultText,              // O - Quiz score / Terminated logs (saved in memorable experience col)
      '',                      // P - Streamer
      '',                      // Q - Streamer link
      status,                  // R - Status
      'Automated Quiz',        // S - Reviewed By
      timestamp                // T - Time of Update
    ];

    // Append to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_WHITELIST_SHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowData],
      },
    });

    // Invalidate sheets cache for admin panel
    const globalForSheetsCache = global as unknown as { sheetsCache?: Map<string, any> };
    if (globalForSheetsCache.sheetsCache) {
      globalForSheetsCache.sheetsCache.delete('whitelist');
      console.log('Invalidated whitelist sheets cache on new submission');
    }

    // Handle Discord role assignment if passed
    let roleAssigned = false;
    const guildId = process.env.DISCORD_SERVER_ID || '';
    const botToken = process.env.DISCORD_BOT_TOKEN || '';
    const whitelistRoleId = '1518143675111051317';

    if (passed) {
      if (guildId && botToken) {
        try {
          const roleResponse = await fetch(
            `https://discord.com/api/guilds/${guildId}/members/${discordId}/roles/${whitelistRoleId}`,
            {
              method: 'PUT',
              headers: {
                Authorization: `Bot ${botToken}`,
                'X-Audit-Log-Reason': `Whitelist quiz passed automatically (${score}/10)`
              }
            }
          );

          if (roleResponse.ok) {
            roleAssigned = true;
            console.log(`Successfully assigned whitelist role to user ${discordId}`);
          } else {
            const errBody = await roleResponse.text();
            console.error(`Failed to assign role via Discord API: ${roleResponse.status} ${errBody}`);
          }
        } catch (discordErr) {
          console.error('Error assigning Discord role:', discordErr);
        }
      } else {
        console.warn('DISCORD_SERVER_ID or DISCORD_BOT_TOKEN not configured. Skipping role assignment.');
      }
    }

    // Send Discord Webhook notification
    if (guildId) {
      try {
        const action = passed ? 'accept' : 'reject';
        const reason = terminated 
          ? 'Failed the quiz automatically due to exiting fullscreen/losing window focus.' 
          : `Attempted the whitelist quiz and scored ${score}/10 (Required: 7/10 to pass).`;
        
        await sendFormResponseToDiscord(
          guildId,
          action,
          session.user.name || 'Unknown',
          discordId,
          'whitelist',
          reason,
          'Automated Quiz'
        );
      } catch (webhookErr) {
        console.error('Failed to send Discord webhook:', webhookErr);
      }
    }

    return NextResponse.json({
      success: true,
      passed,
      score,
      terminated,
      roleAssigned,
      cooldownRemaining: passed ? 0 : 1.5 * 60 * 60 * 1000
    });
  } catch (error) {
    console.error('Error handling application submission:', error);
    return NextResponse.json(
      { success: false, error: "Failed to process application submission" },
      { status: 500 }
    );
  }
}