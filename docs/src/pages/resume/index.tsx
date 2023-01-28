import GithubIcon from '@cseitz/fontawesome-react/github';
import PhoneIcon from '@cseitz/fontawesome-react/phone';
import HomeIcon from '@cseitz/fontawesome-react/house';
import LinkedInIcon from '@cseitz/fontawesome-react/linkedin';
import HandshakeIcon from '@cseitz/fontawesome-react/handshake';
import SquareIcon from '@cseitz/fontawesome-react/square';
import JavaScriptIcon from '@cseitz/fontawesome-react/js';
import _LinkIcon from '@cseitz/fontawesome-react/link';
import { Avatar, Box, BoxProps, Button, Divider, DividerProps, Grid, Group, List, Rating, Text, Title, useMantineTheme } from '@mantine/core';
import { isArray } from 'lodash';
import { Page } from '../../widgets/page';
import getConfig from 'next/config';
import { useElementSize } from '@mantine/hooks';
import { useLayoutEffect, useState } from 'react';

const website = 'https://github.com/cseitz'; //'https://cseitz.dev';
const portfolio = website + '/portfolio';

const textIndent = 0; //'0.5em';

const SHOW_LINKS = true;
// const DASH = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%2333333340' stroke-width='4' stroke-dasharray='8%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");`
const DASH = `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%2333333326' stroke-width='4' stroke-dasharray='8%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");`


const Dashed = () => <DashedDivider span={6} spacing={4} color='gray.2' />;


function LinkIcon(props: Parameters<typeof _LinkIcon>[0]) {
    const { sx = {}, ...rest } = props;
    return <sup>
        <_LinkIcon sx={{ fontSize: '0.75em', ...sx, opacity: '0.25', maxHeight: '1em' }} title="Interactive Link" {...rest} />
    </sup>
}

export default function Resume() {
    return <>
        <Page sx={{}}>
            <Header />
            <Body />
        </Page>
        {/* <Page>
            <Body />
        </Page> */}
    </>
}

function Header() {
    const name = 'Chris Seitz'; //'Kristina Seitz';
    const avatar = false; //'https://avatars.githubusercontent.com/u/54898870?v=4';
    const email = getConfig().publicRuntimeConfig.email as string;
    const phone = getConfig().publicRuntimeConfig.phone as string;
    const subtitle = 'Full-Stack Web Development';
    if (!phone || !email) {
        throw new Error(`Missing environment varaibles. Create .env.local and populate from next.config.mjs!`)
    }
    // const avatar = 'https://cdn.discordapp.com/attachments/590962507729076244/1062539263603920926/image.png';
    // const avatar = 'https://i.gyazo.com/c7a78de6b6bf9f6e3637fd67317a5af3.jpg';
    // const avatar = 'https://i.gyazo.com/633992008a6896a6166cace9854476dd.jpg';
    // const avatar = 'https://i.gyazo.com/508daa8002929e40e9e72aead4b39b98.jpg';
    // const avatar = 'https://cdn.discordapp.com/attachments/590962507729076244/1062543860850511922/image.png';
    // const avatar = 'https://img-9gag-fun.9cache.com/photo/aqnRGQP_460s.jpg';
    // const avatar = 'https://thispersondoesnotexist.com/image';
    // const avatar = 'https://media.tenor.com/nCfArwGenA0AAAAd/the-rock-raising-eyebrow.gif';

    return <Grid pb={15 + 15} mt={-30}>
        {avatar && <Grid.Col span={2} sx={{}}>
            <Avatar size={60} src={avatar} radius={100} mx='auto' sx={{
                transform: 'scale(150%)',
                boxShadow: `rgb(0 0 0 / 20%) 0px 4px 8px 0px`,
            }} />
        </Grid.Col>}
        <Grid.Col span={avatar ? 4 : 6}>
            <Title order={4} sx={{ fontWeight: 400, fontSize: '1.5rem' }}>
                <a style={{ textDecoration: 'none', color: 'inherit' }} href={website} target='_blank' rel="noreferrer">
                    {name}
                </a>
            </Title>
            <Title order={6} sx={{ fontWeight: 600, fontSize: '1rem' }}>
                <a style={{ textDecoration: 'none' }} href={'mailto:' + email} target='_blank' rel="noreferrer">
                    {email}
                </a>
            </Title>
            {/* <Text c="dimmed">{subtitle}</Text> */}
        </Grid.Col>
        <Grid.Col span={6} sx={{ textAlign: 'right', display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'flex-end' }}>
            <a href="https://www.google.com/maps/place/Cleveland,+OH/@41.497447,-81.8459438,11z/data=!3m1!4b1!4m5!3m4!1s0x8830ef2ee3686b2d:0xed04cb55f7621842!8m2!3d41.49932!4d-81.6943605" target='_blank' rel="noreferrer"
                style={{ margin: 0, paddingRight: 15, color: 'inherit', textDecoration: 'none' }}>
                <HomeIcon style='regular' sx={{ height: '1em', paddingRight: 8 }} />
                Cleveland, Ohio
            </a>
            <a href={`tel:+1-${phone.split(' ').join('-').split(/[()]/).join('')}`} style={{ margin: 0, color: 'inherit', textDecoration: 'none' }} target='_blank' rel="noreferrer">
                <PhoneIcon style='regular' sx={{ height: '1em', paddingRight: 8 }} />
                {phone}
            </a>
            <a href="https://github.com/cseitz" style={{ margin: 0, paddingRight: 15, color: 'inherit', textDecoration: 'none' }} target='_blank' rel="noreferrer">
                <GithubIcon sx={{ height: '1em', paddingRight: 8 }} />
                GitHub
            </a>
            <a href="https://www.linkedin.com/in/seitzc/" style={{ margin: 0, color: 'inherit', textDecoration: 'none' }} target='_blank' rel="noreferrer">
                <LinkedInIcon sx={{ height: '1em', paddingRight: 8 }} />
                LinkedIn
            </a>
        </Grid.Col>
    </Grid>
}

function Body() {
    const median = 7;
    return <Grid>
        <Grid.Col span={median} pr={16}>
            {/* <Skills /> */}
            {/* <Education /> */}
            <Experience />
            <Projects />
        </Grid.Col>
        <Grid.Col span={12 - median} pl={8}>
            <Education />
            <Skills />
            <Awards />
            {/* <About /> */}
            {/* <Avatar size={100} src={'https://i.gyazo.com/c7a78de6b6bf9f6e3637fd67317a5af3.jpg'} radius={100} /> */}
        </Grid.Col>
    </Grid>
}

function Section(props: {
    title?: string,
    children: any
} & BoxProps) {
    const { title, children, ...rest } = props;
    return <Box mb={5}>
        {title && (<>
            <Title order={6} fw={600} sx={{ fontWeight: 500 }}>{title}</Title>
            <Divider orientation='horizontal' />
        </>)}
        <Box mt={2} {...rest}>
            {children}
        </Box>
    </Box>
}

function About() {
    return <Section title='About'>
        {/* <Text fz={'sm'}>
            Passionate Full-Stack Website Developer & Software Engineer who has been programming as a hobby for over a decade.
        </Text> */}
        <Text fz={'sm'}>
            Passionate and focused Full-Stack Website Developer & Software Engineer who has been programming as a hobby for over a decade.
        </Text>
        <Text fz={'sm'} mt={12}>
            Bachelor of Science in Computer Science.
        </Text>
        <Text fz={'sm'} mt={12}>
            Graduated Magna Cum Laude from Kent State University in December 2022.
        </Text>
    </Section>
}

function Education() {
    const showClasses = false;
    const place = `Kent State University`;
    const degree = `Bachelor of Science in Computer Science`;
    const href = `https://catalog.kent.edu/colleges/as/cs/computer-science-bs/`;
    // const degree = `B.S. Computer Science`
    const gpa = `3.82`;
    const when = `Dec 2022`;
    // const classes: string[][] = [
    //     [
    //         'Software Engineering',
    //         'Database Design',
    //         'Human Interface Design',
    //     ],
    //     [
    //         'Web Programming',
    //         'Cloud Systems Computing',
    //         'Operating Systems',
    //         // 'Game Engine Concepts',
    //         // 'Calculus II',
    //     ],
    //     [
    //         'Data Structures',
    //         'Computer Networking',
    //         'Algorithms',
    //         'Cryptology',
    //     ]
    // ];
    const classes: string[][] = [
        // [
        //     'Software Engineering',
        //     'Database Design',
        //     'Algorithms',
        // ],
        // [
        //     'Data Structures',
        //     'Cryptology',
        //     'Computer Networking',
        // ],
        // [
        //     'Cloud Systems Computing',
        //     'Operating Systems',
        // ],
        [
            'Web Programming',
            'Human Interface Design',

            // 'Calculus II',
        ],
        [
            'Game Engine Concepts',
        ]
    ];
    // const classes: string[][] = [
    //     [
    //         'Software Engineering',
    //         'Database Design',
    //         'Algorithms',
    //     ],
    //     [
    //         'Data Structures',
    //         'Cryptology',
    //         'Computer Networking',
    //     ],
    //     [
    //         'Cloud Systems Computing',
    //         'Operating Systems',
    //     ],
    //     [
    //         'Web Programming',
    //         'Human Interface Design',
    //         // 'Game Engine Concepts',
    //         // 'Calculus II',
    //     ],
    // ];
    const experiences: {
        title: string
        subtitle?: string
        when: string[] | string
        href?: string,
        about?: string | string[],
    }[] = [
            // {
            //     title: 'Club President, HacKSU',
            //     // subtitle: 'HacKSU',
            //     // when: ['May 2020', 'Apr 2022'],
            //     when: ['2020', '2022'],
            //     href: 'https://github.com/hacksu',
            //     about: [
            //         `Organized annual hackathon, led website development, managed club outreach, and hosted instructional events at weekly meetings.`,
            //     ],
            //     //     about: `Student Club President of HacKSU, Kent State University's computer science club. 
            //     // Facilitated club processes, organized annual hackathon, led website development and hosted instructional events at weekly meetings.`
            // },
            {
                title: 'Club President',
                subtitle: 'HacKSU, Kent Hack Enough',
                // when: ['May 2020', 'Apr 2022'],
                when: ['2020', '2022'],
                href: 'https://github.com/hacksu',
                about: [
                    `Organized annual hackathon, led website development, managed club outreach, and taught lessons on programming at weekly meetings.`,
                ],
                //     about: `Student Club President of HacKSU, Kent State University's computer science club. 
                // Facilitated club processes, organized annual hackathon, led website development and hosted instructional events at weekly meetings.`
            },
        ]
    return <Section title='Education'>
        <Grid pb={8} pt={4}>
            <Grid.Col span={11} pt={4} pb={0}>
                <Text fz='sm'>
                    {href ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={href} target='_blank' rel="noreferrer">
                        {degree} {SHOW_LINKS && <LinkIcon sx={{}} />}
                    </a> : degree}
                </Text>
            </Grid.Col>
            <Grid.Col span={9} pb={0} pt={0}>
                <Text fz='sm' fw={'lighter'}>{place}</Text>
            </Grid.Col>
            <Grid.Col span={3} pb={0} pt={0} sx={{ textAlign: 'right' }} pr={10}>
                <Text fz="sm" fw={'lighter'}>{when}</Text>
            </Grid.Col>
            {/* <Grid.Col span={8} py={0}>
                <Text fz="xs">Magna Cum Laude, {gpa} GPA</Text>
            </Grid.Col> */}
            <Grid.Col span={8} py={0}>
                <Text fz="xs" mt={-4} fw={'lighter'}>Magna Cum Laude</Text>
            </Grid.Col>
            <Grid.Col span={4} py={0}>
                <Text fz="xs" mt={-4} sx={{ textAlign: 'right' }} fw={'lighter'}>{gpa} GPA</Text>
            </Grid.Col>
            {/* <Grid.Col span={11} pt={4}>
                <Text fz="sm">{degree}</Text>
            </Grid.Col> */}
            {/* <Grid.Col span={6} py={0}>
                <Text fz="sm">Bachelor of Science</Text>
            </Grid.Col>
            <Grid.Col span={6} py={0}>
                <Text fz="sm" sx={{ textAlign: 'right' }}>Computer Science</Text>
            </Grid.Col> */}

            {/* <Grid.Col span={8} py={0}>
                <Text fz="xs">Graduated Magna Cum Laude</Text>
            </Grid.Col>
            <Grid.Col span={3} py={0}>
                <Text fz="xs" pl={'2px'}>{gpa} GPA</Text>
            </Grid.Col> */}
            {/* <Grid.Col span={7} py={0}>
                <Text fz="sm">{place}</Text>
            </Grid.Col> */}
            {/* <Grid.Col span={5} py={0} sx={{ textAlign: 'right' }} pr={10}>
                <Text fz="xs">{gpa} GPA</Text>
            </Grid.Col> */}
        </Grid>
        <Box>
            <Box pt={4} mt={4} sx={{
                borderImageSource: DASH,
                borderImageSlice: 2,
                borderImageRepeat: 'round',
                borderColor: 'red',
                borderTop: 'dashed 1px',
            }}>
                {experiences.map(({ title, subtitle, when, href, about }, i) => (
                    <Grid key={title} mb={i < (experiences.length - 1) ? 'sm' : 4}>
                        <Grid.Col span={8} pb={0}>

                            <Text fz={'sm'}>
                                {/* <a style={{ textDecoration: 'none', color: 'inherit' }} href={href} target='_blank' rel="noreferrer">
                                    {title}
                                </a> */}
                                {title}
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={12 - 8} pb={0}>
                            <Text fz={'xs'} sx={{ textAlign: 'right' }}>
                                <div dangerouslySetInnerHTML={{ __html: isArray(when) ? when.join('	&ndash; ') : when }} />
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={7} py={0}>
                            {subtitle && <Text fz={'xs'} fw={'lighter'}>
                                {href ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={href} target='_blank' rel="noreferrer">
                                    {subtitle} {SHOW_LINKS && <LinkIcon sx={{}} />}
                                </a> : subtitle}
                            </Text>}
                        </Grid.Col>
                        <Grid.Col span={12 - 7} py={0}>

                        </Grid.Col>
                        <Grid.Col span={12} pb={0} pt={'0.2em'}>
                            {/* <Text fz={'xs'} sx={{ textIndent }}>{about}</Text> */}
                            {about && (typeof about === 'string' ? <Text fz={'xs'} sx={{ textIndent }}>{about}</Text> : (
                                <List pr={'md'}>
                                    {about.map(o => <List.Item key={o} fz={'xs'}>{o}</List.Item>)}
                                </List>
                            ))}
                        </Grid.Col>
                    </Grid>
                ))}
            </Box>
            {showClasses && <Box mt={4} pt={4} sx={{
                borderImageSource: DASH,
                borderImageSlice: 2,
                borderImageRepeat: 'round',
                borderColor: 'red',
                borderTop: 'dashed 1px',
            }}>
                {classes.map(o => (
                    <Text fz="xs" key={o.join(' ')} >
                        <div dangerouslySetInnerHTML={{ __html: o.join('	&ndash; ') }} />
                    </Text>
                ))}
            </Box>}
        </Box>
    </Section>
}

function Experience() {
    const experiences: {
        title: string
        subtitle: string
        when: string[] | string
        href?: string,
        about?: string | JSX.Element | (string | JSX.Element)[],
        extraSubtitle?: boolean,
    }[] = [
            {
                title: 'Full-Stack Developer',
                subtitle: 'Pocket Worlds',
                // subtitle: 'Pocket Worlds - Everskies.com',
                when: ['May 2022', 'Dec 2022'],
                href: 'https://www.pocketworlds.com/',
                about: [
                    // `Implemented website, mobile app, and backend features and bug fixes for an online forum social space.`,
                    `Implemented backend and frontend features used by over 350,000 daily active users across multiple platforms.`,
                    `Created a high-performance image composition microservice to facilitate custom user avatars in an online forum social space.`,
                    `Fixed numerous bugs while also increasing feature parity between the website and mobile app.`
                    // `Worked with PHP, Angular.js, and Flutter.`
                ],
                // about: `Implemented website, mobile app, and backend features and bug fixes for an online forum social space. `
                //     + `Worked with PHP, Angular.js, and Flutter.`,
            },
            // {
            //     title: 'Club President',
            //     subtitle: 'HacKSU & Kent Hack Enough',
            //     when: ['May 2020', 'Apr 2022'],
            //     href: 'https://hacksu.com',
            //     about: `Student Club President of HacKSU, Kent State University's computer science club. 
            // Facilitated club processes, organized annual hackathon, lead website development, hosted instructional events every tuesday at club meetings.`
            // },
            {
                title: 'Cloud Infrastructure Administrator',
                subtitle: 'Hyland Software, Summer Co-Op',
                when: ['May 2021', 'Aug 2021'], //'Summer 2021',
                href: 'https://hyland.com',
                about: [
                    // `Developed software to automatically document Hyland's R&D virtual environments.`,
                    `Automated the aggregation of thousands of VM records from multiple disconnected sources into a report that cross-references known records to identify inaccuracies and missing VM documentation, ultimately providing a global view of Hyland's entire R&D VM infrastructure.`,
                    `Developed algorithms that would make educated assumptions in the event of missing documentation with remarkable accuracy.`,
                    // `Culminated in a final master report that could be generated on-demand to provide a global view of Hyland's entire R&D VM infrastructure broken down into teams, managers, and machines with indefinite purposes or paths to ownership.`,
                    // `Utilized Powershell and the VMWare vSphere API.`
                ],
                // about: `Designed software to automatically document Hyland's R&D virtual environments through Powershell and the VMWare vSphere API.`,
            },
            // {
            //     title: 'Excel TECC, Senior Study',
            //     subtitle: 'Progressive Educational Partnership Program',
            //     href: 'https://www.progressive.com/about/corporate-responsibility/education-initiatives/',
            //     extraSubtitle: true,
            //     when: ['Mar 2019', 'May 2019'],
            //     about: `Accepted into competitive high school senior study program in partnership with Progressive Insurance. `
            //         + `Explored technical aspects of the company's various lines of business, concluding with a final presentation.`
            // },
            {
                title: 'Systems Engineer',
                subtitle: 'Roblox, Independent Contractor',
                when: ['Feb 2013', 'May 2019'],
                href: 'https://create.roblox.com/docs',
                about: [
                    <>Achieved 7<sup>th</sup> top earning experience with 6,558 peak concurrent users, 27 million active users, and an online community of over 300,000 followers.</>,
                    <>Implemented among first cross-platform user management systems, tracking over 600,000 users across Discord, Roblox, and TeamSpeak 3 for improved engagement and player analytics.</>,
                    <>Developed with a centralized MySQL database, backend systems in PHP and NodeJS, user-facing experiences in Lua, hosted on DigitalOcean with end-to-end security and maximal uptime.</>
                    // <></>,
                    // `Developed experiences with over 6,558 peak users while also within the top 10 of platform earnings at the time.`,
                    // `Implemented one of the first automated user management systems for the largest community on a platform in 2016.`,
                    // `Utilized PHP and Node.js for backend systems, SQL for databases, and Lua for game features.`,
                ]
                // about: `Implemented one of the first automated user management systems used by the largest community on the platform in 2016. `
                // + `Developed games with over 6,000 peak users while also within the top 10 of platform earnings at the time. `
                // + `Utilized PHP and Node.js for backend systems, SQL for databases, and Lua for game features.`,
            },
        ]
    return <Section title='Experience'>
        {experiences.map(({ title, subtitle, when, href, about, extraSubtitle }, i) => (
            <Grid key={title}>
                <Grid.Col span={7} pb={0} sx={{ maxWidth: '65%', flexGrow: 1 }}>
                    <Text sx={{ fontWeight: 400 }}>{title}</Text>
                </Grid.Col>
                <Grid.Col span={12 - 7} pb={0} sx={{ maxWidth: '35%' }}>
                    <Text fz={'xs'} sx={{ textAlign: 'right' }}>
                        <div dangerouslySetInnerHTML={{ __html: isArray(when) ? when.join('	&ndash; ') : when }} />
                    </Text>
                </Grid.Col>
                <Grid.Col span={extraSubtitle ? 12 : 7} py={0} >
                    {subtitle && <Text fz={'sm'} fw={200}>
                        {href ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={href} target='_blank' rel="noreferrer">
                            {subtitle} {SHOW_LINKS && <LinkIcon sx={{}} />}
                        </a> : subtitle}
                    </Text>}
                </Grid.Col>
                {!extraSubtitle && <Grid.Col span={12 - 7} py={0}>

                </Grid.Col>}
                <Grid.Col span={12} pb={0} pt={'0.2em'}>
                    {about && (typeof about === 'string' ? <Text fz={'xs'} sx={{ textIndent }}>{about}</Text> : (
                        <List pr={'md'} pb={6} mb={6} sx={{
                            borderImageSource: DASH,
                            borderImageSlice: 2,
                            borderImageRepeat: 'round',
                            borderColor: 'red',
                            borderBottom: i !== (experiences.length - 1) ? 'dashed 1px' : undefined,
                        }}>
                            {(about as any).map(o => <List.Item key={o} fz={'xs'}>{o}</List.Item>)}
                        </List>
                    ))}
                </Grid.Col>
            </Grid>
        ))}
    </Section>
}

function Projects() {
    const bulleted = true;
    const finalDash = false;
    const projects: {
        title: string
        subtitle?: string
        about?: string | string[]
        href?: string
        when: string
    }[] = [
            {
                title: 'Kent Hack Enough 2023',
                when: 'Dec 2022',
                href: 'https://github.com/hacksu/khe-2023',
                // about: `Leading planning & development for React, Next.js, Node.js, and TypeScript monorepo intended to replace the aging Kent Hack Enough systems.`
                // about: `Developed Kent Hack Enough monorepo containing server, staff management portal, and UI library with reusable logical components and separated styling from logical code in annual websites using NextJS. `
                //     + `Set up and maintained tRPC v10 with custom routes and context functions for improved separation of concerns and streamlined database queries.`
                about: [
                    `Designed monorepo containing server, staff management portal, and UI library with reusable logical components and separated styling from logical code in annual websites using NextJS.`,
                    `Maintained tRPC v10 with custom routes and context functions for improved separation of concerns and streamlined database queries.`
                ]
            },
            {
                title: 'Capstone Project',
                when: 'May 2022',
                href: 'https://github.com/cseitz/capstone',
                // about: `Led team project on developing unique software to implement features as per stakeholder request.
                // Documented project with diagrams and detailed writeups, ensured all deadlines were met,
                // assigned tasks to team members, assisted team members in the completion of tasks,
                // performed code reviews, and facilitated nearly all group processes.`
                // TODO: write about what my project actually was
                about: [
                    `Led team using the SCRUM process in the development of a CMS that facilitated an organized event, such as a conference or hackathon.`,
                    `Implemented ticket system, schedule of events, user registration, data exports, and a fully-customizable frontend for stakeholders.`,
                    `Documented process with detailed writeups and diagrams, including an extensive final report and user guide.`,
                    // `Lead team project to implement features as per stakeholder request.`,
                    // `Documented with diagrams & detailed writeups while ensuring deadlines were met.`,
                    // `Assigned tasks and assisted teammembers with tasks, performed code reviews, and facilitated group SCRUM processes.`
                ],
                // about: `Lead team project to implement features as per stakeholder request. Documented with diagrams & detailed writeups, ensured deadlines were met, `
                //     + `assigned and assisted teammembers with tasks, performed code reviews, and facilitated group SCRUM processes.`
            },
            // {
            //     title: 'Cloud Servers Discussion',
            //     when: 'Nov 2021',
            //     href: 'https://github.com/cseitz-portfolio/lesson-vps-discussion',
            //     about: `yeyeyeyeye`
            // },
            // {
            //     title: 'Software Engineering Project',
            //     when: 'May 2021',
            //     href: 'https://github.com/cseitz/SoftwareEngineering-Team-TGMGPA',
            //     // todo: lead with "leading scrum project"
            //     about: [
            //         `Implemented features and allocated work and facilitating the group SCRUM process.`,
            //     ],
            //     // about: `Lead team project as Scrum Master. 
            //     // Implemented capabilities as per instructor request by allocating work via the Scrum process.`
            // },
            // {
            //     title: 'HacKSU Website',
            //     when: 'May 2021',
            //     href: `https://github.com/hacksu/hacksu-2021`,
            //     // about: `Developed Vue.js website to replace the previous website.`
            //     about: [
            //         // `Designed and developed to replace the previous website.`,
            //         `Built using Vue.js and hosted on the DigitalOcean cloud.`,
            //     ]
            //     // about: `Designed and developed to replace the previous website.
            //     // Built using Vue.js and hosted on the DigitalOcean cloud.`
            // },
            // {
            //     title: 'Database Project',
            //     when: 'Apr 2021',
            //     href: 'https://github.com/cseitz/intro-to-db-project1',
            //     about: [
            //         `Designed and implemented a mock hospital MySQL database, including detailed reports and diagrams.`,
            //     ]
            // },
            // {
            //     title: 'Kent Hack Enough',
            //     // when: '2020 &ndash; 2022',
            //     when: '2020, 2021, 2022',
            //     href: `https://github.com/hacksu/kenthackenough`,
            //     about: `Designed and implemented major stylistic changes for KHE 2020 as per the event's theme.
            //     Maintained application throughout the event. Ensured all event processes were completed successfully.
            //     Hosted opening and closing ceremonies. Facilitated project judging.`
            // },
        ];
    return <Section title='Projects'>
        {projects.map(({ title, subtitle, about, href, when }, i) => {
            const result = <Grid>
                <Grid.Col span={8}>
                    <Text>
                        {href ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={href} target='_blank' rel="noreferrer">
                            {title} {SHOW_LINKS && href && <LinkIcon sx={{}} />}
                        </a> : title}
                    </Text>
                </Grid.Col>
                <Grid.Col span={12 - 8} sx={{ textAlign: 'right' }} pr={10}>
                    <Text fz='xs' dangerouslySetInnerHTML={{ __html: when }} />
                </Grid.Col>
                {subtitle && <Grid.Col span={12} sx={{ textAlign: 'right' }} pr={10}>
                    <Text>{subtitle}</Text>
                </Grid.Col>}
            </Grid>

            return <>
                <Box pb={6} mb={6} key={title} sx={{
                    borderImageSource: DASH,
                    borderImageSlice: 2,
                    borderImageRepeat: 'round',
                    borderColor: 'red',
                    borderBottom: i !== (projects.length - 1 + (finalDash ? 1 : 0)) ? 'dashed 1px' : undefined,
                }}>
                    {/* {href ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={href} target='_blank' rel="noreferrer">
                        {result}
                    </a> : result} */}
                    {result}
                    {about && (
                        !isArray(about) && typeof about === 'string' ? <Text fz='xs' sx={{ textIndent }}>
                            {about}
                        </Text> : (!bulleted ? about.map((o, i) => (
                            <Text fz='xs' key={i} pt={i > 0 ? 5 : undefined} sx={{ textIndent }}>
                                {o}
                            </Text>
                        )) : <List pr={'md'}>
                            {about.map(o => <List.Item key={o} fz={'xs'}>{o}</List.Item>)}
                        </List>)
                    )}
                    {/* {about && <Text fz='xs'>
                    {about}
                </Text>} */}

                </Box>
                {/* {i !== (projects.length - 1) && (
                    <Divider variant='dashed' mb={6} opacity={0.5} size='sm' />
                )} */}
            </>
        })}
        <Box>
            {/* <Button variant='light'>see more</Button> */}
        </Box>
    </Section>
}

function Skills() {
    const theme = useMantineTheme();
    const text = 'black';
    const colors = {
        'orange': ['#ff7043', text],
        'red': ['#ef5350', text],
        'blue': ['#42a5f5', text],
        'yellow': ['#ffd54f', text],
        'pink': ['#f06292', text],
        'indigo': ['#7986cb', text],
        'cyan': ['#4fc3f7', text],
        'green': ['#81c784', text],
        'grey': ['#90a4ae', text],
    }
    const alphabetize = true;
    const sections: {
        [key: string]: [
            string,
            string[],
            string,
        ][]
    } = {
        'Languages': [
            ['TypeScript', colors.cyan, 'https://www.typescriptlang.org/'],
            ['JavaScript', colors.yellow, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
            ['HTML5', colors.orange, 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5'],
            ['CSS', colors.blue, 'https://developer.mozilla.org/en-US/docs/Web/CSS'],
            ['Sass', colors.pink, 'https://sass-lang.com/'],
            ['Lua', colors.indigo, 'https://www.lua.org/'],
            ['C#', colors.blue, 'https://www.cplusplus.com/'],
            ['C++', colors.blue, 'https://www.cplusplus.com/'],
            ['PHP', colors.indigo, 'https://www.php.net/'],
            ['Bash', colors.yellow, 'https://www.php.net/'],
            ['PowerShell', colors.yellow, 'https://www.python.org/'],
            ['Python', colors.yellow, 'https://www.python.org/'],
        ],
        'Software & Frameworks': [
            ['React', colors.cyan, 'https://reactjs.org/'],
            ['Next.js', colors.grey, 'https://nextjs.org/'],
            ['Angular', colors.cyan, 'https://reactjs.org/'],
            ['Vue.js', colors.green, 'https://vuejs.org/'],
            ['Electron', colors.grey, 'https://www.electronjs.org/'],
            ['Git', colors.orange, 'https://git-scm.com/'],
            // ['AWS', colors.yellow, 'https://aws.amazon.com/'],
            // ['DigitalOcean', colors.yellow, 'https://aws.amazon.com/'],
            ['MongoDB', colors.green, 'https://www.mongodb.com/'],
            ['MySQL', colors.blue, 'https://www.mysql.com/'],
            ['NGINX', colors.green, 'https://www.nginx.com/'],
            ['Linux', colors.orange, 'https://ubuntu.com/'],
            ['Express', colors.grey, ''],
            ['tRPC', colors.blue, ''],
            ['Turborepo', colors.grey, ''],
            ['Docker', colors.grey, ''],
            ['GraphQL', colors.yellow, 'https://www.python.org/'],
            // ['Express', colors.grey, ''],
            ['HTML', colors.orange, 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5'],
            // ['CSS', colors.blue, 'https://developer.mozilla.org/en-US/docs/Web/CSS'],
            // ['Sass', colors.pink, 'https://sass-lang.com/'],
        ],
        'Tasks & Workflows': [
            ['Full-Stack', colors.blue, 'https://docker.com'],
            ['Website Design', colors.green, website],
            ['Cloud Servers', colors.yellow, 'https://digitalocean.com'],
            // ['Project Planning', colors.pink, 'https://github.com/cseitz/capstone'],
            ['Automation', colors.indigo, 'https://www.php.net/'],
            ['CI/CD', colors.green, ''],
            ['AWS', colors.yellow, 'https://aws.amazon.com/'],
            ['DigitalOcean', colors.yellow, 'https://aws.amazon.com/'],
            // ['', colors.green, ''],
        ],
    };
    if (alphabetize) {
        Object.keys(sections).forEach(o => {
            if (o.includes('Lang')) return;
            sections[o].sort((a, b) => (a[0] as any).localeCompare(b[0]) as number)
        })
    }
    const humbleness = 0;
    const levels = 6;
    const logoHeight = 14;
    const programming: [string, number, string[], string, any][] = [
        ['JavaScript', 5, colors.yellow, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', <img src="/assets/images/javascript.svg" key={'js'} height={logoHeight} />],
        ['TypeScript', 4, colors.cyan, 'https://www.typescriptlang.org/', <img src="/assets/images/typescript.svg" key={'ts'} height={logoHeight} />], // <JavaScriptIcon color='yellow' key={'ts'} />],
        ['Node.js', 4, colors.grey, 'https://nextjs.org/', <img src="/assets/images/node.svg" key={'node'} height={logoHeight} />],
        ['Next.js', 4, colors.grey, 'https://nextjs.org/', <img src="/assets/images/nextjs.svg" key={'next'} height={logoHeight} />],
        ['React', 4, colors.cyan, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', <img src="/assets/images/react.svg" key={'react'} height={logoHeight} />],
        ['Vue', 3, colors.green, 'https://vuejs.org/', <img src="/assets/images/vue.svg" key={'vue'} height={logoHeight} />],
        ['Angular', 2, colors.red, 'https://reactjs.org/', <img src="/assets/images/angular.svg" key={'angular'} height={logoHeight} />],
        // ['HTML5', colors.orange, 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5'],
        // ['CSS', colors.blue, 'https://developer.mozilla.org/en-US/docs/Web/CSS'],
        // ['Sass', colors.pink, 'https://sass-lang.com/'],
        // ['Lua', 4, colors.indigo, 'https://www.lua.org/'],
        // ['C#', 2, colors.blue, 'https://www.cplusplus.com/'],
        // ['C++', 2, colors.blue, 'https://www.cplusplus.com/'],
        // ['PHP', 2, colors.indigo, 'https://www.php.net/'],
        // ['Shell', 2, colors.yellow, 'https://www.php.net/'],
        // ['Python', 1, colors.yellow, 'https://www.python.org/'],
    ];

    programming.sort((a, b) => b[1] - a[1]);

    // sections['Programming Languages'] = sections['Programming Languages'].filter(o => !programming.find(o2 => o[0] === o2[0]));
    // sections['Software & Frameworks'] = sections['Software & Frameworks'].filter(o => !programming.find(o2 => o[0] === o2[0]));

    const levelColors = [
        colors.orange[0],
        colors.green[0],
        colors.blue[0],
        theme.colors.grape[8],
        theme.colors.yellow[6],
        theme.colors.pink[6],
    ]

    const levelLabels = [
        'Learning',
        'Adept',
        'Proficient',
        'Advanced',
        'Expert',
        'Founder',
    ]

    // eslint-disable-next-line react/display-name
    const getSkillBox = (mode: 'empty' | 'full', color: string) => (value: number) => {
        const defaultProps = {
            sx: {
                width: Math.pow((levels + 1) - value, 2) * 0.6 + 4,
                // backgroundColor: mode === 'empty' ? 'rgba(51, 51, 51, 0.25)' : theme.colors.blue[6],
                backgroundColor: mode === 'empty' ? 'rgba(51, 51, 51, 0.25)' : color,
                height: '0.5em',
                borderRadius: '2px'
            },
            // my: 2,
            mx: '0.5',
            // scale: 24,
        };
        return <Box {...defaultProps} />
    }

    return <Section title='Skills'>
        <Box pb={6} sx={{
            borderImageSource: DASH,
            borderImageSlice: 2,
            borderImageRepeat: 'round',
            borderBottom: 'dashed 1px',
        }}>
            {programming.map(([title, _score, color, url, icon], i) => {
                const score = _score - humbleness;
                return <Box key={title} mt={i && 0}>
                    <Group sx={{ justifyContent: 'space-between' }} spacing={0}>
                        <Group sx={{ justifyContent: 'flex-start', flexGrow: 1 }} spacing={0}>
                            <Box sx={{ minWidth: logoHeight + 2, height: logoHeight, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                {icon}
                            </Box>
                            <Text fz='sm' pl={8}>{title}</Text>
                        </Group>
                        <Group sx={{}} spacing={0}>
                            <Text fz='xs' c='dimmed' pr={8} sx={{ textAlign: 'right', flexGrow: 1, gap: 0 }}>{levelLabels[score - 1]}</Text>
                            <Rating size='xs' value={score} count={levels} mt={2} emptySymbol={getSkillBox('empty', levelColors[score - 1])} fullSymbol={getSkillBox('full', levelColors[score - 1])} readOnly />
                        </Group>
                    </Group>
                </Box>
            })}
            {Object.entries(sections).slice(0, 1).map(([title, items]) => (
                <Box pb={4} pt={2} mt={8} key={title} sx={{
                    borderImageSource: DASH,
                    borderImageSlice: 2,
                    borderImageRepeat: 'round',
                    borderTop: 'dashed 1px',
                }}>
                    <Text fz='xs' mt={0} sx={{ fontWeight: 500 }}>{title}</Text>
                    <Text fz={'xs'} dangerouslySetInnerHTML={{ __html: items.map(o => o[0]).join(', ') }} />
                </Box>
            ))}
        </Box>
        {Object.entries(sections).slice(1).map(([title, items], i, arr) => (
            <Box pb={4} pt={2} key={title} sx={{
                borderImageSource: DASH,
                borderImageSlice: 2,
                borderImageRepeat: 'round',
                borderBottom: i < (arr.length - 1) ? 'dashed 1px' : undefined,
            }}>
                <Text fz='xs' sx={{ fontWeight: 500 }}>{title}</Text>
                <Text fz={'xs'} dangerouslySetInnerHTML={{ __html: items.map(o => o[0]).join(', ') }} />
            </Box>
        ))}
    </Section>
}

function Awards() {
    const awards: {
        title: string | JSX.Element;
        when: string;
        href?: string;
        subtitle?: string | JSX.Element;
    }[] = [
            // {
            //     title: `Dean's List`,
            //     subtitle: 'Kent State University',
            //     href: 'https://www.kent.edu/',
            //     when: '2019 - 2022'
            // },
            {
                title: 'Honors College Scholar',
                subtitle: 'Kent State University',
                href: 'https://www.kent.edu/honors',
                when: '2019 - 2022'
            },
            // {
            //     title: 'Choose Ohio First',
            //     subtitle: 'Academic Scholarship',
            //     href: 'https://highered.ohio.gov/initiatives/affordability/choose-ohio-first/cof-overview/cof',
            //     when: '2020 - 2022'
            // },
            // {
            //     title: 'Outstanding Presentation',
            //     subtitle: 'Choose Ohio First Conference',
            //     href: 'https://highered.ohio.gov/initiatives/affordability/choose-ohio-first/cof-overview/cof',
            //     when: '2021, 2022'
            // },
            /*{
                title: 'SkillsUSA State Champion',
                subtitle: 'Website Design, High School',
                when: '2018 & 2019'
            },*/
            // {
            //     title: 'SkillsUSA National Finalist',
            //     // subtitle: `Website Design; 5th place (2018), 4th place (2019)`,
            //     href: 'https://www.skillsusa.org/competitions/',
            //     when: '2018, 2019',
            //     subtitle: <>
            //         Website Design Competition.
            //         {/* <Text>
            //             - Placed 5th in 2018, then 4th in 2019.
            //         </Text> */}
            //         <Text>
            //             - 5th place (2018), 4th place (2019)
            //         </Text>
            //         {/* <List fz='xs'>
            //             <List.Item>5th place (2018)</List.Item>
            //             <List.Item>4th place (2019)</List.Item>
            //         </List> */}
            //     </>
            // },
            // {
            //     title: 'SkillsUSA National Finalist',
            //     subtitle: 'Website Design Competition; 4th place',
            //     href: 'https://www.skillsusa.org/competitions/',
            //     when: '2019'
            // },
            // {
            //     title: 'SkillsUSA National Finalist',
            //     subtitle: 'Website Design Competition; 5th place',
            //     href: 'https://www.skillsusa.org/competitions/',
            //     when: '2018'
            // },
            {
                title: <>4<sup>th</sup> Place SkillsUSA National Finalist</>,
                subtitle: 'Website Design Competition; Louisville, KY',
                href: 'https://www.skillsusa.org/competitions/',
                when: '2019'
            },
            {
                title: <>5<sup>th</sup> Place SkillsUSA National Finalist</>,
                subtitle: 'Website Design Competition; Louisville, KY',
                href: 'https://www.skillsusa.org/competitions/',
                when: '2018'
            },
        ];
    return <Section title='Honors & Awards' pt={4}>
        {awards.map(({ title, subtitle, href, when }, i) => (
            <Grid key={i} mb={1}>
                <Grid.Col span={when.includes('-') ? 8 : 10} pt={4} pb={0} sx={{}}>
                    <Text fz={'sm'}>
                        {href ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={href} target='_blank' rel="noreferrer">
                            {title} {SHOW_LINKS && href && <LinkIcon sx={{}} />}
                        </a> : title}
                    </Text>
                </Grid.Col>
                <Grid.Col span={12 - (when.includes('-') ? 8 : 10)} pt={4} pb={0} sx={{}}>
                    <Text fz='xs' sx={{ textAlign: 'right' }} dangerouslySetInnerHTML={{ __html: when.split('-').join('&ndash;') }} />
                </Grid.Col>
                {subtitle && <Grid.Col span={12} pt={0} pb={6}>
                    <Text fz='xs'>{subtitle}</Text>
                </Grid.Col>}
            </Grid>
        ))}
        {/* <DashedDivider span={6} spacing={4} color='gray.2' /> */}
        {/* <Dashed /> */}
    </Section>
}


// function DashedBottomDivider() {
//     return <Box>

//     </Box>
// }


type DashedDividerProps = Omit<DividerProps, 'variant'> & {
    /** Fixed number of dash segments */
    segments?: number;
    /** Width of each segment */
    span?: number;
    /** The space between each segment */
    spacing?: number;
    /** Will a line be forcefully placed at the start and end, even if it gets cut off? */
    // capped?: boolean;
}

function DashedDivider(props: DashedDividerProps) {
    const { ref, width } = useElementSize();
    const spacing = props.spacing || 8;
    const count = props.segments ? props.segments : Math.floor(width / ((props?.span || 8) + spacing));

    return <Box ref={ref}>
        <Group spacing={spacing} sx={{ justifyContent: 'center' }}>
            {[...new Array(count)].map((o, i) => (
                <Divider {...props} sx={{ flexGrow: 1, ...props.sx }} key={`dash-${count}-${width}-${i}`} />
            ))}
        </Group>
    </Box>
}

// function DashedLineSegment(props: BoxProps & { color: string }) {
//     return <Box sx={{
//         borderColor: props.color,
//         borderBottom: '1px solid',
//         ...props.sx,
//     }} />
// }