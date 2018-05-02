const fs = require('fs'),
path = require('path'),
nodeWorkPath = process.cwd(),
sep = path.sep,
gradlePath = `file:///${nodeWorkPath}${sep}gradle${sep}gradle-2.14.1-all.zip`.replace(/\\/g,'/'); // https\://services.gradle.org/distributions/gradle-2.14.1-all.zip

const spawn = require('cross-spawn');

const tplEngine = function(tpl, data) {
    const reg = /<%([^%>]+)?%>/g;
    while (match = reg.exec(tpl)) {
        tpl = tpl.replace(match[0], data[match[1]]);
    }
    return tpl;
};

const tpl = fs.readFileSync(`${__dirname}/gradle-wrapper.properties.tpl`,'utf-8');

const content = tplEngine(tpl, {
    gradlePath
});



fs.writeFile(`${nodeWorkPath}/android/gradle/wrapper/gradle-wrapper.properties`, content, function(err) {
    if(err) throw err;

    const platformMap = {
        android: 'run-android',
        ios: 'run-ios'
    };
    const { npm_config_platform = 'android' } = process.env;
    spawn('react-native', [ platformMap[npm_config_platform] ], { stdio: 'inherit' });
});