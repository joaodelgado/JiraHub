module.exports = {
    'extends': [
        'airbnb-base',
        'plugin:vue/recommended',
    ],
    'rules': {
        'indent': ['error', 4],
        'vue/html-indent': ['error', 4],
        'no-underscore-dangle': ['error', { 'allowAfterThis': true }],
        'class-methods-use-this': 0,
        'comma-dangle': ['error', {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'ignore',
        }],
        'import/no-extraneous-dependencies': [
            'error',
            {
                'devDependencies': ['utils/**/*.js', 'webpack.config.js']
            }
        ]
    }
};

