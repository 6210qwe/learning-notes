import requests
import json,subprocess

def run_js_script():
    try:
        # 执行 JavaScript 文件 async_operation.js，使用 Node.js
        result = subprocess.run(['node', r'D:\js教程\抖音补环境\番茄达人bdms\bdms_env.js'], capture_output=True, text=True, timeout=5)

        # 输出 JavaScript 进程的标准输出
        return result.stdout.strip()
    except subprocess.TimeoutExpired:
        print("JavaScript execution timed out.")
    except subprocess.CalledProcessError as e:
        print(f"Error executing JavaScript: {e}")

headers = {
    "authority": "promoter.fanqieopen.com",
    "accept": "application/json, text/plain, */*",
    "accept-language": "zh-CN,zh;q=0.9",
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "https://promoter.fanqieopen.com",
    "pragma": "no-cache",
    "referer": "https://promoter.fanqieopen.com/page/affiliate/task?share_token=83DwPXv3",
    "sec-ch-ua": "\"Not=A?Brand\";v=\"99\", \"Chromium\";v=\"118\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
}
cookies = {
    "x-web-secsdk-uid": "38c8832e-cb81-498e-88ad-7124e1994b5a",
    "gfkadpd": "457699,27070",
    "s_v_web_id": "verify_mcstimow_7IgjZBYL_92rc_4I6k_B8w8_xt2xpdFFRvq1"
}

a_bougs_url = run_js_script().replace('a_bougs::','')

# url = 'https://promoter.fanqieopen.com/api/platform/user/invite_code/log_in/v:version?app_id=457699&aid=457699&origin_app_id=457699&host_app_id=457699&msToken=Fyw8bJOBlrbWzkY34r69sj60Om1argYXTbLN2sh32WisWfbuM32M89Qjk-92xxtx_9baSdphdTBaRktrZbVlRd6LJVHXnUTjeIy_JQn4mOmIqtvGzijACOrdDa7ZvY0nnuj2VWpLBWIqRqgOTISkaiMTo_kPpg%3D%3D&a_bogus=xjWZMfgkDiVpDfy05IdLfY3quLh0YkvC0cyeMD2WvyvSug39HMTz9exoW741ABjjxG%2FZIbfjy4hbT3ohrQ2J8Zwf9W0L%2F25hsDSkKl5Q5xSSs1X9eghgJ0sqmkt5SMx2RvB-rOhhqJKSFbT0AIee-wHvnwVxapCv'
response = requests.post(a_bougs_url, headers=headers, cookies=cookies,  data='{"share_token":"83DwPXv3","invite_code":"dawd12"}')

print(response.text)
print(response)