import { ActionIcon, Box, Button, Container, Divider, Grid, Group, Paper, Portal, Stack, Text, ThemeIcon, Title, Tooltip, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useElementSize, useIntersection, useWindowScroll } from '@mantine/hooks';
import { IconSun, IconMoonStars } from '@tabler/icons';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';


export default function Homepage() {
    return <Container maw={800}>
        <Box sx={{}}>
            <Navbar />
            <Stack spacing={'md'} pb={200}>
                <Sample />
                <Divider />
                <Sample />
                <Divider />
                <Sample />
                <Divider />
            </Stack>
        </Box>
    </Container>
}


function Navbar() {
    const containerRef = useRef();
    const [scroll] = useWindowScroll();
    const { ref: sizeRef, height, width } = useElementSize();
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    })
    const offset = 200;
    const isVisible = entry?.isIntersecting === undefined ? true : entry?.isIntersecting;

    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const [isReady, setIsReady] = useState(false);
    const router = useRouter();
    useEffect(() => {
        if (!isReady && router.isReady) {
            setTimeout(() => {
                setIsReady(true);
            }, 10)
        }
    }, [router.isReady])

    return <Box mb={70}>
        <Box mt={offset} ref={sizeRef}>
            <Title>Chris Seitz</Title>
            <div ref={ref} />
            <Box sx={{
                transition: isReady ? 'width 0.1s, margin-left 0.1s' : undefined,
                position: isVisible ? 'absolute' : 'fixed',
                marginTop: isVisible ? undefined : -Math.min(offset + height, scroll.y),
                width: width + (16 * (!isVisible ? 2 : 0)),
                marginLeft: -16 * (!isVisible ? 1 : 0),
                overflow: !isReady ? 'hidden' : undefined,
            }}>
                <Paper sx={{ transition: isReady ? 'all 0.1s, background-color 0s, border-color 0s' : 'opacity 0.1s', opacity: isReady ? 1 : 0 }} mt={isVisible ? 'lg' : 'lg'} withBorder={!isVisible} p={!isVisible ? 'sm' : undefined}>
                    <Box sx={{
                        transition: isReady ? 'all 0.1s' : undefined,
                        opacity: isVisible ? 0 : 0.8,
                        position: 'fixed',
                        borderTop: `${height + 30}px solid ${dark ? theme.colors['dark'][7] : 'white'}`,
                        backgroundImage: theme.fn.gradient({
                            from: dark ? theme.colors['dark'][7] : 'white',
                            to: 'rgba(0, 0, 0, 0)',
                            deg: 180,
                        }),
                        top: 0,
                        height: height + 50 + 70,
                        width: '100vw',
                        left: 0,
                        zIndex: -1,

                    }} />
                    <Grid sx={{ height: '100%' }} align={'center'}>
                        <Grid.Col span={8} sx={{}}>
                            <Group>
                                <Button variant='subtle'>Home</Button>
                                <Button variant='subtle'>Portfolio</Button>
                            </Group>
                        </Grid.Col>
                        <Grid.Col span={4} sx={{ height: '100%' }}>
                            <Group sx={{ justifyContent: 'right', height: '100%' }} align={'center'}>
                                <Tooltip label={`Switch to ${dark ? 'Light' : 'Dark'} mode`}>
                                    <ActionIcon
                                        variant="subtle"
                                        // color={dark ? 'blue' : 'blue'}
                                        onClick={() => toggleColorScheme()}
                                        title="Toggle color scheme"
                                    >
                                        {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                                    </ActionIcon>
                                </Tooltip>
                            </Group>
                        </Grid.Col>
                    </Grid>

                </Paper>
            </Box>
            {/* <Box sx={{ transition: 'width 0.1s, margin-left 0.1s', position: 'fixed', marginTop: -Math.min(offset + height, scroll.y), width: width + (16 * (!isVisible ? 2 : 0)), marginLeft: -16 * (!isVisible ? 1 : 0) }}>
                <Paper sx={{ transition: 'all 0.1s' }} mt={isVisible ? 'lg' : 'lg'} withBorder={!isVisible} p={!isVisible ? 'sm' : undefined}>
                    <Group>
                        <Button variant='subtle'>Home</Button>
                        <Button variant='subtle'>Portfolio</Button>
                    </Group>
                </Paper>
            </Box> */}
        </Box>
    </Box>
}


function Sample() {
    return <Box>
        <Title order={3}>Charizard (Pokémon)</Title>
        <Text c='dimmed' pb={'md'}>Charizard description from Bulbapedia</Text>
        <Text pb={'md'}>Charizard is a draconic, bipedal Pokémon. It is primarily orange with a cream underside from the chest to the tip of its tail. It has a long neck, small blue eyes, slightly raised nostrils, and two horn-like structures protruding from the back of its rectangular head. There are two fangs visible in the upper jaw when its mouth is closed. Two large wings with blue-green undersides sprout from its back, and a horn-like appendage juts out from the top of the third joint of each wing. A single wing-finger is visible through the center of each wing membrane. Charizard&apos;s arms are short and skinny compared to its robust belly, and each limb has three white claws. It has stocky legs with cream-colored soles on each of its plantigrade feet. The tip of its long, tapering tail burns with a sizable flame.</Text>
        <Text>As Mega Charizard X, its body and legs are more physically fit, though its arms remain thin. Its skin turns black with a sky-blue underside and soles. Two spikes with blue tips curve upward from the front and back of each shoulder, while the tips of its horns sharpen, turn blue, and curve slightly upward. Its brow and claws are larger, and its eyes are now red. It has two small, fin-like spikes under each horn and two more down its lower neck. The finger disappears from the wing membrane, and the lower edges are divided into large, rounded points. The third joint of each wing-arm is adorned with a claw-like spike. Mega Charizard X breathes blue flames out the sides of its mouth, and the flame on its tail now burns blue. It is said that its new power turns it black and creates more intense flames.</Text>
    </Box>
}