
const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images : {
        domains : ['res.cloudinary.com']
    }
};

module.exports = withNextIntl(nextConfig);
