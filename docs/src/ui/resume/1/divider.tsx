import { Box, Divider, DividerProps, Group } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';



type DashedDividerProps = Omit<DividerProps, 'variant'> & {
    /** Fixed number of dash segments */
    segments?: number;
    /** Width of each segment */
    span?: number;
    /** The space between each segment */
    spacing?: number;
    /** Will a line be forcefully placed at the start and end, even if it gets cut off? */
    // capped?: boolean;
}

export function DashedDivider(props: DashedDividerProps) {
    const { ref, width } = useElementSize();
    const spacing = props.spacing || 8;
    const count = Math.max(2, props.segments ? props.segments : Math.floor(width / ((props?.span || 8) + spacing)));

    return <Box ref={ref}>
        <Group spacing={spacing} sx={{ justifyContent: 'center' }}>
            {[...new Array(count)].map((o, i) => (
                <Divider {...props} sx={{ flexGrow: 1, ...props.sx }} key={`dash-${count}-${width}-${i}`} />
            ))}
        </Group>
    </Box>
}

const Dashed = (props: DashedDividerProps) => (
    <DashedDivider span={6} spacing={4} color='gray.2' {...props} />
);

export default Dashed;