
import intl, { ReactIntlUniversalOptions }  from 'react-intl-universal';
import eventService from './EventService';
import Events from '../Events';

const locales = {
    'en-US': require('../res/locale/en-US.json'),
    'zh-CN': require('../res/locale/zh-CN.json'),
};

const defaultLocale = 'zh-CN';

class Intl {

    private initDone: boolean = false;
    private currentLocale: Locale = defaultLocale;

    constructor() {
        this.refresh();
    }

    private refresh() {
        intl.init({ currentLocale: this.currentLocale, locales, warningHandler: () => {} })
            .then(() => {
                if (!this.initDone) {
                    this.initDone = true;
                    eventService.publish(Events.LocaleInitDone);
                    console.debug('intl-universal initialized');
                } else {
                    eventService.publish(Events.LocaleChange);
                    console.debug('intl-universal locale changed');
                }
            });
    }

    change(lang: Locale) {
        this.currentLocale = lang;
        this.refresh();
    }

    get(key: string): any {
        return intl.get(key);
    }

    initialized(): boolean { return this.initDone; }

    getCurrentLocale(): string { return this.currentLocale; }

}

export type Locale = 'en-US' | 'zh-CN';

export default new Intl();
