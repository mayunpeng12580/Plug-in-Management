const comments = [];
const files = require.context("../../views/", true, /\.js$/);

//循环文件
files.keys().map(key => {
    if(key.includes('./index/') || key.includes('./login/')){
        return false
    }

    const splitFilesName = key.split('.');
    const jsonObj = {};
    const path = `/index${splitFilesName[1]}`;
    const component = files(key).default;
    jsonObj.path = path;
    jsonObj.component = component;
    comments.push(jsonObj)
    
})

export default comments