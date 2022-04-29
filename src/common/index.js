// You can add common or constant here

module.exports.common_environment = ['development', 'production']

module.exports.env_prefix = () => {
    switch (process.env.NODE_ENV) {
        case 'development':
            return 'dev_'
            break;
        case 'production':
            return 'prod_'
            break;
        default:
            return false
            break;
    }
}