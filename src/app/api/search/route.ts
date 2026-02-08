import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Create ZAI instance for web search
    const zai = await ZAI.create();

    // Perform web search
    const results = await zai.functions.invoke('web_search', {
      query: query.trim(),
      num: 10
    });

    return NextResponse.json({
      success: true,
      query: query,
      totalResults: results.length,
      results: results
    });
  } catch (error) {
    console.error('Search API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to perform search'
      },
      { status: 500 }
    );
  }
}
