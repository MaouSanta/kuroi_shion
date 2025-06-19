import { useState, useEffect } from 'react';
import { Title, Text, Container, Center, Button } from '@mantine/core';
import { Link } from '@remix-run/react';

export default function BlogPage() {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);

    return (
        <Container size="xs" py="xl">
            <Center style={{ flexDirection: 'column' }}>
                <Title order={1} mb="md">实时时钟</Title>
                <Text size="xl" weight={700} style={{ fontFamily: 'monospace' }}>
                    {time.toLocaleTimeString()}
                </Text>
                <Button component={Link} to="/" variant="light" mt="xl">
                    返回主页
                </Button>
            </Center>
        </Container>
    );
}