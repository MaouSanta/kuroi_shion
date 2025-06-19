import { Title, Text, Button, Container, Card, SimpleGrid } from '@mantine/core';
import { Link } from '@remix-run/react';

export default function Index() {
    return (
        <Container size="md" py="xl">
            <Title order={1} align="center" mb="lg">
                欢迎来到我的技术博客！
            </Title>

            <Text size="lg" align="center" mb="xl">
                在这里，我将分享我的技术探索、学习笔记和一些有趣的个人项目。
            </Text>

            {/* 您可以添加更多内容，比如关于我、联系方式等 */}
            <Text align="center" mt="xl">
                由 Remix, Mantine 和 TypeScript 驱动 🎉
            </Text>
        </Container>
    );
}