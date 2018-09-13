import Server from 'origami-core-server';
import path from 'path';
import fs from 'fs';
import favicon from 'serve-favicon';
// @ts-ignore
import toIco from 'to-ico';
import {Route} from 'origami-core-lib';

const defaultImage = path.resolve(__dirname, '../favicon/logo.png');

module.exports = async (server: Server, location: string | true) => {
    let l = defaultImage;
    if (typeof location === 'string') l = path.resolve(process.cwd(), location);

    const buffer = fs.readFileSync(l);
    const icoBuffer = await toIco([buffer]);
    const r = new Route('/favicon.ico')
        .get(favicon(icoBuffer));

    server.useRouter(r);
};
