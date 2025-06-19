// src/app/clock/page.tsx
'use client'; // 这是一个客户端组件，因为它使用了 useState/useEffect

import { useState, useEffect } from 'react';
import { Title, Text, Container, Center, Button } from '@mantine/core';
import Link from 'next/link';

export default function ClockPage() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId); // 清理函数
    }, []);

    return (
        <Container size="xs" py="xl">
            <Center style={{ flexDirection: 'column' }}>
                <Title order={1} mb="md">实时时钟</Title>
                <Text size="xl" fw={700} style={{ fontFamily: 'monospace' }}>
                    {time.toLocaleTimeString()}
                </Text>
                <Button component={Link} href="/" variant="light" mt="xl">
                    返回主页
                </Button>
            </Center>
        </Container>
    );
}