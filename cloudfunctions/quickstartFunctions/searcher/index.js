// 云函数 searcher
const cloud = require('wx-server-sdk')
cloud.init() 
const db = cloud.database() 

exports.main = async (event, context) => {
      const keyword = event.keyword;
      const regex = new RegExp(keyword, 'i'); 
      const regex1 = new RegExp(keyword, 'i'); 
      const _ = db.command;
      const result = await db.collection('searcher_test')
      .where(
        _.or( [
          {
            title: db.RegExp({
              regexp: regex.source,
              options: 'i'
            })
          },
          {
            context: db.RegExp({
              regexp: regex1.source,
              options: 'i'
            })
          }
        ]
      )).get();
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