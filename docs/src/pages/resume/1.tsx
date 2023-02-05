/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { Grid } from '@mantine/core';
import getConfig from 'next/config';
import { Awards, Education, Experience, Header, Projects, Skills } from '../../ui/resume/1';
import { Page } from '../../widgets/page';


export default function Resume() {
    const median = 7;
    return <>
        <Page sx={{}}>
            <Sections.Header />
            <Grid>
                <Grid.Col span={median} pr={16}>
                    <Sections.Experience />
                    <Sections.Projects />
                </Grid.Col>
                <Grid.Col span={12 - median} pl={8}>
                    <Sections.Education />
                    <Sections.Skills />
                    <Sections.Awards />
                </Grid.Col>
            </Grid>
        </Page>
    </>
}


const Sections = {

    Header: () => {
        const email = getConfig().publicRuntimeConfig.email as string;
        const phone = getConfig().publicRuntimeConfig.phone as string;
        return <Header {...{
            name: 'Chris Seitz',
            website: 'https://github.com/cseitz',
            email,
            phone,
        }} pb={10} mt={-30} />
    },

    Education: () => <Education
        education={{
            place: `Kent State University`,
            degree: `Bachelor of Science in Computer Science`,
            when: `Dec 2022`,
            gpa: `3.82`,
            link: {
                href: `https://catalog.kent.edu/colleges/as/cs/computer-science-bs/`,
                placement: 'place',
            }
        }}
        experiences={[
            {
                title: 'Club President',
                subtitle: 'HacKSU, Kent Hack Enough',
                when: ['2020', '2022'],
                href: 'https://github.com/hacksu',
                about: [
                    `Organized annual hackathon, led website development, managed club outreach, and taught lessons on programming at weekly meetings.`,
                ],
            },
        ]} />,

    Experience: () => <Experience
        experiences={[
            {
                title: 'Full-Stack Developer',
                subtitle: 'Pocket Worlds',
                when: ['May 2022', 'Dec 2022'],
                href: 'https://www.pocketworlds.com/',
                about: [
                    `Implemented peer-to-peer tip jar payment processing and an animated avatar system, boosting user experience and platform monetization.`,
                    `Maintained a full-stack online social forum used by thousands of users using PHP, AngularJS, and Flutter, driving increased reliability and user engagement.`,
                    // `Created a high-performance image composition microservice to facilitate custom user avatars in an online forum social space.`,
                    // `Implemented backend and frontend features used by thousands of users across multiple platforms.`,
                ],
            },
            {
                title: 'Cloud Infrastructure Administrator',
                subtitle: 'Hyland Software, Summer Co-Op',
                when: ['May 2021', 'Aug 2021'],
                href: 'https://hyland.com',
                about: [
                    `Automated VM audit process using PowerShell script and VMWare API, resulting in efficient classification and tracking of thousands of VMs.`,
                    `Developed web-based interface in JavaScript for drafting and sending emails, improving accuracy of VM usage data and saving company resources.`,
                    // `Automated the aggregation of thousands of VM records from multiple disconnected sources into a report that cross-references known records to identify inaccuracies and missing VM documentation, ultimately providing a global view of Hyland's entire R&D VM infrastructure.`,
                ],
            },
            {
                title: 'Systems Engineer',
                subtitle: 'Roblox, Independent Contractor',
                when: ['Feb 2013', 'May 2019'],
                href: 'https://create.roblox.com/docs',
                about: [
                    <>Achieved 7<sup>th</sup> top earning experience with 6,558 peak concurrent users, 27 million active users, and an online community of over 300,000 followers.</>,
                    <>Implemented among first cross-platform user management systems, tracking over 600,000 users across Discord, Roblox, and TeamSpeak 3 for improved engagement and player analytics.</>,
                    <>Developed with a centralized MySQL database, backend systems in PHP and NodeJS, user-facing experiences in Lua, hosted on DigitalOcean with end-to-end security and maximal uptime.</>
                ]
            },
        ]} />,

    Projects: () => <Projects
        bulleted
        // finalDash
        projects={[
            {
                title: 'Kent Hack Enough 2023',
                when: 'Feb 2023',
                href: 'https://github.com/hacksu/khe-2023',
                about: [
                    `Designed monorepo containing server, staff management portal, and UI library with reusable logical components and separated styling from logical code in annual websites using NextJS.`,
                    `Maintained tRPC v10 with custom routes and context functions for improved separation of concerns and streamlined database queries.`
                ]
            },
            {
                title: 'Capstone Project',
                when: 'May 2022',
                href: 'https://github.com/cseitz/capstone',
                about: [
                    `Led team using the SCRUM process in the development of a CMS that facilitated an organized event, such as a conference or hackathon.`,
                    `Implemented ticket system, schedule of events, user registration, data exports, and a fully-customizable frontend for stakeholders.`,
                    `Documented process with detailed writeups and diagrams, including an extensive final report and user guide.`,
                ],
            },
            {
                title: 'HacKSU Website',
                when: 'May 2021',
                href: `https://github.com/hacksu/hacksu-2021`,
                about: [
                    `Designed a new website that utilized HacKSU's latest branding.`,
                    `Implemented additional features such as a mailing list, short URL redirects, and an alumni page to keep track of previous club officers.`,
                    // `Built using Vue.js and hosted on the DigitalOcean cloud.`,
                ]
            },
        ]} />,

    Skills: () => <Skills
        alphabetize={['Software & Frameworks', 'Tasks & Workflows']}
        proficiency={{}}
        sections={{
            'Languages': [
                {
                    name: 'TypeScript',
                    proficiency: 4,
                    logo(props) {
                        return <img src="/assets/images/typescript.svg" key={'ts'} {...props} />
                    },
                },
                {
                    name: 'JavaScript',
                    proficiency: 5,
                    logo(props) {
                        return <img src="/assets/images/javascript.svg" key={'js'} {...props} />
                    },
                },
                { name: 'HTML5' },
                { name: 'CSS' },
                { name: 'Sass' },
                { name: 'Lua' },
                { name: 'C#' },
                { name: 'C++' },
                { name: 'PHP' },
                { name: 'Bash' },
                { name: 'PowerShell' },
                { name: 'Python' },
            ],
            'Software & Frameworks': [
                {
                    name: 'Node.js',
                    proficiency: 4,
                    logo(props) {
                        return <img src="/assets/images/node.svg" key={'node'} {...props} />
                    },
                },
                {
                    name: 'Next.js',
                    proficiency: 4,
                    logo(props) {
                        return <img src="/assets/images/nextjs.svg" key={'next'} {...props} />
                    },
                },
                {
                    name: 'React',
                    proficiency: 4,
                    logo(props) {
                        return <img src="/assets/images/react.svg" key={'react'} {...props} />
                    },
                },
                {
                    name: 'Vue.js',
                    proficiency: 3,
                    logo(props) {
                        return <img src="/assets/images/vue.svg" key={'vue'} {...props} />
                    },
                },
                {
                    name: 'Angular',
                    proficiency: 2,
                    logo(props) {
                        return <img src="/assets/images/angular.svg" key={'angular'} {...props} />
                    },
                },
                { name: 'Electron' },
                { name: 'Git' },
                { name: 'MongoDB' },
                { name: 'MySQL' },
                { name: 'NGINX' },
                { name: 'Linux' },
                { name: 'Express' },
                { name: 'tRPC' },
                { name: 'Turborepo' },
                { name: 'Docker' },
                { name: 'GraphQL' },
                { name: 'HTML' },
            ],
            'Tasks & Workflows': [
                { name: 'Full-Stack' },
                { name: 'Website Design' },
                { name: 'Cloud Servers' },
                { name: 'Automation' },
                { name: 'CI/CD' },
                { name: 'AWS' },
                { name: 'DigitalOcean' },
            ]
        }} />,

    Awards: () => <Awards
        awards={[
            {
                title: `Dean's List`,
                subtitle: 'Kent State University',
                href: 'https://www.kent.edu/',
                when: '2019 - 2022'
            },
            {
                title: 'Honors College Scholar',
                subtitle: 'Kent State University',
                href: 'https://www.kent.edu/honors',
                when: '2019 - 2022'
            },
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
        ]} />,

}

