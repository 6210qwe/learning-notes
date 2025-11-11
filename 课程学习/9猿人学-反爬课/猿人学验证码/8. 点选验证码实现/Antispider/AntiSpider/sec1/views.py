from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import time
# Create your views here.


def lesson3(request):
    return render(request, "sec1/lesson3.html")

def lesson3_2(request):
    response = JsonResponse({"status": 200}, status=200)
    return response

def lesson4(request):
    # 目的就是检测请求头 这五个字符串的出现顺序，是否与预设的顺序一致
    request_order = list(request.META.keys())
    standard_order = ["HTTP_HOST", "HTTP_CONNECTION", "HTTP_USER_AGENT", "HTTP_ACCEPT_ENCODING", "HTTP_ACCEPT_LANGUAGE"]
    for standard_header in standard_order:
        if standard_header in request_order:
            request_order = request_order[request_order.index(standard_header):]
        else:
            return JsonResponse({"result": "failed"})
    return JsonResponse({"result": "success"})

def lesson5(request):
    return render(request, "sec1/lesson5.html")

def lesson5_data_api(request):
    token_list = request.GET.get("token").split("|")
    _sum = token_list[1]
    _time = token_list[0]
    _check_sum = 0
    for _number in _time:
        _check_sum += int(_number)
    if int(_sum) == _check_sum:
        data = [1,2,3,4,5,6,7,8,9,10]
        return JsonResponse({"status": 200, "data": data}, status=200)
    else:
        return JsonResponse({"status": 200, "data": []}, status=403)

def lesson6(request):
    return render(request, "sec1/lesson6.html")

def lesson6_data_api(request):


    token = request.GET.get("token")
    decode_result = int(''.join([chr(ord(i) - 1314) for i in token]))
    if abs(decode_result/1000 - time.time()) <= 10 and len(request.environ.get("ssl_ciphers")) < 600:
        data = [1,2,3,4,5,6,7,8,9,10]
        return JsonResponse({"status": 200, "data": data}, status=200)
    else:
        return JsonResponse({"status": 200, "data": []}, status=403)

