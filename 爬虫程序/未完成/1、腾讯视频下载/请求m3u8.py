import requests

cookies = {
    'RK': 'VBW1vlpnwz',
    'ptcz': 'df4d6797d8d309259c9e92f6b71f468dacdb8c15ed15f4e9da098f8fd3311d46',
    '_qimei_uuid42': '1871701153410044821a1d875c21f8ebb621cbeab6',
    '_qimei_fingerprint': '771f563c3f7ff29a9df72bc8b68b736b',
    '_qimei_q36': '',
    '_qimei_h38': 'a486511b821a1d875c21f8eb0200000fb18717',
    'pac_uid': '0_ZacDEcYNyNWm2',
    'appuser': '554CB67BF0EB55B2',
    'pgv_pvid': '9746987556',
    'fqm_pvqid': '14715c8c-4213-48d9-9ef3-599849b3cde5',
    '_clck': '16gueg|1|foj|0',
    'suid': 'user_0_ZacDEcYNyNWm2',
    'lv_play_index': '79',
    'o_minduid': '-n7suBBDHqJ4E8VZbvUdoqMZiPkr-MUY',
    'qq_domain_video_guid_verify': '631e40633826167a',
    'pgv_info': 'ssid=s6585457027',
    'vversion_name': '8.2.95',
    'video_omgid': '631e40633826167a',
    'Lturn': '417',
    'LKBturn': '184',
    'LPVLturn': '373',
    'LPLFturn': '784',
    'LZCturn': '40',
    'LPSJturn': '889',
    'LBSturn': '339',
    'LVINturn': '437',
    'LPHLSturn': '546',
    'LDERturn': '316',
    'LPPBturn': '108',
    'LZTturn': '307',
}

headers = {
    'accept': '*/*',
    'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6',
    'cache-control': 'no-cache',
    'content-type': 'text/plain;charset=UTF-8',
    # 'cookie': 'RK=VBW1vlpnwz; ptcz=df4d6797d8d309259c9e92f6b71f468dacdb8c15ed15f4e9da098f8fd3311d46; _qimei_uuid42=1871701153410044821a1d875c21f8ebb621cbeab6; _qimei_fingerprint=771f563c3f7ff29a9df72bc8b68b736b; _qimei_q36=; _qimei_h38=a486511b821a1d875c21f8eb0200000fb18717; pac_uid=0_ZacDEcYNyNWm2; appuser=554CB67BF0EB55B2; pgv_pvid=9746987556; fqm_pvqid=14715c8c-4213-48d9-9ef3-599849b3cde5; _clck=16gueg|1|foj|0; suid=user_0_ZacDEcYNyNWm2; lv_play_index=79; o_minduid=-n7suBBDHqJ4E8VZbvUdoqMZiPkr-MUY; qq_domain_video_guid_verify=631e40633826167a; pgv_info=ssid=s6585457027; vversion_name=8.2.95; video_omgid=631e40633826167a; Lturn=417; LKBturn=184; LPVLturn=373; LPLFturn=784; LZCturn=40; LPSJturn=889; LBSturn=339; LVINturn=437; LPHLSturn=546; LDERturn=316; LPPBturn=108; LZTturn=307',
    'origin': 'https://v.qq.com',
    'pragma': 'no-cache',
    'priority': 'u=1, i',
    'referer': 'https://v.qq.com/',
    'sec-ch-ua': '"Microsoft Edge";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0',
}

data = '{"buid":"vinfoad","vinfoparam":"charge=0&otype=ojson&defnpayver=3&spau=1&spaudio=0&spwm=1&sphls=2&host=v.qq.com&refer=https%3A%2F%2Fv.qq.com%2Fx%2Fcover%2Fmzc00200aaogpgh%2Fr0047gdjpw6.html&ehost=https%3A%2F%2Fv.qq.com%2Fx%2Fcover%2Fmzc00200aaogpgh%2Fr0047gdjpw6.html&sphttps=1&encryptVer=8.5&cKey=--0111FE32E7150745CC5B03DA75A75CCAE9D86104AB0BC7E4665A67A686AD1F9F7931E2D9D284D443ED97D4012F8D4604D18C38FB8F184E33ACD38F60CBFB8706937EDDF0D5691085E88F29E661CABD380A7CB282ED246DF69FEC69CC3A198651BF45C30490614022A30DFD1FC7CFECDB3EC7F56954E6BEF90FF31355AAB52ED65DB0C3549F99B235602F72782D0CFABED5AF9826493D502721801B537B7AFAE3BDC2D6DE6A73B77213C604B61B0B18302E888FB57A0F3948658829330A761CB0D790D83134B3E15F9AFCD2DF125A84D6F6CEE299FCC879E662506BFBC0C77C8F74CE25A43689EBEBB562A6CD2E69F4E7891A0230D2CF79A5E2A84BE275761487339F1DE77206EC6B6AE7B5D0B5157661F05AE9188C60C0202052626FB903840862CEB358D1768EB4B815B79905DE4127BA05971907076F6D5B3CE630CCBAD761AE&clip=4&guid=631e40633826167a&flowid=2ee86650f14f9795ac160186ae7f6344&platform=10201&sdtfrom=v1010&appVer=1.37.2&unid=&auth_from=&auth_ext=&vid=r0047gdjpw6&defn=&fhdswitch=0&dtype=3&spsrt=2&tm=1735304101&lang_code=0&logintoken=%7B%22access_token%22%3A%2287_nUJCtmib1eihBRE16LeETRs_RZp7zRFsRi6IOjK7FetRYVmB1InSfjFQ-LpGNOYbYX3LyKI9Yp-FpcPcLLlhKNwJj_xZR-_5Lf2wH3doiAk%22%2C%22appid%22%3A%22wx5ed58254bc0d6b7f%22%2C%22vusession%22%3A%22zeHOUuMgbiLTtHIPs_wbMQ.M%22%2C%22openid%22%3A%22ox8XOvui5w74LKH5OYBRCYadGugc%22%2C%22vuserid%22%3A%223067675390%22%2C%22video_guid%22%3A%22631e40633826167a%22%2C%22main_login%22%3A%22wx%22%7D&spvvpay=1&spadseg=3&spav1=15&spsfrhdr=0&spvideo=0&spm3u8tag=67&spmasterm3u8=3&hevclv=31&track=undefined&drm=296","sspAdParam":"{\\"ad_scene\\":1,\\"pre_ad_params\\":{\\"ad_scene\\":1,\\"user_type\\":0,\\"video\\":{\\"base\\":{\\"vid\\":\\"r0047gdjpw6\\",\\"cid\\":\\"mzc00200aaogpgh\\"},\\"is_live\\":false,\\"type_id\\":3,\\"referer\\":\\"\\",\\"url\\":\\"https://v.qq.com/x/cover/mzc00200aaogpgh/r0047gdjpw6.html\\",\\"flow_id\\":\\"2ee86650f14f9795ac160186ae7f6344\\",\\"refresh_id\\":\\"087fd6e435ada678722af108d571503a_1735303792\\",\\"fmt\\":\\"hd\\"},\\"platform\\":{\\"guid\\":\\"631e40633826167a\\",\\"channel_id\\":0,\\"site\\":\\"web\\",\\"platform\\":\\"in\\",\\"from\\":0,\\"device\\":\\"pc\\",\\"play_platform\\":10201,\\"pv_tag\\":\\"www_baidu_com\\",\\"support_click_scan_integration\\":true},\\"player\\":{\\"version\\":\\"1.37.1\\",\\"plugin\\":\\"4.1.23\\",\\"switch\\":1,\\"play_type\\":\\"0\\"},\\"token\\":{\\"type\\":2,\\"vuid\\":3067675390,\\"vuser_session\\":\\"zeHOUuMgbiLTtHIPs_wbMQ.M\\",\\"app_id\\":\\"wx5ed58254bc0d6b7f\\",\\"open_id\\":\\"ox8XOvui5w74LKH5OYBRCYadGugc\\",\\"access_token\\":\\"87_nUJCtmib1eihBRE16LeETRs_RZp7zRFsRi6IOjK7FetRYVmB1InSfjFQ-LpGNOYbYX3LyKI9Yp-FpcPcLLlhKNwJj_xZR-_5Lf2wH3doiAk\\"},\\"req_extra_info\\":{\\"now_timestamp_s\\":1735304101,\\"ad_frequency_control_time_list\\":{\\"full_pause_feed_back\\":{\\"ad_frequency_control_time_list\\":[1735303886]},\\"full_pause_feedback_successive\\":{\\"ad_frequency_control_time_list\\":[1735303886]}}},\\"extra_info\\":{}}}","adparam":"adType=preAd&vid=r0047gdjpw6&sspKey=aika"}'

response = requests.post('https://vd6.l.qq.com/proxyhttp', cookies=cookies, headers=headers, data=data)
print(response.text)