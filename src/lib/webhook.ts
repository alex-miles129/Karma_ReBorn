/**
 * Sends a form response to Discord webhook endpoint
 * @param guildId - Discord server/guild ID
 * @param action - 'accept' or 'reject'
 * @param applicantName - Discord username of the applicant
 * @param applicantId - Discord ID of the applicant
 * @param formType - Type of form: 'whitelist', 'police', 'ems', 'doj', 'doc', 'staff'
 * @param reason - Optional reason for acceptance/rejection
 * @param adminName - Name of the admin who processed the application
 * @returns Promise<boolean> - Returns true if successful, false otherwise
 */
export async function sendFormResponseToDiscord(
  guildId: string,
  action: 'accept' | 'reject',
  applicantName: string,
  applicantId: string,
  formType: 'whitelist' | 'police' | 'ems' | 'doj' | 'doc' | 'staff',
  reason: string | null = null,
  adminName: string | null = null
): Promise<boolean> {
  const botToken = process.env.DISCORD_BOT_TOKEN;
  const webhookUrl = process.env.WEBHOOK_URL || 'http://pnode-01.botnix.cloud:9034/webhook/form-response';
  const apiKey = process.env.WEBHOOK_API_KEY || '';

  // 1. Direct Discord Message: For all forms when botToken is available
  if (botToken) {
    const CHANNEL_MAP: Record<string, string> = {
      'whitelist': '1518667724111352028',
      'police': '1518143850248540371',
      'ems': '1518143853444599869',
      'doj': '1518143844539961375',
      'doc': '1518289246962581514',
      'staff': '1518143841717456896',
      'gang': '1518143855604535386'
    };

    const channelId = CHANNEL_MAP[formType];
    if (channelId) {
      const isAccept = action === 'accept';
      const color = isAccept ? 3066993 : 15158332; // Green for approved, Red for rejected/failed
      const statusText = isAccept ? 'APPROVED' : 'REJECTED';

      const BANNER_MAP: Record<string, { accept: string; reject: string }> = {
        'whitelist': {
          accept: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/whitelist_accept.png',
          reject: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/whitelist_reject.png'
        },
        'pd': {
          accept: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/pd_accept.png',
          reject: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/pd_reject.png'
        },
        'police': {
          accept: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/pd_accept.png',
          reject: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/pd_reject.png'
        },
        'ems': {
          accept: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/ems_accept.png',
          reject: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/ems_reject.png'
        },
        'doj': {
          accept: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/doj_accept.png',
          reject: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/doj_reject.png'
        },
        'doc': {
          accept: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/doc_accept.png',
          reject: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/doc_reject.png'
        },
        'staff': {
          accept: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/staff_accept.png',
          reject: 'https://r2.fivemanage.com/tSnne9Eh3q5Hb1Wd3SWQI/staff_reject.png'
        }
      };

      const bannerUrl = BANNER_MAP[formType]
        ? (action === 'accept' ? BANNER_MAP[formType].accept : BANNER_MAP[formType].reject)
        : (isAccept 
            ? 'https://r2.fivemanage.com/fIzwGUYZR5rnjUFPnGj3B/whitelist_accept.png' 
            : 'https://r2.fivemanage.com/fIzwGUYZR5rnjUFPnGj3B/whitelist_rejected.png');

      const embed: any = {
        title: `Application Response - ${formType.toUpperCase()}`,
        color: color,
        fields: [
          {
            name: "Applicant Name",
            value: applicantName || 'Unknown',
            inline: true
          },
          {
            name: "Discord ID",
            value: applicantId ? `<@${applicantId}> (${applicantId})` : 'Unknown',
            inline: true
          },
          {
            name: "Status",
            value: `**${statusText}**`,
            inline: true
          },
          {
            name: "Details",
            value: reason || (isAccept ? 'Your application has been accepted! Please check your roles and channels.' : 'Your application was not approved at this time.'),
            inline: false
          }
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: `Processed By: ${adminName || 'Automated System'} • India Town Roleplay`
        }
      };

      // Add the status banner image for all forms
      embed.image = {
        url: bannerUrl
      };

      try {
        console.log(`Attempting to send direct Discord channel message to: ${channelId} for form: ${formType}`);
        const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
          method: 'POST',
          headers: {
            Authorization: `Bot ${botToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ content: applicantId ? `<@${applicantId}>` : '', embeds: [embed] })
        });

        if (response.ok) {
          console.log(`Direct Discord message sent successfully to channel: ${channelId} for form: ${formType}`);
          return true;
        } else {
          const errText = await response.text().catch(() => '');
          console.error(`Direct Discord channel message failed with status ${response.status}: ${errText}. Falling back to custom webhook.`);
        }
      } catch (err) {
        console.error('Error sending direct Discord channel message, falling back to custom webhook:', err);
      }
    }
  }

  // 2. Custom webhook endpoint format (e.g. Botnix server): Used for all other department forms (or fallback)
  const data = {
    guildId: guildId,
    action: action,
    applicantName: applicantName,
    applicantId: applicantId,
    formType: formType,
    reason: reason,
    adminName: adminName,
    apiKey: apiKey
  };

  try {
    console.log(`Sending custom webhook payload to: ${webhookUrl} for type: ${formType}`);
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const text = await response.text().catch(() => '');
      console.error(`Custom webhook request failed with status: ${response.status}. Body: ${text}`);
      return false;
    }

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error('Error sending to custom Discord webhook:', error);
    return false;
  }
}
