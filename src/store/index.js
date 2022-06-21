const appStore = {}

const modulesFiles = import.meta.globEager("./modules/*.js")

Object.keys(modulesFiles).map((modulePath, index) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1').substring(8)
    const value = modulesFiles[modulePath]
    appStore[moduleName] = value.default()
})

export default appStore