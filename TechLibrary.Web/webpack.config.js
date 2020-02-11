
module.exports = {
    module: {
        rules: [
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            indentedSyntax: true,
                            // sass-loader version >= 8
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    }
                ]
            },

            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 }
                    },
                    'postcss-loader'
                ]
            },

           {       
            test: /\.js?$/,
               loader: 'babel-loader',
               exclude: file => (
                   /node_modules/.test(file) &&
                   !/\.vue\.js/.test(file)
               )
           }
        ]        
    }
    
}
