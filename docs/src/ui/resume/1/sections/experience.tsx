import { useContext } from 'react'
import { ResumeContext } from '../context'
import Section from '../section'
import { Grid, List, Text } from '@mantine/core'
import { isArray } from 'lodash'
import { LinkIcon } from '../icons'
import Dashed from '../divider'



type ExperienceProps = {
    experiences: {
        title: string
        subtitle: string
        when: string[] | string
        href?: string,
        about?: string | JSX.Element | (string | JSX.Element)[],
        extraSubtitle?: boolean,
    }[],
}

function Experience(props: ExperienceProps) {
    const { experiences } = props;
    const ctx = useContext(ResumeContext);
    const SHOW_LINKS = ctx.links.show;
    const textIndent = ctx.text.indent;

    return <Section title='Experience' mb={12}>
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
                    {about && (typeof about === 'string' ? <Text fz={'xs'} sx={{ textIndent }}>{about}</Text> : (<>
                        <List pr={'md'} pb={0} mb={6}>
                            {(about as any).map(o => <List.Item key={o} fz={'xs'}>{o}</List.Item>)}
                        </List>
                        {i !== (experiences.length - 1) && <Dashed mb={6} />}
                    </>))}
                </Grid.Col>
            </Grid>
        ))}
    </Section>
}

export default Experience;