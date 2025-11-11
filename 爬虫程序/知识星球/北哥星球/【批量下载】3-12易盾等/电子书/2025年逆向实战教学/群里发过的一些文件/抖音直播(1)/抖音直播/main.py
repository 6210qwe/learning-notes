import subprocess
import os
class MySubprocessPopen(subprocess.Popen):
    def __init__(self, *args, **kwargs):
        kwargs['encoding'] = 'UTF-8'
        super().__init__(*args, **kwargs)
subprocess.Popen = MySubprocessPopen
os.environ['EXECJS_RUNTIME'] = 'Node'
import execjs

from websocket import WebSocketApp
import websocket
from protobuf.douyin import *
import requests
import ssl
import re
import gzip

def get_roomid(zh_url):
    cookies = {
        'IsDouyinActive': 'false',
        '__ac_nonce': '067a179c8004374a4f6d5',
        '__ac_signature': '_02B4Z6wo00f01-KvUEgAAIDCPfSjB7pAILvij1TAAJ8Uec',
        '__ac_referer': zh_url,
    }
    headers = {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'priority': 'u=0, i',
        'referer': 'https://live.douyin.com/',
        'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
    }

    response = requests.get(zh_url, cookies=cookies, headers=headers)
    roomId = re.findall(r'\\"roomId\\":\\"(\d+)\\"',response.text)[0]  #roomId
    user_unique_id = re.findall(f'"user_unique_id":"(\d+)"',response.text.replace('\\',''))[0]  #user_unique_id
    ttwid = response.cookies.get_dict()["ttwid"]  #ttwid
    return roomId,ttwid,user_unique_id


def get_sign(roomId,user_unique_id):
    ooo = f'live_id=1,aid=6383,version_code=180800,webcast_sdk_version=1.0.14-beta.0,room_id={roomId},sub_room_id=,sub_channel_id=,did_rule=3,user_unique_id={user_unique_id},device_platform=web,device_type=,ac=,identity=audience'
    sign = execjs.compile(open('signres.js',encoding='utf-8').read()).call('get_sign',ooo)
    return sign

def _parseChatMsg(payload):
    """聊天消息"""
    message = ChatMessage().parse(payload)
    user_name = message.user.nick_name
    user_id = message.user.id
    content = message.content
    print(f"【聊天msg】[{user_id}]{user_name}: {content}")


def _parseGiftMsg(payload):
    """礼物消息"""
    message = GiftMessage().parse(payload)
    user_name = message.user.nick_name
    gift_name = message.gift.name
    gift_cnt = message.combo_count
    print(f"【礼物msg】{user_name} 送出了 {gift_name}x{gift_cnt}")

def _parseLikeMsg(payload):
    '''点赞消息'''
    message = LikeMessage().parse(payload)
    user_name = message.user.nick_name
    count = message.count
    print(f"【点赞msg】{user_name} 点了{count}个赞")

def _parseMemberMsg(payload):
    '''进入直播间消息'''
    message = MemberMessage().parse(payload)
    user_name = message.user.nick_name
    user_id = message.user.id
    gender = ["女", "男"][message.user.gender]
    print(f"【进场msg】[{user_id}][{gender}]{user_name} 进入了直播间")

def _parseSocialMsg(payload):
    '''关注消息'''
    message = SocialMessage().parse(payload)
    user_name = message.user.nick_name
    user_id = message.user.id
    print(f"【关注msg】[{user_id}]{user_name} 关注了主播")

def _parseRoomUserSeqMsg(payload):
    '''直播间统计'''
    message = RoomUserSeqMessage().parse(payload)
    current = message.total
    total = message.total_pv_for_anchor
    print(f"【统计msg】当前观看人数: {current}, 累计观看人数: {total}")

def _parseFansclubMsg(payload):
    '''粉丝团消息'''
    message = FansclubMessage().parse(payload)
    content = message.content
    print(f"【粉丝团msg】 {content}")

def _parseEmojiChatMsg(payload):
    '''聊天表情包消息'''
    message = EmojiChatMessage().parse(payload)
    emoji_id = message.emoji_id
    user = message.user
    common = message.common
    default_content = message.default_content
    print(f"【聊天表情包id】 {emoji_id},user：{user},common:{common},default_content:{default_content}")

def _parseRoomMsg(payload):
    message = RoomMessage().parse(payload)
    common = message.common
    room_id = common.room_id
    print(f"【直播间msg】直播间id:{room_id}")

def _parseRoomStatsMsg(payload):
    message = RoomStatsMessage().parse(payload)
    display_long = message.display_long
    print(f"【直播间统计msg】{display_long}")

def _parseRankMsg(payload):
    message = RoomRankMessage().parse(payload)
    ranks_list = message.ranks_list
    # 消息太长注释打印了
    # print(f"【直播间排行榜msg】{ranks_list}")

def _parseControlMsg(payload):
    '''直播间状态消息'''
    message = ControlMessage().parse(payload)
    if message.status == 3:
        print("直播间已结束")

def _parseRoomStreamAdaptationMsg(payload):
    message = RoomStreamAdaptationMessage().parse(payload)
    adaptationType = message.adaptation_type
    print(f'直播间adaptation: {adaptationType}')

def on_open(ws):
    print("on_open",ws)

def on_message(ws,message):
    """
    接收到数据
    :param ws: websocket实例
    :param message: 数据
    """
    # 根据proto结构体解析对象
    package = PushFrame().parse(message)
    response = Response().parse(gzip.decompress(package.payload))

    # 返回直播间服务器链接存活确认消息，便于持续获取数据
    if response.need_ack:
        ack = PushFrame(log_id=package.log_id,
                        payload_type='ack',
                        payload=response.internal_ext.encode('utf-8')
                        ).SerializeToString()
        ws.send(ack, websocket.ABNF.OPCODE_BINARY)

    # 根据消息类别解析消息体
    for msg in response.messages_list:
        method = msg.method
        try:
            {
                'WebcastChatMessage': _parseChatMsg,  # 聊天消息
                'WebcastGiftMessage': _parseGiftMsg,  # 礼物消息
                'WebcastLikeMessage': _parseLikeMsg,  # 点赞消息
                'WebcastMemberMessage': _parseMemberMsg,  # 进入直播间消息
                'WebcastSocialMessage': _parseSocialMsg,  # 关注消息
                'WebcastRoomUserSeqMessage': _parseRoomUserSeqMsg,  # 直播间统计
                'WebcastFansclubMessage': _parseFansclubMsg,  # 粉丝团消息
                'WebcastControlMessage': _parseControlMsg,  # 直播间状态消息
                'WebcastEmojiChatMessage': _parseEmojiChatMsg,  # 聊天表情包消息
                'WebcastRoomStatsMessage': _parseRoomStatsMsg,  # 直播间统计信息
                'WebcastRoomMessage': _parseRoomMsg,  # 直播间信息
                'WebcastRoomRankMessage': _parseRankMsg,  # 直播间排行榜信息
                'WebcastRoomStreamAdaptationMessage': _parseRoomStreamAdaptationMsg,  # 直播间流配置
            }.get(method)(msg.payload)
        except Exception:
            pass
    


def on_error(ws,message):
    print('on_error',ws,message)

def on_close(ws, *args, **kwargs):
    pass


def get_danmu(sign,ttwid,roomId,user_unique_id):
    wss_url = f'wss://webcast100-ws-web-lf.douyin.com/webcast/im/push/v2/?app_name=douyin_web&version_code=180800&webcast_sdk_version=1.0.14-beta.0&update_version_code=1.0.14-beta.0&compress=gzip&device_platform=web&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=zh-CN&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/135.0.0.0%20Safari/537.36&browser_online=true&tz_name=Asia/Shanghai&cursor=d-7497978309913870337_u-1_fh-7497977042546909467_t-1745759122229_r-7497978335683827148&internal_ext=internal_src:dim|wss_push_room_id:{roomId}|wss_push_did:7497451316806272552|first_req_ms:1745759122124|fetch_time:1745759122229|seq:1|wss_info:0-1745759122229-0-0|wrds_v:7497978331388720657&host=https://live.douyin.com&aid=6383&live_id=1&did_rule=3&endpoint=live_pc&support_wrds=1&user_unique_id={user_unique_id}&im_path=/webcast/im/fetch/&identity=audience&need_persist_msg_count=15&insert_task_id=&live_reason=&room_id={roomId}&heartbeatDuration=0&signature={sign}'
    headers = {
        'Upgrade': 'websocket',
        'Origin': 'https://live.douyin.com',
        'Cache-Control': 'no-cache',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
        'Pragma': 'no-cache',
        'Connection': 'Upgrade',
        'Sec-WebSocket-Key': 'QMY9hB6xxq7yRejlLsv0kA==',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0',
        'Sec-WebSocket-Version': '13',
        'Sec-WebSocket-Extensions': 'permessage-deflate; client_max_window_bits',
    }
    ws = WebSocketApp(
        url=wss_url,
        header=headers,
        cookie=f"ttwid={ttwid}",
        on_open=on_open,
        on_message=on_message,
        on_error=on_error,
        on_close=on_close,
    )
    ws.run_forever(sslopt={"cert_reqs":ssl.CERT_NONE})


def main(zh_url):
    roomId,ttwid,user_unique_id = get_roomid(zh_url)
    sign = get_sign(roomId=roomId,user_unique_id=user_unique_id)
    get_danmu(sign=sign,ttwid=ttwid,roomId=roomId,user_unique_id=user_unique_id)

if __name__ == '__main__':
    main('https://www.douyin.com/root/live/82309431440')