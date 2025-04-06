a = {
    "_id": "026927c767e90c26000a47ad2ea35f56",
    "data": [
        {
            "feed_source_txt": "回答了问题2",
            "good_num": "112",
            "question_id": 2.0,
            "answer_ctnt": '<span style="text-wrap: wrap;">1.请根据</span><span style="text-wrap: wrap; text-decoration-line: underline;">希悦系统</span><span style="text-wrap: wrap;">查询的结果为准；2.参考高三</span><span style="text-wrap: wrap; text-decoration-line: underline;">教务</span><span style="text-wrap: wrap;">发布的</span><span style="text-wrap: wrap; text-decoration-line: underline;">缺学分</span><span style="text-wrap: wrap;">的名单，是否有自己的名字。</span><p><br/></p>',
            "answer_id": 25.0,
            "feed_source_id": 24.0,
            "feed_source_img": "../../images/icon8.jpg",
            "comment_num": "18",
            "feed_source_name": "Alex",
            "question": "如何评价周杰伦的「中文歌才是最屌的」的言论？",
        }
    ],
    "id": 2.0,
}
temp = {
    "data": [
        {
            "feed_source_id": 24.0,
            "feed_source_img": "../../images/icon8.jpg",
            "feed_source_name": "Alex",
            "comment_num": "18",
            "question_id": "a",
            "answer_id": "b",
            "answer_ctnt": "c",
            "question": "d",
            "answer": "e",
            "feed_source_txt": "f",
            "good_num": "g",
            "weight": "h"
        }
    ]
}
import pandas as pd
import json

# 假设表格数据存储在Excel文件中，这里使用示例文件路径，你需要替换为实际路径
file_path = 'Q&A.xlsx'
output: str = ""

# 读取Excel文件
try:
    df = pd.read_excel(file_path, sheet_name='Q&A Web数据库')
except FileNotFoundError:
    print(f"文件 {file_path} 未找到，请检查文件路径。")
    exit(1)
except Exception as e:
    print(f"读取文件时出现错误: {e}")
    exit(1)

# 读取表格：Q&A Web数据库
# 逐行打印
for index, row in df.iterrows():
    # 打印第一列
    t = temp
    t["data"][0]["question_id"] = row[0]
    t["data"][0]["answer_id"] = row[0]
    t["data"][0]["question"] = row.iloc[1]
    if row.iloc[2].__len__() >= 25:
        t["data"][0]["answer_ctnt"] = row.iloc[2][:26] + "..."
    else:
        t["data"][0]["answer_ctnt"] = row.iloc[2]
    # 将row3 的每一个"前都加一个\
    t["data"][0]["answer"] = row.iloc[3].replace('"', '\\\'')
    # t["data"][0]["answer"] = row.iloc[3]
    t["data"][0]["feed_source_txt"] = "官方回答"
    t["data"][0]["good_num"] = 0
    t["data"][0]["weight"] = row.iloc[4]

    output += str(t).replace("\'", "\"").replace('\\\\"', "\\\"")
    output += "\n"
    print(output)
    # break

with open("data.json", encoding="utf-8", mode="w") as f:
    f.write(output)

# 假设表格中有以下列名，你需要根据实际情况修改
# 列名对应关系：
# feed_source_id, feed_source_img, feed_source_name, comment_num, question_id, answer_id, answer_ctnt, question, answer, feed_source_txt, good_num, weight
# 示例列名，你需要根据实际表格列名修改
# columns_mapping = {
#     'feed_source_id': 'feed_source_id',
#     'feed_source_img': 'feed_source_img',
#     'feed_source_name': 'feed_source_name',
#     'comment_num': 'comment_num',
#     'question_id': 'question_id',
#     'answer_id': 'answer_id',
#     'answer_ctnt': 'answer_ctnt',
#     'question': 'question',
#     'answer': 'answer',
#     'feed_source_txt': 'feed_source_txt',
#     'good_num': 'good_num',
#     'weight': 'weight'
# }
#
# # 转换数据格式
# data_list = []
# for index, row in df.iterrows():
#     data_dict = {
#         'feed_source_id': row[columns_mapping['feed_source_id']],
#         'feed_source_img': row[columns_mapping['feed_source_img']],
#         'feed_source_name': row[columns_mapping['feed_source_name']],
#         'comment_num': str(row[columns_mapping['comment_num']]),
#         'question_id': str(row[columns_mapping['question_id']]),
#         'answer_id': str(row[columns_mapping['answer_id']]),
#         'answer_ctnt': row[columns_mapping['answer_ctnt']],
#         'question': row[columns_mapping['question']],
#         'answer': row[columns_mapping['answer']],
#         'feed_source_txt': row[columns_mapping['feed_source_txt']],
#         'good_num': str(row[columns_mapping['good_num']]),
#         'weight': str(row[columns_mapping['weight']])
#     }
#     data_list.append(data_dict)

# # 生成JSON数据
# result = {
#     "data": data_list
# }
#
# # 将JSON数据保存到文件
# with open('output.json', 'w', encoding='utf-8') as f:
#     json.dump(result, f, ensure_ascii=False, indent=4)
#
# print("数据已成功转换为JSON并保存到 output.json 文件中。")