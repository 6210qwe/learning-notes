import requests


headers = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "bx-v": "2.5.22",
    "cache-control": "no-cache",
    "content-type": "application/x-www-form-urlencoded",
    "origin": "https://login.taobao.com",
    "pragma": "no-cache",
    "priority": "u=1, i",
    "referer": "https://login.taobao.com/havanaone/login/login.htm?bizName=taobao&redirectURL=http%3A%2F%2Fi.taobao.com%2Fmy_itaobao%2Fitao-tool%2FfootMark%3Fspm%3Dtbpc.pc_sem%252Fa.1997525045.2.47502a89AuWWcW",
    "sec-ch-ua": "\"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"138\", \"Google Chrome\";v=\"138\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36"
}
cookies = {
    "XSRF-TOKEN": "a00e4e5a-010e-428c-8e87-8d07aded00ea",
    "_samesite_flag_": "true",
    "cookie2": "1b27406d7a355a4c5536249e17012121",
    "t": "92094b610a5d5f679de3c5bd2083f6ac",
    "_tb_token_": "33b8977eb81b8",
    "3PcFlag": "1754243985426",
    "arms_uid": "05145ca9-4926-485a-a555-49f278a85d83",
    "xlly_s": "1",
    "tfstk": "gmyKDqD2ENbnE58evzfMqYGvcAjGk1DUY0UBELDo-1at5Pg3-Wqu60au7gSEKug8yP0arMolT7H85PVnRzDHyTUt7Y03KWV86yrjtzEPY0g7Pz3ut1X0YkkrFZvRntqeKYIwRJHWrlMEqhK7ok60YkkyvUs01tx8zZyxA4aSOfisDV9SAzGCCcgZ40TIVpsTfVusAD9BOOMs20KIAzM5XlgZVYiQPXsTfVoSF4Mn7H3kA4p89cgwWd5Dspv3BDhKyL06eFsovX3bAVQfPRHZ9qZIWL_BE2DKyVyfS1Ea1WanbzBAWYzaNzi85F_oTuNTWDUhkUuuLk2--kCC8lHZJyGL6iOEXl2L27GOA9Ztp2h0Bf-W9vF788hU93S4fvaagqlC_NoTK-c-ufL1RlqtRjF8-NJS-SE_Wj2MSKDz77aS2PTd4-w0H0okoqnkOGI9aQlIbTz9aDac7ghnXqjMsQRrscotoGI9aQldJc3cj9dyafwG."
}
url = "https://login.taobao.com/havanaone/loginLegacy/qrCode/query.do"
params = {
    "bizEntrance": "taobao_pc",
    "bizName": "taobao"
}
data = {
    "t": "1754243985581",
    "ck": "qr_code_sm2_5uelkhq02muhumc0yqbzszzldvjj9udc",
    "ua": "",
    "hitRSA2048Gray": "true",
    "bizEntrance": "taobao_pc",
    "bizName": "taobao",
    "_csrf": "81571f151fbb7bf4cb14cc4cb86b8baf",
    "returnUrl": "http://i.taobao.com/my_itaobao/itao-tool/footMark?spm=tbpc.pc_sem%2Fa.1997525045.2.47502a89AuWWcW",
    "lang": "zh_CN",
    "umidToken": "",
    "umidTag": "NOT_INIT",
    "navlanguage": "zh-CN",
    "navUserAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36",
    "navPlatform": "Win32",
    "isIframe": "false",
    "banThirdPartyCookie": "false",
    "documentReferer": "",
    "defaultView": "password",
    "deviceId": "",
    "pageTraceId": "2150445d17542439854184504e14bd",
    "bx-ua": "231\\u0021wf47AAmUWuA jD74Vk3ge94jUA5yNOOUDNaHlZ/xunPuOYq1AtH7GoU30OSk8Ql9d0NJBpVnwqU0cXMoqikpOrR49B5R2f/MjFyAoWtxmIYk7lnj3yK5SKduHAhaMrt j1wxZIBXe/hPwp0m 8K364k1MWneJRsZmnJ63UqXrd2AhUIpQytjchFCcyJ9AqqzLqsRriD Aw8e Zd  6WF1cCvafZOHJBh   j ygU3 jOFYzhSnVBF k3 JuVwvZdBKobbIm3vJXwxgqE/Vyp3Fq/E4MYTWhGV856T2A3LHQH2hrY3FmXmkqxmwqDkGk7dWqrgrqBxjkzo1B5AKJvSrSHLYERYykAj4Ge9bloVyKh/Rz/uWotaTdhvmr1hHzHwtXTz1C0R0wFORxESSdchlvEcvvYmoLR9nqxOz8xV8p8YoD1X5zkHEZcTaYKjO39fis4iwWeQXEIvsUrnzXkvBx/YB5W13A/uPgkBzfn2drgqy7VGlHtZYbaGHQwgsAfV4YjtOhAicT67iP6Sbezq Bso Dh94EspcvIZiXqSOymGcJFOzjeNyO86ITdcxcWuLTRZ2HjNA /U BR68B77RTB1xMALk8vHuBD6LapkiLtLelDbFoJhsxTWpgXChyJSja//c2zStx I1JmsnY8nqGODZ 2mrGztS6aQWAIFbiB4f09wMDHaNgqqMHK97KUSdJyzb K5tF7gzYAMIaOtA8tkAmzF5wHB8s/18yI6/1nWzwiM/YNT tL7FrGWOhs521hHTxfcKS2m3EhDfy2GmGf0cnS0kPNaJ Y7vg/CkVJrLRtHiTGGjWdr5Z0i/wKM/7endTO0auzzV1ROHNT0LCJSfAEvJ2YWT9RaWVjwgWWNt258qGSIHM2V53R/s5ComkFfS2 h58MXU/IkGhlyCw0EhnwTMS88N2C5V2JpTQuHF0t70DO7G7lFjSvLCmoqNV6/BHhUKVxzgoMJJwGGt9fZg uzIOYoIECpAU Mt953o02SifkrKQ9U8hlJnIqQra10W0JZeUSsdQwnN7vDNYOx6yHsFeCk6ZW5yPorb7cdFn NPMgjPcY87sBXDh8sCU84ybMIPR8G jc EP5hRZVHhQPzW9fq8YNIQPULKplrsVBq WI1SkF907TDJDxpINADiirxzsy1c2ewtO/JI/jTUbUfQw pZ9t3DFVphJ2bco6KLc/KrwmY4BSjJlKhvCvSHf dNFhM7g/sPJqQHCFV3uN v451vOR7M7EisDrIA8GZQDdcqWK//lhgg/XG2Zqb4sDm47qk VpsxYHBJMomSsh3BHhDIi3kJUIYua1oKo9Y9JiCGHwPexj1Kra1qUGgeSsA14APIGr8ldjFhigkf1o2  bKKD10pC6zdQZ28T4KkkD6AvPpcGHXMvPkHKuV2mlwNg6SYJp/4sfeFKGB8/dpPyojp2BId7xv0a4135bU32nuVmOLSLLtKWcO n3WYhNtO2nqe KvJ8A5UMGxCAuwpgMzv3dkzGp68g61Vtv/oJ/IpYcbeWAgXtoziHK55Q5TNkZh6B2yYkhUXA mshCsV9jXy2U6z/2KdSGkYK4q1dI/ReRb1s PNaKal pZzRPs3BdNpWLL9D1y0hP2cAtWGfcfkVA2FimwzhKmtxwrK8hIQwL/TwWSHQU nMkAPpFEViOeKFXme bZInp5FdsuiyMbb8LJXWXitYVKtEF4eoQx4ulWbuZ4HiumjzoysEGmiVVzFIf5t4KQJDeXBAEzJfN8Bmc8YU1wQihxRGF6mJoPEp75dRF0Uvzb3JrlB1ZwKVDKEp8CdiFNjUEblBRfPwc3b7gip8XE112T9/CnjKcK3LVeoYxnyF6P596DrhFPcNn5gpczOYTO0aJmKkUmWGrTw8HXRsrDnvyhIIxSNb9sWDrNxdyz6GRWkgi9SSaADcKC/9t sapxBVCPZorCYStjgRqzKwO3o3rwfL22K9pRZpVq5tlsuR=",
    "bx-umidtoken": "T2gADtpErVw6jTJT2nfQgzgtCjHIsfkZZ16vLQGOiGX_zPIYggNxNZhAz71YQMh5fuk=",
    "bx_et": "gTzKDr02rOXnrlJe98jMZ4ivGVfG6G0UTbeBrU0oKGwtCRM3KkVuXbwuQ_5E-7M8eRDaE6llYu38CRqnd80HeaetQ4D3-kq8XJPjx8FPTbM7F8HuxGb0TWurPtYRoZVe-4Cwdy3WE5gEZCd7nW_0TWuy9L10fZA8UtzxOYwSAcGsMATSO8iC5fMZab9INe1T1AksOXTBANgswbdIO8g565MZN4GQFD1T1AlSPYMh7BHkOYL8vfMwBFRXveY3WHcKeUD6yd1o9DHbOABfFP3ZvxNIBU6Brv0KeAzfIGFafkwn_8QAB4yaV8G8Cd6oY7ZTBXehHLku8W4-KWICL53ZpJiLXstE654LwuiOOwNtJvn0WcRWv2E7LznUvQ5412wa0xoCbOlT-rm-3cp1d5VtdmE8KO8SKoF_Bm4MIE0zQuwSwR9d4Ka0kblknxhkA1C943oI_ay94XwcQ_nn6xfMj3-rjfltn1C943odpfHcswKy4caG."
}
response = requests.post(url, headers=headers, cookies=cookies, params=params, data=data)

print(response.text)
print(response)