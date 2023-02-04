import { Avatar, Box, Grid, GridProps, Title } from '@mantine/core';
import { useContext } from 'react';
import { ResumeContext } from '../context';
import { GithubIcon, HomeIcon, LinkedInIcon, PhoneIcon } from '../icons';
import type { MantineStyleSystemProps } from '@mantine/core';



type HeaderProps = {
    name: string,
    email: string,
    phone: string,
    website: string,
    avatar?: string,
    // links: {
    //     label: string,
    //     icon: any,
    //     href: string,
    // }[],
} & MantineStyleSystemProps;

function Header(props: HeaderProps) {
    const { name, email, phone, avatar, website, ...rest } = props;
    const ctx = useContext(ResumeContext);
    const SHOW_LINKS = ctx.links.show;
    const textIndent = ctx.text.indent;

    return <Grid pb={15} mt={-30} {...rest}>
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

export default Header;
