import fs from 'fs';
import path from 'path';
import { Session } from 'next-auth';

export interface AdminUser {
  email: string;
  discordId: string;
  designation: string | string[] | 'all';
}

// List of valid designations
export const VALID_DESIGNATIONS = ['all', 'whitelist', 'police', 'ems', 'doj', 'doc'] as const;
export type Designation = typeof VALID_DESIGNATIONS[number];

// Code-defined admins
export const adminUsers: AdminUser[] = [
  {
    email: 'mastermindaggaming@gmail.com',
    discordId: '964445991422005278',
    designation: 'all'  // This admin has access to EMS sections
  },
  {
    email: 'baranwalshubhankar3@gmail.com',
    discordId: '910570306576457821',
    designation: 'all'  // This admin has access to EMS sections
  },
  {
    email: 'baranwalshubhankar3@gmail.com',
    discordId: '910570306576457821',
    designation: 'all'  // This admin has access to EMS sections
  }
];

const ROLE_DESIGNATIONS: Record<string, Designation> = {
  '1489608368166539315': 'whitelist',
  '1489608395265675374': 'doj',
  '1489608397815812206': 'police',
  '1489608399552254043': 'ems',
  '1502720026417958972': 'doc'
};

// Function to read admins from file
const getFileAdmins = (): AdminUser[] => {
  try {
    const adminFilePath = path.join(process.cwd(), 'admin.txt');
    
    if (!fs.existsSync(adminFilePath)) {
      fs.writeFileSync(adminFilePath, '# Admin users (one per line)\n# Format: email,discordId\n');
      return [];
    }

    const adminFileContent = fs.readFileSync(adminFilePath, 'utf-8');
    const adminLines = adminFileContent
      .split('\n')
      .filter(line => line && !line.startsWith('#')); // Skip empty lines and comments

    return adminLines.map(line => {
      const [email, discordId] = line.trim().split(',');
      return { 
        email, 
        discordId, 
        designation: 'all' // File-based admins get full access
      };
    });
  } catch (error) {
    console.error('Error reading admin file:', error);
    return [];
  }
};

export const isValidDesignation = (designation: string): boolean => {
  return VALID_DESIGNATIONS.includes(designation as Designation);
};

export const getAdminAccess = (email: string): AdminUser | undefined => {
  if (!email) return undefined;
  // Convert email to lowercase for case-insensitive comparison
  const normalizedEmail = email.toLowerCase();
  
  // Check code-defined admins first
  const codeAdmin = adminUsers.find(
    admin => admin.email.toLowerCase() === normalizedEmail
  );
  if (codeAdmin) return codeAdmin;

  // Then check file-based admins
  const fileAdmins = getFileAdmins();
  return fileAdmins.find(
    admin => admin.email.toLowerCase() === normalizedEmail
  );
};

export const getAdminAccessWithRoles = async (session: Session | null): Promise<AdminUser | undefined> => {
  if (!session?.user) return undefined;

  // Check email-based access first
  if (session.user.email) {
    const emailAccess = getAdminAccess(session.user.email);
    if (emailAccess) return emailAccess;
  }

  // Check role-based access
  const userId = (session.user as any).id;
  if (!userId) return undefined;

  try {
    const DISCORD_SERVER_ID = process.env.DISCORD_SERVER_ID;
    const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

    if (!DISCORD_SERVER_ID || !DISCORD_BOT_TOKEN) return undefined;

    const response = await fetch(
      `https://discord.com/api/guilds/${DISCORD_SERVER_ID}/members/${userId}`,
      {
        headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` },
        cache: 'no-store'
      }
    );

    if (response.ok) {
      const memberData = await response.json();
      const roles: string[] = memberData.roles || [];
      const userDesignations: Designation[] = [];

      for (const roleId of roles) {
        if (ROLE_DESIGNATIONS[roleId]) {
          userDesignations.push(ROLE_DESIGNATIONS[roleId]);
        }
      }

      if (userDesignations.length > 0) {
        return {
          email: session.user.email || '',
          discordId: userId,
          designation: userDesignations
        };
      }
    }
  } catch (error) {
    console.error('Error fetching Discord roles for admin access:', error);
  }

  return undefined;
};

export const canAccessSection = (admin: AdminUser, section: string): boolean => {
  if (admin.designation === 'all') return true;
  if (Array.isArray(admin.designation)) {
    return admin.designation.includes(section as Designation);
  }
  return admin.designation === section;
}; 