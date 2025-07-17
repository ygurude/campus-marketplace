import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const apiKey = process.env.COLLEGE_SCORECARD_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not set' }, { status: 500 });
    }
    // Fetch 4-year, degree-granting U.S. institutions (predominant=3, operating=1, country=1)
    const url = `https://api.data.gov/ed/collegescorecard/v1/schools?school.degrees_awarded.predominant=3&school.operating=1&school.country=1&fields=school.name&per_page=1000&api_key=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'Failed to fetch universities', status: res.status, body: text }, { status: 500 });
    }
    const data = await res.json();
    const names = Array.from(
      new Set(
        (data.results as any[])
          .map((rec) => rec['school.name'])
          .filter(Boolean)
          .map((name) => String(name))
      )
    ).sort();
    return NextResponse.json({ universities: names });
  } catch (e) {
    return NextResponse.json({ error: 'Server error', details: String(e) }, { status: 500 });
  }
} 