import QRCode from 'qrcodejs2'

const useqrcode = function (node, url = window.location.href) {
    //需要建立一个div id为参数node
    // useqrcode(node)
    let qrcode = new QRCode(node, {
        width: 100,
        height: 100, // 高度  
        text: url, // 二维码内容  
        // render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
        //   background: '#f0f',
        //   foreground: '#ff0'  
    })
    console.log(qrcode)
}
export {
    useqrcode
}