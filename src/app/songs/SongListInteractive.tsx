// src/app/songs/SongListInteractive.tsx
'use client';

import { Song } from '@/types/song';
import { Tag } from '@/types/tag';
import {
    ActionIcon, Anchor, Badge, Box, Checkbox, Flex, Group, Pagination,
    ScrollArea, SegmentedControl, Table, Text, TextInput, Tooltip,
    Title,
} from '@mantine/core';
import {
    IconBrandYoutube, IconBrandX,
    IconSearch, IconSortAscending, IconSortDescending, IconX
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { Fragment, useMemo, useState } from 'react';
import Link from 'next/link';

interface SongListInteractiveProps {
    clientSongs: Song[];
    allAvailableTags: Tag[];
}

type SortKey = 'date' | 'songName' | 'artist' | 'performanceCount';
type SortState = {
    key: SortKey | null;
    direction: 'asc' | 'desc';
};

export function SongListInteractive({ clientSongs, allAvailableTags }: SongListInteractiveProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatusTag, setSelectedStatusTag] = useState('すべて');
    const [sortState, setSortState] = useState<SortState>({ key: 'date', direction: 'desc' });

    const [searchScopes, setSearchScopes] = useState({
        songName: true,
        artist: true,
        lyrics: false
    });

    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<string>('10');

    const statusTags = useMemo(() => {
        const filteredTags = allAvailableTags
            .filter(tag => tag.isStatusTag)
            .map(tag => tag.name);
        return ['すべて', ...filteredTags];
    }, [allAvailableTags]);

    const handleSort = (key: SortKey) => {
        setSortState(prev => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, direction: 'desc' };
            }
        });
    };

    const highlightText = (text: string | undefined, highlight: string) => {
        if (!text || !highlight.trim()) {
            return <>{text}</>;
        }
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <>
                {parts.map((part, i) => (
                    <Fragment key={i}>
                        {part.toLowerCase() === highlight.toLowerCase() ? (
                            <Text span c="orange">{part}</Text>
                        ) : (
                            part
                        )}
                    </Fragment>
                ))}
            </>
        );
    };

    const processedSongs = useMemo(() => {
        return clientSongs.map(song => ({
            ...song,
            performanceCount: song.performances.length,
            latestPerformanceTime: song.performances.length > 0
                ? Math.max(...song.performances.map(p => new Date(p.date).getTime()))
                : 0,
        }));
    }, [clientSongs]);

    const filteredAndSortedSongs = useMemo(() => {
        let filtered = processedSongs;

        if (searchTerm) {
            const lowerCaseSearchTerm = searchTerm.toLowerCase();
            filtered = filtered.filter(song => {
                let match = false;
                if (searchScopes.songName && song.songName.toLowerCase().includes(lowerCaseSearchTerm)) {
                    match = true;
                }
                if (!match && searchScopes.artist && song.artist.toLowerCase().includes(lowerCaseSearchTerm)) {
                    match = true;
                }
                if (!match && searchScopes.lyrics && song.lyrics && song.lyrics.toLowerCase().includes(lowerCaseSearchTerm)) {
                    match = true;
                }
                return match;
            });
        }

        if (selectedStatusTag !== 'すべて') {
            filtered = filtered.filter(song => song.notes.includes(selectedStatusTag));
        }

        const sorted = [...filtered].sort((a, b) => {
            let comparison = 0;

            if (sortState.key === 'date') {
                comparison = sortState.direction === 'desc'
                    ? b.latestPerformanceTime - a.latestPerformanceTime
                    : a.latestPerformanceTime - b.latestPerformanceTime;
            } else if (sortState.key === 'songName') {
                // --- 关键：使用 'ja' locale 进行日文排序 ---
                comparison = sortState.direction === 'asc'
                    ? a.songName.localeCompare(b.songName, 'ja') // 指定日文 locale
                    : b.songName.localeCompare(a.songName, 'ja'); // 指定日文 locale
            } else if (sortState.key === 'artist') {
                // --- 关键：使用 'ja' locale 进行日文排序 ---
                comparison = sortState.direction === 'asc'
                    ? a.artist.localeCompare(b.artist, 'ja') // 指定日文 locale
                    : b.artist.localeCompare(a.artist, 'ja'); // 指定日文 locale
            } else if (sortState.key === 'performanceCount') {
                comparison = sortState.direction === 'desc'
                    ? b.performanceCount - a.performanceCount
                    : a.performanceCount - b.performanceCount;
            }

            if (comparison === 0) {
                return sortState.direction === 'desc'
                    ? b.latestPerformanceTime - a.latestPerformanceTime
                    : a.latestPerformanceTime - b.latestPerformanceTime;
            }
            return comparison;
        });

        setActivePage(1);

        return sorted;
    }, [processedSongs, searchTerm, selectedStatusTag, sortState, searchScopes]);

    const totalPages = Math.ceil(filteredAndSortedSongs.length / parseInt(itemsPerPage === 'すべて' ? filteredAndSortedSongs.length.toString() : itemsPerPage));
    const paginatedSongs = useMemo(() => {
        if (itemsPerPage === 'すべて') {
            return filteredAndSortedSongs;
        }
        const startIndex = (activePage - 1) * parseInt(itemsPerPage);
        const endIndex = startIndex + parseInt(itemsPerPage);
        return filteredAndSortedSongs.slice(startIndex, endIndex);
    }, [activePage, itemsPerPage, filteredAndSortedSongs]);

    const rows = paginatedSongs.map((song) => {
        const performanceBadges = song.performances
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map((perf, index) => (
                <Tooltip key={index} label={dayjs(perf.date).format('YYYY年MM月DD日')} withArrow>
                    <Badge
                        component={Link}
                        href={perf.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="YouTube動画へ"
                        variant="filled"
                        color="red"
                        leftSection={<IconBrandYoutube size={12} />}
                        size="sm"
                        style={{ cursor: 'pointer' }}
                    >
                        {dayjs(perf.date).format('YY-MM-DD')}
                    </Badge>
                </Tooltip>
            ));

        const songNoteBadges = song.notes.map((note, index) => {
            const tagInfo = allAvailableTags.find(tag => tag.name === note);
            const badgeColor = tagInfo ? tagInfo.color : 'gray';

            return (
                <Badge key={index} variant="filled" color={badgeColor} size="sm">
                    {note}
                </Badge>
            );
        });

        return (
            <Table.Tr key={song.id}>
                <Table.Td>
                    <Text lineClamp={2}> {/* 限制最多显示2行，超出部分显示省略号 */}
                        {highlightText(song.songName, searchScopes.songName ? searchTerm : '')}
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Text lineClamp={2}>
                        {highlightText(song.artist, searchScopes.artist ? searchTerm : '')}
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Group gap="xs" wrap="wrap">
                        {performanceBadges}
                    </Group>
                </Table.Td>
                <Table.Td>{song.performanceCount}</Table.Td>
                <Table.Td>
                    <Text size="sm" c="dimmed" style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {highlightText(song.lyrics || '歌詞なし', searchScopes.lyrics ? searchTerm : '')}
                    </Text>
                </Table.Td>
                <Table.Td>
                    <Group gap="xs">
                        {songNoteBadges}
                    </Group>
                </Table.Td>
            </Table.Tr>
        );
    });

    const renderSortIcon = (key: SortKey) => {
        if (sortState.key === key) {
            return sortState.direction === 'asc' ? <IconSortAscending size={16} /> : <IconSortDescending size={16} />;
        }
        return null;
    };
    return (
        <Box style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            {/* 标题和副标题区域保持不变 */}
            <Flex justify="space-between" align="flex-start" mb="lg" wrap="wrap">
                <Box style={{ flexGrow: 1, minWidth: '300px' }}>
                    <Title ta="left" order={1} mb="md">
                        黒井獅音 歌枠セットリスト記録
                    </Title>
                    <Text ta="left" size="lg" mb="xl" c="dimmed">
                        獅音くんが歌枠配信で歌った曲・まだ歌っていない曲を記録しています。（2025年6月6日までの配信を収録済み）
                    </Text>
                </Box>
                <Group gap="md">
                    <Anchor href="https://youtube.com/playlist?list=PLp9HYYgYosViGuf0aT7zQsyt9pI5q71F6" target="_blank" rel="noopener noreferrer" title="獅音さんの歌枠リンク">
                        <Group gap={4}>
                            <IconBrandYoutube size={24} /> <Text size="m">歌枠リンク</Text>
                        </Group>
                    </Anchor>
                    <Anchor href="https://www.youtube.com/@kuroishion" target="_blank" rel="noopener noreferrer" title="獅音さんのYoutube">
                        <Group gap={4}>
                            <IconBrandYoutube size={24} /> <Text size="m">黒井獅音</Text>
                        </Group>
                    </Anchor>
                    <Anchor href="https://x.com/kuroi_shion" target="_blank" rel="noopener noreferrer" title="獅音さんのX (Twitter)">
                        <Group gap={4}>
                            <IconBrandX size={24} /> <Text size="m">黒井獅音</Text>
                        </Group>
                    </Anchor>
                </Group>
            </Flex>

            {/* 搜索和筛选区域保持不变 */}
            <Flex gap="md" wrap="wrap" mb="lg" align="flex-end" justify="space-between">
                <TextInput
                    placeholder="キーワードを入力して検索"
                    leftSection={<IconSearch size={16} />}
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.currentTarget.value)}
                    rightSection={
                        searchTerm && (
                            <ActionIcon onClick={() => setSearchTerm('')} variant="subtle" color="gray">
                                <IconX size={16} />
                            </ActionIcon>
                        )
                    }
                    style={{ flexGrow: 1, minWidth: '200px' }}
                />

                <Box style={{ flexGrow: 1, minWidth: '180px' }}>
                    <Text size="sm" fw={500} mb="xs">検索範囲</Text>
                    <Group gap="sm">
                        <Checkbox
                            label="曲名"
                            checked={searchScopes.songName}
                            onChange={({ currentTarget }) => setSearchScopes(prev => ({ ...prev, songName: currentTarget.checked }))}
                        />
                        <Checkbox
                            label="アーティスト"
                            checked={searchScopes.artist}
                            onChange={({ currentTarget }) => setSearchScopes(prev => ({ ...prev, artist: currentTarget.checked }))}
                        />
                        <Checkbox
                            label="歌詞"
                            checked={searchScopes.lyrics}
                            onChange={({ currentTarget }) => setSearchScopes(prev => ({ ...prev, lyrics: currentTarget.checked }))}
                        />
                    </Group>
                </Box>

                {statusTags.length > 0 && (
                    <Box style={{ minWidth: '150px' }}>
                        <Text size="sm" fw={500} mb="xs">歌唱状況</Text>
                        <SegmentedControl
                            data={statusTags}
                            value={selectedStatusTag}
                            onChange={setSelectedStatusTag}
                            fullWidth
                            color="violet"
                        />
                    </Box>
                )}
            </Flex>

            {/* --- 关键修改：始终显示表格，但条件渲染 tbody 和分页/统计 --- */}
            <ScrollArea
                h="auto"
                type="always"
                style={{ flexGrow: 1 }}
            >
                <Table stickyHeader striped highlightOnHover withTableBorder withColumnBorders style={{ tableLayout: 'fixed' }}>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th style={{ width: '20%' }}>
                                <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => handleSort('songName')}>
                                    曲名 {renderSortIcon('songName')}
                                </Group>
                            </Table.Th>
                            <Table.Th style={{ width: '15%' }}>
                                <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => handleSort('artist')}>
                                    アーティスト {renderSortIcon('artist')}
                                </Group>
                            </Table.Th>
                            <Table.Th style={{ width: '24%' }}>
                                <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => handleSort('date')}>
                                    該当配信 {renderSortIcon('date')}
                                </Group>
                            </Table.Th>
                            <Table.Th style={{ width: '6%' }}>
                                <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => handleSort('performanceCount')}>
                                    回数 {renderSortIcon('performanceCount')}
                                </Group>
                            </Table.Th>
                            <Table.Th style={{ width: '20%' }}>歌詞</Table.Th>
                            <Table.Th style={{ width: '15%' }}>備考</Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    {/* 只在有数据时渲染 Table.Tbody */}
                    {filteredAndSortedSongs.length > 0 && (
                        <Table.Tbody>{rows}</Table.Tbody>
                    )}
                </Table>

                {/* 如果没有找到歌曲，在表格下方显示提示 */}
                {filteredAndSortedSongs.length === 0 && (
                    <Text ta="center" c="dimmed" py="xl" style={{ borderTop: '1px solid var(--mantine-color-gray-2)' }}>
                        条件に合う曲は見つかりませんでした。
                    </Text>
                )}
            </ScrollArea>

            {/* 只有在有歌曲时才显示分页和记录计数 */}
            {filteredAndSortedSongs.length > 0 && (
                <Flex justify="space-between" align="center" mt="md" wrap="wrap">
                    <Text size="sm" c="dimmed">
                        {filteredAndSortedSongs.length}件のレコードを表示中
                    </Text>

                    <Group gap="sm">
                        <SegmentedControl
                            data={['10', '20', '50', 'すべて']}
                            value={itemsPerPage}
                            onChange={(value) => {
                                setItemsPerPage(value);
                                setActivePage(1);
                            }}
                            size="sm"
                        />
                        {itemsPerPage !== 'すべて' && (
                            <Pagination
                                total={totalPages}
                                value={activePage}
                                onChange={setActivePage}
                                siblings={1}
                                boundaries={1}
                            />
                        )}
                    </Group>
                </Flex>
            )}
        </Box>
    );
}