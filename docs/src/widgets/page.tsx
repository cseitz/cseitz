import { Box, BoxProps, MantineProvider } from '@mantine/core';


export function Page(props: BoxProps) {
    const { children, ...rest } = props;
    return <MantineProvider theme={{ colorScheme: 'light' }}>
        <Box className='page' {...rest}>
            {children}
        </Box>
    </MantineProvider>
}