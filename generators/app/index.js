// 此文件作为 generator 的核心入口
// 需要导出一个继承自 yeoman generator 的类型
// yeoman generator 在工作时会自动调用我们在此类型中定义的一些生命周期方法
// 我们在这些方法中可以通过调用父类提供的一些工具方法实现一些功能，例如文件写入

const Generator = require('yeoman-generator');

module.exports = class extends Generator{
    prompting (){
        // yeoman 在询问用户环节会自动调用此方法
        // 在此方法中可以调用父类的 prompt() 方法发出对用户的命令询问
        return this.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Your project name',
                default: this.appname  // appname 为项目生成目录名称

            }
        ]).then(answers => {
            this.answers = answers;
        })
    }
    writing (){
        // 把每一个文件都通过模板转换到目标路径
        const templates = [
            '.gitignore',
            'babel.config.js',
            'package.json',
            'README.md',
            'yarn.lock',
            'public/favicon.ico',
            'public/index.html',
            'src/App.vue',
            'src/main.js',
            'src/assets/logo.png',
            'src/components/HelloWorld.vue'
        ]

        templates.forEach(item => {
            this.fs.copyTpl(
                this.templatePath(item),
                this.destinationPath(item),
                this.answers
            )
        })

       
    }
}