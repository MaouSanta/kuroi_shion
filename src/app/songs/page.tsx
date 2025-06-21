// src/app/songs/page.tsx
import { Song } from '@/types/song';
import { Tag } from '@/types/tag';
import fs from 'node:fs/promises';
import path from 'node:path';

import { Container, Title, Text } from '@mantine/core';

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
            <Title ta="center" order={1} mb="md">
                黒井獅音 歌单记录
            </Title>
            <Text ta="center" size="lg" mb="xl" c="dimmed">
                记录狮音在直播中演唱过的歌曲，持续更新中...
            </Text>

            <SongListInteractive clientSongs={songs} allAvailableTags={tags} />
        </Container>
    );
}