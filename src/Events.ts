
const id = require('uuid/v4') as any;

export default ({
    LocaleChange:   id(),
    LocaleInitDone: id()    // publish by: IntlWrapper
})