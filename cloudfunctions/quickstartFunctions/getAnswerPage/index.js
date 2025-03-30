// 云函数 searcher
const cloud = require('wx-server-sdk')
cloud.init() 
const db = cloud.database() 

exports.main = async (event, context) => {
      const id = event.id;
      const result = await db.collection('searcher_test')
      .where({"data.answer_id": id}).get();
         // 检查结果是否为空
    console.log(result);
    if (result && result.data && result.data.length > 0) {
        return {
          dataList: result.data
        };
      } else {
        return {
          dataList: [] // 返回空数组表示没有找到匹配的结果
        };}
    }