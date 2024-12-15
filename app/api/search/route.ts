import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const url = new URL(req.url);
        const q = url.searchParams.get('q');

        // Validate query parameter
        if (!q || q.trim() === '') {
            return new Response('Invalid query', { status: 400 });
        }

        // Fetch matching subforums
        const results = await db.subforum.findMany({
            where: {
                name: {
                    startsWith: q,
                    mode: 'insensitive', 
                },
            },
            include: {
                _count: true,
            },
            take: 5, 
        });

        return NextResponse.json(results, { status: 200 });
    } catch (err) {
        console.error('Error fetching subforums:', err);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
