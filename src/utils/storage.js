/* localStorage & sessionStorage 增删改除
* 2018年03月14日16:00:27  yzw
*/
const caching = {
    /*  本地缓存修改方法
     *  caching.local/session.set(key,value);设置
     *  caching.local/session.get(key)获取
     *  caching.local/session.remove(key，‘可选参数，全部清除’);删除
     *  
    */
    local: {
        set: (key, value) => {
            if (!window.localStorage) {
                alert('浏览器不支持localStorage');
                return false;
            } else {
                window.localStorage.setItem(key, value);
            }
            return window.localStorage.setItem(key, value);
        },
        get: (key) => {
            if (!window.localStorage) {
                alert('浏览器不支持localStorage')
                return false;
            } else {
                window.localStorage.getItem(key)
            }
            return window.localStorage.getItem(key)
        },
        remove: (key, all) => {
            if (!window.localStorage) {
                alert('浏览器不支持localStorage')
                return false;
            } else {
                if (all) {
                    window.localStorage.clear();
                } else {
                    window.localStorage.removeItem(key)
                }
            }
            return window.localStorage.removeItem(key)
        }
    },
    session: {
        set: (key, value) => {
            if (!window.sessionStorage) {
                alert('浏览器不支持localStorage');
                return false;
            } else {
                window.sessionStorage.setItem(key, value);
            }
            return window.sessionStorage.setItem(key, value);
        },
        get: (key) => {
            if (!window.sessionStorage) {
                alert('浏览器不支持sessionStorage')
                return false;
            } else {
                window.sessionStorage.getItem(key)
            }
            return window.sessionStorage.getItem(key)
        },
        remove: (key, all) => {
            if (!window.sessionStorage) {
                alert('浏览器不支持sessionStorage')
                return false;
            } else {
                if (all) {
                    window.sessionStorage.clear();
                } else {
                    window.sessionStorage.removeItem(key)
                }
            }
            return window.sessionStorage.removeItem(key)
        }
    },
}

export default caching