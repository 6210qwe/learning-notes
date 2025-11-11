import base64

import requests
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import time
import execjs
import random
import string
import json

# Create your views here.

def lesson1_server_time(request):
    return HttpResponse(int(time.time() * 1000))

def lesson1_1(request):
    return render(request, "sec2/lesson1_1.html")

def lesson1_1_data_api(request):
    token = request.COOKIES.get("token")
    with open("/AntiSpider/sec2/utils/lesson1_decode_1.js", "r", encoding="utf-8") as file:
        result = execjs.compile(file.read()).call("decode", token, "sec2lesson1")
    _time = result.split(" ")[-1]
    if abs(time.time() - int(_time)/1000) <= 1:
        return JsonResponse({"code": "1"})
    else:
        return JsonResponse({})

def lesson1_2(request):
    # request.session["set-2-1"] = 1000
    return render(request, "sec2/lesson1_2.html")

def lesson1_2_data_api(request):
    # 动态
    page = request.GET.get("page")
    token = request.session.get("set-2-1")
    _key = token.split("|")[0] if token else "0"
    _value = token.split("|")[1] if token else "1"
    value = request.COOKIES.get(_key)
    if _value == value or int(page) == 1:
        _cookie_key = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(20))
        _cookie_value = ''.join(random.choice(string.ascii_letters + string.digits) for _ in range(20))
        request.session["set-2-1"] = _cookie_key + '|' + _cookie_value
        response = JsonResponse({"code": page})
        response.set_cookie(_cookie_key, _cookie_value)
        return response
    else:
        return JsonResponse({})




def lesson1_3(request):
    token = request.COOKIES.get("token")
    if token:
        with open("/AntiSpider/sec2/utils/lesson1_decode_1.js", "r", encoding="utf-8") as file:
            result = execjs.compile(file.read()).call("decode", token, "sec2lesson1")
        _time = result.split(" ")[-1]
        if abs(time.time() - int(_time) / 1000) <= 1:
            return render(request, "sec2/lesson1_3.html")

    # 如果鉴权不通过，返回一段js，如果通过，放行html页面
    with open("/AntiSpider/sec2/utils/lesson1_3_cookie_anti_spider.html", "r", encoding="utf-8") as f:
        return HttpResponse(f.read())


def lesson1_3_data_api(request):
    return JsonResponse({"code": "1"})


def lesson2(request):
    return render(request, "sec2/lesson2.html")

from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(["LINK"])
def lesson2_data_api(request):

    def xorEncryptDecrypt(_input, _key):
        output = b""
        for i in range(len(_input)):
            charCode = _input[i]
            keyChar = _key[i % len(_key)]
            keyCharCode = ord(keyChar)
            encryptedCharCode = charCode ^ keyCharCode
            output += chr(encryptedCharCode).encode()
        return output

    decrypt = xorEncryptDecrypt(request.body, "yrx-anti-spider-2-2-params").decode()
    _page = int(decrypt[:-13])
    _time = int(decrypt[-13:])

    # 构造要返回的值

    result = xorEncryptDecrypt(json.dumps({"code": _page}).encode(), "yrx-anti-spider-2-2-response")

    if abs(_time/1000 - time.time()) < 2:
        return HttpResponse(result)
    else:
        return JsonResponse({"code": "error"})


def lesson3(request):
    return render(request, "sec2/lesson3.html")


@csrf_exempt
def lesson3_data_api(request):
    from sec2.utils import sec2lesson3_pb2

    def xorEncryptDecrypt(_input, _key):
        output = b""
        for i in range(len(_input)):
            charCode = _input[i]
            keyChar = _key[i % len(_key)]
            keyCharCode = ord(keyChar)
            encryptedCharCode = charCode ^ keyCharCode
            output += chr(encryptedCharCode).encode()
        return output


    # 反序列化
    sec2_data = sec2lesson3_pb2.msg()
    sec2_data.ParseFromString(request.body)
    key = sec2_data.key
    time = sec2_data.time
    page = sec2_data.page

    result = xorEncryptDecrypt(json.dumps({"code": page}).encode(), key)
    return HttpResponse(result)


def lesson4(request):
    # nginx_environ_list = ["ssl_ciphers", "ssl_curves", "ssl_protocol", "ssl_ja3", "ssl_ja3_hash", "http2_fingerprint", "ssl_ja4"]
    # return JsonResponse({i: request.environ.get(i) for i in nginx_environ_list})
    return render(request, "sec2/lesson4.html")

@csrf_exempt
def lesson4_data_api(request):
    
    from Crypto.Cipher import AES
    from Crypto.Util.Padding import unpad
    from django.conf import settings
    import base64
    
    def check_tls(request):
        if settings.DEBUG:
            return True


        ssl_curves = request.environ.get("ssl_curves")
        if "X25519:prime256v1:secp384r1" not in ssl_curves:
            return False
        ssl_ciphers = request.environ.get("ssl_ciphers")
        if len(ssl_ciphers) != 355:
            return False
        http2_fingerprint = request.environ.get("http2_fingerprint")
        if "1:65536;2:0;4:6291456;6:262144|15663105|1:1:0:256|m,a,s,p" != http2_fingerprint:
            return False
        return True
            
    
    secureData = request.POST.get("secureData")
    aes = AES.new(b"sec2-lesson4-key", AES.MODE_ECB)
    decrypt_result = unpad(aes.decrypt(base64.b64decode(secureData.encode())), 16).decode().split("|")
    page = int(decrypt_result[0])
    _time = int(decrypt_result[1])
    
    if abs(_time / 1000 - time.time()) < 2 and check_tls(request):
        with open("/AntiSpider/sec2/utils/data.json") as f:
            return JsonResponse(json.loads(f.read())["pages"][page - 1])
    else:
        with open("/AntiSpider/sec2/utils/error.json") as f:
            return JsonResponse(json.loads(f.read()))


def lesson6(request):
    # nginx_environ_list = ["ssl_ciphers", "ssl_curves", "ssl_protocol", "ssl_ja3", "ssl_ja3_hash", "http2_fingerprint", "ssl_ja4"]
    # return JsonResponse({i: request.environ.get(i) for i in nginx_environ_list})
    return render(request, "sec2/lesson6.html")


@csrf_exempt
def lesson6_data_api(request):
    from Crypto.Cipher import AES
    from Crypto.Util.Padding import unpad
    from django.conf import settings
    import base64
    import hashlib

    def return_error():
        with open("/AntiSpider/sec2/utils/error.json") as f:
            return JsonResponse(json.loads(f.read()))

    secureData = request.POST.get("secureData")
    aes = AES.new(b"sec2-lesson6-key", AES.MODE_ECB)
    decrypt_result = unpad(aes.decrypt(base64.b64decode(secureData.encode())), 16).decode().split("|")

    md5_hash = hashlib.md5()
    md5_hash.update(decrypt_result[1].encode())

    # 前端指纹部分的检测
    if md5_hash.hexdigest() != decrypt_result[2]:
        return return_error()
    # 后端的检测
    server_data = decrypt_result[3].split("-")
    user_agent = server_data[0]
    event_source = server_data[1]
    cpu = server_data[2]

    if user_agent != request.META.get("HTTP_USER_AGENT"):
        return return_error()
    if event_source != "function EventSource() { [native code] }":
        return return_error()
    if not isinstance(int(cpu), int):
        return return_error()

    page = int(decrypt_result[0])
    _time = int(decrypt_result[1])
    if abs(_time / 1000 - time.time()) < 2:
        with open("/AntiSpider/sec2/utils/data.json") as f:
            return JsonResponse(json.loads(f.read())["pages"][page - 1])
    else:
        return return_error()


def lesson9(request):
    return render(request, "sec2/lesson9.html")


@csrf_exempt
def lesson9_data_api(request):

    def check_token(token):
        """
        这个函数应该是安全开发提供的，只需要把前端的token传入即可返回参数的合法性
        :param token: 前端返回的token
        :return:  返回是否合法
        """
        import requests
        params = {
            "token": token
        }
        response = requests.get("http://81.70.22.152:8080/sec2/lesson9_data_check_api", params=params)
        return response.json()["result"]

    token = request.GET.get("token")
    check_result = check_token(token) # 返回一个 True 或者 False
    if check_result:
        page = int(request.POST.get("page"))
        with open("/AntiSpider/sec2/utils/data.json") as f:
            return JsonResponse(json.loads(f.read())["pages"][page - 1])
    else:
        with open("/AntiSpider/sec2/utils/error.json") as f:
            return JsonResponse(json.loads(f.read()))


def lesson9_data_check_api(request):
    from Crypto.PublicKey import RSA
    from Crypto.Cipher import PKCS1_v1_5
    import base64
    import json

    token =  request.GET.get("token")
    token_dict = json.loads(base64.b64decode(token.encode()).decode())
    password = token_dict["getNow"]
    # 下边就是写校验规则
    private_key = """-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCHshK1NixnImx08tq3V6VjvfwkARCOJbnPMZr4Ogh16ORkC45C
FUB+2gu+IN2vjH3oJaY2e/6y0shD2fURMB3urxKE3gewRZMm5/T7noAXs4DJTOxJ
GwAJFHFfd9Zp73vXEcac4DKrvItOkjLx9P5JkA3947brgsMObYGdG3HOdwIDAQAB
AoGAKwsA5StofVSNi7FHUJYEN/XZR8BwtG5iGMeW7TtXWLOF0vhZaTvdh/95bxd0
yo0pmRxsM2c0nRvAe8lk881MCOaQMoHjpKjsmvIpUA+vYniQujARMXy1JrTjBpI+
YZC3kBNUjz1iA2vxA3XjBnxjMW7ayiy+2/57zyQI/e/aoYUCQQC5aUCZkJur3eSl
6c3kN7ghp+gikOpkWnj71whvCAOSpnmYCJ5iILZDc0GC934rJcKBFNyCej5Jtlbl
oLiIUv21AkEAu1tjjrnUo1jXECkcyG7Hw2kdvjZh+MxsHmsrd/H4/xAoOQpE7p8f
VjOcsN9fR5ySCt0QtjNTte72q0ytBp+W+wJAbkI+LVRGjt0kxNmWG/paoIEWVb/x
832t5q3IkSal4UbollXBwj8LxG687aI6QHRzB4odW+ZQNkudv25lboRT5QJBALAZ
Wv9I3XtXQnV3Hw2pSmv6fjFN7lIq2ijRNH892XrsFdJfO6FJwOuGAW4h1e16Va6O
UGng3nqvi/xASpViJUcCQQCbevFs7XgmOW/U5r9brNpZ3yBf5aqP6Xqy6j0QZziw
G3uobwNd7zKTpymOQuCz1So96Fp3WeyGsmk9iJF4NoJ5
-----END RSA PRIVATE KEY-----
    """
    rsakey = RSA.importKey(private_key)
    cipher = PKCS1_v1_5.new(rsakey)
    result = cipher.decrypt(base64.b64decode(password.encode()), None)
    # 先解密base64
    if abs(int(result.decode())/1000 - time.time() >= 3):
        return JsonResponse({"result": False})
    else:
        return JsonResponse({"result": True})