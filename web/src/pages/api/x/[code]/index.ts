import { NextApiRequest, NextApiResponse } from 'next';


const DEBUG = true;

type RequestQuery = {
    /** The shorturl code */
    code: string;
    /** Additional pathing to append to the redirect */
    rest?: string[];
    /** A tracking label */
    u?: string;
}

const links = new Map<string, string>(Object.entries({
    github: 'https://github.com/cseitz',
    linkedin: 'https://www.linkedin.com/in/seitzc/',
}));


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { code, u, rest = [] } = req.query as RequestQuery;
    const link = links.get(code);
    const redirect = link ? [link, rest.join('/')].filter(o => o).join('/') : undefined;
    if (DEBUG && u) return res.json({ code, rest, u, link, redirect });
    if (!redirect) return res.redirect(308, `/404`);
    return res.redirect(308, redirect);
}