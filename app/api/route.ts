import { NextRequest, NextResponse } from 'next/server';

const history: {
  a: number;
  b: number;
  operator: string;
  result: number | string;
}[] = [];

export async function GET() {
  const history = [{ id: 1, title: 'test' }];
  return NextResponse.json(history);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { a, b, operator, result } = body;

    if (
      typeof a !== 'number' ||
      typeof b !== 'number' ||
      (typeof result !== 'number' && typeof result !== 'string')
    ) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    history.push({ a, b, operator, result });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
