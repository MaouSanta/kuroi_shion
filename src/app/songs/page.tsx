import { Song } from '@/types/song';
import { Tag } from '@/types/tag';
import fs from 'node:fs/promises';
import path from 'node:path';

import { Container } from '@mantine/core';

import { SongListInteractive } from './SongListInteractive';

async function getSongs(): Promise<Song[]> {
    const filePath = path.join(process.cwd(), 'data', 'songs.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const songs: Song[] = JSON.parse(fileContent);
    return songs;
}

async function getTags(): Promise<Tag[]> {
    const filePath = path.join(process.cwd(), 'data', 'tags.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

export default async function SongsPage() {
    const songs = await getSongs();
    const tags = await getTags();

    return (
        <Container size="xl" py="xl">
            <SongListInteractive clientSongs={songs} allAvailableTags={tags} />
        </Container>
    );
}