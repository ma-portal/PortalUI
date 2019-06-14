
import config from './Config.json';

function endpoint(path: string) {
    return config.server.addr + path;
}

export default ({
    user: {
        signin:     endpoint('user/signin/'),
        avatar:     endpoint('user/avatar/'),
        profile:    endpoint('user/profile/'),
        project:    endpoint('user/project/'),
    },
    chat: {
        member:     endpoint('chat/member/'),
        history:    endpoint('chat/history/')
    }
})