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

    // Create ZAI instance for AI completion
    const zai = await ZAI.create();

    // Generate AI-powered search insights
    const completion = await zai.chat.completions.create({
      messages: [
        {
          role: 'assistant',
          content: `You are an intelligent search assistant for Quantum Search Engine. Your role is to provide concise, helpful insights about search queries.

Follow these guidelines:
1. Provide a brief, engaging 2-3 sentence summary about the topic
2. Extract 3-5 key points or interesting facts
3. Be objective and factual
4. Keep responses under 150 words total
5. Focus on current, relevant information
6. Do not mention being an AI or language model
7. Respond in a helpful, conversational tone`
        },
        {
          role: 'user',
          content: `Provide insights about this search query: "${query.trim()}"\n\nFormat your response as:\n\nSummary: [Your summary here]\n\nKey Points:\n- [Point 1]\n- [Point 2]\n- [Point 3]`
        }
      ],
      thinking: { type: 'disabled' }
    });

    const response = completion.choices[0]?.message?.content;

    if (!response) {
      throw new Error('No response from AI');
    }

    // Parse the response
    const summaryMatch = response.match(/Summary:\s*(.+?)(?=\n\nKey Points:|$)/is);
    const keyPointsMatch = response.match(/Key Points:\s*([\s\S]+)/is);

    const summary = summaryMatch?.[1]?.trim() || response.split('\n\n')[0]?.trim() || '';
    const keyPointsText = keyPointsMatch?.[1] || '';
    const keyPoints = keyPointsText
      .split('\n')
      .map((point) => point.replace(/^[-•]\s*/, '').trim())
      .filter((point) => point.length > 0);

    return NextResponse.json({
      success: true,
      query: query,
      data: {
        summary: summary,
        keyPoints: keyPoints.slice(0, 5)
      }
    });
  } catch (error) {
    console.error('AI Summary API Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate AI summary'
      },
      { status: 500 }
    );
  }
}
