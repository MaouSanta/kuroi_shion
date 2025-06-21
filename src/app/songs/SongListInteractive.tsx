// src/app/songs/SongListInteractive.tsx
'use client';

import { Song, Performance } from '@/types/song';
import { Tag } from '@/types/tag';
import {
    Table, TextInput, Badge, Group, Box, Flex, ScrollArea, SegmentedControl,
    ActionIcon, Anchor, Pagination, Text, Tooltip, Checkbox // 导入 Checkbox
} from '@mantine/core';
import {
    IconSearch, IconX, IconLink,
    IconSortAscending, IconSortDescending, // Table Header 排序图标
} from '@tabler/icons-react';
import { useState, useMemo, Fragment } from 'react'; // 导入 Fragment 用于高亮
import dayjs from 'dayjs';

// 导入 dayjs 插件
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

import Link from 'next/link';

interface SongListInteractiveProps {
    clientSongs: Song[];
    allAvailableTags: Tag[];
}

// 定义排序状态的类型
type SortKey = 'date' | 'songName' | 'artist';
type SortState = {
    key: SortKey | null; // 当前排序的键
    direction: 'asc' | 'desc'; // 排序方向
};

export function SongListInteractive({ clientSongs, allAvailableTags }: SongListInteractiveProps) {
    // --- 状态管理 ---
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatusTag, setSelectedStatusTag] = useState('所有');
    const [sortState, setSortState] = useState<SortState>({ key: 'date', direction: 'desc' }); // 默认按时间倒序

    // 搜索范围复选框状态
    const [searchScopes, setSearchScopes] = useState({
        songName: true, // 默认在歌名中搜索
        artist: true,   // 默认在歌手中搜索
        lyrics: false   // 默认不在歌词中搜索
    });

    // --- 分页状态 ---
    const [activePage, setActivePage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState<string>('10');

    // --- 数据处理（Memoized 计算）---

    // 提取所有存在歌曲的日期，用于日历标记
    const songDates = useMemo(() => {
        const dates = new Set<string>();
        clientSongs.forEach(song => {
            song.performances.forEach(perf => dates.add(dayjs(perf.date).format('YYYY-MM-DD')));
        });
        return dates;
    }, [clientSongs]);

    // 分离出状态标签
    const statusTags = useMemo(() => allAvailableTags.filter(tag => tag.name === '所有' || tag.isStatusTag), [allAvailableTags]); // 确保 '所有' 选项存在

    // 处理排序点击事件
    const handleSort = (key: SortKey) => {
        setSortState(prev => {
            if (prev.key === key) {
                // 如果是同一个键，切换排序方向
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                // 如果是不同的键，默认为倒序
                return { key, direction: 'desc' };
            }
        });
    };

    // 搜索关键词高亮函数
    const highlightText = (text: string, highlight: string) => {
        if (!text || !highlight.trim()) { // 增加对 text 为 null/undefined 的处理
            return <>{text}</>;
        }
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <>
                {parts.map((part, i) => (
                    <Fragment key={i}>
                        {part.toLowerCase() === highlight.toLowerCase() ? (
                            // 仅改颜色和 subtle text shadow，避免字体粗细影响布局
                            <Text span c="orange" style={{ textShadow: '0 0 0.5px orange' }}>{part}</Text>
                        ) : (
                            part
                        )}
                    </Fragment>
                ))}
            </>
        );
    };

    // 过滤并排序歌曲
    const filteredAndSortedSongs = useMemo(() => {
        let filtered = clientSongs;

        // 搜索词过滤
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

        // 状态标签过滤
        if (selectedStatusTag !== '所有') {
            filtered = filtered.filter(song => song.notes.includes(selectedStatusTag));
        }

        // 排序
        const sorted = [...filtered].sort((a, b) => {
            if (sortState.key === 'date') {
                const latestDateA = a.performances.reduce((maxDate, perf) => Math.max(maxDate, new Date(perf.date).getTime()), 0);
                const latestDateB = b.performances.reduce((maxDate, perf) => Math.max(maxDate, new Date(perf.date).getTime()), 0);
                return sortState.direction === 'desc' ? latestDateB - latestDateA : latestDateA - latestDateB;
            } else if (sortState.key === 'songName') {
                return sortState.direction === 'asc'
                    ? a.songName.localeCompare(b.songName)
                    : b.songName.localeCompare(a.songName);
            } else if (sortState.key === 'artist') {
                return sortState.direction === 'asc'
                    ? a.artist.localeCompare(b.artist)
                    : b.artist.localeCompare(a.artist);
            }
            return 0; // 默认不排序
        });

        // 当过滤或排序条件改变时，重置页码到第一页
        setActivePage(1);

        return sorted;
    }, [clientSongs, searchTerm, selectedStatusTag, sortState, searchScopes]); // 依赖项更新

    // --- 分页逻辑 ---
    const totalPages = Math.ceil(filteredAndSortedSongs.length / parseInt(itemsPerPage === '所有' ? filteredAndSortedSongs.length.toString() : itemsPerPage));
    const paginatedSongs = useMemo(() => {
        if (itemsPerPage === '所有') {
            return filteredAndSortedSongs;
        }
        const startIndex = (activePage - 1) * parseInt(itemsPerPage);
        const endIndex = startIndex + parseInt(itemsPerPage);
        return filteredAndSortedSongs.slice(startIndex, endIndex);
    }, [activePage, itemsPerPage, filteredAndSortedSongs]);


    // --- 表格行渲染 ---
    const rows = paginatedSongs.map((song) => {
        // 渲染表演记录的 Badge 列表
        const performanceBadges = song.performances
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // 内部按日期倒序
            .map((perf, index) => (
                <Tooltip key={index} label={dayjs(perf.date).format('YYYY年MM月DD日')} withArrow>
                    <Anchor component={Link} href={perf.youtubeLink} target="_blank" rel="noopener noreferrer" title="跳转到 YouTube 视频">
                        <Badge
                            variant="filled"
                            color="red" // YouTube 红色
                            leftSection={<IconLink size={12} />} // 小链接图标
                            size="sm"
                        >
                            {dayjs(perf.date).format('MM-DD')} {/* 只显示月-日 */}
                        </Badge>
                    </Anchor>
                </Tooltip>
            ));

        // 获取当前歌曲的 notes 中对应的 Tag 颜色
        const songNoteBadges = song.notes.map((note, index) => {
            const tagInfo = allAvailableTags.find(tag => tag.name === note);
            const badgeColor = tagInfo ? tagInfo.color : 'gray'; // 默认颜色为 gray

            return (
                <Badge key={index} variant="filled" color={badgeColor} size="sm">
                    {note}
                </Badge>
            );
        });

        return (
            <Table.Tr key={song.id}>
                <Table.Td>
                    {/* 使用 Box 代替 Group 来包裹歌名和图标，避免布局问题 */}
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, minWidth: 0 }}>
                        <Box style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {highlightText(song.songName, searchScopes.songName ? searchTerm : '')} {/* 高亮歌名 */}
                        </Box>
                    </Box>
                </Table.Td>
                <Table.Td>
                    <Box style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {highlightText(song.artist, searchScopes.artist ? searchTerm : '')} {/* 高亮歌手 */}
                    </Box>
                </Table.Td>
                <Table.Td>
                    <Group gap="xs" wrap="wrap"> {/* 包裹，允许换行 */}
                        {performanceBadges}
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Text size="sm" c="dimmed" style={{ maxHeight: '60px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                        {highlightText(song.lyrics || '暂无歌词', searchScopes.lyrics ? searchTerm : '')} {/* 高亮歌词 */}
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

    // 渲染表头中的排序图标
    const renderSortIcon = (key: SortKey) => {
        if (sortState.key === key) {
            return sortState.direction === 'asc' ? <IconSortAscending size={16} /> : <IconSortDescending size={16} />;
        }
        return null;
    };

    return (
        <Box>
            {/* --- 筛选和排序区域 --- */}
            <Flex gap="md" wrap="wrap" mb="lg" align="flex-end" justify="space-between">
                {/* 搜索歌名或歌手 */}
                <TextInput
                    placeholder="输入关键词搜索" // 更新提示文本
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

                {/* 搜索范围复选框 */}
                <Box style={{ flexGrow: 1, minWidth: '180px' }}>
                    <Text size="sm" fw={500} mb="xs">搜索范围</Text>
                    <Group gap="sm">
                        <Checkbox
                            label="歌名"
                            checked={searchScopes.songName}
                            onChange={({ currentTarget }) => setSearchScopes(prev => ({ ...prev, songName: currentTarget.checked }))}
                        />
                        <Checkbox
                            label="歌手"
                            checked={searchScopes.artist}
                            onChange={({ currentTarget }) => setSearchScopes(prev => ({ ...prev, artist: currentTarget.checked }))}
                        />
                        <Checkbox
                            label="歌词"
                            checked={searchScopes.lyrics}
                            onChange={({ currentTarget }) => setSearchScopes(prev => ({ ...prev, lyrics: currentTarget.checked }))}
                        />
                    </Group>
                </Box>


                {/* 状态标签筛选 SegmentedControl */}
                {statusTags.length > 0 && (
                    <Box style={{ minWidth: '150px' }}>
                        <Text size="sm" fw={500} mb="xs">演唱状态</Text>
                        <SegmentedControl
                            data={['所有', ...statusTags.filter(t => t.name !== '所有').map(tag => tag.name)]} // 过滤掉allAvailableTags中的'所有'
                            value={selectedStatusTag}
                            onChange={setSelectedStatusTag}
                            fullWidth
                            color="violet"
                        />
                    </Box>
                )}
            </Flex>

            {/* --- 表格显示区域 --- */}
            {filteredAndSortedSongs.length > 0 ? (
                <>
                    <ScrollArea h={400} type="always">
                        <Table stickyHeader striped highlightOnHover withTableBorder withColumnBorders style={{ tableLayout: 'fixed' }}>
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th style={{ width: '25%' }}>
                                        <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => handleSort('songName')}>
                                            歌名 {renderSortIcon('songName')}
                                        </Group>
                                    </Table.Th>
                                    <Table.Th style={{ width: '20%' }}>
                                        <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => handleSort('artist')}>
                                            歌手 {renderSortIcon('artist')}
                                        </Group>
                                    </Table.Th>
                                    <Table.Th style={{ width: '20%' }}>
                                        <Group gap="xs" style={{ cursor: 'pointer' }} onClick={() => handleSort('date')}>
                                            表演记录 {renderSortIcon('date')}
                                        </Group>
                                    </Table.Th>
                                    <Table.Th style={{ width: '20%' }}>歌词</Table.Th>
                                    <Table.Th style={{ width: '15%' }}>备注</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{rows}</Table.Tbody>
                        </Table>
                    </ScrollArea>

                    {/* --- 分页和每页数量选择 --- */}
                    <Flex justify="space-between" align="center" mt="md" wrap="wrap">
                        {/* 统计信息，紧贴表格底部 */}
                        <Text size="sm" c="dimmed">
                            显示 {filteredAndSortedSongs.length} 条记录
                        </Text>

                        <Group gap="sm">
                            <SegmentedControl
                                data={['10', '20', '50', '所有']}
                                value={itemsPerPage}
                                onChange={(value) => {
                                    setItemsPerPage(value);
                                    setActivePage(1);
                                }}
                                size="sm"
                            />
                            {itemsPerPage !== '所有' && (
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
                </>
            ) : (
                <Text ta="center" c="dimmed" py="xl">
                    没有找到符合条件的歌曲。
                </Text>
            )}
        </Box>
    );
}