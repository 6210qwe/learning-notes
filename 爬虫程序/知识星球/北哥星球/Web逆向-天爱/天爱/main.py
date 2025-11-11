import math
import random
import subprocess
import cv2
import execjs
import numpy as np
import requests
from PIL import Image
from captcha_recognizer.recognizer import Recognizer
from loguru import logger


trackList = [
    {
        "x": 774,
        "y": 563,
        "type": "down",
        "t": 0
    },
    {
        "x": 774,
        "y": 562,
        "type": "move",
        "t": 78
    },
    {
        "x": 775,
        "y": 562,
        "type": "move",
        "t": 344
    },
    {
        "x": 776,
        "y": 562,
        "type": "move",
        "t": 428
    },
    {
        "x": 777,
        "y": 562,
        "type": "move",
        "t": 474
    },
    {
        "x": 778,
        "y": 562,
        "type": "move",
        "t": 514
    },
    {
        "x": 779,
        "y": 562,
        "type": "move",
        "t": 566
    },
    {
        "x": 780,
        "y": 562,
        "type": "move",
        "t": 574
    },
    {
        "x": 780,
        "y": 563,
        "type": "move",
        "t": 583
    },
    {
        "x": 781,
        "y": 563,
        "type": "move",
        "t": 590
    },
    {
        "x": 782,
        "y": 563,
        "type": "move",
        "t": 602
    },
    {
        "x": 783,
        "y": 563,
        "type": "move",
        "t": 631
    },
    {
        "x": 784,
        "y": 563,
        "type": "move",
        "t": 647
    },
    {
        "x": 784,
        "y": 564,
        "type": "move",
        "t": 670
    },
    {
        "x": 785,
        "y": 564,
        "type": "move",
        "t": 681
    },
    {
        "x": 786,
        "y": 564,
        "type": "move",
        "t": 700
    },
    {
        "x": 787,
        "y": 564,
        "type": "move",
        "t": 718
    },
    {
        "x": 788,
        "y": 565,
        "type": "move",
        "t": 739
    },
    {
        "x": 789,
        "y": 565,
        "type": "move",
        "t": 749
    },
    {
        "x": 790,
        "y": 565,
        "type": "move",
        "t": 762
    },
    {
        "x": 791,
        "y": 565,
        "type": "move",
        "t": 782
    },
    {
        "x": 791,
        "y": 566,
        "type": "move",
        "t": 788
    },
    {
        "x": 792,
        "y": 566,
        "type": "move",
        "t": 788
    },
    {
        "x": 793,
        "y": 566,
        "type": "move",
        "t": 800
    },
    {
        "x": 794,
        "y": 566,
        "type": "move",
        "t": 810
    },
    {
        "x": 795,
        "y": 566,
        "type": "move",
        "t": 822
    },
    {
        "x": 796,
        "y": 566,
        "type": "move",
        "t": 834
    },
    {
        "x": 797,
        "y": 566,
        "type": "move",
        "t": 860
    },
    {
        "x": 798,
        "y": 566,
        "type": "move",
        "t": 874
    },
    {
        "x": 799,
        "y": 566,
        "type": "move",
        "t": 888
    },
    {
        "x": 800,
        "y": 566,
        "type": "move",
        "t": 904
    },
    {
        "x": 801,
        "y": 566,
        "type": "move",
        "t": 924
    },
    {
        "x": 801,
        "y": 567,
        "type": "move",
        "t": 960
    },
    {
        "x": 802,
        "y": 567,
        "type": "move",
        "t": 966
    },
    {
        "x": 803,
        "y": 567,
        "type": "move",
        "t": 987
    },
    {
        "x": 804,
        "y": 567,
        "type": "move",
        "t": 999
    },
    {
        "x": 805,
        "y": 567,
        "type": "move",
        "t": 1030
    },
    {
        "x": 806,
        "y": 567,
        "type": "move",
        "t": 1059
    },
    {
        "x": 807,
        "y": 567,
        "type": "move",
        "t": 1097
    },
    {
        "x": 807,
        "y": 568,
        "type": "move",
        "t": 1163
    },
    {
        "x": 808,
        "y": 568,
        "type": "move",
        "t": 1167
    },
    {
        "x": 809,
        "y": 568,
        "type": "move",
        "t": 1200
    },
    {
        "x": 810,
        "y": 568,
        "type": "move",
        "t": 1262
    },
    {
        "x": 811,
        "y": 568,
        "type": "move",
        "t": 1311
    },
    {
        "x": 811,
        "y": 569,
        "type": "move",
        "t": 1348
    },
    {
        "x": 812,
        "y": 569,
        "type": "move",
        "t": 1355
    },
    {
        "x": 813,
        "y": 569,
        "type": "move",
        "t": 1389
    },
    {
        "x": 814,
        "y": 569,
        "type": "move",
        "t": 1451
    },
    {
        "x": 815,
        "y": 569,
        "type": "move",
        "t": 1490
    },
    {
        "x": 816,
        "y": 569,
        "type": "move",
        "t": 1534
    },
    {
        "x": 817,
        "y": 569,
        "type": "move",
        "t": 1580
    },
    {
        "x": 818,
        "y": 569,
        "type": "move",
        "t": 1651
    },
    {
        "x": 818,
        "y": 570,
        "type": "move",
        "t": 1665
    },
    {
        "x": 819,
        "y": 570,
        "type": "move",
        "t": 1689
    },
    {
        "x": 820,
        "y": 570,
        "type": "move",
        "t": 1741
    },
    {
        "x": 821,
        "y": 570,
        "type": "move",
        "t": 1779
    },
    {
        "x": 822,
        "y": 570,
        "type": "move",
        "t": 1803
    },
    {
        "x": 823,
        "y": 570,
        "type": "move",
        "t": 1824
    },
    {
        "x": 824,
        "y": 570,
        "type": "move",
        "t": 1859
    },
    {
        "x": 825,
        "y": 570,
        "type": "move",
        "t": 1913
    },
    {
        "x": 826,
        "y": 570,
        "type": "move",
        "t": 2027
    },
    {
        "x": 826,
        "y": 571,
        "type": "move",
        "t": 2079
    },
    {
        "x": 827,
        "y": 571,
        "type": "move",
        "t": 2081
    },
    {
        "x": 828,
        "y": 571,
        "type": "move",
        "t": 2154
    },
    {
        "x": 829,
        "y": 571,
        "type": "move",
        "t": 2232
    },
    {
        "x": 830,
        "y": 571,
        "type": "move",
        "t": 2279
    },
    {
        "x": 831,
        "y": 571,
        "type": "move",
        "t": 2382
    },
    {
        "x": 832,
        "y": 571,
        "type": "move",
        "t": 2440
    },
    {
        "x": 832,
        "y": 572,
        "type": "move",
        "t": 2500
    },
    {
        "x": 833,
        "y": 572,
        "type": "move",
        "t": 2569
    },
    {
        "x": 834,
        "y": 572,
        "type": "move",
        "t": 2757
    },
    {
        "x": 835,
        "y": 572,
        "type": "move",
        "t": 2776
    },
    {
        "x": 836,
        "y": 572,
        "type": "move",
        "t": 2788
    },
    {
        "x": 837,
        "y": 572,
        "type": "move",
        "t": 2841
    },
    {
        "x": 838,
        "y": 572,
        "type": "move",
        "t": 2875
    },
    {
        "x": 839,
        "y": 572,
        "type": "move",
        "t": 2914
    },
    {
        "x": 840,
        "y": 572,
        "type": "move",
        "t": 2963
    },
    {
        "x": 841,
        "y": 572,
        "type": "move",
        "t": 2990
    },
    {
        "x": 842,
        "y": 572,
        "type": "move",
        "t": 3023
    },
    {
        "x": 843,
        "y": 572,
        "type": "move",
        "t": 3097
    },
    {
        "x": 844,
        "y": 572,
        "type": "move",
        "t": 3135
    },
    {
        "x": 845,
        "y": 572,
        "type": "move",
        "t": 3171
    },
    {
        "x": 846,
        "y": 572,
        "type": "move",
        "t": 3200
    },
    {
        "x": 847,
        "y": 572,
        "type": "move",
        "t": 3224
    },
    {
        "x": 848,
        "y": 572,
        "type": "move",
        "t": 3261
    },
    {
        "x": 849,
        "y": 572,
        "type": "move",
        "t": 3349
    },
    {
        "x": 850,
        "y": 572,
        "type": "move",
        "t": 3395
    },
    {
        "x": 851,
        "y": 572,
        "type": "move",
        "t": 3441
    },
    {
        "x": 852,
        "y": 572,
        "type": "move",
        "t": 3494
    },
    {
        "x": 853,
        "y": 572,
        "type": "move",
        "t": 3574
    },
    {
        "x": 854,
        "y": 572,
        "type": "move",
        "t": 3611
    },
    {
        "x": 855,
        "y": 572,
        "type": "move",
        "t": 3702
    },
    {
        "x": 856,
        "y": 572,
        "type": "move",
        "t": 3761
    },
    {
        "x": 857,
        "y": 572,
        "type": "move",
        "t": 3792
    },
    {
        "x": 858,
        "y": 572,
        "type": "move",
        "t": 3815
    },
    {
        "x": 859,
        "y": 572,
        "type": "move",
        "t": 3833
    },
    {
        "x": 860,
        "y": 572,
        "type": "move",
        "t": 3849
    },
    {
        "x": 861,
        "y": 572,
        "type": "move",
        "t": 3906
    },
    {
        "x": 862,
        "y": 572,
        "type": "move",
        "t": 3934
    },
    {
        "x": 862,
        "y": 573,
        "type": "move",
        "t": 3939
    },
    {
        "x": 863,
        "y": 573,
        "type": "move",
        "t": 3958
    },
    {
        "x": 864,
        "y": 573,
        "type": "move",
        "t": 3979
    },
    {
        "x": 865,
        "y": 573,
        "type": "move",
        "t": 3998
    },
    {
        "x": 866,
        "y": 573,
        "type": "move",
        "t": 4029
    },
    {
        "x": 867,
        "y": 573,
        "type": "move",
        "t": 4045
    },
    {
        "x": 868,
        "y": 573,
        "type": "move",
        "t": 4067
    },
    {
        "x": 869,
        "y": 573,
        "type": "move",
        "t": 4086
    },
    {
        "x": 870,
        "y": 573,
        "type": "move",
        "t": 4112
    },
    {
        "x": 871,
        "y": 573,
        "type": "move",
        "t": 4130
    },
    {
        "x": 872,
        "y": 573,
        "type": "move",
        "t": 4163
    },
    {
        "x": 872,
        "y": 574,
        "type": "move",
        "t": 4170
    },
    {
        "x": 873,
        "y": 574,
        "type": "move",
        "t": 4183
    },
    {
        "x": 874,
        "y": 574,
        "type": "move",
        "t": 4195
    },
    {
        "x": 875,
        "y": 574,
        "type": "move",
        "t": 4204
    },
    {
        "x": 876,
        "y": 574,
        "type": "move",
        "t": 4215
    },
    {
        "x": 877,
        "y": 574,
        "type": "move",
        "t": 4227
    },
    {
        "x": 878,
        "y": 574,
        "type": "move",
        "t": 4252
    },
    {
        "x": 879,
        "y": 574,
        "type": "move",
        "t": 4266
    },
    {
        "x": 880,
        "y": 574,
        "type": "move",
        "t": 4281
    },
    {
        "x": 881,
        "y": 574,
        "type": "move",
        "t": 4305
    },
    {
        "x": 882,
        "y": 574,
        "type": "move",
        "t": 4332
    },
    {
        "x": 883,
        "y": 574,
        "type": "move",
        "t": 4351
    },
    {
        "x": 883,
        "y": 575,
        "type": "move",
        "t": 4354
    },
    {
        "x": 884,
        "y": 575,
        "type": "move",
        "t": 4400
    },
    {
        "x": 885,
        "y": 575,
        "type": "move",
        "t": 4441
    },
    {
        "x": 886,
        "y": 575,
        "type": "move",
        "t": 4468
    },
    {
        "x": 887,
        "y": 575,
        "type": "move",
        "t": 4497
    },
    {
        "x": 888,
        "y": 575,
        "type": "move",
        "t": 4520
    },
    {
        "x": 889,
        "y": 575,
        "type": "move",
        "t": 4537
    },
    {
        "x": 889,
        "y": 576,
        "type": "move",
        "t": 4538
    },
    {
        "x": 890,
        "y": 576,
        "type": "move",
        "t": 4568
    },
    {
        "x": 891,
        "y": 576,
        "type": "move",
        "t": 4587
    },
    {
        "x": 892,
        "y": 576,
        "type": "move",
        "t": 4607
    },
    {
        "x": 893,
        "y": 576,
        "type": "move",
        "t": 4640
    },
    {
        "x": 893,
        "y": 577,
        "type": "move",
        "t": 4649
    },
    {
        "x": 894,
        "y": 577,
        "type": "move",
        "t": 4669
    },
    {
        "x": 895,
        "y": 577,
        "type": "move",
        "t": 4715
    },
    {
        "x": 896,
        "y": 577,
        "type": "move",
        "t": 4740
    },
    {
        "x": 897,
        "y": 577,
        "type": "move",
        "t": 4759
    },
    {
        "x": 898,
        "y": 578,
        "type": "move",
        "t": 4776
    },
    {
        "x": 899,
        "y": 578,
        "type": "move",
        "t": 4789
    },
    {
        "x": 900,
        "y": 578,
        "type": "move",
        "t": 4800
    },
    {
        "x": 901,
        "y": 578,
        "type": "move",
        "t": 4827
    },
    {
        "x": 902,
        "y": 578,
        "type": "move",
        "t": 4839
    },
    {
        "x": 903,
        "y": 578,
        "type": "move",
        "t": 4852
    },
    {
        "x": 904,
        "y": 578,
        "type": "move",
        "t": 4864
    },
    {
        "x": 905,
        "y": 578,
        "type": "move",
        "t": 4875
    },
    {
        "x": 906,
        "y": 578,
        "type": "move",
        "t": 4886
    },
    {
        "x": 907,
        "y": 578,
        "type": "move",
        "t": 4912
    },
    {
        "x": 908,
        "y": 578,
        "type": "move",
        "t": 4926
    },
    {
        "x": 909,
        "y": 578,
        "type": "move",
        "t": 4941
    },
    {
        "x": 910,
        "y": 578,
        "type": "move",
        "t": 4952
    },
    {
        "x": 911,
        "y": 578,
        "type": "move",
        "t": 4969
    },
    {
        "x": 912,
        "y": 578,
        "type": "move",
        "t": 4981
    },
    {
        "x": 913,
        "y": 578,
        "type": "move",
        "t": 5009
    },
    {
        "x": 914,
        "y": 578,
        "type": "move",
        "t": 5023
    },
    {
        "x": 915,
        "y": 578,
        "type": "move",
        "t": 5034
    },
    {
        "x": 916,
        "y": 578,
        "type": "move",
        "t": 5049
    },
    {
        "x": 917,
        "y": 578,
        "type": "move",
        "t": 5057
    },
    {
        "x": 917,
        "y": 579,
        "type": "move",
        "t": 5065
    },
    {
        "x": 918,
        "y": 579,
        "type": "move",
        "t": 5068
    },
    {
        "x": 919,
        "y": 579,
        "type": "move",
        "t": 5091
    },
    {
        "x": 920,
        "y": 579,
        "type": "move",
        "t": 5102
    },
    {
        "x": 921,
        "y": 579,
        "type": "move",
        "t": 5114
    },
    {
        "x": 922,
        "y": 579,
        "type": "move",
        "t": 5127
    },
    {
        "x": 923,
        "y": 579,
        "type": "move",
        "t": 5143
    },
    {
        "x": 923,
        "y": 580,
        "type": "move",
        "t": 5155
    },
    {
        "x": 924,
        "y": 580,
        "type": "move",
        "t": 5165
    },
    {
        "x": 925,
        "y": 580,
        "type": "move",
        "t": 5208
    },
    {
        "x": 926,
        "y": 580,
        "type": "move",
        "t": 5228
    },
    {
        "x": 927,
        "y": 580,
        "type": "move",
        "t": 5238
    },
    {
        "x": 928,
        "y": 580,
        "type": "move",
        "t": 5257
    },
    {
        "x": 928,
        "y": 581,
        "type": "move",
        "t": 5262
    },
    {
        "x": 929,
        "y": 581,
        "type": "move",
        "t": 5270
    },
    {
        "x": 930,
        "y": 581,
        "type": "move",
        "t": 5308
    },
    {
        "x": 931,
        "y": 581,
        "type": "move",
        "t": 5330
    },
    {
        "x": 932,
        "y": 581,
        "type": "move",
        "t": 5367
    },
    {
        "x": 932,
        "y": 582,
        "type": "move",
        "t": 5384
    },
    {
        "x": 933,
        "y": 582,
        "type": "move",
        "t": 5404
    },
    {
        "x": 934,
        "y": 582,
        "type": "move",
        "t": 5433
    },
    {
        "x": 935,
        "y": 582,
        "type": "move",
        "t": 5471
    },
    {
        "x": 935,
        "y": 583,
        "type": "move",
        "t": 5557
    },
    {
        "x": 936,
        "y": 583,
        "type": "move",
        "t": 5586
    },
    {
        "x": 937,
        "y": 583,
        "type": "move",
        "t": 5647
    },
    {
        "x": 938,
        "y": 583,
        "type": "move",
        "t": 5695
    },
    {
        "x": 938,
        "y": 584,
        "type": "move",
        "t": 5725
    },
    {
        "x": 939,
        "y": 584,
        "type": "move",
        "t": 5729
    },
    {
        "x": 940,
        "y": 584,
        "type": "move",
        "t": 5789
    },
    {
        "x": 941,
        "y": 584,
        "type": "move",
        "t": 5847
    },
    {
        "x": 942,
        "y": 584,
        "type": "move",
        "t": 5911
    },
    {
        "x": 943,
        "y": 584,
        "type": "move",
        "t": 5935
    },
    {
        "x": 944,
        "y": 584,
        "type": "move",
        "t": 5960
    },
    {
        "x": 945,
        "y": 584,
        "type": "move",
        "t": 5985
    },
    {
        "x": 946,
        "y": 584,
        "type": "move",
        "t": 6016
    },
    {
        "x": 946,
        "y": 585,
        "type": "move",
        "t": 6030
    },
    {
        "x": 947,
        "y": 585,
        "type": "move",
        "t": 6050
    },
    {
        "x": 948,
        "y": 585,
        "type": "move",
        "t": 6100
    },
    {
        "x": 949,
        "y": 585,
        "type": "move",
        "t": 6147
    },
    {
        "x": 950,
        "y": 585,
        "type": "move",
        "t": 6182
    },
    {
        "x": 950,
        "y": 586,
        "type": "move",
        "t": 6195
    },
    {
        "x": 951,
        "y": 586,
        "type": "move",
        "t": 6234
    },
    {
        "x": 952,
        "y": 586,
        "type": "move",
        "t": 6272
    },
    {
        "x": 953,
        "y": 586,
        "type": "move",
        "t": 6304
    },
    {
        "x": 953,
        "y": 587,
        "type": "move",
        "t": 6344
    },
    {
        "x": 954,
        "y": 587,
        "type": "move",
        "t": 6384
    },
    {
        "x": 955,
        "y": 587,
        "type": "move",
        "t": 6450
    },
    {
        "x": 956,
        "y": 587,
        "type": "move",
        "t": 6493
    },
    {
        "x": 957,
        "y": 587,
        "type": "move",
        "t": 6598
    },
    {
        "x": 958,
        "y": 587,
        "type": "move",
        "t": 6645
    },
    {
        "x": 958,
        "y": 588,
        "type": "move",
        "t": 6703
    },
    {
        "x": 959,
        "y": 588,
        "type": "move",
        "t": 6720
    },
    {
        "x": 960,
        "y": 588,
        "type": "move",
        "t": 6762
    },
    {
        "x": 961,
        "y": 588,
        "type": "move",
        "t": 6791
    },
    {
        "x": 962,
        "y": 588,
        "type": "move",
        "t": 6837
    },
    {
        "x": 963,
        "y": 588,
        "type": "move",
        "t": 6872
    },
    {
        "x": 964,
        "y": 588,
        "type": "move",
        "t": 6944
    },
    {
        "x": 964,
        "y": 589,
        "type": "move",
        "t": 7008
    },
    {
        "x": 965,
        "y": 589,
        "type": "move",
        "t": 7081
    },
    {
        "x": 966,
        "y": 589,
        "type": "move",
        "t": 7109
    },
    {
        "x": 967,
        "y": 589,
        "type": "move",
        "t": 7133
    },
    {
        "x": 967,
        "y": 590,
        "type": "move",
        "t": 7139
    },
    {
        "x": 968,
        "y": 590,
        "type": "move",
        "t": 7152
    },
    {
        "x": 969,
        "y": 590,
        "type": "move",
        "t": 7165
    },
    {
        "x": 970,
        "y": 590,
        "type": "move",
        "t": 7184
    },
    {
        "x": 971,
        "y": 590,
        "type": "move",
        "t": 7218
    },
    {
        "x": 972,
        "y": 590,
        "type": "move",
        "t": 7233
    },
    {
        "x": 973,
        "y": 590,
        "type": "move",
        "t": 7258
    },
    {
        "x": 974,
        "y": 590,
        "type": "move",
        "t": 7277
    },
    {
        "x": 975,
        "y": 590,
        "type": "move",
        "t": 7306
    },
    {
        "x": 976,
        "y": 590,
        "type": "move",
        "t": 7322
    },
    {
        "x": 977,
        "y": 590,
        "type": "move",
        "t": 7359
    },
    {
        "x": 978,
        "y": 590,
        "type": "move",
        "t": 7384
    },
    {
        "x": 979,
        "y": 590,
        "type": "move",
        "t": 7414
    },
    {
        "x": 979,
        "y": 591,
        "type": "move",
        "t": 7428
    },
    {
        "x": 980,
        "y": 591,
        "type": "move",
        "t": 7434
    },
    {
        "x": 981,
        "y": 591,
        "type": "move",
        "t": 7454
    },
    {
        "x": 982,
        "y": 591,
        "type": "move",
        "t": 7476
    },
    {
        "x": 983,
        "y": 591,
        "type": "move",
        "t": 7529
    },
    {
        "x": 984,
        "y": 591,
        "type": "move",
        "t": 7561
    },
    {
        "x": 985,
        "y": 591,
        "type": "move",
        "t": 7586
    },
    {
        "x": 985,
        "y": 592,
        "type": "move",
        "t": 7606
    },
    {
        "x": 986,
        "y": 592,
        "type": "move",
        "t": 7613
    },
    {
        "x": 987,
        "y": 592,
        "type": "move",
        "t": 7634
    },
    {
        "x": 988,
        "y": 592,
        "type": "move",
        "t": 7666
    },
    {
        "x": 988,
        "y": 593,
        "type": "move",
        "t": 7745
    },
    {
        "x": 989,
        "y": 593,
        "type": "move",
        "t": 7758
    },
    {
        "x": 990,
        "y": 593,
        "type": "move",
        "t": 7790
    },
    {
        "x": 991,
        "y": 593,
        "type": "move",
        "t": 7836
    },
    {
        "x": 992,
        "y": 593,
        "type": "move",
        "t": 7881
    },
    {
        "x": 992,
        "y": 594,
        "type": "move",
        "t": 7908
    },
    {
        "x": 993,
        "y": 594,
        "type": "move",
        "t": 7916
    },
    {
        "x": 994,
        "y": 594,
        "type": "move",
        "t": 7972
    },
    {
        "x": 995,
        "y": 594,
        "type": "move",
        "t": 7998
    },
    {
        "x": 996,
        "y": 594,
        "type": "move",
        "t": 8018
    },
    {
        "x": 997,
        "y": 594,
        "type": "move",
        "t": 8039
    },
    {
        "x": 997,
        "y": 595,
        "type": "move",
        "t": 8049
    },
    {
        "x": 998,
        "y": 595,
        "type": "move",
        "t": 8077
    },
    {
        "x": 999,
        "y": 595,
        "type": "move",
        "t": 8111
    },
    {
        "x": 1000,
        "y": 595,
        "type": "move",
        "t": 8301
    },
    {
        "x": 1001,
        "y": 595,
        "type": "move",
        "t": 8488
    },
    {
        "x": 1002,
        "y": 595,
        "type": "move",
        "t": 8515
    },
    {
        "x": 1003,
        "y": 595,
        "type": "move",
        "t": 8548
    },
    {
        "x": 1004,
        "y": 595,
        "type": "move",
        "t": 8568
    },
    {
        "x": 1005,
        "y": 595,
        "type": "move",
        "t": 8599
    },
    {
        "x": 1006,
        "y": 595,
        "type": "move",
        "t": 8689
    },
    {
        "x": 1006,
        "y": 595,
        "type": "up",
        "t": 9048
    }
]


def get_sub_trajectory(trajectories, value):
    # 检查value是否在轨迹的x值中
    for trajectory in trajectories:
        if trajectory['x'] == value:
            # 如果找到，截取从轨迹开始到该点的子数组
            return [t for t in trajectories if t['x'] <= value]

    # 如果value不在x值中，找到最接近value的x值
    closest_x = None
    min_diff = float('inf')
    for trajectory in trajectories:
        if abs(trajectory['x'] - value) < min_diff:
            min_diff = abs(trajectory['x'] - value)
            closest_x = trajectory['x']

    # 截取从轨迹开始到最接近的x值的子数组
    return [t for t in trajectories if t['x'] <= closest_x]


def get_code_sold(ids, track_array):
    with open(r"D:\逆向练手\滑块类\天爱\code_.js", 'r', encoding='utf-8') as f:
        js_code = f.read()
    xb_run = execjs.compile(js_code)
    result = xb_run.call('get_code_sold', ids, track_array)
    return result


# 切割图片的函数
def split_image(image_path, num_rows, num_cols):
    img = Image.open(image_path)
    img_width, img_height = img.size
    tile_width = img_width // num_cols
    tile_height = img_height // num_rows

    tiles = []
    for row in range(num_rows):
        for col in range(num_cols):
            left = col * tile_width
            upper = row * tile_height
            right = left + tile_width
            lower = upper + tile_height
            tile = img.crop((left, upper, right, lower))
            tiles.append(tile)

    return tiles


# 重新组合图片的函数
def combine_images(tiles, num_rows, num_cols, output_path):
    tile_width, tile_height = tiles[0].size
    combined_image = Image.new('RGB', (tile_width * num_cols, tile_height * num_rows))

    for index, tile in enumerate(tiles):
        row = index // num_cols
        col = index % num_cols
        combined_image.paste(tile, (col * tile_width, row * tile_height))

    combined_image.save(output_path)


# 根据指定顺序排序图片块
def reorder_tiles(tiles, order):
    return [tiles[i] for i in order]


def ocr_cv2():
    try:
        recognizer = Recognizer()
        box, confidence = recognizer.identify_gap(source=r'D:\逆向练手\滑块类\天爱\image\output_image.jpg',
                                                  verbose=False)
        mouse_x = int(box[0])
        logger.info(f"滑动距离为:{(int(mouse_x / 2))}")
        return int(mouse_x / 2)
    except Exception as e:
        return identify_gap()


def get_encrypt():
    node_script_path = r"D:\逆向练手\滑块类\天爱\jscode1.js"
    command = ["node", node_script_path]
    result = subprocess.check_output(command, text=True)
    __drives__ = result.split('__drives__')[1].split('__ki__')[0].replace(' ', '').replace('\n', '')
    __ki__ = result.split('__ki__')[1].split('__encrypt')[0].replace(' ', '').replace('\n', '')
    __encrypt = result.split('__encrypt')[1].replace(' ', '').replace('\n', '')
    return {
        "__drives__": __drives__,
        "__ki__": __ki__,
        "__encrypt": __encrypt
    }


# get_encrypt()

def identify_gap():
    """
    bg: 背景图片
    tp: 缺口图片
    out: 输出图片
    """
    # 读取背景图片和缺口图片

    with open('image/output_image.jpg', 'rb') as f:
        bg = f.read()
    with open('image/templateImage.jpg', 'rb') as f:
        tp = f.read()

    bg_img = cv2.imdecode(np.frombuffer(bg, np.uint8), cv2.IMREAD_GRAYSCALE)
    tp_img = cv2.imdecode(np.frombuffer(tp, np.uint8), cv2.IMREAD_GRAYSCALE)  # 缺口图片
    yy = []
    xx = []
    for y in range(tp_img.shape[0]):
        for x in range(tp_img.shape[1]):
            r = tp_img[y, x]
            if r < 200:
                yy.append(y)
                xx.append(x)
    tp_img = tp_img[min(yy):max(yy), min(xx):max(xx)]
    # 识别图片边缘
    bg_edge = cv2.Canny(bg_img, 100, 200)
    tp_edge = cv2.Canny(tp_img, 100, 200)
    # 转换图片格式
    bg_pic = cv2.cvtColor(bg_edge, cv2.COLOR_GRAY2RGB)
    tp_pic = cv2.cvtColor(tp_edge, cv2.COLOR_GRAY2RGB)
    # 缺口匹配
    res = cv2.matchTemplate(bg_pic, tp_pic, cv2.TM_CCOEFF_NORMED)
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)  # 寻找最优匹配
    # # 绘制方框
    th, tw = tp_pic.shape[:2]
    tl = max_loc  # 左上角点的坐标
    br = (tl[0] + tw, tl[1] + th)  # 右下角点的坐标
    cv2.rectangle(bg_img, tl, br, (0, 0, 255), 2)  # 绘制矩形
    cv2.imwrite('distinguish.jpg', bg_img)  # 保存在本地
    # 返回缺口的X坐标
    logger.info(f"滑动距离为: {int(tl[0] / 2)}")
    return int(max_loc[0] / 2)


class TianAi:
    def __init__(self):
        self.requests = requests.session()
        # self.requests = requests
        self.requests.headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'http://captcha.tianai.cloud',
            'Pragma': 'no-cache',
            'Referer': 'http://captcha.tianai.cloud/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
            'x-referer': 'http://captcha.tianai.cloud/',
            'Cookie': 'JSESSIONID=EA85B997A393F73F9919E95C033E8B21'
        }
        self.id = None

    def init_run(self):
        url = "http://api.captcha.tianai.cloud/gen?type=SLIDER&tag1=shuimo"

        payload = "{}"
        response = self.requests.request("POST", url, data=payload).json()
        self.id = response['id']
        captcha = response['captcha']
        backgroundImage = captcha['backgroundImage']
        templateImage = captcha['templateImage']
        shuffle = captcha['data']['shuffle']
        orders = shuffle['pos']
        order = []
        for info in orders:
            order.append(int(info))

        backgroundImage = "http:" + backgroundImage
        templateImage = "http:" + templateImage

        _big_response = requests.get(url=backgroundImage).content
        with open("image/backgroundImage.jpg", "wb") as b:
            b.write(_big_response)
        _puzzle_response = requests.get(url=templateImage).content
        with open("image/templateImage.jpg", "wb") as b:
            b.write(_puzzle_response)
        logger.info(self.id)
        # print(order)
        # 切割图片
        num_rows = 2
        num_cols = 5
        image_path = "image/backgroundImage.jpg"  # 输入图片路径
        tiles = split_image(image_path, num_rows, num_cols)

        ordered_tiles = reorder_tiles(tiles, order)

        # 重新组合图片
        output_path = "image/output_image.jpg"  # 输出图片路径
        combine_images(ordered_tiles, num_rows, num_cols, output_path)
        mouse_x = ocr_cv2()
        num_points = random.randint(int(mouse_x), int(mouse_x) + 30)
        # track_array = generate_human_like_trajectory(778, 556, 778 + int(mouse_x), 561)
        track_array = get_sub_trajectory(trackList, 762 + num_points)
        track_array[-1]['type'] = 'up'
        logger.info(f"轨迹生成：{track_array}")

        result = get_code_sold(self.id, track_array)

        # 指定编码方式（如UTF-8）
        with open(r'D:\逆向练手\滑块类\天爱\jscode.js', 'r', encoding='utf-8') as file:
            content = file.read()
            codes = f'let str1 = "{result}"' + ';' + content

        with open(r'D:\逆向练手\滑块类\天爱\jscode1.js', 'w', encoding='utf-8') as fe:
            fe.write(codes)

        # print(result)

    def get_captcha(self):
        self.requests.headers = {
            'Accept': '*/*',
            'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json;charset=UTF-8',
            'Origin': 'https://captcha.tianai.cloud',
            'Pragma': 'no-cache',
            'Referer': 'https://captcha.tianai.cloud/',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-site',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36',
            'sec-ch-ua': '"Chromium";v="136", "Google Chrome";v="136", "Not.A/Brand";v="99"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'x-referer': 'https://captcha.tianai.cloud/',
        }
        data_code = get_encrypt()
        json_data = {
            "id": self.id,
            "data": data_code['__encrypt'],
            "drives": data_code['__drives__'],
            "ki": data_code['__ki__']
        }
        # print(json_data)

        response = self.requests.post('https://api.captcha.tianai.cloud/check3', json=json_data)
        logger.debug(response.text)

    def run(self):
        self.init_run()
        self.get_captcha()


TianAi().run()
