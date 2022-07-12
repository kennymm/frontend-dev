class ScrollObserver{
    constructor(els, cb, options){
        this.els = document.querySelectorAll(els);
        const defaultOptions = {
            root: null,
            rootMargin: "0px",
            threshold: 0,
            once: true
        };
        this.cb = cb;
        this.options = Object.assign(defaultOptions,options);
        // defaultOptionsとoptionsをマージしてoptionsに格納
        this.once = this.options.once;
        this._init();
    }
    _init(){
        const callback = function (entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.cb(entry.target, true);
                    if(this.once){
                        observer.unobserve(entry.target);
                    }
                } else {
                    this.cb(entry.target, false);
                }
            });
            // _init()は、IntersectionObserverに渡すコールバック関数を定義する、メソッド
            // 条件に応じて各監視対象に対してコールバック関数cbを実行する
            // entries, observerはIntersectionObserverからコールバック関数callback渡される引数
            // entryは登録したDOM(el)
        };  
        this.io = new IntersectionObserver(callback.bind(this), this.options);
        // コールバック関数callbackを実行するスクロール検知オブジェクトを生成
        this.io.POLL_INTERVAL = 100;
        this.els.forEach(el => this.io.observe(el));
        // 取得した各DOMを監視対象として登録
    }

    destroy(){
        this.io.disconnect();
    }

}

