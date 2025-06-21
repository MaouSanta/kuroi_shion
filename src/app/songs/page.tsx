// src/app/songs/page.tsx
// 默认是服务器组件，不需要 'use client'
import { Song, Performance } from '@/types/song'; // 导入 Song 和 Performance 类型
import { Tag } from '@/types/tag';
import fs from 'node:fs/promises';
import path from 'node:path';

// 导入 Mantine UI 组件
import { Container, Title, Text } from '@mantine/core';

// 导入我们刚刚创建的客户端组件
import { SongListInteractive } from './SongListInteractive';

// 异步函数，用于在构建时加载数据（在服务器端执行）
async function getSongs(): Promise<Song[]> {
    const filePath = path.join(process.cwd(), 'data', 'songs.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const songs: Song[] = JSON.parse(fileContent);

    // 假设 songs.json 中的数据已经是新的聚合结构
    return songs;
}

// 新增：异步函数，用于在构建时加载标签数据
async function getTags(): Promise<Tag[]> {
    const filePath = path.join(process.cwd(), 'data', 'tags.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
}

export default async function SongsPage() {
    const songs = await getSongs(); // 在服务器端获取数据
    const tags = await getTags(); // 加载标签数据

    return (
        <Container size="xl" py="xl">
            <Title ta="center" order={1} mb="md">
                黒井獅音 歌单记录
            </Title>
            <Text ta="center" size="lg" mb="xl" c="dimmed">
                记录狮音在直播中演唱过的歌曲，持续更新中...
            </Text>

            {/* 将获取到的数据作为 props 传递给客户端组件 */}
            <SongListInteractive clientSongs={songs} allAvailableTags={tags} />
        </Container>
    );
}