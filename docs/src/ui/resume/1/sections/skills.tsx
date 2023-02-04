import { useContext, useMemo } from 'react'
import { ResumeContext } from '../context'
import Section from '../section'
import { cloneDeep, get } from 'lodash'
import { Box, Group, MantineColor, Rating, Text, useMantineTheme } from '@mantine/core'
import Dashed from '../divider'



type SkillsProps = {

    proficiency?: {
        humbleness?: number,
        levels?: {
            name: string,
            color: MantineColor,
        }[],
        logo?: {
            height?: number,
        }
    }

    alphabetize?: string[],
    sections: Record<string, {
        name: string,
        proficiency?: 0 | 1 | 2 | 3 | 4 | 5,
        logo?: (props: any) => JSX.Element,
    }[]>,
}

type A = SkillsProps['sections'][string][number];

function Skills<P extends SkillsProps>(props: Omit<P, 'alphabetize'> & {
    alphabetize?: (keyof P['sections'])[],
}) {
    const { sections: _sections, alphabetize, proficiency } = props;
    const ctx = useContext(ResumeContext);
    const SHOW_LINKS = ctx.links.show;
    const textIndent = ctx.text.indent;

    const theme = useMantineTheme();
    const colors = theme.colors;

    if (proficiency) {
        proficiency.levels = proficiency.levels || [
            { name: 'Learning', color: 'orange.5' },
            { name: 'Adept', color: 'green.5' },
            { name: 'Proficient', color: 'blue.5' },
            { name: 'Advanced', color: 'grape.8' },
            { name: 'Expert', color: 'yellow.6' },
            { name: 'Founder', color: 'pink.6' },
        ];
    }

    const sections = useMemo(() => {
        if (alphabetize) {
            const sections = cloneDeep(_sections);
            Object.keys(sections).forEach(o => {
                if (alphabetize.includes(o as any)) {
                    sections[o].sort((a, b) => (a.name as any).localeCompare(b.name) as number)
                }
            })
            return sections;
        }
        return _sections;
    }, [_sections, alphabetize]);

    const programming = useMemo(() => {
        if (!proficiency) return null;
        const items = (
            cloneDeep([].concat(...Object.values(_sections) as any)) as SkillsProps['sections'][string]
        ).filter(o => o.proficiency !== undefined && o.logo);
        items.sort((a, b) => (b.proficiency || 0) - (a.proficiency || 0));
        return items;
    }, [_sections, proficiency]);

    // eslint-disable-next-line react/display-name
    const getSkillBox = (mode: 'empty' | 'full', color: string) => (value: number) => {
        const defaultProps = {
            sx: {
                width: Math.pow((proficiency!.levels!.length + 1) - value, 2) * 0.6 + 4,
                backgroundColor: mode === 'empty' ? 'rgba(51, 51, 51, 0.25)' : (get(colors, color) || color),
                height: 6,
                borderRadius: '2px'
            },
            mx: '0.5',
        };
        return <Box {...defaultProps} />
    }

    return <Section title='Skills' mb={12}>
        {programming && programming?.length > 0 && <Box>
            <Box pb={2}>
                {programming.map(({ name, logo, proficiency: _score }, i) => {
                    const score = (_score || 0) - (proficiency?.humbleness || 0);
                    const logoHeight = proficiency?.logo?.height || 14;
                    return <Box key={name} mt={i && 0}>
                        <Group sx={{ justifyContent: 'space-between' }} spacing={0}>
                            <Group sx={{ justifyContent: 'flex-start', flexGrow: 1 }} spacing={0}>
                                <Box sx={{ minWidth: logoHeight + 2, height: logoHeight, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                                    {logo && logo({ height: logoHeight })}
                                </Box>
                                <Text fz='sm' pl={8}>{name}</Text>
                            </Group>
                            <Group sx={{}} spacing={0}>
                                <Text fz='xs' c='dimmed' pr={8} sx={{ textAlign: 'right', flexGrow: 1, gap: 0 }}>{proficiency?.levels?.[score - 1].name}</Text>
                                <Rating size='xs' value={score} count={proficiency?.levels?.length} mt={2}
                                    emptySymbol={getSkillBox('empty', proficiency?.levels?.[score - 1].color || '')}
                                    fullSymbol={getSkillBox('full', proficiency?.levels?.[score - 1].color || '')} readOnly />
                            </Group>
                        </Group>
                    </Box>
                })}
                {Object.entries(sections).slice(0, 0).map(([title, items]) => (
                    <Box pb={0} pt={2} mt={0} key={title}>
                        <Dashed mt={6} />
                        <Text fz='xs' mt={0} sx={{ fontWeight: 500 }}>{title}</Text>
                        <Text fz={'xs'} dangerouslySetInnerHTML={{ __html: (items as any).map(o => o[0]).join(', ') }} />
                    </Box>
                ))}
            </Box>
            <Dashed mt={6} />
        </Box>}
        {Object.entries(sections).slice(0).map(([title, items], i, arr) => (
            <Box pb={0} pt={2} key={title}>
                <Text fz='xs' sx={{ fontWeight: 500 }}>{title}</Text>
                <Text fz={'xs'} dangerouslySetInnerHTML={{ __html: (items as any).map(o => o.name).join(', ') }} />
                {i < (arr.length - 1) && <Dashed mt={4} />}
            </Box>
        ))}
    </Section>
}

export default Skills;
