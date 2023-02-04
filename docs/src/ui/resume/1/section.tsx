import { Box, BoxProps, Divider, Title } from '@mantine/core';



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

export default Section;