import { ActionIcon, Affix, Alert, Box, Button, Container, Divider, Flex, Grid, Group, Paper, Portal, Stack, Text, ThemeIcon, Title, Tooltip, Transition, useMantineColorScheme, useMantineTheme } from '@mantine/core';
import { useColorScheme, useElementSize, useIntersection, useMediaQuery, useWindowScroll } from '@mantine/hooks';
import { IconSun, IconMoonStars } from '@tabler/icons';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { faGithub } from '@cseitz/icons-brands';
import { faLinkedinIn } from '@cseitz/icons-brands';
import { faEnvelope } from '@cseitz/icons-regular/envelope';
import { faArrowUp } from '@cseitz/icons-regular/arrow-up';
import { Icon } from '@cseitz/icons';
import Link from 'next/link';
import { IconAlertCircle } from '@tabler/icons';

const GithubIcon = Icon(faGithub);
const LinkedInIcon = Icon(faLinkedinIn);
const MailIcon = Icon(faEnvelope);
const ArrowUpIcon = Icon(faArrowUp);

/** Shorthand for `check ? value : undefined`
 * - Used frequently when the JSX default value is desired unless a specific condition is met.
 * - Avoids frequent retyping of `: undefined` in dozens of conditionals in JSX properties.
 * ```tsx
 * <Element padding={isMobile ? 20 : undefined} color={darkMode ? 'red' : undefined} />
 * <Element padding={onlyif(isMobile, 20)} color={onlyIf(darkmode, 'red')} />
 * ```
 */
function onlyIf<T>(check: boolean, value: T) {
    if (check) return value;
    return undefined;
}

const links = [
    {
        label: 'Github',
        icon: GithubIcon,
        href: 'https://github.com/cseitz',
    },
    {
        label: 'LinkedIn',
        icon: LinkedInIcon,
        href: 'https://linkedin.com/in/seitzc',
    },
    {
        label: 'cseitz.work@gmail.com',
        icon: MailIcon,
        href: 'mailto:cseitz.work@gmail.com',
    },
]

export default function Homepage() {
    const width = 800;
    const theme = useMantineTheme();
    const dark = theme.colorScheme === 'dark';
    const isMobile = useMediaQuery(`(max-width: ${width}px)`);

    return <Container maw={width}>
        <Box sx={{}}>
            <Head>
                <title>Chris Seitz</title>
            </Head>
            <Header>
                <HiringBanner />
                <Grid>
                    <Grid.Col span={isMobile ? 12 : 7} sx={{ textAlign: isMobile ? 'center' : 'left' }}>
                        <Title>Chris Seitz</Title>
                        <Title order={isMobile ? 4 : 3} fw={'lighter'}>Full-Stack TypeScript & React Developer</Title>
                    </Grid.Col>
                    <Grid.Col span={isMobile ? 12 : 5} sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'right', alignItems: 'center' }}>
                        {/* <ABanner /> */}
                        <Group sx={{ justifyContent: isMobile ? 'center' : 'right' }} maw={onlyIf(isMobile, '60vw')} spacing={'0.5em' as any}>
                            {links.map(({ icon: Icon, label, href }) => (
                                <Tooltip label={href} key={href}>
                                    <Link href={href} target='_blank' style={{ color: 'inherit' }}>
                                        <Button size='sm' variant={dark ? 'default' : 'subtle'} sx={{
                                            border: 0,
                                            color: dark ? 'white' : 'black', //onlyIf(dark, 'white'), 
                                            backgroundColor: onlyIf(!dark, theme.colors.gray[0])
                                        }} leftIcon={<Icon color={onlyIf(!dark, 'black')} />}>
                                            {label}
                                        </Button>
                                    </Link>
                                </Tooltip>
                            ))}
                        </Group>
                    </Grid.Col>
                </Grid>

            </Header>
            {/* <Box py={'xl'}>
                <Divider />
            </Box>
            <Stack spacing={'md'} pb={200}>

            </Stack> */}
            <Stack spacing={'md'} pb={200}>
                <Sample />
                <Divider />
                <Sample />
                <Divider />
                <Sample />
                <Divider />
            </Stack>
            {/* <HiringBanner /> */}
        </Box>
    </Container>
}


function ScrollUp(props: { visible: boolean }) {
    const theme = useMantineTheme();
    const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
    const [scroll, scrollTo] = useWindowScroll();

    const scrollToTop = () => {
        scrollTo({ x: 0, y: 0 })
    }

    return <Affix position={{ bottom: '1em', right: '1em' }}>
        <Transition transition={'slide-up'} mounted={props.visible}>
            {(transitionStyles) => (
                <Tooltip label="Scroll to Top" position='left'>
                    <Button style={transitionStyles} variant={isMobile ? 'default' : 'subtle'} onClick={scrollToTop}>
                        <ArrowUpIcon />
                    </Button>
                </Tooltip>
            )}
        </Transition>
    </Affix>
}


function Header(props: { children: any }) {
    const containerRef = useRef();
    const [scroll] = useWindowScroll();
    const { ref: sizeRef, height, width } = useElementSize();
    const { ref, entry } = useIntersection({
        root: containerRef.current,
        threshold: 1,
    })

    const isMobile = useMediaQuery(`(max-width: ${width + 100}px)`);
    const isVisible = entry?.isIntersecting === undefined ? true : entry?.isIntersecting;
    const offset = isMobile ? 40 : 200;

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
            {props.children}
            <div ref={ref} />
            <ScrollUp visible={!isVisible} />
            <Box sx={{
                transition: onlyIf(isReady, 'width 0.1s, margin-left 0.1s'),
                position: isVisible ? 'absolute' : 'fixed',
                marginTop: onlyIf(!isVisible, -Math.min(offset + height, scroll.y)),
                width: isMobile ? width : (width + (16 * (!isVisible ? 2 : 0))),
                marginLeft: onlyIf(!isMobile, (-16 * (!isVisible ? 1 : 0))),
                overflow: onlyIf(!isReady, 'hidden'),
            }}>
                <Paper sx={{ transition: isReady ? 'all 0.1s, background-color 0s, border-color 0s' : 'opacity 0.1s', opacity: isReady ? 1 : 0 }}
                    mt={isMobile ? '2em' : 'xl'} withBorder={!isVisible} p={onlyIf(!isVisible, 'sm')}>
                    <Box sx={{
                        transition: onlyIf(isReady, 'all 0.1s'),
                        opacity: isVisible ? 0 : 0.8,
                        position: 'fixed',
                        borderTop: `${isMobile ? 30 : 60}px solid ${dark ? theme.colors['dark'][7] : 'white'}`,
                        backgroundImage: theme.fn.gradient({
                            from: dark ? theme.colors['dark'][7] : 'white',
                            to: 'rgba(0, 0, 0, 0)',
                            deg: 180,
                        }),
                        top: 0,
                        // height: height + (isMobile ? -80 : 50 + 70),
                        height: height + 50 + 70,
                        width: '100vw',
                        left: 0,
                        zIndex: -1,

                    }} />
                    <Grid sx={{ height: '100%' }} align={'center'}>
                        <Grid.Col span={8} sx={{}}>
                            <Group>
                                <Button variant='subtle'>Home</Button>
                                <Button variant='subtle'>Resume</Button>
                                <Button variant='subtle'>Portfolio</Button>
                                <Button variant='subtle'>Blog</Button>
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


function HiringBanner() {
    const theme = useMantineTheme();
    const dark = useMantineColorScheme().colorScheme === 'dark';
    const isMobile = useMediaQuery(`(max-width: ${800}px)`);

    return <Box py={'xl'}>
        <Alert color='teal' title='Open to work!' variant={dark ? 'light' : 'outline'} icon={<IconAlertCircle size={16} />}>
            <Text>If you&apos;re hiring, let me know!</Text>
        </Alert>
    </Box >
}

function ABanner() {
    const theme = useMantineTheme();
    const dark = useMantineColorScheme().colorScheme === 'dark';
    const isMobile = useMediaQuery(`(max-width: ${800}px)`);
    return <Paper withBorder sx={{ borderColor: theme.colors.teal[5] }}>
        <Grid>
            <Grid.Col span={1}>
                yeee
            </Grid.Col>
            <Grid.Col span='auto'>
                <Box p='xs' sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'right', alignItems: 'center' }}>
                    <Group sx={{ justifyContent: isMobile ? 'center' : 'right' }} maw={onlyIf(isMobile, '60vw')} spacing={'0.5em' as any}>
                        {links.map(({ icon: Icon, label, href }) => (
                            <Tooltip label={href} key={href}>
                                <Link href={href} target='_blank' style={{ color: 'inherit' }}>
                                    <Button size='sm' variant={dark ? 'default' : 'subtle'} sx={{
                                        border: 0,
                                        color: dark ? 'white' : 'black', //onlyIf(dark, 'white'), 
                                        backgroundColor: onlyIf(!dark, theme.colors.gray[0])
                                    }} leftIcon={<Icon color={onlyIf(!dark, 'black')} />}>
                                        {label}
                                    </Button>
                                </Link>
                            </Tooltip>
                        ))}
                    </Group>
                </Box>
            </Grid.Col>
        </Grid>
    </Paper>
}

function Sample() {
    return <Box>
        <Title order={3}>Charizard (Pokémon)</Title>
        <Text c='dimmed' pb={'md'}>Charizard description from Bulbapedia</Text>
        <Text pb={'md'}>Charizard is a draconic, bipedal Pokémon. It is primarily orange with a cream underside from the chest to the tip of its tail. It has a long neck, small blue eyes, slightly raised nostrils, and two horn-like structures protruding from the back of its rectangular head. There are two fangs visible in the upper jaw when its mouth is closed. Two large wings with blue-green undersides sprout from its back, and a horn-like appendage juts out from the top of the third joint of each wing. A single wing-finger is visible through the center of each wing membrane. Charizard&apos;s arms are short and skinny compared to its robust belly, and each limb has three white claws. It has stocky legs with cream-colored soles on each of its plantigrade feet. The tip of its long, tapering tail burns with a sizable flame.</Text>
        <Text>As Mega Charizard X, its body and legs are more physically fit, though its arms remain thin. Its skin turns black with a sky-blue underside and soles. Two spikes with blue tips curve upward from the front and back of each shoulder, while the tips of its horns sharpen, turn blue, and curve slightly upward. Its brow and claws are larger, and its eyes are now red. It has two small, fin-like spikes under each horn and two more down its lower neck. The finger disappears from the wing membrane, and the lower edges are divided into large, rounded points. The third joint of each wing-arm is adorned with a claw-like spike. Mega Charizard X breathes blue flames out the sides of its mouth, and the flame on its tail now burns blue. It is said that its new power turns it black and creates more intense flames.</Text>
    </Box>
}