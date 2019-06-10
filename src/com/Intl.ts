
import intl, { ReactIntlUniversalOptions }  from 'react-intl-universal';
import eventService from './EventService';
import Events from '../Events';

const locales = {
    'en-US': require('../res/locale/en-US.json'),
    'zh-CN': require('../res/locale/zh-CN.json'),
};

const defaultLocale = 'zh-CN';

class Intl {

    private cache: { [key: string]: any };
    private initDone: boolean;

    constructor() {
        this.cache = new Map();
        this.initDone = false;
        intl.init({ currentLocale: defaultLocale, locales, warningHandler: () => {} })
            .then(() => {
                this.initDone = true;
                eventService.publish(Events.LocaleInitDone);
                console.debug('intl-universal initialized')
            });
    }

    init(options: ReactIntlUniversalOptions): Promise<void> {
        return intl.init(options);
    }

    get<T>(defaultValue: T, key: string): T {
        if (key && this.initDone) {
            let keys = key.split('.');
            let v = this.cache[keys[0]];
            if (!v) {
                v = intl.get(keys[0]) as any;
            }
            for (let i = 1; i < keys.length && v; i++) {
                v = v[keys[i]];
            }
            return v || defaultValue;
        }
        return defaultValue;
    }

    initialized(): boolean { return this.initDone; }

}

export default new Intl();