export const Storage = {
    /**
     * 保存数据至本地
     * @param {String} key storage的键名
     * @param {String} word 保存的数据
     */
    add: function (key = '', word = '') {
        let words_list;
        if (typeof word == 'string') {
            word = word.replace(/[{}\\`'":]/g, '');
        }
        if (key == '' || word === '' || isExisted(key, word)) {
            console.log(Error('localStorage 保存失败！'));
            return;
        }
        if (localStorage[key]) {
            words_list = JSON.parse(localStorage[key]);
        } else {
            words_list = [];
        }
        words_list.push(JSON.parse(`{"${words_list.length}":"${word}"}`));
        localStorage[key] = JSON.stringify(words_list);
    },
    /**
     * 获取本地保存的数据
     * @param {String} key storage的键名
     * @return {Array} 保存与本地数据数组
     */
    get: function (key) {
        if (localStorage[key]) {
            return JSON.parse(localStorage[key]);
        } else {
            return [];
        }
    },
    /**
     * 移除本地保存的数据对象
     * @param {key} key storage的键名
     * @return {Boolean} 移除是否成功
     */
    remove: function (key) {
        if (localStorage[key]) {
            localStorage.removeItem(key);
            return true;
        } else {
            return false;
        }
    }
}

/**
 * 检查保存的数据数据是否已存在
 * @param {String} key storage的键名
 * @param {String} value 检查的值
 * @return {Boolean} 存在与否
 */
function isExisted(key, value) {
    let array = Storage.get(key);
    let flag = false;
    if (array.length) {
        array.forEach((item, index) => {
            if (item[index] == value) {
                flag = true;
            }
        });
    }
    return flag;
}