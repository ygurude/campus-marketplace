import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/universities.json');
    const fileContents = await fs.readFile(filePath, 'utf-8');
    const universities = JSON.parse(fileContents);
    return NextResponse.json({ universities });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: String(e) }, { status: 500 });
  }
} 