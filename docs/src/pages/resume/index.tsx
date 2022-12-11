import { Box, BoxProps, Divider, Grid, Text, Title } from '@mantine/core';
import { isArray } from 'lodash';
import { Page } from '../../widgets/page';

const website = 'https://github.com/cseitz'; //'https://cseitz.dev';
const portfolio = website + '/portfolio';

export default function Resume() {
    return <Page>
        <title>fgasjhgfdsa</title>
        <Header />
        <Body />
    </Page>
}

function Header() {
    const name = 'Chris Seitz';
    const email = 'cseitz.work@gmail.com';
    const subtitle = 'Full-Stack Web Development'
    return <Grid pb={20}>
        <Grid.Col span={6}>
            <a style={{ textDecoration: 'none', color: 'inherit' }} href={website}>
                <Title order={4} sx={{ fontWeight: 400, fontSize: '1.5rem' }}>{name}</Title>
            </a>
            <a style={{ textDecoration: 'none' }} href={'mailto:' + email}>
                <Title order={6} sx={{ fontWeight: 400, fontSize: '1rem' }}>{email}</Title>
            </a>
            {/* <Text c="dimmed">{subtitle}</Text> */}
        </Grid.Col>
        <Grid.Col span={6} sx={{ textAlign: 'right', display: 'flex', flexWrap: 'wrap', gap: 5, justifyContent: 'flex-end' }}>
            <p style={{ margin: 0, paddingRight: 15 }}>Cleveland, Ohio</p>
            <p style={{ margin: 0 }}>(440) 226-1337</p>
            <p style={{ margin: 0 }}>github.com/cseitz</p>
        </Grid.Col>
    </Grid>
}

function Body() {
    const median = 7;
    return <Grid>
        <Grid.Col span={median} pr={16}>
            <Skills />
            {/* <Education /> */}
            <Experience />
            <Projects />
        </Grid.Col>
        <Grid.Col span={12 - median} pl={8}>
            <Education />
            {/* <Skills /> */}
            <Awards />
            <About />
        </Grid.Col>
    </Grid>
}

function Section(props: {
    title?: string,
    children: any
} & BoxProps) {
    const { title, children, ...rest } = props;
    return <Box mb='xs'>
        {title && (<>
            <Title order={6} sx={{ fontWeight: 500 }}>{title}</Title>
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
        <Text fz={'sm'} mt={10}>
            Graduated Magna Cum Laude from Kent State University in Fall 2022.
        </Text>
        {/* <p>portfolio</p> */}
        <p>handshake</p>
        <p>linkedin</p>
        <p>github</p>
    </Section>
}

function Education() {
    const degree = `B.S. Computer Science`;
    const place = `Kent State University`;
    const gpa = `3.82`;
    const when = `Fall 2022`;
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
        [
            'Software Engineering',
            'Database Design',
            'Algorithms',
        ],
        [
            'Data Structures',
            'Cryptology',
            'Computer Networking',
        ],
        [
            'Cloud Systems Computing',
            'Operating Systems',
        ],
        [
            'Web Programming',
            'Human Interface Design',
            // 'Game Engine Concepts',
            // 'Calculus II',
        ],
    ];
    const experiences: {
        title: string
        subtitle?: string
        when: string[] | string
        href?: string,
        about?: string,
    }[] = [
            {
                title: 'Club President, HacKSU',
                // subtitle: 'HacKSU',
                // when: ['May 2020', 'Apr 2022'],
                when: ['2020', '2022'],
                href: 'https://hacksu.com',
                about: `Student Club President of HacKSU, Kent State University's computer science club. 
            Facilitated club processes, organized annual hackathon, lead website development, hosted instructional events at weekly meetings.`
            },
        ]
    return <Section title='Education'>
        <Grid>
            <Grid.Col span={9} pb={0}>
                <Text>{degree}</Text>
            </Grid.Col>
            <Grid.Col span={3} pb={0} sx={{ textAlign: 'right' }} pr={10}>
                <Text fz="sm">{when}</Text>
            </Grid.Col>
            <Grid.Col span={7} py={0}>
                <Text fz="sm">{place}</Text>
            </Grid.Col>
            <Grid.Col span={5} py={0} sx={{ textAlign: 'right' }} pr={10}>
                <Text fz="xs">{gpa} GPA</Text>
            </Grid.Col>
        </Grid>
        <Box mt={'xs'}>
            {classes.map(o => (
                <Text fz="xs" key={o.join(' ')}>
                    <div dangerouslySetInnerHTML={{ __html: o.join('	&ndash; ') }} />
                </Text>
            ))}
            <Box mt={10}>
                {experiences.map(({ title, subtitle, when, href, about }) => (
                    <Grid key={title} mb={'sm'}>
                        <Grid.Col span={7} pb={0}>
                            <Text fz={'sm'}> {title}</Text>
                        </Grid.Col>
                        <Grid.Col span={12 - 7} pb={0}>
                            <Text fz={'sm'} sx={{ textAlign: 'right' }}>
                                <div dangerouslySetInnerHTML={{ __html: isArray(when) ? when.join('	&ndash; ') : when }} />
                            </Text>
                        </Grid.Col>
                        <Grid.Col span={7} py={0}>
                            {href && subtitle ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={href}>
                                <Text fz={'xs'}>{subtitle}</Text>
                            </a> : <Text fz={'xs'}>{subtitle}</Text>}
                        </Grid.Col>
                        <Grid.Col span={12 - 7} py={0}>

                        </Grid.Col>
                        <Grid.Col span={12} pb={0} pt={'0.2em'}>
                            <Text fz={'xs'}>{about}</Text>
                        </Grid.Col>
                    </Grid>
                ))}
            </Box>
        </Box>
    </Section>
}

function Experience() {
    const experiences: {
        title: string
        subtitle: string
        when: string[] | string
        href?: string,
        about?: string,
        extraSubtitle?: boolean,
    }[] = [
            {
                title: 'Junior Full-Stack Developer',
                subtitle: 'Pocket Worlds - Everskies.com',
                when: ['May 2022', 'Dec 2022'],
                href: 'https://www.pocketworlds.com/',
                about: `Implemented website, mobile app, and backend features and bugfixes for an online forum social space. `
                    + `Worked with PHP, Angular.js, and Flutter.`,
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
                title: 'Cloud Infrastructure Admin',
                subtitle: 'Hyland Software, Summer Co-Op',
                when: ['May 2021', 'Aug 2021'], //'Summer 2021',
                href: 'https://hyland.com',
                about: `Designed software to automatically document Hyland's R&D virtual environments through Powershell and the VMWare vSphere API.`,
            },
            {
                title: 'Excel TECC, Senior Study',
                subtitle: 'Progressive Educational Partnership Program',
                extraSubtitle: true,
                when: ['Mar 2019', 'May 2019'],
                about: `Accepted into competitive high school senior study program in partnership with Progressive Insurance. `
                    + `Explored technical aspects of the company's various lines of business, concluding with a final presentation.`
            }
        ]
    return <Section title='Experience'>
        {experiences.map(({ title, subtitle, when, href, about, extraSubtitle }) => (
            <Grid key={title} mb={'sm'}>
                <Grid.Col span={7} pb={0}>
                    <Text>{title}</Text>
                </Grid.Col>
                <Grid.Col span={12 - 7} pb={0}>
                    <Text fz={'sm'} sx={{ textAlign: 'right' }}>
                        <div dangerouslySetInnerHTML={{ __html: isArray(when) ? when.join('	&ndash; ') : when }} />
                    </Text>
                </Grid.Col>
                <Grid.Col span={extraSubtitle ? 12 : 7} py={0}>
                    {href ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={href}>
                        <Text fz={'sm'}>{subtitle}</Text>
                    </a> : <Text fz={'sm'}>{subtitle}</Text>}
                </Grid.Col>
                {!extraSubtitle && <Grid.Col span={12 - 7} py={0}>

                </Grid.Col>}
                <Grid.Col span={12} pb={0} pt={'0.2em'}>
                    <Text fz={'xs'}>{about}</Text>
                </Grid.Col>
            </Grid>
        ))}
    </Section>
}

function Projects() {
    const projects: {
        title: string
        subtitle?: string
        about?: string
        href?: string
        when: string
    }[] = [
            {
                title: 'Capstone, Bachelor of Science',
                when: 'May 2022',
                href: 'https://github.com/cseitz/capstone',
                about: `Lead team project on developing unique software to implement features as per stakeholder request.
                Documented project with diagrams and detailed writeups, ensured all deadlines were met,
                assigned tasks to team members, assisted team members in completion of tasks,
                performed code reviews, facilitated nearly all group processes.`
            },
            {
                title: 'Software Engineering Project',
                when: 'May 2021',
                href: 'https://github.com/cseitz/SoftwareEngineering-Team-TGMGPA',
                about: `Lead team project as Scrum Master. 
                Implemented capabilities as per instructor request by allocating work via the Scrum process.
                Hosted on AWS Lightsail.`
            },
            {
                title: 'HacKSU Website',
                when: 'May 2021',
                href: `https://github.com/hacksu/hacksu-2021`,
                about: `Designed and developed to replace the previous website.
                Built using Vue.js and hosted on the DigitalOcean cloud.`
            },
            // {
            //     title: 'Kent Hack Enough',
            //     when: '2020 &ndash; 2022',
            //     href: `https://github.com/hacksu/kenthackenough`,
            //     about: `Designed and implemented major stylistic changes for KHE 2020 as per the event's theme.
            //     Maintained application throughout the event. Ensured all event processes were completed successfully.
            //     Hosted opening and closing ceremonies. Facilitated project judging.`
            // },
        ];
    return <Section title='Projects'>
        {projects.map(({ title, subtitle, about, href, when }) => {
            const result = <Grid>
                <Grid.Col span={8}>
                    <Text>{title}</Text>
                </Grid.Col>
                <Grid.Col span={12 - 8} sx={{ textAlign: 'right' }} pr={10}>
                    <Text fz='sm' dangerouslySetInnerHTML={{ __html: when }} />
                </Grid.Col>
                {subtitle && <Grid.Col span={12} sx={{ textAlign: 'right' }} pr={10}>
                    <Text>{subtitle}</Text>
                </Grid.Col>}
            </Grid>

            return <Box mb='sm' key={title}>
                {href ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={href}>
                    {result}
                </a> : result}
                {about && <Text fz='xs'>
                    {about}
                </Text>}
            </Box>
        })}
    </Section>
}

function Skills() {
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
    const sections: {
        [key: string]: [
            string,
            string[],
            string,
        ][]
    } = {
        'Programming Languages': [
            ['TypeScript', colors.cyan, 'https://www.typescriptlang.org/'],
            ['JavaScript', colors.yellow, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'],
            ['HTML5', colors.orange, 'https://developer.mozilla.org/en-US/docs/Glossary/HTML5'],
            ['CSS', colors.blue, 'https://developer.mozilla.org/en-US/docs/Web/CSS'],
            ['Sass', colors.pink, 'https://sass-lang.com/'],
            ['Lua', colors.indigo, 'https://www.lua.org/'],
            ['C#', colors.blue, 'https://www.cplusplus.com/'],
            ['C++', colors.blue, 'https://www.cplusplus.com/'],
            ['PHP', colors.indigo, 'https://www.php.net/'],
            ['Shell', colors.yellow, 'https://www.php.net/'],
        ],
        'Software & Frameworks': [
            ['React', colors.cyan, 'https://reactjs.org/'],
            ['Angular', colors.cyan, 'https://reactjs.org/'],
            ['Vue', colors.green, 'https://vuejs.org/'],
            ['Electron', colors.grey, 'https://www.electronjs.org/'],
            ['Git', colors.orange, 'https://git-scm.com/'],
            ['AWS', colors.yellow, 'https://aws.amazon.com/'],
            ['DigitalOcean', colors.yellow, 'https://aws.amazon.com/'],
            ['MongoDB', colors.green, 'https://www.mongodb.com/'],
            ['MySQL', colors.blue, 'https://www.mysql.com/'],
            ['NGINX', colors.green, 'https://www.nginx.com/'],
            ['Linux', colors.orange, 'https://ubuntu.com/'],
        ],
        'Tasks & Workflows': [
            ['Full-Stack', colors.blue, 'https://docker.com'],
            ['Website Design', colors.green, website],
            ['Cloud Servers', colors.yellow, 'https://digitalocean.com'],
            // ['Project Planning', colors.pink, 'https://github.com/cseitz/capstone'],
            ['Task Automation', colors.indigo, 'https://www.php.net/'],
        ],
    };
    Object.keys(sections).forEach(o => {
        sections[o].sort((a, b) => (a[0] as any).localeCompare(b[0]) as number)
    })
    return <Section title='Skills'>
        {Object.entries(sections).map(([title, items]) => (
            <Box pb={4} pt={2} key={title}>
                <Text fz='xs'>{title}</Text>
                <Text fz='sm' dangerouslySetInnerHTML={{ __html: items.map(o => o[0]).join(', ') }} />
            </Box>
        ))}
    </Section>
}

function Awards() {
    const awards: {
        title: string;
        when: string;
        subtitle?: string;
    }[] = [
            {
                title: 'Honors College Scholar',
                subtitle: 'Kent State University',
                when: '2019 - 2022'
            },
            {
                title: 'Choose Ohio First',
                subtitle: 'Academic Scholarship',
                when: '2020 - 2022'
            },
            {
                title: 'Outstanding Presentation',
                subtitle: 'Choose Ohio First Conference',
                when: '2021, 2022'
            },
            /*{
                title: 'SkillsUSA State Champion',
                subtitle: 'Website Design, High School',
                when: '2018 & 2019'
            },*/
            // {
            //     title: 'SkillsUSA National Finalist',
            //     subtitle: 'Website Design; 5th place (2018), 4th place (2019)',
            //     when: '2018 & 2019'
            // },
            {
                title: 'SkillsUSA National Finalist',
                subtitle: '4th place nationally, Website Design',
                when: '2019'
            },
            {
                title: 'SkillsUSA National Finalist',
                subtitle: '5th place nationally, Website Design',
                when: '2018'
            }
        ];
    return <Section title='Honors & Awards' pt={4}>
        {awards.map(({ title, subtitle, when }) => (
            <Grid key={title} mb={1}>
                <Grid.Col span={8} pt={4} pb={0}>
                    <Text>{title}</Text>
                </Grid.Col>
                <Grid.Col span={12 - 8} pt={4} pb={0}>
                    <Text fz='sm' sx={{ textAlign: 'right' }} dangerouslySetInnerHTML={{ __html: when.split('-').join('&ndash;') }} />
                </Grid.Col>
                <Grid.Col span={12} pt={0} pb={6}>
                    <Text fz='xs'>{subtitle}</Text>
                </Grid.Col>
            </Grid>
        ))}
    </Section>
}