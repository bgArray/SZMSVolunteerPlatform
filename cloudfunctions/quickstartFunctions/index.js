const cloud = require('wx-server-sdk')
// 给定 DYNAMIC_CURRENT_ENV 常量：接下来的 API 调用都将请求到与该云函数当前所在环境相同的环境
// 请安装 wx-server-sdk v1.1.0 或以上以使用该常量
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})


const getOpenId = require('./getOpenId/index');
const getMiniProgramCode = require('./getMiniProgramCode/index');
const createCollection = require('./createCollection/index');
const selectRecord = require('./selectRecord/index');
const updateRecord = require('./updateRecord/index');
const sumRecord = require('./sumRecord/index');
const fetchGoodsList = require('./fetchGoodsList/index');
const genMpQrcode = require('./genMpQrcode/index');
const login = require('./login/index');
const searcher = require('./searcher/index');
const getAnswerPage = require('./getAnswerPage/index');

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.type) {
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'getMiniProgramCode':
      return await getMiniProgramCode.main(event, context);
    case 'createCollection':
      return await createCollection.main(event, context);
    case 'selectRecord':
      return await selectRecord.main(event, context);
    case 'updateRecord':
      return await updateRecord.main(event, context);
    case 'sumRecord':
      return await sumRecord.main(event, context);
    case 'fetchGoodsList':
      return await fetchGoodsList.main(event, context);
    case 'genMpQrcode':
      return await genMpQrcode.main(event, context);
    case 'login':
      return await login.main(event, context);
    case 'searcher':
      return await searcher.main(event, context);
    case 'getAnswerPage':
      return await getAnswerPage.main(event, context);
  }
};
        
