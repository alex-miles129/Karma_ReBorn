import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAdminAccessWithRoles, isValidDesignation } from '@/config/admins';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Log the session info for debugging
    console.log('Session info:', {
      email: session?.user?.email,
      name: session?.user?.name
    });

    if (!session?.user?.email) {
      console.log('No session or email found');
      return NextResponse.json({ 
        isAdmin: false, 
        error: 'Not authenticated',
        details: 'No session or email found'
      }, { status: 401 });
    }

    const adminAccess = await getAdminAccessWithRoles(session);
    console.log('Admin access check:', {
      email: session.user.email,
      adminFound: !!adminAccess,
      designation: adminAccess?.designation
    });
    
    if (!adminAccess) {
      return NextResponse.json({ 
        isAdmin: false, 
        error: 'Not authorized',
        details: 'User not found in admin list and lacks required roles'
      }, { status: 403 });
    }

    // Since we now allow multiple designations, we don't strictly reject if it's an array of valid ones
    // We already validate when constructing the array.
    if (!Array.isArray(adminAccess.designation) && adminAccess.designation !== 'all' && !isValidDesignation(adminAccess.designation)) {
      return NextResponse.json({ 
        isAdmin: false, 
        error: 'Invalid designation',
        details: `Invalid designation: ${adminAccess.designation}`
      }, { status: 403 });
    }

    return NextResponse.json({
      isAdmin: true,
      designation: adminAccess.designation,
      discordId: adminAccess.discordId,
      email: session.user.email
    });

  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json({ 
      isAdmin: false, 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 