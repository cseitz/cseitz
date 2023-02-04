import { Box, Grid, List, Text } from '@mantine/core'
import Section from '../section'
import Dashed from '../divider'
import { useContext } from 'react'
import { ResumeContext } from '../context'
import { LinkIcon } from '../icons'
import { isArray } from 'lodash'



type EducationProps = {
    education: {
        place: string,
        degree: string,
        gpa: string,
        when: string,
        link?: {
            href: string,
            placement: 'place' | 'degree',
        }
    },
    experiences?: {
        title: string
        subtitle?: string
        when: string[] | string
        href?: string,
        about?: string | string[],
    }[],
}

function Education(props: EducationProps) {
    const { education, experiences = [] } = props;
    const ctx = useContext(ResumeContext);
    const SHOW_LINKS = ctx.links.show;
    const textIndent = ctx.text.indent;

    return <Section title='Education' mb={12}>
        <Grid pb={8} pt={4}>
            <Grid.Col span={11} pt={4} pb={0}>
                <Text fz='sm'>
                    {education.link && education.link.placement === 'degree' ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={education.link?.href} target='_blank' rel="noreferrer">
                        {education.degree} {SHOW_LINKS && <LinkIcon sx={{}} />}
                    </a> : education.degree}
                </Text>
            </Grid.Col>
            <Grid.Col span={9} pb={0} pt={0}>
                <Text fz='sm' fw={'lighter'}>
                    {education.link && education.link?.placement === 'place' ? <a style={{ textDecoration: 'none', color: 'inherit' }} href={education.link?.href} target='_blank' rel="noreferrer">
                        {education.place} {SHOW_LINKS && <LinkIcon sx={{}} />}
                    </a> : education.place}
                </Text>
            </Grid.Col>
            <Grid.Col span={3} pb={0} pt={0} sx={{ textAlign: 'right' }} pr={10}>
                <Text fz="sm" fw={'lighter'}>{education.when}</Text>
            </Grid.Col>
            <Grid.Col span={8} py={0}>
                <Text fz="xs" mt={-4} fw={'lighter'}>Magna Cum Laude</Text>
            </Grid.Col>
            <Grid.Col span={4} py={0}>
                <Text fz="xs" mt={-4} sx={{ textAlign: 'right' }} fw={'lighter'}>{education.gpa} GPA</Text>
            </Grid.Col>
        </Grid>
        <Box>
            <Box pt={0} mt={4}>
                <Dashed mb={4} />
                {experiences.map(({ title, subtitle, when, href, about }, i) => (<>
                    <Grid key={title} mb={i < (experiences.length - 1) ? 4 : 0}>
                        <Grid.Col span={8} pb={0}>

                            <Text fz={'sm'}>
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
                            {about && (typeof about === 'string' ? <Text fz={'xs'} sx={{ textIndent }}>{about}</Text> : (
                                <List pr={'md'}>
                                    {about.map(o => <List.Item key={o} fz={'xs'}>{o}</List.Item>)}
                                </List>
                            ))}
                        </Grid.Col>
                    </Grid>
                    {i < (experiences.length - 1) && <Dashed mb={4} />}
                </>))}
            </Box>
            {/* {showClasses && <Box mt={4} pt={0}
                {classes.map(o => (
                    <Text fz="xs" key={o.join(' ')} >
                        <Dashed mb={4} />
                        <div dangerouslySetInnerHTML={{ __html: o.join('	&ndash; ') }} />
                    </Text>
                ))}
            </Box>} */}
        </Box>
    </Section>
}

export default Education;