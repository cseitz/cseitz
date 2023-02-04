import { Box, Grid, List, Text } from '@mantine/core'
import { isArray } from 'lodash'
import { useContext } from 'react'
import { ResumeContext } from '../context'
import Dashed from '../divider'
import { LinkIcon } from '../icons'
import Section from '../section'



type ProjectsProps = {
    bulleted?: boolean,
    finalDash?: boolean,
    projects: {
        title: string
        subtitle?: string
        about?: string | string[]
        href?: string
        when: string
    }[],
}

function Projects(props: ProjectsProps) {
    const { projects, bulleted, finalDash } = props;
    const ctx = useContext(ResumeContext);
    const SHOW_LINKS = ctx.links.show;
    const textIndent = ctx.text.indent;

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
                <Box pb={0} mb={6} key={title}>
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

                    {i !== (projects.length - 1 + (finalDash ? 1 : 0)) && <Dashed mt={6} />}
                </Box>
            </>
        })}
    </Section>
}

export default Projects;