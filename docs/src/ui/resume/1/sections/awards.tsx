import { useContext } from 'react'
import { ResumeContext } from '../context'
import Section from '../section'
import { Grid, Text } from '@mantine/core';
import { LinkIcon } from '../icons';



type AwardsProps = {
    awards: {
        title: string | JSX.Element;
        when: string;
        href?: string;
        subtitle?: string | JSX.Element;
    }[],
}

function Awards(props: AwardsProps) {
    const { awards } = props;
    const ctx = useContext(ResumeContext);
    const SHOW_LINKS = ctx.links.show;
    const textIndent = ctx.text.indent;

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

export default Awards;