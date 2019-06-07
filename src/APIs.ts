
import config from './Config.json';

function endpoint(path: string) {
    return config.server.addr + path;
}

export default ({
    account: {
        signin: endpoint('account/signin/'),
        avatar: endpoint('account/avatar/'),
        profile: endpoint('account/profile/')
    }
})