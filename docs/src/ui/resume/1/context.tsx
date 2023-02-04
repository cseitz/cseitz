import { createContext } from 'react';

type ResumeContextType = {
    text: {
        indent: number,
    },
    links: {
        show: boolean,
    }
}

export const ResumeContext = createContext<ResumeContextType>({
    text: {
        indent: 0,
    },
    links: {
        show: true,
    }
})

