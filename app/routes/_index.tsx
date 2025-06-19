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

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" mb="xl">
        {/* 博客文章链接示例 */}
        {/* <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="sm">最新文章：构建 Remix 静态博客</Title>
          <Text size="sm" color="dimmed" mb="md">
            这篇文章将详细记录我如何使用 Remix 和 Mantine 搭建这个博客的整个过程。
          </Text>
          <Button component={Link} to="/blog/build-remix-blog" variant="light" fullWidth radius="md">
            阅读文章
          </Button>
        </Card> */}

        {/* 词典页面链接示例 */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="sm">我的技术词典</Title>
          <Text size="sm" color="dimmed" mb="md">
            一个持续更新的技术词汇解释，帮助你理解复杂的概念。
          </Text>
          <Button component={Link} to="/dictionary" variant="light" fullWidth radius="md">
            前往词典
          </Button>
        </Card>

        {/* 时钟组件链接示例 (或者直接放在主页) */}
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Title order={3} mb="sm">有趣的组件：实时时钟</Title>
          <Text size="sm" color="dimmed" mb="md">
            一个简单但实用的实时时钟组件，展示了 React 的状态管理。
          </Text>
          <Button component={Link} to="/clock" variant="light" fullWidth radius="md">
            查看时钟
          </Button>
        </Card>
      </SimpleGrid>

      {/* 您可以添加更多内容，比如关于我、联系方式等 */}
      <Text align="center" mt="xl">
        由 Remix, Mantine 和 TypeScript 驱动 🎉
      </Text>
    </Container>
  );
}