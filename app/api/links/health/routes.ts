import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check other dependencies here if needed
    // e.g., Redis, external APIs, etc.
    
    // All checks passed
    return NextResponse.json({
      status: 'healthy',
      version: process.env.npm_package_version || 'unknown',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    // Log the error
    console.error('Health check failed:', error);
    
    // Return unhealthy status
    return NextResponse.json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 503 });
  }
}