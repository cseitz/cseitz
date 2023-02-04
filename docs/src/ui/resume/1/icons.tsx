import _LinkIcon from '@cseitz/fontawesome-react/link';
import GithubIcon from '@cseitz/fontawesome-react/github';
import PhoneIcon from '@cseitz/fontawesome-react/phone';
import HomeIcon from '@cseitz/fontawesome-react/house';
import LinkedInIcon from '@cseitz/fontawesome-react/linkedin';
import HandshakeIcon from '@cseitz/fontawesome-react/handshake';
import SquareIcon from '@cseitz/fontawesome-react/square';

export {
    GithubIcon,
    PhoneIcon,
    HomeIcon,
    LinkedInIcon,
    HandshakeIcon,
    SquareIcon,
}

export function LinkIcon(props: Parameters<typeof _LinkIcon>[0]) {
    const { sx = {}, ...rest } = props;
    return <sup>
        <_LinkIcon sx={{ fontSize: '0.75em', ...sx, opacity: '0.25', maxHeight: '1em' }} title="Interactive Link" {...rest} />
    </sup>
}

