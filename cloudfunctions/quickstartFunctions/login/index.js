// 云函数 login 
const cloud = require('wx-server-sdk')
cloud.init() 
const db = cloud.database() 

exports.main  = async (event, context) => {
    const wxContext = cloud.getWXContext();
  // 检查是否为管理员 
  const adminRes = await db.collection('admin_list') 
    .where({ admin_users: wxContext.OPENID })
    .count()
  
  return {
    // openid: wxContext.OPENID,
    isAdmin: adminRes.total  > 0 // true=管理员，false=游客 
  }
}